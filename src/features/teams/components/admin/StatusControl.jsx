import { TEAM_STATUSES } from "../../../../../constants/teams";

export default function StatusControl({ value, onChange, busy }) {
  return (
    <div className="t-seg" role="group" aria-label="Team status">
      {TEAM_STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={s === value}
          disabled={busy}
          onClick={() => s !== value && onChange(s)}
        >
          <span className={`t-dot t-dot-${s}`} aria-hidden="true" />
          {s}
        </button>
      ))}
    </div>
  );
}
