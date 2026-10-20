import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, ArrowRight, Sparkles } from "lucide-react";
import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";

// After the tests pass: one line on what the bug or risk was. Naming it is
// what turns "I got it to pass" into "I understand what was wrong".
export default function NameItCard({ nameIt, onDone }) {
  const [text, setText] = useState("");
  const [picked, setPicked] = useState(null);
  const [wrong, setWrong] = useState(false);

  const submit = (e) => {
    e.preventDefault();
    if (nameIt.choices) {
      if (picked === nameIt.answer) onDone();
      else setWrong(true);
    } else if (text.trim()) {
      onDone();
    }
  };

  return (
    <form
      onSubmit={submit}
      className="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-4"
      aria-label="Name the problem"
    >
      <p className="flex items-center gap-2 text-sm font-semibold text-emerald-300">
        <CheckCircle2 size={16} aria-hidden="true" /> All tests pass. One last step.
      </p>
      <label htmlFor="name-it" className="mt-3 block text-sm font-medium text-white">
        {nameIt.question}
      </label>

      {nameIt.choices ? (
        <div id="name-it" role="radiogroup" className="mt-2 flex flex-wrap gap-2">
          {nameIt.choices.map((c) => (
            <button
              key={c}
              type="button"
              role="radio"
              aria-checked={picked === c}
              onClick={() => {
                setPicked(c);
                setWrong(false);
              }}
              className={`min-h-11 rounded-xl border px-4 text-sm transition-colors duration-150 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 ${
                picked === c ? "border-purple-400 bg-purple-600/20 text-white" : "border-neutral-700 text-neutral-300 hover:border-neutral-500"
              }`}
            >
              {c}
            </button>
          ))}
        </div>
      ) : (
        <input
          id="name-it"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder={nameIt.placeholder}
          className="mt-2 min-h-11 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-3 text-sm text-white placeholder:text-neutral-500 focus:border-purple-400 focus:outline-none"
        />
      )}

      {wrong && <p className="mt-2 text-sm text-amber-300">{nameIt.wrongHint ?? "Not quite. Look at the failing test again."}</p>}

      <button
        type="submit"
        disabled={nameIt.choices ? !picked : !text.trim()}
        className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors enabled:hover:bg-purple-500 disabled:bg-neutral-800 disabled:text-neutral-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
      >
        Check <ArrowRight size={14} aria-hidden="true" />
      </button>
    </form>
  );
}

// `explanation`: the real cause or risk, shown after the learner named it in
// their own words, so they can compare (self-explanation, then feedback).
export function TaskComplete({ isLast, onNext, backHref, explanation }) {
  return (
    <div className="rounded-2xl border border-purple-500/40 bg-purple-950/30 p-4">
      <p className="flex items-center gap-2 text-sm font-semibold text-white">
        <Sparkles size={16} className="text-purple-300" aria-hidden="true" />
        {isLast ? "Lab complete. You debugged, built and reviewed." : "Task complete."}
      </p>
      {explanation && (
        <div className="mt-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-400">What was really going on</p>
          <MarkdownMessage content={explanation} className="mt-1 text-[13px] leading-relaxed text-neutral-200" />
        </div>
      )}
      {isLast ? (
        <Link
          to={backHref}
          className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
        >
          Back to the lesson <ArrowRight size={14} aria-hidden="true" />
        </Link>
      ) : (
        <button
          type="button"
          onClick={onNext}
          className="mt-3 inline-flex h-9 items-center gap-2 rounded-lg bg-purple-600 px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
        >
          Next task <ArrowRight size={14} aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
