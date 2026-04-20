import Link from "next/link";

interface VerdictHeroProps {
  casinoName: string;
  score: string; // "7.9"
  verdict: "good" | "fair" | "risky" | "avoid";
  verdictTitle: string;
  verdictSummary: string;
  affiliateUrl: string;
  affiliateCta: string;
  expectedValue: string;
  totalWagering: string;
}

const VERDICT_STYLES = {
  good: {
    pillBg: "bg-accent-tint",
    pillBorder: "border-accent-ring",
    pillText: "text-accent",
    label: "Good value",
    scoreText: "text-accent",
  },
  fair: {
    pillBg: "bg-[#2a1f0a]",
    pillBorder: "border-[#5a4a1f]",
    pillText: "text-warning",
    label: "Fair deal",
    scoreText: "text-warning",
  },
  risky: {
    pillBg: "bg-[#2a1410]",
    pillBorder: "border-[#6a2a26]",
    pillText: "text-danger",
    label: "Risky",
    scoreText: "text-danger",
  },
  avoid: {
    pillBg: "bg-danger-dim",
    pillBorder: "border-danger",
    pillText: "text-danger",
    label: "Avoid",
    scoreText: "text-danger",
  },
} as const;

export default function CasinoVerdictHero(props: VerdictHeroProps) {
  const style = VERDICT_STYLES[props.verdict];
  const initial = props.casinoName.charAt(0).toUpperCase();

  return (
    <section className="rounded-lg border border-line bg-bg-surface p-5 sm:p-7">
      {/* Top row: casino letter-mark + name + verdict pill */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-md border border-line bg-bg-elevated font-mono text-[18px] font-bold text-fg">
          {initial}
        </div>
        <div className="flex-1">
          <div className="font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-fg-dim">
            Casino review
          </div>
          <div className="text-[17px] font-bold tracking-tight text-fg sm:text-[18px]">
            {props.casinoName}
          </div>
        </div>
        <div
          className={`inline-flex items-center gap-[6px] rounded-full border ${style.pillBorder} ${style.pillBg} px-[10px] py-[4px] font-mono text-[11px] font-semibold uppercase tracking-[0.06em] ${style.pillText}`}
        >
          <span
            className={`h-[5px] w-[5px] rounded-full ${
              props.verdict === "good"
                ? "bg-accent"
                : props.verdict === "fair"
                  ? "bg-warning"
                  : "bg-danger"
            }`}
            aria-hidden="true"
          />
          {style.label}
        </div>
      </div>

      {/* Score + verdict title row */}
      <div className="mb-4 flex items-start gap-5">
        <div className="flex flex-col items-start">
          <div
            className={`font-mono text-[44px] font-bold leading-none tracking-tight ${style.scoreText} sm:text-[52px]`}
          >
            {props.score}
          </div>
          <div className="mt-[2px] font-mono text-[10px] text-fg-dim">/ 10</div>
        </div>
        <div className="flex-1 pt-[6px]">
          <h1 className="text-[20px] font-bold leading-[1.25] tracking-[-0.01em] text-fg sm:text-[22px]">
            {props.verdictTitle}
          </h1>
        </div>
      </div>

      {/* Summary */}
      <p className="mb-5 text-[13px] leading-[1.6] text-fg-muted sm:text-[14px]">
        {props.verdictSummary}
      </p>

      {/* Quick stats row */}
      <div className="mb-5 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <div className="rounded-md border border-line bg-bg-subtle p-3">
          <div className="mb-[3px] font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-fg-dim">
            Expected value
          </div>
          <div className="text-[12px] font-semibold leading-[1.4] text-fg sm:text-[13px]">
            {props.expectedValue}
          </div>
        </div>
        <div className="rounded-md border border-line bg-bg-subtle p-3">
          <div className="mb-[3px] font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-fg-dim">
            Total wagering
          </div>
          <div className="text-[12px] font-semibold leading-[1.4] text-fg sm:text-[13px]">
            {props.totalWagering}
          </div>
        </div>
      </div>

      {/* Primary affiliate CTA */}
      <Link
        href={props.affiliateUrl}
        rel="sponsored nofollow noopener"
        target="_blank"
        className="flex w-full items-center justify-center rounded-md bg-accent px-5 py-[14px] text-[14px] font-semibold text-bg-base transition-colors hover:bg-accent-hover sm:text-[15px]"
      >
        {props.affiliateCta} →
      </Link>
      <div className="mt-[10px] text-center font-mono text-[10px] text-fg-dim">
        Sponsored link · 18+ · play responsibly
      </div>
    </section>
  );
}
