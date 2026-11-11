import { Loader2 } from "lucide-react";
import { SESSIONS_COPY } from "../../../../constants/mentor";
import { groupSessions } from "../lib/groupSessions";
import SessionItem from "./SessionItem";

/** "2d ago" style — dates arrive as ISO strings from MongoDB. */
function formatWhen(iso) {
  if (!iso) return "";
  const then = new Date(iso);
  if (Number.isNaN(then.getTime())) return "";

  const secs = Math.floor((Date.now() - then.getTime()) / 1000);
  if (secs < 60) return "just now";
  if (secs < 3600) return `${Math.floor(secs / 60)}m ago`;
  if (secs < 86400) return `${Math.floor(secs / 3600)}h ago`;
  if (secs < 604800) return `${Math.floor(secs / 86400)}d ago`;
  return then.toLocaleDateString(undefined, { month: "short", day: "numeric" });
}

// Placeholder rows while the list loads, so "No sessions yet" is never shown
// for a list that simply hasn't arrived.
const SKELETON_WIDTHS = ["78%", "62%", "70%", "54%", "66%"];

function SessionsSkeleton({ label }) {
  return (
    <div role="status" aria-busy="true" className="space-y-1 px-1 pt-1">
      <span className="sr-only">{label}</span>
      {SKELETON_WIDTHS.map((w, i) => (
        <div key={i} className="rounded-lg px-3 py-2.5">
          <div className="h-3 rounded bg-white/8 motion-safe:animate-pulse" style={{ width: w }} />
        </div>
      ))}
    </div>
  );
}

/**
 * The scrollable body of the sidebar: loading, empty and no-match states, or the
 * date-grouped rows plus a "Load more" button. `query` is the (trimmed) search
 * text; while it is set, `sessions` are the search results.
 */
export default function SessionsList({
  sessions,
  activeSessionId,
  streamingId,
  query,
  challengeOnly = false,
  loading,
  hasMore,
  loadingMore,
  onLoadMore,
  onSelect,
  onRename,
  onDelete,
  onTogglePin,
}) {
  if (loading && sessions.length === 0) {
    return <SessionsSkeleton label={query ? SESSIONS_COPY.searching : SESSIONS_COPY.loading} />;
  }

  if (sessions.length === 0) {
    if (challengeOnly && !query) {
      return (
        <div className="flex flex-col items-center justify-center gap-2 mt-12 px-4 text-center">
          <span className="text-[11px] text-white/70">{SESSIONS_COPY.noChallengeChats}</span>
          <span className="text-[10px] text-white/45">{SESSIONS_COPY.noChallengeChatsHint}</span>
        </div>
      );
    }
    return query ? (
      <p className="text-[11px] text-center mt-12 px-4 text-white/50">{SESSIONS_COPY.noMatch(query)}</p>
    ) : (
      <div className="flex flex-col items-center justify-center gap-2 mt-12 px-4 text-center">
        <span className="text-[11px] text-white/70">{SESSIONS_COPY.empty}</span>
        <span className="text-[10px] text-white/45">{SESSIONS_COPY.emptyHint}</span>
      </div>
    );
  }

  const groups = groupSessions(sessions);

  return (
    <>
      {groups.map((group) => (
        <div key={group.key}>
          {/* A lone group needs no heading — it would just label the whole list. */}
          {groups.length > 1 && (
            <p className="px-3 pb-1 pt-3 text-[11px] font-medium text-white/50">
              {group.label}
            </p>
          )}
          {group.sessions.map((s) => (
            <SessionItem
              key={s._id}
              session={{ ...s, when: formatWhen(s.updatedAt ?? s.createdAt) }}
              active={s._id === activeSessionId}
              streaming={s._id === streamingId}
              onSelect={onSelect}
              onRename={onRename}
              onDelete={onDelete}
              onTogglePin={onTogglePin}
            />
          ))}
        </div>
      ))}

      {hasMore && (
        <button
          type="button"
          onClick={onLoadMore}
          disabled={loadingMore}
          aria-label={SESSIONS_COPY.loadMoreLabel}
          className="mt-2 flex min-h-9 w-full cursor-pointer items-center justify-center gap-2 rounded-lg border border-white/10 text-[12px] text-white/70 transition-colors hover:bg-white/5 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-500 disabled:cursor-default disabled:opacity-60 max-md:min-h-11 max-md:text-sm"
        >
          {loadingMore && <Loader2 size={13} className="motion-safe:animate-spin" aria-hidden="true" />}
          {loadingMore ? SESSIONS_COPY.loadingMore : SESSIONS_COPY.loadMore}
        </button>
      )}
    </>
  );
}
