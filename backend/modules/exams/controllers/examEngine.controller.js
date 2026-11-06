import { generateAttempt, submitAttempt, submitTeachBack, submitTeachBackFollowUp } from "../services/examEngineService.js";
import { trackEvent } from "../../../services/eventService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("exams");

export const generate = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { path, layer } = req.body;

    if (!path || typeof path !== "string") {
      return res.status(400).json({ message: "path is required" });
    }
    if (!layer || typeof layer !== "string") {
      return res.status(400).json({ message: "layer is required" });
    }

    const attempt = await generateAttempt(db, userId, path, layer);
    res.json(attempt);
  } catch (err) {
    sendError(err, req, res);
  }
};

export const submit = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { attemptId, answers, integrity } = req.body;

    if (!attemptId || typeof attemptId !== "string") {
      return res.status(400).json({ message: "attemptId is required" });
    }
    if (!answers || typeof answers !== "object" || Array.isArray(answers)) {
      return res.status(400).json({ message: "answers must be an object mapping questionId to choiceIndex" });
    }

    // integrity is optional and sanitized in the service, never a reason to 400
    const result = await submitAttempt(db, userId, attemptId, answers, integrity);
    res.json(result);
  } catch (err) {
    sendError(err, req, res);
  }
};

export const submitTeachBackAnswer = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { path, layer, topic, answerText } = req.body;

    if (!path || typeof path !== "string") {
      return res.status(400).json({ message: "path is required" });
    }
    if (!layer || typeof layer !== "string") {
      return res.status(400).json({ message: "layer is required" });
    }
    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ message: "topic is required" });
    }
    if (!answerText || typeof answerText !== "string" || !answerText.trim()) {
      return res.status(400).json({ message: "answerText is required" });
    }

    const result = await submitTeachBack(db, userId, { path, layer, topic, answerText });
    await trackEvent(db, userId, "teach_back", { path, layer, topic, score: result.score, passed: result.passed, followUp: false });
    res.json(result);
  } catch (err) {
    sendError(err, req, res);
  }
};

export const submitTeachBackFollowUpAnswer = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { sessionId, answerText } = req.body;

    if (!sessionId || typeof sessionId !== "string") {
      return res.status(400).json({ message: "sessionId is required" });
    }
    if (!answerText || typeof answerText !== "string" || !answerText.trim()) {
      return res.status(400).json({ message: "answerText is required" });
    }

    const result = await submitTeachBackFollowUp(db, userId, { sessionId, answerText });
    await trackEvent(db, userId, "teach_back", { sessionId, score: result.score, passed: result.passed, followUp: true });
    res.json(result);
  } catch (err) {
    sendError(err, req, res);
  }
};
