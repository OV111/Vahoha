// Languages a coding challenge can be solved in. Shared by the Arena (what the
// picker shows, which file is edited) and the grader (which file is graded), so
// the two can never disagree about a file name.
//
// TypeScript here means "types are removed, then the JavaScript runs". Types are
// not checked: a type error never fails a challenge, only a syntax error or a
// failing test does. Every challenge supports it without per-challenge data,
// because the TypeScript starter is derived from the JavaScript one.

export const CHALLENGE_LANGUAGES = [
  { id: "js", label: "JavaScript", ext: "js" },
  { id: "ts", label: "TypeScript", ext: "ts" },
];

export const DEFAULT_LANGUAGE = "js";

export const isChallengeLanguage = (value) =>
  CHALLENGE_LANGUAGES.some((l) => l.id === value);

const extOf = (language) =>
  CHALLENGE_LANGUAGES.find((l) => l.id === language)?.ext ?? "js";

// The challenge stores its main file as e.g. "debounce.js"; the export name
// ("debounce") is the part before the extension, whatever the language.
export const exportNameOf = (fileName) => String(fileName).replace(/\.[^.]+$/, "");

// "debounce.js" + "ts" -> "debounce.ts"
export const mainFileName = (jsFileName, language) =>
  `${exportNameOf(jsFileName)}.${extOf(language)}`;

// Declared so editors and a future type checker know `module` exists. It is a
// type-only line, removed before the code runs.
export const TS_STARTER_HEADER = "declare const module: { exports: unknown };\n\n";

// Valid JavaScript is valid TypeScript for these starters, so the TypeScript
// starter is the JavaScript one with the header on top.
export const toTypeScriptStarter = (jsCode) =>
  String(jsCode).startsWith(TS_STARTER_HEADER) ? String(jsCode) : TS_STARTER_HEADER + jsCode;

// ---------------------------------------------------------------------------
// Whole-program languages ("stdio" runtime).
//
// Everything above is the function-harness path: the learner exports a function
// and JS hidden tests call it. These languages are different: the learner writes
// a complete program, each hidden test is { stdin, expectedStdout }, and the run
// happens on Judge0. They are kept apart from CHALLENGE_LANGUAGES so the JS/TS
// picker and `isChallengeLanguage` are unchanged for every existing challenge.
//
// `judge0Id` is Judge0's language_id. Confirm against the live
// `GET <JUDGE0_URL>/languages`: ids differ between Judge0 releases.
// Adding a language = one row here + starter files on the challenges.
// ---------------------------------------------------------------------------

export const STDIO_LANGUAGES = [
  { id: "python", label: "Python 3", ext: "py", judge0Id: 71 },
];

export const isStdioLanguage = (value) => STDIO_LANGUAGES.some((l) => l.id === value);

export const stdioLanguage = (id) => STDIO_LANGUAGES.find((l) => l.id === id) ?? null;

// Legacy challenges have no `runtime` field and are graded by the harness.
export const runtimeOf = (challenge) => challenge?.runtime ?? "harness";
