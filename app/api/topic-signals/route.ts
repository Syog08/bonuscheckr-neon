// Weekly topic signals from Google autocomplete (free, no key).
// Triggered by Vercel Cron. For each seed it asks Google's suggest endpoint with
// question prefixes and stores every suggestion in Supabase `topic_signals`.
// The daily growth run reads rows with status 'new' as topic ideas and marks
// them 'queued', 'covered' or 'skip'. Existing rows only get last_seen updated.

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const maxDuration = 60;
export const dynamic = "force-dynamic";

const SEEDS = [
  "casino bonus",
  "wagering requirement",
  "non sticky bonus",
  "sticky bonus",
  "no deposit bonus",
  "free spins wagering",
  "crypto casino bonus",
  "stake bonus",
  "rakeback",
  "cashback casino",
  "bonus abuse",
  "max bet rule casino",
];
const PREFIXES = ["", "how ", "what ", "why ", "is ", "can "];

async function suggest(q: string): Promise<string[]> {
  const url = `https://suggestqueries.google.com/complete/search?client=firefox&hl=en&gl=us&q=${encodeURIComponent(q)}`;
  try {
    const res = await fetch(url, { headers: { "user-agent": "Mozilla/5.0" } });
    if (!res.ok) return [];
    const json = await res.json();
    return Array.isArray(json?.[1]) ? json[1].map((s: unknown) => String(s).toLowerCase().trim()) : [];
  } catch {
    return [];
  }
}

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
    auth: { persistSession: false },
  });

  const found = new Map<string, string>();
  for (const seed of SEEDS) {
    const lists = await Promise.all(PREFIXES.map((p) => suggest(p + seed)));
    for (const s of lists.flat()) if (s && s !== seed && !found.has(s)) found.set(s, seed);
  }

  const now = new Date().toISOString();
  const rows = [...found].map(([suggestion, seed]) => ({ suggestion, seed, last_seen: now }));
  for (let i = 0; i < rows.length; i += 500) {
    const { error } = await supabase.from("topic_signals").upsert(rows.slice(i, i + 500), { onConflict: "suggestion" });
    if (error) return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true, seeds: SEEDS.length, suggestions: rows.length });
}
