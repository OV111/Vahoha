/**
 * Keeps one model request inside the provider's tokens-per-minute (TPM) limit.
 *
 * Groq refuses a request outright (413) when input tokens plus the requested
 * `max_tokens` exceed the tier's per-minute budget, and waiting never helps.
 * So both halves are sized up front from GROQ_TPM_LIMIT: the code we send, and
 * the output we ask for. Unset means no clamping (paid tiers with large limits).
 * Pure: the limit is a parameter, so every rule is unit-tested.
 */

export const CHARS_PER_TOKEN = 3.5;
export const MAX_OUTPUT_TOKENS = 8000;
// Smallest output that still fits the review JSON plus the model's reasoning.
export const MIN_OUTPUT_TOKENS = 3000;
// Under this a review cannot be written at all, so the call is not even attempted.
// Between the floor and MIN_OUTPUT_TOKENS it is tried: the estimate is only a guess.
export const FLOOR_OUTPUT_TOKENS = 1500;
// System prompt, brief, rubric and output schema: everything except the code.
// Measured over all 176 seeded briefs: typical ~1.4k, the longest ~2.3k. Callers
// that know their brief pass its real cost instead of this worst case.
export const DEFAULT_PROMPT_OVERHEAD_TOKENS = 2300;
// The "files not shown" list the review prompt appends (capped at MAX_LISTED_OMITTED paths).
const OMITTED_LIST_TOKENS = 400;
// The estimate is a guess, not a tokenizer.
const SAFETY_MARGIN_TOKENS = 300;
// Below this, the output ceiling is tight enough that medium reasoning would eat it.
const LOW_REASONING_BELOW_TPM = 20_000;

export const parseTpmLimit = (raw) => {
  const n = Number(raw);
  return Number.isFinite(n) && n > 0 ? n : null;
};

export const estimateTokens = (...texts) =>
  Math.ceil(texts.reduce((sum, t) => sum + t.length, 0) / CHARS_PER_TOKEN);

/** Input tokens of a chat request: the message text as the model reads it, plus the output schema. */
export const estimateRequestTokens = (messages, jsonSchema) =>
  estimateTokens(...messages.map((m) => m.content), JSON.stringify(jsonSchema));

/** `max_tokens` for a request with this much input; below MIN_OUTPUT_TOKENS means it cannot fit. */
export const outputTokenBudget = (inputTokens, tpmLimit) =>
  tpmLimit === null
    ? MAX_OUTPUT_TOKENS
    : Math.min(MAX_OUTPUT_TOKENS, tpmLimit - inputTokens - SAFETY_MARGIN_TOKENS);

/** Most characters of repository code one review can carry under this limit. */
export const codeCharsForLimit = (tpmLimit, overheadTokens = DEFAULT_PROMPT_OVERHEAD_TOKENS) =>
  Math.max(
    0,
    Math.floor(
      (tpmLimit - MIN_OUTPUT_TOKENS - overheadTokens - OMITTED_LIST_TOKENS - SAFETY_MARGIN_TOKENS) * CHARS_PER_TOKEN,
    ),
  );

export const reasoningEffortFor = (tpmLimit) =>
  tpmLimit !== null && tpmLimit < LOW_REASONING_BELOW_TPM ? "low" : "medium";
