import { z } from "zod";

// The shape of one lab file under content/<trackId>/<layerId>/<lessonSlug>.js.
// Only labs.test.js imports this, so zod never reaches the browser bundle.
//
// A lab is a short mission of 2-4 tasks, usually debug -> build -> review.
// Test files use the runner's Jest-like globals (test, expect, jest.fn) and
// `require("./<file>")` to load the learner's code; the runner supports
// toBe, toEqual, toBeTruthy, toBeDefined, .not and mock matchers.

const code = z.string().min(1);
const fileName = z.string().regex(/^[\w.-]+\.(js|ts)$/, "a plain file name like memoize.js or memoize.test.js");

const baseTask = {
  id: z.string().regex(/^[a-z0-9-]+$/), // stable: progress is stored against it
  title: z.string().min(1),
  prompt: z.string().min(1), // markdown
  hints: z.array(z.string().min(1)).length(3), // nudge, hint, near answer
  file: fileName, // the file the learner edits
};

// "Why doesn't it work?": the starter is broken and fails `tests`.
const fixTask = z.object({
  ...baseTask,
  type: z.literal("fix"),
  goals: z.array(z.string().min(1)).min(1),
  starter: code,
  tests: code,
  solution: code,
  cause: z.string().min(1), // shown after the learner names the bug
});

// "Write it yourself": the starter is a near-empty stub.
const writeTask = z.object({
  ...baseTask,
  type: z.literal("write"),
  goals: z.array(z.string().min(1)).min(1),
  starter: code,
  tests: code,
  solution: code,
});

// "Review the AI's code": the starter IS the AI's code. It passes `happyTests`
// (the AI's own tests) but fails `tests` (hidden, production behaviour). The
// learner writes a test in `testFile` that must fail on the AI's code and pass
// on their fix; `proofTest` is the reference version used to check the lab.
const reviewTask = z.object({
  ...baseTask,
  type: z.literal("review"),
  request: z.string().min(1), // what the developer asked the AI for
  steps: z.array(z.object({ label: z.string().min(1), detail: z.string().min(1) })).length(5),
  starter: code, // the AI's code
  happyTests: code,
  tests: code,
  solution: code,
  testFile: fileName,
  testStarter: code,
  proofTest: code,
  risk: z.enum(["concurrency", "security", "performance", "boundary"]),
  riskNote: z.string().min(1), // shown after the learner names the risk
});

export const labTaskSchema = z.discriminatedUnion("type", [fixTask, writeTask, reviewTask]);

export const labSchema = z
  .object({
    minutes: z.number().int().min(5).max(30),
    status: z.enum(["draft", "reviewed"]),
    tasks: z.array(labTaskSchema).min(2).max(4),
  })
  .refine((lab) => new Set(lab.tasks.map((t) => t.id)).size === lab.tasks.length, {
    message: "task ids must be unique",
  });
