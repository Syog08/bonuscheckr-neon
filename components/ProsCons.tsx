export default function ProsCons({ pros, cons }: { pros: string[]; cons: string[] }) {
  return (
    <section className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
      {/* Pros */}
      <div className="rounded-md border border-line border-l-[3px] border-l-accent bg-bg-surface p-4 sm:p-5">
        <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-accent">
          What's good
        </div>
        <ul className="flex flex-col gap-[10px]">
          {pros.map((p, i) => (
            <li
              key={i}
              className="relative pl-[18px] text-[13px] leading-[1.55] text-fg sm:text-[14px]"
            >
              <span
                className="absolute left-[3px] top-[8px] h-[6px] w-[6px] rounded-full bg-accent"
                aria-hidden="true"
              />
              {p}
            </li>
          ))}
        </ul>
      </div>

      {/* Cons */}
      <div className="rounded-md border border-line border-l-[3px] border-l-danger bg-bg-surface p-4 sm:p-5">
        <div className="mb-3 font-mono text-[10px] font-semibold uppercase tracking-[0.1em] text-danger">
          What's not
        </div>
        <ul className="flex flex-col gap-[10px]">
          {cons.map((c, i) => (
            <li
              key={i}
              className="relative pl-[18px] text-[13px] leading-[1.55] text-fg sm:text-[14px]"
            >
              <span
                className="absolute left-[3px] top-[8px] h-[6px] w-[6px] rounded-full bg-danger"
                aria-hidden="true"
              />
              {c}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
