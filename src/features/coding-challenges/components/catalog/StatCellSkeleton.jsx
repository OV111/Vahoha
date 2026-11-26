import { Bone } from "@/components/feedback/Skeleton";

/**
 * Same padding and line heights as StatCell, so the stats row keeps its size
 * when the real numbers arrive.
 */
export default function StatCellSkeleton() {
  return (
    <div className="flex flex-col gap-1 px-4 py-4">
      <Bone className="h-6 w-16" />
      <Bone soft className="mt-1 h-[9px] w-20" />
      <Bone className="h-[11px] w-12 bg-[#111111]" />
    </div>
  );
}
