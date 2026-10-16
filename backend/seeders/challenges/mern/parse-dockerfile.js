export default {
  slug: "parse-dockerfile",
  trackId: "mern",
  layerId: "mern-10",
  type: "CODE",
  difficulty: "med",
  title: "Parse a Dockerfile into instructions",
  summary:
    "Handle comments, blank lines and backslash line continuations.",
  description:
    "A Dockerfile looks like a script but is parsed by simple rules: one instruction per logical line, a trailing backslash joins the next line, and comments and blank lines are ignored, even in the middle of a continued instruction. Tools that lint or analyse Dockerfiles start with exactly this parser.",
  task:
    "Write <code>parseDockerfile(text)</code> returning an array of <code>{ line, instruction, args }</code>. Split the text into lines (handle both <code>\\n</code> and <code>\\r\\n</code>). Skip blank lines and lines whose first non-space character is <code>#</code>. A logical instruction starts at a non-skipped line: its first word, uppercased, is <code>instruction</code>, and the rest of the line (trimmed) is <code>args</code>. If the line, after trimming trailing spaces, ends with a backslash, remove the backslash and continue with the next physical lines: blank lines and comment lines inside a continuation are skipped, and each continued piece is trimmed and joined to the arguments with a single space. <code>line</code> is the 1-based number of the instruction's first physical line. Valid instructions are <code>FROM RUN CMD LABEL EXPOSE ENV ADD COPY ENTRYPOINT VOLUME USER WORKDIR ARG ONBUILD STOPSIGNAL HEALTHCHECK SHELL MAINTAINER</code> (case-insensitive); anything else throws <code>Error('Unknown instruction: WORD (line N)')</code> with the word as written.",
  constraints: [
    "A trailing backslash on the last line of the file just ends the instruction.",
    "Whitespace inside <code>args</code> is kept as it is, except for the joins described above.",
    "An instruction with no arguments has <code>args</code> equal to an empty string.",
    "A backslash in the middle of a line is ordinary text.",
  ],
  example: `parseDockerfile('FROM node:20\\n# deps\\nRUN apt-get update && \\\\\\n    apt-get install -y curl\\nCMD ["node", "server.js"]');
// [ { line: 1, instruction: 'FROM', args: 'node:20' },
//   { line: 3, instruction: 'RUN',  args: 'apt-get update && apt-get install -y curl' },
//   { line: 5, instruction: 'CMD',  args: '["node", "server.js"]' } ]`,
  tags: ["docker","parsing","devops"],
  estimatedMins: 35,
  xp: 45,
  starterFiles: [
    {
      name: "parseDockerfile.js",
      lang: "js",
      code: `// parseDockerfile.js
function parseDockerfile(text) {
  // your code here
}

module.exports = parseDockerfile;`,
    },
  ],
  testFile: {
    name: "parseDockerfile_test.js",
    lang: "test",
    code: `// parseDockerfile_test.js
const parseDockerfile = require('./parseDockerfile');

test('parses_simple_instructions', () => {
  // see the hidden tests for the full checks
  expect(typeof parseDockerfile).toBe('function');
});`,
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Split on <code>/\\r?\\n/</code>. Walk the lines with an index; skip lines that are blank or start with <code>#</code> after trimming.",
    },
    {
      order: 2,
      cost: 5,
      text: "When you find an instruction line, remember its number, take the first word and the remaining text, then run a loop: while the current piece ends with a backslash, strip it and pull the next non-blank, non-comment line.",
    },
    {
      order: 3,
      cost: 10,
      text: "Join pieces with <code>' '</code> after trimming each. Remember to validate the instruction word against the allowed list before pushing.",
    },
  ],
  hiddenTests: [
    {
      name: "parses_simple_instructions",
      code: `const r = parseDockerfile('FROM node:20\\nWORKDIR /app\\nEXPOSE 3000');
assert(JSON.stringify(r) === JSON.stringify([
  { line: 1, instruction: 'FROM', args: 'node:20' },
  { line: 2, instruction: 'WORKDIR', args: '/app' },
  { line: 3, instruction: 'EXPOSE', args: '3000' },
]), 'got ' + JSON.stringify(r));`,
    },
    {
      name: "skips_comments_and_blank_lines_but_keeps_line_numbers",
      code: `const r = parseDockerfile('# base\\n\\nFROM node:20\\n   # indented comment\\n\\nRUN npm ci');
assert(r.length === 2 && r[0].line === 3 && r[1].line === 6, 'line numbers come from the original text, got ' + JSON.stringify(r));`,
    },
    {
      name: "instructions_are_case_insensitive_and_uppercased",
      code: `const r = parseDockerfile('from node:20\\nRun echo hi');
assert(r[0].instruction === 'FROM' && r[1].instruction === 'RUN', 'got ' + JSON.stringify(r));
assert(r[1].args === 'echo hi', 'args keep their case, got ' + r[1].args);`,
    },
    {
      name: "joins_continuation_lines",
      code: `const text = 'RUN apt-get update && \\\\\\n    apt-get install -y curl \\\\\\n    git\\nCMD ["x"]';
const r = parseDockerfile(text);
assert(r.length === 2, 'two instructions, got ' + r.length);
assert(r[0].args === 'apt-get update && apt-get install -y curl git', 'pieces are trimmed and joined with one space, got ' + JSON.stringify(r[0].args));
assert(r[1].line === 4, 'the next instruction is on physical line 4, got ' + r[1].line);`,
    },
    {
      name: "comments_and_blank_lines_inside_a_continuation_are_skipped",
      code: `const text = 'RUN a \\\\\\n# not part of it\\n\\n   b';
const r = parseDockerfile(text);
assert(r.length === 1 && r[0].args === 'a b', 'got ' + JSON.stringify(r));`,
    },
    {
      name: "handles_windows_line_endings",
      code: `const r = parseDockerfile('FROM x\\r\\nRUN a \\\\\\r\\n  b\\r\\nCMD c');
assert(r.length === 3 && r[1].args === 'a b' && r[2].line === 4, 'got ' + JSON.stringify(r));`,
    },
    {
      name: "trailing_backslash_at_end_of_file_and_empty_args",
      code: `const r = parseDockerfile('FROM x\\nRUN a \\\\');
assert(r[1].args === 'a', 'got ' + JSON.stringify(r));
const s = parseDockerfile('FROM x\\nONBUILD');
assert(s[1].args === '', 'no arguments gives an empty string, got ' + JSON.stringify(s[1]));`,
    },
    {
      name: "backslash_inside_a_line_is_text",
      code: `const r = parseDockerfile('RUN echo a\\\\nb');
assert(r.length === 1 && r[0].args === 'echo a\\\\nb', 'got ' + JSON.stringify(r));`,
    },
    {
      name: "unknown_instructions_throw_with_line_number",
      code: `let err = null;
try { parseDockerfile('FROM x\\n\\nFROOM y'); } catch (e) { err = e; }
assert(err && err.message === 'Unknown instruction: FROOM (line 3)', 'got ' + (err && err.message));`,
    },
  ],
  solution: {
    code: `function parseDockerfile(text) {
  const VALID = ['FROM', 'RUN', 'CMD', 'LABEL', 'EXPOSE', 'ENV', 'ADD', 'COPY', 'ENTRYPOINT', 'VOLUME',
    'USER', 'WORKDIR', 'ARG', 'ONBUILD', 'STOPSIGNAL', 'HEALTHCHECK', 'SHELL', 'MAINTAINER'];
  const lines = text.split(/\\r?\\n/);
  const skip = (l) => l.trim() === '' || l.trim()[0] === '#';
  const result = [];

  let i = 0;
  while (i < lines.length) {
    if (skip(lines[i])) { i++; continue; }

    const startLine = i + 1;
    const first = lines[i].trim();
    const space = first.search(/\\s/);
    const word = space === -1 ? first : first.slice(0, space);
    let rest = space === -1 ? '' : first.slice(space).trim();
    i++;

    const pieces = [];
    let current = rest;
    while (true) {
      const continued = /\\\\\\s*$/.test(current);
      if (continued) current = current.replace(/\\\\\\s*$/, '').trim();
      if (current !== '') pieces.push(current);
      if (!continued) break;
      while (i < lines.length && skip(lines[i])) i++;
      if (i >= lines.length) break;
      current = lines[i].trim();
      i++;
    }

    if (!VALID.includes(word.toUpperCase())) {
      throw new Error('Unknown instruction: ' + word + ' (line ' + startLine + ')');
    }
    result.push({ line: startLine, instruction: word.toUpperCase(), args: pieces.join(' ') });
  }
  return result;
}

module.exports = parseDockerfile;`,
    explanation:
      "A Dockerfile parser is a loop with two levels. The outer loop skips blank and comment lines and, when it finds an instruction, records the physical line number and splits off the first word. The inner loop implements continuations: while the current piece ends in a backslash, strip it, remember the piece, then fetch the next line, first skipping blank and comment lines, because Docker allows them in the middle of a continued instruction. Pieces are trimmed and joined with single spaces, which turns an indented multi-line RUN into one readable string. The line number is captured before the inner loop runs, so it always refers to where the instruction started, not where it ended. Validation of the keyword happens last but before pushing, so unknown instructions report the first line of the offending instruction and the word exactly as the author wrote it.",
  },
};
