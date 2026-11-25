import { Router } from "express";
import adminRoutes from "./routes/admin.routes.js";
import capstoneRoutes from "./routes/capstone.routes.js";
import certificateRoutes from "./routes/certificate.routes.js";

const router = Router();

router.use("/certificates", certificateRoutes);
router.use("/admin", adminRoutes);
router.use("/", capstoneRoutes);

export default router;

// Learner progress and certificates
export { hasCapstoneAttempt } from "./services/capstoneData.js";
export { getCapstoneEvidence, listPassedTracks, listPublicCertificatesForUser } from "./services/certificateService.js";
export { getCapstoneMentorView, hasLiveDefense } from "./services/mentorService.js";

// GitHub
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

// AI calls
export { runStructured } from "./services/reviewModel.js";
export { callWithOneRetry } from "./lib/retry.js";
export { scanForInjection } from "./lib/reviewPrompt.js";

// Defense rules and grading
export {
  GRADING_SYSTEM_PROMPT,
  gradingJsonSchema,
  isOnTime,
  normalizeAnswer,
  parseGrades,
  scoreDefense,
} from "./lib/defense.js";
export {
  DEFAULT_PASS_THRESHOLDS,
  DEFENSE_LOCK_STALE_MS,
  DEFENSE_QUESTION_COUNT,
  DEFENSE_QUESTION_MS,
  MAX_DEFENSE_SESSIONS,
  REVIEW_MODEL,
} from "./lib/constants.js";
