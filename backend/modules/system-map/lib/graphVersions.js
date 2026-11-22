/*
 * Upcasting: stored graphs are never rewritten in bulk. Each read runs a map
 * through the steps from its `v` up to GRAPH_VERSION, so a format change is
 * one new step here instead of a migration over every document.
 *
 * To change the format: bump GRAPH_VERSION, add UPCASTERS[old] = (g) => ({ ...g, v: old + 1, ... }),
 * update graphSchema's `v` literal, and mirror both in
 * src/features/system-map/lib/graphVersions.js.
 */

export const GRAPH_VERSION = 1;

/** UPCASTERS[n] turns a version-n graph into a version n+1 graph. */
const UPCASTERS = {};

/** The graph in the current format. Throws on a version newer than this server or one with no path up. */
export function upcastGraph(graph) {
  let g = graph;
  while (g.v < GRAPH_VERSION) {
    const step = UPCASTERS[g.v];
    if (!step) throw new Error(`No upcaster for graph version ${g.v}`);
    g = step(g);
  }
  if (g.v !== GRAPH_VERSION) throw new Error(`Unknown graph version ${g.v}`);
  return g;
}
