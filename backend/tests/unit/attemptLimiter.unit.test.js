import { describe, expect, it } from "vitest";
import { createAttemptLimiter } from "../../utils/attemptLimiter.js";
import { loginRules } from "../../middleware/authThrottle.js";

const rule = { key: "k", limit: 3, windowSec: 60, baseLockSec: 10, maxLockSec: 50 };

const build = () => {
  const clock = { t: 1_000_000 };
  const limiter = createAttemptLimiter({ redis: null, now: () => clock.t });
  return { limiter, advance: (seconds) => (clock.t += seconds * 1000) };
};

describe("attempt limiter (in-process store)", () => {
  it("locks once the limit is reached, not before", async () => {
    const { limiter } = build();
    expect(await limiter.recordFailure([rule])).toBe(0);
    expect(await limiter.recordFailure([rule])).toBe(0);
    expect(await limiter.retryAfter([rule])).toBe(0);
    expect(await limiter.recordFailure([rule])).toBe(10);
    expect(await limiter.retryAfter([rule])).toBe(10);
  });

  it("doubles the lock on a failure soon after it ends, up to the cap", async () => {
    const { limiter, advance } = build();
    for (let i = 0; i < 3; i++) await limiter.recordFailure([rule]);
    advance(11);
    expect(await limiter.retryAfter([rule])).toBe(0);
    expect(await limiter.recordFailure([rule])).toBe(20);
    advance(21);
    expect(await limiter.recordFailure([rule])).toBe(40);
    advance(41);
    expect(await limiter.recordFailure([rule])).toBe(50); // 80 capped
  });

  it("starts over when the failures were long ago", async () => {
    const { limiter, advance } = build();
    await limiter.recordFailure([rule]);
    await limiter.recordFailure([rule]);
    advance(61);
    expect(await limiter.recordFailure([rule])).toBe(0);
  });

  it("clear forgets failures and the lock", async () => {
    const { limiter } = build();
    for (let i = 0; i < 3; i++) await limiter.recordFailure([rule]);
    await limiter.clear([rule]);
    expect(await limiter.retryAfter([rule])).toBe(0);
    expect(await limiter.recordFailure([rule])).toBe(0);
  });

  it("hit allows `limit` uses per window, then reopens", async () => {
    const { limiter, advance } = build();
    const opts = { limit: 2, windowSec: 60 };
    expect((await limiter.hit("mail", opts)).allowed).toBe(true);
    expect((await limiter.hit("mail", opts)).allowed).toBe(true);
    expect((await limiter.hit("mail", opts)).allowed).toBe(false);
    advance(61);
    expect((await limiter.hit("mail", opts)).allowed).toBe(true);
  });
});

describe("attempt limiter (Redis trouble)", () => {
  it("falls back to the in-process store when Redis never answers", async () => {
    const hanging = { eval: () => new Promise(() => {}), ttl: () => new Promise(() => {}), del: () => new Promise(() => {}) };
    const limiter = createAttemptLimiter({ redis: hanging });
    for (let i = 0; i < 3; i++) await limiter.recordFailure([rule]);
    expect(await limiter.retryAfter([rule])).toBe(10);
  });

  it("falls back when Redis errors", async () => {
    const broken = { eval: () => Promise.reject(new Error("down")), ttl: () => Promise.reject(new Error("down")) };
    const limiter = createAttemptLimiter({ redis: broken });
    expect((await limiter.hit("mail", { limit: 1, windowSec: 60 })).allowed).toBe(true);
    expect((await limiter.hit("mail", { limit: 1, windowSec: 60 })).allowed).toBe(false);
  });
});

describe("login rules", () => {
  const req = (email, ip, forwarded) => ({ body: { email }, ip, headers: { "x-forwarded-for": forwarded } });

  it("ignores a client-sent X-Forwarded-For", () => {
    const a = loginRules(req("a@x.com", "9.9.9.9", "1.1.1.1"));
    const b = loginRules(req("a@x.com", "9.9.9.9", "2.2.2.2"));
    expect(a.pair.key).toBe(b.pair.key);
    expect(a.ip.key).toBe(b.ip.key);
  });

  it("scopes the tight lock to account + IP, so another network does not share it", () => {
    const home = loginRules(req("a@x.com", "9.9.9.9"));
    const stranger = loginRules(req("a@x.com", "8.8.8.8"));
    expect(home.pair.key).not.toBe(stranger.pair.key);
    expect(home.account.key).toBe(stranger.account.key);
  });

  it("treats email case and spacing as one account", () => {
    expect(loginRules(req(" A@X.com ", "9.9.9.9")).account.key).toBe(loginRules(req("a@x.com", "9.9.9.9")).account.key);
  });
});
