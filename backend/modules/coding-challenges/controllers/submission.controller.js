import { submitAttemptService } from "../services/submissionService.js";
import { describeRunner } from "../services/runnerService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("challenges");

export const submit = async (req, res) => {
  try {
    const data = await submitAttemptService(
      req.app.locals.db,
      req.user._id.toString(),
      req.params.id,
      req.body?.language,
      req.body?.integrity,
    );
    res.json({ success: true, ...data });
  } catch (err) {
    sendError(err, req, res);
  }
};

/**
 * Which sandbox is live. Exposed so the operator can tell at a glance whether
 * the hardened isolate is in use or the weaker child-process fallback.
 */
export const runnerStatus = (_req, res) => {
  res.json({ success: true, ...describeRunner() });
};
