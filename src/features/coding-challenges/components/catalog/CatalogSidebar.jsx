import ProgressCard from "./ProgressCard";
import LeaderboardPanel from "./LeaderboardPanel";

export default function CatalogSidebar({ loading, readiness, leaderboard }) {
  return (
    <div className="w-52 shrink-0 hidden lg:flex flex-col gap-6">
      <ProgressCard readiness={readiness} loading={loading} />
      <LeaderboardPanel leaderboard={leaderboard} loading={loading} />
    </div>
  );
}
