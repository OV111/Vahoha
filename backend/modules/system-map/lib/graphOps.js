/*
 * Edits to a saved graph as small operations, so two people saving the same
 * map can both win when they touched different things.
 *
 *   addNode { node }       removeNode { id }       updateNode { id, set, unset? }
 *   addEdge { edge }       removeEdge { id }       updateEdge { id, set, unset? }
 *   setMeta { set, unset? }   (lens, repo)
 *
 * The client builds these by diffing its last saved graph against the canvas
 * (src/features/system-map/lib/graphOps.js mirrors applyOps). Pure: no db.
 */

export class OpError extends Error {}

const byId = (list, id) => list.findIndex((item) => item.id === id);

function without(obj, keys = []) {
  const copy = { ...obj };
  for (const key of keys) delete copy[key];
  return copy;
}

/**
 * The graph after `ops`, as a new object. Throws OpError when an op points at
 * something that isn't there (or adds something that already is): the base
 * the client diffed against is not the graph it is being applied to.
 * The result can still break graph rules (a wire to a removed part): callers validate it.
 */
export function applyOps(graph, ops) {
  const nodes = [...graph.nodes];
  const edges = [...graph.edges];
  let meta = without(graph, ["nodes", "edges"]);

  for (const op of ops) {
    const list = op.op.endsWith("Node") ? nodes : edges;
    switch (op.op) {
      case "addNode":
      case "addEdge": {
        const item = op.node ?? op.edge;
        if (byId(list, item.id) !== -1) throw new OpError(`${item.id} already exists`);
        list.push(item);
        break;
      }
      case "removeNode":
      case "removeEdge": {
        const i = byId(list, op.id);
        if (i === -1) throw new OpError(`${op.id} not found`);
        list.splice(i, 1);
        break;
      }
      case "updateNode":
      case "updateEdge": {
        const i = byId(list, op.id);
        if (i === -1) throw new OpError(`${op.id} not found`);
        list[i] = { ...without(list[i], op.unset), ...op.set };
        break;
      }
      case "setMeta":
        meta = { ...without(meta, op.unset), ...op.set };
        break;
      default:
        throw new OpError(`Unknown op ${op.op}`);
    }
  }
  return { ...meta, nodes, edges };
}

const WHOLE = "*";

/**
 * What the ops touch, for spotting overlap between two people's saves:
 * "node:<id>#*" for adding or removing a whole part, "node:<id>#<field>" for
 * one field. Same for edges; "meta#<field>" for lens and repo. Ids may hold
 * any character, so the field is whatever follows the LAST "#".
 */
export function touchedKeys(ops) {
  const keys = new Set();
  for (const op of ops) {
    const kind = op.op.endsWith("Node") ? "node" : op.op.endsWith("Edge") ? "edge" : "meta";
    const fields = [...Object.keys(op.set ?? {}), ...(op.unset ?? [])];
    if (kind === "meta") fields.forEach((f) => keys.add(`meta#${f}`));
    else if (op.op.startsWith("update")) fields.forEach((f) => keys.add(`${kind}:${op.id}#${f}`));
    else keys.add(`${kind}:${(op.node ?? op.edge)?.id ?? op.id}#${WHOLE}`);
  }
  return [...keys];
}

/** A save that replaced the whole graph (PUT) touches everything. */
export const EVERYTHING = "*";

const split = (key) => {
  const at = key.lastIndexOf("#");
  return { entity: key.slice(0, at), field: key.slice(at + 1) };
};

/**
 * True when two saves touched the same thing: the same field, or one of them
 * added or removed a part or wire the other one touched at all.
 */
export function overlaps(mine, theirs) {
  if (mine.includes(EVERYTHING) || theirs.includes(EVERYTHING)) return mine.length > 0 && theirs.length > 0;
  const theirFields = new Set(theirs);
  const theirEntities = new Map();
  for (const { entity, field } of theirs.map(split)) {
    theirEntities.set(entity, theirEntities.get(entity) === WHOLE ? WHOLE : field === WHOLE ? WHOLE : "some");
  }
  return mine.some((key) => {
    if (theirFields.has(key)) return true;
    const { entity, field } = split(key);
    const other = theirEntities.get(entity);
    return Boolean(other) && (field === WHOLE || other === WHOLE);
  });
}
