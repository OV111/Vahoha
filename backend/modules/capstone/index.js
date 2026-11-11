/**
 * Capstone module — the only public entry point.
 *
 * `app.js` mounts this one router at /api/capstone and never reaches inside
 * the module's folders.
 */

import { Router } from "express";
import capstoneRoutes from "./routes/capstone.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";
import adminRoutes from "./routes/admin.routes.js";

const router = Router();

// "/certificates" and "/admin" are mounted FIRST: the capstone routes start
// with a catch-all "/:trackId", which would otherwise read them as track ids.
router.use("/certificates", certificateRoutes);
router.use("/admin", adminRoutes);
router.use("/", capstoneRoutes);

export default router;

// Used by the mentor (backend/modules/mentor: services/agentTools.js, controllers/mentor.controller.js).
export { getCapstoneMentorView, hasLiveDefense } from "./services/mentorService.js";

// Used by the public profile (backend/modules/users/services/userService.js).
export { listPublicCertificatesForUser } from "./services/certificateService.js";

// Used by the readiness module (modules/readiness).
export { getCapstoneEvidence } from "./services/certificateService.js";

// Used by Build Teams: a learner starts a team on a track they passed.
export { listPassedTracks } from "./services/certificateService.js";

// Shared building blocks, for teams (defense on a member's own PRs, board sync)
// and system-map (repo scan, understanding check). Other modules import these
// from here, never from capstone's own folders.
export {
  getFileText,
  getHeadCommit,
  getPullFiles,
  getPullReviewers,
  getRepo,
  getTree,
  listMergedPulls,
  listRecentPulls,
} from "./services/githubClient.js";
export { parseRepoUrl } from "./lib/githubUrl.js";
export { runStructured } from "./services/reviewModel.js";
export { callWithOneRetry } from "./lib/retry.js";
export { scanForInjection } from "./lib/reviewPrompt.js";
export {
  DEFAULT_PASS_THRESHOLDS,
  DEFENSE_LOCK_STALE_MS,
  DEFENSE_QUESTION_COUNT,
  DEFENSE_QUESTION_MS,
  MAX_DEFENSE_SESSIONS,
  REVIEW_MODEL,
} from "./lib/constants.js";
export { GRADING_SYSTEM_PROMPT, gradingJsonSchema, isOnTime, normalizeAnswer, parseGrades, scoreDefense } from "./lib/defense.js";

// Used by system-map: a capstone map is open to a learner who started that capstone.
export { hasCapstoneAttempt } from "./services/capstoneData.js";
