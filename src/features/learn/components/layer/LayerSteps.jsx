import { Link } from "react-router-dom";
import { Check, ChevronRight } from "lucide-react";

const DOT = {
  done: "border-emerald-500 text-emerald-400",
  next: "border-purple-500 bg-purple-500 ring-4 ring-purple-500/20",
  todo: "border-neutral-600",
};

const TAG = { done: "text-emerald-400", next: "text-purple-300", todo: "text-neutral-400" };

function StepTag({ lessons, current }) {
  if (lessons.every((l) => l.state === "done")) return <span className={`text-sm ${TAG.done}`}>Done</span>;
  if (current) return <span className={`text-sm ${TAG.next}`}>You are here</span>;
  return <span className={`text-sm ${TAG.todo}`}>{lessons.length} lessons</span>;
}

function LessonRow({ lesson }) {
  const { title, href, state, written, minutes } = lesson;
  const kind = written ? `${minutes} min` : "Reading list";
  const tag = { done: "Done", next: `Up next, ${kind.toLowerCase()}`, todo: kind }[state];
  return (
    <li>
      <Link
        to={href}
        className="-mx-3 flex min-h-13 items-center gap-4 rounded-xl px-3 py-2.5 transition-colors hover:bg-neutral-900"
      >
        <span
          aria-hidden="true"
          className={`flex size-5 shrink-0 items-center justify-center rounded-full border-2 ${DOT[state]}`}
        >
          {state === "done" && <Check size={11} strokeWidth={3} />}
        </span>
        <span className={`min-w-0 flex-1 text-[17px] leading-snug ${written ? "text-neutral-100" : "text-neutral-400"}`}>
          {title}
        </span>
        <span className={`shrink-0 text-sm ${TAG[state]}`}>{tag}</span>
      </Link>
    </li>
  );
}

/**
 * A layer's lessons as a straight list, grouped by step in teaching order. Only
 * the step holding the next lesson starts open; with nothing next, all do.
 */
export default function LayerSteps({ lessons }) {
  const steps = [];
  for (const lesson of lessons) {
    if (steps.at(-1)?.title !== lesson.step) steps.push({ title: lesson.step, lessons: [] });
    steps.at(-1).lessons.push(lesson);
  }

  const current = steps.findIndex((s) => s.lessons.some((l) => l.state === "next"));

  return (
    <ol className="divide-y divide-neutral-800 border-y border-neutral-800">
      {steps.map((step, i) => (
        <li key={step.title}>
          <details open={current === -1 || i === current} className="group">
            <summary className="flex min-h-16 cursor-pointer list-none items-center gap-3 py-4 [&::-webkit-details-marker]:hidden">
              <ChevronRight
                size={16}
                className="shrink-0 text-neutral-500 transition-transform group-open:rotate-90 motion-reduce:transition-none"
                aria-hidden="true"
              />
              <h3 className="min-w-0 flex-1 text-lg font-semibold text-neutral-50">
                {i + 1}. {step.title}
              </h3>
              <StepTag lessons={step.lessons} current={i === current} />
            </summary>
            <ul className="pb-4 pl-7">
              {step.lessons.map((lesson) => (
                <LessonRow key={lesson.slug} lesson={lesson} />
              ))}
            </ul>
          </details>
        </li>
      ))}
    </ol>
  );
}
