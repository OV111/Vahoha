import { useId, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion"; // eslint-disable-line no-unused-vars
import { ChevronDown } from "lucide-react";
import LayerNode from "../LayerNode";
import StatusIcon from "./StatusIcon";
import { STATUS_META } from "./statusMeta";
import { useLayerTree } from "../../hooks/useLayerTree";

// Narrow screens: no mind-map. The layer card on top, then each topic as a
// collapsible section with its lessons listed underneath. Everything is
// full-width in normal flow, so nothing can scroll sideways, and every
// control has at least a 44px touch target.

const MobileLesson = ({ lesson }) => {
  const meta = STATUS_META[lesson.status] ?? STATUS_META.not_started;
  return (
    <li
      style={{ borderLeftColor: meta.edge }}
      className={`flex items-start gap-3 rounded-xl border border-l-[3px] px-3 transition-colors duration-150 ${
        lesson.status === "done" ? "border-emerald-900/70 bg-emerald-950/25" : "border-neutral-800 bg-neutral-900/70"
      } ${lesson.status === "skipped" ? "opacity-60" : ""}`}
    >
      <Link
        to={lesson.href ?? "#"}
        data-tree-node
        aria-label={`${lesson.title}. ${meta.label}. Open lesson`}
        className="flex min-h-11 min-w-0 flex-1 flex-col justify-center gap-0.5 rounded-lg py-2.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
      >
        <span className="text-sm font-medium leading-snug text-neutral-100">{lesson.title}</span>
        {lesson.description && (
          <span className="text-xs leading-relaxed text-neutral-400 line-clamp-2">{lesson.description}</span>
        )}
        {lesson.minutes ? <span className="text-[11px] text-neutral-400">~{lesson.minutes} min</span> : null}
      </Link>
      <div className="pt-2.5">
        <StatusIcon status={lesson.status} />
      </div>
    </li>
  );
};

const MobileSection = ({ section, defaultOpen }) => {
  const [open, setOpen] = useState(defaultOpen);
  const listId = useId();
  const meta = STATUS_META[section.status] ?? STATUS_META.not_started;
  const { completed, total } = section.summary;

  return (
    <section
      className={`rounded-2xl border bg-black transition-colors duration-150 ${
        section.status === "done" ? "border-emerald-800/70" : "border-neutral-700"
      }`}
    >
      <div className="flex items-center gap-3 px-3">
        <button
          type="button"
          data-tree-node
          aria-expanded={open}
          aria-controls={listId}
          aria-label={`${section.title}. ${completed} of ${total} lessons finished. ${meta.label}. ${open ? "Collapse" : "Expand"}`}
          onClick={() => setOpen((o) => !o)}
          className="flex min-h-12 min-w-0 flex-1 items-center gap-2 rounded-lg py-2 text-left focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-400"
        >
          <span className="flex min-w-0 flex-1 flex-col">
            <span className="text-sm font-semibold leading-snug text-neutral-50">{section.title}</span>
            <span className="text-xs tabular-nums text-neutral-400">
              {completed}/{total}
            </span>
          </span>
          <StatusIcon status={section.status} />
          <ChevronDown
            size={18}
            aria-hidden="true"
            className={`shrink-0 text-neutral-400 transition-transform duration-200 ${open ? "" : "-rotate-90"}`}
          />
        </button>
      </div>

      {open && (
        <ul id={listId} className="flex flex-col gap-2 px-3 pb-3">
          {section.lessons.map((lesson) => (
            <MobileLesson key={lesson.slug ?? lesson.title} lesson={lesson} />
          ))}
        </ul>
      )}
    </section>
  );
};

const MobileTreeRow = ({ layer, index, status }) => {
  const { left, right, summary, view, ctaHref } = useLayerTree(layer, status);
  const sections = [...left, ...right];
  // Open the topics of the layer the learner is working on; keep the rest short.
  const defaultOpen = view.tone === "up-next" || view.tone === "in-progress" || view.tone === "ready";

  return (
    <motion.div
      className="mx-auto w-full max-w-xl"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2, delay: Math.min(index * 0.05, 0.3) }}
    >
      <LayerNode layer={layer} index={index} view={view} summary={summary} ctaHref={ctaHref} />

      {sections.length > 0 && (
        <div className="mt-3 flex flex-col gap-2 border-l border-neutral-700 pl-3">
          {sections.map((section, i) => (
            <MobileSection
              key={`${section.title}-${i}`}
              section={section}
              defaultOpen={defaultOpen}
            />
          ))}
        </div>
      )}
    </motion.div>
  );
};

export default MobileTreeRow;
