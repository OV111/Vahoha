/**
 * The layer-exam rules. ONE source of truth: the backend enforces these
 * (backend/modules/exams/services/examEngineService.js) and the exam intro
 * screen shows them (src/features/roadmap/ExamPage.jsx), so what the learner
 * is told can never differ from what the server does.
 */
export const EXAM_RULES = {
  questionsPerExam: 15,
  timeLimitSecs: 600,
  passThreshold: 80, // percent
  maxAttemptsPerDay: 3, // submitted attempts per layer per day
  cooldownAfterFailMins: 30,
};
