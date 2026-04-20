// Temporary hardcoded guide content for preview/review.
// Replaced by Supabase query in the content migration step.

export interface Guide {
  slug: string;
  title: string;
  meta_title: string;
  meta_description: string;
  tldr: string;
  content: string; // markdown body (no H1)
  author: { name: string; initials: string };
  updated: string;
  readTime: string;
  faq: { question: string; answer: string }[];
  related: { slug: string; title: string; blurb: string; readTime: string }[];
}

const sampleGuide: Guide = {
  slug: "sticky-vs-non-sticky-bonuses",
  title: "Sticky vs non-sticky casino bonuses explained",
  meta_title:
    "Sticky vs non-sticky bonuses — which is worth claiming?",
  meta_description:
    "Non-sticky keeps your deposit safe. Sticky merges everything. Here's how to tell them apart in 30 seconds and why it matters for your bankroll.",
  tldr: "Non-sticky bonuses keep your deposit separate from bonus money — you can withdraw real wins without completing wagering. Sticky bonuses merge them, so nothing comes out until wagering is cleared. **Non-sticky is almost always the better deal.** Terms rarely spell out which type you're getting, so check the language before depositing.",
  author: { name: "Max Veld", initials: "MV" },
  updated: "Updated 12 Apr 2026",
  readTime: "8 min read",
  content: `Almost every casino bonus is one of two types. The difference decides whether the bonus is usable, whether you can walk away with winnings, and whether claiming it made sense in the first place. Most players don't know which type they're getting — the terms rarely say it in plain language.

This guide covers both, shows what happens to your money in each case, and gives you a 30-second test to tell which type a bonus is before you deposit.

## The core difference

It comes down to how the casino treats your deposit versus the bonus amount. With a non-sticky bonus, your **deposit and bonus live in separate wallets**. The deposit is real money you can withdraw any time. With a sticky bonus, deposit and bonus are **merged into a single balance** and neither can leave the casino until wagering is complete.

| | Non-sticky | Sticky |
| --- | --- | --- |
| Deposit + bonus | Separate wallets | Merged |
| Withdraw real wins | Any time | After WR only |
| Bonus if you cash out early | Forfeit | Forfeit + can lose deposit |
| Risk profile | Low | High |
| Expected value to player | Positive | Variable |

## Worked example

You deposit \`0.1 BTC\` and claim a \`100%\` match bonus. Total balance: \`0.2 BTC\`. Wagering is \`40×\` the bonus, meaning \`4 BTC\` of turnover before cashout.

### Non-sticky path

- You play. Balance grows to \`0.25 BTC\`.
- You cash out. Casino forfeits the unused bonus. You keep **0.15 BTC** — your deposit plus winnings.
- No wagering completed. No forced loss. You walked away ahead.

### Sticky path

- Same start. Balance grows to \`0.25 BTC\`.
- You try to cash out. **Blocked.** Wagering not complete.
- You grind toward \`4 BTC\` turnover. Variance eats the balance before you get there.

## How to tell which type you're getting

- Look for the word **"non-sticky"**, **"parachute"** or **"cashable bonus"** in the terms. If present, you're safe.
- Check if the terms mention "deposit and bonus must be wagered together" or "bonus balance" as a single figure — sticky.
- If the terms are silent, assume sticky. Casinos make non-sticky explicit because it's a selling point.
- Look at the withdraw button behaviour before you start playing — if it's disabled with an active bonus, that's sticky.`,
  faq: [
    {
      question: "Are non-sticky bonuses always better?",
      answer:
        "For most players, yes. Non-sticky lets you cash out early if you get lucky, which sticky doesn't. The exception: a sticky bonus with genuinely low wagering (10× or below) and generous max cashout can outperform a non-sticky with 40× wagering. Rare but possible.",
    },
    {
      question: "What happens to my deposit if I cash out a non-sticky bonus early?",
      answer:
        "Your deposit stays yours. You withdraw the deposit plus any real-money winnings. The bonus is forfeited — which is the correct move 90% of the time with non-sticky offers.",
    },
    {
      question: "Can a casino change a bonus from non-sticky to sticky after I deposit?",
      answer:
        "No legit casino will. But the T&Cs at time of claim are what govern — so always screenshot the terms before you deposit, especially at smaller or offshore operators. If the terms change mid-play, that's a complaint you can escalate.",
    },
  ],
  related: [
    {
      slug: "non-sticky-withdrawal-guide",
      title: "Non-sticky withdrawal walkthrough",
      blurb: "Step-by-step from deposit to cashout",
      readTime: "7 min",
    },
    {
      slug: "casino-bonus-wagering-requirements",
      title: "Wagering requirements explained",
      blurb: "How 40× actually plays out in practice",
      readTime: "6 min",
    },
    {
      slug: "red-flags-bonus-terms",
      title: "Top 5 red flags in bonus terms",
      blurb: "Max bet traps, exclusions, time limits",
      readTime: "7 min",
    },
    {
      slug: "how-to-cancel-casino-bonus",
      title: "How to cancel a casino bonus",
      blurb: "When walking away beats playing through",
      readTime: "5 min",
    },
  ],
};

export function getGuideBySlug(slug: string): Guide | null {
  // Only serves the one sample for preview — all 16 guides wire in at migration.
  if (slug === sampleGuide.slug) return sampleGuide;
  // Return the sample for any slug so preview/review works for every link
  return { ...sampleGuide, slug };
}

export function getAllGuideSlugs(): string[] {
  return [sampleGuide.slug];
}
