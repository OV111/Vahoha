LAYER: astro-dev-1

```json
[
  {
    "stem": "Which element is the best fit for the main group of navigation links on a page?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "<menu>, because it groups any list of links for the page",
      "<aside>, because navigation sits beside the main content",
      "<nav>",
      "<section>, because every group of links is a section"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the alt attribute on an <img> primarily provide?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "A tooltip that every browser displays when the pointer rests on the image",
      "A caption that the browser renders directly beneath the image by default",
      "A hint that tells the browser it may lazy-load the image later",
      "A text alternative used by screen readers and shown if the image fails to load"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which heading practice is recommended for an accessible page?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "Several <h1> elements, chosen by how large each heading should look",
      "Only <h3> elements, enlarged with CSS to match the design",
      "No headings at all, because screen readers read paragraphs only",
      "One <h1> for the page topic, with <h2> and <h3> nested in order"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a <button> usually better than a <div> with a click handler?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "It renders faster because the browser skips layout for buttons entirely",
      "It ignores CSS, so it looks identical on every operating system",
      "It is focusable and activates with Enter and Space out of the box",
      "It automatically submits every form found anywhere on the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Two rules match the same link: '#nav a' and '.menu a'. Which one wins when both set color?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "'.menu a', because class selectors always outrank ID selectors",
      "Whichever selector string is longer, regardless of its parts",
      "Neither, so the browser chooses one at random on each load",
      "'#nav a', because an ID selector has higher specificity than a class"
    ],
    "answerIdx": 3
  },
  {
    "stem": "With the default box-sizing, an element has width 200px, padding 20px on every side and a 5px border. How wide is its rendered box?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "250px",
      "200px",
      "225px",
      "240px"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does box-sizing: border-box change?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "The width and height include the padding and border",
      "The margin is added into the element's declared width",
      "The content is clipped exactly at the border edge",
      "The padding is removed so only the border counts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which declaration hides an element but still reserves its space in the layout?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "visibility: hidden",
      "display: none",
      "overflow: clip",
      "z-index: -1"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a custom property named --brand in a declaration?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "$brand",
      "@brand",
      "var(--brand)",
      "get(--brand)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Two rules have equal specificity and both set the same property. Which one is applied?",
    "topic": "Semantic HTML and CSS",
    "choices": [
      "The one that appears later in the cascade order",
      "The one that appears first in the stylesheet",
      "The one whose value is written with more characters",
      "The one in the stylesheet with the shorter file name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the job of <meta name='viewport' content='width=device-width, initial-scale=1'>?",
    "topic": "Responsive layout",
    "choices": [
      "It makes mobile browsers lay the page out at the device width",
      "It forces phones to render the desktop layout and then zoom out",
      "It disables pinch-zoom for every visitor on every device",
      "It downloads a separate mobile stylesheet automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does @media (min-width: 768px) apply?",
    "topic": "Responsive layout",
    "choices": [
      "When the viewport is 768px wide or narrower",
      "When the viewport is exactly 768px wide and nothing else",
      "When the viewport is 768px wide or wider",
      "When the visitor's device is identified as a tablet"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a mobile-first CSS approach mean?",
    "topic": "Responsive layout",
    "choices": [
      "Base styles target desktops and max-width queries strip features for phones",
      "A separate website is served to phones from a different URL",
      "Base styles target small screens and min-width queries add larger layouts",
      "Only phones are tested, because desktops resize automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In a flex row, which property distributes items along the main axis?",
    "topic": "Responsive layout",
    "choices": [
      "align-items",
      "align-content",
      "flex-wrap",
      "justify-content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "With flex-direction: column, where does the main axis run?",
    "topic": "Responsive layout",
    "choices": [
      "From top to bottom",
      "From left to right",
      "From right to left",
      "Along the depth axis out of the screen"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does grid-template-columns: repeat(3, 1fr) create?",
    "topic": "Responsive layout",
    "choices": [
      "Three columns that are each exactly 1px wide",
      "Three equal columns that share the available width",
      "One column whose contents repeat three times downward",
      "Three equal rows that share the available height"
    ],
    "answerIdx": 1
  },
  {
    "stem": "The rem unit is relative to what?",
    "topic": "Responsive layout",
    "choices": [
      "The font size of the root element",
      "The font size of the element's parent",
      "The width of the viewport",
      "The height of the element itself"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do max-width: 100% and height: auto on an <img> achieve?",
    "topic": "Responsive layout",
    "choices": [
      "The image stretches past its natural size to fill the container",
      "The image shrinks to fit its container and keeps its aspect ratio",
      "The image is cropped to a square matching the container width",
      "The image is hidden until the container is wider than it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which CSS property sets the space between items in a flex or grid container?",
    "topic": "Responsive layout",
    "choices": [
      "gap",
      "outline-offset",
      "padding-box",
      "margin-collapse"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which unit equals 1% of the viewport width?",
    "topic": "Responsive layout",
    "choices": [
      "vh",
      "rem",
      "ch",
      "vw"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens with const nums = [1]; nums.push(2);?",
    "topic": "JavaScript essentials",
    "choices": [
      "It throws a TypeError, because const freezes the array contents",
      "It works but silently creates a new array stored elsewhere",
      "It throws only when the file runs in strict mode",
      "It works, because const blocks reassignment but not mutation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does === differ from ==?",
    "topic": "JavaScript essentials",
    "choices": [
      "=== compares the contents of objects deeply",
      "=== compares values without type coercion",
      "=== only works when both sides are numbers",
      "=== treats undefined and null as the same value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does [1, 2, 3].map(x => x * 2) return?",
    "topic": "JavaScript essentials",
    "choices": [
      "The same array, changed in place to [2, 4, 6]",
      "A new array: [2, 4, 6]",
      "The number 12, the sum of the doubled values",
      "undefined, because map only runs side effects"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does typeof null return?",
    "topic": "JavaScript essentials",
    "choices": [
      "'null'",
      "'undefined'",
      "'object'",
      "'number'"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does 'this' behave inside an arrow function?",
    "topic": "JavaScript essentials",
    "choices": [
      "It always points to the global object",
      "It is rebound to the first argument of call()",
      "It is always undefined",
      "It is taken from the enclosing scope"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an async function always return?",
    "topic": "JavaScript essentials",
    "choices": [
      "A Promise",
      "The raw value from its return statement",
      "A generator object that must be iterated",
      "undefined until await is used"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does try/catch around 'await somePromise' catch?",
    "topic": "JavaScript essentials",
    "choices": [
      "Only syntax errors found while parsing the file",
      "Errors thrown by code that runs in unrelated later tasks",
      "The error if that promise rejects",
      "Nothing, because await swallows rejections silently"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does const { a, b } = obj do?",
    "topic": "JavaScript essentials",
    "choices": [
      "Copies the whole object into a single variable named a",
      "Deletes the properties a and b from obj",
      "Requires obj to be an array of two items",
      "Creates variables a and b from obj's properties of the same names"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does { ...a, x: 1 } produce?",
    "topic": "JavaScript essentials",
    "choices": [
      "A new object with a's properties and x set to 1",
      "The original object a, mutated so that x is 1",
      "A deep clone in which every nested object is copied too",
      "An error whenever a already has an x property"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does fetch() reject its promise?",
    "topic": "JavaScript essentials",
    "choices": [
      "When the server answers with status 404",
      "On a network failure that prevents any response",
      "When the server answers with status 500",
      "When the response body is empty"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In interface User { id: number; name?: string }, what does the ? mean?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "name must be set to null",
      "name can never be changed after creation",
      "name can only hold string literal values",
      "name may be omitted from objects of this type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do an interface and a type alias differ when declared twice with the same name?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Two type aliases merge into one, but duplicate interfaces are an error",
      "Two interfaces merge into one, but duplicate type aliases are an error",
      "Both merge, so the last declaration wins",
      "Both are errors in every case"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the type string | number mean?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "A value that must satisfy both types at once",
      "An array that holds strings and numbers together",
      "A value that may be either a string or a number",
      "A tuple with a string first and a number second"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does unknown differ from any?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "unknown disables checking, while any must be narrowed before use",
      "They are identical aliases for the same type",
      "unknown is only allowed on function return types",
      "unknown must be narrowed before use, while any disables checking"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does function id<T>(x: T): T express?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "T is a value that must be passed at runtime",
      "Every call is converted to the any type",
      "The return type is linked to the argument type",
      "The function accepts strings only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does readonly on a property do?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "TypeScript rejects assignments to it after initialization",
      "JavaScript freezes the property at runtime",
      "The property is hidden from JSON.stringify",
      "The property becomes private to the class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a type assertion like value as string do?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Tells the compiler to treat it as string without converting anything",
      "Converts the value to a string at runtime",
      "Checks the type at runtime and throws if it differs",
      "Narrows the type only inside the next if block"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "A type where every property of User is required",
      "A type where every property of User is optional",
      "A type with all properties of User removed",
      "A type where every property of User is readonly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After 'if (typeof x === \"string\")', how is x typed inside the block?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "As unknown, because checks never change types",
      "As string only if strict mode is on in the editor",
      "As string, because the check narrows the type",
      "As any, because the check happens at runtime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Are TypeScript types present when the compiled code runs?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Yes, and you can inspect them with reflection",
      "No, they are erased during compilation",
      "Only interfaces are kept, type aliases are erased",
      "Only in development builds, not in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which line imports a named export x from another ES module?",
    "topic": "Modules and tooling",
    "choices": [
      "const x = require('./a.js');",
      "use x from './a.js';",
      "import { x } from './a.js';",
      "include './a.js' as x;"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the rule for default and named exports in one module?",
    "topic": "Modules and tooling",
    "choices": [
      "One default export at most, plus any number of named exports",
      "Any number of default exports, but only one named export",
      "Exactly one of each, or the module fails to load",
      "Only named exports are allowed in ES modules"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What belongs in devDependencies?",
    "topic": "Modules and tooling",
    "choices": [
      "Packages the browser downloads while the page runs",
      "Packages needed to build or test, such as a test runner",
      "Packages that are optional for every user",
      "Packages that npm never installs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is package-lock.json for?",
    "topic": "Modules and tooling",
    "choices": [
      "Recording exact resolved versions so installs are reproducible",
      "Preventing other developers from editing package.json",
      "Encrypting the packages stored in node_modules",
      "Listing the npm scripts available to the project"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which versions does the range ^1.4.2 allow?",
    "topic": "Modules and tooling",
    "choices": [
      "Only exactly 1.4.2",
      "Any version, including 2.x and 3.x",
      "Only patch releases such as 1.4.3 and 1.4.9",
      "1.4.2 and newer versions below 2.0.0"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a dev server like Vite do while you develop?",
    "topic": "Modules and tooling",
    "choices": [
      "Rebuilds one large bundle from scratch on every single save",
      "Serves source modules on demand and applies edits through hot updates",
      "Runs the unit tests and blocks the page until they pass",
      "Uploads each change to production immediately"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command runs the 'build' script defined in package.json?",
    "topic": "Modules and tooling",
    "choices": [
      "npm exec package.json",
      "node build",
      "npm script --build",
      "npm run build"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is tree shaking?",
    "topic": "Modules and tooling",
    "choices": [
      "Deleting unused packages from node_modules after install",
      "Minifying whitespace and renaming variables",
      "Compiling TypeScript files into JavaScript",
      "Removing unused exports from the final bundle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a .env file holding secrets stay out of version control?",
    "topic": "Modules and tooling",
    "choices": [
      "Git cannot store files that start with a dot",
      "Anyone with repository access could read the secrets",
      "Bundlers refuse to read .env files that are committed",
      "The file would slow down every clone of the repository"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a linter such as ESLint do?",
    "topic": "Modules and tooling",
    "choices": [
      "Bundles modules into one file for the browser",
      "Executes the code inside a headless browser",
      "Statically analyzes code for likely bugs and style issues",
      "Deploys the project after a clean run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which order describes the browser's rendering steps?",
    "topic": "How the browser renders pages",
    "choices": [
      "Paint, layout, build the render tree, then parse HTML",
      "Layout, parse CSS, paint, then build the DOM",
      "Parse HTML and CSS, build the render tree, layout, paint",
      "Build the render tree, then download the HTML"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a stylesheet in <head> called render-blocking?",
    "topic": "How the browser renders pages",
    "choices": [
      "The browser refuses to download images until the CSS arrives",
      "The browser delays first paint until it has loaded and parsed the CSS",
      "The browser stops running all JavaScript on the page permanently",
      "The browser hides the stylesheet from the DOM"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a plain <script src> without defer or async do while parsing?",
    "topic": "How the browser renders pages",
    "choices": [
      "Downloads in parallel and never blocks parsing",
      "Waits until the page has fully loaded before it starts",
      "Pauses HTML parsing while it downloads and executes",
      "Runs only after the user first interacts with the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the defer attribute do on an external script?",
    "topic": "How the browser renders pages",
    "choices": [
      "It runs as soon as downloaded, in any order",
      "It prevents the script from ever executing",
      "It only applies to inline scripts",
      "It downloads in parallel and runs after parsing, in document order"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the async attribute do on an external script?",
    "topic": "How the browser renders pages",
    "choices": [
      "It downloads in parallel and runs as soon as it is ready, in no set order",
      "It runs after parsing and keeps the document order",
      "It blocks parsing until the script finishes",
      "It delays the script until the load event fires"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which change forces the browser to recalculate layout?",
    "topic": "How the browser renders pages",
    "choices": [
      "Changing an element's background-color",
      "Changing the color of a text selection",
      "Changing the cursor style on hover",
      "Changing an element's width"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which property can usually be animated without triggering layout or paint?",
    "topic": "How the browser renders pages",
    "choices": [
      "width",
      "transform",
      "top",
      "margin-left"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the DOM?",
    "topic": "How the browser renders pages",
    "choices": [
      "The raw HTML text exactly as the server sent it",
      "The in-memory tree the browser builds from HTML that scripts can modify",
      "A stylesheet format used by the browser's rendering engine",
      "A folder in which browsers cache downloaded pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a repaint?",
    "topic": "How the browser renders pages",
    "choices": [
      "Reloading the whole page from the network",
      "Redrawing pixels for visual changes without recalculating geometry",
      "Rebuilding the DOM tree from fresh HTML",
      "Recompiling JavaScript when a file changes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which hint asks the browser to fetch a critical resource early for the current page?",
    "topic": "How the browser renders pages",
    "choices": [
      "<link rel='canonical'>",
      "<link rel='nofollow'>",
      "<link rel='preload'>",
      "<link rel='noopener'>"
    ],
    "answerIdx": 2
  }
]
```

LAYER: astro-dev-2

```json
[
  {
    "stem": "What file extension do Astro components use?",
    "topic": "Astro component syntax",
    "choices": [
      ".astr, a compiled form of JSX that only the Astro CLI can open",
      ".jsx, with an Astro-specific pragma comment at the top",
      ".html, processed by a server-side include directive",
      ".astro"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which attribute do you use to set a CSS class on an element in an .astro template?",
    "topic": "Astro component syntax",
    "choices": [
      "className, as required by React and JSX",
      "cssClass, which Astro maps to the class attribute",
      "styleName, which Astro maps to a generated stylesheet",
      "class"
    ],
    "answerIdx": 3
  },
  {
    "stem": "By default, how much client-side JavaScript does an Astro component ship to the browser?",
    "topic": "Astro component syntax",
    "choices": [
      "A small runtime for each component so it can re-render",
      "None, because components render to HTML at build or request time",
      "The full Astro runtime, shared across every page on the site",
      "Only the component script, which is inlined into the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you render a list of items inside an Astro template?",
    "topic": "Astro component syntax",
    "choices": [
      "A <for each='item' in={items}> element that Astro provides for loops",
      "A v-for='item in items' attribute placed on the <li> element",
      "An {#each items as item} block",
      "{items.map((item) => <li>{item}</li>)}"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you render an element only when a condition is true in an .astro template?",
    "topic": "Astro component syntax",
    "choices": [
      "<p if='show'>Hello</p>",
      "{show && <p>Hello</p>}",
      "<p v-if='show'>Hello</p>",
      "{% if show %}<p>Hello</p>{% endif %}"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does <Fragment> let you do in an Astro template?",
    "topic": "Astro component syntax",
    "choices": [
      "Split a page into separately downloaded chunks for faster loading",
      "Group elements without adding a wrapper element",
      "Mark a block that should hydrate on the client after load",
      "Cache part of the template between requests on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the set:html directive do?",
    "topic": "Astro component syntax",
    "choices": [
      "Sets the lang attribute of the document to the given value",
      "Injects a string of raw HTML without escaping it",
      "Marks the element as static so it is never re-rendered",
      "Validates the string against a schema before it is rendered"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the class:list directive help with?",
    "topic": "Astro component syntax",
    "choices": [
      "Building a class string from strings, arrays and conditional objects",
      "Listing every class used on the page in the build log",
      "Restricting an element to classes declared in the scoped style",
      "Sorting classes alphabetically for smaller output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are Astro components named when used in a template?",
    "topic": "Astro component syntax",
    "choices": [
      "With a lowercase name, such as <card />",
      "With an astro- prefix, such as <astro-card />",
      "With a capitalized name, such as <Card />",
      "With a leading underscore, such as <_card />"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What kind of output does an .astro component produce?",
    "topic": "Astro component syntax",
    "choices": [
      "A virtual DOM tree that the browser diffs after every state change",
      "HTML, rendered on the server with no client runtime",
      "A web component registered with customElements.define on load",
      "A JavaScript module that builds the page in the browser on load"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What separates the component script from the template in an .astro file?",
    "topic": "Component script and template",
    "choices": [
      "A <script> tag placed above the markup",
      "A line with the word template followed by a colon",
      "Two lines of three dashes (---), called code fences",
      "A blank line followed by an HTML comment"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does the code in the component script (the --- fences) run?",
    "topic": "Component script and template",
    "choices": [
      "In the browser, after the page has loaded and hydration is done",
      "In the browser, but only once on the visitor's first visit",
      "On the server or at build time, never in the browser",
      "In a web worker that the Astro runtime starts on the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about the component script is true?",
    "topic": "Component script and template",
    "choices": [
      "It must be wrapped in an async function to use await",
      "You can use top-level await in it",
      "It can only contain import statements",
      "It may not declare variables used in the template"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you make a variable declared in the component script available in the template?",
    "topic": "Component script and template",
    "choices": [
      "Export it with export default so the template can read the value",
      "Pass it through a global store before the template is rendered",
      "Prefix it with $ so that Astro exposes it to the template",
      "Declare it in the script and use {title} in the template"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which global object exposes request and component information inside the component script?",
    "topic": "Component script and template",
    "choices": [
      "Astro",
      "window",
      "document",
      "context"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read the current page URL inside the component script?",
    "topic": "Component script and template",
    "choices": [
      "window.location",
      "Astro.url",
      "document.URL",
      "Astro.page.href"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a plain <script> tag inside an .astro template do by default?",
    "topic": "Component script and template",
    "choices": [
      "Astro runs it on the server and removes it from the output",
      "Astro bundles it, processes it and sends it to the browser as a module",
      "Astro leaves the tag untouched, exactly as written",
      "Astro rejects it because scripts are only allowed in the --- fences"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does adding is:inline to a <script> tag do?",
    "topic": "Component script and template",
    "choices": [
      "Leaves the script as written, without bundling",
      "Runs the script once on the server during the build step",
      "Defers the script until the visitor scrolls down to it",
      "Makes the script private to the component that contains it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which TypeScript support does Astro provide in the component script?",
    "topic": "Component script and template",
    "choices": [
      "TypeScript needs a separate compile step before Astro can read it",
      "TypeScript is only allowed in .ts files",
      "TypeScript is available only after installing a React integration",
      "TypeScript works out of the box, with no extra setup"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does define:vars on a <style> or <script> tag do?",
    "topic": "Component script and template",
    "choices": [
      "Declares variables that are shared between all pages",
      "Defines the design tokens read from the config file",
      "Passes server-side variables into the CSS or client script",
      "Validates variable names against the project schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a component read the props passed by its parent?",
    "topic": "Props and slots",
    "choices": [
      "const { title } = this.props;",
      "const title = props.get('title');",
      "const { title } = Astro.props;",
      "import { title } from 'astro:props';"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you type the props of an Astro component?",
    "topic": "Props and slots",
    "choices": [
      "Declare an interface named Props in the component script",
      "Create a separate props.d.ts file next to the component",
      "Add a propTypes object to the template",
      "Use a decorator above the component script"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does <slot /> do inside a component?",
    "topic": "Props and slots",
    "choices": [
      "Declares a prop that the parent component must always provide",
      "Reserves a place in the head for a stylesheet to be injected",
      "Marks where the parent's child content is inserted",
      "Creates a client-side state variable that the parent can read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you send content to a named slot called 'header'?",
    "topic": "Props and slots",
    "choices": [
      "Add slot='header' to the element you pass in",
      "Wrap it in a <header-slot> element",
      "Pass it as a prop named header",
      "Add a name='header' attribute on the component tag"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define a named slot inside a layout component?",
    "topic": "Props and slots",
    "choices": [
      "<slot id='header' />",
      "<slot as='header' />",
      "<slot name='header' />",
      "<header slot />"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to content placed inside <slot> in the child component when the parent passes nothing?",
    "topic": "Props and slots",
    "choices": [
      "Astro throws an error at build time",
      "The fallback content is rendered",
      "The slot renders as an empty comment",
      "The parent's content is duplicated there"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a component check whether the parent supplied a named slot?",
    "topic": "Props and slots",
    "choices": [
      "Astro.props.slots.name",
      "slot.exists('name')",
      "document.querySelector('slot')",
      "Astro.slots.has('name')"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you pass a JavaScript expression as a prop value?",
    "topic": "Props and slots",
    "choices": [
      "Use curly braces, like <Card count={items.length} />",
      "Wrap it in quotes, like <Card count='items.length' />",
      "Prefix the prop with a colon",
      "Use a double-brace template, like <Card count={{items.length}} />"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you forward all props from an object to a component?",
    "topic": "Props and slots",
    "choices": [
      "With a pass-through attribute, like <Card astro:props />",
      "With the spread syntax, like <Card {...props} />",
      "With the extends keyword inside the component script",
      "With a wildcard import in the parent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which values can you pass as props to an Astro component?",
    "topic": "Props and slots",
    "choices": [
      "Only strings, because props are written as HTML attributes",
      "Only values that survive JSON serialization to the client",
      "Only references to other components, never plain data",
      "Strings, numbers, objects and functions on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What scope do the styles in a <style> tag of an .astro component have by default?",
    "topic": "Scoped and global styles",
    "choices": [
      "They apply to every page that imports the component's stylesheet",
      "They apply to the whole document, like normal CSS",
      "They apply only to elements that have an id",
      "They apply only to that component's elements"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Astro implement scoped styles?",
    "topic": "Scoped and global styles",
    "choices": [
      "By adding a unique data attribute and rewriting the selectors",
      "By placing each component in a shadow DOM",
      "By renaming every class with a random suffix at runtime",
      "By inserting an inline style on every element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you write a global style inside an .astro component?",
    "topic": "Scoped and global styles",
    "choices": [
      "Add a !important flag to each declaration",
      "Place the rule in a <style scoped='false'> block",
      "Use <style is:global> or wrap a selector in :global()",
      "Declare it in the frontmatter with a global keyword"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which selector targets a class in a child component's output from a scoped style?",
    "topic": "Scoped and global styles",
    "choices": [
      ":global(.child-class)",
      ".child-class >> deep",
      ".child-class::slotted",
      ":child(.child-class)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you import a CSS file for use in a component?",
    "topic": "Scoped and global styles",
    "choices": [
      "import '../styles/global.css'; in the component script",
      "<link rel='stylesheet' href='../styles/global.css'> in the head only",
      "@use '../styles/global.css'; in the template",
      "require('../styles/global.css') in the template"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Astro do with a scoped style's CSS in production builds?",
    "topic": "Scoped and global styles",
    "choices": [
      "Bundles and minifies it into an optimized stylesheet",
      "Leaves it as inline style attributes on every element",
      "Moves it into a JavaScript module",
      "Removes it, because only global CSS is kept"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass a server-side value into a scoped style?",
    "topic": "Scoped and global styles",
    "choices": [
      "With a template literal in the CSS",
      "With an @import of the frontmatter variable",
      "With define:vars on the <style> tag, then use var(--name)",
      "With an attribute selector built from the variable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which CSS preprocessor syntax can Astro handle after installing the matching package?",
    "topic": "Scoped and global styles",
    "choices": [
      "Sass or SCSS in a <style lang='scss'> block",
      "Only plain CSS, because Astro rejects preprocessors",
      "Only Less, because Astro bundles it",
      "Only Stylus, because Vite requires it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do scoped styles help in a component-based site?",
    "topic": "Scoped and global styles",
    "choices": [
      "Class names in one component cannot restyle another",
      "They make every stylesheet load before the HTML is parsed",
      "They stop the browser from caching the CSS between visits",
      "They let CSS read component props at runtime in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where does a <style> tag in the layout that wraps every page usually apply its rules?",
    "topic": "Scoped and global styles",
    "choices": [
      "To the layout's own markup, unless it is marked global",
      "To every page's markup, because layouts are always global",
      "To nothing, because layouts cannot hold styles",
      "Only to the <head> element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you import another Astro component into a page?",
    "topic": "Importing components",
    "choices": [
      "<import src='../components/Card.astro' /> in the template",
      "@component('Card') in the template",
      "Card = require('../components/Card') in the template",
      "import Card from '../components/Card.astro'; in the --- fences"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Do you need to include the file extension when importing an .astro component?",
    "topic": "Importing components",
    "choices": [
      "No, Astro always resolves it from the name",
      "Only on Windows",
      "Only in a production build",
      "Yes, such as '../components/Card.astro'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a relative import like '../components/Card.astro' depend on?",
    "topic": "Importing components",
    "choices": [
      "The location of astro.config.mjs",
      "The working directory of the dev server",
      "The location of the importing file",
      "The order of the imports in the file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which feature of tsconfig.json lets you import with an alias like '@components/Card.astro'?",
    "topic": "Importing components",
    "choices": [
      "The paths option",
      "The include option",
      "The moduleResolution option only",
      "The jsx option"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can an Astro page import and render a React component?",
    "topic": "Importing components",
    "choices": [
      "No, Astro components cannot mix with other frameworks",
      "Only if the React component has no state",
      "Yes, once the React integration is installed",
      "Only through an iframe"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can an Astro component be imported into a React component?",
    "topic": "Importing components",
    "choices": [
      "Yes, with the same import syntax as any React component",
      "Yes, but only as a default export",
      "Yes, but it needs the client:only directive",
      "No, .astro components render only inside Astro files"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of splitting a page into small components?",
    "topic": "Importing components",
    "choices": [
      "Reuse and a simpler page file, without extra JavaScript",
      "Each component gets its own URL in the final site build output",
      "Each component is loaded lazily by the browser when it is scrolled to",
      "Each component can be used only once per project"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you place shared components so that they are not turned into pages?",
    "topic": "Importing components",
    "choices": [
      "In src/pages with an underscore in front",
      "In public/components",
      "In src/components, outside src/pages",
      "In the project root next to package.json"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a dynamic import such as await import('./Card.astro') let you do?",
    "topic": "Importing components",
    "choices": [
      "Download the component in the browser on demand",
      "Register the component as a web component",
      "Pick the component to render at build or request time",
      "Hydrate the component after the page loads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if you import a component but never use it in the template?",
    "topic": "Importing components",
    "choices": [
      "Its styles are still added to every page that imports the file",
      "It is left out of the output, though editors may flag it",
      "Astro throws a build error that names the unused component",
      "Its script still runs in the browser when the page loads"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which folder is required for Astro to create routes from files?",
    "topic": "Project structure",
    "choices": [
      "src/routes",
      "src/app",
      "public/pages",
      "src/pages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the public/ folder for?",
    "topic": "Project structure",
    "choices": [
      "Source files that Astro compiles into pages",
      "Server code that runs on every request",
      "TypeScript declarations for the project",
      "Static assets copied to the output as they are"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How would you reference public/favicon.svg from a page?",
    "topic": "Project structure",
    "choices": [
      "As ../public/favicon.svg",
      "As public:favicon.svg",
      "As @public/favicon.svg",
      "As /favicon.svg"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is the project's main Astro configuration kept?",
    "topic": "Project structure",
    "choices": [
      "src/config/astro.json",
      "astro.config.mjs in the project root",
      "package.json under an astro key only",
      "public/astro.config.js"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the usual role of src/layouts?",
    "topic": "Project structure",
    "choices": [
      "The generated HTML files, which Astro writes there during each build",
      "API route handlers that respond to requests under /api",
      "The cache that the package manager fills with installed packages",
      "Page-wrapper components such as BaseLayout.astro"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command builds the production site?",
    "topic": "Project structure",
    "choices": [
      "astro compile",
      "astro bundle",
      "astro build",
      "astro export"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What folder does astro build write the static site to by default?",
    "topic": "Project structure",
    "choices": [
      "build",
      "dist",
      "out",
      ".astro"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command starts the local development server?",
    "topic": "Project structure",
    "choices": [
      "astro serve",
      "astro dev",
      "astro watch",
      "astro run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the .astro folder in a project contain?",
    "topic": "Project structure",
    "choices": [
      "Your page source files, which Astro copies in from src before each build",
      "Generated types and cache files you should not edit",
      "Your deployment configuration, read by the host when the site is published",
      "Backups of the previous build, kept so that a rollback is possible"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the default home page file in an Astro project?",
    "topic": "Project structure",
    "choices": [
      "src/pages/home.astro",
      "src/index.html",
      "src/pages/index.astro",
      "public/index.astro"
    ],
    "answerIdx": 2
  }
]
```

LAYER: astro-dev-3

```json
[
  {
    "stem": "Which file becomes the /about route in an Astro project?",
    "topic": "File-based routing",
    "choices": [
      "src/routes/about.astro, which Astro reads before src/pages",
      "src/about/page.astro, matching the folder-per-route convention",
      "src/pages/about/route.config.js, which declares the path",
      "src/pages/about.astro"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file serves the /blog route if you prefer a folder?",
    "topic": "File-based routing",
    "choices": [
      "src/pages/blog.index.astro, with a dot in the file name",
      "src/blog/index.astro, outside the pages folder",
      "src/pages/blog/index.astro",
      "src/pages/blog/home.astro"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Besides .astro files, which files can produce pages in src/pages?",
    "topic": "File-based routing",
    "choices": [
      "Markdown, MDX and HTML files",
      "Only .astro files, since every other format is ignored",
      "Any file type, including images and PDFs rendered as pages",
      "Only files exported from a component library"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Astro treat a file or folder in src/pages whose name starts with an underscore?",
    "topic": "File-based routing",
    "choices": [
      "It becomes a route with the underscore removed",
      "It is ignored and does not become a route",
      "It becomes a private route that needs a login",
      "It is treated as the default error page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What URL does src/pages/docs/getting-started.astro produce?",
    "topic": "File-based routing",
    "choices": [
      "/docs?page=getting-started",
      "/getting-started/docs",
      "/docs/getting-started.astro",
      "/docs/getting-started"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Astro decide which routes exist?",
    "topic": "File-based routing",
    "choices": [
      "From the file and folder structure inside src/pages",
      "From a routes array declared in astro.config.mjs",
      "From the links found by crawling the home page",
      "From the order of the imports in the layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What URL does src/pages/index.astro match?",
    "topic": "File-based routing",
    "choices": [
      "/index.astro",
      "/",
      "/home",
      "/pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What extra work does a trailing-slash setting in the Astro config control?",
    "topic": "File-based routing",
    "choices": [
      "Whether the site is built statically or on request",
      "Whether URLs end with a slash or not",
      "Whether the sitemap includes draft pages",
      "Whether the build adds a hash to file names"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the trailingSlash setting in the Astro config control?",
    "topic": "File-based routing",
    "choices": [
      "Whether URLs end with a slash",
      "Whether the site is built as static files or rendered on request",
      "Whether the sitemap includes draft pages in its output",
      "Whether the build adds a hash to the output file names"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does adding a redirects entry to the Astro config do?",
    "topic": "File-based routing",
    "choices": [
      "Sends visitors from an old path to a new one",
      "Blocks search engines from crawling a path",
      "Caches a path in the browser for one year",
      "Renames the page file on disk"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a layout component in Astro?",
    "topic": "Layout components",
    "choices": [
      "A special file type that must end in .layout and sits next to its pages",
      "A component that wraps pages with shared markup",
      "A stylesheet that Astro applies to every page without being imported",
      "A server function that runs before each request to choose a template"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a layout show the page content it wraps?",
    "topic": "Layout components",
    "choices": [
      "With a {children} expression",
      "With a <yield /> element",
      "With an include() call",
      "With a <slot /> element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a page use a layout?",
    "topic": "Layout components",
    "choices": [
      "Export its name from the config file so every page picks it up",
      "Add a layout.html file to the same folder as the page",
      "Link it with a <link rel='layout'> tag in the page head",
      "Import it and wrap the page content in the tag"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a layout usually receive from the page through props?",
    "topic": "Layout components",
    "choices": [
      "The whole page source, so that the layout can parse it again",
      "The previous page's scroll position",
      "Values such as the page title for <title> and meta tags",
      "The visitor's browser cookies, passed by default on every request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does a layout normally put its <html> and <head> tags?",
    "topic": "Layout components",
    "choices": [
      "In astro.config.mjs under a head key",
      "In public/index.html",
      "In the layout component's own template",
      "In the first page the visitor opens"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can a layout be placed inside another layout?",
    "topic": "Layout components",
    "choices": [
      "No, a page can use only one layout and no layout can wrap another",
      "Yes, layouts are components and can be nested",
      "Only if both are written in Markdown",
      "Only when the outer one is marked global"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a Markdown page use a layout?",
    "topic": "Layout components",
    "choices": [
      "With a layout key in its frontmatter",
      "With a <Layout> tag written in the Markdown body",
      "With a file named layout.md next to it",
      "With a #layout heading at the top"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the 'astro' global provide to a layout about the current page?",
    "topic": "Layout components",
    "choices": [
      "The visitor's full browsing history",
      "Astro.url and Astro.props, among other request data",
      "A direct handle on the browser's window object for the layout",
      "The text of every other page, so the layout can build menus"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why put the <meta charset> and viewport tags in a shared layout?",
    "topic": "Layout components",
    "choices": [
      "So the browser downloads them only once for all pages",
      "So they are excluded from the HTML",
      "So every page gets them without repeating the markup",
      "So they can be changed at runtime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can be an advantage of one BaseLayout used by all pages?",
    "topic": "Layout components",
    "choices": [
      "Each page loads faster because the layout is cached forever",
      "Pages can no longer have their own title",
      "Pages share the same URL",
      "A change to the header or footer is made in one place"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does src/pages/blog/[slug].astro define?",
    "topic": "Dynamic routes and params",
    "choices": [
      "A dynamic route that matches /blog/ followed by one segment",
      "A route that matches only the literal path /blog/[slug]",
      "A folder of static files named slug",
      "A layout used by all blog posts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a component script read the dynamic segment of the current URL?",
    "topic": "Dynamic routes and params",
    "choices": [
      "Astro.url.slug",
      "Astro.params.slug",
      "Astro.query.slug",
      "window.params.slug"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which syntax matches a variable number of path segments, like /docs/a/b/c?",
    "topic": "Dynamic routes and params",
    "choices": [
      "[path*].astro",
      "{path}.astro",
      "[...path].astro",
      "(path).astro"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a dynamic route in static mode not be built without extra information?",
    "topic": "Dynamic routes and params",
    "choices": [
      "Static output does not allow brackets in file names at all",
      "Astro must know which paths to generate at build time",
      "The browser would need to download every page at once",
      "The dev server refuses to start until paths are declared"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a dynamic route need to export for a static build?",
    "topic": "Dynamic routes and params",
    "choices": [
      "A default function named render",
      "A getStaticPaths function",
      "A constant named paths in the config",
      "A GET handler for each path"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What shape of value does getStaticPaths return?",
    "topic": "Dynamic routes and params",
    "choices": [
      "A single object that maps slugs to HTML strings for each page",
      "A promise that resolves to a React component for each path",
      "An array of objects with params and optional props",
      "A stream of file names that the router reads one at a time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the props field in a getStaticPaths entry?",
    "topic": "Dynamic routes and params",
    "choices": [
      "Sets the page title in the browser tab for that particular path",
      "Marks the path as private so that crawlers skip it",
      "Selects the layout that wraps the page generated for that path",
      "Passes data to the page for that path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a page receive the data returned from getStaticPaths for its path?",
    "topic": "Dynamic routes and params",
    "choices": [
      "Through Astro.data",
      "Through Astro.props",
      "Through a global paths object",
      "Through the URL query string"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which of these is a valid params object for src/pages/[lang]/[page].astro?",
    "topic": "Dynamic routes and params",
    "choices": [
      "{ path: '/en/about' }",
      "{ lang: 'en' } with no page key",
      "{ lang: 'en', page: 'about' }",
      "['en', 'about']"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must the values in params be for a dynamic route?",
    "topic": "Dynamic routes and params",
    "choices": [
      "Objects with a toString method",
      "Strings (or undefined for optional rest segments)",
      "Any JavaScript values, since Astro serializes them",
      "Numbers only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is getStaticPaths executed?",
    "topic": "getStaticPaths",
    "choices": [
      "On every request for the page",
      "In the browser when the page loads, before hydration starts",
      "At build time, before the pages are rendered",
      "Each time the visitor clicks a link that leads to the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where must getStaticPaths be declared?",
    "topic": "getStaticPaths",
    "choices": [
      "In a separate file named paths.config.js next to the page",
      "As an exported function in the page's script",
      "Inside the page template, between curly braces after the layout",
      "In astro.config.mjs under a paths key for each dynamic route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How many pages does a getStaticPaths that returns three params entries build?",
    "topic": "getStaticPaths",
    "choices": [
      "Three, one for each entry",
      "One, because the entries are merged into a single page",
      "Four, as Astro adds an index page for the entries",
      "None, until a visitor requests each path for the first time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can getStaticPaths load data for its paths?",
    "topic": "getStaticPaths",
    "choices": [
      "It can only return hard-coded arrays written in the page script",
      "It must read a database from the visitor's browser at runtime",
      "It can be async and fetch from files or an API",
      "It can only use values taken from the URL of the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical use of getStaticPaths with content collections?",
    "topic": "getStaticPaths",
    "choices": [
      "Creating one page per entry from the collection",
      "Importing the styles for every entry before the page is built",
      "Validating the collection schema in the visitor's browser at runtime",
      "Hiding draft entries from the sitemap integration's output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is getStaticPaths not needed in server-rendered (SSR) mode?",
    "topic": "getStaticPaths",
    "choices": [
      "SSR pages do not support dynamic routes",
      "The path is resolved on each request, not at build time",
      "SSR sites ignore the file names in src/pages and use the config",
      "SSR always builds every possible path ahead of the first request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you generate pages for several languages with one file?",
    "topic": "getStaticPaths",
    "choices": [
      "Copy the file once for each language folder and edit each copy",
      "Use a client-side redirect on every page based on the browser language",
      "Add a lang attribute on the <html> tag, which creates the routes",
      "Return one params entry per language"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good use of the props field in getStaticPaths when paginating?",
    "topic": "getStaticPaths",
    "choices": [
      "Pass each page's slice of items",
      "Pass the browser's scroll position",
      "Set the number of CPU cores used",
      "Choose the CDN region"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the paginate() helper return for each page?",
    "topic": "getStaticPaths",
    "choices": [
      "A promise that resolves after the next page has finished loading in the browser",
      "A page object with data, page number and next/prev URLs",
      "An array holding the rendered HTML of every page in the list",
      "A cookie that stores the visitor's current page number between requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about getStaticPaths and performance is true?",
    "topic": "getStaticPaths",
    "choices": [
      "It runs in every visitor's browser before the page shows",
      "It reruns on every click of a link",
      "It is slower than server rendering on every request",
      "It runs at build time, so visitors do not wait for its data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you create a plain link between pages?",
    "topic": "Navigation",
    "choices": [
      "With a normal <a href='/about'> element",
      "With a <Link to='/about'> component from Astro",
      "With a router.push('/about') call",
      "With a <nav-link> web component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does Astro need a client-side router for basic navigation?",
    "topic": "Navigation",
    "choices": [
      "Yes, a client router is always bundled and handles every navigation",
      "Yes, but only on mobile browsers",
      "No, links cannot navigate at all without some client JavaScript",
      "No, links are full page loads unless view transitions are on"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do Astro's view transitions add?",
    "topic": "Navigation",
    "choices": [
      "A client-side database that keeps page data between navigations",
      "Automatic image resizing as the visitor moves between pages",
      "Animated, app-like navigation between pages",
      "Server-side form handling for every link the visitor clicks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you enable view transitions for a site?",
    "topic": "Navigation",
    "choices": [
      "Add <ClientRouter /> to the shared <head>",
      "Set a transitions flag in package.json under the astro key",
      "Call startTransition() on every click from an inline script",
      "Install a React plugin that wraps the navigation in an island"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you reference a base path when the site is deployed under /docs?",
    "topic": "Navigation",
    "choices": [
      "Set base in the config and use import.meta.env.BASE_URL",
      "Add /docs in front of every file name inside src/pages",
      "Use only absolute https links, which ignore the deployment path",
      "Wrap links in an <a base> tag that Astro rewrites at build time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a nav component highlight the current page link?",
    "topic": "Navigation",
    "choices": [
      "Compare the link path with Astro.url.pathname",
      "Read the link's color from window and compare it with the heading",
      "Ask the browser for the history length and match it to the link",
      "Check a cookie that the layout sets when a link is clicked"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good reason to use relative or root-relative links like /about?",
    "topic": "Navigation",
    "choices": [
      "They are always faster than absolute URLs",
      "They prevent crawlers from following them",
      "They stay valid if the domain changes",
      "They are required by HTML5"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which attribute marks a link that should prefetch its target?",
    "topic": "Navigation",
    "choices": [
      "rel='prefetch-now'",
      "data-prefetch='true'",
      "preload='page'",
      "data-astro-prefetch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the prefetch option in Astro's config do?",
    "topic": "Navigation",
    "choices": [
      "Fetches pages ahead of time for faster navigation",
      "Prevents pages from being cached so each visit loads the latest HTML",
      "Downloads all pages of the site when the visitor first arrives",
      "Turns off JavaScript on the page to speed up the first paint"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which link attribute should be added to external links opened in a new tab for safety?",
    "topic": "Navigation",
    "choices": [
      "rel='external-safe', which marks the link as trusted by the browser",
      "target='_safe', which opens the page in an isolated browsing context",
      "download, which saves the target page instead of opening it",
      "rel='noopener noreferrer'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file is used as the custom 404 page?",
    "topic": "404 and error pages",
    "choices": [
      "src/pages/not-found.astro",
      "src/errors/404.astro",
      "public/404.astro",
      "src/pages/404.astro"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What status code should a 404 page be served with?",
    "topic": "404 and error pages",
    "choices": [
      "200",
      "301",
      "404",
      "500"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a static host often do with a 404.html file in dist?",
    "topic": "404 and error pages",
    "choices": [
      "Serves it for paths that do not exist",
      "Redirects every visit to it",
      "Ignores it unless a plugin is installed",
      "Uses it as the home page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a dynamic route show a 404 for an unknown entry in SSR mode?",
    "topic": "404 and error pages",
    "choices": [
      "Throw an exception that the browser catches and turns into a 404",
      "Delete the route file at runtime so the router no longer matches it",
      "Write a console.error and let the page render with a 200 status",
      "Return a Response with status 404 from the page script"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where would you set the response status in an SSR page?",
    "topic": "404 and error pages",
    "choices": [
      "document.status = 404; inside a script tag on the page",
      "this.status(404); at the top of the component script",
      "Astro.response.status = 404;",
      "Astro.status.set(404); before the template is returned"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which file can serve as a custom 500 error page?",
    "topic": "404 and error pages",
    "choices": [
      "src/pages/error.astro",
      "src/pages/server-error.astro",
      "src/pages/500.astro",
      "src/500.html"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a good 404 page include?",
    "topic": "404 and error pages",
    "choices": [
      "A redirect loop to the home page that hides the missing address",
      "A hidden full sitemap, listing every page for crawlers only",
      "An automatic download of the home page for offline reading",
      "A clear message and links back to useful pages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a missing page return a real 404 status rather than a 200 with an error message?",
    "topic": "404 and error pages",
    "choices": [
      "Browsers refuse to show a 200 page that contains an error message",
      "Search engines would otherwise index the missing URL",
      "A 200 response is slower to deliver than a 404 from the same server",
      "The server would run out of memory when 200 pages are cached"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens in the dev server when a route does not exist?",
    "topic": "404 and error pages",
    "choices": [
      "The server stops with a stack trace until the route file exists",
      "The browser is redirected to the home page without any message",
      "Astro creates the missing file from a template and reloads",
      "Astro shows a 404 page listing the available routes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should an API endpoint report that a resource was not found?",
    "topic": "404 and error pages",
    "choices": [
      "Throw a string and let the CDN decide which status code to send",
      "Return a 200 Response whose body says the resource is missing",
      "Return a Response with status 404",
      "Redirect with a 301 to the home page so the visitor lands somewhere"
    ],
    "answerIdx": 2
  }
]
```

LAYER: astro-dev-4

```json
[
  {
    "stem": "Where is the frontmatter of a Markdown file written?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "In a YAML block between two --- lines at the top of the file",
      "In a <script> tag placed at the end of the Markdown body",
      "In a JSON file that must sit next to the Markdown file",
      "In an HTML comment that the Markdown parser turns into data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the title: Hello line in a Markdown file's frontmatter define?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "A data field that layouts and pages can read",
      "The first heading, which the parser prints automatically",
      "The file name that Astro uses for the output route",
      "A CSS class that is added to the page body"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when you put a .md file in src/pages?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "Astro copies it untouched into the output folder",
      "Astro ignores it unless a Markdown plugin is installed",
      "Astro builds it into a page at the matching URL",
      "Astro turns it into an API endpoint returning text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a layout receive frontmatter from a Markdown page that sets layout?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "Through a global markdown object read at build time",
      "Through a query string added to the page URL",
      "Through a hidden form field on the page",
      "Through the frontmatter prop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which default tool highlights code blocks in Markdown with Astro?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "A client-side script that colors code after the page loads",
      "A browser extension required on each visitor's device",
      "A stylesheet that is loaded from a third-party CDN",
      "Shiki"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How are Markdown headings given anchor ids by default?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "They get no ids, so you must write each id by hand",
      "They receive random numeric ids that change on every build",
      "They are assigned by the browser when the page loads",
      "Astro generates slugs for headings so you can link to them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you add remark and rehype plugins for Markdown?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "In a plugins.json file placed inside src/pages",
      "In the frontmatter of every Markdown file",
      "In the markdown option of astro.config.mjs",
      "In the package.json scripts section"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What kind of data can the frontmatter YAML hold?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "Strings, numbers, booleans, lists and nested objects",
      "Only strings, because YAML has no other types",
      "Only values that are valid CSS declarations",
      "Only HTML tags that the layout will render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common reason to write content in Markdown rather than HTML?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "It loads faster than HTML in every browser",
      "It is easy to write and separates content from presentation",
      "It lets the browser run scripts without needing a script tag at all",
      "It stops search engines from reading the text, so drafts stay private"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you reach the headings of a Markdown page from a layout?",
    "topic": "Markdown and frontmatter",
    "choices": [
      "They must be extracted again with a regular expression",
      "They are only available in the browser after hydration",
      "They cannot be reached outside the Markdown file",
      "The headings are passed along with the frontmatter props"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does MDX add to Markdown?",
    "topic": "MDX with components",
    "choices": [
      "Automatic translation of the text into the languages listed in the config",
      "Imported components and JavaScript expressions in content",
      "A different frontmatter format based on JSON instead of YAML",
      "Server-side rendering for every Markdown file in the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you enable MDX in an Astro project?",
    "topic": "MDX with components",
    "choices": [
      "Rename the file extension to .mdx and nothing else is needed",
      "Add a <mdx> tag to the layout",
      "Install the @astrojs/mdx integration and add it to the config",
      "Enable the mdx flag in tsconfig.json"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you use an Astro component inside an MDX file?",
    "topic": "MDX with components",
    "choices": [
      "Import it at the top of the file, then use it as a tag",
      "Register it in package.json under a components key",
      "Write its file name inside a Markdown link where it should appear",
      "Pass it through the page URL as a query parameter at request time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In MDX, what do curly braces do?",
    "topic": "MDX with components",
    "choices": [
      "They create a Markdown list",
      "They embed a JavaScript expression",
      "They escape the text so it prints literally",
      "They mark an HTML comment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you print a literal curly brace in MDX?",
    "topic": "MDX with components",
    "choices": [
      "Write it twice in a row, like {{",
      "Escape it with a backslash or use a code span",
      "Write it in the frontmatter instead, where braces are always literal",
      "Put it inside an HTML entity only, since MDX has no other way"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the components prop on <Content /> allow?",
    "topic": "MDX with components",
    "choices": [
      "Importing every component from a folder at once",
      "Replacing HTML elements like h1 with your own components",
      "Listing which components may not be used",
      "Loading components in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a drawback of MDX compared with plain Markdown?",
    "topic": "MDX with components",
    "choices": [
      "MDX files cannot contain headings or links",
      "MDX files cannot have frontmatter, so every field must be exported",
      "Authors need some JSX and curly-brace knowledge",
      "MDX pages always ship a large JavaScript runtime to the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you share a component with all MDX files without importing it each time?",
    "topic": "MDX with components",
    "choices": [
      "Declare it in astro.config.mjs under a global components key",
      "Pass it in the components prop when rendering",
      "Add it to the public folder",
      "Include it with a script tag in the layout's head section"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can an MDX file export a value that a page can import?",
    "topic": "MDX with components",
    "choices": [
      "Yes, MDX supports export statements",
      "No, MDX files can only be rendered",
      "Only if the export is named default",
      "Only when the file is in src/pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a framework component used in MDX if it has no client directive?",
    "topic": "MDX with components",
    "choices": [
      "It runs in the browser right away",
      "It fails to build, since MDX requires a client directive on each import",
      "It renders to static HTML with no client JavaScript",
      "It is shown as a placeholder box until a directive is added"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a content collection in Astro?",
    "topic": "Content collections",
    "choices": [
      "A single large JSON file that holds all pages",
      "A group of related content files with a shared schema",
      "A browser cache that stores Markdown files",
      "A list of routes defined in the config"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In Astro 5, which file defines content collections?",
    "topic": "Content collections",
    "choices": [
      "src/pages/collections.astro",
      "astro.collections.json",
      "src/content/index.md",
      "src/content.config.ts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does defineCollection do?",
    "topic": "Content collections",
    "choices": [
      "Creates the folder for the collection on disk with the right permissions",
      "Fetches the collection in the browser when the page becomes visible",
      "Publishes the collection to a connected CMS after each build",
      "Declares a collection with a loader and optional schema"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must the config file export for collections to be registered?",
    "topic": "Content collections",
    "choices": [
      "A default function named content",
      "A getCollections function",
      "A collections object",
      "A paths array"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a loader like glob() do in a collection definition?",
    "topic": "Content collections",
    "choices": [
      "Compresses the matched files so that the browser downloads fewer bytes",
      "Translates the matched files into the languages listed in the config",
      "Uploads the matched files to a CDN and stores only their URLs",
      "Finds files matching a pattern and loads them as entries"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the base option of the glob loader?",
    "topic": "Content collections",
    "choices": [
      "The URL prefix of the generated pages",
      "The folder in which the loader looks for files",
      "The default language of the content",
      "The name of the collection"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of content collections instead of loose Markdown files?",
    "topic": "Content collections",
    "choices": [
      "Typed data and validation with clear frontmatter errors",
      "The files become faster for browsers to download",
      "The site no longer needs any layouts, because entries render themselves",
      "The content is published to social media after every successful build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Astro give each entry an id?",
    "topic": "Content collections",
    "choices": [
      "From a random number assigned at build time",
      "From the order in which the files were created",
      "From the first heading in the file",
      "From the file path of the entry, in a slug-like format"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kinds of content can a collection hold?",
    "topic": "Content collections",
    "choices": [
      "Only Markdown files, because every other format needs its own build tool",
      "Only JSON files, since collections are modeled on database tables",
      "Only images and fonts, which Astro then optimizes for the browser",
      "Markdown, MDX, JSON, YAML and remote data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can one collection point to an entry in another, such as a post pointing to its author?",
    "topic": "Content collections",
    "choices": [
      "With the reference() helper in the schema",
      "With a foreign key set in the database",
      "With an import statement in the post",
      "With a query string in the URL"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which library does Astro use for collection schemas?",
    "topic": "Schema validation with Zod",
    "choices": [
      "Joi, loaded from a CDN",
      "Yup, bundled in the browser",
      "JSON Schema files stored in public",
      "Zod"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does z.string() declare for a frontmatter field?",
    "topic": "Schema validation with Zod",
    "choices": [
      "A required text value",
      "An optional text value",
      "A list of text values",
      "A number written as text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you make a frontmatter field optional?",
    "topic": "Schema validation with Zod",
    "choices": [
      "Wrap the field name in brackets",
      "Leave the field out of the schema",
      "Add .optional() to the schema field",
      "Add a question mark to the file name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does z.coerce.date() do for a frontmatter date like 2025-04-01?",
    "topic": "Schema validation with Zod",
    "choices": [
      "Keeps it as text so no conversion occurs",
      "Converts the value into a Date object",
      "Rejects every value that is not already a Date",
      "Adds the current time to it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a schema give a field a default value?",
    "topic": "Schema validation with Zod",
    "choices": [
      "With a defaults.json file",
      "With a comment in the frontmatter",
      "With .default(value) on the field",
      "With a fallback attribute on the layout"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a Markdown file's frontmatter does not match the schema?",
    "topic": "Schema validation with Zod",
    "choices": [
      "The page builds with the invalid fields left out silently",
      "Astro reports a validation error that names the file and field",
      "The invalid file is deleted",
      "The browser shows a warning to the visitor"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which schema fits a list of tags that defaults to an empty list?",
    "topic": "Schema validation with Zod",
    "choices": [
      "z.array(z.string()).default([])",
      "z.string().array().required()",
      "z.list('tag')",
      "z.tags([])"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a schema restrict a field to a few allowed words?",
    "topic": "Schema validation with Zod",
    "choices": [
      "With a regular expression on the file name",
      "With a CSS selector",
      "With z.enum(['draft', 'published'])",
      "With a TypeScript comment"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is schema validation useful for a content-driven site?",
    "topic": "Schema validation with Zod",
    "choices": [
      "It makes the generated pages download faster because the fields are compressed",
      "It encrypts the content files so that only the build can read the fields",
      "It removes the need for version control because every change is validated",
      "It catches missing or mistyped fields at build time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you validate that a field holds a URL?",
    "topic": "Schema validation with Zod",
    "choices": [
      "z.url.string()",
      "z.http()",
      "z.string().link",
      "z.string().url()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function returns every entry of a collection?",
    "topic": "Querying content",
    "choices": [
      "getCollection('blog')",
      "fetchAll('blog')",
      "getEntries('blog') with no argument",
      "readCollection('blog')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which function fetches a single entry by its id?",
    "topic": "Querying content",
    "choices": [
      "getOne('blog', 'my-post')",
      "findEntry('my-post')",
      "getEntry('blog', 'my-post')",
      "getCollection('blog', 'my-post')"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you filter out draft posts when querying a collection?",
    "topic": "Querying content",
    "choices": [
      "Move every draft file into the public folder, which Astro skips in queries",
      "Add a CSS rule that hides the drafts once the page is displayed",
      "Pass a filter: getCollection('blog', ({ data }) => !data.draft)",
      "Rename each draft with a .draft extension, which Astro always skips in queries"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you sort entries by publication date, newest first?",
    "topic": "Querying content",
    "choices": [
      "Pass sort: 'newest' as an option to getCollection and Astro orders them",
      "Sort the returned array by data.pubDate, newest first",
      "Rename the files so that newer dates come first in the file list",
      "Add a CSS order property to each item"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the typed data of an entry located?",
    "topic": "Querying content",
    "choices": [
      "In entry.frontmatter.raw",
      "In entry.props",
      "In entry.data",
      "In entry.meta.json"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you call getCollection when building a list page?",
    "topic": "Querying content",
    "choices": [
      "In the template, inside a script tag with a client directive",
      "In astro.config.mjs",
      "In the component script of the page",
      "In the public folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does getEntries do?",
    "topic": "Querying content",
    "choices": [
      "Returns every file in the project that has a supported content extension",
      "Lists all routes of the site",
      "Lists all installed integrations along with their configured options",
      "Resolves an array of references to their entries"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is a list of posts typically turned into pages?",
    "topic": "Querying content",
    "choices": [
      "getStaticPaths maps each entry to a route and its props",
      "Each post needs a manual copy of the page file",
      "The browser requests each post from the server",
      "The posts are merged into the home page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the type of entry.data in a typed collection?",
    "topic": "Querying content",
    "choices": [
      "Always any",
      "The type inferred from the Zod schema",
      "A string of raw frontmatter",
      "An array of lines"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you find all posts that share a tag?",
    "topic": "Querying content",
    "choices": [
      "Filter the collection by checking data.tags in the callback",
      "Use a tag route created by the browser",
      "Add each post to a separate folder per tag manually",
      "Run a SQL query on the build server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you render the body of a collection entry?",
    "topic": "Rendering content entries",
    "choices": [
      "With the render() function from astro:content",
      "With entry.html, a prebuilt string",
      "With document.write",
      "With a fetch call to the entry's file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does await render(entry) return?",
    "topic": "Rendering content entries",
    "choices": [
      "The raw Markdown text of the entry, with the frontmatter removed from it",
      "An object with Content, headings and more",
      "A promise for the next entry in the collection, sorted by file name",
      "A string of CSS that styles the rendered entry for this page only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you place the rendered content on the page?",
    "topic": "Rendering content entries",
    "choices": [
      "Use set:text on a div, with the entry body as its value",
      "Use the Content component: <Content />",
      "Use an <include> tag that points to the entry's file path",
      "Call entry.write() in the template to insert the rendered body"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the headings value from render() used for?",
    "topic": "Rendering content entries",
    "choices": [
      "Sorting entries by title",
      "Generating image sizes",
      "Adding scripts to the page",
      "Building a table of contents"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you pass custom components to rendered MDX content?",
    "topic": "Rendering content entries",
    "choices": [
      "<Content as='MyHeading' />, with the name of the component in a string",
      "Content.use(MyHeading), called once before the page renders",
      "<Content components={{ h2: MyHeading }} />",
      "<Content slot='MyHeading' />, which maps the slot to the component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the raw Markdown or MDX text of an entry stored in?",
    "topic": "Rendering content entries",
    "choices": [
      "entry.body",
      "entry.text.raw",
      "entry.data.body",
      "entry.render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it best to render collection entries at build time on a content site?",
    "topic": "Rendering content entries",
    "choices": [
      "It keeps the entries out of search engines until the next scheduled build",
      "It lets visitors edit the content directly in the rendered page",
      "It avoids the need for Markdown, since entries are compiled to JSON",
      "It produces static HTML that is fast and needs no server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the <Content /> component produce?",
    "topic": "Rendering content entries",
    "choices": [
      "A client-only React component that loads the entry in the browser",
      "HTML generated from the Markdown or MDX body",
      "An iframe that points to the original file on the server",
      "A canvas element on which the content is drawn at runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should untrusted user-submitted Markdown not be rendered without sanitizing it?",
    "topic": "Rendering content entries",
    "choices": [
      "Markdown can include raw HTML, such as scripts",
      "Markdown parsers execute any code block they find during rendering",
      "Frontmatter fields run as server code when the schema validates them",
      "Rendered Markdown is cached by browsers with the author's permissions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good page structure for a blog built on collections?",
    "topic": "Rendering content entries",
    "choices": [
      "A separate hand-written Astro page file for every post, copied from a template",
      "One long page holding every post, with anchors to jump between them",
      "An index page plus a dynamic route for each post",
      "A client-side router that fetches each Markdown file after the page loads"
    ],
    "answerIdx": 2
  }
]
```

LAYER: astro-dev-5

```json
[
  {
    "stem": "What is an island in Astro?",
    "topic": "Islands architecture",
    "choices": [
      "A page that Astro renders on the server for every single request",
      "A shared layout that every page of the site is wrapped in",
      "An interactive component on an otherwise static page",
      "A folder of static assets that the build copies to the output"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the islands architecture aim to achieve?",
    "topic": "Islands architecture",
    "choices": [
      "Move all page rendering into the browser so the server stays simple",
      "Send JavaScript only for the parts of the page that need it",
      "Share a single global store between every component on the site",
      "Bundle the whole site into one script file that loads first"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does each island behave relative to the others?",
    "topic": "Islands architecture",
    "choices": [
      "It waits for every other island to finish hydrating first",
      "It shares one hydration queue that runs in strict page order",
      "It hydrates independently of the others",
      "It is rendered by the same virtual DOM tree as the others"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the static HTML around an island contain?",
    "topic": "Islands architecture",
    "choices": [
      "Placeholder text that the browser replaces after fetching it",
      "Plain HTML that needs no JavaScript to show its content",
      "Empty containers that scripts fill with markup on load",
      "Inline components that run on the client for every element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does hydration mean for an island?",
    "topic": "Islands architecture",
    "choices": [
      "Downloading the component's images before the page loads",
      "Attaching event handlers and state to HTML that was already rendered",
      "Converting the component's HTML into a Markdown document",
      "Replacing the component with a server-side rendered iframe"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is true of an Astro (.astro) component?",
    "topic": "Islands architecture",
    "choices": [
      "It becomes an island when it has a client:load directive",
      "It hydrates automatically whenever it contains a script tag",
      "It can be hydrated if it is wrapped inside a React component",
      "It never hydrates on the client, so it cannot be an island"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of islands for a content-heavy site?",
    "topic": "Islands architecture",
    "choices": [
      "Pages stay fast because most of the markup ships no JavaScript",
      "Every component can read and write the same global state at no cost",
      "All interactivity is handled by the server on each click",
      "The site no longer needs any HTML at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can one Astro page use islands from different UI frameworks?",
    "topic": "Islands architecture",
    "choices": [
      "No, a project can only be configured with one framework",
      "Yes, such as a React island and a Svelte island on the same page",
      "Only if the frameworks share a version of their runtime",
      "Only when the page is rendered in the browser instead of the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is shipped to the browser for an island that uses React?",
    "topic": "Islands architecture",
    "choices": [
      "The component code and the React runtime it needs",
      "Only the HTML, since React is never sent to the browser",
      "The component code, plus a copy of Astro's server renderer",
      "A prebuilt image of the rendered component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement describes the main difference between Astro and a typical single-page app?",
    "topic": "Islands architecture",
    "choices": [
      "Astro requires every component to be rendered in the browser",
      "Astro renders to HTML first and adds JavaScript only where needed",
      "Astro cannot use JavaScript frameworks at all",
      "Astro always renders every page for each visitor on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you add React support to an Astro project?",
    "topic": "Framework integrations",
    "choices": [
      "Rename the .jsx files to .astro, and nothing else needs to change",
      "Copy the React package into the public folder so the browser loads it",
      "Run astro add react",
      "Add a script tag for React to the layout's head section"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which of these frameworks does Astro support through official integrations?",
    "topic": "Framework integrations",
    "choices": [
      "Only React",
      "React, Preact, Vue, Svelte, Solid and Alpine",
      "Only frameworks that use a virtual DOM",
      "Any framework without the need for an integration"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you use a React component in an .astro page?",
    "topic": "Framework integrations",
    "choices": [
      "Register it in astro.config.mjs and refer to it by a string name",
      "Add it to the public folder and link it",
      "Write it inside the style block",
      "Import it in the component script and use it like a tag"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a framework component with no client directive?",
    "topic": "Framework integrations",
    "choices": [
      "It is rendered in the browser after the page loads",
      "It is skipped, so nothing appears in the output",
      "It is rendered, and all of its JavaScript is sent as well",
      "It is rendered to static HTML on the server and ships no JavaScript"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file type is a React component usually written in?",
    "topic": "Framework integrations",
    "choices": [
      ".astro with a React pragma",
      ".react.html",
      ".jsx or .tsx",
      ".mdx only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do Astro slots become when passed to a React component?",
    "topic": "Framework integrations",
    "choices": [
      "A global variable named slots",
      "The component's children prop",
      "A DOM node that React cannot access",
      "A string of HTML escaped as text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which kind of value cannot be passed as a prop to a hydrated framework component?",
    "topic": "Framework integrations",
    "choices": [
      "A function, because props must be serializable",
      "A string",
      "A number or boolean",
      "A plain object or array of plain values"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must props to an island be serializable?",
    "topic": "Framework integrations",
    "choices": [
      "They are stored in a cookie by the server for the next request",
      "They are sent to an analytics service that logs each island's inputs",
      "They are compared with the props from the last build for caching",
      "They are written into the HTML so the browser can hydrate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can you put an Astro component inside a React island as a child?",
    "topic": "Framework integrations",
    "choices": [
      "No, Astro components cannot be nested in other frameworks in any form",
      "Yes, by passing it as a slot child that renders to HTML",
      "Only if the Astro component has a client directive",
      "Only inside a Vue component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Astro integration for a framework do besides running its renderer?",
    "topic": "Framework integrations",
    "choices": [
      "Installs the framework's browser extension for the development server",
      "Replaces Astro's router with the framework's router on every page",
      "Configures the build so components compile and hydrate",
      "Disables HTML output for the whole site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does client:load do?",
    "topic": "Client directives",
    "choices": [
      "Hydrates only when the component scrolls into view",
      "Hydrates when the browser is idle",
      "Never hydrates and only renders on the server",
      "Hydrates the component as soon as the page loads"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does client:idle do?",
    "topic": "Client directives",
    "choices": [
      "Hydrates once the browser's main thread is idle after load",
      "Hydrates immediately before the HTML is parsed",
      "Hydrates when the visitor clicks the component",
      "Hydrates only on slow connections"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does client:visible do?",
    "topic": "Client directives",
    "choices": [
      "Hydrates when the component first becomes hidden",
      "Hydrates when the component enters the viewport",
      "Hydrates when the visitor presses a key",
      "Hydrates at the same moment as the HTML parsing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does client:media='(max-width: 50em)' do?",
    "topic": "Client directives",
    "choices": [
      "Hides the component when the media query matches",
      "Loads a different stylesheet when the query matches",
      "Hydrates only when the media query matches",
      "Hydrates the component on every screen size"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does client:only='react' do?",
    "topic": "Client directives",
    "choices": [
      "Skips server rendering and renders only in the browser",
      "Renders on the server and again on the client",
      "Disables the React runtime",
      "Renders the component twice for testing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does client:only need the framework name?",
    "topic": "Client directives",
    "choices": [
      "Astro cannot infer the renderer without server rendering it",
      "The name decides which CSS file is loaded together with the component",
      "The name becomes the URL under which the component is served",
      "The name is only written into the build log for debugging purposes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which directive is best for a chat widget at the bottom of a long page?",
    "topic": "Client directives",
    "choices": [
      "client:load",
      "client:only with no value",
      "No directive at all",
      "client:visible"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which directive suits a main navigation menu that must work immediately?",
    "topic": "Client directives",
    "choices": [
      "client:visible",
      "client:idle",
      "client:media",
      "client:load"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main reason to prefer client:idle over client:load for a non-critical widget?",
    "topic": "Client directives",
    "choices": [
      "It makes the widget render on the server before the page is sent",
      "It sends less HTML to the browser than the same widget with client:load",
      "It avoids competing with critical work during load",
      "It skips the framework runtime, which client:load always downloads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if you add a client directive to an .astro component?",
    "topic": "Client directives",
    "choices": [
      "The component becomes interactive, with its script tag running in the browser",
      "The build fails with a syntax error that names the unsupported directive",
      "The component is hydrated on the server instead of the client",
      "It has no effect, since .astro components do not hydrate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between server rendering and hydration of an island?",
    "topic": "Hydration strategies",
    "choices": [
      "The server creates the HTML; hydration makes it interactive",
      "Hydration creates the HTML on the server, and server rendering makes it interactive",
      "They are the same step, which runs twice for safety on every page",
      "Hydration is a build step, while server rendering is a runtime step"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which hydration strategy delays a below-the-fold component until needed?",
    "topic": "Hydration strategies",
    "choices": [
      "client:visible",
      "client:load",
      "client:only",
      "client:immediate"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What cost does hydrating many islands at load time create?",
    "topic": "Hydration strategies",
    "choices": [
      "More HTML on the server, but no extra cost in the browser at all",
      "Larger image files in the output, because islands embed their assets",
      "Slower DNS lookups, since each island needs its own domain",
      "More JavaScript to download and run, slowing interactivity"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tool does client:visible rely on in the browser?",
    "topic": "Hydration strategies",
    "choices": [
      "MutationObserver",
      "ResizeObserver",
      "PerformanceObserver",
      "IntersectionObserver"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which browser feature does client:idle use?",
    "topic": "Hydration strategies",
    "choices": [
      "requestAnimationFrame only",
      "requestIdleCallback",
      "setInterval at one second",
      "The online and offline events"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a hydration mismatch?",
    "topic": "Hydration strategies",
    "choices": [
      "A missing client directive on a framework component that needs one",
      "Server HTML that differs from what the client renders",
      "A component that is used twice on the same page with different props",
      "A prop that has been passed to an island as a string, not a number"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which choice reduces the amount of JavaScript an island needs?",
    "topic": "Hydration strategies",
    "choices": [
      "Move all page markup into a single large island that hydrates once",
      "Keep islands small and move static parts to .astro files",
      "Hydrate every island with client:load so that they all share one download",
      "Import the whole framework runtime in each file to avoid missing exports"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does server:defer do in Astro (server islands)?",
    "topic": "Hydration strategies",
    "choices": [
      "Hydrates the component on the client after the page loads",
      "Skips rendering for visitors who are not signed in",
      "Renders a component on the server after the main page response",
      "Compiles the component at build time only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good use of a server island?",
    "topic": "Hydration strategies",
    "choices": [
      "Rendering a static footer that never changes between two visitors",
      "Importing a stylesheet that is shared by every page of the site",
      "Personalized content on an otherwise cached page",
      "Declaring a dynamic route that matches several URL segments"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you keep an island's state across page navigations with view transitions?",
    "topic": "Hydration strategies",
    "choices": [
      "Store its state in a cookie by hand",
      "Reload the page every time",
      "Add transition:persist to the island",
      "Wrap the island in a <form>"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can't two islands share state through a normal React context?",
    "topic": "Sharing state between islands",
    "choices": [
      "React context only works during server rendering and is dropped in the browser",
      "Each island is a separate root, so context does not span them",
      "Context requires a global script tag that Astro does not add to the page",
      "Astro deletes the context object during hydration to save memory"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which approach does the Astro documentation recommend for sharing state between islands?",
    "topic": "Sharing state between islands",
    "choices": [
      "A global variable set in the layout",
      "A cookie read by every island",
      "A database queried by each island",
      "Nano Stores, a small framework-agnostic store"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of Nano Stores in an Astro project?",
    "topic": "Sharing state between islands",
    "choices": [
      "They run only on the server",
      "They replace the need for any client code",
      "They sync state to the URL automatically",
      "They work across React, Vue, Svelte and other islands"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Besides a shared store, how else can islands communicate?",
    "topic": "Sharing state between islands",
    "choices": [
      "Through browser events such as CustomEvent on window",
      "Through Astro.props passed upward",
      "Through the component script of the page",
      "Through import statements between islands"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which place can hold state that survives a full page reload?",
    "topic": "Sharing state between islands",
    "choices": [
      "localStorage or the URL",
      "A variable declared in the component script",
      "A closure inside the island",
      "A React ref"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of storing state in a plain module-level variable shared by islands?",
    "topic": "Sharing state between islands",
    "choices": [
      "It is always read-only once the first island has imported the module",
      "It is deleted on the server before the page is sent to the browser",
      "It cannot be imported twice, so the second island gets an error",
      "It is not reactive, so islands will not update"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a store be read inside a React island with Nano Stores?",
    "topic": "Sharing state between islands",
    "choices": [
      "With Astro.store inside the template",
      "With a global $store variable",
      "With a call to getCollection",
      "With the useStore hook from @nanostores/react"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should a store module be defined so that all islands import the same instance?",
    "topic": "Sharing state between islands",
    "choices": [
      "In its own file, imported by each island",
      "Inside each island separately",
      "In astro.config.mjs",
      "In the public folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is URL state sometimes better than a store for filters on a page?",
    "topic": "Sharing state between islands",
    "choices": [
      "It makes the page load faster",
      "It hides filters from search engines",
      "It can be shared as a link and survives reloads",
      "It needs no JavaScript to change"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you avoid putting into a client-side store?",
    "topic": "Sharing state between islands",
    "choices": [
      "The selected tab name",
      "A cart count",
      "A theme choice",
      "Secrets, such as private API keys"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is an island the right choice?",
    "topic": "When to use an island",
    "choices": [
      "When the content is a paragraph of text",
      "When a link only needs to navigate to another page",
      "When the UI needs real client-side state or event handling",
      "When the page uses an image"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which feature can usually be built without an island?",
    "topic": "When to use an island",
    "choices": [
      "An accordion using the <details> element",
      "A real-time chat with presence indicators",
      "A drag-and-drop kanban board",
      "A rich text editor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might a plain <script> tag be better than a framework island for a tiny feature?",
    "topic": "When to use an island",
    "choices": [
      "It is the only way to use the DOM from an Astro page without an island",
      "It avoids shipping a framework runtime for a few lines",
      "It runs on the server, so no code at all is sent to the browser",
      "It is required by the HTML standard whenever a page has event handlers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which of these is a poor candidate for an island?",
    "topic": "When to use an island",
    "choices": [
      "A product image carousel with swipe gestures",
      "A static blog post body",
      "A live search box",
      "A shopping cart drawer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a sensible default when you are unsure whether a component needs JavaScript?",
    "topic": "When to use an island",
    "choices": [
      "Start with static HTML and add an island only when needed",
      "Make everything an island with client:load",
      "Move the page to a single-page app",
      "Remove the interaction altogether"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do islands affect the page's Lighthouse performance score?",
    "topic": "When to use an island",
    "choices": [
      "Islands always raise every metric, because they replace the framework runtime",
      "Islands affect only the SEO tags that Lighthouse checks in the head",
      "More hydrated JavaScript can lower interactivity scores",
      "Islands are never counted, since Lighthouse audits only static HTML output"
    ],
    "answerIdx": 2
  },
  {
    "stem": "A site shows a search box that only matters after the user clicks. Which strategy fits?",
    "topic": "When to use an island",
    "choices": [
      "client:load, since nothing else works",
      "client:only on the footer",
      "client:idle or client:visible, to avoid blocking the load",
      "No directive, since search needs no JavaScript"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to keep an interactive widget accessible when its JavaScript has not loaded?",
    "topic": "When to use an island",
    "choices": [
      "Render meaningful static HTML first, then enhance it",
      "Hide the widget until JavaScript loads",
      "Show a loading spinner forever",
      "Replace it with an image"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How would you decide between React and a lighter option for an island?",
    "topic": "When to use an island",
    "choices": [
      "Weigh the interactivity needed against the runtime cost",
      "Always pick the framework with the most stars, since popularity predicts size",
      "Use whichever framework renders the least HTML on the server for the page",
      "Pick the one with the longest documentation, which tells you more"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common mistake when adopting islands?",
    "topic": "When to use an island",
    "choices": [
      "Using too few client directives on static content",
      "Placing islands inside the layout",
      "Hydrating large components that could be mostly static",
      "Writing islands in TypeScript"
    ],
    "answerIdx": 2
  }
]
```

LAYER: astro-dev-6

```json
[
  {
    "stem": "What is the idea behind Tailwind CSS?",
    "topic": "Tailwind integration",
    "choices": [
      "Utility classes applied directly in markup",
      "A set of prebuilt components with fixed designs and Sass variables",
      "A JavaScript library that styles elements at runtime in the browser",
      "A preprocessor that compiles nested rules into plain CSS files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Tailwind v4 usually plug into an Astro project?",
    "topic": "Tailwind integration",
    "choices": [
      "With a PostCSS plugin that Astro requires for every project",
      "With a script tag that loads Tailwind from a CDN in the layout",
      "With the @tailwindcss/vite plugin",
      "With a custom Astro component named Tailwind in the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command adds Tailwind to an Astro project?",
    "topic": "Tailwind integration",
    "choices": [
      "npm run tailwind --install-in-astro",
      "astro init --css=tailwind-only",
      "npx tailwind astro-setup",
      "npx astro add tailwind"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which line makes Tailwind v4 available in your global stylesheet?",
    "topic": "Tailwind integration",
    "choices": [
      "@tailwind-all { enabled: true }",
      "@use 'tailwind' with ($mode: 'full');",
      "@import 'tailwindcss';",
      "<link rel='tailwindcss'>"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should the global stylesheet that imports Tailwind be loaded?",
    "topic": "Tailwind integration",
    "choices": [
      "In every single component, with a duplicate import each time",
      "In the public folder, where Astro skips it",
      "Only on the home page",
      "In a shared layout, so every page gets it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Tailwind decide which CSS to generate?",
    "topic": "Tailwind integration",
    "choices": [
      "It generates every class it knows and ships all of them",
      "It reads the browser's computed styles after the page loads",
      "It scans your source files for class names and creates only the ones used",
      "It asks the server for the list of used classes at runtime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does a class built as `bg-${color}-500` often fail to be generated?",
    "topic": "Tailwind integration",
    "choices": [
      "Template strings are not allowed inside .astro files by the compiler",
      "The color value is only read at the end of the build",
      "Tailwind deletes any class that contains a number in its name",
      "The scanner looks for complete class names in source files"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the safe way to apply a conditional color class?",
    "topic": "Tailwind integration",
    "choices": [
      "Write full class names and choose between them",
      "Build the class from fragments with a template literal, such as bg-${color}-500",
      "Store the class names in a database and load them when the page renders",
      "Use a CSS variable to name the class so Tailwind reads it at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the arbitrary value syntax w-[137px] allow?",
    "topic": "Tailwind integration",
    "choices": [
      "A one-off value that is not in the default scale",
      "A width that changes at each breakpoint",
      "A width defined in a separate config file",
      "A width taken from the parent element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Preflight in Tailwind?",
    "topic": "Tailwind integration",
    "choices": [
      "A base layer of resets and defaults applied to your page",
      "A command that checks your classes for typos before the build",
      "A plugin that preloads fonts before the page renders",
      "A tool that publishes the build to a CDN"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which breakpoint prefix applies styles at a viewport of 768px and wider by default?",
    "topic": "Responsive utilities",
    "choices": [
      "sm:",
      "lg:",
      "md:",
      "xl:"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do unprefixed utilities such as p-4 behave in Tailwind?",
    "topic": "Responsive utilities",
    "choices": [
      "They apply only on screens narrower than the first breakpoint",
      "They apply only on desktop screens",
      "They apply only when the page is printed",
      "They apply at every screen size, starting from the smallest"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the class 'text-sm md:text-lg' do?",
    "topic": "Responsive utilities",
    "choices": [
      "Uses a large size on small screens and a small size from md upward",
      "Applies both sizes at once on every screen",
      "Uses a small size by default and a large size from md upward",
      "Applies only on screens exactly as wide as md"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which approach does Tailwind's responsive design follow?",
    "topic": "Responsive utilities",
    "choices": [
      "Desktop-first, using max-width breakpoints",
      "Device-detection through the user agent string",
      "Server-side detection of the screen size",
      "Mobile-first, using min-width breakpoints"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you hide an element on small screens and show it from lg upward?",
    "topic": "Responsive utilities",
    "choices": [
      "lg:hidden block",
      "hidden lg:block",
      "small:none lg:visible",
      "hide-sm show-lg"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the container class do in Tailwind?",
    "topic": "Responsive utilities",
    "choices": [
      "Sets a max-width that matches the current breakpoint",
      "Wraps the element in a flex layout automatically",
      "Adds a border around the element",
      "Centers the element's text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which utilities create a three-column grid at md and above?",
    "topic": "Responsive utilities",
    "choices": [
      "grid-3-md, which sets three grid columns from the md breakpoint",
      "columns-md-3, which splits the content into three CSS columns",
      "grid md:grid-cols-3",
      "md:flex-cols-3, which creates a flex row with three equal items"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you apply a style only on hover?",
    "topic": "Responsive utilities",
    "choices": [
      "Use the hover: variant, like hover:bg-blue-600",
      "Add an onhover attribute to the element",
      "Write a JavaScript mouseover handler",
      "Use the :hover class name directly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the group and group-hover pair do?",
    "topic": "Responsive utilities",
    "choices": [
      "Groups several classes into one",
      "Styles a child when its parent is hovered",
      "Adds a hover state to the whole page",
      "Applies hover styles to the body element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the focus-visible: variant target?",
    "topic": "Responsive utilities",
    "choices": [
      "Every element that is clicked with a mouse",
      "Elements that are scrolled into view by the visitor's navigation",
      "Elements that are hidden on the page until they receive focus",
      "Elements focused in a way the browser shows focus"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which variant applies styles when the user's system is in dark mode by default?",
    "topic": "Dark mode",
    "choices": [
      "dark:",
      "night:",
      "theme-dark:",
      "scheme:"
    ],
    "answerIdx": 0
  },
  {
    "stem": "By default, what does Tailwind's dark: variant rely on?",
    "topic": "Dark mode",
    "choices": [
      "A dark class on the html element",
      "A cookie that stores the visitor's theme",
      "A JavaScript timer",
      "The prefers-color-scheme media query"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you switch to a manual theme toggle based on a class in Tailwind v4?",
    "topic": "Dark mode",
    "choices": [
      "Rename the dark: prefix in tailwind.config.js, which v4 still reads by default",
      "Redefine the dark variant with @custom-variant for a .dark ancestor",
      "Add a media attribute to the html tag so the variant checks that value",
      "Include a second stylesheet named dark.css that Tailwind swaps in"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do many sites put a small inline script in the head to set the theme?",
    "topic": "Dark mode",
    "choices": [
      "It sets the theme before first paint, avoiding a flash",
      "It loads the dark mode stylesheet over the network after the page is shown",
      "It lets the server render the right theme for every visitor on request",
      "It stops the page from being cached"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is a visitor's chosen theme usually stored?",
    "topic": "Dark mode",
    "choices": [
      "In localStorage, read by the inline script",
      "In a variable inside the component script",
      "In the page's title",
      "In the sitemap"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does color-scheme: dark do for built-in controls?",
    "topic": "Dark mode",
    "choices": [
      "Switches all Tailwind colors to dark ones",
      "Makes form controls and scrollbars use dark rendering",
      "Sets the page background to black",
      "Loads the dark mode script"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which approach keeps dark mode maintainable across a large design?",
    "topic": "Dark mode",
    "choices": [
      "Semantic color tokens as CSS variables that change per theme",
      "A dark: class added to every element individually",
      "A duplicate of every page for the dark theme, kept in sync by hand",
      "Images for all backgrounds, so that no color values are needed at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How would you write a card that is white in light mode and slate-900 in dark mode?",
    "topic": "Dark mode",
    "choices": [
      "bg-white dark:bg-slate-900",
      "bg-white bg-slate-900:dark",
      "bg-white|slate-900",
      "dark-bg-slate-900 bg-white"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to dark: styles when JavaScript is disabled and you use the media-query strategy?",
    "topic": "Dark mode",
    "choices": [
      "They stop working entirely, because Tailwind toggles dark styles with scripts",
      "They apply only to text elements, because other properties need JavaScript",
      "They still apply, since the media query needs no JavaScript",
      "They apply only to images, since those are loaded without scripts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What accessibility check matters when you add dark mode?",
    "topic": "Dark mode",
    "choices": [
      "Only the contrast of the light theme",
      "The file size of the images",
      "Contrast ratios in both themes",
      "The number of CSS classes used"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to reuse a set of Tailwind classes?",
    "topic": "Reusable styled components",
    "choices": [
      "Copy and paste the class string everywhere",
      "Write them in the Tailwind config as a macro",
      "Store them in the page URL",
      "Wrap them in an Astro component, such as Button.astro"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a component accept additional classes from its parent?",
    "topic": "Reusable styled components",
    "choices": [
      "Use the style attribute for every override",
      "Declare the classes in public/",
      "Repeat the component for each variant",
      "Read a class prop and merge it with class:list"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the Tailwind team's view on heavy use of @apply?",
    "topic": "Reusable styled components",
    "choices": [
      "Use @apply for every element to keep markup short",
      "@apply is required for every custom class",
      "@apply cannot be used in Astro projects",
      "Prefer components over @apply for reuse, using @apply sparingly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which pair of packages is often used to merge conditional Tailwind classes safely?",
    "topic": "Reusable styled components",
    "choices": [
      "react and react-dom",
      "clsx and tailwind-merge",
      "zod and mongoose",
      "vite and rollup"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What problem does tailwind-merge solve?",
    "topic": "Reusable styled components",
    "choices": [
      "Resolves conflicting utilities in one class string",
      "Compresses the generated CSS file by merging identical rules together",
      "Checks the markup for accessibility problems before the build ends",
      "Splits the generated CSS into smaller chunks for each page route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you give a Button component different variants?",
    "topic": "Reusable styled components",
    "choices": [
      "Create a separate page for each variant",
      "Map a variant prop to a set of class strings",
      "Edit the Tailwind source code",
      "Change the browser defaults"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep a Button component's markup semantic?",
    "topic": "Reusable styled components",
    "choices": [
      "So it works for keyboard and screen reader users",
      "So it loads before other components",
      "So it is hidden from search engines",
      "So it can be styled only through JavaScript"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where might shared UI components live in an Astro project?",
    "topic": "Reusable styled components",
    "choices": [
      "In public/ui, where Astro processes them like any other source file",
      "In astro.config.mjs, as a list of components that pages can use",
      "In node_modules, next to the packages that the project installs",
      "In src/components/ui or a similar folder"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of defining components with a fixed set of props, like size and variant?",
    "topic": "Reusable styled components",
    "choices": [
      "Smaller HTML output in every case, because props are compressed",
      "No need for a design system, since props already define the tokens",
      "Consistent usage and fewer one-off styles",
      "Automatic translation of the labels into the visitor's language"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @layer components { ... } do in Tailwind CSS?",
    "topic": "Reusable styled components",
    "choices": [
      "Creates a new Astro component from the CSS rules written inside the block",
      "Places custom classes in the components layer, below utilities",
      "Defines a route that serves the component from a separate URL",
      "Loads a script from a CDN before the stylesheet is applied"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which plugin styles rendered Markdown content with sensible defaults?",
    "topic": "Typography for content",
    "choices": [
      "@tailwindcss/markdown-engine",
      "@tailwindcss/typography",
      "astro-prose-compiler",
      "tailwind-content-fixer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which class applies typography styles to a block of rendered content?",
    "topic": "Typography for content",
    "choices": [
      "markdown",
      "prose",
      "content-body",
      "rich-text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does rendered Markdown need extra styling when Tailwind's Preflight is on?",
    "topic": "Typography for content",
    "choices": [
      "Markdown generates no HTML tags",
      "Preflight deletes paragraphs",
      "Tailwind blocks Markdown files",
      "Preflight removes default heading and list styles"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you enable the typography plugin in Tailwind v4 CSS?",
    "topic": "Typography for content",
    "choices": [
      "@use 'typography';",
      "@plugin '@tailwindcss/typography';",
      "@include prose;",
      "@import typography from 'tailwind';"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which modifier makes prose text readable on a dark background?",
    "topic": "Typography for content",
    "choices": [
      "prose-dark-only, which swaps the default prose colors permanently",
      "invert-prose, which flips the colors of images inside the content",
      "dark:prose-invert",
      "prose:dark, which applies the prose styles only in a dark scheme"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which elements does the typography plugin style inside a .prose container?",
    "topic": "Typography for content",
    "choices": [
      "Only headings, because other elements use the Preflight defaults",
      "Headings, paragraphs, lists, links and blockquotes",
      "Only the elements that carry a utility class added by hand",
      "Only code blocks, which need syntax colors from the plugin"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which unit helps to keep line length comfortable for reading?",
    "topic": "Typography for content",
    "choices": [
      "px only, as a fixed number",
      "ch, in a max-width like max-w-prose",
      "vh for the container height",
      "em for the border width"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is line height an important part of typography for content?",
    "topic": "Typography for content",
    "choices": [
      "It makes the page load faster, because the browser skips line wrapping",
      "It changes the font family used for the paragraphs of the page",
      "Adequate spacing makes long text easier to read",
      "It controls the color of the text inside each paragraph"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you override a single element's styles inside prose content?",
    "topic": "Typography for content",
    "choices": [
      "Use a modifier like prose-h2:text-xl or a not-prose wrapper",
      "Avoid Markdown and write HTML, which prose cannot affect in any way",
      "Edit the plugin source in node_modules and rebuild the stylesheet",
      "Write inline styles inside the Markdown file for each element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the not-prose class do?",
    "topic": "Typography for content",
    "choices": [
      "Turns off Markdown parsing",
      "Excludes an element from the typography styles",
      "Removes all CSS from the page",
      "Hides the element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a design token?",
    "topic": "Design tokens",
    "choices": [
      "A secret key used to call a design API from the build step",
      "A named value for a design decision, such as a color",
      "A type of JavaScript module that exports reusable components",
      "A browser extension that lets designers inspect spacing on live pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How are tokens defined in Tailwind v4?",
    "topic": "Design tokens",
    "choices": [
      "In a tokens.json file read by the browser",
      "In package.json under a design key",
      "In the HTML head as meta tags",
      "In a @theme block as CSS variables"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does --color-brand: #6d28d9 inside @theme create?",
    "topic": "Design tokens",
    "choices": [
      "A variable that works only inside JavaScript",
      "A new HTML element named brand",
      "Utilities like bg-brand and text-brand",
      "A font family named brand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are tokens better than hard-coded hex values scattered in markup?",
    "topic": "Design tokens",
    "choices": [
      "They make the page render faster",
      "They remove the need for CSS",
      "One change updates the whole site",
      "They work only in dark mode"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do semantic tokens help theming?",
    "topic": "Design tokens",
    "choices": [
      "They block the use of Tailwind's default colors across the whole site",
      "They are stored on the server and sent to the browser in a header",
      "They only apply to images, because other elements use utility classes",
      "Names like --color-surface can map to different values per theme"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which scale should spacing follow in a design system?",
    "topic": "Design tokens",
    "choices": [
      "A consistent scale, such as multiples of 4px",
      "A random value per component",
      "Only whole pixel values that are prime numbers",
      "Whatever value looks right on one screen"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main purpose of a design system?",
    "topic": "Design tokens",
    "choices": [
      "Reduce the number of pages so that visitors have fewer places to get lost",
      "Replace the need for testing, because every component is already verified",
      "Keep the interface consistent with shared tokens and components",
      "Generate the written content of the site from the design rules"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should token definitions normally live?",
    "topic": "Design tokens",
    "choices": [
      "Repeated at the top of each component",
      "In the browser's local storage",
      "In one central stylesheet imported by the layout",
      "In each Markdown file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of letting teams use any arbitrary value, like w-[137px], everywhere?",
    "topic": "Design tokens",
    "choices": [
      "The build fails",
      "The design drifts away from the shared scale",
      "The CSS stops loading",
      "The page cannot use dark mode"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How would you change the base font for the whole site using tokens?",
    "topic": "Design tokens",
    "choices": [
      "Edit each heading separately",
      "Add a font-family to every component",
      "Use the font tag in HTML",
      "Set the --font-sans token in the theme"
    ],
    "answerIdx": 3
  }
]
```

LAYER: astro-dev-7

```json
[
  {
    "stem": "What is the default output mode of an Astro project?",
    "topic": "Static versus server output",
    "choices": [
      "server, where every page renders on each request",
      "hybrid, where the browser decides which pages to prerender",
      "static",
      "edge, where every page is rendered on a CDN node"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a static Astro build produce?",
    "topic": "Static versus server output",
    "choices": [
      "A Node server that must stay running to answer requests",
      "HTML, CSS and JS files that any static host can serve",
      "A database dump of every page for later import",
      "A set of serverless functions, one per route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is server output the better choice than static output?",
    "topic": "Static versus server output",
    "choices": [
      "When the site is a blog that changes a few times a month",
      "When the site has fewer than ten pages",
      "When you want the smallest possible hosting bill",
      "When pages depend on per-request data such as the logged-in user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "With an adapter installed, how can a single page opt out of prerendering?",
    "topic": "Static versus server output",
    "choices": [
      "export const prerender = false;",
      "Add a dynamic: true flag to the page's frontmatter",
      "Rename the file with a .server.astro extension",
      "Move the file into a src/ssr folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "With output: 'server', how can a page opt in to being prerendered at build time?",
    "topic": "Static versus server output",
    "choices": [
      "Add a static attribute to the <html> tag",
      "Move the file into the public folder",
      "Call prerender() in the template",
      "export const prerender = true;"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an advantage of static output?",
    "topic": "Static versus server output",
    "choices": [
      "It can be cached on a CDN and has no server to maintain",
      "It can read the visitor's cookies on each request",
      "It allows pages to change without a new build",
      "It can respond to POST requests by default"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of on-demand rendering?",
    "topic": "Static versus server output",
    "choices": [
      "Pages cannot use layouts, because layouts are resolved only at build time",
      "Pages cannot include images",
      "Pages lose their styles, since CSS is bundled only for static pages",
      "Each request runs server code, costing time and compute"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 'prerendering' mean in Astro?",
    "topic": "Static versus server output",
    "choices": [
      "Loading a page's HTML in the background for the next click",
      "Rendering a page in the browser before the user asks for it",
      "Building a page's HTML ahead of time, during the build",
      "Caching a page on the server after the first request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which output mode do you use when almost every page is dynamic?",
    "topic": "Static versus server output",
    "choices": [
      "static with no adapter",
      "server",
      "a custom output called dynamic",
      "none, since a static host handles it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can a site mix static and dynamic pages?",
    "topic": "Static versus server output",
    "choices": [
      "Only the home page may be static",
      "Each page can choose whether it is prerendered",
      "Astro splits each page into two files",
      "Dynamic pages are copied from static ones at runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an adapter do in Astro?",
    "topic": "Adapters and SSR",
    "choices": [
      "Converts Astro components into React components",
      "Adds Tailwind to the project",
      "Connects the project to a CMS",
      "Prepares the build to run on a specific host or runtime"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which of these is an official Astro adapter?",
    "topic": "Adapters and SSR",
    "choices": [
      "@astrojs/node",
      "@astrojs/express-router",
      "@astrojs/php-bridge",
      "@astrojs/mongo"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command adds the Node adapter to a project?",
    "topic": "Adapters and SSR",
    "choices": [
      "npm run adapter --node",
      "astro set adapter node",
      "npx astro add node",
      "npx astro init server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do the Node adapter's 'standalone' and 'middleware' modes mean?",
    "topic": "Adapters and SSR",
    "choices": [
      "Standalone is for development and middleware is for production",
      "Standalone renders static pages and middleware renders dynamic ones",
      "They only change the log level",
      "Standalone starts its own server, while middleware plugs into another Node server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you try to build SSR pages without an adapter?",
    "topic": "Adapters and SSR",
    "choices": [
      "The build fails because Astro needs an adapter for on-demand pages",
      "The pages are built as static files with no warning",
      "Astro installs an adapter on its own",
      "The pages are rendered in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you configure the adapter?",
    "topic": "Adapters and SSR",
    "choices": [
      "In a separate adapter.json file",
      "In astro.config.mjs under the adapter option",
      "In the page frontmatter",
      "In the layout head"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can an SSR page read that a static page cannot?",
    "topic": "Adapters and SSR",
    "choices": [
      "The project's package.json at runtime",
      "The visitor's local files",
      "The CSS of other pages",
      "The incoming request, such as headers and cookies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which adapter fits a deployment on Netlify?",
    "topic": "Adapters and SSR",
    "choices": [
      "@astrojs/netlify",
      "@astrojs/vercel",
      "@astrojs/cloudflare",
      "@astrojs/node"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is the SSR code executed on a serverless adapter?",
    "topic": "Adapters and SSR",
    "choices": [
      "In the visitor's browser",
      "In the Git hosting platform",
      "In the package manager",
      "In serverless functions that run on demand"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which global gives an SSR page the incoming Request object?",
    "topic": "Adapters and SSR",
    "choices": [
      "Astro.page",
      "window.request",
      "Astro.client",
      "Astro.request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do API endpoints live in an Astro project?",
    "topic": "API endpoints",
    "choices": [
      "In src/pages, as .js or .ts files",
      "In src/api, which Astro compiles separately",
      "In the public folder",
      "In astro.config.mjs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which file creates an endpoint at /api/hello.json?",
    "topic": "API endpoints",
    "choices": [
      "src/pages/api/hello.json.ts",
      "src/api/hello.json.astro",
      "src/pages/hello/json.api",
      "public/api/hello.json.ts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle a GET request in an endpoint?",
    "topic": "API endpoints",
    "choices": [
      "Export a function named GET",
      "Export a default function named handler",
      "Export an object with a method key",
      "Call router.get() at the top of the file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must an endpoint handler return?",
    "topic": "API endpoints",
    "choices": [
      "A plain JavaScript object",
      "A string of JSON",
      "A promise for the next route",
      "A Response object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you return JSON from an endpoint?",
    "topic": "API endpoints",
    "choices": [
      "Return json(data), a helper that Astro imports from astro:server automatically",
      "Return new Response(JSON.stringify(data)) with a JSON Content-Type",
      "Call res.send(data), as in an Express handler, and Astro serializes it",
      "Return new JsonResponse(data), which sets the right headers for you"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does an endpoint file named data.json.ts behave in a static build?",
    "topic": "API endpoints",
    "choices": [
      "It is ignored by the build",
      "It is run at build time and writes /data.json",
      "It runs in the browser",
      "It becomes an HTML page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What do you need to handle POST requests in an endpoint with static default output?",
    "topic": "API endpoints",
    "choices": [
      "Nothing extra, since POST handlers work on every static host",
      "export const prerender = false; plus an adapter",
      "A <form> tag in the layout, which Astro turns into a handler",
      "A script tag in the head that forwards the request to a function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which status code means 'method not allowed'?",
    "topic": "API endpoints",
    "choices": [
      "404",
      "403",
      "405",
      "301"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What status should an endpoint return for invalid input?",
    "topic": "API endpoints",
    "choices": [
      "200",
      "302",
      "400",
      "500"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does export const ALL do in an endpoint?",
    "topic": "API endpoints",
    "choices": [
      "Handles any method that has no specific handler",
      "Lists every route in the project so that tools can inspect them",
      "Runs all registered middleware for the endpoint in order",
      "Prerenders all pages that the endpoint file links to"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you submit a form to the same page for server handling?",
    "topic": "Handling form submissions",
    "choices": [
      "A <form> with a javascript: action that calls the page's server function",
      "A hidden iframe that loads the page and sends the fields in its URL",
      "A <form method='POST'> and a check of Astro.request.method",
      "A <form> with method='STREAM', which Astro routes to the page script"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read submitted form fields in a page or endpoint?",
    "topic": "Handling form submissions",
    "choices": [
      "request.body.fields",
      "await request.formData()",
      "document.forms[0]",
      "Astro.form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are Astro Actions?",
    "topic": "Handling form submissions",
    "choices": [
      "Buttons that trigger CSS animations defined in the component's style block",
      "Type-safe server functions you can call from pages and forms",
      "A plugin for image processing that runs after each production build",
      "Scheduled jobs that rebuild the site whenever content changes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you define actions?",
    "topic": "Handling form submissions",
    "choices": [
      "In src/actions/index.ts",
      "In public/actions.json",
      "In each page's frontmatter",
      "In astro.config.mjs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which function declares an action?",
    "topic": "Handling form submissions",
    "choices": [
      "createAction()",
      "registerAction()",
      "defineAction()",
      "makeServerFunction()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do actions validate their input?",
    "topic": "Handling form submissions",
    "choices": [
      "With a Zod schema in the input option",
      "With HTML attributes only",
      "With a regular expression on the URL",
      "They do not validate input"
    ],
    "answerIdx": 0
  },
  {
    "stem": "After handling a POST, which response is common to avoid resubmitting on refresh?",
    "topic": "Handling form submissions",
    "choices": [
      "A 200 page with the same form again",
      "An empty 204 response",
      "A 500 error",
      "A redirect, such as Astro.redirect('/thanks', 303)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must you validate form data on the server even if the browser already did?",
    "topic": "Handling form submissions",
    "choices": [
      "Browsers do not support validation",
      "The server cannot read the form otherwise",
      "Client checks can be bypassed by anyone sending a request",
      "Validation is only for accessibility"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What setting helps to block cross-site form submissions in Astro?",
    "topic": "Handling form submissions",
    "choices": [
      "security.checkOrigin, comparing the request origin",
      "The disableForms option, which rejects every POST not sent by a script",
      "A CSS rule on the form that hides it from pages on other sites",
      "The prefetch option, which blocks links that other sites trigger"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a form work without client-side JavaScript?",
    "topic": "Handling form submissions",
    "choices": [
      "A fetch call inside an island, which the browser runs on submit",
      "A native <form> with method and action attributes",
      "A WebSocket connection that carries the fields to the server",
      "It cannot work, since forms always need a client script to submit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the query string in an SSR page?",
    "topic": "Reading request data",
    "choices": [
      "Astro.query.string",
      "window.location.search",
      "Astro.request.search",
      "Astro.url.searchParams"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a request header?",
    "topic": "Reading request data",
    "choices": [
      "Astro.request.headers.get('user-agent')",
      "Astro.headers.user-agent",
      "request.header['user-agent']",
      "document.headers.get('user-agent')"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a cookie in an SSR page?",
    "topic": "Reading request data",
    "choices": [
      "Astro.cookies.get('session')?.value",
      "document.cookie in the component script",
      "Astro.request.cookie.session",
      "window.cookies.session"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you set a cookie from an SSR page?",
    "topic": "Reading request data",
    "choices": [
      "document.cookie = 'theme=dark'",
      "Astro.setCookie('theme', 'dark')",
      "Astro.cookies.set('theme', 'dark')",
      "localStorage.setItem('theme', 'dark')"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read a JSON body in an endpoint?",
    "topic": "Reading request data",
    "choices": [
      "request.body",
      "await request.json()",
      "JSON.parse(request.url)",
      "await Astro.json()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you get route params in an endpoint?",
    "topic": "Reading request data",
    "choices": [
      "From window.location, which Astro fills in before the endpoint runs",
      "From the request body, where the router copies each path segment",
      "From the params property of the handler's argument",
      "From Astro.cookies, where dynamic segments are stored per visitor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of middleware (src/middleware.ts)?",
    "topic": "Reading request data",
    "choices": [
      "Compresses images at build time before pages are generated",
      "Replaces the layout of every page with a shared wrapper",
      "Creates new routes from the exports of other pages",
      "Runs code before pages and endpoints handle a request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which object lets middleware pass data to pages and endpoints?",
    "topic": "Reading request data",
    "choices": [
      "window.state",
      "process.env",
      "context.locals",
      "Astro.cache"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which header would you set to let a CDN cache an SSR response?",
    "topic": "Reading request data",
    "choices": [
      "X-Frame-Options",
      "Cache-Control",
      "Set-Cookie",
      "Content-Type"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should you never trust data from a request?",
    "topic": "Reading request data",
    "choices": [
      "It can be forged or malformed by a client",
      "It is always encrypted",
      "It is cached by the browser",
      "Astro rewrites it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are environment variables exposed to client code in Astro?",
    "topic": "Environment variables",
    "choices": [
      "All variables in .env",
      "Variables that start with an underscore",
      "Only variables prefixed with PUBLIC_",
      "None, they are never exposed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you read an environment variable in the server code?",
    "topic": "Environment variables",
    "choices": [
      "window.env.MY_SECRET",
      "import.meta.env.MY_SECRET",
      "Astro.env.get('MY_SECRET')",
      "require('env').MY_SECRET"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does astro:env provide?",
    "topic": "Environment variables",
    "choices": [
      "A browser extension that edits variables while the dev server runs",
      "A way to rename the .env file for each deployment environment",
      "A cloud store that holds secrets and syncs them to the host",
      "Typed, validated environment variables from a config schema"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does astro:env mark a variable as server-only and secret?",
    "topic": "Environment variables",
    "choices": [
      "With a SECRET_ prefix on the variable",
      "context: 'server' and access: 'secret' in envField",
      "By placing it in the public folder",
      "With a comment in .env"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which file should hold local secrets and be excluded from Git?",
    "topic": "Environment variables",
    "choices": [
      "astro.config.mjs",
      "package.json",
      "A .env file listed in .gitignore",
      "README.md"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the danger of PUBLIC_ variables?",
    "topic": "Environment variables",
    "choices": [
      "They are slower to read than other variables, since they are fetched at runtime",
      "They cannot be changed after the first deploy of the project",
      "Their values are visible to anyone who views the page code",
      "They are removed in production builds, so pages lose those values"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where are environment variables set for a deployed site?",
    "topic": "Environment variables",
    "choices": [
      "In the browser console, before the first request reaches the site",
      "In the hosting provider's dashboard or settings",
      "In the sitemap, which hosts read when they create a deployment",
      "In public/env.txt, which the host loads at start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a schema for environment variables?",
    "topic": "Environment variables",
    "choices": [
      "It makes the build smaller, because unused variables are removed from it",
      "It encrypts the values so that they cannot be read from the host",
      "Missing or malformed values fail early with a clear error",
      "It sets the port number that the server listens on in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical mistake with secrets in Astro?",
    "topic": "Environment variables",
    "choices": [
      "Storing secrets in .env",
      "Using a different value per environment",
      "Rotating keys regularly",
      "Reading a secret in a client island, which exposes it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which value is safe to expose with a PUBLIC_ prefix?",
    "topic": "Environment variables",
    "choices": [
      "A database password",
      "A private API key",
      "A signing secret",
      "A publishable analytics site ID"
    ],
    "answerIdx": 3
  }
]
```

LAYER: astro-dev-8

```json
[
  {
    "stem": "Where do you fetch data from an external API in an Astro page?",
    "topic": "Fetching from external APIs",
    "choices": [
      "In the component script, with fetch and top-level await",
      "Inside the HTML head with a script tag only",
      "In astro.config.mjs for every page",
      "In the public folder at build time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does a fetch in the component script of a static page run?",
    "topic": "Fetching from external APIs",
    "choices": [
      "On every visitor's page view",
      "At build time, once",
      "Each time the visitor scrolls",
      "Only in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of fetching a remote API at build time?",
    "topic": "Fetching from external APIs",
    "choices": [
      "The data is only as fresh as the last build",
      "The data is always fetched twice",
      "The data cannot be shown in HTML",
      "The fetch runs in the visitor's browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a statically built site show fresher data?",
    "topic": "Fetching from external APIs",
    "choices": [
      "Rebuild on a schedule or webhook, or use SSR",
      "Move the site to a bigger server",
      "Disable caching in the visitor's browser so each page view refetches the API",
      "Switch to a different CSS framework that supports live data refreshes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you check after calling fetch()?",
    "topic": "Fetching from external APIs",
    "choices": [
      "That the body is non-empty",
      "response.ok or the status, before reading the body",
      "That the request used HTTPS only, because fetch cannot send plain HTTP",
      "That the DOM is ready, since fetch waits for DOMContentLoaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read JSON from a fetch response?",
    "topic": "Fetching from external APIs",
    "choices": [
      "response.body.toJSON()",
      "JSON.read(response)",
      "await response.json()",
      "await response.parse()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to handle a failing API during the build?",
    "topic": "Fetching from external APIs",
    "choices": [
      "Ignore the error and hope",
      "Catch the error and fall back to safe defaults or fail the build clearly",
      "Retry forever",
      "Delete the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why avoid fetching the same API repeatedly on many pages during the build?",
    "topic": "Fetching from external APIs",
    "choices": [
      "It causes CSS to break",
      "It disables TypeScript",
      "It prevents sitemap generation",
      "It slows the build and may hit rate limits"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you share fetched data between pages in one build?",
    "topic": "Fetching from external APIs",
    "choices": [
      "Store it in a cookie that every page reads during the build",
      "Put the fetch in a shared module and reuse its result",
      "Save it in localStorage so each page can read it when it is built",
      "Assign it to a window variable that later pages pick up"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do with an API key used during fetch?",
    "topic": "Fetching from external APIs",
    "choices": [
      "Keep it in a server-side environment variable",
      "Put it in the page markup",
      "Store it in a public script",
      "Send it in the URL of every link"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a headless CMS?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "A CMS that has no database and stores all content in static Markdown files",
      "A backend that serves content over an API with no front end",
      "A CMS that runs only in the browser and cannot be reached by a build step",
      "A CMS that cannot store images or other files and only holds plain text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which of these is a headless CMS you can connect to Astro?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "Photoshop",
      "Contentful",
      "Nginx",
      "Docker"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Astro usually get content from a headless CMS?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "By copying the CMS database into public",
      "By embedding the CMS admin in an iframe",
      "By installing the CMS as a browser extension",
      "By calling its API from the component script or a loader"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of a headless CMS for editors?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "They can change the site's JavaScript",
      "They can deploy to production directly from Markdown",
      "They edit in a friendly interface without touching code",
      "They can set the server's DNS"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a content change in the CMS update a static Astro site?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "The browser fetches new HTML directly",
      "The CMS edits the Astro files",
      "The CDN rebuilds without notice",
      "A webhook triggers a new build"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a CMS webhook do?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "Sends an email to each visitor whenever a published page is edited",
      "Rewrites the CSS of the site so that new content matches the old design",
      "Encrypts the content so that only the build server can read it",
      "Sends an HTTP request to a URL when content changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which credential does a client typically need for a CMS's read-only content API?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "An access token for the delivery API",
      "The CMS admin password",
      "The editor's email address",
      "A browser cookie"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are CMS images often served from the CMS's own CDN?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "They cannot be stored elsewhere",
      "They load without HTTP",
      "They are always smaller than 1KB",
      "They are resized and cached close to the visitor"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice for CMS content models?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "Match the fields to the types in your Astro schema",
      "Use one large text field for everything and parse it in the template",
      "Leave fields unnamed so editors can add whatever they need freely",
      "Keep all content in one entry so that the build makes a single request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can happen when CMS content changes shape but your code does not?",
    "topic": "Connecting a headless CMS",
    "choices": [
      "The CMS fixes your code",
      "The browser updates the schema",
      "Pages may break or show missing fields",
      "Nothing, ever"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a content loader in Astro 5?",
    "topic": "Content loaders",
    "choices": [
      "A function that fetches data and stores it as entries",
      "A loading spinner component that is shown while a collection page renders",
      "A browser API that lazy-loads Markdown files when they scroll into view",
      "A CSS file loader that inlines stylesheets for every entry in a collection"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which built-in loader reads a single file such as a JSON list?",
    "topic": "Content loaders",
    "choices": [
      "glob()",
      "read()",
      "single()",
      "file()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which built-in loader reads many Markdown files by pattern?",
    "topic": "Content loaders",
    "choices": [
      "file()",
      "glob()",
      "scan()",
      "list()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you load content from a remote API into a collection?",
    "topic": "Content loaders",
    "choices": [
      "Rename the API URL to .md",
      "Write an inline loader or a custom loader that fetches and stores entries",
      "Copy the API into public",
      "Use a browser extension"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a custom loader hand entries to the content layer?",
    "topic": "Content loaders",
    "choices": [
      "It returns a React component that the page imports and renders as an island",
      "It writes a Markdown file per entry into src/pages before the build begins",
      "It exports a route list that Astro uses to create the matching pages",
      "It calls store.set() with an id and data for each entry"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of loading remote data into a collection?",
    "topic": "Content loaders",
    "choices": [
      "The data is hidden from the schema",
      "The data skips the build and is fetched fresh by each visitor's browser",
      "The data is stored in the browser so repeat visits never call the API",
      "Typed, queryable data through the same getCollection API"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does the content layer cache loaded data?",
    "topic": "Content loaders",
    "choices": [
      "It never caches anything, so every build refetches all data from scratch",
      "It uploads the data to the visitor's browser cache on the first visit",
      "It deletes the data on each build to make sure nothing is stale",
      "It stores it between builds to speed up later ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the loader's schema option do?",
    "topic": "Content loaders",
    "choices": [
      "Renames the collection",
      "Creates a database",
      "Sets the route",
      "Validates and types each loaded entry"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you register a loader?",
    "topic": "Content loaders",
    "choices": [
      "In astro.config.mjs under a loaders key",
      "In the collection definition in src/content.config.ts",
      "In the layout",
      "In public/loaders.json"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why choose a loader over fetching inside each page?",
    "topic": "Content loaders",
    "choices": [
      "One definition keeps data typed, cached and reusable",
      "Loaders make pages dynamic",
      "Loaders remove the need for a schema",
      "Loaders only work for images"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Astro component optimizes images?",
    "topic": "Image handling and optimization",
    "choices": [
      "<img> with the astro attribute",
      "<Picture> from the browser",
      "<Image /> from astro:assets",
      "<Optimize />"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Image component do with a local imported image?",
    "topic": "Image handling and optimization",
    "choices": [
      "Resizes, converts the format and sets width and height",
      "Uploads it to a CDN and swaps the src for the CDN address at runtime",
      "Converts it to a Base64 string and inlines it into the HTML page",
      "Leaves it unchanged and only adds a lazy-loading attribute to the tag"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does Astro set width and height on optimized images?",
    "topic": "Image handling and optimization",
    "choices": [
      "To make the image larger than its container for a sharper display",
      "To prevent layout shift while the image loads",
      "To disable lazy loading, because sized images always load at once",
      "To change the file format to the one with the smallest size"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should local images live to be processed by Astro?",
    "topic": "Image handling and optimization",
    "choices": [
      "In public",
      "In node_modules",
      "In src, such as src/assets",
      "In dist"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to an image placed in public/?",
    "topic": "Image handling and optimization",
    "choices": [
      "It is resized automatically",
      "It is converted to WebP",
      "It is served as is, without optimization",
      "It is removed from the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which attribute improves loading for images below the fold?",
    "topic": "Image handling and optimization",
    "choices": [
      "preload='all'",
      "fetchpriority='never'",
      "defer",
      "loading='lazy'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which attribute marks the main hero image as high priority?",
    "topic": "Image handling and optimization",
    "choices": [
      "loading='lazy'",
      "decoding='none'",
      "fetchpriority='high'",
      "priority='low'"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the <Picture /> component add?",
    "topic": "Image handling and optimization",
    "choices": [
      "A caption and credit line taken from the image's metadata at build time",
      "Several image formats, through <source> elements",
      "A zoom overlay that loads a larger version when the visitor clicks",
      "A fallback gradient shown while the image downloads, generated at build time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should remote images be allowed for optimization?",
    "topic": "Image handling and optimization",
    "choices": [
      "Download each one into public/ by hand",
      "Wrap the URL in the Image component and Astro adds the domain automatically",
      "Remove the https prefix, which makes Astro treat the file as a local import",
      "Add their domains to image.domains or remotePatterns"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use modern formats like WebP or AVIF?",
    "topic": "Image handling and optimization",
    "choices": [
      "They work in no browsers",
      "They are required by HTML",
      "They give smaller files at similar quality",
      "They disable caching"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an Astro integration?",
    "topic": "Integrations ecosystem",
    "choices": [
      "A package that extends the build or config",
      "A page layout that wraps every route with shared header and footer markup",
      "A kind of component that is rendered on the client with a directive",
      "A Git hook that runs the build whenever a commit is pushed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command adds an integration automatically?",
    "topic": "Integrations ecosystem",
    "choices": [
      "npm run integrate",
      "astro plug <name>",
      "npx astro add <name>",
      "npx astro install --all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which integration generates a sitemap?",
    "topic": "Integrations ecosystem",
    "choices": [
      "@astrojs/sitemap",
      "@astrojs/seo-all",
      "@astrojs/robots",
      "@astrojs/feed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which integration creates an RSS feed?",
    "topic": "Integrations ecosystem",
    "choices": [
      "@astrojs/atom-only",
      "@astrojs/news",
      "@astrojs/rss",
      "@astrojs/podcast"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where are integrations listed?",
    "topic": "Integrations ecosystem",
    "choices": [
      "In the scripts section of package.json under an astro key",
      "In the integrations array of astro.config.mjs",
      "In the head of the shared layout as a list of link tags",
      "In public/integrations.txt"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the safest way to pick a third-party integration?",
    "topic": "Integrations ecosystem",
    "choices": [
      "Check its maintenance and compatibility with your Astro version",
      "Pick the one that appears first in a search",
      "Use the one with the shortest name, which tends to have the smallest bundle",
      "Install every candidate and keep the ones that do not produce build errors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid adding many integrations you do not need?",
    "topic": "Integrations ecosystem",
    "choices": [
      "Each adds build time, complexity and risk of breakage",
      "They switch the project to server output",
      "They delete pages that are not listed in the integration's config",
      "Each one charges a license fee per install in the config file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can an integration hook into?",
    "topic": "Integrations ecosystem",
    "choices": [
      "Only CSS files, since integrations cannot touch scripts or pages",
      "Only the home page, which is the sole route they can modify",
      "Build steps, such as config setup and build completion",
      "Only the browser console, where they can print debug messages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which integration enables a UI framework like React?",
    "topic": "Integrations ecosystem",
    "choices": [
      "@astrojs/jsx-runtime",
      "@astrojs/dom",
      "@astrojs/react",
      "@astrojs/hooks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you do after adding a new integration?",
    "topic": "Integrations ecosystem",
    "choices": [
      "Delete node_modules and the lockfile so that the old version is not used",
      "Rename the config file so that Astro reloads its integrations list",
      "Disable TypeScript checks",
      "Run the dev server and check the build for errors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should a CMS secret be stored?",
    "topic": "Environment secrets",
    "choices": [
      "In the page markup, inside a data attribute that only your scripts read",
      "In the sitemap, where crawlers cannot interpret it as content",
      "In server-side environment variables",
      "In public/secrets.txt, which the build excludes from the deployed output"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the risk of committing a .env file with a token to a public repository?",
    "topic": "Environment secrets",
    "choices": [
      "The build will be slower",
      "Git will refuse the commit",
      "Anyone can read and use the token",
      "The token will expire at once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you do if a secret was accidentally committed?",
    "topic": "Environment secrets",
    "choices": [
      "Rotate it right away, since deleting the commit is not enough",
      "Leave it, since a secret in Git history cannot be read by outsiders",
      "Rename the file and keep the same value, since the name was the leak",
      "Ask the team to ignore it until the next scheduled release"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you give a CI build the secrets it needs?",
    "topic": "Environment secrets",
    "choices": [
      "Print them in the build log so the team can verify each value",
      "Set them in the CI provider's encrypted secrets",
      "Put them in the README so new contributors can copy them",
      "Email them to the team so each person adds them locally"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use separate tokens for preview and production CMS content?",
    "topic": "Environment secrets",
    "choices": [
      "So the token expires sooner and the team rotates it more frequently",
      "So draft content never appears on the live site",
      "So fetch calls run faster because preview tokens skip rate limits",
      "So the CSS for previews loads before the CSS for production pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good practice for token permissions?",
    "topic": "Environment secrets",
    "choices": [
      "Grant full admin rights",
      "Share one token with the whole company",
      "Use no token",
      "Grant read-only access for build-time content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you detect a missing environment variable early?",
    "topic": "Environment secrets",
    "choices": [
      "Wait for users to report errors",
      "Validate variables at startup, for example with astro:env",
      "Ignore undefined values so the build never stops over a variable",
      "Use a default token so the code always has some value to read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which kind of key can be used in client code safely?",
    "topic": "Environment secrets",
    "choices": [
      "A secret key, as long as it is stored in a variable with the PUBLIC_ prefix",
      "An admin password, if the request is made over HTTPS only",
      "A publishable key designed for public use",
      "A private signing key, provided the bundle is minified"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of a .env.example file?",
    "topic": "Environment secrets",
    "choices": [
      "Documents the variable names without real values",
      "Stores the real secrets for the team so a new developer can copy them",
      "Replaces .gitignore by telling Git which files must never be committed",
      "Is read by the browser to load public settings at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do preview deployments usually read their secrets from?",
    "topic": "Environment secrets",
    "choices": [
      "The Markdown frontmatter of the pull request's changed content files",
      "The sitemap that the preview build generates for crawlers",
      "The cookies of the reviewer who opens the preview link",
      "Environment settings scoped to the preview environment"
    ],
    "answerIdx": 3
  }
]
```

LAYER: astro-dev-9

```json
[
  {
    "stem": "Which Core Web Vital measures loading speed of the main content?",
    "topic": "Core Web Vitals",
    "choices": [
      "Cumulative Layout Shift (CLS)",
      "Interaction to Next Paint (INP), the time until the page first loads",
      "Time to First Byte (TTFB), which Google lists as the loading vital",
      "Largest Contentful Paint (LCP)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Cumulative Layout Shift (CLS) measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "How long the server takes to answer the first request",
      "How much visible content moves unexpectedly",
      "How many requests the page makes in total",
      "How quickly the largest image downloads"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which metric replaced First Input Delay as a Core Web Vital?",
    "topic": "Core Web Vitals",
    "choices": [
      "Interaction to Next Paint (INP)",
      "Total Blocking Time (TBT)",
      "First Contentful Paint (FCP), the first text or image shown",
      "Speed Index, a score of how fast content fills the viewport"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which LCP value does Google consider good?",
    "topic": "Core Web Vitals",
    "choices": [
      "2.5 seconds or less",
      "4 seconds or less",
      "1 second or less",
      "10 seconds or less"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which CLS value is considered good?",
    "topic": "Core Web Vitals",
    "choices": [
      "0.1 or less",
      "1 or less",
      "0.5 or less",
      "3 or less"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What commonly causes a poor CLS score?",
    "topic": "Core Web Vitals",
    "choices": [
      "Images or ads without reserved space that push content down",
      "A stylesheet that is served with gzip compression",
      "A sitemap that contains too many URLs",
      "A canonical tag that points to the same page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common cause of a slow LCP on an Astro page?",
    "topic": "Core Web Vitals",
    "choices": [
      "A large hero image that is lazy-loaded or not optimized",
      "A long list of static links in the footer",
      "A meta description that is too long",
      "A heading that uses the wrong level"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between lab data and field data?",
    "topic": "Core Web Vitals",
    "choices": [
      "Lab data comes from real visitors, while field data comes from a test run",
      "They are the same thing under two names",
      "Lab data covers only desktop, field data covers only mobile",
      "Lab data comes from a test run, while field data comes from real visitors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which source provides field data on real users' Core Web Vitals?",
    "topic": "Core Web Vitals",
    "choices": [
      "A single Lighthouse run in DevTools",
      "The robots.txt file",
      "The Chrome User Experience Report (CrUX)",
      "The sitemap"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do Core Web Vitals matter for a site?",
    "topic": "Core Web Vitals",
    "choices": [
      "They decide the size of the HTML file the server sends to the browser",
      "They control which font the page uses on slower connections and devices",
      "They reflect user experience and can influence ranking",
      "They apply only to web apps"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How much JavaScript does Astro ship by default for a page without islands?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "A small runtime for routing",
      "The full framework bundle",
      "One script for each component",
      "None"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which choice reduces JavaScript for a rarely used widget?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "Hydrate it with client:load on every page",
      "Load it from a CDN script tag in the head",
      "Move its code into the layout",
      "Hydrate it with client:visible or client:idle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a large client-side library for a tiny feature a problem?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "It adds download, parse and run time for little benefit",
      "It stops the HTML from rendering until the whole library has been executed",
      "It disables the sitemap, because crawlers skip pages with large bundles",
      "It blocks images from loading"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you check which JavaScript a page ships?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "Open the Network tab or run a bundle analyzer",
      "Read the page's meta tags",
      "Check the sitemap, which records every JavaScript file the build created",
      "Open robots.txt, which lists the resources a page loads at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does code splitting do?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "Deletes HTML that no page uses",
      "Breaks code into chunks that load when needed",
      "Combines every file into one bundle so the browser makes a single request",
      "Encrypts the code in transit so that only your pages can run it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a script marked defer or type='module' avoid?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "Downloading the file at all",
      "Running after the page is parsed",
      "Blocking the HTML parser while it downloads",
      "Using the cache"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you avoid layout shifts from late-loading content?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "Hide the content until it has loaded",
      "Use a larger base font so that late content cannot push text around",
      "Reserve space with width, height or aspect-ratio",
      "Add more scripts that measure the page and move elements back in place"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool helps you find unused JavaScript and CSS?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "The sitemap validator, which compares used files with the build output",
      "The Coverage panel in Chrome DevTools",
      "The RSS reader, which lists scripts that feeds do not depend on",
      "The robots.txt tester, which flags files that no crawler requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can third-party scripts hurt performance?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "They make the HTML invalid",
      "They lower the base font size, which forces extra layout work on each page",
      "They add requests and main-thread work you do not control",
      "They disable caching of images, so every visit downloads them again"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good approach to analytics scripts?",
    "topic": "Minimal JavaScript shipping",
    "choices": [
      "Load several of them at the top of the head so no early visit is missed",
      "Load them late, or choose a lightweight option",
      "Block rendering until they finish so every page view is counted exactly once",
      "Inline the full tracking script into every component that needs an event"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which image formats usually give the smallest files for photos?",
    "topic": "Image and asset optimization",
    "choices": [
      "BMP and TIFF",
      "PNG for every photo",
      "AVIF and WebP",
      "GIF for every photo"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does loading='lazy' do?",
    "topic": "Image and asset optimization",
    "choices": [
      "Loads the image at the highest priority so it paints before any text",
      "Delays loading an offscreen image until it is near the viewport",
      "Removes the image from the page until the visitor scrolls past the fold",
      "Converts the image to a smaller size on the fly before it is downloaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which image should not be lazy-loaded?",
    "topic": "Image and asset optimization",
    "choices": [
      "The main image visible at the top of the page",
      "An image in the footer",
      "An image in a long comment list",
      "A decorative icon far down the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does font-display: swap do?",
    "topic": "Image and asset optimization",
    "choices": [
      "Hides all text until the web font finishes loading",
      "Blocks the whole page from painting until the font has been downloaded",
      "Removes the web font and keeps the fallback font for the whole visit",
      "Shows fallback text first, then swaps in the web font"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you speed up a critical web font?",
    "topic": "Image and asset optimization",
    "choices": [
      "Load it from several different domains",
      "Self-host it and preload it",
      "Use the largest font file available",
      "Embed it as an image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which caching policy suits asset files with a content hash in their names?",
    "topic": "Image and asset optimization",
    "choices": [
      "no-store, so the browser requests a fresh copy of each file every time",
      "A short max-age of 60 seconds",
      "A very long max-age together with immutable",
      "no-cache on every request, so the CDN always revalidates the file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does Astro put a hash in built asset file names?",
    "topic": "Image and asset optimization",
    "choices": [
      "The files compress better",
      "The files are hidden from search engines, which ignore hashed paths",
      "The files are smaller, since the hash replaces repeated names inside them",
      "A changed file gets a new URL, so stale caches are avoided"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which compression do servers commonly use for text assets?",
    "topic": "Image and asset optimization",
    "choices": [
      "JPEG",
      "Brotli or gzip",
      "MP3",
      "ZIP-only archives"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does inlining small CSS do?",
    "topic": "Image and asset optimization",
    "choices": [
      "Prevents the CSS from being cached",
      "Saves a request, so the page can paint sooner",
      "Makes the CSS global",
      "Removes unused rules"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should images have explicit width and height?",
    "topic": "Image and asset optimization",
    "choices": [
      "The browser can reserve space before the image downloads",
      "They make the image sharper by sending a higher resolution file to every device",
      "They change the file format to the one with the smallest size",
      "They provide the alt text that screen readers announce for the picture"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which tag sets the title shown in search results and browser tabs?",
    "topic": "Meta tags and structured data",
    "choices": [
      "<h1> only",
      "<meta name='title'>",
      "<title>",
      "<header>"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the meta description?",
    "topic": "Meta tags and structured data",
    "choices": [
      "Sets the page's background so it matches the preview in the results",
      "Controls which JavaScript the browser loads first when the page opens",
      "Defines the canonical URL that search engines should use for the page",
      "Gives search engines a summary that may be shown in results"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does <link rel='canonical'> tell search engines?",
    "topic": "Meta tags and structured data",
    "choices": [
      "Which stylesheet the browser should apply when two pages share a layout",
      "Which language the page is written in",
      "Which image should be shown when the page is shared in a preview",
      "Which URL is the preferred version of a page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do Open Graph tags control?",
    "topic": "Meta tags and structured data",
    "choices": [
      "How quickly the page loads for visitors who arrive from a social platform",
      "How a link preview looks when shared on social platforms",
      "Which cookies the page may set when a visitor shares its address",
      "How the page is announced by screen readers when it is shared"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Open Graph tag sets the preview image?",
    "topic": "Meta tags and structured data",
    "choices": [
      "og:image",
      "og:photo-url",
      "og:thumb",
      "og:src"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the lang attribute on <html> help with?",
    "topic": "Meta tags and structured data",
    "choices": [
      "Selects which translated stylesheet the browser downloads for the visitor",
      "Tells the server to redirect the visitor to a localized version of the page",
      "Helps screen readers and search engines identify the language",
      "Sets the direction of text so right-to-left scripts are drawn correctly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is structured data?",
    "topic": "Meta tags and structured data",
    "choices": [
      "A compression format that shrinks HTML files before they leave the server",
      "Machine-readable markup that describes a page's content",
      "A browser database that stores page state between visits, such as IndexedDB",
      "A CSS technique that groups rules into reusable layers and containers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which format does Google recommend for structured data?",
    "topic": "Meta tags and structured data",
    "choices": [
      "Plain CSV",
      "JSON-LD",
      "YAML in the head",
      "XML-RPC"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How would you output JSON-LD in an Astro layout?",
    "topic": "Meta tags and structured data",
    "choices": [
      "A <meta name='json-ld'> tag whose content attribute holds the JSON string",
      "A <style type='application/ld+json'> block placed at the end of the body",
      "An HTML comment containing the JSON",
      "A <script type='application/ld+json'> tag with set:html"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does <meta name='robots' content='noindex'> do?",
    "topic": "Meta tags and structured data",
    "choices": [
      "Blocks the page from loading",
      "Hides the page from visitors",
      "Asks search engines not to index the page",
      "Makes the page load faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Astro integration generates a sitemap?",
    "topic": "Sitemap and RSS",
    "choices": [
      "@astrojs/sitemap",
      "@astrojs/robots-txt-only",
      "@astrojs/seo-pack",
      "@astrojs/index"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What config option does the sitemap integration require?",
    "topic": "Sitemap and RSS",
    "choices": [
      "site, the full production URL",
      "base, the output folder",
      "adapter, the host",
      "output, the render mode"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which files does the sitemap integration create for the site's URLs?",
    "topic": "Sitemap and RSS",
    "choices": [
      "sitemap-index.xml and sitemap-0.xml",
      "sitemap.json, a single file listing each page with its title and date",
      "urls.html, a page of links that crawlers follow from the home page",
      "index.xml.txt, a plain-text list of paths for the robots.txt parser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is robots.txt used for?",
    "topic": "Sitemap and RSS",
    "choices": [
      "Lists every page with its title so search engines can build their results",
      "Sets the HTTP cache time for pages that crawlers visit regularly",
      "Stores private keys that the search engines use to verify the site",
      "Tells crawlers which paths they may crawl"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should the sitemap location be referenced?",
    "topic": "Sitemap and RSS",
    "choices": [
      "In the page body, inside a visible link at the top of every page",
      "In package.json, under a sitemap key read by crawlers during the visit",
      "In robots.txt, on a Sitemap: line",
      "In the favicon file, where search engines look for site metadata"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which package creates RSS feeds for Astro?",
    "topic": "Sitemap and RSS",
    "choices": [
      "@astrojs/feed-reader",
      "@astrojs/atom",
      "@astrojs/podcast",
      "@astrojs/rss"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you place an RSS endpoint file?",
    "topic": "Sitemap and RSS",
    "choices": [
      "src/pages/rss.xml.js",
      "public/rss.js",
      "src/rss/index.astro",
      "astro.config.mjs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an RSS feed let readers do?",
    "topic": "Sitemap and RSS",
    "choices": [
      "See the page faster",
      "Search the site",
      "Load images offline",
      "Follow new posts in a feed reader"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a sitemap useful?",
    "topic": "Sitemap and RSS",
    "choices": [
      "It speeds up page loads",
      "It sets the page title",
      "It helps crawlers discover your pages",
      "It encrypts the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which URLs should not be in a sitemap?",
    "topic": "Sitemap and RSS",
    "choices": [
      "Public pages that should appear in search",
      "Pages marked noindex or redirected",
      "Blog posts",
      "The home page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Lighthouse do?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Deploys the site to a staging host and compares it with production output",
      "Compiles Astro components and reports which of them ship client JavaScript",
      "Audits performance, accessibility, best practices and SEO",
      "Writes unit tests for each page by recording the clicks made in DevTools"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where can you run a Lighthouse audit?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Only on the host's dashboard",
      "Only in a terminal",
      "Only inside Astro",
      "In Chrome DevTools or PageSpeed Insights"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might Lighthouse scores differ between runs?",
    "topic": "Lighthouse auditing",
    "choices": [
      "The HTML is regenerated differently by Astro every time a page is opened",
      "Network and CPU conditions vary between runs",
      "The CSS rewrites itself after the first paint when the cache is warm",
      "The browser edits the page's markup while a test is in progress"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What device profile does Lighthouse test by default in DevTools?",
    "topic": "Lighthouse auditing",
    "choices": [
      "A large desktop screen, because DevTools opens on the desktop layout",
      "A tablet only, since it is the midpoint between phones and desktops",
      "Mobile, with simulated throttling",
      "A TV browser, because the audit targets the slowest class of device"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you do with the opportunities listed in a report?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Ignore all of them",
      "Fix the smallest ones first only",
      "Delete the report",
      "Fix the largest ones first, then measure again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Lighthouse category covers alt text and color contrast?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Performance",
      "Accessibility",
      "SEO only",
      "PWA"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should you test in an incognito window?",
    "topic": "Lighthouse auditing",
    "choices": [
      "It enables a faster CPU",
      "Extensions can distort the results",
      "It sets cookies",
      "It removes the HTML"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a performance budget do?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Allocates a monthly hosting spend that the CI pipeline checks before every deploy",
      "Caps the number of pages that can be generated by one build of the site",
      "Sets limits, such as maximum JS size, for a build",
      "Defines how many Lighthouse runs are averaged before a score is reported"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool can run Lighthouse automatically on each pull request?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Lighthouse CI",
      "The sitemap integration",
      "Prettier",
      "The RSS package"
    ],
    "answerIdx": 0
  },
  {
    "stem": "A page scores 100 in a lab test but users report slowness. What is a sensible next step?",
    "topic": "Lighthouse auditing",
    "choices": [
      "Trust the lab score and close the issue",
      "Change the page title",
      "Delete the images",
      "Check field data from real users for differences"
    ],
    "answerIdx": 3
  }
]
```

LAYER: astro-dev-10

```json
[
  {
    "stem": "What is Vitest?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "A test runner built on Vite",
      "A browser automation tool that drives real browsers",
      "A tool that deploys sites to a CDN",
      "A visual regression service that compares screenshots"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you run Vitest tests once, as in a CI job?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "vitest watch --ci-off",
      "npm start vitest",
      "vitest run",
      "vitest serve"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Astro helper makes Vitest understand Astro's Vite config?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "vitestAstro() from astro/test",
      "defineTestConfig() from astro/vitest",
      "astroTest() from vitest",
      "getViteConfig from astro/config"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good candidate for a Vitest unit test in an Astro project?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "The look of a page in three browsers",
      "A pure utility, such as a function that formats dates",
      "A full signup flow across several pages",
      "The DNS settings of the domain"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does expect(add(2, 3)).toBe(5) assert?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "That add is defined",
      "That add(2, 3) returns exactly 5",
      "That add runs asynchronously",
      "That add logs 5"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Vitest function replaces a module's exports with fakes?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "vi.stub.module()",
      "vi.replace()",
      "vi.mock()",
      "test.fake()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can Vitest check code that needs DOM APIs?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "Run the tests inside the dev server",
      "Use a DOM environment such as jsdom or happy-dom",
      "Import window from the vitest package, which is always available in Node",
      "Mark the test with a dom comment so Vitest launches a headless browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the experimental way to render an Astro component in a test?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "The Renderer plugin",
      "The Container API",
      "A browser iframe",
      "Server-side Markdown"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a descriptive test name like 'returns an empty list when input is empty' help with?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "Faster test execution, because Vitest skips tests that have descriptive names",
      "Automatic type inference for the function under test inside the test file",
      "Higher coverage numbers, since each named test adds extra covered lines",
      "Clear failure messages that describe expected behavior"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep unit tests small and fast?",
    "topic": "Unit testing with Vitest",
    "choices": [
      "Astro refuses to build projects whose test suites take longer than one minute",
      "They can run on every change without slowing developers",
      "Fast tests make type checking unnecessary because they catch the same mistakes",
      "Small tests reduce the HTML that Vitest injects into each production page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Playwright used for?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Compiling Astro components",
      "Writing Markdown",
      "End-to-end tests in real browsers",
      "Compressing images"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which browsers can Playwright automate?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Only Chrome",
      "Only Safari",
      "Only Edge on Windows",
      "Chromium, Firefox and WebKit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which line navigates to a page in a Playwright test?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "page.open('/about')",
      "browser.visit('/about')",
      "goto('/about').now()",
      "await page.goto('/about');"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which locator style does Playwright recommend for finding elements?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Role-based locators, like getByRole('button', { name: 'Send' })",
      "Long XPath expressions that copy the full DOM path from the document root to the element",
      "CSS selectors built from generated class names such as .css-1x2y3z, copied from DevTools",
      "Index-based selectors such as div:nth-child(7)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Playwright's auto-waiting do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Waits for elements to be ready before acting",
      "Waits for the test to be written",
      "Waits for the network to be offline",
      "Waits one second after every line"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the webServer option in the Playwright config do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Deploys the site to a temporary URL that the tests then visit",
      "Opens a remote debugging session so you can watch the test live",
      "Creates a mock API server that replaces every network call",
      "Starts your site before the tests run"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command should the Playwright webServer run to test the production build?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "astro dev --prod, which starts the development server in production mode",
      "astro preview, after astro build",
      "npm run lint, which prepares the files that the test run needs",
      "astro check, which serves the type-checked output on a local port"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Playwright trace give you?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "A recorded timeline of actions, screenshots and network calls",
      "A coverage report listing which source lines the tests executed and which they skipped",
      "A generated page object class that wraps each locator used during the test run",
      "A diff of the DOM between two test runs that highlights layout regressions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do end-to-end tests cover best?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Every helper function",
      "The font files",
      "Important user journeys across pages",
      "The Git history"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why have fewer end-to-end tests than unit tests?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "They cannot find bugs",
      "They are slower and more likely to break",
      "They only work on Windows",
      "They need no maintenance"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What decides whether you need an adapter?",
    "topic": "Choosing an adapter",
    "choices": [
      "The number of pages",
      "Whether any page is rendered on demand",
      "The CSS framework",
      "The package manager used"
    ],
    "answerIdx": 1
  },
  {
    "stem": "A fully static Astro site deployed to Netlify needs which adapter?",
    "topic": "Choosing an adapter",
    "choices": [
      "@astrojs/netlify always",
      "None",
      "@astrojs/node",
      "@astrojs/vercel"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which adapter would you pick for an SSR site on Cloudflare?",
    "topic": "Choosing an adapter",
    "choices": [
      "@astrojs/netlify",
      "@astrojs/node standalone only",
      "@astrojs/cloudflare",
      "@astrojs/vercel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which adapter mode runs your own Node server on a VPS?",
    "topic": "Choosing an adapter",
    "choices": [
      "@astrojs/static",
      "@astrojs/edge-only",
      "@astrojs/lambda-only",
      "@astrojs/node in standalone mode"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if the adapter does not match your host?",
    "topic": "Choosing an adapter",
    "choices": [
      "Astro detects the host at deploy time and swaps in the right adapter automatically",
      "The build succeeds, and only the first request after deploy runs slightly slower",
      "Only API endpoints are affected",
      "The deployed site may fail or misbehave"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you set the adapter?",
    "topic": "Choosing an adapter",
    "choices": [
      "In astro.config.mjs",
      "In the page layout",
      "In robots.txt",
      "In the .gitignore"
    ],
    "answerIdx": 0
  },
  {
    "stem": "With output: 'static' and an adapter installed, what can a single page do?",
    "topic": "Choosing an adapter",
    "choices": [
      "Nothing, because every page must stay static and the adapter is used only for image resizing",
      "Opt out of prerendering with prerender = false",
      "Opt out only if it sits in a src/pages/server folder that the adapter renders on demand",
      "Opt out only by changing output to 'server' for the whole project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command runs the build step on a host?",
    "topic": "Choosing an adapter",
    "choices": [
      "astro start, which compiles pages and serves them in production mode",
      "npm run dev, which first builds an optimized copy into the dist folder",
      "npm run build, which runs astro build",
      "astro watch, which rebuilds on every push and publishes the result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which folder holds the static output you publish?",
    "topic": "Choosing an adapter",
    "choices": [
      "src",
      "public",
      "dist",
      "node_modules"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you confirm before choosing a host for SSR?",
    "topic": "Choosing an adapter",
    "choices": [
      "That it supports the adapter's runtime",
      "That it has a dark theme",
      "That its logo is simple",
      "That it uses TypeScript"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you set production environment variables?",
    "topic": "Environment variables in production",
    "choices": [
      "In public/env.json",
      "In the layout head",
      "In the hosting provider's settings",
      "In the sitemap"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When are PUBLIC_ variables read for a static site?",
    "topic": "Environment variables in production",
    "choices": [
      "At every page view, because the browser fetches fresh values from the server",
      "At the moment the visitor first clicks",
      "At build time, then baked into the output",
      "Never, because PUBLIC_ variables are removed by the build for safety"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must you do after changing a build-time variable on the host?",
    "topic": "Environment variables in production",
    "choices": [
      "Nothing, it updates live",
      "Clear the browser cache",
      "Rename the variable",
      "Trigger a new build and deploy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do preview and production often use different values?",
    "topic": "Environment variables in production",
    "choices": [
      "Because hosting providers refuse to deploy previews that use production values",
      "Because the build output is smaller when each environment has its own values",
      "Because Git ignores variables whose values are the same in every environment",
      "So previews and tests never touch live data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do server-only secrets reach SSR code in production?",
    "topic": "Environment variables in production",
    "choices": [
      "From the HTML that Astro sends to the browser, in a hidden meta tag",
      "From the host's runtime environment",
      "From the sitemap, where the integration stores configuration values",
      "From a cookie that the browser sends along with the first request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is wrong with committing production secrets to Git?",
    "topic": "Environment variables in production",
    "choices": [
      "They stay in history and can leak",
      "They slow down builds",
      "They change the layout",
      "They break TypeScript"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What helps catch a missing production variable early?",
    "topic": "Environment variables in production",
    "choices": [
      "Validating required variables at build or startup",
      "Committing a real .env file so every environment starts with identical values",
      "Setting a long default for every variable so the code never reads undefined",
      "Reading each variable lazily inside the request handler where it is first needed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use different API keys per environment?",
    "topic": "Environment variables in production",
    "choices": [
      "A leak in one environment does not expose the others",
      "Requests are served faster because each environment gets its own rate-limit quota in the CDN",
      "Astro refuses to build when two environments share the same key value",
      "Keys are cached by the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a secret exposed in client JavaScript?",
    "topic": "Environment variables in production",
    "choices": [
      "It is encrypted by the browser",
      "Anyone can read it from the page",
      "It is deleted after 24 hours",
      "It is hidden by Astro"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you check before going live?",
    "topic": "Environment variables in production",
    "choices": [
      "That production variables, URLs and keys are correct",
      "That every .env.example value matches the real value used in local development",
      "That all PUBLIC_ variables have been moved into the host's secrets manager",
      "That staging and production share one database so their content stays equal"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does connecting a Git repository to a host usually enable?",
    "topic": "Deploying to a host",
    "choices": [
      "Free domain names forever",
      "Automatic builds and deploys on each push",
      "Automatic code writing",
      "Offline mode"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What build command and output folder does a typical Astro static site use?",
    "topic": "Deploying to a host",
    "choices": [
      "npm start and src",
      "npm test and public",
      "astro dev and .astro",
      "npm run build and dist"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which setting must be correct for GitHub Pages under a repo path?",
    "topic": "Deploying to a host",
    "choices": [
      "The adapter name",
      "site and base in the Astro config",
      "The tailwind version",
      "The sitemap"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of atomic deploys?",
    "topic": "Deploying to a host",
    "choices": [
      "Each file is uploaded and replaced individually",
      "The old version is deleted first, which makes rollbacks impossible by design",
      "The site goes offline briefly while files are replaced, in exchange for a lower price",
      "A new version goes live at once, and rollbacks are easy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do you do to point your own domain at the site?",
    "topic": "Deploying to a host",
    "choices": [
      "Rename the repository",
      "Edit robots.txt",
      "Add DNS records as the host instructs",
      "Change the title tag"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What usually handles HTTPS on a deployed site?",
    "topic": "Deploying to a host",
    "choices": [
      "Astro itself, through the site option",
      "The host, which issues certificates automatically",
      "The browser, which upgrades every connection to HTTPS after the first visit",
      "The sitemap integration, which signs the site's URLs with a certificate"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why run astro check and tests in CI before deploying?",
    "topic": "Deploying to a host",
    "choices": [
      "To shrink the final bundle",
      "To refresh the DNS records so the new build is reachable on the custom domain",
      "To warm the host's CDN cache so the first visitors get fast responses",
      "To catch type errors and test failures before users see them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does astro check do?",
    "topic": "Deploying to a host",
    "choices": [
      "Type-checks .astro files and reports errors",
      "Validates that every internal link on the built site points to an existing page",
      "Scans dependencies for known security vulnerabilities and outdated packages",
      "Runs the Playwright suite against the production build before it is deployed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which workflow tool commonly runs lint, tests and build on every pull request?",
    "topic": "Deploying to a host",
    "choices": [
      "GitHub Actions",
      "Tailwind",
      "Shiki",
      "Zod"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good first step if a deploy fails?",
    "topic": "Deploying to a host",
    "choices": [
      "Read the build log for the failing step",
      "Delete the repository and reconnect it to the hosting provider from scratch",
      "Disable the build step so the host serves the last uploaded files",
      "Change the site logo, since deploys fail when branding assets are missing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does astro preview do?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Deploys the built output to a temporary public URL that the host provides",
      "Starts the dev server with hot reload and shows unbuilt source files",
      "Runs the test suite against the build and prints a coverage report",
      "Serves the built output locally for checking"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should you not use astro preview as a production server?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "It serves only the home page",
      "It disables caching headers, which makes browsers re-download every asset",
      "It is meant for local checks, not real traffic",
      "It is deprecated and has been removed from current Astro releases"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a preview deployment?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "A read-only copy of the production database made available to testers",
      "A local build served by astro preview with a public tunnel attached to it",
      "A temporary URL built from a branch or pull request",
      "A paid plan feature that archives older production releases for rollback"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are preview deployments useful?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Reviewers can try changes before they are merged",
      "They replace automated tests",
      "They publish merged changes to production without a separate release step",
      "They keep a permanent archive of every build for legal compliance"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of error tracking such as Sentry?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Measuring how many visitors read each page and where they came from",
      "Compressing the JavaScript bundle so errors take less time to download",
      "Collecting runtime errors from real users",
      "Replaying the Git history to find which commit introduced a style change"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an uptime monitor do?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Measures how quickly each page paints on real visitors' mobile devices",
      "Rebuilds the site whenever the content in the CMS changes",
      "Scans the HTML for broken links and missing alt text on every run",
      "Checks regularly that the site responds"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why monitor Core Web Vitals in production?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Real devices and networks differ from your test runs",
      "Search engines require a monthly report of Core Web Vitals to keep the site indexed",
      "Core Web Vitals change the DNS records and set the site's cache lifetime",
      "Lab tools stop measuring after deployment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a rollback?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Deleting the repository history back to the last tagged release commit",
      "Rebuilding only the CSS files of the current version from source",
      "Returning to a previous working deployment",
      "Renaming the site to a temporary domain while the incident is investigated"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should server and build logs help you find?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Which images on the page are too large to appear above the fold of the screen",
      "Which npm packages have newer major versions available for the project",
      "The cause of failures in builds or server rendering",
      "Which visitors read each article for the longest time, as a content analytics report"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice after a release?",
    "topic": "Preview builds and monitoring",
    "choices": [
      "Disable error reporting for a week so alerts from the new version do not distract the team",
      "Delete the previous deployment right away to avoid confusion about which version is live",
      "Merge the next feature branch at once so the release does not stay on its own",
      "Watch errors and performance, ready to roll back"
    ],
    "answerIdx": 3
  }
]
```
