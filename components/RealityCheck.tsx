export default function RealityCheck() {
  return (
    <div className="border-t border-line bg-bg-subtle px-4 py-[22px] sm:px-6 sm:py-8">
      <div className="mx-auto max-w-[720px]">
        <div className="mb-[8px] font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-danger sm:text-[11px] sm:tracking-[0.12em]">
          Wagering reality check
        </div>
        <h2 className="mb-[10px] text-[17px] font-bold leading-[1.3] tracking-[-0.015em] text-fg sm:text-[20px]">
          40× wagering on 1 BTC = 40 BTC of turnover.
        </h2>
        <p className="text-[13px] leading-[1.6] text-fg-muted sm:text-[14px] sm:leading-[1.65]">
          At <span className="font-mono text-fg">2.5%</span> slot house edge,
          expected loss from grinding 40 BTC is{" "}
          <strong className="font-semibold text-fg">1 BTC</strong> — exactly
          your bonus.{" "}
          <strong className="font-semibold text-fg">
            Completion rate on a 7-day timer: ~35%.
          </strong>
        </p>
      </div>
    </div>
  );
}
