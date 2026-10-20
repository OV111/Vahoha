import { Bot, CheckCircle2, Circle, User } from "lucide-react";
import MarkdownMessage from "@/features/ai-agent/components/MarkdownMessage";
import { TASK_TYPES } from "../taskTypes";

// Left column: what to do. The type chip and a soft glow in the type's color
// tell the learner which mode they're in before they read a word.
//
// `progress`: 0 not run yet, 1 tests run and failing, 2 tests passing, 3 named (done).
export default function TaskBrief({ task, index, total, progress }) {
  const type = TASK_TYPES[task.type];

  return (
    <div className="relative">
      <div aria-hidden="true" className={`pointer-events-none absolute -inset-x-5 -top-6 h-48 bg-linear-to-b ${type.glow} to-transparent`} />

      <div className="relative flex items-center justify-between gap-3">
        <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-semibold ${type.chip}`}>
          <type.Icon size={13} aria-hidden="true" />
          {type.label}
        </span>
        <span className="text-xs text-neutral-400 tabular-nums">
          Task {index + 1} of {total}
        </span>
      </div>

      <h1 className="relative mt-4 text-xl font-semibold leading-snug text-white">{task.title}</h1>
      <p className="relative mt-1 text-sm text-neutral-400">{type.verb}</p>

      {task.type === "review" && <ReviewContext request={task.request} file={task.file} />}

      <div className="relative mt-4">
        <MarkdownMessage content={task.prompt} className="text-[14px] leading-relaxed text-neutral-200" />
      </div>

      {task.steps ? <ReviewSteps steps={task.steps} progress={progress} /> : <Goals goals={task.goals} passed={progress >= 2} />}
    </div>
  );
}

// The request a developer gave the AI, and the AI's answer as a "pull request".
const ReviewContext = ({ request, file }) => (
  <div className="relative mt-5 space-y-2">
    <div className="flex gap-3 rounded-xl border border-neutral-800 bg-neutral-950 p-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-neutral-800 text-neutral-300">
        <User size={14} aria-hidden="true" />
      </span>
      <div>
        <p className="text-[11px] font-medium uppercase tracking-wider text-neutral-500">Request to the AI</p>
        <p className="mt-0.5 text-sm text-neutral-200">&ldquo;{request}&rdquo;</p>
      </div>
    </div>
    <div className="flex items-center gap-3 rounded-xl border border-rose-500/30 bg-rose-500/5 p-3">
      <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-rose-500/15 text-rose-300">
        <Bot size={14} aria-hidden="true" />
      </span>
      <p className="text-sm text-neutral-200">
        The AI wrote <code className="rounded bg-neutral-800 px-1 font-mono text-[12px] text-rose-200">{file}</code>.
        Its own tests pass.
      </p>
    </div>
  </div>
);

// Read -> Find -> Prove -> Fix -> Name it, lighting up as the learner gets there.
const ReviewSteps = ({ steps, progress }) => {
  // How many steps are behind the learner: running tests means they've read and
  // found; passing means proven and fixed; naming it finishes the list.
  const reached = [0, 2, 4, 5][progress] ?? 0;
  return (
    <ol className="relative mt-6 space-y-1" aria-label="Review steps">
      {steps.map((s, i) => {
        const done = i < reached;
        const current = i === reached;
        return (
          <li
            key={s.label}
            className={`flex items-start gap-3 rounded-lg px-2 py-2 transition-colors duration-200 ${current ? "bg-neutral-900" : ""}`}
          >
            <span
              className={`mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold tabular-nums ${
                done ? "bg-purple-600 text-white" : current ? "bg-rose-500/20 text-rose-200 ring-1 ring-rose-400/60" : "bg-neutral-800 text-neutral-400"
              }`}
              aria-hidden="true"
            >
              {done ? "✓" : i + 1}
            </span>
            <span className="text-sm">
              <span className={`font-semibold ${done || current ? "text-white" : "text-neutral-400"}`}>{s.label}</span>{" "}
              <span className={done || current ? "text-neutral-300" : "text-neutral-500"}>{s.detail}</span>
              <span className="sr-only">{done ? " (done)" : current ? " (current)" : ""}</span>
            </span>
          </li>
        );
      })}
    </ol>
  );
};

const Goals = ({ goals = [], passed }) => (
  <div className="relative mt-6">
    <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">Done when</p>
    <ul className="mt-2 space-y-2">
      {goals.map((g) => (
        <li key={g} className="flex items-start gap-2.5 text-sm text-neutral-200">
          {passed ? (
            <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-emerald-400" aria-hidden="true" />
          ) : (
            <Circle size={16} className="mt-0.5 shrink-0 text-neutral-600" aria-hidden="true" />
          )}
          <MarkdownMessage content={g} className="text-sm text-neutral-200" />
        </li>
      ))}
    </ul>
  </div>
);
