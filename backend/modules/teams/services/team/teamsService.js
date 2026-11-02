/**
 * Team record: create a team, set its repo, add/remove members, read it back.
 * Team 1 is run by hand, so every write here is admin-only (see routes).
 */

import { ObjectId } from "mongodb";
import { parseRepoUrl } from "../../../capstone/index.js";
import { getRepo } from "../../../capstone/index.js";
import { TEAMS, ensureIndexes } from "../teamsData.js";
import { fail } from "../../../../utils/httpErrors.js";
import { refreshLeadService } from "./teamLevelService.js";
import { ensureCvEstimate } from "../membership/cvService.js";
import { derivePrefix } from "../../lib/taskRules.js";
import { MAX_TEAM_MEMBERS as MAX_MEMBERS } from "../../../../../constants/teams.js";

const getTeamOr404 = async (db, teamId) => {
  const team = await db.collection(TEAMS).findOne({ _id: new ObjectId(teamId) });
  return team ?? fail(404, "Team not found");
};

/** createdBy is the learner who started it (self-serve), or null when an admin made it. */
export const createTeamService = async (db, { name, trackId }, { createdBy = null, _id = new ObjectId() } = {}) => {
  await ensureIndexes(db);
  const now = new Date();
  const team = {
    _id, createdBy, name, trackId, status: "forming", repo: null, members: [],
    leadId: null, coLeadId: null, taskPrefix: derivePrefix(name), nextTaskKey: 0,
    createdAt: now, updatedAt: now,
  };
  await db.collection(TEAMS).insertOne(team);
  return team;
};

export const setRepoService = async (db, teamId, { repoUrl }) => {
  await ensureIndexes(db);
  const parsed = parseRepoUrl(repoUrl);
  if (!parsed) fail(400, "Use a GitHub repository URL like https://github.com/org/project");

  const repo = await getRepo(parsed.owner, parsed.repo);
  if (!repo) fail(400, "Repository not found or private");

  try {
    const updated = await db
      .collection(TEAMS)
      .findOneAndUpdate(
        { _id: new ObjectId(teamId) },
        { $set: { repo: { fullName: repo.fullName, id: repo.id, url: repo.htmlUrl }, updatedAt: new Date() } },
        { returnDocument: "after" },
      );
    return updated ?? fail(404, "Team not found");
  } catch (err) {
    if (err.code === 11000) fail(409, "That repository already belongs to another team");
    throw err;
  }
};

export const addMemberService = async (db, teamId, { userId, githubLogin }) => {
  const team = await getTeamOr404(db, teamId);
  const user = await db.collection("users").findOne({ _id: new ObjectId(userId) }, { projection: { _id: 1 } });
  if (!user) fail(404, "User not found");

  const active = team.members.filter((m) => m.status !== "left");
  if (active.some((m) => m.userId.equals(user._id))) fail(409, "User is already on this team");
  if (active.some((m) => m.githubLogin.toLowerCase() === githubLogin.toLowerCase())) {
    fail(409, "That GitHub login is already on this team");
  }
  if (active.length >= MAX_MEMBERS) fail(409, `A team has at most ${MAX_MEMBERS} members`);

  const now = new Date();
  const member = { userId: user._id, githubLogin, status: "active", joinedAt: now, leftAt: null };
  // Both writes re-check "no ACTIVE entry for this user" at write time, so two
  // concurrent adds cannot both succeed. A member who left keeps their old entry
  // (their past PRs point at it), so coming back reactivates it instead of pushing a duplicate.
  const notActive = { $not: { $elemMatch: { userId: user._id, status: { $ne: "left" } } } };
  const hadLeft = team.members.some((m) => m.userId.equals(user._id));
  const updated = hadLeft
    ? await db.collection(TEAMS).findOneAndUpdate(
        { _id: team._id, members: notActive },
        { $set: { "members.$[m].status": "active", "members.$[m].githubLogin": githubLogin, "members.$[m].joinedAt": now, "members.$[m].leftAt": null, updatedAt: now } },
        { arrayFilters: [{ "m.userId": user._id }], returnDocument: "after" },
      )
    : await db.collection(TEAMS).findOneAndUpdate(
        { _id: team._id, members: notActive },
        { $push: { members: member }, $set: { updatedAt: now } },
        { returnDocument: "after" },
      );
  if (!updated) fail(409, "Team changed, try again");
  // Awaited, unlike on page load: the lead is picked next, and should already count this member's CV.
  await ensureCvEstimate(db, user._id);
  return refreshLeadService(db, await db.collection(TEAMS).findOne({ _id: team._id }));
};

// A leaver stays in the array (status "left") so past contributions keep their author.
export const removeMemberService = async (db, teamId, userId) => {
  const updated = await db.collection(TEAMS).findOneAndUpdate(
    { _id: new ObjectId(teamId) },
    { $set: { "members.$[m].status": "left", "members.$[m].leftAt": new Date(), updatedAt: new Date() } },
    { arrayFilters: [{ "m.userId": new ObjectId(userId), "m.status": { $ne: "left" } }], returnDocument: "after" },
  );
  if (!updated) fail(404, "Team not found");
  return refreshLeadService(db, updated);
};

// req.user carries no role (it is read from the database on every admin request,
// see middleware/requireAdmin.js), so look it up here the same way.
export const isAdmin = async (db, userId) =>
  (await db.collection("users").findOne({ _id: userId }, { projection: { role: 1 } }))?.role === "admin";

export const getTeamService = async (db, teamId, viewer) => {
  const team = await getTeamOr404(db, teamId);
  const isMember = team.members.some((m) => m.status !== "left" && m.userId.equals(viewer._id));
  if (!isMember && !(await isAdmin(db, viewer._id))) fail(404, "Team not found"); // 404, not 403: don't reveal it exists
  return team;
};

const RUNNING = ["forming", "active", "defending"];
const mineFilter = (userId) => ({ members: { $elemMatch: { userId: new ObjectId(userId), status: "active" } } });

/** Every team this person is on: running ones first, then finished, each newest first. */
export const listMyTeamsService = async (db, userId) => {
  const teams = await db
    .collection(TEAMS)
    .find(mineFilter(userId), { projection: { name: 1, trackId: 1, status: 1, members: 1, leadId: 1, repo: 1, updatedAt: 1 } })
    .sort({ updatedAt: -1 })
    .limit(50)
    .toArray();
  const running = (t) => RUNNING.includes(t.status);
  return [...teams.filter(running), ...teams.filter((t) => !running(t))].map((t) => ({
    _id: t._id,
    name: t.name,
    trackId: t.trackId,
    status: t.status,
    memberCount: t.members.filter((m) => m.status === "active").length,
    aiLeads: t.leadId === "ai",
    hasRepo: Boolean(t.repo),
  }));
};

// One team, for older callers: the most recently changed running team, else the latest finished one.
export const getMyTeamService = async (db, userId) => {
  const running = await db.collection(TEAMS).findOne({ ...mineFilter(userId), status: { $in: RUNNING } }, { sort: { updatedAt: -1 } });
  return running ?? db.collection(TEAMS).findOne(mineFilter(userId), { sort: { updatedAt: -1 } });
};

export const setStatusService = async (db, teamId, status) => {
  const updated = await db
    .collection(TEAMS)
    .findOneAndUpdate({ _id: new ObjectId(teamId) }, { $set: { status, updatedAt: new Date() } }, { returnDocument: "after" });
  return updated ?? fail(404, "Team not found");
};

export const listTeamsService = async (db) =>
  db
    .collection(TEAMS)
    .find({}, { projection: { name: 1, trackId: 1, status: 1, repo: 1, members: 1, createdAt: 1 } })
    .sort({ createdAt: -1 })
    .limit(100)
    .toArray();

const escapeRegex = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

// Admin picker for "add member": the form needs a userId, but nobody remembers one.
// Case-insensitive prefix match on username or email, so it can use an index later.
export const searchUsersService = async (db, { q }) => {
  const prefix = new RegExp(`^${escapeRegex(q)}`, "i");
  return db
    .collection("users")
    .find({ $or: [{ username: prefix }, { email: prefix }] }, { projection: { username: 1, firstName: 1, lastName: 1, email: 1 } })
    .limit(10)
    .toArray();
};

/** Whether this person is an active member of this team. For other modules (team maps). */
export const isActiveTeamMember = async (db, teamId, userId) =>
  Boolean(
    await db
      .collection(TEAMS)
      .findOne(
        { _id: new ObjectId(teamId), members: { $elemMatch: { userId: new ObjectId(userId), status: "active" } } },
        { projection: { _id: 1 } },
      ),
  );
