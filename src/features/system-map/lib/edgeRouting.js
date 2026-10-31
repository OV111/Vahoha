// Which sides of two parts a wire should join, from where the parts are right
// now. Saved maps keep fixed handles (right/bottom out, left/top in), which
// draws a backwards loop when the target sits left of or above the source; the
// canvas uses these sides instead, so the arrow always points at its target.
// Pure, so it is tested without React Flow.

// A part's size before React Flow has measured it (w-44 and about 64px tall).
export const DEFAULT_SIZE = { width: 176, height: 64 };

const center = (node) => {
  const width = node.measured?.width ?? node.width ?? DEFAULT_SIZE.width;
  const height = node.measured?.height ?? node.height ?? DEFAULT_SIZE.height;
  return { x: node.position.x + width / 2, y: node.position.y + height / 2, width, height };
};

/**
 * @returns {{ sourceHandle: "l" | "t" | "r" | "b", targetHandle: "l" | "t" | "r" | "b" }}
 */
export function sidesFor(source, target) {
  const a = center(source);
  const b = center(target);
  const dx = b.x - a.x;
  const dy = b.y - a.y;
  // Parts are much wider than tall, so compare the gaps in part-sized units:
  // side by side joins left/right, stacked joins top/bottom.
  const horizontal = Math.abs(dx) / ((a.width + b.width) / 2) >= Math.abs(dy) / ((a.height + b.height) / 2);
  if (horizontal) return dx >= 0 ? { sourceHandle: "r", targetHandle: "l" } : { sourceHandle: "l", targetHandle: "r" };
  return dy >= 0 ? { sourceHandle: "b", targetHandle: "t" } : { sourceHandle: "t", targetHandle: "b" };
}

/**
 * The edges as the canvas should draw them. Edges whose sides are already
 * right are returned as the same object, so React Flow doesn't redraw them.
 */
export function routeEdges(nodes, edges) {
  const byId = new Map(nodes.map((n) => [n.id, n]));
  return edges.map((edge) => {
    const source = byId.get(edge.source);
    const target = byId.get(edge.target);
    if (!source || !target) return edge;
    const sides = sidesFor(source, target);
    return edge.sourceHandle === sides.sourceHandle && edge.targetHandle === sides.targetHandle ? edge : { ...edge, ...sides };
  });
}
