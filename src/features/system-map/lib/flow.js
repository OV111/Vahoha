// When a request crosses each wire, from the way the learner wired the map.
// Requests start at parts nothing points to (usually the client) and move one
// hop per step, so client -> API lights up before API -> database. Wires no
// request can reach stay still, which shows a broken flow at a glance.
// Pure, so it is tested without React Flow.

// Used when every part has a wire coming in (the map is one big loop).
const START_KINDS = ["client", "entry", "datasource"];

/**
 * @returns {{ hops: Map<string, number>, steps: number }} edge id -> the step its request travels in, and how many steps one full trip takes.
 */
export function flowTiming(nodes, edges) {
  const incoming = new Set(edges.map((e) => e.target));
  let starts = nodes.filter((n) => !incoming.has(n.id)).map((n) => n.id);
  if (!starts.length) starts = nodes.filter((n) => START_KINDS.includes(n.data?.kind)).map((n) => n.id);
  if (!starts.length && nodes.length) starts = [nodes[0].id];

  const depth = new Map(starts.map((id) => [id, 0]));
  const queue = [...starts];
  while (queue.length) {
    const id = queue.shift();
    for (const e of edges) {
      if (e.source === id && !depth.has(e.target)) {
        depth.set(e.target, depth.get(id) + 1);
        queue.push(e.target);
      }
    }
  }

  const hops = new Map();
  let last = 0;
  for (const e of edges) {
    const step = depth.get(e.source);
    if (step === undefined) continue;
    hops.set(e.id, step);
    last = Math.max(last, step);
  }
  return { hops, steps: last + 1 };
}
