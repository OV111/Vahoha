import { Bone, BoneControl, SkeletonRegion } from "@/components/feedback/Skeleton";

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

/** One topic: the written page or the summary. */
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
