import { Bone } from "@/components/feedback/Skeleton";
import { Link } from "react-router-dom";
import { ArrowRight, Clock, Zap } from "lucide-react";
import { formatTitle } from "@/features/coding-challenges/lib/formatTitle";
import { motion as Motion } from "framer-motion";
import useUtcMidnightCountdown from "@/features/coding-challenges/hooks/useUtcMidnightCountdown";

const DIFFICULTY_LABEL = { easy: "Easy", med: "Medium", hard: "Hard" };

export default function DailyChallengeCard({ daily, loading, fadeUp }) {
  const countdown = useUtcMidnightCountdown();

  // What it costs and pays, so the choice to start is an informed one.
  const meta = daily
    ? [
        DIFFICULTY_LABEL[daily.difficulty] && { text: DIFFICULTY_LABEL[daily.difficulty] },
        daily.estimatedMins && { icon: Clock, text: `${daily.estimatedMins} min` },
        daily.xp && { icon: Zap, text: `+${daily.xp} xp` },
      ].filter(Boolean)
    : [];

  return (
    <Motion.div
      {...fadeUp(0.1)}
      className="w-full lg:w-[340px] shrink-0 rounded-sm p-5 flex flex-col gap-4 bg-purple-600 border border-purple-600"
    >
      <div className="flex items-center gap-2">
        {/* White, not green: green on purple clashed. Pulses only when motion is allowed. */}
        <span className="relative flex h-2 w-2" aria-hidden="true">
          <span className="absolute inline-flex h-full w-full rounded-full bg-white opacity-60 motion-safe:animate-ping" />
          <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
        </span>
        <span className="text-[10px] font-bold tracking-widest uppercase text-white">Daily Challenge</span>
      </div>

      {daily ? (
        <>
          <p className="text-[16px] font-bold text-white leading-snug">{formatTitle(daily.title)}</p>

          {/* Clamped so a long summary can't stretch the card past the hero. */}
          <p className="text-[12px] leading-relaxed text-white/80 line-clamp-3">{daily.summary ?? ""}</p>

          {meta.length > 0 && (
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] font-medium text-white/85">
              {meta.map(({ icon: Icon, text }) => (
                <span key={text} className="flex items-center gap-1">
                  {Icon && <Icon size={11} aria-hidden="true" />}
                  {text}
                </span>
              ))}
            </div>
          )}

          {daily.tags?.length > 0 && (
            <div className="flex flex-wrap gap-1.5">
              {daily.tags.map((t) => (
                <span key={t} className="text-[10px] font-semibold px-2 py-0.5 bg-black/25 text-white rounded-xl">
                  {t}
                </span>
              ))}
            </div>
          )}
        </>
      ) : loading ? (
        // Bars sized to the title, two summary lines, the meta row and the tags,
        // so the card doesn't grow when the real challenge arrives.
        <div className="flex flex-col gap-3">
          <Bone className="h-[18px] w-4/5 bg-white/20" />
          <div className="flex flex-col gap-1.5">
            <Bone className="h-3 w-full bg-white/15" />
            <Bone className="h-3 w-2/3 bg-white/15" />
          </div>
          <Bone className="h-3 w-1/2 bg-white/15" />
          <div className="flex gap-1.5">
            <Bone className="h-4 w-12 rounded-xl bg-black/25" />
            <Bone className="h-4 w-16 rounded-xl bg-black/25" />
          </div>
        </div>
      ) : (
        <p className="text-[13px] text-white/80">No daily challenge today. Check back after the reset.</p>
      )}

      <div className="flex items-center gap-3 mt-1">
        {/* A real link: it can be opened in a new tab, and it is announced as one. */}
        {daily ? (
          <Link
            to={`/coding-challenges/${daily.slug}`}
            className="flex justify-center items-center gap-1.5 flex-1 py-2 text-[13px] font-bold rounded-sm bg-white text-purple-700 transition-opacity hover:opacity-90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
          >
            Start today&apos;s challenge
            <ArrowRight size={14} aria-hidden="true" />
          </Link>
        ) : (
          <span
            aria-disabled="true"
            className="flex justify-center items-center gap-1.5 flex-1 py-2 text-[13px] font-bold rounded-sm bg-white/60 text-purple-700 cursor-not-allowed"
          >
            Start today&apos;s challenge
            <ArrowRight size={14} aria-hidden="true" />
          </span>
        )}

        <div className="text-left shrink-0">
          <p className="text-[10px] tracking-widest uppercase text-white/70">Resets in</p>
          <p className="text-[15px] font-bold font-mono tabular-nums text-white" aria-label={`Resets in ${countdown}`}>
            {countdown}
          </p>
        </div>
      </div>
    </Motion.div>
  );
}
