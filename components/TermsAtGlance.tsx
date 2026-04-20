interface TermRow {
  flag: "good" | "bad" | null;
  label: string;
  value: string;
}

// Server component — data passed as arbitrary flag strings from Supabase; we normalize here.
function normalizeFlag(flag: string | null): "good" | "bad" | null {
  if (flag === "ok" || flag === "good") return "good";
  if (flag === "bad" || flag === "avoid") return "bad";
  return null;
}

export default function TermsAtGlance({ terms }: { terms: Array<{ flag: string | null; label: string; value: string }> }) {
  return (
    <section className="mt-7">
      <h2 className="mb-3 text-[18px] font-bold tracking-[-0.01em] text-fg sm:text-[20px]">
        Terms at a glance
      </h2>
      <div className="overflow-hidden rounded-md border border-line">
        {terms.map((t, i) => {
          const normalized = normalizeFlag(t.flag);
          return (
            <div
              key={i}
              className="flex items-start gap-3 border-b border-bg-elevated bg-bg-surface px-[14px] py-[11px] last:border-b-0 sm:gap-4"
            >
              <div className="flex h-[18px] w-[18px] flex-shrink-0 items-center justify-center pt-[1px]">
                {normalized === "good" ? (
                  <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-accent-dim">
                    <span className="h-[5px] w-[5px] rounded-full bg-accent" aria-hidden="true" />
                  </span>
                ) : normalized === "bad" ? (
                  <span className="flex h-[14px] w-[14px] items-center justify-center rounded-full bg-danger-dim">
                    <span className="h-[5px] w-[5px] rounded-full bg-danger" aria-hidden="true" />
                  </span>
                ) : (
                  <span className="flex h-[14px] w-[14px] items-center justify-center">
                    <span className="h-[5px] w-[5px] rounded-full bg-fg-dim" aria-hidden="true" />
                  </span>
                )}
              </div>
              <div className="flex-1 sm:grid sm:grid-cols-[170px_1fr] sm:gap-4">
                <div className="font-mono text-[11px] font-medium uppercase tracking-[0.04em] text-fg-dim sm:pt-[2px]">
                  {t.label}
                </div>
                <div className="mt-[2px] text-[13px] leading-[1.5] text-fg sm:mt-0 sm:text-[14px]">
                  {t.value}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
