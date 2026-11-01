import { MAX_COMMENTS_PER_MAP, addCommentService, deleteCommentService, listCommentsService } from "../services/commentService.js";

const fail = (res, status, message) => res.status(status).json({ success: false, message });
const serverError = (res, err) => {
  console.error("system-map comments:", err);
  fail(res, 500, "Something went wrong with the comments.");
};

const ERRORS = {
  "not-team": [400, "Comments are only on team maps."],
  "no-part": [409, "That part isn't on the saved map any more. Reload the map and try again."],
  full: [409, `This map has reached ${MAX_COMMENTS_PER_MAP} comments.`],
};

const sendError = (res, error) => fail(res, ...ERRORS[error]);

export const list = async (req, res) => {
  try {
    const result = await listCommentsService(req.app.locals.db, req.params.id, req.user._id);
    if (!result) return fail(res, 404, "Map not found");
    if (result.error) return sendError(res, result.error);
    res.json({ success: true, data: result.comments });
  } catch (err) {
    serverError(res, err);
  }
};

export const add = async (req, res) => {
  try {
    const result = await addCommentService(req.app.locals.db, req.params.id, req.user._id, req.body);
    if (!result) return fail(res, 404, "Map not found");
    if (result.error) return sendError(res, result.error);
    res.status(201).json({ success: true, data: result.comment });
  } catch (err) {
    serverError(res, err);
  }
};

export const remove = async (req, res) => {
  try {
    if (!(await deleteCommentService(req.app.locals.db, req.params.id, req.params.commentId, req.user._id))) {
      return fail(res, 404, "Comment not found");
    }
    res.json({ success: true });
  } catch (err) {
    serverError(res, err);
  }
};
