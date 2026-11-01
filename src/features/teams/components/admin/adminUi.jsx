import { X } from "lucide-react";
import { MAX_TEAM_MEMBERS } from "../../../../../constants/teams";

// Layout pieces shared by the team admin panels.

export function Panel({ id, title, hint, aside, children }) {
  return (
    <section id={id} className="t-section scroll-mt-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="t-h2">{title}</h2>
          {hint && <p className="t-caption max-w-[60ch] leading-snug">{hint}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

export function Slots({ used }) {
  return (
    <span className="t-slots" aria-hidden="true">
      {Array.from({ length: MAX_TEAM_MEMBERS }, (_, i) => (
        <span key={i} data-on={i < used} />
      ))}
    </span>
  );
}

export function Toast({ toast, onClose }) {
  if (!toast) return null;
  const isError = toast.kind === "error";
  return (
    <div className="t-toast" role={isError ? "alert" : "status"}>
      <span className={`t-dot ${isError ? "t-dot-disbanded" : "t-dot-active"}`} aria-hidden="true" />
      <span className="min-w-0">{toast.message}</span>
      <button
        type="button"
        className="-m-1 p-1 text-[var(--t-ash)] hover:text-[var(--t-paper)]"
        aria-label="Dismiss"
        onClick={onClose}
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}
