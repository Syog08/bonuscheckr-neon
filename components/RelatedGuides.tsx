import Link from "next/link";

interface RelatedGuide {
  slug: string;
  title: string;
  blurb: string;
  readTime: string;
}

export default function RelatedGuides({ items }: { items: RelatedGuide[] }) {
  return (
    <section className="border-t border-line bg-bg-subtle px-4 py-9 sm:px-6">
      <div className="mx-auto max-w-[820px]">
        <div className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg-dim sm:text-[11px] sm:tracking-[0.12em]">
          Related guides
        </div>
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {items.map((g) => (
            <Link
              key={g.slug}
              href={`/guides/${g.slug}`}
              className="block rounded-md border border-line bg-bg-surface p-[14px] transition-colors hover:border-line-strong"
            >
              <div className="mb-[6px] font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-fg-dim">
                Guide · {g.readTime}
              </div>
              <div className="mb-[4px] text-[13px] font-semibold leading-[1.4] text-fg">
                {g.title}
              </div>
              <div className="text-[11px] text-fg-dim">{g.blurb}</div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
