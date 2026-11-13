import { THINKING_COPY, SOURCE_ROUTES, TOOL_STEPS, TOOL_STEP_MAX_TEXT } from "../../../../constants/mentorTools";

/** Model-provided text is untrusted display text: collapse whitespace and cap the length. */
const clip = (value) => {
  if (typeof value !== "string") return "";
  const text = value.replace(/\s+/g, " ").trim();
  return text.length > TOOL_STEP_MAX_TEXT ? `${text.slice(0, TOOL_STEP_MAX_TEXT - 1)}…` : text;
};

/** "jwt-signature" reads as "jwt signature" to a learner. */
const humanize = (slug) => clip(typeof slug === "string" ? slug.replace(/[-_]+/g, " ") : "");

const countOf = (result) => {
  if (Number.isFinite(result?.count)) return result.count;
  if (Array.isArray(result)) return result.length;
  return null;
};

const numberOr = (value) => (Number.isFinite(value) ? value : null);

/**
 * Links for the sources a step used. The server already limits these to an id and a
 * title, but a link is built from them, so the kind must be a known route and the
 * id plain characters, or the source is dropped.
 */
const sourcesOf = (result) =>
  (Array.isArray(result?.sources) ? result.sources : []).flatMap((s) =>
    SOURCE_ROUTES[s?.kind] && typeof s.id === "string" && /^[\w-]+$/.test(s.id) && typeof s.title === "string"
      ? [{ title: clip(s.title), href: SOURCE_ROUTES[s.kind](s.id) }]
      : [],
  );

// Only what the screen needs, and never a name: `username` in the input is
// deliberately not read, so a profile lookup cannot show whose profile it was.
const fieldsOf = (input = {}, result) => ({
  topic: humanize(input.slug ?? input.topicSlug ?? input.topic ?? input.challengeSlug),
  keyword: clip(input.keyword),
  count: countOf(result),
  found: result?.found,
  latestScore: numberOr(result?.latestScore),
  weakAreas: numberOr(result?.weakAreas),
  started: result?.started,
  solved: result?.solved,
  submissions: numberOr(result?.submissions),
  status: typeof result?.status === "string" ? clip(result.status) : null,
  passed: typeof result?.passed === "boolean" ? result.passed : null,
});

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

  return {
    text,
    outcome: config ? config.done(fields) : THINKING_COPY.genericDone,
    state: "done",
    quiet,
    sources: sourcesOf(call.result),
  };
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
    sourceCount: steps.reduce((n, s) => n + (s.sources?.length ?? 0), 0),
    running: steps.some((s) => s.state === "running"),
  };
};
