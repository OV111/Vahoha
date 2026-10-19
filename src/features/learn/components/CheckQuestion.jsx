import { Check, X } from "lucide-react";
import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";

const optionClass = (state) => {
  const base =
    "flex min-h-12 w-full items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left text-[15px] transition-colors";
  if (state === "correct") return `${base} border-emerald-500/70 bg-emerald-950/40 text-emerald-100`;
  if (state === "wrong") return `${base} border-red-500/70 bg-red-950/30 text-red-100`;
  if (state === "muted") return `${base} border-neutral-800 text-neutral-500`;
  return `${base} cursor-pointer border-neutral-700 text-neutral-100 hover:border-purple-500 hover:bg-purple-950/30`;
};

/**
 * One retrieval question. The learner commits to an answer before seeing the
 * right one. `picked` lives in the player so going Back shows the same answer.
 */
export default function CheckQuestion({ step, picked, onPick }) {
  const answered = picked != null;

  const stateOf = (i) => {
    if (!answered) return "open";
    if (i === step.answer) return "correct";
    if (i === picked) return "wrong";
    return "muted";
  };

  return (
    <div>
      <MarkdownMessage content={step.q} className="text-[19px] font-medium leading-snug text-neutral-50" />
      {step.type === "predict" && !answered && (
        <p className="mt-2 text-sm text-neutral-500">Read the code on the right, then pick. Run unlocks after you answer.</p>
      )}

      <ul className="mt-6 space-y-2.5">
        {step.options.map((option, i) => (
          <li key={option}>
            <button
              type="button"
              disabled={answered}
              aria-pressed={picked === i}
              onClick={() => onPick(i)}
              className={optionClass(stateOf(i))}
            >
              <span>{option}</span>
              {stateOf(i) === "correct" && <Check size={16} aria-hidden="true" />}
              {stateOf(i) === "wrong" && <X size={16} aria-hidden="true" />}
            </button>
          </li>
        ))}
      </ul>

      <div role="status" aria-live="polite">
        {answered && (
          <div className="mt-5 rounded-xl bg-neutral-900/70 p-4 text-[15px] leading-relaxed text-neutral-300">
            <strong className={picked === step.answer ? "text-emerald-300" : "text-red-300"}>
              {picked === step.answer ? "Right. " : "Not quite. "}
            </strong>
            {step.why}
            {step.type === "predict" && <span className="text-neutral-500"> Run the code to see it happen.</span>}
          </div>
        )}
      </div>
    </div>
  );
}
