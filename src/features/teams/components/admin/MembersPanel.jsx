import { useState } from "react";
import { X } from "lucide-react";
import { MAX_TEAM_MEMBERS } from "../../../../../constants/teams";
import ConfirmButton from "./ConfirmButton";
import UserPicker from "./UserPicker";
import { Panel, Slots } from "./adminUi";
import { SECTION, activeMembers, initials } from "./adminHelpers";

export default function MembersPanel({ team, onAdd, onRemove, busy }) {
  const [picked, setPicked] = useState(null);
  const [login, setLogin] = useState("");
  const current = activeMembers(team);
  const left = team.members.filter((m) => m.status === "left");
  const full = current.length >= MAX_TEAM_MEMBERS;

  const add = async (e) => {
    e.preventDefault();
    if (await onAdd({ userId: picked._id, githubLogin: login.trim() })) {
      setPicked(null);
      setLogin("");
    }
  };

  return (
    <Panel
      id={SECTION.members}
      title="Members"
      hint="Check each GitHub login yourself. Merged PRs are matched to it."
      aside={
        <span className="flex items-center gap-2 pt-1">
          <Slots used={current.length} />
          <span className="t-caption tabular-nums">
            {current.length}/{MAX_TEAM_MEMBERS}
          </span>
        </span>
      }
    >
      {current.length > 0 ? (
        <ul className="t-card-subtle flex flex-col divide-y divide-[var(--t-border)] !p-0">
          {current.map((m) => (
            <li key={m.userId} className="flex items-center justify-between gap-3 px-4 py-2.5">
              <span className="flex min-w-0 items-center gap-3">
                <span className="t-avatar" aria-hidden="true">
                  {initials(m.githubLogin)}
                </span>
                <a
                  href={`https://github.com/${m.githubLogin}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="truncate text-sm text-[var(--t-mist)] hover:text-[var(--t-paper)]"
                >
                  @{m.githubLogin}
                </a>
              </span>
              <ConfirmButton
                disabled={busy}
                onConfirm={() => onRemove(m.userId)}
                confirmLabel="Remove"
              >
                Remove
              </ConfirmButton>
            </li>
          ))}
        </ul>
      ) : (
        <p className="t-caption">No members yet. Add the first person below.</p>
      )}
      {left.length > 0 && (
        <p className="t-caption">Left the team: {left.map((m) => `@${m.githubLogin}`).join(", ")}</p>
      )}

      {full ? (
        <p className="t-caption">The team is full. Remove someone to add another person.</p>
      ) : (
        <form onSubmit={add} className="t-card flex flex-col gap-3 !p-4">
          <p className="text-sm text-[var(--t-paper)]">Add a member</p>
          {picked ? (
            <div className="t-card-subtle flex items-center justify-between gap-3 !py-2">
              <span className="min-w-0 truncate text-sm text-[var(--t-mist)]">
                {picked.username}{" "}
                <span className="t-mono text-[var(--t-fog)]">{picked.email}</span>
              </span>
              <button
                type="button"
                className="t-btn t-btn-ghost !p-1.5"
                aria-label="Pick a different user"
                onClick={() => setPicked(null)}
              >
                <X size={14} aria-hidden="true" />
              </button>
            </div>
          ) : (
            <UserPicker onPick={setPicked} />
          )}
          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              className="t-input t-mono !text-sm"
              value={login}
              onChange={(e) => setLogin(e.target.value)}
              placeholder="GitHub login"
              aria-label="GitHub login"
              maxLength={39}
            />
            <button
              type="submit"
              className="t-btn t-btn-ghost shrink-0"
              disabled={busy || !picked || !login.trim()}
            >
              Add member
            </button>
          </div>
        </form>
      )}
    </Panel>
  );
}
