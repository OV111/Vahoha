/**
 * Every teams route, mounted at /api/teams by the module's index.js.
 *
 * Order matters. The public evidence page comes before authenticate. Routers
 * with fixed paths (admin's "/admin/...", membership's "/open", "/start",
 * "/me/eligibility") come before team.routes.js, whose "/:teamId" would
 * otherwise read "open" as an id and refuse it. One error handler at the end
 * answers for every controller.
 */

import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { makeErrorHandler } from "../../../utils/respond.js";
import adminRoutes from "./admin.routes.js";
import aiLeadRoutes from "./aiLead.routes.js";
import boardRoutes from "./board.routes.js";
import membershipRoutes from "./membership.routes.js";
import proofRoutes from "./proof.routes.js";
import publicRoutes from "./public.routes.js";
import teamRoutes from "./team.routes.js";

const router = Router();

router.use(publicRoutes);
router.use(authenticate);
router.use(adminRoutes);
router.use(membershipRoutes);
router.use(teamRoutes);
router.use(boardRoutes);
router.use(aiLeadRoutes);
router.use(proofRoutes);
router.use(makeErrorHandler("teams"));

export default router;
