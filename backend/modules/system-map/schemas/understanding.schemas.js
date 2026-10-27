import { z } from "zod";

const objectId = z.string().regex(/^[a-f0-9]{24}$/, "Invalid id");

// POST /api/system-maps/:id/questions
export const questionsParamSchema = z.object({ id: objectId });

// POST /api/system-maps/checks/:checkId/answers
export const answersParamSchema = z.object({ checkId: objectId });
export const answersBodySchema = z.object({
  answers: z
    .array(
      z.object({
        id: z.string().min(1).max(10),
        text: z.string().trim().min(1, "Write an answer for every question").max(1500),
      }),
    )
    .min(1)
    .max(3),
});

// What the model must return. The API enforces the JSON shape; these add the
// limits it can't (lengths, counts), so a bad answer is retried, never stored.
const concept = z.string().trim().min(1).max(60);

export const questionsOutputSchema = z.object({
  questions: z
    .array(
      z.object({
        q: z.string().trim().min(10).max(300),
        focus: z.array(z.string().max(40)).max(4),
        mustMention: z.array(concept).min(2).max(4),
        modelAnswer: z.string().trim().min(10).max(600),
      }),
    )
    .length(3),
});

export const gradeOutputSchema = z.object({
  results: z.array(
    z.object({
      id: z.string(),
      score: z.union([z.literal(0), z.literal(1), z.literal(2)]),
      feedback: z.string().trim().min(1).max(300),
      missed: z.array(concept).max(4),
    }),
  ),
});
