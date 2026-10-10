/**
 * Readiness module: the only public entry point. `app.js` mounts this router at
 * /api/readiness.
 *
 * Private for now: only the signed-in learner sees their own readiness. It is
 * not on the recruiter scorecard until real teams have tuned the thresholds
 * (see lib/competencies.js).
 */

import { Router } from "express";
import { authenticate } from "../../middleware/authenticate.js";
import { getMyReadiness } from "./controllers/readiness.controller.js";

const router = Router();

router.get("/me", authenticate, getMyReadiness);

export default router;
