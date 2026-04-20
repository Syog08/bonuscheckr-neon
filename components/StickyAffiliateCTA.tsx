import Link from "next/link";

export default function StickyAffiliateCTA({
  affiliateUrl,
  casinoName,
  score,
}: {
  affiliateUrl: string;
  casinoName: string;
  score: string;
}) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-bg-base/95 px-3 py-[10px] backdrop-blur sm:hidden">
      <Link
        href={affiliateUrl}
        rel="sponsored nofollow noopener"
        target="_blank"
        className="flex items-center justify-between rounded-md bg-accent px-4 py-[11px] text-[13px] font-semibold text-bg-base"
      >
        <span>Visit {casinoName}</span>
        <span className="flex items-center gap-[10px]">
          <span className="font-mono text-[11px] opacity-80">{score}/10</span>
          <span>→</span>
        </span>
      </Link>
    </div>
  );
}
