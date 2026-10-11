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

// Used by the AI mentor (backend/modules/ai-agent: services/agentTools.js, controllers/aiAgent.controller.js).
export { getCapstoneMentorView, hasLiveDefense } from "./services/mentorService.js";

// Used by the public profile (backend/modules/users/services/userService.js).
export { listPublicCertificatesForUser } from "./services/certificateService.js";

// Used by the readiness module (modules/readiness).
export { getCapstoneEvidence } from "./services/certificateService.js";
