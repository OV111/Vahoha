import { combineOpinions, isDecisive, keepBest, verifyJudgement, verifyResults } from "../lib/grading.js";
import { gradeTurns } from "./graderService.js";
import { judgeCriterion } from "./judgeService.js";

// v2 subtopics (with evidence points) get their own judge call; v1 ones (no evidence)
// are graded together in one checklist call, exactly as before criteria existed.
const hasEvidence = (s) => Array.isArray(s?.evidence) && s.evidence.length > 0;

// All answers joined into one text, for the quote checks.
const textOf = (turns) => turns.map((t) => t.text).join(" ");

// One record of what the model said and the tokens it cost, saved with the attempt for review.
const logEntry = (stage, subtopic, raw, tokens, now) => ({ stage, ...(subtopic && { subtopic }), output: raw, tokens, at: now });

// Puts one new grade in place of the old grade for the same subtopic.
const replaceGrade = (concepts, grade) => concepts.map((c) => (c.label === grade.label ? grade : c));

// Judges one v2 subtopic and checks the judge's quotes.
const judge = async (subtopic, turns, now, stage, opts) => {
  const { judgement, raw, tokens } = await judgeCriterion(subtopic, turns, opts);
  return { concept: verifyJudgement(judgement, subtopic, textOf(turns)), log: logEntry(stage, subtopic.title, raw, tokens, now) };
};

// Grades all v1 subtopics in one call and checks the quotes.
const gradeChecklist = async (subtopics, turns, now, stage) => {
  if (!subtopics.length) return { concepts: [], logs: [] };
  const { results, raw, usage } = await gradeTurns(subtopics, turns);
  const tokens = usage?.total_tokens ?? 0;
  return { concepts: verifyResults(results, subtopics, textOf(turns)), logs: [logEntry(stage, null, raw, tokens, now)] };
};

/** Grades the opening explanation: every v2 subtopic in its own call, all in parallel. */
export const gradeExplanation = async (subtopics, turn, now) => {
  const [judged, checklist] = await Promise.all([
    Promise.all(subtopics.filter(hasEvidence).map((s) => judge(s, [turn], now, "explanation"))),
    gradeChecklist(subtopics.filter((s) => !hasEvidence(s)), [turn], now, "explanation"),
  ]);
  const all = [...judged.map((j) => j.concept), ...checklist.concepts];
  return {
    concepts: subtopics.map((s) => all.find((c) => c.label === s.title)),
    logs: [...judged.map((j) => j.log), ...checklist.logs],
  };
};

/**
 * After a follow-up, re-judges only the subtopic it was about, on the explanation plus that answer.
 * Other subtopics keep their grades; v1 subtopics wait for the final checklist call.
 */
export const gradeFollowUp = async (subtopics, concepts, explanation, followUp, now) => {
  const subtopic = subtopics.find((s) => s.title === followUp.subtopic);
  if (!subtopic || !hasEvidence(subtopic)) return { concepts, logs: [] };
  const { concept, log } = await judge(subtopic, [explanation, followUp], now, "followup");
  return { concepts: keepBest(concepts, replaceGrade(concepts, concept)), logs: [log] };
};

/**
 * Final grades: v1 subtopics are regraded over every answer, then each v2 grade that is
 * uncertain and could flip pass/fail gets a second opinion.
 */
export const finalizeConcepts = async (subtopics, concepts, turns, now, { regradeChecklist = true } = {}) => {
  // Skipped when the explanation was the only answer: the checklist already graded exactly that.
  const v1 = regradeChecklist ? subtopics.filter((s) => !hasEvidence(s)) : [];
  const checklist = await gradeChecklist(v1, turns, now, "final");
  const regraded = concepts.map((c) => checklist.concepts.find((x) => x.label === c.label) ?? c);
  const final = keepBest(concepts, regraded);
  const logs = [...checklist.logs];

  const subtopicOf = (c) => subtopics.find((s) => s.title === c.label);
  const doubtful = [...final.keys()].filter((i) => hasEvidence(subtopicOf(final[i])) && final[i].confidence === "low" && isDecisive(final, i));

  // Warmer temperature, so the second look is independent rather than the same answer twice.
  const seconds = await Promise.all(
    doubtful.map((i) => {
      const s = subtopicOf(final[i]);
      const answers = turns.filter((t) => t.kind === "explanation" || t.subtopic === s.title);
      return judge(s, answers, now, "second-opinion", { temperature: 0.6 });
    }),
  );
  doubtful.forEach((i, k) => {
    final[i] = combineOpinions(final[i], seconds[k].concept);
    logs.push(seconds[k].log);
  });
  return { concepts: final, logs };
};
