import { Router } from "express";
import { makeErrorHandler } from "../../../utils/respond.js";
import { sharedRateLimit } from "../../../middleware/sharedRateLimit.js";
import { aiBurstLimiter } from "../../../middleware/aiRateLimit.js";
import { mapWriteLimiter, publicMapLimiter } from "../../../middleware/rateLimits.js";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import {
  createBodySchema,
  mapParamSchema,
  opsBodySchema,
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
  saveOps,
  scanRepo,
  setSharing,
  updateMap,
} from "../controllers/systemMap.controller.js";

const router = Router();

// A scan costs GitHub calls and an LLM call. Per user, so it runs after authenticate.
const scanDailyLimiter = sharedRateLimit("system-map.scanDaily", {
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
  mapWriteLimiter,
  validate({ params: ownerParamSchema, body: createBodySchema }),
  createOwnerMap,
);

// POST /api/system-maps: create a map
router.post("/", authenticate, mapWriteLimiter, validate({ body: createBodySchema }), createMap);

// GET /api/system-maps/:id: one map, owner only
router.get("/:id", authenticate, validate({ params: mapParamSchema }), getMap);

// PUT /api/system-maps/:id: save; 409 when `revision` is out of date
router.put("/:id", authenticate, mapWriteLimiter, validate({ params: mapParamSchema, body: updateBodySchema }), updateMap);

// PATCH /api/system-maps/:id/ops: save edits; merged onto a newer revision when nobody touched the same things, else 409
router.patch("/:id/ops", authenticate, mapWriteLimiter, validate({ params: mapParamSchema, body: opsBodySchema }), saveOps);

// PUT /api/system-maps/:id/sharing: turn the public link on (new link) or off
router.put("/:id/sharing", authenticate, mapWriteLimiter, validate({ params: mapParamSchema, body: sharingBodySchema }), setSharing);

// DELETE /api/system-maps/:id
router.delete("/:id", authenticate, mapWriteLimiter, validate({ params: mapParamSchema }), deleteMap);

router.use(makeErrorHandler("system-map", "Something went wrong with your map."));

export default router;
