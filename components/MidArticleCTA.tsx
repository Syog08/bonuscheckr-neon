import Link from "next/link";

export default function MidArticleCTA() {
  return (
    <div className="my-8 flex flex-col items-start justify-between gap-3 rounded-lg border border-accent-ring bg-accent-tint p-[18px] sm:flex-row sm:items-center sm:gap-4 sm:p-5">
      <div className="flex-1">
        <div className="mb-[5px] font-mono text-[10px] font-medium uppercase tracking-[0.1em] text-accent">
          Got a bonus to check?
        </div>
        <div className="mb-[3px] text-[14px] font-semibold text-fg sm:text-[15px]">
          Paste the terms or drop a screenshot
        </div>
        <div className="text-[12px] text-fg-muted sm:text-[13px]">
          Get a verdict before you deposit.
        </div>
      </div>
      <Link
        href="/"
        className="inline-flex items-center rounded-md bg-accent px-4 py-[10px] text-[13px] font-semibold text-bg-base transition-colors hover:bg-accent-hover"
      >
        Analyse bonus →
      </Link>
    </div>
  );
}
