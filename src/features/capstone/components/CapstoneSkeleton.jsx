import { Bone, BoneControl, BoneLines, BonePanel, SkeletonRegion } from "@/components/ui/Skeleton";

/**
 * Loading placeholder that mirrors CapstoneTrack's layout (hero + CTA +
 * stepper, agent card, work grid), so nothing jumps when data lands.
 */
const PAGE = "mx-auto max-w-7xl px-4 sm:px-6 lg:px-12";

/** Compact bar on mobile, six circles on a rail from sm up — like CapstoneStepper. */
function StepperSkeleton() {
  return (
    <>
      <div className="sm:hidden">
        <Bone className="h-3.5 w-45" />
        <Bone className="mt-2.5 h-1.5 rounded-full" />
      </div>
      <div className="relative hidden w-full max-w-xl grid-cols-6 sm:grid">
        <div className="absolute left-[calc(100%/12)] right-[calc(100%/12)] top-[15px] h-[2px] rounded-full bg-[#1a1a1a]" />
        {Array.from({ length: 6 }, (_, i) => (
          <div key={i} className="relative flex flex-col items-center gap-2">
            <Bone className="h-8 w-8 shrink-0 rounded-full" />
            <Bone className="h-3 w-13" />
          </div>
        ))}
      </div>
    </>
  );
}

export function TrackSkeleton() {
  return (
    <SkeletonRegion label="Loading capstone" className="min-h-screen pb-24">
      {/* hero + agent card */}
      <div className={`${PAGE} pt-12 sm:pt-14`}>
        <div className="grid grid-cols-1 items-start gap-10 lg:grid-cols-[1fr_400px] lg:gap-12">
          <div className="flex flex-col gap-6">
            <Bone className="h-3.5 w-50" />
            <div>
              <Bone className="h-12 w-[70%]" />
              <Bone className="mt-2 h-12 w-[55%]" />
            </div>
            <div className="max-w-lg">
              <BoneLines widths={["w-full", "w-full", "w-3/5"]} />
            </div>
            <BoneControl className="h-10.5 w-45" />
            <div className="pt-4">
              <StepperSkeleton />
            </div>
          </div>

          <BonePanel className="overflow-hidden lg:mt-10">
            <div className="flex items-center justify-between border-b border-[#1a1a1a] px-5 py-3">
              <Bone className="h-3 w-25" />
              <Bone className="h-5 w-21 rounded-full" />
            </div>
            <div className="px-5 py-6">
              <Bone className="h-5.5 w-[70%]" />
              <Bone className="mt-2 h-3.5 w-[90%]" />
            </div>
            <div className="flex justify-between border-t border-[#1a1a1a] px-5 py-3.5">
              <Bone className="h-3 w-22.5" />
              <Bone className="h-3 w-25" />
            </div>
          </BonePanel>
        </div>
      </div>

      {/* work grid */}
      <div className={`${PAGE} mt-14 sm:mt-16`}>
        <div className="grid grid-cols-1 items-start gap-6 lg:grid-cols-[1fr_360px]">
          <BonePanel className="flex flex-col gap-4 p-6 sm:p-7">
            <Bone className="h-3 w-20" />
            <Bone className="h-7 w-[50%]" />
            <BoneLines widths={["w-full", "w-full", "w-2/3"]} />
            <div className="flex gap-2">
              {Array.from({ length: 4 }, (_, i) => (
                <Bone key={i} className="h-6 w-16" />
              ))}
            </div>
          </BonePanel>
          <BonePanel className="flex flex-col gap-4 p-6">
            <Bone className="h-3 w-25" />
            <BoneLines widths={["w-full", "w-2/3"]} />
            {Array.from({ length: 3 }, (_, i) => (
              <div key={i} className="flex items-center gap-3">
                <Bone className="h-4 w-4 shrink-0 rounded-full" />
                <Bone className="h-3.5 flex-1" />
              </div>
            ))}
          </BonePanel>
        </div>
      </div>
    </SkeletonRegion>
  );
}
