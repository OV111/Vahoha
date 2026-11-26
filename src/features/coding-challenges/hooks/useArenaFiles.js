import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  isJudgeLanguage,
  judgeStarter,
  languagesOf,
  mainFileName,
  toTypeScriptStarter,
} from "@shared/challengeLanguages";

/**
 * Owns the editor's local file state: seeds it from the saved draft (or the
 * starter files on a first visit), and autosaves 1.5s after typing stops.
 * Local so typing stays instant — the store round-trip only happens on save.
 *
 * Language: the challenge's own starter is JavaScript. The TypeScript version
 * of the main file is derived from it (same code, type header on top) and kept
 * as a separate file, `name.ts`. Both versions are kept and saved, so switching
 * language never throws away what was typed in the other one; only the files of
 * the chosen language are returned for display, running and submitting.
 *
 * A challenge offered in a judge language (Python and so on) gets one file for
 * it, either its own starter or one generated from the function it names.
 */
export default function useArenaFiles({ challenge, attempt, saveDraft, language = "js" }) {
  const [all, setAll] = useState([]);

  const jsMain = challenge?.starterFiles?.[0]?.name ?? null;
  const tsMain = jsMain ? mainFileName(jsMain, "ts") : null;

  useEffect(() => {
    if (!challenge) return;
    const starters = challenge.starterFiles ?? [];
    const draft = attempt?.code?.length ? attempt.code : [];
    const byName = new Map(draft.map((f) => [f.name, f.code]));

    const offered = languagesOf(challenge).map((l) => l.id);
    const js = starters.map((f) => ({ ...f, code: byName.get(f.name) ?? f.code }));
    const ts =
      starters[0] && tsMain && offered.includes("ts")
        ? [
            {
              name: tsMain,
              lang: "ts",
              code: byName.get(tsMain) ?? toTypeScriptStarter(starters[0].code),
            },
          ]
        : [];
    // A challenge may ship its own starter for a judge language (it is then one
    // of the starter files above). Otherwise the starter is generated.
    const judge = starters[0]
      ? offered
          .filter(isJudgeLanguage)
          .map((id) => ({ id, name: mainFileName(starters[0].name, id) }))
          .filter(({ name }) => !starters.some((f) => f.name === name))
          .map(({ id, name }) => ({
            name,
            lang: id,
            code: byName.get(name) ?? judgeStarter(id, challenge.functionSpec ?? {}),
          }))
      : [];
    setAll([...js, ...ts, ...judge, challenge.testFile].filter(Boolean));
  }, [challenge, attempt, tsMain]);

  const updateFile = (name, code) => {
    setAll((prev) => prev.map((f) => (f.name === name ? { ...f, code } : f)));
  };

  // What the editor, the runner and the submit button see: the chosen
  // language's main file first, the other starter files and the test after it.
  const files = useMemo(() => {
    // A judge language is graded on the server only, so its file stands alone:
    // the JavaScript test file next to it could not run it.
    if (isJudgeLanguage(language)) {
      const name = jsMain ? mainFileName(jsMain, language) : null;
      return all.filter((f) => f.name === name);
    }
    const hide = language === "ts" ? jsMain : tsMain;
    const shown = all.filter((f) => f.name !== hide && !isJudgeLanguage(f.lang));
    const main = shown.find((f) => f.name === (language === "ts" ? tsMain : jsMain));
    return main ? [main, ...shown.filter((f) => f !== main)] : shown;
  }, [all, language, jsMain, tsMain]);

  // Debounced rather than per-keystroke so a fast typist doesn't generate a
  // save request per character. Both language versions are saved.
  const savedRef = useRef("");
  // The save request last sent, so saveNow can wait for one already on its way.
  const inFlightRef = useRef(Promise.resolve());
  useEffect(() => {
    const editable = all.filter((f) => f.lang !== "test");
    if (!attempt || editable.length === 0) return;

    const payload = JSON.stringify(editable.map(({ name, code }) => ({ name, code })));
    if (payload === savedRef.current) return;

    const id = setTimeout(() => {
      savedRef.current = payload;
      inFlightRef.current = saveDraft(JSON.parse(payload));
    }, 1500);
    return () => clearTimeout(id);
  }, [all, attempt, saveDraft]);

  // Skips the debounce: used before submitting (the server grades the saved
  // draft) and before leaving the Arena (e.g. "Ask mentor"), where the pending
  // timer would be cleared on unmount and the last edit lost.
  const saveNow = useCallback(async () => {
    const editable = all.filter((f) => f.lang !== "test");
    if (!attempt || editable.length === 0) return;
    const payload = JSON.stringify(editable.map(({ name, code }) => ({ name, code })));
    if (payload !== savedRef.current) {
      savedRef.current = payload;
      inFlightRef.current = saveDraft(JSON.parse(payload));
    }
    await inFlightRef.current;
  }, [all, attempt, saveDraft]);

  return { files, updateFile, saveNow };
}
