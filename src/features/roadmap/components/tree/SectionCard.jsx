import { useId, useState } from "react";
import { ChevronDown } from "lucide-react";
import { useConnectorNode, useConnection, useConnectorHighlight } from "./connectorHooks";
import SubtopicCard from "./SubtopicCard";
import StatusIcon from "./StatusIcon";
import { STATUS_META, PATH_COLORS } from "./statusMeta";
import { TREE_TOKENS } from "./treeTokens";

// Parent node (a topic). Middle of the hierarchy: semibold, its own surface,
// the accent bar facing the layer shows its derived status. The card is a
// button that collapses its lessons. Its status is derived from its lessons.
//
// `lessons`: [{ title, description, resources, href, slug, status, minutes }]
const SectionCard = ({ id, layerConnectorId, title, side, status, summary, lessons }) => {
  const [open, setOpen] = useState(true);
  const listId = useId();
  const connectorRef = useConnectorNode(id);
  const setHighlight = useConnectorHighlight();
  const meta = STATUS_META[status] ?? STATUS_META.not_started;
  const sectionPath = `${layerConnectorId}->${id}`;

  return (
    <div className={`flex items-center gap-6 ${side === "left" ? "flex-row-reverse" : "flex-row"}`}>
      <div
        ref={connectorRef}
        style={{ width: TREE_TOKENS.sectionWidth }}
        onMouseEnter={() => setHighlight([sectionPath])}
        onMouseLeave={() => setHighlight(null)}
        className={`
          group relative shrink-0 overflow-hidden rounded-2xl border bg-black transition-colors duration-150
          cursor-pointer hover:border-purple-500/60
          ${status === "done" ? "border-emerald-700/70" : "border-neutral-600"}
          ${status === "skipped" ? "opacity-60" : ""}
          has-[button[aria-expanded]:focus-visible]:outline-2 has-[button[aria-expanded]:focus-visible]:outline-offset-2 has-[button[aria-expanded]:focus-visible]:outline-purple-400
        `}
      >
        {/* Accent bar = progress color, on the edge facing the layer. */}
        <span
          aria-hidden="true"
          className={`absolute inset-y-0 ${side === "left" ? "right-0" : "left-0"} w-1 transition-colors duration-150`}
          style={{ background: meta.edge }}
        />

        <div className="flex items-start gap-2.5 px-3.5 py-3">
          <button
            type="button"
            data-tree-node
            aria-expanded={open}
            aria-controls={listId}
            aria-label={`${title}. ${summary.completed} of ${summary.total} lessons finished. ${meta.label}. ${open ? "Collapse" : "Expand"}`}
            onClick={() => setOpen((o) => !o)}
            onFocus={() => setHighlight([sectionPath])}
            onBlur={() => setHighlight(null)}
            className="flex min-w-0 flex-1 items-start gap-2 text-left after:absolute after:inset-0 after:content-[''] focus-visible:outline-none"
          >
            <span className="flex min-w-0 flex-1 flex-col gap-1">
              <span className="text-sm font-semibold leading-snug text-neutral-50">
                {title}
              </span>
              <span className="flex items-center gap-2 text-xs text-neutral-400">
                <span className="tabular-nums">
                  {summary.completed}/{summary.total}
                </span>
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-neutral-800" aria-hidden="true">
                  <span
                    className="block h-full rounded-full bg-emerald-500 transition-[width] duration-200"
                    style={{ width: `${summary.percent}%` }}
                  />
                </span>
              </span>
            </span>
            <StatusIcon status={status} />
            <ChevronDown
              size={16}
              aria-hidden="true"
              className={`mt-0.5 shrink-0 text-neutral-400 transition-transform duration-200 group-hover:text-purple-300 ${open ? "" : "-rotate-90"}`}
            />
          </button>
        </div>
      </div>

      {open && lessons.length > 0 && (
        <div id={listId} className="flex shrink-0 flex-col" style={{ gap: TREE_TOKENS.cardGap }}>
          {lessons.map((lesson, i) => {
            const subtopicId = `${id}-sub-${i}`;
            return (
              <SectionToSubtopicLink key={subtopicId} sectionId={id} subtopicId={subtopicId} done={lesson.status === "done"}>
                <SubtopicCard
                  id={subtopicId}
                  title={lesson.title}
                  description={lesson.description}
                  resources={lesson.resources ?? []}
                  href={lesson.href}
                  status={lesson.status}
                  minutes={lesson.minutes}
                  hasLab={lesson.hasLab}
                  onHoverPath={(on) => setHighlight(on ? [sectionPath, `${id}->${subtopicId}`] : null)}
                />
              </SectionToSubtopicLink>
            );
          })}
        </div>
      )}
    </div>
  );
};

// Registers the section->lesson connector. Finished lessons get the accent color.
const SectionToSubtopicLink = ({ sectionId, subtopicId, done, children }) => {
  useConnection(`${sectionId}->${subtopicId}`, {
    fromId: sectionId,
    toId: subtopicId,
    dashed: !done,
    color: done ? PATH_COLORS.done : PATH_COLORS.idle,
    strokeWidth: done ? 1.75 : 1.25,
    opacity: done ? 1 : 0.85,
  });
  return children;
};

export default SectionCard;
