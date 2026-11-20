import { z } from "zod";
import { CONFIDENCE_LEVELS, MAX_WHY_CHARS, MIN_WHY_CHARS } from "../lib/constants.js";

const slug = z.string().trim().regex(/^[a-z0-9-]{1,64}$/, "Invalid id");

export const startBodySchema = z.object({ scenarioId: slug });

export const runParamSchema = z.object({ id: z.string().regex(/^[a-f0-9]{24}$/, "Invalid id") });

export const decisionBodySchema = z.object({
  // The event the learner answered: a resend after a dropped connection carries the same one.
  eventId: slug,
  optionId: slug,
  why: z
    .string()
    .trim()
    .min(MIN_WHY_CHARS, "Say in a sentence why you chose this")
    .max(MAX_WHY_CHARS),
  confidence: z.coerce
    .number()
    .refine((n) => CONFIDENCE_LEVELS.includes(n), "Pick how sure you are"),
});

// What the debrief model must return. Anything else is retried once, then dropped:
// the debrief still shows, built from the scenario alone.
export const reviewSchema = z.object({
  decisions: z.array(
    z.object({
      eventId: z.string(),
      reasoning: z.number().int().min(0).max(3),
      feedback: z.string().max(600),
    }),
  ),
  summary: z.string().max(1200),
});
