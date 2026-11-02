/**
 * Mock Build Teams for trying the join flow locally: three forming teams with
 * fake members, so a real account can open /team and join one.
 *
 * Usage:
 *   npm run seed:mock-teams              create (replaces earlier mocks)
 *   npm run seed:mock-teams -- --remove  delete every mock team and mock member
 *
 * Refuses to touch a database that isn't on this machine unless --allow-remote
 * is passed: mock teams on production would be shown to real learners.
 *
 * Mock members have no password and no linked sign-in, so nobody can log in as
 * them. Everything is marked (teams.mock, users.mockTeamMember) and --remove
 * deletes it all, including boards and plans made on a mock team while testing.
 */

import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { ObjectId } from "mongodb";
import connectDB from "../config/db.js";
import { derivePrefix } from "../modules/teams/lib/taskRules.js";

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

const TEAMS = [
  { name: "Payments Pilot", preferTracks: ["api-dev", "node-dev", "backend-dev"], members: ["mock-ana", "mock-levon"] },
  { name: "Recipe Radar", preferTracks: ["frontend-dev", "react-dev", "mern"], members: ["mock-sara", "mock-tigran", "mock-mila"] },
  { name: "Habit Hub", preferTracks: ["mern", "fullstack-engineer", "api-dev"], members: ["mock-david"] },
];

const MOCK_COLLECTIONS_BY_TEAM = [
  "team_tasks", "team_sprints", "team_task_events", "team_plans", "team_warnings", "team_updates", "team_contributions",
];

const removeMocks = async (db) => {
  const teams = await db.collection("teams").find({ mock: true }, { projection: { _id: 1 } }).toArray();
  const teamIds = teams.map((t) => t._id);
  const users = await db.collection("users").find({ mockTeamMember: true }, { projection: { _id: 1 } }).toArray();
  const userIds = users.map((u) => u._id);

  await Promise.all(MOCK_COLLECTIONS_BY_TEAM.map((c) => db.collection(c).deleteMany({ teamId: { $in: teamIds } })));
  await db.collection("team_profiles").deleteMany({ userId: { $in: userIds } });
  await db.collection("teams").deleteMany({ _id: { $in: teamIds } });
  await db.collection("users").deleteMany({ _id: { $in: userIds } });
  return { teams: teamIds.length, users: userIds.length };
};

const pickTrack = (prefer, known) => prefer.find((t) => known.has(t)) ?? [...known][0] ?? prefer[0];

const createMocks = async (db) => {
  const known = new Set((await db.collection("roadmap_tracks").find({}, { projection: { trackId: 1 } }).toArray()).map((t) => t.trackId));
  const now = Date.now();
  const created = [];

  for (const [i, spec] of TEAMS.entries()) {
    const members = [];
    for (const [j, login] of spec.members.entries()) {
      const _id = new ObjectId();
      await db.collection("users").insertOne({
        _id,
        username: login,
        firstName: login.replace("mock-", "").replace(/^\w/, (c) => c.toUpperCase()),
        lastName: "(mock)",
        email: `${login}@example.invalid`,
        githubLogin: login,
        mockTeamMember: true,
        createdAt: new Date(now),
      });
      members.push({ userId: _id, githubLogin: login, status: "active", joinedAt: new Date(now - (i + j + 1) * 3_600_000), leftAt: null });
    }

    const teamId = new ObjectId();
    await db.collection("teams").insertOne({
      _id: teamId,
      mock: true,
      createdBy: members[0].userId,
      name: spec.name,
      trackId: pickTrack(spec.preferTracks, known),
      status: "forming",
      repo: null,
      members,
      // Nobody here is lead-eligible (no capstone), so the AI leads, as it would for a real new team.
      leadId: "ai",
      coLeadId: null,
      taskPrefix: derivePrefix(spec.name),
      nextTaskKey: 0,
      createdAt: new Date(now - (i + 1) * 3_600_000),
      updatedAt: new Date(now),
    });
    created.push(`${spec.name} (${members.length}/6)`);
  }
  return created;
};

const run = async () => {
  const uri = process.env.MONGO_URI ?? "";
  if (!isLocal(uri) && !allowRemote) {
    console.error(
      "Refusing: MONGO_URI is not a local database. Mock teams would be shown to real learners.\n" +
        "Point backend/.env at a local MongoDB, or pass --allow-remote if you are sure (e.g. a staging database).",
    );
    process.exit(1);
  }

  const db = await connectDB();
  const removed = await removeMocks(db);
  if (remove) {
    console.log(`Removed ${removed.teams} mock teams and ${removed.users} mock members.`);
    process.exit(0);
  }
  const created = await createMocks(db);
  console.log(`Mock teams looking for members:\n  - ${created.join("\n  - ")}\nOpen /team with an eligible account and press Join.`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Failed:", err.message);
  process.exit(1);
});
