import { Loader2 } from "lucide-react";

// Neutral waiting state between turns. No evaluative wording on purpose:
// the examiner never signals whether an answer was good or bad.
const TranscribingState = ({ label = "Transcribing your answer…" }) => (
  <div
    role="status"
    aria-live="polite"
    className="bg-white dark:bg-neutral-800/60 dark:backdrop-blur-sm rounded-xl px-8 py-14 flex flex-col items-center gap-4"
  >
    <Loader2 size={24} className="animate-spin text-[#697386]" />
    <p className="text-[14px] text-[#697386] dark:text-zinc-400">{label}</p>
  </div>
);

export default TranscribingState;
