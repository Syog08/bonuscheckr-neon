export default function TLDRCallout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-8 rounded-md border border-accent-ring border-l-[3px] border-l-accent bg-accent-tint p-4 sm:p-[18px]">
      <div className="mb-[7px] font-mono text-[10px] font-semibold uppercase tracking-[0.12em] text-accent">
        TL;DR
      </div>
      <div className="text-[13px] leading-[1.65] text-fg-muted sm:text-[14px]">
        {children}
      </div>
    </div>
  );
}
