import { z } from "zod";
import { TEAM_STATUSES } from "../services/teamsData.js";
import {
  MANUAL_TASK_STATUSES,
  SPRINT_STATUSES,
  TASK_AREAS,
  TASK_LIMITS,
  TASK_SIZES,
} from "../../../../constants/teams.js";

const objectId = z.string().regex(/^[a-f0-9]{24}$/, "Invalid id");

export const teamParamSchema = z.object({ teamId: objectId });

// Public ids are 12 chars of base64url (randomBytes(9)).
export const publicIdParamSchema = z.object({
  publicId: z.string().regex(/^[A-Za-z0-9_-]{12}$/, "Invalid evidence id"),
});

// POST /api/teams (admin): team 1 is created by hand.
export const createTeamSchema = z.object({
  name: z.string().trim().min(2).max(60),
  trackId: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Invalid track id")
    .max(40),
});

// POST /api/teams/:teamId/members (admin): the admin confirms the GitHub login.
export const addMemberSchema = z.object({
  userId: objectId,
  githubLogin: z
    .string()
    .trim()
    .regex(/^[A-Za-z0-9](?:[A-Za-z0-9-]{0,37}[A-Za-z0-9])?$/, "Invalid GitHub login"),
});

export const memberParamSchema = z.object({ teamId: objectId, userId: objectId });

// PUT /api/teams/:teamId/repo (admin)
export const setRepoSchema = z.object({ repoUrl: z.string().trim().min(1).max(200) });

// POST /api/teams/:teamId/defense/answer
export const defenseAnswerSchema = z.object({
  questionId: z.string().regex(/^q\d{1,2}$/, "Invalid question id"),
  // Empty is allowed: it is how a member skips a question (scored 0).
  answer: z.string().max(5000),
});

// PUT /api/teams/:teamId/ratings/:userId
export const ratingParamSchema = z.object({ teamId: objectId, userId: objectId });
export const ratingSchema = z.object({
  score: z.number().int().min(1).max(5),
  comment: z.string().trim().max(300).optional(),
});

// PUT /api/teams/:teamId/evidence/revocation (admin)
export const evidenceRevokeSchema = z.object({ revoked: z.boolean() });

// PUT /api/teams/:teamId/status (admin)
export const statusSchema = z.object({ status: z.enum(TEAM_STATUSES) });

// GET /api/teams/admin/users?q= (admin)
export const userSearchSchema = z.object({ q: z.string().trim().min(2).max(60) });

// GET /api/teams/leaderboard?track=api-dev (optional track filter)
export const leaderboardQuerySchema = z.object({
  track: z
    .string()
    .trim()
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Invalid track id")
    .max(40)
    .optional(),
});

// Task board
export const taskParamSchema = z.object({ teamId: objectId, key: z.coerce.number().int().min(1).max(1_000_000) });
export const sprintParamSchema = z.object({ teamId: objectId, sprintId: objectId });

const nullableId = objectId.nullable();
const layerId = z.string().trim().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Invalid skill id").max(60);
const taskFields = {
  title: z.string().trim().min(2).max(TASK_LIMITS.title),
  description: z.string().trim().max(TASK_LIMITS.description),
  size: z.enum(TASK_SIZES),
  area: z.enum(TASK_AREAS).nullable(),
  skills: z.array(layerId).max(TASK_LIMITS.skills),
  dueAt: z.coerce.date().nullable(),
  assigneeId: nullableId,
  sprintId: nullableId,
};

// POST /api/teams/:teamId/tasks. A new task starts in backlog or in progress, never further.
export const createTaskSchema = z.object({
  ...taskFields,
  description: taskFields.description.optional(),
  size: taskFields.size.optional(),
  area: taskFields.area.optional(),
  skills: taskFields.skills.optional(),
  dueAt: taskFields.dueAt.optional(),
  assigneeId: nullableId.optional(),
  sprintId: nullableId.optional(),
  status: z.enum(["backlog", "in_progress"]).optional(),
});

// PATCH /api/teams/:teamId/tasks/:key. "done" is not accepted: a merged PR sets it.
export const updateTaskSchema = z
  .object({ ...taskFields, status: z.enum(MANUAL_TASK_STATUSES) })
  .partial()
  .refine((p) => Object.keys(p).length > 0, "Nothing to change");

export const taskQuerySchema = z.object({
  sprint: z.union([objectId, z.literal("none")]).optional(),
  assignee: z.union([objectId, z.literal("none")]).optional(),
});

export const commentSchema = z.object({ body: z.string().trim().min(1).max(TASK_LIMITS.comment) });

const sprintFields = {
  name: z.string().trim().min(2).max(60),
  goal: z.string().trim().max(300),
  startAt: z.coerce.date(),
  endAt: z.coerce.date(),
};
export const createSprintSchema = z.object({ ...sprintFields, goal: sprintFields.goal.optional() });
export const updateSprintSchema = z
  .object({ ...sprintFields, status: z.enum(SPRINT_STATUSES) })
  .partial()
  .refine((p) => Object.keys(p).length > 0, "Nothing to change");

// AI lead plans
export const planParamSchema = z.object({ teamId: objectId, planId: objectId });
export const createPlanSchema = z.object({
  sprintId: objectId.nullable().optional(),
  goal: z.string().trim().max(300).optional(),
  notes: z.string().trim().max(1000).optional(),
});
// include: indexes of draft tasks to keep (all when omitted). assignees: index -> userId or null.
export const acceptPlanSchema = z.object({
  include: z.array(z.number().int().min(0).max(50)).max(50).optional(),
  assignees: z.record(z.string().regex(/^\d{1,2}$/), objectId.nullable()).optional(),
});
