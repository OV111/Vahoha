export const RUN_COLLECTION = "judgment_runs";

export const RUN_STATES = Object.freeze({
  ACTIVE: "ACTIVE",
  FINISHED: "FINISHED",
});

// Pilot limit for everyone: each finished run makes one AI call for the debrief.
export const DAILY_RUNS = 5;

export const MIN_WHY_CHARS = 10;
export const MAX_WHY_CHARS = 1000;

export const CONFIDENCE_LEVELS = Object.freeze([50, 70, 90]);
