import { useState } from "react";
import { C, FONT_MONO } from "../../lib/arenaTheme";
import CodeEditor from "./CodeEditor";
import { CHALLENGE_LANGUAGES } from "../../../../../constants/challengeLanguages";

const FILE_META = {
  js: { dot: C.amber, label: "JavaScript · UTF-8" },
  ts: { dot: "#5b9dff", label: "TypeScript · types are removed, not checked" },
  test: { dot: C.purple, label: "Jest Test · UTF-8" },
};

export default function CodePanel({ files, onChangeFile, language = "js", onLanguageChange }) {
  const [active, setActive] = useState(0);
  const file = files[active];

  if (!file) return <div className="h-full" style={{ background: C.bg }} />;

  return (
    <div className="flex flex-col h-full" style={{ background: C.bg }}>
      <div
        className="flex items-center justify-between border-b shrink-0"
        style={{ borderColor: C.border, background: C.surface }}
      >
        <div className="flex min-w-0 overflow-x-auto">
          {files.map((f, i) => {
            const meta = FILE_META[f.lang] || FILE_META.js;
            const isActive = active === i;
            return (
              <button
                key={f.name}
                onClick={() => setActive(i)}
                className="flex items-center gap-2 px-4 py-2.5 text-[12px] font-medium transition-all cursor-pointer border-b-2"
                style={{
                  borderBottomColor: isActive ? meta.dot : "transparent",
                  color: isActive ? C.text : C.muted,
                  background: isActive ? C.bg : "transparent",
                  fontFamily: FONT_MONO,
                }}
              >
                <span className="w-2 h-2 rounded-full shrink-0" style={{ background: meta.dot }} />
                {f.name}
              </button>
            );
          })}
        </div>
        <div className="flex items-center gap-3 pr-3 shrink-0">
          <span className="text-[11px] whitespace-nowrap max-lg:hidden" style={{ color: C.faint, fontFamily: FONT_MONO }}>
            {(FILE_META[file.lang] || FILE_META.js).label}
          </span>
          {onLanguageChange && (
            <div role="group" aria-label="Language" className="flex rounded-md overflow-hidden border" style={{ borderColor: C.border }}>
              {CHALLENGE_LANGUAGES.map((l) => {
                const on = l.id === language;
                return (
                  <button
                    key={l.id}
                    type="button"
                    aria-pressed={on}
                    onClick={() => onLanguageChange(l.id)}
                    className="px-2.5 py-1 text-[11px] font-medium cursor-pointer transition-colors"
                    style={{
                      fontFamily: FONT_MONO,
                      color: on ? C.text : C.muted,
                      background: on ? "rgba(168, 85, 247, 0.18)" : "transparent",
                    }}
                  >
                    {l.id === "ts" ? "TS" : "JS"}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <CodeEditor
          key={file.name}
          value={file.code}
          readOnly={file.lang === "test"}
          typescript={file.lang === "ts"}
          onChange={(code) => onChangeFile?.(file.name, code)}
        />
      </div>
    </div>
  );
}
