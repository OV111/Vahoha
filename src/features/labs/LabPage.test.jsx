import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import LabPage from "./LabPage";

// CodeMirror needs real layout; the editor isn't what this test is about.
vi.mock("@/features/coding-challenges/components/arena/CodeEditor", () => ({
  default: ({ value }) => <pre data-testid="editor">{value}</pre>,
}));

const renderAt = (path) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/learn/:trackId/:layerId/:topicSlug/lab" element={<LabPage />} />
      </Routes>
    </MemoryRouter>,
  );

beforeEach(() => {
  localStorage.clear();
  // jsdom has no layout, so Element.scrollTo doesn't exist.
  Element.prototype.scrollTo = vi.fn();
});

describe("LabPage", () => {
  it("opens the real lab for a lesson that has one", async () => {
    renderAt("/learn/mern/mern-2/how-closures-capture-free-variables-in-the-scope-chain/lab");
    expect(await screen.findByRole("heading", { name: "Every button says 3" })).toBeTruthy();
    expect(screen.getByTestId("editor").textContent).toContain("var i = 0");
  });

  it("says so when a lesson has no lab", async () => {
    renderAt("/learn/mern/mern-1/semantic-html-and-the-accessibility-tree/lab");
    expect(await screen.findByText("No lab for this lesson yet")).toBeTruthy();
  });
});
