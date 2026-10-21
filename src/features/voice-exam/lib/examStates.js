// Mirrors the backend state machine in docs/product/VOICE_EXAM_SPEC.md (section 4.2).
// The UI renders from `attempt.state`; it never invents a state of its own.
export const EXAM_STATES = Object.freeze({
  AWAITING_EXPLANATION: "AWAITING_EXPLANATION",
  TRANSCRIBING: "TRANSCRIBING",
  ANALYZING: "ANALYZING",
  AWAITING_ANSWER: "AWAITING_ANSWER",
  GRADING: "GRADING",
  COMPLETED: "COMPLETED",
  EXPIRED: "EXPIRED",
  ABANDONED: "ABANDONED",
  FAILED_TECHNICAL: "FAILED_TECHNICAL",
});

// States where the learner is expected to speak or type.
export const INPUT_STATES = [
  EXAM_STATES.AWAITING_EXPLANATION,
  EXAM_STATES.AWAITING_ANSWER,
];

// States where the server is working and the UI just waits.
export const WORKING_STATES = [
  EXAM_STATES.TRANSCRIBING,
  EXAM_STATES.ANALYZING,
  EXAM_STATES.GRADING,
];

// Terminal states that are not a normal result.
export const FAILURE_STATES = [
  EXAM_STATES.EXPIRED,
  EXAM_STATES.ABANDONED,
  EXAM_STATES.FAILED_TECHNICAL,
];

// Segment limits from the spec: 5:00 for the first explanation, 1:30 per follow-up.
export const EXPLANATION_LIMIT_SEC = 300;
export const FOLLOWUP_LIMIT_SEC = 90;

/**
 * @typedef {Object} Prompt
 * @property {string} text
 * @property {"prompt"|"followup"} kind
 * @property {number} n      1-based position of this question
 * @property {number} total  expected number of questions
 *
 * @typedef {Object} ConceptResult
 * @property {string} label
 * @property {"solid"|"shallow"|"missing"} status
 * @property {string} [quote]  verbatim words from the learner that earned the credit
 *
 * @typedef {Object} ExamResult
 * @property {boolean} passed
 * @property {ConceptResult[]} concepts
 * @property {string|null} retryAvailableAt  ISO date, null if passed
 *
 * @typedef {Object} AttemptView
 * @property {string} id
 * @property {string} layerId
 * @property {"graded"|"practice"} mode
 * @property {keyof typeof EXAM_STATES} state
 * @property {number} secondsLeft       exam time left when the server answered;
 *                                     the deadline itself never leaves the server
 * @property {number} segmentLimitSec
 * @property {Prompt|null} currentPrompt
 * @property {ExamResult|null} result
 *
 * @typedef {Object} Eligibility
 * @property {boolean} eligible
 * @property {string[]} reasons         why not eligible, human readable
 * @property {string|null} cooldownUntil
 * @property {{used:number, limit:number}} quota
 */
