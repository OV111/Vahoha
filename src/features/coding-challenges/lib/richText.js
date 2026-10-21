const ENTITIES = { "&lt;": "<", "&gt;": ">", "&quot;": '"', "&amp;": "&" };
const decode = (s) => s.replace(/&(?:lt|gt|quot|amp);/g, (e) => ENTITIES[e]);

// Longer fence than any backtick run inside, padded so a leading or trailing
// backtick in the code is not read as part of the fence.
const inlineCode = (code) => {
  const fence = "`".repeat(Math.max(0, ...(code.match(/`+/g) ?? []).map((r) => r.length)) + 1);
  return /^`|`$/.test(code) ? `${fence} ${code} ${fence}` : `${fence}${code}${fence}`;
};

// Text outside <code> is literal, so stop markdown reading `__proto__` or `a * b` as formatting.
const escapeMarkdown = (s) => s.replace(/[\\*_[\]`<>~]/g, "\\$&");

/**
 * Challenge copy (description/task/constraints/hints) is stored as plain text
 * with bare `<code>` tags and HTML entities. Convert it to markdown so it
 * renders through the same pipeline as labs and lessons, which also lets new
 * challenges use fenced code blocks. Nothing in the database has to change.
 */
export function challengeMarkdown(html) {
  return html
    .split(/(<code>[\s\S]*?<\/code>)/)
    .map((part) =>
      part.startsWith("<code>") ? inlineCode(decode(part.slice(6, -7))) : escapeMarkdown(decode(part)),
    )
    .join("");
}
