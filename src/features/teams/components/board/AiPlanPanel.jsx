import { useEffect, useState } from "react";
import { Bot } from "lucide-react";
import { AI_LEAD } from "../../../../../constants/teams";
import { teamsApi } from "../../teamsApi";

/**
 * The AI lead's sprint plan: ask for a draft, review it task by task (keep or
 * drop, change who takes it), then accept. Only accepted tasks reach the board.
 * Members who can't plan see the draft read-only while it waits.
 */

function PlanRequestForm({ sprints, defaultSprintId, onSubmit, onCancel, busy }) {
  const open = sprints.filter((s) => s.status !== "closed");
  const [sprintId, setSprintId] = useState(open.some((s) => s._id === defaultSprintId) ? defaultSprintId : "");
  const sprintGoal = open.find((s) => s._id === sprintId)?.goal ?? "";
  const [goal, setGoal] = useState(sprintGoal);
  const [notes, setNotes] = useState("");

  return (
    <form
      className="flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit({ sprintId: sprintId || null, goal: goal.trim(), notes: notes.trim() });
      }}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 t-caption">
          Sprint
          <select
            className="t-input"
            value={sprintId}
            onChange={(e) => {
              setSprintId(e.target.value);
              setGoal(open.find((s) => s._id === e.target.value)?.goal ?? goal);
            }}
          >
            <option value="">Not in a sprint</option>
            {open.map((s) => (
              <option key={s._id} value={s._id}>{s.name}</option>
            ))}
          </select>
        </label>
        <label className="flex flex-col gap-1 t-caption">
          Goal
          <input className="t-input" value={goal} onChange={(e) => setGoal(e.target.value)} placeholder="Users can sign up, log in and reset a password" maxLength={300} required minLength={5} />
        </label>
      </div>
      <label className="flex flex-col gap-1 t-caption">
        Notes for the AI (optional)
        <textarea className="t-input min-h-[64px]" value={notes} onChange={(e) => setNotes(e.target.value)} maxLength={1000} placeholder="We use Express and Postgres. Ani is away on Friday." />
      </label>
      <div className="flex justify-end gap-2">
        <button type="button" className="t-btn t-btn-ghost" onClick={onCancel}>Cancel</button>
        <button type="submit" className="t-btn t-btn-primary" disabled={busy || goal.trim().length < 5}>
          {busy ? "Drafting… (up to a minute)" : "Draft plan"}
        </button>
      </div>
    </form>
  );
}

function PlanReview({ plan, members, canPlan, busy, onAccept, onDiscard }) {
  const [included, setIncluded] = useState(() => plan.tasks.map(() => true));
  const [assignees, setAssignees] = useState(() => plan.tasks.map((t) => t.assigneeId ?? ""));
  const count = included.filter(Boolean).length;

  const accept = () => {
    const include = included.flatMap((on, i) => (on ? [i] : []));
    const changed = Object.fromEntries(
      assignees.flatMap((id, i) => ((id || null) !== (plan.tasks[i].assigneeId ?? null) ? [[String(i), id || null]] : [])),
    );
    onAccept({ include, assignees: changed });
  };

  return (
    <div className="flex flex-col gap-3">
      <p className="t-caption">
        Goal: {plan.goal}
        {!canPlan && " · Waiting for the lead to accept this plan."}
      </p>
      <ul className="flex flex-col gap-2">
        {plan.tasks.map((t, i) => (
          <li key={i} className="t-card-subtle flex gap-3" data-off={!included[i]}>
            {canPlan && (
              <input
                type="checkbox"
                className="mt-1"
                checked={included[i]}
                onChange={(e) => setIncluded((cur) => cur.map((v, j) => (j === i ? e.target.checked : v)))}
                aria-label={`Keep "${t.title}"`}
              />
            )}
            <div className={`flex min-w-0 flex-1 flex-col gap-1 ${included[i] ? "" : "opacity-50"}`}>
              <span className="flex flex-wrap items-center gap-2">
                <span className="text-sm text-[var(--t-paper)]">{t.title}</span>
                <span className="t-badge t-mono">{t.size}</span>
                {t.area && <span className="t-caption">{t.area}</span>}
                {t.skills.map((s) => (
                  <span key={s} className="t-pill t-mono t-caption">{s}</span>
                ))}
              </span>
              {t.description && <p className="t-caption">{t.description}</p>}
              <span className="flex flex-wrap items-center gap-2 t-caption">
                {canPlan ? (
                  <select
                    className="t-input w-auto"
                    value={assignees[i]}
                    onChange={(e) => setAssignees((cur) => cur.map((v, j) => (j === i ? e.target.value : v)))}
                    aria-label={`Who takes "${t.title}"`}
                  >
                    <option value="">Unassigned</option>
                    {members.map((m) => (
                      <option key={m.userId} value={m.userId}>@{m.githubLogin}</option>
                    ))}
                  </select>
                ) : (
                  <span className="t-mono">{t.assigneeLogin ? `@${t.assigneeLogin}` : "Unassigned"}</span>
                )}
                {t.reason && <span>{t.reason}</span>}
              </span>
              {t.note && <span className="t-caption text-[var(--t-fog)]">Note: {t.note}</span>}
            </div>
          </li>
        ))}
      </ul>
      {canPlan && (
        <div className="flex flex-wrap justify-end gap-2">
          <button type="button" className="t-btn t-btn-ghost" disabled={busy} onClick={onDiscard}>Discard</button>
          <button type="button" className="t-btn t-btn-primary" disabled={busy || count === 0} onClick={accept}>
            Add {count} {count === 1 ? "task" : "tasks"} to the board
          </button>
        </div>
      )}
    </div>
  );
}

export default function AiPlanPanel({ team, members, sprints, defaultSprintId, onAccepted }) {
  const [state, setState] = useState(null); // { canPlan, plan }
  const [asking, setAsking] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    teamsApi.plan(team._id).then(setState).catch(() => setState({ canPlan: false, plan: null }));
  }, [team._id]);

  const run = async (fn) => {
    setBusy(true);
    setError(null);
    try {
      return await fn();
    } catch (err) {
      setError(err.message);
      return null;
    } finally {
      setBusy(false);
    }
  };

  if (!state || (!state.canPlan && !state.plan)) return null;
  const aiLeads = team.leadId === AI_LEAD;

  return (
    <div className="t-card flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 text-sm font-medium text-[var(--t-paper)]">
          <Bot size={14} aria-hidden="true" />
          {aiLeads ? "AI lead: sprint plan" : "AI co-lead: plan suggestions"}
        </h3>
        {state.canPlan && !state.plan && !asking && (
          <button type="button" className="t-btn" onClick={() => setAsking(true)}>Plan with AI</button>
        )}
      </div>
      {error && <p className="text-sm text-[var(--t-red)]" role="alert">{error}</p>}

      {asking && !state.plan && (
        <PlanRequestForm
          sprints={sprints}
          defaultSprintId={defaultSprintId}
          busy={busy}
          onCancel={() => setAsking(false)}
          onSubmit={async (body) => {
            const next = await run(() => teamsApi.createPlan(team._id, body));
            if (next) {
              setState(next);
              setAsking(false);
            }
          }}
        />
      )}

      {state.plan && (
        <PlanReview
          key={state.plan._id}
          plan={state.plan}
          members={members}
          canPlan={state.canPlan}
          busy={busy}
          onDiscard={async () => {
            if (await run(() => teamsApi.discardPlan(team._id, state.plan._id))) setState((s) => ({ ...s, plan: null }));
          }}
          onAccept={async (choice) => {
            const res = await run(() => teamsApi.acceptPlan(team._id, state.plan._id, choice));
            if (res) {
              setState((s) => ({ ...s, plan: null }));
              onAccepted(res.created);
            }
          }}
        />
      )}
    </div>
  );
}
