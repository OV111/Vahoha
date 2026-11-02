import { searchUsers, searchCategories } from "../services/searchService.js";

// req.query.q is trimmed and length-capped by searchQuerySchema.
const handle = (fn) => async (req, res) => {
  try {
    const { q } = req.query;
    res.status(200).json({ results: q ? await fn(req, q) : [] });
  } catch (err) {
    console.error("search error:", err);
    res.status(500).json({ message: "Search failed", code: 500 });
  }
};

export const getUsers = handle((req, q) => searchUsers(req.app.locals.db, q));
export const getCategories = handle((req, q) => searchCategories(q));
