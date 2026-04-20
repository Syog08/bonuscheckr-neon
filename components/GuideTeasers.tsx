import Link from "next/link";

const guides = [
  {
    slug: "sticky-vs-non-sticky-bonuses",
    title: "Sticky vs non-sticky bonuses",
    blurb: "The biggest factor in whether a bonus is worth claiming.",
    readTime: "8 min",
  },
  {
    slug: "casino-bonus-wagering-requirements",
    title: "Wagering requirements explained",
    blurb: "How 40× works, what it costs, why casinos don't spell it out.",
    readTime: "6 min",
  },
  {
    slug: "red-flags-bonus-terms",
    title: "Top 5 red flags in bonus terms",
    blurb: "Max bet traps, exclusions, time limits. Spot them fast.",
    readTime: "7 min",
  },
  {
    slug: "mastering-casino-bonus-expected-value-guide",
    title: "Expected value walkthrough",
    blurb: "The formula advantage players use. Worked crypto examples.",
    readTime: "10 min",
  },
];

export default function GuideTeasers() {
  return (
    <div className="border-t border-line px-4 py-8 sm:px-6 sm:py-10">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-[14px] sm:mb-[18px]">
          <div className="mb-[4px] font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg-dim sm:text-[11px] sm:tracking-[0.08em]">
            Mechanics
          </div>
          <h2 className="text-[18px] font-bold tracking-[-0.015em] text-fg sm:text-[22px]">
            Learn the maths
          </h2>
        </div>

        <div className="flex flex-col gap-2 sm:grid sm:grid-cols-2 sm:gap-[10px]">
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className="block rounded-lg border border-line bg-bg-surface p-[14px] transition-colors hover:border-line-strong sm:p-4"
            >
              <div className="mb-[6px] font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-fg-dim sm:mb-[8px] sm:text-[10px]">
                Guide · {guide.readTime}
              </div>
              <div className="mb-[4px] text-[13px] font-semibold leading-[1.35] text-fg sm:mb-[6px] sm:text-[14px]">
                {guide.title}
              </div>
              <div className="text-[11px] leading-[1.5] text-fg-dim sm:text-[12px]">
                {guide.blurb}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
