import { useEffect, useMemo, useRef } from "react";
import Seo from "../../seo/Seo";
import BackgroundGrid from "./components/catalog/BackgroundGrid";
import HeroSection from "./components/catalog/HeroSection";
import FilterBar from "./components/catalog/FilterBar";
import ChallengeGrid from "./components/catalog/ChallengeGrid";
import CatalogSidebar from "./components/catalog/CatalogSidebar";
import useChallengeFilters from "./hooks/useChallengeFilters";
import useChallengeStore from "./store/useChallengeStore";

export default function CodingChallenges() {
  const heroRef = useRef(null);
  const {
    challenges,
    total,
    page,
    pages,
    track,
    myTrack,
    tracks,
    listLoading,
    loadingMore,
    listError,
    topics,
    daily,
    stats,
    readiness,
    leaderboard,
    loading,
    loadMeta,
    loadChallenges,
    loadMore,
  } = useChallengeStore();

  useEffect(() => {
    loadMeta();
  }, [loadMeta]);

  const filters = useChallengeFilters({ myTrack });

  // The list refetches whenever the filters (the URL) change.
  useEffect(() => {
    loadChallenges(filters.apiQuery);
  }, [filters.apiQuery, loadChallenges]);

  const titleOf = useMemo(
    () => new Map(tracks.map((t) => [t.trackId, t.title])),
    [tracks],
  );

  return (
    <div className="min-h-screen text-[#e5e5e5] relative mt-8">
      <Seo noindex path="/coding-challenges" title="Coding Challenges | Vahoha" />
      <BackgroundGrid />
      <HeroSection
        daily={daily}
        stats={stats}
        loading={loading}
        challengeCount={tracks.reduce((sum, t) => sum + t.count, 0)}
        heroRef={heroRef}
      />

      <FilterBar filters={filters} topics={topics} tracks={tracks} shownTrack={track} />

      <div className="flex flex-col lg:flex-row gap-6 px-6 sm:px-10 lg:px-14 py-6">
        <ChallengeGrid
          challenges={challenges}
          total={total}
          hasMore={page < pages}
          loading={listLoading}
          loadingMore={loadingMore}
          error={listError}
          onLoadMore={loadMore}
          // In "All paths", cards outside the learner's own path say which
          // path they're from. Picking one path makes that label redundant.
          trackLabelFor={(c) =>
            track === "all" && c.trackId !== myTrack ? (titleOf.get(c.trackId) ?? c.trackId) : null
          }
          // Only offered when "my path" came up empty.
          onBrowseAll={track !== "all" ? () => filters.setActivePath("all") : null}
        />
        <CatalogSidebar
          loading={loading}
          readiness={readiness}
          leaderboard={leaderboard}
        />
      </div>
    </div>
  );
}
