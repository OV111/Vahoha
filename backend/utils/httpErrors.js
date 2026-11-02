/**
 * Errors a service throws to end a request with a given HTTP status. The
 * message is shown to the user; `extra` fields are added to the JSON body (for
 * example `{ code: "conflict", data: map }`). A module's error handler
 * (utils/respond.js) turns them into the response; anything else is a bug.
 */

export class HttpError extends Error {
  constructor(status, message, extra) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    if (extra) this.extra = extra;
  }
}

export class ValidationError extends HttpError {
  constructor(message, extra) {
    super(400, message, extra);
  }
}

export class ForbiddenError extends HttpError {
  constructor(message, extra) {
    super(403, message, extra);
  }
}

export class NotFoundError extends HttpError {
  constructor(message, extra) {
    super(404, message, extra);
  }
}

export class ConflictError extends HttpError {
  constructor(message, extra) {
    super(409, message, extra);
  }
}

export class TooManyRequestsError extends HttpError {
  constructor(message, extra) {
    super(429, message, extra);
  }
}

const BY_STATUS = { 400: ValidationError, 403: ForbiddenError, 404: NotFoundError, 409: ConflictError, 429: TooManyRequestsError };

/**
 * Throw the error for an HTTP status. Usable where a statement isn't allowed,
 * e.g. `const team = found ?? fail(404, "Team not found")`.
 */
export const fail = (status, message, extra) => {
  const Type = BY_STATUS[status];
  throw Type ? new Type(message, extra) : new HttpError(status, message, extra);
};
