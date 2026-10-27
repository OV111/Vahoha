// Turns the parts a learner accepted from a repo scan into canvas changes:
// new nodes laid out by role, evidence merged into parts already on the map,
// and the scan's wires between them. Pure, so the layout rules are tested.

import { compareScan } from "./drift";
import { MAX_NODES, cleanEvidence, cleanRepo, freeSpot, withArrow } from "./mapGraph";

// Left to right in the order things flow: what comes in, what guards it, what
// does the work, what the work leans on, and where it ends up. Covers every
// lens; a kind not listed lands in the last column instead of breaking the layout.
const COLUMNS = [
  ["client", "entry", "datasource", "dns", "cicd"],
  ["firewall", "loadbalancer", "auth"],
  ["server", "endpoint", "pipeline", "container", "cluster"],
  ["worker", "queue", "model", "featurestore", "migration", "cache", "secrets"],
  ["database", "primary", "replica", "shard", "backup", "storage", "evaluation", "external", "memory", "disk"],
];
const LAST_COLUMN = COLUMNS.length - 1;
const COLUMN = Object.fromEntries(COLUMNS.flatMap((kinds, column) => kinds.map((kind) => [kind, column])));
const columnOf = (kind) => COLUMN[kind] ?? LAST_COLUMN;
const GAP = { x: 240, y: 110 };

const randomId = (prefix) => `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
const paths = (part) => part.evidence.map((e) => e.path);

/**
 * @param {object[]} nodes  React Flow nodes
 * @param {object[]} edges  React Flow edges
 * @param {{ repo: object, parts: object[], wires: { source: string, target: string, label?: string }[] }} scan
 * @param {Set<string>} acceptedKeys  keys of new parts the learner accepted
 * @returns {{ nodes: object[], edges: object[], repo: object | null, added: number }}
 */
export function applyScan(nodes, edges, scan, acceptedKeys, makeId = randomId) {
  const { newParts, matched } = compareScan(nodes, scan);
  const nodeOf = new Map(matched.map((m) => [m.part.key, m.nodeId]));

  // Parts already on the map gain the repo's evidence.
  const evidenceFor = new Map(matched.map((m) => [m.nodeId, paths(m.part)]));
  let next = nodes.map((n) =>
    evidenceFor.has(n.id) ? { ...n, data: { ...n.data, evidence: cleanEvidence([...(n.data.evidence ?? []), ...evidenceFor.get(n.id)]) } } : n,
  );

  // New parts go below the existing map, one column per role.
  const anchor = nodes.length
    ? { x: Math.min(...nodes.map((n) => n.position.x)), y: Math.max(...nodes.map((n) => n.position.y)) + 160 }
    : { x: 0, y: 0 };
  const rows = {};
  const accepted = newParts
    .filter((p) => acceptedKeys.has(p.key))
    .sort((a, b) => columnOf(a.kind) - columnOf(b.kind));

  let added = 0;
  for (const part of accepted) {
    if (next.length >= MAX_NODES) break;
    const column = columnOf(part.kind);
    const row = (rows[column] = (rows[column] ?? -1) + 1);
    const position = freeSpot(next, { x: anchor.x + column * GAP.x, y: anchor.y + row * GAP.y });
    const id = makeId("n");
    next = [
      ...next,
      {
        id,
        type: "system",
        position,
        data: { kind: part.kind, title: part.title.slice(0, 40), sub: (part.sub ?? "").slice(0, 60), evidence: cleanEvidence(paths(part)) },
      },
    ];
    nodeOf.set(part.key, id);
    added += 1;
  }

  // The scan's wires, where both ends are on the map and the wire isn't there yet.
  let nextEdges = edges;
  for (const wire of scan.wires) {
    const source = nodeOf.get(wire.source);
    const target = nodeOf.get(wire.target);
    if (!source || !target || source === target) continue;
    if (nextEdges.some((e) => e.source === source && e.target === target)) continue;
    nextEdges = [
      ...nextEdges,
      withArrow({
        id: makeId("e"),
        source,
        target,
        sourceHandle: "r",
        targetHandle: "l",
        ...(wire.label ? { label: wire.label.slice(0, 30) } : {}),
      }),
    ];
  }

  return { nodes: next, edges: nextEdges, repo: cleanRepo(scan.repo), added };
}
