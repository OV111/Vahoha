// Which of the learner's files is graded, and what code reaches the sandbox.
//
// Pure, so the rules are testable without a database. The file name and export
// name come from the CHALLENGE's own starter file, never from the attempt: the
// attempt is user-written, and the export name is spliced into the harness as an
// identifier.

import {
  exportNameOf,
  isChallengeLanguage,
  isStdioLanguage,
  mainFileName,
  DEFAULT_LANGUAGE,
} from "../../../../constants/challengeLanguages.js";
import { stripTypes } from "./typescript.js";

const fail = (status, message) => {
  const err = new Error(message);
  err.status = status;
  throw err;
};

/**
 * @param {{ starterFiles?: {name:string}[] }} challenge
 * @param {{ name:string, code:string }[]} attemptCode the saved draft files
 * @param {string} [language] "js" (default) or "ts"
 * @returns {{ code: string, exportName: string, fileName: string, language: string }}
 */
export const pickSubmissionSource = (challenge, attemptCode, language = DEFAULT_LANGUAGE) => {
  if (!isChallengeLanguage(language)) fail(400, "Unknown language.");

  const jsName = challenge.starterFiles?.[0]?.name ?? "";
  const fileName = mainFileName(jsName, language);
  const source = (attemptCode ?? []).find((f) => f.name === fileName);
  if (!source?.code?.trim()) fail(400, "There is no code to submit yet.");

  let code = source.code;
  if (language === "ts") {
    const stripped = stripTypes(code);
    if (stripped.error) fail(400, `TypeScript syntax error: ${stripped.error}`);
    code = stripped.code;
  }
  return { code, exportName: exportNameOf(jsName), fileName, language };
};

/**
 * Whole-program (stdio) challenges: the graded file is the challenge's own
 * starter file for the chosen language, looked up by `lang`, never by a name the
 * attempt supplies.
 *
 * @returns {{ code: string, fileName: string, language: string }}
 */
export const pickStdioSource = (challenge, attemptCode, language) => {
  if (!isStdioLanguage(language) || !(challenge.languages ?? []).includes(language)) {
    fail(400, "This challenge cannot be solved in that language.");
  }
  const starter = (challenge.starterFiles ?? []).find((f) => f.lang === language);
  if (!starter) fail(400, "This challenge has no starter file for that language.");

  const source = (attemptCode ?? []).find((f) => f.name === starter.name);
  if (!source?.code?.trim()) fail(400, "There is no code to submit yet.");
  return { code: source.code, fileName: starter.name, language };
};
