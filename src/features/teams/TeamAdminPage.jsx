import { useCallback, useEffect, useRef, useState } from "react";
import {
  Check,
  Copy,
  ExternalLink,
  GitBranch,
  Plus,
  RefreshCw,
  X,
} from "lucide-react";
import { teamsApi } from "./teamsApi";
import { capstoneApi } from "../capstone/capstoneApi";
import ConfirmButton from "./components/admin/ConfirmButton";
import UserPicker from "./components/admin/UserPicker";
import TeamHealth from "./components/admin/TeamHealth";
import "./teams-theme.css";

// Mirrors TEAM_STATUSES in backend/modules/teams/services/teamsData.js.
const STATUSES = ["forming", "active", "defending", "completed", "disbanded"];
// Mirrors MAX_MEMBERS in backend/modules/teams/services/teamsService.js.
const MAX_MEMBERS = 6;
const TOAST_MS = 3000;

const evidenceUrl = (path) => `${window.location.origin}${path}`;
const activeMembers = (team) => team.members.filter((m) => m.status !== "left");
const initials = (login) => login.slice(0, 2).toUpperCase();

/** Scroll target ids for the setup rail. */
const SECTION = {
  repo: "admin-repo",
  members: "admin-members",
  sync: "admin-sync",
  evidence: "admin-evidence",
};

function Panel({ id, title, hint, aside, children }) {
  return (
    <section id={id} className="t-section scroll-mt-6">
      <div className="flex items-start justify-between gap-4">
        <div className="flex flex-col gap-1">
          <h2 className="t-h2">{title}</h2>
          {hint && <p className="t-caption max-w-[60ch] leading-snug">{hint}</p>}
        </div>
        {aside}
      </div>
      {children}
    </section>
  );
}

function Slots({ used }) {
  return (
    <span className="t-slots" aria-hidden="true">
      {Array.from({ length: MAX_MEMBERS }, (_, i) => (
        <span key={i} data-on={i < used} />
      ))}
    </span>
  );
}

/* ---------- Sidebar ---------- */

const TRACK_ID = /^[a-z0-9]+(-[a-z0-9]+)*$/;

/** "API Dev " -> "api-dev-": lowercase and dashes as you type; trailing dash is trimmed on submit. */
const toTrackId = (s) =>
  s.toLowerCase().replace(/[\s_]+/g, "-").replace(/[^a-z0-9-]/g, "").replace(/-{2,}/g, "-").replace(/^-/, "");

/**
 * Known tracks to pick from: the capstone catalog (public, has titles) plus any
 * track an existing team already uses. There is no "all roadmap tracks"
 * endpoint, so a custom id is still allowed.
 */
function useTrackOptions(teams) {
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    let stale = false;
    capstoneApi
      .catalog()
      .then((rows) => !stale && setCatalog(rows))
      .catch(() => {}); // suggestions are optional; typing an id still works
    return () => {
      stale = true;
    };
  }, []);

  const byId = new Map(catalog.map((t) => [t.trackId, t.trackTitle]));
  for (const t of teams) if (!byId.has(t.trackId)) byId.set(t.trackId, null);
  return [...byId].map(([id, title]) => ({ id, title }));
}

function TrackField({ value, onChange, options }) {
  const match = options.find((o) => o.id === value);
  const invalid = value && !TRACK_ID.test(value.replace(/-$/, ""));

  return (
    <div className="flex flex-col gap-2">
      <input
        className="t-input t-mono"
        value={value}
        onChange={(e) => onChange(toTrackId(e.target.value))}
        placeholder="track-id, e.g. api-dev"
        aria-label="Track id"
        aria-invalid={invalid || undefined}
        aria-describedby="track-hint"
        maxLength={40}
        required
      />
      <p id="track-hint" className="t-caption leading-snug">
        {invalid
          ? "Use lowercase letters, numbers and single dashes."
          : match
            ? (match.title ?? "Used by another team")
            : value
              ? "New track id, not in the catalog"
              : "Pick a track or type an id"}
      </p>
      {options.length > 0 && (
        <ul className="flex flex-wrap gap-1.5" aria-label="Known tracks">
          {options.map((o) => (
            <li key={o.id}>
              <button
                type="button"
                aria-pressed={o.id === value}
                title={o.title ?? o.id}
                onClick={() => onChange(o.id)}
                className={`t-mono rounded px-2 py-1 transition-colors ${
                  o.id === value
                    ? "bg-[var(--t-slate)] text-[var(--t-paper)]"
                    : "bg-white/[0.04] text-[var(--t-fog)] hover:text-[var(--t-paper)]"
                }`}
              >
                {o.id}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

function CreateTeamForm({ teams, onCreate, onCancel, busy }) {
  const [name, setName] = useState("");
  const [trackId, setTrackId] = useState("");
  const trackOptions = useTrackOptions(teams);

  const submit = async (e) => {
    e.preventDefault();
    if (await onCreate({ name: name.trim(), trackId: trackId.replace(/-$/, "") })) {
      setName("");
      setTrackId("");
    }
  };

  return (
    <form onSubmit={submit} className="t-card-subtle flex flex-col gap-2 !p-3">
      <input
        className="t-input"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Team name"
        aria-label="Team name"
        minLength={2}
        maxLength={60}
        required
        autoFocus
      />
      <TrackField value={trackId} onChange={setTrackId} options={trackOptions} />
      <div className="flex gap-2">
        <button
          type="submit"
          className="t-btn t-btn-primary flex-1"
          disabled={busy || !TRACK_ID.test(trackId.replace(/-$/, ""))}
        >
          Create team
        </button>
        <button type="button" className="t-btn t-btn-ghost" onClick={onCancel}>
          Cancel
        </button>
      </div>
    </form>
  );
}

function TeamList({ teams, selectedId, onSelect, onCreate, busy }) {
  const [creating, setCreating] = useState(teams.length === 0);

  return (
    <aside className="flex flex-col gap-3 md:sticky md:top-6 md:self-start">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-[510] text-[var(--t-paper)]">
          Teams <span className="text-[var(--t-ash)]">{teams.length}</span>
        </h2>
        {!creating && (
          <button
            type="button"
            className="t-btn t-btn-ghost !px-2 !py-1"
            onClick={() => setCreating(true)}
          >
            <Plus size={14} aria-hidden="true" />
            New team
          </button>
        )}
      </div>

      {creating && (
        <CreateTeamForm
          teams={teams}
          busy={busy}
          onCancel={() => setCreating(false)}
          onCreate={async (body) => {
            const ok = await onCreate(body);
            if (ok) setCreating(false);
            return ok;
          }}
        />
      )}

      <ul className="flex flex-col">
        {teams.map((t) => {
          const selected = t._id === selectedId;
          return (
            <li key={t._id}>
              <button
                type="button"
                onClick={() => onSelect(t._id)}
                aria-current={selected ? "true" : undefined}
                className={`flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-left transition-colors ${
                  selected ? "bg-white/[0.06]" : "hover:bg-white/[0.03]"
                }`}
              >
                <span className={`t-dot t-dot-${t.status}`} title={t.status} />
                <span className="flex min-w-0 flex-1 flex-col">
                  <span
                    className={`truncate text-sm ${selected ? "text-[var(--t-paper)]" : "text-[var(--t-mist)]"}`}
                  >
                    {t.name}
                  </span>
                  <span className="t-mono truncate text-[var(--t-ash)]">{t.trackId}</span>
                </span>
                <span className="flex flex-col items-end gap-1">
                  <Slots used={activeMembers(t).length} />
                  {!t.repo && <span className="t-caption">no repo</span>}
                </span>
              </button>
            </li>
          );
        })}
        {teams.length === 0 && !creating && (
          <li className="t-caption px-3 py-2">No teams yet. Create the first one.</li>
        )}
      </ul>
    </aside>
  );
}

/* ---------- Detail ---------- */

function SetupRail({ steps }) {
  const firstOpen = steps.findIndex((s) => !s.done);

  return (
    <nav aria-label="Team setup" className="t-rail">
      {steps.map((s, i) => (
        <button
          key={s.id}
          type="button"
          className="t-step"
          data-done={s.done}
          data-current={i === firstOpen}
          aria-current={i === firstOpen ? "step" : undefined}
          onClick={() =>
            document.getElementById(s.id)?.scrollIntoView({ behavior: "smooth", block: "start" })
          }
        >
          <span className="t-step-bar" aria-hidden="true" />
          <span className="flex items-center gap-1.5 text-sm text-[var(--t-paper)]">
            {s.done && <Check size={14} className="text-[var(--t-accent-text)]" aria-hidden="true" />}
            {s.label}
          </span>
          <span className="t-caption truncate">{s.detail}</span>
        </button>
      ))}
    </nav>
  );
}

function StatusControl({ value, onChange, busy }) {
  return (
    <div className="t-seg" role="group" aria-label="Team status">
      {STATUSES.map((s) => (
        <button
          key={s}
          type="button"
          aria-pressed={s === value}
          disabled={busy}
          onClick={() => s !== value && onChange(s)}
        >
          <span className={`t-dot t-dot-${s}`} aria-hidden="true" />
          {s}
        </button>
      ))}
    </div>
  );
}

function RepoPanel({ team, onSave, busy }) {
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

function MembersPanel({ team, onAdd, onRemove, busy }) {
  const [picked, setPicked] = useState(null);
  const [login, setLogin] = useState("");
  const current = activeMembers(team);
  const left = team.members.filter((m) => m.status === "left");
  const full = current.length >= MAX_MEMBERS;

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
            {current.length}/{MAX_MEMBERS}
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

function SyncPanel({ team, result, onSync, busy }) {
  return (
    <Panel
      id={SECTION.sync}
      title="Merged work"
      hint="Pulls merged PRs from GitHub and matches them to member logins."
    >
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="t-btn t-btn-ghost"
          disabled={busy || !team.repo}
          onClick={onSync}
        >
          <RefreshCw size={14} className={busy ? "animate-spin motion-reduce:animate-none" : ""} aria-hidden="true" />
          Sync PRs
        </button>
        {!team.repo && <span className="t-caption">Set a repository first.</span>}
      </div>
      {result && (
        <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-md bg-[var(--t-border)] sm:grid-cols-4">
          {[
            ["New PRs", result.added],
            ["Already stored", result.alreadyStored],
            ["Not by members", result.skippedNotMembers],
            ["Left for next sync", result.deferred],
          ].map(([label, n]) => (
            <div key={label} className="flex flex-col gap-1 bg-[var(--t-carbon)] px-4 py-3">
              <dt className="t-caption">{label}</dt>
              <dd className="text-xl font-[510] tabular-nums text-[var(--t-paper)]">{n}</dd>
            </div>
          ))}
        </dl>
      )}
      {result?.deferred > 0 && (
        <p className="t-caption">Some PRs are over the per-sync limit. Sync again to pull the rest.</p>
      )}
    </Panel>
  );
}

function EvidencePanel({ evidence, onIssue, onRevoke, busy }) {
  const [consented, setConsented] = useState(false);
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(evidenceUrl(evidence.path));
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {
      // Clipboard can be blocked; the URL is still visible to copy by hand.
    }
  };

  return (
    <Panel
      id={SECTION.evidence}
      title="Evidence page"
      hint="Publishes member names, PR counts and defense scores at a public link. Refreshing updates the snapshot and keeps the same link."
    >
      {evidence && (
        <div className="t-card-subtle flex flex-col gap-3">
          <div className="flex min-w-0 items-center gap-2">
            <span className={`t-badge shrink-0 ${evidence.revoked ? "t-badge-red" : "t-badge-green"}`}>
              {evidence.revoked ? "Revoked" : "Live"}
            </span>
            <a
              className="t-link t-mono truncate"
              href={evidence.path}
              target="_blank"
              rel="noopener noreferrer"
            >
              {evidenceUrl(evidence.path)}
            </a>
          </div>
          <div className="flex flex-wrap gap-2">
            <button type="button" className="t-btn t-btn-ghost" onClick={copy}>
              {copied ? <Check size={14} aria-hidden="true" /> : <Copy size={14} aria-hidden="true" />}
              {copied ? "Copied" : "Copy link"}
            </button>
            <ConfirmButton
              disabled={busy}
              onConfirm={() => onRevoke(!evidence.revoked)}
              className={evidence.revoked ? "t-btn t-btn-ghost" : "t-btn t-btn-danger"}
              confirmLabel={evidence.revoked ? "Restore link" : "Revoke link"}
            >
              {evidence.revoked ? "Restore" : "Revoke"}
            </ConfirmButton>
          </div>
        </div>
      )}

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <label className="flex cursor-pointer items-start gap-2.5 text-sm text-[var(--t-mist)]">
          <input
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-[var(--t-accent)]"
            checked={consented}
            onChange={(e) => setConsented(e.target.checked)}
          />
          Every member agreed to have their name and results published.
        </label>
        <button
          type="button"
          className="t-btn t-btn-primary shrink-0"
          disabled={busy || !consented}
          onClick={async () => {
            if (await onIssue()) setConsented(false);
          }}
        >
          {evidence ? "Refresh evidence" : "Publish evidence"}
        </button>
      </div>
    </Panel>
  );
}

function Toast({ toast, onClose }) {
  if (!toast) return null;
  const isError = toast.kind === "error";
  return (
    <div className="t-toast" role={isError ? "alert" : "status"}>
      <span className={`t-dot ${isError ? "t-dot-disbanded" : "t-dot-active"}`} aria-hidden="true" />
      <span className="min-w-0">{toast.message}</span>
      <button
        type="button"
        className="-m-1 p-1 text-[var(--t-ash)] hover:text-[var(--t-paper)]"
        aria-label="Dismiss"
        onClick={onClose}
      >
        <X size={14} aria-hidden="true" />
      </button>
    </div>
  );
}

/**
 * /team/admin: run a build team by hand. Admin-only: the API answers 404 to
 * everyone else, and so does this page.
 */
export default function TeamAdminPage() {
  const [teams, setTeams] = useState(null); // null = loading
  const [loadError, setLoadError] = useState(null);
  const [selectedId, setSelectedId] = useState(null);
  const [detail, setDetail] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [syncResult, setSyncResult] = useState(null);
  const [toast, setToast] = useState(null); // { kind: "ok" | "error", message }
  const [busy, setBusy] = useState(false);
  const [version, setVersion] = useState(0); // bumps after each write so Team health refetches
  const toastTimer = useRef(null);
  const editorRef = useRef(null);

  const showToast = useCallback((kind, message) => {
    clearTimeout(toastTimer.current);
    setToast({ kind, message });
    // Errors stay until dismissed; successes clear themselves.
    if (kind === "ok") toastTimer.current = setTimeout(() => setToast(null), TOAST_MS);
  }, []);

  useEffect(() => () => clearTimeout(toastTimer.current), []);

  const loadList = useCallback(async () => {
    try {
      setTeams(await teamsApi.list());
    } catch (err) {
      setLoadError(err);
    }
  }, []);

  const loadDetail = useCallback(
    async (id) => {
      if (!id) return;
      try {
        const [team, ev] = await Promise.all([teamsApi.get(id), teamsApi.evidenceStatus(id)]);
        setDetail(team);
        setEvidence(ev);
      } catch (err) {
        showToast("error", err.message);
      }
    },
    [showToast],
  );

  useEffect(() => {
    loadList();
  }, [loadList]);

  useEffect(() => {
    setDetail(null);
    setEvidence(null);
    setSyncResult(null);
    loadDetail(selectedId);
  }, [selectedId, loadDetail]);

  /** Run a write, then refresh both panes. Resolves to the result (or true) on success, false on failure. */
  const act = async (fn, successMessage) => {
    setBusy(true);
    try {
      const result = await fn();
      await Promise.all([loadList(), loadDetail(selectedId)]);
      setVersion((v) => v + 1);
      if (successMessage) showToast("ok", successMessage);
      return result ?? true;
    } catch (err) {
      showToast("error", err.message);
      return false;
    } finally {
      setBusy(false);
    }
  };

  const shell = (children) => (
    <div className="teams-theme">
      <main className="mx-auto max-w-[1200px] px-4 py-10 md:py-14">{children}</main>
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );

  if (loadError?.status === 404) return shell(<p className="t-muted">Not found.</p>);
  if (!teams) {
    return shell(
      loadError ? (
        <p className="text-sm text-[var(--t-red)]">{loadError.message}</p>
      ) : (
        <p className="t-muted">Loading teams…</p>
      ),
    );
  }

  const create = async (body) => {
    const created = await act(() => teamsApi.create(body), "Team created.");
    if (created?._id) setSelectedId(created._id);
    return Boolean(created);
  };

  const members = detail ? activeMembers(detail) : [];
  const steps = detail && [
    {
      id: SECTION.repo,
      label: "Repository",
      done: Boolean(detail.repo),
      detail: detail.repo?.fullName ?? "Not set",
    },
    {
      id: SECTION.members,
      label: "Members",
      done: members.length >= 2,
      detail: `${members.length} of ${MAX_MEMBERS}`,
    },
    {
      id: SECTION.sync,
      label: "Merged work",
      // The API keeps no "last synced" field, so this only knows about this visit (or a past publish).
      done: Boolean(syncResult || evidence),
      detail: syncResult ? `${syncResult.added} new PRs` : "Sync to pull PRs",
    },
    {
      id: SECTION.evidence,
      label: "Evidence",
      done: Boolean(evidence && !evidence.revoked),
      detail: evidence ? (evidence.revoked ? "Revoked" : "Live") : "Not published",
    },
  ];

  return shell(
    <div className="flex flex-col gap-10">
      <header className="flex flex-col gap-1.5">
        <h1 className="t-h1">Team admin</h1>
        <p className="t-muted">Set up a build team, pull its merged work, then publish the evidence page.</p>
      </header>

      <TeamHealth
        version={version}
        selectedId={selectedId}
        onSelect={(id) => {
          setSelectedId(id);
          editorRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        }}
      />

      <div ref={editorRef} className="grid scroll-mt-6 gap-10 md:grid-cols-[280px_minmax(0,1fr)]">
        <TeamList
          teams={teams}
          selectedId={selectedId}
          onSelect={setSelectedId}
          onCreate={create}
          busy={busy}
        />

        <div className="flex min-w-0 flex-col gap-8">
          {!selectedId && (
            <div className="t-card flex flex-col items-start gap-2">
              <h2 className="t-h2">Pick a team</h2>
              <p className="t-muted">
                Choose a team on the left to manage it, or create a new one.
              </p>
            </div>
          )}
          {selectedId && !detail && <p className="t-muted">Loading team…</p>}
          {detail && (
            <>
              <header className="flex flex-col gap-4">
                <div className="flex flex-col gap-1">
                  <h2 className="t-h1">{detail.name}</h2>
                  <span className="t-mono text-[var(--t-fog)]">{detail.trackId}</span>
                </div>
                <StatusControl
                  value={detail.status}
                  busy={busy}
                  onChange={(s) => act(() => teamsApi.setStatus(detail._id, s), `Status set to ${s}.`)}
                />
                <p className="t-caption -mt-2">
                  Completed and disbanded close peer ratings. Disbanded also closes defenses.
                </p>
              </header>

              <SetupRail steps={steps} />

              <RepoPanel
                key={`repo-${detail._id}`}
                team={detail}
                busy={busy}
                onSave={(url) => act(() => teamsApi.setRepo(detail._id, url), "Repository saved.")}
              />

              <MembersPanel
                key={`members-${detail._id}`}
                team={detail}
                busy={busy}
                onAdd={(body) => act(() => teamsApi.addMember(detail._id, body), "Member added.")}
                onRemove={(userId) => act(() => teamsApi.removeMember(detail._id, userId), "Member removed.")}
              />

              <SyncPanel
                team={detail}
                result={syncResult}
                busy={busy}
                onSync={async () => {
                  const result = await act(() => teamsApi.sync(detail._id), "Sync finished.");
                  if (result && typeof result === "object") setSyncResult(result);
                }}
              />

              <EvidencePanel
                key={`evidence-${detail._id}`}
                evidence={evidence}
                busy={busy}
                onIssue={() => act(() => teamsApi.issueEvidence(detail._id), "Evidence published.")}
                onRevoke={(revoked) =>
                  act(
                    () => teamsApi.revokeEvidence(detail._id, revoked),
                    revoked ? "Evidence link revoked." : "Evidence link restored.",
                  )
                }
              />
            </>
          )}
        </div>
      </div>
    </div>,
  );
}
