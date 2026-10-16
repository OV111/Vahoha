/**
 * Shared rules for exam question banks. Used by examSeeder.js (Groq) and
 * examImport.js (answers pasted back from Gemini / ChatGPT) so both paths
 * accept and number questions identically.
 */

export const QUESTIONS_PER_LAYER = 60; // target bank size; the exam serves a random 15 of these

// A malformed question would crash or silently break a live exam, so drop it
// at the door rather than trusting an LLM's JSON shape.
export const isValidQuestion = (q) =>
  typeof q?.stem === "string" && q.stem.trim() !== "" &&
  Array.isArray(q.choices) && q.choices.length === 4 &&
  q.choices.every((c) => typeof c === "string" && c.trim() !== "") &&
  Number.isInteger(q.answerIdx) && q.answerIdx >= 0 && q.answerIdx <= 3;

export const normalizeStem = (stem) => stem.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();

// Next free `<layer>-qN` number. Uses the highest existing N, not the count,
// so a bank with hand-deleted questions never reuses an ID.
export const nextQuestionNumber = (layerId, questions) => {
  const idPattern = new RegExp(`^${layerId.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}-q(\\d+)$`);
  const nums = questions
    .map((q) => Number(q.id?.match(idPattern)?.[1]))
    .filter(Number.isFinite);
  return (nums.length ? Math.max(...nums) : 0) + 1;
};
