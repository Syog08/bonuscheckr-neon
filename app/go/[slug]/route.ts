import { NextRequest, NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { BOOKS } from "@/lib/predictions";

// Affiliate redirect: /go/<review-slug> or /go/<book-key>.
// Logs each click to Supabase (click_events) for free click tracking on the
// Vercel Hobby plan, then sends the visitor to the casino.
export const dynamic = "force-dynamic";

const BOT_RE = /bot|crawl|spider|slurp|preview|facebookexternalhit|headless|lighthouse/i;

function hostOf(url: string | null): string | null {
  if (!url) return null;
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return null;
  }
}

function pathOf(url: string | null): string | null {
  if (!url) return null;
  try {
    const u = new URL(url);
    return u.hostname.endsWith("bonuscheckr.com") ? u.pathname : null;
  } catch {
    return null;
  }
}

export async function GET(req: NextRequest, { params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  let target: string | null = null;
  let casinoName: string | null = null;

  const { data: review } = await supabase
    .from("casino_reviews")
    .select("affiliate_url, casino_name")
    .eq("slug", slug)
    .eq("status", "published")
    .maybeSingle();

  if (review?.affiliate_url) {
    target = review.affiliate_url;
    casinoName = review.casino_name;
  } else if (BOOKS[slug]) {
    target = BOOKS[slug].affiliateUrl;
    casinoName = BOOKS[slug].name;
  }

  if (!target) {
    return NextResponse.redirect(new URL("/casinos", req.url), 302);
  }

  // Skip logging for prefetches (Next.js <Link>, browser speculation), which are not real clicks.
  const h = req.headers;
  const isPrefetch =
    h.has("next-router-prefetch") ||
    h.get("rsc") === "1" ||
    h.get("purpose") === "prefetch" ||
    (h.get("sec-purpose") || "").includes("prefetch");
  if (isPrefetch) {
    return new NextResponse(null, { status: 204, headers: { "Cache-Control": "no-store" } });
  }

  const referer = req.headers.get("referer");
  const ua = req.headers.get("user-agent") || "";
  try {
    await supabase.from("click_events").insert({
      review_slug: slug,
      casino_name: casinoName,
      source_page: pathOf(referer),
      referrer_host: hostOf(referer),
      country: req.headers.get("x-vercel-ip-country"),
      is_bot: BOT_RE.test(ua),
    });
  } catch {
    // Never block the redirect on logging.
  }

  const res = NextResponse.redirect(target, 302);
  res.headers.set("X-Robots-Tag", "noindex, nofollow");
  res.headers.set("Cache-Control", "no-store");
  return res;
}
