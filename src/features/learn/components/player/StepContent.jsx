import { Lightbulb } from "lucide-react";
import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";
import CheckQuestion from "../CheckQuestion";
import ExplainBack from "../ExplainBack";
import LessonDiagram from "./LessonDiagram";
import ProblemStep from "./ProblemStep";
import TryStep from "./TryStep";

function KeyIdea({ children }) {
  return (
    <div className="mt-8 flex gap-4 rounded-xl bg-(--lesson-raised) p-5">
      <span className="flex size-9 shrink-0 items-center justify-center rounded-full bg-amber-300/15 text-amber-300">
        <Lightbulb size={18} aria-hidden="true" />
      </span>
      <div>
        <p className="text-sm font-medium text-amber-200">Key idea</p>
        <p className="mt-0.5 text-[18px] font-medium leading-snug text-white">{children}</p>
      </div>
    </div>
  );
}

function ReadStep({ step }) {
  return (
    <>
      <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-balance text-white">{step.title}</h2>
      {step.diagram && (
        <div className="mt-6">
          <LessonDiagram name={step.diagram} />
        </div>
      )}
      <MarkdownMessage content={step.body} className="mt-6 text-[17px] leading-[1.7] text-neutral-200" />
      <KeyIdea>{step.key}</KeyIdea>
    </>
  );
}

/** The middle column: whatever the current step asks of the learner. */
export default function StepContent({ step, content, answer, result, explain, onAnswer, onShowFix, onExplain }) {
  switch (step.kind) {
    case "problem":
      return <ProblemStep step={step} content={content} />;
    case "read":
      return <ReadStep step={step} />;
    case "try":
      return <TryStep step={step} result={result} onShowFix={onShowFix} />;
    case "explain":
      return (
        <>
          <h2 className="mb-4 text-[32px] font-semibold leading-tight tracking-tight text-white">Explain it back</h2>
          <ExplainBack step={step} value={explain} onChange={onExplain} />
        </>
      );
    default:
      return (
        <>
          <h2 className="mb-4 text-[32px] font-semibold leading-tight tracking-tight text-white">
            {step.ai ? "Find AI's mistake" : "Quick check"}
          </h2>
          <CheckQuestion step={step} picked={answer} onPick={onAnswer} />
        </>
      );
  }
}
