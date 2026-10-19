// Placeholders shaped like the real pages, so nothing jumps when content
// arrives. The pulse is skipped for people who ask for reduced motion.
const Bar = ({ className = "" }) => (
  <div className={`rounded-md bg-neutral-800/70 motion-safe:animate-pulse ${className}`} />
);

const Loading = ({ label, children }) => (
  <div role="status" aria-label={label}>
    <span className="sr-only">{label}</span>
    <div aria-hidden="true">{children}</div>
  </div>
);

export function LayerSkeleton() {
  return (
    <Loading label="Loading layer">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        <Bar className="h-4 w-32" />
        <Bar className="mt-10 h-4 w-24" />
        <Bar className="mt-3 h-9 w-80 max-w-full" />
        <Bar className="mt-5 h-4 w-[36rem] max-w-full" />
        <Bar className="mt-2 h-4 w-[28rem] max-w-full" />
        <Bar className="mt-8 h-12 w-80 max-w-full rounded-xl" />
        <Bar className="mt-14 h-6 w-28" />
        <div className="mt-10 flex flex-col gap-14 md:gap-20">
          {["md:self-start", "md:self-end", "md:self-start"].map((side, i) => (
            // A fixed placeholder list: position is its identity.
            <div key={i} className={`w-full md:w-[42%] ${side}`}>
              <div className="rounded-2xl border border-neutral-800 p-5">
                <Bar className="h-3 w-40" />
                <Bar className="mt-3 h-4 w-full" />
                <Bar className="mt-2 h-3 w-24" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Loading>
  );
}

/** A lesson with no written content yet: the summary-and-links page. */
export function ArticleSkeleton() {
  return (
    <Loading label="Loading lesson">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:px-10">
        <Bar className="h-4 w-32" />
        <Bar className="mt-8 h-3 w-40" />
        <Bar className="mt-3 h-8 w-4/5" />
        <Bar className="mt-8 h-4 w-full" />
        <Bar className="mt-2 h-4 w-3/4" />
        <Bar className="mt-8 h-14 w-full rounded-xl" />
      </div>
    </Loading>
  );
}

export function CodePanelSkeleton({ children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-neutral-800 bg-[#050505]">
      <div className="flex h-[61px] items-center justify-between border-b border-neutral-800 px-3">
        <Bar className="h-3 w-14" />
        <Bar className="h-11 w-20 rounded-lg" />
      </div>
      <div className="flex-1">{children}</div>
      <div className="h-44 border-t border-neutral-800 lg:h-56" />
    </div>
  );
}

export function LessonSkeleton() {
  return (
    <Loading label="Loading lesson">
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <div className="flex h-11 items-center gap-4">
          <Bar className="h-4 w-32" />
          <Bar className="h-1.5 flex-1 rounded-full" />
          <Bar className="h-4 w-10" />
        </div>
        <Bar className="mt-6 h-4 w-72 max-w-full" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="max-w-[62ch]">
            <Bar className="h-4 w-24" />
            <Bar className="mt-4 h-8 w-4/5" />
            <Bar className="mt-6 h-4 w-full" />
            <Bar className="mt-2 h-4 w-full" />
            <Bar className="mt-2 h-4 w-3/4" />
            <Bar className="mt-6 h-4 w-full" />
            <Bar className="mt-2 h-4 w-2/3" />
          </div>
          <div className="h-[460px] lg:h-[calc(100dvh-8rem)]">
            <CodePanelSkeleton />
          </div>
        </div>
      </div>
    </Loading>
  );
}
