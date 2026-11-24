// How each kind of part looks in the Project Map's 3D view
// (src/features/system-map/components/IsoShapes.jsx draws them). Every concept
// gets its own silhouette, so a server, a shard and a firewall never read as the
// same block. Colour still comes from the part's family (nodeKinds.js).

// Sizes are in floor tiles (half = centre to edge) and pixels (height).
// `extra` is how far a shape pokes above its height (a dome, a shield),
// so its floating pill clears it. `floor: true` shapes lie under the request dots.
export const ISO_SHAPES = {
  box: { half: 2, height: 40 },
  tower: { half: 1.5, height: 66 }, // a server rack, slots on the sides
  cylinder: { half: 1.9, height: 44 }, // a database
  discs: { half: 1.8, height: 50 }, // slices of one database, stacked apart
  wall: { half: 2.8, depth: 0.7, height: 32 }, // bricks across the flow
  puck: { half: 2.2, height: 16 }, // low and wide: traffic passes through
  pyramid: { half: 2.1, height: 58 }, // a model
  cluster: { half: 2.2, height: 30 }, // four small machines
  queue: { half: 2.6, height: 22 }, // boxes waiting in a line
  container: { half: 2.5, depth: 1.1, height: 30 }, // a shipping container, ribbed
  vault: { half: 1.8, height: 40 }, // a safe with a dial
  shield: { half: 1.6, height: 10, extra: 26 }, // an upright shield on a plinth
  balancer: { half: 2.3, base: 12, height: 26 }, // a hub with spokes fanning out
  dome: { half: 1.9, height: 22, extra: 26 }, // somewhere outside your system
  machine: { half: 3.4, depth: 1.5, height: 38 }, // jobs ride a belt through it
  archive: { half: 1.9, base: 30, height: 40 }, // a lidded box you can restore from
  slab: { half: 2.4, height: 12 }, // flat storage
  gate: { half: 2, height: 46 }, // two pillars and a beam
  arches: { half: 2.5, depth: 1.5, height: 36 }, // one building, a doorway per service
  cabinet: { half: 1.8, height: 46 }, // drawers with a label each
  bus: { half: 3.2, depth: 1.4, height: 28 }, // a long bar with a port for every reader
  screen: { half: 2.5, depth: 0.5, height: 54 }, // a wall screen with a chart
  points: { half: 1.9, height: 44 }, // a store of points, near ones joined
  warehouse: { half: 2.4, depth: 1.8, height: 26, extra: 10, roof: 18 }, // pitched roof and a roller door
  // A stand with the thing itself on it: `plain` leaves out the icon, the drawing is one.
  phone: { half: 1.8, height: 8, extra: 22, plain: true },
  globe: { half: 1.8, height: 8, extra: 22, plain: true },
  gauge: { half: 1.8, height: 8, extra: 8, plain: true },
  mast: { half: 1.8, height: 10, extra: 26, plain: true },
  lens: { half: 1.8, height: 8, extra: 24, plain: true },
  clock: { half: 1.8, height: 8, extra: 22, plain: true },
  answer: { half: 1.8, height: 8, extra: 24, plain: true },
  transfer: { half: 2.1, height: 8, extra: 18, plain: true }, // old store to new store
  crowd: { half: 2.6, height: 6, floor: true }, // the users
};

export const KIND_SHAPES = {
  client: "crowd",
  server: "tower",
  worker: "machine",
  container: "container",
  cluster: "cluster",
  endpoint: "answer",
  cicd: "queue",
  database: "cylinder",
  primary: "cylinder",
  replica: "cylinder",
  shard: "discs",
  backup: "archive",
  migration: "transfer",
  storage: "slab",
  disk: "slab",
  memory: "puck",
  cache: "puck",
  queue: "queue",
  pipeline: "queue",
  datasource: "cylinder",
  featurestore: "cluster",
  model: "pyramid",
  evaluation: "box",
  entry: "gate",
  dns: "gate",
  loadbalancer: "balancer",
  firewall: "wall",
  auth: "shield",
  secrets: "vault",
  external: "dome",
  mobile: "phone",
  cdn: "globe",
  gateway: "arches",
  ratelimiter: "gauge",
  websocket: "mast",
  eventbus: "bus",
  scheduler: "clock",
  search: "lens",
  vectordb: "points",
  warehouse: "warehouse",
  monitoring: "screen",
  registry: "cabinet",
};

export const shapeOf = (kind) => {
  const name = KIND_SHAPES[kind] ?? "box";
  return { name, ...ISO_SHAPES[name] };
};

// A part whose status is "bad" is drawn grey with a red cross and a DOWN badge.
export const DEAD_COLOR = "#525252";
export const isDown = (node) => node.data.status?.tone === "bad";
