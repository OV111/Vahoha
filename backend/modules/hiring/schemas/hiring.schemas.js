import { z } from "zod";
import { signupPasswordSchema } from "../../auth/schemas/auth.schemas.js";
import {
  COMPANY_ROLE_IDS,
  HIRING_CODE_LENGTH,
  ORG_TYPE_IDS,
  TEAM_SIZES,
  WEBSITE_MESSAGE,
  WEBSITE_PATTERN,
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

export const verifyCodeSchema = z.object({
  code: z.string().trim().regex(new RegExp(`^\\d{${HIRING_CODE_LENGTH}}$`), "Enter the 6-digit code."),
});
