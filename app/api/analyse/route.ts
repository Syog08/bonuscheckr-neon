import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const { terms } = await req.json();

  if (!terms || terms.trim().length < 10) {
    return NextResponse.json(
      { error: "Please provide bonus terms to analyse." },
      { status: 400 }
    );
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key not configured." },
      { status: 500 }
    );
  }

  const systemPrompt = `You are an expert casino bonus analyst. Analyse the bonus terms and return ONLY valid JSON with this structure:
{
  "verdictTitle": "short title",
  "verdictType": "good",
  "score": 7.4,
  "summary": "2-3 sentence verdict",
  "stats": {
    "wagering": { "value": "35x", "label": "Wagering Requirement", "severity": "medium" },
    "maxCashout": { "value": "500", "label": "Max Cashout", "severity": "medium" },
    "maxBet": { "value": "5", "label": "Max Bet While Active", "severity": "high" },
    "ev": { "value": "-23", "label": "Expected Value", "severity": "high" }
  },
  "traps": [{ "severity": "high", "title": "name", "detail": "explanation" }],
  "positives": ["positive 1", "positive 2"]
}
verdictType: good/fair/risky/avoid. severity: low/medium/high. 2-5 traps, 2-4 positives.`;

  const userMsg = `BONUS TERMS:\n${terms}`;

  try {
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-haiku-4-5-20251001",
        max_tokens: 1500,
        system: systemPrompt,
        messages: [{ role: "user", content: userMsg }],
      }),
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error("Anthropic API error:", errText);
      return NextResponse.json(
        { error: "Analysis failed. Please try again." },
        { status: 502 }
      );
    }

    const data = await response.json();
    const rawText: string = data.content[0].text;
    const cleaned = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/\s*```$/g, "").trim();
    const result = JSON.parse(cleaned);
    return NextResponse.json(result);
  } catch (err) {
    console.error("Analysis error:", err);
    return NextResponse.json(
      { error: "Failed to parse analysis. Please try again." },
      { status: 500 }
    );
  }
}
