import { describe, it, expect } from "vitest";
import { RECONNECT_BASE_MS, RECONNECT_MAX_MS, reconnectDelay } from "./backoff";

describe("reconnectDelay", () => {
  it("starts at the base and doubles each attempt", () => {
    const full = () => 1; // the top of the random range: no reduction
    expect([0, 1, 2, 3].map((n) => reconnectDelay(n, full))).toEqual([3000, 6000, 12_000, 24_000]);
  });

  it("never exceeds the maximum, however many attempts have failed", () => {
    const full = () => 1;
    expect(reconnectDelay(5, full)).toBe(RECONNECT_MAX_MS);
    expect(reconnectDelay(50, full)).toBe(RECONNECT_MAX_MS);
    expect(reconnectDelay(1000, full)).toBe(RECONNECT_MAX_MS);
  });

  it("spreads the wait between 75% and 100% of the step, and never goes below the base's 75%", () => {
    expect(reconnectDelay(0, () => 0)).toBe(Math.round(RECONNECT_BASE_MS * 0.75));
    expect(reconnectDelay(3, () => 0)).toBe(18_000);
    for (let i = 0; i < 200; i++) {
      const ms = reconnectDelay(2);
      expect(ms).toBeGreaterThanOrEqual(9000);
      expect(ms).toBeLessThanOrEqual(12_000);
    }
  });
});
