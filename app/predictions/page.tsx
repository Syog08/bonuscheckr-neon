// The Gap — /predictions. Server component, revalidates hourly.
// Data: latest scan from gap_rows + recent digests from guides.

import { createClient } from '@supabase/supabase-js';
import Link from 'next/link';
import type { Metadata } from 'next';
import { BOOKS, POLYMARKET_URL, NOISE_THRESHOLD_PP } from '@/lib/predictions';

export const revalidate = 3600;

export const metadata: Metadata = {
  title: 'The Gap — Polymarket vs Bookie Odds | BonusCheckr',
  description:
    'Where prediction markets and crypto bookies disagree — and by how much. Vig-stripped odds comparison between Polymarket and Stake, BC.Game, Roobet, Cloudbet and more. Updated weekly.',
};

function fmtDate(d: string | null) {
  if (!d) return '';
  return new Date(d).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' }).toUpperCase();
}

export default async function PredictionsPage() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  const { data: latest } = await supabase
    .from('gap_rows')
    .select('scan_id, captured_at')
    .order('captured_at', { ascending: false })
    .limit(1);

  let rows: any[] = [];
  let capturedAt: string | null = null;
  if (latest?.length) {
    capturedAt = latest[0].captured_at;
    const { data } = await supabase
      .from('gap_rows')
      .select('*')
      .eq('scan_id', latest[0].scan_id)
      .order('gap_pp', { ascending: false });
    rows = (data ?? []).sort((a, b) => Math.abs(b.gap_pp) - Math.abs(a.gap_pp));
  }

  const { data: issues } = await supabase
    .from('guides')
    .select('slug, title, tldr, publish_date')
    .like('slug', 'the-gap-issue-%')
    .eq('status', 'published')
    .order('publish_date', { ascending: false })
    .limit(3);

  const staleDays = capturedAt
    ? Math.floor((Date.now() - new Date(capturedAt).getTime()) / 86400000)
    : null;

  return (
    <main className="max-w-5xl mx-auto px-6 pb-24">
      <header className="pt-14 pb-10">
        <div className="font-mono text-[11px] tracking-[0.18em] text-zinc-500 mb-3">PREDICTIONS</div>
        <h1 className="text-white text-4xl sm:text-5xl font-bold tracking-tight mb-4">The Gap</h1>
        <p className="text-lg text-zinc-400 max-w-2xl">
          Where prediction markets and bookies disagree — and by how much. Live odds from the books,
          live prices from Polymarket, vig stripped, compared side by side.
        </p>
        <p className="text-xs text-zinc-600 mt-3 max-w-2xl">
          BonusCheckr earns commission from some operator links. The numbers don&apos;t care.
        </p>
      </header>

      <section className="mb-16">
        <div className="rounded-xl border border-zinc-800 overflow-hidden">
          <div className="flex items-center justify-between px-4 sm:px-5 py-3 bg-zinc-900/60 border-b border-zinc-800">
            <span className="font-mono text-[11px] tracking-[0.14em] text-zinc-500">
              BIGGEST GAPS RIGHT NOW
            </span>
            <span className="font-mono text-[11px] text-zinc-600">
              {capturedAt
                ? `CAPTURED ${fmtDate(capturedAt)}${staleDays && staleDays > 8 ? ` · ${staleDays} DAYS OLD` : ''}`
                : 'NO DATA YET'}
            </span>
          </div>

          {rows.length === 0 && (
            <div className="px-5 py-10 text-sm text-zinc-500">
              First scan hasn&apos;t run yet. The table fills automatically every Monday.
            </div>
          )}

          {rows.map((r, i) => {
            const signal = Math.abs(r.gap_pp) >= NOISE_THRESHOLD_PP;
            const lead = i === 0 && signal;
            const book = BOOKS[r.best_book];
            const ladder = (r.book_prices ?? [])
              .map((l: any) => `${l.price.toFixed(2)} ${BOOKS[l.book]?.name ?? l.book}`)
              .join(' · ');
            return (
              <div
                key={r.id}
                className="px-4 sm:px-5 py-4 border-b border-zinc-800/70 last:border-b-0 flex flex-wrap items-center gap-x-6 gap-y-3 hover:bg-zinc-900/30"
              >
                <div className="flex-1 min-w-[220px]">
                  <span className="font-mono text-[10px] tracking-wider px-1.5 py-0.5 rounded border border-zinc-700 text-zinc-400 inline-block mb-1.5">
                    {r.category.toUpperCase()} · {fmtDate(r.event_start)}
                  </span>
                  <div className="text-white font-semibold text-[15px]">{r.event_name}</div>
                  <div className="text-xs text-zinc-500 mt-0.5">
                    {r.pick} — Polymarket{' '}
                    <b className="font-mono font-normal text-zinc-300">{r.pm_prob}%</b> · best book
                    implies <b className="font-mono font-normal text-zinc-300">{r.best_book_prob}%</b>
                  </div>
                  {signal && ladder && (
                    <div className="text-xs text-zinc-500 mt-0.5">
                      Prices: <span className="font-mono text-zinc-400">{ladder}</span> — crowd fair
                      price <span className="font-mono text-zinc-400">{r.fair_price}</span>
                    </div>
                  )}
                </div>
                <div className="text-right">
                  <div
                    className={`font-mono text-2xl tabular-nums ${signal ? 'text-emerald-400' : 'text-zinc-500'}`}
                  >
                    {r.gap_pp > 0 ? '+' : ''}
                    {r.gap_pp}
                    <span className="text-sm">pp</span>
                  </div>
                  {signal && book ? (
                    lead ? (
                      <a
                        href={book.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="mt-1.5 inline-flex items-center gap-1.5 rounded-lg border border-emerald-500/30 bg-emerald-500/10 px-3.5 py-2.5 text-[13px] font-medium text-emerald-400 hover:bg-emerald-500/15"
                      >
                        Best price at {book.name} →
                      </a>
                    ) : (
                      <a
                        href={book.affiliateUrl}
                        target="_blank"
                        rel="noopener noreferrer sponsored"
                        className="text-[13px] font-medium text-emerald-400 hover:text-emerald-300"
                      >
                        Best price at {book.name} →
                      </a>
                    )
                  ) : (
                    <div className="text-xs text-zinc-600">No edge — skip</div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
        <p className="text-xs text-zinc-600 mt-3">
          Gaps under ±{NOISE_THRESHOLD_PP}pp are noise, not signal. We show them so you can see
          we&apos;re not hiding the boring truth.
        </p>
      </section>

      <section className="max-w-2xl">
        <div className="font-mono text-[11px] tracking-[0.16em] text-zinc-500 mb-4">
          THE GAP · WEEKLY DIGEST
        </div>
        {(issues ?? []).map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="block rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 mb-3 hover:border-zinc-600"
          >
            <div className="text-white font-semibold text-base mb-1">{g.title}</div>
            <div className="text-sm text-zinc-400">{g.tldr}</div>
            <div className="text-xs text-zinc-600 mt-2">
              Sergio T. ·{' '}
              {g.publish_date &&
                new Date(g.publish_date).toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'long',
                  year: 'numeric',
                })}
            </div>
          </Link>
        ))}
        {(!issues || issues.length === 0) && (
          <p className="text-sm text-zinc-500">Issue #1 publishes after the first Monday scan.</p>
        )}

        <div className="rounded-xl border border-zinc-800 bg-zinc-900/40 p-5 mt-8">
          <div className="font-mono text-[11px] tracking-[0.14em] text-zinc-500 mb-2">
            HOW WE COUNT
          </div>
          <p className="text-sm leading-relaxed text-zinc-400">
            Bookmaker odds include a built-in margin (the vig), so raw implied probabilities always
            add up to more than 100%. We strip it proportionally before comparing — otherwise every
            market would look like a fake gap. Polymarket prices are what traders actually pay. Both
            sides timestamped at capture. Odds move — the price you see at the book is the price
            that counts.{' '}
            <a
              href={POLYMARKET_URL}
              target="_blank"
              rel="noopener noreferrer sponsored"
              className="text-zinc-300 underline hover:text-white"
            >
              See the markets on Polymarket
            </a>
            .
          </p>
        </div>
      </section>
    </main>
  );
}
