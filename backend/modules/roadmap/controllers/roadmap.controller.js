import {
  getUserProgress,
  createUserProgress,
  updateUserProgress,
  syncCurrentLayer,
} from "../../../services/userProgressService.js";
import { trackEvent } from "../../../services/eventService.js";
import { sanitizeLayerProgress, doneLayerIds } from "../../../services/layerProgress.js";
import { PATH_SETUP, ABOUT_MAX } from "../../../../constants/pathSetup.js";

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

const CHOICES = ["skillLevel", "goal", "background", "weeklyTime"];

/**
 * The Path Setup answers, checked against constants/pathSetup.js. Returns
 * { fields } with only what was sent, or { error }. `about` is free text that
 * ends up in the mentor prompt, so it is flattened to one line and capped.
 */
export const readPathSetup = (body) => {
  const fields = {};
  for (const key of CHOICES) {
    const value = body[key];
    if (value === undefined || value === null) continue;
    if (!Object.hasOwn(PATH_SETUP[key], value)) {
      return { error: `${key} must be one of: ${Object.keys(PATH_SETUP[key]).join(", ")}` };
    }
    fields[key] = value;
  }
  if (body.about !== undefined && body.about !== null) {
    if (typeof body.about !== "string") return { error: "about must be text" };
    const about = body.about.replace(/[\p{Cc}"`<>]+/gu, " ").replace(/\s+/g, " ").trim().slice(0, ABOUT_MAX);
    if (about) fields.about = about;
  }
  return { fields };
};

export const startPath = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { activePath } = req.body;
    const { fields: setup, error } = readPathSetup(req.body);

    if (!activePath || typeof activePath !== "string") {
      return res.status(400).json({ message: "activePath is required" });
    }
    if (error) return res.status(400).json({ message: error });
    const { skillLevel, ...answers } = setup;
    // Sent only by the Path Setup panel; a plain path switch keeps the old answers.
    const setupFields = Object.keys(answers).length ? { setup: { ...answers, at: new Date() } } : {};

    const existing = await getUserProgress(db, userId);
    await trackEvent(db, userId, "path_selected", { path: activePath, switched: Boolean(existing) });
    if (existing) {
      // Only the path and the setup answers change; progress already earned stays.
      const fields = { activePath, ...setupFields };
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
      ...setupFields,
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
