import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { TASK_TYPES } from "../taskTypes";
import { labHref, lessonHref } from "../content/manifest";
import { trackTitle } from "../rooms";

// One lab in a room or on the building page. Two ways out: into the lab, or
// back to the roadmap lesson it practices. The whole card opens the lab (stretched
// link: the lab link's ::after covers the card); "Read the lesson" sits above it.
export default function LabCard({ lab, highlight = null }) {
  return (
    <article
      className={`relative flex flex-col gap-4 rounded-2xl border bg-neutral-950 p-5 transition-colors duration-150 sm:flex-row sm:items-center sm:justify-between ${
        highlight ? "border-purple-500/50" : "border-neutral-800 hover:border-neutral-600"
      }`}
    >
      <div className="min-w-0">
        <p className="text-xs font-medium text-neutral-400">
          {trackTitle(lab.trackId)} · {lab.layerTitle}
          {highlight && <span className="ml-2 rounded-full bg-purple-600/20 px-2 py-0.5 text-[11px] text-purple-200">{highlight}</span>}
        </p>
        <h3 className="mt-1 text-base font-semibold leading-snug text-white">{lab.lessonTitle}</h3>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          {lab.tasks.map((task) => {
            const t = TASK_TYPES[task.type];
            return (
              <span key={task.title} className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${t.chip}`}>
                <t.Icon size={11} aria-hidden="true" /> {task.title}
              </span>
            );
          })}
          <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
            <Clock size={12} aria-hidden="true" /> ~{lab.minutes} min
          </span>
        </div>
      </div>

      <div className="flex shrink-0 flex-wrap gap-2">
        <Link
          to={lessonHref(lab)}
          className="relative z-10 inline-flex min-h-11 items-center gap-1.5 rounded-lg px-3 text-sm text-neutral-300 transition-colors hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
        >
          <BookOpen size={14} aria-hidden="true" /> Read the lesson
        </Link>
        <Link
          to={labHref(lab)}
          className="inline-flex min-h-11 items-center gap-2 rounded-lg bg-purple-600 after:absolute after:inset-0 after:rounded-2xl px-4 text-sm font-medium text-white transition-colors hover:bg-purple-500 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300"
        >
          Open the lab <ArrowRight size={14} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
