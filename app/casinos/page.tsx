import type { Metadata } from "next";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAllCasinoReviews } from "@/lib/casinos";

export const revalidate = 300;
export const metadata: Metadata = {
  title: "Casino reviews — BonusCheckr",
  description:
    "Honest reviews of crypto and offshore casinos. Good, fair, risky, or avoid — scored on the bonus terms that actually matter.",
  alternates: { canonical: "https://bonuscheckr.com/casinos" },
};

const VERDICT_PILL: Record<string, { bg: string; border: string; text: string; label: string }> = {
  good: { bg: "bg-accent-tint", border: "border-accent-ring", text: "text-accent", label: "Good value" },
  fair: { bg: "bg-[#2a1f0a]", border: "border-[#5a4a1f]", text: "text-warning", label: "Fair deal" },
  risky: { bg: "bg-[#2a1410]", border: "border-[#6a2a26]", text: "text-danger", label: "Risky" },
  avoid: { bg: "bg-danger-dim", border: "border-danger", text: "text-danger", label: "Avoid" },
};

export default async function CasinosIndexPage() {
  const reviews = await getAllCasinoReviews();

  return (
    <>
      <div className="px-4 pt-[18px] sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Reviews" },
            ]}
          />
        </div>
      </div>

      <section className="px-4 py-5 pb-10 sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-[10px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg-dim sm:text-[11px]">
            Casino reviews
          </div>
          <h1 className="mb-[14px] text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-fg sm:mb-[18px] sm:text-[34px]">
            Crypto casinos, rated honestly
          </h1>
          <p className="mb-7 text-[14px] leading-[1.6] text-fg-muted sm:text-[15px]">
            Good, fair, risky, or avoid. Every verdict is based on the terms that actually decide whether you walk away with money. No 8/10 for everyone.
          </p>

          {reviews.length === 0 ? (
            <div className="rounded-md border border-line bg-bg-surface p-5 text-[14px] text-fg-muted">
              Reviews are being migrated. Check back shortly.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {reviews.map((r) => {
                const pill = VERDICT_PILL[r.verdict];
                return (
                  <Link
                    key={r.slug}
                    href={`/casinos/${r.slug}`}
                    className="block rounded-md border border-line bg-bg-surface p-[14px] transition-colors hover:border-line-strong"
                  >
                    <div className="mb-[10px] flex items-start justify-between gap-2">
                      <div className="flex items-center gap-[8px]">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-bg-elevated font-mono text-[13px] font-bold text-fg">
                          {r.casinoName.charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <div className="text-[14px] font-semibold text-fg sm:text-[15px]">
                            {r.casinoName}
                          </div>
                          <div
                            className={`mt-[2px] inline-flex items-center gap-[5px] rounded-full border ${pill.border} ${pill.bg} px-[7px] py-[2px] font-mono text-[9px] font-semibold uppercase tracking-[0.06em] ${pill.text}`}
                          >
                            <span
                              className={`h-[4px] w-[4px] rounded-full ${
                                r.verdict === "good"
                                  ? "bg-accent"
                                  : r.verdict === "fair"
                                    ? "bg-warning"
                                    : "bg-danger"
                              }`}
                              aria-hidden="true"
                            />
                            {pill.label}
                          </div>
                        </div>
                      </div>
                      <div className={`font-mono text-[20px] font-bold ${pill.text}`}>
                        {r.score}
                      </div>
                    </div>
                    <div className="text-[12px] leading-[1.45] text-fg-muted sm:text-[13px]">
                      {r.verdictTitle}
                    </div>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
