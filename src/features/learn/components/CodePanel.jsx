import { useState } from "react";
import { Lock, Play, RotateCcw } from "lucide-react";
import CodeEditor from "@/features/coding-challenges/components/arena/CodeEditor";
import useConsoleRunner from "../hooks/useConsoleRunner";

const LINE_STAGGER_MS = 90;

const levelClass = { log: "text-neutral-200", warn: "text-amber-300", error: "text-red-300" };

/**
 * Editable code for the current step, a Run button and the console.
 * Mounted with a per-step key, so edits and output reset when the step changes.
 * `lockedReason` keeps Run disabled on predict steps until the learner answers.
 */
export default function CodePanel({ source, lockedReason }) {
  const [draft, setDraft] = useState(source);
  const { run, running, lines } = useConsoleRunner();
  const edited = draft !== source;
  const canRun = !lockedReason && !running;

  const onKeyDown = (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key === "Enter" && canRun) {
      e.preventDefault();
      run(draft);
    }
  };

  return (
    <div
      onKeyDown={onKeyDown}
      className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505]"
    >
      <div className="flex items-center justify-between gap-2 border-b border-neutral-800 px-3 py-2">
        <span className="font-mono text-xs text-neutral-500">main.js</span>
        <div className="flex items-center gap-1">
          {edited && (
            <button
              type="button"
              onClick={() => setDraft(source)}
              className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 rounded-lg px-3 text-xs text-neutral-400 hover:text-neutral-100"
            >
              <RotateCcw size={12} aria-hidden="true" /> Reset
            </button>
          )}
          <button
            type="button"
            onClick={() => run(draft)}
            disabled={!canRun}
            title={lockedReason ?? "Run (Ctrl+Enter)"}
            className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors enabled:cursor-pointer enabled:hover:bg-purple-500 disabled:bg-neutral-800 disabled:text-neutral-500"
          >
            {lockedReason ? <Lock size={13} aria-hidden="true" /> : <Play size={13} fill="currentColor" aria-hidden="true" />}
            {running ? "Running…" : "Run"}
          </button>
        </div>
      </div>

      <div className="min-h-[180px] flex-1 overflow-auto">
        <CodeEditor value={draft} onChange={setDraft} />
      </div>

      <div className="h-44 shrink-0 overflow-auto border-t border-neutral-800 px-4 py-3 font-mono text-[13px] leading-6 lg:h-56">
        <p className="mb-1 text-xs text-neutral-600">Console</p>
        <div role="log" aria-live="polite">
          {lockedReason && <p className="text-neutral-500">{lockedReason}</p>}
          {!lockedReason && lines === null && <p className="text-neutral-600">Press Run to see what this prints.</p>}
          {lines?.length === 0 && <p className="text-neutral-600">Nothing was printed.</p>}
          {lines?.map((line, i) => (
            <p
              // Output order is the point of the lesson, so index is the right key.
              key={`${i}-${line.text}`}
              className={`learn-console-line flex justify-between gap-4 ${levelClass[line.level]}`}
              style={{ animationDelay: `${i * LINE_STAGGER_MS}ms` }}
            >
              <span className="min-w-0 whitespace-pre-wrap break-words">{line.text}</span>
              <span className="shrink-0 text-xs text-neutral-600">{line.ms} ms</span>
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
