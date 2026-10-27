import { ObjectId } from "mongodb";
import { getGroqClient } from "../../../config/groq.js";
import { GRADE_JSON_SCHEMA, QUESTIONS_JSON_SCHEMA, gradeMessages, questionMessages, resolveLens } from "../lib/understandingPrompt.js";
import { gradeOutputSchema, questionsOutputSchema } from "../schemas/understanding.schemas.js";

const MAPS = "system_maps";
const CHECKS = "system_map_checks";

// Same model family as capstone review and teach-back grading.
const MODEL = "openai/gpt-oss-120b";
const MAX_TOKENS = 3000;
// A grading lock older than this belongs to a request that died; take it over.
const GRADING_LOCK_MS = 2 * 60 * 1000;
export const PASS_SCORE = 4; // of 6, and no answer may score 0

/*
 * system_map_checks: one understanding check on one map.
 *   { mapId, userId, lens, questions: [{ id, q, focus, rubric: { mustMention, modelAnswer } }],
 *     createdAt, gradingAt?, answeredAt, answers, results, passed }
 * The rubric never leaves the server until the learner has answered.
 * `lens` is the map's lens when the questions were written; grading uses the
 * same one even if the map's lens changes in between.
 */

const modelFailure = (cause) => Object.assign(new Error("model failed"), { modelFailed: true, cause });

/**
 * One strict-JSON completion, validated with Zod. Unusable output is retried
 * once; provider errors are not (they fail fast so the learner can retry).
 */
async function complete(messages, jsonSchema, name, zodSchema) {
  for (let attempt = 1; attempt <= 2; attempt++) {
    let completion;
    try {
      completion = await getGroqClient().chat.completions.create({
        model: MODEL,
        messages,
        response_format: { type: "json_schema", json_schema: { name, strict: true, schema: jsonSchema } },
        reasoning_effort: "low",
        max_tokens: MAX_TOKENS,
        temperature: 0,
      });
    } catch (err) {
      console.error(`system-map ${name}: provider error`, err.status, err.message);
      throw modelFailure(err);
    }
    try {
      return zodSchema.parse(JSON.parse(completion.choices?.[0]?.message?.content ?? ""));
    } catch (err) {
      console.warn(`system-map ${name}: output rejected (try ${attempt}):`, err.message);
    }
  }
  throw modelFailure();
}

const publicQuestion = (q) => ({ id: q.id, q: q.q, focus: q.focus });

/**
 * @returns {Promise<null | { error: "too_small" } | { checkId: string, questions: object[] }>}
 *   null = no such map for this user. Throws err.modelFailed when the model can't help.
 */
export async function createQuestionsService(db, mapId, userId) {
  const map = await db.collection(MAPS).findOne({ _id: new ObjectId(mapId), userId }, { projection: { graph: 1 } });
  if (!map) return null;
  if (map.graph.nodes.length < 2 || map.graph.edges.length < 1) return { error: "too_small" };

  const lens = resolveLens(map.graph.lens); // maps saved before lenses existed have none
  const { questions: raw } = await complete(questionMessages(map.graph, lens), QUESTIONS_JSON_SCHEMA, "map_questions", questionsOutputSchema);
  const partIds = new Set(map.graph.nodes.map((n) => n.id));
  const questions = raw.map((q, i) => ({
    id: `q${i + 1}`,
    q: q.q,
    focus: q.focus.filter((id) => partIds.has(id)), // the model may only point at parts that exist
    rubric: { mustMention: q.mustMention, modelAnswer: q.modelAnswer },
  }));

  const { insertedId } = await db.collection(CHECKS).insertOne({
    mapId: map._id,
    userId,
    lens,
    questions,
    createdAt: new Date(),
    answeredAt: null,
    results: null,
  });
  return { checkId: insertedId.toString(), questions: questions.map(publicQuestion) };
}

/**
 * @returns {Promise<null | { error: "answered" | "grading" | "mismatch" } | { results: object[], passed: boolean }>}
 *   null = no such check for this user. Throws err.modelFailed; the check then stays open.
 */
export async function submitAnswersService(db, checkId, userId, answers) {
  const checks = db.collection(CHECKS);
  const _id = new ObjectId(checkId);
  const check = await checks.findOne({ _id, userId });
  if (!check) return null;
  if (check.answeredAt) return { error: "answered" };

  const ids = check.questions.map((q) => q.id);
  const given = answers.map((a) => a.id);
  if (given.length !== ids.length || new Set(given).size !== given.length || !given.every((id) => ids.includes(id))) {
    return { error: "mismatch" };
  }

  // One grading at a time per check, so a double submit never pays the model twice.
  const now = new Date();
  const locked = await checks.findOneAndUpdate(
    {
      _id,
      userId,
      answeredAt: null,
      $or: [{ gradingAt: { $exists: false } }, { gradingAt: { $lt: new Date(now - GRADING_LOCK_MS) } }],
    },
    { $set: { gradingAt: now } },
  );
  if (!locked) return { error: "grading" };

  let graded;
  try {
    const map = await db.collection(MAPS).findOne({ _id: check.mapId, userId }, { projection: { graph: 1 } });
    if (!map) throw modelFailure(new Error("map deleted"));
    const lens = resolveLens(check.lens ?? map.graph.lens);
    graded = await complete(gradeMessages(map.graph, check.questions, answers, lens), GRADE_JSON_SCHEMA, "map_grading", gradeOutputSchema);
    if (!ids.every((id) => graded.results.some((r) => r.id === id))) throw modelFailure(new Error("missing results"));
  } catch (err) {
    await checks.updateOne({ _id, gradingAt: now }, { $unset: { gradingAt: "" } });
    throw err.modelFailed ? err : modelFailure(err);
  }

  const results = check.questions.map((q) => {
    const r = graded.results.find((x) => x.id === q.id);
    return { id: q.id, score: r.score, feedback: r.feedback, missed: r.missed, modelAnswer: q.rubric.modelAnswer };
  });
  const total = results.reduce((sum, r) => sum + r.score, 0);
  const passed = total >= PASS_SCORE && results.every((r) => r.score > 0);

  await checks.updateOne(
    { _id, gradingAt: now },
    { $set: { answeredAt: new Date(), answers, results, passed }, $unset: { gradingAt: "" } },
  );
  return { results, passed };
}
