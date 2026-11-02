import { verifyToken } from "../../../utils/jwtToken.js";
import { createPostService } from "../services/postService.js";
import { makeErrorHandler } from "../../../utils/respond.js";

const sendError = makeErrorHandler("blogs");

export const createPost = async (req, res) => {
  try {
    const token = req.headers.authorization?.replace("Bearer ", "");
    const verified = verifyToken(token);
    if (!verified) return res.status(401).json({ message: "Unauthorized", code: 401 });

    await createPostService(req.app.locals.db, req.body, verified.id);
    res.status(201).json({ code: 201, message: "Created Blog" });
  } catch (err) {
    sendError(err, req, res);
  }
};
