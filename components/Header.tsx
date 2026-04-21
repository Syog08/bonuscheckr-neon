"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_ITEMS = [
  { href: "/", label: "Analyser" },
  { href: "/guides", label: "Guides" },
  { href: "/casinos", label: "Reviews" },
  { href: "/about", label: "About" },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close on ESC
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-bg-base/95 px-4 py-3 backdrop-blur sm:px-6 sm:py-[14px]">
        <div className="mx-auto flex max-w-6xl items-center justify-between">
          <Link
            href="/"
            onClick={() => setOpen(false)}
            className="text-[15px] font-bold tracking-tight"
          >
            bonuscheckr<span className="text-accent">.</span>
          </Link>

          <nav className="hidden items-center gap-7 text-[13px] text-fg-muted sm:flex">
            {NAV_ITEMS.map((n) => (
              <Link
                key={n.href}
                href={n.href}
                className="transition-colors hover:text-fg"
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-bg-surface text-fg-muted transition-colors hover:text-fg sm:hidden"
          >
            {open ? (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            ) : (
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              >
                <line x1="4" y1="7" x2="20" y2="7" />
                <line x1="4" y1="12" x2="20" y2="12" />
                <line x1="4" y1="17" x2="20" y2="17" />
              </svg>
            )}
          </button>
        </div>
      </header>

      {/* Mobile drawer */}
      {open && (
        <>
          {/* Backdrop */}
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="fixed inset-0 top-[53px] z-30 bg-black/60 sm:hidden"
          />
          {/* Drawer panel */}
          <div className="fixed inset-x-0 top-[53px] z-30 border-b border-line bg-bg-base sm:hidden">
            <nav className="flex flex-col px-4 py-2">
              {NAV_ITEMS.map((n) => (
                <Link
                  key={n.href}
                  href={n.href}
                  onClick={() => setOpen(false)}
                  className="border-b border-bg-elevated py-[14px] text-[15px] font-medium text-fg last:border-b-0"
                >
                  {n.label}
                </Link>
              ))}
            </nav>
          </div>
        </>
      )}
    </>
  );
}
