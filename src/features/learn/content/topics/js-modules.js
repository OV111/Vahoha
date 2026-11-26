// Same shape as js-closures.js (learn_topics). Files can't import each other in
// the runner, so runnable examples act out what modules do.
export default {
  topicId: "js-modules",
  title: "ES modules",
  mystery: "Two files import each other. Why does one of them crash?",
  minutes: 30,
  lang: "js",
  requires: ["js-closures"],

  shortAnswer:
    "A module is a file with its own scope. It shows only what it exports and gets only what it imports. ES modules (import/export) are the standard; CommonJS (require) is the older system of Node.js.",

  ideas: [
    { id: "own-scope", text: "A module has its own scope, and only exports are visible from outside" },
    { id: "named-default", text: "Named exports are imported by their name, a default export by any name" },
    { id: "runs-once", text: "A module runs once, and all importers share it" },
    { id: "live-binding", text: "An import is a live, read-only link to the exported variable" },
    { id: "static", text: "ES imports are known before the code runs; require runs like any function" },
  ],

  misconceptions: [
    {
      id: "copy-import",
      belief: "an import is a copy of the exported value",
      correction: "It is a live link. When the module changes its variable, the importer sees the new value.",
    },
    {
      id: "runs-per-import",
      belief: "a module runs again in every file that imports it",
      correction: "It runs once, at the first import. All files share the same module and the same state.",
    },
    {
      id: "can-assign",
      belief: "you can assign a new value to something you imported",
      correction: "Imports are read-only in the importing file. Only the module itself can change its variable.",
    },
    {
      id: "import-conditional",
      belief: "an import statement can stand inside an if",
      correction: "import statements belong at the top level of the file. For a condition, use the function import().",
    },
  ],

  sections: [
    {
      id: "why",
      title: "Why modules exist",
      simpler:
        "Imagine a house where everybody keeps everything in one room. Modules give each their own room with a door. You decide what you put in front of the door.",
      blocks: [
        {
          id: "why-1",
          type: "text",
          body: `In the beginning, all scripts of a page shared one global scope. Every variable at the top of a file could be seen and overwritten by every other file. Two scripts with a variable called \`user\` were enough for a bug, and the order of the script tags decided whether the page worked.

People helped themselves with closures: wrap everything in a function, and return only what others may use. The first example below shows this trick, and it is still the best way to understand modules.

An **ES module** does this for you. Each file has its **own scope**. Nothing gets out unless you \`export\` it, and nothing comes in unless you \`import\` it. The top of a file now tells you what it depends on.

In the browser, you load one with \`<script type="module">\`. In Node.js, use the ending \`.mjs\` or \`"type": "module"\` in package.json. Modules are always in strict mode.`,
        },
        {
          id: "why-code",
          type: "code",
          lang: "js",
          runnable: true,
          caption: "A module made by hand with a closure",
          source: `const cart = (() => {
  let items = []; // private

  const add = (item) => { items.push(item); };
  const count = () => items.length;

  return { add, count }; // the "exports"
})();

cart.add("book");
cart.add("pen");
console.log(cart.count());
console.log(cart.items);`,
          output: ["2", "undefined"],
        },
        {
          id: "q-scope",
          type: "question",
          ideaId: "own-scope",
          kind: "choice",
          prompt: "A module contains `const secret = 1;` without export. Who can use `secret`?",
          options: [
            { id: "everyone", text: "Every script on the page" },
            { id: "importers", text: "Every file that imports the module" },
            { id: "itself", text: "Only the module itself" },
          ],
          answerId: "itself",
          why: "A module has its own scope. Without export, nothing outside can reach the variable.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "syntax",
      title: "Named and default exports",
      simpler:
        "Named exports are tools with a label: you ask for them by their label. The default export is the one main thing in the box, and you may call it what you like.",
      blocks: [
        {
          id: "syntax-1",
          type: "text",
          body: `There are two kinds of exports.

**Named exports**: a file can have many, and they are imported by **exactly** their name, in braces. If you need another name, write \`as\`.

\`\`\`js
// math.js
export const PI = 3.14;
export function area(r) { return PI * r * r; }

// app.js
import { area, PI as pi } from "./math.js";
\`\`\`

**A default export**: at most one per file, imported **without braces** and with any name you like.

\`\`\`js
// Button.js
export default function Button() {}

// app.js
import MyButton from "./Button.js";
\`\`\`

Which is better? Named exports are easier to find and to rename with tools, and a typo is reported at once. With a default export, every file can use a different name. Many teams use named exports for helpers and default only where a framework asks for it.

\`import * as math from "./math.js"\` gives you all named exports in one object. In the browser the path needs its ending, \`"./math.js"\`. Bundlers such as Vite let you leave it out.`,
        },
        {
          id: "q-default",
          type: "question",
          ideaId: "named-default",
          kind: "choice",
          prompt: "A file has only `export default function save() {}`. Which import works?",
          options: [
            { id: "braces", text: 'import { save } from "./save.js"' },
            { id: "any", text: 'import store from "./save.js"' },
            { id: "star-call", text: 'import * as save from "./save.js"; save();' },
          ],
          answerId: "any",
          why: "A default export is imported without braces and with any name. With braces you ask for a named export, and there is none.",
          difficulty: 1,
        },
        {
          id: "q-named",
          type: "question",
          ideaId: "named-default",
          kind: "choice",
          prompt: "A file has `export const limit = 10`. You already have a variable `limit`. How do you import it?",
          options: [
            { id: "as", text: 'import { limit as maxItems } from "./config.js"' },
            { id: "plain", text: 'import maxItems from "./config.js"' },
            { id: "colon", text: 'import { limit: maxItems } from "./config.js"' },
          ],
          answerId: "as",
          why: "Named exports are renamed with as. The colon is the syntax of destructuring, not of imports, and without braces you would ask for the default export.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "live",
      title: "One module, live links",
      simpler:
        "A module is like one shared whiteboard. It's hung up once. Everyone who imports it looks at the same board. Only the owner may write on it, and everybody sees the change.",
      blocks: [
        {
          id: "live-1",
          type: "text",
          body: `Two facts explain most surprises.

**A module runs once.** The first import loads the file and runs its code from top to bottom. Every further import gets the same module. So a variable at the top of a module is **shared** by the whole program. That is useful for a database connection or a cache. It is dangerous for data that belongs to one user: on a server, all requests share it.

**An import is a live link.** It is not a copy of the value but a connection to the variable in the other module. If that module changes the variable, you see the new value. You can't change it yourself: imports are **read-only** in your file. If the importing file has to change something, the module must export a function for it.

This is like a closure: you don't get a photo of the variable, you look at the variable itself.`,
        },
        { id: "live-pic", type: "picture", diagram: "live-binding", alt: "Two files look at the same variable in one module" },
        {
          id: "live-code",
          type: "code",
          lang: "js",
          runnable: true,
          caption: "What a live link and a copy do, acted out",
          source: `const counter = (() => {
  let count = 0;
  return {
    get count() { return count; }, // like an ES export: a live link
    copied: count,                 // like a value copied once
    increase() { count++; },
  };
})();

counter.increase();
counter.increase();

console.log("live:", counter.count);
console.log("copied:", counter.copied);`,
          output: ["live: 2", "copied: 0"],
        },
        {
          id: "live-case",
          type: "realCase",
          title: "Users saw each other's carts",
          situation: "A Node.js server has a module with `export const cart = []` and adds the items of the current user to it.",
          problem: "In development everything was fine. On the first busy day, customers found strange items in their carts.",
          cause: "The module runs once for the whole server, so all users shared one array.",
          fix: "Data of one user belongs to that user: in the database, in the session, or in variables inside the function that handles the request.",
        },
        {
          id: "q-once",
          type: "question",
          ideaId: "runs-once",
          kind: "choice",
          prompt: "`config.js` contains `console.log(\"loading\")`. Five files import it. How often is it printed?",
          options: [
            { id: "five", text: "Five times", misconceptionId: "runs-per-import" },
            { id: "once", text: "Once" },
            { id: "never", text: "Never, unless something is used" },
          ],
          answerId: "once",
          why: "A module runs at its first import. The other files get the same module.",
          difficulty: 1,
        },
        {
          id: "q-live",
          type: "question",
          ideaId: "live-binding",
          kind: "choice",
          prompt: "`counter.js` has `export let count = 0` and `export function add() { count++ }`. You import both and call `add()` twice. What is `count` in your file?",
          options: [
            { id: "zero", text: "0, because you got a copy", misconceptionId: "copy-import" },
            { id: "two", text: "2" },
            { id: "error", text: "It throws, because count is read-only" },
          ],
          answerId: "two",
          why: "The import is a live link. You can't assign to count yourself, but you see the changes the module makes.",
          difficulty: 2,
        },
        {
          id: "q-assign",
          type: "question",
          ideaId: "live-binding",
          kind: "find-bug",
          prompt: "AI wrote this in `app.js`. What happens?",
          code: `import { theme } from "./settings.js";

theme = "light";`,
          options: [
            { id: "changes", text: "The theme changes for all files", misconceptionId: "can-assign" },
            { id: "local", text: "Only this file sees the new theme", misconceptionId: "copy-import" },
            { id: "error", text: "It is an error: imports can't be assigned" },
          ],
          answerId: "error",
          why: "Imports are read-only. settings.js should export a function such as setTheme.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "cjs",
      title: "ES modules and CommonJS",
      simpler:
        "require is like phoning someone while you work: you can do it anytime. import is a list on the door that is read before the work begins.",
      blocks: [
        {
          id: "cjs-1",
          type: "text",
          body: `Node.js is older than ES modules and had its own system, **CommonJS**. You'll still meet it in many projects.

| | ES modules | CommonJS |
| --- | --- | --- |
| Load | \`import { a } from "./x.js"\` | \`const { a } = require("./x")\` |
| Offer | \`export const a = 1\` | \`module.exports = { a }\` |
| When | before the code runs | when the line runs |
| Where | top level of the file | anywhere |
| You get | live links | the value of module.exports |
| Extras | top-level await | \`__dirname\`, \`require\` |

The main difference is **when**. ES imports are **static**: they can be read without running the program. That's why tools know exactly what is used and can leave out the rest (**tree shaking**), and why a missing export is reported before anything runs. It's also why an \`import\` statement can't stand in an \`if\`.

When you need to load something later, use the **function** \`import("./chart.js")\`. It returns a promise and works anywhere. This is how pages load heavy parts only when they're needed.

Mixing: ES modules can import CommonJS packages. In the other direction, \`require\` of an ES module works only in newer Node.js versions, and not if the module uses top-level await.`,
        },
        {
          id: "cjs-code",
          type: "code",
          lang: "js",
          runnable: true,
          caption: "Loading on demand: the work starts at the first call",
          source: `// Stands for import("./chart.js")
let loads = 0;
const importChart = async () => {
  loads++;
  return { draw: () => "chart drawn" };
};

let modulePromise = null;
const getChart = () => (modulePromise ??= importChart());

async function main() {
  console.log("loaded at start:", loads);
  const chart = await getChart();
  console.log(chart.draw());
  await getChart();
  console.log("loaded in total:", loads);
}

main();`,
          output: ["loaded at start: 0", "chart drawn", "loaded in total: 1"],
        },
        {
          id: "q-static",
          type: "question",
          ideaId: "static",
          kind: "choice",
          prompt: "A page needs a large chart library only when the user opens the statistics. How do you load it?",
          options: [
            { id: "if", text: 'if (open) { import Chart from "chart" }', misconceptionId: "import-conditional" },
            { id: "dynamic", text: 'const { Chart } = await import("chart")' },
            { id: "top", text: 'import { Chart } from "chart" at the top of the file' },
          ],
          answerId: "dynamic",
          why: "The function import() loads at that moment and returns a promise. A statement in an if is a syntax error, and an import at the top loads it for everybody.",
          difficulty: 2,
        },
        {
          id: "q-shake",
          type: "question",
          ideaId: "static",
          kind: "choice",
          prompt: "Why can a bundler leave out unused functions more easily with ES modules than with require?",
          options: [
            { id: "smaller", text: "ES modules are compressed" },
            { id: "known", text: "Imports and exports are known without running the code" },
            { id: "async", text: "ES modules are loaded later" },
          ],
          answerId: "known",
          why: "require can be called anywhere, with any name built at run time. A tool can't be sure what is used.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "circular",
      title: "When files import each other",
      simpler:
        "Two people wait at a door and each says: after you. In the end one of them has to go first, and the other isn't ready yet.",
      blocks: [
        {
          id: "circular-1",
          type: "text",
          body: `This is the answer to the question at the top. If \`a.js\` imports \`b.js\`, and \`b.js\` imports \`a.js\`, there is a **circle**. A module can't run before its imports have run, but here each would have to wait for the other.

JavaScript breaks the circle: one of them runs first, while the other isn't finished. If it **uses** an import right then, at the top level, the variable has no value yet. For \`const\`, \`let\` and classes you get a \`ReferenceError\`: *Cannot access 'x' before initialization*.

If the import is used only **inside a function** that is called later, everything works, because by then both modules have finished. This is why circles often go unnoticed, until someone moves a line.

The clean solution is to **break the circle**: move what both need into a third file that imports neither.`,
        },
        {
          id: "circular-code",
          type: "code",
          lang: "js",
          runnable: true,
          caption: "The same error, in one file",
          source: `// Used too early, like an import in a circle
try {
  console.log(name);
} catch (err) {
  console.log(err.name);
}

const later = () => name; // fine: not used yet

const name = "ready";
console.log(later());`,
          output: ["ReferenceError", "ready"],
        },
        {
          id: "circular-case",
          type: "realCase",
          title: "One import broke the whole app",
          situation: "`user.js` imports `formatDate` from `helpers.js`. Later someone added to helpers.js: `import { DEFAULT_USER } from \"./user.js\"`.",
          problem: "The app showed a white page with \"Cannot access 'DEFAULT_USER' before initialization\".",
          cause: "The two files now imported each other, and helpers.js used DEFAULT_USER at the top level, before user.js had run.",
          fix: "DEFAULT_USER moved to a new file, `constants.js`, that imports neither. A lint rule (import/no-cycle) now finds such circles.",
        },
        {
          id: "q-circular",
          type: "question",
          ideaId: "runs-once",
          kind: "choice",
          prompt: "Two modules import each other. When does that still work?",
          options: [
            { id: "never", text: "Never: circles are always an error" },
            { id: "inside", text: "When the imports are used only inside functions that are called later" },
            { id: "twice", text: "Always, because each module runs twice", misconceptionId: "runs-per-import" },
          ],
          answerId: "inside",
          why: "When the functions are called, both modules have finished running. At the top level, one of them would be too early.",
          difficulty: 3,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Look at the braces, look at the path, and ask whether a variable at the top of the file should really be shared by everybody.",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Braces or no braces.** With braces you ask for a named export, without them for the default. A mix-up gives "does not provide an export named ...".

**Doing work while being imported.** A module that starts a server or sends a request at its top level does it for everyone who imports it, also in tests. Export a function and let the caller decide.

**Importing a whole library for one function.** Look for a smaller import, and check what your bundle really contains.

**A file called index.js that re-exports everything.** It's comfortable, but it easily creates circles and can load far more than you need.

**State at the top level of a server module.** It is shared by all users.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `// db.js: connects as soon as anyone imports it
export const db = await connect(process.env.DB_URL);`,
          right: `// db.js: connects once, when first asked
let promise = null;

export function getDb() {
  promise ??= connect(process.env.DB_URL);
  return promise;
}`,
          why: "On the left, every test that imports the file needs a database. On the right, nothing happens until someone asks, and it still connects only once.",
        },
        {
          id: "q-effects",
          type: "question",
          ideaId: "own-scope",
          kind: "choice",
          prompt: "Why is it better to export `startServer()` than to start the server at the top level of the module?",
          options: [
            { id: "speed", text: "Functions are faster" },
            { id: "control", text: "Whoever imports the file decides when, and tests can import it safely" },
            { id: "scope", text: "Variables at the top level are global" },
          ],
          answerId: "control",
          why: "Importing should not have surprising effects. Variables in a module aren't global, that isn't the problem.",
          difficulty: 1,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "ES modules for all new code",
      "Named exports for helpers",
      "The function import() for heavy parts that aren't always needed",
    ],
    avoid: [
      "Circles: move what is shared into a third file",
      "Work at the top level of a module",
      "User data in module variables on a server",
    ],
  },

  explain: {
    prompt: "What does a module hide and share? What do you really get when you import a variable, and how do ES modules differ from CommonJS?",
    modelAnswer:
      "A module has its own scope and shows only what it exports: named exports, imported by their name in braces, or one default export, imported by any name. It runs once, and all importers share it, so its top-level variables are shared too. An import is a live, read-only link to the variable, not a copy. ES imports are static: they are known before the code runs, so tools can check them and leave out unused code. CommonJS require is a function that runs when its line is reached. For loading later, ES modules have the function import().",
  },

  reviewQuestions: [
    {
      id: "r-shared",
      ideaId: "runs-once",
      kind: "choice",
      prompt: "Two files import the same module and one of them calls a function that changes its state. What does the other see?",
      options: [
        { id: "old", text: "The old state, because it has its own module", misconceptionId: "runs-per-import" },
        { id: "new", text: "The new state, because both share one module" },
      ],
      answerId: "new",
      why: "A module exists once. Its state is shared by all importers.",
      difficulty: 1,
    },
    {
      id: "r-default",
      ideaId: "named-default",
      kind: "choice",
      prompt: "How many default exports can a file have?",
      options: [
        { id: "one", text: "At most one" },
        { id: "many", text: "As many as you like" },
        { id: "exactly", text: "Exactly one, always" },
      ],
      answerId: "one",
      why: "A default export is optional, and there can be only one.",
      difficulty: 1,
    },
    {
      id: "r-tdz",
      ideaId: "static",
      kind: "choice",
      prompt: "Where may an `import` **statement** stand?",
      options: [
        { id: "anywhere", text: "Anywhere", misconceptionId: "import-conditional" },
        { id: "top", text: "Only at the top level of a module" },
        { id: "functions", text: "Only in functions" },
      ],
      answerId: "top",
      why: "It is static. Inside functions and conditions, use the function import().",
      difficulty: 1,
    },
  ],

  summary: [
    "A module has its own scope and shows only its exports",
    "Named: braces and exact name. Default: no braces, any name",
    "A module runs once and is shared by all importers",
    "Imports are live and read-only",
    "Statements are static; import() loads on demand",
  ],

  sources: [
    { label: "MDN: JavaScript modules", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules" },
    { label: "MDN: import()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/import" },
    { label: "Node.js: ECMAScript modules", url: "https://nodejs.org/api/esm.html" },
  ],
};
