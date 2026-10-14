import { useMemo, useState } from "react";
import { Check, Copy } from "lucide-react";
import { C, FONT_MONO } from "../../lib/arenaTheme";
import { parseExample, tokenize } from "../../lib/exampleFormat";

const TOKEN_COLOR = {
  string: "#a5d6a7",
  number: "#f2b880",
  keyword: "#f472b6",
  property: "#c4b5fd",
  call: "#7dd3fc",
  punct: "#8b8b8b",
};

function Code({ text }) {
  return (
    <pre className="thin-scrollbar overflow-x-auto text-[12.5px] leading-6" style={{ fontFamily: FONT_MONO, color: "#d4d4d4" }}>
      {text.split("\n").map((line, i) => (
        <span key={i} className="block min-h-6 whitespace-pre">
          {tokenize(line).map((t, j) => (
            <span key={j} style={t.kind ? { color: TOKEN_COLOR[t.kind] } : undefined}>
              {t.text}
            </span>
          ))}
        </span>
      ))}
    </pre>
  );
}

/**
 * A challenge example, split into the call, the explanation and the result so
 * each reads as what it is (see lib/exampleFormat for the parsing).
 */
export default function ExampleBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const blocks = useMemo(() => parseExample(code), [code]);
  const callText = blocks.filter((b) => b.type === "code").map((b) => b.text).join("\n");

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(callText || code);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      /* clipboard blocked: nothing useful to show */
    }
  };

  return (
    <div className="overflow-hidden rounded-lg" style={{ background: "#0a0a0a", border: `1px solid ${C.border}` }}>
      <div className="flex items-center justify-between px-3 py-1.5" style={{ borderBottom: `1px solid ${C.border}` }}>
        <span className="text-[12px]" style={{ color: C.muted }}>
          js
        </span>
        <button
          type="button"
          onClick={copy}
          className="flex cursor-pointer items-center gap-1 rounded px-1.5 py-0.5 text-[12px] transition-colors hover:bg-white/10"
          style={{ color: copied ? C.green : "#9a9a9a" }}
        >
          {copied ? <Check size={12} aria-hidden="true" /> : <Copy size={12} aria-hidden="true" />}
          {copied ? "Copied" : "Copy call"}
        </button>
      </div>

      <div className="flex flex-col gap-3 p-3">
        {blocks.map((b, i) => {
          if (b.type === "code") return <Code key={i} text={b.text} />;
          if (b.type === "note") {
            return (
              <p key={i} className="text-[13px] leading-relaxed" style={{ color: "#a3a3a3" }}>
                {b.text}
              </p>
            );
          }
          return (
            <div
              key={i}
              className="rounded-md px-3 py-2"
              style={{ background: "rgba(45,212,106,0.07)", borderLeft: `2px solid ${C.green}` }}
            >
              <p className="mb-1 text-[12px] font-medium" style={{ color: C.green }}>
                Returns
              </p>
              <Code text={b.text} />
              {b.aside && (
                <p className="mt-1 text-[13px] leading-relaxed" style={{ color: "#a3a3a3" }}>
                  {b.aside}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
