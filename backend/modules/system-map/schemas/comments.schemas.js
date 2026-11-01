import { z } from "zod";

const objectId = z.string().regex(/^[a-f0-9]{24}$/, "Invalid id");

export const MAX_COMMENT_LENGTH = 500;

// GET/POST /api/system-maps/:id/comments
export const commentsParamSchema = z.object({ id: objectId });

// DELETE /api/system-maps/:id/comments/:commentId
export const commentParamSchema = z.object({ id: objectId, commentId: objectId });

// Part ids are the map's own node ids (free text, at most 64 chars in saved graphs).
export const commentBodySchema = z.object({
  nodeId: z.string().trim().min(1).max(64),
  text: z.string().trim().min(1, "Write something first").max(MAX_COMMENT_LENGTH),
});
