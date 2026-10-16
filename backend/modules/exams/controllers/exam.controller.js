import {
  getExamHistory,
  getLastExam,
  withLayerTitles,
} from "../../../services/examHistoryService.js";
import {
  getWeakSpots,
  addWeakSpot,
  resolveWeakSpot,
} from "../../../services/weakSpotService.js";

// ── Exam History ──────────────────────────────────────────────

export const getHistory = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const limit = Math.min(Number(req.query.limit) || 10, 50);
    const history = await withLayerTitles(
      db,
      await getExamHistory(db, userId, limit),
    );
    res.json({ history });
  } catch (err) {
    console.error("getHistory error:", err);
    res.status(500).json({ message: "Failed to fetch test history" });
  }
};

export const getLastExamResult = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const last = await getLastExam(db, userId);
    res.json({ exam: last ?? null });
  } catch (err) {
    console.error("getLastExam error:", err);
    res.status(500).json({ message: "Failed to fetch last test" });
  }
};

// ── Weak Spots ────────────────────────────────────────────────

export const listWeakSpots = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const spots = await getWeakSpots(db, userId);
    res.json({ weakSpots: spots });
  } catch (err) {
    console.error("listWeakSpots error:", err);
    res.status(500).json({ message: "Failed to fetch weak spots" });
  }
};

export const addWeakSpotRoute = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const { topic, path, layer, source } = req.body;

    if (!topic || typeof topic !== "string" || !topic.trim()) {
      return res.status(400).json({ message: "topic is required and must be a string" });
    }

    const spot = await addWeakSpot(db, userId, {
      topic: topic.trim(),
      path,
      layer,
      source,
    });
    res.status(201).json({ weakSpot: spot });
  } catch (err) {
    console.error("addWeakSpot error:", err);
    res.status(500).json({ message: "Failed to add weak spot" });
  }
};

export const resolveWeakSpotRoute = async (req, res) => {
  try {
    const db = req.app.locals.db;
    const userId = req.user._id.toString();
    const topic = req.params.topic;

    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ message: "topic param is required" });
    }

    const spot = await resolveWeakSpot(db, userId, decodeURIComponent(topic));
    if (!spot) {
      return res.status(404).json({ message: "Weak spot not found" });
    }
    res.json({ weakSpot: spot });
  } catch (err) {
    console.error("resolveWeakSpot error:", err);
    res.status(500).json({ message: "Failed to resolve weak spot" });
  }
};
