export default function VerdictCard() {
  return (
    <div>
      {/* Example label header — connected to the card below */}
      <div className="rounded-t-md border border-b-0 border-line bg-bg-surface px-3 py-[10px]">
        <div className="mb-[3px] font-mono text-[9px] font-semibold uppercase tracking-[0.14em] text-accent">
          Example analysis
        </div>
        <div className="text-[11px] leading-[1.4] text-fg-muted">
          Here&apos;s what you&apos;ll see when you analyse a bonus.
        </div>
      </div>

      <div className="overflow-hidden rounded-b-lg border border-t-0 border-line bg-bg-surface">
        {/* Verdict header */}
        <div className="border-b border-bg-elevated p-4">
          <div className="mb-[10px] flex items-start justify-between gap-3">
            <div>
              <div className="mb-[5px] font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-fg-dim">
                Verdict
              </div>
              <div className="text-[18px] font-bold leading-[1.22] tracking-[-0.015em] text-fg">
                Fair — but the traps matter
              </div>
            </div>
            <div className="flex-shrink-0 text-right">
              <div className="font-mono text-[26px] font-bold leading-none tracking-[-0.02em] text-warning">
                6.2
              </div>
              <div className="mt-[3px] font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-fg-dim">
                / 10
              </div>
            </div>
          </div>
          <div className="text-[12px] leading-[1.45] text-fg-muted">
            Workable for experienced players. Skip if you want clean withdrawals.
          </div>
        </div>

        {/* KPI grid — 2×2 on mobile, 4 across on desktop */}
        <div className="grid grid-cols-2 gap-px bg-bg-elevated sm:grid-cols-4">
          <div className="bg-bg-surface px-[14px] py-3">
            <div className="mb-[5px] font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-fg-dim">
              Wagering
            </div>
            <div className="font-mono text-[14px] font-semibold text-danger">
              40×
            </div>
            <div className="mt-[2px] text-[10px] text-fg-faint">on bonus</div>
          </div>
          <div className="bg-bg-surface px-[14px] py-3">
            <div className="mb-[5px] font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-fg-dim">
              Max cashout
            </div>
            <div className="font-mono text-[14px] font-semibold text-danger">
              10× dep
            </div>
            <div className="mt-[2px] text-[10px] text-fg-faint">capped</div>
          </div>
          <div className="bg-bg-surface px-[14px] py-3">
            <div className="mb-[5px] font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-fg-dim">
              Max bet
            </div>
            <div className="font-mono text-[14px] font-semibold text-danger">
              $5
            </div>
            <div className="mt-[2px] text-[10px] text-fg-faint">during WR</div>
          </div>
          <div className="bg-bg-surface px-[14px] py-3">
            <div className="mb-[5px] font-mono text-[9px] font-medium uppercase tracking-[0.1em] text-fg-dim">
              EV
            </div>
            <div className="font-mono text-[14px] font-semibold text-accent">
              +$8
            </div>
            <div className="mt-[2px] text-[10px] text-fg-faint">per $100</div>
          </div>
        </div>

        {/* Traps */}
        <div className="border-t border-bg-elevated p-4">
          <div className="mb-[10px] font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-fg-dim">
            The traps
          </div>
          {[
            {
              severity: "high",
              color: "bg-danger",
              text: (
                <>
                  <strong className="font-semibold text-fg">7-day expiry.</strong>{" "}
                  Realistic completion of 4&nbsp;BTC turnover needs ~10h active
                  play.
                </>
              ),
            },
            {
              severity: "med",
              color: "bg-warning",
              text: (
                <>
                  <strong className="font-semibold text-fg">Sticky bonus.</strong>{" "}
                  Cannot withdraw real wins until wagering is complete.
                </>
              ),
            },
            {
              severity: "med",
              color: "bg-warning",
              text: (
                <>
                  <strong className="font-semibold text-fg">
                    Live dealer 10% only.
                  </strong>{" "}
                  Must play slots to clear wagering fast.
                </>
              ),
            },
            {
              severity: "low",
              color: "bg-fg-dim",
              text: (
                <>
                  <strong className="font-semibold text-fg">Max bet $5.</strong>{" "}
                  Standard for bonus play — auto-void if breached.
                </>
              ),
            },
          ].map((trap, i) => (
            <div
              key={i}
              className="flex items-start gap-[10px] py-[6px] text-[12px] leading-[1.5] text-fg"
            >
              <div
                className={`mt-[7px] h-[6px] w-[6px] flex-shrink-0 rounded-full ${trap.color}`}
                aria-hidden="true"
              />
              <div>{trap.text}</div>
            </div>
          ))}
        </div>

        {/* Better alternatives */}
        <div className="border-t border-bg-elevated bg-bg-subtle p-4">
          <div className="mb-[10px] font-mono text-[9px] font-medium uppercase tracking-[0.14em] text-accent">
            Better alternatives
          </div>
          <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2">
            {[
              {
                initial: "C",
                name: "Cloudbet",
                score: "8.4",
                line: "Non-sticky welcome. 30× wagering, 30-day window, BTC-native.",
              },
              {
                initial: "S",
                name: "Stake",
                score: "7.9",
                line: "No welcome bonus — but clean T&Cs, transparent VIP, fast payouts.",
              },
            ].map((alt) => (
              <div
                key={alt.name}
                className="rounded-md border border-line bg-bg-surface p-3"
              >
                <div className="mb-2 flex items-center justify-between">
                  <div className="flex items-center gap-[9px]">
                    <div className="flex h-7 w-7 items-center justify-center rounded-sm bg-accent-dim font-mono text-[12px] font-bold text-accent">
                      {alt.initial}
                    </div>
                    <div className="text-[13px] font-semibold text-fg">
                      {alt.name}
                    </div>
                  </div>
                  <div className="rounded-sm bg-accent-dim px-[7px] py-[3px] font-mono text-[11px] font-bold text-accent">
                    {alt.score}
                  </div>
                </div>
                <div className="mb-2 text-[11px] leading-[1.5] text-fg-muted">
                  {alt.line}
                </div>
                <div className="block cursor-not-allowed rounded-sm bg-bg-elevated py-2 text-center font-mono text-[11px] font-semibold uppercase tracking-[0.06em] text-accent">
                  Claim →
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
