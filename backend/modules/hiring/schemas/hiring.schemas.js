import { z } from "zod";
import { signupPasswordSchema } from "../../auth/schemas/auth.schemas.js";
import {
  COMPANY_ROLE_IDS,
  HIRING_CODE_LENGTH,
  ORG_TYPE_IDS,
  TEAM_SIZES,
  WEBSITE_MESSAGE,
  WEBSITE_PATTERN,
  INTRO_REPORT_REASONS,
  INTRO_RULES,
  INTRO_STATUSES,
  JOB_LEVELS,
  JOB_LIMITS,
  JOB_STATUSES,
  JOB_TYPES,
  SALARY_CURRENCIES,
  SALARY_PERIODS,
  WORKPLACES,
} from "../../../../constants/hiringRules.js";

// POST /api/hiring/signup. Mirrors the 4-step form in src/features/hiring, but
// these are the rules that count: anyone can POST here directly.
export const hiringSignupSchema = z
  .object({
    orgType: z.enum(ORG_TYPE_IDS),
    companyRole: z.enum(COMPANY_ROLE_IDS).optional(),
    fullName: z
      .string()
      .trim()
      .min(2, "At least 2 characters.")
      .max(100, "Max 100 characters.")
      .regex(/^[\p{L}\s'-]+$/u, "Only letters, spaces, hyphens, apostrophes."),
    email: z
      .string()
      .trim()
      .toLowerCase()
      .max(254)
      .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Enter a valid email address."),
    password: signupPasswordSchema,
    company: z.string().trim().min(2, "At least 2 characters.").max(100, "Max 100 characters."),
    website: z
      .string()
      .trim()
      .max(200)
      .regex(WEBSITE_PATTERN, WEBSITE_MESSAGE),
    teamSize: z.enum(TEAM_SIZES),
  })
  .refine((b) => b.orgType === "agency" || Boolean(b.companyRole), {
    message: "Pick your role.",
    path: ["companyRole"],
  });

const companyName = z.string().trim().min(2, "At least 2 characters.").max(100, "Max 100 characters.");
const website = z.string().trim().max(200).regex(WEBSITE_PATTERN, WEBSITE_MESSAGE);

// PATCH /api/hiring/company: fix a typo, then the engine re-checks.
export const updateCompanySchema = z.object({ company: companyName, website });

// GET /api/hiring/admin/companies
export const adminListQuerySchema = z.object({
  level: z.enum(["attention", "unverified", "limited", "verified", "rejected"]).default("attention"),
});

export const companyIdParamSchema = z.object({ id: z.string().regex(/^[a-f0-9]{24}$/i, "Invalid id") });

// POST /api/hiring/admin/companies/:id/override. level null clears the override.
export const overrideSchema = z.object({
  level: z.enum(["limited", "verified", "rejected"]).nullable(),
  note: z.string().trim().max(300).default(""),
});

// /api/hiring/saved/:username
export const usernameParamSchema = z.object({
  username: z.string().trim().min(1).max(40).regex(/^[A-Za-z0-9._-]+$/, "Invalid username"),
});
export const saveCandidateSchema = z.object({ note: z.string().trim().max(500).default("") });

// Jobs. Salary is optional, but both ends are needed when it's given.
const salarySchema = z
  .object({
    min: z.number().int().min(0).max(10_000_000),
    max: z.number().int().min(0).max(10_000_000),
    currency: z.enum(SALARY_CURRENCIES),
    period: z.enum(SALARY_PERIODS),
  })
  .nullable()
  .default(null);

export const jobSchema = z.object({
  title: z.string().trim().min(2, "At least 2 characters.").max(JOB_LIMITS.titleMax),
  level: z.enum(JOB_LEVELS),
  type: z.enum(JOB_TYPES),
  workplace: z.enum(WORKPLACES),
  location: z.string().trim().max(JOB_LIMITS.locationMax).default(""),
  salary: salarySchema,
  stack: z.array(z.string().trim().min(1).max(JOB_LIMITS.stackItemMax)).max(JOB_LIMITS.stackMax).default([]),
  requiredLayers: z.array(z.string().trim().min(1).max(80)).max(JOB_LIMITS.requiredLayersMax).default([]),
  description: z.string().trim().max(JOB_LIMITS.descriptionMax).default(""),
  status: z.enum(JOB_STATUSES).default("draft"),
});

export const jobIdParamSchema = z.object({ id: z.string().regex(/^[a-f0-9]{24}$/i, "Invalid id") });
export const jobStatusSchema = z.object({ status: z.enum(JOB_STATUSES) });
export const jobListQuerySchema = z.object({ status: z.enum(JOB_STATUSES).optional() });
export const layerSearchSchema = z.object({ q: z.string().trim().min(2).max(60) });

export const verifyCodeSchema = z.object({
  code: z.string().trim().regex(new RegExp(`^\\d{${HIRING_CODE_LENGTH}}$`), "Enter the 6-digit code."),
});

// Intro requests. /check and send take the developer's username, like the scorecard.
const objectId = z.string().regex(/^[a-f0-9]{24}$/i, "Invalid id");
export const introIdParamSchema = z.object({ id: objectId });
export const introListQuerySchema = z.object({ status: z.enum(INTRO_STATUSES).optional() });
export const introSendSchema = z.object({
  username: usernameParamSchema.shape.username,
  jobId: objectId,
  message: z
    .string()
    .trim()
    .min(20, "Write at least 20 characters.")
    .max(INTRO_RULES.messageMax, `Keep it under ${INTRO_RULES.messageMax} characters.`),
});
export const introReportSchema = z.object({
  reason: z.enum(INTRO_REPORT_REASONS),
  details: z.string().trim().max(500).default(""),
});
