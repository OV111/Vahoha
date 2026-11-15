// Languages a coding challenge can be solved in. Shared by the Arena (what the
// picker shows, which file is edited) and the grader (which file is graded), so
// the two can never disagree about a file name.
//
// TypeScript here means "types are removed, then the JavaScript runs". Types are
// not checked: a type error never fails a challenge, only a syntax error or a
// failing test does. Every challenge supports it without per-challenge data,
// because the TypeScript starter is derived from the JavaScript one.

import { isTypedSpec, paramName, parseType, typeIn, zeroValueIn } from "./challengeTypes.js";

export const CHALLENGE_LANGUAGES = [
  { id: "js", label: "JavaScript", ext: "js" },
  { id: "ts", label: "TypeScript", ext: "ts" },
];

export const DEFAULT_LANGUAGE = "js";

// Languages that run on the remote judge instead of the JavaScript sandbox.
// Unlike the two above, a challenge supports one of these only when its tests
// are written as data (arguments and an expected result), because its
// JavaScript tests cannot run in another language.
//
// Such a challenge names its function once, the JavaScript way ("twoSum",
// params "nums" and "target"). Each language says how it spells that name and
// what the empty function looks like, so starters need no per-challenge data.
// The typed languages (`typed: true`) also need the parameter and result types,
// written as in constants/challengeTypes.js.

// "twoSum" -> "two_sum"
export const toSnakeCase = (name) =>
  String(name).replace(/([a-z0-9])([A-Z])/g, "$1_$2").toLowerCase();

const names = (spec, spell = (n) => n) => (spec.params ?? []).map((p) => spell(paramName(p)));

// C++ takes arrays by reference, the way LeetCode-style signatures do.
const cppParam = (p) => `${typeIn("cpp", p.type)}${parseType(p.type).depth > 0 ? "&" : ""} ${p.name}`;

export const JUDGE_LANGUAGES = [
  {
    id: "python",
    label: "Python",
    ext: "py",
    functionName: toSnakeCase,
    starter: (spec) =>
      `def ${toSnakeCase(spec.name)}(${names(spec, toSnakeCase).join(", ")}):\n    # your code here\n    pass\n`,
  },
  {
    id: "ruby",
    label: "Ruby",
    ext: "rb",
    functionName: toSnakeCase,
    starter: (spec) =>
      `def ${toSnakeCase(spec.name)}(${names(spec, toSnakeCase).join(", ")})\n  # your code here\nend\n`,
  },
  {
    id: "php",
    label: "PHP",
    ext: "php",
    functionName: (name) => name,
    starter: (spec) =>
      `<?php\n\nfunction ${spec.name}(${names(spec, (n) => `$${n}`).join(", ")}) {\n    // your code here\n}\n`,
  },
  {
    id: "java",
    label: "Java",
    ext: "java",
    typed: true,
    functionName: (name) => name,
    starter: (spec) =>
      `import java.util.*;\n\nclass Solution {\n    public ${typeIn("java", spec.returns)} ${spec.name}(${spec.params
        .map((p) => `${typeIn("java", p.type)} ${p.name}`)
        .join(", ")}) {\n        // your code here\n        return ${zeroValueIn("java", spec.returns)};\n    }\n}\n`,
  },
  {
    id: "cpp",
    label: "C++",
    short: "C++",
    ext: "cpp",
    typed: true,
    functionName: (name) => name,
    // The standard headers and `using namespace std;` are added when it runs.
    starter: (spec) =>
      `class Solution {\npublic:\n    ${typeIn("cpp", spec.returns)} ${spec.name}(${spec.params
        .map(cppParam)
        .join(", ")}) {\n        // your code here\n        return {};\n    }\n};\n`,
  },
  {
    id: "go",
    label: "Go",
    ext: "go",
    typed: true,
    functionName: (name) => name,
    // `package main` is added when it runs.
    starter: (spec) =>
      `func ${spec.name}(${spec.params.map((p) => `${p.name} ${typeIn("go", p.type)}`).join(", ")}) ${typeIn(
        "go",
        spec.returns,
      )} {\n\t// your code here\n\treturn ${zeroValueIn("go", spec.returns)}\n}\n`,
  },
];

export const isJudgeLanguage = (value) =>
  JUDGE_LANGUAGES.some((l) => l.id === value);

// Older challenges describe the task in JavaScript terms ("return null",
// "throw an Error"). When one of them is solved in another language, the Arena
// says what those words mean there. `nothing` is left out for the typed
// languages, whose challenges never return null.
const JS_TERMS = {
  python: { nothing: "None", fail: "raise an exception" },
  ruby: { nothing: "nil", fail: "raise an error" },
  php: { nothing: "null", fail: "throw an exception" },
  java: { fail: "throw an exception" },
  cpp: { fail: "throw an exception" },
  go: { fail: "panic" },
};

/**
 * What a learner needs to read a JavaScript-worded task in another language,
 * or null when the task is already written for it.
 * @returns {{ functionName: string, nothing?: string, fail: string } | null}
 */
export const jsTermsFor = (challenge, language) => {
  const judge = JUDGE_LANGUAGES.find((l) => l.id === language);
  if (!judge || !challenge?.functionSpec?.name || !challenge.languages?.includes("js")) return null;
  return { functionName: judge.functionName(challenge.functionSpec.name), ...JS_TERMS[language] };
};

export const isTypedLanguage = (value) =>
  JUDGE_LANGUAGES.some((l) => l.id === value && l.typed);

/** Can this function spec be offered in this judge language? */
export const specSupports = (language, functionSpec) =>
  Boolean(functionSpec?.name) && isJudgeLanguage(language) && (!isTypedLanguage(language) || isTypedSpec(functionSpec));

// The empty function a learner starts from, or "" when the spec cannot be
// offered in that language.
export const judgeStarter = (language, functionSpec) =>
  specSupports(language, functionSpec) ? JUDGE_LANGUAGES.find((l) => l.id === language).starter(functionSpec) : "";

/** Short name for tight spaces: "JS", "PY", "C++". */
export const shortLabel = (language) => language.short ?? language.ext.toUpperCase();

// The languages one challenge can be solved in, in the order the picker shows
// them. A challenge lists them in `languages` (["python"], or several). One
// without the field is an older JavaScript challenge, which TypeScript also
// covers because its starter is derived.
export const languagesOf = (challenge) =>
  Array.isArray(challenge?.languages)
    ? [...CHALLENGE_LANGUAGES, ...JUDGE_LANGUAGES].filter((l) => challenge.languages.includes(l.id))
    : CHALLENGE_LANGUAGES;

export const isChallengeLanguage = (value) =>
  CHALLENGE_LANGUAGES.some((l) => l.id === value);

const extOf = (language) =>
  [...CHALLENGE_LANGUAGES, ...JUDGE_LANGUAGES].find((l) => l.id === language)?.ext ?? "js";

// The challenge stores its main file as e.g. "debounce.js"; the export name
// ("debounce") is the part before the extension, whatever the language.
export const exportNameOf = (fileName) => String(fileName).replace(/\.[^.]+$/, "");

// "debounce.js" + "ts" -> "debounce.ts", "twoSum.js" + "python" -> "twoSum.py"
export const mainFileName = (jsFileName, language) =>
  `${exportNameOf(jsFileName)}.${extOf(language)}`;

// Declared so editors and a future type checker know `module` exists. It is a
// type-only line, removed before the code runs.
export const TS_STARTER_HEADER = "declare const module: { exports: unknown };\n\n";

// Valid JavaScript is valid TypeScript for these starters, so the TypeScript
// starter is the JavaScript one with the header on top.
export const toTypeScriptStarter = (jsCode) =>
  String(jsCode).startsWith(TS_STARTER_HEADER) ? String(jsCode) : TS_STARTER_HEADER + jsCode;
