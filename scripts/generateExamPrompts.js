/**
 * Writes one paste-ready prompt per roadmap track for an external LLM
 * (Gemini / ChatGPT) to author that track's exam question banks.
 *
 * Usage:
 *   node scripts/generateExamPrompts.js            # every track
 *   node scripts/generateExamPrompts.js mern api-dev
 *
 * Output: docs/exam-prompts/<categoryId>/<trackId>.md
 * The answers go back into docs/exam-prompts/<categoryId>/<trackId>-output.md
 * and are loaded with `npm run import:exams` (backend/seeders/examImport.js).
 *
 * Prompts are derived from src/data/roadmaps/*.json, so regenerate them
 * instead of editing them by hand.
 */

import process from "process";
import { writeFile, mkdir } from "fs/promises";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { QUESTIONS_PER_LAYER } from "../backend/seeders/lib/examBank.js";
import { loadTracks } from "../backend/seeders/lib/roadmapIndex.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const OUT_DIR = join(__dirname, "../docs/exam-prompts");

const buildPrompt = ({ trackId, title, categoryId, layers }) => {
  const layerBlocks = layers
    .map(
      (l, i) => `### Layer ${i + 1} of ${layers.length} — id: ${l.id}
Title: ${l.title}
Technologies: ${(l.techs ?? []).join(", ") || "n/a"}
Description: ${l.description ?? ""}
Topics:
${l.topics.map((t) => `- ${t}`).join("\n")}`,
    )
    .join("\n\n");

  return `You are a senior engineer writing an EXAM QUESTION BANK for a developer learning platform. A learner must pass a server-graded exam on each roadmap layer (80% to pass) before the next layer unlocks. Every exam draws 15 random questions from the bank of ${QUESTIONS_PER_LAYER} you write, so a wrong answer key or an ambiguous question directly blocks a real learner. Accuracy matters more than cleverness.

Track: "${title}" (${trackId}, category ${categoryId}). It has ${layers.length} layers, listed at the bottom.

## HOW TO ANSWER
Write the bank for ONE layer per reply, in the order listed. Each reply must contain exactly ${QUESTIONS_PER_LAYER} questions for that layer. After each reply, stop and wait; I will type "next".

## OUTPUT FORMAT — follow exactly
First line: the layer marker, exactly like this, with the layer id from the list:
LAYER: <layer id>
Then ONE \`\`\`json code block containing a JSON array of exactly ${QUESTIONS_PER_LAYER} objects. No text after the block. Each object has exactly these fields:

\`\`\`json
{
  "stem": "the question text",
  "topic": "one topic copied word for word from that layer's Topics list",
  "choices": ["choice A", "choice B", "choice C", "choice D"],
  "answerIdx": 2
}
\`\`\`

- "choices" has exactly 4 strings; "answerIdx" is the index (0-3) of the one correct choice.
- Do NOT add "id", "explanation" or any other field.

## QUESTION RULES
1. Test understanding of a concept a working developer must know, not trivia, version numbers or memorised syntax.
2. Exactly one choice is correct. Re-read each question and verify the key before you output it. If you are not sure of the answer, replace the question.
3. Distractors must be plausible mistakes a real learner would make, not jokes and not obviously wrong.
4. No "all of the above", "none of the above", "both A and B", and no negative stems ("which is NOT...").
5. LENGTH BIAS IS THE MOST COMMON FAILURE. Models write the correct answer as the longest, most detailed choice, and learners learn to pick it without knowing the material. Write the three wrong choices FIRST, with the same level of detail, specific terms and length as the right one. The correct choice may be the longest in only about 1 of every 4 questions; in about 1 of 4 it should be the shortest. Wrong choices must sound like a real technical claim, never absurd ("compiles HTML into machine code").
6. Spread "answerIdx" evenly across 0, 1, 2 and 3 (about ${QUESTIONS_PER_LAYER / 4} each). Do not put the answer at index 0 or 1 most of the time.
7. Difficulty mix per layer: about one third easy, half medium, the rest hard.
8. Cover every topic of the layer, roughly evenly. Never repeat or rephrase a question within the layer.
9. Each question must stand alone: no "see the diagram", no references to earlier questions. Short code snippets inside the stem are fine (use plain text, \\n for line breaks, no markdown fences inside the JSON strings).
10. Stay accurate for current stable versions of the technologies. Avoid questions whose answer changed recently or is opinion.
11. Escape quotes properly so the JSON parses. No trailing commas, no comments.

## LAYERS
${layerBlocks}

Start now with Layer 1.`;
};

const main = async () => {
  const only = new Set(process.argv.slice(2));
  const tracks = (await loadTracks()).filter((t) => !only.size || only.has(t.trackId));

  for (const t of tracks) {
    const dir = join(OUT_DIR, t.categoryId);
    await mkdir(dir, { recursive: true });
    await writeFile(join(dir, `${t.trackId}.md`), `${buildPrompt(t)}\n`, "utf-8");
  }

  console.log(`Wrote ${tracks.length} prompt(s) to docs/exam-prompts/`);
  const orphans = tracks.filter((t) => !t.hasMeta).map((t) => t.trackId);
  if (orphans.length) console.log(`No metadata in constants/roadmapPaths.js for: ${orphans.join(", ")}`);
};

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
