import { Worker } from "bullmq";
import { createNotification, SYSTEM_TYPES } from "../modules/notifications/index.js";
import connectDB from "../config/db.js";
import { sendToUser } from "../websocket/connectionRegistry.js";
import { redisConnection } from "../config/redis.js";
import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env.local" });
dotenv.config({ path: "./backend/.env" });

// REDIS_ENABLED=false disables the worker without removing code
const REDIS_ENABLED = process.env.REDIS_ENABLED !== "false";

if (!REDIS_ENABLED) {
  console.log("Redis disabled — NotificationWorker not started.");
}

const NotificationWorker = REDIS_ENABLED ? new Worker(
  "notifications",
  async (job) => {
    const { type, actorId, targetUserId, ref, meta } = job.data;
    // Cheap guard before touching the DB; createNotification re-checks for
    // any other caller. System types (capstone review) have no actor.
    const system = SYSTEM_TYPES.has(type);
    if (!type || !targetUserId || (!system && !actorId)) return;
    if (!system && actorId === targetUserId) return;
    try {
      const db = await connectDB();
      const newNotification = await createNotification(db, { type, actorId, targetUserId, ref, meta });
      // null = nothing was stored (missing field or self-notification).
      if (newNotification) sendToUser(targetUserId, { type: "notification", data: newNotification });
    } catch (err) {
      console.error("Error occurred while processing notification:", err);
      throw err;
    }
  },
  { connection: redisConnection },
) : null;

if (NotificationWorker) {
  NotificationWorker.on("ready", () => {
    console.log("Redis connected successfully!");
  });
}

export default NotificationWorker;
