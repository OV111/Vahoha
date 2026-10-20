import { Construction, RefreshCw } from "lucide-react";

// Loading, empty and error states for the roadmap tree. The skeleton has the
// shape of the real thing (topics | layer card | topics on desktop, a card and
// a list on mobile) so the page doesn't jump when it loads. Pulsing is skipped
// when the user prefers reduced motion.

const Block = ({ className = "" }) => (
  <div className={`rounded-xl bg-neutral-800/70 motion-safe:animate-pulse ${className}`} />
);

const SkeletonSide = ({ align }) => (
  <div className={`flex flex-col gap-6 ${align}`}>
    {[0, 1].map((i) => (
      <div key={i} className={`flex items-center gap-6 ${align === "items-end" ? "flex-row-reverse" : ""}`}>
        <Block className="h-16 w-[190px] rounded-2xl" />
        <div className="flex flex-col gap-3">
          <Block className="h-[52px] w-[260px]" />
          <Block className="h-[52px] w-[260px]" />
        </div>
      </div>
    ))}
  </div>
);

export const TreeSkeleton = ({ desktop }) => (
  <div role="status" aria-live="polite" className="w-full px-4 pb-10">
    <span className="sr-only">Loading roadmap</span>
    {desktop ? (
      <div className="flex flex-col items-center gap-16">
        {[0, 1].map((row) => (
          <div key={row} className="flex items-center justify-center gap-14">
            <SkeletonSide align="items-end" />
            <Block className="h-44 w-[300px] rounded-2xl" />
            <SkeletonSide align="items-start" />
          </div>
        ))}
      </div>
    ) : (
      <div className="mx-auto flex max-w-xl flex-col gap-3">
        <Block className="h-40 rounded-2xl" />
        {[0, 1, 2].map((i) => (
          <Block key={i} className="h-14 rounded-2xl" />
        ))}
      </div>
    )}
  </div>
);

export const TreeEmpty = () => (
  <div className="mt-20 flex flex-col items-center gap-3 px-6 text-center">
    <Construction size={32} className="text-neutral-500" aria-hidden="true" />
    <p className="text-sm font-semibold text-neutral-200">This roadmap is still being written</p>
    <p className="max-w-xs text-sm text-neutral-400">Its layers and lessons aren&rsquo;t ready yet. Pick another track, or check back soon.</p>
  </div>
);

export const TreeError = ({ onRetry }) => (
  <div className="mt-20 flex flex-col items-center gap-3 px-6 text-center" role="alert">
    <p className="text-sm font-semibold text-neutral-200">Couldn&rsquo;t load this roadmap</p>
    <p className="max-w-xs text-sm text-neutral-400">Check your connection and try again.</p>
    <button
      type="button"
      onClick={onRetry}
      className="mt-1 inline-flex min-h-11 items-center gap-2 rounded-lg border border-neutral-700 px-4 text-sm text-neutral-200 transition-colors duration-150 hover:border-purple-500/60 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
    >
      <RefreshCw size={14} aria-hidden="true" />
      Try again
    </button>
  </div>
);
