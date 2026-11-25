import { Link } from "react-router-dom";
import { ArrowLeft, Sparkles } from "lucide-react";

export default function LessonHeader({ layerHref, layerTitle, title, draft, total, index, onMentor }) {
  const at = Math.min(index + 1, total);
  return (
    <header className="sticky top-0 z-20 flex min-h-15 shrink-0 items-center gap-3 border-b border-(--lesson-line) bg-(--lesson-rail) px-3 pt-[env(safe-area-inset-top)] sm:px-5">
      <Link
        to={layerHref}
        className="inline-flex min-h-11 shrink-0 items-center gap-2 rounded-lg px-2 text-[15px] text-neutral-300 transition-colors hover:text-white"
      >
        <ArrowLeft size={17} aria-hidden="true" />
        <span className="hidden md:inline">{layerTitle}</span>
        <span className="sr-only">Leave the lesson. Your place is saved.</span>
      </Link>
      <h1 className="min-w-0 flex-1 truncate border-l border-(--lesson-line) pl-4 text-[15px] font-medium text-white">
        {title}
        {draft && <span className="ml-3 hidden text-sm font-normal text-amber-300 lg:inline">Draft, not yet reviewed</span>}
      </h1>
      <div className="hidden items-center gap-3 sm:flex">
        <div
          role="progressbar"
          aria-label="Lesson progress"
          aria-valuemin={0}
          aria-valuemax={total}
          aria-valuenow={at}
          className="h-2 w-28 overflow-hidden rounded-full bg-white/10 lg:w-44"
        >
          <div
            className="h-full rounded-full bg-purple-500 transition-[width] duration-300 motion-reduce:transition-none"
            style={{ width: `${(at / total) * 100}%` }}
          />
        </div>
        <span className="text-sm tabular-nums text-neutral-300">
          {at}/{total}
        </span>
      </div>
      <button
        type="button"
        onClick={onMentor}
        className="inline-flex min-h-11 shrink-0 cursor-pointer items-center gap-2 rounded-lg px-3 text-[15px] text-purple-200 transition-colors hover:bg-(--lesson-raised) hover:text-white"
      >
        <Sparkles size={16} aria-hidden="true" />
        <span className="hidden sm:inline">Ask Mentor</span>
        <span className="sm:hidden">Mentor</span>
      </button>
    </header>
  );
}
