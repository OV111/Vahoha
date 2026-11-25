import { LESSON_PARTS, partOf } from "../../lib/lessonParts";
import { LEARN_PHASES } from "../../../../../constants/learn";

/** The road ahead, on a lesson's first screen: its parts, and how many steps each has. */
export default function LessonPlan({ steps, outcome, minutes }) {
  return (
    <section aria-labelledby="lesson-plan" className="mt-10 rounded-xl bg-(--lesson-raised) p-6">
      <h3 id="lesson-plan" className="text-[18px] font-semibold text-white">
        In {minutes} minutes you can {outcome}
      </h3>
      <ol className="mt-5 space-y-4">
        {LESSON_PARTS.map((name, part) => (
          <li key={name} className="flex gap-4">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-purple-500/20 text-[15px] font-semibold text-purple-200">
              {part + 1}
            </span>
            <p className="min-w-0 flex-1 text-[16px] leading-snug text-neutral-300">
              <span className="block font-medium text-white">{name}</span>
              {LEARN_PHASES[part].body}
            </p>
            <span className="shrink-0 text-sm text-neutral-400">
              {steps.filter((s) => partOf(s) === part).length === 1
                ? "1 step"
                : `${steps.filter((s) => partOf(s) === part).length} steps`}
            </span>
          </li>
        ))}
      </ol>
    </section>
  );
}
