import { kindInfo } from "./nodeKinds";

// A lens is the vocabulary a map is drawn in: which parts the palette offers
// (and, on the server, which scan rules and questions apply). Parts already on
// a map stay valid when the lens changes. Ids mirror the backend's LENSES.

export const DEFAULT_LENS = "software";

export const LENSES = [
  {
    id: "software",
    title: "Software",
    palette: ["client", "server", "database", "cache", "queue", "worker", "external", "storage"],
  },
  {
    id: "data-storage",
    title: "Data storage",
    palette: ["server", "primary", "replica", "shard", "cache", "backup", "migration", "storage"],
  },
  {
    id: "data-ai",
    title: "Data and AI",
    palette: ["datasource", "pipeline", "featurestore", "model", "evaluation", "endpoint", "database", "storage", "client"],
  },
  {
    id: "security",
    title: "Security",
    palette: ["client", "entry", "firewall", "auth", "server", "database", "secrets", "external"],
  },
  {
    id: "infrastructure",
    title: "Infrastructure",
    palette: ["client", "dns", "loadbalancer", "container", "cluster", "cicd", "database", "storage"],
  },
];

export const isLens = (id) => LENSES.some((l) => l.id === id);
export const lensInfo = (id) => LENSES.find((l) => l.id === id) ?? LENSES[0];

/** The parts the palette offers for a lens, in the lens's own order. */
export const paletteFor = (lens) => lensInfo(lens).palette.map(kindInfo);
