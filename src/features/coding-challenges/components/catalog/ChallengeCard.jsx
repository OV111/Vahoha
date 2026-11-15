import { Check, Clock, Code2, Map as MapIcon, Users, Zap } from "lucide-react";
import { CHALLENGE_LANGUAGES, languagesOf, shortLabel } from "../../../../../constants/challengeLanguages";
import Badge from "../Badge";
import DifficultyBadge from "../DifficultyBadge";
import { formatTitle } from "../../lib/formatTitle";

// Below this a solver count reads as "nobody does this one", so it is left out.
const MIN_SOLVES_SHOWN = 5;

// Most challenges take the default JavaScript + TypeScript pair; naming it on
// every card says nothing. Only a different set (Python, Go...) earns a badge.
const isDefaultLanguages = (languages) =>
  languages.length === CHALLENGE_LANGUAGES.length && CHALLENGE_LANGUAGES.every((l) => languages.includes(l));

export default function ChallengeCard({ c, trackLabel = null }) {
  const languages = languagesOf(c);
  const solves = c.stats?.solves ?? 0;
  return (
    <div className="relative overflow-hidden rounded-4xl p-4 h-full flex flex-col gap-2.5 border border-[#1a1a1a] bg-[#0d0d0d] transition duration-200 hover:border-purple-600/50 hover:-translate-y-0.5 motion-reduce:transition-colors motion-reduce:hover:translate-y-0">
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

      {/* Difficulty first: it is what learners scan for before the title. */}
      <div className="flex flex-wrap items-center gap-2">
        <DifficultyBadge challenge={c} />
        {trackLabel && (
          <Badge tone="blue" icon={MapIcon} className="max-w-[160px] truncate">
            {trackLabel}
          </Badge>
        )}
        {/* One language is named in full; several are shown as initials so
            the row stays on one line. */}
        {!isDefaultLanguages(languages) && (
          <Badge icon={Code2} mono>
            <span className="sr-only">Languages: </span>
            {languages.length === 1 ? languages[0].label : languages.map(shortLabel).join(" · ")}
          </Badge>
        )}
      </div>

      <p className={`text-[14px] font-semibold leading-snug text-[#e5e5e5] ${c.hot ? "pr-5" : ""}`}>
        {formatTitle(c.title)}
      </p>

      <p className="text-[12px] leading-relaxed text-zinc-400">{c.summary}</p>

      <div className="flex flex-wrap gap-1.5">
        {(c.tags ?? []).map((t) => (
          <Badge key={t} mono>
            {t}
          </Badge>
        ))}
      </div>

      <div className="flex items-center justify-between gap-2 mt-auto pt-2 border-t border-[#1a1a1a]">
        <div className="flex items-center gap-3 text-[11px] text-[#8a8a8a]">
          <span className="flex items-center gap-1">
            <Clock size={11} aria-hidden="true" />
            {c.estimatedMins}m
          </span>
          {solves >= MIN_SOLVES_SHOWN && (
            <span className="flex items-center gap-1">
              <Users size={11} aria-hidden="true" />
              {solves}
              <span className="sr-only"> solves</span>
            </span>
          )}
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
        <Badge tone="xp" icon={Zap} className="shrink-0">
          +{c.xp} xp
        </Badge>
      </div>
    </div>
  );
}
