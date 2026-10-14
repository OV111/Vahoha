import { Fragment } from "react";
import { Trophy } from "lucide-react";

const RANGE_LABEL = { "7d": "this week", "30d": "this month", all: "all time" };

const LeaderboardSkeleton = () => (
  <div className="flex flex-col gap-1 animate-pulse">
    {[0, 1, 2, 3, 4].map((i) => (
      <div key={i} className="flex items-center gap-2 px-2 py-2">
        <div className="h-3 w-5 shrink-0 rounded-sm bg-[#1a1a1a]" />
        <div className="h-6 w-6 shrink-0 rounded-full bg-[#1a1a1a]" />
        <div className="h-3 flex-1 rounded-sm bg-[#1a1a1a]" />
        <div className="h-3 w-8 shrink-0 rounded-sm bg-[#1a1a1a]" />
      </div>
    ))}
  </div>
);

const Avatar = ({ initial, profileImage, you }) => (
  <div
    className={`flex h-6 w-6 shrink-0 items-center justify-center overflow-hidden rounded-full text-[11px] font-bold ${
      you ? "bg-purple-600 text-white" : "bg-[#1a1a1a] text-[#8a8a8a]"
    }`}
  >
    {profileImage ? (
      <img
        src={profileImage.replace("/upload/", "/upload/w_48,h_48,c_fill,f_auto,q_auto/")}
        alt=""
        className="h-full w-full object-cover"
      />
    ) : (
      initial
    )}
  </div>
);

const Row = ({ rank, initial, name, score, solves, you, profileImage }) => (
  <li
    className={`flex items-center gap-2 rounded-sm border px-2 py-2 ${
      you ? "border-purple-600/40 bg-purple-600/10" : "border-transparent"
    }`}
    aria-current={you ? "true" : undefined}
  >
    <span
      className={`w-6 shrink-0 text-right text-[12px] tabular-nums ${
        rank <= 3 ? "font-bold text-purple-400" : "text-[#8a8a8a]"
      }`}
    >
      {rank}
    </span>
    <Avatar initial={initial} profileImage={profileImage} you={you} />
    <div className="min-w-0 flex-1">
      <p className={`truncate text-[12px] leading-tight ${you ? "font-semibold text-[#e5e5e5]" : "text-[#c4c4c4]"}`}>
        {you ? "You" : name}
      </p>
      <p className="text-[11px] leading-tight text-[#8a8a8a]">
        {solves} {solves === 1 ? "solve" : "solves"}
      </p>
    </div>
    <span className={`shrink-0 text-[12px] font-semibold tabular-nums ${you ? "text-purple-400" : "text-[#c4c4c4]"}`}>
      {score.toLocaleString()}
      <span className="ml-0.5 text-[10px] font-medium text-[#8a8a8a]">xp</span>
    </span>
  </li>
);

/**
 * Ranked by XP earned from solves in the window — the same rule the server
 * documents, so a user can check their own row against their solve history.
 *
 * The server appends the learner's own row when they fall outside the top
 * slice; a gap marker then shows that their rank is not the next one down.
 */
export default function LeaderboardPanel({ leaderboard, loading }) {
  const rows = leaderboard?.rows ?? [];
  const scope = leaderboard?.layerOrder ? `Layer ${leaderboard.layerOrder}` : "Global";
  const period = RANGE_LABEL[leaderboard?.range] ?? "";

  return (
    <section aria-labelledby="leaderboard-title">
      <div className="mb-2 flex items-baseline justify-between gap-2">
        <h2 id="leaderboard-title" className="flex items-center gap-1.5 text-[13px] font-semibold text-[#e5e5e5]">
          <Trophy size={13} className="text-purple-400" aria-hidden="true" />
          Leaderboard
        </h2>
        {!loading && rows.length > 0 && (
          <span className="text-[11px] text-[#8a8a8a]">
            {scope} · {period}
          </span>
        )}
      </div>

      {loading && rows.length === 0 ? (
        <LeaderboardSkeleton />
      ) : rows.length === 0 ? (
        <p className="px-2 text-[12px] leading-relaxed text-[#8a8a8a]">
          No solves {period || "yet"}. Solve a challenge to take the first spot.
        </p>
      ) : (
        <ol className="flex flex-col gap-0.5">
          {rows.map((row, i) => (
            <Fragment key={`${row.rank}-${row.name}`}>
              {i > 0 && row.rank > rows[i - 1].rank + 1 && (
                <li aria-hidden="true" className="px-2 text-center text-[12px] leading-none text-[#555]">
                  ⋯
                </li>
              )}
              <Row {...row} />
            </Fragment>
          ))}
        </ol>
      )}
    </section>
  );
}
