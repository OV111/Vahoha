/**
 * Exam Question Bank Importer — loads answers authored by an external LLM.
 *
 * Flow: scripts/generateExamPrompts.js writes docs/exam-prompts/<category>/<track>.md,
 * you paste it into Gemini / ChatGPT, then paste every reply into
 * docs/exam-prompts/<category>/<track>-output.md. This script reads those files.
 *
 * Usage:
 *   node backend/seeders/examImport.js --dry-run          # validate only, no DB writes
 *   node backend/seeders/examImport.js                    # import every *-output.md
 *   node backend/seeders/examImport.js mern api-dev       # only these tracks
 *
 * Safe to re-run: questions already in a bank (same normalized stem) are
 * skipped, so importing the same file twice adds nothing. New questions are
 * stored with reviewed: false, exactly like the Groq seeder. REVIEW them.
 */

import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { MongoClient } from "mongodb";
import process from "process";
import { readFile } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { QUESTIONS_PER_LAYER, isValidQuestion, normalizeStem, nextQuestionNumber } from "./lib/examBank.js";
import { loadTracks } from "./lib/roadmapIndex.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PROMPT_DIR = join(__dirname, "../../docs/exam-prompts");
const SOURCE = "imported";

// ── Parsing ───────────────────────────────────────────────────

// Chat UIs wrap, bold or escape things. Accept `LAYER: x`, `**LAYER: x**`,
// `LAYER: \`x\``, and so on, as long as it starts a line.
const LAYER_MARKER = /^[\s>#*_`-]*LAYER:\s*[`*_]*([A-Za-z0-9._-]+)/gim;

// Copy-pasting rendered markdown leaves backslash escapes like \_ or \* in
// front of characters that are not valid JSON escapes, which breaks parsing.
const unescapeMarkdown = (s) => s.replace(/\\([_*[\]#`~>-])/g, "$1");

const parseArray = (chunk) => {
  const start = chunk.indexOf("[");
  const end = chunk.lastIndexOf("]");
  if (start < 0 || end <= start) return { error: "no JSON array found" };
  const text = chunk.slice(start, end + 1);
  for (const candidate of [text, unescapeMarkdown(text)]) {
    try {
      const parsed = JSON.parse(candidate);
      if (Array.isArray(parsed)) return { questions: parsed };
    } catch {
      // try the next candidate
    }
  }
  return { error: "JSON did not parse (check quotes, trailing commas, cut-off reply)" };
};

/** @returns {Map<string, { questions: object[], errors: string[] }>} layerId -> everything found for it */
const parseOutputFile = (raw) => {
  const markers = [...raw.matchAll(LAYER_MARKER)];
  const byLayer = new Map();
  markers.forEach((m, i) => {
    const layerId = m[1];
    const chunk = raw.slice(m.index + m[0].length, markers[i + 1]?.index ?? raw.length);
    const entry = byLayer.get(layerId) ?? { questions: [], errors: [] };
    const { questions, error } = parseArray(chunk);
    if (error) entry.errors.push(error);
    else entry.questions.push(...questions);
    byLayer.set(layerId, entry);
  });
  return byLayer;
};

// ── Checks that need a human to look ──────────────────────────

// A key spread this uneven usually means the model leaned on one position,
// which is a hint that some keys may be wrong rather than proof.
const answerSpreadWarning = (questions) => {
  if (questions.length < 20) return null;
  const counts = [0, 0, 0, 0];
  for (const q of questions) counts[q.answerIdx]++;
  const worst = Math.max(...counts) / questions.length;
  return worst > 0.4 ? `answer key skewed (${counts.join("/")} for A/B/C/D)` : null;
};

// LLMs write the right answer as the longest, most hedged choice. Learners
// learn to pick it without knowing the material, so the exam stops measuring
// anything. Pure chance would make the correct choice longest about 25% of the time.
const lengthBiasWarning = (questions) => {
  if (questions.length < 20) return null;
  const longest = questions.filter((q) => {
    const lens = q.choices.map((c) => c.length);
    return lens.every((l, i) => i === q.answerIdx || lens[q.answerIdx] > l);
  }).length;
  const share = longest / questions.length;
  if (share > 0.5) return `correct answer is strictly the longest choice in ${Math.round(share * 100)}% of questions (chance is ~25%)`;
  // Over-correcting makes the same tell in reverse: "pick the shortest".
  const shortest = questions.filter((q) => {
    const lens = q.choices.map((c) => c.length);
    return lens.every((l, i) => i === q.answerIdx || lens[q.answerIdx] < l);
  }).length;
  const shortShare = shortest / questions.length;
  return shortShare > 0.5 ? `correct answer is strictly the shortest choice in ${Math.round(shortShare * 100)}% of questions (chance is ~25%)` : null;
};

// ── Main ──────────────────────────────────────────────────────

const run = async () => {
  const args = process.argv.slice(2);
  const dryRun = args.includes("--dry-run");
  const onlyTracks = new Set(args.filter((a) => !a.startsWith("--")));

  const tracks = (await loadTracks()).filter((t) => !onlyTracks.size || onlyTracks.has(t.trackId));

  let mongo;
  let col;
  if (!dryRun) {
    if (!process.env.MONGO_URI) throw new Error("MONGO_URI env var is required (or use --dry-run)");
    mongo = new MongoClient(process.env.MONGO_URI);
    await mongo.connect();
    col = mongo.db("DevsBlog").collection("exam_question_banks");
    console.log("Connected to MongoDB.\n");
  } else {
    console.log("DRY RUN: nothing will be written.\n");
  }

  const totals = { files: 0, layers: 0, added: 0, rejected: 0, duplicates: 0 };
  const problems = [];

  for (const track of tracks) {
    const file = join(PROMPT_DIR, track.categoryId, `${track.trackId}-output.md`);
    let raw;
    try {
      raw = await readFile(file, "utf-8");
    } catch (err) {
      if (err.code === "ENOENT") continue; // no output pasted for this track yet
      throw err;
    }
    if (!raw.trim()) continue; // created empty, nothing pasted yet
    totals.files++;
    console.log(`${track.categoryId}/${track.trackId}`);

    const parsed = parseOutputFile(raw);
    const knownLayers = new Map(track.layers.map((l) => [l.id, l]));

    for (const unknown of [...parsed.keys()].filter((id) => !knownLayers.has(id))) {
      problems.push(`${track.trackId}: output has layer "${unknown}", which is not in this track (ignored)`);
    }

    for (const layer of track.layers) {
      const found = parsed.get(layer.id);
      if (!found) continue;
      for (const e of found.errors) problems.push(`${layer.id}: ${e}`);

      const existing = col ? await col.findOne({ path: track.categoryId, layer: layer.id }) : null;
      const current = existing?.questions ?? [];
      const seen = new Set(current.map((q) => normalizeStem(q.stem)));

      const fresh = [];
      let rejected = 0;
      let duplicates = 0;
      for (const q of found.questions) {
        if (!isValidQuestion(q)) { rejected++; continue; }
        const key = normalizeStem(q.stem);
        if (seen.has(key)) { duplicates++; continue; }
        seen.add(key);
        fresh.push(q);
      }

      const room = Math.max(0, QUESTIONS_PER_LAYER - current.length);
      const toAdd = fresh.slice(0, room);

      const warn = answerSpreadWarning(toAdd);
      if (warn) problems.push(`${layer.id}: ${warn}`);
      const biasWarn = lengthBiasWarning(toAdd);
      if (biasWarn) problems.push(`${layer.id}: ${biasWarn}`);
      if (current.length + toAdd.length < QUESTIONS_PER_LAYER) {
        problems.push(`${layer.id}: bank would have ${current.length + toAdd.length}/${QUESTIONS_PER_LAYER} questions`);
      }

      if (!dryRun && toAdd.length) {
        let n = nextQuestionNumber(layer.id, current);
        const docs = toAdd.map((q) => ({
          id: `${layer.id}-q${n++}`,
          stem: q.stem.trim(),
          topic: typeof q.topic === "string" ? q.topic : undefined,
          choices: q.choices.map((c) => c.trim()),
          answerIdx: q.answerIdx,
          reviewed: false,
        }));
        if (existing) {
          await col.updateOne(
            { _id: existing._id },
            { $push: { questions: { $each: docs } }, $set: { model: SOURCE, updatedAt: new Date() } },
          );
        } else {
          await col.insertOne({
            path: track.categoryId,
            layer: layer.id,
            layerTitle: layer.title,
            questions: docs,
            model: SOURCE,
            createdAt: new Date(),
            updatedAt: new Date(),
          });
        }
      }

      totals.layers++;
      totals.added += toAdd.length;
      totals.rejected += rejected;
      totals.duplicates += duplicates;
      console.log(
        `  ${layer.id}: +${toAdd.length}` +
          (rejected ? `, ${rejected} invalid` : "") +
          (duplicates ? `, ${duplicates} duplicate` : "") +
          ` (bank ${current.length + toAdd.length}/${QUESTIONS_PER_LAYER})`,
      );
    }
  }

  if (mongo) await mongo.close();

  console.log(
    `\n${dryRun ? "Would import" : "Imported"} ${totals.added} questions into ${totals.layers} layers from ${totals.files} file(s). ` +
      `${totals.rejected} invalid, ${totals.duplicates} duplicate.`,
  );
  if (problems.length) {
    console.log("\nNeeds attention:");
    for (const p of problems) console.log(`  - ${p}`);
  }
  if (!totals.files) console.log("No *-output.md files found under docs/exam-prompts/.");
  if (!dryRun && totals.added) console.log("\nREVIEW the new questions (reviewed: false) before opening exams to users.");
};

run().catch((err) => {
  console.error("Import failed:", err.message);
  process.exit(1);
});
