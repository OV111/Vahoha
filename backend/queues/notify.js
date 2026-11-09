// Fire-and-forget enqueue for services: a notification must never fail the
// action that caused it, and an unawaited add() that rejects would be an
// unhandled rejection.
//
// The queue is imported lazily: notificationQueue.js opens the Redis
// connection and loads backend/.env at import time, which services (and every
// test that imports them) must not trigger just by loading.
export const notify = (job) => {
  import("./notificationQueue.js")
    .then(({ default: queue }) => queue.add(job.type, job))
    .catch((err) => console.error(`Could not queue ${job.type} notification:`, err));
};
