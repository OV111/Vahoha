/**
 * Teams module: the only public entry point. `app.js` mounts this router at
 * /api/teams and never reaches inside the module's folders. Other modules use
 * the named exports below, never the collections directly.
 */

import { Router } from "express";
import teamsRoutes from "./routes/index.js";

const router = Router();
router.use("/", teamsRoutes);

export default router;

// Used by the readiness module and the mentor's learner context.
export { getMemberStats } from "./services/team/memberStatsService.js";

// Used by the profile module: a removed or replaced CV drops its Teams estimate.
export { clearCvEstimate } from "./services/membership/cvService.js";

// Used by the recruiter scorecard.
export { listPublicTeamEvidenceForUser } from "./services/proof/evidenceService.js";

// Used by system-map: a team map is open to the team's active members.
export { isActiveTeamMember } from "./services/team/teamsService.js";
