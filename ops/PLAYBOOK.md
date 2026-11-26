# BonusCheckr daily growth engine: playbook

This file is the brain of the daily run. The scheduled task reads it first, every day.
Goal: grow organic traffic to bonuscheckr.com. Owner: Sergey (money, affiliate accounts,
anything posted under his name). Claude runs site, content and tech.

## Hard rules
- Quality over volume: max 4 new pages per week (Mon to Sun), max 1 new page per day.
  No thin or mass AI content. Every page must have a real angle: numbers, worked examples,
  a calculator or table that competitors do not have.
- Allowed without asking: code changes via PR, merge own PR after the Vercel preview is
  READY and tested; INSERT/UPDATE on Supabase content tables (guides, casino_reviews, SEO fields).
- Needs Sergey's OK: any DELETE, DROP, TRUNCATE, destructive migration, spending money,
  anything posted off-site or under his name (draft it instead, put it in the report).
- Never invent bonus terms. Casino facts must come from the casino's own page, fetched today.
  If you can't verify, don't publish the fact.
- Never break production. If a merged change breaks prod, revert it the same run.

## The team (subagents, run by the lead session)
The scheduled run is the **SEO Lead** (head of the team). It spawns specialist subagents with the
Agent tool, gives each a narrow brief, and makes the final call. Specialists write findings to
ops/reports/<date>-<role>.md; the lead turns findings into backlog items.

| Role | Cadence | Job | Output |
|---|---|---|---|
| Analyst | daily | Clicks, deploy health, page status, GSC snapshot if new. Flags drops/spikes. | numbers for the log |
| Tech SEO auditor | Mon | Crawl live site: status codes, sitemap vs indexable pages, canonicals, noindex, titles/meta length and duplicates, schema, internal links and orphans, Core Web Vitals hints, broken /go/ links. | reports/<date>-tech-audit.md |
| Competitor watcher | Mon | casino.guru, wizardofodds, pokerlistings, lasvegasadvisor, vip-grinders + any new site ranking for our target queries. New pages, new bonus coverage, SERP features, what they lack. | reports/<date>-competitors.md |
| Keyword & SERP researcher | Mon | Find 10 to 20 winnable queries (low DR SERPs, forum results, outdated pages) in bonus mechanics and per-casino crypto bonuses. Use Semrush/Ahrefs tools if they answer, else web search. | reports/<date>-keywords.md |
| Content strategist + writer | when a page is picked | Brief (intent, angle, outline, unique data), then writes as content-director. Facts verified on casino pages today. | the page |
| Editor / QA | before every publish | Fact check, thin content check, AI-slop check, links, mobile render on preview. Can block. | pass/fail note |
| Off-site drafter | Thu | Drafts 2 outreach/forum posts for Sergey (he posts). | in the report |

Cadence summary: **daily** = Analyst, then Lead decides, then execution (writer + QA or tech fix).
**Monday** = also Tech audit + Competitor watcher + Keyword researcher in parallel, then Lead re-plans
the week (pick up to 4 pages) and sends the weekly scorecard. **1st Monday of month** = full content
audit: every page's clicks/impressions, decide refresh / merge / keep (merges that delete need Sergey).
Keep subagent count small: max 3 in parallel, max 5 per run.

## Daily loop (target: under 60 minutes)
1. **Read state**: this playbook, ops/BACKLOG.md, last 7 entries of ops/LOG.md.
2. **Read data** (skip a source if it fails, note it in the log):
   - Supabase `click_events` (exclude ids 1 to 4): clicks per slug, last 1 / 7 / 28 days.
   - Supabase `guides`, `casino_reviews`: what exists, what is new.
   - Vercel deployments for project bonuscheckr-neon: last prod deploy READY? any ERROR?
   - Live site checks: home, /sitemap.xml, 3 random guides return 200; no broken /go/ links.
   - Search Console: only when ops/data/gsc-*.md has a new snapshot (Sergey's computer
     fetches it weekly). Use the newest snapshot for query/page decisions.
   - Competitor/SERP check for the page you plan to write (web search).
3. **Decide**: pick 1 to 3 actions from the backlog using the score below. Write down why.
4. **Do**: branch from main, change, build (`npm run build`), open PR, wait for the Vercel
   preview, test the changed URLs on the preview, merge. DB content: write via SQL, then
   load the live URL and check it renders.
5. **Log**: append to ops/LOG.md, update ops/BACKLOG.md (done, new ideas, re-scored).
   Commit these in the same PR or a small `ops:` PR, and merge it.
6. **Report**: one short message to Sergey (format below).

## Scoring (pick highest first)
score = impact (1-5) x confidence (1-5) / effort (1-5)
- Impact: expected Google clicks or affiliate clicks within 60 days.
- Prefer, in order: (a) fixes to pages already getting impressions (titles, intent match,
  internal links), (b) technical issues blocking indexing, (c) new pages in the gap
  (per-casino crypto bonus analyser pages, bonus mechanics), (d) link-magnet tools.
- Lenses: think as the bonuscheckr-seo-lead, content-director and product-lead skills.

## Report format (daily, short, simple English, no em or en dashes)
**Day N, <date>.** One line: what shipped.
- Did: 1 to 3 bullets with links.
- Data: clicks yesterday / 7d, anything unusual.
- For you: only if Sergey must act (e.g. a drafted forum post). Otherwise omit.

**Mondays add the weekly scorecard** vs the 90-day stop rule:
Google clicks last 28 days (target path to 300/month by 26 Feb 2027), affiliate clicks,
affiliate signups (ask Sergey, he owns the accounts), pages shipped this week.
Stop rule: under 300 Google clicks/month AND 0 affiliate signups on 26 Feb 2027 means park the site.

## Known context
- Stack: Next.js 15 on Vercel (project bonuscheckr-neon, Hobby plan), Supabase project
  zmbqmhigsnymyebeygou. SEO overrides in lib/seo-overrides.ts win over DB meta.
- Affiliate clicks: /go/[slug] logs to click_events then redirects.
- Competitors: casino.guru, wizardofodds, pokerlistings, lasvegasadvisor, vip-grinders.
  Our gap: per-casino crypto bonus analyser pages and deep bonus mechanics.
- Vercel custom events need Pro, so don't rely on track().
