import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import TLDRCallout from "@/components/TLDRCallout";
import MarkdownRenderer from "@/components/MarkdownRenderer";
import MidArticleCTA from "@/components/MidArticleCTA";
import FAQBlock from "@/components/FAQBlock";
import RelatedGuides from "@/components/RelatedGuides";
import { getGuideBySlug, getAllGuideSlugs } from "@/lib/guides";

export async function generateStaticParams() {
  const slugs = await getAllGuideSlugs();
  return slugs.map((slug) => ({ slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) return {};
  const url = `https://bonuscheckr.com/guides/${guide.slug}`;
  return {
    title: guide.meta_title,
    description: guide.meta_description,
    alternates: { canonical: url },
    openGraph: {
      title: guide.meta_title,
      description: guide.meta_description,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title: guide.meta_title,
      description: guide.meta_description,
    },
  };
}

export default async function GuidePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const guide = await getGuideBySlug(slug);
  if (!guide) notFound();

  const readTime = Math.max(1, Math.ceil(guide.content.split(/\s+/).length / 220));

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: guide.title,
    description: guide.description || guide.meta_description,
    datePublished: guide.publish_date,
    dateModified: guide.last_updated || guide.publish_date,
    author: {
      "@type": "Person",
      name: guide.author.name,
      jobTitle: guide.author.expertise,
    },
    publisher: {
      "@type": "Organization",
      name: "BonusCheckr",
      url: "https://bonuscheckr.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://bonuscheckr.com/guides/${guide.slug}`,
    },
  };

  // Split body markdown to insert mid-article CTA after the first H2 section.
  const lines = guide.content.split("\n");
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
    secondH2Index > -1 ? lines.slice(0, secondH2Index).join("\n") : guide.content;
  const bodyAfterCTA =
    secondH2Index > -1 ? lines.slice(secondH2Index).join("\n") : "";

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <div className="px-4 pt-[18px] sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Guides", href: "/guides" },
              { label: guide.title.split("—")[0].trim() },
            ]}
          />
        </div>
      </div>

      <article className="px-4 py-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-4 flex flex-wrap items-center gap-3 text-[12px] text-fg-dim">
            <div className="flex items-center gap-[7px]">
              <div className="flex h-[22px] w-[22px] items-center justify-center rounded-full border border-line bg-bg-surface font-mono text-[10px] font-semibold text-fg-muted">
                {guide.author.initials}
              </div>
              <span className="text-fg">{guide.author.name}</span>
            </div>
            <span className="text-line-strong">·</span>
            <span>{guide.updated}</span>
            <span className="text-line-strong">·</span>
            <span>{readTime} min read</span>
          </div>

          <h1 className="mb-[22px] text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-fg sm:mb-[26px] sm:text-[34px] lg:text-[36px]">
            {guide.title}
          </h1>

          <TLDRCallout>
            <MarkdownRenderer content={guide.tldr} />
          </TLDRCallout>

          <MarkdownRenderer content={bodyBeforeCTA} />

          {bodyAfterCTA && <MidArticleCTA />}

          {bodyAfterCTA && <MarkdownRenderer content={bodyAfterCTA} />}

          <FAQBlock items={guide.faq} />
        </div>
      </article>

      <RelatedGuides items={guide.related} />
    </>
  );
}
