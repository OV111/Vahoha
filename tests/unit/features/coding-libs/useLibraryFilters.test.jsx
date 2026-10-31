import { describe, it, expect } from "vitest";
import { act, render } from "@testing-library/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import useLibraryFilters, { NO_FILTERS } from "@/features/coding-libs/useLibraryFilters";

// The hook reads and writes the live URL, so it runs under a real browser
// router; `result.current` always holds the latest hook value.
const setup = (url) => {
  window.history.replaceState(null, "", url);
  const result = { current: null };
  const Probe = () => {
    result.current = useLibraryFilters();
    return null;
  };
  render(<RouterProvider router={createBrowserRouter([{ path: "*", element: <Probe /> }])} />);
  return { result };
};

describe("useLibraryFilters", () => {
  it("reads filters, tab and search from the URL", () => {
    const { result } = setup("/libs?tab=books&layer=mern-2&difficulty=beginner&is_free=true&q=react");
    expect(result.current.activeTab).toBe("books");
    expect(result.current.filters).toEqual({
      path: null,
      difficulty: "beginner",
      is_free: true,
      layer: "mern-2",
    });
    expect(result.current.query).toBe("react");
    expect(result.current.search).toBe("react");
  });

  it("falls back to the all tab and no filters for an unknown tab or empty URL", () => {
    const { result } = setup("/libs?tab=nope");
    expect(result.current.activeTab).toBe("all");
    expect(result.current.filters).toEqual(NO_FILTERS);
  });

  it("treats is_free=false as paid, not as missing", () => {
    const { result } = setup("/libs?is_free=false");
    expect(result.current.filters.is_free).toBe(false);
  });

  it("writes a changed filter back to the URL and keeps the others", () => {
    const { result } = setup("/libs?layer=mern-2");
    act(() => result.current.setFilters((f) => ({ ...f, difficulty: "advanced" })));
    expect(window.location.search).toContain("layer=mern-2");
    expect(window.location.search).toContain("difficulty=advanced");
  });

  it("drops the tab param for the default tab", () => {
    const { result } = setup("/libs?tab=books");
    act(() => result.current.setActiveTab("all"));
    expect(window.location.search).not.toContain("tab=");
  });

  it("clearAll removes every filter and the search", () => {
    const { result } = setup("/libs?layer=mern-2&path=DevOps&q=docker");
    act(() => result.current.clearAll());
    expect(window.location.search).toBe("");
    expect(result.current.search).toBe("");
  });
});
