import { Link } from "react-router-dom";
import { PROGRESS_COPY } from "../../../../constants/progress";
import { TEXT, MUTED, SOFT, BORDER, SURFACE, FOCUS } from "../lib/tone";

const COPY = PROGRESS_COPY.path;

const SEGMENT = {
  done: "h-2.5 bg-purple-600 dark:bg-purple-500",
  current: "h-4 bg-purple-200 ring-2 ring-purple-600 ring-offset-2 ring-offset-white dark:bg-purple-900 dark:ring-purple-400 dark:ring-offset-zinc-950",
  ahead: "h-2.5 bg-zinc-200 dark:bg-zinc-800",
};

/** One block per layer: passed, where you are, ahead. */
const PathStrip = ({ layers }) => (
  <ol className="flex items-center gap-1" aria-label="Layers of your path">
    {layers.map((layer) => (
      <li
        key={layer.layerId}
        title={`Layer ${layer.order}: ${layer.title}`}
        className={`min-w-1 flex-1 rounded-sm ${SEGMENT[layer.status]}`}
      >
        <span className="sr-only">
          Layer {layer.order}, {layer.title}: {COPY.layerStatus[layer.status]}
        </span>
      </li>
    ))}
  </ol>
);

/** The active path and where the learner stands on it. */
const PathCard = ({ journey }) => {
  const panel = `rounded-xl border p-5 ${BORDER} ${SURFACE}`;

  if (!journey.track || !journey.layers.length) {
    return (
      <section aria-labelledby="path-heading" className={panel}>
        <h2 id="path-heading" className={`text-base font-semibold ${TEXT}`}>
          {COPY.noPath}
        </h2>
        <p className={`mt-1 text-sm ${MUTED}`}>{COPY.noPathBody}</p>
        <Link
          to="/roadmaps"
          className={`mt-4 inline-flex rounded-md bg-purple-600 px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-purple-500 ${FOCUS}`}
        >
          {COPY.choose}
        </Link>
      </section>
    );
  }

  const total = journey.layers.length;
  const current = journey.layers.find((l) => l.status === "current") ?? journey.layers.at(-1);

  return (
    <section aria-labelledby="path-heading" className={panel}>
      <div className="flex items-baseline justify-between gap-3">
        <h2 id="path-heading" className={`text-base font-semibold ${TEXT}`}>
          {journey.track.title}
        </h2>
        <Link
          to="/roadmaps"
          className={`shrink-0 rounded text-sm text-purple-600 hover:underline dark:text-purple-400 ${FOCUS}`}
        >
          {COPY.open}
        </Link>
      </div>

      <div className="mt-4">
        <PathStrip layers={journey.layers} />
      </div>

      {journey.passed === total ? (
        <p className={`mt-3 text-sm font-medium ${TEXT}`}>{COPY.allPassed(total)}</p>
      ) : (
        <>
          <p className={`mt-3 text-sm font-medium ${TEXT}`}>{COPY.position(current.order, total)}</p>
          <p className={`text-sm ${SOFT}`}>{current.title}</p>
          <p className={`mt-1 text-xs ${MUTED}`}>{COPY.passed(journey.passed, total)}</p>
        </>
      )}
    </section>
  );
};

export default PathCard;
