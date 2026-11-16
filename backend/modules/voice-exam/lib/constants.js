// Mirrors src/features/voice-exam/lib/examStates.js: the UI renders whatever state the server sends.
export const STATES = Object.freeze({
  AWAITING_EXPLANATION: "AWAITING_EXPLANATION",
  ANALYZING: "ANALYZING",
  AWAITING_ANSWER: "AWAITING_ANSWER",
  GRADING: "GRADING",
  COMPLETED: "COMPLETED",
  EXPIRED: "EXPIRED",
  ABANDONED: "ABANDONED",
});

export const INPUT_STATES = [STATES.AWAITING_EXPLANATION, STATES.AWAITING_ANSWER];
export const LIVE_STATES = [...INPUT_STATES, STATES.ANALYZING, STATES.GRADING];

export const EXAM_TIME_SEC = 15 * 60;
export const EXPLANATION_LIMIT_SEC = 300;
export const FOLLOWUP_LIMIT_SEC = 90;

// Pilot limits for everyone. Free vs Pro splits are not decided yet (pricing-decisions).
export const DAILY_ATTEMPTS = 3;
export const RETRY_AFTER_FAIL_MS = 24 * 60 * 60 * 1000;

export const MAX_ANSWER_CHARS = 8000;

// Groq allows 28,800 audio seconds a day per key; stop a little short so a burst can't trip it.
export const DAILY_AUDIO_SEC_ALL_USERS = 25_000;

export const RUBRIC_COLLECTION = "voice_exam_rubrics";
export const ATTEMPT_COLLECTION = "voice_exam_attempts";
