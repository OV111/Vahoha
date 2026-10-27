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
  software: ["client", "server", "database", "cache", "queue", "worker", "external", "storage"],
  "data-storage": ["server", "primary", "replica", "shard", "cache", "backup", "migration", "storage"],
  "data-ai": ["datasource", "pipeline", "featurestore", "model", "evaluation", "endpoint", "database", "storage", "client"],
  security: ["client", "entry", "firewall", "auth", "server", "database", "secrets", "external"],
  infrastructure: ["client", "dns", "loadbalancer", "container", "cluster", "cicd", "database", "storage"],
};

export const isLens = (value) => LENSES.includes(value);
