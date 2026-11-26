import { lazy, Suspense, useState } from "react";
import { Play, RotateCcw } from "lucide-react";
import useConsoleRunner from "@/features/learn/hooks/useConsoleRunner";

// Loaded apart: the editor is the heaviest thing on the page, and the code reads fine without it.
const CodeEditor = lazy(() => import("@/features/coding-challenges/components/arena/CodeEditor"));

const levelClass = { log: "text-neutral-100", warn: "text-amber-300", error: "text-red-300" };

/** A code example inside the text: edit it, run it, see what it prints right under it. */
export default function RunnableCode({ source, caption }) {
  const [draft, setDraft] = useState(source);
  const { run, running, lines } = useConsoleRunner();

  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-(--lesson-line) bg-(--lesson-code)">
      <div className="flex items-center justify-between border-b border-(--lesson-line) py-1.5 pl-5 pr-2">
        <figcaption className="text-[13px] text-neutral-300">{caption ?? "Try it: change the code and run it"}</figcaption>
        <div className="flex items-center gap-1">
          {draft !== source && (
            <button
              type="button"
              onClick={() => setDraft(source)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3 text-sm text-neutral-300 hover:text-white"
            >
              <RotateCcw size={14} aria-hidden="true" /> Reset
            </button>
          )}
          <button
            type="button"
            onClick={() => run(draft)}
            disabled={running}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg px-4 text-[13px] font-medium text-purple-200 transition-colors enabled:cursor-pointer enabled:hover:bg-white/10 disabled:opacity-50"
          >
            <Play size={14} fill="currentColor" aria-hidden="true" /> {running ? "Running" : "Run"}
          </button>
        </div>
      </div>
      <Suspense
        fallback={<pre className="overflow-x-auto px-5 py-3 font-mono text-[13px] leading-6 text-neutral-200">{draft}</pre>}
      >
        {/* 24px a line, as in the editor, plus its own padding. */}
        <div style={{ height: `${draft.split("\n").length * 24 + 16}px` }}>
          <CodeEditor value={draft} onChange={setDraft} />
        </div>
      </Suspense>
      <div role="log" aria-live="polite">
        {lines && (
          <div className="border-t border-(--lesson-line) bg-(--lesson-rail) px-5 py-3 font-mono text-[13px] leading-6">
            {lines.length === 0 && <p className="text-neutral-400">Nothing was printed.</p>}
            {lines.map((line, i) => (
              <p key={`${i}-${line.text}`} className={`whitespace-pre-wrap break-words ${levelClass[line.level]}`}>
                {line.text}
              </p>
            ))}
          </div>
        )}
      </div>
    </figure>
  );
}
