import process from "node:process";
import { getGroqClient } from "../config/groq.js";
import { createGroqGate, PRIORITY } from "./groqGate.js";

// The one way to call Groq chat completions. Every call waits its turn at the gate
// (services/groqGate.js), so the learners together stay inside the key's limits.

const CHARS_PER_TOKEN = 3.5;
// Output to budget for when a call sets no max_tokens (the mentor stream).
const DEFAULT_OUTPUT_TOKENS = 2000;
const DEFAULT_RETRY_AFTER_SEC = 5;
const MAX_RETRY_AFTER_SEC = 60;

// How long each kind of call may wait for its turn. A mentor reply already under way
// has the most to lose, so it waits longest; background work is skipped, not queued.
const MAX_WAIT_MS = { continuation: 20_000, interactive: 10_000, background: 0 };

const positiveInt = (raw, fallback) => {
  const n = Number(raw);
  return Number.isInteger(n) && n > 0 ? n : fallback;
};

// GROQ_GATE_TPM unset means no token bucket: only the concurrency cap and the 429 pause apply.
export const groqGate = createGroqGate({
  tokensPerMinute: positiveInt(process.env.GROQ_GATE_TPM, null),
  maxConcurrent: positiveInt(process.env.GROQ_GATE_CONCURRENCY, 8),
});

export const estimateCallTokens = ({ messages, tools, max_tokens: maxTokens }) =>
  Math.ceil((JSON.stringify(messages).length + (tools ? JSON.stringify(tools).length : 0)) / CHARS_PER_TOKEN) +
  (maxTokens ?? DEFAULT_OUTPUT_TOKENS);

const retryAfterSeconds = (err) => {
  const header = err?.headers?.get?.("retry-after") ?? err?.headers?.["retry-after"];
  const seconds = Number(header);
  return Number.isFinite(seconds) && seconds > 0 ? Math.min(seconds, MAX_RETRY_AFTER_SEC) : DEFAULT_RETRY_AFTER_SEC;
};

const noteRateLimit = (gate, err) => {
  if (err?.status === 429) gate.pause(retryAfterSeconds(err));
};

// Hands the chunks through and frees the gate's slot when the stream ends, fails, or
// the consumer stops reading. Groq reports usage on the last chunk.
async function* trackStream(stream, permit, gate) {
  let used;
  try {
    for await (const chunk of stream) {
      used = chunk.x_groq?.usage?.total_tokens ?? chunk.usage?.total_tokens ?? used;
      yield chunk;
    }
  } catch (err) {
    noteRateLimit(gate, err);
    throw err;
  } finally {
    permit.done(used);
  }
}

/**
 * `priority`: "continuation" (the next step of a reply already under way), "interactive"
 * (a learner waiting) or "background" (nobody waiting). Throws GroqBusyError when the
 * call cannot start in time; Groq's own errors pass through unchanged.
 */
export const groqChat = async (params, { priority = "interactive", maxWaitMs = MAX_WAIT_MS[priority], gate = groqGate } = {}) => {
  const permit = await gate.acquire({ cost: estimateCallTokens(params), priority: PRIORITY[priority], maxWaitMs });
  let result;
  try {
    result = await getGroqClient().chat.completions.create(params);
  } catch (err) {
    permit.done();
    noteRateLimit(gate, err);
    throw err;
  }
  if (params.stream) return trackStream(result, permit, gate);
  permit.done(result.usage?.total_tokens);
  return result;
};
