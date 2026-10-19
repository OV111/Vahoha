import { z } from "zod";

// The shape of one lesson file under content/<trackId>/<layerId>/<slug>.js.
// Only lessons.test.js imports this, so zod never reaches the browser bundle.
//
// A lesson is an ordered list of steps, shown one per screen. Questions sit
// between explanations (retrieval right after reading), not in a block at the end.

const source = z.object({ label: z.string().min(1), url: z.string().url() });

// Code shown in the live panel next to a step. The learner can edit and run it.
const code = z.object({ lang: z.enum(["js"]), source: z.string().min(1) });

const readStep = z.object({
  kind: z.literal("read"),
  title: z.string().min(1),
  body: z.string().min(1), // markdown, one idea; keep it short
  code: code.optional(),
});

const checkStep = z
  .object({
    kind: z.literal("check"),
    type: z.enum(["predict", "mcq"]), // predict = about the code in the panel; Run unlocks after answering
    q: z.string().min(1),
    options: z.array(z.string().min(1)).min(2).max(4),
    answer: z.number().int().nonnegative(), // index into options, so rewording can't break the key
    why: z.string().min(1),
    code: code.optional(),
  })
  .refine((c) => c.answer < c.options.length, { message: "answer is out of range" })
  .refine((c) => c.type !== "predict" || c.code, { message: "a predict step needs code to predict" });

const explainStep = z.object({
  kind: z.literal("explain"),
  prompt: z.string().min(1),
  mustMention: z.array(z.string().min(1)).min(2).max(6), // later the voice rubric's concepts
  modelAnswer: z.string().min(1),
});

const step = z.union([readStep, checkStep, explainStep]);

export const lessonSchema = z.object({
  minutes: z.number().int().min(1).max(30),
  status: z.enum(["draft", "reviewed"]),
  steps: z
    .array(step)
    .min(3)
    .refine((s) => s[0].kind === "read", { message: "a lesson starts by explaining, not asking" })
    .refine((s) => s.filter((x) => x.kind === "check").length >= 2, { message: "at least 2 check steps" })
    .refine((s) => s.filter((x) => x.kind === "explain").length === 1, { message: "exactly 1 explain step" }),
  deeper: z
    .array(
      z.object({
        level: z.union([z.literal(2), z.literal(3), z.literal(4)]),
        title: z.string().min(1),
        body: z.string().min(1),
        sources: z.array(source),
      }),
    )
    .min(1),
});
