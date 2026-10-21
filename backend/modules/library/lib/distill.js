import { digestImportSchema, DIGEST_ROLES } from "../schemas/digest.schemas.js";
import { estimateTokens } from "../../capstone/lib/tokenBudget.js";

/**
 * Pure half of the Book Digest distill step: builds the prompt for one chapter
 * and validates the model's reply. No I/O, so every rule is unit-tested; the
 * CLI (backend/scripts/distillChapter.js) does the reading, calling and writing.
 */

// Bump when the prompt changes, so books distilled with an older prompt can be found and re-run.
export const PROMPT_VERSION = "distill-v2";

const SYSTEM = `You distill one chapter of a programming book into a short list of concepts for a developer learning platform.
Return ONLY a JSON object, no markdown fences, no preamble.`;

const OUTPUT_SHAPE = `{
  "concepts": [
    {
      "key": "kebab-case-slug, unique",
      "chapter": "<chapter name>",
      "order": 0,
      "title": "max 120 chars",
      "summary": "max 500 chars, the idea in 1-3 sentences",
      "example": "optional, max 1200 chars, your own short code example",
      "why": "max 400 chars, why a developer needs this today",
      "detail": "max 1500 chars, the 'Expand this' text: what was trimmed",
      "roles": [${DIGEST_ROLES.map((r) => `"${r}"`).join(", ")}] (one or more),
      "keep": true,
      "dropReason": "required when keep is false, max 200 chars",
      "interview": { "question": "", "answer": "", "trap": "", "followUp": "" } (optional, only for interview-worthy ideas),
      "beyondBook": "optional, max 600 chars, facts NOT in this chapter"
    }
  ]
}`;

/** Chat messages for one chapter. The rubric is the founder's hand-written text, passed verbatim. */
export const buildDistillMessages = ({ rubric, chapterName, chapterText }) => [
  { role: "system", content: SYSTEM },
  {
    role: "user",
    content: `Follow this rubric to decide what to keep, trim or drop:

<rubric>
${rubric.trim()}
</rubric>

Rules:
- Write every field in your own words. Never copy a sentence from the book; short code identifiers are fine. Examples must be your own, not the book's.
- One concept per distinct idea, in chapter order ("order" starts at 0).
- Include dropped ideas too, with keep: false and a dropReason, so a reviewer sees what was cut.
- Anything you add that this chapter does not say (a newer flag, a modern practice, a correction) goes ONLY in "beyondBook", never in summary, detail or example.
- "roles" says who needs the idea, not how hard it is. Use only these exact values: ${DIGEST_ROLES.join(", ")}. Never "intermediate" or any other value.
- Set "chapter" to exactly: ${chapterName}

Return this shape:
${OUTPUT_SHAPE}

<chapter name="${chapterName}">
${chapterText.trim()}
</chapter>`,
  },
];

export const estimatePromptTokens = (messages) => estimateTokens(...messages.map((m) => m.content));

// Models sometimes wrap JSON in ```json fences despite being told not to.
const stripFences = (text) =>
  text
    .trim()
    .replace(/^```(?:json)?\s*/i, "")
    .replace(/\s*```$/, "");

// Models drift on slug format ("tupleInference", "tuple_inference"). A key is
// only an identifier, so fixing its shape is safe; everything else is validated as-is.
export const toConceptKey = (raw) =>
  String(raw ?? "")
    .replace(/([a-z0-9])([A-Z])/g, "$1-$2")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/, "");

/**
 * Turns the model's reply into an import file for importConcepts.js, or the
 * reasons it can't. `source` and `promptVersion` come from the caller, never
 * from the model, so the reply cannot rename the book or fake a version.
 */
export const parseDistillReply = (reply, { source, promptVersion = PROMPT_VERSION }) => {
  let parsed;
  try {
    parsed = JSON.parse(stripFences(reply));
  } catch {
    return { ok: false, issues: ["Reply is not valid JSON"] };
  }

  const concepts = Array.isArray(parsed?.concepts)
    ? parsed.concepts.map((c) => (c && typeof c === "object" ? { ...c, key: toConceptKey(c.key) } : c))
    : parsed?.concepts;
  const result = digestImportSchema.safeParse({ source, promptVersion, concepts });
  if (!result.success) {
    return {
      ok: false,
      issues: result.error.issues.map((i) => `${i.path.join(".") || "(file)"}: ${i.message}`),
    };
  }
  return { ok: true, data: result.data };
};
