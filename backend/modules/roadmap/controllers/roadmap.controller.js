import {
  getUserProgress,
  createUserProgress,
  updateUserProgress,
  syncCurrentLayer,
} from "../../../services/userProgressService.js";
import { trackEvent } from "../../../services/eventService.js";
import { sanitizeLayerProgress, doneLayerIds } from "../../../services/layerProgress.js";

export const getProgress = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const progress = await getUserProgress(db, userId);
    res.json({ progress: progress ?? null });
  } catch (err) {
    console.error("getProgress error:", err);
    res.status(500).json({ message: "Failed to fetch progress" });
  }
};

// Same 4 values TrackOnboardingPanel.jsx's first step offers — keeping one
// source of truth would mean sharing a constants file across frontend/backend,
// which this repo doesn't have set up yet; small enough set to duplicate here
// deliberately rather than take on that restructuring for one field.
const VALID_SKILL_LEVELS = ["beginner", "some", "intermediate", "advanced"];

export const startPath = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { activePath, skillLevel } = req.body;

    if (!activePath || typeof activePath !== "string") {
      return res.status(400).json({ message: "activePath is required" });
    }
    if (skillLevel !== undefined && !VALID_SKILL_LEVELS.includes(skillLevel)) {
      return res.status(400).json({ message: `skillLevel must be one of: ${VALID_SKILL_LEVELS.join(", ")}` });
    }

    const existing = await getUserProgress(db, userId);
    await trackEvent(db, userId, "path_selected", { path: activePath, switched: Boolean(existing) });
    if (existing) {
      // only update activePath (+ skillLevel, if the onboarding wizard sent
      // one this time) — never reset progress already earned
      const fields = { activePath };
      if (skillLevel) fields.skillLevel = skillLevel;
      await updateUserProgress(db, userId, fields);
      // currentLayer was an order in the OLD track; re-derive it for this one.
      return res.json({ progress: await syncCurrentLayer(db, userId) });
    }

    await createUserProgress(db, userId, {
      activePath,
      currentLayer: 1,
      completedLayers: [],
      skillLevel, // createUserProgress defaults this to "beginner" if undefined
    });
    // Layers passed on another track may already cover this one's first layers.
    res.status(201).json({ progress: await syncCurrentLayer(db, userId) });
  } catch (err) {
    console.error("startPath error:", err);
    res.status(500).json({ message: "Failed to start path" });
  }
};

export const saveProgress = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    // currentLayer is not read from the body: the server derives it (syncCurrentLayer).
    const { layerProgress, activePath } = req.body;

    if (!layerProgress || typeof layerProgress !== "object") {
      return res.status(400).json({ message: "layerProgress object is required" });
    }

    // "done" is earned by passing the exam, never reported by the client.
    const existing = await getUserProgress(db, userId);
    const safeProgress = sanitizeLayerProgress(layerProgress, doneLayerIds(existing));
    const completedLayers = Object.entries(safeProgress)
      .filter(([, status]) => status === "done")
      .map(([id]) => id);

    const fields = { layerProgress: safeProgress, completedLayers };
    if (activePath) fields.activePath = activePath;

    const updated = await updateUserProgress(db, userId, fields);
    const pathChanged = activePath && activePath !== existing?.activePath;
    res.json({ progress: pathChanged ? await syncCurrentLayer(db, userId) : updated });
  } catch (err) {
    console.error("saveProgress error:", err);
    res.status(500).json({ message: "Failed to save progress" });
  }
};
