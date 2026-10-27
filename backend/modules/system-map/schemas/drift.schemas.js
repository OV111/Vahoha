import { z } from "zod";

// POST /api/system-maps/:id/drift/dismiss
export const driftParamSchema = z.object({ id: z.string().regex(/^[a-f0-9]{24}$/, "Invalid id") });
