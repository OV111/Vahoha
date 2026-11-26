/**
 * Learn topic seeder: copies the authored topics into `learn_topics` as drafts.
 *
 * Usage:
 *   node backend/seeders/learnTopicSeeder.js            validate only, write nothing
 *   node backend/seeders/learnTopicSeeder.js --write    also write to MONGO_URI
 *
 * Source of truth is `src/features/learn/content/topics/*.js`. Every topic is
 * validated first, and one invalid topic stops the whole run.
 *
 * Only drafts are ever written. A version that was reviewed, published or
 * archived is left alone: raise `version` in the topic file to change it.
 */

import process from "process";
import dns from "node:dns";
import dotenv from "dotenv";
import { readdir } from "fs/promises";
import { basename, dirname, join } from "path";
import { fileURLToPath, pathToFileURL } from "url";
import { MongoClient } from "mongodb";
import { MONGO_OPTIONS } from "../config/db.js";
import { topicSchema } from "../modules/learn/schemas/topic.schemas.js";
import { ensureLearnIndexes, topics } from "../modules/learn/services/learnData.js";
import { TOPIC_STATUS } from "../modules/learn/lib/constants.js";

dotenv.config({ path: "./backend/.env" });

const TOPICS_DIR = join(dirname(fileURLToPath(import.meta.url)), "../../src/features/learn/content/topics");
const DUPLICATE_KEY = 11000;

const loadTopics = async () => {
  const files = (await readdir(TOPICS_DIR)).filter((f) => f.endsWith(".js") && f !== "index.js");
  return Promise.all(
    files.map(async (f) => ({
      file: basename(f),
      topic: (await import(pathToFileURL(join(TOPICS_DIR, f)))).default,
    })),
  );
};

const toDraft = (topic, now) => ({
  version: 1,
  ...topic,
  status: TOPIC_STATUS.DRAFT,
  reviewedBy: null,
  publishedAt: null,
  createdAt: now,
  updatedAt: now,
});

const writeDraft = async (db, draft) => {
  const { createdAt, ...fields } = draft;
  try {
    const result = await topics(db).updateOne(
      { topicId: draft.topicId, version: draft.version, status: TOPIC_STATUS.DRAFT },
      { $set: fields, $setOnInsert: { createdAt } },
      { upsert: true },
    );
    return result.upsertedCount ? "added" : "updated";
  } catch (err) {
    // The filter matches drafts only, so a duplicate means this version has moved past draft.
    if (err.code === DUPLICATE_KEY) return "skipped: this version is no longer a draft";
    throw err;
  }
};

async function seed() {
  const now = new Date();
  const loaded = await loadTopics();
  const drafts = loaded.map(({ file, topic }) => ({ file, draft: toDraft(topic, now) }));

  const invalid = drafts
    .map(({ file, draft }) => ({ file, result: topicSchema.safeParse(draft) }))
    .filter(({ result }) => !result.success);
  for (const { file, result } of invalid)
    console.error(`${file}:\n  ${result.error.issues.map((i) => `${i.path.join(".")} ${i.message}`).join("\n  ")}`);
  if (invalid.length) throw new Error(`${invalid.length} invalid topic(s); nothing was written`);

  console.log(`${drafts.length} topics valid`);
  if (!process.argv.includes("--write")) return console.log("Dry run. Add --write to save them.");

  if (!process.env.MONGO_URI) throw new Error("MONGO_URI is missing");
  if (process.env.DNS_SERVERS) dns.setServers(process.env.DNS_SERVERS.split(",").map((s) => s.trim()));

  const client = new MongoClient(process.env.MONGO_URI, MONGO_OPTIONS);
  try {
    await client.connect();
    const db = client.db("DevsBlog");
    await ensureLearnIndexes(db);
    for (const { draft } of drafts) console.log(`${draft.topicId} v${draft.version}: ${await writeDraft(db, draft)}`);
    console.log(`learn_topics now holds ${await topics(db).countDocuments()} documents`);
  } finally {
    await client.close();
  }
}

seed().catch((err) => {
  console.error("Learn topic seed failed:", err.message);
  process.exit(1);
});
