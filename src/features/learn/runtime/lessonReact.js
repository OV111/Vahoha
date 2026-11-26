// Bundled on its own by scripts/buildLessonReact.js; runs inside the preview frame.
import * as React from "react";
import { createRoot } from "react-dom/client";
import { transform } from "sucrase";

// What an example may use without importing it.
const NAMES = [
  "useState", "useEffect", "useRef", "useMemo", "useCallback", "useReducer", "useContext", "useId",
  "createContext", "memo", "Fragment",
];

const output = () => document.getElementById("console");

const show = (value) => {
  if (typeof value === "string") return value;
  if (value instanceof Error) return value.message;
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
};

const print = (args, isError) => {
  const line = document.createElement("div");
  line.textContent = args.map(show).join(" ");
  if (isError) line.className = "error";
  output().append(line);
};

/** Compiles the source, which must define `App`, and renders it. */
window.runLesson = (source) => {
  const log = console.log;
  console.log = (...args) => {
    log(...args);
    print(args, false);
  };
  window.addEventListener("error", (e) => print([e.message], true));

  try {
    const { code } = transform(source, { transforms: ["jsx"], jsxRuntime: "classic", production: true });
    const App = new Function("React", ...NAMES, `"use strict";\n${code}\nreturn App;`)(
      React,
      ...NAMES.map((name) => React[name]),
    );
    createRoot(document.getElementById("root"), {
      onUncaughtError: (error) => print([error], true),
    }).render(React.createElement(App));
  } catch (error) {
    print([error], true);
  }
};
