import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "About BonusCheckr — independent bonus analysis for crypto casinos",
  description:
    "BonusCheckr is an independent analysis tool for casino bonus terms. We read the small print so you don't have to. No sponsored rankings. Honest assessments including negative ones.",
  alternates: { canonical: "https://bonuscheckr.com/about" },
};

const content = `Most casino bonuses read like they're written to be skimmed. That's on purpose — "up to 5 BTC" sounds like a promise, but the 40× wagering, the max bet cap, the game restrictions, and the seven-day expiry are what actually decide whether you see any of it.

BonusCheckr was built to fix that. Paste bonus terms or a screenshot, get an instant analysis with expected value, red flags, and a verdict. No hype. No "everything is 8+/10". If a bonus is a trap, we say so.

## What we actually do

- **Analyse bonus T&Cs** — wagering requirements, max cashout, game contribution, bet size caps, time limits, and the rest. Every term that affects whether you walk away with money.
- **Review casinos honestly** — good, fair, risky, or avoid. The verdict is based on the data, not on whether they pay us.
- **Publish guides** — on how bonuses actually work, what the common traps look like, and how to read terms before you deposit.

## Who this is for

Crypto and offshore casino players who have been through enough wagering requirements to be skeptical. If you already know what a sticky bonus is, you're our audience.

If you're new to gambling, we'd rather you read our [wagering requirements guide](/guides/casino-bonus-wagering-requirements) before depositing anywhere.

## How we make money

We earn affiliate commission when someone clicks through to a casino from our site and signs up. That's how we fund the work.

We do **not** change ratings based on affiliate commercials. A casino with a terrible bonus doesn't get a better score because they pay more. Read our [affiliate disclosure](/affiliate-disclosure) for the full picture.

## Responsible gambling

Gambling is entertainment with a negative expected value in the long run. If it's costing you money you can't afford to lose, that's not entertainment — that's a problem.

If you're concerned about your gambling, visit [begambleaware.org](https://www.begambleaware.org) or [gamblingtherapy.org](https://www.gamblingtherapy.org). Both offer free, confidential support.

## Contact

Questions, feedback, or a bonus you want us to analyse — [contact us](/contact).`;

export default function AboutPage() {
  return (
    <TrustPage
      title="About BonusCheckr"
      kicker="About"
      content={content}
      breadcrumbLabel="About"
    />
  );
}
