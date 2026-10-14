/**
 * Same padding and line heights as StatCell, so the stats row keeps its size
 * when the real numbers arrive.
 */
export default function StatCellSkeleton() {
  return (
    <div className="px-4 py-4 flex flex-col gap-1 animate-pulse" aria-hidden="true">
      <div className="h-6 w-16 rounded-sm bg-[#1a1a1a]" />
      <div className="h-[9px] w-20 rounded-sm bg-[#161616] mt-1" />
      <div className="h-[11px] w-12 rounded-sm bg-[#111111]" />
    </div>
  );
}
