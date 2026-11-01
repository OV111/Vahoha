// The saved map shape (see mapGraph.js) -> Mermaid flowchart text, so a learner
// can paste their map into a README and GitHub draws it. Pure, no DOM.

import { kindInfo } from "./nodeKinds";

// Mermaid node shapes by kind; anything not listed is a plain box.
const SHAPES = {
  database: ["[(", ")]"],
  primary: ["[(", ")]"],
  replica: ["[(", ")]"],
  shard: ["[(", ")]"],
  backup: ["[(", ")]"],
  featurestore: ["[(", ")]"],
  queue: ["[/", "/]"],
  client: ["([", "])"],
  external: ["{{", "}}"],
  cache: ["[[", "]]"],
};

// Mermaid ids must be plain words; map ids are free text, so they get new ones.
const idFor = (index) => `n${index + 1}`;

// Inside "..." Mermaid reads entity codes, so quotes and angle brackets are written as codes.
const escape = (value) =>
  String(value ?? "")
    .replace(/"/g, "#quot;")
    .replace(/</g, "#lt;")
    .replace(/>/g, "#gt;")
    .replace(/\s+/g, " ")
    .trim();

const label = (node) => {
  const title = escape(node.title) || escape(kindInfo(node.kind)?.label) || "Part";
  const sub = escape(node.sub);
  return sub ? `${title}<br/><small>${sub}</small>` : title;
};

/**
 * @param {{ nodes: { id: string, kind: string, title: string, sub?: string }[], edges: { source: string, target: string, label?: string }[] }} graph
 * @param {{ fenced?: boolean }} [options] fenced wraps it in a ```mermaid block, ready for Markdown
 * @returns {string}
 */
export function toMermaid(graph, { fenced = false } = {}) {
  const ids = new Map(graph.nodes.map((n, i) => [n.id, idFor(i)]));
  const lines = ["flowchart LR"];

  for (const node of graph.nodes) {
    const [open, close] = SHAPES[node.kind] ?? ["[", "]"];
    lines.push(`  ${ids.get(node.id)}${open}"${label(node)}"${close}`);
  }
  for (const edge of graph.edges) {
    const from = ids.get(edge.source);
    const to = ids.get(edge.target);
    if (!from || !to) continue;
    const text = escape(edge.label);
    lines.push(text ? `  ${from} -->|"${text}"| ${to}` : `  ${from} --> ${to}`);
  }

  const body = lines.join("\n");
  return fenced ? `\`\`\`mermaid\n${body}\n\`\`\`\n` : `${body}\n`;
}
