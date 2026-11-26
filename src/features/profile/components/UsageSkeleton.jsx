import { Bone, BonePanel, SkeletonRegion } from "@/components/feedback/Skeleton";
import { MENTOR_USAGE_COPY as COPY, MENTOR_USAGE_RANGES } from "@/constants/mentorUsage";

const HEADING = "text-xs font-semibold uppercase tracking-wide text-gray-500 dark:text-[#8A8A93]";
const LABEL = "text-xs text-gray-500 dark:text-[#8A8A93]";
const TODAY_LABELS = [COPY.promptLabel, COPY.completionLabel, COPY.totalLabel];
const SUMMARY_LABELS = [COPY.statMessages, COPY.statTokens, COPY.statAverage];
const ROWS = ["w-3/5", "w-2/5", "w-1/2", "w-2/3"];

/**
 * Stand-in for the loaded usage view, with the same layout: headings and labels
 * are the real text, the numbers and the chart are placeholders. The chart block
 * is the chart's own fixed 160px height.
 */
export default function UsageSkeleton() {
  return (
    <SkeletonRegion label={COPY.loading} className="grid gap-5">
      <div className="grid gap-2">
        <h3 className={HEADING}>{COPY.todayHeading}</h3>
        <div className="grid gap-3">
          <div>
            <div className="mb-1 flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900 dark:text-gray-100">{COPY.messagesLabel}</span>
              <Bone className="h-3.5 w-12" />
            </div>
            <Bone className="h-2 w-full rounded-full" />
            <Bone soft className="mt-1.5 h-3 w-44" />
          </div>
          <div className="grid grid-cols-3 gap-3">
            {TODAY_LABELS.map((label) => (
              <div key={label}>
                <p className={LABEL}>{`${COPY.tokensLabel} ${label.toLowerCase()}`}</p>
                <Bone className="my-0.5 h-4 w-12" />
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h3 className={HEADING}>{COPY.chartTitle}</h3>
          <div className="flex items-center gap-2 opacity-60">
            <span className="text-xs text-purple-600 dark:text-purple-400">{COPY.viewTable}</span>
            <div className="flex rounded-md border border-gray-300 p-0.5 dark:border-white/15">
              {MENTOR_USAGE_RANGES.map((days) => (
                <span key={days} className="rounded px-2.5 py-1 text-xs font-medium text-gray-600 dark:text-gray-400">
                  {COPY.rangeOption(days)}
                </span>
              ))}
            </div>
          </div>
        </div>
        <BonePanel className="h-40 rounded-lg" />
        <div className="grid grid-cols-3 gap-3">
          {SUMMARY_LABELS.map((label) => (
            <div key={label} className="rounded-lg bg-gray-50 p-3 dark:bg-white/5">
              <p className={LABEL}>{label}</p>
              <Bone className="my-1 h-5 w-14" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <h3 className={HEADING}>{COPY.conversationsHeading}</h3>
        <div className="divide-y divide-[#1a1a1a]">
          {ROWS.map((width) => (
            <div key={width} className="flex items-center justify-between gap-6 py-2">
              <Bone className={`h-4 ${width}`} />
              <Bone soft className="h-4 w-16" />
            </div>
          ))}
        </div>
      </div>
    </SkeletonRegion>
  );
}
