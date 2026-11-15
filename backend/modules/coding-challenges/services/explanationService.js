/**
 * "Explain what you did": after solving a challenge, the learner explains their
 * code and the AI scores the explanation (explanationGrader.js).
 *
 * Only for a challenge the learner has solved, and only about the file they
 * would submit, so what is explained is the code that actually passed. A good
 * explanation pays a small XP bonus once per challenge; asking again to improve
 * the score is allowed and pays nothing more.
 */

import { ObjectId } from "mongodb";
import { CHALLENGE_LANGUAGES, JUDGE_LANGUAGES } from "../../../../constants/challengeLanguages.js";
import {
  EXPLAIN_MAX_CHARS,
  EXPLAIN_MIN_CHARS,
  EXPLAIN_PASS_SHARE,
  EXPLAIN_XP,
} from "../../../../constants/challengeExplain.js";
import { awardXp } from "../../../services/xpService.js";
import { pickSubmissionSource } from "../lib/submissionSource.js";
import { gradeExplanation } from "./explanationGrader.js";

const ATTEMPTS = "challenge_attempts";
const CHALLENGES = "challenges";

const fail = (status, message) => {
  throw Object.assign(new Error(message), { status });
};

// What the grader needs and what picking the graded file checks; the hidden
// tests themselves are never read here.
const CHALLENGE_PROJECTION = {
  slug: 1,
  trackId: 1,
  layerId: 1,
  title: 1,
  task: 1,
  constraints: 1,
  "solution.explanation": 1,
  starterFiles: 1,
  languages: 1,
  functionSpec: 1,
  "hiddenCases.name": 1,
};

const labelOf = (language) => [...CHALLENGE_LANGUAGES, ...JUDGE_LANGUAGES].find((l) => l.id === language)?.label ?? language;

export const explainSolutionService = async (db, userId, attemptId, { text, language } = {}) => {
  const explanationText = typeof text === "string" ? text.trim() : "";
  if (explanationText.length < EXPLAIN_MIN_CHARS) fail(400, `Write at least ${EXPLAIN_MIN_CHARS} characters.`);
  if (explanationText.length > EXPLAIN_MAX_CHARS) fail(400, `Keep it under ${EXPLAIN_MAX_CHARS} characters.`);
  if (!ObjectId.isValid(attemptId)) fail(404, "Attempt not found");

  const owner = new ObjectId(userId);
  // Ownership is part of the filter, never a read-then-compare.
  const attempt = await db.collection(ATTEMPTS).findOne({ _id: new ObjectId(attemptId), userId: owner });
  if (!attempt) fail(404, "Attempt not found");

  const challenge = await db.collection(CHALLENGES).findOne({ _id: attempt.challengeId }, { projection: CHALLENGE_PROJECTION });
  if (!challenge) fail(404, "Challenge not found");

  const solved = await db.collection("challengeResults").findOne(
    { userId: owner, challengeId: challenge.slug, status: "solved" },
    { projection: { _id: 1 } },
  );
  if (!solved) fail(403, "Solve the challenge first, then explain your solution.");

  // Same rules as a submit: a language this challenge offers, its own file.
  const picked = pickSubmissionSource(challenge, attempt.code, language);

  const graded = await gradeExplanation({
    challenge,
    languageLabel: labelOf(picked.language),
    // TypeScript is explained as written, with its types, not as the stripped JavaScript.
    code: attempt.code.find((f) => f.name === picked.fileName)?.code ?? picked.code,
    text: explanationText,
  });

  const good = graded.score >= Math.ceil(graded.maxScore * EXPLAIN_PASS_SHARE);
  let xpEarned = 0;
  if (good) {
    try {
      const award = await awardXp(db, owner, {
        kind: "challenge_explain",
        sourceId: challenge.slug,
        amount: EXPLAIN_XP,
        meta: { path: challenge.trackId, layer: challenge.layerId },
      });
      xpEarned = award.amount;
    } catch (err) {
      // A bonus: never lose the learner's feedback over it.
      console.error("explanation XP award failed (feedback still returned):", err);
    }
  }

  const explanation = {
    text: explanationText,
    language: picked.language,
    criteria: graded.criteria,
    score: graded.score,
    maxScore: graded.maxScore,
    summary: graded.summary,
    good,
    xpEarned,
    at: new Date(),
  };
  await db.collection(ATTEMPTS).updateOne({ _id: attempt._id }, { $set: { explanation, updatedAt: new Date() } });

  return { explanation };
};
