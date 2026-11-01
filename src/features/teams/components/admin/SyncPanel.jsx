import { RefreshCw } from "lucide-react";
import { Panel } from "./adminUi";
import { SECTION } from "./adminHelpers";

export default function SyncPanel({ team, result, onSync, busy }) {
  return (
    <Panel
      id={SECTION.sync}
      title="Merged work"
      hint="Pulls merged PRs from GitHub and matches them to member logins."
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="t-btn t-btn-ghost"
          disabled={busy || !team.repo}
          onClick={onSync}
        >
          <RefreshCw size={14} className={busy ? "animate-spin motion-reduce:animate-none" : ""} aria-hidden="true" />
          Sync PRs
        </button>
        {!team.repo && <span className="t-caption">Set a repository first.</span>}
      </div>
      {result && (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-[var(--t-border)] sm:grid-cols-4">
          {[
            ["New PRs", result.added],
            ["Already stored", result.alreadyStored],
            ["Not by members", result.skippedNotMembers],
            ["Left for next sync", result.deferred],
          ].map(([label, n]) => (
            <div key={label} className="flex flex-col gap-1 bg-[var(--t-carbon)] px-4 py-3">
              <dt className="t-caption">{label}</dt>
              <dd className="text-xl font-[510] tabular-nums text-[var(--t-paper)]">{n}</dd>
            </div>
          ))}
        </dl>
      )}
      {result?.deferred > 0 && (
        <p className="t-caption">Some PRs are over the per-sync limit. Sync again to pull the rest.</p>
      )}
    </Panel>
  );
}
