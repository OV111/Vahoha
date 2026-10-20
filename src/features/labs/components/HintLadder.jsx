import { Lightbulb, Lock, Eye } from "lucide-react";
import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";

const RUNGS = ["Nudge", "Hint", "Near answer"];

// Three hints, opened one at a time: a nudge, a real hint, then almost the
// answer. The solution only unlocks after all three, so a stuck learner is
// never blocked but always tries first.
export default function HintLadder({ hints, revealed, onReveal, onShowSolution, solutionShown = false }) {
  return (
    <section aria-label="Hints" className="mt-8 border-t border-neutral-800 pt-6">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
          <Lightbulb size={13} className="text-amber-300" aria-hidden="true" /> Stuck?
        </p>
        <span className="text-xs text-neutral-500 tabular-nums">{revealed}/3 used</span>
      </div>

      <ol className="mt-3 space-y-2">
        {hints.map((hint, i) => {
          const open = i < revealed;
          const next = i === revealed;
          return (
            <li key={i}>
              {open ? (
                <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 px-3.5 py-3">
                  <p className="text-[11px] font-semibold uppercase tracking-wider text-amber-300">{RUNGS[i]}</p>
                  <MarkdownMessage content={hint} className="mt-1 text-[13px] leading-relaxed text-neutral-200" />
                </div>
              ) : (
                <button
                  type="button"
                  disabled={!next}
                  onClick={onReveal}
                  className="flex min-h-11 w-full items-center justify-between rounded-xl border border-dashed border-neutral-700 px-3.5 text-left text-sm transition-colors duration-150 enabled:cursor-pointer enabled:text-neutral-200 enabled:hover:border-amber-400/60 enabled:hover:text-white disabled:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
                >
                  <span>
                    {next ? "Reveal" : ""} {RUNGS[i].toLowerCase()} {i + 1}
                  </span>
                  {!next && <Lock size={13} aria-hidden="true" />}
                </button>
              )}
            </li>
          );
        })}
      </ol>

      <button
        type="button"
        disabled={revealed < 3 || solutionShown}
        onClick={onShowSolution}
        title={revealed < 3 ? "Opens after all three hints" : solutionShown ? "The solution is in the editor" : undefined}
        className="mt-3 inline-flex min-h-11 items-center gap-2 rounded-xl px-1 text-sm text-neutral-400 transition-colors enabled:cursor-pointer enabled:hover:text-white disabled:text-neutral-600 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
      >
        <Eye size={14} aria-hidden="true" /> Show solution
      </button>
    </section>
  );
}
