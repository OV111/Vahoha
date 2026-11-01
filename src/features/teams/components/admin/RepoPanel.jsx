import { useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";
import { Panel } from "./adminUi";
import { SECTION } from "./adminHelpers";

export default function RepoPanel({ team, onSave, busy }) {
  const [editing, setEditing] = useState(!team.repo);
  const [url, setUrl] = useState("");

  const save = async (e) => {
    e.preventDefault();
    if (await onSave(url.trim())) {
      setUrl("");
      setEditing(false);
    }
  };

  return (
    <Panel
      id={SECTION.repo}
      title="Repository"
      hint="A public GitHub repo. Each repo can belong to one team only."
    >
      {team.repo && !editing ? (
        <div className="t-card-subtle flex items-center justify-between gap-3">
          <a
            href={`https://github.com/${team.repo.fullName}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex min-w-0 items-center gap-2 text-sm text-[var(--t-paper)] hover:text-[var(--t-accent-text)]"
          >
            <GitBranch size={16} className="shrink-0 text-[var(--t-fog)]" aria-hidden="true" />
            <span className="t-mono truncate !text-sm">{team.repo.fullName}</span>
            <ExternalLink size={12} className="shrink-0 text-[var(--t-ash)]" aria-hidden="true" />
          </a>
          <button type="button" className="t-btn t-btn-ghost" onClick={() => setEditing(true)}>
            Change
          </button>
        </div>
      ) : (
        <form onSubmit={save} className="flex flex-col gap-2 sm:flex-row">
          <input
            className="t-input t-mono !text-sm"
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://github.com/org/project"
            aria-label="Repository URL"
            autoFocus={Boolean(team.repo)}
          />
          <div className="flex shrink-0 gap-2">
            <button type="submit" className="t-btn t-btn-ghost" disabled={busy || !url.trim()}>
              Save repo
            </button>
            {team.repo && (
              <button type="button" className="t-btn t-btn-ghost" onClick={() => setEditing(false)}>
                Cancel
              </button>
            )}
          </div>
        </form>
      )}
    </Panel>
  );
}
