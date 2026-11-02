import { z } from "zod";

// GET /search/users and /search/categories. Long input is cut, not rejected:
// the navbar searches as you type, and a 400 there would just flash an error.
export const searchQuerySchema = z.object({
  q: z
    .string()
    .trim()
    .default("")
    .transform((s) => s.slice(0, 60)),
});
