import Breadcrumbs from "@/components/Breadcrumbs";
import MarkdownRenderer from "@/components/MarkdownRenderer";

interface TrustPageProps {
  title: string;
  kicker?: string;
  updated?: string;
  content: string;
  breadcrumbLabel: string;
}

export default function TrustPage({
  title,
  kicker,
  updated,
  content,
  breadcrumbLabel,
}: TrustPageProps) {
  return (
    <>
      <div className="px-4 pt-[18px] sm:px-6">
        <div className="mx-auto max-w-[820px]">
          <Breadcrumbs
            items={[
              { label: "Home", href: "/" },
              { label: breadcrumbLabel },
            ]}
          />
        </div>
      </div>

      <article className="px-4 py-5 pb-12 sm:px-6">
        <div className="mx-auto max-w-[820px]">
          {kicker && (
            <div className="mb-[10px] font-mono text-[10px] font-medium uppercase tracking-[0.12em] text-fg-dim sm:text-[11px]">
              {kicker}
            </div>
          )}
          <h1 className="mb-[14px] text-[28px] font-bold leading-[1.15] tracking-[-0.025em] text-fg sm:mb-[18px] sm:text-[34px]">
            {title}
          </h1>
          {updated && (
            <div className="mb-7 text-[12px] text-fg-dim">{updated}</div>
          )}
          <MarkdownRenderer content={content} />
        </div>
      </article>
    </>
  );
}
