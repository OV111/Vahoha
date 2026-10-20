import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import LayerNode from "../LayerNode";
import SectionCard from "./SectionCard";
import { useConnection, useConnectorNode } from "./connectorHooks";
import { TREE_TOKENS } from "./treeTokens";
import { PATH_COLORS } from "./statusMeta";
import { useLayerTree } from "../../hooks/useLayerTree";

// Section and subtopic cards are fixed-width and stack vertically, so every
// row's side panel is naturally this width UNLESS a layer has zero sections
// on that side — then the column would collapse to 0px and throw off the
// center layer-node spine's alignment for just that one row. Pin a min-width
// derived from the actual card tokens (not a guessed constant) so every
// row's panel reserves the same footprint even when empty.
const SIDE_PANEL_MIN_WIDTH = TREE_TOKENS.sectionWidth + 24 /* gap-6 */ + TREE_TOKENS.subtopicWidth;

// Layer -> topic connector. A finished topic gets the accent color.
const LayerToSectionLink = ({ layerId, sectionId, done }) => {
  useConnection(`${layerId}->${sectionId}`, {
    fromId: layerId,
    toId: sectionId,
    dashed: !done,
    color: done ? PATH_COLORS.done : PATH_COLORS.idle,
    strokeWidth: done ? 2 : 1.5,
    opacity: done ? 1 : 0.8,
  });
  return null;
};

// One side of the row: its topics, each with its lessons.
const SidePanel = ({ side, sections, layerId }) => (
  <div
    className={`flex shrink-0 flex-col justify-center py-8 ${side === "left" ? "items-end" : "items-start"}`}
    style={{ gap: 24, minWidth: SIDE_PANEL_MIN_WIDTH }}
  >
    {sections.map((section, i) => {
      const sectionId = `${layerId}-${side}-${i}`;
      return (
        <div key={`${section.title}-${i}`}>
          <LayerToSectionLink layerId={layerId} sectionId={sectionId} done={section.status === "done"} />
          <SectionCard
            id={sectionId}
            layerConnectorId={layerId}
            title={section.title}
            side={side}
            status={section.status}
            summary={section.summary}
            lessons={section.lessons}
          />
        </div>
      );
    })}
  </div>
);

// One layer's full row: left topics | layer card | right topics.
const DesktopTreeRow = ({ layer, index, isDone, isPrevDone, status }) => {
  const layerId = `layer-${layer.id}`;
  const layerConnectorRef = useConnectorNode(layerId);
  const { left, right, summary, view, ctaHref } = useLayerTree(layer, status);

  return (
    <motion.div
      className="flex items-stretch justify-center gap-10 xl:gap-14"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3), ease: "easeOut" }}
    >
      <SidePanel side="left" sections={left} layerId={layerId} />

      {/* Center */}
      <div style={{ width: 300 }} className="flex shrink-0 flex-col items-center">
        <div className="flex flex-1 justify-center" style={{ minHeight: 18 }}>
          {index > 0 && (
            <div
              className="h-full w-px"
              style={{
                background: isPrevDone ? TREE_TOKENS.doneSpine : undefined,
                borderLeft: !isPrevDone ? `1px dashed ${PATH_COLORS.idle}` : undefined,
              }}
            />
          )}
        </div>

        <LayerNode
          layer={layer}
          index={index}
          view={view}
          summary={summary}
          ctaHref={ctaHref}
          connectorId={layerId}
          connectorRef={layerConnectorRef}
        />

        {/* Always drawn, the last layer too: the spine continues into the capstone node below the tree. */}
        <div className="flex flex-1 justify-center" style={{ minHeight: 18 }}>
          <div
            className="h-full w-px"
            style={{
              background: isDone ? TREE_TOKENS.doneSpine : undefined,
              borderLeft: !isDone ? `1px dashed ${PATH_COLORS.idle}` : undefined,
            }}
          />
        </div>
      </div>

      <SidePanel side="right" sections={right} layerId={layerId} />
    </motion.div>
  );
};

export default DesktopTreeRow;
