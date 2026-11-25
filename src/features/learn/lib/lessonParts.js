export const LESSON_PARTS = ["Understand", "Try", "Prove"];

/** Index into LESSON_PARTS for one step, from what the step asks of the learner. */
export const partOf = (step) => {
  if (step.kind === "try") return 1;
  if (step.kind === "explain" || step.ai) return 2;
  return 0;
};
