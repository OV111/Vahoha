import connectDB from "../../../config/db.js";
import { getUserProgress } from "../../../services/userProgressService.js";
import { getExamHistory } from "../../../services/examHistoryService.js";
import { getWeakSpots, addWeakSpot } from "../../../services/weakSpotService.js";
import {
  getLearnerContext,
  getTopicDetail,
} from "./learnerContextService.js";
import { recomputeMastery, getMastery } from "../../../services/learnerMasteryService.js";
import { getConcept, getConcepts } from "../../../services/conceptService.js";
import { logTeachingAttempt } from "./teachingLogService.js";
import { toTopicSlug } from "../../../utils/topicKey.js";
import { escapeRegex } from "../../../utils/regex.js";
import { isLayerId } from "../../../utils/layerIds.js";
import { getCapstoneMentorView } from "../../capstone/index.js";
import { getChallengeMentorView } from "../../coding-challenges/index.js";

export const toolDefinitions = [
  {
    type: "function",
    function: {
      name: "get_challenge_attempt",
      description:
        "Get the learner's own attempt at one coding challenge: their current code, which tests failed on their last submission and why, and how many hints they bought. Call this when they ask for help with a challenge (the current one's slug is in the learner state when they came from the challenge page). Coach with questions and pointers to the failing line or idea — never write the fixed function or paste a working solution; hints cost XP on the challenge page.",
      parameters: {
        type: "object",
        properties: {
          challengeSlug: { type: "string", description: "The challenge slug, e.g. 'async-handler'." },
        },
        required: ["challengeSlug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_capstone_status",
      description:
        "Get the learner's capstone project status: attempt state, AI review scores and feedback per rubric criterion, and their last defense result. Call this when they ask about their capstone, its review, or why it failed. Coach from the feedback Socratically — never write capstone code or draft defense answers.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "search_posts",
      description: "Search community posts by keyword on Vahoha. Use when the user asks about a topic and you want to surface relevant platform content.",
      parameters: {
        type: "object",
        properties: {
          category: { type: "string", description: "Category to search in (e.g. backend, javascript, devops)" },
          keyword: { type: "string", description: "Keyword or topic to search for" },
          limit: { type: "number", description: "Max results (default 5)" },
        },
        required: ["category", "keyword"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "search_library",
      description:
        "Search the Vahoha learning library for books, docs, and guides. Use when the user needs resources to study a topic, or to ground an explanation in a source. Pass `layer` to get what is curated for one roadmap layer. Some books include reviewed key ideas (`concepts`); explain in your own words and cite the book as \"Source: <title>\". Never cite a book you did not get from this tool.",
      parameters: {
        type: "object",
        properties: {
          keyword: { type: "string", description: "Keyword to search (title, description, topics)" },
          layer: { type: "string", description: "Roadmap layer id to filter by, e.g. mern-2" },
          limit: { type: "number", description: "Max results (default 5, max 10)" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_user_profile",
      description: "Look up a Vahoha user's public profile by username.",
      parameters: {
        type: "object",
        properties: {
          username: { type: "string", description: "Username to look up" },
        },
        required: ["username"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_user_progress",
      description: "Get the current user's roadmap progress — active path, current layer, completed layers. Call this when the user asks where they are in their learning journey.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_exam_history",
      description: "Get the current user's recent test results, scores, and missed topics. Call this when the user asks why they failed or wants to review past tests.",
      parameters: {
        type: "object",
        properties: {
          limit: { type: "number", description: "Number of recent tests to fetch (default 5)" },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_weak_spots",
      description: "Get the topics the current user has struggled with. Call this when the user asks what they should review or study next.",
      parameters: { type: "object", properties: {} },
    },
  },
  {
    type: "function",
    function: {
      name: "get_learner_context",
      // The compact summary is already in the system prompt on every turn, so
      // this tool is the DRILL-IN path only. Saying that in the description is
      // what stops the model re-fetching context it can already see.
      description:
        "Drill into the learner's evidence beyond the summary already provided to you. Pass topicSlug (e.g. 'jwt-signature') to get the per-criterion breakdown of what exactly they got wrong on a topic, including detected misconceptions. Omit topicSlug for the full cross-platform picture. Do NOT call this just to re-read the summary you already have.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description:
              "Canonical topic key from the context summary, e.g. 'jwt-signature'. Use when the user asks what specifically they got wrong on one topic.",
          },
        },
      },
    },
  },
  {
    type: "function",
    function: {
      name: "get_concept",
      description:
        "Look up Vahoha's authored domain knowledge for a concept: its definition, purpose, prerequisites, and the known misconceptions WITH the authored correction for each. Call this before teaching or correcting a topic, especially when the learner's state lists a misconception — the correction here is the platform's canonical explanation and should shape your answer.",
      parameters: {
        type: "object",
        properties: {
          slug: {
            type: "string",
            description: "Concept id / topic slug, e.g. 'jwt-signature'.",
          },
          includePrerequisites: {
            type: "boolean",
            description:
              "Also return the concepts this one builds on. Use when the learner's confusion may actually be in a prerequisite.",
          },
        },
        required: ["slug"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "log_teaching_attempt",
      description:
        "Record HOW you just explained something, so future conversations do not repeat an explanation that already failed. Call this after you teach or correct a concept, describing your angle in a few words (e.g. 'jwt.io decode demo showing readable payload'). Do not record whether it worked — that is measured from their later assessments, not from your judgement.",
      parameters: {
        type: "object",
        properties: {
          topicSlug: {
            type: "string",
            description: "Canonical topic slug, e.g. 'jwt-signature'.",
          },
          approach: {
            type: "string",
            description:
              "Short description of the angle you used — the analogy, example, or question. Not the full explanation.",
          },
          misconceptionId: {
            type: "string",
            description: "The misconception id you were correcting, if any.",
          },
        },
        required: ["topicSlug", "approach"],
      },
    },
  },
  {
    type: "function",
    function: {
      name: "log_weak_spot",
      description: "Record a topic the user is struggling with. Call this when the user reveals confusion about a specific concept during the conversation.",
      parameters: {
        type: "object",
        properties: {
          topic: {
            type: "string",
            description:
              "A short topic name, at most 8 words, e.g. 'JWT signatures'. Never a sentence. At most 3 notes per reply, and a topic counts once per day.",
          },
          path: { type: "string", description: "The roadmap path (e.g. backend)" },
          layer: { type: "string", description: "The layer id (e.g. api-dev-1)" },
        },
        required: ["topic"],
      },
    },
  },
];

// ── Argument hygiene ──────────────────────────────────────────────────────────
// The arguments are model output, and the model can be steered by anything it
// reads. A tool therefore never trusts a type: strings are coerced and capped,
// limits are clamped, and an object where a string belongs (e.g. {"$ne": ""} as
// a username) becomes "" instead of reaching a Mongo filter.

const MAX_LIMIT = 10;
const DEFAULT_LIMIT = 5;
const SLUG_PATTERN = /^[a-z0-9-]+$/;

/** Trimmed string capped at `max` characters, or "" for anything that is not a string. */
const text = (raw, max) => (typeof raw === "string" ? raw.trim().slice(0, max) : "");

/** Integer in 1..MAX_LIMIT; the default for anything that is not a usable number. */
const clampLimit = (raw, fallback = DEFAULT_LIMIT) => {
  const n = Math.trunc(Number(raw));
  return Number.isFinite(n) && n > 0 ? Math.min(n, MAX_LIMIT) : fallback;
};

// A tool that hangs (a stuck query) must not hold the learner's reply hostage.
const TOOL_TIMEOUT_MS = 15_000;

// The only tools that change the learner's record. What they write can come from
// text the model was steered by (an attached file, a post), so a reply gets a
// small budget of them and their input must have a strict shape.
const WRITE_TOOLS = new Set(["log_weak_spot", "log_teaching_attempt"]);
export const MAX_WRITES_PER_TURN = 3;

/** A fresh budget for one reply; streamService passes it in the tool context. */
export const createWriteBudget = () => ({ used: 0, weakSpotSlugs: new Set() });

// A weak spot's topic is shown in every later prompt, so anything that does not
// read like a topic name is refused instead of stored: a sentence or an
// instruction saved here would be replayed into the mentor on every message.
const TOPIC_MAX_CHARS = 60;
const TOPIC_MAX_WORDS = 8;
const TOPIC_SHAPE = /^[\p{L}\p{N}][\p{L}\p{N} .,'()/+#&:-]*$/u;
const PATH_SHAPE = /^[a-z0-9-]{1,40}$/;

const topicName = (raw) => {
  const topic = typeof raw === "string" ? raw.replace(/\s+/g, " ").trim() : "";
  if (!topic || topic.length > TOPIC_MAX_CHARS) return null;
  if (topic.split(" ").length > TOPIC_MAX_WORDS) return null;
  if (/:\/\/|www\./i.test(topic) || !TOPIC_SHAPE.test(topic)) return null;
  return topic;
};

const OBJECT_ID = /^[a-f0-9]{24}$/i;
const MAX_SOURCES = 5;
const MAX_SOURCE_TITLE = 120;

const rowsOf = (result) => (Array.isArray(result) ? result : []);

/**
 * What the browser is allowed to know about a tool result.
 *
 * The model gets the full result; the learner's screen only needs a few facts to
 * word a step ("Found 5 resources", "latest 62%"). Sending the whole thing would
 * put other people's profile fields and the learner's own code into every
 * response body for no reason, so each tool lists exactly what it may expose,
 * and a tool that is not listed exposes nothing. Sources carry an id and a title
 * only; the client builds the link.
 */
export const summarizeToolResult = (name, result) => {
  if (result && typeof result === "object" && !Array.isArray(result) && typeof result.error === "string") {
    return { error: result.error === "tool_timeout" ? "tool_timeout" : "tool_failed" };
  }

  switch (name) {
    case "search_library": {
      const rows = rowsOf(result);
      return {
        count: rows.length,
        sources: rows
          .filter((r) => OBJECT_ID.test(String(r?._id)) && typeof r.title === "string" && r.title)
          .slice(0, MAX_SOURCES)
          .map((r) => ({ kind: "library", id: String(r._id), title: r.title.slice(0, MAX_SOURCE_TITLE) })),
      };
    }
    case "search_posts":
    case "get_weak_spots":
      return { count: rowsOf(result).length };
    case "get_exam_history": {
      const rows = rowsOf(result);
      return { count: rows.length, latestScore: typeof rows[0]?.score === "number" ? rows[0].score : null };
    }
    case "get_concept":
      return { found: result?.found !== false };
    case "get_learner_context":
      return { weakAreas: result?.teachBackBreakdown?.[0]?.weakCriteria?.length ?? null };
    case "get_challenge_attempt":
      return { started: Boolean(result?.started), solved: Boolean(result?.solved), submissions: result?.submissions ?? 0 };
    case "get_capstone_status": {
      const latest = result?.capstones?.[0];
      return {
        count: result?.capstones?.length ?? 0,
        status: typeof latest?.status === "string" ? latest.status : null,
        passed: typeof latest?.review?.passed === "boolean" ? latest.review.passed : null,
      };
    }
    default:
      return {};
  }
};

/**
 * Run one tool. Never throws: a failing or hanging tool becomes a structured
 * error the model can read and talk around, instead of ending the whole turn.
 * ctx = { db, userId } for user-aware tools; falls back to standalone DB for public tools.
 */
export async function executeTool(name, args, ctx = {}) {
  const safeArgs = args && typeof args === "object" && !Array.isArray(args) ? args : {};

  // Counted before the tool runs and synchronously, so tools started in parallel
  // in one round cannot all slip under the limit together.
  if (WRITE_TOOLS.has(name) && ctx.writeBudget) {
    if (ctx.writeBudget.used >= MAX_WRITES_PER_TURN) return { error: "write_limit" };
    ctx.writeBudget.used += 1;
  }
  let timer;
  const timeout = new Promise((resolve) => {
    timer = setTimeout(() => resolve({ error: "tool_timeout" }), TOOL_TIMEOUT_MS);
  });

  try {
    return await Promise.race([runTool(name, safeArgs, ctx), timeout]);
  } catch (err) {
    console.error(`mentor tool "${name}" failed:`, err);
    return { error: "tool_failed" };
  } finally {
    clearTimeout(timer);
  }
}

async function runTool(name, args, ctx) {
  const db = ctx.db ?? (await connectDB());
  const userId = ctx.userId;

  if (name === "search_posts") {
    const category = text(args.category, 60);
    const keyword = text(args.keyword, 100);
    if (!category || !keyword) return { error: "category and keyword are required" };
    const limit = clampLimit(args.limit);
    const posts = db.collection("posts-default");
    return posts
      .find({
        category: { $regex: escapeRegex(category), $options: "i" },
        $or: [
          { title: { $regex: escapeRegex(keyword), $options: "i" } },
          { content: { $regex: escapeRegex(keyword), $options: "i" } },
        ],
      })
      .project({ title: 1, category: 1, author: 1 })
      .limit(limit)
      .toArray();
  }

  if (name === "search_library") {
    const { layer } = args;
    const keyword = text(args.keyword, 100);
    const filter = {};
    if (keyword) {
      const match = { $regex: escapeRegex(keyword), $options: "i" };
      filter.$or = [{ title: match }, { description: match }, { topics: match }];
    }
    if (isLayerId(layer)) filter.layerIds = layer;
    if (!filter.$or && !filter.layerIds) return { error: "keyword or layer is required" };

    const resources = await db
      .collection("libraryResources")
      .find(filter)
      .project({ title: 1, description: 1, type: 1, difficulty: 1, layerIds: 1, digestVisibility: 1 })
      .limit(clampLimit(args.limit))
      .toArray();

    // Only reviewed, kept ideas from public digests: an admin-only or
    // unreviewed digest must never reach a learner through the mentor.
    const publicIds = resources.filter((r) => r.digestVisibility === "public").map((r) => r._id);
    const concepts = publicIds.length
      ? await db
          .collection("libraryConcepts")
          .find({ sourceId: { $in: publicIds }, reviewed: true, keep: true })
          .project({ sourceId: 1, key: 1, title: 1, summary: 1 })
          .sort({ order: 1 })
          .toArray()
      : [];

    return resources.map((r) => ({
      _id: r._id,
      title: r.title,
      description: r.description,
      type: r.type,
      difficulty: r.difficulty,
      layerIds: r.layerIds ?? [],
      concepts: concepts
        .filter((c) => String(c.sourceId) === String(r._id))
        .slice(0, 3)
        .map(({ key, title, summary }) => ({ key, title, summary })),
    }));
  }

  if (name === "get_user_profile") {
    const username = text(args.username, 40);
    if (!username) return { error: "username is required" };
    const users = db.collection("users");
    const user = await users.findOne(
      { username },
      { projection: { firstName: 1, lastName: 1, username: 1, _id: 1 } },
    );
    if (!user) return { error: "User not found" };
    const stats = await db.collection("usersStats").findOne(
      { userId: user._id },
      // _id: 0 — without it the stats document's own _id overwrites the user's
      // _id in the spread below, handing the model the wrong identifier.
      // The field list stays a whitelist so private stats never reach the model.
      { projection: { _id: 0, bio: 1, location: 1, githubLink: 1, followersCount: 1, postsCount: 1 } },
    );
    return { ...user, ...stats };
  }

  if (name === "get_user_progress") {
    if (!userId) return { error: "Not authenticated" };
    const progress = await getUserProgress(db, userId);
    return progress ?? { message: "No roadmap started yet" };
  }

  if (name === "get_exam_history") {
    if (!userId) return { error: "Not authenticated" };
    return getExamHistory(db, userId, clampLimit(args.limit));
  }

  if (name === "get_weak_spots") {
    if (!userId) return { error: "Not authenticated" };
    return getWeakSpots(db, userId);
  }

  if (name === "get_learner_context") {
    if (!userId) return { error: "Not authenticated" };

    const topicSlug = text(args.topicSlug, 100);
    if (topicSlug) {
      // Deliberately its own read rather than a filter over the memoized
      // summary context: that one is capped for prompt cost, so an older topic
      // may not appear in it, and answering "untested" for a topic the learner
      // actually failed months ago would be worse than the extra query.
      const detail = await getTopicDetail(db, userId, topicSlug);
      return detail ?? { error: "Unrecognised topic slug" };
    }

    // Reuse the context already assembled for this turn's system prompt when
    // the caller supplied it — otherwise this is the second identical set of
    // five queries in one request.
    return ctx.loadLearnerContext
      ? ctx.loadLearnerContext()
      : getLearnerContext(db, userId);
  }

  if (name === "get_concept") {
    // Domain knowledge is platform-wide, not per-learner, so this one needs no
    // auth check — there is nothing about the user in it.
    const slug = text(args.slug, 100);
    if (!slug) return { error: "slug is required" };
    const concept = await getConcept(db, slug);
    if (!concept) {
      // Say so explicitly rather than returning null: the model must fall back to
      // its own knowledge knowingly, not silently treat an empty result as
      // "this concept has no misconceptions".
      return { found: false, slug, message: "No authored concept for this slug." };
    }

    if (args.includePrerequisites !== true || !concept.prerequisites?.length) {
      return { found: true, ...concept };
    }

    return {
      found: true,
      ...concept,
      prerequisiteConcepts: await getConcepts(db, concept.prerequisites),
    };
  }

  if (name === "log_teaching_attempt") {
    if (!userId) return { error: "Not authenticated" };

    // Capture the topic's CURRENT status as the baseline the outcome is measured
    // against later. Read from stored mastery, so the mentor is not the one
    // deciding what state the learner was in when it taught them.
    const topicSlug = text(args.topicSlug, 100);
    const slug = toTopicSlug(topicSlug);
    const mastery = await getMastery(db, userId);
    const statusAtTime = mastery.find((t) => t.slug === slug)?.status ?? null;

    const logged = await logTeachingAttempt(db, userId, {
      topicSlug,
      // One short line: this note is replayed into later prompts, so it is kept
      // to a description of an angle, not room for paragraphs of text.
      approach: text(args.approach, 200).replace(/\s+/g, " "),
      misconceptionId: text(args.misconceptionId, 80) || null,
      statusAtTime,
      sessionId: ctx.sessionId ?? null,
    });

    if (!logged) return { error: "topicSlug and approach are both required" };
    return { logged: true, topicSlug: logged.slug, statusAtTime };
  }

  if (name === "log_weak_spot") {
    if (!userId) return { error: "Not authenticated" };
    if (!text(args.topic, 200)) return { error: "topic is required" };
    const topic = topicName(args.topic);
    if (!topic) return { error: "topic must be a short topic name, like 'JWT signatures'" };

    const slug = toTopicSlug(topic);
    if (ctx.writeBudget?.weakSpotSlugs.has(slug)) return { logged: true, topic, alreadyLoggedThisTurn: true };
    ctx.writeBudget?.weakSpotSlugs.add(slug);

    const path = PATH_SHAPE.test(text(args.path, 60)) ? text(args.path, 60) : "unknown";
    const layer = isLayerId(text(args.layer, 60)) ? text(args.layer, 60) : "unknown";
    const saved = await addWeakSpot(db, userId, {
      topic,
      path,
      layer,
      source: "agent",
      sessionId: ctx.sessionId ?? null,
    });
    // Already counted today: nothing changed, so there is nothing to recompute.
    if (saved?.skipped) return { logged: false, topic, reason: "already noted today" };

    // Confusion revealed in conversation is evidence like any other, so the
    // Adaptive Engine has to see it — otherwise the topic the mentor JUST logged
    // is absent from the context of the learner's very next message.
    try {
      await recomputeMastery(db, userId);
    } catch (err) {
      console.error("mastery recompute after log_weak_spot failed:", err);
    }

    return { logged: true, topic };
  }

  if (name === "get_capstone_status") {
    if (!userId) return { error: "Not authenticated" };
    return getCapstoneMentorView(db, userId);
  }

  if (name === "get_challenge_attempt") {
    if (!userId) return { error: "Not authenticated" };
    const challengeSlug = text(args.challengeSlug, 80);
    if (!SLUG_PATTERN.test(challengeSlug)) return { error: "challengeSlug must be a slug like 'async-handler'" };
    return getChallengeMentorView(db, userId, challengeSlug);
  }

  return { error: `Unknown tool: ${name}` };
}
