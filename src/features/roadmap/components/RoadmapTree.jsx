// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence, MotionConfig } from "framer-motion";
import { TreeSkeleton, TreeEmpty, TreeError } from "./tree/TreeStates";
import { handleTreeArrowKeys } from "../lib/treeKeyboard";
import useRoadmapStore from "@/stores/useRoadmapStore";
import { useTrackLayers } from "../hooks/useTrackLayers";
import { prereqsDone, layerStatus } from "../lib/layerPrereqs";
import { useMediaQuery } from "../hooks/useMediaQuery";
import LayerDetail from "./LayerDetail";
import { ConnectorProvider } from "./tree/ConnectorContext";
import DesktopTreeRow from "./tree/DesktopTreeRow";
import MobileTreeRow from "./tree/MobileTreeRow";
import CapstoneRoadmapNode from "@/features/capstone/components/CapstoneRoadmapNode";

const ETA_MAP = {
  mern: "~6 months",
};

// Below this, the 3-column spine (left subtopics | sections | layer |
// sections | right subtopics) has nowhere near enough room — collapse to
// MobileTreeRow's single vertical flow instead. Matches Tailwind's own `xl`
// breakpoint so the same number isn't duplicated in a className vs a raw px.
const DESKTOP_BREAKPOINT = "(min-width: 1280px)";

const RoadmapTree = () => {
  const { selectedTrack, selectedCategory, isPanelOpen, layerProgress } = useRoadmapStore();
  const isDesktop = useMediaQuery(DESKTOP_BREAKPOINT);
  // Fetches only the selected track (~50 KB), not its whole category file.
  const { layers, loading, error } = useTrackLayers(selectedCategory?.id, selectedTrack?.id);

  if (loading) return <TreeSkeleton desktop={isDesktop} />;
  // useTrackLayers has no refetch; a reload re-requests the track file.
  if (error) return <TreeError onRetry={() => window.location.reload()} />;
  if (!layers || layers.length === 0) return <TreeEmpty />;

  const totalLayers = layers.length;
  const doneCount = layers.filter(
    (l) => (layerProgress[l.id] ?? l.status) === "done",
  ).length;
  const eta = ETA_MAP[selectedTrack?.id] ?? `~${totalLayers * 2} weeks`;

  return (
    // reducedMotion="user": every framer animation below goes instant when the OS asks for less motion.
    <MotionConfig reducedMotion="user">
      <style>{`
        @keyframes in-progress-pulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(147,51,234,0.0), 0 0 12px rgba(147,51,234,0.3); }
          50%       { box-shadow: 0 0 0 4px rgba(147,51,234,0.12), 0 0 22px rgba(147,51,234,0.5); }
        }
        @media (prefers-reduced-motion: no-preference) {
          .layer-in-progress { animation: in-progress-pulse 2.5s ease-in-out infinite; }
        }
      `}</style>

      <motion.div
        className="mt-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4 }}
      >
        {/* Header */}
        <div className="mt-25 mb-8 w-full px-4">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4">
            <div>
              <p className="text-[10px] uppercase tracking-[0.2em] text-neutral-500 mb-1">Selected Track</p>
              <h2 className="text-2xl sm:text-3xl font-bold text-neutral-100 leading-tight">
                {selectedTrack.title}
              </h2>
              <div className="flex flex-wrap gap-2 mt-3">
                {selectedTrack.techs.map((t) => (
                  <span
                    key={t}
                    className="text-[11px] px-3 py-1 rounded-full bg-purple-600/20 text-purple-300 border border-purple-700/50 font-medium"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
            <div className="shrink-0 text-right">
              <p className="text-sm text-neutral-400 font-mono">
                {eta} · {totalLayers} layers
              </p>
            </div>
          </div>

          {/* No status legend: the map's only mark is the ✓, explained in the hint below. */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[12px] text-neutral-400 font-mono whitespace-nowrap">
                {doneCount} / {totalLayers} layers
              </span>
              <div className="w-32 h-1 rounded-full bg-neutral-800 overflow-hidden">
                <div
                  className="h-full rounded-full bg-linear-to-r from-purple-600 to-violet-500 transition-all duration-500"
                  style={{ width: `${(doneCount / totalLayers) * 100}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-4 border-t border-neutral-800" />

          {isDesktop && (
            <p className="mt-3 text-xs text-neutral-400 text-center">
              Click a lesson to open it · hover to preview · ✓ marks finished lessons, tracked as you learn
            </p>
          )}
        </div>

        {isDesktop ? (
          // Tree fills the page width naturally (no max-content / scroll box).
          <ConnectorProvider className="w-full pb-10">
            <div className="flex w-full flex-col items-center gap-0 px-10" onKeyDown={handleTreeArrowKeys}>
              {layers.map((layer, index) => (
                <DesktopTreeRow
                  key={layer.id}
                  layer={layer}
                  index={index}
                  isDone={(layerProgress[layer.id] ?? layer.status) === "done"}
                  status={layerStatus(layer, index, layers, layerProgress)}
                  isPrevDone={prereqsDone(layer, index, layers, layerProgress)}
                />
              ))}
              {/* The track's final step; renders nothing if it has no capstone. */}
              <CapstoneRoadmapNode trackId={selectedTrack.id} />
            </div>
          </ConnectorProvider>
        ) : (
          <div className="flex flex-col gap-5 px-4 pb-10" onKeyDown={handleTreeArrowKeys}>
            {layers.map((layer, index) => (
              <MobileTreeRow
                key={layer.id}
                layer={layer}
                index={index}
                isDone={(layerProgress[layer.id] ?? layer.status) === "done"}
                status={layerStatus(layer, index, layers, layerProgress)}
              />
            ))}
            <CapstoneRoadmapNode trackId={selectedTrack.id} />
          </div>
        )}
      </motion.div>

      <AnimatePresence>{isPanelOpen && <LayerDetail />}</AnimatePresence>
    </MotionConfig>
  );
};

export default RoadmapTree;
