import { z } from "zod";

export const CATEGORIES = [
  "socratic",
  "misconception",
  "no-repeat",
  "capstone-guard",
  "injection",
  "challenge",
  "page-topic",
  "long-chat",
];

const Message = z.object({ role: z.enum(["user", "assistant"]), content: z.string() });

export const EvalCase = z.object({
  id: z.string().min(1),
  category: z.enum(CATEGORIES),
  // Text exactly as summarizeLearnerContext() would produce it. null = no context.
  learnerSummary: z.string().nullable().default(null),
  activity: z
    .object({
      surface: z.string(),
      path: z.string().optional(),
      layer: z.string().optional(),
      topic: z.string().optional(),
      challengeSlug: z.string().optional(),
    })
    .nullable()
    .default(null),
  // Pretend data the server would have fetched for this message, so each
  // situation is tested without a database. Shapes match production:
  // challengeAttempt = getChallengeMentorView(), topicDetail = getTopicDetail(),
  // conversationSummary = session.summary.text.
  challengeSlug: z.string().regex(/^[a-z0-9-]{1,80}$/).nullable().default(null),
  challengeAttempt: z.record(z.string(), z.unknown()).nullable().default(null),
  topicDetail: z.record(z.string(), z.unknown()).nullable().default(null),
  conversationSummary: z.string().nullable().default(null),
  history: z.array(Message).default([]),
  attachments: z.array(z.object({ name: z.string(), content: z.string() })).default([]),
  userMessage: z.string().min(1),
  // Concrete pass/fail checks for THIS case. The judge scores each one.
  rubric: z.array(z.string().min(1)).min(1).max(5),
});

export const EvalCases = z.array(EvalCase).superRefine((cases, ctx) => {
  const seen = new Set();
  cases.forEach((c, i) => {
    if (seen.has(c.id)) ctx.addIssue({ code: "custom", path: [i, "id"], message: `duplicate id ${c.id}` });
    seen.add(c.id);
  });
});

export const JudgeOutput = z.object({
  criteria: z.array(z.object({ criterion: z.string(), reason: z.string(), pass: z.boolean() })),
});

// JSON Schema sent to the API (strict). `reason` is listed before `pass` on
// purpose: the model writes its justification first, which improves the verdict.
export const judgeJsonSchema = {
  type: "object",
  additionalProperties: false,
  required: ["criteria"],
  properties: {
    criteria: {
      type: "array",
      items: {
        type: "object",
        additionalProperties: false,
        required: ["criterion", "reason", "pass"],
        properties: {
          criterion: { type: "string" },
          reason: { type: "string" },
          pass: { type: "boolean" },
        },
      },
    },
  },
};
