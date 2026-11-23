import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { fetchVersion, fetchVersions } from "../systemMapApi";
import { fromGraph } from "../lib/mapGraph";

// What came right after each version, i.e. why it was kept.
const REASON_LABEL = {
  session: "End of an editing session",
  scan: "Before a repo scan",
  import: "Before an import",
  reset: "Before starting over",
  restore: "Before a restore",
};

const formatWhen = (date) =>
  new Date(date).toLocaleString(undefined, { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });

export default function VersionHistory({ mapId, isTeam, onRestore, onClose }) {
  const [state, setState] = useState({ status: "loading" });
  const [restoring, setRestoring] = useState(null);

  useEffect(() => {
    let live = true;
    fetchVersions(mapId)
      .then((versions) => live && setState({ status: "done", versions }))
      .catch((err) => live && setState({ status: "error", message: err.message }));
    return () => {
      live = false;
    };
  }, [mapId]);

  const restore = async (version) => {
    setRestoring(version.id);
    try {
      const graph = fromGraph((await fetchVersion(mapId, version.id)).graph);
      if (!graph) throw new Error("That version can't be opened.");
      onRestore(graph, formatWhen(version.savedAt));
    } catch (err) {
      setState((s) => ({ ...s, message: err.message }));
      setRestoring(null);
    }
  };

  return (
    <section aria-label="Map history" className="mt-4 rounded-2xl border border-neutral-800 bg-neutral-950 p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-sm font-semibold text-white">History</h2>
          <p className="mt-0.5 text-sm text-neutral-400">
            A version is kept when you come back after a break, and before a scan, import, start over or restore.
          </p>
        </div>
        {/* A small icon in the corner; the invisible ::before keeps a 44px tap area around it. */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close history"
          title="Close"
          className="relative -mt-1 -mr-1 flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg text-neutral-400 transition-colors before:absolute before:-inset-1.5 before:content-[''] hover:bg-neutral-800 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400"
        >
          <X size={15} aria-hidden="true" />
        </button>
      </div>

      {state.status === "loading" && <p className="mt-4 text-sm text-neutral-400">Loading…</p>}
      {state.message && (
        <p role="alert" className="mt-4 text-sm text-red-300">
          {state.message}
        </p>
      )}
      {state.status === "done" && state.versions.length === 0 && (
        <p className="mt-4 text-sm text-neutral-400">No earlier versions yet.</p>
      )}

      {state.status === "done" && state.versions.length > 0 && (
        <ul className="thin-scrollbar mt-3 max-h-72 divide-y divide-neutral-800 overflow-auto">
          {state.versions.map((v) => (
            <li key={v.id} className="flex flex-wrap items-center justify-between gap-3 py-2">
              <div className="min-w-0 text-sm">
                <p className="text-neutral-200">{formatWhen(v.savedAt)}</p>
                <p className="text-neutral-500">
                  {REASON_LABEL[v.reason] ?? "Earlier version"} · {v.parts} part{v.parts === 1 ? "" : "s"}
                  {isTeam && v.by ? ` · ${v.by}` : ""}
                </p>
              </div>
              <button
                type="button"
                onClick={() => restore(v)}
                disabled={restoring !== null}
                className="inline-flex min-h-11 cursor-pointer items-center rounded-lg border border-neutral-700 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-500 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400 disabled:cursor-wait disabled:opacity-60"
              >
                {restoring === v.id ? "Restoring…" : "Restore"}
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
