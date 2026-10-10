import { ObjectId } from "mongodb";
import { runHiddenTests, describeRunner } from "./runnerService.js";
import { consumeSubmission, limitMessage } from "./submissionQuotaService.js";
import { getUserPlan } from "../../billing/index.js";
import { saveChallengeResult } from "../../../services/challengeResultService.js";
import { trackEvent } from "../../../services/eventService.js";
import { awardXp } from "../../../services/xpService.js";

/**
 * Submission grading.
 *
 * "Run" is client-side and advisory. THIS is the authority: it executes the
 * user's code against `hiddenTests`, which never leave the server, so editing
 * the visible test file cannot manufacture a pass.
 *
 * A pass must be all-or-nothing. Partial credit would make the XP economy
 * incoherent — hints cost XP, so a challenge that pays out for 4/7 would let a
 * user farm XP by buying hints on problems they never finish.
 */

const ATTEMPTS = "challenge_attempts";
const CHALLENGES = "challenges";

/**
 * XP earned. Full value the first time, nothing on a re-solve — otherwise a
 * solved challenge becomes an infinite XP faucet.
 */
const awardFor = (challenge, alreadySolved) =>
  alreadySolved ? 0 : (challenge.xp ?? 0);

export const submitAttemptService = async (db, userId, attemptId) => {
  if (!ObjectId.isValid(attemptId)) {
    const err = new Error("Attempt not found");
    err.status = 404;
    throw err;
  }

  // Ownership is part of the filter, never a read-then-compare.
  const attempt = await db.collection(ATTEMPTS).findOne({
    _id: new ObjectId(attemptId),
    userId: new ObjectId(userId),
  });
  if (!attempt) {
    const err = new Error("Attempt not found");
    err.status = 404;
    throw err;
  }

  const challenge = await db
    .collection(CHALLENGES)
    .findOne({ _id: attempt.challengeId });
  if (!challenge) {
    const err = new Error("Challenge not found");
    err.status = 404;
    throw err;
  }

  // The student edits exactly one module; the test file is read-only client
  // side and irrelevant here since grading uses the hidden set.
  const source = (attempt.code ?? []).find((f) => f.lang !== "test") ??
    (attempt.code ?? [])[0];
  if (!source?.code?.trim()) {
    const err = new Error("There is no code to submit yet.");
    err.status = 400;
    throw err;
  }

  // Export name is derived from the file name: asyncHandler.js -> asyncHandler.
  const exportName = source.name.replace(/\.[^.]+$/, "");

  // Check the runner BEFORE spending quota: if submissions are disabled (no
  // sandbox in production) the learner must not lose one of today's tries.
  if (!describeRunner().available) {
    const err = new Error(
      "Code submissions are temporarily unavailable. You can still run the tests in your browser.",
    );
    err.status = 503;
    throw err;
  }

  // Spent only once the submission is known to be valid and runnable.
  const quota = await consumeSubmission(db, userId, await getUserPlan(db, userId));
  if (!quota.allowed) {
    const err = new Error(limitMessage(quota));
    err.status = 429;
    throw err;
  }

  const run = await runHiddenTests(
    source.code,
    exportName,
    challenge.hiddenTests,
  );

  const total = challenge.hiddenTests?.length ?? 0;
  const passedCount = run.results.filter((r) => r.passed).length;
  const passed = !run.fatal && total > 0 && passedCount === total;

  // Was this already solved on a previous submission?
  const previous = await db.collection("challengeResults").findOne({
    userId: new ObjectId(userId),
    challengeId: challenge.slug,
  });
  const alreadySolved = previous?.status === "solved";

  const xpDue = passed ? awardFor(challenge, alreadySolved) : 0;

  // Through the XP ledger, like exams and capstones. Its unique
  // (user, "challenge", slug) row means two passing submissions racing each
  // other can both see "not solved yet" above, but only one of them gets paid.
  let xpEarned = 0;
  if (xpDue > 0) {
    try {
      // awardXp credits an existing userProgress document and never creates
      // one, so make sure it exists (and record the activity) first.
      await db
        .collection("userProgress")
        .updateOne(
          { userId: new ObjectId(userId) },
          { $set: { lastActiveAt: new Date(), updatedAt: new Date() } },
          { upsert: true },
        );
      const award = await awardXp(db, userId, {
        kind: "challenge",
        sourceId: challenge.slug,
        amount: xpDue,
        meta: { path: challenge.trackId, layer: challenge.layerId },
      });
      xpEarned = award.amount;
    } catch (err) {
      // Derived reward: never fail the learner's submission over it.
      console.error("challenge XP award failed (result still saved):", err);
    }
  }

  // `saveChallengeResult` overwrites the fields it is given, so the running
  // total has to be carried forward — otherwise re-submitting a solved
  // challenge would rewrite its history to "earned 0".
  const xpOnRecord = (previous?.xpEarned ?? 0) + xpEarned;

  await saveChallengeResult(db, userId, {
    challengeId: challenge.slug,
    path: challenge.trackId,
    layer: challenge.layerId,
    // A solve is permanent — a later failed experiment must not demote it.
    status: passed || alreadySolved ? "solved" : "attempted",
    xpEarned: xpOnRecord,
    timeTakenSecs: Math.max(
      0,
      Math.round((Date.now() - new Date(attempt.startedAt).getTime()) / 1000),
    ),
    attempts: 1,
  });

  // Count a solve once per user, so the public solve count means "people who
  // solved this", not "submissions that happened to pass".
  await db.collection(CHALLENGES).updateOne(
    { _id: challenge._id },
    {
      $inc: {
        "stats.attempts": 1,
        "stats.solves": passed && !alreadySolved ? 1 : 0,
      },
    },
  );

  await db.collection(ATTEMPTS).updateOne(
    { _id: attempt._id },
    {
      $set: {
        lastResult: { passed, results: run.results, at: new Date() },
        updatedAt: new Date(),
      },
      $inc: { runs: 1 },
    },
  );

  // First solve only, same rule as the public solve count.
  if (passed && !alreadySolved) {
    await trackEvent(db, userId, "challenge_solved", {
      challengeId: challenge.slug,
      path: challenge.trackId,
      layer: challenge.layerId,
    });
  }

  return {
    passed,
    passedCount,
    total,
    results: run.results,
    error: run.error ?? null,
    xpEarned,
    alreadySolved,
    // The solution is the reward for passing — never sent otherwise.
    solution: passed ? challenge.solution : null,
  };
};
