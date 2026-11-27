// Daily Search Console sync.
// Triggered by Vercel Cron. Reads Search Console data with a read-only service
// account (env GSC_SERVICE_ACCOUNT_JSON, the full key JSON) and upserts it into
// Supabase tables gsc_totals (per day) and gsc_daily (per day, query, page).
// Search Console data lags 2 to 3 days, so each run re-pulls the last 5 days.
// Backfill once with ?days=90 (same auth header).

import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";
import { createSign } from "crypto";

export const maxDuration = 120;
export const dynamic = "force-dynamic";

const SITE = "sc-domain:bonuscheckr.com";
const SCOPE = "https://www.googleapis.com/auth/webmasters.readonly";

function b64url(input: string | Buffer) {
  return Buffer.from(input).toString("base64").replace(/=+$/, "").replace(/\+/g, "-").replace(/\//g, "_");
}

async function accessToken(): Promise<string> {
  const sa = JSON.parse(process.env.GSC_SERVICE_ACCOUNT_JSON || "{}");
  if (!sa.client_email || !sa.private_key) throw new Error("GSC_SERVICE_ACCOUNT_JSON missing or invalid");
  const now = Math.floor(Date.now() / 1000);
  const header = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(
    JSON.stringify({ iss: sa.client_email, scope: SCOPE, aud: "https://oauth2.googleapis.com/token", iat: now, exp: now + 3600 }),
  );
  const signer = createSign("RSA-SHA256");
  signer.update(`${header}.${claims}`);
  const jwt = `${header}.${claims}.${b64url(signer.sign(sa.private_key))}`;
  const res = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "content-type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: jwt }),
  });
  const json = await res.json();
  if (!json.access_token) throw new Error(`token error: ${JSON.stringify(json).slice(0, 200)}`);
  return json.access_token;
}

async function query(token: string, body: Record<string, unknown>) {
  const rows: any[] = [];
  for (let startRow = 0; ; startRow += 25000) {
    const res = await fetch(
      `https://www.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE)}/searchAnalytics/query`,
      {
        method: "POST",
        headers: { authorization: `Bearer ${token}`, "content-type": "application/json" },
        body: JSON.stringify({ ...body, rowLimit: 25000, startRow }),
      },
    );
    const json = await res.json();
    if (json.error) throw new Error(`gsc error: ${json.error.message}`);
    const batch = json.rows || [];
    rows.push(...batch);
    if (batch.length < 25000) return rows;
  }
}

const iso = (d: Date) => d.toISOString().slice(0, 10);

export async function GET(req: NextRequest) {
  if (req.headers.get("authorization") !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "unauthorized" }, { status: 401 });
  }
  const days = Math.min(Math.max(Number(req.nextUrl.searchParams.get("days")) || 5, 1), 480);
  const end = new Date();
  const start = new Date(end.getTime() - days * 86400000);
  const range = { startDate: iso(start), endDate: iso(end) };

  try {
    const token = await accessToken();
    const supabase = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!, {
      auth: { persistSession: false },
    });

    const totals = await query(token, { ...range, dimensions: ["date"] });
    const totalRows = totals.map((r) => ({
      date: r.keys[0], clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position,
      fetched_at: new Date().toISOString(),
    }));
    if (totalRows.length) {
      const { error } = await supabase.from("gsc_totals").upsert(totalRows);
      if (error) throw new Error(`totals upsert: ${error.message}`);
    }

    const detail = await query(token, { ...range, dimensions: ["date", "query", "page"] });
    const detailRows = detail.map((r) => ({
      date: r.keys[0], query: r.keys[1], page: r.keys[2], clicks: r.clicks, impressions: r.impressions,
      ctr: r.ctr, position: r.position, fetched_at: new Date().toISOString(),
    }));
    for (let i = 0; i < detailRows.length; i += 1000) {
      const { error } = await supabase.from("gsc_daily").upsert(detailRows.slice(i, i + 1000));
      if (error) throw new Error(`daily upsert: ${error.message}`);
    }

    return NextResponse.json({ ok: true, range, totals: totalRows.length, rows: detailRows.length });
  } catch (e: any) {
    return NextResponse.json({ ok: false, error: String(e?.message || e) }, { status: 500 });
  }
}
