import { Check, CircleHelp, BookOpen, Bug, MessageSquareText, Search, Wrench } from "lucide-react";
import { LESSON_PARTS, partOf } from "../../lib/lessonParts";

const KIND_ICON = { problem: Search, read: BookOpen, check: CircleHelp, try: Wrench, explain: MessageSquareText };

function StepButton({ step, state, reachable, onClick }) {
  const Icon = step.ai ? Bug : KIND_ICON[step.kind];
  const tone = {
    current: "bg-(--lesson-raised) font-medium text-white",
    done: "text-neutral-200 enabled:hover:bg-(--lesson-raised)",
    ahead: "text-neutral-400 enabled:hover:bg-(--lesson-raised)",
  }[state];
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={!reachable}
      aria-current={state === "current" ? "step" : undefined}
      className={`flex min-h-11 w-full items-center gap-3 rounded-lg px-3 text-left text-[15px] transition-colors enabled:cursor-pointer lg:min-h-10 ${tone}`}
    >
      <span
        className={`flex size-6 shrink-0 items-center justify-center rounded-full ${
          {
            current: "bg-purple-600 text-white",
            done: "bg-emerald-500/15 text-emerald-300",
            ahead: "bg-white/5 text-neutral-400",
          }[state]
        }`}
      >
        {state === "done" ? (
          <Check size={13} strokeWidth={3} aria-label="Done" />
        ) : (
          <Icon size={13} aria-hidden="true" />
        )}
      </span>
      <span className="min-w-0 truncate">{step.short}</span>
    </button>
  );
}

/** Every step of the lesson, under the part it belongs to. Only steps already reached can be opened. */
export default function LessonOutline({ steps, index, furthest, onOpen }) {
  return (
    <nav aria-label="Lesson outline">
      <ol className="space-y-6">
        {LESSON_PARTS.map((name, part) => {
          const inPart = steps.map((step, i) => ({ step, i })).filter(({ step }) => partOf(step) === part);
          const done = inPart.filter(({ i }) => i < furthest).length;
          return (
            <li key={name}>
              <p className="flex items-baseline justify-between px-3 pb-2">
                <span className="text-[15px] font-semibold text-white">{name}</span>
                <span className="text-sm tabular-nums text-neutral-400">
                  {done}/{inPart.length}
                </span>
              </p>
              <ol className="space-y-0.5">
                {inPart.map(({ step, i }) => (
                  <li key={i}>
                    <StepButton
                      step={step}
                      state={i === index ? "current" : i < furthest ? "done" : "ahead"}
                      reachable={i <= furthest}
                      onClick={() => onOpen(i)}
                    />
                  </li>
                ))}
              </ol>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
