import { Clock, LogOut, AlertTriangle } from "lucide-react";
import { EXAM_STATES } from "../lib/examStates";

const COPY = {
  [EXAM_STATES.EXPIRED]: {
    icon: Clock,
    title: "Time ran out",
    body: "The 15 minutes ended before the last answer arrived. This counts as one of today's tries.",
  },
  [EXAM_STATES.ABANDONED]: {
    icon: LogOut,
    title: "You left the exam",
    body: "This counts as one of today's tries. You can start a new one from the layer page.",
  },
  [EXAM_STATES.FAILED_TECHNICAL]: {
    icon: AlertTriangle,
    title: "We couldn't check your answer",
    body: "It failed 3 times, so the exam was closed. It uses one of today's tries but never counts as a fail.",
  },
};

/** Non-result endings. A technical failure is never a fail, but it uses a try so it can't be looped. */
const TerminalNotice = ({ state, onClose }) => {
  const {
    icon: Icon,
    title,
    body,
  } = COPY[state] ?? COPY[EXAM_STATES.FAILED_TECHNICAL];

  return (
    <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5 sm:p-8">
      <span className="flex size-12 items-center justify-center rounded-full border border-neutral-700 text-neutral-300">
        <Icon size={22} aria-hidden="true" />
      </span>
      <h2 className="mt-4 text-2xl font-semibold text-neutral-50">{title}</h2>
      <p className="mt-2 max-w-prose text-[15px] text-neutral-400">{body}</p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 inline-flex min-h-12 items-center rounded-xl border border-neutral-700 px-5 text-[15px] font-semibold text-neutral-100 transition-colors hover:bg-neutral-900"
      >
        Back to the layer
      </button>
    </div>
  );
};

export default TerminalNotice;
