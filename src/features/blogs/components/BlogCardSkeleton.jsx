import { Bone, BonePanel, SkeletonRegion } from "@/components/ui/Skeleton";

// Mirrors BlogCard's layout, so the page doesn't jump when real cards arrive.
const BlogCardSkeleton = () => (
  <BonePanel className="flex min-h-[478px] flex-col overflow-hidden">
    <Bone soft className="h-56 rounded-none" />
    <div className="flex flex-col gap-3 p-5">
      <Bone className="h-5 w-[70px] rounded-full" />
      <Bone className="h-5 w-5/6" />
      <div className="flex flex-col gap-2">
        <Bone soft className="h-3 w-full" />
        <Bone soft className="h-3 w-full" />
        <Bone soft className="h-3 w-2/3" />
      </div>
    </div>
    <div className="mt-auto flex items-center justify-between border-t border-[#1a1a1a] px-5 py-3">
      <div className="flex items-center gap-2.5">
        <Bone className="size-7 rounded-full" />
        <Bone className="h-3 w-[90px]" />
      </div>
      <Bone className="h-5 w-[70px]" />
    </div>
  </BonePanel>
);

export const BlogCardSkeletonGrid = ({ count = 6 }) => (
  <SkeletonRegion label="Loading posts" className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
    {Array.from({ length: count }, (_, i) => (
      <BlogCardSkeleton key={i} />
    ))}
  </SkeletonRegion>
);
