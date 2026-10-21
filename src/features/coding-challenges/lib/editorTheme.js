import { EditorView } from "@codemirror/view";
import { HighlightStyle, syntaxHighlighting } from "@codemirror/language";
import { tags as t } from "@lezer/highlight";
import { C } from "./arenaTheme";

/**
 * CodeMirror theme for the arena editor.
 *
 * Every value here is copied from the arena's existing palette so switching
 * from the hand-rolled renderer to CodeMirror is invisible: same background,
 * same gutter, same token colours, same 13px/1.5rem line rhythm.
 *
 * Kept in its own module because a CodeMirror theme is a static extension —
 * rebuilding it on every render would tear down and recreate the editor's
 * style sheet on each keystroke.
 */

export const ARENA_COLORS = {
  ...C,
  gutterBg: "#050505",
  gutterText: "#3a3a3a",
  plain: "#d4d4d4",
  func: "#60a5fa",
  comment: "#525252",
};

const FONT_MONO = "'Geist Mono Variable', 'Fira Code', 'JetBrains Mono', monospace";

export const arenaTheme = EditorView.theme(
  {
    "&": {
      height: "100%",
      backgroundColor: ARENA_COLORS.bg,
      color: ARENA_COLORS.plain,
      fontSize: "13px",
      fontFamily: FONT_MONO,
    },
    ".cm-scroller": {
      fontFamily: FONT_MONO,
      lineHeight: "1.5rem",
      overflow: "auto",
      scrollbarWidth: "thin",
      scrollbarColor: `${ARENA_COLORS.faint} transparent`,
    },
    ".cm-content": { padding: "0", caretColor: ARENA_COLORS.purple },
    ".cm-line": { paddingLeft: "20px", paddingRight: "16px" },

    // Gutter matches the old <td> exactly: 48px min, 11px digits, hard border.
    ".cm-gutters": {
      backgroundColor: ARENA_COLORS.gutterBg,
      color: ARENA_COLORS.gutterText,
      border: "none",
      borderRight: `1px solid ${ARENA_COLORS.border}`,
      minWidth: "48px",
      fontSize: "11px",
    },
    ".cm-lineNumbers .cm-gutterElement": {
      padding: "0 16px 0 16px",
      minWidth: "48px",
    },
    ".cm-activeLineGutter": { backgroundColor: ARENA_COLORS.gutterBg },
    ".cm-activeLine": { backgroundColor: "rgba(255,255,255,0.018)" },

    "&.cm-focused": { outline: "none" },
    "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection":
      { backgroundColor: "#2a1b45" },
    ".cm-cursor, .cm-dropCursor": { borderLeftColor: ARENA_COLORS.purple },

    // Read-only files (the test file) read as dimmer and show no caret.
    "&.cm-editor.arena-readonly .cm-content": { caretColor: "transparent" },
    "&.cm-editor.arena-readonly .cm-activeLine": {
      backgroundColor: "transparent",
    },
  },
  { dark: true },
);

export const arenaHighlight = syntaxHighlighting(
  HighlightStyle.define([
    { tag: [t.keyword, t.moduleKeyword, t.controlKeyword, t.operatorKeyword], color: ARENA_COLORS.purple },
    { tag: [t.function(t.variableName), t.function(t.propertyName)], color: ARENA_COLORS.func },
    { tag: [t.string, t.special(t.string)], color: ARENA_COLORS.green },
    { tag: [t.comment, t.lineComment, t.blockComment], color: ARENA_COLORS.comment, fontStyle: "italic" },
    { tag: [t.number, t.bool, t.null], color: ARENA_COLORS.amber },
    { tag: [t.definition(t.variableName), t.propertyName], color: ARENA_COLORS.plain },
    { tag: [t.typeName, t.className], color: ARENA_COLORS.func },
    { tag: t.operator, color: ARENA_COLORS.muted },
  ]),
);
