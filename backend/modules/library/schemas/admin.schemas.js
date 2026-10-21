import { z } from "zod";

const objectId = z.string().regex(/^[a-f0-9]{24}$/, "Invalid id");
const conceptKey = z
  .string()
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "Invalid concept key")
  .max(60);

// GET /api/library/admin/:id/concepts, PATCH /api/library/admin/:id/visibility
export const adminSourceParamSchema = z.object({ id: objectId });

// PATCH /api/library/admin/:id/concepts/:conceptKey
export const adminConceptParamSchema = z.object({ id: objectId, conceptKey });
export const reviewedBodySchema = z.object({ reviewed: z.boolean() });

export const visibilityBodySchema = z.object({ visibility: z.enum(["public", "admin"]) });

// POST /api/library/admin/import. `data` is checked against digestImportSchema
// in the controller, so its issues come back with paths inside the file.
export const importBodySchema = z.object({
  data: z.unknown(),
  apply: z.boolean().default(false),
  reviewed: z.boolean().default(false),
});
