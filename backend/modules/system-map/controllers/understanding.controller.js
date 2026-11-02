import { createQuestionsService, submitAnswersService } from "../services/understandingService.js";
import { dbOf, respond } from "../../../utils/respond.js";

export const createQuestions = respond((req) => createQuestionsService(dbOf(req), req.params.id, req.user._id));
export const submitAnswers = respond((req) =>
  submitAnswersService(dbOf(req), req.params.checkId, req.user._id, req.body.answers),
);
