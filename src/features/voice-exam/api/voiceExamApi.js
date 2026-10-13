import {
  EXAM_STATES,
  EXPLANATION_LIMIT_SEC,
  FOLLOWUP_LIMIT_SEC,
} from "../lib/examStates";

// MOCK implementation. Same function signatures the real API layer will have
// (see "API" in docs/product/VOICE_EXAM_SPEC.md section 10), so swapping to
// fetch() later changes only this file. Every function resolves to an
// AttemptView or Eligibility from lib/examStates.js.

const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
const TOTAL_QUESTIONS = 3;

const CORE_PROMPT =
  "Explain how authentication works in an API, from a user logging in to a protected request being accepted. Cover how passwords and tokens are handled.";
const FOLLOW_UPS = [
  "Why is a JWT's payload not a safe place for secrets?",
  "What problem does a refresh token solve, and how does rotation help?",
];

const MOCK_RESULT = {
  passed: false,
  concepts: [
    { label: "Password hashing", status: "solid", quote: "we hash it with bcrypt and a random salt" },
    { label: "JWT structure and signing", status: "shallow", quote: "the token has a signature" },
    { label: "Refresh token rotation", status: "missing" },
  ],
  retryAvailableAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
};

let current = null; // the single in-memory attempt

const deadlineIn = (sec) => new Date(Date.now() + sec * 1000).toISOString();

export async function getEligibility(/* layerId */) {
  await delay(300);
  return {
    eligible: true,
    reasons: [],
    cooldownUntil: null,
    quota: { used: 1, limit: 3 },
  };
}

export async function startAttempt({ layerId, mode }) {
  await delay(400);
  current = {
    id: crypto.randomUUID(),
    layerId,
    mode,
    state: EXAM_STATES.AWAITING_EXPLANATION,
    deadlineAt: deadlineIn(15 * 60),
    segmentLimitSec: EXPLANATION_LIMIT_SEC,
    currentPrompt: { text: CORE_PROMPT, kind: "prompt", n: 1, total: TOTAL_QUESTIONS },
    result: null,
    turnsDone: 0,
  };
  return toView(current);
}

// `turn` is { text } for typed answers or { audio: Blob } for recordings.
export async function submitTurn(attemptId, turn) {
  if (!current || current.id !== attemptId) throw new Error("Attempt not found");
  if (!turn?.text && !turn?.audio) throw new Error("Empty turn");

  await delay(1500); // stands in for transcribing + analyzing
  current.turnsDone += 1;

  if (current.turnsDone >= TOTAL_QUESTIONS) {
    await delay(1200); // stands in for grading
    current = { ...current, state: EXAM_STATES.COMPLETED, currentPrompt: null, result: MOCK_RESULT };
    return toView(current);
  }

  current = {
    ...current,
    state: EXAM_STATES.AWAITING_ANSWER,
    segmentLimitSec: FOLLOWUP_LIMIT_SEC,
    currentPrompt: {
      text: FOLLOW_UPS[current.turnsDone - 1],
      kind: "followup",
      n: current.turnsDone + 1,
      total: TOTAL_QUESTIONS,
    },
  };
  return toView(current);
}

export async function abandonAttempt(attemptId) {
  await delay(200);
  if (current?.id === attemptId) {
    current = { ...current, state: EXAM_STATES.ABANDONED, currentPrompt: null };
  }
  return current ? toView(current) : null;
}

// Strip mock-only bookkeeping so the UI sees exactly the AttemptView shape.
function toView({ turnsDone: _turnsDone, ...view }) {
  return view;
}
