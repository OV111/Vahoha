// The Project Map's saved shape, independent of React Flow's runtime fields
// (selection, measured size, replay status). Stage 2 sends this same object to
// the server, so keep it plain JSON.
//
//   { v: 1, nodes: [{ id, kind, title, sub, x, y, evidence?, note? }], edges: [{ id, source, target, sourceHandle, targetHandle, label, level?, evidence? }], repo?, lens? }
//
// `note` is the learner's explanation of the part (what it is, why it's there),
// shown only when the part is selected. Left out when blank, like `evidence`.
//
// `evidence` (repo file paths that prove a part exists) and `repo` ({ fullName, sha }
// of the scan they came from) are optional and left out when empty, so maps
// drawn by hand keep exactly the shape they had before repo scans. The same goes
// for `lens`: the default ("software") is never written, so older maps are unchanged.

import { DEFAULT_LENS, isLens } from "./lenses";
import { isKind, kindInfo } from "./nodeKinds";
import { GRAPH_VERSION, upcastGraph } from "./graphVersions";
export const MAX_NODES = 80;
export const MAX_EVIDENCE = 5;
export const MAX_NOTE = 1000; // mirrors MAX_NOTE in the backend's systemMap.schemas.js

// How sure the repo scan is of a wire. A wire the learner drew or confirmed has no level.
export const WIRE_LEVELS = ["guessed", "likely", "proven"]; // weakest first
const cleanLevel = (level) => (WIRE_LEVELS.includes(level) ? level : null);

/** A wire the scan is not sure of, waiting for the learner to confirm or delete it. */
export const isUnconfirmed = (edge) => edge.data?.level === "likely" || edge.data?.level === "guessed";

const STORAGE_KEY = "vahoha.projectMap.v1";
// "arrowclosed" is xyflow's MarkerType.ArrowClosed; the literal keeps xyflow out of the guest bundle.
const arrow = { type: "arrowclosed", color: "#6b7280" };

export const withArrow = (edge) => ({ ...edge, markerEnd: arrow });

const isRepoPath = (p) => typeof p === "string" && p.length > 0 && p.length <= 200 && !p.startsWith("/") && !p.split("/").includes("..");

/** Repo file paths a part was found in: valid ones only, at most MAX_EVIDENCE. */
export const cleanEvidence = (list) => (Array.isArray(list) ? [...new Set(list.filter(isRepoPath))].slice(0, MAX_EVIDENCE) : []);

/** The scan a map's evidence came from, or null when it isn't a real owner/repo at a commit. */
export const cleanRepo = (repo) =>
  repo && /^[\w.-]+\/[\w.-]+$/.test(repo.fullName ?? "") && /^[0-9a-f]{7,40}$/i.test(repo.sha ?? "")
    ? { fullName: repo.fullName, sha: repo.sha }
    : null;

/** Link to one evidence file on GitHub, at the commit that was scanned. */
export const evidenceUrl = (repo, path) => `https://github.com/${repo.fullName}/blob/${repo.sha}/${path}`;

// A wire's level and evidence, each left out when there is none.
function edgeProof(from) {
  const level = cleanLevel(from?.level);
  const evidence = cleanEvidence(from?.evidence);
  return { ...(level ? { level } : {}), ...(evidence.length ? { evidence } : {}) };
}

/** React Flow state -> the saved shape. */
export function toGraph(nodes, edges, repo = null, lens = DEFAULT_LENS) {
  const scanned = cleanRepo(repo);
  return {
    v: GRAPH_VERSION,
    nodes: nodes.map((n) => {
      const evidence = cleanEvidence(n.data.evidence);
      return {
        id: n.id,
        kind: n.data.kind,
        // Trimmed like the server stores them, so a trailing space mid-typing never reads as a change.
        title: (n.data.title ?? "").trim(),
        sub: (n.data.sub ?? "").trim(),
        x: Math.round(n.position.x),
        y: Math.round(n.position.y),
        ...(evidence.length ? { evidence } : {}),
        ...(n.data.note?.trim() ? { note: n.data.note.trim() } : {}),
      };
    }),
    edges: edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      // Saved sides stay right/bottom out and left/top in (the server checks this); the canvas
      // re-picks the sides it draws from where the parts are (lib/edgeRouting.js).
      sourceHandle: ["r", "b"].includes(e.sourceHandle) ? e.sourceHandle : "r",
      targetHandle: ["l", "t"].includes(e.targetHandle) ? e.targetHandle : "l",
      label: typeof e.label === "string" ? e.label.trim() : "",
      ...edgeProof(e.data),
    })),
    ...(scanned ? { repo: scanned } : {}),
    ...(isLens(lens) && lens !== DEFAULT_LENS ? { lens } : {}),
  };
}

const text = (value, max) => (typeof value === "string" ? value.slice(0, max) : "");

/**
 * The saved shape -> React Flow state, or null when the input is not a map.
 * Defensive on purpose: the input is a file the learner imported or text read
 * back from localStorage, so nothing in it is trusted.
 */
export function fromGraph(input) {
  const graph = upcastGraph(input);
  if (!graph || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) return null;

  const nodes = graph.nodes.slice(0, MAX_NODES).flatMap((n) => {
    if (!n || typeof n.id !== "string" || !n.id) return [];
    const kind = isKind(n.kind) ? n.kind : "server";
    const evidence = cleanEvidence(n.evidence);
    return [
      {
        id: n.id,
        type: "system",
        position: { x: Number(n.x) || 0, y: Number(n.y) || 0 },
        data: {
          kind,
          title: text(n.title, 40) || kindInfo(kind).label,
          sub: text(n.sub, 60),
          ...(evidence.length ? { evidence } : {}),
          ...(text(n.note, MAX_NOTE).trim() ? { note: text(n.note, MAX_NOTE) } : {}),
        },
      },
    ];
  });

  const ids = new Set(nodes.map((n) => n.id));
  const edges = graph.edges.flatMap((e) => {
    if (!e || typeof e.id !== "string" || !ids.has(e.source) || !ids.has(e.target)) return [];
    return [
      withArrow({
        id: e.id,
        source: e.source,
        target: e.target,
        sourceHandle: ["r", "b"].includes(e.sourceHandle) ? e.sourceHandle : "r",
        targetHandle: ["l", "t"].includes(e.targetHandle) ? e.targetHandle : "l",
        ...(text(e.label, 30) ? { label: text(e.label, 30) } : {}),
        data: edgeProof(e),
      }),
    ];
  });

  const repo = cleanRepo(graph.repo);
  return { nodes, edges, lens: isLens(graph.lens) ? graph.lens : DEFAULT_LENS, ...(repo ? { repo } : {}) };
}

const SLOT = { w: 220, h: 110 }; // a bit larger than a node, so neighbours never touch

/** The free position closest to `center`, searching outward in rings of node-sized slots. */
export function freeSpot(nodes, center) {
  const taken = (p) => nodes.some((n) => Math.abs(n.position.x - p.x) < SLOT.w * 0.9 && Math.abs(n.position.y - p.y) < SLOT.h * 0.8);
  for (let ring = 0; ring < 10; ring++) {
    for (let i = -ring; i <= ring; i++) {
      for (let j = -ring; j <= ring; j++) {
        if (Math.max(Math.abs(i), Math.abs(j)) !== ring) continue;
        const spot = { x: center.x + i * SLOT.w, y: center.y + j * SLOT.h };
        if (!taken(spot)) return spot;
      }
    }
  }
  return center;
}

/**
 * The map a learner starts with, so the canvas is never empty: traffic filtered
 * and spread over two servers, reads cached, slow work handed to a queue. withoutExample knows these
 * parts by id, title and sub, so changing one leaves it on maps saved before.
 */
export const EXAMPLE_GRAPH = {
  v: GRAPH_VERSION,
  nodes: [
    { id: "client", kind: "client", title: "Web app", sub: "React", x: 0, y: 165 },
    { id: "firewall", kind: "firewall", title: "Firewall", sub: "blocks bad requests", x: 240, y: 165 },
    { id: "lb", kind: "loadbalancer", title: "Load balancer", sub: "spreads traffic", x: 480, y: 165 },
    { id: "api", kind: "server", title: "API server", sub: "Express", x: 720, y: 90 },
    { id: "api2", kind: "server", title: "API server 2", sub: "Express", x: 720, y: 240 },
    { id: "cache", kind: "cache", title: "Cache", sub: "Redis", x: 960, y: 0 },
    { id: "db", kind: "database", title: "Database", sub: "MongoDB", x: 960, y: 165 },
    { id: "queue", kind: "queue", title: "Queue", sub: "BullMQ", x: 960, y: 330 },
    { id: "worker", kind: "worker", title: "Worker", sub: "runs jobs", x: 1200, y: 330 },
    { id: "email", kind: "external", title: "Email service", sub: "sends emails", x: 1440, y: 220 },
    { id: "files", kind: "storage", title: "File storage", sub: "images, uploads", x: 1440, y: 440 },
  ],
  edges: [
    { id: "e-client-firewall", source: "client", target: "firewall", sourceHandle: "r", targetHandle: "l", label: "HTTPS" },
    { id: "e-firewall-lb", source: "firewall", target: "lb", sourceHandle: "r", targetHandle: "l", label: "allowed" },
    { id: "e-lb-api", source: "lb", target: "api", sourceHandle: "r", targetHandle: "l", label: "HTTP" },
    { id: "e-lb-api2", source: "lb", target: "api2", sourceHandle: "r", targetHandle: "l", label: "HTTP" },
    { id: "e-api-cache", source: "api", target: "cache", sourceHandle: "r", targetHandle: "l", label: "hot reads" },
    { id: "e-api2-cache", source: "api2", target: "cache", sourceHandle: "r", targetHandle: "l", label: "" },
    { id: "e-api-db", source: "api", target: "db", sourceHandle: "r", targetHandle: "l", label: "queries" },
    { id: "e-api2-db", source: "api2", target: "db", sourceHandle: "r", targetHandle: "l", label: "" },
    { id: "e-api-queue", source: "api", target: "queue", sourceHandle: "r", targetHandle: "l", label: "jobs" },
    { id: "e-api2-queue", source: "api2", target: "queue", sourceHandle: "r", targetHandle: "l", label: "" },
    { id: "e-queue-worker", source: "queue", target: "worker", sourceHandle: "r", targetHandle: "l", label: "jobs" },
    { id: "e-worker-email", source: "worker", target: "email", sourceHandle: "r", targetHandle: "l", label: "sends" },
    { id: "e-worker-files", source: "worker", target: "files", sourceHandle: "r", targetHandle: "l", label: "saves" },
  ],
};

/**
 * The map without the starter parts the learner never made their own: not
 * renamed, retyped or explained, and not wired by hand to a part of theirs.
 * A repo scan replaces those, so only the repo's parts are left.
 */
export function withoutExample(nodes, edges) {
  const starter = new Map(EXAMPLE_GRAPH.nodes.map((n) => [n.id, n]));
  const untouched = ({ id, data }) => {
    const s = starter.get(id);
    return Boolean(s) && data.kind === s.kind && data.title === s.title && data.sub === s.sub && !data.note?.trim();
  };
  const candidates = new Set(nodes.filter(untouched).map((n) => n.id));
  // Wires with a level came from a scan, so they don't make a starter part the learner's.
  const handWired = edges.filter((e) => !e.data?.level && candidates.has(e.source) !== candidates.has(e.target)).flatMap((e) => [e.source, e.target]);
  for (const id of handWired) candidates.delete(id);
  return {
    nodes: nodes.filter((n) => !candidates.has(n.id)),
    edges: edges.filter((e) => !candidates.has(e.source) && !candidates.has(e.target)),
  };
}

/** Reads the saved map from the browser, or null when there is none. */
export function loadSaved(storage = globalThis.localStorage) {
  try {
    return fromGraph(JSON.parse(storage.getItem(STORAGE_KEY)));
  } catch {
    return null; // private window, blocked storage, or corrupt text
  }
}

/** Forgets the browser copy, once the map lives in the learner's account. */
export function clearSaved(storage = globalThis.localStorage) {
  try {
    storage.removeItem(STORAGE_KEY);
  } catch {
    // Blocked storage: there is nothing to forget.
  }
}

export function save(nodes, edges, repo = null, lens = DEFAULT_LENS, storage = globalThis.localStorage) {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(toGraph(nodes, edges, repo, lens)));
  } catch {
    // Storage full or blocked: the map still works, it just won't survive a reload.
  }
}
