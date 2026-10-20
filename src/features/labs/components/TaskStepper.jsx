import { Check, Lock } from "lucide-react";
import { TASK_TYPES } from "../taskTypes";

// The lab as a short mission: stations joined by a track that fills purple as
// tasks are done. Done and current stations are clickable; later ones stay
// locked so the order (debug -> build -> review) is kept.
export default function TaskStepper({ tasks, current, done, onSelect }) {
  return (
    <ol className="flex items-center" aria-label="Lab tasks">
      {tasks.map((task, i) => {
        const type = TASK_TYPES[task.type];
        const isDone = done.has(task.id);
        const isCurrent = i === current;
        const reachable = isDone || isCurrent || (i > 0 && done.has(tasks[i - 1].id));
        const Icon = isDone ? Check : reachable ? type.Icon : Lock;

        return (
          <li key={task.id} className="flex items-center">
            {i > 0 && (
              <span aria-hidden="true" className="mx-1 h-0.5 w-6 overflow-hidden rounded-full bg-neutral-800 sm:w-12">
                <span
                  className="block h-full bg-purple-500 transition-[width] duration-300 motion-reduce:transition-none"
                  style={{ width: done.has(tasks[i - 1].id) ? "100%" : "0%" }}
                />
              </span>
            )}
            <button
              type="button"
              disabled={!reachable}
              onClick={() => onSelect(i)}
              aria-current={isCurrent ? "step" : undefined}
              aria-label={`Task ${i + 1}: ${type.label}. ${isDone ? "Done" : isCurrent ? "Current" : reachable ? "Open" : "Locked"}`}
              className="group relative flex min-h-11 items-center gap-2 rounded-full px-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400 disabled:cursor-not-allowed"
            >
              <span
                className={`flex size-8 items-center justify-center rounded-full border transition-colors duration-200 ${
                  isDone
                    ? "border-purple-500 bg-purple-600 text-white"
                    : isCurrent
                      ? `border-transparent bg-neutral-900 text-white ring-2 ${type.ring}`
                      : "border-neutral-700 bg-neutral-950 text-neutral-500"
                }`}
              >
                <Icon size={15} aria-hidden="true" />
              </span>
              <span
                className={`hidden text-xs font-medium md:inline ${isCurrent ? "text-white" : isDone ? "text-neutral-300" : "text-neutral-500"}`}
              >
                {type.label}
              </span>
            </button>
          </li>
        );
      })}
    </ol>
  );
}
