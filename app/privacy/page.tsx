import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Privacy policy — BonusCheckr",
  description:
    "BonusCheckr privacy policy. What data we collect, how we use it, and what we don't do. Minimal collection, no accounts, no personal data required to use the tool.",
  alternates: { canonical: "https://bonuscheckr.com/privacy" },
};

const content = `BonusCheckr is built to be usable without an account, without sign-up, and without sharing personal data. This policy explains what we do collect, what we don't, and why.

## What we collect

### Anonymous usage analytics
When you visit bonuscheckr.com, we log standard web analytics: the page you visited, your approximate location (country-level only), your device type, and your referrer. This data is anonymous and aggregated — we cannot tie it back to you as an individual.

### Bonus terms you submit to the analyser
When you paste bonus terms or upload a screenshot into our analyser, we send that text to an AI model for analysis. We do not store the text permanently. It is processed, analysed, and discarded.

We do **not** ask for your name, email, casino username, deposit amount, payment details, or any other identifying information in the analyser.

### Cookies
We use a minimal set of cookies:
- **Essential cookies** for the site to function (session tokens, preferences). These cannot be disabled.
- **Analytics cookies** for anonymous traffic measurement. You can block these at the browser level.

We do **not** use advertising cookies or cross-site tracking pixels.

## What we do NOT collect

- Your name, email, phone number, or physical address (unless you voluntarily contact us)
- Payment details — we never process payments
- Casino account credentials
- Any data from other websites beyond standard referrer info

## Affiliate tracking

When you click an affiliate link on BonusCheckr, the destination casino may set their own cookies to track your visit. Once you leave our site, the casino's privacy policy applies, not ours. We receive aggregated referral reports (number of clicks, number of sign-ups) but not individual player data.

## Your rights

If you're in the EU, UK, or California, you have specific rights under GDPR / UK GDPR / CCPA:

- Right to access data we hold on you (likely nothing, but if you email us we'll confirm)
- Right to deletion
- Right to object to processing
- Right to data portability

To exercise any of these, [contact us](/contact).

## Data retention

- Anonymous analytics: retained for 24 months, then aggregated or deleted
- Analyser submissions: not retained (processed in-memory, discarded after response)
- Contact emails: retained for as long as needed to respond and handle any follow-ups

## Third-party services

We use:
- **Vercel** for hosting and edge delivery (data processing agreement in place)
- **Supabase** for content storage (not user data)
- **Anthropic** for AI analysis of bonus terms (submissions are not stored by Anthropic per their API policy)

No other third parties receive your data.

## Changes to this policy

If this policy changes, we'll update the "last updated" date below and note material changes on our homepage or newsletter for at least 30 days.

## Contact

Questions, data requests, or concerns: [contact us](/contact).`;

export default function PrivacyPage() {
  return (
    <TrustPage
      title="Privacy policy"
      kicker="Legal"
      updated="Updated 12 Apr 2026"
      content={content}
      breadcrumbLabel="Privacy"
    />
  );
}
