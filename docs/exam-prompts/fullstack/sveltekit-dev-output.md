LAYER: sveltekit-dev-1

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
    "stem": "What does the Vite dev server do differently from a traditional bundler during development?",
    "topic": "The Vite dev server",
    "choices": [
      "Compiles every module to machine code and caches it in the database",
      "Runs the application only on the server and sends screenshots to the browser",
      "Bundles the whole project into a single file before the first page can load",
      "Serves source modules on demand over native ES modules, so startup stays fast"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does hot module replacement (HMR) do in the Vite dev server?",
    "topic": "The Vite dev server",
    "choices": [
      "Rebuilds the production bundle in the background after every edit",
      "Restarts the Node process whenever a dependency is installed or removed",
      "Swaps changed modules in the running page, often preserving component state",
      "Reloads the whole browser tab each time any file in the project is saved"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command starts the SvelteKit development server?",
    "topic": "The Vite dev server",
    "choices": [
      "npm run preview-build-only",
      "npm run dev",
      "npm run start-sveltekit",
      "npm run serve-production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the vite.config.js file configure?",
    "topic": "The Vite dev server",
    "choices": [
      "The database connection used by server-side load functions",
      "The routes and layouts that SvelteKit renders for each URL",
      "Plugins, server options and build settings for Vite",
      "The Git hooks that run before each commit in the project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does Vite pre-bundle some dependencies on startup?",
    "topic": "The Vite dev server",
    "choices": [
      "To copy every package into the public folder for hosting",
      "To encrypt the packages so that browsers cannot read their source",
      "To convert CommonJS packages to ES modules and reduce the number of requests",
      "To remove unused project files from the repository before serving"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you expose an environment variable to client code in a Vite project?",
    "topic": "The Vite dev server",
    "choices": [
      "Add it to package.json under a public key",
      "Wrap it in a script tag inside the HTML template",
      "Prefix its name with VITE_ in the .env file",
      "Name it with a leading underscore in the shell"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does npm run build do in a Vite-based project?",
    "topic": "The Vite dev server",
    "choices": [
      "Produces an optimized, minified production bundle",
      "Runs the unit tests in watch mode",
      "Installs the missing dependencies from the lockfile",
      "Starts the dev server with hot reloading enabled"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does npm run preview do?",
    "topic": "The Vite dev server",
    "choices": [
      "Compares the build against the previous release",
      "Deploys the build to the configured hosting provider",
      "Opens a design preview of the components in the browser",
      "Serves the production build locally so you can check it before deploying"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might a change appear in dev but break in the production build?",
    "topic": "The Vite dev server",
    "choices": [
      "Dev serves unbundled modules, while the build bundles, minifies and tree-shakes the code",
      "Production ignores every environment variable that dev defines",
      "The build removes all CSS files from the application",
      "The dev server runs on a different operating system than the build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Vite plugin typically used for?",
    "topic": "The Vite dev server",
    "choices": [
      "Writing tests for the components in the project",
      "Extending how files are transformed or how the dev server behaves",
      "Hosting the application on a cloud provider automatically",
      "Replacing the browser with a custom rendering engine"
    ],
    "answerIdx": 1
  }
]
```

LAYER: sveltekit-dev-2

```json
[
  {
    "stem": "How does a Svelte 5 component receive props?",
    "topic": "Components and props",
    "choices": [
      "With export let name, which Svelte 5 requires for every prop",
      "With let { name } = $props() in its script block",
      "With a global store that the parent writes into",
      "With a props object passed to a constructor function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you give a prop a default value in Svelte 5?",
    "topic": "Components and props",
    "choices": [
      "let { size = 'md' } = $props()",
      "export default size = 'md' at the top of the script block",
      "let size = $props('md') in the markup of the component",
      "let { size } = $props() || 'md' inside the template"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a parent pass a prop to a child component?",
    "topic": "Components and props",
    "choices": [
      "<Child>name = Ada</Child> as text between the tags",
      "<Child $name=\"Ada\" /> with a rune prefix",
      "<Child name=\"Ada\" /> as an attribute on the component tag",
      "<Child {{name}} /> with double curly braces around the name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the spread {...rest} do on a component?",
    "topic": "Components and props",
    "choices": [
      "Copies the component into each item of the object",
      "Removes every prop the component does not declare",
      "Passes all properties of the object as props to the component",
      "Converts the object into a string attribute"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you shorthand a prop when the variable has the same name, as in <Item {title} />?",
    "topic": "Components and props",
    "choices": [
      "The braces pass the variable title as the prop title",
      "The braces escape title as plain text",
      "The braces make title a constant that cannot change",
      "The braces create a new variable called title in the child"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should a child avoid mutating a prop object it received?",
    "topic": "Components and props",
    "choices": [
      "Data flows down, so mutation makes changes hard to trace unless it is bound or a callback is used",
      "Svelte copies props on each render, so changes are lost",
      "Props are frozen by the browser, so mutation always throws",
      "Mutating a prop deletes it from the parent permanently"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a child tell its parent that something happened in Svelte 5?",
    "topic": "Components and props",
    "choices": [
      "By dispatching an event with createEventDispatcher, the only supported way",
      "By calling a callback prop such as onsave passed down by the parent",
      "By emitting a message on window",
      "By writing directly into the parent's variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the .svelte file structure?",
    "topic": "Components and props",
    "choices": [
      "A class with a render method and a constructor",
      "A JSON file describing the component tree",
      "A template string exported from a JavaScript module",
      "A script block, markup and an optional style block"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you import and use another component?",
    "topic": "Components and props",
    "choices": [
      "register it in a components array on the parent",
      "load it with a link tag in the head",
      "require('./Card.svelte') and call it as a function",
      "import Card from './Card.svelte'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do component names start with a capital letter in markup?",
    "topic": "Components and props",
    "choices": [
      "So Svelte can tell components apart from HTML elements",
      "Because capital letters make the component load lazily",
      "Because lowercase names are reserved for stores",
      "Because the compiler refuses lowercase file names"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does let count = $state(0) create?",
    "topic": "Reactivity and runes",
    "choices": [
      "A store that must be read with a $ prefix in templates",
      "A constant that is evaluated only once when the component mounts",
      "A reactive value whose changes update the parts of the UI that use it",
      "A copy of the number that each child receives separately"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you update a $state number in an event handler?",
    "topic": "Reactivity and runes",
    "choices": [
      "count += 1",
      "update(count, 1)",
      "count.set(count + 1)",
      "count = $state(count + 1)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does let double = $derived(count * 2) provide?",
    "topic": "Reactivity and runes",
    "choices": [
      "A function that must be called to get the result",
      "A writable copy that never follows count",
      "A one-time snapshot of count multiplied by two",
      "A value that is recalculated when count changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is $effect used for?",
    "topic": "Reactivity and runes",
    "choices": [
      "Defining the markup that a component renders",
      "Importing styles into the component",
      "Declaring the initial value of a reactive variable",
      "Running side effects, such as logging or DOM work, when the values it reads change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid using $effect to compute values that can be $derived?",
    "topic": "Reactivity and runes",
    "choices": [
      "Derived values are simpler",
      "Effects run only on the server",
      "Effects cannot read reactive values",
      "Derived values are computed in the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when you mutate a property of a $state object, such as user.name = 'Sam'?",
    "topic": "Reactivity and runes",
    "choices": [
      "The change is applied only after a page reload",
      "Svelte throws an error for direct mutation",
      "The UI updates, because $state makes objects deeply reactive",
      "Nothing, since you must reassign the whole object"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does $state.raw do compared with $state?",
    "topic": "Reactivity and runes",
    "choices": [
      "It does not make objects deeply reactive; only reassignment triggers updates",
      "It makes the value read-only forever",
      "It stores the value in local storage",
      "It converts the value into a string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What replaced the older $: reactive statements in Svelte 5 runes mode?",
    "topic": "Reactivity and runes",
    "choices": [
      "A watch function exported by the component",
      "$derived for computed values",
      "Store subscriptions in every component",
      "The reactive keyword in the script tag"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does an $effect re-run?",
    "topic": "Reactivity and runes",
    "choices": [
      "On every animation frame of the browser",
      "When any reactive value it read during its last run changes",
      "Only once when the component mounts",
      "Only when the user clicks something"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can an effect clean up, such as removing a timer?",
    "topic": "Reactivity and runes",
    "choices": [
      "By setting the timer variable to null only",
      "By calling destroy() in the markup",
      "By returning a function from the effect",
      "Cleanup is automatic and cannot be customized"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you attach a click handler to a button in Svelte 5?",
    "topic": "Events and bindings",
    "choices": [
      "<button @click=\"handleClick\">",
      "<button click=handleClick()>",
      "<button on:click={handleClick}>, the only syntax Svelte 5 supports",
      "<button onclick={handleClick}>"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does bind:value={name} on an input do?",
    "topic": "Events and bindings",
    "choices": [
      "Reads the input once when the component mounts",
      "Prevents the user from typing anything",
      "Copies the variable into the input every second",
      "Keeps the input's value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which directive binds a checkbox's checked state?",
    "topic": "Events and bindings",
    "choices": [
      "checked:bind={done}",
      "on:checked={done}",
      "bind:value={done}",
      "bind:checked={done}"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you bind a group of radio inputs to one variable?",
    "topic": "Events and bindings",
    "choices": [
      "bind:value={choice} on the form element",
      "bind:group={choice} on each radio",
      "bind:radio={choice} on a wrapper div",
      "one bind:checked per radio, with separate variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does bind:this={el} give you?",
    "topic": "Events and bindings",
    "choices": [
      "A store that tracks every element in the page",
      "A reference to the DOM element after it has mounted",
      "A reference to the parent component instance",
      "A copy of the element's HTML as a string"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a parent two-way bind to a child's prop?",
    "topic": "Events and bindings",
    "choices": [
      "Two-way binding between components is not possible",
      "The child exports a store that the parent subscribes to",
      "The child marks it with $bindable()",
      "The parent mutates the child's script variable directly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does preventDefault do in a submit handler?",
    "topic": "Events and bindings",
    "choices": [
      "Stops the browser's default action",
      "Validates the form fields automatically",
      "Stops the event from reaching any parent element",
      "Removes the handler after it has run once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the event object's target property?",
    "topic": "Events and bindings",
    "choices": [
      "The handler function that is running",
      "The parent component of the handler",
      "The URL to which the form will be submitted",
      "The element that triggered the event"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you call a handler with an argument on click?",
    "topic": "Events and bindings",
    "choices": [
      "onclick={remove(item.id)} which runs on click",
      "onclick={() => remove(item.id)}",
      "onclick=\"remove(item.id)\" as a string",
      "onclick={remove, item.id}"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why wrap a call in an arrow function in onclick={() => remove(id)}?",
    "topic": "Events and bindings",
    "choices": [
      "Svelte cannot call named functions directly",
      "Otherwise remove(id) would run immediately during rendering",
      "It makes the handler asynchronous",
      "Arrow functions are required by the compiler for all handlers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you conditionally render content in Svelte?",
    "topic": "Conditional and list rendering",
    "choices": [
      "<If condition={loggedIn}> ... </If>",
      "{#if loggedIn} ... {/if}",
      "{loggedIn && <p>...</p>} written as JSX",
      "<div v-if=\"loggedIn\"> ... </div>"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you add an else branch?",
    "topic": "Conditional and list rendering",
    "choices": [
      "|| written after the closing brace",
      "<else> as an element",
      "{#else} as a separate block",
      "{:else} inside the {#if} block"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you loop over an array in the markup?",
    "topic": "Conditional and list rendering",
    "choices": [
      "{#each items as item} ... {/each}",
      "{items.map(item => ...)} as JSX",
      "<for item in items> ... </for>",
      "<div each=\"item in items\">"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why add a key, as in {#each items as item (item.id)}?",
    "topic": "Conditional and list rendering",
    "choices": [
      "Svelte can match items by identity when the list changes, preserving state and DOM",
      "Keys sort the items alphabetically",
      "Keys are required for the code to compile",
      "Keys encrypt each item in the list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you show a fallback when the list is empty?",
    "topic": "Conditional and list rendering",
    "choices": [
      "{#empty} after the loop",
      "{:else} inside the {#each} block",
      "<each-empty> as an element",
      "An if block is the only way to do it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does {#await promise} ... {:then value} ... {:catch error} do?",
    "topic": "Conditional and list rendering",
    "choices": [
      "Renders pending, resolved and rejected states of a promise",
      "Retries the promise until it succeeds",
      "Converts the promise into a store",
      "Pauses the whole component until the promise settles"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you render a value as raw HTML, and what is the risk?",
    "topic": "Conditional and list rendering",
    "choices": [
      "{html content}, which escapes all tags automatically",
      "{content | html}, which sanitizes the string",
      "<raw>{content}</raw>, which is always safe",
      "{@html content}, which risks cross-site scripting with untrusted content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you toggle a CSS class conditionally?",
    "topic": "Conditional and list rendering",
    "choices": [
      "if:class=\"active\" on the element",
      "active={isActive} on the class attribute",
      "class:active={isActive} or a class attribute expression",
      "<div class=\"active\" v-if=\"isActive\">"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which block lets you store a computed value inside markup?",
    "topic": "Conditional and list rendering",
    "choices": [
      "{#let total = a + b}",
      "{@const total = a + b}",
      "{$total = a + b}",
      "<const total=\"a + b\" />"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you render a number of items given by a count?",
    "topic": "Conditional and list rendering",
    "choices": [
      "Use {#for i of count} ... {/for}",
      "Use {#repeat count} ... {/repeat}",
      "Use <Loop times={count} />",
      "Loop over Array.from({ length: count }) in an each block"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How are styles in a Svelte component's style block scoped?",
    "topic": "Scoped styles",
    "choices": [
      "They apply only when a scoped attribute is added",
      "They apply globally to the entire application",
      "They apply only to that component's elements by default",
      "They apply only to the first element in the component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you write a global style from inside a component?",
    "topic": "Scoped styles",
    "choices": [
      "Add a global attribute to the style tag only",
      "Prefix the selector with @",
      "Move the style block outside the component file only",
      "Use the :global(selector) modifier"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Svelte scope styles under the hood?",
    "topic": "Scoped styles",
    "choices": [
      "It embeds a shadow root in every element",
      "It renames the component's HTML tags",
      "It runs each component inside an iframe",
      "It adds a generated class to matching elements and selectors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might a style not apply to an element rendered by a child component?",
    "topic": "Scoped styles",
    "choices": [
      "Scoped styles do not reach inside child components unless made global or passed as props",
      "Child components always ignore parent styles",
      "The browser blocks styles on nested components",
      "CSS cannot target elements created by components"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a parent style a child's element deliberately?",
    "topic": "Scoped styles",
    "choices": [
      "Edit the child's compiled output",
      "It is impossible by design",
      "Pass a class prop or CSS custom properties to the child",
      "Use !important on every rule"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set a CSS custom property from a component's markup?",
    "topic": "Scoped styles",
    "choices": [
      "setProperty is the only way",
      "$color: color in the style block",
      "style:--color={color} on the element",
      "css-var=\"--color: color\" attribute"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Svelte do with unused CSS selectors?",
    "topic": "Scoped styles",
    "choices": [
      "It throws a build error always",
      "It applies them to the nearest parent",
      "It keeps them silently",
      "It warns about them and removes them from the output"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which directive applies a style conditionally to one property?",
    "topic": "Scoped styles",
    "choices": [
      "if:style=\"color\"",
      "style:color={isError ? 'red' : 'black'}",
      "color:style={isError}",
      "style={color: isError}"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of scoped styles?",
    "topic": "Scoped styles",
    "choices": [
      "Styles run faster than inline styles in every case",
      "Styles are shared across all pages automatically",
      "Class names can be simple",
      "Scoped styles remove the need for CSS files"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where would you put styles shared by the whole app?",
    "topic": "Scoped styles",
    "choices": [
      "In the package.json file",
      "Inside the first component that renders",
      "A global stylesheet imported in the root layout",
      "In the server hooks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a snippet ({#snippet}) let you do in Svelte 5?",
    "topic": "Slots and composition",
    "choices": [
      "Import another component file",
      "Define reusable chunks of markup that can be rendered or passed to components",
      "Write inline CSS for one element",
      "Declare a store inside the markup"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you render a snippet named row with an argument?",
    "topic": "Slots and composition",
    "choices": [
      "<row item={item} />",
      "{#render row item}",
      "{row(item)} as plain text",
      "{@render row(item)}"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What replaced default slots in Svelte 5?",
    "topic": "Slots and composition",
    "choices": [
      "The children prop, rendered with {@render children?.()}",
      "A <slot /> element, which no longer exists in any form",
      "The #each block",
      "A global children store"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a parent pass content into a child's children?",
    "topic": "Slots and composition",
    "choices": [
      "By placing it between the component's opening",
      "By setting a content attribute on the component",
      "By binding a slot variable in the script",
      "By importing the content from a separate file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a component accept several named areas of markup?",
    "topic": "Slots and composition",
    "choices": [
      "By declaring several default slots in a row",
      "By accepting snippet props",
      "By nesting components inside the script block",
      "By repeating the children prop"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is composition over inheritance in this context?",
    "topic": "Slots and composition",
    "choices": [
      "Put all markup in one big component",
      "Build UIs by combining small components with props and snippets",
      "Copy markup between components",
      "Extend a base component class with subclasses"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the <svelte:component> tag (or dynamic components in runes mode) enable?",
    "topic": "Slots and composition",
    "choices": [
      "Creating a new Svelte project",
      "Declaring global styles",
      "Rendering a component chosen at runtime",
      "Binding to the window"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the <svelte:head> element for?",
    "topic": "Slots and composition",
    "choices": [
      "Importing a stylesheet into the layout",
      "Defining the root component of an application",
      "Adding elements such as title",
      "Creating a head component for tables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you type props in a TypeScript Svelte component?",
    "topic": "Slots and composition",
    "choices": [
      "Annotate the destructured $props() call with an interface or inline type",
      "Declare props in a separate JSON file",
      "Add a types attribute to the component tag",
      "Props cannot be typed in Svelte"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why prefer small focused components?",
    "topic": "Slots and composition",
    "choices": [
      "Browsers cache each component separately",
      "Svelte limits files to fifty lines",
      "They are easier to read, reuse and test",
      "Small components always run faster than one big one"
    ],
    "answerIdx": 2
  }
]
```

LAYER: sveltekit-dev-3

```json
[
  {
    "stem": "In SvelteKit, how does a file create a route?",
    "topic": "File-based routing",
    "choices": [
      "A decorator on the component class registers the path",
      "A routes array exported from src/app.html maps paths to components",
      "A route table in svelte.config.js lists every URL and the component for it",
      "Its location in src/routes defines the URL"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file renders the page for the URL /about?",
    "topic": "File-based routing",
    "choices": [
      "src/routes/about/+page.svelte",
      "src/routes/about.svelte, because the file name becomes the path",
      "src/routes/+about.svelte at the top of the folder",
      "src/pages/about/index.svelte, as in older frameworks"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does src/routes/+page.svelte represent?",
    "topic": "File-based routing",
    "choices": [
      "An error page for unknown URLs",
      "The page that is shown only after login",
      "The home page at /",
      "A layout shared by every route in the project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the +server.js file in a route folder?",
    "topic": "File-based routing",
    "choices": [
      "Defining API handlers such as GET",
      "Starting the development server for the whole project",
      "Configuring the hosting adapter for the folder",
      "Rendering the page's HTML on the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the $lib alias used for?",
    "topic": "File-based routing",
    "choices": [
      "Referencing global CSS files in the static folder",
      "Pointing at the compiled output in the build folder",
      "Importing packages directly from the npm registry",
      "Importing shared code from src/lib"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the static directory contain?",
    "topic": "File-based routing",
    "choices": [
      "Files served as-is at the site root",
      "Components that are rendered only on the server",
      "Type declarations for the project's routes",
      "Compiled JavaScript bundles produced by the build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is src/app.html?",
    "topic": "File-based routing",
    "choices": [
      "A file that defines the project's API routes",
      "The first page that visitors see on the site",
      "The HTML template that wraps every page",
      "A configuration file for the Vite plugin"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is the SvelteKit project configuration, including the adapter, defined?",
    "topic": "File-based routing",
    "choices": [
      "app.config.ts only",
      "kit.routes.js",
      "svelte.config.js",
      "routes.config.json"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do files prefixed with + mean in the routes directory?",
    "topic": "File-based routing",
    "choices": [
      "They are temporary files created by the editor",
      "They are special files that SvelteKit treats as part of the routing system",
      "They are private files that are never bundled and are used only during local development",
      "They are test files that run before the build"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the src/hooks.server.js file allow you to do?",
    "topic": "File-based routing",
    "choices": [
      "Define the layout of the home page",
      "Configure the CSS processor",
      "Run code for every request",
      "Add event listeners to the browser window"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is +layout.svelte?",
    "topic": "Layouts and nesting",
    "choices": [
      "A component that is rendered only on the first visit",
      "A component that wraps pages in its folder",
      "A page that is displayed when the URL does not match",
      "A file that stores the layout of the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a layout show the page inside it?",
    "topic": "Layouts and nesting",
    "choices": [
      "By using <slot /> in every Svelte 5 layout",
      "By calling a render function from $app",
      "By importing the page component and calling it",
      "By rendering the children snippet with {@render children()}"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a layout at src/routes/+layout.svelte apply to?",
    "topic": "Layouts and nesting",
    "choices": [
      "Only pages with dynamic parameters",
      "Every page in the app",
      "Only the home page",
      "Only pages that load data on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are nested layouts?",
    "topic": "Layouts and nesting",
    "choices": [
      "Layouts that copy the parent layout's markup into each page at build time",
      "Layouts that replace the root layout entirely",
      "Layouts that run only in the browser",
      "Layouts in subfolders that wrap their own pages inside the parent layout"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do layout groups such as (marketing) do?",
    "topic": "Layouts and nesting",
    "choices": [
      "Hide the routes from the router",
      "Group routes under a shared layout",
      "Make the routes load only on the server",
      "Add a segment called marketing to the URL"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a page reset the layout hierarchy and avoid inheriting a layout?",
    "topic": "Layouts and nesting",
    "choices": [
      "With a special comment in the page",
      "With a +page@.svelte layout reset file name",
      "By deleting the root layout",
      "With a no-layout attribute on the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do layouts persist during navigation between pages that share them?",
    "topic": "Layouts and nesting",
    "choices": [
      "The layout is reloaded from the server each time",
      "Only the changed page content is swapped",
      "Layouts are copied into every page by the compiler",
      "The browser caches the layout in a cookie"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can a +layout.js or +layout.server.js file do?",
    "topic": "Layouts and nesting",
    "choices": [
      "Define the CSS for the layout and register it with the router at startup",
      "Load data that is available to the layout and all pages below it",
      "Register the layout in the router",
      "Disable server rendering for the layout"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where would you put a site-wide header and footer?",
    "topic": "Layouts and nesting",
    "choices": [
      "In src/routes/+layout.svelte",
      "In src/app.d.ts",
      "In each page file separately",
      "In static/index.html"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common use of a layout group like (app) and (auth)?",
    "topic": "Layouts and nesting",
    "choices": [
      "Hosting each group on a different domain",
      "Giving authenticated pages and public pages different layouts",
      "Separating server code from browser code so each group is bundled on its own",
      "Splitting CSS into separate bundles"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you create a route with a dynamic id, such as /posts/42?",
    "topic": "Dynamic route parameters",
    "choices": [
      "A folder named [id] such as src/routes/posts/[id]",
      "A folder named :id such as src/routes/posts/:id",
      "A folder named {id} in the routes folder",
      "A file named posts_id.svelte in the routes folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a load function read the id from the URL?",
    "topic": "Dynamic route parameters",
    "choices": [
      "From the URL query only",
      "From window.location.id",
      "From a global variable named id",
      "From event.params.id (or params.id)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a folder named [[lang]] mean?",
    "topic": "Dynamic route parameters",
    "choices": [
      "A hidden folder that is not routed",
      "A group that does not affect the URL",
      "A required parameter with two characters",
      "An optional parameter that may be present or absent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does [...rest] match?",
    "topic": "Dynamic route parameters",
    "choices": [
      "One or more path segments that are not matched by other routes",
      "Only a single segment",
      "Only paths that contain a dot",
      "Only the home page, because the rest parameter is reserved for the root route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a param matcher, as in [id=integer]?",
    "topic": "Dynamic route parameters",
    "choices": [
      "A way to match query strings",
      "A regular expression written in the folder name",
      "A function that validates a parameter",
      "A CSS selector for the route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do param matchers live?",
    "topic": "Dynamic route parameters",
    "choices": [
      "In src/lib/routes",
      "In svelte.config.js only",
      "In static",
      "In src/params"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When two routes could match, how does SvelteKit decide?",
    "topic": "Dynamic route parameters",
    "choices": [
      "The first route alphabetically always wins",
      "More specific routes win over dynamic or rest routes",
      "The route created most recently wins",
      "It picks one at random"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the type of a route parameter value?",
    "topic": "Dynamic route parameters",
    "choices": [
      "A number if it looks like one",
      "A string",
      "An object",
      "A boolean"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a page know its current parameters in the component?",
    "topic": "Dynamic route parameters",
    "choices": [
      "By importing the folder name",
      "Through page.params from $app/state (or the $page store)",
      "By calling getParams() from the router",
      "By reading document.cookie, where SvelteKit stores the parameters of the current URL"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of trusting a route parameter without validation?",
    "topic": "Dynamic route parameters",
    "choices": [
      "It may be malformed or malicious",
      "Parameters are only available on the client",
      "Parameters are encrypted",
      "Parameters are always numbers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you link to another page in SvelteKit?",
    "topic": "Navigation and links",
    "choices": [
      "With a navigate() call in the markup only",
      "With a custom <svelte:link> element",
      "With a normal <a href=\"/about\"> element",
      "With a <Link to=\"/about\"> component imported from the router"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when a user clicks an internal <a> link?",
    "topic": "Navigation and links",
    "choices": [
      "The browser always reloads the whole page, because links are handled by the server",
      "SvelteKit handles it with client-side routing, without a full reload",
      "The click is ignored until JavaScript loads",
      "The link opens in a new tab"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which function navigates from code?",
    "topic": "Navigation and links",
    "choices": [
      "push() from $app/router",
      "navigate() from window",
      "goto from $app/navigation",
      "redirect() from svelte"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does data-sveltekit-preload-data=\"hover\" do on a link?",
    "topic": "Navigation and links",
    "choices": [
      "Shows a tooltip with data",
      "Prevents the link from being followed",
      "Preloads all images on the page as soon as the link enters the viewport",
      "Starts loading the page's data when the user hovers over the link"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you opt a link out of client-side routing?",
    "topic": "Navigation and links",
    "choices": [
      "Add a no-router attribute",
      "Add data-sveltekit-reload to it",
      "Prefix its href with ~",
      "Wrap it in <noscript>"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you know which link matches the current URL for styling?",
    "topic": "Navigation and links",
    "choices": [
      "Read the browser's history length",
      "Check document.title",
      "Use the active attribute on every a tag",
      "Compare page.url.pathname with the link's path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the replaceState option on goto do?",
    "topic": "Navigation and links",
    "choices": [
      "Replaces the current history entry",
      "Replaces the page's state in the database",
      "Cancels the navigation",
      "Reloads the current component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which hook runs code before a navigation completes, allowing cancellation?",
    "topic": "Navigation and links",
    "choices": [
      "onMount, which runs before each navigation and can cancel it by returning false",
      "goto",
      "afterUpdate",
      "beforeNavigate from $app/navigation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use real <a> elements for navigation?",
    "topic": "Navigation and links",
    "choices": [
      "They avoid the need for routes",
      "They are faster than buttons in all cases",
      "They work without JavaScript",
      "They are required by the compiler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you handle scroll position after navigation?",
    "topic": "Navigation and links",
    "choices": [
      "Browsers do it only on reload",
      "SvelteKit never changes scroll",
      "SvelteKit scrolls to the top for new pages and restores the position when going back",
      "You must always do it manually, because SvelteKit never touches the scroll position"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is +error.svelte?",
    "topic": "Error pages",
    "choices": [
      "A component shown when an error occurs",
      "A test file for routes",
      "A page that runs only in development",
      "A file that logs errors to the server console"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you throw a 404 from a load function?",
    "topic": "Error pages",
    "choices": [
      "error(404, 'Not found') imported from @sveltejs/kit",
      "throw new Error(404) only, which SvelteKit converts into a not-found page",
      "redirect(404, '/')",
      "return null from the load"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between expected and unexpected errors?",
    "topic": "Error pages",
    "choices": [
      "Expected errors come from the error() helper",
      "Unexpected errors never reach the user",
      "Expected errors are shown only in production",
      "They are handled identically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where does SvelteKit look for the nearest +error.svelte?",
    "topic": "Error pages",
    "choices": [
      "Only in the static directory",
      "Only in the root folder, no matter where in the route tree the error happens",
      "In the route folder and then in parent folders",
      "Only in src/lib"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does src/error.html do?",
    "topic": "Error pages",
    "choices": [
      "Serves as a fallback when even the root error page cannot render",
      "Defines the 404 route",
      "Logs errors to a file",
      "Replaces every +error.svelte file in the project with one static error page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the handleError hook do?",
    "topic": "Error pages",
    "choices": [
      "Lets you log unexpected errors and customize the message shown to the user",
      "Renders the home page",
      "Retries failed requests until they succeed, then logs the result for the user",
      "Disables error pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid showing internal error details to users?",
    "topic": "Error pages",
    "choices": [
      "They may reveal sensitive information about the system",
      "Browsers hide them",
      "Users cannot read them, because browsers hide the text of every server error",
      "They slow down the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What status does a missing route return by default?",
    "topic": "Error pages",
    "choices": [
      "200",
      "500",
      "302",
      "404"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you redirect from a load function?",
    "topic": "Error pages",
    "choices": [
      "goto('/login') inside load",
      "window.location = '/login'",
      "redirect(302, '/login') from @sveltejs/kit",
      "return '/login', which SvelteKit treats as an instruction to change the URL"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which page data does +error.svelte have access to?",
    "topic": "Error pages",
    "choices": [
      "The full stack trace of the server, so the page can show where the error began",
      "The user's password",
      "Nothing",
      "The error status and message through page.error and page.status"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which folder should hold reusable components and utilities?",
    "topic": "Project structure",
    "choices": [
      "src/params",
      "static",
      "src/lib",
      "build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the build output of SvelteKit depend on?",
    "topic": "Project structure",
    "choices": [
      "The browser used by the developer",
      "The order of imports",
      "The name of the repository",
      "The adapter configured in svelte.config.js"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is src/app.d.ts used for?",
    "topic": "Project structure",
    "choices": [
      "Storing static data for the pages, such as lists of countries and prices",
      "Running type checks in the browser",
      "Declaring app-wide TypeScript types such as Locals and PageData",
      "Defining the routes of the project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep route-specific components next to the route?",
    "topic": "Project structure",
    "choices": [
      "SvelteKit requires it",
      "It makes the build smaller always",
      "Related code stays together",
      "Components must match the route name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the .svelte-kit directory contain?",
    "topic": "Project structure",
    "choices": [
      "The source code of the pages, which is copied there before every deploy",
      "The database for the project",
      "The user's uploaded files",
      "Generated files and types that should not be edited or committed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do environment variables belong in version control?",
    "topic": "Project structure",
    "choices": [
      "In .env files that are ignored, with an .env.example committed",
      "In svelte.config.js, so that every developer and build uses the same values",
      "In static",
      "In the routes folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do the files +page.js and +page.server.js differ in?",
    "topic": "Project structure",
    "choices": [
      "+page.server.js renders HTML, and +page.js renders CSS",
      "+page.js runs on both server",
      "+page.js runs only on the server, while +page.server.js runs only in the browser",
      "They are identical"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should a larger SvelteKit project be organized?",
    "topic": "Project structure",
    "choices": [
      "With every file in the routes root",
      "With all components in static",
      "With one big page",
      "By feature, grouping routes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of src/hooks.client.js?",
    "topic": "Project structure",
    "choices": [
      "Defining server routes that run in the browser when the application first starts",
      "Running code in the browser at startup, such as client-side error handling",
      "Serving static files",
      "Configuring the adapter"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What tool provides type-safe routes and generated types in SvelteKit?",
    "topic": "Project structure",
    "choices": [
      "A database ORM",
      "A separate router package that has to be installed and configured for each route",
      "The generated ./$types modules for each route",
      "A CSS preprocessor"
    ],
    "answerIdx": 2
  }
]
```

LAYER: sveltekit-dev-4

```json
[
  {
    "stem": "What is the purpose of a load function in SvelteKit?",
    "topic": "Page and layout load functions",
    "choices": [
      "To register the page in the router when the app starts",
      "To fetch or compute the data a page needs before it is rendered",
      "To run animations while the page is mounting in the browser",
      "To compile the page's styles on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does the returned data of +page.js load appear in the component?",
    "topic": "Page and layout load functions",
    "choices": [
      "In a variable called load that the script defines",
      "In the data prop, as let { data } = $props()",
      "In the URL as a query string",
      "In a global store named page that every component imports"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which file holds a load function for one page?",
    "topic": "Page and layout load functions",
    "choices": [
      "+data.svelte next to the page component",
      "+load.js in the same folder as the page",
      "+route.js at the project root",
      "+page.js or +page.server.js"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file holds a load function shared by a layout and all pages below it?",
    "topic": "Page and layout load functions",
    "choices": [
      "+shared.js in the routes folder",
      "+page.layout.js next to each page",
      "+root.js in the src folder",
      "+layout.js or +layout.server.js"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must a load function return for the page to use it?",
    "topic": "Page and layout load functions",
    "choices": [
      "An object whose properties become the data prop",
      "A Response object created with new Response()",
      "A promise that resolves to the DOM element",
      "A string that contains the page's HTML"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to data from a parent layout's load in a child page?",
    "topic": "Page and layout load functions",
    "choices": [
      "It is discarded when the child page loads",
      "It is available only to other layouts",
      "It is merged and available in the child's data prop",
      "It must be fetched again inside the child page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does await parent() do in a load function?",
    "topic": "Page and layout load functions",
    "choices": [
      "Waits for the parent layout's load",
      "Returns the browser's parent window",
      "Reloads the parent page from the server",
      "Cancels the parent layout's load"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does a page's load function re-run during navigation?",
    "topic": "Page and layout load functions",
    "choices": [
      "When its dependencies, such as params or fetched URLs, change or are invalidated",
      "Only when the user logs out",
      "On every animation frame of the browser, so that the data is always up to date",
      "Only when the browser is refreshed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can code force a load function to run again?",
    "topic": "Page and layout load functions",
    "choices": [
      "Deleting the page file and recreating it",
      "Reassigning the data prop in the component",
      "Calling load() directly from the markup",
      "invalidate or invalidateAll from $app/navigation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should load functions avoid side effects such as writing to the database?",
    "topic": "Page and layout load functions",
    "choices": [
      "Writes are allowed only in layouts",
      "Browsers block writes during load",
      "They can re-run for navigation",
      "Load functions cannot access any database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does a universal load function (+page.js) run?",
    "topic": "Server versus universal load",
    "choices": [
      "On the server during SSR and in the browser on later navigation",
      "Only at build time",
      "Only on the server, because universal loads are executed before the bundle is built",
      "Only in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where does a server load function (+page.server.js) run?",
    "topic": "Server versus universal load",
    "choices": [
      "Only in the browser",
      "In a web worker",
      "In both places, depending on the user's connection",
      "Only on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When must you use a server load instead of a universal one?",
    "topic": "Server versus universal load",
    "choices": [
      "When you want the code to run faster in the browser",
      "When the page has no layout",
      "When you access a database",
      "When the data is already public"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a universal load return that a server load cannot?",
    "topic": "Server versus universal load",
    "choices": [
      "Non-serializable values such as class instances or component constructors",
      "JSON objects, because only universal loads are allowed to return plain data",
      "Dates",
      "Strings"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must data from a server load be serializable?",
    "topic": "Server versus universal load",
    "choices": [
      "It is sent to the browser as part of the page payload",
      "The database stores the result",
      "Servers cannot hold functions at all, so every returned value must be a string",
      "Browsers reject objects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a server load receive that a universal load does not?",
    "topic": "Server versus universal load",
    "choices": [
      "Request-bound details such as cookies, locals and the client address",
      "The document object",
      "The window object, so that the load can read the browser's current location",
      "The component tree"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are locals in a server load?",
    "topic": "Server versus universal load",
    "choices": [
      "Variables defined at the top of the file",
      "Per-request data set in hooks",
      "Environment variables",
      "Local storage values from the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to a server load when the user navigates on the client?",
    "topic": "Server versus universal load",
    "choices": [
      "The load runs in the browser using the server's code, which is shipped in the bundle",
      "The load runs only on the first navigation",
      "The load is skipped and old data is used",
      "SvelteKit calls the server with a request to run the load and returns the data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are secrets safe in +page.server.js?",
    "topic": "Server versus universal load",
    "choices": [
      "The file is never bundled into client code",
      "Browsers refuse to run files with the server suffix",
      "Secrets are deleted after each request",
      "The file is encrypted before deployment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a page have both +page.server.js and +page.js?",
    "topic": "Server versus universal load",
    "choices": [
      "No, only one load file is allowed",
      "Yes, the server load runs first",
      "Only in development",
      "Yes, but they run in parallel and merge results"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you type a load function in TypeScript?",
    "topic": "Type-safe load data",
    "choices": [
      "Add a types attribute to the page tag",
      "Import PageLoad (or PageServerLoad) from the generated ./$types",
      "Use JSDoc comments only",
      "Declare it as any and cast later, since SvelteKit does not generate any load types"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does PageData represent?",
    "topic": "Type-safe load data",
    "choices": [
      "The type of the database rows that the load reads from the server",
      "The type of the HTML template",
      "The type of the URL parameters",
      "The type of the data prop built from the page and layout loads"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are generated ./$types useful?",
    "topic": "Type-safe load data",
    "choices": [
      "They encrypt the types",
      "They compile the page faster",
      "They keep load return types",
      "They remove the need for TypeScript"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you type params safely in a load?",
    "topic": "Type-safe load data",
    "choices": [
      "Cast every param to a number",
      "Use the PageLoad type",
      "Read params from a global variable",
      "Params cannot be typed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when you change what a load returns?",
    "topic": "Type-safe load data",
    "choices": [
      "The route is renamed",
      "The build fails always",
      "Nothing changes in the component types",
      "The data prop type updates"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you type App.Locals for the authenticated user?",
    "topic": "Type-safe load data",
    "choices": [
      "Store it in static",
      "Define it in the load function",
      "Add it to svelte.config.js",
      "Declare it in src/app.d.ts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does satisfies PageLoad (or typing the function) check?",
    "topic": "Type-safe load data",
    "choices": [
      "That the page has a title",
      "That the load's input",
      "That the file name is correct",
      "That the route exists"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of returning plain objects from load?",
    "topic": "Type-safe load data",
    "choices": [
      "They remove the need for a data prop",
      "They automatically cache results",
      "They are simple to serialize",
      "They make the page faster to download always"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How would you share a type between a load and the component?",
    "topic": "Type-safe load data",
    "choices": [
      "Use any everywhere",
      "Put the type in static",
      "Import types from $lib or use the generated PageData",
      "Duplicate the type in each file so that the load and the page stay independent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the risk of using any for load data?",
    "topic": "Type-safe load data",
    "choices": [
      "The build removes the data",
      "Mistakes in the shape of the data are not caught until runtime",
      "The load never runs",
      "The page does not render, because the compiler rejects any load that returns any"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the params argument contain in a load function?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "The component props",
      "The query string only, because path parameters are available through url.pathname",
      "The dynamic route parameters from the URL, as strings",
      "The body of the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read query parameters (?page=2) in a load?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "params.page",
      "request.query.page",
      "url.searchParams.get('page')",
      "window.location.search"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What advantage does the fetch passed to load have over the global fetch?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "It bypasses CORS everywhere",
      "It is always faster than the global fetch because it skips the network on the client",
      "It works only with JSON",
      "It forwards cookies, resolves relative URLs on the server and inlines responses into the HTML"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a server-rendered page fetches data with load's fetch?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "The response is stored in localStorage",
      "The browser always repeats the request",
      "The response is embedded in the HTML",
      "The response is discarded after rendering"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does fetch behave when calling an internal route such as /api/posts on the server?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "It calls the handler directly",
      "It sends a real network request to the public domain",
      "It returns the page's HTML",
      "It fails with a CORS error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use the provided fetch instead of the global one inside load?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "It keeps behavior consistent between server",
      "The global fetch does not exist in browsers",
      "The global fetch cannot send JSON",
      "The provided fetch is written in Rust"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does depends('app:posts') do?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "Declares a package dependency",
      "Registers a custom dependency that can be invalidated with invalidate('app:posts')",
      "Imports the posts module into the load function so that its data is cached for later",
      "Waits for the posts API to start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a load fetch several resources efficiently?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "Await each request one after another with no exceptions",
      "Fetch only in the component",
      "Use setTimeout between requests",
      "Start requests together with Promise.all and await them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a load do when a fetch returns a non-OK response?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "Ignore the status and parse the body, since fetch already throws for failed responses",
      "Redirect to the home page always",
      "Check response.ok and throw an error() or handle it",
      "Retry forever"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does setHeaders do in a server load?",
    "topic": "Parameters and the fetch helper",
    "choices": [
      "Adds headers to every outgoing fetch made by the load function on the server",
      "Defines CSS headers",
      "Changes the browser's request headers",
      "Sets response headers, such as Cache-Control, for the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a page stream slow data without blocking the whole page?",
    "topic": "Streaming promises",
    "choices": [
      "Return a promise inside the returned object",
      "Split the page into frames",
      "Use setInterval in the load",
      "Delay the whole load until all data is ready"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you render a streamed promise in the component?",
    "topic": "Streaming promises",
    "choices": [
      "{#stream data.comments}",
      "{#await data.comments} ... {:then comments} ... {/await}",
      "{data.comments.then(...)} written inline, which Svelte updates once the promise resolves",
      "<Stream value={data.comments} />"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why stream non-essential data?",
    "topic": "Streaming promises",
    "choices": [
      "Streaming removes the need for a server",
      "The important content appears quickly",
      "Streaming is required for every load",
      "Streaming reduces the total amount of data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does streaming work?",
    "topic": "Streaming promises",
    "choices": [
      "Only in +server.js files, which are the only place where promises can be returned",
      "Only on static sites without a server",
      "In server load functions that return promises nested in their result",
      "Only in layouts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a limitation of streaming on some hosting platforms?",
    "topic": "Streaming promises",
    "choices": [
      "Streaming works only on mobile networks, where the browser can hold a connection open",
      "Streaming needs a database",
      "Streaming requires a server that supports it, and static hosting cannot stream",
      "Streaming is blocked by HTTPS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a streamed promise rejects after the page was sent?",
    "topic": "Streaming promises",
    "choices": [
      "The response is cancelled and re-sent",
      "The page returns to the server, which sends a second response that replaces the first",
      "The error can be handled with {:catch} in the await block",
      "The browser crashes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should be awaited rather than streamed?",
    "topic": "Streaming promises",
    "choices": [
      "Every piece of data, so that the page is always complete when it first appears",
      "Data required for the first meaningful content, such as the main record",
      "Only fonts",
      "Only images"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does streaming relate to SEO?",
    "topic": "Streaming promises",
    "choices": [
      "Crawlers get the awaited content immediately, while streamed content may arrive later",
      "Streaming hides content from users",
      "Streaming disables SEO",
      "Streamed content is always indexed first, because crawlers wait for every promise"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good use case for streaming?",
    "topic": "Streaming promises",
    "choices": [
      "The layout's header",
      "The route parameter",
      "The page title and meta tags, which should arrive after the main content",
      "A comments or recommendations section that is slow to load"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid streaming without a fallback UI?",
    "topic": "Streaming promises",
    "choices": [
      "The server stops responding",
      "The promise is cancelled",
      "The route is not found",
      "Users see an empty gap"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you return an HTTP 404 from a load function?",
    "topic": "Error and redirect handling",
    "choices": [
      "return 404",
      "throw error(404, 'Not found')",
      "redirect(404)",
      "throw new Response(404)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which status is usually used for a redirect after a form submission?",
    "topic": "Error and redirect handling",
    "choices": [
      "200 OK",
      "303 See Other",
      "500 Internal Server Error",
      "404 Not Found"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you redirect from a load?",
    "topic": "Error and redirect handling",
    "choices": [
      "throw redirect(307, '/login')",
      "navigate('/login')",
      "location.assign('/login')",
      "return '/login'"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when a load throws an error() with a status?",
    "topic": "Error and redirect handling",
    "choices": [
      "SvelteKit renders the nearest +error.svelte with that status",
      "The server restarts and serves the page again with the error value cleared",
      "The client retries forever",
      "The page stays blank"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens for an unexpected exception in a load function?",
    "topic": "Error and redirect handling",
    "choices": [
      "The exception is hidden and the page renders",
      "The user sees the stack trace in production",
      "SvelteKit returns a generic 500 error",
      "The route is deleted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why redirect unauthenticated users in a server load instead of the component?",
    "topic": "Error and redirect handling",
    "choices": [
      "The browser blocks redirects in components",
      "Server loads are faster",
      "Components cannot redirect, because navigation is handled only by the server",
      "The redirect happens before any protected data is sent to the browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between redirect and goto?",
    "topic": "Error and redirect handling",
    "choices": [
      "goto works only on the server",
      "redirect works only in components",
      "They are identical, and either one can be used in both load and component code",
      "redirect is thrown in server or load code, while goto navigates from client code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you return a user-friendly message with error()?",
    "topic": "Error and redirect handling",
    "choices": [
      "Write it to the console",
      "Add it to the URL as a query string, which the error page reads on arrival",
      "Pass a message string or object as the second argument",
      "Store it in a cookie"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you log for unexpected errors?",
    "topic": "Error and redirect handling",
    "choices": [
      "The user's password and the full request body, so that support can reproduce it",
      "Details in handleError, but only a safe message for the user",
      "The full request body to the page",
      "Nothing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if a layout load throws an error?",
    "topic": "Error and redirect handling",
    "choices": [
      "The error page is rendered from a layout above the failing one",
      "The layout is skipped silently",
      "The server crashes",
      "The page below renders anyway, with the data from the layout set to undefined"
    ],
    "answerIdx": 0
  }
]
```

LAYER: sveltekit-dev-5

```json
[
  {
    "stem": "Where do form actions live in a SvelteKit route?",
    "topic": "Form actions",
    "choices": [
      "In an exported actions object in +page.server.js",
      "In a hooks file that runs for every request",
      "In a +actions.js file next to the page component",
      "In the page component's script block, as event handlers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP method do form actions respond to?",
    "topic": "Form actions",
    "choices": [
      "GET, because actions read the query string of the URL",
      "POST",
      "PUT, since actions update the data of the page",
      "Any method, chosen by the browser at submit time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the default action in actions = { default: async (event) => {} } handle?",
    "topic": "Form actions",
    "choices": [
      "Every request to any route in the app, whatever the HTTP method of that request",
      "A POST to the page's URL from a form with no named action",
      "Only requests that carry a JSON body",
      "Only forms that use the enhance directive"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does an action read the submitted fields?",
    "topic": "Form actions",
    "choices": [
      "const data = form.values in the component",
      "const data = event.body.fields",
      "const data = await request.formData()",
      "const data = await load()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read a single field from FormData?",
    "topic": "Form actions",
    "choices": [
      "data.get('email')",
      "data['email'].value",
      "data.email",
      "data.find('email')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must a <form> have to call a SvelteKit action without JavaScript?",
    "topic": "Form actions",
    "choices": [
      "a bind:form directive on the tag",
      "a custom element called <action-form>",
      "a data-action attribute with the function name",
      "method=\"POST\" (and the page's URL by default)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are actions a good place for database writes?",
    "topic": "Form actions",
    "choices": [
      "They run only on the server",
      "They are cached for every visitor of the site",
      "They run in the browser with full access to cookies",
      "They run automatically every time the page loads"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens after an action finishes without redirecting?",
    "topic": "Form actions",
    "choices": [
      "The server restarts the route",
      "The browser stays on a blank page until the user reloads the tab by hand",
      "The load functions are disabled",
      "The page re-renders, and the returned data appears in the form prop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which header checks help SvelteKit protect actions against CSRF?",
    "topic": "Form actions",
    "choices": [
      "A hidden token is required in every form, and the server stores it in a cookie",
      "The Origin header is compared to the request URL for form posts",
      "Cookies are deleted on submit",
      "The Referer header is encrypted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can an action access the authenticated user?",
    "topic": "Form actions",
    "choices": [
      "From window.user in the browser",
      "By importing it from static",
      "By reading the password field again",
      "Through locals set in hooks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does use:enhance do on a form?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "Progressively enhances it, submitting with fetch and updating the page without a full reload",
      "Adds CSS animations to the form on submit and disables the browser's own validation",
      "Disables the form until JavaScript loads",
      "Encrypts the fields before sending them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is enhance imported from?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "@sveltejs/kit/enhance",
      "$app/forms",
      "$app/navigation",
      "svelte/forms"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to the form if JavaScript is unavailable?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "It does nothing until the scripts load, because the form needs JavaScript to be sent",
      "It shows an error page",
      "It submits to a different URL",
      "It still works as a normal POST with a full page reload"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does enhance do by default after a successful action?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "Clears the browser cache",
      "Reloads the browser tab",
      "Updates the form prop",
      "Closes the connection"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you customize enhance behavior?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "Edit the compiled output of the form after the build, since enhance is fixed",
      "Add a custom attribute to the page",
      "It cannot be customized",
      "Pass a callback that receives the submission and returns a result handler"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is progressive enhancement valuable?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "It makes pages bigger",
      "It removes the need for validation",
      "It makes the server code unnecessary, because the browser handles every submission",
      "The app works for users with slow or failed JavaScript and remains accessible"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does applyAction do inside a custom enhance callback?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "Cancels the submission",
      "Applies CSS to the form after the response arrives, so that errors are highlighted",
      "Runs the action again",
      "Applies the action's result, such as updating the form prop or redirecting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you show a pending state during submission?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "Use a CSS-only timer that shows a spinner for the average time of a request",
      "Use a flag set in the enhance callback and cleared in the returned handler",
      "Read the load function",
      "Disable all JavaScript"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the update function from an enhance result do?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "Updates the package version of the form library that is used by the page",
      "Updates the database row",
      "Applies the default post-submit behavior, like resetting the form and refreshing data",
      "Updates the route name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should use:enhance never be relied on for?",
    "topic": "Progressive enhancement with enhance",
    "choices": [
      "Updating the form prop",
      "Security, since the server must still validate everything",
      "Showing progress to users while the request is running in the background",
      "Avoiding page reloads"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate form input on the server even with client-side checks?",
    "topic": "Validation with Zod",
    "choices": [
      "Server validation is faster",
      "Clients can bypass the browser",
      "Browsers cannot validate email addresses",
      "Client validation is not allowed in SvelteKit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "A database ORM",
      "A TypeScript-first schema library for validating data",
      "A SvelteKit adapter",
      "A CSS preprocessor that compiles nested rules into plain stylesheet files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Zod method validates without throwing?",
    "topic": "Validation with Zod",
    "choices": [
      "schema.safeParse(data)",
      "schema.test(data)",
      "schema.parse(data), which never throws",
      "schema.check(data)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does safeParse return?",
    "topic": "Validation with Zod",
    "choices": [
      "A promise of a string",
      "An object with success",
      "The data directly or null",
      "A boolean only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you turn Zod errors into per-field messages?",
    "topic": "Validation with Zod",
    "choices": [
      "error.fields.map()",
      "error.json()",
      "error.toString() only",
      "error.flatten().fieldErrors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you define a required email string with Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "z.string().email()",
      "z.type(email)",
      "z.string('email')",
      "z.email.required()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does z.coerce.number() do on a form value?",
    "topic": "Validation with Zod",
    "choices": [
      "Throws for every string",
      "Rejects numbers",
      "Converts the incoming string to a number before validating",
      "Rounds the number up to the nearest whole value before comparing it to the schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why convert FormData to a plain object before parsing?",
    "topic": "Validation with Zod",
    "choices": [
      "Zod only accepts arrays",
      "It removes the CSRF check",
      "Schemas validate plain objects",
      "FormData cannot be read on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of sharing a schema between the client and server?",
    "topic": "Validation with Zod",
    "choices": [
      "The schema runs faster",
      "The client can skip the server check",
      "Both sides apply the same rules",
      "The schema becomes encrypted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should happen to unknown extra fields in a validated body?",
    "topic": "Validation with Zod",
    "choices": [
      "They are stripped or rejected according to the schema settings",
      "They are sent to the client",
      "They are logged as passwords",
      "They are always saved, because the schema cannot tell which fields are extra"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define several actions on one page?",
    "topic": "Named actions",
    "choices": [
      "Use different HTTP verbs on one form",
      "Create several +page.server.js files for the same route",
      "Add a switch inside the default action",
      "Name them in the actions object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a form call a named action called login?",
    "topic": "Named actions",
    "choices": [
      "data-action=\"login\"",
      "method=\"login\"",
      "action=\"/login.js\"",
      "action=\"?/login\""
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a single button choose a different action?",
    "topic": "Named actions",
    "choices": [
      "formaction=\"?/delete\" on the button",
      "name=\"action:delete\"",
      "onclick=\"delete()\"",
      "action=delete on the form tag only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a page have a default action and named actions together?",
    "topic": "Named actions",
    "choices": [
      "Yes, but only in development",
      "No, SvelteKit does not allow mixing them",
      "Only for GET requests",
      "Yes, with no restrictions, as long as each name is unique within the route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What URL does a named action post to?",
    "topic": "Named actions",
    "choices": [
      "/api/login, which SvelteKit creates from the name of the action automatically",
      "/actions/login",
      "The page's URL with a query like ?/login",
      "The home page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which pattern separates responsibilities nicely for a login page?",
    "topic": "Named actions",
    "choices": [
      "Client-side fetch calls only",
      "Separate login and logout actions in the same route",
      "A single GET handler",
      "One huge default action with if statements that check a hidden field in the form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good name for an action that deletes a record?",
    "topic": "Named actions",
    "choices": [
      "default",
      "load",
      "delete",
      "enhance"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does an action know which button was pressed without named actions?",
    "topic": "Named actions",
    "choices": [
      "By reading the DOM of the page from inside the action once the form is posted",
      "By checking the browser version",
      "By including a hidden or button field in FormData and checking it",
      "By asking the user again"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of named actions over a separate API route?",
    "topic": "Named actions",
    "choices": [
      "They avoid validation",
      "They need no server",
      "The page works without JavaScript and keeps related code together",
      "They run faster in the browser, because the form is handled without a request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the action's event.url contain?",
    "topic": "Named actions",
    "choices": [
      "The form's HTML",
      "The URL of the request, including the ?/name suffix",
      "The database name",
      "The user's profile and role, which are copied from the cookie by SvelteKit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you return validation errors from an action?",
    "topic": "Returning errors and data",
    "choices": [
      "return fail(400, { errors",
      "return null",
      "redirect(400, '/')",
      "throw new Error('invalid')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does fail() set?",
    "topic": "Returning errors and data",
    "choices": [
      "The HTTP status and the data available as the form prop",
      "The page title and the meta tags that are shown while the form is invalid",
      "The cookies",
      "The database state"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a component read the data returned by an action?",
    "topic": "Returning errors and data",
    "choices": [
      "From window.history",
      "let { form } = $props()",
      "let { action } = $state()",
      "import form from './+page.server.js'"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why return the submitted values with errors?",
    "topic": "Returning errors and data",
    "choices": [
      "To validate them again",
      "To store them in the database",
      "So the form can be refilled",
      "To log them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid returning password values to the form prop?",
    "topic": "Returning errors and data",
    "choices": [
      "The form prop only accepts numbers",
      "They would be sent back to the browser and could leak",
      "Passwords are too long to be serialized, so the form prop would drop the field",
      "Browsers cannot display them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What kind of data can an action return?",
    "topic": "Returning errors and data",
    "choices": [
      "Any object, including functions and class instances",
      "DOM elements",
      "Serializable data",
      "Only strings"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does returning { success: true } let the component do?",
    "topic": "Returning errors and data",
    "choices": [
      "Show a confirmation message based on form?.success",
      "Close the server",
      "Skip validation on the next submit because the server remembers the last success",
      "Redirect automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which function ends an action with a redirect?",
    "topic": "Returning errors and data",
    "choices": [
      "redirect(303, '/dashboard')",
      "goto('/dashboard') in the action",
      "return '/dashboard'",
      "navigate('/dashboard')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should an action redirect rather than return data?",
    "topic": "Returning errors and data",
    "choices": [
      "Never",
      "On every validation error, so that the user lands on a page that lists the fields",
      "After a successful create or login, to avoid resubmission on refresh",
      "Only for GET requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the form prop contain on first page load?",
    "topic": "Returning errors and data",
    "choices": [
      "The last submission from the database",
      "An empty form element",
      "undefined, until an action returns data",
      "The user's cookie"
    ],
    "answerIdx": 2
  },
  {
    "stem": "After an action changes data, how does the page show fresh data?",
    "topic": "Invalidation after mutations",
    "choices": [
      "The page keeps stale data until logout",
      "The browser must be refreshed manually",
      "Data refreshes only after a redirect",
      "Load functions are re-run"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you force load data to refresh from client code?",
    "topic": "Invalidation after mutations",
    "choices": [
      "Delete the cookies",
      "location.reload() only, because SvelteKit has no function for refreshing load data",
      "invalidateAll() or invalidate(url) from $app/navigation",
      "Re-import the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When might you call invalidate manually after enhance?",
    "topic": "Invalidation after mutations",
    "choices": [
      "Only in the load function",
      "Only on the server",
      "Never, since it always runs",
      "In a custom callback"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does invalidate('app:todos') need to work?",
    "topic": "Invalidation after mutations",
    "choices": [
      "A global store named todos that every component subscribes to and updates",
      "A route named todos",
      "A database trigger",
      "A load function that registered depends('app:todos')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an optimistic update?",
    "topic": "Invalidation after mutations",
    "choices": [
      "Showing an error first",
      "Updating the UI before the server confirms",
      "Skipping the server entirely",
      "Waiting for the server to answer before showing anything"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should happen if an optimistic update fails?",
    "topic": "Invalidation after mutations",
    "choices": [
      "Roll back the UI and show an error",
      "Reload the whole site",
      "Keep showing the wrong data",
      "Delete the database row"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why re-run loads after mutations rather than patching local state everywhere?",
    "topic": "Invalidation after mutations",
    "choices": [
      "The server stays the source of truth, avoiding drift",
      "It reduces the number of routes",
      "Local state cannot be changed",
      "Loads are free, so running them again never costs anything on the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Post/Redirect/Get pattern prevent?",
    "topic": "Invalidation after mutations",
    "choices": [
      "Slow queries that happen when the same form is posted several times in a row",
      "Cross-site scripting",
      "Missing cookies",
      "Duplicate submissions when users refresh after posting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you refresh only part of the data after an action?",
    "topic": "Invalidation after mutations",
    "choices": [
      "Use localStorage",
      "You cannot; everything reloads always",
      "Edit the HTML",
      "Use dependency keys with depends"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a drawback of invalidateAll after every mutation?",
    "topic": "Invalidation after mutations",
    "choices": [
      "It may re-run more loads than needed",
      "It deletes cookies",
      "It blocks navigation",
      "It breaks forms, because inputs are replaced while the user is still typing"
    ],
    "answerIdx": 0
  }
]
```

LAYER: sveltekit-dev-6

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
    "stem": "How do you fetch all posts from a +page.server.js load function with Prisma?",
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Querying in server code",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
    "choices": [
      "In package.json under the prisma key, as a seed command",
      "In a .seedrc file at the repository root",
      "In svelte.config.js under the kit options",
      "In the schema.prisma datasource block, next to the connection url setting"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why write seed scripts to be idempotent, using upsert?",
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
    "choices": [
      "Name the file production-safe.ts so Prisma knows to skip it in production",
      "Check the environment or database URL before deleting anything",
      "Run it from the browser console",
      "Store the URL in the seed file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read a private environment variable such as DATABASE_URL in server code?",
    "topic": "Environment variables",
    "choices": [
      "Call window.env.get('DATABASE_URL') in the browser",
      "Import it from $env/static/private (or $env/dynamic/private)",
      "Read import.meta.env.DATABASE_URL in any component",
      "Use a global variable declared in app.html"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which prefix marks an environment variable as safe to expose to the browser in SvelteKit?",
    "topic": "Environment variables",
    "choices": [
      "CLIENT_",
      "EXPOSE_",
      "VITE_ only, as in every other framework",
      "PUBLIC_"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if client code imports from $env/static/private?",
    "topic": "Environment variables",
    "choices": [
      "The build fails, preventing secrets from leaking into the browser bundle",
      "The value is replaced with an empty string at runtime",
      "The value is sent to the browser encrypted",
      "The import works but logs a warning"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between $env/static and $env/dynamic?",
    "topic": "Environment variables",
    "choices": [
      "static values are inlined at build time, while dynamic values are read when the server runs",
      "static values can change at runtime, while dynamic ones are fixed at build time",
      "They are two names for the same module",
      "static works only for public variables, and dynamic only for private"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might you choose $env/dynamic/private for a deployment?",
    "topic": "Environment variables",
    "choices": [
      "Dynamic variables are always faster to read",
      "Dynamic variables are visible to the browser",
      "Static variables cannot hold strings",
      "The same build can run with different values in each environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does SvelteKit load .env files from during local development?",
    "topic": "Environment variables",
    "choices": [
      "The src/routes folder",
      "The static folder",
      "The project root",
      "The node_modules folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should .env be listed in .gitignore?",
    "topic": "Environment variables",
    "choices": [
      "SvelteKit regenerates it on every start",
      "It contains secrets that must not be committed to version control",
      "Git cannot store files that start with a dot",
      "Vite deletes it during the build"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of an .env.example file?",
    "topic": "Environment variables",
    "choices": [
      "Documenting which variables are needed without storing real values",
      "Sharing variables with the browser",
      "Providing default secrets for all developers",
      "Overriding the real .env file in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should production secrets be configured?",
    "topic": "Environment variables",
    "choices": [
      "In a file under the static folder",
      "In the page title",
      "In svelte.config.js committed to the repository",
      "In the hosting platform's environment or secret settings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does Prisma need DATABASE_URL at runtime?",
    "topic": "Environment variables",
    "choices": [
      "It defines the route that serves the data",
      "The client connects to the database with the connection string it contains",
      "It is used to name the generated TypeScript types",
      "It tells Vite which port to use"
    ],
    "answerIdx": 1
  }
]
```

LAYER: sveltekit-dev-7

```json
[
  {
    "stem": "What is the handle hook in src/hooks.server.js?",
    "topic": "Server hooks and handle",
    "choices": [
      "A function that runs once when the build finishes and writes the routes to disk",
      "A component that wraps every page in the browser",
      "A function that runs for every server request and can modify the event and response",
      "A function that runs only for routes inside the api folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does handle receive as arguments?",
    "topic": "Server hooks and handle",
    "choices": [
      "An object with the request event and a resolve function",
      "The compiled HTML and the response status",
      "The user's session and a database connection, which the hook then opens for you",
      "The route's component and its props"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does calling resolve(event) do?",
    "topic": "Server hooks and handle",
    "choices": [
      "Passes the request on to SvelteKit's router and returns the response",
      "Retrieves the cookie from the browser",
      "Closes the request without sending any response, so the client has to retry later",
      "Restarts the server for the next request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does auth logic often live in handle?",
    "topic": "Server hooks and handle",
    "choices": [
      "It runs only once per user session",
      "It replaces the need for a database",
      "It runs before load functions and actions, so the user can be attached to every request",
      "It runs in the browser and can read local storage, where the session is kept"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is event.locals?",
    "topic": "Server hooks and handle",
    "choices": [
      "A global store that persists between requests and holds the data of every visitor",
      "A set of environment variables",
      "A per-request object for passing data from hooks to load functions and actions",
      "A browser-only store of local variables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it unsafe to put per-user data in a module-level variable on the server?",
    "topic": "Server hooks and handle",
    "choices": [
      "Servers forbid module-level state",
      "Module-level variables are read-only",
      "Modules are reloaded for each request, so module-level variables are always empty",
      "The module is shared across requests, so data can leak between users"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can several hooks be combined?",
    "topic": "Server hooks and handle",
    "choices": [
      "With the sequence helper from @sveltejs/kit/hooks",
      "It is not possible to use more than one",
      "By merging them in svelte.config.js",
      "By calling them in a for loop in the layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the handleFetch hook let you do?",
    "topic": "Server hooks and handle",
    "choices": [
      "Retry failed form submissions",
      "Replace the browser's fetch function so that all client requests go through the hook",
      "Cache all load function results",
      "Modify or intercept fetch calls made on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can handle do with the response before it is sent?",
    "topic": "Server hooks and handle",
    "choices": [
      "Change the client's cookies in the browser directly",
      "Rewrite the database rows",
      "Reload the page in the browser",
      "Add or change headers, or transform the HTML"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does the handle hook not run?",
    "topic": "Server hooks and handle",
    "choices": [
      "In the browser, since it is a server hook",
      "On page requests",
      "On requests to endpoints, because only pages pass through the hook function",
      "On form action requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which API reads and writes cookies in a server load or action?",
    "topic": "Sessions and cookies",
    "choices": [
      "window.cookies.read()",
      "event.cookies (cookies.get and cookies.set)",
      "localStorage on the server",
      "document.cookie in the load function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must you pass to cookies.set in recent SvelteKit versions?",
    "topic": "Sessions and cookies",
    "choices": [
      "A path option, such as path: '/'",
      "A callback function",
      "A domain name always",
      "A random UUID as the third argument"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which cookie flag keeps JavaScript from reading a session cookie?",
    "topic": "Sessions and cookies",
    "choices": [
      "secure: true only",
      "maxAge: 0",
      "sameSite: 'strict' only",
      "httpOnly: true"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the secure flag do?",
    "topic": "Sessions and cookies",
    "choices": [
      "Shares the cookie with every subdomain",
      "Sends the cookie only over HTTPS",
      "Prevents the server from reading it",
      "Encrypts the cookie value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does SameSite=Lax help protect against?",
    "topic": "Sessions and cookies",
    "choices": [
      "Cross-site request forgery in many common cases",
      "Missing fonts",
      "Duplicate cookies",
      "Slow page loads on mobile networks, by delaying cookies until the page is ready"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why store only a session id in the cookie and keep the data on the server?",
    "topic": "Sessions and cookies",
    "choices": [
      "Cookies cannot hold more than one value, so the session data would not fit",
      "Servers cannot read cookies",
      "The browser cannot tamper with data it never holds",
      "Session ids are shorter than passwords"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does maxAge control on a cookie?",
    "topic": "Sessions and cookies",
    "choices": [
      "How many times the cookie can be read by the server before it is deleted",
      "How many domains may use it",
      "Its size in bytes",
      "How many seconds the cookie stays valid"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should the session id be long and random?",
    "topic": "Sessions and cookies",
    "choices": [
      "So it cannot be guessed by an attacker",
      "So it fits in a URL, where it can be passed between the pages of the site",
      "So browsers cache it",
      "So it can be sorted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is session fixation, and how do you avoid it?",
    "topic": "Sessions and cookies",
    "choices": [
      "A session that never expires; set a short maxAge on the cookie of the user",
      "An attacker sets a known session id; issue a new session on login",
      "A browser setting; disable cookies",
      "A bug that clears cookies; use localStorage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it important to hash passwords before storing them?",
    "topic": "Login and signup flows",
    "choices": [
      "Hashing makes passwords shorter, which saves space in the column of the table",
      "Hashing is required by SvelteKit",
      "Hashed passwords can be recovered by the server",
      "A database leak should not reveal users' actual passwords"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which algorithms are appropriate for password hashing?",
    "topic": "Login and signup flows",
    "choices": [
      "Reversible encryption with a shared key",
      "Base64 encoding",
      "Slow, salted algorithms such as argon2 or bcrypt",
      "Fast hashes such as MD5 or SHA-1, because they finish quickly on any server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should a signup action handle an email that already exists?",
    "topic": "Login and signup flows",
    "choices": [
      "Overwrite the existing account with the new data so that the user can sign in",
      "Return the existing user's data",
      "Return a validation error or a neutral message without exposing account details",
      "Create a duplicate user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which login error message avoids leaking whether an account exists?",
    "topic": "Login and signup flows",
    "choices": [
      "Invalid email or password",
      "No account with that email",
      "Account not found in database",
      "Wrong password for this account"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should happen after a successful login?",
    "topic": "Login and signup flows",
    "choices": [
      "Return the password hash to the client",
      "Create a session, set the cookie and redirect",
      "Keep the user on a blank page",
      "Store the password in localStorage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate signup input with a schema on the server?",
    "topic": "Login and signup flows",
    "choices": [
      "It removes the need for a database",
      "Clients can send any data, so the server must enforce rules",
      "Schemas make the page load faster",
      "Browsers cannot validate email fields, so every format check has to run on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why rate limit login attempts?",
    "topic": "Login and signup flows",
    "choices": [
      "To slow down password guessing and credential stuffing",
      "To reduce cookie size",
      "To make login faster, because fewer attempts mean that the server has less work",
      "To avoid hashing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is OAuth login with a provider useful for?",
    "topic": "Login and signup flows",
    "choices": [
      "Letting users sign in without your app storing their password",
      "Removing the need for cookies",
      "Making pages load faster, since the provider caches them for each of its users",
      "Replacing HTTPS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do libraries such as Lucia or Auth.js provide?",
    "topic": "Login and signup flows",
    "choices": [
      "A database server",
      "A CSS framework",
      "Tested building blocks for sessions and authentication so you avoid rolling your own",
      "A replacement for the SvelteKit router that maps session ids to the pages of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a signup form do about weak passwords?",
    "topic": "Login and signup flows",
    "choices": [
      "Show the password in plain text on the page",
      "Enforce a minimum length and check against common breached passwords",
      "Accept any password, because users know best which passwords they can remember",
      "Email it to the user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is it best to check if a user may access a route on the server?",
    "topic": "Protecting routes",
    "choices": [
      "In CSS",
      "In the component's onMount, so that the check runs after the page appears",
      "In a hook or a server load function that runs before data is returned",
      "In the browser's address bar"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you redirect an unauthenticated visitor in a server load?",
    "topic": "Protecting routes",
    "choices": [
      "window.location = '/login'",
      "goto('/login') in the load",
      "return '/login' from load",
      "throw redirect(303, '/login')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is hiding a link in the UI not real protection?",
    "topic": "Protecting routes",
    "choices": [
      "Browsers remove hidden links from the page, so the server never receives the request",
      "Links cannot be hidden in Svelte",
      "Requests can be made directly, so the server must enforce access",
      "The router blocks direct requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to protect a whole group of pages?",
    "topic": "Protecting routes",
    "choices": [
      "Hide the folder in svelte.config.js",
      "Put them in a route group with a layout server load that checks the session",
      "Rename the folder to private",
      "Check the session in every page by hand, since layouts cannot run server code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which route files need protection besides pages?",
    "topic": "Protecting routes",
    "choices": [
      "Only static files, because endpoints and actions are protected by SvelteKit itself",
      "Only CSS files",
      "Only layouts without loads",
      "+server.js endpoints and form actions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What status should an authenticated user receive when lacking permission?",
    "topic": "Protecting routes",
    "choices": [
      "403 Forbidden",
      "200 OK",
      "401 Unauthorized",
      "302 Found"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What status fits a request with no valid session?",
    "topic": "Protecting routes",
    "choices": [
      "500 Internal Server Error",
      "201 Created",
      "401 Unauthorized, or a redirect to login for pages",
      "404 Not Found, because the resource is hidden from visitors who have not signed in"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why check authorization on every action, not only on the page load?",
    "topic": "Protecting routes",
    "choices": [
      "Actions are slower than loads, so they should not repeat the checks of the page",
      "Pages never load actions",
      "An action can be posted directly without ever loading the page",
      "Actions run in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a return-to parameter on the login redirect improve?",
    "topic": "Protecting routes",
    "choices": [
      "Cookie size",
      "Login speed, since the server can skip the password check after a redirect",
      "Database indexing",
      "Users land back on the page they wanted after signing in"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is least privilege?",
    "topic": "Protecting routes",
    "choices": [
      "Giving each user only the permissions needed",
      "Allowing access by default",
      "Giving everyone admin rights so that nobody is blocked while using the app",
      "Removing all permissions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a load function access the logged-in user?",
    "topic": "Accessing the user in load",
    "choices": [
      "By decoding the cookie in the component",
      "By importing the user module",
      "By reading localStorage",
      "Through locals.user set in handle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why return only safe user fields from a layout server load?",
    "topic": "Accessing the user in load",
    "choices": [
      "Extra fields slow down hydration",
      "Returned data is sent to the browser and visible to the user",
      "Load data is encrypted by default, so extra fields stay hidden from the browser",
      "Servers reject large objects"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can components use the user returned from a layout load?",
    "topic": "Accessing the user in load",
    "choices": [
      "Through a global variable named user that SvelteKit sets on the window object",
      "Through page.data.user (or the data prop in the layout)",
      "By importing +layout.server.js",
      "By calling the database directly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of loading the user in the root layout server load?",
    "topic": "Accessing the user in load",
    "choices": [
      "The user loads only on the client",
      "The load runs only for the home page",
      "The user is hidden from child routes, which have to fetch it again themselves",
      "Every page receives the session state without repeated queries in each page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you type locals.user in TypeScript?",
    "topic": "Accessing the user in load",
    "choices": [
      "Use any everywhere, since SvelteKit generates the locals type from the cookie",
      "Declare it in the layout",
      "Declare it in App.Locals inside src/app.d.ts",
      "Add it to package.json"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a load reads locals.user but the hook did not set it?",
    "topic": "Accessing the user in load",
    "choices": [
      "The page shows a 404",
      "It is undefined, so load code must handle the missing user",
      "SvelteKit supplies a guest user so that the load keeps running as usual",
      "The request is cancelled"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why avoid loading user data in universal +layout.js?",
    "topic": "Accessing the user in load",
    "choices": [
      "Universal loads do not receive params",
      "Universal loads cannot be async, so the session lookup would block rendering",
      "Universal loads run in the browser too and cannot access server-only sessions or secrets",
      "Universal loads never run on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you refresh the user after a profile update?",
    "topic": "Accessing the user in load",
    "choices": [
      "Invalidate the layout load, for example with invalidateAll",
      "Edit the cookie by hand",
      "Reload the browser tab manually only, because load data cannot be refreshed",
      "Restart the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of passing a full user record to the client?",
    "topic": "Accessing the user in load",
    "choices": [
      "It prevents hydration",
      "It breaks the router",
      "It may expose private fields such as email or role details unnecessarily",
      "It makes the page crash, since the browser cannot parse objects with many fields"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should role checks for admin pages happen?",
    "topic": "Accessing the user in load",
    "choices": [
      "Only in the template, by hiding the buttons that the user is not allowed to use",
      "Only in the browser console",
      "On the server, in hooks or load/action code",
      "Only in CSS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should logout do on the server?",
    "topic": "Logout and security",
    "choices": [
      "Only hide the user's name from the page and keep the session valid on the server",
      "Delete or invalidate the session and clear the cookie",
      "Close the browser tab",
      "Delete the user's account"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should logout be a POST action rather than a GET link?",
    "topic": "Logout and security",
    "choices": [
      "Links cannot log out",
      "GET requests can be triggered by images or prefetching, causing unwanted logouts",
      "POST is faster than GET, so the logout finishes before the page is navigated away",
      "Browsers block GET logout"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does SvelteKit's built-in CSRF protection check?",
    "topic": "Logout and security",
    "choices": [
      "That cookies are encrypted",
      "That passwords are strong enough before the form data is passed to the action",
      "That requests are HTTPS",
      "That form submissions come from the same origin"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which header can reduce the damage of XSS by restricting script sources?",
    "topic": "Logout and security",
    "choices": [
      "Content-Security-Policy",
      "Last-Modified",
      "Accept-Language",
      "Content-Length, which tells the browser how many bytes of script it may run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you add security headers to every response?",
    "topic": "Logout and security",
    "choices": [
      "Edit the browser settings",
      "Put them in a meta tag only",
      "Add them to each component",
      "Set them in the handle hook"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should HTTPS be required in production?",
    "topic": "Logout and security",
    "choices": [
      "SvelteKit requires it to compile",
      "Credentials and cookies would otherwise travel in plain text",
      "Browsers block HTTP pages",
      "HTTPS speeds up bcrypt, because encrypted connections hash the password for the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should happen to sessions when a user changes their password?",
    "topic": "Logout and security",
    "choices": [
      "Nothing, because sessions stay valid until their own cookies expire naturally",
      "Other sessions should be invalidated",
      "The password is emailed",
      "The account is deleted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why log authentication failures?",
    "topic": "Logout and security",
    "choices": [
      "Logs are required by SvelteKit",
      "They replace rate limiting",
      "Logs speed up login, because the server can skip checks that were logged before",
      "They help detect attacks and misconfigurations"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a session expiry strategy that balances security and usability?",
    "topic": "Logout and security",
    "choices": [
      "A sliding or absolute expiry with the option to renew",
      "Sessions that never expire, so users do not have to sign in again after a break",
      "Sessions stored in the URL",
      "Sessions that expire after one request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you never log or send to the client?",
    "topic": "Logout and security",
    "choices": [
      "The route name",
      "Password hashes, session secrets and raw credentials",
      "The user's display name",
      "The page title and the route name, which are linked to the identity of the user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should protected endpoints in +server.js check the session themselves?",
    "topic": "Protecting routes",
    "choices": [
      "Endpoints inherit the checks from the nearest layout automatically",
      "Endpoints are never reachable from outside the application",
      "Endpoints run only in the browser, where the session is already known",
      "They can be called directly by any client, bypassing the pages that normally use them"
    ],
    "answerIdx": 3
  }
]
```

LAYER: sveltekit-dev-8

```json
[
  {
    "stem": "What does writable(0) from svelte/store create?",
    "topic": "Writable and derived stores",
    "choices": [
      "A component prop that is shared with all children",
      "A cookie that is sent with the next request",
      "A store object whose value can be read",
      "A constant number that Svelte freezes at compile time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read a store's value inside a component's markup?",
    "topic": "Writable and derived stores",
    "choices": [
      "Wrap it in a #store block",
      "Prefix the store name with $",
      "Import the value with an @ prefix",
      "Call count.read() inside the template tag"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which methods does a writable store provide?",
    "topic": "Writable and derived stores",
    "choices": [
      "read, write and watch",
      "set, update and subscribe",
      "get, put and listen",
      "push, pop and peek"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a derived store do?",
    "topic": "Writable and derived stores",
    "choices": [
      "Writes to another store each time it changes",
      "Stores data in the browser's local storage",
      "Copies a store once and never updates it when the original value changes",
      "Computes its value from one or more other stores and updates when they change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a readable store?",
    "topic": "Writable and derived stores",
    "choices": [
      "A store that is invisible to components",
      "A store whose value can be subscribed to but not set from outside",
      "A store that can be read only once, after which its value is cleared",
      "A store that contains text only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if you call a store's subscribe method manually?",
    "topic": "Writable and derived stores",
    "choices": [
      "The component reloads",
      "You must call the returned unsubscribe function to avoid leaks",
      "Nothing; subscriptions clean up on their own in plain scripts",
      "The store deletes itself after one call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do Svelte 5 runes relate to stores?",
    "topic": "Writable and derived stores",
    "choices": [
      "Runes only work inside templates",
      "Runes and stores cannot be used in the same app",
      "Stores are removed in Svelte 5 and no longer work with the $ prefix in templates",
      "$state in shared .svelte.js modules can replace many uses of stores, though stores still work"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a module-level store dangerous on the server in SvelteKit?",
    "topic": "Writable and derived stores",
    "choices": [
      "Stores are slower on the server",
      "Modules cannot hold stores on the server",
      "Stores are deleted after each render",
      "It is shared by all users' requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you safely share per-user state during SSR?",
    "topic": "Writable and derived stores",
    "choices": [
      "Store it in a global variable",
      "Keep it in the window object",
      "Pass it through load data",
      "Write it to a cookie in every component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does $store.name = 'x' do when the store holds an object?",
    "topic": "Writable and derived stores",
    "choices": [
      "Creates a copy that nobody can read",
      "Resets the store",
      "Updates the property and notifies subscribers, using the auto-subscription syntax",
      "Throws an error because store values are immutable and cannot be assigned to"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the context API used for?",
    "topic": "Context API",
    "choices": [
      "Passing data to descendant components",
      "Defining global CSS variables",
      "Persisting data in the database",
      "Sharing data between separate browser tabs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which functions set and read context in a component tree?",
    "topic": "Context API",
    "choices": [
      "provide and inject, as in Vue",
      "setContext and getContext",
      "useContext and createContext as hooks",
      "put and take"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When must setContext be called?",
    "topic": "Context API",
    "choices": [
      "Only inside the markup",
      "During component initialization, not later in an event handler",
      "After the component has been unmounted",
      "Only in the root layout, because context cannot be created in other components"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does context differ from a global store?",
    "topic": "Context API",
    "choices": [
      "Context works only on the server",
      "Context lives in the database",
      "Context is shared by the whole app and keeps its value for every visitor",
      "Context is scoped to a component subtree, so each tree gets its own value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is context a good fit for SSR?",
    "topic": "Context API",
    "choices": [
      "Context values are cached by the CDN",
      "Context disables rendering on the server",
      "Context persists across requests for speed",
      "Each request builds its own component tree"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What key does setContext accept?",
    "topic": "Context API",
    "choices": [
      "Only component names",
      "Only objects with a type field",
      "Any value, commonly a string or a Symbol, used to retrieve it",
      "Only numbers, because the key is used as the index of the context list"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Is context reactive by default?",
    "topic": "Context API",
    "choices": [
      "No, but you can put reactive state or a store in the context value",
      "Only for strings",
      "Yes, any change to a context value updates every consumer automatically",
      "Only on the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is prop drilling?",
    "topic": "Context API",
    "choices": [
      "Overriding props with CSS",
      "Passing props through many intermediate components that don't use them",
      "Passing props to a database, so that the records of the table can be rendered",
      "Removing props from the child"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is a typical use of context in a UI library?",
    "topic": "Context API",
    "choices": [
      "Sending requests to the server",
      "Compiling styles",
      "Reading the current URL so that links can highlight the page that is open",
      "A form or accordion sharing state with its nested parts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when getContext is called for a key that was never set?",
    "topic": "Context API",
    "choices": [
      "It throws a build error",
      "It returns the parent's props",
      "It creates the context automatically",
      "It returns undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you add a fade transition to an element?",
    "topic": "Transitions and animations",
    "choices": [
      "transition:fade on the element",
      "animate:fade",
      "fade() as a CSS function",
      "<Fade> as a wrapper component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is the fade transition imported from?",
    "topic": "Transitions and animations",
    "choices": [
      "svelte/motion",
      "svelte/animate",
      "svelte/easing",
      "svelte/transition"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which directive runs a transition only when an element enters, not when it leaves?",
    "topic": "Transitions and animations",
    "choices": [
      "in:fly",
      "transition:fly",
      "animate:fly",
      "out:fly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What triggers a Svelte transition?",
    "topic": "Transitions and animations",
    "choices": [
      "A page reload",
      "The mouse leaving the window",
      "An element being added to or removed from the DOM, such as inside an {#if}",
      "A CSS hover rule that starts the animation whenever the pointer enters the element"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does animate:flip do in a keyed each block?",
    "topic": "Transitions and animations",
    "choices": [
      "Flips the whole page upside down while the list is being reordered on screen",
      "Reverses the data of the array",
      "Adds a fade to each new item",
      "Animates the movement of items when the list is reordered"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does flip come from?",
    "topic": "Transitions and animations",
    "choices": [
      "svelte/transition",
      "svelte/store",
      "svelte/action",
      "svelte/animate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do the tweened and spring helpers from svelte/motion provide?",
    "topic": "Transitions and animations",
    "choices": [
      "A way to preload images",
      "Animations for 3D models only",
      "Smoothly animated values that interpolate between numbers",
      "Server-side timers that delay the response until the animation has finished"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should animations respect prefers-reduced-motion?",
    "topic": "Transitions and animations",
    "choices": [
      "Some users find motion distracting or harmful",
      "It makes animations faster, because the browser then skips every other frame",
      "It reduces bundle size",
      "Browsers disable animations otherwise"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the local modifier (transition:slide|local) do?",
    "topic": "Transitions and animations",
    "choices": [
      "Delays the transition",
      "Stores the animation locally",
      "Plays the transition only on the local network, where the server is close by",
      "Plays the transition only when its own block is added or removed, not a parent's"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a custom transition function expected to return?",
    "topic": "Transitions and animations",
    "choices": [
      "An object with duration and a css or tick function",
      "A promise that resolves when the transition has finished playing on the screen",
      "A string of HTML",
      "A DOM element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Svelte action (use:action)?",
    "topic": "Actions and use directives",
    "choices": [
      "A function called when an element mounts, which can return an update and destroy method",
      "A CSS rule",
      "A store method",
      "A server form handler that runs when the element is submitted by the visitor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a typical use of an action?",
    "topic": "Actions and use directives",
    "choices": [
      "Defining a route",
      "Compiling the page",
      "Adding behavior to an element such as click-outside detection or tooltips",
      "Fetching data on the server before the page is rendered for the first request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the function returned from an action usually provide?",
    "topic": "Actions and use directives",
    "choices": [
      "A new component",
      "A destroy function (and optionally update) for cleanup",
      "The element's HTML, which Svelte then inserts into the rendered page",
      "A store"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an action receive as its first argument?",
    "topic": "Actions and use directives",
    "choices": [
      "The event object of the last click",
      "The page store",
      "The DOM element it is attached to",
      "The parent component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you pass a parameter to an action?",
    "topic": "Actions and use directives",
    "choices": [
      "tooltip:use='Hello'",
      "use={tooltip, 'Hello'}",
      "use:tooltip={'Hello'}",
      "use:tooltip('Hello')"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between an action and a component?",
    "topic": "Actions and use directives",
    "choices": [
      "They are identical, since both render markup and are imported in the same way",
      "An action adds behavior to an existing element, while a component renders markup",
      "Actions render HTML, components do not",
      "Actions run only on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Svelte 5 offer an alternative to use: directives?",
    "topic": "Actions and use directives",
    "choices": [
      "Using Vue directives",
      "The {@attach} feature and attachments for element behavior",
      "The removal of all element behavior, since components handle every interaction",
      "Using class components"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must actions clean up event listeners they add?",
    "topic": "Actions and use directives",
    "choices": [
      "Browsers remove them automatically, so cleanup code is never needed in actions",
      "Actions run only once",
      "Otherwise listeners remain after the element is removed, causing leaks",
      "Cleanup causes errors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do actions run?",
    "topic": "Actions and use directives",
    "choices": [
      "In the browser, since they need the DOM element",
      "In the build step",
      "In the database",
      "Only on the server during SSR, because the action receives the request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which pattern is handled well with an action?",
    "topic": "Actions and use directives",
    "choices": [
      "Redirecting after login",
      "Validating a form on the server",
      "Fetching a list of users from the database when the element is added",
      "Clicking outside a dropdown to close it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good reason to accept a snippet prop in a reusable component?",
    "topic": "Reusable component patterns",
    "choices": [
      "Callers can customize parts of the markup",
      "Snippets make the component run on the server",
      "Snippets are required for styles",
      "Snippets replace all props"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does rest props spread ({...rest}) enable in a wrapper component?",
    "topic": "Reusable component patterns",
    "choices": [
      "Validating props",
      "Forwarding extra attributes like aria-label to the underlying element",
      "Merging all stores",
      "Removing unknown props so that the component never passes them to an element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why design components with a small set of focused props?",
    "topic": "Reusable component patterns",
    "choices": [
      "Browsers cap prop counts",
      "Fewer props always run faster",
      "They are easier to understand",
      "Svelte limits props to three"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a headless component pattern?",
    "topic": "Reusable component patterns",
    "choices": [
      "A component without a script block that renders only static markup",
      "A component that renders on the server only",
      "A component with no CSS",
      "Logic without markup, leaving rendering to the caller"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a component expose behavior to its parent?",
    "topic": "Reusable component patterns",
    "choices": [
      "Through callback props, bound values or bound references",
      "By editing the parent's variables directly through a reference to its scope",
      "By using global variables",
      "By emitting DOM events on window only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why prefer composition (props, snippets) over deep inheritance of components?",
    "topic": "Reusable component patterns",
    "choices": [
      "Inheritance is faster, because the compiler merges the parent and child code",
      "Inheritance is required for SSR",
      "Composition is deprecated",
      "Svelte has no component inheritance, and composition is flexible"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a reusable button component forward to the native button?",
    "topic": "Reusable component patterns",
    "choices": [
      "Only CSS",
      "Attributes and event handlers such as type and onclick",
      "Nothing; buttons cannot be wrapped, because Svelte forbids custom button elements",
      "Only text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a good API for a reusable component avoid?",
    "topic": "Reusable component patterns",
    "choices": [
      "Leaking implementation details that callers then depend on",
      "Using TypeScript",
      "Having documentation",
      "Having default values, since callers should always pass every prop explicitly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you provide sensible defaults for optional props?",
    "topic": "Reusable component patterns",
    "choices": [
      "Defaults are not possible",
      "Use global variables",
      "Check them in the parent each time",
      "Destructure with defaults in $props()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of keeping presentational components separate from data loading?",
    "topic": "Reusable component patterns",
    "choices": [
      "They are easier to reuse and test without a server",
      "Data cannot be loaded in components",
      "It removes the need for stores",
      "Presentational components run faster on the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Svelte do at compile time to help accessibility?",
    "topic": "Accessibility",
    "choices": [
      "It removes ARIA attributes",
      "It disables screen readers",
      "It warns about issues such as missing alt text or click handlers on non-interactive elements",
      "It fixes all accessibility problems automatically, so no manual checks are needed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which element should be used for something that triggers an action?",
    "topic": "Accessibility",
    "choices": [
      "<a> without an href",
      "<button>",
      "<div> with an onclick handler",
      "<span> with a tabindex"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must images have an alt attribute?",
    "topic": "Accessibility",
    "choices": [
      "It sets the image size",
      "It speeds up loading, because the browser skips images whose alt text is empty",
      "Screen readers describe the image using it, and it appears if the image fails",
      "It is required by CSS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the aria-label attribute provide?",
    "topic": "Accessibility",
    "choices": [
      "A keyboard shortcut",
      "A tooltip for mouse users only, which is hidden from assistive technology",
      "An accessible name for an element that lacks visible text",
      "A CSS class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should happen to focus when a modal dialog opens?",
    "topic": "Accessibility",
    "choices": [
      "Focus moves into the dialog",
      "Focus moves to the browser address bar",
      "Focus stays on the button behind it",
      "Focus is removed from the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must interactive elements be reachable by keyboard?",
    "topic": "Accessibility",
    "choices": [
      "Many users navigate without a mouse",
      "Keyboards are faster for everyone",
      "It reduces bundle size",
      "Browsers require it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the label for attribute (or wrapping label) do for inputs?",
    "topic": "Accessibility",
    "choices": [
      "Validates the input",
      "Associates the label with the input for screen readers and larger click targets",
      "Styles the input with the default look of the browser when it gets focus",
      "Hides the input"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What color contrast concern should designers address?",
    "topic": "Accessibility",
    "choices": [
      "Text must have sufficient contrast with its background",
      "Colors must be bright so that every element stands out from the background",
      "Contrast only matters for images",
      "Colors must be unique"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you announce dynamic updates such as form errors to screen readers?",
    "topic": "Accessibility",
    "choices": [
      "Use a larger font",
      "Use an aria-live region or move focus to the message",
      "Play a sound only",
      "Change the page color briefly so that screen reader users notice the update"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After client-side navigation, why manage focus or announce the new page?",
    "topic": "Accessibility",
    "choices": [
      "Browsers always announce navigation themselves",
      "It makes the page faster",
      "Screen reader users may not realize the page changed",
      "Pages reload and reset focus automatically"
    ],
    "answerIdx": 2
  }
]
```

LAYER: sveltekit-dev-9

```json
[
  {
    "stem": "How do you create an API endpoint at /api/posts in SvelteKit?",
    "topic": "API routes with server endpoints",
    "choices": [
      "Export a posts object from hooks.server.js",
      "Add src/api/posts.js and list it in svelte.config.js under the routes option",
      "Create a +api.js file next to the page",
      "Add src/routes/api/posts/+server.js exporting handlers such as GET"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must a +server.js handler return?",
    "topic": "API routes with server endpoints",
    "choices": [
      "A Svelte component",
      "A plain string of HTML only",
      "A promise that resolves to the DOM",
      "A Response object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function helps return JSON from an endpoint?",
    "topic": "API routes with server endpoints",
    "choices": [
      "res.json() from Express",
      "return JSON.stringify only",
      "json() from @sveltejs/kit",
      "send() from svelte"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which exports does +server.js use to handle HTTP methods?",
    "topic": "API routes with server endpoints",
    "choices": [
      "A single default export that checks the method",
      "Functions named GET, POST",
      "Methods named onGet and onPost",
      "A class with a handle method"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does an endpoint receive the request body?",
    "topic": "API routes with server endpoints",
    "choices": [
      "request.query only",
      "await request.json() on the request in the event",
      "event.body.json in the handler, which SvelteKit fills in before the handler runs",
      "A global variable named body"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does an endpoint read dynamic route params such as [id]?",
    "topic": "API routes with server endpoints",
    "choices": [
      "event.query.id",
      "request.id",
      "event.params.id",
      "window.params.id"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you use an endpoint instead of a form action?",
    "topic": "API routes with server endpoints",
    "choices": [
      "For every form on the site, since actions cannot be used from a plain browser form",
      "For API clients, JavaScript fetch calls or non-form consumers",
      "Never; endpoints are deprecated",
      "Only for GET requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a +server.js file live in the same folder as +page.svelte?",
    "topic": "API routes with server endpoints",
    "choices": [
      "Only in development",
      "Yes, and requests that accept HTML go to the page while others go to the endpoint",
      "No, SvelteKit rejects the build because a route may have only one kind of file",
      "Yes, but the endpoint is ignored"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which status should an endpoint return after creating a resource?",
    "topic": "API routes with server endpoints",
    "choices": [
      "201 Created",
      "302 Found",
      "404 Not Found",
      "200 OK in every case"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why protect endpoints with their own checks?",
    "topic": "API routes with server endpoints",
    "choices": [
      "Clients can call them directly, bypassing the UI",
      "Endpoints run in the browser",
      "SvelteKit authenticates every endpoint automatically",
      "Endpoints are always protected by the layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are the Request and Response objects based on?",
    "topic": "Request and response helpers",
    "choices": [
      "A SvelteKit-only class hierarchy",
      "Express request and response objects",
      "The standard Web Fetch API",
      "Node's http module only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set a response header in an endpoint?",
    "topic": "Request and response helpers",
    "choices": [
      "Pass headers in the Response init, such as new Response(body, { headers })",
      "Call res.setHeader() on the response object that SvelteKit passes to the handler",
      "Add them to svelte.config.js",
      "Assign to event.headers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a request header?",
    "topic": "Request and response helpers",
    "choices": [
      "getHeader(event)",
      "event.headers['authorization']",
      "request.header.authorization",
      "request.headers.get('authorization')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does event.url.searchParams provide?",
    "topic": "Request and response helpers",
    "choices": [
      "The request body as a parsed object, once the handler has read it with json()",
      "The route parameters",
      "Cookies",
      "Access to query string parameters"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you set a cookie in an endpoint?",
    "topic": "Request and response helpers",
    "choices": [
      "document.cookie = ...",
      "event.cookies.set(name, value, options)",
      "setCookie(name) from the browser",
      "response.cookie(name, value)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the setHeaders helper provide in a load function?",
    "topic": "Request and response helpers",
    "choices": [
      "A way to hide headers",
      "A way to define CSS headers",
      "A way to set response headers for the page",
      "A way to change the request headers sent by the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can an endpoint return a redirect?",
    "topic": "Request and response helpers",
    "choices": [
      "location.href = '/somewhere'",
      "goto('/somewhere')",
      "return '/somewhere' from the handler, which SvelteKit converts into a redirect",
      "throw redirect(303, '/somewhere') or return a Response with a Location header"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you stream a response body from an endpoint?",
    "topic": "Request and response helpers",
    "choices": [
      "Return an array of chunks",
      "Call res.write repeatedly on the response object, then end the response manually",
      "Use setInterval in the load",
      "Return a Response with a ReadableStream body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does event.getClientAddress() return?",
    "topic": "Request and response helpers",
    "choices": [
      "The user's email address",
      "The IP address of the client, if the adapter supports it",
      "The URL of the page",
      "The server's IP address, so that the client can be told which machine answered"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate the body in an endpoint?",
    "topic": "Request and response helpers",
    "choices": [
      "Validation is faster than parsing",
      "JSON cannot be invalid",
      "SvelteKit validates it automatically",
      "Clients can send anything"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is prerendering?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "Rendering pages only on demand",
      "Rendering pages in the browser before the build so that users see them sooner",
      "Generating HTML at build time for routes that do not change per request",
      "Caching pages in a cookie"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you opt a page into prerendering?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "Add a prerender attribute to the page tag",
      "Name the page +static.svelte",
      "Set prerender in the URL",
      "export const prerender = true"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kind of page is a good candidate for prerendering?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "A marketing or docs page with the same content for everyone",
      "A dashboard with user-specific data that is rendered for each visitor after sign-in",
      "A page that reads cookies",
      "A page behind login"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem happens if a prerendered page reads cookies or per-request data?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "The build fails or the data would be frozen at build time",
      "Nothing; it is updated on each request, because the build runs for every visitor",
      "Cookies are deleted",
      "The page becomes faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does prerender = 'auto' mean?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "Prerender only on Fridays",
      "Never prerender",
      "Always prerender every route, and fail the build when a page cannot be prerendered",
      "Prerender when possible, but allow dynamic pages that cannot be prerendered"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does SvelteKit find routes to prerender?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "By crawling links from the entry points, plus any listed entries",
      "By trying every URL",
      "By scanning node_modules",
      "By reading the database at build time and rendering a page for every row it finds"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does ssr = false do for a page?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "Disables the router",
      "Renders it only on the server",
      "Renders the page only in the browser",
      "Removes the load functions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When might you disable SSR for a page?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "For static marketing pages",
      "When it depends heavily on browser-only APIs",
      "For every page, to improve SEO, since crawlers prefer pages rendered in the browser",
      "When the page has a title"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a trade-off of building an app with ssr = false everywhere?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "Slower first render and weaker SEO",
      "Faster first render and better SEO",
      "No JavaScript is shipped",
      "The router stops working"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is hydration?",
    "topic": "Prerendering and SSR control",
    "choices": [
      "Fetching data from the database",
      "Attaching interactivity to server-rendered HTML in the browser",
      "Rendering HTML on the server",
      "Compressing the HTML on the server before it is sent over the network to the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you export page options like prerender, ssr and csr?",
    "topic": "Page options",
    "choices": [
      "From hooks.server.js only",
      "From svelte.config.js only, because page options cannot be set inside route files",
      "From +page.js, +page.server.js or +layout files",
      "From the HTML template"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does csr = false do?",
    "topic": "Page options",
    "choices": [
      "Skips shipping client-side JavaScript for the page",
      "Disables server rendering for the page and sends an empty shell to the browser",
      "Disables CSS",
      "Disables the router"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does trailingSlash control?",
    "topic": "Page options",
    "choices": [
      "The number of routes",
      "Whether CSS files are trailing",
      "Whether URLs end with a slash",
      "The order of layouts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can page options be set in a layout?",
    "topic": "Page options",
    "choices": [
      "Only in hooks",
      "Only in svelte.config.js",
      "No, page options can only be set in individual pages and never in a shared layout",
      "Yes, and they apply to the pages beneath it unless overridden"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might you set csr = false on a content-only page?",
    "topic": "Page options",
    "choices": [
      "Less JavaScript is sent when the page has no interactive elements",
      "It improves cookies",
      "The page needs more interaction, so the framework should ship more scripts for it",
      "The page needs a database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does export const prerender = false do?",
    "topic": "Page options",
    "choices": [
      "Changes the HTTP method",
      "Prevents a route from being prerendered even if a parent layout enables it",
      "Disables the route",
      "Forces prerendering for the route even if the page reads cookies or request data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the global prerender behavior configured?",
    "topic": "Page options",
    "choices": [
      "In package.json under the scripts section, next to the build command of the app",
      "In svelte.config.js under kit.prerender, plus page options",
      "In static",
      "In .env"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens with a static site if a prerendered page links to a route that can't be prerendered?",
    "topic": "Page options",
    "choices": [
      "The page redirects",
      "The route is rendered at build with random data",
      "The link is removed automatically from the page so that the build can finish",
      "The build can fail unless the error is handled in the prerender config"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do page options let you do per route?",
    "topic": "Page options",
    "choices": [
      "Choose rendering strategy individually, mixing static and dynamic pages",
      "Rename the route and change the HTTP verbs that the page responds to for requests",
      "Create new routes",
      "Change the HTTP verbs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the config export in a route file typically hold for adapters?",
    "topic": "Page options",
    "choices": [
      "Route parameters",
      "Adapter-specific runtime settings such as regions or runtimes",
      "The page title and the description that search engines show in their results",
      "CSS variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an adapter in SvelteKit?",
    "topic": "Adapters",
    "choices": [
      "A CSS tool",
      "A test runner",
      "A plugin that turns the build output into something a platform can run",
      "A database driver that connects the load functions to the production database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which adapter produces a static site?",
    "topic": "Adapters",
    "choices": [
      "adapter-vercel",
      "adapter-edge",
      "adapter-static",
      "adapter-node"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which adapter outputs a Node server?",
    "topic": "Adapters",
    "choices": [
      "adapter-cloudflare only",
      "adapter-static",
      "adapter-docs",
      "adapter-node"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does adapter-auto do?",
    "topic": "Adapters",
    "choices": [
      "Automatically fixes bugs",
      "Automatically writes the routes of the application based on the files in the project",
      "Generates a database",
      "Picks a supported adapter for the detected deployment platform"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must you choose a specific adapter for production in many cases?",
    "topic": "Adapters",
    "choices": [
      "Adapters make code slower",
      "Adapters are optional and do nothing, because SvelteKit deploys to any host as is",
      "Platform features and runtimes differ, so explicit config is more predictable",
      "Adapters are only for testing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is the adapter configured?",
    "topic": "Adapters",
    "choices": [
      "svelte.config.js, in kit.adapter",
      "package.json scripts, where the build command names the adapter to run",
      "hooks.server.js",
      "static/adapter.json"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a limitation of adapter-static?",
    "topic": "Adapters",
    "choices": [
      "It cannot be used with TypeScript",
      "It cannot run server code at request time, so dynamic server features are unavailable",
      "It cannot run in CI",
      "It cannot serve images, because static output contains only HTML and script files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which adapter setting enables single-page-app mode with a fallback page?",
    "topic": "Adapters",
    "choices": [
      "mode: 'spa' in the route",
      "adapter.single()",
      "fallback in adapter-static options",
      "spa: true in package.json, which turns every route into a single-page application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you check before choosing an edge runtime adapter?",
    "topic": "Adapters",
    "choices": [
      "The color of the logo and the default theme that the platform applies to it",
      "Which Node APIs and libraries are supported there",
      "The page title",
      "The number of components"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the build command produce when using adapter-node?",
    "topic": "Adapters",
    "choices": [
      "A mobile app",
      "A database dump",
      "A build directory with a server entry you run with node",
      "A zip of the source code that is uploaded to the platform and built there again"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are server-only environment variables imported?",
    "topic": "Environment configuration",
    "choices": [
      "From $env/static/private or $env/dynamic/private",
      "From window.env, which SvelteKit fills in on the server before the page is sent",
      "From the routes folder",
      "From import.meta.env in any file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which prefix exposes a variable to the browser?",
    "topic": "Environment configuration",
    "choices": [
      "PRIVATE_",
      "CLIENT_ONLY_",
      "PUBLIC_",
      "SECRET_"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use $env/dynamic for deployment-specific values?",
    "topic": "Environment configuration",
    "choices": [
      "Dynamic values are faster to read, because they are inlined into the bundle",
      "Dynamic values are always public",
      "Static values are removed",
      "The same build can be configured at runtime on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a public page imports a private env module?",
    "topic": "Environment configuration",
    "choices": [
      "Nothing",
      "The secret is minified and hidden from readers, so the import is considered safe",
      "The secret is hashed",
      "The build fails to prevent leaking secrets"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should staging and production differ in configuration?",
    "topic": "Environment configuration",
    "choices": [
      "Through different code branches for each value",
      "Through environment variables set by each environment",
      "Through different frameworks",
      "Through comments in the code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Vite behavior also exposes import.meta.env variables with a VITE_ prefix?",
    "topic": "Environment configuration",
    "choices": [
      "They are inlined into client code, so they must not hold secrets",
      "They are private and stay on the server, as long as the code runs in a load",
      "They are encrypted",
      "They are server-only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why validate environment variables at startup?",
    "topic": "Environment configuration",
    "choices": [
      "Variables cannot be missing",
      "Validation makes variables public, so that clients can check them as well",
      "Missing or malformed values then fail fast instead of causing obscure errors later",
      "Validation speeds up the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should you document the required environment variables?",
    "topic": "Environment configuration",
    "choices": [
      "In an .env.example file and the README",
      "In the page title of the home page, where every visitor can read the settings",
      "In the HTML",
      "In static"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a safe default when an optional setting is missing?",
    "topic": "Environment configuration",
    "choices": [
      "A documented fallback that does not weaken security",
      "Disabling HTTPS",
      "An empty password",
      "A random secret generated at startup, which changes each time the server restarts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should never be committed to the repository?",
    "topic": "Environment configuration",
    "choices": [
      "svelte.config.js",
      "Real secrets, such as API keys and database passwords",
      "The README",
      "The .env.example file, which documents the variables that the project needs"
    ],
    "answerIdx": 1
  }
]
```

LAYER: sveltekit-dev-10

```json
[
  {
    "stem": "What is Vitest?",
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
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
    "topic": "Unit tests with Vitest",
    "choices": [
      "How fast the tests ran",
      "How many users the app has",
      "Which lines or branches ran during tests",
      "Whether the tests assert the correct behavior"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an end-to-end (E2E) test?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "A test of one function with mocked inputs",
      "A test that runs during the build only",
      "A test that drives the app like a user through a real browser",
      "A test that checks only the CSS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is Playwright?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "A tool for automating Chromium, Firefox and WebKit for testing",
      "A package manager",
      "A server framework for Node",
      "A Vue plugin that adds page transition animations to the router views"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should you target elements in E2E tests to keep them stable?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "By its exact pixel coordinates",
      "By long CSS selectors that follow the DOM structure",
      "By role, label or a dedicated test id",
      "By the element's position in the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Playwright's auto-waiting do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Waits for elements to be actionable before interacting",
      "Skips steps that take too long",
      "Makes tests run in slow motion",
      "Retries the whole suite on failure"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid fixed sleeps like waitForTimeout in E2E tests?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "They make tests slow",
      "They always cause test failures",
      "Playwright doesn't allow them",
      "They bypass the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a flaky test?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "A test that sometimes passes",
      "A test written in a different language",
      "A test that always fails regardless of any change that was made to the code",
      "A test with no assertions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can E2E tests avoid sharing state between runs?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Disable assertions",
      "Run all tests against production data",
      "Create isolated data per test",
      "Use the same user and database row for every test"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a Playwright trace help you do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Generate unit tests",
      "Rename tests automatically",
      "Measure the server's memory and the number of requests handled per second",
      "Replay a failed test step by step with screenshots and network info"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which flows deserve E2E tests first?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "All third-party libraries",
      "Every individual utility function",
      "Every CSS rule",
      "Critical user journeys such as sign-up, login and checkout"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should E2E tests run in a delivery pipeline?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Against a built preview or staging deployment before release",
      "Only after production deploys",
      "Only on the developer's laptop",
      "Only when the repository is private"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a preview deployment?",
    "topic": "Monitoring and previews",
    "choices": [
      "A deployment that only runs tests",
      "A local development server",
      "A temporary deployment for a branch or pull request used for review",
      "A backup of the production database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are preview deployments useful?",
    "topic": "Monitoring and previews",
    "choices": [
      "They remove the need for tests",
      "Reviewers can try changes in a real environment before merging",
      "They skip the build step",
      "They permanently replace production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you monitor in production besides uptime?",
    "topic": "Monitoring and previews",
    "choices": [
      "Only the build time",
      "Errors, latency and key user flows",
      "Only the repository stars",
      "Only the number of commits"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of an error tracking tool such as Sentry?",
    "topic": "Monitoring and previews",
    "choices": [
      "Create database migrations",
      "Replace the logs of the server",
      "Compile TypeScript sources into JavaScript before the application is deployed",
      "Collect and group runtime errors with stack traces and context"
    ],
    "answerIdx": 3
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
      "Reducing bundle size, because log fields are removed from the client code",
      "Faster hydration",
      "Running tests in parallel",
      "Searching and filtering logs by fields such as request id and level"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a safe rollback strategy?",
    "topic": "Monitoring and previews",
    "choices": [
      "Edit production files by hand",
      "Disable monitoring during a release",
      "Keep previous deployments so you can redeploy the last good version quickly",
      "Delete the previous version to save space"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does synthetic monitoring do?",
    "topic": "Monitoring and previews",
    "choices": [
      "Generates random traffic for load testing only",
      "Reads real users' keystrokes",
      "Runs scripted checks against the live site on a schedule",
      "Compiles the site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why alert on symptoms users feel, like high error rates, instead of every internal metric?",
    "topic": "Monitoring and previews",
    "choices": [
      "Alerts must be as numerous as possible",
      "Alerts stay actionable and avoid noise",
      "Users create the alerts",
      "Internal metrics are always wrong"
    ],
    "answerIdx": 1
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
  },
  {
    "stem": "What does a SvelteKit adapter do at build time?",
    "topic": "Choosing an adapter",
    "choices": [
      "Converts the build output into something a specific platform can run",
      "Generates the unit tests for every route",
      "Connects the app to a database during the build",
      "Compiles Svelte components into native mobile code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which adapter fits a site whose pages can all be prerendered?",
    "topic": "Choosing an adapter",
    "choices": [
      "adapter-test, which serves pages only in CI",
      "adapter-static, which writes plain HTML",
      "adapter-node, which is required for any prerendered output",
      "adapter-database, which stores pages in tables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which adapter would you pick to run SvelteKit on your own server or container?",
    "topic": "Choosing an adapter",
    "choices": [
      "adapter-static, which can run server load functions at request time",
      "adapter-node, which outputs a Node server you start with node build",
      "adapter-cdn, which turns the build into a CSS bundle",
      "adapter-browser, which executes routes inside the visitor's tab"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does adapter-auto do?",
    "topic": "Choosing an adapter",
    "choices": [
      "Automatically fixes routing mistakes in the project before it passes the build output on",
      "Detects supported platforms such as Vercel or Netlify and uses the matching adapter",
      "Chooses the database that fits the schema",
      "Generates a new adapter for every build"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why switch from adapter-auto to a specific adapter for production?",
    "topic": "Choosing an adapter",
    "choices": [
      "Only specific adapters can read environment variables",
      "Explicit config makes deployments predictable",
      "adapter-auto cannot build the project at all",
      "Specific adapters always produce smaller pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can adapter-static not do after deployment?",
    "topic": "Choosing an adapter",
    "choices": [
      "Link between pages",
      "Run server-side code such as load functions or actions on each request",
      "Serve images from the static folder to visitors who open the deployed site",
      "Use TypeScript in the source code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the fallback option in adapter-static?",
    "topic": "Choosing an adapter",
    "choices": [
      "Providing default values for environment variables",
      "Choosing a backup server for the site",
      "Falling back to the previous release when a build fails",
      "Serving a single HTML shell for client-side routing in SPA mode"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which factor matters when picking an edge or serverless adapter?",
    "topic": "Choosing an adapter",
    "choices": [
      "The number of Svelte components in the project",
      "Runtime limits, supported APIs",
      "The name of the Git branch",
      "The color scheme of the admin panel"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the adapter chosen in a SvelteKit project?",
    "topic": "Choosing an adapter",
    "choices": [
      "In .env as ADAPTER=value",
      "In the HTML template",
      "In svelte.config.js, in the kit.adapter option",
      "In each +page.svelte file, as a line in the script block of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does running vite build with adapter-node produce?",
    "topic": "Choosing an adapter",
    "choices": [
      "A Docker image pushed to the registry",
      "A single HTML file for the home page that contains the styles and scripts",
      "A zipped copy of the source code",
      "A build directory with a server entry point and the client assets"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do server-only secrets reach a production SvelteKit app?",
    "topic": "Environment variables in production",
    "choices": [
      "Through environment variables set on the host",
      "Through query strings sent by the first visitor",
      "Through a JavaScript file in the static folder",
      "Through a .env file committed to the repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between $env/static/private and $env/dynamic/private in production?",
    "topic": "Environment variables in production",
    "choices": [
      "Static values are inlined at build time",
      "Only the dynamic module works on a deployed server",
      "Static values are public, and dynamic values are private",
      "Dynamic values are inlined at build time, while static values are read at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is $env/dynamic/private the better choice?",
    "topic": "Environment variables in production",
    "choices": [
      "When the variable is a number",
      "When one build must run with different values in different environments",
      "When the value must be visible in the browser bundle",
      "When the app has no server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the PUBLIC_ prefix mean for an environment variable?",
    "topic": "Environment variables in production",
    "choices": [
      "It may be exposed to client code through the $env public modules",
      "It is deleted at build time",
      "It is encrypted before it is stored, so only the server can read the value",
      "It can be read only by the build tool"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can't a PUBLIC_ variable hold a secret?",
    "topic": "Environment variables in production",
    "choices": [
      "It is limited to ten characters",
      "It is included in the JavaScript sent to every visitor",
      "It is cleared after the first request",
      "It is hashed by the framework, which makes the original value impossible to recover"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does adapter-node read variables such as PORT and ORIGIN from?",
    "topic": "Environment variables in production",
    "choices": [
      "The project's package.json",
      "The browser's local storage",
      "The process environment where the server is started",
      "A file named adapter.json in the build folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is the ORIGIN variable important behind a proxy with adapter-node?",
    "topic": "Environment variables in production",
    "choices": [
      "It decides which database is used",
      "It selects the language of the site",
      "SvelteKit uses it for CSRF checks",
      "It sets the number of worker processes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should be validated when the server starts?",
    "topic": "Environment variables in production",
    "choices": [
      "That the browser supports the latest CSS",
      "That all images are compressed",
      "That the Git history is linear",
      "That required variables exist"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep different values for preview and production deployments?",
    "topic": "Environment variables in production",
    "choices": [
      "To make builds faster",
      "Because production ignores environment variables",
      "Because previews run a different programming language",
      "So preview deployments cannot touch production data or services"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the safe response if a secret leaks into a commit?",
    "topic": "Environment variables in production",
    "choices": [
      "Add a comment saying the value is old",
      "Rotate the secret and remove it from the history",
      "Rename the file",
      "Leave it because the repository is private"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a typical deployment pipeline for SvelteKit run first?",
    "topic": "Deploying to a host",
    "choices": [
      "Publish the source files directly to the web root",
      "Install dependencies, run checks and tests, then build",
      "Run the application in the visitor's browser",
      "Delete the production database, then build"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which hosts deploy SvelteKit with little configuration using adapter-auto?",
    "topic": "Deploying to a host",
    "choices": [
      "Only email providers",
      "Platforms such as Vercel",
      "Only mobile app stores",
      "Only physical servers owned by the team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you run an adapter-node build in production?",
    "topic": "Deploying to a host",
    "choices": [
      "Open build/index.html in a browser",
      "vite preview with the development flags",
      "npm run dev on the server",
      "node build (starting the generated server entry)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why run the app behind a reverse proxy such as nginx?",
    "topic": "Deploying to a host",
    "choices": [
      "It terminates TLS, serves compression",
      "It replaces the need for environment variables",
      "It compiles Svelte components on every request",
      "It stores the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of a process manager or container platform for adapter-node?",
    "topic": "Deploying to a host",
    "choices": [
      "Generating the routes",
      "Compiling TypeScript on each request",
      "Restarting the server if it crashes",
      "Editing environment files for visitors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should be checked before pointing a domain at a new deployment?",
    "topic": "Deploying to a host",
    "choices": [
      "That the commit messages are short",
      "That the build runs, key pages work and HTTPS is configured",
      "That the README is long enough",
      "That the logo is the right size and that the favicon appears in the tab"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep a way to roll back a deployment?",
    "topic": "Deploying to a host",
    "choices": [
      "A bad release can be undone quickly",
      "Hosts require rollbacks for billing",
      "Rollbacks remove the need for tests",
      "Rollbacks make builds faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a health check endpoint allow a host to do?",
    "topic": "Deploying to a host",
    "choices": [
      "Verify that the app is running",
      "Create database backups",
      "Compress images",
      "Measure how many users read the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should database migrations be planned with deployments?",
    "topic": "Deploying to a host",
    "choices": [
      "Migrations run in the visitor's browser",
      "They make the build smaller",
      "Code and schema must stay compatible",
      "Migrations are optional and never affect code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of deploying from CI instead of a laptop?",
    "topic": "Deploying to a host",
    "choices": [
      "CI removes the need for version control",
      "CI uses less electricity than a laptop, so the builds cost the team less",
      "Builds are repeatable and use the same environment every time",
      "Laptops cannot run Node"
    ],
    "answerIdx": 2
  }
]
```
