import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  AlertTriangle,
  CheckCircle2,
  Rocket,
  TimerReset,
} from "lucide-react";
import { capstoneApi } from "./capstoneApi";
import CapstoneTrack from "./components/CapstoneTrack";
import { SURFACE } from "./components/ui";
import { TrackSkeleton } from "./components/CapstoneSkeleton";

// Shown when the learner has nothing open yet: the locked page with their progress.
const DEFAULT_TRACK_ID = "api-dev";

// Capstones a learner can act on. "locked" is deliberately absent: those are
// reached from the roadmap node, and listing 150 of them would bury the ones
// that matter.
const STATE = {
  ready: {
    Icon: Rocket,
    label: "ready to start",
    tone: "text-purple-300 border-purple-500/50",
  },
  in_progress: {
    Icon: TimerReset,
    label: "in progress",
    tone: "text-violet-300 border-violet-500/50",
  },
  passed: {
    Icon: CheckCircle2,
    label: "approved",
    tone: "text-green-300 border-green-500/50",
  },
  failed: {
    Icon: AlertTriangle,
    label: "sent back",
    tone: "text-red-300 border-red-500/50",
  },
};

/** The learner has several capstones to act on: one card per track. */
function Picker({ items }) {
  return (
    <div className="max-w-5xl mx-auto px-6 lg:px-12 pt-14 pb-24 text-white">
      <h1 className="text-3xl font-bold">Your capstones</h1>
      <p className="mt-2 text-sm text-neutral-400">
        You have more than one capstone available. Pick one to continue.
      </p>
      <ul className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
        {items.map((c) => {
          const s = STATE[c.state];
          return (
            <li key={c.trackId}>
              <Link
                to={`/capstone/${c.trackId}`}
                className={`${SURFACE} flex h-full flex-col gap-3 p-6 transition-colors hover:border-purple-500/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400`}
              >
                <span className="flex items-center justify-between gap-3">
                  <span className="font-mono text-xs uppercase tracking-[0.18em] text-purple-400">
                    {c.trackTitle}
                  </span>
                  <span
                    className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs ${s.tone}`}
                  >
                    <s.Icon size={10} aria-hidden="true" /> {s.label}
                  </span>
                </span>
                <span className="text-base font-semibold leading-snug">
                  {c.briefTitle}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

/**
 * /capstone and /capstone/:trackId.
 *  - with a track id: that track's capstone;
 *  - without one, by how many capstones the learner can act on:
 *      none (or logged out) -> the default capstone, locked state;
 *      one                  -> that capstone, right here (no redirect);
 *      several              -> a picker of just those.
 */
export default function CapstonePage() {
  const { trackId } = useParams();
  const [actionable, setActionable] = useState(null);

  useEffect(() => {
    if (trackId) return undefined;
    let alive = true;
    capstoneApi
      .overview()
      .then((items) => alive && setActionable(items.filter((i) => STATE[i.state])))
      .catch(() => alive && setActionable([])); // logged out or failed: default page
    return () => {
      alive = false;
    };
  }, [trackId]);

  if (trackId) return <CapstoneTrack key={trackId} trackId={trackId} />;
  if (!actionable) return <TrackSkeleton />;
  if (actionable.length > 1) return <Picker items={actionable} />;

  const only = actionable[0]?.trackId ?? DEFAULT_TRACK_ID;
  return <CapstoneTrack key={only} trackId={only} />;
}
