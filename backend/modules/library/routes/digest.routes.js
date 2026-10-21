import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { validate } from "../../../middleware/validate.js";
import {
  checkBodySchema,
  checkParamSchema,
  digestParamSchema,
  knownBodySchema,
  knownParamSchema,
} from "../schemas/digest.schemas.js";
import { getDigest, setConceptKnown, submitConceptCheck } from "../controllers/digest.controller.js";

const router = Router();

// GET /api/library/:id/digest: the book's concepts and what this user marked known
router.get("/:id/digest", authenticate, validate({ params: digestParamSchema }), getDigest);

// PUT /api/library/:id/digest/known/:conceptKey: "I already know this" on or off
router.put(
  "/:id/digest/known/:conceptKey",
  authenticate,
  validate({ params: knownParamSchema, body: knownBodySchema }),
  setConceptKnown,
);

// POST /api/library/:id/digest/check/:conceptKey: answer a concept's check question
router.post(
  "/:id/digest/check/:conceptKey",
  authenticate,
  validate({ params: checkParamSchema, body: checkBodySchema }),
  submitConceptCheck,
);

export default router;
