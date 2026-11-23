import { TRUST_LEVELS } from "../../constants/hiringRules.js";
import { makeErrorHandler } from "../utils/respond.js";

const sendError = makeErrorHandler("recruiter");

// "limited" < "verified": a route asking for limited also lets verified in.
const RANK = { unverified: 0, limited: 1, verified: 2 };

/**
 * Gate for recruiter routes, after `authenticate`. Like requireAdmin, the role
 * and the company's trust level are read from the database on every request,
 * never from the token, so a downgrade (a report, a failed re-check) applies
 * at once. Sets req.recruiter = { companyId, trustLevel } for the handler.
 *
 * @param {"unverified" | "limited" | "verified"} minLevel
 */
export const requireRecruiter = (minLevel = "verified") => {
  if (!TRUST_LEVELS.includes(minLevel) || minLevel === "rejected") throw new Error(`bad level ${minLevel}`);

  return async (req, res, next) => {
    try {
      const db = req.app.locals.db;
      const user = await db
        .collection("users")
        .findOne({ _id: req.user._id }, { projection: { role: 1, companyId: 1 } });
      if (user?.role !== "recruiter" || !user.companyId) {
        return res.status(404).json({ success: false, message: "Not found" });
      }
      const company = await db
        .collection("companies")
        .findOne({ _id: user.companyId }, { projection: { "trust.level": 1 } });
      const level = company?.trust?.level ?? "unverified";
      if (!(level in RANK) || RANK[level] < RANK[minLevel]) {
        return res.status(403).json({
          success: false,
          code: 403,
          message: level === "rejected" ? "This hiring account was not approved." : "Your company isn't verified yet.",
          trustLevel: level,
        });
      }
      req.recruiter = { companyId: user.companyId, trustLevel: level };
      next();
    } catch (err) {
      sendError(err, req, res);
    }
  };
};
