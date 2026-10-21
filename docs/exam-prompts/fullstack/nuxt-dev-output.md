LAYER: nuxt-dev-1

```json
[
  {
    "stem": "What is the key difference between let and const?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "A const binding is always deeply frozen so nested properties cannot change",
      "A let binding is hoisted to the top of the file and initialized with a value",
      "A let binding can only be declared inside a function body or a loop",
      "A const binding cannot be reassigned after it is declared"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does this produce? const [a, b] = [1, 2, 3]",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "a is 1 and b is the array [2, 3] holding the rest",
      "a is 1 and b is 2, and the remaining value is ignored",
      "a is the whole array and b is undefined",
      "It throws because the array has more items than variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the spread operator do in { ...user, name: 'Sam' }?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "Copies user's properties into a new object, then overrides name",
      "Removes the name property from user before returning a result",
      "Creates a deep clone so nested objects are never shared with user",
      "Merges user into the existing object and permanently changes user.name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the optional chaining expression user?.address?.city return when address is undefined?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "undefined, without throwing an error",
      "A TypeError, because address was not defined",
      "null, since the missing property is treated as empty",
      "An empty string for the city value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between the === and == operators?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "=== compares object references only, while == compares each field",
      "=== compares without type coercion, while == may convert types first",
      "=== works only on strings, while == works on every type of value",
      "=== is slower because it converts both sides to numbers first"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the result of const total = items.map(i => i.price)?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "A single number equal to the sum of all item prices",
      "An iterator that runs only when you start looping over it",
      "A new array holding each item's price, leaving items unchanged",
      "The items array itself, with each element replaced by its price"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which expression falls back to 'guest' only when name is null or undefined?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "name || 'guest'",
      "name ?? 'guest'",
      "name ? name : name",
      "name && 'guest'"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an arrow function inherit that a regular function does not?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "The surrounding scope's value of this",
      "Its own separate arguments object per call",
      "A prototype property for use with new",
      "Automatic hoisting above earlier statements in the file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a template literal?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "A backtick string that can embed expressions with ${}",
      "A quoted string that supports only one line of text",
      "A function that formats strings using printf style tokens",
      "A string that is always stored in a constant by the engine"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does array.filter(fn) return?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "The first item for which fn returns a truthy value",
      "The same array with failing items removed in place",
      "A boolean telling whether any item passed the test",
      "A new array with only the items for which fn is truthy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does export default do in an ES module?",
    "topic": "Modules and imports",
    "choices": [
      "Makes every top-level variable in the file available to all other files",
      "Runs the file immediately when any other module loads in the browser",
      "Exports the value under the literal name default, requiring braces to import it",
      "Marks one value as the module's main export, imported without braces"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you import a named export called formatDate from './utils.js'?",
    "topic": "Modules and imports",
    "choices": [
      "import formatDate from './utils.js'",
      "import { formatDate } from './utils.js'",
      "import * formatDate from './utils.js'",
      "import './utils.js' as formatDate"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must a browser ES module script use type='module'?",
    "topic": "Modules and imports",
    "choices": [
      "So the script is blocked until the page's images have finished loading",
      "So the script runs in a private thread with no access to the page",
      "So the browser compiles the script ahead of time into bytecode",
      "So the browser treats the file as a module with import and export support"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a dynamic import used for?",
    "topic": "Modules and imports",
    "choices": [
      "Re-importing a module every time its source file changes on disk",
      "Loading a module on demand at runtime, returning a promise",
      "Importing a module whose name is stored in a database column",
      "Importing several modules at once into a single combined object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does import * as utils from './utils.js' create?",
    "topic": "Modules and imports",
    "choices": [
      "A copy of the file's source text stored in a string variable",
      "A namespace object holding all of the module's named exports",
      "A default export that wraps every function in the module",
      "A live link that automatically reloads when the file is edited"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main benefit of tree shaking?",
    "topic": "Modules and imports",
    "choices": [
      "Unused exports can be removed from the final bundle",
      "Circular dependencies are resolved before the bundle runs",
      "Duplicate imports are cached so they execute only once",
      "Large files are split into smaller pieces for parallel downloads"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about ES module imports is accurate?",
    "topic": "Modules and imports",
    "choices": [
      "Imports are evaluated only when the imported value is first used",
      "Imports are copies taken once at the time of first load",
      "Imports can be reassigned freely inside the importing file",
      "Imports are live bindings to the exporting module's values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might you see 'Cannot use import statement outside a module'?",
    "topic": "Modules and imports",
    "choices": [
      "The imported file contains a syntax error on its last line",
      "The package has not been published to the registry yet",
      "The import path is missing the file's capital letters",
      "The runtime is treating the file as CommonJS, not as an ES module"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a barrel file such as index.js usually do?",
    "topic": "Modules and imports",
    "choices": [
      "Lists the packages that should be installed before the app runs",
      "Stores shared global variables that every module can modify",
      "Bundles every module in a folder into one minified file at build time",
      "Re-exports several modules so they can be imported from one path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a default export and a named export?",
    "topic": "Modules and imports",
    "choices": [
      "A default export can be imported only by the file that declares it",
      "A named export must be a function, while a default export can be any value",
      "A default export loads lazily, while named exports load immediately",
      "A module has at most one default export but can have many named exports"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a Promise represent?",
    "topic": "Promises and async/await",
    "choices": [
      "A callback that is stored until the page is closed",
      "A value that will be available later, or a failure to produce it",
      "A function that runs on a separate thread and returns instantly",
      "A guarantee that an operation will always succeed eventually"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the await keyword do inside an async function?",
    "topic": "Promises and async/await",
    "choices": [
      "Cancels the promise if it has not resolved within a second",
      "Converts the promise into a callback that runs on the next tick",
      "Pauses that function until the promise settles, without blocking",
      "Blocks the entire JavaScript thread until the promise finishes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an async function always return?",
    "topic": "Promises and async/await",
    "choices": [
      "The value of its final return statement",
      "Undefined, unless it also contains a callback",
      "A promise",
      "An array of results from every await inside it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should you handle errors from await fetch(url) inside an async function?",
    "topic": "Promises and async/await",
    "choices": [
      "Wrap the call in try/catch, or attach .catch to the returned promise",
      "Add a second await so the first failure is retried automatically",
      "Check the return value for the string 'error' after the call finishes",
      "Call process.exit so the surrounding code stops running"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Promise.all([a, b, c]) do?",
    "topic": "Promises and async/await",
    "choices": [
      "Resolves with all results, or rejects on the first failure",
      "Resolves with whichever promise finishes first and ignores the rest",
      "Runs the promises one after another, in the order listed",
      "Resolves with an array that holds only the successful results"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which choice runs two independent requests concurrently and waits for both?",
    "topic": "Promises and async/await",
    "choices": [
      "const a = fetchA().then(fetchB)",
      "const a = await fetchA(); const b = await fetchB()",
      "const [a, b] = await Promise.all([fetchA(), fetchB()])",
      "const [a, b] = await Promise.race([fetchA(), fetchB()])"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does fetch not reject on a 404 response?",
    "topic": "Promises and async/await",
    "choices": [
      "Because fetch retries failed responses before deciding to reject",
      "Because 404 responses are treated as a successful redirect by the browser",
      "Because the promise resolves only after the body is parsed as JSON",
      "Because fetch rejects only on network failure, so you must check response.ok"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Promise.race([a, b]) do?",
    "topic": "Promises and async/await",
    "choices": [
      "Settles as soon as the first promise settles, with that outcome",
      "Resolves only if both promises succeed within the same tick",
      "Cancels the slower promise and keeps the result of the faster",
      "Waits for both promises and returns whichever value is larger"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In the event loop, when do promise callbacks (microtasks) run relative to setTimeout callbacks?",
    "topic": "Promises and async/await",
    "choices": [
      "Timer callbacks always run first, since they were scheduled earlier",
      "They run at the same time on separate threads",
      "Microtasks run before the next timer callback",
      "Microtasks run only after the page has finished rendering"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does .then() return?",
    "topic": "Promises and async/await",
    "choices": [
      "A callback that must be invoked to start the chain",
      "A new promise that resolves with the callback's result",
      "The resolved value, available directly after the call",
      "The original promise, unchanged, so it can be reused"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main purpose of TypeScript?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Replacing the JavaScript runtime with a stricter engine",
      "Adding static types checked at build time and erased from output",
      "Enforcing types in the browser every time a value changes",
      "Compiling JavaScript into faster machine code for the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between an interface and a type alias for an object shape?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Interfaces are faster to compile because they skip type checking",
      "Aliases support only primitives, while interfaces support only objects",
      "Interfaces can be extended and merged, while aliases cannot be reopened",
      "Interfaces exist at runtime, while aliases are erased by the compiler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the type string | number mean?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "The value is a string that has been converted to a number",
      "The value may be either a string or a number",
      "The value must be both a string and a number at once",
      "The value is an array holding one string and one number"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a ? after a property name mean, as in interface User { age?: number }?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "The property is read-only after the object is created",
      "The property is checked only when the code runs in the browser",
      "The property is optional and may be missing",
      "The property may hold only null or undefined"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a generic such as function first<T>(items: T[]): T allow?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Accepting any value at all and turning off type checking",
      "Returning a different type from the one the caller provided",
      "One function to work with many types while keeping type information",
      "Creating a new type at runtime based on the input values"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the unknown type safer than any?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "It forces the value to be null until it is assigned",
      "It is erased at runtime, while any stays in the output",
      "You must narrow it before using it, so mistakes are caught",
      "It accepts only primitive values, so objects are rejected"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does type narrowing with typeof do in an if block?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Throws an error when the value is not the expected type",
      "Changes the value's type at runtime so it matches the check",
      "Lets the compiler treat a union value as one specific type in the block",
      "Removes the other possible types from the variable permanently"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "A type where every property of User is optional",
      "A type with only the first property of User",
      "A type that excludes properties of User which are functions",
      "A type where every property of User is read-only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does TypeScript check types while the program is running in the browser?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Yes, the browser validates every assignment against the declared type",
      "No, types are erased during compilation and not checked at runtime",
      "Only when the code is built in development mode",
      "Only for values that come back from fetch calls"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of the as const assertion on an object literal?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Properties become readonly and values keep their literal types",
      "The properties are removed if they are not used elsewhere",
      "The object is deeply frozen at runtime by the JavaScript engine",
      "The object is converted into a class with a constructor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does document.querySelector('.card') return?",
    "topic": "DOM basics",
    "choices": [
      "The text content of the first matching element",
      "An array of every element that has the card class",
      "A live collection that updates when elements are added",
      "The first matching element in the document, or null"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is event delegation?",
    "topic": "DOM basics",
    "choices": [
      "Copying a listener onto every child element in a loop",
      "Delaying an event handler until the page finishes loading",
      "Passing an event from one browser tab to another",
      "Attaching one listener to a parent to handle its children's events"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does event.preventDefault() do in a form submit handler?",
    "topic": "DOM basics",
    "choices": [
      "Stops the form fields from being validated by the browser",
      "Stops the browser's default action, such as reloading the page",
      "Stops the event from reaching any other listener on the page",
      "Removes the handler after it has run once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between textContent and innerHTML?",
    "topic": "DOM basics",
    "choices": [
      "textContent includes hidden markup, while innerHTML returns only visible text",
      "innerHTML parses its value as HTML, while textContent treats it as plain text",
      "textContent runs scripts inside the string, while innerHTML never does",
      "innerHTML is read-only, while textContent can be assigned"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is assigning untrusted user input to innerHTML risky?",
    "topic": "DOM basics",
    "choices": [
      "It can inject scripts, leading to cross-site scripting",
      "It makes the browser re-download every image on the page",
      "It slows layout because the DOM must be rebuilt twice",
      "It removes event listeners from every element in the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the DOMContentLoaded event signal?",
    "topic": "DOM basics",
    "choices": [
      "The HTML has been parsed and the DOM is ready, before images finish loading",
      "The user has scrolled to the bottom of the page",
      "A script has finished running its last statement",
      "Every resource, including images and stylesheets, has finished loading"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does element.classList.toggle('open') do?",
    "topic": "DOM basics",
    "choices": [
      "Replaces every existing class with the class named open",
      "Adds the class and waits for a CSS transition to finish",
      "Removes the class from all other elements on the page",
      "Adds the class if it is missing, otherwise removes it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method attaches a click handler to a button element?",
    "topic": "DOM basics",
    "choices": [
      "button.listen('click', handler)",
      "button.on('click', handler)",
      "button.addEventListener('click', handler)",
      "button.bind('click', handler)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the DOM?",
    "topic": "DOM basics",
    "choices": [
      "A tree-shaped, in-memory model of the page that scripts can change",
      "A copy of the page's source file stored on the server",
      "A set of CSS rules applied to every element in the page",
      "A browser setting that controls which scripts may run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do event handlers on a list of items usually use event.target?",
    "topic": "DOM basics",
    "choices": [
      "To get the position of the scrollbar at the time of the click",
      "To read the parent's computed style after the click",
      "To identify which browser tab triggered the event",
      "To find out which child element the user actually interacted with"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the dependencies section in package.json record?",
    "topic": "Tooling and package managers",
    "choices": [
      "The list of files published to the registry",
      "The licenses of every contributor to the project",
      "The commands that are run when the project is built",
      "The packages the project needs, with allowed version ranges"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the ^ in a version such as ^1.4.2 allow?",
    "topic": "Tooling and package managers",
    "choices": [
      "Downgrades to the oldest version that still works",
      "Updates to any version, including a new major release",
      "Updates to newer minor and patch versions only",
      "Updates to the exact version listed and nothing newer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of a lockfile such as package-lock.json or pnpm-lock.yaml?",
    "topic": "Tooling and package managers",
    "choices": [
      "Encrypting the dependencies so they cannot be inspected",
      "Recording the exact installed versions so installs are repeatable",
      "Listing which packages are safe from known vulnerabilities",
      "Preventing other developers from editing package.json"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between dependencies and devDependencies?",
    "topic": "Tooling and package managers",
    "choices": [
      "devDependencies are loaded by the browser before regular packages",
      "dependencies are installed only on the developer's own computer",
      "devDependencies are needed for development and builds, not runtime",
      "dependencies are removed automatically after the first install"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an npm script such as 'dev' in package.json let you do?",
    "topic": "Tooling and package managers",
    "choices": [
      "Publish the project under the name dev",
      "Install a package named dev from the registry",
      "Run a named command with npm run dev",
      "Create a branch named dev in version control"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do many teams choose pnpm over npm?",
    "topic": "Tooling and package managers",
    "choices": [
      "It runs packages in a sandbox that blocks network access",
      "It removes the need for a lockfile in the repository",
      "It keeps one shared package store, saving disk space and time",
      "It compiles TypeScript during installation automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Vite mainly provide for front-end development?",
    "topic": "Tooling and package managers",
    "choices": [
      "A fast dev server with HMR and an optimized production build",
      "A testing library that runs browser tests in parallel",
      "A package registry that hosts private modules",
      "A database layer for storing the application's data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does hot module replacement (HMR) do in a dev server?",
    "topic": "Tooling and package managers",
    "choices": [
      "Restarts the server whenever a dependency is installed",
      "Replaces the production build with the development build",
      "Reloads the entire page whenever any file in the project is saved",
      "Updates changed modules in the running page without a full reload"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is npx used for?",
    "topic": "Tooling and package managers",
    "choices": [
      "Running a package's command without installing it globally first",
      "Checking installed packages for outdated versions",
      "Publishing a package to the registry in one step",
      "Uninstalling a package and every package that depends on it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is a .gitignore entry for node_modules recommended?",
    "topic": "Tooling and package managers",
    "choices": [
      "Packages in the folder are rebuilt automatically on every commit",
      "The lockfile restores them, so committing them is unnecessary",
      "Git cannot store folders with more than one level of nesting",
      "The folder contains secrets that must stay private"
    ],
    "answerIdx": 1
  }
]
```

LAYER: nuxt-dev-2

```json
[
  {
    "stem": "What does v-if do compared with v-show?",
    "topic": "Template syntax and directives",
    "choices": [
      "v-if hides the element with CSS display none, while v-show removes it from the DOM entirely",
      "v-if adds or removes the element from the DOM, while v-show only toggles its CSS display",
      "v-if runs once at startup, while v-show re-evaluates its condition on every mouse event",
      "v-if re-renders the whole component each time, while v-show only works on top-level elements"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does v-for need a :key binding on list items?",
    "topic": "Template syntax and directives",
    "choices": [
      "It lets Vue track each item's identity, so elements are reused on reorder",
      "It tells Vue how many items to render before showing a loading indicator",
      "It sets the HTML id attribute that browsers use to jump to an item from the URL",
      "It encrypts each item's data before it is passed to the child component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does {{ message }} do in a Vue template?",
    "topic": "Template syntax and directives",
    "choices": [
      "Renders message as raw HTML so markup inside the string takes effect",
      "Declares a new reactive variable named message inside the template",
      "Renders the value of message as escaped text and updates when it changes",
      "Evaluates message once at mount time and never updates the output"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does v-bind:href='url' (or :href='url') do?",
    "topic": "Template syntax and directives",
    "choices": [
      "Listens for a change event on the element's href property",
      "Defines a new method named href on the component instance",
      "Binds the href attribute to the value of the url expression",
      "Creates a two-way link between the element and the url variable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is v-html used for, and why is it risky?",
    "topic": "Template syntax and directives",
    "choices": [
      "It inserts raw HTML, which can enable cross-site scripting with untrusted content",
      "It converts Markdown to HTML, which can remove line breaks from the source text",
      "It compiles a string into a component, which can break scoped styles in child elements",
      "It loads an HTML file from the server, which can slow the first render of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does v-on:click='save' (or @click='save') do?",
    "topic": "Template syntax and directives",
    "choices": [
      "Runs the save handler when the element is clicked",
      "Replaces the element's default click behavior permanently",
      "Calls save once while the template is first compiled",
      "Binds a variable named click to the save function"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it discouraged to use v-if and v-for on the same element?",
    "topic": "Template syntax and directives",
    "choices": [
      "Vue throws an error at build time whenever both directives appear together",
      "Their precedence is confusing; a computed list or wrapping template is clearer",
      "Only v-for is evaluated, so v-if is silently ignored on that element",
      "The element is rendered twice in the DOM, which doubles the memory used"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the v-else directive require in the template?",
    "topic": "Template syntax and directives",
    "choices": [
      "A matching v-for on the parent element above it",
      "A computed property with the same name as the condition",
      "An explicit key attribute on the element that follows it",
      "An immediately preceding sibling element with v-if or v-else-if"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the template tag with v-if do when you need to toggle several elements?",
    "topic": "Template syntax and directives",
    "choices": [
      "Caches the elements so they are not re-created when the condition flips",
      "Makes the inner elements render before the surrounding component finishes mounting",
      "Renders a real template element that browsers display as an empty block",
      "Groups the elements for the condition without adding an extra wrapper to the DOM"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does v-model on a text input do?",
    "topic": "Template syntax and directives",
    "choices": [
      "Keeps the input value and a variable in sync in both directions",
      "Sends the input value to the server whenever it changes",
      "Reads the input value once when the component mounts",
      "Prevents the user from typing anything not in the variable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does ref(0) return in Vue 3?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "A function that returns the current number each time it is called",
      "A plain number that updates the template when reassigned",
      "A reactive object whose value is read and written through .value",
      "A copy of the number that is frozen after the component mounts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In a template, how do you read a ref named count that was returned from setup?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "As {{ count }}, since top-level refs are unwrapped in templates",
      "As {{ $count }}, using the reactive prefix from the instance",
      "As {{ count.value }}, since templates never unwrap refs",
      "As {{ count() }}, since refs are functions in templates"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between ref and reactive?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "ref is evaluated lazily, while reactive is evaluated once at component creation",
      "ref values are shared across all components, while reactive objects are private to one component",
      "ref works only with objects, while reactive works only with primitives like strings",
      "ref wraps any value behind .value; reactive makes an object deeply reactive"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you destructure a reactive object, such as const { count } = state?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Vue throws a warning and refuses to render the component",
      "The whole state object is copied and frozen to prevent mutation",
      "The variable stays reactive and updates whenever state.count changes",
      "The extracted variable loses reactivity and will not update the template"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does toRefs(state) help you do?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Destructure a reactive object and keep each property reactive",
      "Freeze the state object so no property can be reassigned",
      "Convert every property of the object into a plain string",
      "Copy the state into session storage between page loads"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does Vue 3 use Proxies for reactivity?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "They keep a second copy of the data on the server",
      "They convert objects to JSON each time a property is read",
      "They let Vue detect added and deleted properties as well as changes",
      "They make objects immutable so changes are impossible to miss"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does shallowRef do?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Tracks changes to .value only, not to nested properties",
      "Creates a ref that cannot be changed after it is first set",
      "Creates a ref that is shared by every component in the app",
      "Tracks nested properties but ignores reassignment of .value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when you mutate an item inside a ref array, such as list.value.push(4)?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "The template updates only after a nextTick call is made",
      "The template updates, since the array held by the ref is reactive",
      "Vue throws an error because arrays must be replaced entirely",
      "Nothing updates, since arrays inside a ref are never tracked"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of nextTick?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "Delaying a function by one second to avoid flicker",
      "Waiting until Vue has applied pending DOM updates",
      "Running code on a background thread after the page loads",
      "Cancelling the next reactive update that was queued"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about reactive() is accurate?",
    "topic": "Reactivity with ref and reactive",
    "choices": [
      "It returns a new copy that never affects the original object",
      "It works on any value, including numbers and strings",
      "It works on objects only and returns a Proxy of the original",
      "It is deprecated in Vue 3 and replaced entirely by ref"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a parent pass data into a child component?",
    "topic": "Components and props",
    "choices": [
      "By calling a method on the child's instance from the parent",
      "By emitting an event from the parent that the child listens to",
      "Through a global store that the child reads automatically",
      "Through props declared on the child and bound in the parent's template"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does defineProps do in script setup?",
    "topic": "Components and props",
    "choices": [
      "Creates a ref for each prop and registers it with the router",
      "Imports props from a file in the project's props folder",
      "Passes the component's data to its parent",
      "Declares which props the component accepts, with optional types"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why shouldn't a child component mutate a prop directly?",
    "topic": "Components and props",
    "choices": [
      "Props are copied for each render, so the change is lost on the next tick",
      "Mutating a prop deletes it from the parent's state permanently",
      "Props are frozen by the browser, so mutation always throws an error",
      "Props flow one way, so mutating them hides where data changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you give a prop a default value in a component?",
    "topic": "Components and props",
    "choices": [
      "By assigning a value to the prop inside the template",
      "Using the withDefaults helper or a default in the props definition",
      "By declaring a computed property with the same name as the prop",
      "By adding a default attribute to the component's root element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a slot do in a component?",
    "topic": "Components and props",
    "choices": [
      "Defines a CSS rule that applies to the component's children",
      "Lets the parent supply template content that the child renders",
      "Stores a value that the parent and child share through events",
      "Reserves memory for child components before they mount"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are scoped slots used for?",
    "topic": "Components and props",
    "choices": [
      "Rendering slot content only after the parent is unmounted",
      "Restricting a slot so only one parent component can fill it",
      "Letting the child pass data back into the parent's slot content",
      "Applying scoped CSS to the content placed inside a slot"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the scoped attribute on a style block do?",
    "topic": "Components and props",
    "choices": [
      "Limits the styles to the current component's elements",
      "Removes unused selectors from the stylesheet during development",
      "Applies the styles to every component in the application",
      "Loads the styles only after the page becomes visible"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the best use of provide and inject?",
    "topic": "Components and props",
    "choices": [
      "Replacing the router for navigation between components",
      "Sending events upward from a child to the nearest parent",
      "Sharing a value between two unrelated browser tabs",
      "Passing data deep down a component tree without threading props"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a dynamic component, <component :is='view'>, do?",
    "topic": "Components and props",
    "choices": [
      "Creates a new component at runtime from a template string",
      "Renders whichever component the view value points to",
      "Registers the component globally for the whole application",
      "Mounts the component twice so the animation can run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why define props with explicit types?",
    "topic": "Components and props",
    "choices": [
      "The types stop invalid props from ever reaching the child at runtime",
      "Vue warns about wrong types in development and the API is documented",
      "The types are required for the component to render",
      "The types make the component load faster in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a child component tell its parent something happened?",
    "topic": "Events and v-model",
    "choices": [
      "By writing to the parent's variables directly through a shared reference",
      "By emitting an event that the parent listens for with @event-name",
      "By changing a prop, which the parent then watches",
      "By calling the parent's methods using the global window object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does defineEmits do in script setup?",
    "topic": "Events and v-model",
    "choices": [
      "Lists the props that the component sends to its children",
      "Creates a global event bus shared with other components",
      "Registers every DOM event listener found in the template",
      "Declares the events the component can emit, optionally with types"
    ],
    "answerIdx": 3
  },
  {
    "stem": "On a custom component, what does v-model use by default in Vue 3?",
    "topic": "Events and v-model",
    "choices": [
      "A modelValue prop and an update:modelValue event",
      "A model prop and a change event",
      "A value prop and an input event",
      "A v-model attribute stored on the root element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the .prevent modifier do in @submit.prevent='save'?",
    "topic": "Events and v-model",
    "choices": [
      "Calls event.preventDefault() before running the handler",
      "Blocks the event from reaching child components",
      "Stops the handler from running more than once",
      "Delays the handler until the form is validated"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does v-model.trim do on an input?",
    "topic": "Events and v-model",
    "choices": [
      "Limits the input to a maximum number of characters",
      "Removes leading and trailing whitespace from the bound value",
      "Converts the value to a number before assigning it",
      "Prevents the user from typing spaces anywhere in the text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the .lazy modifier on v-model change?",
    "topic": "Events and v-model",
    "choices": [
      "It syncs on the change event instead of every input event",
      "It loads the component only when it scrolls into view",
      "It prevents the model from updating when the field is empty",
      "It delays rendering of the input until the page is idle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can one component have multiple v-models in Vue 3?",
    "topic": "Events and v-model",
    "choices": [
      "By repeating the same v-model attribute on the element",
      "It is not possible; a component can have only one v-model",
      "By wrapping the component in a template with several refs",
      "By naming each one, such as v-model:title and v-model:author"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the .once modifier on an event listener do?",
    "topic": "Events and v-model",
    "choices": [
      "Prevents the event from firing again until the page is reloaded",
      "Waits until all other listeners have completed before running",
      "Runs the handler a single time, then removes it",
      "Calls the handler only when the event happens the first time on a given element type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A checkbox group uses v-model with the same array on several checkboxes. What does the array hold?",
    "topic": "Events and v-model",
    "choices": [
      "The ids of every checkbox in the group, checked or not",
      "The values of the checkboxes that are currently checked",
      "Booleans indicating the state of each checkbox",
      "The labels of the unchecked checkboxes only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the role of $event in @input='update($event)'?",
    "topic": "Events and v-model",
    "choices": [
      "It passes the previous value of the input",
      "It passes a new event created by Vue with the input's data",
      "It passes the parent component's emitted payload",
      "It passes the native event object to the handler"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a computed property do?",
    "topic": "Computed and watchers",
    "choices": [
      "Watches a value and runs a side effect when it changes",
      "Runs a function every time the component renders, regardless of dependencies",
      "Caches a derived value and recalculates only when its dependencies change",
      "Stores a value that can be modified directly from the template"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you use a computed property instead of a method in a template?",
    "topic": "Computed and watchers",
    "choices": [
      "When the function must run on every render",
      "When the logic performs an API call as soon as the component loads",
      "When you need to pass different arguments each time you call it",
      "When the result depends on reactive state and benefits from caching"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is the best use of watch?",
    "topic": "Computed and watchers",
    "choices": [
      "Registering a child component for conditional rendering",
      "Declaring a prop's type and default value",
      "Deriving a value from other values for display in the template",
      "Running a side effect, such as an API call, when a value changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does watchEffect differ from watch?",
    "topic": "Computed and watchers",
    "choices": [
      "watchEffect runs at once and tracks every reactive value it reads",
      "watchEffect gives you the old and new value as arguments",
      "watchEffect runs only after the first change of a single named source",
      "watchEffect works only on computed properties, while watch works on refs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the { immediate: true } option do for a watcher?",
    "topic": "Computed and watchers",
    "choices": [
      "Makes the callback run before every other watcher in the app",
      "Runs the callback on the server instead of in the browser",
      "Runs the callback right away, not only after the first change",
      "Stops the watcher after its first execution"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does { deep: true } do for a watcher on an object?",
    "topic": "Computed and watchers",
    "choices": [
      "Stops tracking the object after its first mutation",
      "Creates a deep copy of the object for the callback",
      "Triggers the callback when nested properties change",
      "Makes the watcher read the object from the previous render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Should a computed property have side effects such as changing other state?",
    "topic": "Computed and watchers",
    "choices": [
      "No, because Vue blocks any assignment inside computed",
      "Yes, but only when the computed has a setter defined",
      "Yes, side effects are the main purpose of computed properties",
      "No, it should be pure and only derive a value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a writable computed need?",
    "topic": "Computed and watchers",
    "choices": [
      "A watcher that updates the dependency",
      "Both a get and a set function",
      "A ref returned from setup with the same name",
      "A prop that is passed down from the parent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the callback signature of watch(source, callback)?",
    "topic": "Computed and watchers",
    "choices": [
      "callback(oldValue, newValue)",
      "callback(source)",
      "callback(newValue, oldValue)",
      "callback(event, value)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when a watcher is created inside setup?",
    "topic": "Computed and watchers",
    "choices": [
      "It runs only on the server during server-side rendering",
      "It keeps running after the component unmounts, which can leak memory",
      "Vue stops it automatically when the component unmounts",
      "It must be stopped manually with a returned function in every case"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the Composition API?",
    "topic": "Composition API and composables",
    "choices": [
      "A build plugin that compiles components into web components",
      "A way to organize component logic with functions like ref and computed",
      "A replacement for templates that renders components with JavaScript only",
      "A router feature for combining several pages into one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does <script setup> do?",
    "topic": "Composition API and composables",
    "choices": [
      "Executes the script once on the server before any component mounts",
      "Declares the component's name and registers it globally",
      "Disables reactivity so the script runs faster",
      "A compile-time shorthand that exposes top-level bindings to the template"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a composable?",
    "topic": "Composition API and composables",
    "choices": [
      "A function that uses reactivity APIs to encapsulate reusable stateful logic",
      "A component that renders no template and only contains styles",
      "A directive that can be attached to any element",
      "A plugin that is registered globally in the application entry file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "By convention, how are composables named?",
    "topic": "Composition API and composables",
    "choices": [
      "With a use prefix, such as useCounter",
      "With a Vue suffix, such as counterVue",
      "With a lowercase name matching the file's extension",
      "With a compose prefix, such as composeCounter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which lifecycle hook runs after the component's DOM has been inserted?",
    "topic": "Composition API and composables",
    "choices": [
      "onCreated",
      "onMounted",
      "onRendered",
      "onBeforeMount"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good reason to extract logic into a composable?",
    "topic": "Composition API and composables",
    "choices": [
      "Keeping the component's CSS separate from the markup",
      "Sharing the same reactive logic between several components",
      "Hiding the logic from the browser's developer tools",
      "Making the component's template render before its script runs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does onUnmounted help you do?",
    "topic": "Composition API and composables",
    "choices": [
      "Reset every ref in the component to its starting value",
      "Preload the next route while the component is still visible",
      "Cleaning up timers, listeners or subscriptions on removal",
      "Cancel all in-flight network requests in the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a composable that adds a window event listener do?",
    "topic": "Composition API and composables",
    "choices": [
      "Add the listener again every time the component updates",
      "Leave the listener in place for the life of the page",
      "Remove the listener in onUnmounted to avoid leaks",
      "Store the listener on the router so it is cleaned up there"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean when a composable returns refs and functions?",
    "topic": "Composition API and composables",
    "choices": [
      "The calling component can use them, and reactivity is preserved",
      "The refs are converted to plain values on return",
      "The component loses reactivity until it calls a refresh function",
      "Only the functions are exposed, while the refs stay private"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you access the props object inside script setup without destructuring losing reactivity?",
    "topic": "Composition API and composables",
    "choices": [
      "Copy the props into plain variables at the top of the script",
      "Use this.$props from inside the setup function",
      "Use the object returned by defineProps, or toRefs",
      "Read props from the global window object"
    ],
    "answerIdx": 2
  }
]
```

LAYER: nuxt-dev-3

```json
[
  {
    "stem": "What is the role of the pages directory in a Nuxt project?",
    "topic": "Project structure",
    "choices": [
      "It lists the npm scripts used to build the application",
      "It stores server API handlers that run on the Nitro engine",
      "It holds reusable components that are registered globally by name",
      "Each Vue file in it becomes a route automatically"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which directory holds components that Nuxt auto-imports into templates?",
    "topic": "Project structure",
    "choices": [
      "components",
      "composables",
      "assets",
      "plugins"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you place a file that exposes a reusable function such as useCart for auto-import?",
    "topic": "Project structure",
    "choices": [
      "In the public directory, so browsers can request it directly",
      "In the middleware directory, so it runs before navigation",
      "In the composables directory",
      "In the layouts directory, next to the default layout"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the public directory for?",
    "topic": "Project structure",
    "choices": [
      "Static files served as-is from the site root, such as favicon.ico",
      "Source assets that the bundler hashes and processes during the build",
      "Server code that is shared between API routes and pages",
      "Environment variables that are exposed to the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the assets directory differ from the public directory?",
    "topic": "Project structure",
    "choices": [
      "Assets hold TypeScript types, while public files hold images",
      "Assets are loaded on the server only, while public files load in the browser only",
      "Assets are served only to logged-in users, while public files are open to everyone",
      "Assets are processed by the bundler, while public files are copied untouched"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the server directory contain?",
    "topic": "Project structure",
    "choices": [
      "API routes, middleware and utilities that run on the Nitro server",
      "Client-side components that are hydrated after the first render",
      "Test files that run during the continuous integration step",
      "Build configuration that Vite reads before bundling"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the .nuxt directory?",
    "topic": "Project structure",
    "choices": [
      "A cache of installed npm packages shared across projects",
      "Hand-written configuration that overrides nuxt.config.ts at runtime",
      "Generated files such as types and build output; do not edit or commit them",
      "The folder where static pages are written after deployment"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the app.vue file?",
    "topic": "Project structure",
    "choices": [
      "A test harness that mounts components during development",
      "A layout that is applied only to the home page",
      "The root component of the application, rendered for every route",
      "A configuration file that lists the pages in the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command starts the Nuxt development server with hot reload?",
    "topic": "Project structure",
    "choices": [
      "nuxt preview",
      "nuxt dev",
      "nuxt build",
      "nuxt generate"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the nuxt.config.ts file define?",
    "topic": "Project structure",
    "choices": [
      "The list of dependencies installed from the registry",
      "A set of routes that replace the pages directory",
      "Project-level settings such as modules, runtime config and build options",
      "The visual theme applied to the components in a project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A file at pages/about.vue creates which route?",
    "topic": "Pages and file-based routing",
    "choices": [
      "/index/about",
      "/about",
      "/pages/about",
      "/about.vue"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does pages/index.vue map to?",
    "topic": "Pages and file-based routing",
    "choices": [
      "A route named index at /index",
      "A 404 fallback for unknown paths",
      "The first page found in alphabetical order",
      "The root route /"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you create a dynamic route that matches /users/42?",
    "topic": "Pages and file-based routing",
    "choices": [
      "Name the file pages/users/{id}.vue",
      "Name the file pages/users/[id].vue",
      "Name the file pages/users/:id.vue",
      "Name the file pages/users/_id.vue"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read a dynamic route parameter in a page component?",
    "topic": "Pages and file-based routing",
    "choices": [
      "useRouter().query.id",
      "this.$params.id",
      "window.location.id",
      "useRoute().params.id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a catch-all file named [...slug].vue match?",
    "topic": "Pages and file-based routing",
    "choices": [
      "Only the root path when it has no other page",
      "Any path that no other route matches, however many segments it has",
      "Query strings that contain a slug parameter",
      "Only a path with exactly one extra segment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you build nested routes in Nuxt?",
    "topic": "Pages and file-based routing",
    "choices": [
      "Use a custom router file that lists every parent and child route",
      "A parent page plus a same-named folder, with children shown by NuxtPage",
      "Prefix child file names with the parent route's name and a dash",
      "Declare a children array inside nuxt.config.ts for each parent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does <NuxtPage /> render?",
    "topic": "Pages and file-based routing",
    "choices": [
      "A list of every page in the pages directory",
      "The page component for the current route, or a nested child",
      "A navigation menu built from the file names",
      "A loading indicator while a route is being fetched"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does definePageMeta do in a page component?",
    "topic": "Pages and file-based routing",
    "choices": [
      "Defines the HTML meta tags that appear in the document head",
      "Route-level options such as layout and middleware for that page",
      "Declares which props the page accepts from its parent",
      "Registers the page in the sitemap used by search engines"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an optional parameter file such as [[slug]].vue allow?",
    "topic": "Pages and file-based routing",
    "choices": [
      "The route to match with or without the parameter",
      "The route to match only when the parameter is a number",
      "The parameter to be passed to the server as a header",
      "The page to load lazily after the first render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What generates a route's name by default?",
    "topic": "Pages and file-based routing",
    "choices": [
      "The order in which pages were created",
      "The file path, with segments joined by dashes",
      "A random identifier created at build time",
      "The component's name property"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a layout in Nuxt?",
    "topic": "Layouts",
    "choices": [
      "A wrapper component, like a header and footer, shared by pages",
      "A CSS file that sets the grid used by every page",
      "A server template that is rendered before the page loads",
      "A configuration entry that controls the spacing of components"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is the default layout stored?",
    "topic": "Layouts",
    "choices": [
      "app/layout.vue",
      "pages/default.vue",
      "components/Layout.vue",
      "layouts/default.vue"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which element must a layout include to show the page's content?",
    "topic": "Layouts",
    "choices": [
      "<content />",
      "<router-view />",
      "<NuxtPage />",
      "<slot />"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a page choose a different layout?",
    "topic": "Layouts",
    "choices": [
      "Call definePageMeta({ layout: 'admin' }) in the page",
      "Import the layout component and wrap the page manually",
      "Rename the page file with an admin prefix",
      "Add a layout attribute to the page's template tag"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does Nuxt apply the default layout?",
    "topic": "Layouts",
    "choices": [
      "Only when the layout is imported inside every page manually",
      "Whenever a file named default.vue exists, even if app.vue omits NuxtLayout",
      "When the app uses <NuxtLayout /> in app.vue and the page sets no other layout",
      "Only on the home page, unless another layout is set globally"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you switch layouts at runtime, for example after login?",
    "topic": "Layouts",
    "choices": [
      "Reload the page with a layout query parameter",
      "Delete the old layout file and create a new one",
      "Edit nuxt.config.ts and restart the server",
      "Use setPageLayout('dashboard')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use layouts instead of repeating a header in every page?",
    "topic": "Layouts",
    "choices": [
      "Layouts load faster because they skip hydration entirely",
      "The shared structure lives in one place and persists across pages",
      "Layouts are required for server-side rendering to work",
      "Layouts stop the header from being included in the HTML"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a layout and a component used as a wrapper?",
    "topic": "Layouts",
    "choices": [
      "Layouts are rendered only on the server, while components render in the browser",
      "Layouts are chosen per page by name through Nuxt's layout system",
      "Layouts cannot contain slots, while wrapper components can",
      "Layouts are the only place where scoped styles are allowed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tag in app.vue renders the active layout around the current page?",
    "topic": "Layouts",
    "choices": [
      "<NuxtLoadingIndicator>",
      "<NuxtLayout>",
      "<NuxtWelcome>",
      "<NuxtPage>"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the layout: false page meta option do?",
    "topic": "Layouts",
    "choices": [
      "Renders the page without any layout",
      "Loads the layout lazily after the page",
      "Hides the layout on mobile screens only",
      "Removes the page from the router"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use <NuxtLink> instead of a plain <a> tag for internal links?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "It blocks search engines from following the link",
      "It makes the link work offline without a service worker",
      "It navigates on the client without a reload and can prefetch the target",
      "It always opens the link in a new browser tab"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which prop sets the destination of a NuxtLink?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "href only",
      "to",
      "route",
      "path"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does NuxtLink do when a link scrolls into the viewport in production?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "Loads the page in a hidden iframe",
      "Marks the link as visited in the history",
      "Prefetches the linked page's code and payload",
      "Immediately navigates to the linked page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you navigate to a route from code?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "redirect('/dashboard')",
      "router.visit('/dashboard')",
      "window.go('/dashboard')",
      "navigateTo('/dashboard')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which class does NuxtLink add to the link that matches the current route?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "active-page on every link in the navigation",
      "router-link-active, plus router-link-exact-active when it matches exactly",
      "selected, added only for hash links",
      "current-route, applied by the layout"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should you link to an external site with NuxtLink?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "Use a hash prefix so the router ignores the link",
      "It cannot link to external sites at all",
      "Use a separate ExternalLink component from the router package",
      "Pass the full URL to the to prop, optionally with target='_blank'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the replace prop on NuxtLink do?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "Replaces the current history entry rather than adding a new one",
      "Replaces the link text with the page title",
      "Replaces the page's query string with an empty one",
      "Replaces the previous layout with a new layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass a query string with navigateTo?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "navigateTo('/search', { params: 'q=nuxt' })",
      "navigateTo('/search', 'q=nuxt')",
      "navigateTo('/search').with({ q: 'nuxt' })",
      "navigateTo({ path: '/search', query: { q: 'nuxt' } })"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does navigateTo with { external: true } allow?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "Loading the page from a CDN cache",
      "Skipping route middleware for that navigation",
      "Navigating to a URL outside the application",
      "Opening the page in an iframe"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to a page's state when a user navigates with NuxtLink?",
    "topic": "Navigation with NuxtLink",
    "choices": [
      "The server re-renders the whole app and sends it again",
      "All composables are re-created from the start",
      "The app stays loaded, so client state can persist between pages",
      "The browser reloads and clears every variable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Nuxt's auto-import feature do?",
    "topic": "Auto-imports",
    "choices": [
      "Makes components, composables and Vue APIs usable without imports",
      "Rewrites import paths when a file is renamed",
      "Imports every file in the project into every page",
      "Installs missing npm packages whenever an import fails"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of these is available without an import in a Nuxt page?",
    "topic": "Auto-imports",
    "choices": [
      "ref and computed from Vue",
      "Any function exported from node_modules",
      "Functions from files in the assets directory",
      "Every function in the server directory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Nuxt name an auto-imported component stored at components/base/Button.vue?",
    "topic": "Auto-imports",
    "choices": [
      "BaseButton",
      "BaseButtonComponent",
      "Button",
      "base-button-vue"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you load a component lazily with auto-imports?",
    "topic": "Auto-imports",
    "choices": [
      "Move it into a folder named lazy",
      "Add the lazy attribute to the page's template tag",
      "Prefix its name with Lazy, such as <LazyChart />",
      "Wrap it in a call to loadComponent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does Nuxt scan for composables to auto-import?",
    "topic": "Auto-imports",
    "choices": [
      "The composables directory, and utils for plain functions",
      "Only files whose names start with use",
      "Only the app.vue file and its direct imports",
      "The whole project folder, including node_modules"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might you still import something explicitly in a Nuxt file?",
    "topic": "Auto-imports",
    "choices": [
      "To make the source clear, or to import from a package that isn't auto-imported",
      "Because the compiler ignores auto-imports in TypeScript files",
      "Because auto-imports break server-side rendering",
      "Because imports are required for hot reload to work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which file does Nuxt generate to describe auto-imported names for TypeScript?",
    "topic": "Auto-imports",
    "choices": [
      "Type declaration files inside the .nuxt directory",
      "A custom d.ts file you must write yourself",
      "A lockfile at the project root",
      "A JSON file in the public directory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common downside of relying heavily on auto-imports?",
    "topic": "Auto-imports",
    "choices": [
      "It turns off tree shaking for the production build output",
      "It forces every composable to be bundled into every page of the app",
      "It disables TypeScript type checking for the whole project",
      "It can hide where a name comes from, making code harder to trace"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you auto-import a function from your own utils directory?",
    "topic": "Auto-imports",
    "choices": [
      "Add it to the package.json exports field",
      "Declare it as a global on window",
      "Export it from a file in utils and call it directly",
      "Register it in nuxt.config.ts under a components list"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Do auto-imports make bundles larger because everything is included?",
    "topic": "Auto-imports",
    "choices": [
      "Yes, every auto-import is added to every page",
      "Yes, but only in development mode",
      "No, because auto-imports are loaded from a CDN",
      "No, only the imports that are actually used are bundled"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you register Nuxt modules and global options?",
    "topic": "App configuration",
    "choices": [
      "package-lock.json",
      "app.vue",
      "nuxt.config.ts",
      "tsconfig.json only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does app.config.ts hold?",
    "topic": "App configuration",
    "choices": [
      "The list of routes for the application",
      "Settings for the Node version used on deployment",
      "Secret keys for server-only APIs",
      "Reactive configuration that can be read and updated in the browser at runtime"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does runtimeConfig differ from app.config?",
    "topic": "App configuration",
    "choices": [
      "runtimeConfig is bundled into the client and cannot be overridden",
      "runtimeConfig can't contain nested objects",
      "runtimeConfig reads environment variables and can keep secrets server-side",
      "runtimeConfig runs only during the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are runtime config values exposed to the browser?",
    "topic": "App configuration",
    "choices": [
      "All keys at the top level are exposed",
      "Keys with a NUXT_ prefix in the file name",
      "Only keys placed under runtimeConfig.public",
      "Only keys that start with an underscore"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which environment variable overrides runtimeConfig.apiSecret at runtime?",
    "topic": "App configuration",
    "choices": [
      "API_SECRET_NUXT",
      "NUXT_RUNTIME_API_SECRET",
      "VITE_API_SECRET",
      "NUXT_API_SECRET"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read runtime config inside a component?",
    "topic": "App configuration",
    "choices": [
      "useRuntimeConfig()",
      "import config from 'nuxt.config.ts'",
      "process.env.NUXT",
      "this.$config.get()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you set global head options such as the site title in nuxt.config.ts?",
    "topic": "App configuration",
    "choices": [
      "Using a plugin that edits document.title only",
      "Using app.head with a title and meta entries",
      "Using a title field at the top level of package.json",
      "Using a head.vue file in the root"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the modules array in nuxt.config.ts accept?",
    "topic": "App configuration",
    "choices": [
      "Local folders that contain Vue components",
      "Environment names for deployment",
      "Names of pages to prerender",
      "Packages that extend Nuxt, such as @nuxt/image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use defineNuxtConfig?",
    "topic": "App configuration",
    "choices": [
      "It makes the config load from a remote server",
      "It provides type support and autocompletion for the config",
      "It is required for the dev server to start",
      "It encrypts secret values in the file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does ssr: false in nuxt.config.ts do?",
    "topic": "App configuration",
    "choices": [
      "Prevents the app from using any composables",
      "Disables API routes in the server directory",
      "Turns off server-side rendering, so the app renders only in the browser",
      "Removes the need for hydration and keeps server rendering"
    ],
    "answerIdx": 2
  }
]
```

LAYER: nuxt-dev-4

```json
[
  {
    "stem": "What does useFetch return that makes it convenient in pages?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "A promise that must be awaited inside a lifecycle hook to read data",
      "Reactive refs such as data, error and status, plus a refresh function",
      "A plain JSON value that is fetched again on every render of the page",
      "A stream object that has to be closed manually when the page unmounts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why prefer useFetch over calling $fetch directly in a page's setup?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "useFetch automatically retries the request until it succeeds",
      "useFetch avoids fetching twice, once on the server and again on the client",
      "useFetch runs only in the browser, which keeps the server light",
      "useFetch skips the network entirely and reads every response from the browser cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the relationship between useFetch and useAsyncData?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "useAsyncData is a wrapper that adds routing to useFetch",
      "useFetch replaces useAsyncData, which has now been removed from Nuxt entirely",
      "They are unrelated and cannot be used together in one app",
      "useFetch is a convenience wrapper around useAsyncData and $fetch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is useAsyncData a better choice than useFetch?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "When the request must run only on the server and never on the client",
      "When the response is guaranteed to be smaller than one kilobyte",
      "When the page has no template and renders nothing to the DOM",
      "When the data comes from a CMS client or several combined calls"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the key argument of useAsyncData do?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "Identifies the request so results are cached and de-duplicated",
      "Sets the HTTP header that carries the authorization token for the request",
      "Chooses which server in the cluster handles the request",
      "Encrypts the response before it is stored in the payload"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the lazy option do for useFetch?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "Delays the request until the user clicks a button",
      "Skips the request when the user is on a slow connection",
      "Lets navigation finish at once and fills in data later",
      "Fetches the data only once per day and stores it locally"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the transform option on useFetch let you do?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "Reshape the response before it is stored in data",
      "Convert the request body into form data",
      "Change the page's layout automatically based on the response status",
      "Switch the HTTP method for retries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can useFetch re-run when a reactive value changes, such as a search term?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "Pass a ref or computed in the URL, or use the watch option",
      "Recreate the component with a new key each time",
      "Call location.reload after every change to the search term in the input",
      "Wrap the call in setInterval so it runs repeatedly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the server: false option do for useFetch?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "Marks the response so it is never cached",
      "Sends the request to a different server than the one configured by default",
      "Prevents the request from reading cookies",
      "Skips the request on the server so it runs only in the browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In which situation is $fetch the right tool?",
    "topic": "useFetch and useAsyncData",
    "choices": [
      "In nuxt.config.ts to fetch routes before building",
      "Inside the template to show a list on first render",
      "Inside an event handler, such as submitting a form",
      "Directly in setup to load the initial page data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does server-side rendering (SSR) send to the browser first?",
    "topic": "Server-side rendering",
    "choices": [
      "HTML for the requested page, which is then made interactive by hydration",
      "A screenshot of the page for crawlers, replaced when scripts load",
      "An empty HTML shell and a bundle that builds the whole page in the browser",
      "A JSON payload that the browser converts into a page after loading"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is hydration?",
    "topic": "Server-side rendering",
    "choices": [
      "The server filling in database values for the page before sending it",
      "The process of compressing HTML before it is sent",
      "A cache that stores rendered HTML for every visitor",
      "The browser attaching Vue's reactivity to the server-rendered HTML"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What causes a hydration mismatch warning?",
    "topic": "Server-side rendering",
    "choices": [
      "The server is slower to respond than the client's hydration timeout allows",
      "The page has more than one root element in the template",
      "The HTML rendered on the server differs from what the client renders",
      "The browser blocks cookies on the first request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which code is likely to cause a hydration mismatch?",
    "topic": "Server-side rendering",
    "choices": [
      "Rendering Math.random() or the current time in the template",
      "Using v-for with a stable key on a list that is fetched on the server",
      "Importing a CSS file in a component",
      "Calling useFetch inside setup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you render a component only in the browser?",
    "topic": "Server-side rendering",
    "choices": [
      "Wrap it in <ClientOnly>",
      "Place it inside the server directory",
      "Add a server attribute to the component",
      "Rename the file with a .client.js suffix only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is SSR helpful for SEO and perceived speed?",
    "topic": "Server-side rendering",
    "choices": [
      "Users and crawlers get ready-made HTML without waiting for scripts",
      "SSR removes the need for JavaScript from the page entirely",
      "The server compresses images more aggressively than a CDN would",
      "SSR stores every page in the browser so it can load offline"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the payload in a Nuxt SSR response?",
    "topic": "Server-side rendering",
    "choices": [
      "A list of the components that were used while rendering the page",
      "Data fetched on the server and sent so the client skips refetching",
      "The compressed bundle of all JavaScript on the site",
      "The response body that an API route sends to other services"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the .client.vue suffix on a component do?",
    "topic": "Server-side rendering",
    "choices": [
      "Marks the component as required on the server",
      "Runs the component in a separate worker thread",
      "Prevents the component from ever being imported",
      "Renders that component only in the browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which global is only available in the browser and must not be touched during server rendering?",
    "topic": "Server-side rendering",
    "choices": [
      "window",
      "console",
      "Promise",
      "process.env"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should browser-only code that touches window run to be safe for SSR?",
    "topic": "Server-side rendering",
    "choices": [
      "At the top level of the script, before setup runs",
      "Inside onMounted or behind import.meta.client",
      "Inside the template as an inline expression",
      "Inside a computed property that reads window directly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does static site generation (SSG) do?",
    "topic": "Static generation",
    "choices": [
      "Builds the application into a single JavaScript file",
      "Renders every route to HTML files at build time",
      "Generates routes dynamically in the browser from a JSON file",
      "Renders each route on the server whenever it is requested"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command builds a fully prerendered Nuxt site?",
    "topic": "Static generation",
    "choices": [
      "nuxt dev",
      "nuxt analyze",
      "nuxt typecheck",
      "nuxt generate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you prerender only certain routes while leaving others on the server?",
    "topic": "Static generation",
    "choices": [
      "List them in package.json under a prerender key",
      "Move those pages into a folder named static",
      "Use routeRules with prerender: true for those paths",
      "Add a static attribute to the NuxtLink pointing to them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of purely static output for frequently changing content?",
    "topic": "Static generation",
    "choices": [
      "Static files cannot contain images or styles",
      "The site must be rebuilt to show new data",
      "The pages become impossible to cache on a CDN",
      "Visitors must log in to view prerendered pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Nuxt discover links to prerender when generating a site?",
    "topic": "Static generation",
    "choices": [
      "It guesses routes from the names of components",
      "It asks the database for the full list of routes",
      "It reads every file in the project's public directory and serves them",
      "It follows links found in the rendered pages from the entry routes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you tell Nuxt about dynamic routes that the crawler can't reach by links?",
    "topic": "Static generation",
    "choices": [
      "Add them to the sitemap only",
      "Declare them in the layout so Nuxt notices them",
      "Create an empty file for each path in the public directory",
      "Add them to nitro.prerender.routes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is incremental static regeneration (ISR) in Nuxt route rules?",
    "topic": "Static generation",
    "choices": [
      "Rebuilding the whole site from scratch every time that any source file changes",
      "Serving a prerendered page that is regenerated in the background",
      "Updating the page in the browser using a websocket",
      "Deleting old pages from the server when disk space runs low"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main advantage of serving prerendered HTML from a CDN?",
    "topic": "Static generation",
    "choices": [
      "Visitors receive personalized content in the first response",
      "The server can run without any storage",
      "Pages load quickly and the origin server does little work",
      "Pages are always up to date without any rebuild"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ssr: false combined with nuxt generate produce?",
    "topic": "Static generation",
    "choices": [
      "A server bundle that must run on Node",
      "A static site without any JavaScript",
      "A single-page app shell that renders in the browser",
      "A set of fully prerendered HTML pages for every route in the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which setting is the better fit for a mostly static marketing site with a few dynamic pages?",
    "topic": "Static generation",
    "choices": [
      "Prerendering only the home page and hiding the rest",
      "Hybrid rendering with routeRules per route",
      "Server rendering with no caching at all",
      "Client-side rendering for every route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you refetch data from useFetch after the user clicks a button?",
    "topic": "Caching and refresh",
    "choices": [
      "Call useFetch again in the click handler",
      "Reload the browser window so that the whole page requests data again",
      "Call the refresh function returned from useFetch",
      "Change the component's key attribute"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does refreshNuxtData do?",
    "topic": "Caching and refresh",
    "choices": [
      "Clears the browser's HTTP cache for the whole site, for every visitor",
      "Restarts the Nitro server process",
      "Re-runs the fetching calls for the given keys, or all keys",
      "Rebuilds the production bundle on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does clearNuxtData do?",
    "topic": "Caching and refresh",
    "choices": [
      "Resets the router to the home page",
      "Deletes the matching rows from the database that the cache keys refer to",
      "Clears all cookies in the browser",
      "Removes cached data for the given keys so the next use refetches"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the effect of two components calling useFetch with the same key?",
    "topic": "Caching and refresh",
    "choices": [
      "Nuxt throws an error because keys must be unique per app",
      "The second call overwrites the first one and cancels the request in flight",
      "They share one request and result instead of fetching twice",
      "They fetch twice and return different data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the getCachedData option allow?",
    "topic": "Caching and refresh",
    "choices": [
      "Returning data fetched earlier instead of sending a request",
      "Reading data that is stored in a cookie on the visitor's browser only",
      "Fetching data from the server's file system",
      "Skipping SSR for the current route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might navigating back to a page show data that is a few minutes old?",
    "topic": "Caching and refresh",
    "choices": [
      "The payload or cached data was reused instead of refetching",
      "The visitor's browser has disabled JavaScript for the page they opened",
      "The server clock is running behind the client",
      "The database is replicated to a second region"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you poll for fresh data every 30 seconds on a page?",
    "topic": "Caching and refresh",
    "choices": [
      "Set a cache-control header that expires in 30 seconds",
      "Call refresh on an interval and clear it when unmounting",
      "Add a polling attribute to the template tag so Nuxt refreshes the data",
      "Use nuxt.config.ts to set a global refresh rate"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the deep option on useFetch?",
    "topic": "Caching and refresh",
    "choices": [
      "Fetches nested URLs that are found inside the response and merges them",
      "Caches the response on disk for later visits",
      "Retries the request through several proxies",
      "Controls whether data is deeply reactive, trading convenience for speed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the default option on useFetch provide?",
    "topic": "Caching and refresh",
    "choices": [
      "The default URL that is used whenever no other URL is supplied",
      "A default cache lifetime for the whole application",
      "A fallback value for data before the request completes",
      "A default HTTP method for all later calls"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the status value 'pending' commonly used for?",
    "topic": "Caching and refresh",
    "choices": [
      "Marking that the request was cancelled by the user before it finished",
      "Signalling that the server is shutting down",
      "Indicating the response has been cached on disk",
      "Showing a loading state while the request is in flight"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you find an error from useFetch?",
    "topic": "Error handling",
    "choices": [
      "In the error ref that useFetch returns",
      "In the browser's console only",
      "Thrown as an exception that crashes the server",
      "In a global errors array on the window object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does createError do in Nuxt?",
    "topic": "Error handling",
    "choices": [
      "Turns a 500 response into a 200",
      "Creates an error with a status code and message Nuxt can handle",
      "Prints a message to the terminal and then continues rendering as normal",
      "Registers a new type of error globally"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when you throw createError({ statusCode: 404 }) during page rendering?",
    "topic": "Error handling",
    "choices": [
      "The server restarts and retries the request",
      "Nuxt shows the error page with that status code",
      "The browser is redirected to the previous page",
      "The page renders normally with a warning in the console"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which file customizes the full-page error screen in Nuxt?",
    "topic": "Error handling",
    "choices": [
      "pages/error.vue",
      "layouts/error.vue, which wraps every page that fails to render",
      "error.vue at the project root",
      "app/errors.js"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does clearError({ redirect: '/' }) do in the error page?",
    "topic": "Error handling",
    "choices": [
      "Deletes the error logs from the server and reloads the current page",
      "Hides the error message but stays on the page",
      "Clears the current error and navigates to the home page",
      "Reloads the browser with a cache-busting query"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is <NuxtErrorBoundary> for?",
    "topic": "Error handling",
    "choices": [
      "Blocking all errors from reaching the browser",
      "Handling errors thrown by the Nitro server and its API routes only",
      "Catching child errors so a section can show a fallback UI",
      "Logging errors to a remote service automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should a page handle a failed fetch rather than ignore it?",
    "topic": "Error handling",
    "choices": [
      "Failed fetches always crash the whole server process in production builds",
      "The template may read properties of missing data and break",
      "Nuxt hides any template that reads missing data",
      "Browsers automatically retry failed fetches forever"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When should you use showError instead of createError?",
    "topic": "Error handling",
    "choices": [
      "When you want to show the error page from code, such as in a handler",
      "When you are writing a unit test",
      "When you want to hide the error from the user",
      "When you need to send an error response from inside an API route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "An API returns 404. What does the error value from useFetch typically contain?",
    "topic": "Error handling",
    "choices": [
      "Nothing, because 404 responses are not errors",
      "The raw HTML of the 404 page only",
      "A boolean true flag and no other information about the failed request",
      "A fetch error with statusCode, statusMessage and response data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which pattern gives a friendly empty state when a request fails?",
    "topic": "Error handling",
    "choices": [
      "Wrap the whole app in a try/catch block in app.vue to hide failures",
      "Set data to a random value so the template always works",
      "Disable server-side rendering for that page",
      "Check error and data in the template and render a fallback"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which composable sets the page title and meta tags from a component?",
    "topic": "Head management and SEO",
    "choices": [
      "useTitle",
      "useHead",
      "useRouter",
      "useState"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useSeoMeta offer compared with useHead?",
    "topic": "Head management and SEO",
    "choices": [
      "Automatic keyword generation from page content",
      "A typed, flat API for common SEO tags",
      "A faster alternative that works only on the server",
      "A way to inject scripts into the head"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you give every page a consistent title suffix such as '- My Site'?",
    "topic": "Head management and SEO",
    "choices": [
      "Set a titleTemplate through useHead or app.head",
      "Edit the title in the browser after hydration",
      "Place the suffix in the layout's body text",
      "Add the suffix to each page's file name so Nuxt joins them later"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which meta tags help social platforms show a rich preview when a link is shared?",
    "topic": "Head management and SEO",
    "choices": [
      "Open Graph tags such as og:title and og:image",
      "The robots meta tag with the noindex value on every page of the site",
      "The charset tag",
      "The viewport tag"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must SEO tags be set during server rendering rather than only in the browser?",
    "topic": "Head management and SEO",
    "choices": [
      "Browsers refuse to apply any meta tag that is set after hydration",
      "Scripts cannot change the title of a page",
      "Crawlers and link previews often read the HTML without running scripts",
      "Server-set tags make the page load faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a canonical link tag tell search engines?",
    "topic": "Head management and SEO",
    "choices": [
      "Which language the page is written in",
      "How often the page is updated",
      "That the page should not be indexed or shown in search results at all",
      "The preferred URL for a page with duplicate content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which attribute on the html element helps accessibility and search engines identify the page language?",
    "topic": "Head management and SEO",
    "choices": [
      "charset",
      "hreflang",
      "dir",
      "lang"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a page add a tag like noindex only for itself?",
    "topic": "Head management and SEO",
    "choices": [
      "Rename the page file to include noindex",
      "Add the tag to nuxt.config.ts, which applies it to the whole site",
      "Call useHead or useSeoMeta with robots set in that page's script",
      "Put the tag in public/robots.txt for that route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the viewport meta tag affect?",
    "topic": "Head management and SEO",
    "choices": [
      "Whether search engines crawl the page and how often they return to it",
      "How the page scales and lays out on mobile devices",
      "Which fonts are preloaded",
      "How fast images are downloaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you make a page title depend on fetched data?",
    "topic": "Head management and SEO",
    "choices": [
      "Pass a computed or getter that reads the data to useHead or useSeoMeta",
      "Store the title in localStorage and read it later",
      "Modify document.title inside the server middleware",
      "Concatenate the fetched data into the page file name at build time"
    ],
    "answerIdx": 0
  }
]
```

LAYER: nuxt-dev-5

```json
[
  {
    "stem": "Which file creates a GET endpoint served at /api/users in Nuxt?",
    "topic": "Server routes and API handlers",
    "choices": [
      "server/api/users.get.ts, since the api folder adds the /api prefix",
      "server/users/api.get.ts, because the method name must come before the path",
      "server/routes/users.get.ts, which Nuxt automatically mounts under the /api prefix",
      "pages/api/users.vue with a server attribute on its script tag"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does defineEventHandler do?",
    "topic": "Server routes and API handlers",
    "choices": [
      "Registers a listener for browser events like click and submit on the server",
      "Wraps a function that handles a request and returns a response",
      "Creates a Vue component that renders only during server-side rendering",
      "Declares a scheduled job that Nitro runs on a repeating timer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can an event handler return to send a JSON response?",
    "topic": "Server routes and API handlers",
    "choices": [
      "A Response built with the browser's new Response() only, since objects are rejected",
      "A plain object or array, which Nitro serializes to JSON for the client",
      "A string containing JSON, which must be parsed by the client",
      "Nothing; it must call res.json() on the event"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define a route with a dynamic id, such as /api/posts/42?",
    "topic": "Server routes and API handlers",
    "choices": [
      "server/api/posts/{id}.get.ts, wrapped in curly braces for parameters",
      "server/api/posts/:id.get.ts, using the Express style parameter syntax",
      "server/api/posts/[id].get.ts",
      "server/api/posts/_id.get.ts, with a leading underscore for dynamic segments"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the file suffix .post.ts in server/api/login.post.ts mean?",
    "topic": "Server routes and API handlers",
    "choices": [
      "The handler responds only to POST requests and ignores other methods",
      "The handler runs after the response has been posted to the client",
      "The file is processed after all other files in the folder",
      "The file exports a function that posts data to another service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a handler in server/routes differ from one in server/api?",
    "topic": "Server routes and API handlers",
    "choices": [
      "Routes in server/routes are available only during the build, not at runtime",
      "Routes in server/routes always run in the browser instead of on the server",
      "Routes in server/routes can only serve static files from the public folder",
      "Routes in server/routes are not prefixed with /api"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you return a 404 from a handler?",
    "topic": "Server routes and API handlers",
    "choices": [
      "throw createError({ statusCode: 404, statusMessage: 'Not Found' })",
      "call process.exit(404) so the runtime reports the status upstream",
      "return 404 as the number, which Nitro converts into the status code",
      "set window.status = 404 before returning the response body"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you set the response status code to 201 in a handler?",
    "topic": "Server routes and API handlers",
    "choices": [
      "return { status: 201 } so that Nitro reads the status field from the object",
      "event.status = 201 followed by a call to event.end() in the same handler",
      "call event.respond(201) once the response body has been prepared",
      "setResponseStatus(event, 201), called before the handler returns its body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a catch-all file such as server/api/[...].ts handle?",
    "topic": "Server routes and API handlers",
    "choices": [
      "Only requests that fail with an error somewhere else in the application",
      "Requests under /api that no more specific handler matches",
      "Every request in the app, including the pages rendered by Vue",
      "Requests whose paths contain at least one query string parameter"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Nitro in the context of Nuxt?",
    "topic": "Server routes and API handlers",
    "choices": [
      "A testing library that mocks API routes during unit tests",
      "A database driver bundled with Nuxt for reading from SQL",
      "A CSS compiler that builds the styles for server-rendered pages",
      "The server engine that powers Nuxt's API routes, rendering and deployment targets"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read query string parameters (?page=2) in a handler?",
    "topic": "Reading request data",
    "choices": [
      "getQuery(event), which parses the query string into a plain object",
      "readBody(event), which parses both the query and the request body",
      "event.params.page, since the router puts all query values there",
      "getHeaders(event), which returns every query value as a header"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a JSON request body in a POST handler?",
    "topic": "Reading request data",
    "choices": [
      "await getBody(event.req), which is the older helper name in H3",
      "await readBody(event), which parses the request body for the handler",
      "event.body, which Nitro fills in before the handler runs",
      "getQuery(event), which also includes the body in a parsed object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the dynamic part of a route such as [id]?",
    "topic": "Reading request data",
    "choices": [
      "getQuery(event).id, because the router mirrors params in the query string",
      "event.id, which Nitro attaches to the event for convenience",
      "useRoute().params.id, which also works inside server handlers",
      "getRouterParam(event, 'id')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a request header such as Authorization?",
    "topic": "Reading request data",
    "choices": [
      "readHeader(event), which only reads headers set by the router",
      "event.headers.get(), which returns every header as a single object",
      "getHeader(event, 'authorization'), which returns that single header's value",
      "getCookie(event, 'authorization'), as headers are stored as cookies"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read and set a cookie in a handler?",
    "topic": "Reading request data",
    "choices": [
      "document.cookie, which Nitro makes available on the server",
      "event.cookies.set(name, value), a method added by the router plugin",
      "useCookie(name) inside the handler, the same as in a component",
      "getCookie(event, name) and setCookie(event, name, value)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why validate request bodies before using them?",
    "topic": "Reading request data",
    "choices": [
      "The body is empty unless a validator has first been attached to the route",
      "Validation makes the response smaller by removing unused fields from it",
      "Nitro rejects bodies that have not been validated with a schema library",
      "Clients can send any data, so trusting it can cause bugs or security issues"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which helper reads and validates a body in one step using a schema?",
    "topic": "Reading request data",
    "choices": [
      "parseBody(event, schema), which falls back to a query string",
      "validateBody(event), which checks it against the TypeScript types",
      "readBody(event, { validate: true }), which uses the Content-Type header",
      "readValidatedBody(event, schema.parse), which throws if the body is invalid"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does getRequestURL(event) give you?",
    "topic": "Reading request data",
    "choices": [
      "The URL the handler will redirect to after finishing",
      "The full URL of the incoming request, including its path and query",
      "The address of the database the handler connects to",
      "The path of the file that contains the handler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What status makes sense when a body fails validation?",
    "topic": "Reading request data",
    "choices": [
      "500 Internal Server Error, since validation failures indicate a server bug",
      "200 OK with an empty body, so clients keep working",
      "400 Bad Request, or 422 Unprocessable Entity",
      "301 Moved Permanently, to send the client back to the form page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does sendRedirect(event, '/login') do?",
    "topic": "Reading request data",
    "choices": [
      "Forwards the request to a handler in the pages directory",
      "Responds with a redirect status and a Location header pointing to /login",
      "Renders the login page inside the current response body",
      "Opens /login in a new tab on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the server/utils directory provide?",
    "topic": "Server utilities",
    "choices": [
      "Config files that Nitro reads once during the build",
      "Functions that are auto-imported in server handlers",
      "Helpers that are bundled into the browser for every page",
      "Static files served to clients directly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why put database access in a shared server util instead of each handler?",
    "topic": "Server utilities",
    "choices": [
      "Utils are faster because Nitro compiles them separately from handlers",
      "It avoids duplication and keeps handlers short and testable",
      "Handlers cannot import from node_modules, so utils are required",
      "Server utils are the only files allowed to open network connections"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can code in server/utils be imported into a Vue component?",
    "topic": "Server utilities",
    "choices": [
      "No, server code should stay on the server and not be bundled into the client",
      "No, because the folder name makes Nitro delete the files after the build",
      "Yes, and it runs in the browser with full access to the server's environment",
      "Yes, but only inside components that are rendered on the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does $fetch('/api/hello') do inside a server handler?",
    "topic": "Server utilities",
    "choices": [
      "Fails because $fetch is not available outside the browser",
      "Calls the route directly without a real network request",
      "Opens an HTTP connection to the public internet and back to the same server",
      "Returns a promise that resolves only after the page has hydrated"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should a helper that sets default headers be called for all API routes?",
    "topic": "Server utilities",
    "choices": [
      "In nuxt.config.ts inside the head configuration",
      "In a Vue plugin that loads when the client hydrates",
      "In the layout file, because headers are part of the page frame",
      "In a server middleware that runs before the handlers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does defineEventHandler's returned value become?",
    "topic": "Server utilities",
    "choices": [
      "The response body, which Nitro serializes and sends to the client",
      "A log entry that is written to the Nitro console",
      "An argument for the next middleware in the chain, which then sends it",
      "A cached copy that replaces the next request's handler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does useStorage() provide in Nitro?",
    "topic": "Server utilities",
    "choices": [
      "An ORM that maps tables in a relational database to classes",
      "A cookie jar that is shared between the server and the browser",
      "A unified key-value storage API with pluggable drivers",
      "A wrapper around the browser's localStorage for server handlers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which approach lets a server util call another service with automatic JSON parsing?",
    "topic": "Server utilities",
    "choices": [
      "XMLHttpRequest, which Nitro polyfills for all server code",
      "import axios from 'nuxt/fetch', a bundled client",
      "$fetch (ofetch) from the server util",
      "document.fetch, since the util shares the global document"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of keeping business logic out of route handlers?",
    "topic": "Server utilities",
    "choices": [
      "Nitro refuses to start if a handler is longer than one file screen",
      "Logic outside handlers is automatically cached for every request",
      "Handlers stay thin and the logic is reusable and easier to test",
      "Handlers run faster when they contain fewer than ten lines of code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a handler throws an unexpected error that isn't created with createError?",
    "topic": "Server utilities",
    "choices": [
      "Nitro responds with a 500 error",
      "Nitro logs the error and closes the server",
      "Nitro returns an empty 200 response",
      "Nitro retries the handler until it succeeds"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you define runtime configuration values for the server?",
    "topic": "Environment and runtime config",
    "choices": [
      "The public directory, from where the browser can fetch it as needed",
      "A config.json file inside the server folder, which is read on each request",
      "package.json, in the scripts section next to the dev command",
      "The runtimeConfig key in nuxt.config.ts, with defaults for each value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read runtime config inside a server handler?",
    "topic": "Environment and runtime config",
    "choices": [
      "getConfig(event), which reads the nuxt.config.ts file at request time",
      "import { config } from '#app', which exposes the browser version",
      "process.env only, since Nuxt blocks runtime config from handlers",
      "useRuntimeConfig(event), which returns the server-side runtime configuration"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which keys of runtimeConfig are private to the server?",
    "topic": "Environment and runtime config",
    "choices": [
      "Keys outside the public object",
      "Keys that contain the word secret in their name",
      "Keys whose names start with an underscore",
      "Keys declared with the server: true option"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you change a runtimeConfig value in production without rebuilding?",
    "topic": "Environment and runtime config",
    "choices": [
      "Change nuxt.config.ts on the server; Nitro reloads it every minute",
      "Set a matching NUXT_ environment variable and restart the server",
      "Call a refresh endpoint that rebuilds the bundle on the fly",
      "Edit .nuxt/config.json on the server and the change applies live"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What would NUXT_PUBLIC_API_BASE override?",
    "topic": "Environment and runtime config",
    "choices": [
      "runtimeConfig.apiBase, the private server-only value",
      "app.config.apiBase, the reactive app settings",
      "runtimeConfig.public.apiBase, which is exposed to the browser as well",
      "process.env.API_BASE inside the browser bundle"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why shouldn't you read process.env directly in components?",
    "topic": "Environment and runtime config",
    "choices": [
      "Components cannot read variables whose names are uppercase",
      "Values are not available in the browser unless they go through runtime config",
      "Environment variables only work in plugins, not in components",
      "process.env is deleted by Nuxt when the page hydrates in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is a .env file normally loaded for local development?",
    "topic": "Environment and runtime config",
    "choices": [
      "From the server folder, only when nuxt build runs",
      "From the browser, using a fetch call to /.env during hydration",
      "From the project root, when you start the app with nuxt dev",
      "From the public folder, which exposes it to every visitor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What belongs in public runtime config?",
    "topic": "Environment and runtime config",
    "choices": [
      "Database passwords that the server needs on each request",
      "Private signing keys that are shared between the server and client",
      "Values safe for the browser, such as a public API base URL",
      "Any value that is longer than a single line of text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the risk of committing a .env file with real secrets?",
    "topic": "Environment and runtime config",
    "choices": [
      "The values become public runtime config automatically",
      "The build fails because git ignores files that begin with a dot",
      "Anyone with repository access can read the secrets",
      "Nuxt refuses to start if the file is tracked by version control"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function reads config values that are the same in every environment, like a site name?",
    "topic": "Environment and runtime config",
    "choices": [
      "useEnv()",
      "useAppConfig()",
      "useNitroConfig()",
      "useRuntimeConfig().private"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is server middleware?",
    "topic": "Middleware",
    "choices": [
      "A handler in server/middleware that runs on every request before routes",
      "A script that runs once at startup, before the server accepts requests",
      "A route-level function that runs only for pages, not API calls",
      "A Vue component that wraps the app and renders on the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should server middleware normally avoid doing?",
    "topic": "Middleware",
    "choices": [
      "Returning a value, which would end the request early",
      "Reading headers from the incoming request",
      "Logging details about each request",
      "Attaching data to event.context for later handlers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can middleware pass the authenticated user to later handlers?",
    "topic": "Middleware",
    "choices": [
      "Add it to the URL as a query string",
      "Store it on event.context, where later handlers can read it",
      "Return it from the middleware as a value",
      "Write it to a global variable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does server middleware differ from route middleware in app/middleware?",
    "topic": "Middleware",
    "choices": [
      "Route middleware handles API calls, while server middleware handles pages only",
      "Server middleware runs only in the browser, while route middleware runs in Nitro",
      "Server middleware runs in Nitro for every request, while route middleware runs during client navigation",
      "They are the same files and run at the same time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which middleware use is common for API routes?",
    "topic": "Middleware",
    "choices": [
      "Generating a sitemap for every request",
      "Checking a session or token and rejecting unauthorized requests",
      "Rendering the page's layout before the handler",
      "Compiling Vue templates ahead of time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can middleware restrict itself to certain paths?",
    "topic": "Middleware",
    "choices": [
      "Name the file with a path in square brackets",
      "Nitro does not allow middleware to be restricted",
      "Check the request path inside the middleware and return early if it does not match",
      "Add a paths array to nuxt.config.ts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are server plugins in server/plugins used for?",
    "topic": "Middleware",
    "choices": [
      "Running code at Nitro startup, such as registering hooks",
      "Adding Vue directives available in templates",
      "Rendering components that appear on every page",
      "Defining client-side navigation guards"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the execution order of server middleware files?",
    "topic": "Middleware",
    "choices": [
      "Alphabetical by file name, so prefixes like 01. can control order",
      "Random, which is why middleware should not depend on each other",
      "Newest file first, according to modification time",
      "The order in which the files were imported in nuxt.config.ts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A middleware needs to add CORS headers to API responses. What is a good approach?",
    "topic": "Middleware",
    "choices": [
      "Put the headers in a meta tag in the layout",
      "Edit the browser's request headers using window.fetch",
      "Set the headers with setResponseHeaders(event, ...) in the middleware",
      "Add the headers to the Vue component that calls the API"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid heavy work, like database queries, in middleware that runs on every request?",
    "topic": "Middleware",
    "choices": [
      "Nitro disallows database drivers inside middleware files",
      "Middleware always runs twice, so queries are duplicated",
      "It slows down every request, including static assets and unrelated routes",
      "The result is cached forever by the router"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does defineCachedEventHandler do?",
    "topic": "Caching responses",
    "choices": [
      "Stores the request body in a database for auditing",
      "Saves the handler's source code so it compiles faster",
      "Keeps the connection open between requests",
      "Caches the handler's response for a set time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which option sets how long a cached response is kept?",
    "topic": "Caching responses",
    "choices": [
      "ttl, in milliseconds",
      "expires, as a Date object",
      "maxAge, a number of seconds that the cached response stays fresh",
      "lifetime, as a string like '1h'"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does stale-while-revalidate (swr) mean for cached responses?",
    "topic": "Caching responses",
    "choices": [
      "Delete the old response and show an error until the next request",
      "Serve stale responses forever without ever rebuilding them",
      "Block the request until the cache is rebuilt, then serve the new value",
      "Serve the stale response immediately while a fresh one is built in the background"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you cache a route without changing its handler code?",
    "topic": "Caching responses",
    "choices": [
      "Rename the file with a .cache suffix",
      "Add a cache attribute to the NuxtLink pointing to it",
      "Set a header in the browser extension",
      "Add a routeRules entry with cache or swr for that path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why shouldn't responses that depend on the logged-in user be cached for everyone?",
    "topic": "Caching responses",
    "choices": [
      "Personalized responses are too large to store",
      "One user's data could be served to another user",
      "Nitro refuses to cache any response with cookies set",
      "Cached responses are always encrypted for a single visitor"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does defineCachedFunction cache?",
    "topic": "Caching responses",
    "choices": [
      "The result of a function, keyed by its arguments",
      "Every network request the function makes",
      "The function's source code on disk",
      "The imports used by the function"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a cache key typically get built for defineCachedEventHandler?",
    "topic": "Caching responses",
    "choices": [
      "From the request path and query string",
      "From the size of the request body",
      "From the time of the request",
      "From the user's IP address only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What's a good reason to cache an upstream API call on the server?",
    "topic": "Caching responses",
    "choices": [
      "To make the data editable by visitors",
      "To prevent the response from ever changing",
      "To skip authentication on the upstream service",
      "To reduce latency and avoid hitting rate limits"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a Cache-Control: max-age=60 response header tell clients and CDNs?",
    "topic": "Caching responses",
    "choices": [
      "The response body is limited to 60 bytes",
      "The server will delete the response after 60 requests",
      "The connection will close after 60 seconds",
      "The response may be reused for 60 seconds without asking the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "After data changes, which strategy makes sure stale cache entries don't live too long?",
    "topic": "Caching responses",
    "choices": [
      "Use a short maxAge or invalidate the cache when the data is updated",
      "Disable the cache for every route in the application",
      "Cache the response on the client only, with no server cache",
      "Increase maxAge to a year so fewer requests reach the server"
    ],
    "answerIdx": 0
  }
]
```

LAYER: nuxt-dev-6

```json
[
  {
    "stem": "What is the schema.prisma file?",
    "topic": "Prisma schema and models",
    "choices": [
      "A TypeScript file that exports hand-written query functions for each table",
      "A SQL dump that Prisma replays against the database on every single server start",
      "A cache of the last query results, stored for faster page loads",
      "The single source of truth describing your data models and database connection"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a model block define in a Prisma schema?",
    "topic": "Prisma schema and models",
    "choices": [
      "A route handler that responds to requests for a given path in the app",
      "A reusable Vue component used to display database rows",
      "A scheduled job that cleans up old rows once a day",
      "A database table or collection, with its fields and their types"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @id mark on a field?",
    "topic": "Prisma schema and models",
    "choices": [
      "The field that must always be sorted ascending in queries",
      "The field that is hidden from the generated client",
      "The field that is used as the display name in Prisma Studio",
      "The field that uniquely identifies each record"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @default(now()) do on a DateTime field?",
    "topic": "Prisma schema and models",
    "choices": [
      "Stores the time at which the schema was last migrated",
      "Prevents the field from ever being changed",
      "Updates the field every time the record is read",
      "Fills in the current time when a record is created"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @updatedAt do?",
    "topic": "Prisma schema and models",
    "choices": [
      "Prevents updates after the first one",
      "Marks the field as read-only in the generated client",
      "Stores the time of the first migration that created the table, and never changes",
      "Sets the field to the current time whenever the record is updated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @unique guarantee?",
    "topic": "Prisma schema and models",
    "choices": [
      "The field is automatically indexed and also hidden from queries",
      "The field is the primary key for the model",
      "No two records can have the same value in that field",
      "The field is always required, even if it is declared optional"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a ? after a type, such as String?, mean in a Prisma model?",
    "topic": "Prisma schema and models",
    "choices": [
      "The field is optional and can be null",
      "The field has an unknown type resolved at runtime",
      "The field is a string that is checked at build time only",
      "The field is excluded from the database table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does running prisma generate do?",
    "topic": "Prisma schema and models",
    "choices": [
      "Creates seed data for every model automatically",
      "Opens a web interface to browse your data",
      "Applies pending migrations to the production database",
      "Generates the typed Prisma Client from your schema"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does editing the schema require re-running generate?",
    "topic": "Prisma schema and models",
    "choices": [
      "The client's types and methods are generated from the schema and must be refreshed",
      "Prisma deletes the client whenever the schema file is saved",
      "The database refuses queries until the schema file's modified timestamp has changed",
      "The schema file is only read when the server first boots"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Prisma type maps to a whole number column?",
    "topic": "Prisma schema and models",
    "choices": [
      "Digit",
      "Number",
      "Int",
      "Integer32"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does prisma migrate dev do?",
    "topic": "Migrations",
    "choices": [
      "Creates a migration from schema changes, applies it and updates the client",
      "Pulls the current database structure into the schema file",
      "Deletes the database and recreates it from the seed file only",
      "Applies existing migrations to the production database without creating any new ones"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command applies pending migrations in a production deployment?",
    "topic": "Migrations",
    "choices": [
      "prisma migrate dev, which also applies pending migrations in production",
      "prisma migrate reset",
      "prisma migrate deploy",
      "prisma migrate dev"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does prisma db push differ from prisma migrate dev?",
    "topic": "Migrations",
    "choices": [
      "db push only works on empty databases",
      "db push creates a migration file and then applies it to the production database",
      "db push syncs the schema directly without creating migration history",
      "db push deletes all rows before applying changes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should migration files be committed to version control?",
    "topic": "Migrations",
    "choices": [
      "They are regenerated on every build, so committing them is optional",
      "They contain the production data that every other developer needs locally",
      "They record how the schema changed, so every environment can reproduce it",
      "They store the Prisma Client that the app imports"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does prisma migrate reset do in development?",
    "topic": "Migrations",
    "choices": [
      "Applies migrations to production and drops unused tables",
      "Drops the database, reapplies all migrations and runs the seed",
      "Reverts only the most recent migration and keeps all of the existing data",
      "Deletes the migration files from the repository"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What risk comes with renaming a column by editing the schema and running a migration?",
    "topic": "Migrations",
    "choices": [
      "Prisma may drop the old column and add a new one, losing data unless you edit the migration",
      "The client keeps using the old name until the next deployment",
      "The rename always keeps the data and requires no review",
      "Prisma refuses to rename any column after the first migration"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the safest way to change a schema in a team project?",
    "topic": "Migrations",
    "choices": [
      "Delete old migrations to keep the folder small",
      "Create a migration, review its SQL and commit it with the schema change",
      "Run db push against the shared production database",
      "Edit the database directly and let Prisma detect the changes some time later"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does prisma migrate status show?",
    "topic": "Migrations",
    "choices": [
      "The number of rows in every table",
      "Whether the database is in sync with the migration history",
      "Which queries were slow during the last hour of production traffic on the app",
      "The connection pool size of the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is prisma studio?",
    "topic": "Migrations",
    "choices": [
      "A tool that converts your schema into SQL for another database",
      "A browser interface for viewing and editing your data",
      "An editor that formats the schema file on save",
      "A profiler that records query timings in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the _prisma_migrations table?",
    "topic": "Migrations",
    "choices": [
      "It records which migrations have been applied to the database",
      "It tracks which users have run migrations",
      "It holds the seed data for the application",
      "It stores a backup copy of every row before the row is changed or deleted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you fetch all posts from a Nitro handler with Prisma?",
    "topic": "Querying in server routes",
    "choices": [
      "prisma.post.fetch(), which returns a cursor object",
      "await prisma.post.findMany()",
      "prisma.posts.getAll(), using the plural model name",
      "await prisma.query('SELECT * FROM posts'), the only supported form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does findUnique require?",
    "topic": "Querying in server routes",
    "choices": [
      "A unique field (or composite) in the where clause",
      "An empty where clause, to fetch the only record",
      "Any field at all, and it returns the first match that happens to be found",
      "An id of type string only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you create a record from a request body?",
    "topic": "Querying in server routes",
    "choices": [
      "prisma.user.add(body), which queues the write",
      "await prisma.user.insert(body), which returns the new row",
      "await prisma.user.create({ data: body })",
      "await prisma.user.save(body), which creates or updates it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does select do in a Prisma query?",
    "topic": "Querying in server routes",
    "choices": [
      "Chooses which database the query runs against when several are configured",
      "Limits which fields are returned",
      "Sorts the results",
      "Filters rows by a condition"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you filter posts by a published flag in findMany?",
    "topic": "Querying in server routes",
    "choices": [
      "filter: { published: true }",
      "having: { published: true }",
      "where: { published: true }",
      "if: { published: true }"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you paginate with take and skip?",
    "topic": "Querying in server routes",
    "choices": [
      "take orders the rows and skip groups them",
      "take limits the connection pool and skip disables caching",
      "take selects which fields to return and skip hides the other fields entirely",
      "take sets how many records to return and skip how many to pass over"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does upsert do?",
    "topic": "Querying in server routes",
    "choices": [
      "Updates the record if it exists, otherwise creates it",
      "Updates every record in the table",
      "Deletes the record and then re-creates it again with the new data supplied",
      "Creates a record only if the table is empty"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when update targets a record that does not exist?",
    "topic": "Querying in server routes",
    "choices": [
      "Prisma throws a not-found error",
      "Prisma updates the nearest match instead",
      "Prisma creates a new record automatically",
      "Prisma returns null"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a handler respond when a lookup by id returns null?",
    "topic": "Querying in server routes",
    "choices": [
      "With a redirect to the home page",
      "With a 404 error through createError",
      "With a 200 status and an empty body",
      "With a 500 status because the database failed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why avoid sending raw Prisma results with password hashes to the client?",
    "topic": "Querying in server routes",
    "choices": [
      "Clients receive these values automatically as null",
      "They make the JSON invalid",
      "They could leak sensitive fields, so select only what the client needs",
      "Prisma encrypts them, so clients cannot read the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How is a one-to-many relation expressed in Prisma?",
    "topic": "Relations",
    "choices": [
      "A join table that must be declared by hand for every case",
      "A relation field on one model and a foreign key field with @relation on the other",
      "An array of JSON strings stored in a column",
      "A comment that tells Prisma to link two models by name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @relation(fields: [authorId], references: [id]) declare?",
    "topic": "Relations",
    "choices": [
      "id on the related model is deleted whenever authorId changes",
      "authorId on this model is a foreign key pointing at the id of the related model",
      "The two fields are merged into one column",
      "authorId is copied from the related model on each read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you load a post together with its author?",
    "topic": "Relations",
    "choices": [
      "Use include: { author: true } in the query",
      "Run two separate queries and merge them by hand only",
      "Add a join keyword to the where clause",
      "Declare author as a required field on the post"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between include and select for relations?",
    "topic": "Relations",
    "choices": [
      "include works only with SQLite, select with Postgres",
      "include picks exact fields, while select adds relations to every scalar field",
      "include adds relations to all scalar fields, while select picks exact fields",
      "They are identical and can be used interchangeably"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Prisma represent an implicit many-to-many relation?",
    "topic": "Relations",
    "choices": [
      "With a mandatory join model that you write in the schema",
      "With a single JSON column on one model that stores the ids of related rows",
      "With list fields on both models, and Prisma manages the join table",
      "It cannot represent many-to-many relations"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does onDelete: Cascade do on a relation?",
    "topic": "Relations",
    "choices": [
      "Prevents the parent row from ever being deleted while child rows still exist",
      "Deletes dependent rows when the parent row is deleted",
      "Archives the parent row instead of removing it",
      "Moves child rows to another parent automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you create a post and connect it to an existing user in one call?",
    "topic": "Relations",
    "choices": [
      "data: { title }, followed by a second update that sets author",
      "data: { title, author: userId } using the id directly",
      "data: { title, authorLink: userId }",
      "data: { title, author: { connect: { id: userId } } }"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the N+1 query problem?",
    "topic": "Relations",
    "choices": [
      "Running N queries in parallel to speed up the first load",
      "Failing a query N times before it succeeds",
      "Running one query for a list and then one more per item to fetch related data",
      "Storing N copies of the same record"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Prisma feature helps avoid N+1 when loading related records?",
    "topic": "Relations",
    "choices": [
      "include or select with nested relations in a single query",
      "Increasing the connection pool size",
      "Running the queries in a setTimeout",
      "Calling findUnique inside a loop for each parent record that was returned"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a transaction ensure?",
    "topic": "Relations",
    "choices": [
      "Queries run faster because all of them share one single database connection",
      "Operations always run in parallel",
      "Several operations succeed together or all roll back",
      "Data is encrypted while stored"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a seed script for?",
    "topic": "Seeding",
    "choices": [
      "Backing up production data nightly",
      "Generating TypeScript types for models",
      "Filling the database with initial or sample data",
      "Creating the migration files from the current state of the schema file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you configure the seed command for prisma db seed?",
    "topic": "Seeding",
    "choices": [
      "In package.json under the prisma key, as a seed command",
      "In a .seedrc file at the repository root",
      "In nuxt.config.ts under the modules array",
      "In the schema.prisma datasource block, next to the connection url setting"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why write seed scripts to be idempotent, using upsert?",
    "topic": "Seeding",
    "choices": [
      "So running the script twice doesn't create duplicates",
      "So it can run in the browser",
      "So the script runs faster on its first run than a normal insert would",
      "So it deletes data first on every run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does prisma migrate reset run the seed?",
    "topic": "Seeding",
    "choices": [
      "Before the migrations are applied",
      "Before the migrations are applied, so the seed data is wiped each time",
      "Never; seeding is always a separate manual step",
      "After resetting the database, if a seed command is configured"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Should seed data include real user passwords or production secrets?",
    "topic": "Seeding",
    "choices": [
      "Only if the repository is private",
      "Yes, so that the seed matches the production environment exactly as it runs",
      "Yes, but only email addresses",
      "No, use fake data and hashed dummy passwords"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kind of data is a good candidate for seeding in every environment?",
    "topic": "Seeding",
    "choices": [
      "Full copies of production tables",
      "Reference data like roles, categories or countries",
      "Session cookies",
      "Real customers' orders, copied from production so tests match real usage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a drawback of seeding with very large datasets in development?",
    "topic": "Seeding",
    "choices": [
      "The database loses its indexes",
      "Prisma refuses to insert more than one hundred rows in a single seed run",
      "The client types stop updating",
      "It slows resets and makes tests harder to reason about"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you run a TypeScript seed file?",
    "topic": "Seeding",
    "choices": [
      "By renaming it to seed.vue",
      "By placing it in the public directory",
      "With a runner such as tsx or ts-node set in the seed command",
      "By importing the seed file into app.vue so that it executes on page load"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep factory-style helpers for test data instead of relying on one big seed?",
    "topic": "Seeding",
    "choices": [
      "One big seed cannot contain relations",
      "Factories avoid the need for a database in tests",
      "Helpers are the only way to insert rows with Prisma",
      "Tests can create exactly the data they need and stay independent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a safe way to avoid running a destructive seed against production?",
    "topic": "Seeding",
    "choices": [
      "Name the file production-safe.ts so Prisma knows to skip it in production",
      "Check the environment or database URL before deleting anything",
      "Run it from the browser console",
      "Store the URL in the seed file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should the PrismaClient be created once and reused in a Nuxt server?",
    "topic": "Connection management",
    "choices": [
      "Clients become invalid after one query, so reuse is required",
      "Each client opens its own connection pool, which can exhaust database connections",
      "Creating the client more than once is a syntax error in TypeScript",
      "Prisma allows only one client per project folder"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What problem can hot reload in development cause for Prisma clients?",
    "topic": "Connection management",
    "choices": [
      "The generated client is reverted to the first version",
      "Migrations are applied on every save",
      "Hot reload deletes the schema file whenever a server file is saved to disk",
      "New clients are created on each reload, leaking connections"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do teams usually avoid duplicate clients during development?",
    "topic": "Connection management",
    "choices": [
      "Store the client on globalThis and reuse it",
      "Create a new client in every handler",
      "Disable hot reload",
      "Use a client per request and close it afterwards"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does connection pooling do?",
    "topic": "Connection management",
    "choices": [
      "Reuses a limited set of open database connections across requests",
      "Splits one query into several smaller parallel queries to finish them sooner",
      "Encrypts connections between the server and the browser",
      "Stores query results for later reuse"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of serverless deployments connecting directly to a small database?",
    "topic": "Connection management",
    "choices": [
      "Serverless functions cannot connect to databases that live outside their own cloud",
      "The database becomes read-only",
      "Connections are closed after one byte",
      "Many instances can each open connections and exceed the database limit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tool helps serverless apps share connections to Postgres?",
    "topic": "Connection management",
    "choices": [
      "A service worker in the browser",
      "A bigger CSS bundle sent to the browser with each of the pages loaded",
      "A pooler such as PgBouncer or a managed proxy",
      "A second copy of the schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should the database URL be stored?",
    "topic": "Connection management",
    "choices": [
      "In a query string on each request",
      "In an environment variable such as DATABASE_URL",
      "Hard-coded in the schema file that is committed to the git repository",
      "In a public config file served to browsers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does $disconnect do on a PrismaClient?",
    "topic": "Connection management",
    "choices": [
      "Closes the client's database connections",
      "Rolls back the last migration",
      "Disconnects the browser from the server",
      "Deletes all rows that were created by the client during its lifetime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a connection_limit parameter in the database URL control?",
    "topic": "Connection management",
    "choices": [
      "The number of users allowed to log in",
      "The number of migrations that can run at once",
      "The number of rows returned per query before pagination is applied by Prisma",
      "The maximum size of the client's connection pool"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a separate database for tests?",
    "topic": "Connection management",
    "choices": [
      "Migrations only work on test databases",
      "Tests can reset and fill data without touching development or production data",
      "Prisma cannot run queries against a development database that contains any real rows",
      "Test databases are always faster than real ones"
    ],
    "answerIdx": 1
  }
]
```

LAYER: nuxt-dev-7

```json
[
  {
    "stem": "What does useState('count', () => 0) provide in Nuxt?",
    "topic": "State with useState and Pinia",
    "choices": [
      "A ref that is recreated separately for each component that calls it",
      "A browser-only variable that is never sent from the server to the client",
      "SSR-friendly shared state keyed by 'count'",
      "A global Pinia store that is registered automatically for the whole app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use useState instead of a plain top-level ref in a composable file?",
    "topic": "State with useState and Pinia",
    "choices": [
      "A module-level ref on the server is shared between requests",
      "A top-level ref is not reactive unless it is wrapped in a Pinia store first",
      "A top-level ref cannot be imported by more than one component in the application",
      "A top-level ref is reset every time that the browser tab regains focus again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main role of Pinia?",
    "topic": "State with useState and Pinia",
    "choices": [
      "A store for shared application state with actions and getters",
      "A CSS framework for building responsive layouts quickly",
      "A router that maps URLs to page components in the application",
      "A database client for querying data from Nitro handlers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Pinia concept holds derived values, similar to computed?",
    "topic": "State with useState and Pinia",
    "choices": [
      "plugins",
      "mutations",
      "getters",
      "actions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you put logic that changes state or calls an API in a Pinia store?",
    "topic": "State with useState and Pinia",
    "choices": [
      "In getters, which can also be async",
      "In the template of the component using the store",
      "In actions",
      "In the state function, run once at startup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does defineStore('cart', ...) return?",
    "topic": "State with useState and Pinia",
    "choices": [
      "A plain object copied once on each hydration of the page",
      "A Vue component that renders the cart's contents on the page",
      "The store instance itself, shared as a global singleton",
      "A composable such as useCartStore that gives access to the store"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you keep destructured Pinia state reactive?",
    "topic": "State with useState and Pinia",
    "choices": [
      "Use storeToRefs(store)",
      "Wrap it in setTimeout",
      "Call JSON.parse(JSON.stringify(store))",
      "Spread the store object into plain variables"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should you reach for useState over Pinia?",
    "topic": "State with useState and Pinia",
    "choices": [
      "Only when the app has no server rendering",
      "For anything that involves more than one component",
      "Only for values that are never read in templates",
      "For small shared values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Nuxt send useState values from the server to the client?",
    "topic": "State with useState and Pinia",
    "choices": [
      "They're fetched again from the API after hydration",
      "They're stored in a cookie that the browser reads",
      "They're stored in localStorage by the server",
      "They're serialized into the payload"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid storing large server-only secrets in shared state?",
    "topic": "State with useState and Pinia",
    "choices": [
      "State is serialized into the page payload",
      "State can't hold strings longer than 255 characters",
      "State is deleted after the first request completes",
      "Pinia encrypts state, so secrets cannot be read back"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of authentication middleware on the server?",
    "topic": "Server middleware for auth",
    "choices": [
      "To redirect all traffic to HTTPS on the production domain",
      "To check each request's credentials",
      "To hash passwords before they reach the database layer",
      "To render the login page for every unauthenticated request automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where would you put an auth check that applies to every /api/admin route?",
    "topic": "Server middleware for auth",
    "choices": [
      "A server middleware that inspects the path",
      "A line in package.json",
      "A Vue component rendered on each admin page",
      "A CSS class in the layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code should a server return when no valid credentials are provided?",
    "topic": "Server middleware for auth",
    "choices": [
      "404 Not Found",
      "302 Found",
      "201 Created",
      "401 Unauthorized"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code fits an authenticated user who lacks permission for the resource?",
    "topic": "Server middleware for auth",
    "choices": [
      "204 No Content",
      "403 Forbidden",
      "409 Conflict",
      "401 Unauthorized"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must authorization be enforced on the server and not only in the UI?",
    "topic": "Server middleware for auth",
    "choices": [
      "Clients can call the API directly and bypass any hidden buttons",
      "Server code is always faster than client code at checking permissions",
      "Vue templates cannot read the user's role",
      "The browser removes UI checks when the page hydrates"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean for middleware to attach the user to event.context?",
    "topic": "Server middleware for auth",
    "choices": [
      "The user is stored in the database for the next request",
      "The user is exposed to the browser through the page payload",
      "Later handlers can read the user",
      "The user's session is renewed on the client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a token-based approach to authentication?",
    "topic": "Server middleware for auth",
    "choices": [
      "The server stores the password in a cookie for every request",
      "The browser keeps the user logged in without sending anything",
      "The client sends its username and password on every request",
      "The client sends a signed token"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should server auth middleware do when the token is invalid?",
    "topic": "Server middleware for auth",
    "choices": [
      "Throw createError with a 401 status",
      "Continue to the handler and let it decide",
      "Return an empty 200 response",
      "Delete the user from the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it risky to trust a user id sent in the request body for authorization?",
    "topic": "Server middleware for auth",
    "choices": [
      "Request bodies are always encrypted, so ids cannot be read",
      "A client can send any id",
      "Ids in bodies are overwritten by the router",
      "The server cannot parse ids from request bodies"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which library is commonly used in Nuxt for session-based auth with H3 helpers?",
    "topic": "Server middleware for auth",
    "choices": [
      "pinia-orm",
      "vue-router-next",
      "tailwind-merge",
      "nuxt-auth-utils"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a session in web authentication?",
    "topic": "Sessions and cookies",
    "choices": [
      "A database table that stores page views",
      "A copy of the user's password stored in the browser",
      "Server-side or signed state that identifies a logged-in user across requests",
      "A short-lived JavaScript variable inside a component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is an HTTP-only cookie safer for storing a session id than localStorage?",
    "topic": "Sessions and cookies",
    "choices": [
      "It's encrypted by the browser automatically",
      "It is deleted when the user switches tabs",
      "JavaScript cannot read it",
      "It stays valid forever with no expiry"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Secure cookie attribute do?",
    "topic": "Sessions and cookies",
    "choices": [
      "Sends the cookie only over HTTPS",
      "Encrypts the cookie value with a user-specific key",
      "Stops the server from reading the cookie",
      "Prevents the cookie from being sent to subdomains"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does SameSite=Lax help protect against?",
    "topic": "Sessions and cookies",
    "choices": [
      "Slow page loads on mobile networks",
      "Cross-site request forgery in many common cases",
      "Duplicate cookies on subdomains",
      "Cross-origin font loading failures"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a cookie's maxAge control?",
    "topic": "Sessions and cookies",
    "choices": [
      "The number of domains that can use the cookie",
      "How long, in seconds",
      "The size limit of the cookie's value",
      "How many times the cookie can be read by the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you clear a cookie from a handler?",
    "topic": "Sessions and cookies",
    "choices": [
      "deleteCookie(event, 'session')",
      "setHeader(event, 'cookie', null)",
      "removeCookie(event) with no arguments",
      "event.cookies.clear()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does signing a cookie value accomplish?",
    "topic": "Sessions and cookies",
    "choices": [
      "It lets the server detect tampering with the value",
      "It compresses the value to save bandwidth",
      "It hides the value from the browser",
      "It makes the cookie expire sooner"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is session fixation?",
    "topic": "Sessions and cookies",
    "choices": [
      "A browser feature that pins a session to a tab",
      "A bug where sessions are stored in two places",
      "An attacker sets a known session id",
      "A session that never expires on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you reduce the risk of session fixation?",
    "topic": "Sessions and cookies",
    "choices": [
      "Store the id in the URL",
      "Issue a new session id when the user logs in",
      "Reuse the same id for all users",
      "Disable cookies entirely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should happen to the session when the user logs out?",
    "topic": "Sessions and cookies",
    "choices": [
      "The browser deletes the page history",
      "Only the UI hides the user's name",
      "The server invalidates it",
      "The password is removed from the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should passwords be stored?",
    "topic": "Login and signup",
    "choices": [
      "As a fast hash like MD5 without any salt",
      "Encrypted with a key stored in the same database",
      "As plain text, since the database is private",
      "As salted hashes produced by a slow algorithm such as bcrypt or argon2"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a slow password hashing function?",
    "topic": "Login and signup",
    "choices": [
      "It reduces server load during sign-in",
      "It keeps hashes short",
      "It makes brute-force guessing expensive for attackers",
      "It allows the server to recover the original password"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a salt do in password hashing?",
    "topic": "Login and signup",
    "choices": [
      "Makes the hash reversible",
      "Makes identical passwords produce different hashes",
      "Prevents users from choosing short passwords",
      "Encrypts the hash with a public key"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What error message best avoids leaking which accounts exist during login?",
    "topic": "Login and signup",
    "choices": [
      "'No account with that email'",
      "'Wrong password for this account'",
      "The database error that was returned",
      "A generic message such as 'Invalid email or password'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "A sign-up handler receives an email that already exists. Which response fits?",
    "topic": "Login and signup",
    "choices": [
      "409 Conflict, or a neutral response that doesn't reveal the account",
      "500 Internal Server Error",
      "200 OK with the existing user's data",
      "301 Moved Permanently to the login page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What validation should a sign-up handler do server-side?",
    "topic": "Login and signup",
    "choices": [
      "Validate only on the client, then skip the server",
      "Validate only that the body exists",
      "Check email format, password rules",
      "Trust whatever the form sends because the browser validated it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add rate limiting to the login route?",
    "topic": "Login and signup",
    "choices": [
      "To make the page render faster",
      "To reduce the size of cookies",
      "To slow down password guessing",
      "To prevent users from logging out"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After a successful login, what should the handler typically do?",
    "topic": "Login and signup",
    "choices": [
      "Redirect to the database admin",
      "Return the password hash so the client can compare",
      "Store the password in localStorage",
      "Create a session and set a cookie"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a CSRF token used for?",
    "topic": "Login and signup",
    "choices": [
      "Proving a state-changing request was made from your own site",
      "Compressing form submissions",
      "Encrypting passwords on the way to the server",
      "Identifying a user's device for analytics"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does OAuth login with a provider like GitHub avoid?",
    "topic": "Login and signup",
    "choices": [
      "The need for HTTPS",
      "Validating tokens",
      "Using cookies at all",
      "Your app having to store and verify the user's password"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is route middleware in Nuxt (app/middleware or middleware folder)?",
    "topic": "Protecting routes",
    "choices": [
      "A plugin that runs once at app startup",
      "A function that runs before navigating to a route and can redirect or abort",
      "A server file that runs on every API call",
      "A component that wraps the layout"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you apply a middleware named auth to one page?",
    "topic": "Protecting routes",
    "choices": [
      "<NuxtPage auth />",
      "definePageMeta({ middleware: 'auth' })",
      "nuxt.config.ts: pages.auth = true",
      "Import it and call it in onMounted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which helper redirects from route middleware?",
    "topic": "Protecting routes",
    "choices": [
      "this.$router.go('/login')",
      "throw redirect('/login')",
      "window.location = '/login'",
      "return navigateTo('/login')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a global middleware file named auth.global.ts do?",
    "topic": "Protecting routes",
    "choices": [
      "Runs only on the home page",
      "Runs only once after login",
      "Runs on every route navigation without being listed",
      "Runs only on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is client-side route protection alone not enough?",
    "topic": "Protecting routes",
    "choices": [
      "Hidden routes are removed from the build",
      "A user can still call the API directly",
      "Browsers disable route middleware in production builds",
      "Route middleware only runs on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good UX for redirecting an unauthenticated visitor?",
    "topic": "Protecting routes",
    "choices": [
      "Redirect to a 500 error page",
      "Show a blank page with no explanation",
      "Send them to login and return them to the page they wanted afterwards",
      "Log them in automatically as a guest admin"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does route middleware run on the first request with SSR?",
    "topic": "Protecting routes",
    "choices": [
      "On the server during rendering",
      "Only when the user clicks a link",
      "Only in the browser after hydration",
      "Never during SSR"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you protect a whole group of pages under /dashboard?",
    "topic": "Protecting routes",
    "choices": [
      "Block /dashboard in robots.txt",
      "Disable client navigation",
      "Use a middleware in a shared layout or page meta for those pages",
      "Add a password to the folder name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if middleware returns nothing?",
    "topic": "Protecting routes",
    "choices": [
      "Navigation is cancelled",
      "The server restarts",
      "Navigation continues to the route",
      "The user is logged out"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can route middleware inspect to decide on a redirect?",
    "topic": "Protecting routes",
    "choices": [
      "Only the browser's window size",
      "The target and current route, plus the auth state",
      "The contents of the database directly from the client",
      "The server's environment variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can server handlers read the logged-in user?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "From the browser's localStorage",
      "From event.context set by middleware",
      "From a global variable shared by all requests",
      "From the page's HTML"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a component read the current user on the client?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "By querying the database from the component",
      "By decoding the password cookie directly",
      "By reading process.env.USER",
      "From a composable such as useUserSession backed by shared state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why fetch the session on the server during SSR?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "So the first HTML already reflects the signed-in state, avoiding a flash",
      "So the page is cached for every user",
      "So passwords can be verified in the browser",
      "So cookies can be deleted before hydration"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a flash of unauthenticated content?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "A cached error page",
      "A security alert shown after a failed login",
      "A bug where the user is logged out at random",
      "The page briefly shows logged-out UI before the client learns the user is logged in"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should user data exposed to the client contain?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "The refresh token and session secret",
      "Only safe fields such as id, name and role",
      "All columns from the users table",
      "The password hash, for client-side checking"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should the UI do when a session expires while the user is on a page?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "Ignore the error and keep showing old data",
      "Handle 401 responses by prompting for login or redirecting",
      "Silently log in as another user",
      "Reload the browser every second"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can shared auth helpers be organized across client and server?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "All logic in app.vue",
      "All logic in the public directory",
      "Everything in one file imported on both sides",
      "Server-only code in server/utils"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why not rely on user role stored in localStorage for authorization?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "Users can edit it, so the server must verify the role",
      "localStorage is cleared after each request",
      "Browsers refuse to read it on HTTPS",
      "Roles can't be stored as strings"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean to refresh a session?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "Changing the user's password",
      "Extending its lifetime, or issuing a new token before the old one expires",
      "Copying the session to another device",
      "Deleting the user's account"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A page needs the user's name immediately. What is a reliable way?",
    "topic": "Accessing the user on server and client",
    "choices": [
      "Fetch it in onMounted and render nothing until then",
      "Guess it from the URL",
      "Store it in a global variable on the server",
      "Read it from SSR-hydrated session state shared through useState or the auth composable"
    ],
    "answerIdx": 3
  }
]
```

LAYER: nuxt-dev-8

```json
[
  {
    "stem": "How do you enable an official Nuxt module such as @nuxt/image?",
    "topic": "Using official modules",
    "choices": [
      "Copy its source into the plugins folder and rename the files accordingly",
      "Add its name to package.json under a nuxt key and restart the editor",
      "Install the package and add it to the modules array in nuxt.config.ts",
      "Import it in app.vue and call its setup function inside onMounted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a Nuxt module do that a plain plugin usually cannot?",
    "topic": "Using official modules",
    "choices": [
      "Add new HTML elements to the language's specification",
      "Extend the build, add components",
      "Replace the Vue runtime with a different rendering engine",
      "Run only in the browser after hydration and read the DOM"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command adds a module and updates the config for you?",
    "topic": "Using official modules",
    "choices": [
      "npx vue add <name> --nuxt",
      "npx nuxt module add <name>",
      "npm run nuxt-install <name> --config",
      "npm exec nuxt --modules <name>"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use official or well-maintained modules instead of wiring each tool by hand?",
    "topic": "Using official modules",
    "choices": [
      "They always make the bundle smaller regardless of how they are configured",
      "They remove the need to write any configuration in nuxt.config.ts",
      "They are required by Nuxt, which refuses to start without any module",
      "They integrate with Nuxt's build"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the @nuxt/content module provide?",
    "topic": "Using official modules",
    "choices": [
      "A CSS reset for server-rendered pages",
      "A file-based CMS that queries Markdown",
      "A visual editor for the Vue components in the project",
      "A database server that runs inside Nitro"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @pinia/nuxt do?",
    "topic": "Using official modules",
    "choices": [
      "Adds a database layer to Pinia stores for server persistence",
      "Integrates Pinia with Nuxt",
      "Converts Pinia stores into server API routes automatically",
      "Replaces Nuxt's routing with Pinia's own router implementation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do module options usually go?",
    "topic": "Using official modules",
    "choices": [
      "In a .env file that the module parses on startup",
      "In the public directory, where modules look for settings",
      "In the module's package.json, which Nuxt reads at runtime",
      "In a config key named after the module in nuxt.config.ts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a risk of adding many modules to a project?",
    "topic": "Using official modules",
    "choices": [
      "The app can no longer be deployed to serverless hosts",
      "Nuxt disables server-side rendering after the third module",
      "Modules are never updated, so each one eventually breaks",
      "More dependencies to maintain"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the @nuxt/devtools module help with?",
    "topic": "Using official modules",
    "choices": [
      "Compiling the app into a native mobile application",
      "Generating the app's marketing copy",
      "Inspecting components, routes, state and modules while developing",
      "Deploying the app to production with one click"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is defineNuxtModule used for?",
    "topic": "Using official modules",
    "choices": [
      "Creating a plugin that runs in the browser only",
      "Defining a database model for Prisma",
      "Authoring your own module with options",
      "Declaring a Vue component that is registered globally"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the NuxtImg component from @nuxt/image provide?",
    "topic": "Image and font optimization",
    "choices": [
      "Optimized images with resizing",
      "A way to upload images directly to the database",
      "A background image setting for the root element",
      "A canvas element for drawing shapes in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why serve images in modern formats like WebP or AVIF?",
    "topic": "Image and font optimization",
    "choices": [
      "They are the only formats that browsers can display",
      "They usually give smaller files at similar visual quality",
      "They bypass the browser cache for faster updates",
      "They make images editable in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the sizes attribute with responsive images help the browser decide?",
    "topic": "Image and font optimization",
    "choices": [
      "Whether the image should be shown in dark mode",
      "Which image width to download for the current layout and screen",
      "The order in which images are loaded on the page",
      "How much memory the image will use on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does loading='lazy' on an image do?",
    "topic": "Image and font optimization",
    "choices": [
      "Loads the image on the server only",
      "Stops the image from being cached by the browser",
      "Loads the image at a lower resolution first",
      "Defers loading until the image is near the viewport"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which image should usually not be lazy loaded?",
    "topic": "Image and font optimization",
    "choices": [
      "Images in a long list",
      "Decorative background images",
      "Images in the footer",
      "The large image visible at the top of the page (LCP element)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why set width and height on images?",
    "topic": "Image and font optimization",
    "choices": [
      "The server uses them to rename the file",
      "Search engines require both for indexing",
      "The browser reserves space",
      "The browser can skip downloading images that are too large"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @nuxt/fonts optimize?",
    "topic": "Image and font optimization",
    "choices": [
      "Loading of web fonts",
      "Font licensing for commercial use",
      "Compression of the JavaScript bundle on the server",
      "The rendering of system fonts in the operating system"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can web fonts cause layout shift?",
    "topic": "Image and font optimization",
    "choices": [
      "Fonts alter the order of elements in the DOM",
      "Text may reflow when the custom font replaces the fallback font",
      "The browser refuses to render text until fonts finish downloading",
      "Fonts change the size of the viewport"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does font-display: swap do?",
    "topic": "Image and font optimization",
    "choices": [
      "Replaces the font after the user scrolls",
      "Loads the font from a different domain",
      "Hides all text until the web font has fully loaded",
      "Shows fallback text immediately"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of self-hosting fonts instead of requesting them from a third-party at runtime?",
    "topic": "Image and font optimization",
    "choices": [
      "Fonts are automatically licensed for all uses",
      "The browser no longer needs to cache fonts",
      "Fonts download twice as fast on every device",
      "Fewer external connections and more control over caching"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a custom composable in Nuxt?",
    "topic": "Writing custom composables",
    "choices": [
      "A function using Vue",
      "A configuration object exported from nuxt.config.ts",
      "A component stored in the layouts folder",
      "A server route that returns JSON"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a composable like useCounter commonly return refs and functions?",
    "topic": "Writing custom composables",
    "choices": [
      "Composables cannot return plain values at all",
      "Returned refs are copied so the composable stays private",
      "Functions are required to trigger server-side rendering",
      "The caller gets reactive state and ways to change it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What caution applies to composables that call useFetch or useNuxtApp?",
    "topic": "Writing custom composables",
    "choices": [
      "They must run in a valid context",
      "They must never be exported from files",
      "They run once for the whole application lifetime",
      "They can run only on the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a composable share state across components in an SSR-safe way?",
    "topic": "Writing custom composables",
    "choices": [
      "Store the state on window",
      "Use a global variable on the server",
      "Use useState with a unique key",
      "Declare a top-level ref in the module"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which name fits a composable for the current theme?",
    "topic": "Writing custom composables",
    "choices": [
      "themeComposable",
      "getThemeVue",
      "createThemeComponent",
      "useTheme"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Should composables read DOM elements like window directly at the top level?",
    "topic": "Writing custom composables",
    "choices": [
      "Yes, because Nuxt provides window on the server",
      "Yes, since the DOM exists during SSR",
      "Only in plugins, never in composables",
      "No, guard browser-only code with import.meta.client or onMounted"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an advantage of splitting logic into small composables?",
    "topic": "Writing custom composables",
    "choices": [
      "Faster hydration because functions are compiled separately",
      "Automatic caching of all function results",
      "Reuse and easier testing of focused pieces of logic",
      "Smaller HTML responses for every route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you pass options to a composable while keeping defaults?",
    "topic": "Writing custom composables",
    "choices": [
      "Accept an options object",
      "Read options from process.env only",
      "Store options in the URL",
      "Require every option to be positional"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do composables in nested folders get auto-imported by default?",
    "topic": "Writing custom composables",
    "choices": [
      "No nested files are ever imported",
      "Only files that start with use are scanned at any depth",
      "Every file at any depth is scanned automatically",
      "Only top-level files in composables are scanned unless you configure imports.dirs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can go wrong if a composable stores per-user data in a module-level variable on the server?",
    "topic": "Writing custom composables",
    "choices": [
      "Data can leak between requests from different users",
      "The variable is deleted on every request",
      "The browser refuses to hydrate the page",
      "The variable becomes read-only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Nuxt plugin?",
    "topic": "Plugins",
    "choices": [
      "A file that runs when the app starts, used to register libraries or provide helpers",
      "A file that defines page layouts",
      "A server route for static assets",
      "A CSS file loaded before the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which function defines a plugin?",
    "topic": "Plugins",
    "choices": [
      "createNuxtPlugin",
      "registerPlugin",
      "defineNuxtPlugin",
      "definePlugin"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you make a helper available as $hello in templates and useNuxtApp()?",
    "topic": "Plugins",
    "choices": [
      "Export it as default from composables",
      "Return { provide: { hello } } from the plugin",
      "Assign it to window.$hello inside the plugin",
      "Add it to nuxt.config.ts under helpers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does naming a plugin analytics.client.ts do?",
    "topic": "Plugins",
    "choices": [
      "Runs it only in production",
      "Runs it only during the build",
      "Runs it only in the browser",
      "Runs it only on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you control the order in which plugins run?",
    "topic": "Plugins",
    "choices": [
      "List plugin names in package.json",
      "Order is random and cannot be controlled",
      "Prefix file names with numbers",
      "Rename the plugins folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good use for a client-only plugin?",
    "topic": "Plugins",
    "choices": [
      "Reading environment variables from a database",
      "Initializing a browser-only analytics or UI library",
      "Defining server API routes",
      "Declaring Prisma models"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What argument does a plugin function receive?",
    "topic": "Plugins",
    "choices": [
      "The page's HTML string",
      "The nuxtApp instance",
      "The Express request object",
      "A Vue component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How is a plugin different from a composable?",
    "topic": "Plugins",
    "choices": [
      "A plugin is called in templates, while a composable runs only in the server",
      "They are identical and interchangeable",
      "A plugin runs once at startup",
      "A plugin is always asynchronous, while a composable is always synchronous"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might heavy work inside a plugin hurt performance?",
    "topic": "Plugins",
    "choices": [
      "Plugins run during startup",
      "Plugins are bundled twice into every route",
      "Plugins are cached so performance cannot change",
      "Plugins run only after the page has unloaded"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a plugin register a Vue directive?",
    "topic": "Plugins",
    "choices": [
      "By adding it to app.config.ts",
      "By exporting it from layouts",
      "With document.registerDirective",
      "With nuxtApp.vueApp.directive('name', definition)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a runtime hook in Nuxt?",
    "topic": "Runtime hooks",
    "choices": [
      "A named point in the app's lifecycle where code can run, such as app:created",
      "A CSS rule that runs on a timer",
      "A database trigger that fires on updates",
      "A package.json script executed after deployment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you listen to a hook in a plugin?",
    "topic": "Runtime hooks",
    "choices": [
      "onHook('page:finish', callback)",
      "nuxtApp.hook('page:finish', callback)",
      "watch('page:finish', callback)",
      "document.addEventListener('page:finish', callback)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between Nuxt runtime hooks and build-time hooks?",
    "topic": "Runtime hooks",
    "choices": [
      "Build-time hooks fire after every request",
      "They are the same and can be swapped",
      "Runtime hooks fire while the app runs; build-time hooks fire",
      "Runtime hooks fire in the database, build-time hooks in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hook could you use to react when a navigation finishes?",
    "topic": "Runtime hooks",
    "choices": [
      "app:mounted only",
      "vue:setup",
      "build:done",
      "page:finish"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you handle all unhandled Vue errors globally?",
    "topic": "Runtime hooks",
    "choices": [
      "With the vue:error hook or vueApp.config.errorHandler in a plugin",
      "With a try/catch around the root element",
      "By adding an error attribute to app.vue",
      "By returning an error object from the layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does nuxtApp.callHook('my:event', data) do?",
    "topic": "Runtime hooks",
    "choices": [
      "Registers a new listener for the hook",
      "Pauses the app until the hook returns",
      "Deletes the hook from the app",
      "Triggers all listeners registered for that hook"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which hook lets a module add pages to the router at build time?",
    "topic": "Runtime hooks",
    "choices": [
      "page:start",
      "pages:extend",
      "app:created",
      "vue:error"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are Nitro hooks such as render:response used for?",
    "topic": "Runtime hooks",
    "choices": [
      "Interacting with the server's request handling and rendering",
      "Watching files for changes",
      "Defining page transitions in the browser",
      "Changing CSS variables at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should hook callbacks be fast?",
    "topic": "Runtime hooks",
    "choices": [
      "They are cancelled after a second",
      "They run only once per deployment",
      "They run in a separate process",
      "They run in the app's critical path and can delay rendering or navigation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you register a hook but never remove it in a long-lived context?",
    "topic": "Runtime hooks",
    "choices": [
      "Callbacks can pile up and leak memory",
      "The hook is automatically unregistered after one call",
      "Nothing; hooks cannot leak",
      "The app crashes immediately"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Nuxt layer?",
    "topic": "Layers for reuse",
    "choices": [
      "A server cache between Nitro and the browser",
      "A middleware that wraps API calls",
      "A Nuxt project that another project extends to reuse its config, components and pages",
      "A CSS stacking context applied to the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a project use a layer?",
    "topic": "Layers for reuse",
    "choices": [
      "By adding it to the router",
      "By listing it in the extends option of nuxt.config.ts",
      "By copying its folder into node_modules",
      "By importing it in app.vue"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when the app and a layer both define a component with the same name?",
    "topic": "Layers for reuse",
    "choices": [
      "Both are rendered together",
      "The layer's version always wins",
      "The app's version overrides the layer's",
      "Nuxt raises an error and stops"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a layer provide?",
    "topic": "Layers for reuse",
    "choices": [
      "Only TypeScript types",
      "Only CSS variables",
      "Components, composables, pages, layouts, plugins and configuration",
      "Only server routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where can a layer live?",
    "topic": "Layers for reuse",
    "choices": [
      "In a local folder, an npm package or a Git repository",
      "Only in the public directory",
      "Only inside the pages folder",
      "Only in a database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a layer a better choice than a module?",
    "topic": "Layers for reuse",
    "choices": [
      "When sharing a ready Nuxt project structure such as a design system or app starter",
      "When running code at build time to patch Vite",
      "When writing tests",
      "When adding a database driver"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are configuration values merged between a layer and the app?",
    "topic": "Layers for reuse",
    "choices": [
      "Only the first key is merged",
      "They are deeply merged, with the app taking priority",
      "The layer's config replaces the app's config completely",
      "Configs cannot be merged"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does a design system make a good layer?",
    "topic": "Layers for reuse",
    "choices": [
      "Several apps can share components",
      "Layers make components load faster than normal",
      "Layers remove the need for CSS",
      "Layers encrypt component code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you reference a layer in a GitHub repository?",
    "topic": "Layers for reuse",
    "choices": [
      "import 'github:user/repo'",
      "extends: ['github:user/repo']",
      "layers: github.com/user/repo",
      "extends: ['https://github.com/user/repo.git/pages']"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a consideration when depending on many layers?",
    "topic": "Layers for reuse",
    "choices": [
      "Only one layer is allowed per app",
      "Layers must be written in JavaScript only",
      "Load order and overrides can make behavior harder to trace",
      "Each layer doubles the server response time"
    ],
    "answerIdx": 2
  }
]
```

LAYER: nuxt-dev-9

```json
[
  {
    "stem": "What does Largest Contentful Paint (LCP) measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "How long the page takes to respond to the first user click",
      "How long the server takes to send the first byte of the response",
      "How much the layout shifts while the page loads",
      "How long the largest visible content element takes to render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Cumulative Layout Shift (CLS) measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "The delay between a user's tap and the next visual update",
      "The time that passes before the very first pixel is painted on the screen",
      "The total number of bytes downloaded by the page",
      "Unexpected movement of visible elements during the page's life"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which metric replaced First Input Delay as the Core Web Vital for responsiveness?",
    "topic": "Core Web Vitals",
    "choices": [
      "Time to First Byte (TTFB)",
      "Total Blocking Time (TBT)",
      "Interaction to Next Paint (INP)",
      "First Contentful Paint (FCP)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which choice commonly improves LCP for a hero image?",
    "topic": "Core Web Vitals",
    "choices": [
      "Load it with a client-side script once the page has finished hydrating in the browser",
      "Preload it, size it correctly",
      "Convert it to a background image set by JavaScript",
      "Place it below the fold so it loads later"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What often causes poor CLS?",
    "topic": "Core Web Vitals",
    "choices": [
      "Serving the page over HTTPS",
      "Images, ads or fonts that load",
      "Using too few reusable components in the shared layout of the application pages",
      "Having a long page title"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What often hurts INP?",
    "topic": "Core Web Vitals",
    "choices": [
      "Large server-rendered HTML for the very first request that the browser receives",
      "Too many meta tags in the head",
      "Long JavaScript tasks that block the main thread when users interact",
      "Missing alt text on images"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between lab data and field data?",
    "topic": "Core Web Vitals",
    "choices": [
      "Lab data comes from real users on their own devices, field data from simulated runs",
      "Lab data is measured in a controlled test",
      "They are the same data presented in two charts",
      "Lab data covers only mobile devices, field data only desktop"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is TTFB?",
    "topic": "Core Web Vitals",
    "choices": [
      "The time the user spends reading the page",
      "The time until the browser receives the first byte of the response",
      "The time until the largest image is painted",
      "The total time spent running JavaScript"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Nuxt feature can improve TTFB for mostly static pages?",
    "topic": "Core Web Vitals",
    "choices": [
      "Prerendering or caching responses at the edge",
      "Removing server routes",
      "Loading all data in onMounted",
      "Rendering every route on the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do Core Web Vitals matter for a site?",
    "topic": "Core Web Vitals",
    "choices": [
      "They reflect real user experience",
      "They are required for a site to be listed in search results at all",
      "They measure only the size of the repository",
      "They decide which framework a site must use"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does lazy loading a component accomplish?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "The component is rendered twice for faster hydration",
      "The component skips server-side rendering forever",
      "The component's code is downloaded only when it is needed",
      "The component is cached in the user's account"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you lazy load a component in Nuxt templates?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "Prefix its name with Lazy",
      "Wrap the component in <Suspense> only, which delays its download until it is needed",
      "Rename its file with .lazy.vue",
      "Add the lazy attribute to the import"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is code splitting?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "Compressing code with gzip",
      "Dividing a component into several files",
      "Splitting a repository into multiple Git projects",
      "Breaking the bundle into smaller chunks that load on demand"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Nuxt split code by default?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "All of the pages are bundled together into one single file that is loaded up front",
      "Code is split only in development",
      "Only components are split",
      "Each route gets its own chunk loaded on navigation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a dynamic import (import('./heavy.js')) enable?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "Importing a module before the build",
      "Loading a module at runtime when it is needed",
      "Skipping bundling",
      "Importing every file in a folder"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does lazy hydration (such as hydrate-on-visible) do?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "Removes the component's HTML from the page",
      "Hydrates the component twice",
      "Delays making a server-rendered component interactive until a condition is met",
      "Skips server rendering for the component and renders it only inside the browser later"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of lazy loading everything?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "Pages lose their metadata",
      "The server stops rendering HTML",
      "Pages stop working offline",
      "Too many small requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does NuxtLink prefetching do?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "Caches API responses on the server",
      "Preloads every image on the whole site as soon as the first page is requested",
      "Replaces server rendering",
      "Loads a linked route's code in advance when the link is visible"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which third-party scripts should be deferred or loaded lazily?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "Critical CSS",
      "Non-critical ones such as chat widgets and analytics",
      "The page's HTML",
      "The main application bundle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why analyze the bundle with a visualizer?",
    "topic": "Lazy loading and code splitting",
    "choices": [
      "To check spelling",
      "To count the number of components",
      "To measure the server's CPU",
      "To find large dependencies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the routeRules option swr: 3600 do?",
    "topic": "Caching and ISR",
    "choices": [
      "Forces the browser to reload every hour",
      "Deletes the cached page after an hour and forces every visitor to wait for a rebuild",
      "Serves a cached response",
      "Blocks requests for an hour after a deployment"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is ISR?",
    "topic": "Caching and ISR",
    "choices": [
      "Rendering the pages in the browser only, after the JavaScript bundle has downloaded",
      "A tool that compresses images on the server",
      "A tool for rewriting URLs",
      "Serving a static page that is regenerated after a set time or on demand"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which header controls how long browsers and CDNs may reuse a response?",
    "topic": "Caching and ISR",
    "choices": [
      "Cache-Control",
      "Content-Type",
      "Accept-Language",
      "Authorization"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why give hashed asset files a long cache lifetime?",
    "topic": "Caching and ISR",
    "choices": [
      "The file name changes when content changes, so old versions are never wrongly reused",
      "Browsers ignore cache headers for hashed assets entirely, so the lifetime has no real effect",
      "Long lifetimes make files smaller",
      "Assets are small enough not to matter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of caching a personalized page at the CDN?",
    "topic": "Caching and ISR",
    "choices": [
      "The CDN refuses to serve HTML",
      "The page becomes uncacheable",
      "The page will not load over HTTPS",
      "One user's content could be shown to another"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does prerender: true in routeRules do for a route?",
    "topic": "Caching and ISR",
    "choices": [
      "Builds the route to static HTML at build time",
      "Hides the route from users",
      "Disables caching",
      "Renders the route only in the browser after the JavaScript bundle has loaded fully"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you purge stale content after publishing an article with ISR or CDN caching?",
    "topic": "Caching and ISR",
    "choices": [
      "Delete the whole site",
      "Restart the user's browser",
      "Trigger a revalidation or purge for the affected paths",
      "Wait for the user to clear cookies"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of serving cached HTML from the edge?",
    "topic": "Caching and ISR",
    "choices": [
      "The server does not need any code",
      "Lower latency because responses come from a location close to the user",
      "Pages never change after the first request, so nothing ever has to be rebuilt or purged",
      "Pages are encrypted twice"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Vary header tell caches?",
    "topic": "Caching and ISR",
    "choices": [
      "Which request headers change the response, so entries are stored separately",
      "How often the page varies in layout between the desktop and the mobile versions of it",
      "Which pages are different on mobile",
      "The size of the response"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a stale response?",
    "topic": "Caching and ISR",
    "choices": [
      "A response from a private network",
      "A cached response that has passed its freshness lifetime",
      "A response with no body",
      "A response with an error status"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is structured data (JSON-LD) used for?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Defining CSS variables",
      "Storing each visitor's preferences so that pages can be personalized on later visits",
      "Describing page content in a machine-readable way for search engines",
      "Encrypting HTML"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you add JSON-LD to a Nuxt page?",
    "topic": "Structured data and meta tags",
    "choices": [
      "With useHead, adding a script tag of type application/ld+json",
      "By editing the browser's developer tools after the page has finished loading in a tab",
      "By placing it inside a Vue template comment",
      "By adding it to the CSS file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can valid structured data enable in search results?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Faster JavaScript parsing",
      "Higher server uptime because search engines will cache the page for a longer period",
      "Rich results such as ratings, recipes or product details",
      "Automatic translation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How long should a meta description roughly be to avoid truncation in results?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Under 20 characters, so that it always fits on a single line in the results page",
      "It must be exactly 100 characters",
      "Under 20 characters",
      "Around 150 to 160 characters"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tag helps avoid duplicate-content issues across similar URLs?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Canonical link",
      "Refresh meta",
      "Viewport meta",
      "Charset meta"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do Open Graph tags control?",
    "topic": "Structured data and meta tags",
    "choices": [
      "The page's caching behavior",
      "How a link appears when shared on social platforms",
      "The page's color scheme",
      "How a page ranks in search"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should each page have a unique title?",
    "topic": "Structured data and meta tags",
    "choices": [
      "Browsers refuse to open two pages that have identical titles in the same session",
      "It helps users and search engines tell pages apart",
      "It is required by HTTP",
      "It reduces JavaScript size"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the risk of generating structured data that doesn't match visible page content?",
    "topic": "Structured data and meta tags",
    "choices": [
      "The CSS breaks",
      "The server rejects the request",
      "The page stops rendering",
      "Search engines may ignore it or apply a penalty"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you validate structured data?",
    "topic": "Structured data and meta tags",
    "choices": [
      "With a rich results testing tool or schema validator",
      "By viewing it in a text editor",
      "By checking the file size",
      "By compiling the page twice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which module helps manage schema.org data in Nuxt?",
    "topic": "Structured data and meta tags",
    "choices": [
      "@pinia/nuxt",
      "nuxt-schema-org",
      "@nuxt/image",
      "@nuxt/fonts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a sitemap.xml file do?",
    "topic": "Sitemap and robots",
    "choices": [
      "Defines the site's layout",
      "Stores the site's cookies",
      "Lists URLs you want search engines to discover and crawl",
      "Blocks the listed pages from being indexed by search engines until they are reviewed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does robots.txt do?",
    "topic": "Sitemap and robots",
    "choices": [
      "Defines HTTP headers",
      "Lists the site's pages for users",
      "Tells crawlers which paths they may or may not crawl",
      "Encrypts the site's content so that only approved crawlers are able to read the pages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Is Disallow in robots.txt a reliable way to keep a page out of search results?",
    "topic": "Sitemap and robots",
    "choices": [
      "Yes; crawlers treat Disallow as a noindex directive for the matching URLs",
      "Yes; blocked pages are removed from the index immediately after crawling",
      "No; Disallow applies only to images and scripts, never to HTML pages",
      "No; a blocked URL can still appear if other pages link to it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which approach reliably keeps a page out of the index?",
    "topic": "Sitemap and robots",
    "choices": [
      "Renaming the file",
      "Blocking the URL in robots.txt only, which stops crawlers from reading the page",
      "Removing it from the sitemap only",
      "A noindex robots meta tag or header, with the page crawlable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should the sitemap location be declared?",
    "topic": "Sitemap and robots",
    "choices": [
      "In package.json",
      "Inside each page's stylesheet, where crawlers look for a sitemap rule when they visit",
      "In robots.txt with a Sitemap line, or submitted in search console",
      "In the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a sitemap include?",
    "topic": "Sitemap and robots",
    "choices": [
      "Canonical, indexable URLs",
      "Every URL on the site including redirects, error pages and pages behind a login",
      "Only URLs behind a login",
      "Only the home page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which module generates a sitemap automatically in Nuxt?",
    "topic": "Sitemap and robots",
    "choices": [
      "@nuxt/ui",
      "@nuxtjs/sitemap",
      "@nuxt/test-utils",
      "@nuxt/image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can dynamic routes (like blog posts) appear in a generated sitemap?",
    "topic": "Sitemap and robots",
    "choices": [
      "They cannot be included",
      "By adding them to the CSS",
      "By providing a source of URLs from an API or content layer",
      "They are included automatically without any data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should staging environments block crawlers?",
    "topic": "Sitemap and robots",
    "choices": [
      "To make deployments faster",
      "To avoid duplicate or unfinished pages being indexed",
      "To reduce hosting costs",
      "To hide the site's source code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if robots.txt accidentally disallows the whole production site?",
    "topic": "Sitemap and robots",
    "choices": [
      "Nothing changes",
      "The site stops loading",
      "Search engines stop crawling the site, harming visibility",
      "Search engines crawl faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Lighthouse audit?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Performance, accessibility, best practices and SEO of a page",
      "Only the uptime of the server and the speed of its responses to each of the requests",
      "Only database queries",
      "Only JavaScript errors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can Lighthouse scores differ between runs?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Scores depend on the order in which the audits are listed in the report",
      "The page's markup is rewritten after each audit completes",
      "Network, CPU and device conditions vary between tests",
      "Lighthouse randomly samples half of the page's resources on each run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should you interpret a single Lighthouse score?",
    "topic": "Lighthouse auditing",
    "choices": [
      "As a guarantee of how the page will rank in search results for its main keywords",
      "As a legal requirement",
      "As the only measure of quality",
      "As a directional lab signal"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an advantage of running Lighthouse in CI?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Tests run faster",
      "Pages are fixed automatically whenever an audit finds a performance problem in them",
      "Servers are scaled automatically",
      "Regressions are caught before they reach production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where can you see real-user Core Web Vitals data?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Only in the browser console of the developer who deployed the latest version of site",
      "In field-data sources like CrUX or PageSpeed Insights",
      "Only in Git history",
      "In package-lock.json"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Lighthouse category includes checks for alt text and color contrast?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Accessibility",
      "Performance",
      "Performance, which also covers the checks for alt text on images",
      "Best practices"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A Lighthouse run suggests removing unused JavaScript. What would be a Nuxt-friendly fix?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Inline all scripts in the HTML",
      "Disable minification so that the browser can skip the unused code more easily at load",
      "Lazy load heavy components",
      "Move scripts into CSS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why test with throttled mobile settings?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Many users have slower devices",
      "Throttling makes pages load faster, which helps to produce more stable audit results",
      "It reduces the Lighthouse score on purpose",
      "Mobile is the only supported platform"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does 'opportunities' in a Lighthouse report refer to?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Suggested changes with estimated time savings",
      "Ranking gains that search engines have promised for each recommended fix",
      "Extra features that could be added to the navigation of the site",
      "Estimated savings in server costs for each hosting plan you could choose"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which practice makes performance work sustainable?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Ignoring regressions",
      "Setting budgets and monitoring metrics over time",
      "Testing only on a fast laptop",
      "Optimizing the whole site once, shortly before launch, and then leaving it untouched"
    ],
    "answerIdx": 1
  }
]
```

LAYER: nuxt-dev-10

```json
[
  {
    "stem": "What is Vitest?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "A browser automation tool that drives real Chrome windows for tests",
      "A Vue component library with prebuilt accessible widgets for forms",
      "A type checker that validates TypeScript without running any code",
      "A fast test runner that shares Vite's config and transforms"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes a good unit test?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "It exercises the entire app through a real browser on every run",
      "It prints values to the console so a person can inspect them by eye",
      "It depends on the results of the tests that ran before it in the suite",
      "It checks one small behavior in isolation and fails for a clear reason"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Vitest function groups related tests?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "bundle",
      "collect",
      "suite.group",
      "describe"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you assert that a value equals 4 in Vitest?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "expect(value).toBe(4)",
      "check(value, 4)",
      "assert.value(4).equal()",
      "value.mustEqual(4)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between toBe and toEqual?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "toBe compares structure, while toEqual compares references only",
      "toBe works on strings only, while toEqual works on numbers only",
      "They behave identically for every kind of value in JavaScript",
      "toBe compares with Object.is"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does vi.fn() create?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "A mock function that records how it was called",
      "A timer that waits until the test has finished",
      "A real function that is saved to disk between test runs",
      "A Vue component used to render a test fixture"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why mock a network call in a unit test?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "So the code under test is compiled before the tests start",
      "So the network is permanently disabled on the developer's machine",
      "So the test always passes regardless of the code under test",
      "So the test is fast and doesn't depend on a real server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does vi.useFakeTimers() allow?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "Skipping tests that take longer than a second to finish",
      "Measuring how long each test takes in milliseconds",
      "Running tests on a server with a different system clock",
      "Controlling setTimeout and setInterval so time-based code can be tested quickly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kind of code is simplest to unit test?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "Pure functions that return a value from their inputs",
      "Functions that read the current time and random numbers",
      "Code that talks to the database on import",
      "Handlers that call several external services in a row"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a coverage report tell you?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "How fast the tests ran",
      "How many users the app has",
      "Which lines or branches ran during tests",
      "Whether the tests assert the correct behavior"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @nuxt/test-utils provide?",
    "topic": "Nuxt test utils",
    "choices": [
      "A replacement for Vitest with a different assertion syntax",
      "A deployment tool for test environments",
      "Helpers to test Nuxt apps",
      "A database used only when tests are running"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function mounts a component inside the Nuxt environment for testing?",
    "topic": "Nuxt test utils",
    "choices": [
      "mountSuspended",
      "renderComponentOnly",
      "mountNuxtPage, which renders a single page route from the pages folder",
      "shallowRender"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does mockNuxtImport help with?",
    "topic": "Nuxt test utils",
    "choices": [
      "Loading mock data from a CSV file",
      "Importing a file from outside the project",
      "Replacing an auto-imported composable in a test",
      "Mocking the whole build step so that no Nuxt code is compiled during tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does registerEndpoint do in a Nuxt test?",
    "topic": "Nuxt test utils",
    "choices": [
      "Defines a mock server endpoint that the code under test can call",
      "Starts the production server on a random port",
      "Registers a new page route in nuxt.config.ts",
      "Adds an endpoint to the API documentation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of setting the environment to nuxt in Vitest config?",
    "topic": "Nuxt test utils",
    "choices": [
      "Tests run with Nuxt's auto-imports",
      "Tests are translated into Playwright scripts",
      "Tests are executed against the production server after it has been deployed",
      "Tests are skipped when the Nuxt version changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which component test would be most valuable?",
    "topic": "Nuxt test utils",
    "choices": [
      "Render with props, simulate a click",
      "Verify that every CSS class appears in a snapshot",
      "Count how many lines the template contains",
      "Check that the component file has a particular name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of heavy snapshot testing?",
    "topic": "Nuxt test utils",
    "choices": [
      "Snapshots only work on the server",
      "Snapshots can't be used with Vue",
      "Snapshots get updated blindly",
      "Snapshots can't be used with Vue components because they render to the DOM"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the @nuxt/test-utils setup function with an e2e flag do?",
    "topic": "Nuxt test utils",
    "choices": [
      "Resets the database",
      "Opens the Nuxt DevTools",
      "Compiles the tests to native code",
      "Builds and starts a Nuxt app"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why test server API handlers directly?",
    "topic": "Nuxt test utils",
    "choices": [
      "They are required by the framework",
      "They are the only part of Nuxt that can fail",
      "They run faster than components in every case",
      "They hold business logic"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should you test a composable that uses useState?",
    "topic": "Nuxt test utils",
    "choices": [
      "Run it inside the Nuxt environment",
      "Copy its body into the test file",
      "Call it from a plain Node script without any setup",
      "Replace useState with localStorage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an end-to-end (E2E) test?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "A test of one function with mocked inputs",
      "A test that checks only the CSS",
      "A test that drives the app like a user through a real browser",
      "A test that runs during the build only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Playwright?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "A server framework for Node",
      "A tool for automating Chromium, Firefox and WebKit for testing",
      "A package manager",
      "A Vue plugin that adds page transition animations to the router views"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should you target elements in E2E tests to keep them stable?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "By its exact pixel coordinates",
      "By role, label or a dedicated test id",
      "By the element's position in the page",
      "By long CSS selectors that follow the DOM structure"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Playwright's auto-waiting do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Retries the whole suite on failure",
      "Skips steps that take too long",
      "Makes tests run in slow motion",
      "Waits for elements to be actionable before interacting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid fixed sleeps like waitForTimeout in E2E tests?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "They always cause test failures",
      "Playwright doesn't allow them",
      "They make tests slow",
      "They bypass the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a flaky test?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "A test that always fails regardless of any change that was made to the code",
      "A test with no assertions",
      "A test written in a different language",
      "A test that sometimes passes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can E2E tests avoid sharing state between runs?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Use the same user and database row for every test",
      "Disable assertions",
      "Create isolated data per test",
      "Run all tests against production data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a Playwright trace help you do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Generate unit tests",
      "Measure the server's memory",
      "Replay a failed test step by step with screenshots and network info",
      "Rename tests automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which flows deserve E2E tests first?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Every CSS rule",
      "Critical user journeys such as sign-up, login and checkout",
      "All third-party libraries",
      "Every individual utility function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should E2E tests run in a delivery pipeline?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Only after production deploys",
      "Only on the developer's laptop",
      "Against a built preview or staging deployment before release",
      "Only when the repository is private"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Nitro preset?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "A build target that shapes the output for a hosting platform",
      "A preset list of npm scripts",
      "A template for new pages",
      "A saved UI theme for the Nuxt DevTools"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the default node-server preset produce?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "A mobile app bundle",
      "A Node server that you start with node .output/server/index.mjs",
      "A static folder with only HTML files",
      "A Docker image published automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When would you choose static hosting with nuxt generate?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "When every page must be personalized per request",
      "When all content can be prerendered at build time",
      "When the app has user-specific API routes",
      "When you need long-running WebSocket servers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why might you choose an edge or serverless preset?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "To avoid using HTTPS",
      "To run close to users",
      "To get unlimited execution time per request",
      "To skip the build step"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you set the preset when building?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "By adding a preset attribute to app.vue",
      "With the nitro.preset option or the NITRO_PRESET environment variable",
      "By renaming the output folder",
      "By editing the Vue version"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you check before deploying API routes to a serverless platform?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "The number of Vue components",
      "Execution limits, cold starts and supported runtime APIs",
      "The color of the logo",
      "The number of CSS files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can a database connection pattern break on serverless?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "Serverless forbids environment variables",
      "Databases can't accept requests from functions",
      "Serverless platforms block all outgoing traffic",
      "Many short-lived instances can open too many connections"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which hosting target suits an app that needs a persistent process, such as background workers?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "A CDN only",
      "A container or VM with the node-server output",
      "A browser extension store",
      "Static file hosting only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Dockerfile for Nuxt typically do?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "Installs Nuxt globally on the host",
      "Sets up the database schema",
      "Builds the app and runs the .output server in a lightweight image",
      "Compiles Vue components to native code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of picking a preset early in a project?",
    "topic": "Choosing a deployment preset",
    "choices": [
      "Tests are no longer needed",
      "The app becomes faster automatically",
      "Dependencies are installed faster",
      "You discover platform limits before building features that depend on them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why shouldn't secrets be baked into the build output?",
    "topic": "Environment variables in production",
    "choices": [
      "Build output can be shared or exposed",
      "Secrets are removed automatically by the compiler",
      "Browsers refuse to run bundles that contain secrets",
      "Secrets make the bundle too large"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Nuxt read private runtime config values in production?",
    "topic": "Environment variables in production",
    "choices": [
      "From NUXT_ prefixed environment variables at runtime",
      "From the Git history",
      "From the browser's cookies",
      "From a file in the public folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which variable name overrides runtimeConfig.public.apiBase?",
    "topic": "Environment variables in production",
    "choices": [
      "NUXT_API_BASE_PUBLIC, with the word public moved to the end of the name",
      "NUXT_PUBLIC_API_BASE",
      "NUXT_API_BASE_PUBLIC",
      "API_BASE_PUBLIC"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of exposing a variable with the public prefix?",
    "topic": "Environment variables in production",
    "choices": [
      "It's sent to the browser",
      "It prevents the app from starting",
      "It's deleted when the server restarts",
      "It's encrypted twice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should production secrets be managed?",
    "topic": "Environment variables in production",
    "choices": [
      "In the public directory",
      "In the host's secret or environment settings, not in the repository",
      "In a commit message",
      "In a README file that the whole team can open in the repository"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep a .env.example file in the repository?",
    "topic": "Environment variables in production",
    "choices": [
      "It speeds up the build",
      "It stores backups of secrets",
      "It documents required variables",
      "It's loaded automatically in production in place of the real variables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a required variable is missing at startup?",
    "topic": "Environment variables in production",
    "choices": [
      "The variable is read from the browser",
      "Nuxt creates a random value",
      "The app may fail or misbehave",
      "The build runs twice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can different environments (staging, production) use different values?",
    "topic": "Environment variables in production",
    "choices": [
      "By editing the source before each deploy",
      "By using different Vue versions",
      "By renaming the project folder",
      "By setting different environment variables per environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When are variables read by the build rather than at runtime?",
    "topic": "Environment variables in production",
    "choices": [
      "Only for variables with a number in their name",
      "Only for variables in the .git folder",
      "Never; all variables are always runtime",
      "When the code uses them at build time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do if a secret was committed to the repository by mistake?",
    "topic": "Environment variables in production",
    "choices": [
      "Rename the file and add a comment saying the value is old and unused",
      "Rotate it immediately and remove it from the history",
      "Rename the file",
      "Leave it, since the repository is private"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a preview deployment?",
    "topic": "Monitoring and previews",
    "choices": [
      "A local development server",
      "A temporary deployment for a branch or pull request used for review",
      "A backup of the production database",
      "A deployment that only runs tests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are preview deployments useful?",
    "topic": "Monitoring and previews",
    "choices": [
      "They skip the build step",
      "Reviewers can try changes in a real environment before merging",
      "They remove the need for tests",
      "They permanently replace production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you monitor in production besides uptime?",
    "topic": "Monitoring and previews",
    "choices": [
      "Only the build time",
      "Only the repository stars",
      "Only the number of commits",
      "Errors, latency and key user flows"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of an error tracking tool such as Sentry?",
    "topic": "Monitoring and previews",
    "choices": [
      "Collect and group runtime errors with stack traces and context",
      "Replace the logs of the server",
      "Compile TypeScript sources into JavaScript before the application is deployed",
      "Create database migrations"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why add a health check endpoint?",
    "topic": "Monitoring and previews",
    "choices": [
      "It removes the need for logs",
      "It speeds up the home page by caching the response of every request",
      "Platforms and monitors can verify the app is running and ready",
      "It encrypts requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do structured logs make easier?",
    "topic": "Monitoring and previews",
    "choices": [
      "Running tests in parallel",
      "Searching and filtering logs by fields such as request id and level",
      "Faster hydration",
      "Reducing bundle size"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a safe rollback strategy?",
    "topic": "Monitoring and previews",
    "choices": [
      "Keep previous deployments so you can redeploy the last good version quickly",
      "Edit production files by hand",
      "Disable monitoring during a release",
      "Delete the previous version to save space"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does synthetic monitoring do?",
    "topic": "Monitoring and previews",
    "choices": [
      "Runs scripted checks against the live site on a schedule",
      "Generates random traffic for load testing only",
      "Compiles the site",
      "Reads real users' keystrokes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why alert on symptoms users feel, like high error rates, instead of every internal metric?",
    "topic": "Monitoring and previews",
    "choices": [
      "Internal metrics are always wrong",
      "Users create the alerts",
      "Alerts stay actionable and avoid noise",
      "Alerts must be as numerous as possible"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After a deploy, error rates spike. What is the best first action?",
    "topic": "Monitoring and previews",
    "choices": [
      "Delete the logs",
      "Wait to see if it fixes itself",
      "Roll back or disable the change, then investigate",
      "Deploy again without changes"
    ],
    "answerIdx": 2
  }
]
```
