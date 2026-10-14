import { Queue } from "bullmq";
import { redisConnection } from "../config/redis.js";

// Uses the shared connection from config/redis.js. It used to build its own
// `{ host, port }` without the password or REDIS_URL, so against any
// password-protected Redis every enqueue failed while the worker (already on
// the shared connection) sat idle waiting for jobs that never arrived.
//
// REDIS_ENABLED=false (redisConnection === null): there is no worker, so `add`
// delivers the notification right away (save + live push) instead of dropping
// it. Without this, notifications silently never existed whenever Redis was off.
const deliverInline = async (_name, { type, actorId, targetUserId }) => {
  try {
    // Imported lazily: these pull in the database and websocket modules.
    const [{ default: connectDB }, { createNotification }, { sendToUser }] = await Promise.all([
      import("../config/db.js"),
      import("../modules/notifications/index.js"),
      import("../websocket/connectionRegistry.js"),
    ]);
    const notification = await createNotification(await connectDB(), { type, actorId, targetUserId });
    if (notification) sendToUser(targetUserId, { type: "notification", data: notification });
  } catch (err) {
    console.error("Inline notification failed:", err);
  }
};

const notificationQueue = redisConnection
  ? new Queue("notifications", { connection: redisConnection })
  : { add: deliverInline, close: () => Promise.resolve() };

export default notificationQueue;
