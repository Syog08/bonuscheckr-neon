import BonusAnalyser from "@/components/BonusAnalyser";
import ValuePropCards from "@/components/ValuePropCards";
import RealityCheck from "@/components/RealityCheck";
import GuideTeasers from "@/components/GuideTeasers";

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-7 pb-[18px] text-center sm:px-6 sm:pt-14 sm:pb-8">
        <div className="mx-auto max-w-[820px]">
          <div className="mb-[14px] inline-flex items-center gap-[6px] rounded-full border border-line bg-bg-surface px-[10px] py-[5px] font-mono text-[10px] font-medium tracking-[0.04em] text-fg-muted sm:mb-[18px] sm:text-[11px]">
            <span className="h-[5px] w-[5px] rounded-full bg-accent" aria-hidden="true" />
            Crypto · no-KYC friendly
          </div>
          <h1 className="mb-[10px] text-display-lg text-fg sm:mb-[14px] sm:text-display-xl">
            Is this casino bonus <span className="text-accent">actually</span>{" "}
            worth claiming?
          </h1>
          <p className="mx-auto max-w-[520px] px-2 text-[13px] leading-[1.5] text-fg-muted sm:text-[15px]">
            Snap the terms or paste them. Get an instant verdict before you deposit.
          </p>
        </div>
      </section>

      {/* Analyser input */}
      <section className="px-4 pb-[14px] sm:px-6 sm:pb-4">
        <div className="mx-auto max-w-[680px]">
          <BonusAnalyser />
        </div>
      </section>

      {/* Value props */}
      <section className="border-t border-line px-4 py-7 sm:px-6 sm:py-10">
        <div className="mx-auto max-w-[820px]">
          <ValuePropCards />
        </div>
      </section>

      {/* Reality check */}
      <RealityCheck />

      {/* Guide teasers */}
      <GuideTeasers />
    </>
  );
}
