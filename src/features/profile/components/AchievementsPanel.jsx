import { Bone, BonePanel, SkeletonRegion } from "@/components/ui/Skeleton";

// Full class strings so Tailwind can see them.
const TONES = {
  amber: "border-amber-400 bg-amber-500/10 text-amber-300",
  teal: "border-teal-400 bg-teal-500/10 text-teal-300",
  orange: "border-orange-400 bg-orange-500/10 text-orange-300",
  purple: "border-purple-400 bg-purple-500/10 text-purple-300",
  yellow: "border-yellow-400 bg-yellow-500/10 text-yellow-300",
};
const LOCKED = "border-neutral-700 bg-neutral-900 text-neutral-500 opacity-60";

/**
 * Achievements under the CV, computed from real profile data
 * (lib/achievements.js). Locked badges say how to earn them, and every badge
 * states its status to screen readers — colour is not the only cue.
 */
export default function AchievementsPanel({ achievements, loading }) {
  if (loading) {
    return (
      <SkeletonRegion label="Loading achievements">
        <BonePanel className="p-4">
          <Bone className="mb-4 h-3.5 w-28" />
          <div className="grid grid-cols-4 gap-3 sm:grid-cols-6 xl:grid-cols-4">
            {Array.from({ length: 7 }, (_, i) => (
              <Bone key={i} className="size-11 rounded-full" />
            ))}
          </div>
        </BonePanel>
      </SkeletonRegion>
    );
  }

  const earned = achievements.filter((a) => a.earned).length;

  return (
    <div className="rounded-2xl border border-white/10 px-4 py-4">
      <p className="mb-4 text-sm text-gray-300">
        <span className="font-semibold text-white">{earned}</span> of{" "}
        {achievements.length} earned
      </p>

      <ul className="grid grid-cols-4 gap-x-2 gap-y-4 sm:grid-cols-6 xl:grid-cols-4">
        {achievements.map((a) => (
          <li
            key={a.id}
            title={a.earned ? a.label : `Locked — ${a.hint}`}
            className="flex flex-col items-center gap-1.5 text-center"
          >
            <span
              aria-hidden="true"
              className={`grid size-11 place-items-center rounded-full border-2 text-[13px] font-bold ${
                a.earned ? TONES[a.tone] : LOCKED
              }`}
            >
              {a.char}
            </span>
            <span
              className={`text-xs leading-tight ${a.earned ? "text-neutral-200" : "text-neutral-500"}`}
            >
              {a.label}
              <span className="sr-only">
                {a.earned ? " (earned)" : ` (locked: ${a.hint})`}
              </span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
