import { ArrowLeft } from "lucide-react";

/** Pinned under the lesson column; on small screens, to the bottom of the screen. */
export default function LessonFooter({ canBack, canContinue, blockedHint, isLast, onBack, onNext }) {
  return (
    <footer className="fixed inset-x-0 bottom-0 z-20 flex min-h-18 shrink-0 items-center justify-between gap-4 border-t border-(--lesson-line) bg-(--lesson-stage) px-4 pb-[env(safe-area-inset-bottom)] sm:px-8 lg:static">
      <button
        type="button"
        onClick={onBack}
        disabled={!canBack}
        className="-ml-3 inline-flex min-h-11 items-center gap-2 rounded-lg px-3 text-[15px] text-neutral-300 transition-colors enabled:cursor-pointer enabled:hover:text-white disabled:opacity-35"
      >
        <ArrowLeft size={16} aria-hidden="true" /> Back
      </button>
      <div className="flex items-center gap-4">
        {!canContinue && <span className="hidden text-sm text-neutral-400 sm:inline">{blockedHint}</span>}
        <button
          type="button"
          onClick={onNext}
          disabled={!canContinue}
          className="inline-flex min-h-12 items-center rounded-xl bg-purple-600 px-8 text-[16px] font-semibold text-white transition-colors enabled:cursor-pointer enabled:hover:bg-purple-500 disabled:bg-(--lesson-raised) disabled:text-neutral-400"
        >
          {isLast ? "Finish" : "Continue"}
        </button>
      </div>
    </footer>
  );
}
