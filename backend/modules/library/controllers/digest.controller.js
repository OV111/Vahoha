import { getDigestService, setConceptKnownService } from "../services/digestService.js";
import { submitConceptCheckService } from "../services/checkService.js";

export const getDigest = async (req, res) => {
  try {
    const data = await getDigestService(req.app.locals.db, req.params.id, req.user._id);
    if (!data) return res.status(404).json({ success: false, message: "No digest for this book" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const setConceptKnown = async (req, res) => {
  try {
    const { id, conceptKey } = req.params;
    const result = await setConceptKnownService(req.app.locals.db, id, conceptKey, req.user._id, req.body.known);
    if (!result) return res.status(404).json({ success: false, message: "Concept not found" });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const submitConceptCheck = async (req, res) => {
  try {
    const { id, conceptKey } = req.params;
    const result = await submitConceptCheckService(req.app.locals.db, id, conceptKey, req.user._id, req.body.answerIndex);
    if (!result) return res.status(404).json({ success: false, message: "Check not found" });
    res.json({ success: true, ...result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
