import { Bone, BoneControl, BonePanel, SkeletonRegion } from "@/components/ui/Skeleton";

// Placeholders shaped like the real pages, so nothing jumps when content arrives.

export function LayerSkeleton() {
  return (
    <SkeletonRegion label="Loading layer">
      <div className="mx-auto max-w-6xl px-4 pb-24 pt-8 sm:px-6">
        <Bone className="h-4 w-32" />
        <Bone className="mt-10 h-4 w-24" />
        <Bone className="mt-3 h-9 w-80 max-w-full" />
        <Bone soft className="mt-5 h-4 w-[36rem] max-w-full" />
        <Bone soft className="mt-2 h-4 w-[28rem] max-w-full" />
        <BoneControl className="mt-8 h-12 w-80 max-w-full rounded-xl" bar="w-1/2" />
        <Bone className="mt-14 h-6 w-28" />
        <div className="mt-10 flex flex-col gap-14 md:gap-20">
          {["md:self-start", "md:self-end", "md:self-start"].map((side, i) => (
            // A fixed placeholder list: position is its identity.
            <div key={i} className={`w-full md:w-[42%] ${side}`}>
              <BonePanel className="p-5">
                <Bone className="h-3 w-40" />
                <Bone soft className="mt-3 h-4 w-full" />
                <Bone soft className="mt-2 h-3 w-24" />
              </BonePanel>
            </div>
          ))}
        </div>
      </div>
    </SkeletonRegion>
  );
}

/** A lesson with no written content yet: the summary-and-links page. */
export function ArticleSkeleton() {
  return (
    <SkeletonRegion label="Loading lesson">
      <div className="mx-auto max-w-3xl px-6 pb-24 pt-10 sm:px-10">
        <Bone className="h-4 w-32" />
        <Bone className="mt-8 h-3 w-40" />
        <Bone className="mt-3 h-8 w-4/5" />
        <Bone soft className="mt-8 h-4 w-full" />
        <Bone soft className="mt-2 h-4 w-3/4" />
        <BoneControl className="mt-8 h-14 w-full rounded-xl" bar="w-1/3" />
      </div>
    </SkeletonRegion>
  );
}

export function CodePanelSkeleton({ children }) {
  return (
    <div className="flex h-full min-h-0 flex-col overflow-hidden rounded-2xl border border-[#1a1a1a] bg-[#0d0d0d]">
      <div className="flex h-[61px] items-center justify-between border-b border-[#1a1a1a] px-3">
        <Bone className="h-3 w-14" />
        <BoneControl className="h-11 w-20" />
      </div>
      <div className="flex-1">{children}</div>
      <div className="h-44 border-t border-[#1a1a1a] lg:h-56" />
    </div>
  );
}

export function LessonSkeleton() {
  return (
    <SkeletonRegion label="Loading lesson">
      <div className="mx-auto max-w-7xl px-4 pb-32 pt-6 sm:px-6 lg:px-8">
        <div className="flex h-11 items-center gap-4">
          <Bone className="h-4 w-32" />
          <Bone className="h-1.5 flex-1 rounded-full" />
          <Bone className="h-4 w-10" />
        </div>
        <Bone className="mt-6 h-4 w-72 max-w-full" />
        <div className="mt-8 grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12">
          <div className="max-w-[62ch]">
            <Bone className="h-4 w-24" />
            <Bone className="mt-4 h-8 w-4/5" />
            <Bone soft className="mt-6 h-4 w-full" />
            <Bone soft className="mt-2 h-4 w-full" />
            <Bone soft className="mt-2 h-4 w-3/4" />
            <Bone soft className="mt-6 h-4 w-full" />
            <Bone soft className="mt-2 h-4 w-2/3" />
          </div>
          <div className="h-[460px] lg:h-[calc(100dvh-8rem)]">
            <CodePanelSkeleton />
          </div>
        </div>
      </div>
    </SkeletonRegion>
  );
}
