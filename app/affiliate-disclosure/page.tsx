import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Affiliate disclosure — BonusCheckr",
  description:
    "BonusCheckr earns commission when users sign up to casinos through our links. We disclose how that works, why it doesn't affect our ratings, and what you should know before clicking.",
  alternates: { canonical: "https://bonuscheckr.com/affiliate-disclosure" },
};

const content = `BonusCheckr earns commission from some of the casinos we review. If you click a link on our site and go on to register or deposit at that casino, we may receive a referral payment. That's how we fund the analysis, the guides, and the tool.

This page explains exactly how that works, what it means for our ratings, and what you should know before clicking anything on our site.

## How affiliate commissions work

Casinos pay affiliate partners (like us) in one of three ways:

- **CPA (cost per acquisition)** — a one-off fee when a new player registers and meets a minimum deposit threshold
- **Revenue share** — an ongoing percentage of the casino's net revenue from players we referred
- **Hybrid** — a combination of the above

When you click an affiliate link on our site, a tracking parameter tells the casino you came from us. If you sign up within their tracking window (usually 30-90 days), we're credited.

## What this does NOT change

- **Our ratings are not for sale.** A casino cannot pay us for a higher score. Scores are assigned by our analysis process — the bonus terms, the wagering requirements, the casino's history — and they don't move because a commercial deal improves or worsens.
- **We review casinos we're not affiliated with.** If a casino has no affiliate programme with us, we'll still rate it if it's relevant to our readers.
- **We publish negative verdicts.** You'll find casinos on our site rated "fair", "risky", or "avoid" that we *are* affiliated with. If the bonus is bad, the rating is bad, regardless of what we earn.

## What to know before clicking

- **Every "Claim this bonus" or casino link is a sponsored affiliate link.** We don't hide this — every affiliate button on our site has a "Sponsored link" label and a \`rel="sponsored nofollow"\` attribute for search-engine compliance.
- **Signing up through our link costs you nothing extra.** The commission comes from the casino's marketing budget, not from your bankroll.
- **You can go direct.** Nothing on our site requires you to use our affiliate links. If you'd rather go to a casino directly, type the URL yourself.

## Jurisdictions and licensing

BonusCheckr focuses on crypto-friendly and offshore casinos, which are typically licensed under jurisdictions such as Curaçao, Costa Rica, or Anjouan. These are not regulated in the UK, US, Australia, or several other major markets.

You are responsible for ensuring online gambling is legal in your jurisdiction before playing. We do not promote gambling to residents of markets where it is prohibited.

## Responsible gambling

We only earn commission when our readers sign up and play. We have a direct incentive to send traffic to casinos. That incentive ends at the door — we do not encourage chasing losses, depositing more than you can afford, or treating gambling as a source of income.

If you're concerned about your gambling habits, visit [begambleaware.org](https://www.begambleaware.org) or [gamblingtherapy.org](https://www.gamblingtherapy.org).

## Legal

Our editorial team makes rating decisions independently of our commercial team. For any questions about this disclosure, [contact us](/contact).

BonusCheckr is not a licensed gambling operator. We do not take deposits, operate games, or process payments. We publish analysis and opinion.`;

export default function AffiliateDisclosurePage() {
  return (
    <TrustPage
      title="Affiliate disclosure"
      kicker="Legal"
      updated="Updated 12 Apr 2026"
      content={content}
      breadcrumbLabel="Affiliate disclosure"
    />
  );
}
