import { memo, useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CodeBlock from "@/components/ui/CodeBlock";

/**
 * Renders an agent message as markdown.
 *
 * SECURITY: react-markdown does NOT render raw HTML unless you add `rehype-raw`.
 * We deliberately don't, so model output (which can be influenced by attached
 * files and other untrusted input) can never inject HTML or scripts. Don't add
 * rehype-raw here without adding rehype-sanitize alongside it.
 */

// Models write <br> inside table cells, the one place markdown has no line break
// of its own. Raw HTML stays off (see above), so only this exact tag becomes a
// real break; every other HTML node is still shown as plain text.
const BR_TAG = /^<br\s*\/?>$/i;
function remarkLineBreaks() {
  const walk = (node) => {
    if (!node.children) return;
    node.children = node.children.map((child) =>
      child.type === "html" && BR_TAG.test(child.value.trim()) ? { type: "break" } : child,
    );
    node.children.forEach(walk);
  };
  return walk;
}

const MAX_ALT_CHARS = 80;

const components = {
  // Images are never loaded. The browser fetches an <img> the moment it renders,
  // with no click, so a reply steered by injected text could append private data
  // to an attacker's image address and leak it just by being displayed. Nothing
  // authored here uses images, so the safe behaviour is the default for everyone.
  img: ({ alt }) => (
    <span className="italic text-white/50">
      [image not shown{alt ? `: ${String(alt).slice(0, MAX_ALT_CHARS)}` : ""}]
    </span>
  ),

  // `pre` is handled by the `code` renderer below, so unwrap it to avoid
  // nesting <pre> inside <pre>.
  pre: ({ children }) => children,

  code({ inline, className, children, ...props }) {
    const text = String(children ?? "").replace(/\n$/, "");
    const language = /language-(\w+)/.exec(className || "")?.[1];

    // react-markdown v10 doesn't always set `inline`; a code block always has a
    // language class or a newline, so fall back to that.
    const isBlock = inline === false || Boolean(language) || text.includes("\n");

    if (!isBlock) {
      return (
        <code
          className="px-1.5 py-0.5 rounded text-[13px] bg-white/8 text-purple-300 font-mono"
          {...props}
        >
          {children}
        </code>
      );
    }

    return (
      <CodeBlock language={language} code={text}>
        <code className={className} {...props}>
          {children}
        </code>
      </CodeBlock>
    );
  },

  p: ({ children }) => <p className="mb-3 last:mb-0 leading-relaxed">{children}</p>,

  h1: ({ children }) => <h1 className="text-[18px] font-semibold mt-4 mb-2 text-white">{children}</h1>,
  h2: ({ children }) => <h2 className="text-[16px] font-semibold mt-4 mb-2 text-white">{children}</h2>,
  h3: ({ children }) => <h3 className="text-[15px] font-semibold mt-3 mb-1.5 text-white">{children}</h3>,
  h4: ({ children }) => <h4 className="text-[14px] font-semibold mt-3 mb-1.5 text-white">{children}</h4>,

  ul: ({ children }) => <ul className="list-disc pl-5 mb-3 space-y-1">{children}</ul>,
  ol: ({ children }) => <ol className="list-decimal pl-5 mb-3 space-y-1">{children}</ol>,
  li: ({ children }) => <li className="leading-relaxed">{children}</li>,

  strong: ({ children }) => <strong className="font-semibold text-white">{children}</strong>,
  em: ({ children }) => <em className="italic">{children}</em>,
  del: ({ children }) => <del className="line-through opacity-60">{children}</del>,

  a: ({ href, children }) => (
    <a
      href={href}
      target="_blank"
      // noopener/noreferrer is required on target=_blank links, and doubly so
      // for model-generated URLs.
      rel="noopener noreferrer"
      className="text-purple-400 underline underline-offset-2 hover:text-purple-300"
    >
      {children}
    </a>
  ),

  blockquote: ({ children }) => (
    <blockquote className="border-l-2 border-purple-500/40 pl-3 my-3 text-white/70 italic">
      {children}
    </blockquote>
  ),

  hr: () => <hr className="my-4 border-white/10" />,

  // Tables must scroll inside their own container so a wide table never makes
  // the whole chat pane scroll sideways.
  table: ({ children }) => (
    <div className="my-3 overflow-x-auto rounded-lg border border-white/10">
      <table className="w-full text-[13px] border-collapse">{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className="bg-white/5">{children}</thead>,
  th: ({ children }) => (
    <th className="text-left font-semibold px-3 py-2 border-b border-white/10 text-white">
      {children}
    </th>
  ),
  td: ({ children }) => <td className="px-3 py-2 border-b border-white/5">{children}</td>,

  input: ({ checked, type }) =>
    type === "checkbox" ? (
      <input type="checkbox" checked={checked} readOnly className="mr-1.5 accent-purple-500" />
    ) : null,
};

let loadedPlugins = null;

// The highlighter is ~66 KB gzip, so only messages that contain a fenced block
// pay for it. Plain text renders first; colours arrive once the chunk lands
// (token colours only, so no layout shift).
function useCodePlugins(content) {
  const hasFence = /```|~~~/.test(content);
  const [plugins, setPlugins] = useState(loadedPlugins);

  useEffect(() => {
    if (!hasFence || loadedPlugins) return;
    let cancelled = false;
    import("@/components/ui/codeHighlight").then((m) => {
      loadedPlugins = m.codeRehypePlugins;
      if (!cancelled) setPlugins(loadedPlugins);
    });
    return () => {
      cancelled = true;
    };
  }, [hasFence]);

  return hasFence ? plugins : null;
}

function MarkdownMessage({ content, className = "text-[14px] text-white" }) {
  const rehypePlugins = useCodePlugins(content) ?? [];
  return (
    /* Width is capped by the transcript column in MessageList, not here — a
       second cap would make agent text narrower than the user's bubbles. */
    <div className={`w-full ${className}`}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm, remarkLineBreaks]}
        rehypePlugins={rehypePlugins}
        components={components}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}

// Markdown parsing runs on every render. During streaming the parent re-renders
// on each token, so memoizing keeps settled messages from re-parsing every time.
export default memo(MarkdownMessage);
