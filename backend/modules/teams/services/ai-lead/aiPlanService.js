/**
 * AI lead, part 1: draft a sprint plan, then a person accepts it.
 *
 * Who: when the AI leads, any active member asks for and accepts a plan; when
 * a human leads, the lead or co-lead does (lib/aiPlan.js canUsePlanner). The
 * model only drafts. Nothing reaches the board until someone accepts, and what
 * they changed is kept on the plan as the lead's own decisions.
 */

import { ObjectId } from "mongodb";
import { getHeadCommit, getTree } from "../../../capstone/index.js";
import { getWeakSpots } from "../../../../services/weakSpotService.js";
import { groqChat } from "../../../../services/groqChat.js";
import { GroqBusyError } from "../../../../services/groqGate.js";
import { TASK_LIMITS } from "../../../../../constants/teams.js";
import { PLAN_RULES, PLAN_SCHEMA, applyPlanChoices, buildPlanMessages, canUsePlanner, normalizePlan } from "../../lib/aiPlan.js";
import { loadBoard } from "../board/boardAccess.js";
import { assertSprintUsable, insertTask } from "../board/taskService.js";
import { levelFor } from "../team/teamLevelService.js";
import { PLANS, SPRINTS, TASKS, TEAM_PROFILES } from "../teamsData.js";
import { fail } from "../../../../utils/httpErrors.js";

const MODEL = "openai/gpt-oss-120b";
const PLAN_COOLDOWN_MS = 2 * 60_000;

const activeMembers = (team) => team.members.filter((m) => m.status === "active");

const assertPlanner = (team, uid) => {
  if (!canUsePlanner(team, uid)) fail(403, "Only the lead or co-lead plans with the AI on this team");
};

const memberContext = async (db, team) =>
  Promise.all(
    activeMembers(team).map(async (m) => {
      const [level, profile, weak] = await Promise.all([
        levelFor(db, m.userId),
        db.collection(TEAM_PROFILES).findOne({ userId: m.userId }, { projection: { "cv.areas": 1, "cv.confirmedAt": 1 } }),
        getWeakSpots(db, m.userId),
      ]);
      return {
        userId: m.userId,
        login: m.githubLogin,
        level: level.level,
        areas: profile?.cv?.confirmedAt ? (profile.cv.areas ?? []) : [],
        weakSpots: weak.slice(0, PLAN_RULES.maxWeakSpots).map((w) => w.topic),
      };
    }),
  );

// The file list helps the model name real places; without it the plan is vaguer, not wrong.
const repoPaths = async (team) => {
  if (!team.repo) return [];
  try {
    const [owner, repo] = team.repo.fullName.split("/");
    const head = await getHeadCommit(owner, repo);
    if (!head) return [];
    return (await getTree(owner, repo, head.treeSha)).paths.slice(0, PLAN_RULES.maxRepoPaths);
  } catch (err) {
    console.error("ai plan: repo tree unavailable:", err.message);
    return [];
  }
};

const askModel = async (messages) => {
  let completion;
  try {
    completion = await groqChat(
      {
        model: MODEL,
        messages,
        response_format: { type: "json_schema", json_schema: { name: "sprint_plan", strict: true, schema: PLAN_SCHEMA } },
        reasoning_effort: "medium",
        max_tokens: 6000,
        temperature: 0.2,
      },
      { priority: "interactive" },
    );
  } catch (err) {
    if (err instanceof GroqBusyError || err.status === 429 || err.status === 413) fail(503, "The AI is busy right now. Try again in a minute");
    console.error("ai plan model error:", err.status, err.message);
    fail(502, "The AI couldn't draft a plan. Try again in a minute");
  }
  const choice = completion.choices?.[0];
  if (choice?.finish_reason === "length") fail(502, "The plan came out too long. Try a narrower goal");
  try {
    return JSON.parse(choice?.message?.content ?? "");
  } catch {
    fail(502, "The AI couldn't draft a plan. Try again in a minute");
  }
};

// Logins for the client, so it never has to join ids itself.
const toView = (plan, team) => {
  const loginOf = new Map(team.members.map((m) => [String(m.userId), m.githubLogin]));
  return { ...plan, tasks: plan.tasks.map((t) => ({ ...t, assigneeLogin: t.assigneeId ? loginOf.get(t.assigneeId) ?? null : null })) };
};

export const getPlanService = async (db, teamId, user) => {
  const { team, uid } = await loadBoard(db, teamId, user);
  const plan = await db.collection(PLANS).findOne({ teamId: team._id, status: "draft" });
  return { canPlan: canUsePlanner(team, uid), plan: plan ? toView(plan, team) : null };
};

export const createPlanService = async (db, teamId, user, { sprintId = null, goal = "", notes = "" }) => {
  const { team, uid } = await loadBoard(db, teamId, user, { write: true });
  assertPlanner(team, uid);

  const last = await db.collection(PLANS).findOne({ teamId: team._id }, { sort: { createdAt: -1 }, projection: { createdAt: 1 } });
  if (last && Date.now() - last.createdAt < PLAN_COOLDOWN_MS) fail(429, "A plan was drafted a moment ago. Wait 2 minutes before asking again");

  await assertSprintUsable(db, team._id, sprintId);
  const sprint = sprintId ? await db.collection(SPRINTS).findOne({ _id: new ObjectId(sprintId) }, { projection: { goal: 1 } }) : null;
  const sprintGoal = (goal || sprint?.goal || "").trim();
  if (sprintGoal.length < 5) fail(400, "Write the goal for this sprint first");

  const [members, layers, openTasks, paths] = await Promise.all([
    memberContext(db, team),
    db
      .collection("roadmap_layers")
      .find({ trackId: team.trackId }, { projection: { _id: 0, layerId: 1, title: 1, order: 1 } })
      .sort({ order: 1 })
      .limit(40)
      .toArray(),
    db
      .collection(TASKS)
      .find({ teamId: team._id, status: { $ne: "done" } }, { projection: { title: 1 } })
      .limit(PLAN_RULES.maxOpenTasks)
      .toArray(),
    repoPaths(team),
  ]);
  if (!members.length) fail(409, "The team has no active members yet");

  const raw = await askModel(
    buildPlanMessages({ goal: sprintGoal, notes, members, layers, openTasks: openTasks.map((t) => t.title), repoPaths: paths }),
  );
  const tasks = normalizePlan(raw, { members, layerIds: layers.map((l) => l.layerId) });
  if (!tasks.length) fail(502, "The AI didn't suggest any tasks. Try a clearer goal");

  const plan = {
    teamId: team._id,
    sprintId: sprintId ? new ObjectId(sprintId) : null,
    goal: sprintGoal,
    notes,
    status: "draft",
    tasks,
    createdBy: uid,
    createdAt: new Date(),
  };
  // A new draft replaces the old one; the partial unique index settles a race between two.
  await db.collection(PLANS).updateMany({ teamId: team._id, status: "draft" }, { $set: { status: "discarded", discardedAt: new Date() } });
  try {
    const { insertedId } = await db.collection(PLANS).insertOne(plan);
    return { canPlan: true, plan: toView({ ...plan, _id: insertedId }, team) };
  } catch (err) {
    if (err.code === 11000) fail(409, "Someone else just drafted a plan. Reload to see it");
    throw err;
  }
};

export const acceptPlanService = async (db, teamId, planId, user, choice) => {
  const { team, uid } = await loadBoard(db, teamId, user, { write: true });
  assertPlanner(team, uid);

  const plan = await db.collection(PLANS).findOne({ _id: new ObjectId(planId), teamId: team._id });
  if (!plan) fail(404, "Plan not found");
  if (plan.status !== "draft") fail(409, "This plan was already accepted or replaced");

  const bad = (choice.include ?? []).find((i) => i >= plan.tasks.length);
  if (bad !== undefined) fail(400, "That task isn't in the plan");
  const active = new Set(activeMembers(team).map((m) => String(m.userId)));
  for (const id of Object.values(choice.assignees ?? {})) {
    if (id != null && !active.has(id)) fail(400, "Every assignee must be an active member of this team");
  }

  const { tasks, edits } = applyPlanChoices(plan.tasks, choice);
  if (!tasks.length) fail(400, "Pick at least one task, or discard the plan");
  const existing = await db.collection(TASKS).countDocuments({ teamId: team._id });
  if (existing + tasks.length > TASK_LIMITS.perTeam) fail(409, `A team board holds at most ${TASK_LIMITS.perTeam} tasks`);

  // Flip to accepted first, atomically: two members pressing accept can't both create the tasks.
  const claimed = await db
    .collection(PLANS)
    .findOneAndUpdate({ _id: plan._id, status: "draft" }, { $set: { status: "accepted", acceptedBy: uid, acceptedAt: new Date(), edits } });
  if (!claimed) fail(409, "This plan was already accepted or replaced");

  // A sprint closed since the draft: the tasks still land, in the backlog.
  let sprintId = plan.sprintId;
  if (sprintId) {
    const sprint = await db.collection(SPRINTS).findOne({ _id: sprintId }, { projection: { status: 1 } });
    if (!sprint || sprint.status === "closed") sprintId = null;
  }

  const created = [];
  for (const t of tasks) {
    const assigneeId = t.assigneeId && active.has(t.assigneeId) ? t.assigneeId : null;
    created.push(
      await insertTask(
        db,
        team,
        { title: t.title, description: t.description, size: t.size, area: t.area, skills: t.skills, assigneeId, sprintId },
        { creatorId: "ai", actor: "ai" },
      ),
    );
  }
  await db.collection(PLANS).updateOne({ _id: plan._id }, { $set: { taskKeys: created.map((t) => t.key) } });
  return { created };
};

export const discardPlanService = async (db, teamId, planId, user) => {
  const { team, uid } = await loadBoard(db, teamId, user, { write: true });
  assertPlanner(team, uid);
  const res = await db
    .collection(PLANS)
    .updateOne({ _id: new ObjectId(planId), teamId: team._id, status: "draft" }, { $set: { status: "discarded", discardedAt: new Date(), discardedBy: uid } });
  if (!res.matchedCount) fail(409, "This plan was already accepted or replaced");
  return { discarded: true };
};
