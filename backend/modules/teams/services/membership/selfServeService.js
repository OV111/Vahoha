/**
 * Self-serve teams: a learner who passed a capstone (any track) and connected
 * GitHub starts a team on any roadmap track, joins ones that are forming (as
 * many as MAX_RUNNING_TEAMS allows; null = no limit), sets its repo, starts the project or
 * leaves, with no admin step. The admin still sees every team, can remove
 * members, and alone issues the public evidence page.
 *
 * The GitHub login always comes from the user's own GitHub sign-in
 * (users.githubLogin), never from the request, so nobody can claim another
 * person's pull requests.
 */

import { ObjectId } from "mongodb";
import { listPassedTracks } from "../../../capstone/index.js";
import { parseRepoUrl } from "../../../capstone/index.js";
import { MAX_TEAM_MEMBERS } from "../../../../../constants/teams.js";
import {
  RUNNING_STATUSES,
  beginRefusal,
  canManageSetup,
  eligibilityRefusal,
  joinRefusal,
  leaveRefusal,
  repoOwnerRefusal,
} from "../../lib/membership.js";
import { TEAMS, ensureIndexes } from "../teamsData.js";
import { fail } from "../../../../utils/httpErrors.js";
import { addMemberService, createTeamService, isAdmin, removeMemberService, setRepoService, setStatusService } from "../team/teamsService.js";

const countRunningTeams = (db, uid) =>
  db.collection(TEAMS).countDocuments({ status: { $in: RUNNING_STATUSES }, members: { $elemMatch: { userId: uid, status: "active" } } });

const whoAmI = async (db, userId) => {
  const uid = new ObjectId(userId);
  const [user, passedTracks, runningTeams] = await Promise.all([
    db.collection("users").findOne({ _id: uid }, { projection: { githubLogin: 1 } }),
    listPassedTracks(db, uid),
    countRunningTeams(db, uid),
  ]);
  return { uid, githubLogin: user?.githubLogin ?? null, passedTracks, runningTeams };
};

// Every roadmap track a team can be built on. Any passed capstone opens Teams;
// the team's track is a choice, so a backend-proven learner can grow in frontend.
// Sorted like the roadmap catalog (domain, then the track's place in it), so the
// picker can group them by domain.
const allTracks = (db) =>
  db
    .collection("roadmap_tracks")
    .find({}, { projection: { _id: 0, trackId: 1, title: 1, categoryId: 1, order: 1 } })
    .sort({ categoryId: 1, order: 1 })
    .limit(500)
    .toArray();

/** GET /api/teams/me/eligibility: what the no-team page shows, with the tracks to pick from. */
export const getEligibilityService = async (db, userId) => {
  const [me, tracks] = await Promise.all([whoAmI(db, userId), allTracks(db)]);
  const passed = new Set(me.passedTracks.map((t) => t.trackId));
  return {
    githubLogin: me.githubLogin,
    passedTracks: me.passedTracks,
    tracks: tracks.map((t) => ({
      trackId: t.trackId,
      trackTitle: t.title ?? t.trackId,
      categoryId: t.categoryId ?? null,
      passed: passed.has(t.trackId),
    })),
    runningTeams: me.runningTeams,
    refusal: eligibilityRefusal(me),
  };
};

const assertEligible = async (db, userId) => {
  await ensureIndexes(db);
  const me = await whoAmI(db, userId);
  const refusal = eligibilityRefusal(me);
  if (refusal) fail(409, refusal);
  return me;
};

/** POST /api/teams/start: the starter becomes the first member. */
export const startTeamService = async (db, user, { name, trackId }) => {
  const me = await assertEligible(db, user._id);
  const known =
    me.passedTracks.some((t) => t.trackId === trackId) ||
    Boolean(await db.collection("roadmap_tracks").findOne({ trackId }, { projection: { _id: 1 } }));
  if (!known) fail(400, "Pick one of the roadmap tracks");

  const teamId = new ObjectId();
  try {
    await createTeamService(db, { name, trackId }, { createdBy: me.uid, _id: teamId });
    return await addMemberService(db, String(teamId), { userId: String(me.uid), githubLogin: me.githubLogin });
  } catch (err) {
    await db.collection(TEAMS).deleteOne({ _id: teamId, "members.0": { $exists: false } }); // only if it never got its first member
    throw err;
  }
};

/** GET /api/teams/open: teams that are forming and have room. */
export const listOpenTeamsService = async (db, viewerId, { track } = {}) => {
  const filter = { status: "forming" };
  if (track) filter.trackId = track;
  const teams = await db
    .collection(TEAMS)
    .find(filter, { projection: { name: 1, trackId: 1, members: 1, repo: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(50)
    .toArray();
  return teams
    .map((t) => {
      const active = t.members.filter((m) => m.status === "active");
      return {
        _id: t._id,
        name: t.name,
        trackId: t.trackId,
        hasRepo: Boolean(t.repo),
        memberCount: active.length,
        members: active.map((m) => m.githubLogin),
        joined: active.some((m) => String(m.userId) === String(viewerId)),
        createdAt: t.createdAt,
      };
    })
    // Room counts active members only: people who left stay in the array for their history.
    .filter((t) => t.memberCount > 0 && t.memberCount < MAX_TEAM_MEMBERS);
};

const loadTeam = async (db, teamId) => {
  const team = await db.collection(TEAMS).findOne({ _id: new ObjectId(teamId) });
  return team ?? fail(404, "Team not found");
};

/** POST /api/teams/:teamId/join */
export const joinTeamService = async (db, teamId, user) => {
  const me = await assertEligible(db, user._id);
  const team = await loadTeam(db, teamId);
  const refusal = joinRefusal(team);
  if (refusal) fail(409, refusal);

  // addMemberService re-checks room and duplicates atomically at write time.
  return addMemberService(db, teamId, { userId: String(me.uid), githubLogin: me.githubLogin });
};

/** POST /api/teams/:teamId/leave. A forming team left with nobody on it is disbanded. */
export const leaveTeamService = async (db, teamId, user) => {
  const team = await loadTeam(db, teamId);
  const uid = new ObjectId(user._id);
  const refusal = leaveRefusal(team, uid);
  if (refusal) fail(409, refusal);

  const updated = await removeMemberService(db, teamId, String(uid));
  const left = updated.members.filter((m) => m.status === "active").length;
  if (!left && updated.status === "forming") await setStatusService(db, teamId, "disbanded");
  return { left: true };
};

/** PUT /api/teams/:teamId/repo for the team itself (the admin path skips these checks). */
export const setTeamRepoService = async (db, teamId, user, { repoUrl }) => {
  const team = await loadTeam(db, teamId);
  const uid = new ObjectId(user._id);
  if (!team.members.some((m) => m.status === "active" && m.userId.equals(uid))) fail(404, "Team not found");
  if (!canManageSetup(team, uid)) fail(403, "Only the person who started the team, the lead or the co-lead sets the repository");
  if (!["forming", "active"].includes(team.status)) fail(409, "The repository can't change at this stage");

  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) fail(400, "Use a GitHub repository URL like https://github.com/you/project");
  const refusal = repoOwnerRefusal(team, parsed.owner);
  if (refusal) fail(400, refusal);
  return setRepoService(db, teamId, { repoUrl });
};

/** POST /api/teams/:teamId/begin: forming -> active. */
export const beginTeamService = async (db, teamId, user) => {
  const team = await loadTeam(db, teamId);
  const uid = new ObjectId(user._id);
  if (!team.members.some((m) => m.status === "active" && m.userId.equals(uid))) fail(404, "Team not found");
  if (!canManageSetup(team, uid)) fail(403, "Only the person who started the team, the lead or the co-lead starts the project");
  const refusal = beginRefusal(team);
  if (refusal) fail(409, refusal);

  // status in the filter: a member joining at the same moment either gets in first or sees "started".
  const updated = await db
    .collection(TEAMS)
    .findOneAndUpdate({ _id: team._id, status: "forming" }, { $set: { status: "active", startedAt: new Date(), updatedAt: new Date() } }, { returnDocument: "after" });
  return updated ?? fail(409, "This team has already started");
};

/** PUT /api/teams/:teamId/repo: an admin sets any team's repo; a team member goes through the ownership checks. */
export const setRepoAsViewerService = async (db, teamId, user, body) =>
  (await isAdmin(db, new ObjectId(user._id))) ? setRepoService(db, teamId, body) : setTeamRepoService(db, teamId, user, body);
