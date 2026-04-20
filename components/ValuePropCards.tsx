const valueProps = [
  {
    title: "Zero spin",
    body: "Every verdict backed by actual maths. If a bonus is -EV, we say so. No affiliate bias.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
      </svg>
    ),
  },
  {
    title: "Crypto-native",
    body: "Built for BTC, ETH, and stablecoin players. Covers Stake-tier, Curaçao-licensed, no-KYC operators.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.1 9a3 3 0 0 1 5.82 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  {
    title: "EV maths",
    body: "Expected value per $100. Real completion probability. Actual max cashout ratios.",
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

export default function ValuePropCards() {
  return (
    <div className="flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-[10px]">
      {valueProps.map((vp) => (
        <div
          key={vp.title}
          className="rounded-lg border border-line bg-bg-surface p-[14px] sm:p-[18px]"
        >
          <div className="mb-[6px] flex items-center gap-[10px] sm:mb-[10px] sm:block">
            <div className="flex h-6 w-6 flex-shrink-0 items-center justify-center text-accent sm:h-7 sm:w-7">
              {vp.icon}
            </div>
            <div className="text-[14px] font-semibold text-fg">{vp.title}</div>
          </div>
          <div className="text-[12px] leading-[1.5] text-fg-muted">
            {vp.body}
          </div>
        </div>
      ))}
    </div>
  );
}
