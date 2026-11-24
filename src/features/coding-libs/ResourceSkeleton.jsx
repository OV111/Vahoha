import { Bone, BoneLines, BonePanel, SkeletonRegion } from "@/components/ui/Skeleton";
import { BOOK_GRID, CARD_GRID } from "./grids";

const BookSkeleton = () => (
  <div className="space-y-3">
    <BonePanel className="aspect-[2/3] rounded-lg" />
    <Bone className="h-4 w-3/4" />
    <Bone soft className="h-3 w-1/2" />
  </div>
);

const CardSkeleton = () => (
  <BonePanel className="flex h-44 flex-col rounded-md p-4">
    <BoneLines widths={["w-1/2", "w-full", "w-5/6"]} />
    <Bone className="mt-auto h-4 w-16" />
  </BonePanel>
);

// Same grid + aspect ratio as the real cards, so nothing jumps when data arrives.
export default function ResourceSkeleton({ variant = "card", count = 8 }) {
  const isBook = variant === "book";
  const Item = isBook ? BookSkeleton : CardSkeleton;
  return (
    <SkeletonRegion label="Loading resources" className={isBook ? BOOK_GRID : CARD_GRID}>
      {Array.from({ length: count }, (_, i) => (
        <Item key={i} />
      ))}
    </SkeletonRegion>
  );
}
