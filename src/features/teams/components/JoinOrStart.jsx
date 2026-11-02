import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Github, Users } from "lucide-react";
import { ROADMAP_DOMAINS } from "../../../../constants/categories";
import { teamsApi } from "../teamsApi";

/**
 * For a signed-in learner who isn't on a team: start one, or join one that is
 * forming. The server decides who may (a passed capstone, GitHub connected, not
 * on another team); this only shows the way forward for each case.
 */

// Proven tracks first, then every other track grouped by domain in catalog order.
// Any passed capstone opens Teams, so every track is a valid choice.
const groupByDomain = (tracks) => {
  const order = new Map(ROADMAP_DOMAINS.map((d, i) => [d.id, i]));
  const title = new Map(ROADMAP_DOMAINS.map((d) => [d.id, d.title]));
  const groups = new Map();
  for (const t of tracks) {
    const key = t.categoryId ?? "other";
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(t);
  }
  return [...groups]
    .sort(([a], [b]) => (order.get(a) ?? 999) - (order.get(b) ?? 999))
    .map(([id, items]) => ({ id, label: title.get(id) ?? "Other", items }));
};

function StartForm({ tracks, passedTracks, onStart, busy }) {
  const mine = passedTracks;
  const others = tracks.filter((t) => !t.passed);
  const domains = groupByDomain(others);
  const [name, setName] = useState("");
  const [trackId, setTrackId] = useState(mine[0]?.trackId ?? others[0]?.trackId ?? "");

  return (
    <form
      className="t-card flex flex-col gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        onStart({ name: name.trim(), trackId });
      }}
    >
      <h2 className="t-h2">Start a team</h2>
      <p className="t-caption">
        You&apos;ll be its first member. Pick any track, also one you want to grow in. Others can join while it&apos;s forming, up to 6 people.
      </p>
      <div className="grid gap-3 sm:grid-cols-2">
        <label className="flex flex-col gap-1 t-caption">
          Team name
          <input className="t-input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Task Arena" minLength={2} maxLength={60} required />
        </label>
        <label className="flex flex-col gap-1 t-caption">
          Track
          <select className="t-input" value={trackId} onChange={(e) => setTrackId(e.target.value)}>
            {mine.length > 0 && (
              <optgroup label="Your capstones">
                {mine.map((t) => (
                  <option key={t.trackId} value={t.trackId}>{t.trackTitle}</option>
                ))}
              </optgroup>
            )}
            {domains.map((d) => (
              <optgroup key={d.id} label={d.label}>
                {d.items.map((t) => (
                  <option key={t.trackId} value={t.trackId}>{t.trackTitle}</option>
                ))}
              </optgroup>
            ))}
          </select>
        </label>
      </div>
      <button type="submit" className="t-btn t-btn-primary w-fit" disabled={busy || name.trim().length < 2 || !trackId}>
        Start team
      </button>
    </form>
  );
}

function OpenTeams({ teams, onJoin, busy, locked }) {
  return (
    <section className="flex flex-col gap-3">
      <h2 className="t-h2">Teams looking for members</h2>
      {teams.length === 0 ? (
        <p className="t-caption">No team is forming right now. Start one and others can join you.</p>
      ) : (
        <ul className="flex flex-col gap-2">
          {teams.map((t) => (
            <li key={t._id} className="t-card-subtle flex flex-wrap items-center justify-between gap-3">
              <span className="flex min-w-0 flex-col gap-1">
                <span className="text-sm text-[var(--t-paper)]">{t.name}</span>
                <span className="t-caption">
                  <span className="t-mono">{t.trackId}</span> · {t.memberCount}/6 · {t.members.map((l) => `@${l}`).join(", ")}
                </span>
              </span>
              {t.joined ? (
                <Link to={`/team/${t._id}`} className="t-btn t-btn-ghost">
                  Open
                </Link>
              ) : (
                <button type="button" className="t-btn" disabled={busy || locked} onClick={() => onJoin(t)}>
                  Join
                </button>
              )}
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}

/** `onChanged(team)` gets the team the viewer just started or joined. */
export default function JoinOrStart({ onChanged }) {
  const [me, setMe] = useState(undefined);
  const [teams, setTeams] = useState([]);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelled = false;
    Promise.all([teamsApi.eligibility(), teamsApi.openTeams()])
      .then(([m, t]) => {
        if (cancelled) return;
        setMe(m);
        setTeams(t);
      })
      .catch((err) => !cancelled && (setError(err.message), setMe(null)));
    return () => {
      cancelled = true;
    };
  }, []);

  const act = async (fn) => {
    setBusy(true);
    setError(null);
    try {
      onChanged(await fn());
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  };

  if (me === undefined) return null;
  const needsCapstone = !me?.passedTracks?.length;
  const needsGithub = me && !needsCapstone && !me.githubLogin;

  return (
    <div className="flex flex-col gap-5">
      {error && <p className="text-sm text-[var(--t-red)]" role="alert">{error}</p>}

      {needsCapstone && (
        <div className="flex flex-col gap-3">
          <p className="t-muted max-w-xl">Teams are open once you pass a capstone.</p>
          <Link to="/capstone" className="t-btn t-btn-primary w-fit">Go to your capstone</Link>
        </div>
      )}

      {needsGithub && (
        <div className="t-card flex flex-col gap-3">
          <p className="t-muted max-w-xl">
            Connect your GitHub account first. Your pull requests are matched to it, so nobody can claim someone else&apos;s work.
          </p>
          <Link to="/my-profile/connected-accounts" className="t-btn t-btn-primary inline-flex w-fit items-center gap-1.5">
            <Github size={14} aria-hidden="true" />
            Connect GitHub
          </Link>
        </div>
      )}

      {me && !needsCapstone && !needsGithub && (
        <>
          {me.refusal ? (
            <p className="t-card-subtle t-caption max-w-xl">{me.refusal}</p>
          ) : (
            <>
              <p className="inline-flex items-center gap-2 t-caption">
                <Users size={14} aria-hidden="true" />
                You&apos;ll join as @{me.githubLogin}.
              </p>
              <StartForm tracks={me.tracks ?? []} passedTracks={me.passedTracks} busy={busy} onStart={(body) => act(() => teamsApi.start(body))} />
            </>
          )}
        </>
      )}

      {me && (
        <OpenTeams
          teams={teams}
          busy={busy}
          locked={needsCapstone || needsGithub || Boolean(me.refusal)}
          onJoin={(t) => act(() => teamsApi.join(t._id))}
        />
      )}
    </div>
  );
}
