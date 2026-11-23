import { Link } from "react-router-dom";
import { Box } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";

// Halfway through a track the learner has built enough to have something to
// map, so the roadmap offers the Project Map as the next step. Members only:
// the editor needs an account.
const SHOW_FROM = 0.5;

export default function RoadmapMapNudge({ done, total }) {
  const isMember = Boolean(useAuthStore((s) => s.auth));
  if (!isMember || total === 0 || done / total < SHOW_FROM) return null;

  return (
    <div className="mt-6 flex w-full flex-col items-center">
      <Link
        to="/project-map"
        className="group w-full max-w-md rounded-2xl border border-purple-500/40 bg-purple-950/15 px-5 py-4 transition-colors hover:border-purple-400 focus-visible:outline-2 focus-visible:outline-purple-400"
      >
        <span className="mb-2 block font-mono text-[10px] tracking-wider text-neutral-500">next · project map</span>
        <span className="flex items-start gap-3">
          <Box size={18} className="mt-0.5 shrink-0 text-purple-300" aria-hidden="true" />
          <span className="flex flex-col gap-1">
            <span className="text-sm font-semibold leading-snug text-neutral-100">Map the project you built</span>
            <span className="text-[11px] text-neutral-400">
              {done === total ? "You finished every layer." : `You finished ${done} of ${total} layers.`} See your project in 3D, verify it
              against your repo, and prove you understand it.
            </span>
          </span>
        </span>
      </Link>
    </div>
  );
}
