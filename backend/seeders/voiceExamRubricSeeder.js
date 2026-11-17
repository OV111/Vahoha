/**
 * Voice Exam Rubric Seeder
 *
 * Usage:
 *   node backend/seeders/voiceExamRubricSeeder.js
 *
 * Joins each file in seeders/rubrics/<path>/<layer>.json (questions and follow-ups,
 * human-reviewed) with that layer's subtopics in src/data/roadmaps/<path>.json (the
 * checklist and its descriptions), so the descriptions live in one place only.
 * Only files with `reviewed: true` go live; a file set back to false is taken down.
 */

import dotenv from "dotenv";
import { MongoClient } from "mongodb";
import process from "process";
import { readFile, readdir } from "fs/promises";
import { dirname, join, basename } from "path";
import { fileURLToPath } from "url";
import { buildRubric, findLayer } from "../modules/voice-exam/lib/rubricBuild.js";

dotenv.config({ path: "./backend/.env.local" });
dotenv.config({ path: "./backend/.env" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const RUBRIC_DIR = join(__dirname, "rubrics");
const ROADMAP_DIR = join(__dirname, "..", "..", "src", "data", "roadmaps");

const seed = async () => {
  if (!process.env.MONGO_URI) throw new Error("MONGO_URI env var is required");

  const mongo = new MongoClient(process.env.MONGO_URI);
  await mongo.connect();
  const col = mongo.db("DevsBlog").collection("voice_exam_rubrics");

  for (const pathDir of await readdir(RUBRIC_DIR)) {
    const roadmap = JSON.parse(await readFile(join(ROADMAP_DIR, `${pathDir}.json`), "utf8"));
    for (const name of await readdir(join(RUBRIC_DIR, pathDir))) {
      const file = JSON.parse(await readFile(join(RUBRIC_DIR, pathDir, name), "utf8"));
      const layerId = basename(name, ".json");
      if (file.layer !== layerId) throw new Error(`${name}: "layer" says ${file.layer}`);

      if (!file.reviewed) {
        const { deletedCount } = await col.deleteOne({ layer: layerId });
        console.log(`  - ${layerId}: not reviewed, skipped${deletedCount ? " (taken down)" : ""}`);
        continue;
      }

      const layer = findLayer(roadmap, layerId);
      if (!layer) throw new Error(`${layerId}: not found in ${pathDir}.json`);
      const rubric = buildRubric(file, layer);
      await col.updateOne(
        { layer: layerId },
        { $set: { ...rubric, reviewed: true, updatedAt: new Date() }, $setOnInsert: { createdAt: new Date() } },
        { upsert: true },
      );
      const hasCriteria = file.groups.some((g) => g.criteria);
      const note = !hasCriteria ? "" : file.criteriaReviewed ? ", criteria live" : ", criteria in draft (not live)";
      console.log(`  ✓ ${layerId}: ${rubric.groups.length} groups${note}`);
    }
  }

  await mongo.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
