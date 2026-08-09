import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

/**
 * BonusCheckr analyser — v2
 *
 * KEY CHANGE vs v1: the LLM no longer invents the score, the EV, or the severities.
 * The model does ONE job — extract the bonus terms into structured fields.
 * Everything judgemental (EV %, trap detection, severities, verdict) is computed
 * deterministically in code below. That removes the "made-up -23% EV" problem:
 * the number is now real maths on the extracted inputs, identical every run.
 *
 * Output shape is backward-compatible with the existing frontend (verdictTitle,
 * verdictType, score, summary, stats{wagering,maxCashout,maxBet,ev}, traps[],
 * positives[]) and adds: confidence, evPercent, rakeback.
 */

// ---------- 1. LLM EXTRACTION ONLY ----------

const EXTRACTION_PROMPT = `You are a casino bonus terms extractor. Read the bonus terms and return ONLY valid JSON with the fields below. Extract facts only — do NOT judge, score, or compute anything. If a field is not stated, use null. Never guess a number.

{
  "operatorName": string | null,
  "bonusAmount": number | null,          // headline bonus cash value in account currency
  "depositRequired": number | null,      // qualifying deposit; null if no-deposit bonus
  "wageringMultiplier": number | null,   // e.g. 35 for "35x"
  "wageringBase": "bonus" | "deposit_plus_bonus" | null,
  "maxCashout": number | null,           // absolute max withdrawal from the bonus, if a cap exists
  "maxBet": number | null,               // max bet allowed while bonus active
  "maxBetEnforced": true | false | null, // true only if terms say it is blocked/enforced by software
  "timeLimitDays": number | null,        // days to complete wagering
  "slotsContribution": number | null,    // 1.0 = 100%; 0.1 = 10%; default null
  "tablesContribution": number | null,
  "statedRTP": number | null,            // e.g. 0.96 if the terms state game RTP
  "sticky": true | false | null,         // true if the bonus itself is never withdrawable
  "hasExcludedHighRTPGames": true | false | null,
  "isRakebackModel": true | false | null,// true if the operator's real value is rakeback/cashback, not a match
  "rakebackPct": number | null,          // e.g. 0.05 for 5%
  "rakebackWagerFree": true | false | null,
  "notBonusInput": true | false          // true if the text is not actually bonus terms (gibberish/unrelated)
}
Return ONLY the JSON object.`;

// ---------- 2. DETERMINISTIC SCORING ENGINE ----------

type Severity = "low" | "medium" | "high";
type Verdict = "good" | "fair" | "risky" | "avoid";

interface Terms {
  operatorName: string | null;
  bonusAmount: number | null;
  depositRequired: number | null;
  wageringMultiplier: number | null;
  wageringBase: "bonus" | "deposit_plus_bonus" | null;
  maxCashout: number | null;
  maxBet: number | null;
  maxBetEnforced: boolean | null;
  timeLimitDays: number | null;
  slotsContribution: number | null;
  tablesContribution: number | null;
  statedRTP: number | null;
  sticky: boolean | null;
  hasExcludedHighRTPGames: boolean | null;
  isRakebackModel: boolean | null;
  rakebackPct: number | null;
  rakebackWagerFree: boolean | null;
  notBonusInput: boolean;
}

const DEFAULT_RTP = 0.96; // house edge 4% when RTP not stated

function computeEV(t: Terms): { evPercent: number | null; evAbsolute: number | null } {
  if (t.bonusAmount == null || t.wageringMultiplier == null) return { evPercent: null, evAbsolute: null };
  const rtp = t.statedRTP ?? DEFAULT_RTP;
  const houseEdge = 1 - rtp;
  const contribution = t.slotsContribution ?? 1.0;
  const deposit = t.depositRequired ?? t.bonusAmount; // fall back so % has a denominator
  const wagerBase = t.wageringBase === "deposit_plus_bonus" ? t.bonusAmount + (t.depositRequired ?? 0) : t.bonusAmount;

  const totalWager = t.wageringMultiplier * wagerBase;
  const expectedCost = (totalWager * houseEdge) / contribution;
  let evAbsolute = t.bonusAmount - expectedCost;

  // Max cashout is a HARD CEILING on realisable winnings.
  if (t.maxCashout != null) evAbsolute = Math.min(evAbsolute, t.maxCashout - expectedCost);

  const evPercent = (evAbsolute / deposit) * 100;
  return { evPercent: Math.round(evPercent * 10) / 10, evAbsolute: Math.round(evAbsolute * 100) / 100 };
}

interface Trap { severity: Severity; title: string; detail: string; }

function detectTraps(t: Terms): Trap[] {
  const traps: Trap[] = [];
  const effectiveWR = t.wageringMultiplier != null && t.wageringBase === "deposit_plus_bonus"
    ? t.wageringMultiplier * 2 : t.wageringMultiplier ?? 0;

  // Cashout cap
  if (t.maxCashout != null && t.bonusAmount != null) {
    const mult = t.maxCashout / t.bonusAmount;
    if (mult <= 5 || t.maxCashout <= 100) {
      traps.push({ severity: "high", title: "Winnings capped", detail: `Max cashout is ${t.maxCashout} (~${mult.toFixed(1)}x the bonus). This truncates your upside no matter how well you play.` });
    }
  }
  // Wagering
  if (effectiveWR >= 60) traps.push({ severity: "high", title: "Predatory wagering", detail: `Effective ${effectiveWR}x wagering is close to unclearable in profit.` });
  else if (effectiveWR >= 40) traps.push({ severity: "high", title: "High wagering", detail: `Effective ${effectiveWR}x wagering makes this hard to clear profitably.` });
  // Deposit+bonus base
  if (t.wageringBase === "deposit_plus_bonus") traps.push({ severity: "medium", title: "Wagering on deposit + bonus", detail: "Wagering applies to deposit AND bonus, roughly doubling the real turnover vs a bonus-only requirement." });
  // Max bet enforcement
  if (t.maxBet != null && t.maxBetEnforced === false) traps.push({ severity: "high", title: "Unenforced max bet", detail: `A ${t.maxBet} max bet that isn't software-enforced is often used to void winnings after the fact.` });
  // Time limit
  if (t.timeLimitDays != null && t.timeLimitDays <= 7 && effectiveWR >= 30) traps.push({ severity: "medium", title: "Tight deadline", detail: `${t.timeLimitDays} days to clear ${effectiveWR}x is unrealistic and pushes risky bet sizes.` });
  // Excluded games / sticky
  if (t.hasExcludedHighRTPGames) traps.push({ severity: "low", title: "Restricted games", detail: "High-RTP games are excluded or weighted down, raising the real cost to clear." });
  if (t.sticky) traps.push({ severity: "medium", title: "Sticky bonus", detail: "The bonus itself is never withdrawable — only winnings above it." });
  return traps;
}

function fairnessScore(t: Terms): number {
  let s = 10;
  if (t.wageringBase === "deposit_plus_bonus") s -= 1.5;
  if (t.maxCashout != null && t.bonusAmount != null && t.maxCashout / t.bonusAmount <= 10) s -= 1.5;
  if (t.maxBet != null && t.maxBetEnforced === false) s -= 2;
  if (t.timeLimitDays != null && t.timeLimitDays <= 7 && (t.wageringMultiplier ?? 0) >= 30) s -= 1;
  if (t.hasExcludedHighRTPGames) s -= 1;
  if (t.sticky) s -= 1;
  return Math.max(0, s);
}

function evToScore(evPercent: number | null): number {
  if (evPercent == null) return 5;
  if (evPercent >= 0) return 10;
  if (evPercent >= -5) return 8.5;
  if (evPercent >= -15) return 6.5;
  if (evPercent >= -30) return 4;
  return 2;
}

function decideVerdict(score: number, traps: Trap[], effectiveWR: number, t: Terms): Verdict {
  const highTrap = traps.some((x) => x.severity === "high");
  const capTrap = traps.some((x) => x.title === "Winnings capped");
  // Verdict-capping rules
  if (effectiveWR >= 60) return "avoid";
  if (t.sticky && effectiveWR >= 35 && capTrap) return "avoid";
  if (score < 3) return "avoid";
  if (highTrap || effectiveWR >= 40 || capTrap) return "risky"; // caps at "risky" (= poor)
  if (score >= 8) return "good";
  if (score >= 6) return "fair";
  return "risky";
}

// ---------- 3. ROUTE ----------

export async function POST(req: NextRequest) {
  const { terms } = await req.json();
  if (!terms || terms.trim().length < 10) {
    return NextResponse.json({ error: "Please provide bonus terms to analyse." }, { status: 400 });
  }
  const apiKey = process.env.ANTHROPIC_API_KEY?.trim();
  if (!apiKey) {
    console.error("ANTHROPIC_API_KEY is not set");
    return NextResponse.json({ error: "Service temporarily unavailable. Please try again later." }, { status: 500 });
  }
  const client = new Anthropic({ apiKey });

  try {
    const message = await client.messages.create({
      // Sonnet reads nuance (base type, enforcement, rakeback) far better than Haiku.
      // Extraction is cheap; the judgement is free (it's code). Swap to "claude-haiku-4-5" only if cost bites.
      // Using the stable alias (not a dated snapshot) so it can't 404 on a mistyped date.
      model: "claude-sonnet-4-5",
      max_tokens: 1200,
      system: EXTRACTION_PROMPT,
      messages: [{ role: "user", content: `BONUS TERMS:\n${terms}` }],
    });

    const rawText = (message.content[0] as { type: string; text: string }).text;
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/g, "").trim();
    const t = JSON.parse(cleaned) as Terms;

    // Guard: not a bonus.
    if (t.notBonusInput) {
      return NextResponse.json({
        verdictTitle: "Not a bonus", verdictType: "avoid", score: 0, confidence: "low",
        summary: "We couldn't find real bonus terms in that text. Paste the full T&Cs of a specific offer.",
        stats: {}, traps: [], positives: [], evPercent: null,
      });
    }

    // Rakeback / Model-A route: don't force a wagering verdict on a bonus that barely exists.
    if (t.isRakebackModel) {
      const pct = t.rakebackPct != null ? `${(t.rakebackPct * 100).toFixed(1)}%` : "a";
      return NextResponse.json({
        verdictTitle: "Value is in the rakeback, not a bonus",
        verdictType: "good", score: 8, confidence: "medium",
        summary: `${t.operatorName ?? "This operator"}'s real value is ${pct} ${t.rakebackWagerFree ? "wager-free " : ""}rakeback, not a match bonus. Rakeback is paid on the house edge (roughly ~1% of what you wager per 30%), and carries no wagering — structurally higher value than most deposit matches.`,
        stats: { rakeback: { value: pct, label: "Rakeback", severity: "low" } },
        traps: [], positives: ["No wagering to clear", "Withdrawable value on every bet"],
        rakeback: { applies: true, pct: t.rakebackPct, wagerFree: t.rakebackWagerFree },
        evPercent: null,
      });
    }

    // Deterministic scoring.
    const { evPercent } = computeEV(t);
    const traps = detectTraps(t);
    const effectiveWR = t.wageringMultiplier != null && t.wageringBase === "deposit_plus_bonus"
      ? t.wageringMultiplier * 2 : t.wageringMultiplier ?? 0;
    const score = Math.round((0.6 * evToScore(evPercent) + 0.4 * fairnessScore(t)) * 10) / 10;
    const verdictType = decideVerdict(score, traps, effectiveWR, t);

    // Confidence: low if the value-driving fields are missing.
    const missingKey = [t.wageringMultiplier, t.maxCashout, t.wageringBase].filter((x) => x == null).length;
    const confidence: Severity = missingKey >= 2 ? "low" : missingKey === 1 ? "medium" : "high";

    const sev = (cond: boolean): Severity => (cond ? "high" : "medium");
    const positives: string[] = [];
    if (evPercent != null && evPercent >= -5) positives.push("Expected value is close to break-even — unusually player-friendly");
    if (t.wageringMultiplier != null && t.wageringMultiplier <= 25) positives.push(`Low ${t.wageringMultiplier}x wagering`);
    if (t.maxCashout == null) positives.push("No max-cashout cap on winnings");
    if (t.wageringBase === "bonus") positives.push("Wagering is on the bonus only, not deposit + bonus");

    const summary = evPercent != null
      ? `On these terms you'd expect to ${evPercent < 0 ? `lose about ${Math.abs(evPercent).toFixed(0)}% of your deposit` : "come out roughly even"} clearing the bonus. ${verdictType === "good" ? "This is one of the better offers." : verdictType === "avoid" ? "Not worth claiming." : "Claim only with eyes open."}`
      : "Key terms are missing, so treat this verdict as low-confidence and check the full T&Cs.";

    return NextResponse.json({
      verdictTitle: verdictType === "good" ? "Worth claiming" : verdictType === "fair" ? "Claim with caution" : verdictType === "risky" ? "Poor value" : "Avoid",
      verdictType, score, confidence, summary, evPercent,
      stats: {
        wagering: { value: t.wageringMultiplier != null ? `${t.wageringMultiplier}x${t.wageringBase === "deposit_plus_bonus" ? " (D+B)" : ""}` : "N/A", label: "Wagering Requirement", severity: sev(effectiveWR >= 40) },
        maxCashout: { value: t.maxCashout != null ? String(t.maxCashout) : "None", label: "Max Cashout", severity: sev(t.maxCashout != null && t.bonusAmount != null && t.maxCashout / t.bonusAmount <= 5) },
        maxBet: { value: t.maxBet != null ? String(t.maxBet) : "N/A", label: "Max Bet While Active", severity: sev(t.maxBetEnforced === false) },
        ev: { value: evPercent != null ? `${evPercent}` : "N/A", label: "Expected Value %", severity: sev(evPercent != null && evPercent < -15) },
      },
      traps,
      positives,
      rakeback: { applies: false },
    });
  } catch (err) {
    if (err instanceof Anthropic.APIError) {
      console.error("Anthropic API error:", err.status, err.message);
      if (err.status === 429) return NextResponse.json({ error: "Too many requests. Please wait a moment and try again." }, { status: 429 });
    }
    console.error("Analysis error:", err);
    return NextResponse.json({ error: "Analysis failed. Please try again." }, { status: 500 });
  }
}
