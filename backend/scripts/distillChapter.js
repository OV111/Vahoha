/**
 * Distill one book chapter into digest concepts, for human review.
 *
 * Usage:
 *   node backend/scripts/distillChapter.js --text <chapter.txt> --rubric <rubric.md> \
 *     --chapter "<name>" --source <source.json> --out <out.json> [--dry-prompt]
 *
 * --text    the chapter as plain text (extract it from the PDF first; this script does not parse PDFs)
 * --rubric  the hand-written rubric (docs/ideas/book-digest/rubric-v1.md is the draft)
 * --source  the book's library entry, same shape as `source` in digestImportSchema
 * --dry-prompt  print the prompt and its token estimate, call nothing
 *
 * The reply is validated with digestImportSchema and written to --out only if
 * it passes. This script never touches the database: review the file, then
 * load it with backend/scripts/importConcepts.js.
 */

import fs from "node:fs";
import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import { getGroqClient } from "../config/groq.js";
import { outputTokenBudget, parseTpmLimit } from "../modules/capstone/lib/tokenBudget.js";
import {
  PROMPT_VERSION,
  buildDistillMessages,
  estimatePromptTokens,
  parseDistillReply,
} from "../modules/library/lib/distill.js";

const MODEL = "openai/gpt-oss-120b";

const args = process.argv.slice(2);
const arg = (name) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 ? args[i + 1] : undefined;
};
const dryPrompt = args.includes("--dry-prompt");

const [textPath, rubricPath, chapterName, sourcePath, outPath] = ["text", "rubric", "chapter", "source", "out"].map(arg);
if (!textPath || !rubricPath || !chapterName || !sourcePath || (!outPath && !dryPrompt)) {
  console.error(
    'Usage: node backend/scripts/distillChapter.js --text <chapter.txt> --rubric <rubric.md> --chapter "<name>" --source <source.json> --out <out.json> [--dry-prompt]',
  );
  process.exit(1);
}

// The model call, kept apart so everything else can run (and be tested) without it.
const callModel = async (messages, maxTokens) => {
  const completion = await getGroqClient().chat.completions.create({
    model: MODEL,
    temperature: 0.2,
    max_tokens: maxTokens,
    response_format: { type: "json_object" },
    messages,
  });
  return completion.choices[0]?.message?.content ?? "";
};

const run = async () => {
  const messages = buildDistillMessages({
    rubric: fs.readFileSync(rubricPath, "utf8"),
    chapterName,
    chapterText: fs.readFileSync(textPath, "utf8"),
  });
  const inputTokens = estimatePromptTokens(messages);
  const maxTokens = outputTokenBudget(inputTokens, parseTpmLimit(process.env.GROQ_TPM_LIMIT));

  if (dryPrompt) {
    for (const m of messages) console.log(`--- ${m.role} ---\n${m.content}\n`);
    console.log(`~${inputTokens} input tokens, max_tokens ${maxTokens}, prompt ${PROMPT_VERSION}`);
    return;
  }
  if (maxTokens < 1500) {
    console.error(`Chapter too long for GROQ_TPM_LIMIT (~${inputTokens} input tokens). Split it and run each part.`);
    process.exit(1);
  }

  const source = JSON.parse(fs.readFileSync(sourcePath, "utf8"));
  const result = parseDistillReply(await callModel(messages, maxTokens), { source, promptVersion: PROMPT_VERSION });
  if (!result.ok) {
    console.error(`Reply rejected, nothing written:\n  ${result.issues.join("\n  ")}`);
    process.exit(1);
  }

  fs.writeFileSync(outPath, `${JSON.stringify(result.data, null, 2)}\n`);
  const kept = result.data.concepts.filter((c) => c.keep).length;
  console.log(`Wrote ${result.data.concepts.length} concepts (${kept} kept) to ${outPath}. Review it before importing.`);
};

run().catch((err) => {
  console.error("Distill failed:", err);
  process.exit(1);
});
