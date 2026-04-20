import { supabase, type GuideRow, type AuthorRow } from "./supabase";

// Shape expected by the existing guide page template
export interface Guide {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  tldr: string;
  content: string;
  author: { name: string; initials: string };
  updated: string;
  readTime: string;
  faq: { question: string; answer: string }[];
  related: { slug: string; title: string; blurb: string; readTime: string }[];
}

// Format date as "Updated 12 Apr 2026"
function formatUpdated(iso: string | null): string {
  if (!iso) return "Recently updated";
  const d = new Date(iso);
  const month = d.toLocaleString("en-US", { month: "short" });
  return `Updated ${d.getDate()} ${month} ${d.getFullYear()}`;
}

// Rough read time: 200 wpm average, minimum 3 min
function computeReadTime(wordCount: number | null): string {
  if (!wordCount) return "5 min read";
  const min = Math.max(3, Math.round(wordCount / 200));
  return `${min} min read`;
}

// Extract FAQ section from markdown — looks for ## FAQ with ### subheadings.
// Returns the FAQ items AND the content with the FAQ section stripped.
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
    faq.push({
      question: m[1].trim(),
      answer: m[2].trim(),
    });
  }

  const body = content.replace(faqRegex, "").trim();
  return { body, faq };
}

// Very simple TL;DR extractor: if guide has a ">" blockquote near top that starts
// with "TL;DR:", use it. Otherwise use the description field or first paragraph.
function extractTLDR(content: string, description: string | null): string {
  const tldrMatch = content.match(/>\s*\*\*TL;DR[:\s]*\*\*([^\n]+(?:\n[^\n>]+)*)/i);
  if (tldrMatch) return tldrMatch[1].trim();

  if (description && description.length > 50) return description;

  // Fall back to first sentence of content
  const firstPara = content.split("\n\n").find((p) => p.trim() && !p.startsWith("#"));
  if (firstPara) return firstPara.trim().substring(0, 400);
  return description || "";
}

export async function getGuideBySlug(slug: string): Promise<Guide | null> {
  const { data: guide, error } = await supabase
    .from("guides")
    .select("*")
    .eq("slug", slug)
    .eq("status", "published")
    .eq("noindex", false)
    .maybeSingle();

  if (error || !guide) return null;

  const { data: author } = await supabase
    .from("authors")
    .select("*")
    .eq("id", guide.author_id)
    .maybeSingle();

  const row = guide as GuideRow;
  const authorRow = author as AuthorRow | null;
  const { body, faq } = extractFAQ(row.content);
  const tldr = extractTLDR(body, row.description);

  // Load 4 related guides (same primary_topic, else most recent)
  const { data: relatedRows } = await supabase
    .from("guides")
    .select("slug, title, description, word_count")
    .eq("status", "published")
    .eq("noindex", false)
    .neq("slug", slug)
    .limit(4);

  const related = (relatedRows || []).map((r: { slug: string; title: string; description: string | null; word_count: number | null }) => ({
    slug: r.slug,
    title: r.title,
    blurb: r.description || "",
    readTime: computeReadTime(r.word_count),
  }));

  return {
    slug: row.slug,
    title: row.title,
    meta_title: row.meta_title || row.title,
    meta_description: row.meta_description || row.description || "",
    tldr,
    content: body,
    author: {
      name: authorRow?.name || "BonusCheckr Team",
      initials: authorRow?.initials || "BC",
    },
    updated: formatUpdated(row.last_updated || row.publish_date),
    readTime: computeReadTime(row.word_count),
    faq,
    related,
  };
}

export async function getAllGuides(): Promise<
  { slug: string; title: string; description: string; readTime: string }[]
> {
  const { data } = await supabase
    .from("guides")
    .select("slug, title, description, word_count, publish_date")
    .eq("status", "published")
    .eq("noindex", false)
    .order("publish_date", { ascending: false });

  return (data || []).map((r: { slug: string; title: string; description: string | null; word_count: number | null }) => ({
    slug: r.slug,
    title: r.title,
    description: r.description || "",
    readTime: computeReadTime(r.word_count),
  }));
}

export async function getAllGuideSlugs(): Promise<string[]> {
  const { data } = await supabase
    .from("guides")
    .select("slug")
    .eq("status", "published")
    .eq("noindex", false);
  return (data || []).map((r: { slug: string }) => r.slug);
}
