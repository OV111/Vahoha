import { useEffect, useMemo, useState } from "react";
import { ArrowDown, ArrowUp } from "lucide-react";
import { teamsApi } from "../../teamsApi";

// Mirrors teamFlags() in backend/modules/teams/lib/teamScore.js.
const FLAGS = {
  "no-repo": { label: "No repo", urgent: true },
  stale: { label: "No PRs in 7 days", urgent: true },
  "silent-members": { label: "Silent members", urgent: false },
  "low-peer": { label: "Low peer rating", urgent: false },
  "evidence-stale": { label: "Evidence out of date", urgent: false },
};

// "risk" keeps the server's order (riskiest first); the rest sort client-side.
const COLUMNS = [
  { key: "name", label: "Team", sort: (a, b) => a.name.localeCompare(b.name) },
  { key: "status", label: "Status", sort: (a, b) => a.status.localeCompare(b.status) },
  { key: "score", label: "Score", sort: (a, b) => a.score - b.score, numeric: true },
  { key: "prsLast7d", label: "PRs, 7d", sort: (a, b) => a.prsLast7d - b.prsLast7d, numeric: true },
  { key: "memberCount", label: "Members", sort: (a, b) => a.memberCount - b.memberCount, numeric: true },
  { key: "risk", label: "Needs attention", sort: null },
];

function Flags({ row }) {
  if (!row.flags.length) return <span className="t-caption">All good</span>;
  return (
    <span className="flex flex-wrap gap-1">
      {row.flags.map((f) => (
        <span
          key={f}
          className={`t-badge ${FLAGS[f].urgent ? "t-badge-red" : ""}`}
          title={f === "silent-members" ? row.silentMembers.map((l) => `@${l}`).join(", ") : undefined}
        >
          {FLAGS[f].label}
          {f === "silent-members" && ` (${row.silentMembers.length})`}
        </span>
      ))}
    </span>
  );
}

function Summary({ summary }) {
  const items = [
    ["Open teams", summary.activeTeams],
    ["PRs merged this week", summary.prsThisWeek],
    ["Need attention", summary.atRisk],
    ["Live evidence pages", summary.liveEvidence],
  ];
  return (
    <dl className="grid grid-cols-2 gap-px overflow-hidden rounded-xl bg-[var(--t-border)] shadow-[inset_0_0_0_1px_var(--t-border)] sm:grid-cols-4">
      {items.map(([label, n]) => (
        <div key={label} className="flex flex-col gap-1 bg-[var(--t-carbon)] px-4 py-3">
          <dt className="t-caption">{label}</dt>
          <dd className="text-2xl font-[510] tabular-nums text-[var(--t-paper)]">{n}</dd>
        </div>
      ))}
    </dl>
  );
}

/**
 * Team health: every team at a glance, riskiest first, so the admin knows which
 * team to open today. Clicking a row opens it in the editor below.
 * `version` changes after any admin write so the numbers stay fresh.
 */
export default function TeamHealth({ version, selectedId, onSelect }) {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [sort, setSort] = useState({ key: "risk", dir: "desc" });
  const [attentionOnly, setAttentionOnly] = useState(false);

  useEffect(() => {
    let stale = false;
    teamsApi
      .adminOverview()
      .then((d) => !stale && (setData(d), setError(null)))
      .catch((err) => !stale && setError(err.message));
    return () => {
      stale = true;
    };
  }, [version]);

  const rows = useMemo(() => {
    if (!data) return [];
    const list = attentionOnly ? data.rows.filter((r) => r.flags.length) : [...data.rows];
    const col = COLUMNS.find((c) => c.key === sort.key);
    if (col?.sort) {
      list.sort(col.sort);
      if (sort.dir === "desc") list.reverse();
    }
    return list;
  }, [data, sort, attentionOnly]);

  const toggleSort = (key) =>
    setSort((s) => (s.key === key ? { key, dir: s.dir === "desc" ? "asc" : "desc" } : { key, dir: "desc" }));

  if (error) return <p className="text-sm text-[var(--t-red)]">{error}</p>;
  if (!data) return <div className="h-[88px] animate-pulse rounded-xl bg-[var(--t-carbon)] motion-reduce:animate-none" />;
  if (!data.rows.length) return null;

  return (
    <section className="flex flex-col gap-4" aria-labelledby="health-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <h2 id="health-title" className="t-h2">Team health</h2>
        <label className="flex cursor-pointer items-center gap-2 text-sm text-[var(--t-fog)]">
          <input
            type="checkbox"
            className="size-4 accent-[var(--t-accent)]"
            checked={attentionOnly}
            onChange={(e) => setAttentionOnly(e.target.checked)}
          />
          Only teams that need attention
        </label>
      </div>

      <Summary summary={data.summary} />

      {rows.length === 0 ? (
        <p className="t-caption">Every team is in good shape.</p>
      ) : (
        <>
          {/* Desktop: sortable table */}
          <div className="hidden overflow-hidden rounded-xl shadow-[inset_0_0_0_1px_var(--t-border)] md:block">
            <table className="t-table">
              <thead>
                <tr>
                  {COLUMNS.map((c) => {
                    const active = sort.key === c.key;
                    return (
                      <th
                        key={c.key}
                        scope="col"
                        aria-sort={active ? (sort.dir === "asc" ? "ascending" : "descending") : "none"}
                        className={c.numeric ? "text-right" : ""}
                      >
                        <button type="button" onClick={() => toggleSort(c.key)} data-active={active}>
                          {c.label}
                          {active &&
                            (sort.dir === "asc" ? (
                              <ArrowUp size={12} aria-hidden="true" />
                            ) : (
                              <ArrowDown size={12} aria-hidden="true" />
                            ))}
                        </button>
                      </th>
                    );
                  })}
                </tr>
              </thead>
              <tbody>
                {rows.map((r) => (
                  <tr key={r.teamId} aria-selected={r.teamId === selectedId}>
                    <td>
                      <button type="button" className="t-row-link" onClick={() => onSelect(r.teamId)}>
                        <span className="block truncate text-[var(--t-paper)]">{r.name}</span>
                        <span className="t-mono block text-[var(--t-ash)]">{r.trackId}</span>
                      </button>
                    </td>
                    <td>
                      <span className="inline-flex items-center gap-2">
                        <span className={`t-dot t-dot-${r.status}`} aria-hidden="true" />
                        {r.status}
                      </span>
                    </td>
                    <td className="text-right tabular-nums text-[var(--t-paper)]">{r.score}</td>
                    <td className="text-right tabular-nums">{r.prsLast7d}</td>
                    <td className="text-right tabular-nums">{r.memberCount}/6</td>
                    <td>
                      <Flags row={r} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile: one card per team */}
          <ul className="flex flex-col gap-2 md:hidden">
            {rows.map((r) => (
              <li key={r.teamId}>
                <button
                  type="button"
                  onClick={() => onSelect(r.teamId)}
                  className={`t-card-subtle flex w-full flex-col gap-2 text-left ${r.teamId === selectedId ? "!bg-white/[0.06]" : ""}`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="flex min-w-0 items-center gap-2">
                      <span className={`t-dot t-dot-${r.status}`} aria-hidden="true" />
                      <span className="truncate text-sm text-[var(--t-paper)]">{r.name}</span>
                    </span>
                    <span className="text-sm tabular-nums text-[var(--t-paper)]">{r.score}</span>
                  </span>
                  <span className="t-caption">
                    {r.status} · {r.prsLast7d} PRs this week · {r.memberCount}/6 members
                  </span>
                  <Flags row={r} />
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
