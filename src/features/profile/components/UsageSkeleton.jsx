import { MENTOR_USAGE_COPY as COPY } from "../../../../constants/mentorUsage";

// Plain pulsing blocks rather than a skeleton library: they follow the dark/light
// classes by themselves and stop pulsing when the visitor asks for less motion.
const Block = ({ className = "" }) => (
  <div className={`rounded bg-gray-200 dark:bg-white/10 motion-safe:animate-pulse ${className}`} />
);

/**
 * Stand-in for the loaded usage view. It mirrors the real layout (today bar and
 * stats, chart, three totals, conversation rows) so nothing jumps when the data
 * arrives. The chart block is the chart's own fixed 160px height.
 */
export default function UsageSkeleton() {
  return (
    <div role="status" aria-busy="true" className="grid gap-5">
      <span className="sr-only">{COPY.loading}</span>

      <div className="grid gap-3">
        <Block className="h-3 w-16" />
        <div className="grid gap-1.5">
          <div className="flex justify-between">
            <Block className="h-4 w-28" />
            <Block className="h-4 w-12" />
          </div>
          <Block className="h-2 w-full rounded-full" />
          <Block className="h-3 w-44" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="grid gap-1.5">
              <Block className="h-3 w-16" />
              <Block className="h-4 w-12" />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex items-center justify-between">
          <Block className="h-3 w-28" />
          <Block className="h-7 w-24" />
        </div>
        <Block className="h-40 w-full" />
        <div className="grid grid-cols-3 gap-3">
          {[0, 1, 2].map((i) => (
            <Block key={i} className="h-[58px] rounded-lg" />
          ))}
        </div>
      </div>

      <div className="grid gap-2">
        <Block className="h-3 w-32" />
        {[0, 1, 2, 3].map((i) => (
          <Block key={i} className="h-8 w-full" />
        ))}
      </div>
    </div>
  );
}
