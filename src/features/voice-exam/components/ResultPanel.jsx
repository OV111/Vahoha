import { CheckCircle2, XCircle, Clock } from "lucide-react";

const STATUS_LABEL = { solid: "Solid", shallow: "Shallow", missing: "Missing" };
const STATUS_STYLE = {
  solid: "text-green-600",
  shallow: "text-amber-600",
  missing: "text-red-600",
};

/**
 * Pass or fail first. Free users see which concepts to fix (names only);
 * detailed users also see status and the quote that earned or lost credit.
 * "Names only" still gives direction, which the mentor gate depends on.
 *
 * @param {{ result: import("../lib/examStates").ExamResult, detailed?: boolean, onClose: () => void }} props
 */
const ResultPanel = ({ result, detailed = false, onClose }) => {
  const weak = result.concepts.filter((c) => c.status !== "solid");

  return (
    <div className="bg-white dark:bg-neutral-800/60 dark:backdrop-blur-sm rounded-xl px-8 py-8">
      <div className="flex items-center gap-3 mb-6">
        {result.passed ? (
          <CheckCircle2 size={28} className="text-green-600" />
        ) : (
          <XCircle size={28} className="text-red-600" />
        )}
        <h2 className="text-[20px] font-semibold text-[#1a1f36] dark:text-white">
          {result.passed ? "You passed" : "Not passed yet"}
        </h2>
      </div>

      {detailed ? (
        <ul className="space-y-4 mb-6">
          {result.concepts.map((c) => (
            <li key={c.label}>
              <div className="flex items-center justify-between text-[14px]">
                <span className="text-[#1a1f36] dark:text-zinc-200">{c.label}</span>
                <span className={STATUS_STYLE[c.status]}>{STATUS_LABEL[c.status]}</span>
              </div>
              {c.quote && (
                <p className="mt-1 text-[13px] italic text-[#697386] dark:text-zinc-400">
                  &ldquo;{c.quote}&rdquo;
                </p>
              )}
            </li>
          ))}
        </ul>
      ) : (
        weak.length > 0 && (
          <div className="mb-6">
            <p className="text-[14px] text-[#1a1f36] dark:text-zinc-200 mb-2">Review these concepts:</p>
            <ul className="list-disc pl-5 text-[14px] text-[#1a1f36] dark:text-zinc-200">
              {weak.map((c) => (
                <li key={c.label}>{c.label}</li>
              ))}
            </ul>
          </div>
        )
      )}

      {!result.passed && (
        <div className="rounded-lg bg-neutral-50 dark:bg-neutral-900/60 px-4 py-3 mb-6 text-[13.5px] text-[#1a1f36] dark:text-zinc-200">
          <p className="mb-1">Next step: review the weak concepts with the AI mentor.</p>
          {result.retryAvailableAt && (
            <p className="flex items-center gap-2 text-[#697386] dark:text-zinc-400">
              <Clock size={14} />
              You can retry after {new Date(result.retryAvailableAt).toLocaleString()}
            </p>
          )}
        </div>
      )}

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

export default ResultPanel;
