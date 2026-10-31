import { describe, it, expect, beforeEach } from "vitest";
import { handleTreeArrowKeys } from "@/features/roadmap/lib/treeKeyboard";

const press = (container, key, opts = {}) => {
  const e = { key, currentTarget: container, preventDefault: () => {}, ...opts };
  handleTreeArrowKeys(e);
};

describe("handleTreeArrowKeys", () => {
  let container;
  beforeEach(() => {
    document.body.innerHTML = `
      <div id="tree">
        <a href="#" data-tree-node id="a">a</a>
        <button data-tree-node id="b">b</button>
        <button id="skip">not a node</button>
        <a href="#" data-tree-node id="c">c</a>
      </div>`;
    container = document.getElementById("tree");
  });

  it("moves to the next and previous node, skipping non-nodes", () => {
    document.getElementById("b").focus();
    press(container, "ArrowDown");
    expect(document.activeElement.id).toBe("c");
    press(container, "ArrowLeft");
    expect(document.activeElement.id).toBe("b");
  });

  it("stops at the ends instead of wrapping", () => {
    document.getElementById("c").focus();
    press(container, "ArrowRight");
    expect(document.activeElement.id).toBe("c");
  });

  it("ignores other keys and modified arrows", () => {
    document.getElementById("a").focus();
    press(container, "Enter");
    press(container, "ArrowDown", { altKey: true });
    expect(document.activeElement.id).toBe("a");
  });
});
