import { useState } from "react";
import ConfirmDialog from "@/components/ui/ConfirmDialog";
import { AI_LEAD } from "../../../../constants/teams";
import { teamsApi } from "../teamsApi";

/**
 * Self-serve setup on the team page: while forming, the creator, lead or
 * co-lead sets the repository and starts the project; any member can leave a
 * running team. The server repeats every check.
 */

const MIN_MEMBERS = 2;
const RUNNING = ["forming", "active", "defending"];

export default function TeamSetup({ team, members, onChanged, onLeft }) {
  const [repoUrl, setRepoUrl] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);
  const [leaving, setLeaving] = useState(false);

  const viewer = team.viewerId;
  const isMember = members.some((m) => m.userId === viewer);
  const canManage =
    team.createdBy === viewer || (team.leadId !== AI_LEAD && team.leadId === viewer) || team.coLeadId === viewer;
  const forming = team.status === "forming";

  if (!isMember) return null;

  const act = async (fn) => {
    setBusy(true);
    setError(null);
    try {
      await fn();
      onChanged();
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const missing = [];
  if (members.length < MIN_MEMBERS) missing.push(`at least ${MIN_MEMBERS} members`);
  if (!team.repo) missing.push("a repository");

  return (
    <div className="flex flex-col gap-3">
      {error && <p className="text-sm text-[var(--t-red)]" role="alert">{error}</p>}

      {forming && (
        <div className="t-card flex flex-col gap-3">
          <p className="text-sm text-[var(--t-mist)]">
            This team is forming ({members.length}/6). Others can find it and join until the project starts.
          </p>

          {canManage && !team.repo && (
            <form
              className="flex flex-col gap-2 sm:flex-row"
              onSubmit={(e) => {
                e.preventDefault();
                act(() => teamsApi.setTeamRepo(team._id, repoUrl.trim()));
              }}
            >
              <label className="sr-only" htmlFor="team-repo">Repository URL</label>
              <input
                id="team-repo"
                className="t-input"
                value={repoUrl}
                onChange={(e) => setRepoUrl(e.target.value)}
                placeholder="https://github.com/your-login/project"
                maxLength={200}
              />
              <button type="submit" className="t-btn" disabled={busy || !repoUrl.trim()}>Set repository</button>
            </form>
          )}
          {canManage && !team.repo && (
            <p className="t-caption">The repository must be public and belong to one of the members&apos; GitHub accounts.</p>
          )}

          {canManage ? (
            <div className="flex flex-wrap items-center gap-3">
              <button
                type="button"
                className="t-btn t-btn-primary"
                disabled={busy || missing.length > 0}
                onClick={() => act(() => teamsApi.begin(team._id))}
              >
                Start the project
              </button>
              {missing.length > 0 && <span className="t-caption">Needs {missing.join(" and ")}.</span>}
            </div>
          ) : (
            <p className="t-caption">The person who started the team, or the lead, starts the project.</p>
          )}
        </div>
      )}

      {RUNNING.includes(team.status) && (
        <button type="button" className="t-btn t-btn-ghost w-fit" disabled={busy} onClick={() => setLeaving(true)}>
          Leave team
        </button>
      )}

      {leaving && (
        <ConfirmDialog
          title="Leave this team?"
          body="Your merged work stays on the team's record. You can start or join another team afterwards."
          confirmLabel="Leave team"
          onCancel={() => setLeaving(false)}
          onConfirm={() => {
            setLeaving(false);
            act(async () => {
              await teamsApi.leave(team._id);
              onLeft();
            });
          }}
        />
      )}
    </div>
  );
}
