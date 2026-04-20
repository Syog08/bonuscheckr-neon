import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import type { Components } from "react-markdown";

// Maps GFM markdown to BonusCheckr's dark-first styled components.
// Re-skins without changing semantic HTML — SEO stays intact.
const components: Components = {
  h1: () => null, // H1 is rendered separately with metadata
  h2: ({ children }) => (
    <h2 className="mb-[14px] mt-9 text-[20px] font-bold tracking-[-0.015em] text-fg sm:text-[22px]">
      {children}
    </h2>
  ),
  h3: ({ children }) => (
    <h3 className="mb-[8px] mt-[22px] text-[15px] font-semibold text-fg sm:text-[16px]">
      {children}
    </h3>
  ),
  p: ({ children }) => (
    <p className="mb-4 text-[14px] leading-[1.7] text-fg sm:text-[15px]">
      {children}
    </p>
  ),
  ul: ({ children }) => (
    <ul className="mb-5 list-none p-0">{children}</ul>
  ),
  ol: ({ children }) => (
    <ol className="mb-5 list-decimal pl-5 marker:text-fg-dim">
      {children}
    </ol>
  ),
  li: ({ children, ...props }) => {
    // ul li gets green dot; ol li uses default numbered marker
    const isOrderedChild = (props as { ordered?: boolean }).ordered;
    if (isOrderedChild) {
      return <li className="mb-2 text-[14px] leading-[1.65] text-fg sm:text-[15px]">{children}</li>;
    }
    return (
      <li className="relative mb-2 pl-[18px] text-[14px] leading-[1.65] text-fg sm:text-[15px]">
        <span
          className="absolute left-[3px] top-[9px] h-[6px] w-[6px] rounded-full bg-accent"
          aria-hidden="true"
        />
        {children}
      </li>
    );
  },
  strong: ({ children }) => (
    <strong className="font-semibold text-fg">{children}</strong>
  ),
  code: ({ children }) => (
    <code className="rounded-sm bg-bg-elevated px-[5px] py-[1px] font-mono text-[12px] text-fg">
      {children}
    </code>
  ),
  a: ({ children, href }) => (
    <a
      href={href}
      className="text-accent underline decoration-accent-ring underline-offset-2 hover:decoration-accent"
    >
      {children}
    </a>
  ),
  blockquote: ({ children }) => {
    // Special-case TL;DR callouts: if first child starts with "TL;DR:",
    // render as green callout. Otherwise plain blockquote.
    // (We'll default all blockquotes to the green callout style since
    // that's the primary use in BonusCheckr guides.)
    return (
      <div className="mb-6 rounded-md border border-accent-ring border-l-[3px] border-l-accent bg-accent-tint p-4">
        <div className="text-[13px] leading-[1.65] text-fg-muted sm:text-[14px]">
          {children}
        </div>
      </div>
    );
  },
  table: ({ children }) => (
    <div className="mb-5 overflow-x-auto">
      <table className="w-full overflow-hidden rounded-md border border-line text-[13px]">
        {children}
      </table>
    </div>
  ),
  thead: ({ children }) => <thead>{children}</thead>,
  tbody: ({ children }) => <tbody>{children}</tbody>,
  tr: ({ children }) => (
    <tr className="border-b border-bg-elevated last:border-b-0 hover:bg-bg-surface">
      {children}
    </tr>
  ),
  th: ({ children }) => (
    <th className="border-b border-line bg-bg-surface px-[14px] py-[10px] text-left font-mono text-[11px] font-semibold uppercase tracking-[0.04em] text-fg-muted">
      {children}
    </th>
  ),
  td: ({ children }) => (
    <td className="px-[14px] py-[10px] text-fg">{children}</td>
  ),
  hr: () => <hr className="my-8 border-line" />,
};

export default function MarkdownRenderer({ content }: { content: string }) {
  return (
    <div className="prose-invert">
      <ReactMarkdown remarkPlugins={[remarkGfm]} components={components}>
        {content}
      </ReactMarkdown>
    </div>
  );
}
