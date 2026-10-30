// Admission control for the one Groq API key every AI feature shares. Groq limits the
// key (tokens and requests per minute), not each learner, so the per-user limits
// elsewhere cannot stop ten learners together from going over. This gate sits in front
// of every call:
//
//  - token bucket: a call costs its estimated tokens and waits until the bucket holds
//    them. It refills continuously, so a burst is smoothed out instead of refused.
//  - concurrency cap: at most `maxConcurrent` calls in flight, a stream counts until
//    its last chunk.
//  - priority: a mentor reply already in progress (continuation) goes before a new
//    interactive call, which goes before background work (titles, reviews). One queue
//    per priority, first come first served inside it.
//  - pause: when Groq itself answers 429, the whole gate holds until its retry-after.
//
// A call that cannot start within its `maxWaitMs` fails with GroqBusyError, which the
// caller turns into a "busy, try again" message. Pure apart from the timers: the clock
// is a parameter, so every rule is unit-tested.

export const PRIORITY = { continuation: 0, interactive: 1, background: 2 };

export class GroqBusyError extends Error {
  constructor(retryAfterSec) {
    super("The AI is busy right now.");
    this.name = "GroqBusyError";
    this.code = "groq_busy";
    this.retryAfterSec = retryAfterSec;
  }
}

export const createGroqGate = ({ tokensPerMinute = null, maxConcurrent = 8, now = Date.now } = {}) => {
  const capacity = tokensPerMinute;
  const refillPerMs = capacity ? capacity / 60_000 : 0;
  let tokens = capacity ?? 0;
  let lastRefill = now();
  let active = 0;
  let pausedUntil = 0;
  let wakeTimer = null;
  const queues = [[], [], []]; // by PRIORITY

  const refill = () => {
    const t = now();
    if (capacity) tokens = Math.min(capacity, tokens + (t - lastRefill) * refillPerMs);
    lastRefill = t;
  };

  // ms until a call costing `cost` could start, ignoring who is ahead of it
  const waitFor = (cost) => {
    refill();
    const paused = Math.max(0, pausedUntil - now());
    const missing = capacity && tokens < cost ? Math.ceil((cost - tokens) / refillPerMs) : 0;
    return Math.max(paused, missing);
  };

  const finish = (permit, usedTokens) => {
    if (permit.released) return;
    permit.released = true;
    active -= 1;
    // Charge the difference between the estimate and what Groq reports using, so a
    // bad estimate corrects itself. Tokens may go negative: that is debt, repaid by time.
    if (capacity && Number.isFinite(usedTokens)) {
      refill();
      tokens = Math.min(capacity, tokens - (usedTokens - permit.cost));
    }
    drain();
  };

  function drain() {
    clearTimeout(wakeTimer);
    wakeTimer = null;
    for (const queue of queues) {
      while (queue.length) {
        const head = queue[0];
        if (active >= maxConcurrent) return; // a release will drain again
        const wait = waitFor(head.cost);
        if (wait > 0) {
          wakeTimer = setTimeout(drain, wait + 5);
          wakeTimer.unref?.();
          return;
        }
        queue.shift();
        clearTimeout(head.timeout);
        if (capacity) tokens -= head.cost;
        active += 1;
        head.resolve(head.permit);
      }
    }
  }

  /**
   * Resolves with a permit once the call may start; call `permit.done(usage?)` when it
   * finishes (for a stream, after the last chunk). Rejects with GroqBusyError after
   * `maxWaitMs`; 0 means "start now or not at all".
   */
  const acquire = ({ cost, priority = PRIORITY.interactive, maxWaitMs = 10_000 }) =>
    new Promise((resolve, reject) => {
      const permit = { cost: capacity ? Math.min(Math.max(cost, 1), capacity) : cost, released: false };
      permit.done = (usedTokens) => finish(permit, usedTokens);

      const waiter = { cost: permit.cost, permit, resolve };
      const queue = queues[priority];
      queue.push(waiter);

      const retryAfterSec = () => Math.max(1, Math.ceil(waitFor(permit.cost) / 1000));
      waiter.timeout = setTimeout(() => {
        const at = queue.indexOf(waiter);
        if (at !== -1) queue.splice(at, 1);
        reject(new GroqBusyError(retryAfterSec()));
      }, maxWaitMs);
      waiter.timeout.unref?.();

      drain();
      // maxWaitMs 0: nothing waits, so a call that could not start right away fails now
      if (maxWaitMs === 0 && queue.includes(waiter)) {
        clearTimeout(waiter.timeout);
        queue.splice(queue.indexOf(waiter), 1);
        reject(new GroqBusyError(retryAfterSec()));
      }
    });

  /** Holds every call for `seconds` (Groq said 429 with a retry-after). */
  const pause = (seconds) => {
    pausedUntil = Math.max(pausedUntil, now() + seconds * 1000);
  };

  const snapshot = () => {
    refill();
    return { tokens: Math.floor(tokens), active, queued: queues.map((q) => q.length), pausedMs: Math.max(0, pausedUntil - now()) };
  };

  return { acquire, pause, snapshot };
};
