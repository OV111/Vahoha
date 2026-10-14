import { useNavigate } from "react-router-dom";
import ChallengeCard from "./ChallengeCard";
import ChallengeCardSkeleton from "./ChallengeCardSkeleton";

// Same column count as the real grid, so the loading state reserves the
// exact width/height the content will occupy — nothing reflows on arrival.
const SKELETON_COUNT = 4;

export default function ChallengeGrid({
  challenges,
  total,
  hasMore,
  loading,
  loadingMore,
  error,
  onLoadMore,
  trackLabelFor,
  onBrowseAll,
}) {
  const navigate = useNavigate();

  if (!error && loading && challenges.length === 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 flex-1 content-start">
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <ChallengeCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col gap-4">
      {/* Refetching for new filters: keep the old cards, dimmed, so the
          grid doesn't collapse to skeletons on every click. */}
      <div
        className={`grid grid-cols-1 md:grid-cols-2 gap-3 transition-opacity ${loading ? "opacity-50 pointer-events-none" : ""}`}
        aria-busy={loading}
      >
        {error && (
          <p className="col-span-full text-[12px] text-red-400">
            Couldn&apos;t load challenges — {error}
          </p>
        )}
        {!error && !loading && challenges.length === 0 && (
          <div className="col-span-full flex flex-col items-start gap-2 py-6">
            <p className="text-[13px] text-[#666]">No challenges match these filters.</p>
            {onBrowseAll && (
              <button
                type="button"
                onClick={onBrowseAll}
                className="cursor-pointer text-[12px] text-purple-400 hover:text-purple-300"
              >
                Browse all paths →
              </button>
            )}
          </div>
        )}
        {challenges.map((c) => (
          <div
            key={c.slug}
            onClick={() => navigate(`/coding-challenges/${c.slug}`)}
            className="cursor-pointer h-full"
          >
            <ChallengeCard c={c} trackLabel={trackLabelFor(c)} />
          </div>
        ))}
        {loadingMore &&
          Array.from({ length: 2 }).map((_, i) => <ChallengeCardSkeleton key={`more-${i}`} />)}
      </div>

      {challenges.length > 0 && (
        <div className="flex flex-col items-center gap-2 py-2">
          <p className="text-[11px] font-mono text-[#555]">
            Showing {challenges.length} of {total}
          </p>
          {/* A button, not infinite scroll: the footer and sidebar stay
              reachable, and keyboard users decide when more loads. */}
          {hasMore && (
            <button
              type="button"
              onClick={onLoadMore}
              disabled={loadingMore}
              className="cursor-pointer rounded-md border border-[#1f1f1f] bg-[#141414] px-4 py-2 text-xs font-medium text-[#888] transition-colors hover:border-purple-900/60 hover:bg-purple-950/40 hover:text-purple-300 disabled:cursor-wait disabled:opacity-60"
            >
              {loadingMore ? "Loading…" : "Load more"}
            </button>
          )}
        </div>
      )}
    </div>
  );
}
