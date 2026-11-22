import { z } from "zod";
import { LENSES } from "../lib/lenses.js";

// Mirrors NODE_KINDS in src/features/system-map/lib/nodeKinds.js and the limits
// in src/features/system-map/lib/mapGraph.js. Change them together.
export const NODE_KINDS = [
  "client", "server", "database", "cache", "queue", "worker", "external", "storage", "memory", "disk",
  // data storage
  "primary", "replica", "shard", "backup", "migration",
  // data and AI
  "datasource", "pipeline", "featurestore", "model", "evaluation", "endpoint",
  // security
  "entry", "auth", "secrets", "firewall",
  // infrastructure
  "loadbalancer", "container", "cicd", "cluster", "dns",
];
export const MAX_NODES = 80;
export const MAX_EDGES = 200;

const objectId = z.string().regex(/^[a-f0-9]{24}$/, "Invalid id");
const localId = z.string().min(1).max(40);
const coordinate = z.number().finite().min(-100000).max(100000);

// A repo-relative file path that proves a part exists (stage 4 scan). Shown as a
// link to GitHub, so it must never climb out of the repo or look absolute.
export const evidencePath = z
  .string()
  .min(1)
  .max(200)
  .refine((p) => !p.startsWith("/") && !p.includes("\\") && !p.split("/").includes(".."), "Invalid evidence path");

export const MAX_EVIDENCE = 5;
export const MAX_NOTE = 1000; // mirrors MAX_NOTE in src/features/system-map/lib/mapGraph.js

const nodeSchema = z.object({
  id: localId,
  kind: z.enum(NODE_KINDS),
  title: z.string().trim().max(40),
  sub: z.string().trim().max(60),
  x: coordinate,
  y: coordinate,
  evidence: z.array(evidencePath).max(MAX_EVIDENCE).optional(),
  // What the part is and why it's on the map, in the learner's words. Shown when the part is clicked.
  note: z.string().trim().max(MAX_NOTE).optional(),
});

const edgeSchema = z.object({
  id: localId,
  source: localId,
  target: localId,
  sourceHandle: z.enum(["r", "b"]),
  targetHandle: z.enum(["l", "t"]),
  label: z.string().trim().max(30),
});

const hasUnique = (items) => new Set(items.map((i) => i.id)).size === items.length;

// The repo commit the evidence paths were read from (stage 4 scan).
const repoSchema = z.object({
  fullName: z.string().regex(/^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}$/, "Invalid repo"),
  sha: z.string().regex(/^[a-f0-9]{7,40}$/, "Invalid commit"),
});

// The saved graph, exactly as the editor's toGraph() produces it. Wires must
// point at parts that exist, so a stored map can never render with a dangling wire.
// `v` is GRAPH_VERSION in lib/graphVersions.js.
export const graphSchema = z
  .object({
    v: z.literal(1),
    nodes: z.array(nodeSchema).max(MAX_NODES),
    edges: z.array(edgeSchema).max(MAX_EDGES),
    // Which vocabulary the map is drawn in (lib/lenses.js). A map without one is a software map.
    lens: z.enum(LENSES).optional(),
    repo: repoSchema.optional(),
  })
  .refine((g) => hasUnique(g.nodes), { message: "Part ids must be unique", path: ["nodes"] })
  .refine((g) => hasUnique(g.edges), { message: "Wire ids must be unique", path: ["edges"] })
  .refine(
    (g) => {
      const ids = new Set(g.nodes.map((n) => n.id));
      return g.edges.every((e) => ids.has(e.source) && ids.has(e.target));
    },
    { message: "Every wire must connect two existing parts", path: ["edges"] },
  );

const title = z.string().trim().min(1).max(80);

export const mapParamSchema = z.object({ id: objectId });

// GET /api/system-maps/public/:publicId (12 base64url characters)
export const publicParamSchema = z.object({ publicId: z.string().regex(/^[A-Za-z0-9_-]{12}$/, "Invalid link") });

// PUT /api/system-maps/:id/sharing
export const sharingBodySchema = z.object({ shared: z.boolean() });

// POST /api/system-maps/scan. The URL is parsed again with the capstone's
// strict parser (the SSRF guard); this only bounds its size.
export const scanBodySchema = z.object({
  repoUrl: z.string().trim().min(1).max(300),
  lens: z.enum(LENSES).default("software"),
});

// POST /api/system-maps
export const createBodySchema = z.object({ title, graph: graphSchema });

// PUT /api/system-maps/:id. `revision` is the version the client last saw: the
// save is refused if another tab saved since (optimistic concurrency).
export const updateBodySchema = z.object({
  title: title.optional(),
  graph: graphSchema,
  revision: z.number().int().min(1),
});

// Enough to replace a full map (80 parts and 200 wires out, the same back in).
export const MAX_OPS = 600;

// One edit (lib/graphOps.js). Each op's fields are checked here; the graph they
// produce is checked again with graphSchema after they are applied.
const opSchema = z.discriminatedUnion("op", [
  z.object({ op: z.literal("addNode"), node: nodeSchema }),
  z.object({ op: z.literal("removeNode"), id: localId }),
  z.object({
    op: z.literal("updateNode"),
    id: localId,
    set: nodeSchema.omit({ id: true }).partial().strict(),
    unset: z.array(z.enum(["evidence", "note"])).max(2).optional(),
  }),
  z.object({ op: z.literal("addEdge"), edge: edgeSchema }),
  z.object({ op: z.literal("removeEdge"), id: localId }),
  z.object({ op: z.literal("updateEdge"), id: localId, set: edgeSchema.omit({ id: true }).partial().strict() }),
  z.object({
    op: z.literal("setMeta"),
    set: z.object({ lens: z.enum(LENSES), repo: repoSchema }).partial().strict(),
    unset: z.array(z.enum(["lens", "repo"])).max(2).optional(),
  }),
]);

// Saves that jump a long way. The map as it was just before is kept as a version.
export const SAVE_REASONS = ["scan", "import", "reset", "restore"];

// PATCH /api/system-maps/:id/ops. `revision` is the version the ops were diffed
// against: when it is old, the server merges them unless someone touched the same thing.
export const opsBodySchema = z.object({
  revision: z.number().int().min(1),
  ops: z.array(opSchema).min(1).max(MAX_OPS),
  reason: z.enum(SAVE_REASONS).optional(),
});

// GET /api/system-maps/:id/versions/:versionId
export const versionParamSchema = z.object({ id: objectId, versionId: objectId });
