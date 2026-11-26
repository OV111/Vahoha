import { Bone, BonePanel, SkeletonRegion } from "@/components/feedback/Skeleton";

/**
 * The verified-results strip at the top of the profile: what a visitor (or a
 * recruiter) should see first. XP is deliberately the small, last tile: it
 * measures effort, not proof.
 */
function Tile({ label, value, muted = false }) {
  return (
    <div className="flex flex-col rounded-xl border border-white/10 bg-white/[0.03] px-3 py-3 sm:px-4">
      <span
        className={`text-2xl font-bold ${muted ? "text-neutral-300" : "text-white"}`}
      >
        {value}
      </span>
      <span className="text-xs text-neutral-400">{label}</span>
    </div>
  );
}

// Same grid, spacing and tile height as the real strip (py-3 + a 2rem number +
// a 1rem label = 72px), so nothing jumps when the numbers arrive.
const GRID = "grid grid-cols-[1.3fr_1fr_1fr] gap-2 sm:max-w-md sm:grid-cols-3 sm:gap-3";

function StripSkeleton() {
  return (
    <SkeletonRegion label="Loading verified results" className={GRID}>
      {[0, 1, 2].map((i) => (
        <BonePanel key={i} className="flex h-18 flex-col justify-center gap-2 rounded-xl px-3 sm:px-4">
          <Bone className="h-5 w-8" />
          <Bone soft className="h-3 w-2/3" />
        </BonePanel>
      ))}
    </SkeletonRegion>
  );
}

export default function ResultsStrip({ summary, xp, loading }) {
  if (loading) return <StripSkeleton />;
  return (
    <section aria-label="Verified results" className={GRID}>
      <Tile label="Layers passed" value={summary.layersPassed} />
      <Tile label="Capstones" value={summary.capstones} />
      {/* xp stays undefined until the challenges request lands: show a dash, not a false 0. */}
      <Tile label="XP" value={xp ?? "—"} muted />
    </section>
  );
}
