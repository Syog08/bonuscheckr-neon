# Daily log (newest at bottom)

## Baseline, 26 Nov 2026
- GSC 90d: 100 clicks, 17.1K impr, CTR 0.6%, pos 13.2. 28d: 25 clicks.
- 37 guides + 7 casino reviews published. 4 mechanics guides went live 26 Nov.
- Affiliate clicks (click_events, excl. test ids 1 to 4): 0.
- Engine set up today. Approvals automatic (merges + DB inserts/updates).

## Day 1, 26 Nov 2026 (manual first run)
- Did: added a "Quick answer" definition box at the top of sticky-vs-non-sticky-bonuses (target query "non sticky bonus", 1,356 impr, 0 clicks). Title/meta override was already live.
- Did: "Read next" links from cashback-bonuses, casino-bonus-wagering-requirements, sticky-vs-non-sticky-bonuses, good-vs-bad-bonuses to the 4 new mechanics guides.
- Check tomorrow: the live sticky page shows "Quick answer" (ISR cache was still old at 22:45 UTC).
- Learned: cloud proxy blocks curl to bonuscheckr.com; use Vercel web_fetch_vercel_url.
- Next: backlog #6 (wagering calculator landing) or #4 (Stake analyser page template).

## Day 2, Fri 27 Nov 2026
- Data: affiliate clicks 0 (1d and 7d). Prod deploy READY (#27). Sticky page now shows "Quick answer" and "Read next" (checked live).
- Did: fixed meta titles cut off in Google on game-contribution-wagering (66 to 52 chars), good-vs-bad-bonuses (68 to 54, description 105 to 148), free-spins-vs-bonus-money DB title (code override already wins).
- No new page: weekly cap of 4 already used (26 Nov).
- Learned: curl to casino sites is blocked too; fact checks need the web-fetch agent or WebSearch.
- Next: Mon 30 Nov weekly run (audit, competitors, keywords, GSC snapshot), then backlog #4 Stake analyser page.
