import { lazy, Suspense, useEffect } from "react";
import { X } from "lucide-react";
import { SESSIONS_COPY } from "../../../../constants/mentor";
import { THIN_SCROLL_CLASS } from "../../../../constants/mentorUsage";
import UsageSkeleton from "@/features/profile/components/UsageSkeleton";

// Loaded on first open: most chats never look at usage, so the chat page should
// not pay for the chart code.
const MentorUsageSetting = lazy(() => import("@/features/profile/components/MentorUsageSetting"));

/**
 * The learner's mentor usage as a pop-up, so checking it never leaves the chat.
 * Escape, the close button and a backdrop click close it. The `dark` class forces
 * the usage view's dark styles even if the site theme is light, because this
 * surface is always dark.
 */
export default function UsageModal({ onClose }) {
  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div
      className="dark fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 pt-[max(1rem,env(safe-area-inset-top))] pb-[max(1rem,env(safe-area-inset-bottom))]"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="mentor-usage-title"
        className="flex max-h-[min(90dvh,720px)] w-full max-w-2xl flex-col rounded-2xl border border-white/10 bg-[#111113]"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-5 py-3">
          <h2 id="mentor-usage-title" className="text-base font-semibold text-white">
            {SESSIONS_COPY.usageModalTitle}
          </h2>
          <button
            type="button"
            autoFocus
            onClick={onClose}
            aria-label={SESSIONS_COPY.usageClose}
            className="flex size-9 cursor-pointer items-center justify-center rounded-lg text-white/70 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500 md:size-8"
          >
            <X size={16} aria-hidden="true" />
          </button>
        </div>
        <div className={`overflow-y-auto px-5 py-4 ${THIN_SCROLL_CLASS}`}>
          <Suspense fallback={<UsageSkeleton />}>
            <MentorUsageSetting />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
