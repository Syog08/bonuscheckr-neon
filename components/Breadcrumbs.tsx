import Link from "next/link";

interface Crumb {
  label: string;
  href?: string; // no href = current page
}

export default function Breadcrumbs({ items }: { items: Crumb[] }) {
  const itemListElement = items.map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.label,
    ...(c.href && { item: `https://bonuscheckr.com${c.href}` }),
  }));

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement,
  };

  return (
    <>
      <nav
        aria-label="Breadcrumb"
        className="font-mono text-[11px] text-fg-dim"
      >
        {items.map((c, i) => (
          <span key={i}>
            {c.href ? (
              <Link href={c.href} className="hover:text-fg-muted">
                {c.label}
              </Link>
            ) : (
              <span className="text-fg-muted">{c.label}</span>
            )}
            {i < items.length - 1 && (
              <span className="mx-[6px] text-line-strong">/</span>
            )}
          </span>
        ))}
      </nav>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
    </>
  );
}
