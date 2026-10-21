// Roles, modes and the pure selection helpers for a book digest. Concepts come
// from GET /api/library/:id/digest (see backend/modules/library).

export const ROLES = [
  { id: "beginner", label: "Beginner" },
  { id: "frontend", label: "Frontend dev" },
  { id: "backend", label: "Backend dev" },
  { id: "senior", label: "Senior" },
];

export const MODES = [
  { id: "learn", label: "Learn" },
  { id: "interview", label: "Interview" },
  { id: "quick", label: "Quick review" },
];

export const DEFAULT_ROLE = "beginner";
export const DEFAULT_MODE = "learn";

// Pure so it can be unit-tested without rendering anything.
// interview mode only shows concepts that carry an interview block;
// showAll ignores the role and keep filters ("Show everything").
export function selectConcepts(concepts, { role, mode, showAll }) {
  const pool =
    mode === "interview" ? concepts.filter((c) => c.interview) : concepts;
  if (showAll) return { shown: pool, cut: [] };
  const shown = pool.filter((c) => c.keep !== false && c.roles.includes(role));
  const shownIds = new Set(shown.map((c) => c.id));
  return { shown, cut: pool.filter((c) => !shownIds.has(c.id)) };
}

export function estimateMinutes(count, mode) {
  const perIdea = mode === "quick" ? 0.5 : mode === "interview" ? 1.5 : 1;
  return Math.max(1, Math.round(count * perIdea));
}

// How one option of a "check yourself" question looks. Before an answer comes
// back every option is idle; after, the right one is marked, and so is the
// learner's pick if it was wrong.
export function checkOptionState(index, result) {
  if (!result || result.pending) return "idle";
  if (index === result.answerIndex) return "right";
  if (index === result.picked) return "wrong";
  return "idle";
}
