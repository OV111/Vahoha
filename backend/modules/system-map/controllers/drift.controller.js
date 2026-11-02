import { dismissDrift } from "../services/driftService.js";
import { fail } from "../../../utils/httpErrors.js";
import { dbOf, respond } from "../../../utils/respond.js";

// dismissDrift answers a plain boolean because the teams module calls it too.
export const dismiss = respond(async (req) => {
  if (!(await dismissDrift(dbOf(req), req.params.id, req.user._id))) fail(404, "Map not found");
  return { drift: null };
});
