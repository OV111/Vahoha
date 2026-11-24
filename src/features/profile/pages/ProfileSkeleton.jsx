import { SectionHeader } from "../components/ProfileSections";
import { Bone, BoneControl, BonePanel, SkeletonRegion } from "@/components/ui/Skeleton";

// Mirrors UserProfile's layout. Only headings every profile has are real text;
// "Verified layers" is left out because most profiles have none.
const ProfileSkeleton = () => (
  <SkeletonRegion label="Loading profile" className="min-h-screen bg-gray-50 dark:bg-black">
    <div className="mx-auto max-w-6xl">
      {/* Banner + avatar, same position as the real page */}
      <div className="relative">
        <div className="h-40 sm:h-56">
          <Bone soft className="h-full rounded-none" />
        </div>
        <div className="absolute -bottom-10 left-14 z-1 -translate-x-1/2 sm:-bottom-13 sm:left-16 lg:-bottom-14 lg:left-10 lg:translate-x-0">
          <div className="h-20 w-20 overflow-hidden rounded-full border-3 border-gray-900 bg-black sm:h-24 sm:w-24 lg:h-28 lg:w-28">
            <Bone className="h-full shrink-0 rounded-full" />
          </div>
        </div>
      </div>

      {/* Profile header */}
      <div className="px-4 pt-16 sm:px-6 lg:px-10 lg:pt-20">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
          <div className="w-full max-w-2xl">
            <Bone className="h-8 w-50" />
            <Bone className="mt-2.5 h-3.5 w-22.5" />
            <Bone className="mt-2.5 h-3.5 w-37.5" />
            <Bone className="mt-2.5 h-4 w-[80%]" />
            <Bone className="mt-2.5 h-3.5 w-45" />
          </div>
          <div className="flex flex-col items-start gap-6 lg:items-end">
            <div className="flex gap-2">
              <BoneControl className="h-9 w-23" />
              <BoneControl className="h-9 w-23" />
              <BoneControl className="h-9 w-9" />
            </div>
            <div className="flex gap-8">
              {["Followers", "Following", "Posts"].map((label) => (
                <div key={label} className="flex flex-col items-center">
                  <Bone className="my-0.5 h-5 w-7" />
                  <p className="text-sm text-gray-600 dark:text-gray-400">{label}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-6">
              {[1, 2].map((i) => (
                <Bone key={i} className="h-6 w-6 shrink-0 rounded-full" />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Body: hiring panel first below xl, right column from xl */}
      <div className="mt-6 flex flex-col gap-6 px-4 pb-16 sm:px-6 lg:px-10 xl:flex-row">
        <aside className="order-first w-full shrink-0 xl:order-last xl:w-60">
          <SectionHeader title="For hiring" />
          <BonePanel className="p-4">
            <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-gray-400">Career</p>
            <BoneControl className="h-16 rounded-xl" bar="w-1/2" />
          </BonePanel>
        </aside>

        <div className="min-w-0 flex-1">
          <SectionHeader title="Paths" />
          <BonePanel className="px-5 py-4">
            <Bone className="h-4 w-[40%]" />
            <Bone className="mt-2 h-3 w-[25%]" />
          </BonePanel>

          <SectionHeader title="Capstones" right="AI-reviewed" />
          <BonePanel className="px-5 py-6">
            <Bone className="h-4 w-[35%]" />
            <Bone className="mt-2 h-3.5 w-[60%]" />
          </BonePanel>

          <SectionHeader title="Test history" />
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <BonePanel key={i} className="flex items-center justify-between px-4 py-3">
                <div className="w-1/2">
                  <Bone className="h-4" />
                  <Bone className="mt-2 h-3 w-[50%]" />
                </div>
                <Bone className="h-6 w-18 rounded-full" />
              </BonePanel>
            ))}
          </div>

          <SectionHeader title="Posts" />
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <BonePanel key={i} className="flex h-56 flex-col justify-end p-5">
                <Bone className="h-4 w-2/3" />
                <Bone soft className="mt-2 h-3 w-1/2" />
              </BonePanel>
            ))}
          </div>
        </div>
      </div>
    </div>
  </SkeletonRegion>
);

export default ProfileSkeleton;
