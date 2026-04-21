import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import CasinoVerdictHero from "@/components/CasinoVerdictHero";
import TermsAtGlance from "@/components/TermsAtGlance";
import ProsCons from "@/components/ProsCons";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import MidArticleCTA from "@/components/MidArticleCTA";
import StickyAffiliateCTA from "@/components/StickyAffiliateCTA";
import Link from "next/link";
import { getCasinoReviewBySlug, getAllCasinoReviewSlugs } from "@/lib/casinos";

export async function generateStaticParams() {
  const slugs = await getAllCasinoReviewSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const review = await getCasinoReviewBySlug(slug);
  if (!review) return {};
  const url = `https://bonuscheckr.com/casinos/${review.slug}`;
  return {
    title: review.metaTitle,
    description: review.metaDescription,
    alternates: { canonical: url },
    openGraph: {
      title: review.metaTitle,
      description: review.metaDescription,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: review.metaTitle,
      description: review.metaDescription,
    },
  };
}

const VERDICT_PILL: Record<string, { bg: string; border: string; text: string; dot: string }> = {
  good: { bg: "bg-accent-tint", border: "border-accent-ring", text: "text-accent", dot: "bg-accent" },
  fair: { bg: "bg-[#2a1f0a]", border: "border-[#5a4a1f]", text: "text-warning", dot: "bg-warning" },
  risky: { bg: "bg-[#2a1410]", border: "border-[#6a2a26]", text: "text-danger", dot: "bg-danger" },
  avoid: { bg: "bg-danger-dim", border: "border-danger", text: "text-danger", dot: "bg-danger" },
};

export default async function CasinoReviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const review = await getCasinoReviewBySlug(slug);
  if (!review) notFound();

  const readTime = Math.max(1, Math.ceil(review.content.split(/\s+/).length / 220));

  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Review",
    itemReviewed: {
      "@type": "Organization",
      name: review.casinoName,
    },
    reviewRating: {
      "@type": "Rating",
      ratingValue: review.score,
      bestRating: 10,
      worstRating: 1,
    },
    author: {
      "@type": "Person",
      name: review.author.name,
    },
    datePublished: review.publishDate,
    dateModified: review.lastUpdated || review.publishDate,
    publisher: {
      "@type": "Organization",
      name: "BonusCheckr",
      url: "https://bonuscheckr.com",
    },
    reviewBody: review.verdictSummary,
  };

  // Split body markdown to insert mid-article CTA after first H2 section.
  const lines = review.content.split("\n");
  let secondH2Index = -1;
  let h2Count = 0;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("## ")) {
      h2Count++;
      if (h2Count === 2) {
        secondH2Index = i;
        break;
      }
    }
  }
  const bodyBeforeCTA =
    secondH2Index > -1 ? lines.slice(0, secondH2Index).join("\n") : review.content;
  const bodyAfterCTA =
    secondH2Index > -1 ? lines.slice(secondH2Index).join("\n") : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <div className="px-4 pt-[18px] sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Reviews", href: "/casinos" },
              { label: review.casinoName },
            ]}
          />
        </div>
      </div>

      <article className="px-4 pb-24 pt-4 sm:px-6 sm:pb-10">
        <div className="mx-auto max-w-[820px]">
          {/* Byline */}
          <div className="mb-4 flex flex-wrap items-center gap-3 text-[12px] text-fg-dim">
            <div className="flex items-center gap-[7px]">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-line bg-bg-surface font-mono text-[10px] font-semibold text-fg-muted">
                {review.author.initials}
              </div>
              <span className="text-fg">{review.author.name}</span>
            </div>
            <span className="text-line-strong">·</span>
            <span>{review.updated}</span>
            <span className="text-line-strong">·</span>
            <span>{readTime} min read</span>
          </div>

          {/* Verdict hero */}
          <CasinoVerdictHero
            casinoName={review.casinoName}
            score={review.score}
            verdict={review.verdict}
            verdictTitle={review.verdictTitle}
            verdictSummary={review.verdictSummary}
            affiliateUrl={review.affiliateUrl}
            affiliateCta={review.affiliateCta}
            expectedValue={review.expectedValue}
            totalWagering={review.totalWagering}
          />

          {/* Terms at glance */}
          <TermsAtGlance terms={review.termsData} />

          {/* Pros/cons */}
          <ProsCons pros={review.pros} cons={review.cons} />

          {/* Full analysis heading */}
          <h2 className="mb-4 mt-10 text-[20px] font-bold tracking-[-0.015em] text-fg sm:text-[22px]">
            The full analysis
          </h2>

          {/* Body part 1 */}
          <MarkdownRenderer content={bodyBeforeCTA} />

          {bodyAfterCTA && <MidArticleCTA />}

          {bodyAfterCTA && <MarkdownRenderer content={bodyAfterCTA} />}

        </div>
      </article>

      {/* Related reviews */}
      <section className="border-t border-line bg-bg-subtle px-4 py-9 sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-4 font-mono text-[10px] font-medium uppercase tracking-[0.14em] text-fg-dim sm:text-[11px] sm:tracking-[0.12em]">
            Other casino reviews
          </div>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {review.related.map((r) => {
              const pill = VERDICT_PILL[r.verdict];
              return (
                <Link
                  key={r.slug}
                  href={`/casinos/${r.slug}`}
                  className="block rounded-md border border-line bg-bg-surface p-4 transition-colors hover:border-line-strong"
                >
                  <div className="mb-[8px] flex items-start justify-between gap-2">
                    <div className="flex items-center gap-[8px]">
                      <div className="flex h-7 w-7 items-center justify-center rounded-md border border-line bg-bg-elevated font-mono text-[12px] font-bold text-fg">
                        {r.casinoName.charAt(0)}
                      </div>
                      <div className="text-[14px] font-semibold text-fg">
                        {r.casinoName}
                      </div>
                    </div>
                    <div className={`font-mono text-[14px] font-bold ${pill.text}`}>
                      {r.score}
                    </div>
                  </div>
                  <div className="text-[12px] leading-[1.4] text-fg-dim">{r.blurb}</div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ */}
      {review.faqs && review.faqs.length > 0 && (
        <>
          <section className="border-t border-line px-4 py-9 sm:px-6">
            <div className="mx-auto max-w-[820px]">
              <h2 className="mb-4 text-[20px] font-bold tracking-[-0.015em] text-fg sm:text-[22px]">
                FAQ
              </h2>
              <div className="flex flex-col gap-2">
                {review.faqs.map((item: { q: string; a: string }, i: number) => (
                  <details
                    key={i}
                    className="rounded-md border border-line bg-bg-surface p-4 sm:p-[18px]"
                  >
                    <summary className="flex cursor-pointer list-none items-start justify-between gap-2 font-semibold text-fg">
                      <span>{item.q}</span>
                      <span className="ml-4 font-mono text-[12px] font-bold text-accent">+</span>
                    </summary>
                    <p className="mt-3 text-[13px] leading-[1.65] text-fg-muted">{item.a}</p>
                  </details>
                ))}
              </div>
            </div>
          </section>

          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "FAQPage",
                mainEntity: review.faqs.map((item: { q: string; a: string }) => ({
                  "@type": "Question",
                  name: item.q,
                  acceptedAnswer: { "@type": "Answer", text: item.a },
                })),
              }),
            }}
          />
        </>
      )}

      {/* Mobile sticky CTA */}
      <StickyAffiliateCTA
        affiliateUrl={review.affiliateUrl}
        casinoName={review.casinoName}
        score={review.score}
      />
    </>
  );
}
