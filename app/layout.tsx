import type { Metadata } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/next";
import OutboundTracker from "@/components/OutboundTracker";
import SiteChrome from "@/components/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "BonusCheckr — Is that casino bonus actually worth claiming?",
    template: "%s",
  },
  description:
    "Paste casino bonus terms or drop a screenshot. Get an instant EV-based verdict before you deposit. Built for crypto casino players.",
  metadataBase: new URL("https://bonuscheckr.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable}`}>
      <body className="bg-bg-base text-fg">
        <SiteChrome>
          <Header />
        </SiteChrome>
        <main>{children}</main>
        <SiteChrome>
          <Footer />
        </SiteChrome>
        <OutboundTracker />
        <Analytics />
      </body>
    </html>
  );
}
