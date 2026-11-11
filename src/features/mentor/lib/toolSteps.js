import { THINKING_COPY, TOOL_STEPS, TOOL_STEP_MAX_TEXT } from "../../../../constants/mentorTools";

/** Model-provided text is untrusted display text: collapse whitespace and cap the length. */
const clip = (value) => {
  if (typeof value !== "string") return "";
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > TOOL_STEP_MAX_TEXT ? `${text.slice(0, TOOL_STEP_MAX_TEXT - 1)}…` : text;
};

/** "jwt-signature" reads as "jwt signature" to a learner. */
const humanize = (slug) => clip(typeof slug === "string" ? slug.replace(/[-_]+/g, " ") : "");

const countOf = (result) => {
  if (Array.isArray(result)) return result.length;
  if (Array.isArray(result?.results)) return result.results.length;
  return null;
};

const fieldsOf = (input = {}, result) => ({
  topic: humanize(input.slug ?? input.topicSlug ?? input.topic ?? input.challengeSlug),
  keyword: clip(input.keyword),
  username: clip(input.username),
  count: countOf(result),
  found: result?.found,
});

/**
 * One tool call as a line the learner can read.
 *
 * `settled` means the turn is over: a call still marked running then never
 * finished (cancelled or errored stream), and must not spin forever in an old trace.
 *
 * @returns {{ text: string, outcome: string|null, state: "running"|"done"|"failed", quiet: boolean }}
 */
export const describeStep = (call, { settled = false } = {}) => {
  const config = TOOL_STEPS[call.name];
  const fields = fieldsOf(call.input, call.result);
  const text = config ? config.running(fields) : THINKING_COPY.generic;
  const quiet = Boolean(config?.quiet);

  if (call.status === "running") {
    if (settled) return { text, outcome: THINKING_COPY.interrupted, state: "failed", quiet };
    return { text, outcome: null, state: "running", quiet };
  }

  if (call.result?.error) {
    const outcome =
      call.result.error === "tool_timeout" ? THINKING_COPY.timedOut : (config?.failed ?? THINKING_COPY.failed);
    return { text, outcome, state: "failed", quiet };
  }

  return { text, outcome: config ? config.done(fields) : THINKING_COPY.genericDone, state: "done", quiet };
};

/**
 * What the collapsed summary line needs: how long the steps took, how many real
 * tools ran (bookkeeping excluded), and whether anything is still going.
 */
export const summarizeTrace = (calls, steps) => {
  const started = calls.map((c) => c.startedAt).filter(Number.isFinite);
  const ended = calls.map((c) => c.endedAt).filter(Number.isFinite);
  const complete = ended.length === calls.length && started.length === calls.length;
  const elapsedMs = complete ? Math.max(...ended) - Math.min(...started) : 0;
  const seconds = Math.floor(elapsedMs / 1000);

  return {
    seconds: seconds >= 1 ? seconds : null,
    toolCount: steps.filter((s) => !s.quiet).length,
    running: steps.some((s) => s.state === "running"),
  };
};
