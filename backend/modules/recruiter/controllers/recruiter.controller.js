import { getScorecardService } from "../services/scorecardService.js";
import { getSettingsService, saveSettingsService } from "../services/settingsService.js";
import { listCandidatesService } from "../services/candidateService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("recruiter");

const handle = (fn) => async (req, res) => {
  try {
    res.json({ success: true, data: await fn(req) });
  } catch (err) {
    if (!err.status) console.error("recruiter error:", err);
    sendError(err, req, res);
  }
};

const db = (req) => req.app.locals.db;

export const getScorecard = handle((req) => getScorecardService(db(req), req.params.username));
export const listCandidates = handle((req) => listCandidatesService(db(req), req.query));
export const getSettings = handle((req) => getSettingsService(db(req), req.user._id));
export const saveSettings = handle((req) => saveSettingsService(db(req), req.user._id, req.body));
