import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllGuides } from "@/lib/guides";

export const metadata: Metadata = {
  title: "Guides — BonusCheckr",
  description:
    "Guides on casino bonus terms, wagering requirements, and how to spot a bad deal. Written for crypto and offshore casino players.",
  alternates: { canonical: "https://bonuscheckr.com/guides" },
};

export default async function GuidesIndexPage() {
  const guides = await getAllGuides();

  return (
    <>
      <div className="px-4 pt-[18px] sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-5 pb-10 sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-[10px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg-dim sm:text-[11px]">
            Guides
          </div>
          <h1 className="mb-[14px] text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-fg sm:mb-[18px] sm:text-[34px]">
            How casino bonuses actually work
          </h1>
          <p className="mb-7 text-[14px] leading-[1.6] text-fg-muted sm:text-[15px]">
            Wagering requirements, bonus types, red flags, and how to read the terms before depositing. No filler, no affiliate spam. Start with{" "}
            <Link
              href="/guides/sticky-vs-non-sticky-bonuses"
              className="text-accent underline-offset-[3px] hover:underline"
            >
              sticky vs non-sticky bonuses
            </Link>{" "}
            and{" "}
            <Link
              href="/guides/casino-bonus-wagering-requirements"
              className="text-accent underline-offset-[3px] hover:underline"
            >
              wagering requirements
            </Link>{" "}
            — they change the math on every offer below.
          </p>

          {guides.length === 0 ? (
            <div className="rounded-md border border-line bg-bg-surface p-5 text-[14px] text-fg-muted">
              Guides are being migrated. Check back shortly.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {guides.map((g) => (
                <Link
                  key={g.slug}
                  href={`/guides/${g.slug}`}
                  className="block rounded-md border border-line bg-bg-surface p-[14px] transition-colors hover:border-line-strong"
                >
                  <div className="mb-[6px] font-mono text-[9px] font-medium uppercase tracking-[0.08em] text-fg-dim">
                    Guide · {g.readTime}
                  </div>
                  <div className="mb-[6px] text-[14px] font-semibold leading-[1.35] text-fg sm:text-[15px]">
                    {g.title}
                  </div>
                  {g.description && (
                    <div className="text-[12px] leading-[1.5] text-fg-dim sm:text-[13px]">
                      {g.description}
                    </div>
                  )}
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
