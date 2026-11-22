// A map edit as small operations instead of the whole graph, so a teammate's
// save in between can be merged instead of refused. The server applies them
// with the same rules (backend/modules/system-map/lib/graphOps.js).
// Both functions work on the saved shape (mapGraph.js toGraph), not React Flow state.

const NODE_FIELDS = ["kind", "title", "sub", "x", "y", "evidence", "note"];
const NODE_OPTIONAL = ["evidence", "note"];
const EDGE_FIELDS = ["source", "target", "sourceHandle", "targetHandle", "label"];
const META_FIELDS = ["lens", "repo"];

const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);
const byId = (list) => new Map(list.map((item) => [item.id, item]));

/** What changed between two values of the same thing: { set, unset }. */
function fieldChanges(before, after, fields, optional) {
  const set = {};
  const unset = [];
  for (const f of fields) {
    if (after[f] === undefined) {
      if (optional.includes(f) && before[f] !== undefined) unset.push(f);
    } else if (!same(before[f], after[f])) {
      set[f] = after[f];
    }
  }
  return { set, unset };
}

const hasChanges = ({ set, unset }) => Object.keys(set).length > 0 || unset.length > 0;

/** The operations that turn `base` into `next`. Empty when they are the same map. */
export function diffGraph(base, next) {
  const ops = [];
  const [baseNodes, nextNodes] = [byId(base.nodes), byId(next.nodes)];
  const [baseEdges, nextEdges] = [byId(base.edges), byId(next.edges)];

  for (const id of baseEdges.keys()) if (!nextEdges.has(id)) ops.push({ op: "removeEdge", id });
  for (const id of baseNodes.keys()) if (!nextNodes.has(id)) ops.push({ op: "removeNode", id });

  for (const node of next.nodes) {
    const before = baseNodes.get(node.id);
    if (!before) {
      ops.push({ op: "addNode", node });
      continue;
    }
    const change = fieldChanges(before, node, NODE_FIELDS, NODE_OPTIONAL);
    if (hasChanges(change)) ops.push({ op: "updateNode", id: node.id, set: change.set, ...(change.unset.length ? { unset: change.unset } : {}) });
  }

  for (const edge of next.edges) {
    const before = baseEdges.get(edge.id);
    if (!before) {
      ops.push({ op: "addEdge", edge });
      continue;
    }
    const { set } = fieldChanges(before, edge, EDGE_FIELDS, []);
    if (Object.keys(set).length) ops.push({ op: "updateEdge", id: edge.id, set });
  }

  const meta = fieldChanges(base, next, META_FIELDS, META_FIELDS);
  if (hasChanges(meta)) ops.push({ op: "setMeta", set: meta.set, ...(meta.unset.length ? { unset: meta.unset } : {}) });

  return ops;
}

const omit = (obj, keys = []) => Object.fromEntries(Object.entries(obj).filter(([k]) => !keys.includes(k)));

/**
 * `graph` with `ops` applied, skipping any op whose target isn't there (or is
 * already there, for adds). Used to bring a teammate's edits onto a canvas that
 * may hold newer local edits: whatever doesn't fit is settled by the next save.
 */
export function applyOpsLenient(graph, ops) {
  let nodes = [...graph.nodes];
  let edges = [...graph.edges];
  let meta = omit(graph, ["nodes", "edges"]);

  for (const op of ops) {
    const isNode = op.op.endsWith("Node");
    const list = isNode ? nodes : edges;
    const item = op.node ?? op.edge;
    const id = item?.id ?? op.id;
    const exists = list.some((x) => x.id === id);
    let changed = list;

    if (op.op.startsWith("add") && !exists) changed = [...list, item];
    else if (op.op.startsWith("remove") && exists) changed = list.filter((x) => x.id !== id);
    else if (op.op.startsWith("update") && exists) changed = list.map((x) => (x.id === id ? { ...omit(x, op.unset), ...op.set } : x));
    else if (op.op === "setMeta") meta = { ...omit(meta, op.unset), ...op.set };

    if (isNode) nodes = changed;
    else edges = changed;
  }
  return { ...meta, nodes, edges };
}
