import { ArrowRight, DollarSign, Minus } from "lucide-react";
import { useNavigate } from "react-router-dom";

const CARD = "flex flex-col items-center gap-3 py-5 px-4 border border-[#1a1a1a] bg-[#0d0d0d]";

const ProgressSkeleton = () => (
  <div className={`${CARD} animate-pulse`}>
    <div className="w-24 h-24 rounded-full border-[3px] border-[#1a1a1a]" />
    <div className="h-3 w-full rounded-sm bg-[#1a1a1a]" />
    <div className="h-3 w-2/3 rounded-sm bg-[#1a1a1a]" />
    <div className="h-8 w-full rounded-sm bg-[#1a1a1a]" />
  </div>
);

/**
 * Exam readiness for the layer the user is currently on: the share of that
 * layer's challenges they've solved, and the exam it unlocks.
 */
export default function ProgressCard({ readiness, loading }) {
  const navigate = useNavigate();

  if (loading && !readiness) return <ProgressSkeleton />;

  // Distinct from hasLayer:false below. Null means the request didn't land —
  // telling someone who *has* a path to go pick one would be a plain lie.
  if (!readiness) {
    return (
      <div className={CARD}>
        <p className="text-[12px] text-center text-[#8a8a8a]">
          Couldn&apos;t load your exam readiness.
        </p>
      </div>
    );
  }

  // No active roadmap path — there is no layer to be ready *for*, and a 0%
  // ring here would read as failure rather than "not started yet".
  if (!readiness.hasLayer) {
    return (
      <div className={CARD}>
        <p className="text-[12px] text-center text-[#8a8a8a]">
          Pick a roadmap path to track test readiness against your current
          layer.
        </p>
        <button
          onClick={() => navigate("/roadmaps")}
          className="w-full flex justify-center items-center gap-1.5 py-2 text-[12px] font-bold transition-opacity hover:opacity-80 cursor-pointer bg-purple-600 text-white"
        >
          browse roadmaps <ArrowRight size={13} />
        </button>
      </div>
    );
  }

  const { percent, solved, total, toGo, message, layerId, categoryId, layerTitle } = readiness;
  const empty = total === 0;
  const ready = !empty && toGo === 0;
  const takeExam = () => navigate(`/roadmaps/exam/${layerId}?path=${categoryId ?? "backend"}`);

  return (
    <div className={CARD}>
      {layerTitle && (
        <p className="w-full truncate text-center text-[12px] font-semibold text-[#e5e5e5]" title={layerTitle}>
          {layerTitle}
        </p>
      )}

      {/* An empty layer gets no ring: "0" with a full-circle label read as a
          contradiction. A dashed outline says "nothing here yet" instead. */}
      <div
        className="relative w-24 h-24"
        role="img"
        aria-label={empty ? "No challenges in this layer yet" : `${solved} of ${total} challenges solved`}
      >
        {empty ? (
          <div className="flex h-24 w-24 items-center justify-center rounded-full border-[3px] border-dashed border-[#2a2a2a]">
            <Minus size={22} className="text-[#555]" aria-hidden="true" />
          </div>
        ) : (
          <>
            <svg viewBox="0 0 36 36" className="w-24 h-24 -rotate-90" aria-hidden="true">
              <circle cx="18" cy="18" r="15.9" fill="none" stroke="#1a1a1a" strokeWidth="2.5" />
              <circle
                cx="18"
                cy="18"
                r="15.9"
                fill="none"
                stroke="#9333ea"
                strokeWidth="2.5"
                // The dash array is in percent units because the circle's
                // circumference is ~100 at r=15.9 — that's the whole reason for
                // this radius.
                strokeDasharray={`${percent} ${100 - percent}`}
                strokeLinecap="round"
                className="transition-all duration-700 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-xl font-bold text-[#e5e5e5]">
                {percent}
                <span className="text-[12px] font-medium text-[#8a8a8a]">%</span>
              </span>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col items-center gap-1">
        <p className="text-[12px] font-medium text-[#e5e5e5]">
          {empty ? "No challenges yet" : ready ? "All solved" : `${solved} of ${total} solved`}
        </p>
        <p className="text-center text-[12px] leading-relaxed text-[#8a8a8a]">
          {empty ? "You can still take the test for this layer." : message}
        </p>
      </div>

      {/* Solid when the exam is the next move, outlined while there is still
          practice to do, so the card nudges without blocking. */}
      <button
        onClick={takeExam}
        className={`w-full flex justify-center items-center gap-1.5 py-2 text-[12px] font-bold transition-colors cursor-pointer ${
          empty || ready
            ? "bg-purple-600 text-white hover:bg-purple-500"
            : "border border-purple-600/50 text-purple-300 hover:bg-purple-600/10"
        }`}
      >
        <DollarSign size={12} aria-hidden="true" /> Take exam <ArrowRight size={13} aria-hidden="true" />
      </button>
    </div>
  );
}
