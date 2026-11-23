import { ObjectId } from "mongodb";
import connectDB from "../config/db.js";
import { verifyAccessToken } from "../utils/jwtToken.js";
import { createTtlCache } from "../utils/ttlCache.js";

/**
 * Keeps hiring accounts out of the learner side. Recruiters may look at
 * learning content (reads, when `allowReads`), but can't take part: no exams,
 * mentor, submissions, posting or chat. Chat matters most: it would let a
 * recruiter message developers without the consent step.
 *
 * Mounted in front of a module's router, before its own `authenticate`, so it
 * reads the token itself. No token or a bad one: it steps aside and the
 * module's own auth answers. The role is read from the database (never trusted
 * from the token), cached briefly: a role is set once at sign-up and never
 * changes from recruiter back to learner, so a short cache can't let anyone in.
 */

const roleCache = createTtlCache({ name: "user-role", ttlMs: 5 * 60_000, maxEntries: 5000 });

export const RECRUITER_VIEW_ONLY = "recruiter_view_only";

// `db` defaults to the shared connection (the websocket has no req.app).
export const roleOf = (userId, db = null) =>
  roleCache.wrap(String(userId), async () => {
    const conn = db ?? (await connectDB());
    const user = await conn.collection("users").findOne({ _id: new ObjectId(String(userId)) }, { projection: { role: 1 } });
    return user?.role ?? "user";
  });

const READ_METHODS = new Set(["GET", "HEAD", "OPTIONS"]);

export const blockRecruiters =
  ({ allowReads = false } = {}) =>
  async (req, res, next) => {
    if (allowReads && READ_METHODS.has(req.method)) return next();
    const header = req.headers.authorization;
    const decoded = header?.startsWith("Bearer ") ? verifyAccessToken(header.slice(7)) : null;
    const id = decoded?.id ?? decoded?._id;
    if (!id || !ObjectId.isValid(String(id))) return next();
    try {
      if ((await roleOf(id, req.app.locals.db)) !== "recruiter") return next();
    } catch (err) {
      return next(err);
    }
    res.status(403).json({
      success: false,
      code: 403,
      reason: RECRUITER_VIEW_ONLY,
      message: "Hiring accounts can view this, not take part.",
    });
  };
