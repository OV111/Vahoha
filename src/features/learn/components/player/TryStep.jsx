import { useState } from "react";
import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";
import { TRY_COPY as COPY } from "../../../../../constants/learn";

const FEEDBACK = {
  passed: "bg-emerald-950/40 text-emerald-100",
  shown: "bg-emerald-950/40 text-emerald-100",
  failed: "bg-amber-950/40 text-amber-100",
};

const helpButton =
  "min-h-11 cursor-pointer rounded-xl bg-(--lesson-raised) px-5 text-[15px] text-neutral-100 transition-colors hover:bg-purple-900";

/** `result` is undefined | "failed" | "passed" | "shown"; the player decides it from what the code printed. */
export default function TryStep({ step, result, onShowFix }) {
  const [hint, setHint] = useState(false);
  return (
    <>
      <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-white">{step.title}</h2>
      <MarkdownMessage content={step.body} className="mt-5 text-[17px] leading-[1.7] text-neutral-300" />

      <div role="status">
        {result && (
          <p className={`mt-6 rounded-xl p-4 text-[15px] leading-relaxed ${FEEDBACK[result]}`}>{COPY[result]}</p>
        )}
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <button type="button" onClick={() => setHint(true)} className={helpButton}>
          {COPY.hint}
        </button>
        <button type="button" onClick={onShowFix} className={helpButton}>
          {COPY.fix}
        </button>
      </div>
      <p role="status" className="mt-4 text-[15px] leading-relaxed text-neutral-400">
        {hint && step.hint}
      </p>
    </>
  );
}
