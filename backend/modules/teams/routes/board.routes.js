import { Router } from "express";
import { boardWriteLimiter } from "../../../middleware/rateLimits.js";
import { validate } from "../../../middleware/validate.js";
import {
  addComment,
  createSprint,
  createTask,
  deleteTask,
  getTask,
  listSprints,
  listTasks,
  syncBoard,
  updateSprint,
  updateTask,
} from "../controllers/board.controller.js";
import {
  commentSchema,
  createSprintSchema,
  createTaskSchema,
  sprintParamSchema,
  taskParamSchema,
  taskQuerySchema,
  teamParamSchema,
  updateSprintSchema,
  updateTaskSchema,
} from "../schemas/teams.schemas.js";

// Members read and write; admins read (and may plan sprints).
const router = Router();

router.get("/:teamId/tasks", validate({ params: teamParamSchema, query: taskQuerySchema }), listTasks);
router.post("/:teamId/tasks", boardWriteLimiter, validate({ params: teamParamSchema, body: createTaskSchema }), createTask);
router.get("/:teamId/tasks/:key", validate({ params: taskParamSchema }), getTask);
router.patch("/:teamId/tasks/:key", boardWriteLimiter, validate({ params: taskParamSchema, body: updateTaskSchema }), updateTask);
router.delete("/:teamId/tasks/:key", boardWriteLimiter, validate({ params: taskParamSchema }), deleteTask);
router.post("/:teamId/tasks/:key/comments", boardWriteLimiter, validate({ params: taskParamSchema, body: commentSchema }), addComment);

router.get("/:teamId/sprints", validate({ params: teamParamSchema }), listSprints);
router.post("/:teamId/sprints", boardWriteLimiter, validate({ params: teamParamSchema, body: createSprintSchema }), createSprint);
router.patch("/:teamId/sprints/:sprintId", boardWriteLimiter, validate({ params: sprintParamSchema, body: updateSprintSchema }), updateSprint);

// Throttled per team inside the service; the limiter only stops one user scripting it.
router.post("/:teamId/board/sync", boardWriteLimiter, validate({ params: teamParamSchema }), syncBoard);

export default router;
