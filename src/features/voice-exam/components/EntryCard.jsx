import { Link } from "react-router-dom";
import { Mic, Lock } from "lucide-react";

/**
 * Card shown on a layer's detail view, beside "Take exam".
 * Presentational: it gets eligibility as props and links to the exam page.
 *
 * @param {{ layerId: string, pathId?: string, eligibility: import("../lib/examStates").Eligibility|null }} props
 */
const EntryCard = ({ layerId, pathId = "backend", eligibility }) => {
  const locked = !eligibility?.eligible;

  return (
    <div className="rounded-xl bg-white dark:bg-neutral-800/60 px-5 py-4">
      <div className="flex items-center gap-2 mb-1">
        {locked ? <Lock size={16} className="text-neutral-400" /> : <Mic size={16} className="text-[#1a1f36] dark:text-white" />}
        <h3 className="text-[15px] font-semibold text-[#1a1f36] dark:text-white">Voice exam</h3>
      </div>
      <p className="text-[13.5px] text-[#697386] dark:text-zinc-400 mb-3">
        Explain this layer out loud and get a verified result.
      </p>

      {eligibility && (
        <p className="text-[12.5px] text-[#697386] dark:text-zinc-400 mb-3">
          {eligibility.quota.used} of {eligibility.quota.limit} graded exams used this month
        </p>
      )}

      {locked && eligibility?.reasons?.length > 0 && (
        <ul className="text-[13px] text-amber-700 dark:text-amber-300 mb-3 list-disc pl-5">
          {eligibility.reasons.map((reason) => (
            <li key={reason}>{reason}</li>
          ))}
        </ul>
      )}

      {locked ? (
        <span className="inline-block rounded-full bg-neutral-100 dark:bg-neutral-700 text-neutral-400 px-5 py-2 text-sm font-medium">
          Not available yet
        </span>
      ) : (
        <Link
          to={`/voice-exam/${layerId}?path=${pathId}`}
          className="inline-block rounded-full bg-[#1a1f36] dark:bg-white text-white dark:text-[#1a1f36] px-5 py-2 text-sm font-medium"
        >
          Start voice test
        </Link>
      )}
    </div>
  );
};

export default EntryCard;
