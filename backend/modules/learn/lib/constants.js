export const COLLECTIONS = Object.freeze({
  TOPICS: "learn_topics", // the content: one document per topic and version
  PROGRESS: "learn_progress", // one per learner and topic
  ANSWERS: "learn_answers", // one per answer given
  EXPLANATIONS: "learn_explanations", // one per explanation the AI gave feedback on
});

export const TOPIC_STATUS = Object.freeze({
  DRAFT: "draft",
  REVIEWED: "reviewed",
  PUBLISHED: "published", // the only one learners see
  ARCHIVED: "archived",
});

export const PROGRESS_STATUS = Object.freeze({ READING: "reading", DONE: "done" });

export const ANSWER_SOURCE = Object.freeze({ PAGE: "page", REVIEW: "review" });

export const CONFIDENCE = Object.freeze({ UNSURE: "unsure", SURE: "sure" });

export const QUESTION_KINDS = Object.freeze(["choice", "predict", "find-bug"]);

// What a topic needs before it can be published.
export const PUBLISH_RULES = Object.freeze({
  minSections: 4,
  minRealCases: 2,
  minQuestions: 6,
  minReviewQuestions: 3,
  minMisconceptions: 2,
  // Only for a topic with code (`lang` set).
  minRunnableExamples: 2,
});

// How long after finishing a topic its review questions come back.
export const REVIEW_AFTER_DAYS = 7;

export const MIN_EXPLANATION_CHARS = 40;
export const MAX_EXPLANATION_CHARS = 2000;
