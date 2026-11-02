import { useEffect, useState } from "react";
import { AlertTriangle, Bot } from "lucide-react";

import { teamsApi } from "../teamsApi";

/**
 * The AI lead's view of the team: health, open warnings and last week's
 * update. Warnings about one person are shown only to the lead, the co-lead,
 * admins and that person (the server filters them).
 */

const HEALTH = {
  green: { label: "On track", dot: "t-dot-active" },
  yellow: { label: "Needs attention", dot: "t-dot-warn" },
  red: { label: "At risk", dot: "t-dot-disbanded" },
};

const weekLabel = (iso) => {
  const start = new Date(new Date(iso).getTime() - 7 * 86_400_000);
  return `Week of ${start.toLocaleDateString(undefined, { month: "short", day: "numeric" })}`;
};

function WeeklyUpdate({ update }) {
  const f = update.facts;
  return (
    <div className="t-card-subtle flex flex-col gap-2">
      <h3 className="flex items-center gap-2 text-sm font-medium text-[var(--t-paper)]">
        <Bot size={14} aria-hidden="true" />
        {weekLabel(update.weekStart)}
      </h3>
      <p className="t-caption">
        {f.shipped.length} shipped · {f.started} started · {f.mergedPrs} PRs merged ({f.reviewedPrs} reviewed) · {f.stillOpen} still open
      </p>
      {f.shipped.length > 0 && (
        <ul className="flex flex-col gap-0.5 text-sm text-[var(--t-mist)]">
          {f.shipped.map((s) => (
            <li key={s.ref}>
              <span className="t-mono t-caption">{s.ref}</span> {s.title}
            </li>
          ))}
        </ul>
      )}
      {f.blocked.length > 0 && <p className="t-caption">Waiting for review: {f.blocked.join(", ")}</p>}
      {update.note && <p className="whitespace-pre-wrap text-sm text-[var(--t-mist)]">{update.note}</p>}
    </div>
  );
}

export default function TeamPulse({ teamId }) {
  const [pulse, setPulse] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    teamsApi
      .pulse(teamId)
      .then((p) => !cancelled && setPulse(p))
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [teamId]);

  if (error) return <p className="t-caption">Couldn't load the team's week: {error}</p>;
  if (!pulse) return null;
  const health = HEALTH[pulse.health];

  return (
    <div className="flex flex-col gap-3">
      <p className="inline-flex items-center gap-2 text-sm text-[var(--t-mist)]">
        <span className={`t-dot ${health.dot}`} aria-hidden="true" />
        {health.label}
      </p>

      {pulse.warnings.length > 0 ? (
        <ul className="flex flex-col gap-1.5">
          {pulse.warnings.map((w) => (
            <li key={`${w.type}:${w.subjectKey}`} className="flex items-start gap-2 text-sm text-[var(--t-mist)]">
              <AlertTriangle size={14} aria-hidden="true" className="mt-0.5 shrink-0 text-[var(--t-fog)]" />
              <span>{w.message}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="t-caption">Nothing needs attention right now.</p>
      )}

      {pulse.update && <WeeklyUpdate update={pulse.update} />}
    </div>
  );
}
