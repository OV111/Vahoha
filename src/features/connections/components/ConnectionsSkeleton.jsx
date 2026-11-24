import { Bone, BoneControl, SkeletonRegion } from "@/components/ui/Skeleton";

/** Rows shaped like ConnectionRow, so the list doesn't jump when data lands. */
export default function ConnectionsSkeleton({ rows = 5 }) {
  return (
    <SkeletonRegion label="Loading people" className="divide-y divide-[#1a1a1a]">
      {Array.from({ length: rows }, (_, i) => (
        <div key={i} className="flex items-center gap-4 px-4 py-4 sm:px-5">
          <Bone className="size-12 shrink-0 rounded-full" />
          <div className="min-w-0 flex-1">
            <Bone className="h-4 w-2/5" />
            <Bone soft className="mt-2.5 h-3 w-2/3" />
          </div>
          <BoneControl className="h-[38px] w-26" />
        </div>
      ))}
    </SkeletonRegion>
  );
}
