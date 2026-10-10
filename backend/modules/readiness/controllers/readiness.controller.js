import { getReadinessService } from "../services/readinessService.js";

export const getMyReadiness = async (req, res) => {
  try {
    const data = await getReadinessService(req.app.locals.db, req.user._id);
    res.json({ success: true, data });
  } catch (err) {
    console.error("readiness error:", err);
    res.status(500).json({ success: false, message: "Couldn't load your readiness." });
  }
};
