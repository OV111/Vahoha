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
