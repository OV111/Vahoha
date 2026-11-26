/**
 * Builds public/lesson-react.js: React, ReactDOM and a JSX compiler in one classic
 * script, for the React examples on Learn pages.
 *
 * Those run in a sandboxed frame with no origin of its own, which can't load the
 * app's module chunks but can load a plain script. Only a page with a React
 * example downloads it. Runs before `npm run dev` and `npm run build`; the output
 * is generated, so it's gitignored.
 */
import { build } from "esbuild";

await build({
  entryPoints: ["src/features/learn/runtime/lessonReact.js"],
  outfile: "public/lesson-react.js",
  bundle: true,
  minify: true,
  format: "iife",
  // The development build: its warnings (missing keys, wrong props) are part of what lessons teach.
  define: { "process.env.NODE_ENV": '"development"' },
  legalComments: "none",
});

console.log("buildLessonReact: wrote public/lesson-react.js");
