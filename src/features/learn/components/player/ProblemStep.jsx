import { useState } from "react";
import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";
import LessonPlan from "./LessonPlan";

// The bug itself, live: every handler answers with the shared variable's final value.
function LoopButtons() {
  const [clicked, setClicked] = useState(null);
  return (
    <div className="mt-6">
      <div className="flex flex-wrap gap-3">
        {[0, 1, 2].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => setClicked(n)}
            className="min-h-14 cursor-pointer rounded-xl bg-(--lesson-raised) px-7 text-[16px] font-medium text-white transition-colors hover:bg-purple-700"
          >
            Button {n}
          </button>
        ))}
      </div>
      <p role="status" className="mt-4 text-[17px] text-neutral-300">
        {clicked === null ? "Nothing clicked yet" : `Button ${clicked} says: 3`}
      </p>
    </div>
  );
}

const DEMOS = { "loop-buttons": LoopButtons };

export default function ProblemStep({ step, content }) {
  const Demo = DEMOS[step.demo];
  return (
    <>
      <h2 className="text-[36px] font-semibold leading-tight tracking-tight text-balance text-white">{step.title}</h2>
      <MarkdownMessage content={step.body} className="mt-5 text-[17px] leading-[1.7] text-neutral-300" />
      {Demo && <Demo />}
      <LessonPlan steps={content.steps} outcome={content.outcome} minutes={content.minutes} />
    </>
  );
}
