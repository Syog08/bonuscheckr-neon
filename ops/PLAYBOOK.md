# BonusCheckr daily growth engine: playbook

This file is the brain of the daily run. The scheduled task runs workdays (Mon to Fri) at 10:03 Malta
time, when Sergey's laptop is most likely open (his Chrome is needed for outreach), and reads this first.
Goal: grow organic traffic to bonuscheckr.com. Owner: Sergey (money, affiliate accounts,
anything posted under his name). Claude runs site, content and tech.

## Hard rules
- Quality over volume: max 4 new pages per week (Mon to Sun), max 1 new page per day.
  No thin or mass AI content. Every page must have a real angle: numbers, worked examples,
  a calculator or table that competitors do not have.
- Allowed without asking: code changes via PR, merge own PR after the Vercel preview is
  READY and tested; INSERT/UPDATE on Supabase content tables (guides, casino_reviews, SEO fields).
- Needs Sergey's OK: any DELETE, DROP, TRUNCATE, destructive migration, spending money,
  any other off-site posting under his name. Exception: forum/Q&A outreach per the
  "Outreach" section below is automated (Sergey's OK, 27 Nov 2026).
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
| Keyword & SERP researcher | Mon | Refreshes ops/TOPICS.md per the Content pipeline: GSC opportunities, new autocomplete signals, forum questions, SERP check, Semrush within budget. Also runs the decay check. | reports/<date>-keywords.md + TOPICS.md |
| Content strategist + writer | when a page is picked | Brief (intent, angle, outline, unique data), then writes as content-director. Facts verified on casino pages today. | the page |
| Editor / QA | before every publish | Runs the Content pipeline quality gate checklist. Can block. | pass/fail note in the PR or LOG |
| Outreach poster | Tue to Fri | Posts 1 helpful forum/Q&A reply per day as BonusCheckr, per the Outreach section. | ops/OUTREACH.md |

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
     The cloud proxy blocks curl to bonuscheckr.com: use the Vercel tool web_fetch_vercel_url
     (save output to a file and grep it). Guides use ISR (revalidate 3600), so DB edits show within 1 hour.
   - curl is blocked for casino and competitor sites too: verify facts with the web-fetch agent
     or WebSearch. If neither can reach the casino's page, don't publish the fact.
   - Guide pages already render a "Related guides" block: in-content link lists use "## Read next".
   - Search Console: Supabase tables `gsc_totals` (date, clicks, impressions, ctr, position) and
     `gsc_daily` (date, query, page, ...), filled daily 04:30 UTC by /api/gsc-sync (data lags 2 to 3 days).
     If the newest date is older than 4 days, the sync is broken: check Vercel logs, tell Sergey if you can't fix it.
   - Affiliate signups: Mondays, read stake.com/affiliate/referred-users in Sergey's Chrome if available.
   - Competitor/SERP check for the page you plan to write (web search).
3. **Decide**: pick 1 to 3 actions from the backlog using the score below. Write down why.
4. **Do**: branch from main, change, build (`npm run build`), open PR, wait for the Vercel
   preview, test the changed URLs on the preview, merge. DB content: write via SQL, then
   load the live URL and check it renders.
5. **Log**: append to ops/LOG.md, update ops/BACKLOG.md (done, new ideas, re-scored).
   Commit these in the same PR or a small `ops:` PR, and merge it.
6. **Outreach** (Tue to Fri only): follow the Outreach section.
7. **Report**: only per the reporting rules below (Mon/Thu or an issue).

## Content pipeline (Sergey's OK, 27 Nov 2026)
Three parts. Every new page and every refresh goes through all of them.

### 1. Topic queue (ops/TOPICS.md)
- Sources, in this order of trust:
  1. **Search Console** (`gsc_daily`): queries where we already get impressions at position 8 to 30
     but have no page that answers them directly. Best signal we have.
  2. **Google autocomplete** (`topic_signals`, filled Mondays 04:45 UTC by /api/topic-signals, free):
     real phrasing people type. Read rows with status 'new', set them to 'queued', 'covered' or 'skip'.
  3. **Forum and Quora questions** seen during outreach (log the question URL in TOPICS.md).
  4. **Web search**: People Also Ask and "related searches" for the seed, plus who ranks top 10.
  5. **Semrush** for volume and difficulty only (see budget below).
- Score each topic: win chance (1 to 5: weak or forum results in top 10 = high, casino.guru and
  big brands only = low) x demand (1 to 5: volume or impressions) x fit (1 to 5: bonus maths angle,
  links to our calculator or a review with an affiliate link). Keep the top 15 in TOPICS.md.
- Monday's Keyword researcher refreshes the queue. Daily runs pick from the top.

### 2. Quality gate (Editor / QA must pass all, or the page does not ship)
- [ ] **Answer first**: the first 2 lines answer the query in plain words.
- [ ] **Real numbers**: at least one worked example with the maths shown (bonus x wagering x house edge).
      Recompute every number yourself before publishing.
- [ ] **Real terms**: any casino-specific fact (wagering, max bet, expiry, games) comes from the
      casino's own T&C page fetched today, with the URL noted in the PR or LOG. If not reachable, leave it out.
- [ ] **Something competitors lack**: a table, calculator link, comparison or edge case not in the
      current top 5 results. Write down what it is.
- [ ] **No generic AI text**: no "in today's world", "it's important to note", "navigating", "delve",
      no filler intros, no repeated sentences, no unsupported "best". Read it aloud test: would a
      bonus player trust it?
- [ ] **Links**: 2 to 4 internal links (guides, calculator, relevant review), "## Read next" section.
- [ ] **Meta**: title under 60 chars with the main query, meta description under 155 chars, matches the content.
- [ ] **Responsible gambling** line where it talks about playing.
- [ ] Renders correctly on mobile on the preview or live URL.

### 3. Refresh old pages (decay check, weekly on Mondays)
- From `gsc_daily`, compare each page's last 28 days to the 28 days before.
- Refresh if: clicks down 30% or more (and at least 10 clicks before), or average position
  worse by 3+ places, or impressions up but CTR under 1% (title/meta problem), or casino terms
  older than 90 days.
- A refresh = re-check facts, update numbers and dates, answer new queries the page now gets
  impressions for, improve title/meta. It counts as an action, not as a new page.
- Log the before/after numbers in LOG.md and re-check 4 weeks later.

### Data budget (no money without Sergey's OK)
| Source | Cost | Rule |
|---|---|---|
| Search Console, Supabase, autocomplete, web search | free | use freely |
| Semrush | prepaid units (3,940 left on 27 Nov 2026) | max 250 units per week: `phrase_these` (10/keyword) for volume, `phrase_kdi` (50/keyword) only for the top 2 picks. Never `phrase_questions` or `phrase_related` (40/row). Stop at 1,000 units left and tell Sergey. |
| Ahrefs | free plan, 0 units | only free tools (public domain rating). Don't call paid endpoints. |
| Apify (scraping casino T&C pages) | paid credits | not used. Ask Sergey before any run. |

## Outreach (automated, Sergey's OK 27 Nov 2026)
Accounts are logged in inside Sergey's Chrome (Claude in Chrome tools). All use the name
BonusCheckr, no real name, and always disclose "I run BonusCheckr". Reddit is blocked for Claude.

| Day | Platform | Action |
|---|---|---|
| Tue | Quora | 1 answer to an unanswered or weakly answered bonus question |
| Wed | Bitcointalk (Gambling discussion) | 1 reply in an active bonus thread |
| Thu | Casinomeister if approved, else Quora | 1 reply / answer |
| Fri | Bitcointalk | 1 reply |

Rules:
- Max 1 post per day in total, max 2 per platform per week. No weekend posts (no run). Quality over volume.
- Real help first: maths, worked numbers, the exact rule to check. No hype, no "best casino" pitches,
  no affiliate (/go/) links ever. Links only to our free guides or tools, and only when they
  answer the question better than the post itself.
- Warm-up: Bitcointalk and Casinomeister first 3 posts have no link. Quora from answer 3.
  After warm-up, at most 1 post in 3 has a link.
- Check ops/OUTREACH.md first: never answer the same thread twice, never repeat the same text.
- Simple English, no em or en dashes. Quora's editor numbers lists itself: don't type "1.".
- If someone replies to our post with a real question, one short polite answer is fine.
  Never argue, never DM first.
- Stop and tell Sergey right away (do not retry) if: Chrome is not logged in, a CAPTCHA,
  a mod warning, a deleted post, a ban, or a "spam" flag. Never type passwords or codes.
- If Chrome is not reachable (Sergey's computer off), skip, log "outreach skipped", carry on.
- Log every post in ops/OUTREACH.md: date, platform, thread URL, link yes/no, one-line topic.
- Monday update: one line with posts this week and any replies or referral traffic.

## Scoring (pick highest first)
score = impact (1-5) x confidence (1-5) / effort (1-5)
- Impact: expected Google clicks or affiliate clicks within 60 days.
- Prefer, in order: (a) fixes to pages already getting impressions (titles, intent match,
  internal links), (b) technical issues blocking indexing, (c) new pages in the gap
  (per-casino crypto bonus analyser pages, bonus mechanics), (d) link-magnet tools.
- Lenses: think as the bonuscheckr-seo-lead, content-director and product-lead skills.

## Reporting to Sergey (his rule, 26 Nov 2026)
- **No daily messages.** Daily work goes to ops/LOG.md only.
- **Twice a week, Monday and Thursday:** one small update, simple English, no em or en dashes:
  **Update, <date>.** One line on the main result.
  - Shipped: 2 to 4 bullets with links.
  - Numbers: Google clicks 7d / 28d, affiliate clicks 7d, pages shipped this week.
  - For you: only if Sergey must act.
- **Monday update also carries the scorecard** vs the 90-day stop rule: Google clicks last 28 days
  (path to 300/month by 26 Feb 2027), affiliate clicks, affiliate signups (ask Sergey, he owns the
  accounts). Stop rule: under 300 Google clicks/month AND 0 affiliate signups on 26 Feb 2027 means park the site.
- **Message right away only for an issue that needs him:** site down, broken prod you could not
  fix, a needed delete or spend, an affiliate link that stopped working, a Google penalty sign.

## Known context
- Stack: Next.js 15 on Vercel (project bonuscheckr-neon, Hobby plan), Supabase project
  zmbqmhigsnymyebeygou. SEO overrides in lib/seo-overrides.ts win over DB meta.
- Affiliate clicks: /go/[slug] logs to click_events then redirects.
- Competitors: casino.guru, wizardofodds, pokerlistings, lasvegasadvisor, vip-grinders.
  Our gap: per-casino crypto bonus analyser pages and deep bonus mechanics.
- Vercel custom events need Pro, so don't rely on track().
