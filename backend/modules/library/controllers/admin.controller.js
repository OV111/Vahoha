import { digestImportSchema } from "../schemas/digest.schemas.js";
import { applyDigestImport, planDigestImport } from "../services/importService.js";
import {
  PublishRefusedError,
  listConceptsForAdmin,
  listDigests,
  setConceptReviewed,
  setDigestVisibility,
} from "../services/adminLibraryService.js";

export const getDigests = async (req, res) => {
  try {
    const digests = await listDigests(req.app.locals.db);
    res.json({ success: true, data: digests });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getConcepts = async (req, res) => {
  try {
    const data = await listConceptsForAdmin(req.app.locals.db, req.params.id);
    if (!data) return res.status(404).json({ success: false, message: "Library item not found" });
    res.json({ success: true, data });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const patchConceptReviewed = async (req, res) => {
  try {
    const { id, conceptKey } = req.params;
    const found = await setConceptReviewed(req.app.locals.db, id, conceptKey, req.body.reviewed);
    if (!found) return res.status(404).json({ success: false, message: "Concept not found" });
    res.json({ success: true, reviewed: req.body.reviewed });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const patchVisibility = async (req, res) => {
  try {
    const found = await setDigestVisibility(req.app.locals.db, req.params.id, req.body.visibility);
    if (!found) return res.status(404).json({ success: false, message: "Library item not found" });
    res.json({ success: true, visibility: req.body.visibility });
  } catch (err) {
    if (err instanceof PublishRefusedError) {
      return res.status(409).json({ success: false, message: err.message });
    }
    res.status(500).json({ success: false, message: err.message });
  }
};

export const importDigest = async (req, res) => {
  const parsed = digestImportSchema.safeParse(req.body.data);
  if (!parsed.success) {
    return res.status(400).json({
      success: false,
      message: "The file does not match the digest format",
      issues: parsed.error.issues.map((i) => ({ field: i.path.join(".") || "(file)", message: i.message })),
    });
  }

  try {
    const db = req.app.locals.db;
    const plan = await planDigestImport(db, parsed.data);
    if (!req.body.apply) return res.json({ success: true, applied: false, plan });

    const result = await applyDigestImport(db, parsed.data, { reviewed: req.body.reviewed });
    res.json({ success: true, applied: true, plan, result });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
