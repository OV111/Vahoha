import { Link } from "react-router-dom";
import { Clock } from "lucide-react";

const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

/** "3 days ago", or null when the developer has never been active. */
const activeAgo = (iso) => {
  if (!iso) return null;
  const days = Math.round((new Date(iso) - Date.now()) / 86_400_000);
  if (days > -1) return "Active today";
  if (days > -30) return `Active ${rtf.format(days, "day")}`;
  return `Active ${rtf.format(Math.round(days / 30), "month")}`;
};

const initialOf = (name) => (name?.trim()?.[0] ?? "?").toUpperCase();

// A section the developer did not share arrives as null and is left out, so
// the row never suggests "0" when the truth is "not shared".
const Stat = ({ value, label }) =>
  value == null ? null : (
    <span className="text-[13px] text-neutral-400">
      <span className="font-semibold tabular-nums text-neutral-100">{value}</span> {label}
    </span>
  );

export default function CandidateCard({ c, trackTitle }) {
  const { score, parts } = c.evidence;
  const ago = activeAgo(c.lastActiveAt);
  const breakdown = `Layers ${parts.layers} · Exam quality ${parts.quality} · Capstone ${parts.capstone} · Team projects ${parts.teams}`;

  return (
    <li>
      <Link
        to={`/candidate/${c.username}`}
        className="flex gap-4 rounded-xl border border-white/10 bg-white/[0.03] p-4 transition-colors hover:border-purple-500/40 hover:bg-white/[0.05] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400"
      >
        <div
          aria-hidden="true"
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-purple-500/15 text-[15px] font-semibold text-purple-300"
        >
          {initialOf(c.name)}
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-x-2.5 gap-y-1">
            <p className="text-[15px] font-semibold text-neutral-100">{c.name}</p>
            <span className="text-[13px] text-neutral-500">@{c.username}</span>
            {c.openToWork && (
              <span className="rounded-full border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 text-[12px] font-medium text-emerald-300">
                Open to work
              </span>
            )}
          </div>

          {c.headline ? (
            <p className="mt-1 text-[14px] text-neutral-300">{c.headline}</p>
          ) : (
            <p className="mt-1 text-[14px] text-neutral-500">No verified results shared yet.</p>
          )}

          <div className="mt-2 flex flex-wrap gap-x-4 gap-y-1">
            <Stat value={c.layersPassed} label="layers passed" />
            <Stat value={c.avgExamScore == null ? null : `${c.avgExamScore}%`} label="avg exam" />
            <Stat value={c.capstones} label={c.capstones === 1 ? "capstone" : "capstones"} />
            <Stat value={c.teamProjects} label={c.teamProjects === 1 ? "team project" : "team projects"} />
          </div>

          {c.strengths?.length > 0 && (
            <ul className="mt-2.5 flex flex-wrap gap-1.5" aria-label="Strengths">
              {c.strengths.map((s) => (
                <li key={s} className="rounded-md bg-white/5 px-2 py-0.5 text-[12px] text-neutral-300">
                  {s}
                </li>
              ))}
            </ul>
          )}

          {(trackTitle || ago) && (
            <p className="mt-2.5 flex flex-wrap items-center gap-x-3 gap-y-1 text-[12px] text-neutral-500">
              {trackTitle && <span>{trackTitle}</span>}
              {ago && (
                <span className="flex items-center gap-1">
                  <Clock size={12} aria-hidden="true" />
                  {ago}
                </span>
              )}
            </p>
          )}
        </div>

        <div className="flex shrink-0 flex-col items-end" title={breakdown}>
          <p className="text-[26px] font-semibold leading-none tabular-nums text-purple-300">
            {score}
            <span className="sr-only"> out of 100, evidence score. {breakdown}</span>
          </p>
          <p className="mt-1 text-[12px] text-neutral-500">Evidence</p>
          <div className="mt-2 h-1 w-14 overflow-hidden rounded-full bg-white/10" aria-hidden="true">
            <div className="h-full rounded-full bg-purple-500" style={{ width: `${score}%` }} />
          </div>
        </div>
      </Link>
    </li>
  );
}
