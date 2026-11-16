import { canAccess } from "../modules/billing/index.js";

/**
 * Route guard for paid features. Mount it after `authenticate`:
 *
 *   router.get("/x", authenticate, requirePlan("pro"), handler);
 *
 * The server is the only place a plan check counts. Hiding something in the UI
 * is cosmetic; a free user can always call the API directly.
 *
 * Inert until BILLING_ENFORCED=true (canAccess passes everyone before that).
 * A failed plan lookup answers 503 instead of letting the request through:
 * a database hiccup must not hand out paid features.
 */
export const requirePlan = (minPlan) => async (req, res, next) => {
  if (!req.user?._id) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    if (await canAccess(req.app.locals.db, req.user._id, minPlan)) return next();
    return res.status(403).json({
      success: false,
      code: "PLAN_REQUIRED",
      requiredPlan: minPlan,
      message: "This feature is part of Pro.",
    });
  } catch (err) {
    console.error("requirePlan: plan lookup failed:", err);
    return res.status(503).json({
      success: false,
      code: "PLAN_CHECK_UNAVAILABLE",
      message: "Couldn't check your plan. Please try again.",
    });
  }
};
