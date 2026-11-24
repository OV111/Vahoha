// The canvas state without React Flow, so the 3D view (what the page opens in)
// doesn't have to download it. The flat canvas brings React Flow's own
// versions, see components/FlatCanvas.jsx.

import { withArrow } from "./mapGraph";

/** Applies the changes the 3D view makes: selecting and moving. Untouched items keep their identity. */
export function applyChanges(changes, items) {
  const byId = new Map(changes.map((c) => [c.id, c]));
  return items.map((item) => {
    const c = byId.get(item.id);
    if (c?.type === "select") return { ...item, selected: c.selected };
    if (c?.type === "position") return { ...item, position: c.position, dragging: c.dragging };
    return item;
  });
}

/** The edges with a new wire, unless the two parts are already joined that way. */
export function connect({ source, target, sourceHandle = null, targetHandle = null }, edges) {
  if (!source || !target || source === target || edges.some((e) => e.source === source && e.target === target)) return edges;
  const id = `e-${Math.random().toString(36).slice(2, 8)}`;
  return [...edges, withArrow({ id, source, target, sourceHandle, targetHandle })];
}
