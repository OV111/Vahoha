import { z } from "zod";

// PUT /api/recruiter/settings (signed-in developer, their own settings only)
export const settingsSchema = z.object({
  enabled: z.boolean(),
  openToWork: z.boolean(),
  show: z.object({
    exams: z.boolean(),
    capstone: z.boolean(),
    teams: z.boolean(),
    strengths: z.boolean(),
  }),
});

// GET /api/recruiter/scorecards/:username (public)
export const usernameParamSchema = z.object({
  username: z.string().trim().min(1).max(40).regex(/^[A-Za-z0-9._-]+$/, "Invalid username"),
});

const flag = z.enum(["true", "false"]).transform((v) => v === "true");

// GET /api/recruiter/candidates (signed-in). Every field optional: no query is
// "everyone who opted in, best evidence first".
export const candidatesQuerySchema = z.object({
  track: z.string().trim().min(1).max(60).regex(/^[a-z0-9-]+$/i, "Invalid track").optional(),
  openToWork: flag.optional(),
  hasCapstone: flag.optional(),
  minLayers: z.coerce.number().int().min(0).max(50).optional(),
  q: z.string().trim().min(1).max(60).optional(),
  sort: z.enum(["score", "layers", "active"]).default("score"),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(20),
});
