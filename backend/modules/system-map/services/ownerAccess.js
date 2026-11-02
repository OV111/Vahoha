/*
 * Who may open a map.
 *   personal, capstone: the creator (doc.userId).
 *   team:               any ACTIVE member of that team.
 *
 * Team membership and capstone attempts belong to those modules, so they are
 * asked through their public entry points rather than read here.
 */

import { hasCapstoneAttempt } from "../../capstone/index.js";
import { isActiveTeamMember } from "../../teams/index.js";

export const OWNER_TYPES = ["capstone", "team"];

/** A map without ownerType was made before stage 5: it is personal. */
export const ownerTypeOf = (doc) => doc.ownerType ?? "personal";

/** Whether this learner may read or save this map document. */
export async function canAccessMap(db, doc, userId) {
  if (ownerTypeOf(doc) === "team") return isActiveTeamMember(db, doc.ownerId, userId);
  return doc.userId.equals(userId);
}

/** Whether this learner may have a map for this capstone track or team at all. */
export async function isEligibleForOwner(db, ownerType, ownerId, userId) {
  if (ownerType === "team") return isActiveTeamMember(db, ownerId, userId);
  return hasCapstoneAttempt(db, userId, ownerId);
}
