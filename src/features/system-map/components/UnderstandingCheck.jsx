import { useState } from "react";
import { Check, ChevronDown, Crosshair, RotateCcw } from "lucide-react";
import { startCheck, submitAnswers } from "../understandingApi";

const MAX_ANSWER = 1500;

const SCORE = {
  2: { label: "Strong", tone: "text-emerald-300", dot: "bg-emerald-400" },
  1: { label: "Partial", tone: "text-amber-300", dot: "bg-amber-400" },
  0: { label: "Missing", tone: "text-red-300", dot: "bg-red-400" },
};

const primary =
  "inline-flex min-h-11 cursor-pointer items-center justify-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-purple-400 disabled:cursor-not-allowed disabled:bg-neutral-800 disabled:text-neutral-500";
const secondary =
  "inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-neutral-700 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400";

function ScoreDots({ score }) {
  const s = SCORE[score] ?? SCORE[0];
  return (
    <span className={`inline-flex items-center gap-2 text-xs font-semibold ${s.tone}`}>
      <span aria-hidden="true" className="flex gap-1">
        {[1, 2].map((i) => (
          <span key={i} className={`size-2 rounded-full ${i <= score ? s.dot : "bg-neutral-700"}`} />
        ))}
      </span>
      {s.label}
    </span>
  );
}

function ResultItem({ question, result, index }) {
  const [open, setOpen] = useState(false);
  return (
    <li className="rounded-xl border border-neutral-800 bg-black/40 p-3">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm text-white">
          <span className="mr-1.5 text-neutral-500">Q{index + 1}</span>
          {question.q}
        </p>
        <ScoreDots score={result.score} />
      </div>
      <p className="mt-2 text-sm leading-relaxed text-neutral-300">{result.feedback}</p>
      {result.missed.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="text-xs text-neutral-500">Missed:</span>
          {result.missed.map((m) => (
            <span key={m} className="rounded-full bg-neutral-800 px-2 py-0.5 text-xs text-neutral-300">
              {m}
            </span>
          ))}
        </div>
      )}
      <button
        type="button"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="mt-1 inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200"
      >
        <ChevronDown size={14} className={open ? "rotate-180" : ""} aria-hidden="true" />
        {open ? "Hide model answer" : "Show model answer"}
      </button>
      {open && <p className="text-sm leading-relaxed text-neutral-400">{result.modelAnswer}</p>}
    </li>
  );
}

/**
 * "Can you explain your system?" Three questions about the learner's own map,
 * graded by the server. Drafts live here only; a failed grading keeps them so
 * the learner can send again without retyping.
 *
 * @param {{ mapId: string, onFocus?: (nodeIds: string[]) => void }} props
 */
export default function UnderstandingCheck({ mapId, onFocus }) {
  const [phase, setPhase] = useState("intro"); // intro | loading | questions | grading | results
  const [check, setCheck] = useState(null);
  const [drafts, setDrafts] = useState({});
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const begin = async () => {
    setPhase("loading");
    setError(null);
    setResult(null);
    setDrafts({});
    try {
      setCheck(await startCheck(mapId));
      setPhase("questions");
    } catch (err) {
      setError(err.message);
      setPhase("intro");
    }
  };

  const send = async () => {
    setPhase("grading");
    setError(null);
    try {
      const answers = check.questions.map((q) => ({ id: q.id, text: drafts[q.id].trim() }));
      setResult(await submitAnswers(check.checkId, answers));
      setPhase("results");
    } catch (err) {
      // 409: these questions were already graded, so only new ones can help.
      setError(err.status === 409 ? "These questions were already answered. Try new ones." : err.message);
      setPhase("questions");
    }
  };

  const ready = check?.questions.every((q) => drafts[q.id]?.trim()) ?? false;
  const busy = phase === "loading" || phase === "grading";

  return (
    <section aria-labelledby="understanding-title" className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-widest text-amber-300">Understanding check</p>
      <h2 id="understanding-title" className="mt-1 text-base font-semibold text-white">
        Can you explain your system?
      </h2>

      {(phase === "intro" || phase === "loading") && (
        <>
          <p className="mt-1 text-sm leading-relaxed text-neutral-400">Answer 3 questions about your own map. An AI reads your answers and says what you missed.</p>
          <button type="button" className={`${primary} mt-3`} onClick={begin} disabled={busy}>
            {phase === "loading" ? "Writing questions…" : "Start"}
          </button>
        </>
      )}

      {(phase === "questions" || phase === "grading") && check && (
        <form
          className="mt-3 space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            if (ready && !busy) send();
          }}
        >
          {check.questions.map((q, i) => {
            const text = drafts[q.id] ?? "";
            return (
              <div key={q.id}>
                <label htmlFor={`answer-${q.id}`} className="block text-sm text-white">
                  <span className="mr-1.5 text-neutral-500">Q{i + 1}</span>
                  {q.q}
                </label>
                <textarea
                  id={`answer-${q.id}`}
                  value={text}
                  maxLength={MAX_ANSWER}
                  rows={4}
                  disabled={phase === "grading"}
                  onChange={(e) => setDrafts((d) => ({ ...d, [q.id]: e.target.value }))}
                  className="mt-1.5 w-full rounded-lg border border-neutral-700 bg-black px-3 py-2 text-sm text-white placeholder:text-neutral-600 focus-visible:outline-2 focus-visible:outline-purple-400 disabled:opacity-60"
                  placeholder="In your own words…"
                />
                <div className="flex items-center justify-between gap-2">
                  {onFocus && q.focus?.length > 0 ? (
                    <button
                      type="button"
                      onClick={() => onFocus(q.focus)}
                      className="inline-flex min-h-11 cursor-pointer items-center gap-1.5 text-xs text-purple-300 hover:text-purple-200"
                    >
                      <Crosshair size={13} aria-hidden="true" /> Show on map
                    </button>
                  ) : (
                    <span />
                  )}
                  <span className={`text-xs tabular-nums ${text.length >= MAX_ANSWER ? "text-amber-300" : "text-neutral-500"}`}>
                    {text.length}/{MAX_ANSWER}
                  </span>
                </div>
              </div>
            );
          })}
          <button type="submit" className={primary} disabled={!ready || busy}>
            {phase === "grading" ? "Grading…" : "Submit answers"}
          </button>
        </form>
      )}

      {phase === "results" && result && (
        <div className="mt-3" aria-live="polite">
          <p
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-sm ${
              result.passed ? "bg-emerald-500/10 text-emerald-300" : "bg-amber-500/10 text-amber-300"
            }`}
          >
            {result.passed ? <Check size={15} aria-hidden="true" /> : null}
            {result.passed ? "Passed. You can explain how your system works." : "Not yet. Read what you missed, then try new questions."}
          </p>
          <ol className="mt-3 space-y-3">
            {check.questions.map((q, i) => {
              const r = result.results.find((x) => x.id === q.id);
              return r ? <ResultItem key={q.id} question={q} result={r} index={i} /> : null;
            })}
          </ol>
          <button type="button" className={`${secondary} mt-3`} onClick={begin}>
            <RotateCcw size={14} aria-hidden="true" /> Try new questions
          </button>
        </div>
      )}

      {error && (
        <div role="alert" className="mt-3 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-red-300">
          {error}
          {phase === "questions" && error.startsWith("These questions") && (
            <button type="button" onClick={begin} className="ml-2 min-h-11 cursor-pointer underline underline-offset-2">
              New questions
            </button>
          )}
        </div>
      )}
    </section>
  );
}
