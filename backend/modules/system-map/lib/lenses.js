// Lenses: the vocabulary a Project Map is drawn in. The canvas, saving, sharing
// and the AI check are the same for every lens; a lens decides which part kinds
// the learner can add and what the repo scan looks for.
//
// Mirrors src/features/system-map/lib/lenses.js. Change them together.

export const LENSES = ["software", "data-storage", "data-ai", "security", "infrastructure"];
export const DEFAULT_LENS = "software";

// The part kinds each lens offers (and the scan may produce). A kind can belong
// to several lenses; the global list of kinds is NODE_KINDS in the schemas.
export const LENS_KINDS = {
  software: ["client", "mobile", "cdn", "firewall", "ratelimiter", "loadbalancer", "gateway", "server", "websocket", "database", "cache", "search", "vectordb", "queue", "eventbus", "worker", "scheduler", "external", "storage", "monitoring"],
  "data-storage": ["server", "primary", "replica", "shard", "cache", "search", "warehouse", "backup", "migration", "storage"],
  "data-ai": ["datasource", "pipeline", "scheduler", "featurestore", "vectordb", "model", "evaluation", "endpoint", "database", "warehouse", "storage", "client"],
  security: ["client", "mobile", "entry", "firewall", "ratelimiter", "gateway", "auth", "server", "database", "secrets", "external"],
  infrastructure: ["client", "dns", "cdn", "loadbalancer", "gateway", "registry", "container", "cluster", "cicd", "monitoring", "database", "storage"],
};

export const isLens = (value) => LENSES.includes(value);
