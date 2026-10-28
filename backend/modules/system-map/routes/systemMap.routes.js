import { Router } from "express";
import rateLimit from "express-rate-limit";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import { publicMapLimiter } from "../../../middleware/rateLimits.js";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import {
  createBodySchema,
  mapParamSchema,
  publicParamSchema,
  scanBodySchema,
  sharingBodySchema,
  updateBodySchema,
} from "../schemas/systemMap.schemas.js";
import { ownerParamSchema } from "../schemas/owner.schemas.js";
import {
  createMap,
  createOwnerMap,
  deleteMap,
  getMap,
  getOwnerMap,
  getPublicMap,
  listMine,
  scanRepo,
  setSharing,
  updateMap,
} from "../controllers/systemMap.controller.js";

const router = Router();

// A scan costs GitHub calls and an LLM call. Per user, so it runs after authenticate.
const scanDailyLimiter = rateLimit({
  windowMs: 24 * 60 * 60 * 1000,
  limit: 20,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  keyGenerator: (req) => String(req.user?._id ?? "anonymous"),
  message: { message: "Daily repo scan limit reached. Try again tomorrow.", code: 429 },
});

// Fixed paths first, then /:id.

// GET /api/system-maps/mine: the learner's maps (no graphs)
router.get("/mine", authenticate, listMine);

// GET /api/system-maps/public/:publicId: a shared map, no login
router.get("/public/:publicId", publicMapLimiter, validate({ params: publicParamSchema }), getPublicMap);

// POST /api/system-maps/scan: read a public GitHub repo and propose parts (nothing saved)
router.post("/scan", authenticate, aiBurstLimiter, scanDailyLimiter, validate({ body: scanBodySchema }), scanRepo);

// GET /api/system-maps/for/:ownerType/:ownerId: the map of a capstone track or a team (null when none yet)
router.get("/for/:ownerType/:ownerId", authenticate, validate({ params: ownerParamSchema }), getOwnerMap);

// POST /api/system-maps/for/:ownerType/:ownerId: create it; 409 when it already exists
router.post(
  "/for/:ownerType/:ownerId",
  authenticate,
  validate({ params: ownerParamSchema, body: createBodySchema }),
  createOwnerMap,
);

// POST /api/system-maps: create a map
router.post("/", authenticate, validate({ body: createBodySchema }), createMap);

// GET /api/system-maps/:id: one map, owner only
router.get("/:id", authenticate, validate({ params: mapParamSchema }), getMap);

// PUT /api/system-maps/:id: save; 409 when `revision` is out of date
router.put("/:id", authenticate, validate({ params: mapParamSchema, body: updateBodySchema }), updateMap);

// PUT /api/system-maps/:id/sharing: turn the public link on (new link) or off
router.put("/:id/sharing", authenticate, validate({ params: mapParamSchema, body: sharingBodySchema }), setSharing);

// DELETE /api/system-maps/:id
router.delete("/:id", authenticate, validate({ params: mapParamSchema }), deleteMap);

export default router;
