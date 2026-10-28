import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, waitFor, act } from "@testing-library/react";
import useCachedResource from "./useCachedResource";
import { queryCache } from "@/lib/queryCache";

beforeEach(() => queryCache.clear());

/** Settles when the test says so. */
const deferred = () => {
  let resolve, reject;
  const promise = new Promise((res, rej) => ((resolve = res), (reject = rej)));
  return { promise, resolve, reject };
};

describe("useCachedResource", () => {
  it("is loading with nothing to show, then has the data", async () => {
    const fetcher = vi.fn().mockResolvedValue({ n: 1 });
    const { result } = renderHook(() => useCachedResource("k", fetcher));

    expect(result.current).toMatchObject({ data: null, loading: true, error: null });
    await waitFor(() => expect(result.current.data).toEqual({ n: 1 }));
    expect(result.current.loading).toBe(false);
  });

  it("shows the cached data on the very first render when coming back, with no second request", async () => {
    const fetcher = vi.fn().mockResolvedValue("mastery");
    const first = renderHook(() => useCachedResource("k", fetcher, { staleMs: 60_000 }));
    await waitFor(() => expect(first.result.current.data).toBe("mastery"));
    first.unmount();

    const second = renderHook(() => useCachedResource("k", fetcher, { staleMs: 60_000 }));
    expect(second.result.current).toMatchObject({ data: "mastery", loading: false }); // no spinner, no wait
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("refreshes old data in the background and swaps it in, without going blank", async () => {
    const next = deferred();
    const fetcher = vi.fn().mockResolvedValueOnce("old").mockReturnValueOnce(next.promise);
    const first = renderHook(() => useCachedResource("k", fetcher, { staleMs: 0 }));
    await waitFor(() => expect(first.result.current.data).toBe("old"));
    first.unmount();

    const second = renderHook(() => useCachedResource("k", fetcher, { staleMs: 0 })); // stale at once
    expect(second.result.current.data).toBe("old"); // the old copy is up straight away
    await waitFor(() => expect(second.result.current.refreshing).toBe(true));
    expect(second.result.current.loading).toBe(false);

    await act(async () => next.resolve("new"));
    await waitFor(() => expect(second.result.current.data).toBe("new"));
    expect(second.result.current.refreshing).toBe(false);
  });

  it("two components asking at once share one request", async () => {
    const d = deferred();
    const fetcher = vi.fn(() => d.promise);
    const a = renderHook(() => useCachedResource("k", fetcher));
    const b = renderHook(() => useCachedResource("k", fetcher));
    await act(async () => d.resolve("shared"));

    await waitFor(() => expect(a.result.current.data).toBe("shared"));
    expect(b.result.current.data).toBe("shared");
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("an unmount before the answer arrives is harmless and the answer is still cached", async () => {
    const d = deferred();
    const fetcher = vi.fn(() => d.promise);
    const { unmount } = renderHook(() => useCachedResource("k", fetcher));
    unmount();
    await act(async () => d.resolve("late"));

    expect(queryCache.get("k").data).toBe("late"); // the next visit starts from it
  });

  it("reports an error with no data, and refetch recovers", async () => {
    const fetcher = vi.fn().mockRejectedValueOnce(new Error("down")).mockResolvedValueOnce("back");
    const { result } = renderHook(() => useCachedResource("k", fetcher));

    await waitFor(() => expect(result.current.error?.message).toBe("down"));
    expect(result.current).toMatchObject({ data: null, loading: false });

    await act(async () => {
      await result.current.refetch();
    });
    await waitFor(() => expect(result.current.data).toBe("back"));
    expect(result.current.error).toBeNull();
  });

  it("updates in place when a write invalidates what it is showing", async () => {
    const fetcher = vi.fn().mockResolvedValueOnce("before the test").mockResolvedValueOnce("after the test");
    const { result } = renderHook(() => useCachedResource("mastery", fetcher, { staleMs: 60_000 }));
    await waitFor(() => expect(result.current.data).toBe("before the test"));

    act(() => queryCache.invalidate("mastery")); // the learner just finished an exam
    expect(result.current.data).toBe("before the test"); // not blank meanwhile
    await waitFor(() => expect(result.current.data).toBe("after the test"));
  });

  it("does nothing while disabled", () => {
    const fetcher = vi.fn();
    const { result } = renderHook(() => useCachedResource("k", fetcher, { enabled: false }));
    expect(result.current.loading).toBe(false);
    expect(fetcher).not.toHaveBeenCalled();
  });
});
