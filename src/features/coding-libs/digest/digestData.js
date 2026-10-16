// Mock digest for the UI prototype. Same shape the backend Concept will have
// (see docs/ideas/book-digest/README.md), so swapping in real data later only
// means replacing this import with a fetch.

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

export const MOCK_CHAPTER = "Chapter 4 · Arrays";

export const MOCK_CONCEPTS = [
  {
    id: "array-types",
    title: "Typing an array",
    summary:
      "Put [] after the element type: string[] is an array of strings. Array<string> means the same, but string[] is what almost everyone writes.",
    example: `let names: string[] = ["Ada", "Linus"];`,
    why: "Every list in your app is an array. This is the first type you will write daily.",
    detail:
      "The book also covers the generic Array<T> form and when it reads better (for long union element types). For everyday code, prefer T[].",
    roles: ["beginner", "frontend", "backend"],
    keep: true,
  },
  {
    id: "multidimensional",
    title: "Multidimensional arrays",
    summary:
      "An array of arrays just adds another []. number[][] is a grid of numbers. A 3D array has three [] and so on, with no new rules.",
    example: `const grid: number[][] = [\n  [1, 2, 3],\n  [2, 4, 6],\n];`,
    why: "Grids, boards and tables show up in games, charts and data code.",
    detail:
      "number[][] can also be written (number[])[]. The book goes on to 4D and 5D arrays, which are the same idea repeated.",
    roles: ["beginner", "frontend", "backend"],
    keep: true,
  },
  {
    id: "unsound-access",
    title: "Array access is not checked",
    summary:
      "TypeScript assumes arr[i] always exists, even when i is past the end. It compiles, then crashes at runtime with undefined.",
    example: `function first(items: string[]) {\n  return items[9001].length; // no type error\n}\nfirst(["a", "b"]); // crashes`,
    why: "One of the most common real bugs in typed code. Check the index or use ?. before you trust it.",
    detail:
      "TypeScript has a --noUncheckedIndexedAccess flag that makes lookups return T | undefined. It is strict, so most projects leave it off.",
    roles: ["beginner", "frontend", "backend", "senior"],
    keep: true,
    interview: {
      question: "Why doesn't TypeScript catch items[9001].length on a string[]?",
      answer:
        "Index access is typed as the element type, not T | undefined. TypeScript trades soundness for convenience here, so out-of-range reads compile and fail at runtime.",
      trap: "Saying TypeScript prevents all undefined errors. It does not for array indexes.",
      followUp: "What does --noUncheckedIndexedAccess change?",
    },
  },
  {
    id: "tuples",
    title: "Tuples",
    summary:
      "A tuple is a fixed-length array where each position has its own type: [string, number]. Use it for small, ordered pairs like [name, age].",
    example: `let row: [string, number] = ["Ada", 36];`,
    why: "React's useState returns a tuple. Knowing them makes hook types readable.",
    detail:
      "The book covers tuple inference, optional and rest elements, and readonly tuples.",
    roles: ["frontend", "backend", "senior"],
    keep: true,
    interview: {
      question: "When would you use a tuple instead of an object?",
      answer:
        "For small, fixed, positional data where names add noise, like [value, setValue]. Use an object once there are more than two or three fields or the meaning is unclear.",
      trap: "Using tuples for records with many fields. Positions become unreadable.",
      followUp: "How do you make a tuple immutable?",
    },
  },
  {
    id: "no-unchecked",
    title: "noUncheckedIndexedAccess",
    summary:
      "Turn this compiler flag on to make arr[i] type T | undefined. It forces the check TypeScript skips by default.",
    example: `// tsconfig.json\n{ "compilerOptions": { "noUncheckedIndexedAccess": true } }`,
    why: "Worth enabling in new projects. It removes a whole class of runtime errors at the cost of a few extra checks.",
    detail: "Trade-offs: more narrowing in loops, and existing codebases need a migration pass.",
    roles: ["senior"],
    keep: true,
    interview: {
      question: "What does noUncheckedIndexedAccess do, and what does it cost?",
      answer:
        "It types indexed reads as T | undefined, so you must handle the missing case. The cost is extra narrowing and a noisy migration on old code.",
      trap: "Claiming it makes arrays fully type-safe. It only covers index access.",
      followUp: "How would you roll it out on a large existing codebase?",
    },
  },
  {
    id: "union-members",
    title: "Members of union-typed arrays",
    summary:
      "Reading from (string | Date)[] gives string | Date, the same union as the array's element type.",
    example: `const mixed = ["Deborah", new Date(1782, 6, 3)];\nconst item = mixed[0]; // string | Date`,
    why: "Follows directly from the basic rule, so most readers can skip it.",
    detail: "Included in the book as a worked example of the member-access rule.",
    roles: ["beginner"],
    keep: false,
    dropReason: "Rarely matters in practice",
  },
];

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
