import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Breadcrumbs from "@/components/Breadcrumbs";
import { getAuthorById, getAllAuthorIds } from "@/lib/authors";

export async function generateStaticParams() {
  const ids = await getAllAuthorIds();
  return ids.map((id) => ({ slug: id }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const author = await getAuthorById(slug);
  if (!author) return {};

  const url = `https://bonuscheckr.com/authors/${slug}`;
  const description = author.long_bio
    ? author.long_bio.replace(/\n+/g, " ").slice(0, 155)
    : (author.bio ?? "");
  const title = `${author.name} — ${author.expertise} | BonusCheckr`;

  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url },
    twitter: { card: "summary_large_image", title, description },
  };
}

export default async function AuthorPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const author = await getAuthorById(slug);
  if (!author) notFound();

  const personSchema = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: author.name,
    jobTitle: author.expertise,
    description: author.bio,
    url: `https://bonuscheckr.com/authors/${author.id}`,
    knowsAbout: [
      "casino bonuses",
      "expected value analysis",
      "crypto casinos",
      "iGaming",
    ],
    worksFor: {
      "@type": "Organization",
      name: "BonusCheckr",
      url: "https://bonuscheckr.com",
    },
  };

  const longBioParagraphs = author.long_bio
    ? author.long_bio.split("\n\n").filter(Boolean)
    : [];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />

      <div className="px-4 pt-[18px] sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: "Authors" },
              { label: author.name },
            ]}
          />
        </div>
      </div>

      <article className="px-4 py-6 pb-16 sm:px-6">
        <div className="mx-auto max-w-[820px]">

          {/* Header */}
          <div className="mb-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-5">
            <div className="flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-full border border-line bg-bg-elevated font-mono text-[20px] font-bold text-fg">
              {author.initials}
            </div>
            <div>
              <h1 className="text-[26px] font-bold leading-[1.15] tracking-[-0.02em] text-fg sm:text-[30px]">
                {author.name}
              </h1>
              {author.expertise && (
                <div className="mt-[5px] text-[13px] text-fg-muted">
                  {author.expertise}
                </div>
              )}
            </div>
          </div>

          {/* Long bio */}
          {longBioParagraphs.length > 0 && (
            <div className="mb-8 flex flex-col gap-4">
              {longBioParagraphs.map((para, i) => (
                <p key={i} className="text-[15px] leading-[1.7] text-fg-muted">
                  {para}
                </p>
              ))}
            </div>
          )}

          {/* Methodology */}
          {author.methodology && (
            <div className="mb-8">
              <h2 className="mb-3 text-[17px] font-bold tracking-[-0.015em] text-fg">
                Methodology
              </h2>
              <div className="rounded-md border border-line bg-bg-surface p-4 sm:p-[18px]">
                <p className="text-[13px] leading-[1.65] text-fg-muted sm:text-[14px]">
                  {author.methodology}
                </p>
              </div>
            </div>
          )}

          {/* Credentials */}
          {author.credentials && author.credentials.length > 0 && (
            <div className="mb-8">
              <h2 className="mb-3 text-[17px] font-bold tracking-[-0.015em] text-fg">
                Credentials &amp; scope
              </h2>
              <ul className="flex flex-col gap-[10px]">
                {author.credentials.map((cred, i) => (
                  <li
                    key={i}
                    className="relative pl-[18px] text-[13px] leading-[1.55] text-fg-muted sm:text-[14px]"
                  >
                    <span
                      className="absolute left-[3px] top-[9px] h-[6px] w-[6px] rounded-full bg-accent"
                      aria-hidden="true"
                    />
                    {cred}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Disclosure */}
          {author.disclosure && (
            <div className="mb-8">
              <h2 className="mb-3 text-[17px] font-bold tracking-[-0.015em] text-fg">
                On transparency
              </h2>
              <div className="rounded-md border border-line bg-bg-subtle p-4 sm:p-[18px]">
                <p className="text-[13px] leading-[1.65] text-fg-muted">
                  {author.disclosure}
                </p>
              </div>
            </div>
          )}

        </div>
      </article>
    </>
  );
}
