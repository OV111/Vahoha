import { useState } from "react";
import { Check, GitPullRequest } from "lucide-react";
import { dismissDrift } from "../driftApi";

const SHOWN = 5;

/**
 * "Your project changed since you drew this map": the files merged PRs touched
 * that the map depends on. Advice only: it never edits the map. Renders nothing
 * when there is no drift. `onDismissed` lets the page drop it from its state.
 */
export default function DriftBanner({ mapId, drift, onDismissed }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const hints = drift?.hints ?? [];
  if (hints.length === 0) return null;

  const review = async () => {
    setBusy(true);
    setError(null);
    try {
      await dismissDrift(mapId);
      onDismissed?.();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  // Newest first: the last PRs are what the learner is least likely to know about.
  const shown = hints.slice(-SHOWN).reverse();

  return (
    <section aria-label="Changes since this map was drawn" className="mt-4 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="min-w-0">
          <h2 className="flex items-center gap-2 text-sm font-semibold text-amber-200">
            <GitPullRequest size={15} aria-hidden="true" /> Your project changed since you drew this map
          </h2>
          <p className="mt-1 text-sm text-neutral-300">Check that the map still matches the code. These files were merged:</p>
        </div>
        <button
          type="button"
          onClick={review}
          disabled={busy}
          className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-lg border border-amber-500/50 px-3 text-sm text-amber-100 transition-colors hover:bg-amber-500/15 focus-visible:outline-2 focus-visible:outline-purple-400 disabled:cursor-wait disabled:opacity-60"
        >
          <Check size={14} aria-hidden="true" /> {busy ? "Saving…" : "Mark as reviewed"}
        </button>
      </div>

      <ul className="mt-3 space-y-1.5 text-sm">
        {shown.map((h) => (
          <li key={`${h.prNumber}:${h.path}`} className="text-neutral-200">
            <span className="text-neutral-400">PR #{h.prNumber} · </span>
            <span className="font-mono text-[13px] break-all">{h.path}</span>
            <span className="text-neutral-400"> — {h.reason}</span>
          </li>
        ))}
      </ul>
      {hints.length > SHOWN && <p className="mt-2 text-xs text-neutral-400">and {hints.length - SHOWN} more</p>}

      {error && (
        <p role="alert" className="mt-3 text-sm text-red-300">
          {error}
        </p>
      )}
    </section>
  );
}
