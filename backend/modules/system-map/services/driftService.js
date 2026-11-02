import { ObjectId } from "mongodb";
import { findHints } from "../lib/driftRules.js";
import { canAccessMap } from "./ownerAccess.js";
import { MAPS as COLLECTION } from "./systemMapData.js";

/** Newest hints win when a map has been ignored for a long time. */
export const MAX_DRIFT_HINTS = 20;

const hintKey = (h) => `${h.prNumber}:${h.path}`;

/**
 * Records that merged PRs touched things a team's map depends on.
 * Called by the contribution sync with ONLY the PRs that sync stored, so a
 * re-sync never re-flags old history. Drift is advice, not a graph edit: it
 * changes neither `revision` nor `updatedAt`.
 *
 * @param {string|ObjectId} teamId
 * @param {{ prNumber: number, changedFiles: { path: string }[] }[]} contributions
 * @returns {Promise<number>} how many maps now carry new hints
 */
export async function flagMapDrift(db, teamId, contributions) {
  const maps = db.collection(COLLECTION);
  const docs = await maps.find({ ownerType: "team", ownerId: String(teamId) }).toArray();
  let flagged = 0;

  for (const doc of docs) {
    const incoming = contributions.flatMap((c) => findHints(c.changedFiles, doc.graph).map((h) => ({ prNumber: c.prNumber, ...h })));
    const existing = doc.drift?.hints ?? [];
    const seen = new Set(existing.map(hintKey));
    const fresh = incoming.filter((h) => !seen.has(hintKey(h)) && seen.add(hintKey(h)));
    if (!fresh.length) continue;

    await maps.updateOne(
      { _id: doc._id },
      { $set: { drift: { since: doc.drift?.since ?? new Date(), hints: [...existing, ...fresh].slice(-MAX_DRIFT_HINTS) } } },
    );
    flagged += 1;
  }
  return flagged;
}

/** @returns {Promise<boolean>} false when the map doesn't exist or isn't this user's to touch */
export async function dismissDrift(db, mapId, userId, canAccess = canAccessMap) {
  const maps = db.collection(COLLECTION);
  const doc = await maps.findOne({ _id: new ObjectId(mapId) });
  if (!doc || !(await canAccess(db, doc, userId))) return false;
  await maps.updateOne({ _id: doc._id }, { $set: { drift: null } });
  return true;
}
