import { Bone, BonePanel } from "@/components/feedback/Skeleton";

/**
 * Mirrors ChallengeCard's exact structure: same padding, same row heights,
 * same footer position, so the grid occupies the identical size while
 * loading as it does once real cards arrive.
 */
export default function ChallengeCardSkeleton() {
  return (
    <BonePanel className="relative flex h-full flex-col gap-2.5 overflow-hidden rounded-4xl p-4">
      <div className="flex items-center gap-2">
        <Bone className="h-3 w-24" />
        <Bone className="h-4 w-12" />
      </div>

      <Bone className="h-4 w-3/4" />

      <div className="flex flex-col gap-1.5">
        <Bone soft className="h-3 w-full" />
        <Bone soft className="h-3 w-5/6" />
      </div>

      <div className="flex flex-wrap gap-1.5">
        <Bone className="h-4 w-14" />
        <Bone className="h-4 w-16" />
        <Bone className="h-4 w-12" />
      </div>

      <div className="mt-auto flex items-center justify-between border-t border-[#1a1a1a] pt-2">
        <Bone className="h-3 w-24" />
        <Bone className="h-4 w-14" />
      </div>
    </BonePanel>
  );
}
