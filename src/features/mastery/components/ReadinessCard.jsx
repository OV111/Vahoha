import { Link } from "react-router-dom";
import { TEXT, MUTED, SOFT, BORDER, SURFACE, FOCUS } from "../lib/tone";

const OVERALL_LABEL = {
  entry: "Entry level",
  "approaching-mid": "Approaching mid-level",
  "mid-ready": "Mid-level ready",
};

const LEVEL_META = {
  none: { label: "Not yet", className: `${BORDER} ${MUTED}` },
  shown: { label: "Shown", className: "border-purple-300 bg-purple-50 text-purple-700 dark:border-purple-500/40 dark:bg-purple-500/10 dark:text-purple-300" },
  strong: { label: "Strong", className: "border-purple-600 bg-purple-600 text-white dark:border-purple-400 dark:bg-purple-600/30" },
};

/**
 * "Could I do a mid-level job?" — built only from proof the platform verified:
 * capstones, merged team PRs, reviews, defenses and peer ratings. Exams and
 * topics live in the cards above; this one is about building with others.
 */
const ReadinessCard = ({ readiness }) => {
  const { overall, spheres, evidence } = readiness;
  const hasProof = evidence.capstonePassed || evidence.mergedPrs > 0 || evidence.defensesPassed > 0;

  const facts = [
    evidence.capstonePassed ? "Capstone passed" : null,
    evidence.mergedPrs ? `${evidence.mergedPrs} merged PR${evidence.mergedPrs === 1 ? "" : "s"}` : null,
    evidence.reviewsGiven ? `${evidence.reviewsGiven} review${evidence.reviewsGiven === 1 ? "" : "s"} given` : null,
    evidence.defensesPassed
      ? `${evidence.defensesPassed} defense${evidence.defensesPassed === 1 ? "" : "s"} passed`
      : null,
    evidence.peerAverage !== null ? `Peer rating ${evidence.peerAverage}/5` : null,
  ].filter(Boolean);

  return (
    <section
      aria-labelledby="readiness-heading"
      className={`rounded-xl border p-5 ${BORDER} ${SURFACE}`}
    >
      <div className="mb-4 flex flex-wrap items-end justify-between gap-2">
        <h2 id="readiness-heading" className={`text-base font-semibold ${TEXT}`}>
          Job readiness
        </h2>
        <p className="text-sm font-semibold text-purple-700 dark:text-purple-300">{OVERALL_LABEL[overall] ?? overall}</p>
      </div>

      <ul className="space-y-2">
        {spheres.map((sphere) => {
          const meta = LEVEL_META[sphere.level] ?? LEVEL_META.none;
          return (
            <li key={sphere.id} className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className={`text-sm font-medium ${TEXT}`}>{sphere.title}</p>
                <p className={`text-[13px] ${MUTED}`}>{sphere.skills.join(", ")}</p>
              </div>
              <span
                className={`shrink-0 rounded-full border px-2.5 py-0.5 text-[12px] font-medium ${meta.className}`}
              >
                {meta.label}
              </span>
            </li>
          );
        })}
      </ul>

      {hasProof ? (
        <p className={`mt-4 border-t pt-3 text-[13px] ${BORDER} ${SOFT}`}>
          {facts.join(", ")}
        </p>
      ) : (
        <p className={`mt-4 border-t pt-3 text-[13px] ${BORDER} ${MUTED}`}>
          Readiness comes from real work: pass a capstone, then join a Build Team.{" "}
          <Link to="/capstone" className={`rounded text-purple-600 hover:underline dark:text-purple-400 ${FOCUS}`}>
            Start a capstone
          </Link>
        </p>
      )}
    </section>
  );
};

export default ReadinessCard;
