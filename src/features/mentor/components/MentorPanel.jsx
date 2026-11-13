import { lazy, Suspense, useEffect, useId, useRef } from "react";
import { createPortal } from "react-dom";
import { Link } from "react-router-dom";
import { Maximize2, Sparkles, X } from "lucide-react";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { MENTOR_PANEL_COPY as COPY } from "../../../../constants/mentor";
import "./MentorPanel.css";

const Mentor = lazy(() => import("../Mentor"));

/**
 * The mentor opened ON TOP of another page instead of navigating away, so the
 * learner keeps what they were looking at. A side sheet from the right on
 * desktop, a bottom sheet on phones.
 *
 * Modal: the page behind is dimmed and inert to the scroll, Escape or the
 * backdrop closes it, and focus goes back to the button that opened it.
 */
export default function MentorPanel({ open, onClose, origin, initialPrompt = "", subtitle = "" }) {
  const titleId = useId();
  const returnFocus = useRef(null);

  useEffect(() => {
    if (!open) return;
    returnFocus.current = document.activeElement;
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = overflow;
      returnFocus.current?.focus?.();
    };
  }, [open, onClose]);

  if (!open) return null;

  return createPortal(
    <div className="fixed inset-0 z-[70]">
      <div className="mentor-panel-backdrop absolute inset-0 bg-black/60 backdrop-blur-[2px]" onClick={onClose} />

      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="mentor-panel absolute inset-x-0 bottom-0 flex h-[88dvh] flex-col overflow-hidden rounded-t-2xl border-t border-white/10 bg-black text-[#e5e5e5] shadow-2xl shadow-black pb-[env(safe-area-inset-bottom)] md:inset-x-auto md:top-0 md:right-0 md:h-dvh md:w-[min(460px,100vw)] md:rounded-none md:border-t-0 md:border-l"
      >
        {/* Grab handle: tells a phone user this is a sheet over the page. */}
        <div className="flex justify-center pt-2 md:hidden" aria-hidden="true">
          <span className="h-1 w-10 rounded-full bg-white/20" />
        </div>

        <header className="flex items-center gap-3 border-b border-white/10 px-4 py-3">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-purple-600/20 text-purple-300">
            <Sparkles size={16} aria-hidden="true" />
          </span>
          <div className="min-w-0 flex-1">
            <h2 id={titleId} className="text-sm font-semibold text-white">
              {COPY.title}
            </h2>
            {subtitle && <p className="truncate text-xs text-white/50">{subtitle}</p>}
          </div>
          <Link
            to="/mentor"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500"
            title={COPY.openFull}
            aria-label={COPY.openFull}
          >
            <Maximize2 size={15} aria-hidden="true" />
          </Link>
          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 cursor-pointer items-center justify-center rounded-lg text-white/60 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500"
            aria-label={COPY.close}
          >
            <X size={18} aria-hidden="true" />
          </button>
        </header>

        <div className="min-h-0 flex-1">
          <Suspense fallback={<LoadingSuspense fill />}>
            <Mentor embedded origin={origin} initialPrompt={initialPrompt} />
          </Suspense>
        </div>
      </section>
    </div>,
    document.body,
  );
}
