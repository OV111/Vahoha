import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";

/**
 * Sprint picker, progress for the picked sprint, and (lead / co-lead only)
 * new sprint, start and close. Closing sends unfinished tasks back to the backlog.
 */

const dateOnly = (iso) => new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });
const today = () => new Date().toISOString().slice(0, 10);
const inDays = (n) => new Date(Date.now() + n * 86_400_000).toISOString().slice(0, 10);

function NewSprintForm({ onCreate, onCancel, busy }) {
  const [name, setName] = useState("");
  const [goal, setGoal] = useState("");
  const [startAt, setStartAt] = useState(today());
  const [endAt, setEndAt] = useState(inDays(14));

  return (
    <form
      className="t-card-subtle flex flex-col gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onCreate({ name: name.trim(), goal: goal.trim(), startAt, endAt });
      }}
    >
      <div className="grid gap-2 sm:grid-cols-2">
        <label className="flex flex-col gap-1 t-caption">
          Name
          <input className="t-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Sprint 1" maxLength={60} required minLength={2} />
        </label>
        <label className="flex flex-col gap-1 t-caption">
          Goal
          <input className="t-input" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Users can sign up and log in" maxLength={300} />
        </label>
        <label className="flex flex-col gap-1 t-caption">
          Starts
          <input type="date" className="t-input" value={startAt} onChange={(e) => setStartAt(e.target.value)} required />
        </label>
        <label className="flex flex-col gap-1 t-caption">
          Ends
          <input type="date" className="t-input" value={endAt} onChange={(e) => setEndAt(e.target.value)} required />
        </label>
      </div>
      <div className="flex justify-end gap-2">
        <button type="button" className="t-btn t-btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="t-btn t-btn-primary" disabled={busy || name.trim().length < 2}>Create sprint</button>
      </div>
    </form>
  );
}

export default function SprintBar({ sprints, selected, onSelect, canPlan, onCreate, onSetStatus, busy }) {
  const [creating, setCreating] = useState(false);
  const [closing, setClosing] = useState(null);
  const sprint = sprints.find((s) => s._id === selected);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center gap-2">
        <label className="flex items-center gap-2 t-caption">
          <span className="sr-only">Show</span>
          <select className="t-input w-auto" value={selected} onChange={(e) => onSelect(e.target.value)}>
            <option value="all">All tasks</option>
            <option value="none">Not in a sprint</option>
            {sprints.map((s) => (
              <option key={s._id} value={s._id}>
                {s.name}
                {s.status === "active" ? " (active)" : s.status === "closed" ? " (closed)" : ""}
              </option>
            ))}
          </select>
        </label>
        {canPlan && sprint?.status === "planned" && (
          <button type="button" className="t-btn" disabled={busy} onClick={() => onSetStatus(sprint, "active")}>
            Start sprint
          </button>
        )}
        {canPlan && sprint?.status === "active" && (
          <button type="button" className="t-btn" disabled={busy} onClick={() => setClosing(sprint)}>
            Close sprint
          </button>
        )}
        {canPlan && !creating && (
          <button type="button" className="t-btn t-btn-ghost" onClick={() => setCreating(true)}>
            New sprint
          </button>
        )}
      </div>

      {sprint && (
        <div className="flex flex-col gap-1">
          <p className="t-caption">
            {dateOnly(sprint.startAt)} to {dateOnly(sprint.endAt)} · {sprint.progress.done} of {sprint.progress.total} done
            {sprint.goal ? ` · Goal: ${sprint.goal}` : ""}
          </p>
          <span
            className="t-bar"
            role="progressbar"
            aria-label={`${sprint.name} progress`}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={sprint.progress.percent}
          >
            <span style={{ width: `${sprint.progress.percent}%` }} data-mine="true" />
          </span>
        </div>
      )}

      {creating && (
        <NewSprintForm
          busy={busy}
          onCancel={() => setCreating(false)}
          onCreate={async (body) => {
            if (await onCreate(body)) setCreating(false);
          }}
        />
      )}

      {closing && (
        <ConfirmDialog
          title={`Close ${closing.name}?`}
          body="Tasks that aren't done go back to the backlog, ready for the next sprint. A closed sprint can't be reopened."
          confirmLabel="Close sprint"
          tone="primary"
          onCancel={() => setClosing(null)}
          onConfirm={() => {
            onSetStatus(closing, "closed");
            setClosing(null);
          }}
        />
      )}
    </div>
  );
}
