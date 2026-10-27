import { dismissDrift } from "../services/driftService.js";

export const dismiss = async (req, res) => {
  try {
    if (!(await dismissDrift(req.app.locals.db, req.params.id, req.user._id))) {
      return res.status(404).json({ success: false, message: "Map not found" });
    }
    res.json({ success: true, data: { drift: null } });
  } catch (err) {
    console.error("system-map drift:", err);
    res.status(500).json({ success: false, message: "Something went wrong with your map." });
  }
};
