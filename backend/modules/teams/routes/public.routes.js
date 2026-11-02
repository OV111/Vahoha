import { Router } from "express";
import rateLimit from "express-rate-limit";
import { validate } from "../../../middleware/validate.js";
import { getPublicEvidence } from "../controllers/proof.controller.js";
import { publicIdParamSchema } from "../schemas/teams.schemas.js";

// No login: anyone with the link (a recruiter) opens a team's evidence page.
// Keyed per IP (trust proxy is set in app.js).
const evidenceLimiter = rateLimit({
  windowMs: 60_000,
  limit: 60,
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: { message: "Too many requests. Please wait a minute.", code: 429 },
});

const router = Router();
router.get("/evidence/:publicId", evidenceLimiter, validate({ params: publicIdParamSchema }), getPublicEvidence);

export default router;
