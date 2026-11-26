import type { Metadata } from "next";
import Link from "next/link";

const CHECK_GUIDES = [
  { slug: "low-vs-high-wagering", label: "Low vs high wagering", why: "the multiplier where a bonus turns negative" },
  { slug: "bonus-only-vs-deposit-bonus-wagering", label: "Bonus only vs deposit + bonus wagering", why: "why the same 35x can mean double the bets" },
  { slug: "no-max-cashout-bonuses", label: "Max cashout caps", why: "how much of a big win you are allowed to keep" },
  { slug: "bonus-time-limits", label: "Bonus time limits", why: "what happens when the clock runs out" },
  { slug: "bonus-abuse-voided-winnings", label: "Bonus abuse rules", why: "the play patterns that get winnings voided" },
  { slug: "no-kyc-casino-when-verification-hits", label: "No-KYC casinos and verification", why: "when ID checks hit and how to prepare" },
];
import Breadcrumbs from "@/components/Breadcrumbs";
import BonusCalculator from "@/components/BonusCalculator";
import FAQBlock from "@/components/FAQBlock";

const PAGE_URL = "https://bonuscheckr.com/tools/bonus-calculator";
const TITLE = "Casino Bonus Calculator: Wagering, Expected Loss and Real Value";
const DESC =
  "Free casino bonus calculator. Enter the match, wagering, RTP and bonus type to see total wagering, expected loss and whether the bonus is worth claiming. Sticky and non-sticky.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESC,
  alternates: { canonical: PAGE_URL },
  openGraph: { title: TITLE, description: DESC, url: PAGE_URL, type: "website" },
  twitter: { card: "summary_large_image", title: TITLE, description: DESC },
};

const FAQ = [
  {
    question: "How is the wagering requirement calculated?",
    answer:
      "Total wagering = wagering multiplier x the amount it applies to (bonus only, or deposit + bonus), divided by the game contribution. A $100 bonus at 35x on slots that count 100% means $3,500 of bets.",
  },
  {
    question: "What is the expected loss on a casino bonus?",
    answer:
      "Expected loss = total wagering x house edge. At 96.5% RTP the house edge is 3.5%, so $3,500 of wagering costs about $122.50 on average.",
  },
  {
    question: "Why are sticky bonuses usually worse?",
    answer:
      "A sticky bonus is removed when you withdraw, so you can never cash out the bonus itself. With a non-sticky bonus you play your real money first and can walk away with any win before the bonus is used.",
  },
  {
    question: "Is this calculator exact?",
    answer:
      "No. It is a simple expected value model. It ignores variance and the chance of busting early, which in practice makes high-wagering bonuses look slightly better than reality for most players.",
  },
];

const EMBED = `<iframe src="https://bonuscheckr.com/embed/bonus-calculator" width="100%" height="620" style="border:0;max-width:720px" title="Casino bonus calculator" loading="lazy"></iframe>
<p style="font-size:12px">Calculator by <a href="https://bonuscheckr.com/tools/bonus-calculator">BonusCheckr</a></p>`;

export default function BonusCalculatorPage() {
  const appSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Casino Bonus Calculator",
    url: PAGE_URL,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Any",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    publisher: { "@type": "Organization", name: "BonusCheckr", url: "https://bonuscheckr.com" },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }} />
      <div className="px-4 pt-[18px] sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumbs items={[{ label: "Home", href: "/" }, { label: "Bonus calculator" }]} />
        </div>
      </div>
      <article className="px-4 py-4 pb-10 sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <h1 className="mb-3 text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-fg sm:text-[34px]">
            Casino bonus calculator
          </h1>
          <p className="mb-6 text-[15px] leading-[1.6] text-fg-muted">
            See the real cost of a bonus before you deposit: total wagering, expected loss, and expected value. Works for
            sticky and non-sticky bonuses. Want a full verdict on the actual terms?{" "}
            <Link href="/" className="text-accent hover:underline">
              Paste them into the analyser
            </Link>
            .
          </p>

          <BonusCalculator />

          <section className="mt-10">
            <h2 className="mb-3 text-[20px] font-bold text-fg">How the maths works</h2>
            <ul className="list-disc space-y-2 pl-5 text-[14px] leading-[1.6] text-fg-muted">
              <li>
                <strong className="text-fg">Total wagering</strong> = wagering x (bonus, or deposit + bonus) / game contribution.
              </li>
              <li>
                <strong className="text-fg">Expected loss</strong> = total wagering x house edge (100% minus RTP).
              </li>
              <li>
                <strong className="text-fg">Expected value</strong> = bonus minus expected loss. For sticky bonuses the bonus is
                removed at cashout. Learn more in{" "}
                <Link href="/guides/sticky-vs-non-sticky-bonuses" className="text-accent hover:underline">
                  sticky vs non-sticky bonuses
                </Link>{" "}
                and{" "}
                <Link href="/guides/casino-bonus-wagering-requirements" className="text-accent hover:underline">
                  how wagering requirements are calculated
                </Link>
                .
              </li>
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="mb-3 text-[20px] font-bold text-fg">Terms the calculator can&apos;t see</h2>
            <p className="mb-3 text-[14px] text-fg-muted">
              The maths assumes you follow the rules. These terms can still cost you the bonus or your winnings:
            </p>
            <ul className="list-disc space-y-2 pl-5 text-[14px] leading-[1.6] text-fg-muted">
              {CHECK_GUIDES.map((g) => (
                <li key={g.slug}>
                  <Link href={`/guides/${g.slug}`} className="text-accent hover:underline">
                    {g.label}
                  </Link>
                  : {g.why}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-10">
            <h2 className="mb-3 text-[20px] font-bold text-fg">Add this calculator to your site</h2>
            <p className="mb-3 text-[14px] text-fg-muted">Free to embed. Copy this code:</p>
            <pre className="overflow-x-auto rounded-md border border-line bg-bg-subtle p-3 font-mono text-[12px] text-fg-muted">
              {EMBED}
            </pre>
          </section>

          <FAQBlock items={FAQ} />
        </div>
      </article>
    </>
  );
}
