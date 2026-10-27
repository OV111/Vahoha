import { createQuestionsService, submitAnswersService } from "../services/understandingService.js";

const fail = (res, status, message) => res.status(status).json({ success: false, message });

const handle = (res, err, modelMessage) => {
  if (err.modelFailed) return fail(res, 503, modelMessage);
  console.error("system-map understanding:", err);
  fail(res, 500, "Something went wrong with your check.");
};

export const createQuestions = async (req, res) => {
  try {
    const result = await createQuestionsService(req.app.locals.db, req.params.id, req.user._id);
    if (!result) return fail(res, 404, "Map not found");
    if (result.error === "too_small") return fail(res, 422, "Add at least two parts and a wire first.");
    res.json({ success: true, data: result });
  } catch (err) {
    handle(res, err, "The AI couldn't write questions right now. Try again in a minute.");
  }
};

export const submitAnswers = async (req, res) => {
  try {
    const result = await submitAnswersService(req.app.locals.db, req.params.checkId, req.user._id, req.body.answers);
    if (!result) return fail(res, 404, "Check not found");
    if (result.error === "answered") return fail(res, 409, "These questions were already answered.");
    if (result.error === "grading") return fail(res, 409, "Your answers are already being graded.");
    if (result.error === "mismatch") return fail(res, 400, "Send exactly one answer for each question.");
    res.json({ success: true, data: result });
  } catch (err) {
    handle(res, err, "The AI couldn't grade your answers right now. Try again in a minute.");
  }
};
