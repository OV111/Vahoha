import { useCallback, useEffect, useState } from "react";
import { getMentorUsage } from "@/services/mentorApi";
import {
  MENTOR_USAGE_COPY as COPY,
  MENTOR_USAGE_DEFAULT_DAYS,
  MENTOR_USAGE_RANGES,
} from "../../../../constants/mentorUsage";
import { formatCompact, formatFull } from "../lib/usageFormat";
import UsageToday from "./UsageToday";
import UsageChart, { UsageDailyTable } from "./UsageChart";
import UsageSessionsTable from "./UsageSessionsTable";
import UsageSkeleton from "./UsageSkeleton";

const Summary = ({ label, value }) => (
  <div className="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
    <p className="text-xs text-gray-500 dark:text-[#8A8A93]">{label}</p>
    <p className="text-lg font-semibold tabular-nums text-gray-900 dark:text-gray-100">{value}</p>
  </div>
);

/**
 * How much of the mentor the learner has used: today's allowance, a daily token
 * chart, and a per-conversation breakdown. Read-only; every number is the server's.
 * Shown in the mentor's usage window.
 */
export default function MentorUsageSetting() {
  const [days, setDays] = useState(MENTOR_USAGE_DEFAULT_DAYS);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [showTable, setShowTable] = useState(false);

  // Switching the range keeps the previous numbers on screen (dimmed) instead of
  // blanking the view, which would also hide the range buttons mid-click.
  const load = useCallback(() => {
    let stale = false;
    setError(false);
    setLoading(true);
    getMentorUsage(days)
      .then((res) => {
        if (!stale) setData(res);
      })
      .catch(() => {
        if (!stale) setError(true);
      })
      .finally(() => {
        if (!stale) setLoading(false);
      });
    return () => {
      stale = true;
    };
  }, [days]);

  useEffect(() => load(), [load]);

  return (
    <section className="grid gap-5">
      <p className="text-xs text-gray-500 dark:text-[#8A8A93]">{COPY.note}</p>

      {error ? (
        <div className="flex items-center justify-between gap-3 rounded-lg bg-gray-50 p-3 text-sm dark:bg-white/5">
          <span className="text-gray-600 dark:text-gray-300">{COPY.loadError}</span>
          <button
            type="button"
            onClick={load}
            className="rounded-md border border-gray-300 px-3 py-1 text-xs font-medium text-gray-800 hover:bg-gray-100 dark:border-white/15 dark:text-gray-200 dark:hover:bg-white/10"
          >
            {COPY.retry}
          </button>
        </div>
      ) : !data ? (
        <UsageSkeleton />
      ) : (
        <div aria-busy={loading} className={`grid gap-5 transition-opacity ${loading ? "opacity-60" : ""}`}>
          <section aria-label={COPY.todayHeading} className="grid gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-[#8A8A93]">
              {COPY.todayHeading}
            </h3>
            <UsageToday today={data.today} />
          </section>

          <section className="grid gap-3">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-[#8A8A93]">
                {COPY.chartTitle}
              </h3>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setShowTable((v) => !v)}
                  className="text-xs text-purple-600 hover:underline dark:text-purple-400"
                >
                  {showTable ? COPY.viewChart : COPY.viewTable}
                </button>
                <div role="radiogroup" aria-label={COPY.rangeLabel} className="flex rounded-md border border-gray-300 p-0.5 dark:border-white/15">
                  {MENTOR_USAGE_RANGES.map((n) => (
                    <button
                      key={n}
                      type="button"
                      role="radio"
                      aria-checked={days === n}
                      onClick={() => setDays(n)}
                      className={`rounded px-2.5 py-1 text-xs font-medium ${
                        days === n
                          ? "bg-purple-500/15 text-purple-700 dark:text-purple-300"
                          : "text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200"
                      }`}
                    >
                      {COPY.rangeOption(n)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            {showTable ? <UsageDailyTable daily={data.daily} /> : <UsageChart daily={data.daily} />}
            <div className="grid grid-cols-3 gap-3">
              <Summary label={COPY.statMessages} value={formatFull(data.totals?.messages)} />
              <Summary label={COPY.statTokens} value={formatCompact(data.totals?.totalTokens)} />
              <Summary label={COPY.statAverage} value={formatFull(Math.round(data.totals?.avgTokensPerMessage ?? 0))} />
            </div>
          </section>

          <section className="grid gap-2">
            <h3 className="text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-[#8A8A93]">
              {COPY.conversationsHeading}
            </h3>
            <UsageSessionsTable sessions={data.sessions} />
          </section>
        </div>
      )}
    </section>
  );
}
