import { Bone, BoneControl, SkeletonRegion } from "@/components/ui/Skeleton";

// Placeholders shaped like the real pages, so nothing jumps when content arrives.

export function LayerSkeleton() {
  return (
    <SkeletonRegion label="Loading layer">
      <div className="mx-auto max-w-3xl px-4 pb-24 pt-8 sm:px-6">
        <Bone className="h-4 w-32" />
        <Bone className="mt-10 h-4 w-24" />
        <Bone className="mt-3 h-9 w-80 max-w-full" />
        <Bone soft className="mt-5 h-4 w-[36rem] max-w-full" />
        <Bone soft className="mt-2 h-4 w-[28rem] max-w-full" />
        <BoneControl className="mt-8 h-12 w-80 max-w-full rounded-xl" bar="w-1/2" />
        <div className="mt-10 divide-y divide-neutral-800 border-y border-neutral-800">
          {["w-28", "w-36", "w-24"].map((width) => (
            <div key={width} className="py-6">
              <Bone className={`h-5 ${width}`} />
              <Bone soft className="mt-6 h-4 w-4/5" />
              <Bone soft className="mt-6 h-4 w-3/5" />
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
    <div className="flex h-full min-h-0 flex-col overflow-hidden bg-[#08060d]">
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
