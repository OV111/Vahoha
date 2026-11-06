import * as Sentry from "@sentry/node";
import { HttpError } from "./httpErrors.js";

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
 * Our own errors carry a status and a message written for the user: HttpError, a plain
 * Error with `.status` set, or a thrown `{ status, message }` object. `expose` is the
 * same promise from Express's body parser. A client library's error (the Groq SDK's,
 * say) has a status too, but it is a subclass, its message is written for developers
 * and its status describes our call to that service: passing on its 401 would make the
 * browser refresh a perfectly good session.
 */
const isForTheUser = (err) =>
  Boolean(err?.status) &&
  (err instanceof HttpError || err.constructor === Error || err.constructor === Object || err.expose === true);

/**
 * The error handler: one per module for its label and fallback, and one at the end of
 * app.js for everything else. Anything not meant for the user is logged, sent to Sentry
 * and answered with `fallbackMessage`, so internal details never reach the response.
 */
export const makeErrorHandler = (label, fallbackMessage = "Something went wrong") =>
  (err, req, res, next) => {
    const forUser = isForTheUser(err);
    const status = forUser ? err.status : 500;
    if (status >= 500) Sentry.captureException(err, { tags: { module: label } });
    if (!forUser) console.error(`${label} error:`, err);
    // Mid-stream there is nothing left to answer with; Express closes the connection.
    if (res.headersSent) return next?.(err);
    res.status(status).json({
      success: false,
      code: status,
      message: forUser ? err.message : fallbackMessage,
      ...(forUser ? err.extra : {}),
    });
  };
