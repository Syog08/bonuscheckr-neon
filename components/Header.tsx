import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-line px-4 py-3 sm:px-6 sm:py-[14px]">
      <div className="mx-auto flex max-w-6xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="text-[15px] font-bold tracking-tight">
            bonuscheckr<span className="text-accent">.</span>
          </Link>
          <span className="rounded-sm border border-accent-ring bg-accent-dim px-[7px] py-[2px] font-mono text-[10px] font-semibold uppercase tracking-[0.08em] text-accent">
            BETA
          </span>
        </div>

        <nav className="hidden items-center gap-7 text-[13px] text-fg-muted sm:flex">
          <Link href="/" className="transition-colors hover:text-fg">
            Analyser
          </Link>
          <Link href="/guides" className="transition-colors hover:text-fg">
            Guides
          </Link>
          <Link href="/casinos" className="transition-colors hover:text-fg">
            Reviews
          </Link>
          <Link href="/about" className="transition-colors hover:text-fg">
            About
          </Link>
        </nav>

        <button
          type="button"
          aria-label="Open menu"
          className="flex h-8 w-8 items-center justify-center rounded-md border border-line bg-bg-surface text-fg-muted sm:hidden"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
            <line x1="4" y1="7" x2="20" y2="7" />
            <line x1="4" y1="12" x2="20" y2="12" />
            <line x1="4" y1="17" x2="20" y2="17" />
          </svg>
        </button>
      </div>
    </header>
  );
}
