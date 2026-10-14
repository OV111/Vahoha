/**
 * Turns a challenge's raw `example` string into display blocks.
 *
 * Authors write examples as one compact snippet:
 *
 *   fn({x:0,y:0}, {x:5,y:0});
 *   // an explanation
 *   // => { x: -5, y: 0 }  (a note about the result)
 *
 * Reading that as a single grey wall is hard, so it is split into three kinds
 * of block (code, explanation, result) and the call is pretty-printed. Nothing
 * here needs the content to be rewritten in the database, and a snippet that
 * doesn't follow the convention still renders as plain code.
 */

const MAX_INLINE = 64;

// Innermost-first so nested braces are handled; skipped when a string literal
// is inside, because splitting on its commas would corrupt it.
const spaceObjects = (src) =>
  src.replace(/\{([^{}]*)\}/g, (match, inner) => {
    if (/["'`]/.test(inner)) return match;
    const parts = inner
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean)
      .map((p) => p.replace(/\s*:\s*/, ": "));
    return parts.length ? `{ ${parts.join(", ")} }` : "{}";
  });

// Splits on commas that are not inside brackets or a string.
const splitArgs = (src) => {
  const args = [];
  let depth = 0;
  let quote = null;
  let current = "";
  for (const ch of src) {
    if (quote) {
      if (ch === quote) quote = null;
    } else if (ch === '"' || ch === "'" || ch === "`") {
      quote = ch;
    } else if ("([{".includes(ch)) {
      depth += 1;
    } else if (")]}".includes(ch)) {
      depth -= 1;
    } else if (ch === "," && depth === 0) {
      args.push(current);
      current = "";
      continue;
    }
    current += ch;
  }
  if (current.trim()) args.push(current);
  return args;
};

/** One-line call -> prettier-style multi-line call when it is too long to scan. */
export const formatCall = (line) => {
  const tidy = spaceObjects(line.trim());
  const m = /^([\w$.]+)\((.*)\);?$/.exec(line.trim());
  if (!m || tidy.length <= MAX_INLINE) return tidy;
  const args = splitArgs(m[2]).map((a) => `  ${spaceObjects(a.trim())},`);
  return `${m[1]}(\n${args.join("\n")}\n);`;
};

const RESULT = /^\/\/\s*=>\s*(.*?)(?:\s{2,}\((.*)\))?\s*$/;

/** @returns {{type: "code"|"note"|"result", text: string, aside?: string}[]} */
export const parseExample = (example = "") => {
  const blocks = [];
  let code = [];
  const flushCode = () => {
    if (!code.length) return;
    blocks.push({ type: "code", text: code.map(formatCall).join("\n") });
    code = [];
  };

  for (const raw of example.split("\n")) {
    const line = raw.trimEnd();
    const t = line.trim();
    if (!t) continue;
    const result = RESULT.exec(t);
    if (result) {
      flushCode();
      blocks.push({ type: "result", text: spaceObjects(result[1]), aside: result[2] });
    } else if (t.startsWith("//")) {
      flushCode();
      blocks.push({ type: "note", text: t.replace(/^\/\/\s?/, "") });
    } else {
      code.push(line);
    }
  }
  flushCode();
  return blocks;
};

// --- syntax highlighting ----------------------------------------------------
// Deliberately tiny: this only ever colours short example snippets.
const TOKEN =
  /("(?:[^"\\]|\\.)*"|'(?:[^'\\]|\\.)*'|`(?:[^`\\]|\\.)*`)|((?<![\w$])-?\d+(?:\.\d+)?\b)|(\b(?:const|let|var|return|new|function|null|true|false|undefined)\b)|([A-Za-z_$][\w$]*)(?=\s*:)|([A-Za-z_$][\w$]*)(?=\()|([{}()[\],;:])/g;

const KINDS = ["string", "number", "keyword", "property", "call", "punct"];

/** @returns {{kind: string|null, text: string}[]} */
export const tokenize = (line) => {
  const out = [];
  let last = 0;
  for (const m of line.matchAll(TOKEN)) {
    if (m.index > last) out.push({ kind: null, text: line.slice(last, m.index) });
    const i = m.slice(1).findIndex((g) => g !== undefined);
    out.push({ kind: KINDS[i], text: m[0] });
    last = m.index + m[0].length;
  }
  if (last < line.length) out.push({ kind: null, text: line.slice(last) });
  return out;
};
