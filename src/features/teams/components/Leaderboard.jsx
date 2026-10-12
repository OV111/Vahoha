import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink } from "lucide-react";
import { teamsApi } from "../teamsApi";
import { SIGNALS, pct } from "../lib/score";

const TOP = 10;

function ScoreBar({ value, mine }) {
  return (
    <span className="t-bar" aria-hidden="true">
      <span style={{ width: `${value}%` }} data-mine={mine} />
    </span>
  );
}

function Breakdown({ row }) {
  return (
    <div className="flex flex-col gap-3 px-4 pb-4 sm:pl-14">
      <dl className="grid gap-2 sm:grid-cols-5">
        {SIGNALS.map((s) => (
          <div key={s.key} className="flex flex-col gap-1" title={s.help}>
            <dt className="t-caption">{s.label}</dt>
            <dd className="flex items-center gap-2">
              <span className="t-bar t-bar-thin flex-1" aria-hidden="true">
                <span style={{ width: `${pct(row.breakdown[s.key])}%` }} />
              </span>
              <span className="t-mono w-8 text-right tabular-nums text-[var(--t-mist)]">
                {pct(row.breakdown[s.key])}
              </span>
            </dd>
          </div>
        ))}
      </dl>
      <a
        href={row.evidencePath}
        target="_blank"
        rel="noopener noreferrer"
        className="t-link inline-flex w-fit items-center gap-1.5"
      >
        View evidence page
        <ExternalLink size={12} aria-hidden="true" />
      </a>
    </div>
  );
}

function Row({ row, open, onToggle }) {
  const id = `lb-${row.rank}`;
  return (
    <li className={`t-lb-row ${row.isMine ? "t-lb-mine" : ""}`}>
      <button
        type="button"
        className="grid w-full grid-cols-[2rem_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-1.5 px-4 py-3 text-left sm:grid-cols-[2.5rem_minmax(0,1fr)_minmax(120px,200px)_3rem_auto]"
        aria-expanded={open}
        aria-controls={id}
        onClick={onToggle}
      >
        <span className="t-mono tabular-nums !text-sm text-[var(--t-fog)]">{row.rank}</span>
        <span className="flex min-w-0 flex-col">
          <span className="flex items-center gap-2">
            <span className="truncate text-sm text-[var(--t-paper)]">{row.name}</span>
            {row.isMine && <span className="t-badge shrink-0">Your team</span>}
          </span>
          <span className="t-mono truncate text-[var(--t-ash)]">
            {row.trackId} · {row.memberCount} members · {row.mergedPrs} PRs
          </span>
        </span>
        <span className="col-span-2 col-start-2 row-start-2 sm:col-span-1 sm:col-start-3 sm:row-start-1">
          <ScoreBar value={row.score} mine={row.isMine} />
        </span>
        <span className="hidden text-right text-lg font-[510] tabular-nums text-[var(--t-paper)] sm:block">
          {row.score}
        </span>
        <span className="flex items-center gap-2">
          <span className="text-lg font-[510] tabular-nums text-[var(--t-paper)] sm:hidden">{row.score}</span>
          <ChevronDown
            size={16}
            className={`text-[var(--t-ash)] transition-transform motion-reduce:transition-none ${open ? "rotate-180" : ""}`}
            aria-hidden="true"
          />
        </span>
      </button>
      {open && (
        <div id={id}>
          <Breakdown row={row} />
        </div>
      )}
    </li>
  );
}

function Skeleton() {
  return (
    <ol className="t-lb" aria-hidden="true">
      {[0, 1, 2].map((i) => (
        <li key={i} className="t-lb-row h-[62px] animate-pulse motion-reduce:animate-none" />
      ))}
    </ol>
  );
}

/**
 * "Top teams": ranked build teams. Only teams that published their evidence
 * page are listed (that is the members' consent). The viewer's own team is
 * always visible: pinned under the top 10 if it ranks lower.
 */
export default function Leaderboard() {
  const [track, setTrack] = useState("");
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [openRank, setOpenRank] = useState(null);
  const [showAll, setShowAll] = useState(false);
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    let stale = false;
    setOpenRank(null);
    teamsApi
      .leaderboard(track)
      .then((d) => {
        if (stale) return;
        setData(d);
        setError(null);
        if (!track) setTracks(d.tracks); // keep tabs stable while filtering
      })
      .catch((err) => !stale && setError(err.message));
    return () => {
      stale = true;
    };
  }, [track]);

  const rows = data?.rows ?? [];
  const visible = showAll ? rows : rows.slice(0, TOP);
  const mineBelow = !showAll && rows.slice(TOP).find((r) => r.isMine);

  return (
    <section className="t-section" aria-labelledby="lb-title">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div className="flex flex-col gap-1">
          <h2 id="lb-title" className="t-h2">Top teams</h2>
          <p className="t-caption">Teams that published their evidence page, ranked by what they shipped and defended.</p>
        </div>
        {tracks.length > 1 && (
          <div className="t-seg" role="group" aria-label="Filter by track">
            {["", ...tracks].map((t) => (
              <button key={t || "all"} type="button" aria-pressed={t === track} onClick={() => setTrack(t)}>
                {t || "All tracks"}
              </button>
            ))}
          </div>
        )}
      </div>

      {error && <p className="text-sm text-[var(--t-red)]">{error}</p>}
      {!data && !error && <Skeleton />}

      {data && rows.length === 0 && (
        <div className="t-card-subtle flex flex-col gap-1 !py-6 text-center">
          <p className="text-sm text-[var(--t-mist)]">No ranked teams yet</p>
          <p className="t-caption">
            A team appears here once it publishes its evidence page and merges {data.minPrs} pull requests.
          </p>
        </div>
      )}

      {rows.length > 0 && (
        <ol className="t-lb">
          {visible.map((r) => (
            <Row
              key={r.rank}
              row={r}
              open={openRank === r.rank}
              onToggle={() => setOpenRank(openRank === r.rank ? null : r.rank)}
            />
          ))}
          {mineBelow && (
            <>
              <li className="t-caption px-4 py-1 text-center" aria-hidden="true">
                ⋯
              </li>
              <Row
                row={mineBelow}
                open={openRank === mineBelow.rank}
                onToggle={() => setOpenRank(openRank === mineBelow.rank ? null : mineBelow.rank)}
              />
            </>
          )}
        </ol>
      )}

      <div className="flex flex-wrap items-center justify-between gap-3">
        {rows.length > TOP ? (
          <button type="button" className="t-btn t-btn-ghost" onClick={() => setShowAll((v) => !v)}>
            {showAll ? `Show top ${TOP}` : `Show all ${rows.length}`}
          </button>
        ) : (
          <span />
        )}
        <details className="t-details">
          <summary className="t-caption cursor-pointer hover:text-[var(--t-mist)]">How the score works</summary>
          <ul className="mt-3 flex flex-col gap-1.5">
            {SIGNALS.map((s) => (
              <li key={s.key} className="flex items-baseline justify-between gap-6 text-sm">
                <span className="text-[var(--t-mist)]">
                  {s.label} <span className="t-caption">{s.help}</span>
                </span>
                <span className="t-mono tabular-nums text-[var(--t-fog)]">{s.weight}%</span>
              </li>
            ))}
          </ul>
        </details>
      </div>
    </section>
  );
}
