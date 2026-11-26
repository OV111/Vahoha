import { z } from "zod";
import { ObjectId } from "mongodb";
import {
  ANSWER_SOURCE,
  CONFIDENCE,
  MAX_EXPLANATION_CHARS,
  MIN_EXPLANATION_CHARS,
  PROGRESS_STATUS,
} from "../lib/constants.js";

const strict = (shape) => z.object(shape).strict();

// The per-learner documents. Everything here is written by the server: `correct`,
// `ideaId` and `misconceptionId` come from the topic, never from the request.

const slug = z.string().regex(/^[a-z0-9]+(-[a-z0-9]+)*$/).max(64);
const userId = z.instanceof(ObjectId);
const version = z.number().int().min(1); // of the topic the learner saw

/** learn_progress: one per learner and topic. */
export const progressSchema = strict({
  userId,
  topicId: slug,
  version,
  status: z.enum(Object.values(PROGRESS_STATUS)),
  lastSectionId: slug.nullable(), // where Continue reopens the page
  sectionsDone: z.array(slug).max(10),
  startedAt: z.date(),
  doneAt: z.date().nullable(),
  reviewAt: z.date().nullable(), // when its review questions are due; null until done
  updatedAt: z.date(),
});

/** learn_answers: one per answer, never edited. Wrong ones are the learner's mistakes list. */
export const answerSchema = strict({
  userId,
  topicId: slug,
  version,
  questionId: slug,
  ideaId: slug,
  source: z.enum(Object.values(ANSWER_SOURCE)),
  optionId: slug,
  correct: z.boolean(),
  confidence: z.enum(Object.values(CONFIDENCE)),
  misconceptionId: slug.nullable(),
  createdAt: z.date(),
});

/** learn_explanations: what the learner wrote and which ideas the AI found in it. */
export const explanationSchema = strict({
  userId,
  topicId: slug,
  version,
  attempt: z.number().int().min(1),
  text: z.string().trim().min(MIN_EXPLANATION_CHARS).max(MAX_EXPLANATION_CHARS),
  covered: z.array(slug).max(6), // ideaIds
  missing: z.array(slug).max(6), // ideaIds
  hint: z.string().max(600).nullable(),
  model: z.string().max(100),
  createdAt: z.date(),
});
