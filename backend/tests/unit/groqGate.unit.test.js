import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { createGroqGate, GroqBusyError, PRIORITY } from "../../services/groqGate.js";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

const settle = (promise) => {
  const state = { status: "pending" };
  promise.then(
    (value) => Object.assign(state, { status: "resolved", value }),
    (error) => Object.assign(state, { status: "rejected", error }),
  );
  return state;
};
const flush = () => vi.advanceTimersByTimeAsync(0);

describe("token bucket", () => {
  it("lets calls through while tokens last, then makes the next one wait for the refill", async () => {
    const gate = createGroqGate({ tokensPerMinute: 6000, maxConcurrent: 10 }); // 100 tokens a second
    const first = await gate.acquire({ cost: 6000 });
    first.done();
    const second = settle(gate.acquire({ cost: 500 }));
    await flush();
    expect(second.status).toBe("pending");

    await vi.advanceTimersByTimeAsync(5_100); // 500 tokens refilled
    expect(second.status).toBe("resolved");
  });

  it("charges what Groq reports, so an underestimate is paid back by waiting", async () => {
    const gate = createGroqGate({ tokensPerMinute: 6000, maxConcurrent: 10 });
    const permit = await gate.acquire({ cost: 1000 });
    permit.done(6000); // used far more than estimated
    // 6000 - 1000 estimated = 5000 left, minus the 5000 extra it really used = empty
    const next = settle(gate.acquire({ cost: 1000, maxWaitMs: 60_000 }));
    await flush();
    expect(next.status).toBe("pending");
    await vi.advanceTimersByTimeAsync(10_100); // 1000 tokens at 100 a second
    expect(next.status).toBe("resolved");
  });

  it("clamps a call bigger than the whole bucket instead of waiting for ever", async () => {
    const gate = createGroqGate({ tokensPerMinute: 1000, maxConcurrent: 10 });
    const permit = await gate.acquire({ cost: 50_000 });
    expect(permit.cost).toBe(1000);
  });

  it("applies no token budget when none is configured", async () => {
    const gate = createGroqGate({ maxConcurrent: 10 });
    await gate.acquire({ cost: 10_000_000 });
    await gate.acquire({ cost: 10_000_000 });
  });
});

describe("concurrency cap", () => {
  it("holds the next call until a slot frees", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    const a = await gate.acquire({ cost: 1 });
    const b = settle(gate.acquire({ cost: 1 }));
    await flush();
    expect(b.status).toBe("pending");
    a.done();
    await flush();
    expect(b.status).toBe("resolved");
  });

  it("frees a slot only once however many times done is called", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    const a = await gate.acquire({ cost: 1 });
    a.done();
    a.done();
    await gate.acquire({ cost: 1 });
    const c = settle(gate.acquire({ cost: 1 }));
    await flush();
    expect(c.status).toBe("pending");
  });
});

describe("priority", () => {
  it("serves a continuation, then interactive, then background, whatever the arrival order", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    const running = await gate.acquire({ cost: 1 });
    const order = [];
    const queue = (name, priority) =>
      gate.acquire({ cost: 1, priority, maxWaitMs: 60_000 }).then((permit) => {
        order.push(name);
        permit.done();
      });
    const pending = [
      queue("background", PRIORITY.background),
      queue("interactive", PRIORITY.interactive),
      queue("continuation", PRIORITY.continuation),
    ];
    running.done();
    await Promise.all(pending);
    expect(order).toEqual(["continuation", "interactive", "background"]);
  });

  it("is first come first served inside one priority", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    const running = await gate.acquire({ cost: 1 });
    const order = [];
    const queue = (name) =>
      gate.acquire({ cost: 1, maxWaitMs: 60_000 }).then((permit) => {
        order.push(name);
        permit.done();
      });
    const pending = [queue("a"), queue("b"), queue("c")];
    running.done();
    await Promise.all(pending);
    expect(order).toEqual(["a", "b", "c"]);
  });
});

describe("waiting too long", () => {
  it("fails with GroqBusyError and a retry hint after maxWaitMs, and leaves the queue", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    const running = await gate.acquire({ cost: 1 });
    const waiting = settle(gate.acquire({ cost: 1, maxWaitMs: 2_000 }));
    await vi.advanceTimersByTimeAsync(2_001);
    expect(waiting.status).toBe("rejected");
    expect(waiting.error).toBeInstanceOf(GroqBusyError);
    expect(waiting.error.code).toBe("groq_busy");
    expect(waiting.error.retryAfterSec).toBeGreaterThanOrEqual(1);
    expect(gate.snapshot().queued).toEqual([0, 0, 0]);

    running.done();
    await gate.acquire({ cost: 1 }); // nothing stale is ahead of this one
  });

  it("maxWaitMs 0 starts now or fails now", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    const free = await gate.acquire({ cost: 1, maxWaitMs: 0 });
    const busy = settle(gate.acquire({ cost: 1, maxWaitMs: 0 }));
    await flush();
    expect(busy.status).toBe("rejected");
    free.done();
  });
});

describe("pause after a Groq 429", () => {
  it("holds every call until the retry-after has passed", async () => {
    const gate = createGroqGate({ maxConcurrent: 10 });
    gate.pause(10);
    const call = settle(gate.acquire({ cost: 1, maxWaitMs: 60_000 }));
    await vi.advanceTimersByTimeAsync(9_000);
    expect(call.status).toBe("pending");
    await vi.advanceTimersByTimeAsync(1_100);
    expect(call.status).toBe("resolved");
  });

  it("a background call is refused straight away while paused", async () => {
    const gate = createGroqGate({ maxConcurrent: 10 });
    gate.pause(10);
    const call = settle(gate.acquire({ cost: 1, priority: PRIORITY.background, maxWaitMs: 0 }));
    await flush();
    expect(call.status).toBe("rejected");
    expect(call.error.retryAfterSec).toBe(10);
  });
});
