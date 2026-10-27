import { z } from "zod";
import { OWNER_TYPES } from "../services/ownerAccess.js";

const TRACK_ID = /^[a-z0-9-]{2,60}$/;
const TEAM_ID = /^[a-f0-9]{24}$/;

// /for/:ownerType/:ownerId. A capstone is addressed by its track id, a team by its id.
export const ownerParamSchema = z
  .object({ ownerType: z.enum(OWNER_TYPES), ownerId: z.string() })
  .superRefine((p, ctx) => {
    const ok = p.ownerType === "team" ? TEAM_ID.test(p.ownerId) : TRACK_ID.test(p.ownerId);
    if (!ok) ctx.addIssue({ code: "custom", message: "Invalid id", path: ["ownerId"] });
  });
