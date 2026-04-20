import { supabase, type CasinoReviewRow, type AuthorRow } from "./supabase";

export interface CasinoReview {
  slug: string;
  casinoName: string;
  casinoSlug: string;
  metaTitle: string;
  metaDescription: string;
  verdict: "good" | "fair" | "risky" | "avoid";
  verdictTitle: string;
  verdictSummary: string;
  score: string;
  expectedValue: string;
  totalWagering: string;
  termsData: Array<{ flag: string | null; label: string; value: string }>;
  pros: string[];
  cons: string[];
  content: string;
  affiliateUrl: string;
  affiliateCta: string;
  author: { name: string; initials: string };
  publishDate: string | null;
  lastUpdated: string | null;
  updated: string;
  readTime: string;
  faq: { question: string; answer: string }[];
  related: { slug: string; casinoName: string; score: string; verdict: "good" | "fair" | "risky" | "avoid"; blurb: string }[];
}

function formatUpdated(iso: string | null): string {
  if (!iso) return "Recently updated";
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" });
  return `Updated ${d.getDate()} ${month} ${d.getFullYear()}`;
}

function computeReadTime(content: string): string {
  const words = content.split(/\s+/).filter(Boolean).length;
  const min = Math.max(3, Math.round(words / 200));
  return `${min} min read`;
}

function extractFAQ(content: string): {
  body: string;
  faq: { question: string; answer: string }[];
} {
  const faqRegex = /\n##\s+(?:FAQ|Frequently Asked Questions|FAQs)\s*\n([\s\S]*?)(?=\n##\s+|$)/i;
  const match = content.match(faqRegex);
  if (!match) return { body: content, faq: [] };
  const faqBlock = match[1];
  const faq: { question: string; answer: string }[] = [];
  const qRegex = /###\s+([^\n]+)\n([\s\S]*?)(?=\n###\s+|$)/g;
  let m;
  while ((m = qRegex.exec(faqBlock)) !== null) {
    faq.push({ question: m[1].trim(), answer: m[2].trim() });
  }
  const body = content.replace(faqRegex, "").trim();
  return { body, faq };
}

export async function getCasinoReviewBySlug(slug: string): Promise<CasinoReview | null> {
  const { data: review, error } = await supabase
    .from("casino_reviews")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .eq("noindex", false)
    .maybeSingle();

  if (error || !review) return null;

  const { data: author } = await supabase
    .from("authors")
    .select("*")
    .eq("id", review.author_id)
    .maybeSingle();

  const row = review as CasinoReviewRow;
  const authorRow = author as AuthorRow | null;
  const { body, faq } = extractFAQ(row.content);

  // Related: 3 other reviews ordered by score desc
  const { data: relatedRows } = await supabase
    .from("casino_reviews")
    .select("slug, casino_name, score, verdict, verdict_summary")
    .eq("status", "published")
    .eq("noindex", false)
    .neq("slug", slug)
    .order("score", { ascending: false })
    .limit(3);

  const related = (relatedRows || []).map((r: { slug: string; casino_name: string; score: number; verdict: string; verdict_summary: string }) => ({
    slug: r.slug,
    casinoName: r.casino_name,
    score: r.score.toFixed(1),
    verdict: r.verdict as "good" | "fair" | "risky" | "avoid",
    blurb: r.verdict_summary.split(".")[0] + ".",
  }));

  return {
    slug: row.slug,
    casinoName: row.casino_name,
    casinoSlug: row.casino_slug,
    metaTitle: row.meta_title || row.verdict_title,
    metaDescription: row.meta_description || row.verdict_summary,
    verdict: row.verdict,
    verdictTitle: row.verdict_title,
    verdictSummary: row.verdict_summary,
    score: Number(row.score).toFixed(1),
    expectedValue: row.expected_value || "",
    totalWagering: row.total_wagering || "",
    termsData: row.terms_data,
    pros: row.pros,
    cons: row.cons,
    content: body,
    affiliateUrl: row.affiliate_url,
    affiliateCta: row.affiliate_cta,
    author: {
      name: authorRow?.name || "BonusCheckr Team",
      initials: authorRow?.initials || "BC",
    },
    publishDate: row.publish_date,
    lastUpdated: row.last_updated,
    updated: formatUpdated(row.last_updated || row.publish_date),
    readTime: computeReadTime(row.content),
    faq,
    related,
  };
}

export async function getAllCasinoReviews(): Promise<
  {
    slug: string;
    casinoName: string;
    score: string;
    verdict: "good" | "fair" | "risky" | "avoid";
    verdictTitle: string;
    blurb: string;
  }[]
> {
  const { data } = await supabase
    .from("casino_reviews")
    .select("slug, casino_name, score, verdict, verdict_title, verdict_summary")
    .eq("status", "published")
    .eq("noindex", false)
    .order("score", { ascending: false });

  return (data || []).map((r: { slug: string; casino_name: string; score: number; verdict: string; verdict_title: string; verdict_summary: string }) => ({
    slug: r.slug,
    casinoName: r.casino_name,
    score: r.score.toFixed(1),
    verdict: r.verdict as "good" | "fair" | "risky" | "avoid",
    verdictTitle: r.verdict_title,
    blurb: r.verdict_summary.split(".")[0] + ".",
  }));
}

export async function getAllCasinoReviewSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from("casino_reviews")
    .select("slug")
    .eq("status", "published")
    .eq("noindex", false);
  return (data || []).map((r: { slug: string }) => r.slug);
}
