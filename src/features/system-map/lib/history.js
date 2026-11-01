// Undo/redo for the Project Map, as plain data: each entry is one saved-shape
// graph serialized to JSON (see mapGraph.js toGraph). Pure, so it is tested
// without React. The page decides WHEN a change counts as one step (after a
// drag ends, after typing pauses); this file only keeps the stacks.

export const MAX_HISTORY = 50;

/** A history whose current state is `json`, with nothing to undo or redo. */
export const startHistory = (json) => ({ past: [], present: json, future: [] });

export const canUndo = (h) => h.past.length > 0;
export const canRedo = (h) => h.future.length > 0;

/** Records `json` as a new step. Same as the present is a no-op; a new step clears redo. */
export function record(h, json) {
  if (json === h.present) return h;
  return { past: [...h.past, h.present].slice(-MAX_HISTORY), present: json, future: [] };
}

/**
 * Steps back. `currentJson` is the map as it is right now: when it holds a
 * change not recorded yet (the learner pressed undo mid-debounce), that change
 * is recorded first, so undo removes it instead of skipping over it.
 */
export function undo(h, currentJson = h.present) {
  const settled = record(h, currentJson);
  if (!canUndo(settled)) return settled;
  return {
    past: settled.past.slice(0, -1),
    present: settled.past[settled.past.length - 1],
    future: [settled.present, ...settled.future],
  };
}

export function redo(h) {
  if (!canRedo(h)) return h;
  return { past: [...h.past, h.present], present: h.future[0], future: h.future.slice(1) };
}
