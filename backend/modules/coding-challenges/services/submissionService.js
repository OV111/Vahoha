import { ObjectId } from "mongodb";
import { runHiddenTests, describeRunner } from "./runnerService.js";
import { runCaseTests } from "./judgeRunnerService.js";
import { describeJudge } from "./judge0Client.js";
import { judgeStarter } from "../../../../constants/challengeLanguages.js";
import { consumeSubmission, limitMessage } from "./submissionQuotaService.js";
import { getUserPlan } from "../../billing/index.js";
import { saveChallengeResult } from "../../../services/challengeResultService.js";
import { trackEvent } from "../../../services/eventService.js";
import { awardXp } from "../../../services/xpService.js";
import { pickSubmissionSource } from "../lib/submissionSource.js";
import { clearLeaderboardCache } from "./progressService.js";
import { integrityFlags, sanitizeArenaIntegrity } from "../lib/integrityFlags.js";

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
// Kept apart from the attempt: the attempt document is sent to the learner
// as it is, and review flags must stay server-side.
const INTEGRITY = "challenge_integrity";
const CHALLENGES = "challenges";

/**
 * XP earned. Full value the first time, nothing on a re-solve — otherwise a
 * solved challenge becomes an infinite XP faucet.
 */
export const matchesHiddenTests = (results, hiddenTests) =>
  Array.isArray(results) &&
  results.length === hiddenTests.length &&
  results.every((r, i) => r?.name === hiddenTests[i].name);

const awardFor =(challenge, alreadySolved) =>
  alreadySolved ? 0 : (challenge.xp ?? 0);

export const submitAttemptService = async (db, userId, attemptId, language, clientIntegrity) => {
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
  //
  // Which file is graded, and the export name, come from the challenge's own
  // starter file, never from the attempt: the attempt is user-written, and the
  // export name is spliced into the harness as an identifier.
  // The learner may have written the solution in JavaScript or TypeScript; the
  // file graded is the one for the chosen language, and TypeScript has its types
  // removed here, before any quota is spent, so a syntax error costs nothing.
  // Export name is derived from the file name: asyncHandler.js -> asyncHandler.
  const picked = pickSubmissionSource(challenge, attempt.code, language);
  const exportName = picked.exportName;
  // JavaScript and TypeScript are graded by the JavaScript tests in the local
  // sandbox. Every other language is graded by the data cases on the judge.
  const tests = (picked.onJudge ? challenge.hiddenCases : challenge.hiddenTests) ?? [];

  // Check the runner BEFORE spending quota: if submissions are disabled (no
  // sandbox in production) the learner must not lose one of today's tries.
  if (!(picked.onJudge ? describeJudge().available : describeRunner().available)) {
    const err = new Error(
      picked.onJudge
        ? "This language is temporarily unavailable. You can still submit in JavaScript or TypeScript."
        : "Code submissions are temporarily unavailable. You can still run the tests in your browser.",
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

  const run = picked.onJudge
    ? await runCaseTests(picked.language, picked.code, challenge.functionSpec, tests)
    : await runHiddenTests(picked.code, exportName, tests);

  const total = tests.length;
  if (!Array.isArray(run.results)) run.results = [];
  const passedCount = run.results.filter((r) => r?.passed === true).length;
  // The sandbox runs the learner's code, so its report is untrusted: it must
  // name exactly the hidden tests, in order, before any of it counts.
  const passed =
    !run.fatal && total > 0 && passedCount === total && matchesHiddenTests(run.results, tests);

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
      // one, so make sure it exists first.
      await db
        .collection("userProgress")
        .updateOne(
          { userId: new ObjectId(userId) },
          { $set: { updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
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

  const elapsedSecs = Math.max(
    0,
    Math.round((Date.now() - new Date(attempt.startedAt).getTime()) / 1000),
  );

  // `alreadySolved` above was a plain read, so two passing submissions racing
  // can both see "not solved". The atomic save decides which one is the first
  // solve; the solve count, the solve event and the review flags follow it.
  const { firstSolve } = await saveChallengeResult(db, userId, {
    challengeId: challenge.slug,
    path: challenge.trackId,
    layer: challenge.layerId,
    status: passed ? "solved" : "attempted",
    xpEarned,
    timeTakenSecs: elapsedSecs,
  });
  // A passing run changes the ranking: drop the cached board so this solver sees it at once.
  if (passed) clearLeaderboardCache();

  // Review flags, first solve only: that is the submission that pays XP and
  // moves the leaderboard. Never part of the verdict.
  if (firstSolve) {
    const integrity = sanitizeArenaIntegrity(clientIntegrity);
    const starterLength = picked.onJudge
      ? judgeStarter(picked.language, challenge.functionSpec).length
      : (challenge.starterFiles?.[0]?.code?.length ?? 0);
    const flags = integrityFlags({
      integrity,
      addedChars: Math.max(0, picked.code.length - starterLength),
      elapsedSecs,
    });
    if (flags.length) {
      try {
        await db.collection(INTEGRITY).updateOne(
          { userId: new ObjectId(userId), challengeId: challenge._id },
          { $set: { challengeSlug: challenge.slug, flags, integrity, elapsedSecs, flaggedAt: new Date() } },
          { upsert: true },
        );
      } catch (err) {
        // A review signal: never fail the learner's submission over it.
        console.error("challenge integrity flag not saved:", err);
      }
    }
  }

  // Count a solve once per user, so the public solve count means "people who
  // solved this", not "submissions that happened to pass".
  await db.collection(CHALLENGES).updateOne(
    { _id: challenge._id },
    {
      $inc: {
        "stats.attempts": 1,
        "stats.solves": firstSolve ? 1 : 0,
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

  // Every graded submission, failed ones included: the streak and the weekly
  // summary count practice, and a day spent failing a hard challenge is practice.
  await trackEvent(db, userId, "challenge_submitted", { challengeId: challenge.slug, passed });

  // First solve only, same rule as the public solve count.
  if (firstSolve) {
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
    // A submission that lost the race to its twin solved nothing new either.
    alreadySolved: alreadySolved || (passed && !firstSolve),
    // The solution is the reward for passing — never sent otherwise.
    solution: passed ? challenge.solution : null,
  };
};
