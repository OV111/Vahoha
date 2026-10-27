import { KIND_ICONS } from "../lib/nodeKinds";
import { paletteFor } from "../lib/lenses";
import { SCROLL_ROW } from "../lib/scrollRow";

export const DRAG_TYPE = "application/x-vahoha-node";

/**
 * Parts a learner can add, as offered by the map's lens. Drag one onto the
 * canvas, or tap it to drop it in the middle (touch screens and keyboards can't drag).
 */
export default function NodePalette({ lens, onAdd, disabled }) {
  return (
    <div>
      <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">Add a part</h2>
      <ul className={`${SCROLL_ROW} mt-2 flex gap-2 overflow-x-auto pb-1 lg:flex-col lg:overflow-visible lg:[mask-image:none]`}>
        {paletteFor(lens).map(({ kind, label }) => {
          const Icon = KIND_ICONS[kind];
          return (
            <li key={kind} className="shrink-0">
              <button
                type="button"
                draggable={!disabled}
                disabled={disabled}
                onDragStart={(e) => {
                  e.dataTransfer.setData(DRAG_TYPE, kind);
                  e.dataTransfer.effectAllowed = "move";
                }}
                onClick={() => onAdd(kind)}
                className="flex min-h-11 w-full cursor-grab items-center gap-2.5 rounded-lg border border-neutral-800 bg-neutral-950 px-3 text-sm text-neutral-200 transition-colors hover:border-neutral-600 hover:text-white focus-visible:outline-2 focus-visible:outline-purple-400 active:cursor-grabbing disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon size={16} className="text-amber-300" aria-hidden="true" />
                {label}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
