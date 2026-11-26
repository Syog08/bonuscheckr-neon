// SEO title/description overrides, keyed by slug.
// These win over the values stored in Supabase. Use them for quick CTR tests
// driven by Search Console data, then copy winners back into the database.
// Data source: Search Console, 90 days to 24 Nov 2026.

type Override = { metaTitle?: string; metaDescription?: string };

export const GUIDE_SEO_OVERRIDES: Record<string, Override> = {
  // 6,979 impressions, 11 clicks, avg pos 16. Top query: "non sticky bonus" (1,356 impr).
  "sticky-vs-non-sticky-bonuses": {
    metaTitle: "Non-Sticky Bonus vs Sticky Bonus: How Each Works (2026)",
    metaDescription:
      "What a non-sticky casino bonus is, how it differs from a sticky bonus, and why non-sticky almost always has better value. Worked examples and a free calculator.",
  },
  // 4,322 impressions, 50 clicks, avg pos 6.9. Query: "forfeit bonus meaning".
  "how-to-cancel-casino-bonus": {
    metaTitle: "How to Cancel or Forfeit a Casino Bonus (Step by Step, 2026)",
    metaDescription:
      "What forfeiting a bonus means, when cancelling beats completing it, and exactly what happens to your balance. Step-by-step for sticky and non-sticky bonuses.",
  },
  // Avg pos 19 to 28. Query: "how wagering is calculated" (243 impr).
  "casino-bonus-wagering-requirements": {
    metaTitle: "How Wagering Requirements Are Calculated (+ Free Calculator)",
    metaDescription:
      "How casino wagering is calculated, with formulas, worked examples and a free calculator that shows total turnover, expected loss and real bonus value.",
  },
  // Query: "what are free spins in casinos" (93 impr, pos 6.2).
  "free-spins-vs-bonus-money": {
    metaTitle: "What Are Free Spins? Free Spins vs Bonus Money Explained",
    metaDescription:
      "What casino free spins really are, how their winnings are wagered, and when bonus money is the better deal. Clear examples with the maths.",
  },
};

export const CASINO_SEO_OVERRIDES: Record<string, Override> = {
  // 1,603 impressions, 2 clicks, avg pos 21.6. Queries: "wild.io casino review", "wild io withdrawal".
  "wildio-welcome-package": {
    metaTitle: "Wild.io Casino Review 2026: Bonus, Withdrawals and Real Value",
    metaDescription:
      "Honest Wild.io review: the 350% welcome package, 40x wagering, withdrawal speed and limits, and whether the bonus is worth claiming. Rated 6.4/10.",
  },
};

// Guides that should show the bonus calculator under the article.
export const GUIDES_WITH_CALCULATOR = new Set([
  "casino-bonus-wagering-requirements",
  "sticky-vs-non-sticky-bonuses",
  "low-vs-high-wagering",
  "mastering-casino-bonus-expected-value-guide",
  "bonus-only-vs-deposit-bonus-wagering",
  "game-contribution-wagering",
]);
