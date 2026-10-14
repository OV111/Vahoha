/**
 * Last line of defence against the mentor writing a challenge solution.
 *
 * The system prompt tells the model never to, but a prompt is a request, not a
 * guarantee: a persistent or clever user can talk a model out of it. This
 * guard does not depend on the model complying. It sits on the outgoing token
 * stream and caps every fenced code block at `maxLines`, so even a model that
 * has been fully jailbroken cannot hand over a working function: the rest of
 * the block never reaches the client or the saved transcript.
 *
 * It works line by line because a fence marker can be split across stream
 * chunks. Prose is passed straight through (so the reply still types out
 * smoothly); only fenced code is held back until each line is complete.
 *
 * Limits, on purpose: it only recognises ``` fences, which is what the model
 * produces. It is a safety net behind the prompt, not a replacement for it.
 */

export const OMITTED_NOTE =
  "// … rest omitted: the mentor coaches, it doesn't write the solution";

export class SolutionGuard {
  constructor({ maxLines = 4 } = {}) {
    this.maxLines = maxLines;
    this.line = ""; // the current, unfinished line
    this.emittedOfLine = 0; // how many chars of `line` were already sent (prose only)
    this.inFence = false;
    this.codeLines = 0;
  }

  /** Feed a chunk of model output; returns the text that is safe to send now. */
  push(chunk) {
    let out = "";
    for (const ch of chunk) {
      if (ch === "\n") {
        out += this.#finishLine();
      } else {
        this.line += ch;
        out += this.#flushProse();
      }
    }
    return out;
  }

  /** Call once the model is done; releases a final line with no newline. */
  flush() {
    if (!this.line) return "";
    const rest = this.#finishLine(false);
    return rest;
  }

  // Prose can stream char by char. A line that might still turn into a fence
  // marker (starts with a backtick) is held until it is complete, as is
  // everything inside a fence.
  #flushProse() {
    if (this.inFence) return "";
    if (this.line.trimStart().startsWith("`")) return "";
    const fresh = this.line.slice(this.emittedOfLine);
    this.emittedOfLine = this.line.length;
    return fresh;
  }

  #finishLine(withNewline = true) {
    const line = this.line;
    const nl = withNewline ? "\n" : "";
    const alreadySent = this.emittedOfLine;
    this.line = "";
    this.emittedOfLine = 0;

    const isFence = line.trimStart().startsWith("```");

    if (this.inFence) {
      if (isFence) {
        this.inFence = false;
        this.codeLines = 0;
        return `${line}${nl}`;
      }
      this.codeLines += 1;
      if (this.codeLines <= this.maxLines) return `${line}${nl}`;
      if (this.codeLines === this.maxLines + 1) return `${OMITTED_NOTE}${nl}`;
      return "";
    }

    if (isFence) {
      this.inFence = true;
      this.codeLines = 0;
      return `${line}${nl}`;
    }

    // Plain prose: whatever was not streamed yet, plus the line break.
    return `${line.slice(alreadySent)}${nl}`;
  }
}
