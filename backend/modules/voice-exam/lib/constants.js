// Mirrors src/features/voice-exam/lib/examStates.js: the UI renders whatever state the server sends.
export const STATES = Object.freeze({
  AWAITING_EXPLANATION: "AWAITING_EXPLANATION",
  ANALYZING: "ANALYZING",
  AWAITING_ANSWER: "AWAITING_ANSWER",
  GRADING: "GRADING",
  COMPLETED: "COMPLETED",
  EXPIRED: "EXPIRED",
  ABANDONED: "ABANDONED",
  // Closed after MAX_FAILED_TRIES failed tries on one answer: never a fail, but it uses a try.
  FAILED_TECHNICAL: "FAILED_TECHNICAL",
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

// Each failed try on an answer can cost Whisper and model calls, so resending is not endless.
export const MAX_FAILED_TRIES = 3;

// Groq allows 28,800 audio seconds a day per key; stop a little short so a burst can't trip it.
export const DAILY_AUDIO_SEC_ALL_USERS = 25_000;

// Three full exams (5 min explanation + a few 90 s follow-ups each) fit with room for re-records;
// past this, one account is spending everyone's audio allowance.
export const DAILY_AUDIO_SEC_PER_USER = 45 * 60;

export const RUBRIC_COLLECTION = "voice_exam_rubrics";
export const ATTEMPT_COLLECTION = "voice_exam_attempts";
