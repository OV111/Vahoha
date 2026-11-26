import { Link } from "react-router-dom";
import { Check, Play } from "lucide-react";

// Every row uses the same columns, so they line up from step to step: status,
// topic, time, with the mystery under the topic.
const ROW =
  "grid grid-cols-[20px_minmax(0,1fr)_auto] items-center gap-x-4 gap-y-0.5";

function Mark({ state }) {
  if (state === "done") return <Check size={17} strokeWidth={2.5} className="text-emerald-400" aria-label="Done" />;
  if (state === "next") return <Play size={14} fill="currentColor" className="text-purple-300" aria-hidden="true" />;
  return <span />;
}

function TopicRow({ lesson, resuming }) {
  const { title, short, mystery, href, state, written, minutes } = lesson;
  const current = state === "next";
  return (
    <li>
      <Link
        to={href}
        title={title}
        aria-label={`${short ?? title}. ${mystery ?? ""} ${written ? `${minutes} minutes` : "Coming soon"}`}
        className={`${ROW} group -mx-3 min-h-11 rounded-xl px-3 py-2.5 transition-colors ${
          current ? "bg-purple-500/15 hover:bg-purple-500/25" : "hover:bg-purple-500/10"
        }`}
      >
        <Mark state={state} />
        <span className={`text-[13px] leading-snug ${written ? "font-medium text-white" : "text-neutral-500"}`}>
          {short ?? title}
        </span>
        <span className="col-start-2 row-start-2 text-[13px] leading-snug text-neutral-300 transition-colors group-hover:text-purple-200">
          {mystery}
        </span>
        <span className="col-start-3 row-start-1 justify-self-end text-xs tabular-nums text-neutral-400">
          {written ? `${minutes} min` : "Soon"}
        </span>
        {current && (
          <span className="col-start-2 mt-2.5 grid min-h-9 w-fit place-items-center rounded-lg bg-purple-600 px-6 text-xs font-semibold text-white transition-colors group-hover:bg-purple-500">
            {resuming ? "Continue" : "Start"}
          </span>
        )}
      </Link>
    </li>
  );
}

/** The layer's topics like a book's contents: steps in teaching order on a grid of blocks. */
export default function LayerContents({ lessons, resuming }) {
  const steps = [];
  for (const lesson of lessons) {
    if (steps.at(-1)?.title !== lesson.step)
      steps.push({ title: lesson.step, about: lesson.stepAbout, lessons: [] });
    steps.at(-1).lessons.push(lesson);
  }
  return (
    <ol className="grid gap-4 md:grid-cols-2">
      {steps.map((step) => (
        <li key={step.title} className="grid content-start rounded-2xl border border-neutral-800 bg-neutral-950 p-5 pb-3">
          <div className="grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-x-4 border-b border-neutral-800 pb-3">
            <h2 className="text-base font-semibold leading-snug text-white">{step.title}</h2>
            <span className="text-xs tabular-nums text-neutral-400">
              {step.lessons.filter((l) => l.state === "done").length} of {step.lessons.length}
            </span>
            {step.about && <p className="col-span-full mt-0.5 text-xs text-neutral-400">{step.about}</p>}
          </div>
          <ul className="mt-1.5 grid gap-0.5">
            {step.lessons.map((lesson) => (
              <TopicRow key={lesson.slug} lesson={lesson} resuming={resuming} />
            ))}
          </ul>
        </li>
      ))}
    </ol>
  );
}
