import { KIND_ICONS } from "../lib/nodeKinds";
import { paletteFor } from "../lib/lenses";
import { SCROLL_ROW } from "../lib/scrollRow";

export const DRAG_TYPE = "application/x-vahoha-node";

export default function NodePalette({ lens, onAdd, disabled }) {
  return (
    <div>
      <h2 className="max-lg:sr-only text-xs font-semibold uppercase tracking-wider text-neutral-400">Add a part</h2>
      <ul className={`${SCROLL_ROW} flex gap-2 overflow-x-auto lg:mt-2 pb-1 thin-scrollbar lg:max-h-[calc(100vh-16rem)] lg:min-h-[440px] lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto lg:pr-1 lg:[mask-image:none]`}>
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
