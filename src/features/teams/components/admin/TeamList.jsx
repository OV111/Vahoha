import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import { capstoneApi } from "../../../capstone/capstoneApi";
import { Slots } from "./adminUi";
import { activeMembers } from "./adminHelpers";

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

export default function TeamList({ teams, selectedId, onSelect, onCreate, busy }) {
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
