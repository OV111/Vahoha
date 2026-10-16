import { EXAM_STATES } from "../lib/examStates";

const COPY = {
  [EXAM_STATES.EXPIRED]: {
    title: "Time ran out",
    body: "The test deadline passed. This counts as an attempt.",
  },
  [EXAM_STATES.ABANDONED]: {
    title: "Test abandoned",
    body: "You left the test. This counts as an attempt.",
  },
  [EXAM_STATES.FAILED_TECHNICAL]: {
    title: "Something went wrong on our side",
    body: "This attempt was not counted against you. Please try again.",
  },
};

/** Non-result endings. A technical failure is never counted (spec section 7). */
const TerminalNotice = ({ state, onClose }) => {
  const { title, body } = COPY[state] ?? COPY[EXAM_STATES.FAILED_TECHNICAL];

  return (
    <div className="bg-white dark:bg-neutral-800/60 dark:backdrop-blur-sm rounded-xl px-8 py-10">
      <h2 className="text-[18px] font-semibold text-[#1a1f36] dark:text-white mb-2">{title}</h2>
      <p className="text-[14px] text-[#697386] dark:text-zinc-400 mb-6">{body}</p>
      <button
        type="button"
        onClick={onClose}
        className="min-h-[44px] rounded-full bg-[#1a1f36] dark:bg-white text-white dark:text-[#1a1f36] px-6 text-sm font-medium"
      >
        Back to roadmap
      </button>
    </div>
  );
};

export default TerminalNotice;
