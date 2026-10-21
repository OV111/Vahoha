import { useState } from "react";
import { Check, Copy } from "lucide-react";
import "./code-theme.css";

/**
 * A fenced code block: language label, copy button, and a scroll area so long
 * lines never widen the page. `children` is the highlighted <code> element.
 */
export default function CodeBlock({ language, code, children, className = "my-3 rounded-lg", preClassName = "p-3 text-[13px]" }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard unavailable: the code is still selectable */
    }
  };

  return (
    <div className={`not-prose overflow-hidden border border-white/10 bg-[#1e1e1e] ${className}`}>
      <div className="flex items-center justify-between border-b border-white/10 bg-white/3 px-3 py-1.5">
        <span className="text-[11px] uppercase tracking-wider text-white/40">{language || "code"}</span>
        <button
          type="button"
          onClick={copy}
          aria-label={copied ? "Code copied" : "Copy code"}
          className="flex cursor-pointer items-center gap-1 text-[11px] text-white/50 transition-colors hover:text-white"
        >
          {copied ? <Check size={12} /> : <Copy size={12} />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={`thin-scrollbar overflow-x-auto leading-relaxed ${preClassName}`}>{children}</pre>
    </div>
  );
}
