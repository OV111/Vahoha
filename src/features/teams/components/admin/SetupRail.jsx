import { Check } from "lucide-react";

export default function SetupRail({ steps }) {
  const firstOpen = steps.findIndex((s) => !s.done);

  return (
    <nav aria-label="Team setup" className="t-rail">
      {steps.map((s, i) => (
        <button
          key={s.id}
          type="button"
          className="t-step"
          data-done={s.done}
          data-current={i === firstOpen}
          aria-current={i === firstOpen ? "step" : undefined}
          onClick={() =>
            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <span className="t-step-bar" aria-hidden="true" />
          <span className="flex items-center gap-1.5 text-sm text-[var(--t-paper)]">
            {s.done && <Check size={14} className="text-[var(--t-accent-text)]" aria-hidden="true" />}
            {s.label}
          </span>
          <span className="t-caption truncate">{s.detail}</span>
        </button>
      ))}
    </nav>
  );
}
