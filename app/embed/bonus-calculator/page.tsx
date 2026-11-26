import type { Metadata } from "next";
import BonusCalculator from "@/components/BonusCalculator";

export const metadata: Metadata = {
  title: "Casino Bonus Calculator (embed) | BonusCheckr",
  robots: { index: false, follow: true },
  alternates: { canonical: "https://bonuscheckr.com/tools/bonus-calculator" },
};

export default function EmbedBonusCalculator() {
  return (
    <div className="p-2">
      <BonusCalculator embedded />
    </div>
  );
}
