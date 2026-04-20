import type { Metadata } from "next";
import TrustPage from "@/components/TrustPage";

export const metadata: Metadata = {
  title: "Contact BonusCheckr",
  description:
    "Get in touch with BonusCheckr. Questions about a casino, a bonus, or a page on the site? Email us.",
  alternates: { canonical: "https://bonuscheckr.com/contact" },
};

const content = `**Email us:** [hello@bonuscheckr.com](mailto:hello@bonuscheckr.com)

We read every email. We reply to most within 48 hours.

## What to email us about

- **A casino or bonus we've missed** — especially if it's a crypto/offshore operator worth analysing
- **A terms change** — if a casino updates their bonus T&Cs and our review is out of date, let us know
- **Editorial corrections** — if we got a fact wrong, tell us and we'll fix it with a visible correction note
- **Affiliate relationships** — casino operators, aggregator networks, and programme managers, we'd like to hear from you
- **Press, partnerships, or guest content** — yes to all three if there's genuine alignment
- **Data requests** — if you want to know what data we hold on you, or want it deleted, email us and we'll respond within 30 days

## What we won't help with

- **Account disputes with a casino** — we don't have leverage on operator decisions. Contact the casino directly, then CasinoGuru, AskGamblers, or the licensing body if it escalates.
- **Financial advice** — we analyse bonuses; we don't advise on bankroll management beyond what's in our guides.
- **Gambling-addiction support** — we're not a crisis service. If you need help, [begambleaware.org](https://www.begambleaware.org) and [gamblingtherapy.org](https://www.gamblingtherapy.org) offer free, confidential support immediately.`;

export default function ContactPage() {
  return (
    <TrustPage
      title="Contact"
      kicker="Get in touch"
      content={content}
      breadcrumbLabel="Contact"
    />
  );
}
