/**
 * What the AI mentor may know about a learner's challenge attempt.
 *
 * Rule: the mentor sees exactly what the learner already saw, nothing more.
 * Their own code, and the name + failure message of each hidden test from
 * their last submission (the submit response already showed them those).
 * Never the hidden test bodies, never the solution, never unrevealed hints —
 * otherwise "ask the mentor" becomes a free way around the XP hint economy.
 */

import { ObjectId } from "mongodb";

const ATTEMPTS = "challenge_attempts";
const CHALLENGES = "challenges";

// Prompt-cost caps. A whole file is usually far below this; the cap is for the
// learner who pastes a library into the editor.
const MAX_CODE_CHARS = 4000;
const MAX_MESSAGE_CHARS = 300;

const truncate = (text, max) =>
  text.length > max ? `${text.slice(0, max)}\n… (truncated)` : text;

export const getChallengeMentorView = async (db, userId, slug) => {
  if (typeof slug !== "string" || !slug.trim()) {
    return { error: "challengeSlug is required" };
  }

  const challenge = await db.collection(CHALLENGES).findOne(
    { slug: slug.trim(), status: "published" },
    // Whitelist: hiddenTests, solution and hint texts are never projected.
    { projection: { _id: 1, slug: 1, title: 1, difficulty: 1, trackId: 1, layerId: 1, tags: 1, "hints.order": 1 } },
  );
  if (!challenge) return { error: "Challenge not found" };

  const [attempt, result] = await Promise.all([
    db.collection(ATTEMPTS).findOne({
      userId: new ObjectId(userId),
      challengeId: challenge._id,
    }),
    db.collection("challengeResults").findOne(
      { userId: new ObjectId(userId), challengeId: challenge.slug },
      { projection: { status: 1, attempts: 1 } },
    ),
  ]);

  const base = {
    title: challenge.title,
    difficulty: challenge.difficulty,
    path: challenge.trackId,
    layer: challenge.layerId,
    tags: challenge.tags ?? [],
  };
  if (!attempt) return { ...base, started: false };

  // The file they edit, not the read-only test file (same pick as grading).
  const source =
    (attempt.code ?? []).find((f) => f.lang !== "test") ?? (attempt.code ?? [])[0];

  const last = attempt.lastResult;
  return {
    ...base,
    started: true,
    solved: result?.status === "solved",
    submissions: result?.attempts ?? 0,
    hintsRevealed: attempt.hintsRevealed?.length ?? 0,
    hintsAvailable: challenge.hints?.length ?? 0,
    fileName: source?.name ?? null,
    code: source?.code ? truncate(source.code, MAX_CODE_CHARS) : null,
    lastSubmission: last
      ? {
          passed: last.passed,
          at: last.at,
          failedTests: (last.results ?? [])
            .filter((r) => !r.passed)
            .map((r) => ({
              name: r.name,
              message: r.message ? truncate(r.message, MAX_MESSAGE_CHARS) : null,
            })),
        }
      : null,
  };
};
