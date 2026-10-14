import { useNavigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { formatTitle } from "../../lib/formatTitle";
import { motion as Motion } from "framer-motion";
import useUtcMidnightCountdown from "../../hooks/useUtcMidnightCountdown";

export default function DailyChallengeCard({ daily, loading, fadeUp }) {
  const navigate = useNavigate();
  const countdown = useUtcMidnightCountdown();

  return (
    <Motion.div
      {...fadeUp(0.1)}
      className="lg:mt-13 w-full lg:w-[340px] shrink-0 rounded-sm p-5 flex flex-col gap-4 bg-purple-600 border border-purple-600"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-green-500 shadow-[0_0_6px_2px_rgba(74,222,128,0.6)]" />
          </span>
          <span className="text-[10px] font-bold tracking-widest uppercase text-white">
            Daily Challenge
          </span>
        </div>
      </div>

      {daily ? (
        <>
          <p className="text-[16px] font-bold text-white leading-snug">{formatTitle(daily.title)}</p>

          <p className="text-[12px] leading-relaxed text-white/75">{daily.summary ?? ""}</p>

          <div className="flex flex-wrap gap-1.5">
            {(daily.tags ?? []).map((t) => (
              <span
                key={t}
                className="text-[9px] font-bold px-2 bg-black/25 text-white rounded-xl"
              >
                {t}
              </span>
            ))}
          </div>
        </>
      ) : loading ? (
        // Bars sized to the title, two summary lines and the tag row, so the
        // card doesn't grow when the real challenge arrives.
        <div className="flex flex-col gap-3 animate-pulse" aria-hidden="true">
          <div className="h-[18px] w-4/5 rounded-sm bg-white/20" />
          <div className="flex flex-col gap-1.5">
            <div className="h-3 w-full rounded-sm bg-white/15" />
            <div className="h-3 w-2/3 rounded-sm bg-white/15" />
          </div>
          <div className="flex gap-1.5">
            <div className="h-3.5 w-12 rounded-xl bg-black/25" />
            <div className="h-3.5 w-16 rounded-xl bg-black/25" />
          </div>
        </div>
      ) : (
        <p className="text-[13px] text-white/75">No daily challenge today. Check back after the reset.</p>
      )}

      <div className="flex items-center gap-3 mt-1">
        <button
          type="button"
          disabled={!daily}
          onClick={() => daily && navigate(`/coding-challenges/${daily.slug}`)}
          className="flex justify-center items-center gap-1.5 flex-1 py-2 text-[13px] font-bold rounded-sm transition-opacity hover:opacity-90 cursor-pointer disabled:cursor-not-allowed disabled:opacity-60 bg-white text-purple-600"
        >
          <p>$ start solving</p>
          <ArrowRight size={14} />
        </button>

        <div className="text-left shrink-0">
          <p className="text-[9px] tracking-widest uppercase text-white/50">
            // RESETS IN
          </p>
          <p className="text-[15px] font-bold font-mono text-white">
            {countdown}
          </p>
        </div>
      </div>
    </Motion.div>
  );
}
