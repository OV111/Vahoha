import { combineOpinions, isDecisive, keepBest, verifyJudgement, verifyResults } from "../lib/grading.js";
import { gradeTurns } from "./graderService.js";
import { judgeCriterion } from "./judgeService.js";

// A subtopic with evidence points is judged on its own (v2); one without is graded with
// its siblings in one checklist call (v1), exactly as before criteria existed.
const hasEvidence = (s) => Array.isArray(s?.evidence) && s.evidence.length > 0;

const textOf = (turns) => turns.map((t) => t.text).join(" ");

const logEntry = (stage, subtopic, raw, now) => ({ stage, ...(subtopic && { subtopic }), output: raw, at: now });

const judge = async (subtopic, turns, now, stage, opts) => {
  const { judgement, raw } = await judgeCriterion(subtopic, turns, opts);
  return { concept: verifyJudgement(judgement, subtopic, textOf(turns)), log: logEntry(stage, subtopic.title, raw, now) };
};

const gradeChecklist = async (subtopics, turns, now, stage) => {
  if (!subtopics.length) return { concepts: [], logs: [] };
  const { results, raw } = await gradeTurns(subtopics, turns);
  return { concepts: verifyResults(results, subtopics, textOf(turns)), logs: [logEntry(stage, null, raw, now)] };
};

const inOrder = (subtopics, concepts) => subtopics.map((s) => concepts.find((c) => c.label === s.title));

/** Grades the opening explanation: every subtopic, each v2 one in its own call, in parallel. */
export const gradeExplanation = async (subtopics, turn, now) => {
  const v2 = subtopics.filter(hasEvidence);
  const [judged, checklist] = await Promise.all([
    Promise.all(v2.map((s) => judge(s, [turn], now, "explanation"))),
    gradeChecklist(subtopics.filter((s) => !hasEvidence(s)), [turn], now, "explanation"),
  ]);
  return {
    concepts: inOrder(subtopics, [...judged.map((j) => j.concept), ...checklist.concepts]),
    logs: [...judged.map((j) => j.log), ...checklist.logs],
  };
};

/**
 * After a follow-up, re-judges only the subtopic it was about, on the explanation plus that
 * answer. Other subtopics keep their grades, so nothing is re-judged without a new answer.
 * v1 subtopics wait for the final checklist call.
 */
export const gradeFollowUp = async (subtopics, concepts, explanation, followUp, now) => {
  const subtopic = subtopics.find((s) => s.title === followUp.subtopic);
  if (!subtopic || !hasEvidence(subtopic)) return { concepts, logs: [] };
  const { concept, log } = await judge(subtopic, [explanation, followUp], now, "followup");
  return { concepts: keepBest(concepts, concepts.map((c) => (c.label === concept.label ? concept : c))), logs: [log] };
};

/**
 * Final grades: the v1 subtopics get their checklist regrade over every answer, then any v2
 * grade that both decides pass/fail and came out uncertain is judged a second time.
 */
export const finalizeConcepts = async (subtopics, concepts, turns, now, { regradeChecklist = true } = {}) => {
  // Skipped when the explanation was the only answer: the checklist already graded exactly that.
  const v1 = regradeChecklist ? subtopics.filter((s) => !hasEvidence(s)) : [];
  const checklist = await gradeChecklist(v1, turns, now, "final");
  let final = keepBest(concepts, concepts.map((c) => checklist.concepts.find((x) => x.label === c.label) ?? c));
  const logs = [...checklist.logs];

  const doubtful = final
    .map((c, i) => ({ c, i, s: subtopics.find((x) => x.title === c.label) }))
    .filter(({ c, i, s }) => hasEvidence(s) && c.confidence === "low" && isDecisive(final, i));

  // A warmer second pass, so it is a genuinely independent look rather than the same answer twice.
  const seconds = await Promise.all(
    doubtful.map(({ s }) => judge(s, turns.filter((t) => t.kind === "explanation" || t.subtopic === s.title), now, "second-opinion", { temperature: 0.6 })),
  );
  seconds.forEach(({ concept, log }, k) => {
    const { i } = doubtful[k];
    final = final.map((c, j) => (j === i ? combineOpinions(c, concept) : c));
    logs.push(log);
  });
  return { concepts: final, logs };
};
