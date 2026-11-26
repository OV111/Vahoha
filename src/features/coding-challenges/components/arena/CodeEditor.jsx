import { useEffect, useRef } from "react";
import { Compartment, EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
  drawSelection,
} from "@codemirror/view";
import {
  defaultKeymap,
  history,
  historyKeymap,
  indentWithTab,
} from "@codemirror/commands";
import {
  bracketMatching,
  indentOnInput,
  indentUnit,
  StreamLanguage,
} from "@codemirror/language";
import { javascript } from "@codemirror/lang-javascript";
import { arenaTheme, arenaHighlight } from "@/features/coding-challenges/lib/editorTheme";

// Grammars other than JavaScript are fetched when a file in that language is
// opened, so they cost nothing to the learners who never pick them.
const LAZY_SYNTAX = {
  python: () => import("@codemirror/lang-python").then((m) => m.python()),
  php: () => import("@codemirror/lang-php").then((m) => m.php()),
  ruby: () => import("@codemirror/legacy-modes/mode/ruby").then((m) => StreamLanguage.define(m.ruby)),
  java: () => import("@codemirror/lang-java").then((m) => m.java()),
  cpp: () => import("@codemirror/lang-cpp").then((m) => m.cpp()),
  go: () => import("@codemirror/lang-go").then((m) => m.go()),
};

// Each language's usual indent. Go's formatter uses tabs.
const INDENT = { python: "    ", php: "    ", java: "    ", cpp: "    ", go: "\t" };

/**
 * CodeMirror 6 editor for the arena.
 *
 * Two things make this less trivial than it looks:
 *
 * 1. CodeMirror owns its own DOM and document. React must not re-render it on
 *    every keystroke, so the view is created once per file and kept in a ref.
 *    `value` is only pushed in when it differs from what the editor already
 *    holds — otherwise typing would fight the controlled prop and the cursor
 *    would jump to the end on every character.
 *
 * 2. `onChange` is read through a ref inside the update listener. The listener
 *    is baked into the EditorState at construction, so a stale closure would
 *    otherwise keep calling the first render's handler forever.
 */
export default function CodeEditor({ value, onChange, onPaste, readOnly = false, language = "js" }) {
  const host = useRef(null);
  const view = useRef(null);
  const onChangeRef = useRef(onChange);

  onChangeRef.current = onChange;
  const onPasteRef = useRef(onPaste);
  onPasteRef.current = onPaste;

  useEffect(() => {
    if (!host.current) return;

    const syntax = new Compartment();
    const loadSyntax = LAZY_SYNTAX[language];

    const state = EditorState.create({
      doc: value ?? "",
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        drawSelection(),
        history(),
        bracketMatching(),
        indentOnInput(),
        indentUnit.of(INDENT[language] ?? "  "),
        syntax.of(loadSyntax ? [] : javascript({ typescript: language === "ts" })),
        arenaHighlight,
        arenaTheme,
        // indentWithTab last so Tab indents instead of leaving the editor.
        keymap.of([...defaultKeymap, ...historyKeymap, indentWithTab]),
        EditorState.readOnly.of(readOnly),
        EditorView.editable.of(!readOnly),
        // Pasting stays allowed (moving your own code around is normal); its
        // size is only reported, as a review signal.
        EditorView.domEventHandlers({
          paste: (event) => {
            onPasteRef.current?.(event.clipboardData?.getData("text/plain").length ?? 0);
          },
        }),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChangeRef.current?.(update.state.doc.toString());
          }
        }),
      ],
    });

    view.current = new EditorView({ state, parent: host.current });
    if (readOnly) view.current.dom.classList.add("arena-readonly");

    // The editor is usable at once and gains its colours when the grammar
    // arrives. If the fetch fails the code simply stays uncoloured.
    const created = view.current;
    loadSyntax?.()
      .then((extension) => {
        if (view.current === created) created.dispatch({ effects: syntax.reconfigure(extension) });
      })
      .catch(() => {});

    return () => {
      view.current?.destroy();
      view.current = null;
    };
    // Rebuilt only when the read-only mode flips — switching files (and so the
    // language) remounts this component via its key, so `value` and `language`
    // are intentionally not dependencies.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readOnly]);

  // Adopt an external change (a reset, or a draft arriving from the server)
  // without clobbering what the user is typing.
  useEffect(() => {
    const v = view.current;
    if (!v) return;
    const current = v.state.doc.toString();
    if (value != null && value !== current) {
      v.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div ref={host} className="h-full overflow-hidden" />;
}
