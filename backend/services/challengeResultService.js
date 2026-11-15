import { ObjectId } from "mongodb";

export const getChallengeResults = async (db, userId) => {
  const collection = db.collection("challengeResults");
  return collection
    .find({ userId: new ObjectId(userId) })
    .sort({ solvedAt: -1 })
    .toArray();
};

export const getSolvedChallenges = async (db, userId) => {
  const collection = db.collection("challengeResults");
  return collection
    .find({ userId: new ObjectId(userId), status: "solved" })
    .toArray();
};

/**
 * Record one graded submission on the learner's result row.
 *
 * One atomic upsert, not read-then-write: two submissions racing used to both
 * read "not solved" and both count as the first solve. `returnDocument: "before"`
 * tells the caller whether THIS call is the one that turned the row solved.
 *
 * A solve is permanent, and so is when it happened: a later submission (even a
 * failing one) must not move `solvedAt`, or re-submitting an old solve would
 * pull it back into the leaderboard's 7-day window. `timeTakenSecs` is likewise
 * the time to the first solve. `xpEarned` is this submission's award, added to
 * the running total.
 *
 * Relies on the unique (userId, challengeId) index in config/db.js; without it
 * two first-ever submissions could each insert a row.
 *
 * @returns {Promise<{ firstSolve: boolean }>}
 */
export const saveChallengeResult = async (
  db,
  userId,
  { challengeId, path, layer, status, xpEarned = 0, timeTakenSecs = 0 },
) => {
  const collection = db.collection("challengeResults");
  const solvedNow = status === "solved";
  const wasSolved = { $eq: ["$status", "solved"] };

  const write = () =>
    collection.findOneAndUpdate(
      { userId: new ObjectId(userId), challengeId },
      [
        {
          $set: {
            path: { $ifNull: ["$path", path] },
            layer: { $ifNull: ["$layer", layer] },
            status: { $cond: [wasSolved, "solved", status] },
            xpEarned: { $add: [{ $ifNull: ["$xpEarned", 0] }, xpEarned] },
            timeTakenSecs: { $cond: [wasSolved, "$timeTakenSecs", timeTakenSecs] },
            attempts: { $add: [{ $ifNull: ["$attempts", 0] }, 1] },
            solvedAt: { $cond: [wasSolved, "$solvedAt", solvedNow ? "$$NOW" : null] },
          },
        },
      ],
      { upsert: true, returnDocument: "before" },
    );

  let before;
  try {
    before = await write();
  } catch (err) {
    // Two first-ever submissions both tried to insert; the loser updates the winner's row.
    if (err?.code !== 11000) throw err;
    before = await write();
  }
  const row = before && "lastErrorObject" in before ? before.value : before;
  return { firstSolve: solvedNow && row?.status !== "solved" };
};
