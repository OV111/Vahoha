import process from "node:process";
import { Router } from "express";
import { authenticate } from "../../../middleware/authenticate.js";
import { requireAdmin } from "../../../middleware/requireAdmin.js";
import { adminLimits, recheckLimits, resendLimits, savedLimits, signupLimits, verifyLimits } from "../lib/limits.js";
import { requireRecruiter } from "../../../middleware/requireRecruiter.js";
import { validate } from "../../../middleware/validate.js";
import { makeErrorHandler } from "../../../utils/respond.js";
import {
  adminListQuerySchema,
  companyIdParamSchema,
  hiringSignupSchema,
  overrideSchema,
  jobIdParamSchema,
  jobListQuerySchema,
  jobSchema,
  jobStatusSchema,
  layerSearchSchema,
  saveCandidateSchema,
  usernameParamSchema,
  updateCompanySchema,
  verifyCodeSchema,
} from "../schemas/hiring.schemas.js";
import {
  adminList,
  adminOverride,
  me,
  recheck,
  jobCreate,
  jobGet,
  jobStatus,
  jobUpdate,
  jobsList,
  layerSearch,
  savedDelete,
  savedList,
  savedPut,
  savedStatus,
  resendCode,
  signup,
  updateCompany,
  verifyEmail,
} from "../controllers/hiring.controller.js";

const router = Router();

// Closed until HIRING_ENABLED=true, answering like an unknown route. Read per
// request: the env is loaded after modules are imported.
const hiringOpen = (req, res, next) =>
  process.env.HIRING_ENABLED === "true" ? next() : res.status(404).json({ success: false, message: "Not found" });

router.use(hiringOpen);
// validate() first: the per-domain limit reads the cleaned email.
router.post("/signup", validate({ body: hiringSignupSchema }), ...signupLimits, signup);
router.post("/verify-email", authenticate, ...verifyLimits, validate({ body: verifyCodeSchema }), verifyEmail);
router.post("/resend-code", authenticate, ...resendLimits, resendCode);
router.get("/me", authenticate, me);
router.post("/recheck", authenticate, ...recheckLimits, recheck);
router.patch("/company", authenticate, ...recheckLimits, validate({ body: updateCompanySchema }), updateCompany);

// The company's shortlist. "limited" may already save; contacting needs "verified" (later).
const recruiter = [authenticate, requireRecruiter("limited"), ...savedLimits];
const byUsername = validate({ params: usernameParamSchema });
router.get("/saved", ...recruiter, savedList);
router.get("/saved/:username", ...recruiter, byUsername, savedStatus);
router.put("/saved/:username", ...recruiter, byUsername, validate({ body: saveCandidateSchema }), savedPut);
router.delete("/saved/:username", ...recruiter, byUsername, savedDelete);

// The company's jobs (private to the company). Limited companies may prepare them.
const byJob = validate({ params: jobIdParamSchema });
router.get("/jobs", ...recruiter, validate({ query: jobListQuerySchema }), jobsList);
router.post("/jobs", ...recruiter, validate({ body: jobSchema }), jobCreate);
router.get("/jobs/:id", ...recruiter, byJob, jobGet);
router.put("/jobs/:id", ...recruiter, byJob, validate({ body: jobSchema }), jobUpdate);
router.post("/jobs/:id/status", ...recruiter, byJob, validate({ body: jobStatusSchema }), jobStatus);
router.get("/layers", ...recruiter, validate({ query: layerSearchSchema }), layerSearch);

// The exceptions page (admins only; requireAdmin answers 404 to everyone else).
router.get("/admin/companies", authenticate, requireAdmin, ...adminLimits, validate({ query: adminListQuerySchema }), adminList);
router.post(
  "/admin/companies/:id/override",
  authenticate,
  requireAdmin,
  ...adminLimits,
  validate({ params: companyIdParamSchema, body: overrideSchema }),
  adminOverride,
);

router.use(makeErrorHandler("hiring", "Hiring request failed"));

export default router;
