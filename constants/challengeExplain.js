// "Explain what you did" after solving a coding challenge. Shared by the Arena
// (what it asks for) and the grader (what it scores), so the four points a
// learner is told to cover are exactly the four that are scored.

export const EXPLAIN_MIN_CHARS = 80;
export const EXPLAIN_MAX_CHARS = 3000;

// Each point is scored 0 (missing or wrong), 1 (partly) or 2 (clear and right).
export const EXPLAIN_MAX_POINT_SCORE = 2;

// Bonus for a good explanation, paid once per challenge. "Good" is at least
// this share of the full score, so one weak point does not cost the bonus.
export const EXPLAIN_XP = 10;
export const EXPLAIN_PASS_SHARE = 0.6;

export const EXPLAIN_POINTS = [
  {
    id: "approach",
    label: "Approach",
    prompt: "the steps your code takes",
    rubric: "Describes the steps the code takes to solve the problem, in the learner's own words.",
  },
  {
    id: "correctness",
    label: "Why it works",
    prompt: "why those steps give the right answer",
    rubric: "Explains why those steps produce the right answer, not only what they do.",
  },
  {
    id: "complexity",
    label: "Cost",
    prompt: "how time and memory grow with the input",
    rubric: "States how running time and memory grow with the input size, and this matches the code.",
  },
  {
    id: "edge_cases",
    label: "Edge cases",
    prompt: "a tricky input and how you handle it",
    rubric: "Names at least one tricky input (empty, a single item, ties, negatives…) and how the code handles it.",
  },
];
