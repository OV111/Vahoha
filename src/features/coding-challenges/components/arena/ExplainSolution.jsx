import { useState } from "react";
import { Lightbulb, Loader2, RotateCcw, Zap } from "lucide-react";
import { C, FONT_MONO } from "@/features/coding-challenges/lib/arenaTheme";
import SectionHead from "./SectionHead";
import { EXPLAIN_MAX_CHARS, EXPLAIN_MIN_CHARS, EXPLAIN_POINTS } from "@shared/challengeExplain";

/**
 * "Explain what you did", shown after a passing submit and before the
 * reference solution, so the explanation is the learner's own and not a
 * paraphrase of ours. The AI scores it on four fixed points.
 *
 * `explanation` is the last graded one (saved on the attempt), so coming back
 * to a solved challenge shows the feedback instead of an empty box.
 */
export default function ExplainSolution({ explanation, onExplain, onSkip, skipped }) {
  const [text, setText] = useState("");
  const [grading, setGrading] = useState(false);
  const [error, setError] = useState(null);
  const [rewriting, setRewriting] = useState(false);

  const submit = async () => {
    setGrading(true);
    setError(null);
    try {
      await onExplain(text.trim());
      setRewriting(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setGrading(false);
    }
  };

  if (explanation && !rewriting) {
    return (
      <ExplainResult
        explanation={explanation}
        onRewrite={() => {
          setText(explanation.text);
          setRewriting(true);
        }}
      />
    );
  }
  if (skipped) return null;

  const length = text.trim().length;
  const tooShort = length < EXPLAIN_MIN_CHARS;

  return (
    <div className="flex flex-col gap-3 rounded-md p-4" style={{ border: `1px solid ${C.border}`, background: "#0e0b14" }}>
      <div className="flex items-start gap-2.5">
        <Lightbulb size={16} className="mt-0.5 shrink-0" style={{ color: C.purple }} aria-hidden="true" />
        <div className="flex flex-col gap-1">
          <p className="text-[14px] font-semibold" style={{ color: C.text }}>
            Explain what you did
          </p>
          <p className="text-[12px] leading-relaxed" style={{ color: C.muted }}>
            Passing the tests shows your code works. Explaining it shows you understand it. Write a few sentences
            as if to a teammate; the reference solution opens after.
          </p>
        </div>
      </div>

      <ul className="grid grid-cols-1 gap-1.5 sm:grid-cols-2">
        {EXPLAIN_POINTS.map((p) => (
          <li key={p.id} className="flex items-start gap-2 text-[12px]" style={{ color: "#a1a1aa" }}>
            <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full" style={{ background: C.purple }} />
            <span>
              <span style={{ color: C.text }}>{p.label}:</span> {p.prompt}
            </span>
          </li>
        ))}
      </ul>

      <label className="sr-only" htmlFor="explain-solution">
        Your explanation
      </label>
      <textarea
        id="explain-solution"
        value={text}
        onChange={(e) => setText(e.target.value.slice(0, EXPLAIN_MAX_CHARS))}
        disabled={grading}
        rows={6}
        placeholder="I first sort the intervals by start, because then any that overlap sit next to each other…"
        className="w-full resize-y rounded-md px-3 py-2.5 text-[13px] leading-relaxed outline-none focus-visible:border-purple-500 disabled:opacity-60"
        style={{ background: C.bg, border: `1px solid ${C.border}`, color: C.text }}
      />

      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px]" style={{ color: tooShort ? C.faint : C.muted, fontFamily: FONT_MONO }}>
          {tooShort ? `${EXPLAIN_MIN_CHARS - length} more characters to go` : `${length}/${EXPLAIN_MAX_CHARS}`}
        </span>
        <div className="flex items-center gap-2">
          {!rewriting && (
            <button
              type="button"
              onClick={onSkip}
              disabled={grading}
              className="cursor-pointer px-2 py-1.5 text-[12px] underline-offset-2 hover:underline disabled:opacity-50"
              style={{ color: C.muted }}
            >
              Skip, show the solution
            </button>
          )}
          <button
            type="button"
            onClick={submit}
            disabled={tooShort || grading}
            className="flex cursor-pointer items-center gap-1.5 rounded px-4 py-1.5 text-[12px] font-semibold text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
            style={{ background: C.purple }}
          >
            {grading && <Loader2 size={12} className="animate-spin" aria-hidden="true" />}
            {grading ? "Reading your explanation…" : "Get feedback"}
          </button>
        </div>
      </div>

      {error && (
        <p role="alert" className="text-[12px]" style={{ color: C.rose }}>
          {error}
        </p>
      )}
    </div>
  );
}

const scoreColor = (score, max) => (score === max ? C.green : score > 0 ? C.amber : C.rose);

function ExplainResult({ explanation, onRewrite }) {
  const { score, maxScore, criteria, summary, xpEarned } = explanation;
  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <SectionHead>Your explanation</SectionHead>
        <div className="flex items-center gap-2">
          {xpEarned > 0 && (
            <span className="flex items-center gap-1 text-[11px] font-semibold" style={{ color: C.purple }}>
              <Zap size={11} aria-hidden="true" />+{xpEarned} xp
            </span>
          )}
          <span className="text-[13px] font-bold" style={{ color: scoreColor(score, maxScore), fontFamily: FONT_MONO }}>
            {score}/{maxScore}
          </span>
        </div>
      </div>

      {summary && (
        <p className="text-[13px] leading-relaxed" style={{ color: "#b4b4b4" }}>
          {summary}
        </p>
      )}

      <ul className="flex flex-col gap-2">
        {criteria.map((c) => (
          <li
            key={c.id}
            className="flex flex-col gap-1 rounded-md px-3 py-2"
            style={{ border: `1px solid ${C.border}`, background: C.bg }}
          >
            <div className="flex items-center justify-between gap-2">
              <span className="text-[12px] font-semibold" style={{ color: C.text }}>
                {c.label}
              </span>
              <span className="flex items-center gap-1" aria-label={`${c.score} of ${c.maxScore}`}>
                {Array.from({ length: c.maxScore }).map((_, i) => (
                  <span
                    key={i}
                    className="h-1.5 w-4 rounded-full"
                    style={{ background: i < c.score ? scoreColor(c.score, c.maxScore) : C.faint }}
                  />
                ))}
              </span>
            </div>
            {c.feedback && (
              <p className="text-[12px] leading-relaxed" style={{ color: C.muted }}>
                {c.feedback}
              </p>
            )}
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={onRewrite}
        className="flex cursor-pointer items-center gap-1.5 self-start text-[12px] underline-offset-2 hover:underline"
        style={{ color: C.purple }}
      >
        <RotateCcw size={11} aria-hidden="true" />
        Improve it and ask again
      </button>
    </div>
  );
}
