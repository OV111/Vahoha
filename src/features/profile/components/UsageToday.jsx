import { MENTOR_USAGE_COPY as COPY } from "../../../../constants/mentorUsage";
import { formatClock, formatCountdown, formatCompact, num } from "../lib/usageFormat";

const Stat = ({ label, value }) => (
  <div>
    <p className="text-xs text-gray-500 dark:text-[#8A8A93]">{label}</p>
    <p className="text-sm font-medium tabular-nums text-gray-900 dark:text-gray-100">{value}</p>
  </div>
);

/** Today's allowance: messages against the daily cap, plus the tokens spent so far. */
export default function UsageToday({ today }) {
  const used = num(today?.messages?.used);
  const cap = num(today?.messages?.cap);
  const pct = cap > 0 ? Math.min(100, Math.round((used / cap) * 100)) : 0;
  const tokens = today?.tokens ?? {};
  const clock = today?.resetAt ? formatClock(today.resetAt) : "";

  return (
    <div className="grid gap-3">
      <div>
        <div className="mb-1 flex items-baseline justify-between text-sm">
          <span className="font-medium text-gray-900 dark:text-gray-100">{COPY.messagesLabel}</span>
          <span className="tabular-nums text-gray-600 dark:text-gray-300">
            {used} / {cap}
          </span>
        </div>
        <div
          role="progressbar"
          aria-label={COPY.messagesLabel}
          aria-valuemin={0}
          aria-valuemax={cap}
          aria-valuenow={used}
          className="h-2 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-white/10"
        >
          <div className="h-full rounded-full bg-purple-500" style={{ width: `${pct}%` }} />
        </div>
        {clock && (
          <p className="mt-1 text-xs text-gray-500 dark:text-[#8A8A93]">
            {COPY.resetsAt(clock, formatCountdown(today.resetAt))}
          </p>
        )}
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Stat label={`${COPY.tokensLabel} ${COPY.promptLabel.toLowerCase()}`} value={formatCompact(tokens.prompt)} />
        <Stat label={`${COPY.tokensLabel} ${COPY.completionLabel.toLowerCase()}`} value={formatCompact(tokens.completion)} />
        <Stat label={`${COPY.tokensLabel} ${COPY.totalLabel.toLowerCase()}`} value={formatCompact(tokens.total)} />
      </div>
    </div>
  );
}
