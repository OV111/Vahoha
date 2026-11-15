// Which of the learner's files is graded, and what code reaches the sandbox.
//
// Pure, so the rules are testable without a database. The file name and export
// name come from the CHALLENGE's own starter file, never from the attempt: the
// attempt is user-written, and the export name is spliced into the harness as an
// identifier.

import {
  exportNameOf,
  isChallengeLanguage,
  isJudgeLanguage,
  languagesOf,
  mainFileName,
  specSupports,
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
 * @param {string} [language] "js" (default), "ts", or a judge language such as "python"
 * @returns {{ code: string, exportName: string, fileName: string, language: string, onJudge: boolean }}
 */
export const pickSubmissionSource = (challenge, attemptCode, language = DEFAULT_LANGUAGE) => {
  const onJudge = isJudgeLanguage(language);
  if (!onJudge && !isChallengeLanguage(language)) fail(400, "Unknown language.");
  // Each challenge says which languages it can be solved in. A judge language
  // also needs the tests as data (JavaScript tests cannot grade it), and a
  // typed one needs the parameter types to call the function.
  const offered = languagesOf(challenge).some((l) => l.id === language);
  if (!offered || (onJudge && !(specSupports(language, challenge.functionSpec) && challenge.hiddenCases?.length))) {
    fail(400, "This challenge cannot be solved in that language.");
  }

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
  return { code, exportName: exportNameOf(jsName), fileName, language, onJudge };
};
