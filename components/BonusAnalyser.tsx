export default function BonusAnalyser() {
  return (
    <div className="rounded-lg border border-line bg-bg-surface p-4">
      {/* Screenshot upload — primary input on mobile, equal on desktop */}
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-fg-dim mb-2">
        Upload a screenshot
      </div>

      <label className="flex cursor-not-allowed flex-col items-center gap-[9px] rounded-md border border-dashed border-fg-faint bg-bg-base px-3 py-[18px] text-center opacity-90">
        <div className="flex h-11 w-11 items-center justify-center rounded-full border border-line bg-bg-surface text-fg-muted">
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z" />
            <circle cx="12" cy="13" r="4" />
          </svg>
        </div>
        <span className="text-[13px] font-semibold text-fg">
          Tap to upload or take a photo
        </span>
        <span className="font-mono text-[10px] leading-[1.5] text-fg-dim">
          From your library, or snap the T&amp;Cs page
          <br />
          PNG, JPG · up to 5&nbsp;MB
        </span>
        <input
          type="file"
          accept="image/png,image/jpeg,image/webp"
          className="hidden"
          disabled
          aria-label="Upload screenshot of bonus terms"
        />
      </label>

      {/* Or divider */}
      <div className="my-[14px] flex items-center gap-[10px]">
        <div className="h-px flex-1 bg-line" />
        <span className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-fg-faint">
          Or
        </span>
        <div className="h-px flex-1 bg-line" />
      </div>

      {/* Paste textarea — secondary input */}
      <div className="font-mono text-[9px] font-semibold uppercase tracking-[0.12em] text-fg-dim mb-2">
        Paste the terms
      </div>
      <textarea
        disabled
        className="block w-full resize-none rounded-md border border-line bg-bg-base p-[10px] font-mono text-[11px] text-fg-faint opacity-70 disabled:cursor-not-allowed"
        style={{ minHeight: 80 }}
        defaultValue="100% up to 1 BTC, 40× wagering, 7 day expiry, max bet $5..."
        aria-label="Paste bonus terms"
      />

      <button
        type="button"
        disabled
        className="mt-[14px] block w-full cursor-not-allowed rounded-md border border-line bg-bg-elevated px-3 py-[14px] text-[13px] font-semibold text-fg-faint"
        style={{ minHeight: 48 }}
      >
        Analyse bonus terms
      </button>
      <div className="mt-[9px] text-center font-mono text-[10px] text-fg-dim">
        <span className="text-warning">●</span> full analyser coming soon
      </div>
    </div>
  );
}
