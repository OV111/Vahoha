import { useState } from "react";
import { Link } from "react-router-dom";
import { FlaskConical } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion"; // eslint-disable-line no-unused-vars
import { useConnectorNode } from "./connectorHooks";
import { TREE_TOKENS, RESOURCE_BADGE_COLORS, summarizeResourceTypes } from "./treeTokens";
import { STATUS_META } from "./statusMeta";
import StatusIcon from "./StatusIcon";

// Leaf (one lesson). Lowest level of the hierarchy: medium weight, smaller
// text, a slightly lower-contrast surface than its parent.
//
// - Titles wrap; nothing is cut off. Every leaf title in the data fits in 3
//   lines (scripts/checkRoadmapTitles.js flags any that wouldn't), and the
//   clamp + native tooltip below is only the fallback.
// - The left border is the status color and means nothing else.
// - The whole card is one link (stretched ::after). The status icon is
//   read-only: progress is recorded by the system, not ticked by hand.
// - Description and resource badges reveal on hover or keyboard focus.
const SubtopicCard = ({ id, title, description, resources = [], href, status, minutes, hasLab, onHoverPath }) => {
  const [hovered, setHovered] = useState(false);
  const connectorRef = useConnectorNode(id);
  const types = summarizeResourceTypes(resources);
  const meta = STATUS_META[status] ?? STATUS_META.not_started;
  const skipped = status === "skipped";

  const show = () => {
    setHovered(true);
    onHoverPath?.(true);
  };
  const hide = () => {
    setHovered(false);
    onHoverPath?.(false);
  };

  return (
    <div
      ref={connectorRef}
      onMouseEnter={show}
      onMouseLeave={hide}
      onFocus={show}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget)) hide();
      }}
      style={{ width: TREE_TOKENS.subtopicWidth, minHeight: TREE_TOKENS.subtopicMinHeight, borderLeftColor: meta.edge }}
      className={`
        group relative flex shrink-0 items-start gap-2.5 rounded-xl border border-l-[3px] px-3 py-2.5
        transition-[border-color,background-color,opacity] duration-150
        ${status === "done" ? "border-emerald-900/70 bg-emerald-950/25" : "border-neutral-800 bg-neutral-900/70"}
        ${href ? "cursor-pointer hover:border-purple-500/60 hover:bg-neutral-800/70" : ""}
        has-[a:focus-visible]:outline-2 has-[a:focus-visible]:outline-offset-2 has-[a:focus-visible]:outline-purple-400
        ${skipped ? "opacity-60" : ""}
      `}
    >
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        {href ? (
          <Link
            to={href}
            data-tree-node
            title={title}
            aria-label={`${title}. ${meta.label}.${hasLab ? " Has a lab." : ""} Open lesson`}
            className="text-[13px] font-medium leading-snug text-neutral-200 line-clamp-3 after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            {title}
          </Link>
        ) : (
          <span title={title} className="text-[13px] font-medium leading-snug text-neutral-200 line-clamp-3">
            {title}
          </span>
        )}

        {(minutes || hasLab) && (
          <span className="flex items-center gap-2 text-[11px] text-neutral-400">
            {minutes ? <span>~{minutes} min</span> : null}
            {hasLab && (
              <span className="inline-flex items-center gap-1 rounded-full bg-purple-500/15 px-1.5 py-0.5 font-medium text-purple-200">
                <FlaskConical size={11} aria-hidden="true" /> Lab
              </span>
            )}
          </span>
        )}

        <AnimatePresence>
          {hovered && (description || types.length > 0) && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.18 }}
              className="flex flex-col gap-2 overflow-hidden"
            >
              {description && <p className="text-xs leading-relaxed text-neutral-300">{description}</p>}
              {types.length > 0 && (
                <div className="flex flex-wrap gap-1.5">
                  {types.map(({ type, count }) => (
                    <span
                      key={type}
                      className={`rounded-md border px-2 py-0.5 text-[11px] font-medium ${
                        RESOURCE_BADGE_COLORS[type] ?? "bg-neutral-700/40 text-neutral-300 border-neutral-600/30"
                      }`}
                    >
                      {count > 1 ? `${type} ×${count}` : type}
                    </span>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right end, so titles line up whether or not a lesson has a mark. */}
      <StatusIcon status={status} />
    </div>
  );
};

export default SubtopicCard;
