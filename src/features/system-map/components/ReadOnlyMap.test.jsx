import { describe, it, expect } from "vitest";
import { renderToStaticMarkup } from "react-dom/server";
import ReadOnlyMap from "./ReadOnlyMap";

describe("ReadOnlyMap", () => {
  it("says so instead of crashing when the map data is damaged", () => {
    for (const bad of [null, undefined, "x", { v: 9, nodes: [], edges: [] }, { v: 1, nodes: {}, edges: [] }]) {
      expect(renderToStaticMarkup(<ReadOnlyMap graph={bad} />)).toContain("can&#x27;t be shown");
    }
  });

  it("starts with the click-a-part hint and passes children under the details", () => {
    const graph = { v: 1, nodes: [{ id: "a", kind: "server", title: "API", sub: "", x: 0, y: 0 }], edges: [] };
    const html = renderToStaticMarkup(
      <ReadOnlyMap graph={graph}>
        <a href="/project-map">Draw your own</a>
      </ReadOnlyMap>,
    );
    expect(html).toContain("Click a part to see what it is.");
    expect(html).toContain("Draw your own");
  });

  it("lets the page size the canvas", () => {
    const graph = { v: 1, nodes: [], edges: [] };
    const html = renderToStaticMarkup(<ReadOnlyMap graph={graph} className="h-[420px]" />);
    expect(html).toContain("h-[420px]");
    expect(html).not.toContain("min-h-[480px]");
  });
});
