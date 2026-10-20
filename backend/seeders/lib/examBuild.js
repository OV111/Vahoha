/**
 * Builds exam bank files from "raw" questions so the two biases a model can't
 * be trusted with are fixed in code, not by asking nicely:
 *
 *  - POSITION: the model writes { stem, topic, correct, wrong: [3] } and never
 *    chooses where the right answer goes. Positions are dealt out evenly
 *    (15 each of 0..3 per 60) and the wrong choices are shuffled around them.
 *  - LENGTH: the correct choice being the longest is the classic tell. We
 *    can't shorten text automatically, so the build measures it and refuses
 *    to write a layer where it is too common, naming the questions to rewrite.
 *
 * The output is the same `LAYER: <id>` + ```json block format that
 * examImport.js reads, so nothing downstream changes.
 */
import { isValidQuestion, normalizeStem, QUESTIONS_PER_LAYER } from "./examBank.js";

/** Share of questions where the correct choice is strictly the longest (chance is ~25%). */
export const MAX_LONGEST_SHARE = 0.35;

// Small deterministic PRNG so rebuilding the same input gives the same file.
const seeded = (seed) => {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
};

const hash = (text) => [...text].reduce((h, c) => (Math.imul(h, 31) + c.charCodeAt(0)) >>> 0, 7);

const shuffle = (items, rand) => {
  const out = [...items];
  for (let i = out.length - 1; i > 0; i--) {
    const j = Math.floor(rand() * (i + 1));
    [out[i], out[j]] = [out[j], out[i]];
  }
  return out;
};

/** Positions 0..3 repeated evenly to cover `count` questions, then shuffled. */
const dealPositions = (count, rand) =>
  shuffle(Array.from({ length: count }, (_, i) => i % 4), rand);

const isRaw = (q) =>
  typeof q?.stem === "string" && q.stem.trim() !== "" &&
  typeof q?.topic === "string" && q.topic.trim() !== "" &&
  typeof q?.correct === "string" && q.correct.trim() !== "" &&
  Array.isArray(q?.wrong) && q.wrong.length === 3 &&
  q.wrong.every((w) => typeof w === "string" && w.trim() !== "") &&
  new Set([q.correct, ...q.wrong].map((c) => c.trim().toLowerCase())).size === 4;

/**
 * @param {string} layerId
 * @param {{stem:string, topic:string, correct:string, wrong:string[]}[]} raw
 * @param {{topics?: string[]}} [opts] when given, every topic must be in the list
 * @returns {{ questions: object[], problems: string[], longestShare: number, tooLong: string[] }}
 */
export function buildLayer(layerId, raw, opts = {}) {
  const problems = [];
  const seen = new Set();

  raw.forEach((q, i) => {
    if (!isRaw(q)) {
      problems.push(`${layerId} #${i + 1}: needs stem, topic, correct and 3 different non-empty wrong answers`);
      return;
    }
    if (opts.topics && !opts.topics.includes(q.topic)) {
      problems.push(`${layerId} #${i + 1}: topic "${q.topic}" is not in the layer's topic list`);
    }
    const key = normalizeStem(q.stem);
    if (seen.has(key)) problems.push(`${layerId} #${i + 1}: duplicate stem "${q.stem.slice(0, 50)}"`);
    seen.add(key);
  });
  if (raw.length !== QUESTIONS_PER_LAYER) {
    problems.push(`${layerId}: has ${raw.length} questions, expected ${QUESTIONS_PER_LAYER}`);
  }

  const valid = raw.filter(isRaw);
  const positions = dealPositions(valid.length, seeded(hash(layerId)));

  const questions = valid.map((q, i) => {
    const rand = seeded(hash(q.stem));
    const wrong = shuffle(q.wrong.map((w) => w.trim()), rand);
    const choices = [...wrong];
    choices.splice(positions[i], 0, q.correct.trim());
    return { stem: q.stem.trim(), topic: q.topic, choices, answerIdx: positions[i] };
  });

  const tooLong = [];
  questions.forEach((q) => {
    const lens = q.choices.map((c) => c.length);
    const right = lens[q.answerIdx];
    if (lens.every((l, idx) => idx === q.answerIdx || l < right)) tooLong.push(q.stem);
  });
  const longestShare = questions.length ? tooLong.length / questions.length : 0;
  if (longestShare > MAX_LONGEST_SHARE) {
    problems.push(
      `${layerId}: the correct answer is the longest choice in ${Math.round(longestShare * 100)}% of questions ` +
        `(limit ${Math.round(MAX_LONGEST_SHARE * 100)}%). Shorten the correct answers or lengthen the wrong ones in: ` +
        tooLong.slice(0, 8).map((s) => `"${s.slice(0, 45)}"`).join("; ") +
        (tooLong.length > 8 ? `; … and ${tooLong.length - 8} more` : ""),
    );
  }

  for (const q of questions) {
    if (!isValidQuestion(q)) problems.push(`${layerId}: built an invalid question "${q.stem.slice(0, 40)}"`);
  }
  return { questions, problems, longestShare, tooLong };
}

/** The text examImport.js reads for one layer. */
export const layerBlock = (layerId, questions) =>
  `LAYER: ${layerId}\n\n\`\`\`json\n${JSON.stringify(questions, null, 2)}\n\`\`\`\n`;
