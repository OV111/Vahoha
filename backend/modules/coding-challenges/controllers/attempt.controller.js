import {
  startAttemptService,
  getAttemptService,
  saveAttemptCodeService,
  revealHintService,
} from "../services/attemptService.js";
import { explainSolutionService } from "../services/explanationService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("challenges");

export const startAttempt = async (req, res) => {
  try {
    const data = await startAttemptService(
      req.app.locals.db,
      req.user._id,
      req.body?.slug,
    );
    res.json({ success: true, data });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const getAttempt = async (req, res) => {
  try {
    const data = await getAttemptService(
      req.app.locals.db,
      req.user._id,
      req.params.id,
    );
    res.json({ success: true, data });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const saveAttemptCode = async (req, res) => {
  try {
    const data = await saveAttemptCodeService(
      req.app.locals.db,
      req.user._id,
      req.params.id,
      req.body?.code,
    );
    res.json({ success: true, data });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const revealHint = async (req, res) => {
  try {
    const data = await revealHintService(
      req.app.locals.db,
      req.user._id,
      req.params.id,
      req.params.order,
    );
    res.json({ success: true, ...data });
  } catch (err) {
    sendError(err, req, res);
  }
};

export const explainSolution = async (req, res) => {
  try {
    const data = await explainSolutionService(req.app.locals.db, req.user._id, req.params.id, {
      text: req.body?.text,
      language: req.body?.language,
    });
    res.json({ success: true, ...data });
  } catch (err) {
    sendError(err, req, res);
  }
};
