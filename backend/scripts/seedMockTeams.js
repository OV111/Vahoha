/**
 * Mock Build Teams so /teams and /team/:id have something to show:
 *   - forming teams with a few backlog tasks, open for a real account to join
 *   - running teams with merged PRs, defenses, peer ratings, a sprint board and
 *     an issued evidence page, so they rank in "Top teams"
 *
 * Usage:
 *   npm run seed:mock-teams              create (replaces earlier mocks)
 *   npm run seed:mock-teams -- --remove  delete every mock team and mock member
 *
 * Refuses to touch a database that isn't on this machine unless --allow-remote
 * is passed: mock teams on production are shown to real learners as real teams.
 *
 * Mock members have no password and no linked sign-in, so nobody can log in as
 * them. Everything is marked (teams.mock, users.mockTeamMember) and --remove
 * deletes it all, including anything made on a mock team while testing.
 * Re-seeding keeps real accounts that had joined a mock team (matched by team
 * name), but the team gets a new id, so its old /team/:id link stops working.
 */

import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { randomBytes } from "crypto";
import { ObjectId } from "mongodb";
import connectDB from "../config/db.js";
import { derivePrefix } from "../modules/teams/lib/taskRules.js";
import { buildSnapshot } from "../modules/teams/services/proof/evidenceService.js";

const flags = process.argv.slice(2);
const remove = flags.includes("--remove");
const allowRemote = flags.includes("--allow-remote");

const LOCAL_HOSTS = ["localhost", "127.0.0.1", "::1", "[::1]"];
const isLocal = (uri) => {
  try {
    // mongodb+srv (Atlas) is never local; for mongodb:// check every host in the list.
    if (uri.startsWith("mongodb+srv://")) return false;
    const hosts = uri.replace(/^mongodb:\/\//, "").split("@").pop().split("/")[0].split(",");
    return hosts.every((h) => LOCAL_HOSTS.includes(h.replace(/:\d+$/, "")));
  } catch {
    return false;
  }
};

const DAY = 86_400_000;
const HOUR = 3_600_000;

// Forming: open to join, nothing merged yet.
const FORMING = [
  { name: "Payments Pilot", preferTracks: ["api-dev", "node-dev", "backend-dev"], members: ["mock-ana", "mock-levon"] },
  { name: "Recipe Radar", preferTracks: ["frontend-dev", "react-dev", "mern"], members: ["mock-sara", "mock-tigran", "mock-mila"] },
  { name: "Habit Hub", preferTracks: ["mern", "fullstack-engineer", "api-dev"], members: ["mock-david"] },
];

// Running teams that rank. Per member: [login, merged PRs, best defense score or null].
// `review` is the share of PRs someone reviewed; `peer` is the centre of their ratings.
const RANKED = [
  {
    name: "Null Pointers", preferTracks: ["fullstack-engineer", "mern"], status: "defending", review: 0.95, peer: 4.6,
    members: [["mock-arman", 9, 92], ["mock-nare", 8, 88], ["mock-karen", 8, 90], ["mock-lilit", 7, 85], ["mock-hayk", 8, 91]],
  },
  {
    name: "Async Avengers", preferTracks: ["backend-dev", "node-dev", "api-dev"], status: "active", review: 0.9, peer: 4.4,
    members: [["mock-gor", 10, 86], ["mock-ani", 9, 90], ["mock-vahan", 8, 78], ["mock-mariam", 7, 84]],
  },
  {
    name: "Pixel Pushers", preferTracks: ["frontend-dev", "react-dev"], status: "active", review: 0.8, peer: 4.3,
    members: [["mock-sona", 8, 88], ["mock-aram", 7, 80], ["mock-lusine", 7, 82], ["mock-tatev", 6, null]],
  },
  {
    name: "Merge Conflict", preferTracks: ["mern", "fullstack-engineer"], status: "active", review: 0.75, peer: 4.0,
    members: [["mock-ashot", 9, 81], ["mock-meri", 6, 76], ["mock-robert", 5, 70], ["mock-anahit", 4, null], ["mock-erik", 3, null]],
  },
  {
    name: "Byte Club", preferTracks: ["backend-dev", "api-dev"], status: "active", review: 0.7, peer: 3.9,
    members: [["mock-sevak", 7, 82], ["mock-gayane", 5, 74], ["mock-tigranuhi", 4, null]],
  },
  {
    name: "Off By One", preferTracks: ["frontend-dev", "react-dev"], status: "active", review: 0.6, peer: 3.8,
    members: [["mock-samvel", 5, 72], ["mock-hasmik", 4, null], ["mock-narek", 3, 68], ["mock-eva", 2, null]],
  },
  {
    name: "Race Conditions", preferTracks: ["node-dev", "backend-dev"], status: "active", review: 0.5, peer: 3.6,
    members: [["mock-armen", 4, 66], ["mock-shushan", 2, null], ["mock-garik", 1, null], ["mock-lia", 1, null]],
  },
];

const PR_TITLES = [
  "Add sign-up form validation", "Paginate the activity feed", "Cache user profile lookups", "Fix timezone bug in due dates",
  "Add rate limiting to login", "Move env config to one module", "Write tests for task service", "Dark mode for settings page",
  "Index the search collection", "Retry failed webhook deliveries", "Add empty states to dashboard", "Refactor auth middleware",
  "Upload avatars to object storage", "Debounce the search input", "Add CSV export for reports", "Fix N+1 query on team page",
  "Keyboard shortcuts for the board", "Add health check endpoint", "Stream large responses", "Seed script for local data",
];

const TASKS = [
  { title: "Set up CI with lint and tests", area: "ops", size: "S" },
  { title: "Design the database schema", area: "backend", size: "M" },
  { title: "Build the landing page", area: "frontend", size: "M" },
  { title: "Add password reset flow", area: "backend", size: "L" },
  { title: "Add loading skeletons", area: "frontend", size: "S" },
  { title: "Write API docs", area: "other", size: "S" },
  { title: "Track page views", area: "data", size: "M" },
  { title: "Add search with filters", area: "frontend", size: "L" },
];

const FILES = ["src/api/routes.js", "src/components/Form.jsx", "src/lib/cache.js", "src/db/schema.js", "tests/api.test.js", "src/pages/Dashboard.jsx"];

const MOCK_COLLECTIONS_BY_TEAM = [
  "team_tasks", "team_sprints", "team_task_events", "team_plans", "team_warnings", "team_updates", "team_contributions",
  "team_defenses", "team_ratings", "team_evidence",
];

// Small seeded PRNG so every run builds the same data.
const rng = (seed) => () => {
  seed = (seed * 1_103_515_245 + 12_345) % 2_147_483_648;
  return seed / 2_147_483_648;
};

const titleCase = (login) => login.replace("mock-", "").replace(/^\w/, (c) => c.toUpperCase());

/** Deletes every mock; returns the real accounts that had joined a mock team, by team name. */
const removeMocks = async (db) => {
  const teams = await db.collection("teams").find({ mock: true }, { projection: { _id: 1, name: 1, members: 1 } }).toArray();
  const teamIds = teams.map((t) => t._id);
  const users = await db.collection("users").find({ mockTeamMember: true }, { projection: { _id: 1 } }).toArray();
  const userIds = users.map((u) => u._id);
  const mockIds = new Set(userIds.map(String));

  const realMembers = new Map(
    teams.map((t) => [t.name, t.members.filter((m) => !mockIds.has(String(m.userId)) && m.status === "active")]),
  );

  await Promise.all(MOCK_COLLECTIONS_BY_TEAM.map((c) => db.collection(c).deleteMany({ teamId: { $in: teamIds } })));
  await db.collection("team_profiles").deleteMany({ userId: { $in: userIds } });
  await db.collection("teams").deleteMany({ _id: { $in: teamIds } });
  await db.collection("users").deleteMany({ _id: { $in: userIds } });
  return { teams: teamIds.length, users: userIds.length, realMembers };
};

const pickTrack = (prefer, known) => prefer.find((t) => known.has(t)) ?? [...known][0] ?? prefer[0];

const insertMembers = async (db, logins, now, offset) => {
  const members = [];
  for (const [j, login] of logins.entries()) {
    const _id = new ObjectId();
    await db.collection("users").insertOne({
      _id,
      username: login,
      firstName: titleCase(login),
      lastName: "(mock)",
      email: `${login}@example.invalid`,
      githubLogin: login,
      mockTeamMember: true,
      createdAt: new Date(now - 40 * DAY),
    });
    members.push({ userId: _id, githubLogin: login, status: "active", joinedAt: new Date(now - (offset + j + 1) * HOUR), leftAt: null });
  }
  return members;
};

const insertTeam = async (db, { name, trackId, status, members, now, ageDays }) => {
  const team = {
    _id: new ObjectId(),
    mock: true,
    createdBy: members[0].userId,
    name,
    trackId,
    status,
    repo: null,
    members,
    // Nobody here is lead-eligible (no capstone), so the AI leads, as it would for a real new team.
    leadId: "ai",
    coLeadId: null,
    taskPrefix: derivePrefix(name),
    nextTaskKey: 0,
    createdAt: new Date(now - ageDays * DAY),
    updatedAt: new Date(now),
  };
  await db.collection("teams").insertOne(team);
  return team;
};

/** A sprint and tasks spread over the board's columns; `done` tasks first. */
const insertBoard = async (db, team, { counts, sprintStatus, now, random }) => {
  const active = team.members.filter((m) => m.status === "active");
  const sprint = {
    teamId: team._id,
    name: "Sprint 1",
    goal: "Ship the first usable version",
    startAt: new Date(now - 6 * DAY),
    endAt: new Date(now + 8 * DAY),
    status: sprintStatus,
    createdBy: "ai",
    createdAt: new Date(now - 7 * DAY),
    closedAt: null,
  };
  const { insertedId: sprintId } = await db.collection("team_sprints").insertOne(sprint);

  const statuses = Object.entries(counts).flatMap(([status, n]) => Array(n).fill(status));
  const tasks = statuses.map((status, i) => {
    const spec = TASKS[i % TASKS.length];
    const assignee = status === "backlog" && random() < 0.5 ? null : active[i % active.length].userId;
    const created = new Date(now - (10 - (i % 8)) * DAY);
    return {
      teamId: team._id,
      key: i + 1,
      title: spec.title,
      description: "",
      status,
      assigneeId: assignee,
      creatorId: "ai",
      size: spec.size,
      area: spec.area,
      skills: [],
      dueAt: null,
      sprintId: status === "backlog" && i % 2 ? null : sprintId,
      pr: null,
      comments: [],
      commentCount: 0,
      createdAt: created,
      updatedAt: created,
      doneAt: status === "done" ? new Date(now - (i % 5) * DAY) : null,
    };
  });
  if (tasks.length) await db.collection("team_tasks").insertMany(tasks);
  await db.collection("teams").updateOne({ _id: team._id }, { $set: { nextTaskKey: tasks.length } });
};

const createRanked = async (db, spec, trackId, now, offset, random) => {
  const members = await insertMembers(db, spec.members.map(([login]) => login), now, offset);
  const team = await insertTeam(db, { name: spec.name, trackId, status: spec.status, members, now, ageDays: 30 });

  // Merged PRs: spread over the last 25 days, a few inside the last week.
  let prNumber = 1;
  const contributions = [];
  for (const [i, [, prs]] of spec.members.entries()) {
    for (let k = 0; k < prs; k += 1) {
      const others = members.filter((_, j) => j !== i);
      const reviewers = random() < spec.review && others.length ? [others[Math.floor(random() * others.length)].githubLogin] : [];
      contributions.push({
        teamId: team._id,
        prNumber: prNumber++,
        title: PR_TITLES[Math.floor(random() * PR_TITLES.length)],
        authorId: members[i].userId,
        authorLogin: members[i].githubLogin,
        reviewers,
        changedFiles: [{ path: FILES[Math.floor(random() * FILES.length)], additions: 20 + Math.floor(random() * 180), deletions: Math.floor(random() * 60) }],
        mergedAt: new Date(now - Math.floor(random() * 25 * DAY)),
        syncedAt: new Date(now),
      });
    }
  }
  await db.collection("team_contributions").insertMany(contributions);

  // Best defense per member; only graded, unflagged, passed ones count toward rank.
  const defenses = spec.members.flatMap(([, , score], i) =>
    score == null
      ? []
      : [{ teamId: team._id, userId: members[i].userId, status: "graded", questions: [], result: { score, passed: score >= 60 }, flags: [], gradedAt: new Date(now - 2 * DAY) }],
  );
  if (defenses.length) await db.collection("team_defenses").insertMany(defenses);

  // Everyone rates everyone else, scores scattered around the team's centre.
  const ratings = [];
  for (const rater of members) {
    for (const ratee of members) {
      if (rater.userId.equals(ratee.userId)) continue;
      const score = Math.max(1, Math.min(5, Math.round(spec.peer + (random() - 0.5) * 1.6)));
      ratings.push({ teamId: team._id, raterId: rater.userId, rateeId: ratee.userId, score, comment: "", createdAt: new Date(now), updatedAt: new Date(now) });
    }
  }
  await db.collection("team_ratings").insertMany(ratings);

  const done = Math.min(contributions.length, 4);
  await insertBoard(db, team, { counts: { done, in_review: 1, in_progress: 2, backlog: 2 }, sprintStatus: "active", now, random });

  // Issued evidence is what lists a team on the leaderboard.
  await db.collection("team_evidence").insertOne({
    teamId: team._id,
    publicId: randomBytes(9).toString("base64url"),
    revoked: false,
    issuedAt: new Date(now - DAY),
    updatedAt: new Date(now - DAY),
    issuedBy: null,
    snapshot: await buildSnapshot(db, team),
  });
  return `${spec.name} (${members.length} members, ${contributions.length} PRs)`;
};

const createMocks = async (db, realMembers) => {
  const known = new Set((await db.collection("roadmap_tracks").find({}, { projection: { trackId: 1 } }).toArray()).map((t) => t.trackId));
  const now = Date.now();
  const random = rng(42);
  const created = [];

  for (const [i, spec] of FORMING.entries()) {
    const members = [...(await insertMembers(db, spec.members, now, i)), ...(realMembers.get(spec.name) ?? [])].slice(0, 6);
    const team = await insertTeam(db, { name: spec.name, trackId: pickTrack(spec.preferTracks, known), status: "forming", members, now, ageDays: i + 1 });
    await insertBoard(db, team, { counts: { backlog: 3 }, sprintStatus: "planned", now, random });
    created.push(`${spec.name} (forming, ${members.length}/6)`);
  }

  for (const [i, spec] of RANKED.entries()) {
    created.push(await createRanked(db, spec, pickTrack(spec.preferTracks, known), now, i, random));
  }
  return created;
};

const run = async () => {
  const uri = process.env.MONGO_URI ?? "";
  if (!isLocal(uri) && !allowRemote) {
    console.error(
      "Refusing: MONGO_URI is not a local database. Mock teams would be shown to real learners.\n" +
        "Point backend/.env at a local MongoDB, or pass --allow-remote if you are sure.",
    );
    process.exit(1);
  }

  const db = await connectDB();
  const removed = await removeMocks(db);
  if (remove) {
    console.log(`Removed ${removed.teams} mock teams and ${removed.users} mock members.`);
    process.exit(0);
  }
  const created = await createMocks(db, removed.realMembers);
  console.log(`Mock teams:\n  - ${created.join("\n  - ")}`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
