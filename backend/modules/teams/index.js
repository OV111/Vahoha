/**
 * Teams module: the only public entry point. `app.js` mounts this router at
 * /api/teams and never reaches inside the module's folders. Other modules use
 * the named exports below, never the collections directly.
 */

import { Router } from "express";
import teamsRoutes from "./routes/teams.routes.js";

const router = Router();
router.use("/", teamsRoutes);

export default router;

// Used by the readiness module and the AI mentor's learner context.
export { getMemberStats } from "./services/memberStatsService.js";

// Used by the recruiter scorecard.
export { listPublicTeamEvidenceForUser } from "./services/evidenceService.js";
