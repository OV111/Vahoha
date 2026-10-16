import { z } from "zod";

/**
 * Every first-visit tour the frontend can show. The ids are stored on the user
 * (`toursSeen`), so an unknown id is rejected instead of silently saved: a typo
 * in the client would otherwise write junk into the user document. To show a
 * tour again after a redesign, add a new id (e.g. "roadmap-v2").
 */
export const TOUR_IDS = ["roadmap", "arena", "capstone"];

export const tourParamsSchema = z
  .object({
    tourId: z.enum(TOUR_IDS, { errorMap: () => ({ message: "Unknown tour" }) }),
  })
  .strict();
