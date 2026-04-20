interface FAQ {
  question: string;
  answer: string;
}

export default function FAQBlock({ items }: { items: FAQ[] }) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: { "@type": "Answer", text: f.answer },
    })),
  };

  return (
    <section className="mt-9 border-t border-bg-elevated pt-7">
      <h2 className="mb-4 text-[20px] font-bold tracking-[-0.015em] text-fg sm:text-[22px]">
        FAQ
      </h2>
      <div className="flex flex-col gap-2">
        {items.map((f, i) => (
          <div
            key={i}
            className="rounded-md border border-line bg-bg-surface p-4 sm:p-[18px]"
          >
            <div className="mb-2 flex items-start gap-2 text-[14px] font-semibold text-fg">
              <span className="font-mono text-[12px] font-bold text-accent">
                Q.
              </span>
              <span>{f.question}</span>
            </div>
            <div className="pl-[20px] text-[13px] leading-[1.65] text-fg-muted">
              {f.answer}
            </div>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </section>
  );
}
