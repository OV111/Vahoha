import { Check, Clock, Map as MapIcon, Users, Zap } from "lucide-react";
import Badge from "../Badge";
import DifficultyBadge from "../DifficultyBadge";
import { formatTitle } from "../../lib/formatTitle";

export default function ChallengeCard({ c, trackLabel = null }) {
  return (
    <div className="relative overflow-hidden rounded-sm p-4 h-full flex flex-col gap-2.5 border border-[#1a1a1a] bg-[#0d0d0d] transition-colors hover:border-[#2a2a2a]">
      {c.hot && (
        // Clipped to its own corner box so the band can never spill outside
        // the card or block clicks on what sits underneath.
        <div
          className="pointer-events-none absolute right-0 top-0 z-10 h-[92px] w-[92px] overflow-hidden"
          aria-hidden="true"
        >
          <span className="absolute right-[-36px] top-[21px] w-[130px] rotate-45 bg-purple-600 py-0.5 text-center text-[8px] font-bold leading-4 tracking-wider text-white shadow-sm">
            HOT SPOT MATCH
          </span>
        </div>
      )}
      {c.hot && <span className="sr-only">Hot spot match: recommended for you</span>}
      {c.done && (
        <span
          className="absolute top-3 right-3 flex h-5 w-5 items-center justify-center rounded-full bg-purple-600 text-white"
          aria-label="Solved"
          title="Solved"
        >
          <Check size={12} strokeWidth={3} />
        </span>
      )}

      <div className="flex items-center gap-2">
        {trackLabel && (
          <Badge tone="blue" icon={MapIcon} className="max-w-[160px] truncate">
            {trackLabel}
          </Badge>
        )}
      </div>

      <p className={`text-[14px] font-semibold leading-snug text-[#e5e5e5] ${c.hot ? "pr-5" : ""}`}>
        {formatTitle(c.title)}
      </p>

      <p className="text-[12px] leading-relaxed text-[#666]">{c.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {(c.tags ?? []).map((t) => (
          <Badge key={t} mono>
            {t}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 text-[11px] text-[#666]">
          <span className="flex items-center gap-1">
            <Clock size={11} aria-hidden="true" />
            {c.estimatedMins}m
          </span>
          <span className="flex items-center gap-1">
            <Users size={11} aria-hidden="true" />
            {c.stats?.solves ?? 0}
            <span className="sr-only"> solves</span>
          </span>
          {/* Lives in the meta row, not the corner: a challenge can be both
              in progress and recommended, and the corner is already spoken
              for by the solved check. */}
          {c.inProgress && (
            <span className="flex items-center gap-1 text-amber-400/80">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-400/80" />
              in progress
            </span>
          )}
        </div>
        <div className="flex items-center gap-1.5 shrink-0">
          <DifficultyBadge challenge={c} />
          <Badge tone="xp" icon={Zap}>
            +{c.xp} xp
          </Badge>
        </div>
      </div>
    </div>
  );
}
