// Temporary hardcoded casino review for preview.
// Replaced by Supabase query in content migration step.

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
  content: string; // markdown body
  affiliateUrl: string;
  affiliateCta: string;
  author: { name: string; initials: string };
  updated: string;
  readTime: string;
  faq: { question: string; answer: string }[];
  related: { slug: string; casinoName: string; score: string; verdict: "good" | "fair" | "risky" | "avoid"; blurb: string }[];
}

const sampleReview: CasinoReview = {
  slug: "stake-welcome-bonus",
  casinoName: "Stake",
  casinoSlug: "stake",
  metaTitle:
    "Stake casino analysis 2026 — no welcome bonus, $100K daily races",
  metaDescription:
    "Honest analysis of Stake.com. No traditional welcome match — but $100K daily races, $75K weekly raffles, and VIP rakeback from day one. Verdict: 7.9/10.",
  verdict: "good",
  verdictTitle:
    "Good value — no welcome bonus, but ongoing rewards outperform most deposit matches",
  verdictSummary:
    "Stake does not offer a traditional deposit match on the global crypto site. Instead, every player competes in $100,000 daily races, $75,000 weekly raffles, and earns VIP rakeback from day one. No wagering requirements on prizes. For regular players, this activity-based model delivers more value over time than a one-off deposit match with 40× wagering — but it gives you nothing upfront.",
  score: "7.9",
  expectedValue: "Positive for active players (daily race prizes + rakeback)",
  totalWagering: "None — rewards are activity-based",
  termsData: [
    { flag: "bad", label: "Welcome bonus", value: "None on the global crypto site" },
    { flag: "ok", label: "Daily races", value: "$100,000 prize pool every 24 hours — top 5,000 players" },
    { flag: "ok", label: "Weekly raffle", value: "$75,000 — tickets earned by wagering" },
    { flag: "ok", label: "Wheel Wars", value: "$150,000 monthly prize pool" },
    { flag: "ok", label: "VIP rakeback", value: "Activity-based, increases with VIP tier" },
    { flag: "ok", label: "Wagering on prizes", value: "None — prizes credited as real cash" },
    { flag: "ok", label: "Min deposit", value: "No minimum (crypto dependent)" },
    { flag: "ok", label: "KYC requirement", value: "Not required for basic play — may be triggered on large withdrawals" },
    { flag: null, label: "Supported cryptos", value: "BTC, ETH, LTC, DOGE, XRP, USDT, and more" },
    { flag: null, label: "Restricted countries", value: "US (redirected to Stake.us), UK, Australia, France, others" },
    { flag: null, label: "Licence", value: "Curacao (Medium Rare N.V.) — operating since 2017" },
  ],
  pros: [
    "$100,000 daily race means real cash prizes available every single day — no opt-in needed",
    "$75,000 weekly raffle gives every active player a shot at significant prizes",
    "No wagering requirements on any prizes — everything is withdrawable cash",
    "No KYC required for basic play — one of the few remaining no-KYC crypto casinos",
    "VIP programme rewards long-term players with escalating rakeback",
    "Operating since 2017 — one of the most established crypto casinos in the market",
  ],
  cons: [
    "No welcome bonus on the global crypto site — nothing upfront to play with",
    "Daily race rewards are heavily skewed toward high-volume players at the top of the leaderboard",
    "Casual players will earn minimal returns from races and raffles",
    "VIP tier progression is not transparent — exact requirements are not published",
    "Restricted in US, UK, Australia, and several other major markets",
  ],
  content: `## How the activity-based model works

Most crypto casinos lead with a deposit match — "100% up to \`1 BTC\`, 40× wagering". Stake skips that and puts everything into ongoing rewards that compound with play. For a regular player, this is usually the better deal.

Every bet you place — casino or sportsbook — earns you ticket entries into the weekly raffle and points toward the daily race leaderboard. Winning prizes drop as **real cash**, not bonus credit, so there is no rollover to clear before withdrawal.

## The daily $100K race in practice

A \`$100,000\` pool is split between the top 5,000 players on the wagering leaderboard every 24 hours. The top spots — positions 1-10 — take a disproportionate share. A \`$25\` bettor wagering a few hundred a day will typically land somewhere in positions 2,000-4,000 and earn roughly **\`$1\`-\`$5\` per day**. That's not nothing over a month, but it's not the headline number either.

| Leaderboard position | Typical daily prize |
| --- | --- |
| 1st | $10,000+ |
| 10th | ~$1,000 |
| 100th | ~$150 |
| 1,000th | ~$15 |
| 5,000th | ~$1 |

## When Stake makes sense — and when it doesn't

Stake is a strong choice if any of these describe you:

- You already bet at crypto casinos regularly and wagering volume is not a bottleneck
- You value no-KYC flexibility and a broad game library over a one-off deposit match
- You want sports + casino + originals in one place without juggling accounts

Stake is the wrong choice if:

- You're a casual player who deposits \`$50\` once a month — the activity model returns very little at that volume
- You want a guaranteed headline bonus upfront, no matter the wagering cost
- You're in a restricted geo (US, UK, Australia, or several others)`,
  affiliateUrl: "https://stake.com/?c=J7JXsz6z",
  affiliateCta: "Join Stake — $100K daily races",
  author: { name: "Max Veld", initials: "MV" },
  updated: "Updated 12 Apr 2026",
  readTime: "9 min read",
  faq: [
    {
      question: "Is Stake safe to use without KYC?",
      answer:
        "Basic play on Stake does not require KYC verification — you can deposit, play, and withdraw without submitting identity documents in most cases. However, Stake reserves the right to request KYC at any time, particularly on large withdrawals. If you plan to cash out significant sums, assume KYC will be triggered.",
    },
    {
      question: "Can I claim the daily $100K race prize if I'm a small player?",
      answer:
        "Yes, but expect small amounts. The prize pool is weighted heavily toward the top of the leaderboard. Players wagering $100-500 per day typically land in positions 2,000-4,000 and earn between $1-5 daily. Over 30 days that's $30-150 in real cash — meaningful, but not the headline number.",
    },
    {
      question: "Why doesn't Stake offer a traditional welcome bonus?",
      answer:
        "Stake's product philosophy is that ongoing activity-based rewards deliver more long-term value than a one-off deposit match with wagering requirements. For players who stay active, this plays out as the better deal. For casual players, a competitor offering 100% up to $500 with 35× wagering will often feel more generous — even if the expected value is actually lower.",
    },
  ],
  related: [
    { slug: "cloudbet-welcome-package", casinoName: "Cloudbet", score: "8.4", verdict: "good", blurb: "Real cash rewards, no rollover" },
    { slug: "duelbits-welcome-bonus", casinoName: "Duelbits", score: "7.1", verdict: "fair", blurb: "Strong rakeback, heavy wagering to unlock spins" },
    { slug: "shuffle-welcome-bonus", casinoName: "Shuffle", score: "6.8", verdict: "fair", blurb: "100% match, 35× wagering with game edge weighting" },
  ],
};

export function getCasinoReviewBySlug(slug: string): CasinoReview | null {
  if (slug === sampleReview.slug) return sampleReview;
  // Return sample for any slug so preview works for all links
  return { ...sampleReview, slug };
}

export function getAllCasinoReviewSlugs(): string[] {
  return [sampleReview.slug];
}
