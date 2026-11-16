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

dotenv.config({ path: "./backend/.env.local" });
dotenv.config({ path: "./backend/.env" });

const __dirname = dirname(fileURLToPath(import.meta.url));
const RUBRIC_DIR = join(__dirname, "rubrics");
const ROADMAP_DIR = join(__dirname, "..", "..", "src", "data", "roadmaps");

const findLayer = (roadmap, layerId) => {
  for (const layers of Object.values(roadmap)) {
    const hit = Array.isArray(layers) && layers.find((l) => l.id === layerId);
    if (hit) return hit;
  }
  return null;
};

// Throws on any mismatch: a follow-up for a renamed subtopic would silently never be asked.
const buildRubric = (file, layer) => {
  const sections = [...(layer.sideLeft ?? []), ...(layer.sideRight ?? [])];
  const groups = file.groups.map((g) => {
    const section = sections.find((s) => s.title === g.title);
    if (!section) throw new Error(`${file.layer}: no subtopic group "${g.title}" in the roadmap`);
    const subtopics = section.children.map((c) => {
      const followUp = g.followUps?.[c.title];
      if (!followUp) throw new Error(`${file.layer}: no follow-up for "${c.title}"`);
      return { title: c.title, description: c.description, followUp };
    });
    const extra = Object.keys(g.followUps ?? {}).filter((t) => !section.children.some((c) => c.title === t));
    if (extra.length) throw new Error(`${file.layer}: follow-ups for unknown subtopics: ${extra.join(", ")}`);
    return { title: g.title, question: g.question, subtopics };
  });
  return { path: file.path, layer: file.layer, groups };
};

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
      console.log(`  ✓ ${layerId}: ${rubric.groups.length} groups`);
    }
  }

  await mongo.close();
};

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
