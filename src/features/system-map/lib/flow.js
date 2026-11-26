import { isDown } from "@/constants/projectMapShapes";
import { isUnconfirmed } from "./mapGraph";

// When a request crosses each wire, from the way the learner wired the map.
// Requests start at parts nothing points to (usually the client) and move one
// hop per step, so client -> API lights up before API -> database. Wires no
// request can reach stay still, which shows a broken flow at a glance.
// Pure, so it is tested without React Flow.

// Used when every part has a wire coming in (the map is one big loop).
const START_KINDS = ["client", "mobile", "entry", "datasource"];

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

// The numbers on the stage's metric strip, the same in the flat and 3D views.
export function mapMetrics(nodes, edges) {
  const ids = new Set(nodes.map((n) => n.id));
  const wired = edges.filter((e) => ids.has(e.source) && ids.has(e.target));
  const live = wired.filter((e) => !isUnconfirmed(e)); // no request is shown on a wire nobody confirmed
  const trip = flowTiming(nodes, live);
  const onFlow = new Set(live.filter((e) => trip.hops.has(e.id)).flatMap((e) => [e.source, e.target]));
  return {
    parts: nodes.length,
    wires: wired.length,
    unconfirmed: wired.length - live.length,
    steps: trip.hops.size ? trip.steps : 0,
    offFlow: nodes.filter((n) => !onFlow.has(n.id)).length,
    found: nodes.filter((n) => n.data.evidence?.length > 0).length,
    down: nodes.filter(isDown).length,
  };
}
