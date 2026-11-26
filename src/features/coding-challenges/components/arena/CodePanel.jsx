import { useState } from "react";
import { Code2 } from "lucide-react";
import { C, FONT_MONO } from "@/features/coding-challenges/lib/arenaTheme";
import CodeEditor from "./CodeEditor";
import { CHALLENGE_LANGUAGES } from "@shared/challengeLanguages";

const FILE_META = {
  js: { dot: C.amber, label: "JavaScript · UTF-8" },
  ts: { dot: "#5b9dff", label: "TypeScript · types are removed, not checked" },
  test: { dot: C.purple, label: "Jest Test · UTF-8" },
  python: { dot: "#4b8bbe", label: "Python · graded when you submit" },
  ruby: { dot: "#cc342d", label: "Ruby · graded when you submit" },
  php: { dot: "#8892be", label: "PHP · graded when you submit" },
  java: { dot: "#e76f00", label: "Java · graded when you submit" },
  cpp: { dot: "#659ad2", label: "C++ · standard library included · graded when you submit" },
  go: { dot: "#00add8", label: "Go · package main is added · graded when you submit" },
};

export default function CodePanel({ files, onChangeFile, onPaste, language = "js", languages = CHALLENGE_LANGUAGES, onLanguageChange }) {
  const [active, setActive] = useState(0);
  // Switching language can leave fewer files than the selected tab's index.
  const file = files[active] ?? files[0];

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
            const isActive = f === file;
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
          {/* Full names in a menu: with up to five languages, initials in a row
              of buttons did not say what could be chosen. A challenge with
              one language shows it as plain text, since there is no choice. */}
          {onLanguageChange && languages.length > 1 && (
            <label className="flex items-center gap-1.5 text-[11px]" style={{ color: C.muted, fontFamily: FONT_MONO }}>
              <Code2 size={12} aria-hidden="true" />
              <span className="max-sm:sr-only">Language</span>
              <select
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
                className="cursor-pointer rounded-md border px-2 py-1 text-[11px] font-medium outline-none focus-visible:border-purple-500"
                style={{ borderColor: C.border, background: C.bg, color: C.text, fontFamily: FONT_MONO }}
              >
                {languages.map((l) => (
                  <option key={l.id} value={l.id}>
                    {l.label}
                  </option>
                ))}
              </select>
            </label>
          )}
          {languages.length === 1 && (
            <span className="flex items-center gap-1.5 text-[11px] font-medium" style={{ color: C.text, fontFamily: FONT_MONO }}>
              <Code2 size={12} aria-hidden="true" />
              {languages[0].label} only
            </span>
          )}
        </div>
      </div>

      <div className="flex-1 min-h-0 overflow-hidden">
        <CodeEditor
          key={file.name}
          value={file.code}
          readOnly={file.lang === "test"}
          language={file.lang}
          onChange={(code) => onChangeFile?.(file.name, code)}
          onPaste={onPaste}
        />
      </div>
    </div>
  );
}
