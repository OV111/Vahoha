import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { teamsApi } from "./teamsApi";

/**
 * /team: older links (profile, capstone) land here. With exactly one running
 * team, open it; otherwise the hub, where all your teams are listed.
 */
const RUNNING = ["forming", "active", "defending"];

export default function TeamRedirect() {
  const [target, setTarget] = useState(null);

  useEffect(() => {
    let cancelled = false;
    teamsApi
      .mineAll()
      .then((teams) => {
        const running = teams.filter((t) => RUNNING.includes(t.status));
        if (!cancelled) setTarget(running.length === 1 ? `/team/${running[0]._id}` : "/teams");
      })
      .catch(() => !cancelled && setTarget("/teams"));
    return () => {
      cancelled = true;
    };
  }, []);

  return target ? <Navigate to={target} replace /> : <LoadingSuspense />;
}
