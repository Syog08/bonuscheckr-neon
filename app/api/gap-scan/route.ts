// The Gap — weekly scan engine.
// Triggered by Vercel Cron (Mondays 09:00 UTC). Pulls Polymarket + partner book odds
// from OddsPapi, strips the vig, computes gaps, stores rows in Supabase, then
// generates and publishes the weekly digest via the Anthropic API.

import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import {
  BOOKS,
  SCAN_GROUPS,
  MMA_SPORT_ID,
  MMA_MARKET_ID,
  MMA_OUTCOMES,
  MAX_ROWS,
  QUOTA_RESERVE,
} from '@/lib/predictions';

export const maxDuration = 300;
export const dynamic = 'force-dynamic';

const OP_BASE = 'https://api.oddspapi.io/v4';
const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms));
let lastCall = 0;

async function op(path: string): Promise<any> {
  const wait = 1150 - (Date.now() - lastCall);
  if (wait > 0) await sleep(wait);
  lastCall = Date.now();
  const sep = path.includes('?') ? '&' : '?';
  const res = await fetch(`${OP_BASE}${path}${sep}apiKey=${process.env.ODDSPAPI_KEY}`, {
    cache: 'no-store',
  });
  return res.json();
}

type Prices = Record<string, number>;

function outcomePrices(fx: any, book: string, marketId: string): Prices | null {
  const outcomes = fx?.bookmakerOdds?.[book]?.markets?.[marketId]?.outcomes;
  if (!outcomes) return null;
  const p: Prices = {};
  for (const [oid, o] of Object.entries<any>(outcomes)) {
    const pl = o?.players?.['0'];
    if (pl?.active && pl.price > 1) p[oid] = pl.price;
  }
  return Object.keys(p).length >= 2 ? p : null;
}

function devig(prices: Prices): Prices {
  let s = 0;
  const inv: Prices = {};
  for (const [k, v] of Object.entries(prices)) {
    inv[k] = 1 / v;
    s += inv[k];
  }
  const out: Prices = {};
  for (const k in inv) out[k] = inv[k] / s;
  return out;
}

export async function GET(req: Request) {
  if (req.headers.get('authorization') !== `Bearer ${process.env.CRON_SECRET}`) {
    return new NextResponse('unauthorized', { status: 401 });
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. Quota guard — /account is unmetered.
  const acct = await op('/account');
  const sub = (acct?.subscriptions ?? []).find((s: any) => s.is_active);
  if (sub && sub.request_limit - sub.request_count < QUOTA_RESERVE) {
    return NextResponse.json({ skipped: 'quota_low', remaining: sub.request_limit - sub.request_count });
  }

  // 2. Build scan groups: static + current MMA events.
  const groups = [...SCAN_GROUPS];
  const mmaT = await op(`/tournaments?sportId=${MMA_SPORT_ID}`);
  if (Array.isArray(mmaT)) {
    const active = mmaT
      .filter((t: any) => t.futureFixtures > 0)
      .sort((a: any, b: any) => b.futureFixtures - a.futureFixtures)
      .slice(0, 4)
      .map((t: any) => t.tournamentId);
    if (active.length) {
      groups.push({
        category: 'UFC / MMA',
        tournamentIds: active.join(','),
        marketId: MMA_MARKET_ID,
        outcomes: MMA_OUTCOMES,
      });
    }
  }

  // 3. Pull odds per group per book, compute gaps.
  const bookSlugs = Object.keys(BOOKS);
  const candidates: any[] = [];

  for (const g of groups) {
    const pm = await op(`/odds-by-tournaments?bookmaker=polymarket&tournamentIds=${g.tournamentIds}`);
    if (!Array.isArray(pm) || !pm.length) continue;

    const byBook: Record<string, Map<string, any>> = {};
    for (const bk of bookSlugs) {
      const data = await op(`/odds-by-tournaments?bookmaker=${bk}&tournamentIds=${g.tournamentIds}`);
      if (Array.isArray(data)) byBook[bk] = new Map(data.map((f: any) => [f.fixtureId, f]));
    }

    for (const f of pm) {
      const pmPrices = outcomePrices(f, 'polymarket', g.marketId);
      if (!pmPrices) continue;
      const pmProb = devig(pmPrices);

      let best: any = null;
      for (const oid of Object.keys(pmProb)) {
        const ladder: { book: string; price: number; devig: number }[] = [];
        for (const bk of bookSlugs) {
          const bf = byBook[bk]?.get(f.fixtureId);
          if (!bf) continue;
          const bp = outcomePrices(bf, bk, g.marketId);
          if (!bp || !(oid in bp)) continue;
          const bd = devig(bp);
          ladder.push({ book: bk, price: bp[oid], devig: bd[oid] });
        }
        if (!ladder.length) continue;
        ladder.sort((a, b) => b.price - a.price);
        const top = ladder[0];
        const gapPp = (pmProb[oid] - top.devig) * 100;
        if (!best || Math.abs(gapPp) > Math.abs(best.gapPp)) {
          best = { oid, gapPp, top, ladder, pmP: pmProb[oid] };
        }
      }

      if (best) {
        candidates.push({
          fixtureId: f.fixtureId,
          category: g.category,
          start: f.startTime,
          side: g.outcomes[best.oid] ?? 'p1',
          gapPp: best.gapPp,
          pmP: best.pmP,
          top: best.top,
          ladder: best.ladder,
        });
      }
    }
  }

  candidates.sort((a, b) => Math.abs(b.gapPp) - Math.abs(a.gapPp));
  const selected = candidates.slice(0, MAX_ROWS);

  const scanId = crypto.randomUUID();
  const rows: any[] = [];
  for (const c of selected) {
    const fx = await op(`/fixture?fixtureId=${c.fixtureId}`);
    const p1 = fx?.participant1Name ?? 'Home';
    const p2 = fx?.participant2Name ?? 'Away';
    const pickName = c.side === 'p1' ? p1 : c.side === 'p2' ? p2 : 'Draw';
    rows.push({
      scan_id: scanId,
      fixture_id: c.fixtureId,
      category: c.category,
      event_name: `${p1} vs ${p2}`,
      event_start: c.start,
      pick: c.side === 'draw' ? 'Draw' : `${pickName} to win`,
      pm_prob: +(c.pmP * 100).toFixed(1),
      best_book: c.top.book,
      best_book_prob: +(c.top.devig * 100).toFixed(1),
      best_book_price: c.top.price,
      fair_price: +(1 / c.pmP).toFixed(2),
      gap_pp: +c.gapPp.toFixed(1),
      book_prices: c.ladder.map((l: any) => ({
        book: l.book,
        price: l.price,
        devig: +(l.devig * 100).toFixed(1),
      })),
    });
  }

  if (!rows.length) return NextResponse.json({ scanned: 0, note: 'no matched fixtures' });

  const { error: insertErr } = await supabase.from('gap_rows').insert(rows);
  if (insertErr) return NextResponse.json({ error: insertErr.message }, { status: 500 });

  let digest = 'skipped';
  try {
    const { count } = await supabase
      .from('guides')
      .select('id', { count: 'exact', head: true })
      .like('slug', 'the-gap-issue-%');
    const issueNo = (count ?? 0) + 1;

    const dataForWriter = rows.map((r) => ({
      category: r.category,
      event: r.event_name,
      pick: r.pick,
      polymarket_pct: r.pm_prob,
      best_book: BOOKS[r.best_book]?.name ?? r.best_book,
      best_book_implied_pct: r.best_book_prob,
      best_book_price: r.best_book_price,
      crowd_fair_price: r.fair_price,
      gap_pp: r.gap_pp,
      starts: r.event_start,
    }));

    const prompt = `You are the Content Director of BonusCheckr.com writing "The Gap — Issue #${issueNo}", a weekly digest comparing Polymarket prediction-market probabilities against crypto bookmaker odds (vig already stripped).

House voice: direct, confident, specific, no hype, no exclamation marks, contractions fine, second person for the reader, "we" for BonusCheckr. Never invent numbers — use ONLY the data below. Gaps under 2pp must be called out honestly as "no edge". Convert the lead gap into money language (book price vs crowd fair price). British-neutral English.

Structure (markdown):
- One-sentence standfirst.
- "## The fights" and/or "## The football" sections depending on the data categories (2-3 paragraphs each, lead with the biggest gap).
- "## The skips" — one short paragraph on markets that look tempting but show no real gap.
- End with one sentence reminding that odds move and the price at the book is the price that counts.
No title (it is added separately). No bullet lists. 450-650 words.

Data (captured ${new Date().toISOString()}):
${JSON.stringify(dataForWriter, null, 2)}`;

    const aiRes = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': process.env.ANTHROPIC_API_KEY!,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 2000,
        messages: [{ role: 'user', content: prompt }],
      }),
    });
    const ai = await aiRes.json();
    const body = ai?.content?.[0]?.text;

    if (body) {
      const lead = rows[0];
      const title = `The Gap #${issueNo}: the book and the crowd disagree on ${lead.event_name}`;
      const { error: gErr } = await supabase.from('guides').insert({
        slug: `the-gap-issue-${issueNo}`,
        title,
        meta_title: `The Gap #${issueNo} — Polymarket vs Bookie Odds`.slice(0, 60),
        meta_description: `Where prediction markets and crypto bookies disagree this week: ${lead.event_name}, ${Math.abs(lead.gap_pp)}pp gap. Vig-stripped, timestamped.`.slice(0, 155),
        description: `Issue #${issueNo} of The Gap — the weekly Polymarket vs bookmaker divergence report.`,
        content: body,
        tldr: `Biggest gap this week: ${lead.pick} — Polymarket ${lead.pm_prob}% vs ${BOOKS[lead.best_book]?.name ?? lead.best_book} ${lead.best_book_prob}% (${lead.gap_pp}pp).`,
        author_id: 'sergio-t',
        primary_topic: 'predictions',
        target_keywords: ['polymarket vs sportsbook odds', 'prediction market odds'],
        status: 'published',
        publish_date: new Date().toISOString(),
        last_updated: new Date().toISOString(),
        read_time: '4 min',
      });
      digest = gErr ? `error: ${gErr.message}` : `the-gap-issue-${issueNo}`;
    }
  } catch (e: any) {
    digest = `error: ${e?.message ?? 'unknown'}`;
  }

  return NextResponse.json({ scanned: rows.length, scan_id: scanId, digest });
}

