import { describe, expect, it } from "vitest";
import { challengeMarkdown } from "./richText";

describe("challengeMarkdown", () => {
  it("turns <code> into inline code and decodes entities inside it", () => {
    expect(challengeMarkdown("Use <code>a &lt; b &amp;&amp; c</code> here")).toBe("Use `a < b && c` here");
  });

  it("fences code that contains backticks with a longer run", () => {
    expect(challengeMarkdown("<code>Path `f` is required</code>")).toBe("``Path `f` is required``");
    expect(challengeMarkdown("<code>`x`</code>")).toBe("`` `x` ``");
  });

  it("escapes markdown characters outside code", () => {
    expect(challengeMarkdown("a * b and __proto__ <code>x</code>")).toBe("a \\* b and \\_\\_proto\\_\\_ `x`");
  });
});
