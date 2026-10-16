import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { mainFileName, toTypeScriptStarter } from "../../../../constants/challengeLanguages";

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

    const js = starters.map((f) => ({ ...f, code: byName.get(f.name) ?? f.code }));
    const ts =
      starters[0] && tsMain
        ? [
            {
              name: tsMain,
              lang: "ts",
              code: byName.get(tsMain) ?? toTypeScriptStarter(starters[0].code),
            },
          ]
        : [];
    setAll([...js, ...ts, challenge.testFile].filter(Boolean));
  }, [challenge, attempt, tsMain]);

  const updateFile = (name, code) => {
    setAll((prev) => prev.map((f) => (f.name === name ? { ...f, code } : f)));
  };

  // What the editor, the runner and the submit button see: the chosen
  // language's main file first, the other starter files and the test after it.
  const files = useMemo(() => {
    const hide = language === "ts" ? jsMain : tsMain;
    const shown = all.filter((f) => f.name !== hide);
    const main = shown.find((f) => f.name === (language === "ts" ? tsMain : jsMain));
    return main ? [main, ...shown.filter((f) => f !== main)] : shown;
  }, [all, language, jsMain, tsMain]);

  // Debounced rather than per-keystroke so a fast typist doesn't generate a
  // save request per character. Both language versions are saved.
  const savedRef = useRef("");
  useEffect(() => {
    const editable = all.filter((f) => f.lang !== "test");
    if (!attempt || editable.length === 0) return;

    const payload = JSON.stringify(editable.map(({ name, code }) => ({ name, code })));
    if (payload === savedRef.current) return;

    const id = setTimeout(() => {
      savedRef.current = payload;
      saveDraft(JSON.parse(payload));
    }, 1500);
    return () => clearTimeout(id);
  }, [all, attempt, saveDraft]);

  // Skips the debounce: used before leaving the Arena (e.g. "Ask mentor"),
  // where the pending timer would be cleared on unmount and the last edit lost.
  const saveNow = useCallback(async () => {
    const editable = all.filter((f) => f.lang !== "test");
    if (!attempt || editable.length === 0) return;
    const payload = JSON.stringify(editable.map(({ name, code }) => ({ name, code })));
    if (payload === savedRef.current) return;
    savedRef.current = payload;
    await saveDraft(JSON.parse(payload));
  }, [all, attempt, saveDraft]);

  return { files, updateFile, saveNow };
}
