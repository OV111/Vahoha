/**
 * The layer-exam rules. ONE source of truth: the backend enforces these
 * (backend/modules/exams/services/examEngineService.js) and the exam intro
 * screen shows them (src/features/roadmap/ExamPage.jsx), so what the learner
 * is told can never differ from what the server does.
 */
export const EXAM_RULES = {
  questionsPerExam: 15,
  secondsPerQuestion: 40, // one question at a time, no going back
  passThreshold: 80, // percent
  maxAttemptsPerDay: 3, // submitted attempts per layer per day
  cooldownAfterFailMins: 30,
  maxTabLeaves: 2, // the attempt ends as a fail on this leave; earlier ones warn
};
