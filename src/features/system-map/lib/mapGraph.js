// The Project Map's saved shape, independent of React Flow's runtime fields
// (selection, measured size, replay status). Stage 2 sends this same object to
// the server, so keep it plain JSON.
//
//   { v: 1, nodes: [{ id, kind, title, sub, x, y, evidence? }], edges: [{ id, source, target, sourceHandle, targetHandle, label }], repo?, lens? }
//
// `evidence` (repo file paths that prove a part exists) and `repo` ({ fullName, sha }
// of the scan they came from) are optional and left out when empty, so maps
// drawn by hand keep exactly the shape they had before repo scans. The same goes
// for `lens`: the default ("software") is never written, so older maps are unchanged.

import { MarkerType } from "@xyflow/react";
import { DEFAULT_LENS, isLens } from "./lenses";
import { isKind, kindInfo } from "./nodeKinds";

export const GRAPH_VERSION = 1;
export const MAX_NODES = 80;
export const MAX_EVIDENCE = 5;

const STORAGE_KEY = "vahoha.projectMap.v1";
const arrow = { type: MarkerType.ArrowClosed, color: "#6b7280" };

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
        title: n.data.title,
        sub: n.data.sub,
        x: Math.round(n.position.x),
        y: Math.round(n.position.y),
        ...(evidence.length ? { evidence } : {}),
      };
    }),
    edges: edges.map((e) => ({
      id: e.id,
      source: e.source,
      target: e.target,
      sourceHandle: e.sourceHandle ?? "r",
      targetHandle: e.targetHandle ?? "l",
      label: typeof e.label === "string" ? e.label : "",
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
export function fromGraph(graph) {
  if (!graph || graph.v !== GRAPH_VERSION || !Array.isArray(graph.nodes) || !Array.isArray(graph.edges)) return null;

  const nodes = graph.nodes.slice(0, MAX_NODES).flatMap((n) => {
    if (!n || typeof n.id !== "string" || !n.id) return [];
    const kind = isKind(n.kind) ? n.kind : "server";
    const evidence = cleanEvidence(n.evidence);
    return [
      {
        id: n.id,
        type: "system",
        position: { x: Number(n.x) || 0, y: Number(n.y) || 0 },
        data: { kind, title: text(n.title, 40) || kindInfo(kind).label, sub: text(n.sub, 60), ...(evidence.length ? { evidence } : {}) },
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

/** The map a learner starts with, so the canvas is never empty. */
export const EXAMPLE_GRAPH = {
  v: GRAPH_VERSION,
  nodes: [
    { id: "client", kind: "client", title: "Web app", sub: "React", x: 0, y: 90 },
    { id: "api", kind: "server", title: "API server", sub: "Express", x: 280, y: 90 },
    { id: "db", kind: "database", title: "Database", sub: "MongoDB", x: 560, y: 0 },
    { id: "cache", kind: "cache", title: "Cache", sub: "Redis", x: 560, y: 190 },
  ],
  edges: [
    { id: "e-client-api", source: "client", target: "api", sourceHandle: "r", targetHandle: "l", label: "HTTP" },
    { id: "e-api-db", source: "api", target: "db", sourceHandle: "r", targetHandle: "l", label: "queries" },
    { id: "e-api-cache", source: "api", target: "cache", sourceHandle: "r", targetHandle: "l", label: "hot reads" },
  ],
};

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
