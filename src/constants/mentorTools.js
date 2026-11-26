/**
 * Plain-language copy for what the mentor is doing in the background.
 *
 * The learner never sees a tool name. Every step is described from a small
 * `fields` object that lib/toolSteps.js builds from the tool's input and result
 * (slugs humanised, model-provided text truncated), so nothing here handles raw
 * values and every string is rendered as text.
 */

/** Longest model-provided fragment (keyword, username, topic) shown in a step. */
export const TOOL_STEP_MAX_TEXT = 40;

export const THINKING_COPY = {
  thinking: "Thinking…",
  working: "Working…",
  generic: "Working on it",
  genericDone: "Done",
  failed: "Couldn't finish that step, continuing without it",
  timedOut: "That took too long, continuing without it",
  interrupted: "Didn't finish",
  thought: (seconds) => (seconds ? `Thought for ${seconds}s` : "Thought"),
  usedTools: (count) => `used ${count} ${count === 1 ? "tool" : "tools"}`,
  moreSteps: (count) => `+${count} more`,
  earlierSteps: (count) => `+${count} earlier`,
  stepsLabel: "Steps the mentor took",
  composing: "Putting it together…",
  sources: (count) => `${count} ${count === 1 ? "source" : "sources"}`,
  sourcesLabel: "Sources used",
  sourceOpens: (title) => `${title} (opens in a new tab)`,
};

/** Where each kind of source opens. Ids are checked server-side before they get here. */
export const SOURCE_ROUTES = {
  library: (id) => `/libs/${id}`,
};

const plural = (count, one, many) => `${count} ${count === 1 ? one : many}`;

/**
 * `running(f)` is the present-tense line, `done(f)` the outcome, `failed` the calm
 * line when the tool errored. `quiet` marks bookkeeping the learner does not need
 * to read about: shown muted and not counted as a tool used.
 *
 * f = { topic, keyword, count, found, latestScore, weakAreas, started, solved,
 *       submissions, status, passed }. Other people's names never appear here:
 * a profile lookup is described without saying whose.
 */
export const TOOL_STEPS = {
  get_concept: {
    running: (f) => (f.topic ? `Reading the lesson on ${f.topic}` : "Reading the lesson"),
    done: (f) =>
      f.found === false
        ? `No authored lesson for ${f.topic || "this topic"}, answering from general knowledge`
        : f.topic
          ? `Read the lesson on ${f.topic}`
          : "Read the lesson",
    failed: "Couldn't read the lesson, continuing without it",
  },
  search_library: {
    running: (f) => (f.keyword ? `Searching the library for “${f.keyword}”` : "Searching the library"),
    done: (f) => (f.count === 0 ? "No matching resources" : f.count ? `Found ${plural(f.count, "resource", "resources")}` : "Searched the library"),
    failed: "Couldn't search the library, continuing without it",
  },
  search_posts: {
    running: (f) => (f.keyword ? `Searching posts for “${f.keyword}”` : "Searching posts"),
    done: (f) => (f.count === 0 ? "No matching posts" : f.count ? `Found ${plural(f.count, "post", "posts")}` : "Searched posts"),
    failed: "Couldn't search posts, continuing without it",
  },
  get_exam_history: {
    running: () => "Reviewing your recent test results",
    done: (f) =>
      f.count === 0
        ? "No test results yet"
        : f.count
          ? `Reviewed your last ${plural(f.count, "test", "tests")}${f.latestScore == null ? "" : ` (latest ${f.latestScore}%)`}`
          : "Reviewed your recent test results",
    failed: "Couldn't read your test history, continuing without it",
  },
  get_weak_spots: {
    running: () => "Checking your weak spots",
    done: (f) =>
      f.count === 0 ? "No weak spots on record" : f.count ? `Found ${plural(f.count, "weak spot", "weak spots")}` : "Checked your weak spots",
    failed: "Couldn't check your weak spots, continuing without it",
  },
  get_learner_context: {
    running: (f) => (f.topic ? `Checking what you got wrong on ${f.topic}` : "Reviewing your learning progress"),
    done: (f) =>
      f.topic
        ? f.weakAreas > 0
          ? `Found ${plural(f.weakAreas, "weak area", "weak areas")} on ${f.topic}`
          : `Checked what you got wrong on ${f.topic}`
        : "Reviewed your learning progress",
    failed: "Couldn't review your progress, continuing without it",
  },
  get_user_progress: {
    running: () => "Checking where you are on your roadmap",
    done: () => "Checked where you are on your roadmap",
    failed: "Couldn't read your roadmap progress, continuing without it",
  },
  get_challenge_attempt: {
    running: () => "Reading your challenge code and failing tests",
    done: (f) =>
      f.started === false
        ? "You haven't started this challenge yet"
        : f.solved
          ? `Read your solved challenge (${plural(f.submissions, "submission", "submissions")})`
          : `Read your code (${plural(f.submissions, "submission", "submissions")}, not solved yet)`,
    failed: "Couldn't read your challenge attempt, continuing without it",
  },
  get_capstone_status: {
    running: () => "Checking your capstone review",
    done: (f) =>
      f.count === 0
        ? "No capstone started yet"
        : f.passed === true
          ? "Checked your capstone: review passed"
          : f.passed === false
            ? "Checked your capstone: review not passed yet"
            : "Checked your capstone status",
    failed: "Couldn't read your capstone status, continuing without it",
  },
  get_user_profile: {
    running: () => "Looking up a profile",
    done: () => "Looked up a profile",
    failed: "Couldn't find that profile, continuing without it",
  },
  log_weak_spot: {
    quiet: true,
    running: () => "Noting this down for later",
    done: () => "Noted for later",
    failed: "Couldn't note that down",
  },
  log_teaching_attempt: {
    quiet: true,
    running: () => "Noting this down for later",
    done: () => "Noted for later",
    failed: "Couldn't note that down",
  },
};
