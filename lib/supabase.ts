import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: { persistSession: false },
});

export type GuideRow = {
  slug: string;
  title: string;
  meta_title: string | null;
  meta_description: string | null;
  description: string | null;
  content: string;
  tldr: string | null;
  author_id: string;
  publish_date: string | null;
  last_updated: string | null;
  primary_topic: string | null;
  target_keywords: string[] | null;
  word_count: number | null;
};

export type AuthorRow = {
  id: string;
  name: string;
  initials: string;
  bio: string | null;
  expertise: string | null;
};

export type CasinoReviewRow = {
  slug: string;
  casino_name: string;
  casino_slug: string;
  verdict: "good" | "fair" | "risky" | "avoid";
  verdict_title: string;
  verdict_summary: string;
  score: number;
  expected_value: string | null;
  total_wagering: string | null;
  terms_data: Array<{ flag: string | null; label: string; value: string }>;
  pros: string[];
  cons: string[];
  content: string;
  affiliate_url: string;
  affiliate_cta: string;
  author_id: string;
  meta_title: string | null;
  meta_description: string | null;
  publish_date: string | null;
  last_updated: string | null;
};
