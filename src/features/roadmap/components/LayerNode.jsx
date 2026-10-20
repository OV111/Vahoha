import { memo } from "react";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { Link } from "react-router-dom";
import { Clock, Lock, Check, Play, ArrowRight, Flag } from "lucide-react";
import useRoadmapStore from "@/stores/useRoadmapStore";

// Central layer card: top of the visual hierarchy. Its badge and button both
// come from one `view` (nodeProgress.layerView), so they can't contradict.
//
// Never fade the whole card with opacity: that drops the title under WCAG AA.
// Each tone sets its own colors instead; every title here clears 4.5:1.
const TONES = {
  "up-next": {
    card: "border-purple-500 bg-violet-950/40 shadow-[0_0_32px_rgba(139,92,246,0.3)]",
    badge: "bg-purple-600 text-white border-purple-400/60",
    Icon: ArrowRight,
    title: "text-white text-base",
    meta: "text-neutral-300",
  },
  "in-progress": {
    card: "border-violet-500 bg-violet-950/30 layer-in-progress",
    badge: "bg-violet-500/20 text-violet-200 border-violet-500/50",
    Icon: Play,
    title: "text-neutral-50 text-base",
    meta: "text-neutral-300",
  },
  ready: {
    card: "border-emerald-500/70 bg-emerald-950/20",
    badge: "bg-emerald-500/15 text-emerald-300 border-emerald-500/50",
    Icon: Flag,
    title: "text-neutral-50 text-base",
    meta: "text-neutral-300",
  },
  done: {
    card: "border-purple-600/70 bg-neutral-950/80",
    badge: "bg-transparent text-purple-300 border-purple-600/50",
    Icon: Check,
    title: "text-neutral-100 text-sm",
    meta: "text-neutral-400",
  },
  locked: {
    card: "border-neutral-800 bg-neutral-950/80",
    badge: "bg-neutral-800/60 text-neutral-300 border-neutral-700/60",
    Icon: Lock,
    title: "text-neutral-300 text-sm",
    meta: "text-neutral-400",
  },
};

/**
 * @param {{ layer: object, index: number,
 *           view: import("../lib/nodeProgress").LayerView,
 *           summary: import("../lib/nodeProgress").Summary,
 *           ctaHref?: string, connectorId?: string, connectorRef?: Function }} props
 */
const LayerNode = memo(({ layer, index, view, summary, ctaHref, connectorId, connectorRef }) => {
  const { activeLayer, setActiveLayer, selectedTrack } = useRoadmapStore();
  const isActive = activeLayer?.id === layer.id;
  const tone = TONES[view.tone] ?? TONES.locked;
  const layerName = `Layer ${layer.order ?? index + 1}`;

  return (
    <motion.div
      ref={connectorRef}
      id={connectorId}
      data-tour={index === 0 ? "first-layer" : undefined}
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
      className={`relative w-full rounded-2xl border text-left transition-colors duration-200 ${tone.card} ${
        isActive ? "ring-2 ring-violet-500/60" : ""
      }`}
    >
      {/* The details button and the learn link are siblings: a link can't live inside a button. */}
      <button
        type="button"
        onClick={() => setActiveLayer(layer)}
        aria-label={`${layerName}: ${layer.title}. ${view.badge}. ${summary.completed} of ${summary.total} lessons finished. Show details`}
        className="block w-full cursor-pointer rounded-2xl px-4 pt-3 pb-3 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
      >
        <div className="mb-2 flex items-center justify-between">
          <span className={`text-[11px] font-semibold uppercase tracking-wider ${tone.meta}`}>{layerName}</span>
          <span className={`flex items-center gap-1 rounded-full border px-2 py-0.5 text-[11px] font-medium ${tone.badge}`}>
            <tone.Icon size={10} aria-hidden="true" />
            {view.badge}
          </span>
        </div>

        <p className={`mb-2 font-semibold leading-snug ${tone.title}`}>{layer.title}</p>

        <div className="flex items-center gap-2 overflow-hidden">
          <span className={`flex shrink-0 items-center gap-1 text-[11px] ${tone.meta}`}>
            <Clock size={11} aria-hidden="true" />
            {layer.estimatedTime}
          </span>
          <div className="flex gap-1 overflow-hidden">
            {layer.techs.slice(0, 3).map((t) => (
              <span key={t} className="rounded-md bg-neutral-800/80 px-1.5 py-0.5 text-[11px] text-neutral-300">
                {t}
              </span>
            ))}
            {layer.techs.length > 3 && (
              <span className="rounded-md bg-neutral-800/80 px-1.5 py-0.5 text-[11px] text-neutral-300">
                +{layer.techs.length - 3}
              </span>
            )}
          </div>
        </div>

        {summary.total > 0 && (
          <div className="mt-3">
            <div className="mb-1 flex justify-between text-[11px] text-neutral-400">
              <span>
                {summary.completed} of {summary.total} lessons
              </span>
              <span className="tabular-nums">{summary.percent}%</span>
            </div>
            <div
              role="progressbar"
              aria-label={`${layerName} progress`}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={summary.percent}
              className="h-1.5 overflow-hidden rounded-full bg-neutral-800"
            >
              <div
                className="h-full rounded-full bg-linear-to-r from-purple-600 to-emerald-500 transition-[width] duration-200"
                style={{ width: `${summary.percent}%` }}
              />
            </div>
          </div>
        )}
      </button>

      {selectedTrack && (
        <Link
          to={ctaHref ?? `/learn/${selectedTrack.id}/${layer.id}`}
          data-tree-node
          // Compact look (36px), full 44px hit area via the invisible ::before.
          className={`relative mx-auto mb-4 flex h-9 w-fit items-center justify-center gap-1.5 rounded-lg px-6 text-xs font-semibold transition-colors duration-150 before:absolute before:-inset-x-2 before:-inset-y-1 before:content-[''] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-300 ${
            view.primaryCta
              ? "bg-purple-600 text-white hover:bg-purple-500"
              : "border border-neutral-700 text-neutral-200 hover:border-neutral-500 hover:text-white"
          }`}
        >
          <Play size={11} fill="currentColor" aria-hidden="true" />
          {view.cta}
        </Link>
      )}
    </motion.div>
  );
});

export default LayerNode;
