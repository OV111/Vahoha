import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import { listQuerySchema } from "../schemas/challenge.schemas.js";
import {
  listChallenges,
  listTracks,
  getChallenge,
  getTagCounts,
  getDailyChallenge,
  getPersonalStats,
  getLayerProgress,
  getLeaderboard,
} from "../controllers/challenge.controller.js";

const router = Router();

// Static segments are declared before "/:slug" so a request for /daily is not
// swallowed by the slug route.
router.get("/daily", authenticate, getDailyChallenge);
router.get("/stats/me", authenticate, getPersonalStats);
// URL kept as /readiness for existing clients; this is layer challenge progress,
// not job readiness (that lives at /api/readiness).
router.get("/readiness", authenticate, getLayerProgress);
router.get("/leaderboard", authenticate, getLeaderboard);
router.get("/topics", authenticate, getTagCounts);
router.get("/tracks", authenticate, listTracks);
router.get("/", authenticate, validate({ query: listQuerySchema }), listChallenges);
router.get("/:slug", authenticate, getChallenge);

export default router;
