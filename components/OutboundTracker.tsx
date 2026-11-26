"use client";

import { useEffect } from "react";
import { track } from "@vercel/analytics";

// Tracks clicks on affiliate (rel="sponsored") and other external links.
// Uses one document-level listener, so no component needs to change.
export default function OutboundTracker() {
  useEffect(() => {
    function onClick(e: MouseEvent) {
      const a = (e.target as HTMLElement | null)?.closest?.("a");
      if (!a || !a.href) return;
      let url: URL;
      try {
        url = new URL(a.href);
      } catch {
        return;
      }
      if (url.hostname === window.location.hostname) return;
      const isAffiliate = (a.getAttribute("rel") || "").includes("sponsored");
      track(isAffiliate ? "affiliate_click" : "outbound_click", {
        host: url.hostname.replace(/^www\./, ""),
        page: window.location.pathname,
      });
    }
    document.addEventListener("click", onClick, { capture: true });
    return () => document.removeEventListener("click", onClick, { capture: true });
  }, []);
  return null;
}
