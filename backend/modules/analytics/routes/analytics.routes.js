import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { requireAdmin } from "../../../middleware/requireAdmin.js";
import { getFunnel } from "../../../services/eventService.js";
import { createTtlCache } from "../../../utils/ttlCache.js";

const router = Router();

const DEFAULT_WINDOW_DAYS = 30;
const MAX_WINDOW_DAYS = 365;

// Loading a cohort and every event of theirs is the heaviest read in the app, and the
// numbers are the same for every admin. 5 minutes: a dashboard that is a few minutes
// behind is fine. No invalidation on purpose: events are written on nearly every
// request, so clearing on each one would leave nothing cached.
const funnelCache = createTtlCache({ name: "funnel", ttlMs: 5 * 60 * 1000, maxEntries: 40 });

// GET /api/admin/funnel?days=30 — pilot funnel for users who signed up in the
// last `days` days. Admin-only: requireAdmin answers 404 to everyone else.
router.get("/funnel", authenticate, requireAdmin, async (req, res) => {
  try {
    const days = Number(req.query.days ?? DEFAULT_WINDOW_DAYS);
    if (!Number.isInteger(days) || days < 1 || days > MAX_WINDOW_DAYS) {
      return res.status(400).json({ message: `days must be an integer from 1 to ${MAX_WINDOW_DAYS}` });
    }
    // `since` is computed when the funnel is built, not when it is looked up.
    const funnel = await funnelCache.wrap(String(days), () =>
      getFunnel(req.app.locals.db, new Date(Date.now() - days * 24 * 60 * 60 * 1000)),
    );
    res.json(funnel);
  } catch (err) {
    console.error("funnel error:", err);
    res.status(500).json({ message: "Failed to compute funnel" });
  }
});

export default router;
