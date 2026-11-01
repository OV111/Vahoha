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

// The saved graph, exactly as the editor's toGraph() produces it. Wires must
// point at parts that exist, so a stored map can never render with a dangling wire.
export const graphSchema = z
  .object({
    v: z.literal(1),
    nodes: z.array(nodeSchema).max(MAX_NODES),
    edges: z.array(edgeSchema).max(MAX_EDGES),
    // Which vocabulary the map is drawn in (lib/lenses.js). A map without one is a software map.
    lens: z.enum(LENSES).optional(),
    // The repo commit the evidence paths were read from (stage 4 scan).
    repo: z
      .object({
        fullName: z.string().regex(/^[A-Za-z0-9-]{1,39}\/[A-Za-z0-9._-]{1,100}$/, "Invalid repo"),
        sha: z.string().regex(/^[a-f0-9]{7,40}$/, "Invalid commit"),
      })
      .optional(),
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
