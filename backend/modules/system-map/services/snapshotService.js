import { ObjectId } from "mongodb";

const COLLECTION = "system_maps";
const MAX_SHARED_MAPS = 20;

/*
 * Read-only views of maps for OTHER modules' public pages. Everything here
 * returns a whitelisted copy, never the stored document, so a field added to
 * system_maps later (owner ids, drift state, revisions) can't leak by accident.
 */

const keep = (source, keys) => Object.fromEntries(keys.filter((k) => source[k] !== undefined).map((k) => [k, source[k]]));

// Mirrors the saved graph shape (see schemas/systemMap.schemas.js). `evidence`
// stays: it is the repo proof a recruiter is meant to see.
const publicGraph = (graph) => ({
  ...keep(graph, ["v", "lens", "repo"]),
  nodes: (graph.nodes ?? []).map((n) => keep(n, ["id", "kind", "title", "sub", "x", "y", "evidence"])),
  edges: (graph.edges ?? []).map((e) => keep(e, ["id", "source", "target", "sourceHandle", "targetHandle", "label"])),
});

/**
 * The team's map as the public team-evidence page shows it, or null.
 * Team maps are never public on their own: they only reach the public through
 * the evidence snapshot, which an admin issues (that is the consent step).
 * @returns {Promise<{ title: string, lens: string, graph: object, updatedAt: Date } | null>}
 */
export async function getTeamMapSnapshot(db, teamId) {
  const doc = await db
    .collection(COLLECTION)
    .findOne({ ownerType: "team", ownerId: String(teamId) }, { sort: { updatedAt: -1 } });
  if (!doc?.graph) return null;
  return { title: doc.title, lens: doc.graph.lens ?? "software", graph: publicGraph(doc.graph), updatedAt: doc.updatedAt };
}

/**
 * A learner's capstone maps they chose to share, for their recruiter scorecard.
 * @returns {Promise<{ trackId: string, title: string, publicId: string, updatedAt: Date }[]>}
 */
export async function listSharedCapstoneMaps(db, userId) {
  const docs = await db
    .collection(COLLECTION)
    .find(
      { userId: new ObjectId(userId), ownerType: "capstone", shared: true, publicId: { $type: "string" } },
      { projection: { ownerId: 1, title: 1, publicId: 1, updatedAt: 1 } },
    )
    .sort({ updatedAt: -1 })
    .limit(MAX_SHARED_MAPS)
    .toArray();
  return docs.map((d) => ({ trackId: d.ownerId, title: d.title, publicId: d.publicId, updatedAt: d.updatedAt }));
}
