import rehypeHighlight from "rehype-highlight";

// highlight.js tags `const` and `return` the same; Dark+ colors flow control
// differently from declarations, so mark those keywords for the theme.
const CONTROL = new Set([
  "if", "else", "return", "for", "while", "do", "switch", "case", "default", "break", "continue",
  "try", "catch", "finally", "throw", "await", "yield", "import", "export", "from",
]);

const markControl = (node) => {
  const [text] = node.children ?? [];
  if (node.properties?.className?.includes("hljs-keyword") && node.children.length === 1 && CONTROL.has(text?.value)) {
    node.properties.className.push("hljs-control");
  }
  node.children?.forEach(markControl);
};

const rehypeControlKeywords = () => markControl;

export const codeRehypePlugins = [[rehypeHighlight, { ignoreMissing: true }], rehypeControlKeywords];
