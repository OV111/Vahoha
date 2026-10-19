LAYER: mern-1

```json
[
  {
    "stem": "Which element should wrap the primary navigation links of a page?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "The section element, which groups navigation with the page header text",
      "The aside element, which marks content that is only tangentially related",
      "The nav element, which tells assistive technology this is a navigation landmark",
      "The menu element, which is the standard container for site navigation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main benefit of using a button element instead of a div with a click handler?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "It is focusable and activates with Enter or Space by default",
      "It always renders faster because the browser skips style calculation",
      "It prevents the click event from bubbling up to parent elements",
      "It can be styled with CSS while a div cannot receive any styling"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the alt attribute on an img element?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "It sets the tooltip text that appears when the pointer hovers over the image",
      "It defines a lower resolution fallback file that is used on slow connections",
      "It lists keywords that search engines use to rank the image by relevance",
      "It gives a text alternative for screen readers and for a failed image load"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which heading structure is best for accessibility on a typical page?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "Several h1 elements, one for each visual section, to give each equal weight",
      "One h1 and then headings that follow a logical nested order without skipping levels",
      "Headings chosen by visual size, so any level can follow any other level",
      "Only h2 elements, because h1 is reserved for the browser tab title"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should every form input have an associated label element?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "The label supplies the default value that is submitted together with the form data",
      "Clicking it focuses the input and screen readers announce it with the field",
      "The browser refuses to submit a form when any of its inputs lacks a label element",
      "The label lets CSS select the input without needing a class or an id"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which element represents a self-contained piece of content, such as a blog post, that could be reused on its own?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "section",
      "div",
      "main",
      "article"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the lang attribute on the html element help with?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "Screen readers pick the right pronunciation and browsers offer correct translation tools",
      "It tells the server which language file to send in the next request from the browser",
      "It switches the keyboard layout used for every input field that is on the page",
      "It automatically translates the visible text on the page into the specified language"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about the aria-label attribute is correct?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "It adds a visible caption underneath the element on every modern browser",
      "It replaces the need for semantic elements such as button and nav entirely",
      "It supplies an accessible name when no visible text label exists for the element",
      "It sets the text shown when the element is dragged across the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good reason to prefer semantic elements over generic div elements?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "They load faster because browsers cache semantic tags more aggressively than divs",
      "They automatically include responsive default styles for small screen devices",
      "They convey meaning to browsers and assistive technology with no extra attributes",
      "They are required for the page to pass HTML validation without any warnings"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which text color choice is a common accessibility failure?",
    "topic": "HTML5 semantic elements & accessibility",
    "choices": [
      "Light gray text on a white background with a contrast ratio below 4.5 to 1",
      "Dark text on a light background that is larger than 18 pixels",
      "Black text on a pale yellow background used for the main article",
      "White text on a dark blue background for a heading above 24 pixels"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In the standard CSS box model, what does the width property set by default?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "The total width including content, padding and border together",
      "The width of the content and padding but never the border",
      "The width of the margin box around the element",
      "The width of the content area, before padding and border are added"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does box-sizing set to border-box change?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "Margins collapse into the border so neighboring boxes touch each other",
      "Width and height include padding and border, so the box keeps the size you set",
      "The border is drawn inside the content so the text area becomes smaller",
      "Padding is removed and replaced by a transparent border of equal size"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which declaration makes an element a flex container?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "position set to flex",
      "display set to flex",
      "float set to flex",
      "flex-flow set to container"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In a flex container with the default direction, which property aligns items along the main axis?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "align-items",
      "align-content",
      "place-self",
      "justify-content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which property controls alignment of flex items on the cross axis within one line?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "align-items",
      "justify-content",
      "flex-wrap",
      "order"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does flex-grow with a value of 1 on all items do?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "Items are all resized to exactly one pixel wider than their content",
      "Items stop shrinking when the container becomes smaller than the content",
      "Items share the leftover free space in the container equally",
      "Items wrap onto a new line when the container is full"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which CSS makes a grid with three equal columns?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "grid-columns set to three equal",
      "display set to grid-3",
      "grid-template-columns set to repeat(3, 1fr)",
      "grid-template-rows set to repeat(3, 1fr)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the gap property do on a grid or flex container?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "It adds spacing between the items without adding space on the outer edges",
      "It adds margin around the whole container on all four sides equally",
      "It sets the minimum height of the rows that are created automatically",
      "It collapses the borders of adjacent items into a single line"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Two vertically adjacent block elements have bottom margin 20px and top margin 30px. What is the space between them?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "50px, because the two margins always add together",
      "20px, because the first element takes precedence",
      "0px, because block elements never keep margins between them",
      "30px, because the larger margin wins in margin collapsing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is CSS grid usually a better fit than flexbox?",
    "topic": "CSS box model, flexbox, grid",
    "choices": [
      "When you only need to center a single element on the screen",
      "When you need to lay out items in rows and columns at the same time",
      "When the items must wrap automatically inside a narrow sidebar",
      "When the page needs to stay the same size at every viewport width"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the viewport meta tag with width set to device-width do on mobile?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "It disables zooming on the page so that text can never be enlarged by the user",
      "It makes the layout width match the screen instead of a zoomed out desktop width",
      "It forces the page to render at exactly 320 pixels wide on every phone model",
      "It tells the server to send smaller image files to narrow screens by default"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which approach describes mobile-first CSS?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "Write desktop styles first and hide extra content on phones with display none",
      "Write separate stylesheets for each device and load them by user agent",
      "Use fixed pixel widths for phones and percentages only for desktops",
      "Write base styles for small screens and add min-width media queries for larger ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which media query applies styles when the viewport is at least 768 pixels wide?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "The query (min-width: 768px)",
      "The query (max-width: 768px)",
      "The query (width: min 768px)",
      "The query (device: tablet)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which unit is relative to the root element font size?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "em",
      "vh",
      "rem",
      "ch"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does 1vh equal?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "One percent of the parent element height",
      "One tenth of the viewport height",
      "One percent of the viewport height",
      "One pixel of the device screen height"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which technique makes an image shrink to fit a narrow container without overflowing?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "Setting max-width to 100 percent and height to auto",
      "Setting width to a fixed pixel value larger than the container",
      "Setting overflow to hidden on the img element itself",
      "Setting display to inline on the surrounding container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of using the picture element with srcset and sizes?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "The browser downloads every listed image so the best one can be shown instantly",
      "The image is converted to a vector format on small screens",
      "The image is cached on the server after the first visitor requests it",
      "The browser can choose an image file that fits the screen and its pixel density"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which CSS function picks a value between a minimum and a maximum, based on a preferred size?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "calc()",
      "clamp()",
      "min-fit()",
      "var()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it better to base media query breakpoints on content than on specific devices?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "Content based breakpoints are required by the CSS specification",
      "Device sizes change constantly, while content breaks when it stops fitting",
      "Device based breakpoints are slower for browsers to evaluate",
      "Content based breakpoints let one stylesheet serve every future device without testing"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the prefers-color-scheme media feature detect?",
    "topic": "CSS responsive design & media queries",
    "choices": [
      "Which color depth the monitor supports when it draws gradients on the page",
      "Whether the page currently has a dark background image set by its stylesheet",
      "The brightness level of the device screen as reported by the operating system",
      "Whether the user asked the system for a light or a dark appearance"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which keyword declares a variable that can be reassigned but is limited to its block?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "let",
      "var",
      "const",
      "static"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when you try to reassign a variable declared with const?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "The new value is silently ignored",
      "The variable becomes undefined",
      "A TypeError is thrown at runtime",
      "The program stops reading that file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does typeof null return in JavaScript?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "The string null",
      "The string undefined",
      "The string object",
      "The string number"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which expression evaluates to true?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "The loose comparison 0 == false and the strict comparison 0 === 0",
      "The strict comparison 0 === false, since both values are falsy in JavaScript",
      "The strict comparison null === undefined, since both mean the absence of a value",
      "The strict comparison NaN === NaN, since a value is always equal to itself"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the result of 0.1 + 0.2 in JavaScript?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "Exactly 0.3 because JavaScript numbers use exact decimal arithmetic internally",
      "NaN because the two operands are not whole integers that can be added",
      "Exactly 0.30000 because JavaScript numbers keep only five digits after the point",
      "A value slightly above 0.3 because of binary floating point rounding"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is a falsy value in JavaScript?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "The string false",
      "An empty string",
      "An empty array",
      "The string 0"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a function declaration and a function expression?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "Expressions are hoisted with their body, while declarations are not hoisted at all",
      "Declarations are hoisted with their body, while expressions exist only after they run",
      "Declarations cannot take any parameters, while function expressions are allowed to",
      "Expressions always create a new global scope, while declarations share the local one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a function return when it has no return statement?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "null",
      "An empty string",
      "The last evaluated expression",
      "undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the arrow function (a, b) => a + b return when called with 2 and 3?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "5",
      "The string 23",
      "undefined",
      "A new function"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about var is correct?",
    "topic": "JavaScript variables, types, functions",
    "choices": [
      "It is block scoped and cannot be declared twice inside the same block",
      "It exists only in the global scope of the page and not inside functions",
      "It is function scoped and its declaration is hoisted to the top of the function",
      "It is not hoisted, so reading it before the declaration throws a ReferenceError"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which method returns the first element that matches a CSS selector?",
    "topic": "DOM manipulation & events",
    "choices": [
      "document.getElementsByTag",
      "document.findFirst",
      "document.querySelector",
      "document.selectOne"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between textContent and innerHTML when setting a value?",
    "topic": "DOM manipulation & events",
    "choices": [
      "innerHTML parses the string as markup, textContent inserts it as plain text",
      "textContent parses the string as markup, innerHTML inserts it as plain text",
      "They are identical except that innerHTML is slower on old browsers",
      "textContent can only read values and cannot be used to set them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is setting innerHTML with untrusted user input dangerous?",
    "topic": "DOM manipulation & events",
    "choices": [
      "It permanently deletes the stylesheet that belongs to the element",
      "It prevents the browser from rendering the rest of the page",
      "It causes the element to lose all of its event listeners and attributes",
      "It can run attacker supplied markup or scripts and lead to cross site scripting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does addEventListener do?",
    "topic": "DOM manipulation & events",
    "choices": [
      "Creates a new DOM element that dispatches the named event when it is clicked",
      "Registers a function to run each time the event happens on the element",
      "Removes every other handler that was already attached to that same element",
      "Runs the given function a single time once the whole page finishes loading"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does event.preventDefault() do in a form submit handler?",
    "topic": "DOM manipulation & events",
    "choices": [
      "Stops the event from reaching any parent element further up in the DOM tree",
      "Stops the default browser action, such as reloading the page",
      "Removes the handler from the element so that it can never run again after that",
      "Cancels all of the network requests that the page has already started sending"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is event bubbling?",
    "topic": "DOM manipulation & events",
    "choices": [
      "The event is sent to every element on the page at the same moment",
      "The event travels from the document root down to the target element",
      "The event repeats until a handler returns a value",
      "The event travels from the target element up through its ancestors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is event delegation?",
    "topic": "DOM manipulation & events",
    "choices": [
      "Attaching one listener to a parent and reading event.target for the child",
      "Attaching a separate listener to every child so that events never reach the parent",
      "Moving every handler into one global function that the browser then calls itself",
      "Replacing events with callbacks that are run after the parent has finished loading"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which method adds a new element to the page after it has been created with document.createElement?",
    "topic": "DOM manipulation & events",
    "choices": [
      "parent.write(element)",
      "document.insert(element)",
      "parent.appendChild(element)",
      "parent.render(element)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does event.stopPropagation() do?",
    "topic": "DOM manipulation & events",
    "choices": [
      "Stops the browser from performing the default action for the event",
      "Stops all other listeners on the same element from running",
      "Stops the event from continuing to bubble up to ancestor handlers",
      "Removes the event listener after it has run once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you add or remove a CSS class on an element using JavaScript?",
    "topic": "DOM manipulation & events",
    "choices": [
      "Using element.classList.add and element.classList.remove",
      "Using element.style.class with a string of class names",
      "Using element.setClass and element.unsetClass",
      "Using document.styles.update with the selector string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which DevTools panel is the best place to inspect and edit the CSS applied to an element?",
    "topic": "Browser DevTools basics",
    "choices": [
      "The Network panel with its timing tab",
      "The Console panel with its filter bar",
      "The Application panel with its storage tree",
      "The Elements panel with its Styles pane"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which DevTools panel shows each request the page makes, with status and timing?",
    "topic": "Browser DevTools basics",
    "choices": [
      "Elements",
      "Network",
      "Sources",
      "Performance"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does console.log() do?",
    "topic": "Browser DevTools basics",
    "choices": [
      "Writes the value into the page for the user to see",
      "Prints a value to the browser console for debugging",
      "Saves the value into a log file on the server",
      "Pauses the script so the value can be edited"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you pause JavaScript execution at a specific line to inspect variables?",
    "topic": "Browser DevTools basics",
    "choices": [
      "Add a console.pause call before that line in the file",
      "Switch the Network panel to offline mode first",
      "Lock the Elements panel so that styles stop updating",
      "Set a breakpoint on that line in the Sources panel"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tool shows what the page looks like on a small phone screen without owning one?",
    "topic": "Browser DevTools basics",
    "choices": [
      "Device toolbar for responsive mode",
      "The Lighthouse report summary",
      "The Coverage tab in the DevTools drawer",
      "The Memory panel heap snapshot"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good first check when a script file fails to load on a page?",
    "topic": "Browser DevTools basics",
    "choices": [
      "Clear the Elements panel and reload the page two times in a row to be sure",
      "Edit the HTML in the Elements panel until the missing file finally appears",
      "Open the Network panel and read the request status and Console errors",
      "Disable JavaScript in the browser settings and then retry loading the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where can you see data stored in localStorage and cookies for a site?",
    "topic": "Browser DevTools basics",
    "choices": [
      "The Performance panel in DevTools",
      "The Lighthouse panel in DevTools",
      "The Application panel in DevTools",
      "The Security panel in DevTools"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Lighthouse in DevTools provide?",
    "topic": "Browser DevTools basics",
    "choices": [
      "Automated audits for performance, accessibility, SEO and best practices",
      "A live feed of every request that the web server receives from its visitors",
      "A visual editor that rewrites the page HTML while you click on its elements",
      "A tool that compiles the web page into a native application for the desktop"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the red error in the Console with a file name and line number usually tell you?",
    "topic": "Browser DevTools basics",
    "choices": [
      "That the stylesheet contains a syntax error somewhere on that exact line",
      "That the server answered with a 500 response for the file on that line",
      "That the browser has blocked every one of the scripts loaded on the page",
      "Where the uncaught exception was thrown, so you can open that line"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it useful to disable the cache in the Network panel while debugging?",
    "topic": "Browser DevTools basics",
    "choices": [
      "It makes the server respond faster to requests that are repeated many times",
      "You always load fresh files from the server, not old cached copies",
      "It stops the browser from sending cookies along with each request it makes",
      "It lets the page load without any working connection to the network at all"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-2

```json
[
  {
    "stem": "What does the destructuring statement const { name, age } = user do?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "Creates a copy of user and stores its first two keys inside a new array",
      "Deletes the name and age properties from the original user object after reading",
      "Creates variables name and age from the same named properties of user",
      "Assigns the whole user object to both name and age as two separate variables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the spread syntax in [...arr1, ...arr2] produce?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "A new array with the elements of arr1 followed by the elements of arr2",
      "A nested array that holds arr1 and arr2 as two separate entries inside it",
      "The original arr1 changed in place with the elements of arr2 pushed onto its end",
      "An object whose keys are the numeric indexes of the elements of both arrays"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does an arrow function differ from a regular function regarding this?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "It always binds this to the global object regardless of where it is defined",
      "It binds this to the function itself so recursion works without a name",
      "It receives this as an extra first argument when it is called",
      "It does not have its own this and uses the this of the surrounding scope"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a default parameter value in function greet(name = \"guest\") do?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "Uses \"guest\" whenever the argument is falsy, including 0 and empty string",
      "Uses \"guest\" only when the argument is undefined or not passed",
      "Makes the function throw an error if a name is passed in",
      "Defines a global variable called name set to \"guest\""
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which import syntax loads a default export from an ES module?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "import { default } from \"./utils.js\" as utils",
      "import utils from \"./utils.js\"",
      "require default utils from \"./utils.js\"",
      "import * default from \"./utils.js\""
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between named exports and a default export?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "A module can have many default exports but only one named export",
      "Named exports can only be functions and default exports can be anything",
      "Default exports are loaded lazily and named exports are loaded at start",
      "A module can have many named exports but only one default export"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the optional chaining expression user?.address?.city return when user.address is undefined?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "undefined, without throwing an error",
      "null, because the chain stops at the missing property",
      "An empty string for the missing city value",
      "A TypeError saying address is not defined"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the nullish coalescing operator a ?? b return?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "b whenever a is any falsy value including 0 and empty string",
      "The logical AND of a and b converted to a boolean",
      "b only when a is null or undefined, otherwise a",
      "a and b joined into an array of two values"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the result of the template literal `Total: ${2 + 3}`?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "The string Total: 2 + 3",
      "The string Total: 23",
      "The string Total: 5",
      "A syntax error because of the plus sign"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the rest parameter in function sum(...nums) collect?",
    "topic": "ES6+ — destructuring, spread, arrow functions, modules",
    "choices": [
      "All the passed arguments into a real array called nums",
      "Only the last argument that was passed in the call",
      "The arguments into an object keyed by position",
      "Arguments after the first one, leaving the first inside the arguments object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a closure?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "A function that has no access to any variable that lives outside of its own body",
      "A block of code that is sealed against later changes by the JavaScript engine",
      "A function that the engine allows to run one single time before it is discarded",
      "A function that keeps access to variables of the scope where it was created"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is logged by the code: function make() { let n = 0; return () => ++n } const c = make(); c(); console.log(c())?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "1",
      "2",
      "0",
      "undefined"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the scope of a variable declared with let inside an if block?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "The whole function that contains the block",
      "Only that block, so it is not visible outside",
      "The whole file in which it is declared",
      "The global object of the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the temporal dead zone?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "The time the garbage collector needs to find and free the variables that nobody uses",
      "The delay before the callback given to setTimeout is allowed to run by the engine",
      "The period during which a Promise has been created but cannot yet be resolved",
      "The time between entering a scope and the let or const declaration, when reading throws"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the prototype chain do when you read a property that is not on an object?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "The engine looks along the prototype chain until it reaches null",
      "The engine returns undefined immediately without looking at any other object",
      "The engine copies the property from the global object into the instance first",
      "The engine throws a ReferenceError that names the property which is missing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Object.create(proto) do?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "Creates a copy of proto and freezes the result",
      "Creates a class named after the proto value",
      "Creates a new object whose prototype is proto",
      "Creates a new object with every property of proto copied in"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In class Dog extends Animal, what does super() do inside the constructor?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "Creates a second copy of the Dog class in memory",
      "Removes the parent methods so Dog starts empty",
      "Calls the parent constructor so this is initialised",
      "Returns the prototype of the Dog instance"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does hoisting mean for function declarations?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "They can be called before the line where they appear in the code",
      "They are moved into the global scope even from inside other functions",
      "They are run automatically when the file is loaded",
      "They are deleted when no code references them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What common bug happens with var in a for loop that schedules setTimeout callbacks?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "Each callback receives a fresh copy and prints its own index",
      "The loop runs only once because var cannot be updated",
      "The callbacks run before the loop starts because of hoisting",
      "All callbacks see the same variable and print its final value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does bind do to a function?",
    "topic": "Closures, scope & the prototype chain",
    "choices": [
      "Calls the function right away with the given this value",
      "Returns a new function with this fixed to the value you pass",
      "Deletes the this value from the function permanently",
      "Makes the function run asynchronously on the next tick"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are the three states of a Promise?",
    "topic": "Promises & async/await",
    "choices": [
      "Waiting, running and finished",
      "Pending, fulfilled and rejected",
      "Created, resolved and closed",
      "Idle, active and failed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the await keyword do inside an async function?",
    "topic": "Promises & async/await",
    "choices": [
      "Blocks the whole program including other tasks until the promise settles",
      "Turns a regular value into a promise that never resolves",
      "Runs the promise on a separate operating system thread",
      "Pauses that function until the promise settles and then gives its value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an async function always return?",
    "topic": "Promises & async/await",
    "choices": [
      "A promise",
      "The value written after return",
      "undefined unless await is used",
      "A callback function"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle a rejected promise when using await?",
    "topic": "Promises & async/await",
    "choices": [
      "Add a finally block with no other code",
      "Call await twice so the second call catches the error",
      "Wrap the await in a try and catch block",
      "Nothing is needed because await ignores rejections"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Promise.all do if one of the promises rejects?",
    "topic": "Promises & async/await",
    "choices": [
      "The returned promise waits for all others and resolves with an array of errors",
      "The returned promise ignores the rejected one and resolves with the others",
      "The returned promise rejects with that error right away",
      "The returned promise stays pending until the rejected promise is retried"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Promise.allSettled return?",
    "topic": "Promises & async/await",
    "choices": [
      "A promise that resolves with the outcome of every input, success or failure",
      "A promise that rejects as soon as any single one of the input promises fails",
      "A promise that resolves with the result of the fastest input promise only",
      "An array holding only the rejected promises, with the successful ones removed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Promise.race resolve or reject with?",
    "topic": "Promises & async/await",
    "choices": [
      "The results of all promises that succeeded",
      "The result of the last promise to settle",
      "The first successfully fulfilled value, ignoring rejections",
      "The result of the first promise that settles"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the problem with the code: for each item in items, await fetch(item) inside a loop, when the requests are independent?",
    "topic": "Promises & async/await",
    "choices": [
      "The loop runs requests in parallel and may overload the server",
      "Requests run one after another, which is slower than running them in parallel",
      "The await keyword is not allowed inside any loop",
      "The fetch calls always fail because the loop does not return a value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is returned by .then(fn) on a promise?",
    "topic": "Promises & async/await",
    "choices": [
      "The same promise object so calls can be repeated",
      "A new promise that resolves with the value returned by fn",
      "The value that the original promise resolved with",
      "undefined, so then cannot be chained"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to an error thrown inside a .then callback?",
    "topic": "Promises & async/await",
    "choices": [
      "It is thrown synchronously to the caller of then",
      "It is ignored if no catch is attached anywhere",
      "It stops the event loop of the page",
      "It rejects the promise returned by that .then call"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does fetch return when the server responds with status 404?",
    "topic": "Fetch API & error handling",
    "choices": [
      "A promise that resolves with a response whose ok property is false",
      "A promise that rejects with a network error object",
      "A promise that stays pending until the request is retried",
      "The parsed JSON body of the not found page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does the promise returned by fetch reject?",
    "topic": "Fetch API & error handling",
    "choices": [
      "When the server returns any status code of 400 or above",
      "When the response body is not valid JSON",
      "When a network failure prevents the request from completing",
      "When the response takes longer than one second"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read a JSON body from a fetch response?",
    "topic": "Fetch API & error handling",
    "choices": [
      "Read response.body as a plain object directly",
      "Call JSON.parse on the response object itself",
      "Call response.json(), which returns a promise",
      "Read response.data after awaiting the fetch call"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which option sends a JSON body in a POST request with fetch?",
    "topic": "Fetch API & error handling",
    "choices": [
      "method POST, a Content-Type of application/json and body JSON.stringify(data)",
      "method POST and a body that is set to the raw JavaScript object directly",
      "method SEND with the data placed in the query string of the request url",
      "a data property on the options object that holds the object to be sent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does response.ok indicate?",
    "topic": "Fetch API & error handling",
    "choices": [
      "The server sent a body that is not empty",
      "The request was made over a secure connection",
      "The response was served from the browser cache",
      "The status code is in the range 200 to 299"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is the correct pattern for handling HTTP errors with fetch?",
    "topic": "Fetch API & error handling",
    "choices": [
      "Wrap fetch in try and catch alone and rely on the catch for every status code",
      "Check response.ok and throw an error when it is false",
      "Check that response.status equals 200 only",
      "Read response.error after awaiting the call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you cancel an in flight fetch request?",
    "topic": "Fetch API & error handling",
    "choices": [
      "Call response.close() on the pending response before awaiting its body",
      "Pass an AbortController signal in the options and call abort()",
      "Set the timeout property to zero inside the options of the request call",
      "Delete the promise object that fetch returned so that the request stops"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can a browser fetch to another origin fail even if the server responds?",
    "topic": "Fetch API & error handling",
    "choices": [
      "The browser blocks every request that uses HTTPS from a different domain",
      "The fetch function only supports requests to the same origin",
      "The response is too large to be stored in the cache",
      "The server response lacks the CORS headers that allow that origin"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you send query parameters safely with fetch?",
    "topic": "Fetch API & error handling",
    "choices": [
      "Build the url with URLSearchParams so values are encoded",
      "Join the values with plus signs and no encoding",
      "Put the values in the request body for a GET request",
      "Set them as custom headers on the request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the credentials include option do on a cross origin fetch?",
    "topic": "Fetch API & error handling",
    "choices": [
      "Adds the user name and password to the url of the request automatically",
      "Stores the response in the password manager that is built into the browser",
      "Sends cookies with the request and accepts cookies in the response",
      "Allows the server to read the local storage that belongs to the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does map do on an array?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "Changes the original array in place and returns undefined once it has finished",
      "Returns the first element for which the callback function returns a true value",
      "Returns a new array holding the result of calling the function on each element",
      "Returns a single value that is built from all of the elements in the array"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does filter return?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "A new array with only the elements where the callback returns a truthy value",
      "The first element that passes the test, or undefined when none of them does",
      "The original array with the failing elements removed in place and no copy made",
      "A number that counts how many of the elements passed the test in the callback"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does reduce do with the callback (acc, x) => acc + x and the initial value 0 on [1, 2, 3]?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "Returns an array of 1, 3 and 6",
      "Returns 3 because the last element is added to zero",
      "Returns 0 because the accumulator is not updated",
      "Returns 6"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method returns the first element that satisfies a test, or undefined?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "filter",
      "find",
      "some",
      "indexOf"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does some return?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "The first element that passes the test",
      "true if at least one element passes the test",
      "A new array of passing elements",
      "true only if every element passes the test"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which array method changes the original array?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "map",
      "filter",
      "slice",
      "sort"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does forEach return?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "undefined",
      "A new array of the callback results",
      "The original array for chaining",
      "The number of elements visited"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does arr.slice(1, 3) return for [10, 20, 30, 40]?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "The array [20, 30, 40]",
      "The array [10, 20, 30]",
      "The array [20, 30]",
      "The array [10, 40]"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the default behaviour of sort when called without a compare function?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "It sorts numbers from smallest to largest",
      "It sorts the elements in descending order",
      "It sorts elements as strings in ascending order",
      "It leaves the array in its original order"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does flatMap do?",
    "topic": "Array methods — map, filter, reduce",
    "choices": [
      "Maps each element, then flattens the result by one level",
      "Flattens an array of arrays by every nested level until none is left",
      "Maps only the first element of each nested array that it finds inside",
      "Removes the undefined values from the array and then maps the remaining ones"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the call stack track?",
    "topic": "Event loop & call stack",
    "choices": [
      "The list of all promises that were ever created by the page since it loaded",
      "The memory that is used by every object currently stored in the heap",
      "The queue of user input events that are still waiting to be handled",
      "The functions that are running now and where to return when each one finishes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a function calls itself with no stopping condition?",
    "topic": "Event loop & call stack",
    "choices": [
      "The engine detects the endless loop and quietly returns undefined instead",
      "The stack grows until a RangeError for maximum call stack size is thrown",
      "The function keeps running in the background without blocking the rest of the page",
      "The garbage collector removes the older calls to free up memory for new ones"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does setTimeout(fn, 0) do?",
    "topic": "Event loop & call stack",
    "choices": [
      "Runs fn immediately, before the next line of code in the current function",
      "Schedules fn after the current code and any pending microtasks have finished",
      "Runs fn on a separate thread at the same time as the main code runs",
      "Cancels the previous timer so that its callback function never gets to run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "In what order does the output appear for: console.log(1); setTimeout(() => console.log(2)); Promise.resolve().then(() => console.log(3)); console.log(4)?",
    "topic": "Event loop & call stack",
    "choices": [
      "1, 2, 3, 4",
      "1, 3, 4, 2",
      "1, 4, 2, 3",
      "1, 4, 3, 2"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which queue is processed first after the call stack becomes empty?",
    "topic": "Event loop & call stack",
    "choices": [
      "The microtask queue, which holds promise callbacks",
      "The macrotask queue, which holds timer callbacks",
      "The rendering queue, which holds style changes",
      "The network queue, which holds fetch responses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a long running synchronous loop freeze the page?",
    "topic": "Event loop & call stack",
    "choices": [
      "The browser pauses all network requests while a loop is running",
      "The loop fills the heap and forces the garbage collector to run",
      "JavaScript runs on one thread so nothing else can run until the loop ends",
      "The event loop deletes pending events when the stack is busy"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the role of the event loop?",
    "topic": "Event loop & call stack",
    "choices": [
      "It runs every queued task in parallel on the several cores of the processor",
      "It compiles the JavaScript source into machine code before running the program",
      "It moves the next queued task onto the call stack once the stack is empty",
      "It limits how many timers a single page is allowed to create at one time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does await do to the code that comes after it in an async function?",
    "topic": "Event loop & call stack",
    "choices": [
      "It continues later as a microtask once the awaited promise has settled",
      "It runs immediately, because await never pauses any code that follows it",
      "It is moved to a new thread that runs concurrently with the main program",
      "It is skipped whenever the awaited promise happens to have resolved already"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of these runs as a macrotask?",
    "topic": "Event loop & call stack",
    "choices": [
      "A promise then callback",
      "A queueMicrotask callback",
      "An await continuation",
      "A setTimeout callback"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should you avoid heavy computation directly in a click handler?",
    "topic": "Event loop & call stack",
    "choices": [
      "It makes the handler fire twice for every single click that the user makes",
      "It blocks the main thread and delays rendering and other events",
      "It stops the click event from bubbling up to the document of the page",
      "It causes the browser to clear the call stack early and lose pending work"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-3

```json
[
  {
    "stem": "What is JSX?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "A separate template language that React loads from standalone files at runtime",
      "A stricter version of HTML that browsers render without any build step at all",
      "A syntax extension that lets you write markup inside JavaScript code",
      "A CSS in JS format that React uses to style the components of an app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you embed a JavaScript expression inside JSX?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "Wrap it in curly braces",
      "Wrap it in double square brackets",
      "Wrap it in a template tag",
      "Prefix it with a dollar sign and parentheses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which attribute name is correct in JSX for assigning a CSS class?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "class",
      "cssClass",
      "classList",
      "className"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must a JSX expression return when a component renders several sibling elements?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "An array of strings joined by commas",
      "A single parent element or a fragment that wraps the siblings",
      "A separate return statement for each sibling element",
      "A call to document.createElement for each element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you write an inline style in JSX?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "Pass a string, as in style=\"color: red\"",
      "Pass an object, as in style={{ color: \"red\" }}",
      "Pass an array of CSS rule strings",
      "Use a styles attribute that holds a selector"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the self closing form of a JSX tag look like for an element with no children?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "The tag has no closing character, as in <img>",
      "The tag is closed with a separate end tag only",
      "The tag is wrapped in a fragment automatically",
      "The tag ends with a slash, as in <img />"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which JSX expression renders the text hello in uppercase?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "{greeting.toUpperCase()}",
      "<greeting.toUpperCase />",
      "{greeting} toUpperCase",
      "${greeting.toUpperCase()}"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does JSX use htmlFor instead of for on a label?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "The word for is reserved in CSS",
      "React renames for to a data attribute internally",
      "The word for is reserved in JavaScript",
      "The label element does not support for in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which values are ignored when rendered as JSX children?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "The number zero and the empty string",
      "Arrays with a single element",
      "true, false, null and undefined",
      "Strings that contain only spaces"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does React do with the expression {user} when user is a plain object?",
    "topic": "JSX syntax & expressions",
    "choices": [
      "It throws an error, because plain objects are not valid as a React child",
      "It prints the object on the page as a JSON string with all of its keys",
      "It renders the keys of the object as an unordered list of items",
      "It renders nothing at all and only writes a warning to the console"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a React functional component?",
    "topic": "Functional components & props",
    "choices": [
      "A class that extends React.Component and defines render",
      "A function that runs only once when the page loads",
      "A JavaScript object with a template property",
      "A function that receives props and returns JSX"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must a component name start with?",
    "topic": "Functional components & props",
    "choices": [
      "A lowercase letter",
      "An uppercase letter",
      "An underscore",
      "The word Component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a parent pass data to a child component?",
    "topic": "Functional components & props",
    "choices": [
      "Through a global variable that both components import",
      "Through props set as attributes on the child element",
      "Through a callback that the child returns to the parent",
      "Through the DOM by setting data attributes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a child component change the props it receives?",
    "topic": "Functional components & props",
    "choices": [
      "Yes, by assigning to props.value inside the component",
      "Yes, but only when the prop is a string",
      "Only when the child uses the useState hook on the prop",
      "No, props are read only and the parent must supply new values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the children prop?",
    "topic": "Functional components & props",
    "choices": [
      "The content placed between a component opening and closing tags",
      "An array of all the child components that the parent has ever rendered",
      "A list of the components rendered in the previous frame",
      "A reserved prop that contains the parent component name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does destructuring props in the function signature, as in function Card({ title }), achieve?",
    "topic": "Functional components & props",
    "choices": [
      "It makes the title prop required at runtime",
      "It copies the whole props object into component state",
      "It reads title directly from props without writing props.title",
      "It converts the prop to a string before using it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you give a prop a default value for a functional component?",
    "topic": "Functional components & props",
    "choices": [
      "Declare a variable named defaultProps inside the render",
      "Set the value in the parent every time the component is used",
      "Use a default parameter in the destructuring, such as { size = \"md\" }",
      "Call useDefault with the prop name inside the component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when a component re-renders because its parent re-rendered?",
    "topic": "Functional components & props",
    "choices": [
      "The function runs again with the latest props and returns new JSX",
      "The old output is kept and only the new props are saved for later use",
      "The browser reloads the whole page so that the update becomes visible",
      "The component is removed from the tree and then mounted again from scratch"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about a component rendering is correct?",
    "topic": "Functional components & props",
    "choices": [
      "Rendering should update the DOM directly with document.querySelector",
      "Rendering should fetch data and write it to local storage",
      "Rendering should run each time the user moves the mouse",
      "Rendering should be pure and give the same output for the same props and state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does React require a stable function identity for components defined at the top level?",
    "topic": "Functional components & props",
    "choices": [
      "Components that are defined inside others cannot receive props from the parent",
      "A component defined inside another one gets a new type each render and loses state",
      "Nested components cannot return JSX because they have no render method of their own",
      "React does not allow more than one function to be declared in the same file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the call const [count, setCount] = useState(0) give you?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "A reference object whose current property is 0",
      "The current state value and a function to update it, starting at 0",
      "A constant value and a function that deletes the state",
      "Two copies of the state that update independently"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should you not change state directly, as in count = count + 1?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "The value is changed but React shows the old value only on mobile",
      "JavaScript forbids assignment to variables returned by hooks",
      "It works but it is slower than calling the setter function",
      "React is not notified, so the component does not re-render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the second argument of useEffect control?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "When the effect runs, based on the values in the dependency array",
      "The delay in milliseconds that React waits before it runs the effect",
      "The number of times that the effect is allowed to run during the page life",
      "The component in the tree where the effect is supposed to run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when useEffect has an empty dependency array?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "It runs after every render",
      "It never runs unless the array is changed",
      "It runs once after the first render",
      "It runs before the first render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the function returned from a useEffect callback?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "It is the value that the component renders into the page after the effect runs",
      "It runs before the effect itself, but only during the very first render",
      "It cleans up, for example removing a listener, before the next run or on unmount",
      "It is the new state value that React saves for the next render of the component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is the right way to update state based on the previous value?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "Pass a function to the setter, as in setCount(c => c + 1)",
      "Read the variable and call setCount with a plain number twice",
      "Call setCount without arguments to increment",
      "Assign to count and then call setCount()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can an effect with no dependency array cause an infinite loop when it sets state?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "The effect is blocked until the state stops changing",
      "React disables the effect after the first state update",
      "State updates inside effects are queued until the page closes",
      "Each state update re-renders and the effect runs again after every render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When are state updates inside an event handler applied by React?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "They are applied immediately after each setter call",
      "They are batched and applied before the next render",
      "They are applied only after the page reloads",
      "They are discarded if two setters run in the same handler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about hooks is correct?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "Hooks may be called inside if statements as long as they return a value",
      "Hooks must be called at the top level of a component or custom hook",
      "Hooks may only be used inside class components",
      "Hooks run on the server before the component is created"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useState(() => expensiveInit()) do differently from useState(expensiveInit())?",
    "topic": "useState & useEffect hooks",
    "choices": [
      "The function runs on every render and the result is cached",
      "The function runs after the first effect completes",
      "The state is initialised to the function itself",
      "The function runs only on the first render instead of on every render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the recommended way to render a list of items in JSX?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Use map over the array and return an element with a key for each item",
      "Use a for loop written directly inside the JSX curly braces of the component",
      "Use forEach and return the array of elements that the loop builds up",
      "Write every element by hand and hide the extra ones with a CSS rule"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does each item in a rendered list need a key?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "The browser requires keys to keep the HTML valid",
      "Keys are passed to the component as props with the same name",
      "React uses keys to match items between renders and update the right ones",
      "Keys give each element a unique CSS class for styling"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which value is the best choice for a key?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "The item index in the array when items can be reordered",
      "A random number generated on each render",
      "A stable unique id from your data",
      "The text of the item when two items can have the same text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you render a component only when a condition is true?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Use the AND operator, as in {isOpen && <Modal />}",
      "Use an if statement inside the JSX braces",
      "Use the display property of the JSX element to hide it",
      "Return false from the component to show it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of using the AND operator with a number on the left, as in {items.length && <List />}?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "It throws an error whenever the array happens to be empty at render time",
      "It always renders the list component even when the array has no items",
      "It converts the whole list to a string before it is shown to the user",
      "When the length is 0, the number 0 is rendered on the screen"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which approach renders one of two elements based on a condition?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "The switch keyword inside the JSX braces",
      "The ternary operator, as in {cond ? <A /> : <B />}",
      "The when attribute on the element",
      "The or operator between the two elements"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to a component state when it is removed from the tree and added back later?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "It is kept until the page reloads",
      "It is lost, because the component is mounted fresh",
      "It is saved in local storage by default",
      "It is moved to the parent component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is using the array index as a key a problem for lists that can be reordered?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Indexes are not strings, so React throws an error when it sees a numeric key",
      "Indexes are always replaced by React with random numbers on every render",
      "Indexes make React render the entire list twice as slowly as other keys do",
      "The keys stop following the items, so state can attach to the wrong item"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you return nothing from a component?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Return null",
      "Return an empty string and a warning is shown",
      "Return false and React throws an error",
      "Return the keyword void"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does changing the key of a component do?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "React skips rendering that component",
      "React moves the component to the end of the list",
      "React treats it as a new component and resets its state",
      "React throws an error until the key is changed back"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a controlled input in React?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "An input that React is not allowed to update after the first render",
      "An input that stores its value inside the DOM and never in the component",
      "An input whose value comes from state and changes through onChange",
      "An input that stays disabled until the user submits the form for the first time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which attribute pair makes a text input controlled?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "value and onChange",
      "defaultValue and onBlur",
      "ref and onFocus",
      "name and onSubmit"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read the new value in an onChange handler of an input?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "event.value",
      "event.currentValue",
      "event.input.text",
      "event.target.value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does event.preventDefault() do inside onSubmit of a form?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "Stops the form values from being saved in state",
      "Stops the browser from reloading the page on submit",
      "Prevents the onChange event from firing later",
      "Resets every input to its original value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you handle several inputs with one state object?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "Create a separate setter call for each keystroke in every one of the inputs",
      "Use the input name attribute to update the matching key in the object",
      "Store every input value in a global variable that all components can read",
      "Use a different component for each input and keep their values apart"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an uncontrolled input?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "An input that the user can edit only once before it becomes read only",
      "An input that has no name attribute and so cannot be submitted at all",
      "An input that is updated through component state on every single keystroke",
      "An input whose value lives in the DOM and is read through a ref"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a controlled checkbox get its checked state?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "Through the checked prop with an onChange handler reading event.target.checked",
      "Through the value prop, which is set to true or to false for each render",
      "Through the defaultChecked prop only, which React keeps in sync with state",
      "Through a ref that is read and updated only when the form is submitted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you set the selected option of a select element in React?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "Add a selected attribute to the option element",
      "Use the selectedIndex prop on the select element",
      "Pass a value prop to the select element",
      "Set the option text equal to the state variable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem happens when an input has a value prop but no onChange handler?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "The input accepts typing but resets after a second",
      "React sets the value to an empty string on each render",
      "The input becomes read only and React warns about it",
      "The form cannot be submitted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why would you store form errors in state?",
    "topic": "Handling forms & controlled inputs",
    "choices": [
      "So the component re-renders to show them next to the fields",
      "So the browser can send them to the server automatically",
      "So they stay after the page is closed",
      "So that React validates the inputs for you"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does composition mean in React?",
    "topic": "Component composition patterns",
    "choices": [
      "Writing every component as a class that extends another class in the project",
      "Merging all of the components into one very large file for easier reading",
      "Sharing state between unrelated components through global variables on window",
      "Building complex UIs by combining smaller components, often through children"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is lifting state up?",
    "topic": "Component composition patterns",
    "choices": [
      "Moving state into a global variable available everywhere",
      "Moving state to the nearest common parent so siblings can share it",
      "Moving state into the child component that uses it most",
      "Moving state into local storage so components can read it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which pattern lets a parent customise what a child renders without the child knowing the content?",
    "topic": "Component composition patterns",
    "choices": [
      "Using inheritance from the parent component",
      "Passing JSX as children or as a render prop",
      "Reading the parent props with document.querySelector",
      "Calling the parent function from the child constructor"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do most React teams prefer composition over inheritance?",
    "topic": "Component composition patterns",
    "choices": [
      "Inheritance is not supported by the JavaScript language in any form",
      "Composition makes the components run only on the server before the page loads",
      "Inheritance forces every component to be class based, which makes it slow",
      "Composition gives flexible reuse without tight coupling between components"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a child tell its parent that something happened?",
    "topic": "Component composition patterns",
    "choices": [
      "By calling a function that the parent passed down as a prop",
      "By changing the state of the parent component directly from inside the child",
      "By dispatching a DOM event that React then hides from the other components",
      "By returning the new value from its render function to the parent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a presentational component?",
    "topic": "Component composition patterns",
    "choices": [
      "A component that fetches data from the server and keeps the application state",
      "A component that can only be used on the first page of the application",
      "A component that focuses on how things look and receives data through props",
      "A component that has no props at all and always renders the same markup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is prop drilling?",
    "topic": "Component composition patterns",
    "choices": [
      "Reading props from deep inside the DOM tree with a query selector call",
      "Replacing props with state inside each one of the child components",
      "Passing props through several intermediate components that do not use them",
      "Looping over the props object with a for loop in every component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of a fragment, written as <>...</>?",
    "topic": "Component composition patterns",
    "choices": [
      "It groups siblings without adding an extra element to the DOM",
      "It speeds up rendering by skipping the virtual DOM",
      "It adds a hidden wrapper that is used for styling",
      "It lets a component return several components with the same key"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a sign that a component should be split into smaller ones?",
    "topic": "Component composition patterns",
    "choices": [
      "It receives more than one prop from the parent component that renders it",
      "It contains a single hook call at the top of its function body",
      "It returns JSX that spans more than one line of the source file",
      "It does several unrelated jobs and is hard to read or to reuse"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does it mean that React data flows one way?",
    "topic": "Component composition patterns",
    "choices": [
      "Data goes from children to parents through props, and parents answer with events",
      "Data goes down through props, and children send events up through callbacks",
      "Data is shared between all components through the DOM instead of through props",
      "Data can only be changed one single time during each render of a component"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-4

```json
[
  {
    "stem": "What problem does the Context API solve?",
    "topic": "useContext & the Context API",
    "choices": [
      "Storing component state permanently in the browser between two visits to the page",
      "Running side effects such as data fetching after each render of a component",
      "Sharing a value with many nested components without passing props at each level",
      "Keeping a component from re-rendering when its props happen to change"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function creates a context object?",
    "topic": "useContext & the Context API",
    "choices": [
      "createContext",
      "useContext",
      "makeContext",
      "React.provide"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a Provider component do?",
    "topic": "useContext & the Context API",
    "choices": [
      "Creates a separate copy of the context value for each one of its child components",
      "Saves the context value into the local storage of the browser for later visits",
      "Blocks the components that sit outside of it from rendering anything at all",
      "Makes its value available to every component below it that reads the context"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a component read a context value?",
    "topic": "useContext & the Context API",
    "choices": [
      "Import the Provider and read its props",
      "Call useContext with the context object",
      "Call createContext inside the component",
      "Read the value from the window object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to components that read a context when the Provider value changes?",
    "topic": "useContext & the Context API",
    "choices": [
      "They keep the old value until the page reloads",
      "They re-render with the new value",
      "They are unmounted and mounted again",
      "Only the Provider itself re-renders"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can passing a new object literal as a Provider value cause extra re-renders?",
    "topic": "useContext & the Context API",
    "choices": [
      "Objects cannot be passed as context values because they are not serialisable",
      "The Provider refuses every value that is not a primitive such as a string",
      "React copies large objects slowly, so each update takes extra time to apply",
      "The object has a new identity on each render, so consumers see a change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What value does useContext return when there is no matching Provider above the component?",
    "topic": "useContext & the Context API",
    "choices": [
      "The default value given to createContext",
      "Always undefined",
      "The value from the nearest class component",
      "An error is thrown unconditionally"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is context a poor fit?",
    "topic": "useContext & the Context API",
    "choices": [
      "For a theme or a locale that is set once and rarely changes afterwards",
      "For the logged in user, whom many components in the tree need to know",
      "For values that change very often and are read by many components",
      "For a language setting that is shared by every screen of the whole app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which describes the difference between context and props?",
    "topic": "useContext & the Context API",
    "choices": [
      "Context is faster than props in every situation, so props should be avoided",
      "Props can be changed by the child component, but context values cannot be",
      "Context skips intermediate components, while props go from parent to child",
      "Context only works with class components, while props work with both kinds"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a sensible way to organise a context in a larger project?",
    "topic": "useContext & the Context API",
    "choices": [
      "Keep the context, its Provider and a custom hook in one module and export the hook",
      "Create a brand new context for every single component of the application",
      "Keep the context object inside the root file of the application only",
      "Write the Provider value inline in every component that makes use of it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is useReducer a better choice than useState?",
    "topic": "useReducer for complex state",
    "choices": [
      "When the state is a single boolean that is toggled by one button on the page",
      "When you want to avoid re-renders of the component completely in every case",
      "When the state value must be saved to a server after each user change",
      "When state has several related fields or the next state depends on actions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a reducer function receive and return?",
    "topic": "useReducer for complex state",
    "choices": [
      "A component and a prop value, and it returns the JSX that will be shown",
      "The current state and an action, and it returns the next state",
      "An event and a handler function, and it returns undefined after running",
      "The next state and an action, and it returns the previous state of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does dispatch do?",
    "topic": "useReducer for complex state",
    "choices": [
      "Reads the current state value out of the store for use in a component",
      "Sends an action to the reducer so that a new state is computed",
      "Subscribes a component to updates of a context so it can re-render",
      "Runs the reducer function a single time when the application starts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must a reducer be a pure function?",
    "topic": "useReducer for complex state",
    "choices": [
      "It is only allowed to run once, when the component first mounts on the page",
      "It must call the server to confirm each action before it returns a state",
      "It must change the existing state object in place so that updates are fast",
      "Given the same state and action it must always return the same result, with no side effects"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is wrong with the reducer case: state.items.push(action.item); return state?",
    "topic": "useReducer for complex state",
    "choices": [
      "It mutates the existing state, so React may not see a change",
      "It returns the wrong type of value",
      "It is correct and recommended for lists",
      "It calls the action before the state is created"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the second argument of useReducer provide?",
    "topic": "useReducer for complex state",
    "choices": [
      "The dispatch function",
      "The list of actions allowed",
      "The initial state",
      "The default context value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which action shape is the most common convention?",
    "topic": "useReducer for complex state",
    "choices": [
      "A plain string with the new state inside",
      "A function that receives the state",
      "An object with a type field and an optional payload",
      "An array with the state as its first item"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a reducer usually return for an unknown action type?",
    "topic": "useReducer for complex state",
    "choices": [
      "The current state, or it throws an error in strict setups",
      "An empty object, so that the component starts again from a clean state",
      "null, so that the component resets and the UI shows its initial screen",
      "undefined, so that React skips the update and keeps the old render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can useReducer help when combined with context?",
    "topic": "useReducer for complex state",
    "choices": [
      "Make the state persist on the server automatically",
      "Remove the need for any actions at all",
      "Replace the component tree with a single list",
      "Share state and dispatch with many components through a Provider"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can passing dispatch to children be easier than passing many callbacks?",
    "topic": "useReducer for complex state",
    "choices": [
      "Dispatch is faster than any other function",
      "The dispatch function keeps the same identity across renders",
      "Dispatch can be called only once per render",
      "Children cannot read callbacks passed as props"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "A class component that holds some state on behalf of other components",
      "A function whose name starts with use and that calls other hooks",
      "A built in hook that becomes available after installing an extra package",
      "A component that returns nothing and is used only for its side effects"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must the name of a custom hook start with use?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Because JavaScript requires it for any function with state",
      "So the function is called automatically on mount",
      "Because only names with use can return values",
      "So that linting and React can check the rules of hooks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do two components get when they both call the same custom hook that uses useState?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Separate state, because each call creates its own state",
      "Shared state, because the hook has one state",
      "The same state only when the page reloads",
      "An error because a hook cannot be reused"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a good candidate for a custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "A single constant that is used in exactly one place of one component",
      "Markup that is repeated in two different components on the same page",
      "Logic that reads a value from local storage and keeps it in state",
      "A CSS rule that is shared by all of the buttons of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a custom hook return?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Only JSX elements, because a hook is a kind of component in React",
      "Only a single state value, because hooks return one thing each time",
      "Anything: a value, an array, an object or a function",
      "Only a promise, because hooks are used for asynchronous work alone"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a hook like useFetch(url) typically manage?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "The data, loading and error state of a request",
      "The styling that is applied to the response when it is displayed",
      "The routes of the application that are available to the user",
      "The reducer and the actions for the entire state of the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you avoid a stale response in a fetching hook when the url changes quickly?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Run every request twice and then use the answer that arrives faster",
      "Increase the delay of each new request so that old ones finish first",
      "Store every response in an array and show the first one that was saved",
      "Ignore older results with a flag or an abort signal in the effect cleanup"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a custom hook call another custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "No, only built in hooks can be called inside hooks",
      "Yes, hooks can be composed from other hooks",
      "Only when the hooks live in the same file",
      "Only when both hooks return arrays"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good way to test the idea that logic belongs in a custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "The logic is a pure helper function without any React feature inside it",
      "The logic uses state or effects and is needed by more than one component",
      "The logic is used one single time inside one file of the project",
      "The logic only needs a plain variable and never changes during the render"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a debounce hook usually return?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "A function that clears the whole page when the user stops typing in the input",
      "A list holding every value that the input has ever had since it was mounted",
      "The very first value of the input, which never updates after the first render",
      "A value that updates only after the input has stopped changing for a delay"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which component defines the router for a browser app in React Router v6?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "BrowserRouter",
      "HashLink",
      "RouterSwitch",
      "RouteProvider"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What replaced the Switch component in v6?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "Router",
      "Path",
      "Routes",
      "Outlet"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read a url parameter such as /users/:id in a component?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "Read props.params.id",
      "Read window.location.id",
      "Call useParams and read the id property",
      "Call useLocation and parse the string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Outlet component do?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "Renders the matched child route inside the parent layout",
      "Opens the page of the matched child route in a new browser tab",
      "Exports the matched route so that another application can import it",
      "Redirects the visitor to the home page when no route has matched"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which component renders a link that does not reload the page?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "a",
      "Anchor",
      "Navigate",
      "Link"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of the NavLink component?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "A link that opens its target in a new window each time it is clicked",
      "A link that knows if it matches the current url, so you can style it",
      "A link that fetches the data of the next page before it navigates there",
      "A link that is hidden on mobile devices and shown on desktop screens only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you navigate from code, for example after a form submit?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "Assign a new value to window.location.hash",
      "Call the function returned by useNavigate",
      "Call history.push from the component props",
      "Return a Link from the handler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define a nested route?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "Write a longer path string and let the router split it into nested parts",
      "Wrap the child in a second BrowserRouter that is placed inside the first",
      "Use two Routes components at the root of the application, one for each level",
      "Put a Route inside another Route and render an Outlet in the parent element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a route with path set to the asterisk usually show?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "A not found page for any unmatched url",
      "The home page for every url",
      "A redirect to the login page",
      "The first nested route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read query string values such as ?page=2?",
    "topic": "React Router v6 — nested routes, params",
    "choices": [
      "useParams",
      "useNavigate",
      "useSearchParams",
      "useRoutes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is code splitting?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "Splitting the source code into several git repositories",
      "Dividing a component into two files",
      "Breaking the bundle into smaller pieces that load when needed",
      "Compressing the bundle with gzip"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function loads a component lazily in React?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "React.lazy",
      "React.defer",
      "React.import",
      "React.chunk"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must wrap a lazy loaded component?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "StrictMode",
      "A Provider with a lazy value",
      "ErrorBoundary only",
      "Suspense with a fallback"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the dynamic import() expression return?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "The module immediately",
      "A promise that resolves to the module",
      "A callback to load the module",
      "The path to the file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is a good place to split a bundle in a typical app?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "Inside every small button component",
      "At route level, so each page loads only when visited",
      "In the middle of a function",
      "Between two lines of the same component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Suspense fallback prop show?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "The error message of a failed request",
      "The previous version of the page",
      "Nothing, it only logs a message",
      "A placeholder while the lazy component is loading"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of splitting too finely?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "More network requests and possible loading flashes",
      "The code stops working in production",
      "Each chunk has to be written in a different language",
      "Components lose their props"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you start loading a chunk before the user clicks a link?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "Add a longer fallback text",
      "Load it in a worker without import",
      "Preload it on hover or when the browser is idle",
      "Duplicate the code in the main bundle"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does React.lazy require from the imported module?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "A named export called Component",
      "A function named load",
      "A default export that is a component",
      "A file that ends with lazy.js"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a bundler do when it sees a dynamic import() call?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "It emits the imported module as a separate chunk that is fetched when the call runs",
      "It inlines the module into the main bundle and removes the import call",
      "It replaces the call with a static import at the top of the file",
      "It skips the module and leaves the import for the browser to resolve later"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does React.memo do?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "Stores the output of the component in local storage for later visits",
      "Makes a component update twice as fast by running its code on a worker",
      "Prevents any state change inside the component from causing a re-render",
      "Skips re-rendering a component when its props have not changed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does useMemo cache?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "The DOM nodes of the component, so that they are not created again",
      "The result of a calculation between renders, until its dependencies change",
      "The props that were received from the parent in the previous render",
      "The network response of a fetch call made while the component renders"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useCallback return?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "A promise that resolves to the function after the next render has finished",
      "The same function between renders, until its dependencies change",
      "A new function on every render, which is then compared by React",
      "The result of calling the function once with the current dependencies"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why might React.memo not help when the parent passes a new inline function as a prop?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "Memo only works for props that are numbers and not for any other type",
      "Memo ignores function props completely when it compares the old and new ones",
      "Functions cannot be passed as props to components that are wrapped in memo",
      "The function has a new identity every render, so the props look changed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do before adding useMemo everywhere?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "Measure with the profiler to find real slow renders",
      "Wrap every value in useMemo to be safe",
      "Remove all state from the app",
      "Disable StrictMode permanently"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which situation is a good use of useMemo?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "Adding two small numbers together inside the body of the component",
      "Reading a single prop value that was passed down by the parent",
      "Filtering and sorting a large list that does not need to change on every render",
      "Calling the state setter function inside an event handler of a button"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the dependency array of useMemo decide?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "Which component runs the calculation",
      "How many times the value can be used",
      "When the cached value is recomputed",
      "Where the value is stored"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a cost of overusing memoisation?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "Extra memory use and more complex code, with little or no speed gain",
      "The application can no longer render lists that are longer than ten items",
      "The application loses its state each time a memoised value is recalculated",
      "The bundle cannot be split into chunks when memoised functions are present"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which tool shows why a component rendered in the browser?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "The Network panel",
      "The Lighthouse SEO audit",
      "The Application panel",
      "The React DevTools Profiler"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which technique avoids rendering thousands of list rows at once?",
    "topic": "Performance — useMemo, useCallback, React.memo",
    "choices": [
      "Wrapping the whole list in a useCallback so that it renders only once",
      "Virtualisation, which renders only the rows that are visible on screen",
      "Using the index of each item as its key so that React can skip rows",
      "Rendering the list twice so that the browser can cache the first pass"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-5

```json
[
  {
    "stem": "What is Node.js?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "A browser extension that speeds up the execution of JavaScript on web pages",
      "A database that stores JSON documents on a server for web applications",
      "A JavaScript runtime that runs outside the browser on the V8 engine",
      "A framework that builds user interfaces out of components for web pages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is Node.js well suited to handling many simultaneous network requests?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "It uses a non blocking event loop so waiting on I/O does not stop other work",
      "It starts a new operating system thread for every request",
      "It runs each request in a separate process for isolation",
      "It queues requests and handles them strictly one at a time to be safe"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which syntax loads a module in CommonJS?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "import fs from \"fs\"",
      "include fs from \"fs\"",
      "load(\"fs\")",
      "const fs = require(\"fs\")"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you tell Node to treat .js files as ES modules?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "Rename every file to end with .es",
      "Set type to module in package.json",
      "Add use modules at the top of the file",
      "Install the esm package globally"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does module.exports do in a CommonJS file?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "Imports every other file of the project into this one automatically",
      "Defines what other files receive when they require this file",
      "Exports the file to the public npm registry when the code is run",
      "Makes every variable of the file global for all of the other files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the role of package.json?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "It stores the compiled output of the project",
      "It lists the files that Git must ignore",
      "It holds the secrets that the server needs",
      "It describes the project, its scripts and its dependencies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the node_modules folder contain?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "The installed dependencies of the project",
      "The source code of the Node runtime",
      "The compiled version of your own code",
      "The log files from running scripts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between dependencies and devDependencies?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "dependencies are installed only on the machine of the developer and not on servers",
      "devDependencies are installed only in production to keep the server image small",
      "devDependencies are needed only while developing, such as test and build tools",
      "They are identical in every way and only the two property names differ"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does process.env give you access to?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "The list of installed npm packages",
      "The current working directory only",
      "The environment variables of the running process",
      "The command line arguments only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about the Node event loop is correct?",
    "topic": "Node.js runtime & module system (CommonJS / ESM)",
    "choices": [
      "Callbacks for finished I/O run when the call stack is empty",
      "Each callback runs on its own thread at the same time",
      "The loop ends after the first request is served",
      "Callbacks run in the order the files were written"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command creates an Express app instance in code?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "const app = new Express.Server()",
      "const app = createApp(express)",
      "const app = express.listen()",
      "const app = express()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does app.get(\"/users\", handler) do?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "Fetches the /users page from another server",
      "Registers a handler for GET requests to the path /users",
      "Reads a setting called /users from the app",
      "Gets every handler registered for the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the id from the route /users/:id in Express?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "req.query.id",
      "req.params.id",
      "req.body.id",
      "res.params.id"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read a query string value like ?page=2 in Express?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "req.params.page",
      "req.body.page",
      "req.url.page",
      "req.query.page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method sends a JSON response in Express?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "res.json(data)",
      "res.write(data)",
      "res.render(data)",
      "res.json.send(data)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does res.status(404) do on its own?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "Sends the response to the client immediately, with a 404 message as its body",
      "Throws a 404 error that is caught by the error handler of the whole app",
      "Sets the status code for the response and returns the response for chaining",
      "Redirects the request to a separate page that is designed for 404 errors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does app.listen(3000) do?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "Creates a database connection on port 3000",
      "Opens port 3000 on the router of the network",
      "Starts the server and listens for connections on port 3000",
      "Registers a route for the path 3000"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why separate routes from controllers?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "It keeps route files small and puts logic in functions that are easy to test",
      "Express requires exactly one file for each route that the application defines",
      "It makes the routes faster to match because the router can skip controllers",
      "It allows the server to run without any HTTP layer when the tests are started"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does express.Router() provide?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "A replacement for the HTTP protocol that works between two Express servers",
      "A tool that forwards incoming requests to other servers on the network",
      "A database layer that stores the route definitions in a collection",
      "A mini application that groups related routes to mount under a path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a request when no route matches?",
    "topic": "Express setup, routing & controllers",
    "choices": [
      "The server crashes with an error and has to be restarted by the process manager",
      "Express answers with a default 404 unless you add your own handler",
      "The request is handed to the first route that was registered in the app",
      "The request waits in a queue until a matching route is added to the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is middleware in Express?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "A database table that stores the details of every request for later checks",
      "A function that gets req, res and next and runs in the request pipeline",
      "A route that runs only for POST requests and parses their JSON bodies",
      "A template that is used to render the HTML pages sent back to clients"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must a middleware do if it does not end the response?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "Return a value from the function",
      "Call app.listen again",
      "Send an empty response automatically",
      "Call next() to pass control to the next handler"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which middleware parses JSON request bodies in Express?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "express.json()",
      "express.body()",
      "express.parse()",
      "bodyReader()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Express recognise an error handling middleware?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "It is registered with app.error",
      "It has the name errorHandler",
      "It takes four arguments, with err first",
      "It returns a status code number"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should the error handling middleware be placed?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "Before every other middleware",
      "Inside each route handler",
      "After all routes and other middleware",
      "In a separate server process"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens if a route handler calls next(err) with an error?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "Express skips to the error handling middleware",
      "The request continues to the next route normally",
      "The server stops listening",
      "The error is logged and ignored"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a typical use of a logging middleware?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "Replace the body of the response with a short message that is written to a log",
      "Stop the request whenever the log file on the disk happens to be missing",
      "Convert the JSON body of each response to XML before it is sent to the client",
      "Record the method, url and time of each request, then pass it on"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does the order of app.use calls matter?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "Middleware runs alphabetically by function name",
      "Middleware runs in the order it is registered",
      "Only the last registered middleware runs",
      "Order matters only for error handlers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of validation middleware?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "Encrypt the request body so that proxies on the network cannot read it",
      "Reject bad input early with a 400 response before the controller runs",
      "Cache every response of the route so that repeated calls are served faster",
      "Convert every number in the request body to a string before it is used"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an async route handler need in Express 4 to forward a thrown error to the error handler?",
    "topic": "Middleware — logging, validation, error handling",
    "choices": [
      "Nothing, Express 4 always catches async errors",
      "A try block with no catch",
      "Returning the error from the handler",
      "Wrapping the handler or catching and calling next(err)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which HTTP method is conventionally used to create a new resource?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "POST",
      "GET",
      "PATCH",
      "HEAD"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between PUT and PATCH?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "PATCH replaces the whole resource and PUT changes some fields",
      "PUT creates and PATCH deletes",
      "PUT replaces the whole resource and PATCH changes only some fields",
      "They are identical in meaning"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that a REST API is stateless?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "The API never stores any data in a database between two separate requests",
      "The API returns exactly the same response for every request that it receives",
      "Each request carries all that the server needs, and no client session is kept",
      "The API cannot use any form of authentication because it has no memory"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which URL follows common REST naming?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "GET /users/42",
      "GET /getUserById?id=42",
      "POST /deleteUser/42",
      "GET /user/fetch/42"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code should a successful creation return?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "200",
      "204",
      "302",
      "201"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code is returned when the request body is invalid?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "500",
      "400",
      "404",
      "301"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a 401 status code mean?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "The user is logged in but not allowed to do this",
      "The request lacks valid authentication credentials",
      "The resource was not found",
      "The server had an internal error"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a 403 status code mean?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "The request needs a login before the server can process it any further",
      "The page was moved to a new address and the client should follow it",
      "The request took too long and the server gave up waiting for it",
      "The server understood the request, but the user is not permitted"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is idempotency for an HTTP method?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "Repeating the same request leaves the server in the same state as sending it once",
      "The method always returns exactly the same response body every time it is called",
      "The method never changes any data stored on the server in any situation",
      "The method may be sent only one time before the server rejects it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should list endpoints support pagination?",
    "topic": "RESTful API design & HTTP methods",
    "choices": [
      "To hide some of the items from the client who is calling the API",
      "To make the requests safer against attacks that send too much data",
      "To avoid returning huge responses and to keep queries fast",
      "To sort the items by their name before they are returned to the client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are secrets kept in environment variables instead of in the code?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "So that Node encrypts them automatically before the application reads them",
      "So that the code runs faster because values are read from memory directly",
      "So they stay out of the repository and can differ for each environment",
      "So that they can be read in the browser by the front end bundle"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the dotenv package do?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "Loads variables from a .env file into process.env",
      "Encrypts the .env file",
      "Creates a database for the app",
      "Sends variables to the client bundle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Should the .env file be committed to Git?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "Yes, so that every developer on the team has exactly the same values",
      "Yes, but only the secrets that are used for production deployments",
      "Only when the repository is private and the team trusts all its members",
      "No, it should be ignored, and an example file shared instead"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What file name is commonly used to document required variables without secrets?",
    "topic": "Environment variables & dotenv",
    "choices": [
      ".env.public",
      ".env.example",
      ".env.backup",
      "env.json"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What type are values read from process.env?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "Numbers or booleans depending on the value",
      "Strings",
      "Objects",
      "Whatever the file defines"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which expression reads the PORT variable and falls back to 3000 when it is not set?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "process.env.PORT.default(3000)",
      "process.env.get(\"PORT\", 3000)",
      "process.env(\"PORT\") ?? 3000",
      "process.env.PORT ?? 3000"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why validate environment variables at startup?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "To fail fast with a clear message when something required is missing",
      "To make the server start up faster by skipping the unused variables",
      "To remove the variables that the application does not use from memory",
      "To encrypt the values before the application reads them for the first time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if process.env.PORT is not set and the code calls Number(process.env.PORT)?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "The result is zero",
      "The result is 3000 by default",
      "The result is NaN",
      "An error is thrown"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must you never expose a server secret in client side React code?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "The browser deletes every secret that it receives after one hour has passed",
      "React cannot read any environment variable at all while it renders",
      "Anything bundled into the browser can be read by every visitor",
      "Secrets make the page load slower because they are very long strings"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you normally set environment variables for a deployed Node app?",
    "topic": "Environment variables & dotenv",
    "choices": [
      "In the settings of the hosting platform",
      "In the package.json file",
      "In the public folder",
      "In the README file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Node module reads and writes files?",
    "topic": "Working with the file system",
    "choices": [
      "path",
      "http",
      "os",
      "fs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do most Node programs use the promise based fs API?",
    "topic": "Working with the file system",
    "choices": [
      "It is the only API in Node that is able to read files from the disk",
      "It works with async and await and does not block the event loop",
      "It runs faster than the callback API in every situation, whatever the file size",
      "It never throws an error, so no try and catch block is needed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between fs.readFile and fs.readFileSync?",
    "topic": "Working with the file system",
    "choices": [
      "readFile blocks while readFileSync does not",
      "readFileSync blocks the event loop until the file is read",
      "readFileSync only reads small files",
      "They are the same except for name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should you avoid synchronous file functions inside a request handler?",
    "topic": "Working with the file system",
    "choices": [
      "They cannot read text files",
      "They throw an error in production",
      "They are removed from Node",
      "They block the event loop so other requests wait"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which module helps build file paths that work on every operating system?",
    "topic": "Working with the file system",
    "choices": [
      "path",
      "url",
      "buffer",
      "stream"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does path.join(__dirname, \"data\", \"a.json\") do?",
    "topic": "Working with the file system",
    "choices": [
      "Reads the file named a.json and returns its contents as text",
      "Creates the folder called data if it does not exist yet on the disk",
      "Builds a path using the right separators for the system",
      "Returns the name of the folder where the file a.json is stored"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use streams for a very large file?",
    "topic": "Working with the file system",
    "choices": [
      "They compress the file automatically while it is being read from the disk",
      "They make the file read only so that no other process can change it",
      "They process the data in chunks, without loading the whole file into memory",
      "They store the contents of the file in the database as it is read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does fs.promises.writeFile do if the file already exists?",
    "topic": "Working with the file system",
    "choices": [
      "It replaces the file contents by default",
      "It appends the new data to the end",
      "It throws an error",
      "It renames the old file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does JSON.parse do when given invalid JSON?",
    "topic": "Working with the file system",
    "choices": [
      "Returns null",
      "Returns an empty object",
      "Returns the string unchanged",
      "Throws a SyntaxError"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you safely store user uploads on the server?",
    "topic": "Working with the file system",
    "choices": [
      "Save them with the original file name inside the source folder of the app",
      "Validate type and size, then store outside the code folder with generated names",
      "Keep them in the memory of the process for as long as the server runs",
      "Save them with a name that the user gives in the url of the request"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-6

```json
[
  {
    "stem": "What is a key difference between MongoDB and a relational database?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "MongoDB keeps all of its data only in memory and never writes any of it to disk",
      "MongoDB requires every document of a collection to have exactly the same fields",
      "MongoDB stores flexible JSON like documents instead of fixed table rows",
      "MongoDB can only be used from applications that are written in JavaScript"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a document database like MongoDB a good fit?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "When data has a flexible or nested shape that changes over time",
      "When every record must be joined with many other tables in one query",
      "When strict multi table transactions are the main requirement",
      "When all data is a single flat table of numbers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a collection in MongoDB?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "A single field that lives inside one document of the database",
      "A full backup of the database that is stored in the same cluster",
      "A connection from the application to the server of the database",
      "A group of documents, similar to a table"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the _id field in a MongoDB document?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "An optional counter that you have to maintain yourself in the application",
      "A unique identifier that every document has in its collection",
      "A pointer that links each document to its parent collection",
      "A field that stores the date on which the document was created"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about joins is correct for MongoDB?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "It cannot combine documents from different collections in any way at all",
      "It can combine collections with the lookup stage, but data is often embedded",
      "It joins collections automatically for every query that you run on them",
      "It needs a separate SQL server next to it to be able to run joins"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does BSON stand for in the context of MongoDB?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "Basic Server Object Notation, the format MongoDB uses to send commands",
      "Block Storage Object Network, the layer MongoDB uses for its data files",
      "Binary Structured Online Node, the name of a MongoDB cluster member",
      "Binary JSON, the format MongoDB uses to store documents"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which situation favours a relational database over MongoDB?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "Complex relationships and reporting across many entities with strong consistency",
      "Storing user profiles that have varying optional fields from one user to the next",
      "Storing event logs whose properties change often as the product grows",
      "Storing product catalogues where every category has different attributes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean that MongoDB is schemaless by default?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "Documents have no field names, so values are stored only by their position",
      "The data is stored without any indexes, so every query scans the collection",
      "The database does not force documents in a collection to share the same fields",
      "The database cannot validate data in any way, whatever rules are added"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can you use to enforce structure at the database level in MongoDB?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "The ObjectId type that is generated for the _id field of each document",
      "A foreign key constraint between two collections, as in a relational database",
      "JSON schema validation rules on a collection",
      "A stored procedure that runs inside the database before each insert"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How are documents in MongoDB usually represented in Node code?",
    "topic": "NoSQL vs SQL — when to use MongoDB",
    "choices": [
      "As plain JavaScript objects",
      "As rows in an array of arrays",
      "As XML strings",
      "As class instances only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is MongoDB Atlas?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "A desktop tool that is used for drawing diagrams of database models",
      "A package for Node that replaces Mongoose in new applications",
      "A library that validates the schemas of documents before they are saved",
      "A managed cloud service that hosts MongoDB databases"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Atlas network access list control?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "Which collections inside the database a given user is allowed to read",
      "Which IP addresses may connect to the cluster",
      "The speed of the network connection between the app and the cluster",
      "The cloud region in which the machines of the cluster are placed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a connection string for Atlas usually start with?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "http:// followed by the host name of the cluster and its port",
      "mongodb+srv://",
      "mysql:// followed by the user name and the password of the account",
      "redis:// followed by the name of the cluster and the database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should database credentials be placed in environment variables?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "To make the connection to the cluster faster for every request",
      "To let the browser connect directly to the database without a server",
      "To allow every user of the application to read the credentials",
      "To keep them out of the code and the repository"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a database user in Atlas?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "A credential with specific permissions for connecting to the cluster",
      "A person who has been invited to edit the settings of the Atlas website",
      "A copy of the whole cluster that is used for testing new features",
      "A collection inside the database that stores the logins of the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why would a team choose different clusters for development and production?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "Because Atlas allows only one database per cluster",
      "Because development clusters are always faster",
      "So test data and mistakes cannot affect real user data",
      "Because production cannot be reached from the code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a replica set in Atlas provide?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "Faster writes by splitting one collection into pieces",
      "Free storage for every project",
      "Several copies of the data for high availability",
      "Automatic schema changes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem occurs if the IP of your server is not on the Atlas access list?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "The connection is refused or times out",
      "The data is returned but empty",
      "The cluster deletes the server user",
      "The cluster creates a new database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which option best describes a free shared tier of Atlas?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "Suited to large production workloads that need guaranteed performance",
      "Unavailable for new projects because it has been discontinued by Atlas",
      "Available only for mobile apps that are published in the app stores",
      "Suited to learning and small apps, with limited storage and performance"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do with a database password that was accidentally committed to a public repository?",
    "topic": "MongoDB Atlas setup & cloud hosting",
    "choices": [
      "Delete the commit and keep using the same password for the database",
      "Rotate it right away, because it should be treated as leaked",
      "Change the name of the repository and leave the password unchanged",
      "Do nothing, because Atlas blocks misuse of leaked passwords by itself"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which driver method inserts one document?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "addOne",
      "insertOne",
      "createOne",
      "saveOne"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does find({ age: { $gt: 18 } }) return?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "Documents where age equals 18",
      "Documents without an age field",
      "The count of documents with age 18",
      "Documents where age is greater than 18"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between updateOne and replaceOne?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "updateOne changes fields using operators, while replaceOne swaps the whole document",
      "updateOne swaps the whole document, while replaceOne changes only some fields",
      "They are the same in every case, and only the names are different",
      "replaceOne can only change the _id field of the document that matches"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the $set operator do?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "Removes the named field from every document of the collection",
      "Creates a new collection with the name that is given as the value",
      "Sets the value of a field in the matching document",
      "Sorts the matching documents by the field that is named"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when updateOne is called with a filter that matches nothing?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "A new document is always created from the values of the update",
      "An error is thrown because the filter did not match anything",
      "Nothing changes, unless the upsert option is true",
      "All of the documents of the collection are updated instead"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the upsert option do?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "Updates a matching document, or inserts one if none matches",
      "Updates every document of the collection that has the same field names",
      "Deletes the matching document after the update has been applied",
      "Runs the update two times to make sure that the write is applied"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which method returns a cursor instead of an array?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "findOne",
      "insertOne",
      "countDocuments",
      "find"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does deleteMany with an empty filter do?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "Deletes nothing, because an empty filter matches no document at all",
      "Deletes every document in the collection",
      "Deletes only the first document that the collection returns",
      "Throws an error because a filter is required for a delete call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you limit the fields returned by a query?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "Use a sort stage",
      "Use a projection",
      "Use an index hint",
      "Use an update operator"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the driver return for findOne when no document matches?",
    "topic": "CRUD operations with the MongoDB driver",
    "choices": [
      "undefined",
      "An empty array",
      "An error object",
      "null"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Mongoose schema?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "A definition of the fields, types and rules of documents in a collection",
      "A direct connection from the application to the Atlas cluster in the cloud",
      "A query that returns every document of a collection in one request",
      "A tool that creates the indexes of a collection without any code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Mongoose model?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "A copy of the whole database that is kept in the memory of the client",
      "A route handler that serves the documents of a collection over HTTP",
      "A class built from a schema that you use to query and create documents",
      "A plugin that formats the JSON of documents before they are saved"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which schema option makes a field mandatory?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "mandatory: true",
      "notNull: true",
      "required: true",
      "needed: yes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the timestamps schema option add?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "createdAt and updatedAt fields that Mongoose maintains by itself",
      "A log of every query that was made through the model since the start",
      "A backup copy of each document that is kept for thirty days",
      "An index on every field of the schema for faster queries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does Mongoose validation run by default?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "When reading a document from the database",
      "When the schema is defined",
      "Only when the server starts",
      "When saving a document with save or create"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is a custom validator in Mongoose?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "A new schema called validator that is attached to the model as a plugin",
      "A validate function on the field that returns true or false",
      "A middleware function that runs only for find queries of the model",
      "A separate collection named validators that stores the rules of the schema"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Model.findById(id) return?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "An array that holds every document that matches the given identifier",
      "A promise that resolves with the matching document, or null",
      "The identifier itself, as a string, once the lookup has finished",
      "A cursor that moves over all the documents of the collection"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a unique: true option in a schema do?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "Validates uniqueness in application code before each save",
      "Removes duplicate values on read",
      "Generates a unique value automatically",
      "Creates a unique index, but it is not a validator by itself"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of lean() on a Mongoose query?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "Returns plain JavaScript objects, not full Mongoose documents, for faster reads",
      "Removes all of the fields that are not in the schema from the stored data",
      "Limits the number of returned results to a single document per query",
      "Disables the validation that runs on update queries for the schema"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does updateOne not run schema validators by default?",
    "topic": "Mongoose schemas, models & validation",
    "choices": [
      "Update queries cannot be validated in Mongoose in any possible way",
      "Validators are removed from the schema after the very first save",
      "Validators run on save, so update queries need the runValidators option",
      "Mongoose validates only delete operations and never writes or updates"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is embedding a better choice than referencing?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "When the related data grows without any limit as the parent is used",
      "When many different parents share exactly the same related item",
      "When the related data is read with the parent and is small and bounded",
      "When the related data is changed on its own very often by other code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is referencing a better choice than embedding?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "When the related data is shared, large or grows without limit",
      "When the data is always read together with the parent document",
      "When the related data is a handful of short strings of text",
      "When atomic updates of one single document are a requirement"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does populate do in Mongoose?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "Fills the database with generated sample data when the app starts",
      "Copies the content of one collection into another collection",
      "Creates the indexes that are missing from the collection",
      "Replaces a stored reference with the referenced document when querying"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the BSON document size limit in MongoDB?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "1 megabyte",
      "16 megabytes",
      "2 gigabytes",
      "There is no limit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can an unbounded array inside a document become a problem?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "Arrays cannot be stored inside documents at all in MongoDB",
      "The document can grow toward the size limit and slow reads and writes",
      "Arrays can never be indexed, so queries on them are always slow",
      "The array is removed from the document after the server restarts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is a one to many relationship example that fits embedding?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "A user with millions of posts",
      "A product that appears in thousands of orders",
      "A tag that is used by every article",
      "A user with a few saved addresses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which relationship usually needs referencing between two collections?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "Many to many, such as students and courses",
      "One to one, such as a user and a short profile",
      "One to few, such as a post and its tags",
      "A single value stored on a parent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a trade off of denormalising data by copying it into several documents?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "Slower reads, but updates are simple because only one copy exists",
      "No trade off exists, since the copies are kept in sync by the database",
      "Faster reads, but updates must change every copy",
      "The database refuses to store a copy of data from another collection"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you store a reference in a Mongoose schema?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "A field with type String that holds a table name",
      "A field with type Array that holds the whole object",
      "A field with type ObjectId and a ref to the model name",
      "A field with type Map that holds a url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that writes to a single MongoDB document are atomic?",
    "topic": "Relationships — embedding vs referencing",
    "choices": [
      "Either all changes to that document are applied or none",
      "Changes are applied after a delay",
      "Changes are applied across several documents at once",
      "Changes cannot be undone by the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an index do in a database?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "Stores a second backup copy of every document of the collection",
      "Encrypts the collection so that only the application can read it",
      "Limits which users of the database are allowed to read a collection",
      "Speeds up queries by finding documents without a full scan"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a collection scan?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "Reading only the index of the collection and never the documents",
      "Reading every document of a collection to find the matches",
      "Copying the contents of a collection into another collection",
      "Counting how many collections exist in a database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a cost of adding many indexes?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "Slower reads for every query, even the ones that use the index",
      "Slower writes and more storage, because every index must be updated",
      "The collection becomes read only once more than five indexes exist",
      "Documents lose their _id field when a compound index is created"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method shows how a query is executed and whether it uses an index?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "describe",
      "profile",
      "trace",
      "explain"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In which order are the fields of a compound index used?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "From left to right, so the order decides which queries can use it",
      "In any order that the query chooses when it is run on the data",
      "Only the last field of the index is used by the query planner",
      "Alphabetically by the name of each field, whatever the order given"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which query is most likely to use an index on the email field?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "find({ email: { $exists: false } }) on a missing field",
      "find({}) with no filter",
      "find({ email: \"a@b.com\" })",
      "find with a regular expression that starts with a wildcard"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a unique index guarantee?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "Every document of the collection has a value for that field",
      "The field is stored in an encrypted form on the disk",
      "No two documents have the same value for the indexed field",
      "The field is returned in sorted order in every query result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should you add an index for fields used often in sort operations?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "Sorting without an index may need to hold many documents in memory",
      "Sorting is not possible at all unless an index exists on the field",
      "Indexes remove the duplicate values from the field before sorting",
      "Sorting through an index changes the order of the data on the disk"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which index type is automatically created on every collection?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "An index on the createdAt field",
      "An index on every string field",
      "No index is created automatically",
      "An index on the _id field"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good way to decide which indexes to create?",
    "topic": "Indexing & query performance basics",
    "choices": [
      "Index every field of every collection to be safe against slow queries",
      "Look at the real queries of the app and the output of explain",
      "Index only the field that has the largest values in the collection",
      "Copy the indexes that another application of the same kind uses"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-7

```json
[
  {
    "stem": "Why should passwords be hashed before being stored?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "So the stored passwords take up less space in the users collection",
      "So users can read their passwords back after they have forgotten them",
      "So a database leak does not reveal the real passwords",
      "So the server can include the password in the emails it sends out"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is bcrypt preferred over a plain fast hash like SHA 256 for passwords?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "It is deliberately slow and tunable, which makes guessing attacks costly",
      "It produces a shorter hash that takes up less space in the users collection",
      "It encrypts the password in a way that can be decrypted later by the server",
      "It does not need any random data, so the same input is always hashed alike"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a salt?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "A secret key that is stored only in the browser of the user who signs up",
      "A second password that the user must remember and enter after the first one",
      "A list of banned passwords that the server checks before it saves a new user",
      "A random value added to each password so equal passwords hash differently"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the cost factor in bcrypt control?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "How long the password that the user chooses is allowed to be at most",
      "How much work each hash takes, which slows attackers down",
      "How many users are allowed to log in at the same moment on the server",
      "The size of the database column that holds the stored hash of the password"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you check a login password against the stored bcrypt hash?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "Hash the password again with bcrypt.hash and compare strings directly",
      "Use bcrypt.compare with the plain password and the stored hash",
      "Decrypt the stored hash and compare the result",
      "Send the hash to the browser to compare"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does hashing the same password twice with bcrypt give different results?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "The cost factor changes every time",
      "The algorithm is random by design for the whole result",
      "The database changes the value",
      "Each hash uses a new random salt"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Is hashing the same as encryption?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "No, hashing is one way, while encryption can be reversed with a key",
      "Yes, they are two names for the same operation on stored passwords",
      "Yes, but hashing is used only for files and encryption only for text",
      "No, hashing always needs a secret key, while encryption never needs one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a bad way to store passwords?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "Saving a bcrypt hash with a salt",
      "Saving a hash from a slow algorithm built for passwords",
      "Saving them as plain text in the users collection",
      "Saving a hash with a high cost factor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the login error say when the email or password is wrong?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "The exact field that failed, so the user knows what to correct next",
      "The stored hash of the password, so the user can compare it by hand",
      "A generic message that does not say which of the two was wrong",
      "The number of attempts that remain, and nothing else about the login"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does bcrypt include in its output string?",
    "topic": "Password hashing with bcrypt",
    "choices": [
      "The algorithm version, cost and salt, together with the hash",
      "Only the hash itself, with no other data stored beside it",
      "The original password, kept inside an encrypted block at the end",
      "The user id and the email address that the hash was made for"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a JSON Web Token?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "An encrypted file that stores the password of the user for later logins",
      "A cookie that the browser creates on its own after the user has logged in",
      "A database record that the server uses to keep track of open sessions",
      "A signed token that carries claims about a user and can be verified by the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are the three parts of a JWT?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "Key, value and hash, joined by dots in a fixed order",
      "Header, payload and signature",
      "Header, body and footer, as in an email message layout",
      "Token, secret and salt, as used for password storage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Is the payload of a normal signed JWT encrypted?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "Yes, only the server that issued it is able to read the claims",
      "No, it is only encoded, so anyone can read it",
      "Yes, but the signature part stays visible to every client",
      "It depends on which browser the user has when the token is read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should you not put a password in a JWT payload?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "The payload is too small to hold a password in a valid token",
      "Passwords inside a payload make the signature of the token invalid",
      "Browsers refuse to send tokens that contain a password to servers",
      "Anyone holding the token can decode and read the payload"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the server do to verify a JWT?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "Check the signature with the secret or public key, and check the expiry",
      "Look the token up by its text in the users collection of the database",
      "Decrypt the payload using the password that the user has chosen",
      "Ask the browser to confirm that the token is the one it was given"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do access tokens usually have a short lifetime?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "Short tokens are smaller to send",
      "The signature cannot be checked after an hour",
      "A stolen token stops working soon",
      "Browsers delete long tokens"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of a refresh token?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "To store the password of the user safely on the server side",
      "To sign the access token before it is sent to the browser",
      "To get a new access token without logging in again",
      "To replace the secret key of the server when it expires"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should refresh tokens be stored and revocable on the server side?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "So a stolen or logged out token can be rejected before it expires",
      "So that the server is able to read the password of the user again later",
      "So that the token never expires and the user stays logged in forever",
      "So that the browser is allowed to skip the check of the token signature"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which claim sets when a JWT stops being valid?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "iat",
      "sub",
      "iss",
      "exp"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if the signing secret of your JWT is leaked?",
    "topic": "JWT — signing, verifying, refresh tokens",
    "choices": [
      "Nothing happens, because the payload of every token is encrypted anyway",
      "Anyone can forge valid tokens, so the secret must be rotated",
      "Only the tokens that were issued a long time ago stop working for users",
      "The tokens that the server issues from then on become much longer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does auth middleware usually do?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "Creates a new token for each request that reaches the server",
      "Reads the token, verifies it, then attaches the user to req or rejects",
      "Stores the password of the user in req.body for the next handler",
      "Redirects every request that comes in to the login page of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which status code should the middleware return when the token is missing or invalid?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "404",
      "200",
      "500",
      "401"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is the token usually sent in the request?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "In the Authorization header, as Bearer followed by the token",
      "In the url of the request, as one of its path segments",
      "In the headers of the response that the server sends back",
      "In the request method, next to the verb such as GET or POST"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should the auth middleware be placed relative to a protected route?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "After the route handler, so that it can read the finished response",
      "Inside the database layer, next to the queries that load the user",
      "Before the route handler, so it can stop the request early",
      "Only on the login route, because the other routes are public"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is role based access control?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "Letting every logged in user do everything that the API offers",
      "Giving each user a separate server instance that only they can reach",
      "Allowing actions based on the role of a user, such as admin or member",
      "Blocking all of the users except for the owner of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must authorisation be checked on the server and not only hidden in the UI?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "A user can call the API directly and skip the interface",
      "The server has no way of rendering the buttons that a user sees",
      "The browser blocks all of the requests that are not authorised",
      "The interface is always updated too slowly to reflect permissions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between authentication and authorisation?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "Authentication decides what you may do and authorisation proves who you are",
      "They mean the same thing",
      "Authentication happens only in the browser",
      "Authentication proves who you are and authorisation decides what you may do"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you check besides being logged in when a user edits a resource by id?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "That the id in the url is a number and not a string of letters",
      "That the resource belongs to that user, or the user has the right role",
      "That the request was sent with the PUT method and not with POST",
      "That the password of the user is longer than twelve characters"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does it mean for a route to be protected?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "It is hidden from the list of routes that the server exposes",
      "It requires valid credentials before the handler runs",
      "It accepts requests only from the same browser that logged in",
      "It cannot be covered by automated tests of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a 403 response tell the client in a protected API?",
    "topic": "Auth middleware & protected routes",
    "choices": [
      "The user must log in first before the server can answer the request",
      "The route does not exist on the server that received the request",
      "The server crashed while it was handling the request of the user",
      "The user is known but not allowed to perform the action"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the HttpOnly flag on a cookie do?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Prevents JavaScript on the page from reading the cookie",
      "Makes the cookie work only over plain HTTP and never over HTTPS",
      "Stops the cookie from being sent to the server on later requests",
      "Deletes the cookie as soon as the page that set it is closed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Secure flag on a cookie do?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Encrypts the cookie value",
      "Prevents the server from reading the cookie",
      "Sends the cookie only over HTTPS connections",
      "Makes the cookie last forever"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is storing a token in localStorage risky?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "The browser deletes the stored value after one minute without any use",
      "It cannot be sent to the server in the headers of a request",
      "Any script running on the page, such as injected code, can read it",
      "It is shared with every other website that the user visits"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the SameSite attribute help prevent?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Cross site request forgery, by limiting when cookies go out on cross site requests",
      "Cookies from growing larger than the header limit of the server",
      "Cookies from expiring before the end of the session of the user",
      "Users from logging in on two different devices at the same moment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a downside of cookie based auth compared with a header token?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "It cannot work together with a database that stores the user accounts",
      "It cannot be used to send JSON bodies to the endpoints of the API",
      "It is readable by every website that the user visits in the browser",
      "It needs protection against cross site request forgery"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which option sends cookies in a cross origin fetch call?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "mode set to cookies",
      "credentials set to include",
      "headers with a cookie field",
      "method set to COOKIE"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the cookie option maxAge control?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "The size in bytes that the cookie is allowed to reach",
      "How long the browser keeps the cookie",
      "The number of times the browser may send the cookie to a server",
      "The domain to which the cookie is attached when it is stored"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which approach protects a token best from theft by injected scripts?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "A variable inside the global window object",
      "A value inside the url",
      "A value in localStorage",
      "An HttpOnly cookie set by the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is true about cookies and the same origin policy?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Cookies go to the domain that set them, whichever page makes the request",
      "Cookies are sent only to the page that created them and never to others",
      "Cookies are never sent with images or with other kinds of resources",
      "Cookies are shared between all of the browsers that are used on a device"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must the server do to clear a login cookie?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Delete the cookie file that the browser stores on the disk of the user",
      "Ask the browser to restart so that all of its cookies are dropped",
      "Send a Set-Cookie header with the same name and an expired date",
      "Change the password of the user so that the old cookie stops working"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is CORS?",
    "topic": "CORS configuration",
    "choices": [
      "A server setting that encrypts the traffic between two different origins",
      "A tool that compresses the responses before they reach the browser",
      "A browser rule that decides if a page may read a response from another origin",
      "A database permission system that limits who may read documents"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What counts as a different origin?",
    "topic": "CORS configuration",
    "choices": [
      "A different scheme, host or port",
      "A different path on the same host",
      "A different query string",
      "A different hash fragment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which response header allows a specific origin to read the response?",
    "topic": "CORS configuration",
    "choices": [
      "Content-Security-Policy",
      "X-Frame-Options",
      "Strict-Transport-Security",
      "Access-Control-Allow-Origin"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a preflight request?",
    "topic": "CORS configuration",
    "choices": [
      "A request that loads the page faster by fetching its resources early",
      "An OPTIONS request that the browser sends first to ask for permission",
      "A request that checks the SSL certificate of the server before the page loads",
      "A request that the server sends to the browser to see if it is online"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is Access-Control-Allow-Origin set to the asterisk unsafe with credentials?",
    "topic": "CORS configuration",
    "choices": [
      "It slows down the response because every origin has to be checked each time",
      "Browsers refuse the wildcard with cookies, and it would let any site call the API",
      "It removes the cookie from the request before the server can read it",
      "It only works in Firefox, while other browsers ignore the header completely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Does CORS protect the server from receiving requests?",
    "topic": "CORS configuration",
    "choices": [
      "Yes, it blocks every unwanted request before it reaches the server",
      "Yes, it stops attackers from sending requests with their own scripts",
      "It protects only the database and has no effect on the HTTP layer",
      "No, it only controls whether the browser lets a page read the response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Express package is commonly used to set CORS headers?",
    "topic": "CORS configuration",
    "choices": [
      "cors",
      "helmet",
      "morgan",
      "dotenv"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Access-Control-Allow-Credentials header do?",
    "topic": "CORS configuration",
    "choices": [
      "Gives the user a login token that the browser stores for later requests",
      "Hides the response from the page unless the user is logged in as an admin",
      "Allows the browser to include cookies in cross origin requests",
      "Encrypts the cookies so that scripts on the page cannot read their values"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does a request made with curl not show CORS errors?",
    "topic": "CORS configuration",
    "choices": [
      "curl does not use the HTTP protocol that browsers use for pages",
      "The server turns CORS off for every client that is named curl",
      "CORS is enforced by browsers and not by other clients",
      "curl is faster than a browser, so it finishes before CORS applies"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which setting should a production API use for allowed origins?",
    "topic": "CORS configuration",
    "choices": [
      "A list of the exact front end origins",
      "The wildcard, so that every origin may call the API in the same way",
      "Only localhost, so the API cannot be used from any real domain",
      "No origin at all, so the API answers requests from servers only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the goal of input sanitisation and validation?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "To make the input longer so that it is harder to guess for attackers",
      "To encrypt the input before it is saved to the database of the app",
      "To compress the input so that it takes less space in the request",
      "To make sure user input has the expected form before it is used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is SQL or NoSQL injection?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "An attack that fills the disk of the server with very large files",
      "An attack where input changes the meaning of a database query",
      "An attack on the DNS server that redirects visitors to a wrong address",
      "An attack that reads the cookies of a user from another website"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a request body like { \"email\": { \"$ne\": null } } cause a problem in a MongoDB query?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "It makes the request larger, which can slow the server down a little",
      "The object is read as an operator, so the filter can match any document",
      "It encrypts the filter so that the database cannot read it correctly",
      "It creates a new collection with the name of the operator in the body"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is cross site scripting?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "An attack on the password file of the server that reads stored hashes",
      "An attack that blocks the network of the server with too many requests",
      "An attack on the DNS records so that visitors reach another server",
      "An attack that makes the browser run attacker script in the context of your site"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which practice helps prevent cross site scripting in React?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "Rendering data as text and avoiding dangerouslySetInnerHTML with untrusted content",
      "Turning off JSX in the build settings so that no markup is generated",
      "Using only class components, because they escape their output more strictly",
      "Putting scripts in the url so that the browser can check them first"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of rate limiting on a login route?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "To make the page load faster for each of the logged in users",
      "To encrypt the traffic that is sent to the login route of the API",
      "To slow brute force guessing of passwords",
      "To log every user out after a fixed number of minutes in the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the helmet package do in Express?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "Encrypts the database so that stored documents cannot be read",
      "Hashes the passwords of users before they reach the controller",
      "Sets several security related HTTP headers",
      "Parses the JSON bodies of requests that the server receives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which item is on the OWASP Top 10 list of common risks?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "Broken access control",
      "Slow images that are served without any compression applied",
      "Large bundles that take a long time to download on slow phones",
      "Missing comments in the source code of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should error messages sent to clients avoid stack traces?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "They are too short to be useful to the developers who read them",
      "They are not valid JSON, so clients are not able to parse them",
      "They slow the response down because the stack has to be built",
      "They can reveal internal paths and library versions to attackers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the principle of least privilege?",
    "topic": "Input sanitization & basic OWASP awareness",
    "choices": [
      "Give every user admin rights so that nobody is blocked from working",
      "Give each user and service only the access it needs",
      "Give every service the same key so that it is easier to manage",
      "Remove all access after one day so that stale accounts do not remain"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-8

```json
[
  {
    "stem": "What is an Axios instance created with axios.create used for?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Opening a persistent socket connection that stays alive between page loads",
      "Caching every response in memory so repeated calls never reach the network",
      "Sharing a base url, headers and timeout across all the requests made through it",
      "Running requests in a separate thread so the page stays responsive"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an Axios request interceptor allow you to do?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Modify every outgoing request, for example by adding an Authorization header",
      "Cancel the response after it arrives and replay the previous one",
      "Retry every failed request automatically without writing any code",
      "Convert the response body into a form that React can render directly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does Axios reject the promise of a request by default?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Only when the network connection fails and the server cannot be reached",
      "Only when the response body is not valid JSON that Axios can parse",
      "Never, because every response is resolved and must be checked by hand",
      "When the response status is outside the 2xx range, as well as on network errors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you find the parsed JSON body of an Axios response?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "The body property, once the json method has finished parsing it",
      "The data property of the response object",
      "The result property that Axios adds after the promise resolves",
      "The payload field that holds the raw text of the server reply"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a typical use of a response interceptor?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Removing the finished request from the history of the browser so it is not stored",
      "Handling a 401 by refreshing the token and retrying the original request",
      "Changing the url of each request before it is finally sent to the server",
      "Encrypting the response body so that other scripts on the page cannot read it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you set a timeout for an Axios request?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Call the timeout method on the response after the request has been sent",
      "Add a Retry-After header to the outgoing request with a number of seconds",
      "Wrap the call in setInterval and cancel it when the delay has passed",
      "Pass the timeout option in milliseconds"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is a JSON body sent with axios.post?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Pass the object as the second argument and Axios serialises it for you",
      "Pass the output of JSON.stringify as the url of the request instead",
      "Place the object inside a header called body so the server reads it",
      "Call a separate axios.json function and give it the object to send"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the baseURL option do?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Replaces the url of every request with the same fixed address for all calls",
      "Sets the address that the server will send each response back to",
      "Is prepended to relative urls, so each call only needs the path",
      "Defines which origin is allowed to read the response in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the error object contain when the server responds with 500?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "No response property at all, because the server failed before answering",
      "The stack trace of the server code that was running when it failed",
      "A response property holding the status and body that the server sent",
      "A normal response object, because Axios converts errors into successes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might you prefer Axios over fetch in a large app?",
    "topic": "Axios setup & interceptors",
    "choices": [
      "Interceptors, instances and automatic JSON handling cut repeated code",
      "Axios works in browsers, while the fetch function is not available there",
      "Axios sends requests faster than the networking layer of the browser can",
      "Axios removes the need for a backend server for the application data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem does React Query mainly solve?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "Replacing the router of the application with a lighter alternative library",
      "Storing the values of form inputs while the user types into a field",
      "Compiling JSX faster during the production build step of the project",
      "Managing server state, such as fetching, caching and updating remote data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does useQuery require at minimum?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "A url string and a component into which the data is rendered",
      "A query key and a function that returns a promise of the data",
      "A reducer function and an initial state object for the cache",
      "A schema and a connection string for the database it queries"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the role of the query key?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "Encrypts the request that is sent to the server for that query",
      "Identifies cached data so it can be reused and invalidated",
      "Sets the url that the request for this query is sent to",
      "Names the component in the tree that renders the data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does staleTime control?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "How long unused data is kept in memory before it is deleted",
      "How long a request may take before it is cancelled by a timeout",
      "How often the component re-renders on its own without any state change",
      "How long fetched data counts as fresh before it may be refetched"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does useMutation do?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "Runs a function that changes server data, such as a POST, and tracks its status",
      "Fetches data from the server and caches the result under a query key",
      "Reads data out of local storage and puts it into component state",
      "Subscribes the component to changes that other users make on the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you refresh a list after a mutation succeeds?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "Reload the whole page with window.location after each mutation succeeds",
      "Edit the cache of the browser by hand using the developer tools",
      "Invalidate the related query key so that it refetches",
      "Call useQuery a second time inside the handler of the mutation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does React Query do when a component mounts and cached data exists?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "Always waits for a fresh response before it shows anything on screen",
      "Deletes the cache entry and starts a brand new request each time",
      "Shows the cached data and may refetch in the background if it is stale",
      "Shows an empty state until the user clicks a button to refresh"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which values does useQuery return to help you render UI states?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "data, isLoading and error, among others",
      "html, css and script, so that the result can be shown on a page",
      "state, dispatch and reducer, as with other state hooks in React",
      "route, params and query, which describe the current url of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an optimistic update?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "Waiting for the server to confirm the change before the UI shows anything",
      "Updating the UI only when the user next refreshes the page by hand",
      "Writing the change into the cache of the server from the client directly",
      "Showing the change in the UI right away and rolling back if the request fails"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can React Query reduce duplicate requests?",
    "topic": "React Query — queries, mutations, caching",
    "choices": [
      "It blocks every second request that is sent to the same url in a minute",
      "Components with the same query key share one request and one cached result",
      "It sends all of the requests through a single persistent websocket",
      "It compresses several requests into one batch before they go out"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Zustand?",
    "topic": "Global state with Zustand",
    "choices": [
      "A router library that maps urls to components in React applications",
      "A small state library that uses a store made with create",
      "A testing library that renders components inside a simulated browser",
      "A tool that compiles TypeScript files during the build step"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a component read a value from a Zustand store?",
    "topic": "Global state with Zustand",
    "choices": [
      "Import the Provider component and read the value from its props",
      "Dispatch an action to the store and wait until the reducer answers",
      "Call getState inside the render function without using any hook",
      "Call the store hook with a selector, such as useStore(s => s.count)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does Zustand require a Provider around the app?",
    "topic": "Global state with Zustand",
    "choices": [
      "No, the store hook can be used directly in any component",
      "Yes, a Provider must wrap the root component of the whole application",
      "Only when the store holds more than one value at the same time",
      "Only when the store is used inside tests of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use a selector when reading from a store?",
    "topic": "Global state with Zustand",
    "choices": [
      "The selector makes the store read only for that single component",
      "The selector copies the entire store into the local state of the component",
      "The component re-renders only when the selected value changes",
      "The selector sends the selected value to the server for each render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you update state in a Zustand store?",
    "topic": "Global state with Zustand",
    "choices": [
      "Assign new values directly to the properties of the store object",
      "Call useState on the value that the store hook has returned",
      "Call set inside an action function that is defined in the store",
      "Emit a custom event on the window object that the store listens for"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a reasonable use of a global store in a MERN app?",
    "topic": "Global state with Zustand",
    "choices": [
      "The logged in user and UI settings that many components need",
      "The raw response of every request, duplicated from what the server holds",
      "Values that only one component reads and that no other component needs",
      "Temporary text typed into one input field of a single form"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Zustand compare with Redux in setup effort?",
    "topic": "Global state with Zustand",
    "choices": [
      "Zustand needs more boilerplate, because every change needs an action creator",
      "They need exactly the same files, folders and code to get started",
      "Zustand cannot hold more than one value, so a store needs several hooks",
      "Zustand needs far less boilerplate, with no reducers or action types required"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you avoid putting in a global store when React Query is in use?",
    "topic": "Global state with Zustand",
    "choices": [
      "The theme choice that the user has made in the settings page",
      "Server data that React Query already caches",
      "Whether the sidebar is open or closed at the moment",
      "The language that the user has picked for the interface"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you persist a Zustand store between visits?",
    "topic": "Global state with Zustand",
    "choices": [
      "Wrap the store in a Provider that keeps its values in a cookie",
      "Use the persist middleware, which saves state to storage",
      "Call localStorage by hand in every component that uses the store",
      "A store cannot be persisted by any means once the page is reloaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is mutating the state object directly inside a store action discouraged?",
    "topic": "Global state with Zustand",
    "choices": [
      "The browser forbids changing objects that are created inside modules",
      "Stores freeze themselves after the first update and reject new writes",
      "It makes every later call to the store slower because of extra checks",
      "Subscribers may not see a new reference, so the UI may not update"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do many teams keep the access token on the client in a MERN app?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "In memory, with the refresh token in an HttpOnly cookie",
      "In a public cookie that scripts on the page are allowed to read",
      "Inside the url so that it survives page reloads and shared links",
      "In a global variable on the server that is sent with every reply"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a request interceptor commonly add for authenticated calls?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "The password of the user, placed inside the request body",
      "A random identifier that is appended to the url of the call",
      "The Authorization header carrying the current token",
      "A CSS class that is added to the document element"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the client do when the API returns 401 for an expired token?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "Show an empty page and stop until the user reloads the application",
      "Retry the same request ten times in a row with no delay between",
      "Try to refresh the token once and retry, or send the user to login",
      "Delete the account of the user and start a new session from scratch"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it a problem to refresh the token from several requests at the same moment?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "Parallel refresh calls can invalidate each other, so they should share one refresh",
      "The server only accepts a single request per second from each client",
      "The token becomes longer with every refresh, and is rejected at some point",
      "The browser blocks all refresh calls that are made while another is pending"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a protected route in React Router check login state?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "Hide the link to the page in the navbar and do nothing else",
      "Check the url for the word admin before the page is rendered",
      "Ask the server whether the user is logged in on each keystroke",
      "Render a component that redirects to login when there is no user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to in memory state when the user reloads the page?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "It is kept by the browser automatically and restored after the reload",
      "It is lost, so the app must restore the session, for example with a refresh call",
      "It is sent back by the server on its own once the page has loaded",
      "It is copied into the url so that the page can read it again"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should logout also clear cached query data?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "Because the query cache is unable to hold entries for two users",
      "Otherwise the next user could briefly see data of the previous user",
      "Because the server requires the client cache to be empty at login",
      "Because the router stops working while old query data is present"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of keeping tokens in localStorage?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "They are deleted by the browser after a minute of inactivity",
      "They cannot be sent along with requests in the headers",
      "They are shared with other browsers on the same computer",
      "Injected scripts can read and steal them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of an auth context or store in the client?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "Exposing the current user, plus login and logout actions, to the whole app",
      "Storing the password of the user so it can be used again later",
      "Replacing the session that the server keeps for each logged in user",
      "Generating the signed tokens on the client for each new session"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should the client never trust its own role check for security?",
    "topic": "Handling auth tokens on the client",
    "choices": [
      "The client has no way of reading the role of the logged in user",
      "Roles change every minute, so the client value is always out of date",
      "Users can change client code, so the server must enforce permissions",
      "React hides role information from users while rendering components"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does Vite offer a dev server proxy option?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "To speed up the production build by caching assets between builds",
      "To hide the environment variables from the code that is bundled",
      "To forward api calls to the backend and avoid CORS issues in development",
      "To rewrite JSX into plain JavaScript before the browser runs it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is the Vite proxy configured?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "In the server section of the Vite config file",
      "In the scripts section of the package.json file of the project",
      "In the head of the index.html file that Vite serves",
      "In the file where the routes of the React router are defined"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a proxy entry for /api pointing to http://localhost:5000 do?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "Opens port 5000 on the machine so that the browser can reach it",
      "Copies the backend code into the bundle that the browser downloads",
      "Replaces every request with a request to the first route of the app",
      "Sends browser requests starting with /api to the backend on port 5000"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does the Vite dev proxy exist in the production build?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "Yes, the proxy is bundled into the app and keeps working as before",
      "No, production needs a real setup, such as a gateway or CORS settings",
      "Yes, but only for the first request that the page makes after loading",
      "It is converted into a service worker that runs in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which variables can the Vite client code read from the environment?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "Every variable of the operating system on the build machine",
      "Only those starting with the VITE_ prefix",
      "Only variables that were first saved in a database of the project",
      "None of them, because the bundle never receives any environment values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use relative urls such as /api/users in the front end code?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "They are parsed faster by the browser than absolute urls are",
      "React requires every request url to be written without a host name",
      "They remove the need for a backend because the browser handles them",
      "The same code works behind the proxy in development and behind one origin in production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the effect of a proxy on cookies in development?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "Requests look same origin to the browser, so cookies work without extra CORS setup",
      "Cookies are removed from every request that passes through the proxy",
      "Cookies are encrypted by the proxy before they reach the backend",
      "Cookies are sent to every website that the page happens to call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does changeOrigin do in a proxy configuration?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "Moves the front end to another port when the proxy starts",
      "Changes the url that is shown in the address bar of the browser",
      "Changes the host header of the request to match the target",
      "Encrypts the request while it travels to the target server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does the backend still need correct CORS settings after deploying?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "The proxy of Vite keeps running in production and needs its headers",
      "Browsers ignore CORS rules for sites that were built for production",
      "The front end and the API may live on different origins in production",
      "CORS only matters during development and can be removed afterwards"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool did the proxy field in package.json belong to?",
    "topic": "Proxy config for local dev (Vite / CRA)",
    "choices": [
      "Create React App",
      "Vite, which reads it when the dev server starts",
      "Next.js, which reads it when the project is built",
      "Parcel, which reads it when the bundle is created"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a React error boundary do?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "Catches errors thrown inside event handlers and asynchronous callbacks too",
      "Stops the server from crashing when a request throws an exception",
      "Logs every error to the database of the application automatically",
      "Catches errors thrown while rendering its children and shows a fallback UI"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which errors does an error boundary not catch?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "Errors thrown while a child component is rendering",
      "Errors in event handlers and in asynchronous code",
      "Errors thrown in the lifecycle methods of a child component",
      "Errors thrown in the constructor of a child component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you create an error boundary in React?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "With a function component that calls a built in useErrorBoundary hook",
      "With a class component that defines getDerivedStateFromError or componentDidCatch",
      "With a try block that is written around the JSX of a component",
      "With an HTML attribute that is set on the root element of the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it good to place several error boundaries instead of one around the whole app?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "Several boundaries make the application load faster than one does",
      "React requires at least three boundaries in every application",
      "Each boundary repairs the error that it caught by itself",
      "A failure in one part does not remove the whole page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a toast notification?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "A short message that appears briefly to confirm an action or show an error",
      "A permanent banner that stays on the page and cannot be closed",
      "A full page that asks the user to log in again to continue",
      "A tooltip that follows the cursor around the page while it moves"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a toast a better choice than an inline error?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "For errors that belong to one specific input field of a form",
      "For fatal errors that stop the whole page from working",
      "For results of actions such as saving, where no single field is at fault",
      "For legal text that the user has to read before continuing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a good error message for a failed request tell the user?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "The full stack trace of the server code that failed to run",
      "The database query that failed, together with its parameters",
      "What went wrong in plain words and what they can do next",
      "Only the numeric status code that the server answered with"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can React Query help with global error toasts?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "Use an onError callback or the global query cache handler to show a message",
      "It shows a toast on its own, with no code written by the developer",
      "It hides every error from the user and retries in silence forever",
      "It turns every error into a success response with an empty result"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of a retry button on a failed data load?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "It fixes the bug on the server that caused the failure of the load",
      "It stores the failed request forever so that it can run later",
      "It hides the error message so that the screen looks clean again",
      "It lets the user try again without reloading the whole page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why log client errors to a monitoring service?",
    "topic": "Error boundaries & toast notifications",
    "choices": [
      "To make the page load faster for users on slow connections",
      "To find problems that real users hit but never report",
      "To replace the tests that the project would otherwise need",
      "To hide the errors from users so that the interface looks stable"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-9

```json
[
  {
    "stem": "What is a unit test?",
    "topic": "Unit testing with Jest",
    "choices": [
      "It runs the whole application in a browser and clicks through every page the way a user does",
      "It measures how many requests the server can answer each second under heavy simulated traffic",
      "It checks one small piece of code, such as a function, in isolation from the rest",
      "It compares screenshots of the interface before and after a change to find visual differences"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Jest function groups related tests under a shared name?",
    "topic": "Unit testing with Jest",
    "choices": [
      "describe",
      "suite",
      "group",
      "collect"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does expect(sum(2, 3)).toBe(5) do in Jest?",
    "topic": "Unit testing with Jest",
    "choices": [
      "Logs the result of sum to the console so a developer can check the number by eye",
      "Replaces the sum function with a stub that always returns the number 5 afterwards",
      "Retries the call to sum until it eventually returns 5 or the timeout is reached",
      "Fails the test unless the value returned by sum is strictly equal to 5"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When should you use toEqual instead of toBe?",
    "topic": "Unit testing with Jest",
    "choices": [
      "When comparing two numbers that may differ by a tiny floating point rounding error",
      "When comparing the contents of objects or arrays rather than their identity",
      "When the value being tested is a function that has to be called by the matcher",
      "When the test needs to wait for a promise before it checks anything at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which structure is commonly used to describe a single test case?",
    "topic": "Unit testing with Jest",
    "choices": [
      "check with a list of inputs",
      "test or it with a name and a function",
      "spec with a decorator",
      "assert with a message"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of beforeEach in Jest?",
    "topic": "Unit testing with Jest",
    "choices": [
      "Runs once before the whole test suite starts and shares its result with every later test",
      "Runs only before tests that have failed in an earlier run of the test command",
      "Runs after each test to remove temporary files that the test created on the disk",
      "Runs setup code before every test in the file or block so tests start from a clean state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes a test reliable?",
    "topic": "Unit testing with Jest",
    "choices": [
      "It gives the same result on every run and does not depend on other tests or on outside state",
      "It uses random input values on each run so that rare edge cases are eventually covered",
      "It shares data with the previous test so that setup code does not have to be repeated",
      "It calls the real production services so that the result matches what users would see"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which matcher checks that a function throws an error?",
    "topic": "Unit testing with Jest",
    "choices": [
      "toFail",
      "toError",
      "toThrow",
      "toReject"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a good test name describe?",
    "topic": "Unit testing with Jest",
    "choices": [
      "The name of the file where the function was written",
      "The author of the test and the date it was added",
      "The behaviour that is expected under a given condition",
      "The number of lines the function under test has"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid testing private implementation details?",
    "topic": "Unit testing with Jest",
    "choices": [
      "Tests then break on harmless refactors even though the behaviour for users did not change",
      "Private details cannot be reached by any test runner because they are hidden by the language",
      "The test runner skips any test that touches a function without an exported name",
      "Tests of private details run too slowly because they need extra memory to load the module"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the guiding idea of React Testing Library?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "Test the exact structure of the component tree and every prop passed to each child",
      "Test each hook on its own by calling it directly outside of any component",
      "Test the compiled output of the bundler to make sure it matches the source files",
      "Test components the way users interact with them rather than their internal state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function renders a component into a test document?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "mount",
      "render",
      "display",
      "create"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which query is preferred to find a button by its accessible name?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "getByTestId with the button text",
      "getByRole with the name option",
      "querySelector with a class name",
      "getByClassName with the style name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between getBy and queryBy?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "getBy returns null when nothing matches instead of throwing an error",
      "queryBy waits until the element appears and getBy does not wait",
      "They are the same except that getBy only works with buttons",
      "queryBy returns null when nothing matches instead of throwing an error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function should you use to simulate a user typing and clicking realistically?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "userEvent",
      "fireEvent only",
      "dispatch",
      "simulate"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which query waits for an element that appears after an asynchronous update?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "getBy",
      "queryBy",
      "findBy",
      "hasBy"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is getByTestId considered a last resort?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "It is much slower than every other query because it scans the whole document tree",
      "It only works for elements created with a class component and not with hooks",
      "It relies on an attribute that users cannot see, so it does not reflect how the UI is used",
      "It is removed from the library in newer versions so tests with it no longer run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which matcher from jest-dom checks that an element is present in the document?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "toBeInTheDocument",
      "toExist",
      "toBeRendered",
      "toBeVisibleOnPage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does screen.debug() help with?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "Pauses the test and opens a browser window so you can click through the interface",
      "Records a video of the test run and saves it in the project folder",
      "Shows the list of props that were passed to the root component of the test",
      "Prints the current DOM so you can see what the test is rendering"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why wrap the component in a provider inside tests when it uses context?",
    "topic": "React Testing Library — render, queries, events",
    "choices": [
      "The test runner refuses to render any component that is not wrapped in a provider",
      "Without it the component would read the default value or fail, unlike in the real app",
      "Providers make the tests run in parallel on all the cores of the machine",
      "Providers replace the component with a simplified version suited for the test"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you make a Jest test wait for an async function?",
    "topic": "Testing async code & mocking",
    "choices": [
      "Wrap the call in setTimeout with a delay that is long enough for the code to finish",
      "Make the test function async and await the call, or return the promise",
      "Call the function twice so the second call has the finished data from the first call",
      "Add the done keyword to the name of the test so Jest knows to wait for it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a mock function created with jest.fn used for?",
    "topic": "Testing async code & mocking",
    "choices": [
      "Replace the whole Jest runner so that tests run faster on a continuous integration server",
      "Generate random input data for a test so that edge cases are explored automatically",
      "Copy a real module from node_modules into the test folder so it can be edited safely",
      "Record calls and control return values so you can check how code interacts with a dependency"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does jest.mock(\"./api\") do?",
    "topic": "Testing async code & mocking",
    "choices": [
      "Replaces the module with an automatic mock for the tests in that file",
      "Deletes the api file from the project after the test run completes successfully",
      "Creates a new api file with sample data that is written to the disk",
      "Disables the module for every other test file in the project as well"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why mock network calls in unit tests?",
    "topic": "Testing async code & mocking",
    "choices": [
      "The real network is not allowed by the browser when running inside a test environment",
      "Real calls always return errors during a test because cookies are not available",
      "Tests become fast and do not depend on a real server or the internet being available",
      "Mocking encrypts the requests so that secrets in them are not exposed in the logs"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which matcher checks that a mock was called with specific arguments?",
    "topic": "Testing async code & mocking",
    "choices": [
      "toBeCalledOnly",
      "toHaveReturned",
      "toHaveBeenCalledWith",
      "toMatchCalls"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does jest.useFakeTimers do?",
    "topic": "Testing async code & mocking",
    "choices": [
      "Lets tests control timers such as setTimeout so they can advance time without waiting",
      "Makes every timer in the program run faster so that test suites finish in less time",
      "Removes all timers from the code under test so that they never fire at all",
      "Replaces the system clock of the computer for every other program as well"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common mistake when testing an async function without await?",
    "topic": "Testing async code & mocking",
    "choices": [
      "The test runs twice because async functions are called again by Jest",
      "The function is mocked automatically which hides the real error from the test",
      "Jest throws an error as soon as it sees a promise in a test body",
      "The test finishes before the promise settles, so failures may be missed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you test that a promise rejects with an error?",
    "topic": "Testing async code & mocking",
    "choices": [
      "Wrap the call in an if statement that logs the error to the test output",
      "Use await expect(promise).rejects.toThrow()",
      "Call promise.catch with an empty function and look at the test result afterwards",
      "Use expect(promise).toBe(false) because rejected promises are falsy values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why reset mocks between tests?",
    "topic": "Testing async code & mocking",
    "choices": [
      "Because mocks stop working after the first test and have to be created again",
      "So calls recorded in one test do not leak into the next one and cause confusing results",
      "Because the test runner deletes the module cache after every single test anyway",
      "Because each mock uses memory that is never freed unless it is reset by hand"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a mock and a spy?",
    "topic": "Testing async code & mocking",
    "choices": [
      "A spy replaces the whole module while a mock only records the calls that were made",
      "A mock can only be used with promises while a spy only works with callbacks",
      "There is no difference because both names are used for exactly the same helper",
      "A spy wraps an existing function and can still call the original one"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Supertest let you do?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "Send HTTP requests to an Express app in tests without opening a real port yourself",
      "Load the page of the app in a headless browser and read the rendered text of each element",
      "Generate API documentation from the routes of the app and publish it online",
      "Monitor the live traffic of a production server and report slow endpoints"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why export the Express app separately from app.listen?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "Express refuses to run when listen is in the same file as the route definitions",
      "It makes the app start faster in production because the routes load later",
      "Tests can import the app without starting a server that keeps running",
      "Tests need a different port number from the one that production uses"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Supertest chain checks a GET request returns status 200?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "request(app).fetch(\"/users\").status(200)",
      "request.get(app, \"/users\").is(200)",
      "request(app).get(\"/users\").expect(200)",
      "request(app).send(\"/users\").check(200)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which database setup keeps API tests isolated from real data?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "A separate test database or an in memory one that is reset between tests",
      "The production database with a prefix added to every collection name",
      "A shared development database that all developers use at once",
      "No database at all, because routes never need data in tests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you send a JSON body with Supertest?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "Set the body in the url as a query string",
      "Call .json with a string",
      "Use .attach with a file name",
      "Call .send with an object after .post"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should an API test verify besides the status code?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "Only the size of the response in bytes",
      "The shape and content of the response body",
      "Only the time it took to respond",
      "The version of Node that ran the test"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you test a protected route with Supertest?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "Disable the auth middleware in the app for the whole test run",
      "Send a valid token in the Authorization header and also test a request without one",
      "Hard code the password of an admin user into every test file",
      "Call the controller directly and skip the middleware completely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of testing a route and not only its controller function?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "It is the only way to test pure functions that return a string or a number",
      "It removes the need for any unit tests of the services below the controller",
      "It makes the response of the route faster because the code is run twice",
      "It checks routing, middleware and status codes together, as a client would see them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a test do after it creates records in the database?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "Clean them up or reset the database so later tests start from a known state",
      "Leave them in place so that the next test can reuse the same records",
      "Copy them into the production database for backup purposes",
      "Rename them with a timestamp so that they are unique in the collection"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why test error cases such as invalid input and missing resources?",
    "topic": "API endpoint testing with Supertest",
    "choices": [
      "Because error cases are the only cases that can break a database connection",
      "Because the framework skips error handling code unless a test calls it first",
      "Because clients depend on correct 400 and 404 responses as much as on success ones",
      "Because success responses are checked automatically by the Express package"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does code coverage measure?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "The share of tests that passed in the last run of the pipeline",
      "The number of bugs that the tests found in the last month of work",
      "The share of code lines or branches that run during the tests",
      "The speed of the tests compared with the speed of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Does 100 percent coverage prove the code is correct?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "No, it shows code ran, not that the assertions checked the right behaviour",
      "Yes, because every line has been run and so every bug has been found",
      "Yes, but only when branch coverage and line coverage are both full",
      "No, because coverage reports are generated before the tests are finished"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Jest option collects coverage?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "--report",
      "--measure",
      "--lines",
      "--coverage"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is continuous integration?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "Deploying every change to production by hand at the end of the week",
      "Automatically building and testing the code on every push or pull request",
      "Merging all branches into the main branch without any review step",
      "Writing tests only after the feature has been released to users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a CI pipeline do when a test fails?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "Ignore the failure and report success if the build step passed",
      "Mark the run as failed so the change is blocked from being merged",
      "Delete the failing test so that the next run of the pipeline is green",
      "Retry the whole pipeline until the failing test happens to pass"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which file defines a GitHub Actions workflow?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "A JSON file in the root named actions.json",
      "A script called ci.sh in the src folder",
      "A package.json field named github",
      "A YAML file in .github/workflows"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why set a minimum coverage threshold in CI?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "To stop the coverage from dropping unnoticed as the code grows",
      "To guarantee that no bugs remain in the code that has been merged",
      "To make the test run finish faster by skipping the covered files",
      "To remove the need for code reviews on the pull requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which trigger runs a workflow when a pull request is opened or updated?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "on commit_message",
      "on build_complete",
      "on pull_request",
      "on issue_closed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why run tests in a clean environment on CI?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "It makes the tests use more memory so that leaks are found sooner",
      "It lets the tests change the repository files without anyone noticing",
      "It shows the code works without hidden local settings or files from one machine",
      "It removes the need to install dependencies before the tests run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a flaky test?",
    "topic": "Test coverage & CI integration",
    "choices": [
      "A test that sometimes passes and sometimes fails without any change to the code",
      "A test that always fails because the feature was never finished",
      "A test that runs slowly because it uses a large amount of sample data",
      "A test that is skipped by the runner because of a syntax mistake"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the red green refactor cycle?",
    "topic": "Test-driven development basics",
    "choices": [
      "Write the full feature first, then add tests, then fix the failures that remain",
      "Run the tests in red mode and then in green mode on two different machines",
      "Refactor the code before the tests are written so that the design is clean",
      "Write a failing test, make it pass with the simplest code, then clean up the code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why write the test before the code in test driven development?",
    "topic": "Test-driven development basics",
    "choices": [
      "It guarantees the code will never contain any bug in the finished product",
      "It clarifies the expected behaviour and shows the code is testable from the beginning",
      "It saves time because the code does not have to be run by a developer at all",
      "It allows the tests to be copied from other projects without any changes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do when a new test passes immediately without any code change?",
    "topic": "Test-driven development basics",
    "choices": [
      "Celebrate and move on, because passing tests are always a good sign",
      "Check it, because a test that cannot fail may not be testing anything useful",
      "Delete the production code to see if other tests notice the difference",
      "Rename the test so that the runner treats it as a new one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of small steps in TDD?",
    "topic": "Test-driven development basics",
    "choices": [
      "It removes the need for version control because every step is saved",
      "It makes every test run in parallel across several machines at once",
      "It allows a feature to be finished without reading the requirements",
      "A failure points to the last small change, so debugging is quick"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does refactoring mean in TDD?",
    "topic": "Test-driven development basics",
    "choices": [
      "Improving the structure of the code without changing its behaviour while the tests stay green",
      "Rewriting the tests so that they pass with the new behaviour of the code",
      "Adding new features to the code while the tests are red and failing",
      "Deleting code that no test covers so that coverage goes up"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which kind of code is easiest to practise TDD on?",
    "topic": "Test-driven development basics",
    "choices": [
      "Code that depends on the clock, the network and a database at once",
      "Code with no defined behaviour that is still being explored",
      "Pure functions with clear inputs and outputs",
      "Generated code that is rewritten by a tool on every build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the testing pyramid suggest?",
    "topic": "Test-driven development basics",
    "choices": [
      "Many end to end tests, some integration tests and very few unit tests",
      "The same number of each kind of test so that every layer has equal weight",
      "Many fast unit tests, fewer integration tests and only a few end to end tests",
      "No unit tests, because integration tests cover every function anyway"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is testing behaviour better than testing implementation?",
    "topic": "Test-driven development basics",
    "choices": [
      "Tests keep passing after refactors that do not change what users see",
      "Behaviour tests run much faster than any test of an implementation detail",
      "Implementation tests cannot be written in JavaScript because of language limits",
      "Behaviour tests do not need any assertions to check the result"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a regression test?",
    "topic": "Test-driven development basics",
    "choices": [
      "A test that checks the speed of the application against an older version",
      "A test that is run once before the first release of a product",
      "A test that measures how much memory the code uses over time",
      "A test added to make sure a bug that was fixed does not come back"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which practice helps keep tests readable?",
    "topic": "Test-driven development basics",
    "choices": [
      "Put every check of the whole feature into one very long test",
      "Arrange the data, act on the code, then assert the result in clear steps",
      "Share mutable variables between tests so that setup is written only once",
      "Use short cryptic names so that the test file stays compact"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mern-10

```json
[
  {
    "stem": "What does a build step produce for a React app deployed to a static host?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "A running Node server that renders each page on demand for every visitor",
      "A Docker image that the host has to start before any page can be shown",
      "Optimised static files, such as HTML, JavaScript and CSS, that the host serves",
      "A database dump that the host loads into memory when a visitor arrives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do single page apps on Vercel or Netlify need a rewrite rule to index.html?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "Deep links like /profile match no real file, so the host must serve the app entry point",
      "The host would otherwise compress the JavaScript bundle too much to be read",
      "Browsers refuse to load any route that does not end with the extension html",
      "The router library deletes all other pages when the build step is finished"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Vercel typically trigger a new deployment?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "A manual upload of the build folder sent as an email attachment",
      "A message posted in the team chat tool that mentions the project",
      "A cron job that the browser of the developer runs every hour",
      "A push to the connected Git branch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a preview deployment?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "A local copy of the site that is only reachable from the developer machine",
      "A temporary live copy of a branch or pull request with its own url for review",
      "A cached copy of the production site that is used when the server is down",
      "A deployment that runs the tests but never serves any page to users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which environment variable naming rule applies to a Vite app on a static host?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "Every variable is exposed at runtime and can be changed after the build finishes",
      "Variables exposed to the browser need the VITE_ prefix and are set at build time",
      "Variables must be written in lower case and added to the index.html file",
      "Variables are read from the server on each request by the browser bundle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must the API url be configured per environment in a deployed front end?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "Browsers block every request to an API whose url contains the word localhost",
      "The build step refuses to complete if the url is written inside the code",
      "Static hosts replace the url with their own address when they serve the site",
      "The same code must call a local API in development and the real API in production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a rollback on a hosting platform do?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "Makes a previous successful deployment the live one again",
      "Deletes all deployments except the newest one that is currently live",
      "Reverts the Git history of the repository to an older commit automatically",
      "Rebuilds the current deployment using the same source files once more"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a CDN used for in front end hosting?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "Running the database queries of the app on servers near the visitor",
      "Encrypting the source code so that visitors cannot read the bundle",
      "Serving static files from servers close to the visitor to reduce load time",
      "Compiling the JSX of the components when each page is requested"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical reason a deployed single page app shows a blank page while it worked locally?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "The browser has no JavaScript engine for production builds of React",
      "The host removes every console statement and breaks the application",
      "A wrong base path or a missing environment variable at build time",
      "The router only works on the machine where it was installed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which output folder does a standard Vite build create?",
    "topic": "Deploying React to Vercel / Netlify",
    "choices": [
      "dist",
      "public",
      "release",
      "out"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the main difference between hosting a static site and a Node API?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "A static site needs a running process that listens, while an API needs only file hosting",
      "An API can only ever be hosted on the same server as its own database",
      "A static site must always be run inside a container before it can be served",
      "An API needs a running process that listens, while static files need only file hosting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command do most platforms run to start an Express app?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "npm build, which launches the server after compiling",
      "npm start, as defined in the scripts of package.json",
      "node index.html, which runs the page in the runtime",
      "npm deploy, which every platform provides by default"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must the server read the port from process.env.PORT on platforms like Render or Railway?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "The platform blocks every port except the one named 3000 in the code",
      "The platform assigns the port at runtime and routes traffic to it",
      "The port is needed only for logging and has no effect on the routing",
      "Express chooses a random port unless the variable has been defined"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a health check endpoint?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "A route that returns the full list of users so that the platform can store a copy",
      "A route that restarts the server every few minutes to free up its memory",
      "A route that writes the administrator password to the logs for easy debugging",
      "A light route, such as /health, that the platform calls to see if the service is alive"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to files written to the local disk of many cloud hosts when the service restarts?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "They are often lost, so uploads should go to external storage",
      "They are kept forever and shared by every new instance of the service",
      "They are encrypted and moved to the database of the platform",
      "They are copied back to the repository by the platform automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can the first request to a free tier service be slow?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "The free tier compresses the response very strongly to save bandwidth",
      "The platform checks the code for errors before each response is sent",
      "The service may be put to sleep after inactivity and has to start again",
      "The database is rebuilt from scratch for every request made"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must be allowed in the Atlas network access list for a cloud hosted API?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "Only the address of the developer laptop where the code was written",
      "No address at all, because Atlas trusts every connection from any host",
      "The outbound addresses of the host, or a wider range if they are not fixed",
      "The address of the front end, so the browser can reach the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should the API allow requests from the deployed front end?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "Configure CORS with the exact origin of the front end",
      "Disable the browser for the front end so that CORS is not enforced",
      "Add the origin to the package.json file of the front end project",
      "Send the front end code to the API so that it becomes the same origin"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a build command and a start command mean for a Node service?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "The start command prepares the code, and the build command runs the server",
      "Both commands do the same thing and only one of them has to be set",
      "The build command is used for the front end and never for any API",
      "The build prepares the code, and the start command runs the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why log to standard output on a cloud platform?",
    "topic": "Deploying Express API to Railway / Render",
    "choices": [
      "The platform deletes files created by the app so log files cannot be used",
      "The platform collects the output and shows it as logs for the service",
      "Standard output is encrypted, which keeps the logs safe from other users",
      "Log files are not allowed in Node applications that run in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are secrets set in the dashboard of the hosting platform and not committed?",
    "topic": "Environment variables in production",
    "choices": [
      "The platform encrypts the repository and so the secret would be safe anyway",
      "They stay out of the repository and can differ for each environment",
      "Secrets in the repository are removed by Git when the code is pushed",
      "The dashboard is the only place where Node can read environment variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do if a secret key was pushed to a public repository?",
    "topic": "Environment variables in production",
    "choices": [
      "Delete the commit and keep using the same key, since nobody can have seen it",
      "Rename the repository so that the key can no longer be found by anyone",
      "Add the key to the gitignore file so that it stays hidden from now on",
      "Rotate the key at once, because deleting the commit does not undo the exposure"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does a Vite environment variable get its value?",
    "topic": "Environment variables in production",
    "choices": [
      "At build time, when the bundler replaces the references in the code",
      "At runtime, each time the browser loads the page from the server",
      "When the user logs in and the server sends the value to the page",
      "When the hosting platform restarts the front end process"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can you not keep a secret in a front end environment variable?",
    "topic": "Environment variables in production",
    "choices": [
      "The browser deletes environment variables when the page is closed",
      "Front end variables are limited to ten characters by the build tool",
      "The value is bundled into files that every visitor can download and read",
      "Only the server of the host can read variables with a prefix"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of separate variable sets for staging and production?",
    "topic": "Environment variables in production",
    "choices": [
      "Make the staging site faster by using smaller keys than production uses",
      "Allow the same database to be used for both environments at once",
      "Test changes safely with different databases and keys than the real users have",
      "Remove the need for a development environment on the laptop of the developer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which value should differ between development and production?",
    "topic": "Environment variables in production",
    "choices": [
      "The database connection string and any secret keys",
      "The names of the functions in the source code",
      "The version of the JavaScript language that is used",
      "The order of the imports at the top of the files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does NODE_ENV set to production commonly change?",
    "topic": "Environment variables in production",
    "choices": [
      "The server switches to a different programming language so that it runs faster",
      "The database becomes read only for all of the users of the application",
      "The code is encrypted before it is sent to each browser that asks",
      "Libraries such as Express skip dev helpers and run in an optimised mode"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a team keep the list of required variables documented?",
    "topic": "Environment variables in production",
    "choices": [
      "Commit the real .env file to a private repository for all of the developers",
      "Maintain a .env.example file with names but no real values",
      "Write the values in the README so that they are easy to find later",
      "Store the values in a comment in the main server file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can happen if a required variable is missing in production?",
    "topic": "Environment variables in production",
    "choices": [
      "The platform fills in a safe default value for each variable that is missing",
      "The app may start with undefined values and fail later, so validate at startup",
      "The build step stops and prevents the deployment from ever starting",
      "The database creates a new variable with the same name by itself"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use different JWT secrets in development and production?",
    "topic": "Environment variables in production",
    "choices": [
      "JWT libraries require a different secret for each environment before they run",
      "Production secrets are shorter, which makes the tokens faster to verify",
      "The secret is replaced by the platform whenever the app is deployed",
      "A leaked development secret must not let anyone forge tokens for real users"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Docker image?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "A read only template with the app and its dependencies, from which containers start",
      "A running instance of an application with its own network and storage",
      "A virtual machine with a full guest operating system installed inside it",
      "A backup of the database that is stored in a compressed archive file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Docker container?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "A file that lists the packages that the application depends on to run",
      "A registry where images are stored and shared between the teams",
      "A running instance of an image, isolated from other processes on the host",
      "A tool that compiles JavaScript into machine code for the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a Dockerfile contain?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "The passwords and keys that the application uses while it is running",
      "A list of containers that should be started on the server at boot",
      "Instructions for building an image: the base image, files to copy and the start command",
      "The source code of the application, written in a special language"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does a Dockerfile usually copy package.json and install dependencies before copying the rest of the code?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "Docker caches each layer, so dependencies are not reinstalled when only code changes",
      "The installer cannot read package.json once the source code has been copied",
      "Node requires the dependencies to exist before any other file is added",
      "Docker deletes the code if it is copied before the packages are installed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the EXPOSE instruction in a Dockerfile do?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "Opens the port to the internet on the host machine permanently",
      "Publishes the image to a public registry for other developers",
      "Encrypts the traffic that the container sends out",
      "Documents the port the app listens on inside the container"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you make a port of a container reachable from the host?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "Add the port to the package.json file of the project",
      "Publish it with the -p option, such as -p 3000:3000",
      "Write the port into the Dockerfile as a comment line",
      "Restart the host machine after the image has been built"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a .dockerignore file?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "Hide the Dockerfile from other users who are able to reach the repository",
      "Keep files such as node_modules and .env out of the build context and the image",
      "Make the container start faster by skipping its start command entirely",
      "Tell the host which old images should be removed after one week"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of a smaller base image such as an alpine variant?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "Faster execution of every JavaScript function in the program",
      "Automatic encryption of every file that is stored in the container",
      "No need to install any dependencies of the application",
      "A smaller download and a smaller attack surface for the deployed app"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to data written inside a container when it is removed?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "It is lost unless it was stored in a volume",
      "It is saved automatically in the image for later containers",
      "It is copied to the repository of the application",
      "It is moved to the database of the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about containers and virtual machines is correct?",
    "topic": "Docker basics — Dockerfile, images, containers",
    "choices": [
      "Containers include a full operating system kernel of their own inside the image",
      "Virtual machines share one kernel with the host and containers do not",
      "Containers share the host kernel, so they are lighter than virtual machines",
      "Containers can only run on the same hardware as virtual machines do"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a GitHub Actions workflow?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "A branch that is created automatically for every release of the application",
      "A tool that reviews the code of every pull request without any human help",
      "An automated process defined in YAML that runs jobs on events such as a push",
      "A service that hosts the application after it has been built successfully"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the usual order of steps in a CI job for a Node project?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "Check out the code, install dependencies, run lint and tests, then build",
      "Build the app, deploy it, and run the tests in production at the end",
      "Install the dependencies after the tests have been run on the code",
      "Run the tests on the code before it is checked out of the repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which step action fetches the repository code in a workflow?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "actions/download",
      "actions/clone-repo",
      "actions/fetch-source",
      "actions/checkout"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should secrets used in a workflow, such as a deploy token, be stored?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "Directly in the YAML file so that every job can read them",
      "In the encrypted secrets settings of the repository",
      "In the commit message of the last change that was pushed",
      "In a public issue so the team can find them quickly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a matrix strategy allow?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "Running several different jobs one after another in a fixed order",
      "Running the same job for several versions, such as different Node versions",
      "Splitting one test file across the cores of a single machine at once",
      "Deploying one build to several servers at the same moment of time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why cache dependencies in a CI workflow?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "Make the tests give different results on each run of the workflow",
      "Avoid having to commit the node_modules folder to the repository",
      "Allow the workflow to run without a network connection at all",
      "Reduce the time each run needs by reusing downloaded packages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a pipeline do before it deploys?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "Make sure tests and checks passed on the same commit",
      "Wait for a developer to start the deployment from a local machine",
      "Delete the previous deployment to free up space on the host",
      "Skip the tests so that the deployment is finished faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is continuous deployment compared with continuous delivery?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "Every change waits for a manual approval, while delivery releases it automatically",
      "They mean the same thing, and only the names are different from each other",
      "Every passing change is released automatically, while delivery keeps a manual approval",
      "Deployment applies only to databases, and delivery applies only to code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which event runs a workflow when code is pushed to the main branch?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "on main_change with the push option",
      "on commit with the deploy option",
      "on push with the branch list set to main",
      "on release_branch with the main option"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should workflow permissions follow least privilege?",
    "topic": "GitHub Actions — CI pipeline on push",
    "choices": [
      "A compromised step or dependency can then do less damage with the token",
      "Narrow permissions make every workflow run faster on GitHub",
      "The workflow cannot start unless all permissions are removed first",
      "Permissions only affect the name that is shown in the log"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a DNS A record do?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "Maps a domain name to the name of another domain",
      "Stores the text that proves who owns the domain",
      "Redirects visitors from http to https automatically",
      "Maps a domain name to an IPv4 address"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a CNAME record do?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "Points a domain to an email server for incoming mail",
      "Points a name, such as www, to another domain name",
      "Stores the certificate of the website for visitors",
      "Maps a domain to a physical address"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do you need HTTPS on a production site?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "It makes pages load faster because the files are compressed more strongly",
      "It encrypts the traffic and lets the browser verify the identity of the server",
      "It hides the url of the page from the browser history of the visitor",
      "It allows the site to be indexed by search engines, and by nobody else"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a TLS certificate prove?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "That the code of the website contains no bugs and no security problems",
      "That the owner of the site has paid for a plan on the hosting platform",
      "That every visitor of the site is using a modern and updated browser",
      "That the server controls the domain, as confirmed by a certificate authority"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What do platforms like Vercel usually do about certificates?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "Issue and renew them automatically for your custom domain",
      "Ask you to buy a certificate and install it on the server by hand",
      "Disable HTTPS for custom domains until a paid plan is chosen",
      "Copy the certificate from the repository of the project"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can DNS propagation delay cause after you change a record?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "The old records are removed from every server instantly worldwide",
      "The site becomes unavailable for a full day for all of the users",
      "Some visitors still reach the old address until cached records expire",
      "The certificate of the domain is revoked by the authority"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of redirecting http to https?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "Make the site appear in search results at a higher position",
      "Remove the need for a certificate on the server",
      "Make sure visitors always use the encrypted connection",
      "Hide the real domain name from the visitor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does HSTS tell the browser?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "Always use HTTPS for this site for a given period of time",
      "Never keep a cached copy of the pages of this site on the device",
      "Block every request to the site that comes from another domain",
      "Load the site only from a local copy that is kept on the device"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which setting do you add to a domain to point it at a hosting platform?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "A new line that is added to the package.json file of the project",
      "A header that is added to the response of the API of the project",
      "A rule that is added to the Dockerfile of the application",
      "A DNS record created at the domain registrar or DNS provider"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you check first if a custom domain shows a certificate warning?",
    "topic": "Domain setup & HTTPS basics",
    "choices": [
      "Whether the browser has a newer version of the JavaScript engine installed",
      "Whether the domain points at the host and the certificate was issued for that name",
      "Whether the database of the application is up and running correctly",
      "Whether the front end code uses the latest version of React"
    ],
    "answerIdx": 1
  }
]
```

