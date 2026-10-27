import { ObjectId } from "mongodb";

/*
 * Who may open a map.
 *   personal, capstone: the creator (doc.userId).
 *   team:               any ACTIVE member of that team.
 *
 * Reads the `teams` and `capstone_attempts` collections directly. The teams
 * module exports no membership helper, so this mirrors the shapes documented
 * in modules/teams/services/teamsData.js:
 *   teams:             { members: [{ userId, status: "invited"|"active"|"left" }] }
 *   capstone_attempts: { userId, trackId }
 */

export const OWNER_TYPES = ["capstone", "team"];

/** A map without ownerType was made before stage 5: it is personal. */
export const ownerTypeOf = (doc) => doc.ownerType ?? "personal";

export async function isActiveTeamMember(db, teamId, userId) {
  const team = await db
    .collection("teams")
    .findOne({ _id: new ObjectId(teamId), members: { $elemMatch: { userId, status: "active" } } }, { projection: { _id: 1 } });
  return Boolean(team);
}

/** Whether this learner may read or save this map document. */
export async function canAccessMap(db, doc, userId) {
  if (ownerTypeOf(doc) === "team") return isActiveTeamMember(db, doc.ownerId, userId);
  return doc.userId.equals(userId);
}

/** Whether this learner may have a map for this capstone track or team at all. */
export async function isEligibleForOwner(db, ownerType, ownerId, userId) {
  if (ownerType === "team") return isActiveTeamMember(db, ownerId, userId);
  return Boolean(await db.collection("capstone_attempts").findOne({ userId, trackId: ownerId }, { projection: { _id: 1 } }));
}
