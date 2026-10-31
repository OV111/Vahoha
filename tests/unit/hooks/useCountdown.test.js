import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import useCountdown from "@/hooks/useCountdown";

beforeEach(() => vi.useFakeTimers());
afterEach(() => vi.useRealTimers());

describe("useCountdown", () => {
  it("counts down from the server's secondsLeft", () => {
    const { result } = renderHook(() => useCountdown(90, "q1"));
    expect(result.current).toBe(90);
    act(() => vi.advanceTimersByTime(30_000));
    expect(result.current).toBe(60);
  });

  it("ignores a wrong client clock", () => {
    // The learner's clock is 10 minutes ahead. An absolute deadline compared
    // to Date.now() would show 0:00; seconds-left does not care.
    vi.setSystemTime(Date.now() + 10 * 60 * 1000);
    const { result } = renderHook(() => useCountdown(300, "q1"));
    expect(result.current).toBe(300);
  });

  it("fires onExpire once at zero", () => {
    const onExpire = vi.fn();
    renderHook(() => useCountdown(2, "q1", onExpire));
    act(() => vi.advanceTimersByTime(5_000));
    expect(onExpire).toHaveBeenCalledTimes(1);
  });

  it("restarts from the new value when the key changes", () => {
    const { result, rerender } = renderHook(({ s, k }) => useCountdown(s, k), {
      initialProps: { s: 100, k: 1 },
    });
    act(() => vi.advanceTimersByTime(40_000));
    expect(result.current).toBe(60);
    rerender({ s: 100, k: 2 });
    expect(result.current).toBe(100);
  });

  it("shows nothing to count when there is no timer", () => {
    const { result } = renderHook(() => useCountdown(null, "q1"));
    expect(result.current).toBe(0);
  });
});
