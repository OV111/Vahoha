import { LENSES } from "../lib/lenses";
import { SCROLL_ROW } from "../lib/scrollRow";

/**
 * Picks the vocabulary a map is drawn in. Switching keeps every part already on
 * the map; it only changes which parts the palette offers (and what the repo
 * scan and the questions look for).
 */
export default function LensPicker({ lens, onChange }) {
  return (
    <div className="mt-4 sm:mt-5">
      <div className={`${SCROLL_ROW} flex gap-2 overflow-x-auto pb-1`} role="group" aria-label="What are you mapping?">
        {LENSES.map((l) => {
          const active = l.id === lens;
          return (
            <button
              key={l.id}
              type="button"
              aria-pressed={active}
              onClick={() => onChange(l.id)}
              className={`min-h-11 shrink-0 cursor-pointer rounded-full border px-4 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-purple-400 ${
                active ? "border-purple-500 bg-purple-500/15 text-white" : "border-neutral-700 text-neutral-300 hover:border-neutral-500 hover:text-white"
              }`}
            >
              {l.title}
            </button>
          );
        })}
      </div>
    </div>
  );
}
