import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-bg-base px-4 py-6 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-[10px]">
            <span className="text-[13px] font-bold tracking-tight">
              bonuscheckr<span className="text-accent">.</span>
            </span>
            <span className="rounded-sm border border-danger px-[5px] py-[2px] font-mono text-[10px] font-bold text-danger">
              18+
            </span>
          </div>
          <nav className="flex flex-wrap gap-x-[18px] gap-y-[10px] text-[12px] text-fg-dim">
            <Link href="/privacy" className="transition-colors hover:text-fg-muted">
              Privacy
            </Link>
            <Link href="/affiliate-disclosure" className="transition-colors hover:text-fg-muted">
              Affiliate disclosure
            </Link>
            <Link href="/contact" className="transition-colors hover:text-fg-muted">
              Contact
            </Link>
          </nav>
        </div>
        <div className="border-t border-line pt-3 text-[11px] leading-[1.6] text-fg-faint">
          <span className="text-fg-muted">Gambling can be addictive.</span>{" "}
          Only play with what you can afford to lose. If gambling is causing you
          harm, visit{" "}
          <a
            href="https://www.begambleaware.org"
            className="text-fg-muted hover:text-fg"
            rel="noopener noreferrer"
            target="_blank"
          >
            begambleaware.org
          </a>{" "}
          or{" "}
          <a
            href="https://www.gamblingtherapy.org"
            className="text-fg-muted hover:text-fg"
            rel="noopener noreferrer"
            target="_blank"
          >
            gamblingtherapy.org
          </a>
          .
          <br />
          <br />
          BonusCheckr earns commission from some operator links — never at cost
          to editorial independence.
        </div>
      </div>
    </footer>
  );
}
