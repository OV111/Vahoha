import { z } from "zod";
import { isLayerId } from "../../../utils/layerIds.js";

// Who a concept is cut for. Mirrors ROLES in src/features/coding-libs/digest/digestData.js.
export const DIGEST_ROLES = ["beginner", "frontend", "backend", "senior"];

const objectId = z.string().regex(/^[a-f0-9]{24}$/, "Invalid id");
const conceptKey = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Invalid concept key")
  .max(60);
const text = (max) => z.string().trim().min(1).max(max);

// GET /api/library/:id/digest
export const digestParamSchema = z.object({ id: objectId });

// PUT /api/library/:id/digest/known/:conceptKey
export const knownParamSchema = z.object({ id: objectId, conceptKey });
export const knownBodySchema = z.object({ known: z.boolean() });

// POST /api/library/:id/digest/check/:conceptKey
export const checkParamSchema = z.object({ id: objectId, conceptKey });
export const checkBodySchema = z.object({ answerIndex: z.number().int().min(0) });

const interviewSchema = z.object({
  question: text(300),
  answer: text(600),
  trap: text(400),
  followUp: text(300),
});

// "Check yourself": one multiple-choice question per concept, graded on the server.
const checkSchema = z
  .object({
    question: text(300),
    options: z.array(text(200)).min(2).max(4),
    answerIndex: z.number().int().min(0),
    explanation: text(400),
  })
  .refine((c) => c.answerIndex < c.options.length, {
    message: "answerIndex must point at one of the options",
    path: ["answerIndex"],
  });

// One distilled idea. Used to validate the LLM output and the import file, so a
// malformed concept is rejected before it can reach the database.
export const conceptInputSchema = z
  .object({
    key: conceptKey,
    chapter: text(120),
    order: z.number().int().min(0),
    title: text(120),
    summary: text(500),
    example: text(1200).optional(),
    why: text(400),
    detail: text(1500),
    roles: z.array(z.enum(DIGEST_ROLES)).min(1),
    keep: z.boolean(),
    dropReason: text(200).optional(),
    interview: interviewSchema.optional(),
    check: checkSchema.optional(),
    // Facts the digest adds that the book does not contain. Kept apart from
    // `detail` so a reviewer can see exactly what is not the author's.
    beyondBook: text(600).optional(),
  })
  .refine((c) => c.keep || c.dropReason, {
    message: "A dropped concept needs a dropReason",
    path: ["dropReason"],
  });

// The book the concepts belong to. Created by the import script only if no
// library item with this title exists yet.
const sourceSchema = z.object({
  title: text(160),
  author: text(120),
  description: text(600),
  url: z.string().url(),
  is_free: z.boolean(),
  difficulty: z.enum(["beginner", "intermediate", "advanced"]),
  paths: z.array(text(40)).min(1),
  topics: z.array(text(40)).min(1),
  layerIds: z.array(z.string().refine(isLayerId, "Invalid layer id")).max(10),
});

export const digestImportSchema = z
  .object({
    source: sourceSchema,
    promptVersion: text(40),
    concepts: z.array(conceptInputSchema).min(1).max(200),
  })
  .refine((file) => new Set(file.concepts.map((c) => c.key)).size === file.concepts.length, {
    message: "Concept keys must be unique",
    path: ["concepts"],
  });
