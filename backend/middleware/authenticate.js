// authenticate.js
import { ObjectId } from "mongodb";
import { verifyAccessToken } from "../utils/jwtToken.js";

export const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith("Bearer ")) {
    return res.status(401).json({ message: "No token provided" });
  }
  const token = authHeader.split(" ")[1];

  // verifyAccessToken (single source of truth) also rejects a refresh token
  // presented here — refresh tokens are cookie-only and carry type:"refresh".
  const decoded = verifyAccessToken(token);
  if (!decoded) {
    return res.status(401).json({ message: "Invalid or expired token" });
  }

  const rawId = decoded.id ?? decoded._id; // tokens issued before the rename carry `_id`
  if (!rawId) {
    return res.status(401).json({ message: "Invalid token payload" });
  }

  req.user = {
    ...decoded,
    id: String(rawId),
    _id: new ObjectId(rawId),
  };
  next();
};