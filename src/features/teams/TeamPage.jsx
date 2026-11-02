import { useCallback, useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { teamsApi } from "./teamsApi";
import TeamDefense from "./components/TeamDefense";
import PeerRatings from "./components/PeerRatings";
import TeamMapCard from "./components/TeamMapCard";
import MemberList from "./components/MemberList";
import TaskBoard from "./components/board/TaskBoard";
import TeamPulse from "./components/TeamPulse";
import TeamSetup from "./components/TeamSetup";
import { PAGE } from "../../../constants/layout";
import "./teams-theme.css";

/**
 * /team: the signed-in developer's team workspace. Sections: setup while
 * forming, members (level and role), this week (health, warnings, weekly
 * update), the task board, my defense (questions on my own merged PRs), peer
 * ratings and the merged work. One page per team (/team/:teamId); a person can
 * be on several. /team alone goes to your only team, or to the hub (/teams).
 */

function Section({ title, children }) {
  return (
    <section className="t-section">
      <h2 className="t-h2">{title}</h2>
      {children}
    </section>
  );
}

export default function TeamPage() {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(undefined); // undefined = loading, null = not found or not yours
  const [contributions, setContributions] = useState([]);
  const [error, setError] = useState(null);

  // Reloaded after starting, joining, leaving or starting the project.
  const load = useCallback(async () => {
    try {
      const found = await teamsApi.get(teamId);
      setTeam(found);
      setContributions(await teamsApi.contributions(found._id));
    } catch (err) {
      // 404 also means "not your team": the server doesn't reveal teams you aren't on.
      if (err.status === 404) setTeam(null);
      else setError(err.message);
    }
  }, [teamId]);

  useEffect(() => {
    load();
  }, [load]);

  const shell = (children) => (
    <div className="teams-theme">
      <main className={`${PAGE.dashboard} flex flex-col gap-6 py-12`}>
        {children}
      </main>
    </div>
  );

  if (error) return shell(<p className="text-sm text-[var(--t-red)]">{error}</p>);
  // The same full-page loader as the route's Suspense fallback, so the switch
  // from "loading the page" to "loading the team" is one continuous spinner.
  if (team === undefined) return <LoadingSuspense />;
  if (team === null) {
    return shell(
      <div className="flex flex-col gap-3">
        <h1 className="t-h1">Team not found</h1>
        <p className="t-muted">This team doesn&apos;t exist, or you aren&apos;t on it.</p>
        <Link to="/teams" className="t-btn t-btn-primary w-fit">All teams</Link>
      </div>,
    );
  }

  const active = team.members.filter((m) => m.status === "active");
  const teammates = active.filter((m) => m.userId !== team.viewerId);

  return shell(
    <>
      <header className="flex flex-col gap-2">
        <Link to="/teams" className="t-link inline-flex w-fit items-center gap-1 t-caption">
          <ArrowLeft size={12} aria-hidden="true" />
          All teams
        </Link>
        <h1 className="t-h1">{team.name}</h1>
        <p className="flex items-center gap-2">
          <span className="t-badge t-mono">{team.trackId}</span>
          <span className="t-badge">{team.status}</span>
        </p>
        {team.repo && (
          <a
            href={team.repo.url}
            target="_blank"
            rel="noopener noreferrer"
            className="t-link inline-flex w-fit items-center gap-1.5"
          >
            <Github size={14} aria-hidden="true" />
            {team.repo.fullName}
            <ExternalLink size={11} aria-hidden="true" />
          </a>
        )}
      </header>

      <TeamSetup team={team} members={active} onChanged={load} onLeft={() => navigate("/teams")} />

      {(team.status === "completed" || team.status === "disbanded") && (
        <Link to="/teams" className="t-btn t-btn-primary w-fit">
          Start or join your next team
        </Link>
      )}

      <Section title="Members">
        <MemberList team={team} members={active} />
      </Section>

      <Section title="This week">
        <TeamPulse teamId={team._id} />
      </Section>

      <Section title="Board">
        <TaskBoard team={team} members={active} />
      </Section>

      {active.some((m) => m.userId === team.viewerId) && <TeamMapCard teamId={team._id} />}

      <Section title="Your defense">
        <p className="t-muted">
          Five questions about the pull requests you merged. Only you can answer
          them, and each has a 3-minute timer.
        </p>
        <TeamDefense teamId={team._id} />
      </Section>

      <Section title="Rate your teammates">
        <PeerRatings teamId={team._id} teammates={teammates} />
      </Section>

      <Section title="Merged work">
        {contributions.length === 0 ? (
          <p className="t-caption">
            No merged pull requests synced yet.
          </p>
        ) : (
          <ul className="flex flex-col gap-2">
            {contributions.map((c) => (
              <li key={c._id} className="t-card-subtle flex items-baseline gap-3 text-sm">
                <span className="t-mono text-[var(--t-ash)]">#{c.prNumber}</span>
                <span className="flex-1 text-[var(--t-mist)]">{c.title}</span>
                <span className="t-mono text-[var(--t-fog)]">@{c.authorLogin}</span>
              </li>
            ))}
          </ul>
        )}
      </Section>

    </>,
  );
}
