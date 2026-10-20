/**
 * The one place the capstone talks to the LLM. Kept separate so tests can
 * replace it, and so a model switch is a one-file change.
 */

import process from "process";
import { getGroqClient } from "../../../config/groq.js";
import { REVIEW_MODEL } from "../lib/constants.js";
import {
  FLOOR_OUTPUT_TOKENS,
  estimateRequestTokens,
  outputTokenBudget,
  parseTpmLimit,
  reasoningEffortFor,
} from "../lib/tokenBudget.js";

const fail = (status, message) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};

/**
 * One strict-JSON completion.
 * @param {object[]} messages
 * @param {object} jsonSchema  JSON Schema the API enforces on the output
 * @param {string} name        schema name (shows up in provider logs)
 * @returns {Promise<{ content: string, usage: object|null }>}
 */
export const runStructured = async (messages, jsonSchema, name) => {
  // A request over the tier's per-minute budget is refused outright, so size
  // the output to what is left after the input (see lib/tokenBudget.js).
  const tpmLimit = parseTpmLimit(process.env.GROQ_TPM_LIMIT);
  const inputTokens = estimateRequestTokens(messages, jsonSchema);
  const maxTokens = outputTokenBudget(inputTokens, tpmLimit);
  if (maxTokens < FLOOR_OUTPUT_TOKENS) {
    console.error(`capstone model (${name}): ~${inputTokens} input tokens leave ${maxTokens} for output under GROQ_TPM_LIMIT=${tpmLimit}`);
    fail(503, "The AI reviewer is at capacity. Try again in a minute.");
  }

  let completion;
  try {
    completion = await getGroqClient().chat.completions.create({
      model: REVIEW_MODEL,
      messages,
      // Strict structured output: the API itself rejects malformed JSON.
      response_format: { type: "json_schema", json_schema: { name, strict: true, schema: jsonSchema } },
      // gpt-oss is a reasoning model: max_tokens must cover its thinking AND
      // the JSON. "medium" is the quality/cost middle ground; "low" under a small TPM limit.
      reasoning_effort: reasoningEffortFor(tpmLimit),
      max_tokens: maxTokens,
      temperature: 0,
    });
  } catch (err) {
    // 413 = prompt larger than the tier's per-minute token budget; 429 = rate
    // limited. Both are capacity problems on our side, not the learner's.
    if (err.status === 413 || err.status === 429) {
      fail(503, "The AI reviewer is at capacity. Try again in a minute.");
    }
    console.error(`capstone model error (${name}):`, err.status, err.message);
    fail(502, "The AI reviewer failed. Try again in a minute.");
  }

  const choice = completion.choices?.[0];
  if (choice?.finish_reason === "length") fail(502, "The AI reviewer ran out of space. Try again.");
  return { content: choice?.message?.content ?? "", usage: completion.usage ?? null };
};

export const runReviewModel = (messages, jsonSchema) => runStructured(messages, jsonSchema, "capstone_review");
