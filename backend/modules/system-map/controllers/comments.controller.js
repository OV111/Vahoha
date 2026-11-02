import { addCommentService, deleteCommentService, listCommentsService } from "../services/commentService.js";
import { dbOf, respond } from "../../../utils/respond.js";

export const list = respond((req) => listCommentsService(dbOf(req), req.params.id, req.user._id));
export const add = respond((req) => addCommentService(dbOf(req), req.params.id, req.user._id, req.body), { status: 201 });
export const remove = respond(async (req) => {
  await deleteCommentService(dbOf(req), req.params.id, req.params.commentId, req.user._id);
});
