/**
 * Build Teams rules. ONE source of truth: the backend enforces them
 * (backend/modules/teams/services/) and the admin page shows them
 * (src/features/teams/components/admin/).
 */
export const TEAM_STATUSES = ["forming", "active", "defending", "completed", "disbanded"];
export const MAX_TEAM_MEMBERS = 6;

// How many running teams (forming, active, defending) one person may be on.
// null = no limit (founder decision 2026-11-02); set a number to cap it later.
export const MAX_RUNNING_TEAMS = null;

// Lowest to highest. A level is computed from evidence, never chosen by the user.
export const TEAM_LEVELS = ["starter", "junior", "mid", "lead-eligible"];

export const TEAM_LEVEL_LABELS = {
  starter: "Starter",
  junior: "Junior",
  mid: "Mid",
  "lead-eligible": "Lead-eligible",
};

// Stored in teams.leadId when no member is lead-eligible and the AI leads.
export const AI_LEAD = "ai";

// Task board. "done" is never set by hand: only a merged PR moves a task there.
export const TASK_STATUSES = ["backlog", "in_progress", "in_review", "done"];
export const MANUAL_TASK_STATUSES = ["backlog", "in_progress", "in_review"];
export const TASK_STATUS_LABELS = {
  backlog: "Backlog",
  in_progress: "In progress",
  in_review: "In review",
  done: "Done",
};
export const TASK_SIZES = ["S", "M", "L"];
export const TASK_AREAS = ["frontend", "backend", "ops", "data", "other"];
export const SPRINT_STATUSES = ["planned", "active", "closed"];

// Teams that are finished are read-only: their board is part of the record.
export const BOARD_OPEN_STATUSES = ["forming", "active", "defending"];

export const TASK_LIMITS = { title: 120, description: 4000, comment: 2000, skills: 5, perTeam: 500, comments: 200 };
