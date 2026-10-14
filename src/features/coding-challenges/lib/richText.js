import { C, FONT_MONO } from "./arenaTheme";

/**
 * Challenge copy (description/task/constraints/hints) comes from the server
 * as plain HTML with bare `<code>` tags. Style them inline on the way in
 * rather than shipping a stylesheet rule the server-authored markup has to
 * know about.
 */
export function renderInlineCode(html) {
  return html
    .replace(
      /<code>/g,
      `<code style="background:rgba(168,85,247,0.12);border:1px solid rgba(168,85,247,0.28);border-radius:4px;padding:1px 5px;color:#d8b4fe;font-family:${FONT_MONO};font-size:0.88em;overflow-wrap:anywhere">`,
    )
    .replace(/<\/code>/g, "</code>");
}
