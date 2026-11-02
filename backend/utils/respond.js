import * as Sentry from "@sentry/node";

/**
 * Controller plumbing shared by modules. `respond` runs a service and sends
 * { success, data }; a thrown error goes to the module's error handler, mounted
 * once at the end of its router, so no controller needs its own try/catch.
 */

export const dbOf = (req) => req.app.locals.db;

/** @param {{status?: number}} opts  e.g. 201 for a create */
export const respond = (run, { status = 200 } = {}) => async (req, res, next) => {
  try {
    const data = await run(req);
    res.status(status).json(data === undefined ? { success: true } : { success: true, data });
  } catch (err) {
    next(err);
  }
};

/**
 * One error handler per module. An error with a status (utils/httpErrors.js,
 * or a client library's own) carries a message meant for the user; anything
 * else is unexpected, so it is logged, sent to Sentry and answered with
 * `fallbackMessage`. This handler ends the response, so the app-level Sentry
 * handler in app.js never sees these errors.
 */
export const makeErrorHandler = (label, fallbackMessage = "Something went wrong") =>
  // eslint-disable-next-line no-unused-vars -- Express spots an error handler by its four arguments
  (err, req, res, next) => {
    if (!err.status || err.status >= 500) Sentry.captureException(err, { tags: { module: label } });
    if (!err.status) console.error(`${label} error:`, err);
    res
      .status(err.status ?? 500)
      .json({ success: false, message: err.status ? err.message : fallbackMessage, ...(err.status ? err.extra : {}) });
  };
