/**
 * The task board: tasks, comments, sprints and the GitHub sync that moves
 * cards. Who may do what is decided in the services (lib/taskRules.js).
 */

import { syncBoardService } from "../services/board/boardSyncService.js";
import { createSprintService, listSprintsService, updateSprintService } from "../services/board/sprintService.js";
import {
  addCommentService,
  createTaskService,
  deleteTaskService,
  getTaskService,
  listTasksService,
  updateTaskService,
} from "../services/board/taskService.js";
import { dbOf, respond } from "../../../utils/respond.js";

const p = (req) => req.params;

export const listTasks = respond((req) => listTasksService(dbOf(req), p(req).teamId, req.user, req.query));
export const getTask = respond((req) => getTaskService(dbOf(req), p(req).teamId, p(req).key, req.user));
export const createTask = respond((req) => createTaskService(dbOf(req), p(req).teamId, req.user, req.body));
export const updateTask = respond((req) => updateTaskService(dbOf(req), p(req).teamId, p(req).key, req.user, req.body));
export const deleteTask = respond((req) => deleteTaskService(dbOf(req), p(req).teamId, p(req).key, req.user));
export const addComment = respond((req) => addCommentService(dbOf(req), p(req).teamId, p(req).key, req.user, req.body));

export const listSprints = respond((req) => listSprintsService(dbOf(req), p(req).teamId, req.user));
export const createSprint = respond((req) => createSprintService(dbOf(req), p(req).teamId, req.user, req.body));
export const updateSprint = respond((req) => updateSprintService(dbOf(req), p(req).teamId, p(req).sprintId, req.user, req.body));

export const syncBoard = respond((req) => syncBoardService(dbOf(req), p(req).teamId, req.user));
