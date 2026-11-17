import { z } from "zod";
import { MAX_ANSWER_CHARS } from "../lib/constants.js";

const layerId = z.string().trim().regex(/^[a-z0-9-]{1,64}$/, "Invalid layer");

export const layerParamSchema = z.object({ layerId });

export const attemptParamSchema = z.object({ id: z.string().regex(/^[a-f0-9]{24}$/, "Invalid id") });

export const startBodySchema = z.object({
  layerId,
  path: z.string().trim().regex(/^[a-z0-9-]{1,64}$/).default("backend"),
  // The exam records the learner's voice, so it can't start without their explicit yes.
  consent: z.literal(true, { message: "Agree to the recording before you start." }),
});

// The client's id for one answer, reused on a retry.
const turnKey = z.string().uuid("Invalid answer id");

export const turnBodySchema = z.object({
  text: z.string().trim().min(1, "Say or type an answer first").max(MAX_ANSWER_CHARS),
  turnKey,
});

// Multipart fields of a recorded answer (the file itself is read by the controller).
export const audioFieldsSchema = z.object({ turnKey });

// What the per-criterion judge must return. Anything else is retried once, then refused:
// a grade we can't parse is never guessed at.
export const judgementSchema = z.object({
  rationale: z.string().max(1200),
  points: z.array(
    z.object({
      id: z.string(),
      met: z.boolean(),
      quote: z.string().max(400).nullish(),
    }),
  ),
  misconception: z.object({ id: z.string(), quote: z.string().max(400) }).nullish(),
  confidence: z.enum(["high", "low"]),
});
