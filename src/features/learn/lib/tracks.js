import { buildCatalog } from "@/features/roadmap/lib/catalog";

// ~170 tracks: building the catalog once is cheaper than threading the domain
// through every URL, and it keeps the learn URLs short (/learn/mern/mern-3).
const CATALOG = buildCatalog();

/** The track tagged with its domain, or null for an unknown id. */
export const findTrack = (trackId) => CATALOG.find((t) => t.id === trackId) ?? null;
