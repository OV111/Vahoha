import { useEffect, useState } from "react";
import { X } from "lucide-react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import {
  MANUAL_TASK_STATUSES,
  TASK_AREAS,
  TASK_LIMITS,
  TASK_SIZES,
  TASK_STATUS_LABELS,
} from "../../../../../constants/teams";
import { teamsApi } from "../../teamsApi";

/**
 * Create or edit one task, and read or add its comments. The server repeats
 * every rule shown here (who assigns, no manual "done"); the form only hides
 * choices that would be refused.
 */

const EMPTY = { title: "", description: "", size: "M", area: "", assigneeId: "", sprintId: "", dueAt: "", status: "backlog" };

const fromTask = (t) => ({
  title: t.title,
  description: t.description ?? "",
  size: t.size,
  area: t.area ?? "",
  assigneeId: t.assigneeId ?? "",
  sprintId: t.sprintId ?? "",
  dueAt: t.dueAt ? t.dueAt.slice(0, 10) : "",
  status: t.status,
});

// Form strings to API values: "" means none.
const toBody = (f) => ({
  title: f.title.trim(),
  description: f.description.trim(),
  size: f.size,
  area: f.area || null,
  assigneeId: f.assigneeId || null,
  sprintId: f.sprintId || null,
  dueAt: f.dueAt || null,
  status: f.status,
});

const changedFields = (before, after) =>
  Object.fromEntries(Object.entries(after).filter(([k, v]) => v !== before[k]));

function Field({ label, children }) {
  return (
    <label className="flex flex-col gap-1 t-caption">
      {label}
      {children}
    </label>
  );
}

function Comments({ comments, loginOf, onAdd, canWrite }) {
  const [body, setBody] = useState("");
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium text-[var(--t-paper)]">Comments</h3>
      {comments.length === 0 && <p className="t-caption">No comments yet.</p>}
      <ul className="flex flex-col gap-2">
        {comments.map((c) => (
          <li key={c._id} className="t-card-subtle text-sm">
            <span className="t-mono t-caption">
              @{loginOf(c.authorId) ?? "former member"} · {new Date(c.at).toLocaleString()}
            </span>
            <p className="mt-1 whitespace-pre-wrap text-[var(--t-mist)]">{c.body}</p>
          </li>
        ))}
      </ul>
      {canWrite && (
        <form
          className="flex gap-2"
          onSubmit={async (e) => {
            e.preventDefault();
            if (await onAdd(body.trim())) setBody("");
          }}
        >
          <input
            className="t-input"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Write a comment"
            maxLength={TASK_LIMITS.comment}
            aria-label="New comment"
          />
          <button type="submit" className="t-btn" disabled={!body.trim()}>Send</button>
        </form>
      )}
    </div>
  );
}

export default function TaskDialog({ team, taskKey, sprints, defaultSprintId, members, canWrite, isLead, onClose, onSaved, onDeleted }) {
  const isNew = taskKey == null;
  const [task, setTask] = useState(null);
  const [form, setForm] = useState({ ...EMPTY, sprintId: defaultSprintId ?? "" });
  const [error, setError] = useState(null);
  const [busy, setBusy] = useState(false);
  const [confirmDelete, setConfirmDelete] = useState(false);

  useEffect(() => {
    if (isNew) return undefined;
    let cancelled = false;
    teamsApi
      .task(team._id, taskKey)
      .then((t) => {
        if (cancelled) return;
        setTask(t);
        setForm(fromTask(t));
      })
      .catch((err) => !cancelled && setError(err.message));
    return () => {
      cancelled = true;
    };
  }, [team._id, taskKey, isNew]);

  useEffect(() => {
    const onKey = (e) => e.key === "Escape" && !confirmDelete && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose, confirmDelete]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));
  const loginOf = (userId) => members.find((m) => m.userId === userId)?.githubLogin;
  const viewer = team.viewerId;
  const isDone = task?.status === "done";
  const editable = canWrite && !isDone;

  // Non-leads may only take a free task or drop their own, so other names are disabled.
  const currentAssignee = task?.assigneeId ?? null;
  const canPick = (userId) => isLead || userId === currentAssignee || (userId === viewer && currentAssignee == null);
  const canUnassign = isLead || currentAssignee == null || currentAssignee === viewer;
  const canDelete = canWrite && task && !task.pr && (task.creatorId === viewer || isLead);

  const save = async (e) => {
    e.preventDefault();
    setBusy(true);
    setError(null);
    try {
      const body = toBody(form);
      if (isNew) {
        if (body.status !== "in_progress") delete body.status;
        onSaved(await teamsApi.createTask(team._id, body), { created: true });
      } else {
        const patch = changedFields(toBody(fromTask(task)), body);
        if (!Object.keys(patch).length) return onClose();
        onSaved(await teamsApi.updateTask(team._id, task.key, patch), { created: false });
      }
      onClose();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const addComment = async (body) => {
    try {
      const comment = await teamsApi.comment(team._id, task.key, body);
      setTask((t) => ({ ...t, comments: [...t.comments, comment], commentCount: t.commentCount + 1 }));
      onSaved({ ...task, commentCount: task.commentCount + 1, comments: undefined }, { created: false });
      return true;
    } catch (err) {
      setError(err.message);
      return false;
    }
  };

  const remove = async () => {
    setConfirmDelete(false);
    try {
      await teamsApi.deleteTask(team._id, task.key);
      onDeleted(task.key);
      onClose();
    } catch (err) {
      setError(err.message);
    }
  };

  const openSprints = sprints.filter((s) => s.status !== "closed" || s._id === form.sprintId);
  const loading = !isNew && !task && !error;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/70 p-4 sm:items-center" onClick={onClose}>
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="task-dialog-title"
          className="teams-theme w-full max-w-2xl rounded-2xl border border-white/10 bg-[#111113] p-5"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="mb-4 flex items-start justify-between gap-3">
            <h2 id="task-dialog-title" className="t-h2">
              {isNew ? "New task" : task ? `${task.ref} · ${task.title}` : "Task"}
            </h2>
            <button type="button" className="-m-1 p-1 text-[var(--t-ash)] hover:text-[var(--t-paper)]" aria-label="Close" onClick={onClose}>
              <X size={16} aria-hidden="true" />
            </button>
          </div>
  
          {error && <p className="mb-3 text-sm text-[var(--t-red)]" role="alert">{error}</p>}
          {loading && <p className="t-caption">Loading…</p>}
  
          {(isNew || task) && (
            <form className="flex flex-col gap-3" onSubmit={save}>
              <Field label="Title">
                <input className="t-input" value={form.title} onChange={set("title")} disabled={!editable && !isNew} required minLength={2} maxLength={TASK_LIMITS.title} autoFocus={isNew} />
              </Field>
              <Field label="Description">
                <textarea className="t-input min-h-[96px]" value={form.description} onChange={set("description")} disabled={!editable && !isNew} maxLength={TASK_LIMITS.description} />
              </Field>
  
              <div className="grid gap-3 sm:grid-cols-3">
                <Field label="Status">
                  <select className="t-input" value={form.status} onChange={set("status")} disabled={!editable && !isNew}>
                    {(isNew ? ["backlog", "in_progress"] : MANUAL_TASK_STATUSES).map((s) => (
                      <option key={s} value={s}>{TASK_STATUS_LABELS[s]}</option>
                    ))}
                    {isDone && <option value="done">{TASK_STATUS_LABELS.done}</option>}
                  </select>
                </Field>
                <Field label="Assignee">
                  <select className="t-input" value={form.assigneeId} onChange={set("assigneeId")} disabled={!editable && !isNew}>
                    <option value="" disabled={!canUnassign}>Unassigned</option>
                    {members.map((m) => (
                      <option key={m.userId} value={m.userId} disabled={!canPick(m.userId)}>
                        @{m.githubLogin}{m.userId === viewer ? " (you)" : ""}
                      </option>
                    ))}
                  </select>
                </Field>
                <Field label="Size">
                  <select className="t-input" value={form.size} onChange={set("size")} disabled={!editable && !isNew}>
                    {TASK_SIZES.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </Field>
                <Field label="Area">
                  <select className="t-input" value={form.area} onChange={set("area")} disabled={!editable && !isNew}>
                    <option value="">None</option>
                    {TASK_AREAS.map((a) => <option key={a} value={a}>{a}</option>)}
                  </select>
                </Field>
                <Field label="Sprint">
                  <select className="t-input" value={form.sprintId} onChange={set("sprintId")} disabled={!editable && !isNew}>
                    <option value="">Not in a sprint</option>
                    {openSprints.map((s) => <option key={s._id} value={s._id}>{s.name}</option>)}
                  </select>
                </Field>
                <Field label="Due">
                  <input type="date" className="t-input" value={form.dueAt} onChange={set("dueAt")} disabled={!editable && !isNew} />
                </Field>
              </div>
  
              {!isNew && (
                <p className="t-caption">
                  {task.pr ? (
                    <a className="t-link" href={task.pr.url} target="_blank" rel="noopener noreferrer">Pull request #{task.pr.number} ({task.pr.state})</a>
                  ) : (
                    <>Mention <span className="t-mono">{task.ref}</span> in a pull request title or branch name to link it. The task is done when that PR is merged.</>
                  )}
                </p>
              )}
  
              {(editable || isNew) && (
                <div className="flex flex-wrap justify-between gap-2">
                  <span>
                    {canDelete && (
                      <button type="button" className="t-btn t-btn-danger" onClick={() => setConfirmDelete(true)}>Delete</button>
                    )}
                  </span>
                  <span className="flex gap-2">
                    <button type="button" className="t-btn t-btn-ghost" onClick={onClose}>Cancel</button>
                    <button type="submit" className="t-btn t-btn-primary" disabled={busy || form.title.trim().length < 2}>
                      {isNew ? "Create task" : "Save"}
                    </button>
                  </span>
                </div>
              )}
            </form>
          )}
  
          {task && (
            <div className="mt-5 border-t border-white/10 pt-4">
              <Comments comments={task.comments ?? []} loginOf={loginOf} onAdd={addComment} canWrite={canWrite} />
            </div>
          )}
        </div>
      </div>

      {confirmDelete && (
        <ConfirmDialog
          title={`Delete ${task.ref}?`}
          body="The task and its comments are removed for the whole team."
          confirmLabel="Delete task"
          onCancel={() => setConfirmDelete(false)}
          onConfirm={remove}
        />
      )}
    </>
  );
}
