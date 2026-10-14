import ProgressCard from "./ProgressCard";
import LeaderboardPanel from "./LeaderboardPanel";

export default function CatalogSidebar({ loading, readiness, leaderboard }) {
  return (
    // Below the grid on phones/tablets; its own column from lg up.
    <div className="flex w-full flex-col gap-6 sm:grid sm:grid-cols-2 lg:flex lg:w-52 lg:shrink-0">
      <ProgressCard readiness={readiness} loading={loading} />
      <LeaderboardPanel leaderboard={leaderboard} loading={loading} />
    </div>
  );
}
