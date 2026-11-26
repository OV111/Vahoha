import { lazy, Suspense, useState } from "react";
import { Play, RotateCcw } from "lucide-react";

// Loaded apart: the editor is the heaviest thing on the page, and the code reads fine without it.
const CodeEditor = lazy(() => import("@/features/coding-challenges/components/arena/CodeEditor"));

const htmlPage = (source) => `<!doctype html><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<style>body{font:16px/1.5 system-ui,sans-serif;margin:16px;color:#111;background:#fff}</style>${source}`;

// React examples: the runtime is a plain script (scripts/buildLessonReact.js), and the
// source travels as a JSON string with < escaped, so it can't close the script tag.
const reactPage = (source) =>
  htmlPage(`<style>#console{margin-top:12px;font:13px/1.6 ui-monospace,monospace;color:#555}#console .error{color:#b91c1c}</style>
<div id="root"></div><div id="console"></div>
<script src="${window.location.origin}/lesson-react.js"></script>
<script>runLesson(${JSON.stringify(source).replace(/</g, "\\u003c")})</script>`);

/**
 * An HTML or React example with the page it makes. The frame is sandboxed without
 * allow-same-origin: what the learner runs can't reach the app, its storage or its cookies.
 */
export default function LivePreview({ lang, source, caption }) {
  const [draft, setDraft] = useState(source);
  const [shown, setShown] = useState({ source, run: 0 });
  const show = (next) => setShown((s) => ({ source: next, run: s.run + 1 }));

  return (
    <figure className="my-7 overflow-hidden rounded-xl border border-(--lesson-line) bg-(--lesson-code)">
      <div className="flex items-center justify-between border-b border-(--lesson-line) py-1.5 pl-5 pr-2">
        <figcaption className="text-[13px] text-neutral-300">{caption ?? "Try it: change the code and run it"}</figcaption>
        <div className="flex items-center gap-1">
          {draft !== source && (
            <button
              type="button"
              onClick={() => {
                setDraft(source);
                show(source);
              }}
              className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-3 text-[13px] text-neutral-300 hover:text-white"
            >
              <RotateCcw size={14} aria-hidden="true" /> Reset
            </button>
          )}
          <button
            type="button"
            onClick={() => show(draft)}
            className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg px-4 text-[13px] font-medium text-purple-200 transition-colors hover:bg-white/10"
          >
            <Play size={14} fill="currentColor" aria-hidden="true" /> Run
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
      <iframe
        // A new run is a new document, also when the code is the same.
        key={shown.run}
        title="Preview"
        // allow-forms: without it no submit event is sent at all.
        sandbox="allow-scripts allow-forms"
        srcDoc={(lang === "jsx" ? reactPage : htmlPage)(shown.source)}
        loading="lazy"
        className="block h-56 w-full border-t border-(--lesson-line) bg-white"
      />
    </figure>
  );
}
