import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { teamsApi } from "./teamsApi";
import JoinOrStart from "./components/JoinOrStart";
import Leaderboard from "./components/Leaderboard";
import "./teams-theme.css";

/**
 * /teams: the Build Teams hub, open to everyone signed in. Your teams (a person
 * can be on several), start a team, teams looking for members, top teams.
 * Each team's workspace lives at /team/:teamId.
 */

const RUNNING = ["forming", "active", "defending"];

function YourTeams({ teams }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="t-h2">Your teams</h2>
      <ul className="grid gap-2 sm:grid-cols-2">
        {teams.map((t) => (
          <li key={t._id}>
            <Link
              to={`/team/${t._id}`}
              className={`t-card flex items-center justify-between gap-3 hover:shadow-[inset_0_0_0_1px_var(--t-fog)] ${RUNNING.includes(t.status) ? "" : "opacity-70"}`}
            >
              <span className="flex min-w-0 flex-col gap-1">
                <span className="truncate text-[var(--t-paper)]">{t.name}</span>
                <span className="t-caption">
                  <span className="t-mono">{t.trackId}</span> · {t.status} · {t.memberCount}/6
                  {t.aiLeads ? " · AI lead" : ""}
                </span>
              </span>
              <span className="inline-flex shrink-0 items-center gap-1 text-sm text-[var(--t-mist)]">
                Open <ArrowRight size={14} aria-hidden="true" />
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function TeamsHubPage() {
  const navigate = useNavigate();
  const [mine, setMine] = useState(undefined); // undefined = loading, else the list of my teams

  const load = useCallback(() => {
    teamsApi
      .mineAll()
      .then(setMine)
      .catch(() => setMine([]));
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  // Same full-page loader as the route's Suspense fallback: one continuous spinner.
  if (mine === undefined) return <LoadingSuspense />;

  return (
    <div className="teams-theme">
      <main className="mx-auto flex max-w-[1200px] flex-col gap-6 px-4 py-12">
        <header className="flex flex-col gap-3">
          <h1 className="t-h1">Build teams</h1>
          <p className="t-muted max-w-xl">
            A small team of developers with the same aim builds one real project together. Each member merges pull
            requests, is questioned on their own changes, and gets a public evidence page.
          </p>
        </header>

        {mine.length > 0 && <YourTeams teams={mine} />}

        <JoinOrStart onChanged={(team) => navigate(team?._id ? `/team/${team._id}` : "/teams")} />

        <Leaderboard />
      </main>
    </div>
  );
}
