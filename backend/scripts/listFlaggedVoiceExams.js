/**
 * Lists voice exams flagged for human review (read-only).
 * An exam is flagged when an answer spoke to the grader, or when two judgements of a
 * subtopic disagreed and the lower grade was kept.
 *
 * Usage (from the repo root):
 *   node backend/scripts/listFlaggedVoiceExams.js              the latest 20
 *   node backend/scripts/listFlaggedVoiceExams.js --days=7     only the last 7 days
 *   node backend/scripts/listFlaggedVoiceExams.js --id=<attemptId>   one exam in full, with the raw grader output
 */

import dotenv from "dotenv";
import { MongoClient, ObjectId } from "mongodb";
import process from "process";

dotenv.config({ path: "./backend/.env.local" });
dotenv.config({ path: "./backend/.env" });

const args = Object.fromEntries(
  process.argv.slice(2).map((a) => {
    const [k, v] = a.replace(/^--/, "").split("=");
    return [k, v ?? true];
  }),
);

const summarize = (a) => ({
  id: a._id.toString(),
  layer: a.layer,
  finishedAt: a.finishedAt,
  passed: a.passed,
  practice: Boolean(a.practice),
  // Learner identity stays out of the default listing; use --id to look closer.
  disputed: (a.result?.concepts ?? [])
    .filter((c) => c.secondOpinion && !c.secondOpinion.agreed)
    .map((c) => `${c.label}: kept ${c.status}, second said ${c.secondOpinion.status}`),
  turns: a.turns?.length ?? 0,
});

const main = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI env var is required");
  const mongo = new MongoClient(process.env.MONGO_URI);
  await mongo.connect();
  const col = mongo.db("DevsBlog").collection("voice_exam_attempts");

  try {
    if (args.id) {
      const a = await col.findOne({ _id: new ObjectId(String(args.id)), flagged: true });
      if (!a) return console.log("No flagged exam with that id.");
      console.log(JSON.stringify({ ...summarize(a), turnsText: a.turns, concepts: a.result?.concepts, gradings: a.gradings }, null, 2));
      return;
    }
    const since = args.days ? new Date(Date.now() - Number(args.days) * 86_400_000) : null;
    const rows = await col
      .find({ flagged: true, ...(since && { finishedAt: { $gte: since } }) })
      .sort({ finishedAt: -1 })
      .limit(20)
      .toArray();
    if (!rows.length) return console.log("No flagged exams.");
    for (const a of rows) console.log(JSON.stringify(summarize(a)));
  } finally {
    await mongo.close();
  }
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
