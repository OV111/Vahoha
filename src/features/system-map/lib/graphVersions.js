// Upcasting, mirrored from backend/modules/system-map/lib/graphVersions.js:
// a graph from an older format (an old export file, an old browser copy) is
// stepped up to GRAPH_VERSION when read. Change both files together.

export const GRAPH_VERSION = 1;

/** UPCASTERS[n] turns a version-n graph into a version n+1 graph. */
const UPCASTERS = {};

/** The graph in the current format, or null when its version is unknown or can't be stepped up. */
export function upcastGraph(graph) {
  let g = graph;
  while (Number.isInteger(g?.v) && g.v < GRAPH_VERSION) {
    const step = UPCASTERS[g.v];
    if (!step) return null;
    g = step(g);
  }
  return g?.v === GRAPH_VERSION ? g : null;
}
