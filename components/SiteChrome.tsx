"use client";

import { usePathname } from "next/navigation";

// Hides site header/footer on /embed routes so the widget renders cleanly in an iframe.
export default function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  if (pathname?.startsWith("/embed")) return null;
  return <>{children}</>;
}
