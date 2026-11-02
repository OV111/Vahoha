import { CalendarClock, GitPullRequest, MessageSquare } from "lucide-react";

const formatDue = (iso) =>
  new Date(iso).toLocaleDateString(undefined, { month: "short", day: "numeric" });

const isOverdue = (task) =>
  task.dueAt && task.status !== "done" && new Date(task.dueAt) < new Date();

export default function TaskCard({ task, assigneeLogin, draggable, onOpen, onDragStart }) {
  return (
    <button
      type="button"
      className="t-task"
      draggable={draggable}
      onDragStart={(e) => {
        e.dataTransfer.setData("text/plain", String(task.key));
        e.dataTransfer.effectAllowed = "move";
        onDragStart?.(task);
      }}
      onClick={() => onOpen(task)}
    >
      <span className="flex items-center justify-between gap-2">
        <span className="t-mono t-caption">{task.ref}</span>
        <span className="t-badge t-mono">{task.size}</span>
      </span>
      <span className="text-sm text-[var(--t-paper)]">{task.title}</span>
      <span className="flex flex-wrap items-center gap-x-3 gap-y-1 t-caption">
        <span className="t-mono">{assigneeLogin ? `@${assigneeLogin}` : "Unassigned"}</span>
        {task.area && <span>{task.area}</span>}
        {task.dueAt && (
          <span
            className={`inline-flex items-center gap-1 ${isOverdue(task) ? "text-[var(--t-red)]" : ""}`}
          >
            <CalendarClock size={12} aria-hidden="true" />
            {formatDue(task.dueAt)}
            {isOverdue(task) && <span className="sr-only">(overdue)</span>}
          </span>
        )}
        {task.commentCount > 0 && (
          <span className="inline-flex items-center gap-1">
            <MessageSquare size={12} aria-hidden="true" />
            {task.commentCount}
            <span className="sr-only">comments</span>
          </span>
        )}
        {task.pr && (
          <span className="inline-flex items-center gap-1 t-mono">
            <GitPullRequest size={12} aria-hidden="true" />#{task.pr.number}
          </span>
        )}
      </span>
    </button>
  );
}
