LAYER: pern-1

```json
[
  {
    "stem": "Which element should wrap the primary navigation links of a page?",
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "HTML5 semantic elements & forms",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "CSS box model, flexbox & grid",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "Responsive design & media queries",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "JavaScript types, functions & scope",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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
    "topic": "Browser DevTools & debugging",
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

LAYER: pern-2

```json
[
  {
    "stem": "What does the destructuring statement const { name, age } = user do?",
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
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
    "topic": "ES modules, destructuring & spread",
    "choices": [
      "All the passed arguments into a real array called nums",
      "Only the last argument that was passed in the call",
      "The arguments into an object keyed by position",
      "Arguments after the first one, leaving the first inside the arguments object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are the three states of a Promise?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "Waiting, running and finished",
      "Created, resolved and closed",
      "Idle, active and failed",
      "Pending, fulfilled and rejected"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the await keyword do inside an async function?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "Blocks the whole program including other tasks until the promise settles",
      "Pauses that function until the promise settles and then gives its value",
      "Turns a regular value into a promise that never resolves",
      "Runs the promise on a separate operating system thread"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an async function always return?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "The value written after return",
      "A promise",
      "undefined unless await is used",
      "A callback function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you handle a rejected promise when using await?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "Add a finally block with no other code",
      "Call await twice so the second call catches the error",
      "Nothing is needed because await ignores rejections",
      "Wrap the await in a try and catch block"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Promise.all do if one of the promises rejects?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "The returned promise rejects with that error right away",
      "The returned promise waits for all others and resolves with an array of errors",
      "The returned promise ignores the rejected one and resolves with the others",
      "The returned promise stays pending until the rejected promise is retried"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Promise.allSettled return?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "A promise that rejects as soon as any single one of the input promises fails",
      "A promise that resolves with the result of the fastest input promise only",
      "A promise that resolves with the outcome of every input, success or failure",
      "An array holding only the rejected promises, with the successful ones removed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Promise.race resolve or reject with?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "The results of all promises that succeeded",
      "The result of the last promise to settle",
      "The result of the first promise that settles",
      "The first successfully fulfilled value, ignoring rejections"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the problem with the code: for each item in items, await fetch(item) inside a loop, when the requests are independent?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "Requests run one after another, which is slower than running them in parallel",
      "The loop runs requests in parallel and may overload the server",
      "The await keyword is not allowed inside any loop",
      "The fetch calls always fail because the loop does not return a value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is returned by .then(fn) on a promise?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "The same promise object so calls can be repeated",
      "The value that the original promise resolved with",
      "undefined, so then cannot be chained",
      "A new promise that resolves with the value returned by fn"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to an error thrown inside a .then callback?",
    "topic": "Promises, async/await & the event loop",
    "choices": [
      "It is thrown synchronously to the caller of then",
      "It rejects the promise returned by that .then call",
      "It is ignored if no catch is attached anywhere",
      "It stops the event loop of the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does map do on an array?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "Changes the original array in place and returns undefined once it has finished",
      "Returns a new array holding the result of calling the function on each element",
      "Returns the first element for which the callback function returns a true value",
      "Returns a single value that is built from all of the elements in the array"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does filter return?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "The first element that passes the test, or undefined when none of them does",
      "The original array with the failing elements removed in place and no copy made",
      "A number that counts how many of the elements passed the test in the callback",
      "A new array with only the elements where the callback returns a truthy value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does reduce do with the callback (acc, x) => acc + x and the initial value 0 on [1, 2, 3]?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "Returns 6",
      "Returns an array of 1, 3 and 6",
      "Returns 3 because the last element is added to zero",
      "Returns 0 because the accumulator is not updated"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which method returns the first element that satisfies a test, or undefined?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "filter",
      "some",
      "find",
      "indexOf"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does some return?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "The first element that passes the test",
      "A new array of passing elements",
      "true if at least one element passes the test",
      "true only if every element passes the test"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which array method changes the original array?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "sort",
      "map",
      "filter",
      "slice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does forEach return?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "A new array of the callback results",
      "The original array for chaining",
      "The number of elements visited",
      "undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does arr.slice(1, 3) return for [10, 20, 30, 40]?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "The array [20, 30, 40]",
      "The array [20, 30]",
      "The array [10, 20, 30]",
      "The array [10, 40]"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the default behaviour of sort when called without a compare function?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "It sorts numbers from smallest to largest",
      "It sorts elements as strings in ascending order",
      "It sorts the elements in descending order",
      "It leaves the array in its original order"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does flatMap do?",
    "topic": "Array & object methods — map, filter, reduce",
    "choices": [
      "Flattens an array of arrays by every nested level until none is left",
      "Maps only the first element of each nested array that it finds inside",
      "Removes the undefined values from the array and then maps the remaining ones",
      "Maps each element, then flattens the result by one level"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does TypeScript add to JavaScript?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "Static types that are checked at compile time and then removed from the output",
      "A new runtime that replaces the JavaScript engine of the browser and runs faster",
      "Extra syntax that the browser understands natively without any build step at all",
      "A set of components that handle state for React applications out of the box"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between an interface and a type alias for an object shape?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "Interfaces exist at runtime and can be checked with instanceof, while aliases cannot be",
      "Aliases can only describe primitive types, while interfaces can describe whole objects",
      "Interfaces can be extended and merged by declaration, aliases can also name unions",
      "Interfaces are required for React props, and aliases are only for functions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the type string | undefined mean?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "The value is a string that was converted to undefined",
      "The value must be both a string and undefined together",
      "The value is either a string or undefined",
      "The value is a string that may be empty but never undefined"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the unknown type require before you use a value of it?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "A check or narrowing, such as typeof, so the compiler knows the real type",
      "Nothing at all, because unknown behaves exactly like the any type",
      "A cast to any, since unknown values cannot be narrowed by checks",
      "A declaration of the value as const so that its type cannot change"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a generic such as Array<T> let you do?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "Store values of any type in the same array without checking them",
      "Convert the items of the array to strings before they are stored",
      "Make the array immutable so that its elements cannot be changed",
      "Write code that works with many types while keeping the type information"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the optional property syntax name?: string mean in an interface?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "The property must exist and must always be an empty string",
      "The property may be missing, and if it exists it must be a string",
      "The property is a string that is removed during compilation",
      "The property is private and cannot be read from outside the object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the as const assertion do on an object literal?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "Converts the object into a class with constant methods",
      "Makes its properties readonly and narrows values to literal types",
      "Freezes the object at runtime so it cannot be changed",
      "Casts the object to the any type so that errors are hidden"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a discriminated union?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "A union of two primitive types that is written with the pipe symbol",
      "A union whose members are all optional properties of one interface",
      "A union that the compiler converts into a single object type",
      "A union of object types that share a literal field used to tell them apart"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "A type with all the properties of User made optional",
      "A type with only the first property of User kept",
      "A type that excludes the properties which are optional in User",
      "A type where every property of User is turned into a string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is the any type usually discouraged?",
    "topic": "TypeScript types, interfaces & generics",
    "choices": [
      "It is slower at runtime than every other type that the language has",
      "It cannot be used together with interfaces or with generic types",
      "It turns off type checking for that value and lets mistakes through silently",
      "It makes the compiled JavaScript output larger than it needs to be"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does type narrowing mean in TypeScript?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "The compiler converts a value to a narrower type at runtime by copying its fields",
      "The compiler removes unused types from the program so that the output is smaller",
      "The compiler refines a broad type to a more specific one inside a checked branch",
      "The compiler rejects every union type and asks for a single type per variable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which check narrows a value of type string or number to string?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "typeof value === \"string\"",
      "value instanceof String with the capital letter at the start of the name",
      "value.length > 0 because only strings have a length property at all",
      "Number.isNaN(value) because numbers are never equal to themselves"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the in operator narrow, as in if (\"radius\" in shape)?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "It narrows the type of every property of the object to a string type",
      "It checks the values of the properties and narrows them to numbers",
      "It narrows the object to the type of its first declared property",
      "It narrows a union of object types to the member that has that property"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a user defined type guard?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "A function that throws an error when a value has the wrong type at runtime",
      "A function whose return type is a predicate such as value is User",
      "A class that wraps a value and hides its real type from the compiler",
      "A comment that tells the compiler which type to assume for a variable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Pick<User, \"id\" | \"name\"> produce?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "A type that removes the id and name properties from User",
      "A type with only the id and name properties of User",
      "A type that makes id and name optional on User",
      "A union of the types of the id and name properties"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Omit<User, \"password\"> produce?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "A type that contains only the password property of User",
      "A type that renames the password property to a private one",
      "A type that makes password optional while keeping the others",
      "A type with every property of User except password"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Record<string, number> describe?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "An object whose keys are strings and whose values are numbers",
      "An array of strings that is paired with an array of numbers",
      "A tuple that holds one string followed by one number",
      "A class with a string name property and a number id property"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Readonly<T> do to an object type?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "Freezes the object at runtime so that its properties cannot be changed",
      "Hides the properties of the object from code outside the module",
      "Makes every property read only, so assignments are rejected by the compiler",
      "Converts every property into a getter function on the object"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ReturnType<typeof fn> give you?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "The type of the first parameter of the function fn",
      "The runtime value that the function fn returns on its first call",
      "The type that the function fn returns",
      "The type of the function fn including all of its parameters"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why prefer unknown over any for values from outside, such as JSON?",
    "topic": "Type narrowing & utility types",
    "choices": [
      "unknown forces you to narrow the value before you use it",
      "unknown is faster than any because the compiler skips more checks",
      "unknown values are converted to strings so they are always safe",
      "unknown lets you call any method on the value without errors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the tsconfig.json file do in a TypeScript project?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "It lists the npm packages that the project needs in order to run",
      "It stores the type definitions of every library that is installed",
      "It configures how the project is deployed to a hosting platform",
      "It tells the compiler which files to include and which options to apply"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the strict option turn on?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "A mode in which the compiler refuses to emit any JavaScript at all",
      "A family of strict type checking options, such as noImplicitAny and strictNullChecks",
      "A mode in which every variable must be declared with the const keyword",
      "A mode in which the generated JavaScript runs in strict mode only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the target option control?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "The folder in which the compiled files are placed after the build",
      "The version of JavaScript that the compiler emits",
      "The environment in which the tests of the project are executed",
      "The server to which the compiled code is uploaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the outDir option control?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "The folder from which the compiler reads the TypeScript sources",
      "The folder in which the type declaration files are searched for",
      "The folder where the compiler stores its cache between runs",
      "The folder in which the compiler writes the generated JavaScript"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the module option decide?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "Which module system the emitted JavaScript uses, such as ESM or CommonJS",
      "Which folders of the project are treated as separate modules",
      "Which npm package manager is used to install the dependencies",
      "Whether the project may import files that are written in JSON"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does noEmit do?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "Stops the compiler from reading the files that are in node_modules",
      "Removes the comments from the emitted JavaScript output",
      "Type checks the code without writing any JavaScript files",
      "Prevents the editor from showing any errors while you type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does a TypeScript project often use a separate tool to run the code, such as tsx or a bundler?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "The compiler cannot emit JavaScript that runs in Node without a plugin",
      "Node refuses to run any file that has been type checked by the compiler",
      "The compiler only checks and emits code, and a runner or bundler executes or packages it",
      "The runner adds the types back to the code so that the checks run live"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are declaration files that end in .d.ts used for?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "Describing the types of JavaScript code so that TypeScript can check it",
      "Storing the compiled JavaScript output that is shipped to production",
      "Declaring the environment variables that the application reads",
      "Listing the files that the compiler should leave out of the build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the include option in tsconfig list?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "The npm packages that must be installed before compiling",
      "The browsers that the compiled code has to support",
      "The type definitions that are added to the global scope",
      "The files or folders that the compiler should process"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the compiler do with types when it emits JavaScript?",
    "topic": "tsconfig & compiling to JavaScript",
    "choices": [
      "Keeps them as comments that the runtime checks on each call",
      "Removes them, because types exist only at compile time",
      "Converts them into runtime checks that throw errors on mismatches",
      "Converts them into classes that the program can inspect later"
    ],
    "answerIdx": 1
  }
]
```

LAYER: pern-3

```json
[
  {
    "stem": "What is JSX?",
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
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
    "topic": "JSX, props & component composition",
    "choices": [
      "It throws an error, because plain objects are not valid as a React child",
      "It prints the object on the page as a JSON string with all of its keys",
      "It renders the keys of the object as an unordered list of items",
      "It renders nothing at all and only writes a warning to the console"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the call const [count, setCount] = useState(0) give you?",
    "topic": "useState & useEffect",
    "choices": [
      "A reference object whose current property is 0",
      "A constant value and a function that deletes the state",
      "Two copies of the state that update independently",
      "The current state value and a function to update it, starting at 0"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should you not change state directly, as in count = count + 1?",
    "topic": "useState & useEffect",
    "choices": [
      "The value is changed but React shows the old value only on mobile",
      "React is not notified, so the component does not re-render",
      "JavaScript forbids assignment to variables returned by hooks",
      "It works but it is slower than calling the setter function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the second argument of useEffect control?",
    "topic": "useState & useEffect",
    "choices": [
      "The delay in milliseconds that React waits before it runs the effect",
      "When the effect runs, based on the values in the dependency array",
      "The number of times that the effect is allowed to run during the page life",
      "The component in the tree where the effect is supposed to run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when useEffect has an empty dependency array?",
    "topic": "useState & useEffect",
    "choices": [
      "It runs after every render",
      "It never runs unless the array is changed",
      "It runs before the first render",
      "It runs once after the first render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of the function returned from a useEffect callback?",
    "topic": "useState & useEffect",
    "choices": [
      "It cleans up, for example removing a listener, before the next run or on unmount",
      "It is the value that the component renders into the page after the effect runs",
      "It runs before the effect itself, but only during the very first render",
      "It is the new state value that React saves for the next render of the component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is the right way to update state based on the previous value?",
    "topic": "useState & useEffect",
    "choices": [
      "Read the variable and call setCount with a plain number twice",
      "Call setCount without arguments to increment",
      "Pass a function to the setter, as in setCount(c => c + 1)",
      "Assign to count and then call setCount()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can an effect with no dependency array cause an infinite loop when it sets state?",
    "topic": "useState & useEffect",
    "choices": [
      "The effect is blocked until the state stops changing",
      "React disables the effect after the first state update",
      "Each state update re-renders and the effect runs again after every render",
      "State updates inside effects are queued until the page closes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When are state updates inside an event handler applied by React?",
    "topic": "useState & useEffect",
    "choices": [
      "They are batched and applied before the next render",
      "They are applied immediately after each setter call",
      "They are applied only after the page reloads",
      "They are discarded if two setters run in the same handler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which statement about hooks is correct?",
    "topic": "useState & useEffect",
    "choices": [
      "Hooks may be called inside if statements as long as they return a value",
      "Hooks may only be used inside class components",
      "Hooks run on the server before the component is created",
      "Hooks must be called at the top level of a component or custom hook"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does useState(() => expensiveInit()) do differently from useState(expensiveInit())?",
    "topic": "useState & useEffect",
    "choices": [
      "The function runs on every render and the result is cached",
      "The function runs only on the first render instead of on every render",
      "The function runs after the first effect completes",
      "The state is initialised to the function itself"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the recommended way to render a list of items in JSX?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Use a for loop written directly inside the JSX curly braces of the component",
      "Use map over the array and return an element with a key for each item",
      "Use forEach and return the array of elements that the loop builds up",
      "Write every element by hand and hide the extra ones with a CSS rule"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does each item in a rendered list need a key?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "The browser requires keys to keep the HTML valid",
      "Keys are passed to the component as props with the same name",
      "Keys give each element a unique CSS class for styling",
      "React uses keys to match items between renders and update the right ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which value is the best choice for a key?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "A stable unique id from your data",
      "The item index in the array when items can be reordered",
      "A random number generated on each render",
      "The text of the item when two items can have the same text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you render a component only when a condition is true?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Use an if statement inside the JSX braces",
      "Use the display property of the JSX element to hide it",
      "Use the AND operator, as in {isOpen && <Modal />}",
      "Return false from the component to show it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of using the AND operator with a number on the left, as in {items.length && <List />}?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "It throws an error whenever the array happens to be empty at render time",
      "It always renders the list component even when the array has no items",
      "When the length is 0, the number 0 is rendered on the screen",
      "It converts the whole list to a string before it is shown to the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which approach renders one of two elements based on a condition?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "The ternary operator, as in {cond ? <A /> : <B />}",
      "The switch keyword inside the JSX braces",
      "The when attribute on the element",
      "The or operator between the two elements"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a component state when it is removed from the tree and added back later?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "It is kept until the page reloads",
      "It is saved in local storage by default",
      "It is moved to the parent component",
      "It is lost, because the component is mounted fresh"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is using the array index as a key a problem for lists that can be reordered?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Indexes are not strings, so React throws an error when it sees a numeric key",
      "The keys stop following the items, so state can attach to the wrong item",
      "Indexes are always replaced by React with random numbers on every render",
      "Indexes make React render the entire list twice as slowly as other keys do"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you return nothing from a component?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "Return an empty string and a warning is shown",
      "Return null",
      "Return false and React throws an error",
      "Return the keyword void"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does changing the key of a component do?",
    "topic": "Conditional rendering & lists",
    "choices": [
      "React skips rendering that component",
      "React moves the component to the end of the list",
      "React throws an error until the key is changed back",
      "React treats it as a new component and resets its state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a controlled input in React?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "An input whose value comes from state and changes through onChange",
      "An input that React is not allowed to update after the first render",
      "An input that stores its value inside the DOM and never in the component",
      "An input that stays disabled until the user submits the form for the first time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which attribute pair makes a text input controlled?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "defaultValue and onBlur",
      "ref and onFocus",
      "value and onChange",
      "name and onSubmit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read the new value in an onChange handler of an input?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "event.value",
      "event.currentValue",
      "event.target.value",
      "event.input.text"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does event.preventDefault() do inside onSubmit of a form?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "Stops the browser from reloading the page on submit",
      "Stops the form values from being saved in state",
      "Prevents the onChange event from firing later",
      "Resets every input to its original value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle several inputs with one state object?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "Create a separate setter call for each keystroke in every one of the inputs",
      "Store every input value in a global variable that all components can read",
      "Use a different component for each input and keep their values apart",
      "Use the input name attribute to update the matching key in the object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an uncontrolled input?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "An input that the user can edit only once before it becomes read only",
      "An input whose value lives in the DOM and is read through a ref",
      "An input that has no name attribute and so cannot be submitted at all",
      "An input that is updated through component state on every single keystroke"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a controlled checkbox get its checked state?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "Through the value prop, which is set to true or to false for each render",
      "Through the checked prop with an onChange handler reading event.target.checked",
      "Through the defaultChecked prop only, which React keeps in sync with state",
      "Through a ref that is read and updated only when the form is submitted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you set the selected option of a select element in React?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "Add a selected attribute to the option element",
      "Use the selectedIndex prop on the select element",
      "Set the option text equal to the state variable",
      "Pass a value prop to the select element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What problem happens when an input has a value prop but no onChange handler?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "The input becomes read only and React warns about it",
      "The input accepts typing but resets after a second",
      "React sets the value to an empty string on each render",
      "The form cannot be submitted"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why would you store form errors in state?",
    "topic": "Controlled forms & inputs",
    "choices": [
      "So the browser can send them to the server automatically",
      "So they stay after the page is closed",
      "So the component re-renders to show them next to the fields",
      "So that React validates the inputs for you"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does composition mean in React?",
    "topic": "Lifting state & data flow",
    "choices": [
      "Writing every component as a class that extends another class in the project",
      "Merging all of the components into one very large file for easier reading",
      "Building complex UIs by combining smaller components, often through children",
      "Sharing state between unrelated components through global variables on window"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is lifting state up?",
    "topic": "Lifting state & data flow",
    "choices": [
      "Moving state to the nearest common parent so siblings can share it",
      "Moving state into a global variable available everywhere",
      "Moving state into the child component that uses it most",
      "Moving state into local storage so components can read it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which pattern lets a parent customise what a child renders without the child knowing the content?",
    "topic": "Lifting state & data flow",
    "choices": [
      "Using inheritance from the parent component",
      "Reading the parent props with document.querySelector",
      "Calling the parent function from the child constructor",
      "Passing JSX as children or as a render prop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do most React teams prefer composition over inheritance?",
    "topic": "Lifting state & data flow",
    "choices": [
      "Inheritance is not supported by the JavaScript language in any form",
      "Composition gives flexible reuse without tight coupling between components",
      "Composition makes the components run only on the server before the page loads",
      "Inheritance forces every component to be class based, which makes it slow"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a child tell its parent that something happened?",
    "topic": "Lifting state & data flow",
    "choices": [
      "By changing the state of the parent component directly from inside the child",
      "By calling a function that the parent passed down as a prop",
      "By dispatching a DOM event that React then hides from the other components",
      "By returning the new value from its render function to the parent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a presentational component?",
    "topic": "Lifting state & data flow",
    "choices": [
      "A component that fetches data from the server and keeps the application state",
      "A component that can only be used on the first page of the application",
      "A component that has no props at all and always renders the same markup",
      "A component that focuses on how things look and receives data through props"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is prop drilling?",
    "topic": "Lifting state & data flow",
    "choices": [
      "Passing props through several intermediate components that do not use them",
      "Reading props from deep inside the DOM tree with a query selector call",
      "Replacing props with state inside each one of the child components",
      "Looping over the props object with a for loop in every component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of a fragment, written as <>...</>?",
    "topic": "Lifting state & data flow",
    "choices": [
      "It speeds up rendering by skipping the virtual DOM",
      "It adds a hidden wrapper that is used for styling",
      "It groups siblings without adding an extra element to the DOM",
      "It lets a component return several components with the same key"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is a sign that a component should be split into smaller ones?",
    "topic": "Lifting state & data flow",
    "choices": [
      "It receives more than one prop from the parent component that renders it",
      "It contains a single hook call at the top of its function body",
      "It does several unrelated jobs and is hard to read or to reuse",
      "It returns JSX that spans more than one line of the source file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that React data flows one way?",
    "topic": "Lifting state & data flow",
    "choices": [
      "Data goes down through props, and children send events up through callbacks",
      "Data goes from children to parents through props, and parents answer with events",
      "Data is shared between all components through the DOM instead of through props",
      "Data can only be changed one single time during each render of a component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does fetch return when the server responds with status 404?",
    "topic": "Fetching data from an API",
    "choices": [
      "A promise that rejects with a network error object",
      "A promise that stays pending until the request is retried",
      "The parsed JSON body of the not found page",
      "A promise that resolves with a response whose ok property is false"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does the promise returned by fetch reject?",
    "topic": "Fetching data from an API",
    "choices": [
      "When the server returns any status code of 400 or above",
      "When a network failure prevents the request from completing",
      "When the response body is not valid JSON",
      "When the response takes longer than one second"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read a JSON body from a fetch response?",
    "topic": "Fetching data from an API",
    "choices": [
      "Read response.body as a plain object directly",
      "Call response.json(), which returns a promise",
      "Call JSON.parse on the response object itself",
      "Read response.data after awaiting the fetch call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which option sends a JSON body in a POST request with fetch?",
    "topic": "Fetching data from an API",
    "choices": [
      "method POST and a body that is set to the raw JavaScript object directly",
      "method SEND with the data placed in the query string of the request url",
      "a data property on the options object that holds the object to be sent",
      "method POST, a Content-Type of application/json and body JSON.stringify(data)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does response.ok indicate?",
    "topic": "Fetching data from an API",
    "choices": [
      "The status code is in the range 200 to 299",
      "The server sent a body that is not empty",
      "The request was made over a secure connection",
      "The response was served from the browser cache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is the correct pattern for handling HTTP errors with fetch?",
    "topic": "Fetching data from an API",
    "choices": [
      "Wrap fetch in try and catch alone and rely on the catch for every status code",
      "Check that response.status equals 200 only",
      "Check response.ok and throw an error when it is false",
      "Read response.error after awaiting the call"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you cancel an in flight fetch request?",
    "topic": "Fetching data from an API",
    "choices": [
      "Call response.close() on the pending response before awaiting its body",
      "Set the timeout property to zero inside the options of the request call",
      "Pass an AbortController signal in the options and call abort()",
      "Delete the promise object that fetch returned so that the request stops"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a browser fetch to another origin fail even if the server responds?",
    "topic": "Fetching data from an API",
    "choices": [
      "The server response lacks the CORS headers that allow that origin",
      "The browser blocks every request that uses HTTPS from a different domain",
      "The fetch function only supports requests to the same origin",
      "The response is too large to be stored in the cache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you send query parameters safely with fetch?",
    "topic": "Fetching data from an API",
    "choices": [
      "Join the values with plus signs and no encoding",
      "Put the values in the request body for a GET request",
      "Set them as custom headers on the request",
      "Build the url with URLSearchParams so values are encoded"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the credentials include option do on a cross origin fetch?",
    "topic": "Fetching data from an API",
    "choices": [
      "Adds the user name and password to the url of the request automatically",
      "Sends cookies with the request and accepts cookies in the response",
      "Stores the response in the password manager that is built into the browser",
      "Allows the server to read the local storage that belongs to the page"
    ],
    "answerIdx": 1
  }
]
```

LAYER: pern-4

```json
[
  {
    "stem": "Which component defines the router for a browser app in React Router v6?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "HashLink",
      "RouterSwitch",
      "BrowserRouter",
      "RouteProvider"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What replaced the Switch component in v6?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "Routes",
      "Router",
      "Path",
      "Outlet"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a url parameter such as /users/:id in a component?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "Read props.params.id",
      "Read window.location.id",
      "Call useLocation and parse the string",
      "Call useParams and read the id property"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Outlet component do?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "Opens the page of the matched child route in a new browser tab",
      "Renders the matched child route inside the parent layout",
      "Exports the matched route so that another application can import it",
      "Redirects the visitor to the home page when no route has matched"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which component renders a link that does not reload the page?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "a",
      "Link",
      "Anchor",
      "Navigate"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the NavLink component?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "A link that opens its target in a new window each time it is clicked",
      "A link that fetches the data of the next page before it navigates there",
      "A link that is hidden on mobile devices and shown on desktop screens only",
      "A link that knows if it matches the current url, so you can style it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you navigate from code, for example after a form submit?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "Call the function returned by useNavigate",
      "Assign a new value to window.location.hash",
      "Call history.push from the component props",
      "Return a Link from the handler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define a nested route?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "Write a longer path string and let the router split it into nested parts",
      "Wrap the child in a second BrowserRouter that is placed inside the first",
      "Put a Route inside another Route and render an Outlet in the parent element",
      "Use two Routes components at the root of the application, one for each level"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a route with path set to the asterisk usually show?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "The home page for every url",
      "A redirect to the login page",
      "A not found page for any unmatched url",
      "The first nested route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read query string values such as ?page=2?",
    "topic": "React Router — nested routes & params",
    "choices": [
      "useSearchParams",
      "useParams",
      "useNavigate",
      "useRoutes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Zustand?",
    "topic": "Global state with Zustand",
    "choices": [
      "A router library that maps urls to components in React applications",
      "A testing library that renders components inside a simulated browser",
      "A tool that compiles TypeScript files during the build step",
      "A small state library that uses a store made with create"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a component read a value from a Zustand store?",
    "topic": "Global state with Zustand",
    "choices": [
      "Import the Provider component and read the value from its props",
      "Call the store hook with a selector, such as useStore(s => s.count)",
      "Dispatch an action to the store and wait until the reducer answers",
      "Call getState inside the render function without using any hook"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Does Zustand require a Provider around the app?",
    "topic": "Global state with Zustand",
    "choices": [
      "Yes, a Provider must wrap the root component of the whole application",
      "No, the store hook can be used directly in any component",
      "Only when the store holds more than one value at the same time",
      "Only when the store is used inside tests of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a selector when reading from a store?",
    "topic": "Global state with Zustand",
    "choices": [
      "The selector makes the store read only for that single component",
      "The selector copies the entire store into the local state of the component",
      "The selector sends the selected value to the server for each render",
      "The component re-renders only when the selected value changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you update state in a Zustand store?",
    "topic": "Global state with Zustand",
    "choices": [
      "Call set inside an action function that is defined in the store",
      "Assign new values directly to the properties of the store object",
      "Call useState on the value that the store hook has returned",
      "Emit a custom event on the window object that the store listens for"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a reasonable use of a global store in a MERN app?",
    "topic": "Global state with Zustand",
    "choices": [
      "The raw response of every request, duplicated from what the server holds",
      "Values that only one component reads and that no other component needs",
      "The logged in user and UI settings that many components need",
      "Temporary text typed into one input field of a single form"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Zustand compare with Redux in setup effort?",
    "topic": "Global state with Zustand",
    "choices": [
      "Zustand needs more boilerplate, because every change needs an action creator",
      "They need exactly the same files, folders and code to get started",
      "Zustand needs far less boilerplate, with no reducers or action types required",
      "Zustand cannot hold more than one value, so a store needs several hooks"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you avoid putting in a global store when React Query is in use?",
    "topic": "Global state with Zustand",
    "choices": [
      "Server data that React Query already caches",
      "The theme choice that the user has made in the settings page",
      "Whether the sidebar is open or closed at the moment",
      "The language that the user has picked for the interface"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you persist a Zustand store between visits?",
    "topic": "Global state with Zustand",
    "choices": [
      "Wrap the store in a Provider that keeps its values in a cookie",
      "Call localStorage by hand in every component that uses the store",
      "A store cannot be persisted by any means once the page is reloaded",
      "Use the persist middleware, which saves state to storage"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is mutating the state object directly inside a store action discouraged?",
    "topic": "Global state with Zustand",
    "choices": [
      "The browser forbids changing objects that are created inside modules",
      "Subscribers may not see a new reference, so the UI may not update",
      "Stores freeze themselves after the first update and reject new writes",
      "It makes every later call to the store slower because of extra checks"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What problem does React Query mainly solve?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "Replacing the router of the application with a lighter alternative library",
      "Managing server state, such as fetching, caching and updating remote data",
      "Storing the values of form inputs while the user types into a field",
      "Compiling JSX faster during the production build step of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useQuery require at minimum?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "A url string and a component into which the data is rendered",
      "A reducer function and an initial state object for the cache",
      "A schema and a connection string for the database it queries",
      "A query key and a function that returns a promise of the data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of the query key?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "Identifies cached data so it can be reused and invalidated",
      "Encrypts the request that is sent to the server for that query",
      "Sets the url that the request for this query is sent to",
      "Names the component in the tree that renders the data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does staleTime control?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "How long unused data is kept in memory before it is deleted",
      "How long a request may take before it is cancelled by a timeout",
      "How long fetched data counts as fresh before it may be refetched",
      "How often the component re-renders on its own without any state change"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does useMutation do?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "Fetches data from the server and caches the result under a query key",
      "Reads data out of local storage and puts it into component state",
      "Runs a function that changes server data, such as a POST, and tracks its status",
      "Subscribes the component to changes that other users make on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you refresh a list after a mutation succeeds?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "Invalidate the related query key so that it refetches",
      "Reload the whole page with window.location after each mutation succeeds",
      "Edit the cache of the browser by hand using the developer tools",
      "Call useQuery a second time inside the handler of the mutation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does React Query do when a component mounts and cached data exists?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "Always waits for a fresh response before it shows anything on screen",
      "Deletes the cache entry and starts a brand new request each time",
      "Shows an empty state until the user clicks a button to refresh",
      "Shows the cached data and may refetch in the background if it is stale"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which values does useQuery return to help you render UI states?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "html, css and script, so that the result can be shown on a page",
      "data, isLoading and error, among others",
      "state, dispatch and reducer, as with other state hooks in React",
      "route, params and query, which describe the current url of the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an optimistic update?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "Waiting for the server to confirm the change before the UI shows anything",
      "Showing the change in the UI right away and rolling back if the request fails",
      "Updating the UI only when the user next refreshes the page by hand",
      "Writing the change into the cache of the server from the client directly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can React Query reduce duplicate requests?",
    "topic": "Server state with TanStack Query",
    "choices": [
      "It blocks every second request that is sent to the same url in a minute",
      "It sends all of the requests through a single persistent websocket",
      "It compresses several requests into one batch before they go out",
      "Components with the same query key share one request and one cached result"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "A function whose name starts with use and that calls other hooks",
      "A class component that holds some state on behalf of other components",
      "A built in hook that becomes available after installing an extra package",
      "A component that returns nothing and is used only for its side effects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must the name of a custom hook start with use?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Because JavaScript requires it for any function with state",
      "So the function is called automatically on mount",
      "So that linting and React can check the rules of hooks",
      "Because only names with use can return values"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do two components get when they both call the same custom hook that uses useState?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Shared state, because the hook has one state",
      "The same state only when the page reloads",
      "Separate state, because each call creates its own state",
      "An error because a hook cannot be reused"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is a good candidate for a custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Logic that reads a value from local storage and keeps it in state",
      "A single constant that is used in exactly one place of one component",
      "Markup that is repeated in two different components on the same page",
      "A CSS rule that is shared by all of the buttons of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can a custom hook return?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Only JSX elements, because a hook is a kind of component in React",
      "Only a single state value, because hooks return one thing each time",
      "Only a promise, because hooks are used for asynchronous work alone",
      "Anything: a value, an array, an object or a function"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a hook like useFetch(url) typically manage?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "The styling that is applied to the response when it is displayed",
      "The data, loading and error state of a request",
      "The routes of the application that are available to the user",
      "The reducer and the actions for the entire state of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you avoid a stale response in a fetching hook when the url changes quickly?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "Run every request twice and then use the answer that arrives faster",
      "Ignore older results with a flag or an abort signal in the effect cleanup",
      "Increase the delay of each new request so that old ones finish first",
      "Store every response in an array and show the first one that was saved"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a custom hook call another custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "No, only built in hooks can be called inside hooks",
      "Only when the hooks live in the same file",
      "Only when both hooks return arrays",
      "Yes, hooks can be composed from other hooks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good way to test the idea that logic belongs in a custom hook?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "The logic uses state or effects and is needed by more than one component",
      "The logic is a pure helper function without any React feature inside it",
      "The logic is used one single time inside one file of the project",
      "The logic only needs a plain variable and never changes during the render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a debounce hook usually return?",
    "topic": "Custom hooks & reusability",
    "choices": [
      "A function that clears the whole page when the user stops typing in the input",
      "A list holding every value that the input has ever had since it was mounted",
      "A value that updates only after the input has stopped changing for a delay",
      "The very first value of the input, which never updates after the first render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does React.memo do?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "Stores the output of the component in local storage for later visits",
      "Makes a component update twice as fast by running its code on a worker",
      "Skips re-rendering a component when its props have not changed",
      "Prevents any state change inside the component from causing a re-render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does useMemo cache?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "The result of a calculation between renders, until its dependencies change",
      "The DOM nodes of the component, so that they are not created again",
      "The props that were received from the parent in the previous render",
      "The network response of a fetch call made while the component renders"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does useCallback return?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "A promise that resolves to the function after the next render has finished",
      "A new function on every render, which is then compared by React",
      "The result of calling the function once with the current dependencies",
      "The same function between renders, until its dependencies change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might React.memo not help when the parent passes a new inline function as a prop?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "Memo only works for props that are numbers and not for any other type",
      "The function has a new identity every render, so the props look changed",
      "Memo ignores function props completely when it compares the old and new ones",
      "Functions cannot be passed as props to components that are wrapped in memo"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do before adding useMemo everywhere?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "Wrap every value in useMemo to be safe",
      "Measure with the profiler to find real slow renders",
      "Remove all state from the app",
      "Disable StrictMode permanently"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which situation is a good use of useMemo?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "Adding two small numbers together inside the body of the component",
      "Reading a single prop value that was passed down by the parent",
      "Calling the state setter function inside an event handler of a button",
      "Filtering and sorting a large list that does not need to change on every render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the dependency array of useMemo decide?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "When the cached value is recomputed",
      "Which component runs the calculation",
      "How many times the value can be used",
      "Where the value is stored"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a cost of overusing memoisation?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "The application can no longer render lists that are longer than ten items",
      "The application loses its state each time a memoised value is recalculated",
      "Extra memory use and more complex code, with little or no speed gain",
      "The bundle cannot be split into chunks when memoised functions are present"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool shows why a component rendered in the browser?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "The Network panel",
      "The Lighthouse SEO audit",
      "The React DevTools Profiler",
      "The Application panel"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which technique avoids rendering thousands of list rows at once?",
    "topic": "Performance — memo, useMemo, useCallback",
    "choices": [
      "Virtualisation, which renders only the rows that are visible on screen",
      "Wrapping the whole list in a useCallback so that it renders only once",
      "Using the index of each item as its key so that React can skip rows",
      "Rendering the list twice so that the browser can cache the first pass"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is code splitting?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "Splitting the source code into several git repositories",
      "Dividing a component into two files",
      "Compressing the bundle with gzip",
      "Breaking the bundle into smaller pieces that load when needed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function loads a component lazily in React?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "React.defer",
      "React.lazy",
      "React.import",
      "React.chunk"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must wrap a lazy loaded component?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "StrictMode",
      "Suspense with a fallback",
      "A Provider with a lazy value",
      "ErrorBoundary only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the dynamic import() expression return?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "The module immediately",
      "A callback to load the module",
      "The path to the file",
      "A promise that resolves to the module"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is a good place to split a bundle in a typical app?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "At route level, so each page loads only when visited",
      "Inside every small button component",
      "In the middle of a function",
      "Between two lines of the same component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Suspense fallback prop show?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "The error message of a failed request",
      "The previous version of the page",
      "A placeholder while the lazy component is loading",
      "Nothing, it only logs a message"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of splitting too finely?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "The code stops working in production",
      "Each chunk has to be written in a different language",
      "More network requests and possible loading flashes",
      "Components lose their props"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you start loading a chunk before the user clicks a link?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "Preload it on hover or when the browser is idle",
      "Add a longer fallback text",
      "Load it in a worker without import",
      "Duplicate the code in the main bundle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does React.lazy require from the imported module?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "A named export called Component",
      "A function named load",
      "A file that ends with lazy.js",
      "A default export that is a component"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a bundler do when it sees a dynamic import() call?",
    "topic": "Code splitting & lazy loading",
    "choices": [
      "It inlines the module into the main bundle and removes the import call",
      "It emits the imported module as a separate chunk that is fetched when the call runs",
      "It replaces the call with a static import at the top of the file",
      "It skips the module and leaves the import for the browser to resolve later"
    ],
    "answerIdx": 1
  }
]
```

LAYER: pern-5

```json
[
  {
    "stem": "What is Node.js?",
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Node runtime & module system",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Express routing & controllers",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "Middleware — logging, validation, errors",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "RESTful API design & status codes",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
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
    "topic": "Environment config with dotenv",
    "choices": [
      "In the settings of the hosting platform",
      "In the package.json file",
      "In the public folder",
      "In the README file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common way to structure an Express project as it grows?",
    "topic": "Structuring a scalable project",
    "choices": [
      "Keep every route and every query in one single server file for simplicity",
      "Create one file per HTTP method and place all of them in the root folder",
      "Put the whole application in a single class that the entry file creates",
      "Split it into routes, controllers, services and data access layers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a controller do in a layered Express app?",
    "topic": "Structuring a scalable project",
    "choices": [
      "Run the SQL queries and format the rows for the database",
      "Read the request, call a service and send the response",
      "Define the models and the migrations of the database tables",
      "Start the server and read the environment variables of the process"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where does the business logic of the application belong?",
    "topic": "Structuring a scalable project",
    "choices": [
      "In the route definitions, next to the path and the HTTP method",
      "In services that are independent of Express, so they are easy to test",
      "In the middleware that parses the body of each incoming request",
      "In the entry file that calls app.listen for the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep the Express app creation separate from app.listen?",
    "topic": "Structuring a scalable project",
    "choices": [
      "Express refuses to define routes in the same file as the listen call",
      "The listen call must run before any route is registered by the app",
      "A separate file makes the app start faster in production",
      "Tests can import the app without starting a server on a real port"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of a central error handling middleware?",
    "topic": "Structuring a scalable project",
    "choices": [
      "All errors are turned into consistent responses in one place",
      "Errors are hidden from the logs so that users never see them",
      "Errors are retried automatically until the request succeeds",
      "Errors are sent to the browser together with the stack trace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why group code by feature, such as users and orders, in a large project?",
    "topic": "Structuring a scalable project",
    "choices": [
      "Express needs one folder for each feature to register the routes",
      "The folders decide the order in which the routes are matched",
      "Code that changes together stays together, so it is easier to find and change",
      "Grouping by feature is required for the app to use TypeScript"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is dependency injection in this context?",
    "topic": "Structuring a scalable project",
    "choices": [
      "Installing dependencies automatically from the lock file during a deploy",
      "Injecting scripts of third parties into the pages that the server sends",
      "Passing dependencies, such as a database client, into a function instead of importing them inside",
      "Loading all modules at startup so that they are cached for later"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should configuration be read in one place?",
    "topic": "Structuring a scalable project",
    "choices": [
      "The rest of the code receives validated values instead of reading the environment everywhere",
      "The environment can be read only once, since the process freezes it",
      "Configuration files are required to be in the root of the project",
      "A single file makes the server respond faster to requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a router in Express used for in a larger project?",
    "topic": "Structuring a scalable project",
    "choices": [
      "Redirecting requests to another server on the network",
      "Caching the responses of the routes in memory",
      "Compiling the route definitions into a lookup table at build time",
      "Grouping related routes in a module that is mounted under a path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a sign that a file in your project has too many responsibilities?",
    "topic": "Structuring a scalable project",
    "choices": [
      "It has more than one exported function that other files use",
      "It mixes routing, validation, business rules and queries and is hard to test",
      "It imports more than one module from the node_modules folder",
      "It is longer than the screen of the editor of the developer"
    ],
    "answerIdx": 1
  }
]
```

LAYER: pern-6

```json
[
  {
    "stem": "What does a row in a relational table represent?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "A single attribute that is shared by all of the records in the table",
      "A rule that limits the values which the columns can accept",
      "A single record, with one value for each column of the table",
      "A link to a row of another table that is kept in a separate file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a column in a table define?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "One attribute of the records, with a name and a data type",
      "One record of the table together with all of its related records",
      "One relationship between the table and the other tables of the database",
      "One index that the database builds to find the records quickly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which data type is the best fit for a price such as 19.99 where exact decimals matter?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "FLOAT, which stores approximate binary values with rounding",
      "TEXT, which keeps the digits as characters of a string",
      "INTEGER, which stores only whole numbers without any decimals",
      "NUMERIC or DECIMAL, which store exact decimal values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between CHAR(10) and VARCHAR(10)?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "VARCHAR pads values to the fixed length, while CHAR stores only what is given",
      "CHAR pads values to the fixed length, while VARCHAR stores only what is given up to the limit",
      "CHAR can hold digits only, while VARCHAR can hold any character",
      "They are identical in every database and only the names differ"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does NULL mean in SQL?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "The value is zero, which is the default for every numeric column",
      "The value is unknown or missing, which is not the same as zero or an empty string",
      "The value is an empty string, which is the default for text columns",
      "The value is false, which is the default for boolean columns"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which type would you use to store a timestamp with time zone information in PostgreSQL?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "DATE",
      "TIME without a time zone",
      "VARCHAR holding the text of the date",
      "TIMESTAMPTZ"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why choose the narrowest suitable data type for a column?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "It saves storage, helps validation and can make queries faster",
      "The database refuses to store values that are smaller than the type",
      "Narrow types are required for a column to be used in a join",
      "It makes the table read only for all the users of the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a default value on a column do?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "Replaces every value that is stored in the column with the default",
      "Prevents the column from ever being changed by an update",
      "Supplies a value when an insert does not provide one for that column",
      "Makes the column optional for queries that read the table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement creates a table?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "MAKE TABLE",
      "NEW TABLE",
      "CREATE TABLE",
      "ADD TABLE"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the SERIAL or IDENTITY property usually provide for an id column?",
    "topic": "Tables, rows, columns & data types",
    "choices": [
      "An automatically increasing integer for each new row",
      "A random text identifier that is generated by the client",
      "A copy of the id of the row that was inserted before",
      "A value that has to be typed by the person who inserts the row"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which clause filters rows before they are returned?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "ORDER BY",
      "LIMIT",
      "FROM",
      "WHERE"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does SELECT * return?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "Only the primary key column of each of the matching rows",
      "All columns of the rows that match the query",
      "The number of rows that match the query and nothing else",
      "All of the tables that the database contains"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is selecting only the columns you need better than SELECT * in application code?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "It is required by the database to use an index on the table",
      "It transfers less data and does not break when columns are added",
      "It makes the rows come back in a sorted order by default",
      "It prevents any other user from reading the columns you left out"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you sort the result by price from highest to lowest?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "ORDER BY price ASC",
      "SORT BY price DOWN",
      "GROUP BY price DESC",
      "ORDER BY price DESC"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does LIMIT 10 OFFSET 20 do?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "Skips the first 20 rows and returns the next 10",
      "Returns the first 10 rows and skips the next 20",
      "Returns 20 rows starting after the tenth one",
      "Returns the rows with an id between 10 and 20"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which operator tests whether a value is in a list?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "BETWEEN (1, 2, 3)",
      "LIKE (1, 2, 3)",
      "IN (1, 2, 3)",
      "EXISTS (1, 2, 3)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does LIKE 'Jo%' match?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "Values that end with Jo",
      "Values that contain Jo anywhere in the text",
      "Values that start with Jo",
      "Values that are exactly two characters long and start with J"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does WHERE email = NULL return no rows?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "Comparing with NULL using equals is never true, so IS NULL is needed",
      "NULL is not allowed in a where clause of a select statement",
      "The column email can never contain a NULL value in any table",
      "Equals works only with numbers and not with text columns"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In which order do the clauses of a query run logically?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "SELECT, FROM, WHERE, LIMIT, ORDER BY",
      "WHERE, FROM, ORDER BY, SELECT, LIMIT",
      "FROM, SELECT, WHERE, LIMIT, ORDER BY",
      "FROM, WHERE, SELECT, ORDER BY, LIMIT"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does DISTINCT do in SELECT DISTINCT city FROM users?",
    "topic": "SELECT, WHERE, ORDER BY, LIMIT",
    "choices": [
      "Sorts the cities in alphabetical order",
      "Removes duplicate values from the result",
      "Counts how many cities exist in the table",
      "Returns only the first city of the table"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an INNER JOIN return?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "All the rows of the left table, with matches from the right if any",
      "Only the rows that have a match in both tables",
      "All rows of both tables, with NULL where there is no match",
      "Every combination of the rows of the two tables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a LEFT JOIN return?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "Only the rows of the left table that have a match in the right table",
      "All rows of the right table, with NULL for the left when no match exists",
      "Every combination of the rows of the left and the right table",
      "All rows of the left table, with NULL for columns of the right table when no match exists"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which join keeps unmatched rows from both tables?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "FULL OUTER JOIN",
      "INNER JOIN",
      "CROSS JOIN",
      "SELF JOIN"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a CROSS JOIN produce?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "Only the rows that have equal values in the join column",
      "Rows of the first table that are missing from the second",
      "Every combination of the rows from the two tables",
      "One row for each table that is part of the query"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the ON clause in a join?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "It limits the number of rows that the query returns in total",
      "It chooses the columns that appear in the result of the query",
      "It states the condition that links the rows of the two tables",
      "It sorts the rows of the second table before they are joined"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when you forget the join condition between two tables?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "You get a Cartesian product, with every row of one combined with every row of the other",
      "The database returns an empty result because it cannot link the tables",
      "The database chooses a condition from the foreign keys by itself",
      "The query fails with an error before any rows are read"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you find the users that have no orders?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "INNER JOIN orders and keep the rows where the order id is NULL",
      "CROSS JOIN orders and keep the rows with the lowest order id",
      "RIGHT JOIN users and keep the rows where the user id is NULL",
      "LEFT JOIN orders and keep the rows where the order id IS NULL"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use table aliases such as u and o in a join?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "They are required for the database to run any query with a join",
      "They shorten the query and remove ambiguity between columns with the same name",
      "They speed up the join by telling the database which table is larger",
      "They make the tables read only while the query is running"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a self join?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "Joining a table with a copy of the database on another server",
      "Joining a table to itself, for example to link employees to their managers",
      "Joining a table to a view that has the same name as the table",
      "Joining the columns of a table with one another in the same row"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which join type is the default when you write only JOIN?",
    "topic": "JOINs — inner, left, right, full",
    "choices": [
      "LEFT JOIN",
      "FULL JOIN",
      "CROSS JOIN",
      "INNER JOIN"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does COUNT(*) return?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "The number of rows in the group or in the whole result",
      "The number of columns in the table that is queried",
      "The sum of all the numeric values in the table",
      "The number of distinct values in the first column"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between COUNT(*) and COUNT(column)?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "COUNT(*) ignores rows where any column is NULL",
      "COUNT(column) counts only the distinct values of the column",
      "COUNT(column) ignores rows where the column is NULL",
      "They always return the same number for every table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does GROUP BY do?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "Sorts the rows of the table by the columns that are listed",
      "Joins the rows of two tables on the columns that are listed",
      "Groups rows that share values so aggregates can be calculated per group",
      "Removes the rows that have duplicate values from the result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does SELECT city, name, COUNT(*) FROM users GROUP BY city fail in standard SQL?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "The name column is neither grouped nor aggregated",
      "COUNT cannot be used together with a GROUP BY clause",
      "The city column cannot be used in both select and group by",
      "Standard SQL allows only one column in a select with an aggregate"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between WHERE and HAVING?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "HAVING filters rows before grouping, and WHERE filters groups after aggregation",
      "WHERE works only on text columns, and HAVING only on numeric columns",
      "They are the same clause, with two names that are used for old code",
      "WHERE filters rows before grouping, and HAVING filters groups after aggregation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which aggregate returns the average value of a numeric column?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "MEAN",
      "AVG",
      "MEDIAN",
      "TOTAL"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does SUM return for a group in which every value is NULL?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "0",
      "NULL",
      "An error",
      "An empty string"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does COUNT(DISTINCT user_id) count?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "The number of rows that have a user id",
      "The number of NULL values of user_id",
      "The sum of the user ids of all rows",
      "The number of different user ids"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which query returns the total of order amounts for each customer?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "SELECT customer_id, SUM(amount) FROM orders GROUP BY customer_id",
      "SELECT customer_id, SUM(amount) FROM orders ORDER BY customer_id",
      "SELECT SUM(customer_id), amount FROM orders GROUP BY amount",
      "SELECT customer_id FROM orders WHERE SUM(amount) > 0"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you keep only the groups that have more than 5 rows?",
    "topic": "Aggregations & GROUP BY",
    "choices": [
      "WHERE COUNT(*) > 5 before the GROUP BY",
      "LIMIT 5 after the GROUP BY clause",
      "HAVING COUNT(*) > 5 after the GROUP BY",
      "ORDER BY COUNT(*) > 5 at the end of the query"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is normalization?",
    "topic": "Normalization & relationships",
    "choices": [
      "Converting all data in a table to lower case letters",
      "Adding indexes to every column so that queries are fast",
      "Organising data into tables to reduce duplication and keep it consistent",
      "Copying tables to several servers to improve availability"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does first normal form require?",
    "topic": "Normalization & relationships",
    "choices": [
      "Each column holds a single atomic value, with no repeating groups",
      "Each table has at least one foreign key to another table",
      "Each column depends on the whole primary key and nothing else",
      "Each table is stored in a separate file on the disk"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem does storing a comma separated list of tags in one column cause?",
    "topic": "Normalization & relationships",
    "choices": [
      "It makes the column too wide for any index to be created",
      "It prevents the table from having a primary key at all",
      "It forces the database to store the table in memory",
      "It breaks atomicity, so searching and updating single tags is hard"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a one to many relationship?",
    "topic": "Normalization & relationships",
    "choices": [
      "One row relates to exactly one row of another table at all times",
      "One row in a table relates to many rows in another, such as a user and their orders",
      "Many rows relate to many rows, which needs a table of its own",
      "Many tables share a single row that holds all of the data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How is a many to many relationship modeled?",
    "topic": "Normalization & relationships",
    "choices": [
      "With a column in one table that stores a list of ids",
      "With a join table that holds the keys of both tables",
      "With a view that merges both tables into one",
      "With two foreign keys in the same row of one table"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a transitive dependency, which third normal form removes?",
    "topic": "Normalization & relationships",
    "choices": [
      "A key column that depends on two other key columns",
      "A column that depends on a column of another table",
      "A column that is repeated in several tables of the database",
      "A non key column that depends on another non key column"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of over normalizing a schema?",
    "topic": "Normalization & relationships",
    "choices": [
      "Queries need many joins, which can hurt readability and speed",
      "The data can no longer be updated after it is inserted",
      "The tables cannot have primary keys any more",
      "The database refuses to create more than ten tables"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When can denormalization be a reasonable choice?",
    "topic": "Normalization & relationships",
    "choices": [
      "When the data is small and never read by any application",
      "When the tables have no foreign keys or primary keys",
      "When read speed matters and the duplicated data is managed with care",
      "When the database has to be moved to another server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main benefit of normalized data when a customer changes their email?",
    "topic": "Normalization & relationships",
    "choices": [
      "The old email is kept in every row as a history",
      "The change is applied to all the tables by the database",
      "It is changed in one place instead of in many rows",
      "The email can be left out of the table after the change"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a one to one relationship often used for?",
    "topic": "Normalization & relationships",
    "choices": [
      "Splitting rarely used or sensitive columns into a separate table",
      "Storing a list of values for each row of the main table",
      "Linking every row to all of the rows of another table",
      "Saving space by deleting the primary key of one table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a primary key?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "A column that stores the name of the table to which a row belongs",
      "A column that can contain duplicates and NULL values",
      "A column that is copied to every table of the database",
      "A column or set of columns that uniquely identifies each row"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a primary key contain NULL?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "Yes, but only one row may have NULL as its key value",
      "No, a primary key must be unique and not null",
      "Yes, if the column has a default value defined on it",
      "Only in tables that have no foreign keys defined on them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a foreign key?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "A column that is copied from a table of another database",
      "A column that refers to the primary key of another table",
      "A key that is used to encrypt the values of a column",
      "A key that is generated by the client for each request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a foreign key constraint prevent?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "Inserting two rows that have the same value in the column",
      "Reading rows from a table that has a parent table",
      "Deleting rows from the table that holds the foreign key",
      "Inserting a row that refers to a parent row that does not exist"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does ON DELETE CASCADE do?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "Deletes the child rows when the parent row is deleted",
      "Keeps the child rows and sets their parent column to NULL",
      "Blocks the delete of the parent while child rows exist",
      "Copies the child rows into a backup table before the delete"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a UNIQUE constraint guarantee?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "The column always has a value in every row of the table",
      "The column is sorted in ascending order on the disk",
      "No two rows have the same value in the column or columns",
      "The column is the primary key of the table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a CHECK constraint do?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "Checks the spelling of the text that is stored in the column",
      "Checks that the table has a primary key when it is created",
      "Rejects rows whose values do not satisfy a condition, such as price greater than 0",
      "Checks that every column of the table has an index"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does NOT NULL do?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "Rejects rows that have no value for the column",
      "Rejects rows that have a value of zero in the column",
      "Rejects rows that have a duplicate value in the column",
      "Rejects rows that have a value of the wrong data type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why define constraints in the database instead of only in application code?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "Application code cannot validate any data before it is saved",
      "Constraints make the application run faster than validation does",
      "The database does not allow any validation in code at all",
      "The database enforces them for every client, including future ones and manual changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a composite primary key?",
    "topic": "Primary keys, foreign keys & constraints",
    "choices": [
      "A primary key that is stored in two tables at the same time",
      "A primary key that is made of two or more columns together",
      "A primary key that is generated from a hash of the row",
      "A primary key that can be changed every time the row is updated"
    ],
    "answerIdx": 1
  }
]
```

LAYER: pern-7

```json
[
  {
    "stem": "What is psql?",
    "topic": "psql, roles & database administration",
    "choices": [
      "A graphical tool for designing database schemas with diagrams",
      "A library that converts SQL queries into JavaScript objects",
      "The interactive command line client for PostgreSQL",
      "A server process that stores the data files of the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which psql command lists the tables of the current database?",
    "topic": "psql, roles & database administration",
    "choices": [
      "\\dt",
      "\\l",
      "\\du",
      "\\c"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which psql command lists the databases of the server?",
    "topic": "psql, roles & database administration",
    "choices": [
      "\\dt",
      "\\d users",
      "\\q",
      "\\l"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the psql command \\c shop do?",
    "topic": "psql, roles & database administration",
    "choices": [
      "Creates a new database named shop on the server",
      "Connects to the database named shop",
      "Copies the table named shop into the current database",
      "Shows the columns of the table named shop"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a role in PostgreSQL?",
    "topic": "psql, roles & database administration",
    "choices": [
      "A table that holds the permissions of every user of the database",
      "An entity that can own objects and have privileges, used for both users and groups",
      "A background process that runs the maintenance jobs of the server",
      "A column type that stores the access level of each row"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the principle of least privilege mean for an application database user?",
    "topic": "psql, roles & database administration",
    "choices": [
      "Give the application role every permission so that nothing is ever blocked",
      "Share a single superuser role between all of the services that use the database",
      "Remove all passwords from the roles so that the connection is faster",
      "Grant the application role only the permissions it needs, not superuser rights"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which statement gives a role read access to a table?",
    "topic": "psql, roles & database administration",
    "choices": [
      "GRANT SELECT ON orders TO app_user",
      "ALLOW READ orders FOR app_user",
      "SET ACCESS app_user ON orders TO SELECT",
      "ADD PERMISSION SELECT orders app_user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the pg_dump tool create?",
    "topic": "psql, roles & database administration",
    "choices": [
      "A report that lists the slowest queries of the last day",
      "A copy of the server configuration file for another machine",
      "A backup of a database as SQL statements or an archive file",
      "A log of all the connections that were opened to the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should the application not connect as the postgres superuser?",
    "topic": "psql, roles & database administration",
    "choices": [
      "The postgres role can connect only from the same machine as the server",
      "Superusers cannot run SELECT queries on tables of other roles",
      "A bug or injection could then change or destroy anything on the server",
      "Superuser connections are always slower than those of normal roles"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does VACUUM do in PostgreSQL?",
    "topic": "psql, roles & database administration",
    "choices": [
      "Reclaims space from dead rows that old updates and deletes left behind",
      "Deletes all rows that have not been read in the last week",
      "Encrypts the table files with the key of the current role",
      "Rebuilds the primary keys of every table in the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the default index type in PostgreSQL?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "Hash",
      "GIN",
      "BRIN",
      "B-tree"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which queries benefit most from a B-tree index?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "Full text searches on large blocks of free text",
      "Equality, range and sort operations on the indexed column",
      "Queries that scan every row of the table without a filter",
      "Queries that join tables on columns that have no index"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a composite index?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "An index that is stored in two tables at the same time for faster joins",
      "An index on several columns, where the column order matters",
      "An index that combines the data of two databases into a single structure",
      "An index that is rebuilt automatically after every single query is run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Given an index on (last_name, first_name), which query can use it well?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "WHERE first_name = 'Anna' without any condition on last_name",
      "WHERE first_name LIKE '%a' with a leading wildcard",
      "ORDER BY first_name without a filter on last_name",
      "WHERE last_name = 'Smith'"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a partial index?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "An index that covers only the rows that match a WHERE condition",
      "An index that covers only the first column of a table and nothing else",
      "An index that is kept in memory only and is lost after a restart",
      "An index that is built only on the first hundred rows of a table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a partial index useful?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "When every row of the table is read by every query",
      "When the table has no primary key defined on it",
      "When queries often target a small subset, such as active orders",
      "When the column holds many different values in each row"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the cost of adding an index?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "Slower reads, because every query must check every index",
      "The table becomes read only until the index is dropped",
      "Extra storage and slower writes, because the index must be updated",
      "The table loses its primary key constraint"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a UNIQUE index enforce?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "No duplicate values in the indexed columns",
      "That the indexed column is stored in sorted order on disk",
      "That the indexed columns are never NULL in any row",
      "That the index is used by every query on the table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which index type is designed for JSONB containment and full text search?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "B-tree",
      "Hash",
      "BRIN",
      "GIN"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might PostgreSQL ignore an index and scan the whole table?",
    "topic": "Indexes — B-tree, partial, composite",
    "choices": [
      "Because indexes are used only after the table has been vacuumed by a job",
      "For small tables or when the query returns a large share of the rows",
      "Because indexes work only for text columns and never for numbers or dates",
      "Because the index was created by another role of the database server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does ACID stand for?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Availability, consistency, integrity and distribution",
      "Atomicity, consistency, isolation and durability",
      "Atomicity, concurrency, indexing and durability",
      "Accuracy, consistency, isolation and deployment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does atomicity guarantee?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "All the rows of a table are read at the same instant by every user",
      "All the data is copied to a second server before it is confirmed",
      "All the queries run one after another on a single thread",
      "All the statements of a transaction succeed together or none take effect"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does durability guarantee?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Once a transaction is committed, its changes survive a crash",
      "Every transaction is kept in memory for faster later reads",
      "Every committed row stays in the table forever and cannot be deleted",
      "Every query returns the same result no matter when it runs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do BEGIN and COMMIT do?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Start a query and send its result to the client",
      "Lock a table and release it when the connection closes",
      "Start a transaction and make its changes permanent",
      "Create a savepoint and remove it after the next write"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ROLLBACK do?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Restores the database to the state of the last backup",
      "Deletes the table that was changed by the last query",
      "Cancels the changes made in the current transaction",
      "Commits the changes after a short delay to be safe"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a dirty read?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Reading data that another transaction has changed but not yet committed",
      "Reading a row that has been deleted and then inserted again",
      "Reading data from a table that has not been vacuumed",
      "Reading a value that is stored with the wrong data type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the default isolation level in PostgreSQL?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Serializable",
      "Repeatable Read",
      "Read Uncommitted",
      "Read Committed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Serializable isolation provide?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Faster reads because transactions are not locked",
      "Results as if the transactions had run one after another",
      "Automatic retries of every transaction that fails",
      "Permission for dirty reads in long running reports"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does a transfer between two accounts need a transaction?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "The database cannot update two rows without a transaction",
      "The debit and the credit must both happen or both be undone",
      "Transactions make each update faster than a single statement",
      "Transactions are required for any statement that uses a join"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can happen when two transactions update the same row at once?",
    "topic": "Transactions, ACID & isolation levels",
    "choices": [
      "Both updates are applied at the same time and the value is merged",
      "The database ignores the second update without any error",
      "The row is deleted and inserted again by the server",
      "The second waits for the first to finish, or a deadlock error can occur"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between JSON and JSONB in PostgreSQL?",
    "topic": "JSONB & array columns",
    "choices": [
      "JSONB stores a parsed binary form that can be indexed and queried faster",
      "JSON stores a binary form and JSONB stores the plain text",
      "JSONB cannot hold nested objects, but JSON can hold them",
      "They are two names for the same type in different versions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which operator extracts a field of a JSONB value as text?",
    "topic": "JSONB & array columns",
    "choices": [
      "->",
      "#>",
      "->>",
      "@>"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which operator tests whether a JSONB value contains another?",
    "topic": "JSONB & array columns",
    "choices": [
      "The ->> operator, which extracts a field as text",
      "The #> operator, which extracts a value at a path",
      "The @> operator, which checks containment",
      "The <@ operator written backwards, which checks the key"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a JSONB column a good choice?",
    "topic": "JSONB & array columns",
    "choices": [
      "For flexible attributes that vary between rows and are not joined heavily",
      "For data that must be joined with other tables in every query",
      "For columns that need foreign key constraints to other tables",
      "For all of the columns of a table so that no schema is needed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a downside of storing everything in JSONB?",
    "topic": "JSONB & array columns",
    "choices": [
      "The database cannot read the data back once it has been saved",
      "Queries on JSONB cannot use any index of any kind",
      "The column can store only values that are shorter than 255 bytes",
      "You lose type checks, constraints and easy joins for those fields"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you declare an integer array column?",
    "topic": "JSONB & array columns",
    "choices": [
      "tags ARRAY OF INTEGER",
      "tags INTEGER[]",
      "tags LIST(INTEGER)",
      "tags INTEGER..."
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which expression tests whether an array column contains the value 3?",
    "topic": "JSONB & array columns",
    "choices": [
      "numbers HAS 3",
      "3 = ANY(numbers)",
      "numbers CONTAINS 3 ONLY",
      "numbers[3]"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an index of type GIN help with on an array or JSONB column?",
    "topic": "JSONB & array columns",
    "choices": [
      "Sorting the column in descending order on disk",
      "Enforcing that the array has unique members",
      "Compressing the column to save disk space",
      "Fast lookups of values that are contained in the column"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does jsonb_set do?",
    "topic": "JSONB & array columns",
    "choices": [
      "Returns a copy of a JSONB value with a path updated to a new value",
      "Converts a JSONB value into a set of rows of text",
      "Sets a constraint on the keys of a JSONB column",
      "Deletes the JSONB column from the table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might an array column be a poor replacement for a related table?",
    "topic": "JSONB & array columns",
    "choices": [
      "Arrays cannot be stored in a PostgreSQL table at all",
      "Arrays use more storage than a separate table in every case",
      "You cannot enforce foreign keys on its members or join them easily",
      "Arrays cannot be searched with any SQL operator"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a view?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "A copy of a table that is refreshed once a day",
      "A diagram of the tables that the database contains",
      "A stored query that you can select from like a table",
      "A temporary table that exists for one transaction only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a materialized view?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "A view whose result is stored and refreshed on demand",
      "A view that is deleted after it has been read once",
      "A view that can be written to by every role",
      "A view that always reads the latest rows of its tables"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a CTE, written with WITH?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "A permanent table that is created for each query",
      "A function that runs in the background of the server",
      "A constraint that is checked after the query has finished",
      "A named temporary result that a query can refer to in its body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does a recursive CTE help?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "For sorting a table by several columns at once",
      "For hierarchies such as categories or org charts of any depth",
      "For running a query again until it returns no error",
      "For copying a table into another database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a window function do?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "Collapses the rows of each group into one row like GROUP BY",
      "Calculates over a set of rows related to the current row without collapsing them",
      "Limits the rows that a query returns to a fixed window",
      "Opens a second connection to run the query in the background"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which function numbers rows in a partition by a given order?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "COUNT(*) GROUP BY ... ORDER BY ...",
      "NUMBER() WITHIN GROUP (...)",
      "RANK_ROWS(...) USING (...)",
      "ROW_NUMBER() OVER (PARTITION BY ... ORDER BY ...)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between RANK and DENSE_RANK?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "RANK leaves gaps after ties, DENSE_RANK does not",
      "DENSE_RANK leaves gaps after ties, RANK does not",
      "RANK works on text and DENSE_RANK on numbers",
      "They are identical and only the names differ"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which query shows each employee salary next to the average of their department without collapsing rows?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "SELECT salary, AVG(salary) FROM employees GROUP BY department",
      "SELECT salary, AVG(salary) FROM employees HAVING department",
      "SELECT salary, AVG(salary) OVER (PARTITION BY department) FROM employees",
      "SELECT salary, AVG(salary OVER department) FROM employees"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of a view for an application?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "It makes every query on the underlying tables faster",
      "It stores a second copy of the data for backup",
      "It hides a complex query behind a simple name and can limit visible columns",
      "It removes the need for any foreign keys in the tables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does LAG(price) OVER (ORDER BY day) return?",
    "topic": "Views, CTEs & window functions",
    "choices": [
      "The price of the previous row in that order",
      "The highest price in the window of rows",
      "The price of the next row in that order",
      "The average price of all the rows in the table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does EXPLAIN do?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "Runs the query and prints its result as plain text",
      "Describes the columns of the tables in the query",
      "Checks the query for syntax mistakes only",
      "Shows the plan that PostgreSQL would use for a query"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does EXPLAIN ANALYZE add?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "It shows the plan for a query without running it",
      "It runs the query and shows real timings and row counts",
      "It lists all indexes that the query could use",
      "It rewrites the query to make it faster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why be careful when using EXPLAIN ANALYZE on an UPDATE?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "It only shows an estimate and never touches any rows",
      "It really runs the statement, so wrap it in a transaction and roll back",
      "It blocks the table for every other user until the server restarts",
      "It changes the plan of the query for every future run"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Seq Scan node mean in a plan?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "An index was used to find the matching rows",
      "The rows were found in a cache in memory",
      "The query used a sequence of the database",
      "The whole table is read row by row"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an Index Scan node mean?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "An index is used to find matching rows and then the table rows are fetched",
      "The whole index is read from start to end without filtering",
      "The table is read in parallel by several workers",
      "The rows are returned from a materialized view"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a large gap between estimated and actual rows in a plan suggest?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "The query returned more rows than the table contains",
      "The index of the table is corrupted and must be removed",
      "The planner statistics may be out of date, so ANALYZE may help",
      "The server is running a different version of SQL"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ANALYZE (without EXPLAIN) do?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "Runs every query again and compares the results",
      "Checks the data of the tables for errors",
      "Updates the statistics that the planner uses",
      "Rewrites the indexes of the whole database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which change often fixes a slow query that filters on an unindexed column?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "Add an index on the column that is used in the filter",
      "Select more columns so the result is larger",
      "Remove the WHERE clause from the query",
      "Convert the column to a text type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common cause of a slow query with a leading wildcard, such as LIKE '%abc'?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "The LIKE operator is not allowed on indexed columns",
      "The wildcard makes the query run on the client",
      "The query returns too few rows for an index to help",
      "A normal B-tree index cannot be used for it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the first step in tuning a slow query?",
    "topic": "EXPLAIN ANALYZE & query tuning",
    "choices": [
      "Add an index to every column of every table of the database to be safe",
      "Measure it, look at its plan, and change one thing at a time",
      "Rewrite the query in a different programming language that is faster",
      "Restart the database server and hope that it then runs faster"
    ],
    "answerIdx": 1
  }
]
```

LAYER: pern-8

```json
[
  {
    "stem": "What is node-postgres, usually imported as pg?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "An ORM that generates SQL from a schema file and gives you a typed client",
      "A tool that creates and runs the migrations of a PostgreSQL database",
      "A low level PostgreSQL client for Node.js that sends SQL and returns rows",
      "A server that hosts PostgreSQL databases for you in the cloud"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a connection pool?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "A set of open connections that requests borrow and return instead of opening new ones",
      "A list of all the databases that exist on one PostgreSQL server",
      "A queue that stores failed queries so that they can run later",
      "A cache that keeps the results of queries in memory"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use a pool instead of a new connection for every request?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "A pool encrypts every query before it is sent to the server",
      "A new connection per request is not allowed by PostgreSQL",
      "A pool makes each query return fewer rows than before",
      "Opening a connection is slow and the server can handle only a limited number"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if a route borrows a client from the pool and never releases it?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "The client is released automatically after the response is sent",
      "The pool runs out of clients and later requests wait or time out",
      "The database closes the connection and reopens it by itself",
      "The pool grows without limit to make room for more clients"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which call runs one query using a pool client and returns it to the pool by itself?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "client.connect(text, values)",
      "pool.query(text, values)",
      "pool.checkout(text, values)",
      "pool.release(text, values)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When must you use pool.connect() and release the client yourself?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "When you want the query to run faster than with pool.query",
      "When the query returns more than one row from the table",
      "When the database requires a new password for each call",
      "When several statements must share one connection, such as in a transaction"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the max option of a pool set?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "The largest number of connections the pool will open",
      "The largest number of rows that a query may return",
      "The longest time that a query may run before it is cancelled",
      "The largest size of a single row in bytes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can serverless functions exhaust the connections of a database?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "Serverless functions keep every connection open for ever, by design of the platform",
      "Serverless platforms block all of the connections to a PostgreSQL server",
      "Many short lived instances can each open their own pool at the same moment",
      "Each function call is limited to one single connection in total by the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean to handle the pool error event?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "The pool stops running all queries until the event handler has returned",
      "The pool deletes the tables of the database when an error is raised",
      "An idle client can fail, and an unhandled error could crash the process",
      "Errors are only written to the log of the server and never reach the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should the pool be created in an application?",
    "topic": "node-postgres (pg) & connection pooling",
    "choices": [
      "Once at startup and shared by the code, not inside each request handler",
      "Inside each request handler, so that every request is independent of the others",
      "Inside every query function, so that the connections are always fresh",
      "In the browser, so that the user connects to the database directly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the Prisma schema file?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "A SQL script that creates the tables of the database by hand",
      "A configuration file for the Node.js runtime of the server",
      "A JSON file that lists the API routes of the application",
      "A file that describes your models and database connection and drives the generated client"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the generated Prisma Client give you?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "A visual interface in which you can browse the tables of the database",
      "Typed methods to query the models that are in your schema",
      "A copy of the database that works without any server being present",
      "A set of SQL files that you have to run by hand on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define a one to many relation between User and Post in Prisma?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "A user field on User that holds an array of post ids stored as text",
      "A posts Post[] field on User and an author User with authorId on Post",
      "One single table that stores both the users and the posts in one row",
      "A Post array on both of the models, using the same name on each side"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does include do in a Prisma query?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "Adds new records to the related table automatically",
      "Includes the SQL text of the query in the result",
      "Joins the table with itself to remove duplicate rows",
      "Loads the related records together with the main ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between select and include?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "select picks exact fields, include adds relations to the default fields",
      "include picks exact fields, select adds relations to the default fields",
      "They are the same and differ only in name",
      "select works only with strings and include only with numbers"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an advantage of Prisma over writing raw SQL everywhere?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "Queries always run faster than hand written SQL",
      "It removes the need to understand the database at all",
      "Typed queries that are checked at compile time and less repeated code",
      "It works without any database server being present"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When might you still use raw SQL with Prisma?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "Never, because raw queries are not allowed at all in Prisma projects",
      "Only for the first query that runs after the server has started up",
      "For complex queries that the client cannot express well",
      "Only for tables that have no primary key defined on them at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does prisma.$queryRaw with a tagged template do with interpolated values?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "Sends them as parameters, which protects against SQL injection",
      "Pastes them into the text of the query as plain strings of characters",
      "Converts them to numbers before they are used by the database in the query",
      "Ignores them and runs the query as written without using them at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the @@unique attribute define?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "A rule that makes every field of the model unique on its own",
      "A rule that deletes duplicate rows when they appear",
      "A rule that makes the model read only",
      "A uniqueness rule across a combination of fields"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why create one Prisma Client instance and reuse it?",
    "topic": "Prisma schema, client & relations",
    "choices": [
      "The client can only run one single query for each instance that exists",
      "Each instance opens its own pool, so many instances waste connections",
      "Prisma refuses to start whenever two clients are created in one project",
      "A single client is the only way that migrations can be applied"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a migration?",
    "topic": "Migrations & seeding",
    "choices": [
      "A copy of the production data that is moved to a test server for checks",
      "A versioned change to the database structure that can be applied in order",
      "A script that deletes the old rows from every table of the database",
      "A tool that moves the whole application to another hosting platform"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command creates and applies a migration in development with Prisma?",
    "topic": "Migrations & seeding",
    "choices": [
      "prisma migrate deploy",
      "prisma db pull",
      "prisma generate",
      "prisma migrate dev"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command applies existing migrations in production?",
    "topic": "Migrations & seeding",
    "choices": [
      "prisma migrate deploy",
      "prisma migrate dev",
      "prisma migrate reset",
      "prisma db seed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why commit migration files to version control?",
    "topic": "Migrations & seeding",
    "choices": [
      "They contain the secrets that the application needs to run",
      "They are needed to run the application in the browser",
      "Everyone, including CI and production, applies the same history of changes",
      "Git cannot track a schema file without them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is seeding?",
    "topic": "Migrations & seeding",
    "choices": [
      "Creating the tables that the migrations missed",
      "Deleting the old data before each deploy to production",
      "Filling the database with initial or sample data",
      "Generating the types of the client from the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why make a seed script safe to run more than once?",
    "topic": "Migrations & seeding",
    "choices": [
      "It may run on every reset, so it should use upsert or check for existing rows",
      "It runs on every request of the application and must be fast",
      "The database refuses to run a script that has already run",
      "The database removes the duplicates by itself afterwards"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can go wrong if you edit a migration that was already applied elsewhere?",
    "topic": "Migrations & seeding",
    "choices": [
      "The file is read only, so the system refuses to save any change to it",
      "The migration runs twice on the next deploy by default, which fails",
      "Prisma deletes the file as soon as it has been edited by anyone",
      "The history no longer matches, and other databases become inconsistent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does prisma migrate reset do to a development database?",
    "topic": "Migrations & seeding",
    "choices": [
      "Reverts only the latest migration and keeps all of the rows",
      "Drops it, applies all migrations again and runs the seed script",
      "Copies production data into the development database",
      "Deletes the migrations folder and rebuilds it from the schema"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why add a default value when adding a required column to a table that has rows?",
    "topic": "Migrations & seeding",
    "choices": [
      "Columns without defaults cannot be created in PostgreSQL",
      "Existing rows need a value, or the migration fails",
      "The default makes the column faster to read in every query",
      "The default is required for the column to have an index"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which data should be part of a production seed?",
    "topic": "Migrations & seeding",
    "choices": [
      "All of the sample data that was used during development of the features",
      "Real customer records that were copied from another production database",
      "Passwords and API keys for the services that the team depends on",
      "Only reference data that the application truly needs, such as roles"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is SQL injection?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "An attack where user input changes the meaning of a query",
      "An attack that fills the disk of the database server",
      "An attack that reads the password file of the operating system",
      "An attack that sends too many connections to the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a parameterized query?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "A query that takes the name of a table as one of its parameters",
      "A query that runs several times with different values that are cached",
      "A query where values are sent separately from the SQL text, as parameters",
      "A query that is stored in the database itself as a view"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you write a parameterized query with pg?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "pool.query(\"SELECT * FROM users WHERE id = \" + id)",
      "pool.query(`SELECT * FROM users WHERE id = ${id}`)",
      "pool.query(\"SELECT * FROM users WHERE id = $1\", [id])",
      "pool.query(\"SELECT * FROM users WHERE id = ?\" + [id])"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does string concatenation of user input into SQL create a risk?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "The input can contain SQL that is executed as part of the query",
      "The result is always cached for the next user of the app",
      "The concatenated string is too long for the database to parse",
      "The database converts the input to a number and fails"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Do parameters protect the names of tables or columns?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "Yes, parameters work for table and column names too",
      "Yes, but only when the names are wrapped in quotes",
      "No, but they are protected when the user is logged in",
      "No, identifiers cannot be parameters, so they must come from a fixed list"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a safe way to let users choose a sort column?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "Insert the input directly into the ORDER BY clause",
      "Map the input to a fixed list of allowed column names",
      "Escape the input with a regular expression and insert it",
      "Let the database decide which column to use"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Do ORMs such as Prisma make injection impossible?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "Yes, because ORMs never send any SQL text to the database at all",
      "No, raw query features can still be misused with string building",
      "Yes, but only when the project is written in TypeScript and not JavaScript",
      "No, but only when the ORM runs on the client and not on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the principle of least privilege add to injection defense?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "It blocks all SQL statements that contain quotes",
      "It encrypts the values before they are sent as parameters",
      "It removes the need for any input validation",
      "A database user with few rights limits the damage of a successful injection"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which input check helps besides parameters?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "Validate type, length and format on the server before the query runs",
      "Convert all input to upper case before it is saved",
      "Remove the word SELECT from every input value",
      "Trust the checks that the browser has already made"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an error response for a failed query not include?",
    "topic": "Parameterized queries & SQL injection",
    "choices": [
      "A generic message that says the request failed",
      "An id that helps to find the error in the logs",
      "The raw database error and the query text",
      "The status code of the response"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do some operations need a transaction across several writes?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "They run faster when they are grouped together in a single block",
      "The database refuses to run two writes in a row without one",
      "They must all succeed or all fail so the data stays consistent",
      "They allow the writes to be run by several users at the same time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you run a transaction with pg?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "Get a client from the pool, run BEGIN, the statements, then COMMIT or ROLLBACK",
      "Call pool.query for each statement and hope they run in order",
      "Run the statements in parallel with Promise.all on the pool",
      "Use pool.query once with all of the statements and no BEGIN"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must all the statements of a transaction use the same client?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "The pool refuses to run more than one statement per client",
      "Each client can only run one kind of statement",
      "The database numbers statements by client and needs the order",
      "A transaction belongs to one connection, and pool.query may use different ones"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must you do in a catch block of a transaction?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "Run COMMIT so that the work done so far is not lost",
      "Run ROLLBACK, and release the client in a finally block",
      "Ignore the error and let the pool clean up by itself",
      "Close the whole pool so that the next request starts clean"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does Prisma run several writes as one unit?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "With a for loop that calls the writes one after another",
      "With prisma.$transaction, using an array of operations or an interactive callback",
      "With a migration that contains all of the writes",
      "With the include option on the first write of the group"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a risk of long running transactions?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "They make the database delete rows that are older than a day",
      "They are rolled back by PostgreSQL after five seconds",
      "They stop the pool from creating any new clients",
      "They hold locks and connections, which can block other work"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a deadlock?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "Two transactions each wait for a lock that the other holds",
      "A query that never returns because the table is empty",
      "A connection that cannot be opened because the pool is full",
      "A migration that cannot be applied because of a typo"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should an application react to a deadlock error?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "Ignore the error and return a success response",
      "Restart the database server to clear the locks",
      "Retry the transaction, and keep the order of locks consistent",
      "Disable transactions for the rest of the day"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What belongs inside a transaction when creating an order with items?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "Sending the confirmation email to the customer",
      "Calling a payment service over the network",
      "Inserting the order and its items together",
      "Rendering the page that shows the result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a savepoint allow?",
    "topic": "Transactions across multiple writes",
    "choices": [
      "Rolling back part of a transaction while keeping the earlier work",
      "Saving a copy of the whole database to a file during a transaction",
      "Committing the transaction without the need for a COMMIT statement",
      "Running two separate transactions on one connection at the same time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the repository pattern?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "A way of storing the source code of the project in a git repository",
      "A pattern that copies every table of the database into a memory cache",
      "A rule that says every query must be written inside the controller",
      "A layer that hides data access behind functions such as findUserById"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the main benefit of separating data access from route handlers?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "Handlers run faster because they contain fewer lines of code",
      "Handlers stay small, and the data layer can be tested and changed on its own",
      "The database no longer needs any indexes for its queries",
      "Routes can be served without any server being started"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should SQL or Prisma calls live in a layered Express app?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "In the route definitions next to the paths of the routes",
      "In repository or data access modules that services call",
      "In the middleware that parses the body of the request",
      "In the front end code that calls the API"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a service layer usually do?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "Parses the HTTP request and builds the HTTP response",
      "Defines the tables and columns of the database",
      "Handles the login screen of the front end",
      "Holds business rules and coordinates repositories"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does the repository pattern help with testing?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "You can replace the repository with a fake in tests of the service",
      "You can skip the tests of the service entirely",
      "It makes the real database faster in tests",
      "It removes the need to write any mocks at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a sign that data access has leaked into the wrong layer?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "A repository function returns a promise that resolves to some rows",
      "A service calls two repository functions one after the other in a row",
      "A route handler builds SQL strings and reads rows directly",
      "A controller sends a JSON response back to the client of the API"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why return plain objects, not raw driver results, from repository functions?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "Plain objects are the only kind of values that Express is able to send",
      "Raw driver results cannot be used in any kind of test of the code",
      "Callers do not depend on the driver, so it can change later",
      "Plain objects are faster for the database to produce than driver results"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can go wrong if each repository function opens its own connection?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "The pool is bypassed and the server can run out of connections",
      "The queries are no longer protected against SQL injection by the driver",
      "The tables are locked until the process of the server restarts",
      "The results are always cached for the next call that is made"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a repository function handle a missing row?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "Return an empty string so that callers never see an error",
      "Insert a new row so that the caller always gets a result",
      "Close the pool because the query found nothing",
      "Return null or throw a clear not found error that the layer above can handle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a transaction work with the repository pattern?",
    "topic": "Repository pattern & separation of concerns",
    "choices": [
      "Open a brand new transaction inside each of the repository functions",
      "Pass the transaction client into the repository functions that must share it",
      "Avoid transactions, since repositories are not able to support them",
      "Store the client in a global variable that every function reads from"
    ],
    "answerIdx": 1
  }
]
```

LAYER: pern-9

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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
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
    "topic": "JWT issuance, refresh & protected routes",
    "choices": [
      "Nothing happens, because the payload of every token is encrypted anyway",
      "Anyone can forge valid tokens, so the secret must be rotated",
      "Only the tokens that were issued a long time ago stop working for users",
      "The tokens that the server issues from then on become much longer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the HttpOnly flag on a cookie do?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Makes the cookie work only over plain HTTP and never over HTTPS",
      "Prevents JavaScript on the page from reading the cookie",
      "Stops the cookie from being sent to the server on later requests",
      "Deletes the cookie as soon as the page that set it is closed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Secure flag on a cookie do?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Encrypts the cookie value",
      "Prevents the server from reading the cookie",
      "Makes the cookie last forever",
      "Sends the cookie only over HTTPS connections"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is storing a token in localStorage risky?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Any script running on the page, such as injected code, can read it",
      "The browser deletes the stored value after one minute without any use",
      "It cannot be sent to the server in the headers of a request",
      "It is shared with every other website that the user visits"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the SameSite attribute help prevent?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Cookies from growing larger than the header limit of the server",
      "Cookies from expiring before the end of the session of the user",
      "Cross site request forgery, by limiting when cookies go out on cross site requests",
      "Users from logging in on two different devices at the same moment"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of cookie based auth compared with a header token?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "It cannot work together with a database that stores the user accounts",
      "It cannot be used to send JSON bodies to the endpoints of the API",
      "It needs protection against cross site request forgery",
      "It is readable by every website that the user visits in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which option sends cookies in a cross origin fetch call?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "credentials set to include",
      "mode set to cookies",
      "headers with a cookie field",
      "method set to COOKIE"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the cookie option maxAge control?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "The size in bytes that the cookie is allowed to reach",
      "The number of times the browser may send the cookie to a server",
      "The domain to which the cookie is attached when it is stored",
      "How long the browser keeps the cookie"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which approach protects a token best from theft by injected scripts?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "A variable inside the global window object",
      "An HttpOnly cookie set by the server",
      "A value inside the url",
      "A value in localStorage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is true about cookies and the same origin policy?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Cookies are sent only to the page that created them and never to others",
      "Cookies go to the domain that set them, whichever page makes the request",
      "Cookies are never sent with images or with other kinds of resources",
      "Cookies are shared between all of the browsers that are used on a device"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What must the server do to clear a login cookie?",
    "topic": "HTTP-only cookies vs localStorage",
    "choices": [
      "Delete the cookie file that the browser stores on the disk of the user",
      "Ask the browser to restart so that all of its cookies are dropped",
      "Change the password of the user so that the old cookie stops working",
      "Send a Set-Cookie header with the same name and an expired date"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why validate input with a schema library such as Zod?",
    "topic": "Input validation with Zod",
    "choices": [
      "It checks the shape and types of untrusted data and gives typed results",
      "It encrypts the input before it reaches the database of the application",
      "It makes the form render faster in the browser of the visitor",
      "It replaces the need to define a schema for the database at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does schema.safeParse(data) return?",
    "topic": "Input validation with Zod",
    "choices": [
      "The parsed data, or it throws an error if invalid",
      "A promise that resolves after the data is checked",
      "An object with a success flag and either data or an error",
      "A boolean that says whether the data is valid"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you define a string that must be an email in Zod?",
    "topic": "Input validation with Zod",
    "choices": [
      "z.email.string()",
      "z.text().isEmail",
      "z.string().email()",
      "z.string({ type: \"email\" })"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you derive a TypeScript type from a Zod schema?",
    "topic": "Input validation with Zod",
    "choices": [
      "type User = z.infer<typeof schema>",
      "type User = typeof schema.type",
      "type User = z.type(schema)",
      "type User = schema.toType()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why validate on the server even when the form is validated in the browser?",
    "topic": "Input validation with Zod",
    "choices": [
      "Browsers never run validation code that is written in JavaScript",
      "Server validation is faster than the validation in the browser",
      "Client checks are removed when the app is built for production",
      "Client side checks can be skipped by anyone who calls the action directly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you make a field optional in Zod?",
    "topic": "Input validation with Zod",
    "choices": [
      "Add a question mark inside the string of the field",
      "Call .optional() on the field schema",
      "Set the field to null in the schema object",
      "Wrap the schema in z.maybe()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does z.coerce.number() do with the string \"42\" from a form?",
    "topic": "Input validation with Zod",
    "choices": [
      "Rejects it, since it is a string and not a number",
      "Converts it to the number 42 before validating",
      "Keeps the string and only checks the characters",
      "Converts it to the boolean true because it is not empty"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can an action report field errors to the form?",
    "topic": "Input validation with Zod",
    "choices": [
      "Throw the Zod error so that the browser shows it in a popup window",
      "Write the errors to a log file on the server and show nothing",
      "Redirect to a separate error page that lists every one of the errors",
      "Return error.flatten().fieldErrors and show each message near its field"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does z.object({ ... }) describe?",
    "topic": "Input validation with Zod",
    "choices": [
      "The expected shape of an object, with a schema for each key",
      "A class whose instances are checked on each call",
      "A list of values that are all of the same type",
      "A function that checks the object after it is saved"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good practice for the data passed to the database after validation?",
    "topic": "Input validation with Zod",
    "choices": [
      "Use the original input so that the user data stays intact",
      "Use both and let the database decide which to keep",
      "Use the parsed result and not the original FormData",
      "Use the first field of the input only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is CORS?",
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "CORS, helmet & rate limiting",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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
    "topic": "OWASP Top 10 awareness",
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

LAYER: pern-10

```json
[
  {
    "stem": "What is Vitest?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "A browser automation tool that clicks through pages like a user",
      "A tool that deploys a Vite project to a hosting platform",
      "A fast test runner that works with the Vite toolchain and has a Jest like API",
      "A library that generates fake data for forms in tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function groups related tests in Vitest?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "describe",
      "suite only",
      "group",
      "collect"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does expect(add(2, 3)).toBe(5) check?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "The function add is called exactly five times",
      "The function add returns a promise that resolves later",
      "The function add is defined in the same file as the test",
      "The value returned by add is strictly equal to 5"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When do you use toEqual instead of toBe?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "To compare two numbers while allowing a small rounding tolerance",
      "To compare the contents of objects or arrays, not their identity",
      "To compare two functions by comparing their source text exactly",
      "To compare a value with undefined and ignore every other value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why mock a database or network call in a unit test?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "Mocks make a test cover more lines of code",
      "The test stays fast and does not depend on outside services",
      "Real services cannot be reached from a test runner",
      "Mocked calls are required by the framework"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good target of a unit test in a Next.js app?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "Complete user journeys that cross several pages",
      "The visual appearance of every page on every device",
      "The deployment settings of the hosting platform",
      "Pure functions and logic such as validation and formatting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you test a React component with Vitest?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "Use a DOM environment such as jsdom and Testing Library to render it",
      "Run the component in the Node console without any environment",
      "Open the component in a real browser by hand each time",
      "Convert the component into a string and compare it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a test that depends on the clock or random data tend to be?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "Faster than other tests, since it does less work",
      "Impossible to run in a continuous integration job",
      "Flaky, so control time and randomness with fakes",
      "More accurate, since it reflects the real world"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should tests not depend on each other?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "The test runner refuses to run tests that share any kind of variable",
      "Tests that depend on each other cannot be written with the expect function",
      "Order or failures elsewhere could change the result and hide the cause",
      "Dependent tests use more memory in the runner than independent tests do"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a coverage report show?",
    "topic": "Unit & integration tests with Vitest",
    "choices": [
      "Which lines or branches ran during the tests",
      "Which tests are the slowest in the whole suite",
      "Which dependencies are out of date in the project",
      "Which bugs were found in the last release"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Supertest let you do?",
    "topic": "API testing with Supertest",
    "choices": [
      "Load the page of the app in a headless browser and read the rendered text of each element",
      "Generate API documentation from the routes of the app and publish it online",
      "Monitor the live traffic of a production server and report slow endpoints",
      "Send HTTP requests to an Express app in tests without opening a real port yourself"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why export the Express app separately from app.listen?",
    "topic": "API testing with Supertest",
    "choices": [
      "Express refuses to run when listen is in the same file as the route definitions",
      "Tests can import the app without starting a server that keeps running",
      "It makes the app start faster in production because the routes load later",
      "Tests need a different port number from the one that production uses"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Supertest chain checks a GET request returns status 200?",
    "topic": "API testing with Supertest",
    "choices": [
      "request(app).fetch(\"/users\").status(200)",
      "request(app).get(\"/users\").expect(200)",
      "request.get(app, \"/users\").is(200)",
      "request(app).send(\"/users\").check(200)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which database setup keeps API tests isolated from real data?",
    "topic": "API testing with Supertest",
    "choices": [
      "The production database with a prefix added to every collection name",
      "A shared development database that all developers use at once",
      "No database at all, because routes never need data in tests",
      "A separate test database or an in memory one that is reset between tests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you send a JSON body with Supertest?",
    "topic": "API testing with Supertest",
    "choices": [
      "Call .send with an object after .post",
      "Set the body in the url as a query string",
      "Call .json with a string",
      "Use .attach with a file name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an API test verify besides the status code?",
    "topic": "API testing with Supertest",
    "choices": [
      "Only the size of the response in bytes",
      "Only the time it took to respond",
      "The shape and content of the response body",
      "The version of Node that ran the test"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you test a protected route with Supertest?",
    "topic": "API testing with Supertest",
    "choices": [
      "Disable the auth middleware in the app for the whole test run",
      "Hard code the password of an admin user into every test file",
      "Send a valid token in the Authorization header and also test a request without one",
      "Call the controller directly and skip the middleware completely"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of testing a route and not only its controller function?",
    "topic": "API testing with Supertest",
    "choices": [
      "It checks routing, middleware and status codes together, as a client would see them",
      "It is the only way to test pure functions that return a string or a number",
      "It removes the need for any unit tests of the services below the controller",
      "It makes the response of the route faster because the code is run twice"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a test do after it creates records in the database?",
    "topic": "API testing with Supertest",
    "choices": [
      "Leave them in place so that the next test can reuse the same records",
      "Copy them into the production database for backup purposes",
      "Rename them with a timestamp so that they are unique in the collection",
      "Clean them up or reset the database so later tests start from a known state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why test error cases such as invalid input and missing resources?",
    "topic": "API testing with Supertest",
    "choices": [
      "Because error cases are the only cases that can break a database connection",
      "Because clients depend on correct 400 and 404 responses as much as on success ones",
      "Because the framework skips error handling code unless a test calls it first",
      "Because success responses are checked automatically by the Express package"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Docker image?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "A running instance of an application with its own network and storage",
      "A read only template with the app and its dependencies, from which containers start",
      "A virtual machine with a full guest operating system installed inside it",
      "A backup of the database that is stored in a compressed archive file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Docker container?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "A file that lists the packages that the application depends on to run",
      "A registry where images are stored and shared between the teams",
      "A tool that compiles JavaScript into machine code for the host",
      "A running instance of an image, isolated from other processes on the host"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a Dockerfile contain?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "Instructions for building an image: the base image, files to copy and the start command",
      "The passwords and keys that the application uses while it is running",
      "A list of containers that should be started on the server at boot",
      "The source code of the application, written in a special language"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a Dockerfile usually copy package.json and install dependencies before copying the rest of the code?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "The installer cannot read package.json once the source code has been copied",
      "Node requires the dependencies to exist before any other file is added",
      "Docker caches each layer, so dependencies are not reinstalled when only code changes",
      "Docker deletes the code if it is copied before the packages are installed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the EXPOSE instruction in a Dockerfile do?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "Opens the port to the internet on the host machine permanently",
      "Publishes the image to a public registry for other developers",
      "Documents the port the app listens on inside the container",
      "Encrypts the traffic that the container sends out"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you make a port of a container reachable from the host?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "Publish it with the -p option, such as -p 3000:3000",
      "Add the port to the package.json file of the project",
      "Write the port into the Dockerfile as a comment line",
      "Restart the host machine after the image has been built"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use a .dockerignore file?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "Hide the Dockerfile from other users who are able to reach the repository",
      "Make the container start faster by skipping its start command entirely",
      "Tell the host which old images should be removed after one week",
      "Keep files such as node_modules and .env out of the build context and the image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of a smaller base image such as an alpine variant?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "Faster execution of every JavaScript function in the program",
      "A smaller download and a smaller attack surface for the deployed app",
      "Automatic encryption of every file that is stored in the container",
      "No need to install any dependencies of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to data written inside a container when it is removed?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "It is saved automatically in the image for later containers",
      "It is lost unless it was stored in a volume",
      "It is copied to the repository of the application",
      "It is moved to the database of the host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about containers and virtual machines is correct?",
    "topic": "Dockerizing Node + PostgreSQL with Compose",
    "choices": [
      "Containers include a full operating system kernel of their own inside the image",
      "Virtual machines share one kernel with the host and containers do not",
      "Containers can only run on the same hardware as virtual machines do",
      "Containers share the host kernel, so they are lighter than virtual machines"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a GitHub Actions workflow?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "An automated process defined in YAML that runs jobs on events such as a push",
      "A branch that is created automatically for every release of the application",
      "A tool that reviews the code of every pull request without any human help",
      "A service that hosts the application after it has been built successfully"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the usual order of steps in a CI job for a Node project?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "Build the app, deploy it, and run the tests in production at the end",
      "Install the dependencies after the tests have been run on the code",
      "Check out the code, install dependencies, run lint and tests, then build",
      "Run the tests on the code before it is checked out of the repository"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which step action fetches the repository code in a workflow?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "actions/download",
      "actions/clone-repo",
      "actions/checkout",
      "actions/fetch-source"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should secrets used in a workflow, such as a deploy token, be stored?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "In the encrypted secrets settings of the repository",
      "Directly in the YAML file so that every job can read them",
      "In the commit message of the last change that was pushed",
      "In a public issue so the team can find them quickly"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a matrix strategy allow?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "Running several different jobs one after another in a fixed order",
      "Splitting one test file across the cores of a single machine at once",
      "Deploying one build to several servers at the same moment of time",
      "Running the same job for several versions, such as different Node versions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why cache dependencies in a CI workflow?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "Make the tests give different results on each run of the workflow",
      "Reduce the time each run needs by reusing downloaded packages",
      "Avoid having to commit the node_modules folder to the repository",
      "Allow the workflow to run without a network connection at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a pipeline do before it deploys?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "Wait for a developer to start the deployment from a local machine",
      "Make sure tests and checks passed on the same commit",
      "Delete the previous deployment to free up space on the host",
      "Skip the tests so that the deployment is finished faster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is continuous deployment compared with continuous delivery?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "Every change waits for a manual approval, while delivery releases it automatically",
      "They mean the same thing, and only the names are different from each other",
      "Deployment applies only to databases, and delivery applies only to code",
      "Every passing change is released automatically, while delivery keeps a manual approval"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which event runs a workflow when code is pushed to the main branch?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "on push with the branch list set to main",
      "on main_change with the push option",
      "on commit with the deploy option",
      "on release_branch with the main option"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should workflow permissions follow least privilege?",
    "topic": "GitHub Actions CI pipeline",
    "choices": [
      "Narrow permissions make every workflow run faster on GitHub",
      "The workflow cannot start unless all permissions are removed first",
      "A compromised step or dependency can then do less damage with the token",
      "Permissions only affect the name that is shown in the log"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a build step produce for a React app deployed to a static host?",
    "topic": "Deploying React to Vercel & API to Railway/Render",
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
    "topic": "Deploying React to Vercel & API to Railway/Render",
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
    "topic": "Deploying React to Vercel & API to Railway/Render",
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
    "topic": "Deploying React to Vercel & API to Railway/Render",
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
    "topic": "Deploying React to Vercel & API to Railway/Render",
    "choices": [
      "Every variable is exposed at runtime and can be changed after the build finishes",
      "Variables exposed to the browser need the VITE_ prefix and are set at build time",
      "Variables must be written in lower case and added to the index.html file",
      "Variables are read from the server on each request by the browser bundle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main difference between hosting a static site and a Node API?",
    "topic": "Deploying React to Vercel & API to Railway/Render",
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
    "topic": "Deploying React to Vercel & API to Railway/Render",
    "choices": [
      "npm start, as defined in the scripts of package.json",
      "npm build, which launches the server after compiling",
      "node index.html, which runs the page in the runtime",
      "npm deploy, which every platform provides by default"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must the server read the port from process.env.PORT on platforms like Render or Railway?",
    "topic": "Deploying React to Vercel & API to Railway/Render",
    "choices": [
      "The platform blocks every port except the one named 3000 in the code",
      "The port is needed only for logging and has no effect on the routing",
      "The platform assigns the port at runtime and routes traffic to it",
      "Express chooses a random port unless the variable has been defined"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a health check endpoint?",
    "topic": "Deploying React to Vercel & API to Railway/Render",
    "choices": [
      "A route that returns the full list of users so that the platform can store a copy",
      "A route that restarts the server every few minutes to free up its memory",
      "A light route, such as /health, that the platform calls to see if the service is alive",
      "A route that writes the administrator password to the logs for easy debugging"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to files written to the local disk of many cloud hosts when the service restarts?",
    "topic": "Deploying React to Vercel & API to Railway/Render",
    "choices": [
      "They are often lost, so uploads should go to external storage",
      "They are kept forever and shared by every new instance of the service",
      "They are encrypted and moved to the database of the platform",
      "They are copied back to the repository by the platform automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should production use a different database from development?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "Development databases cannot be reached from production",
      "Production databases are always smaller and cheaper",
      "The framework needs two different databases to build",
      "Tests and mistakes cannot damage real user data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you use to apply schema changes in production with Prisma?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "prisma migrate dev on the live database",
      "prisma migrate deploy, run as part of the release",
      "prisma db push with the production url on a laptop",
      "Editing the tables by hand in the database console"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use connection pooling with serverless functions?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "Pooling makes the queries return larger results than a direct connection does",
      "Many short lived instances could otherwise open too many connections",
      "Pooling stores the results of the queries in the browser of each visitor",
      "Serverless functions are not able to connect to a database without a pool"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good practice before a risky migration in production?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "Run it on the live database and watch for errors",
      "Run it only at the busiest time of the day",
      "Skip the backup because migrations never lose data",
      "Take a backup and test the migration on a copy of the data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do you get the connection string for a managed database?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "From the dashboard of the provider, kept as an environment variable",
      "From the public documentation that the vendor of the database publishes",
      "From the source code of another project that you built earlier",
      "From the url of the deployed site, in the query string of the home page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should the production database not be open to the whole internet?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "Open databases cannot accept connections from servers",
      "Public databases are slower than private ones",
      "Restricting access reduces the risk of attacks and leaks",
      "The host blocks all databases that are open"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a managed database provider handle for you?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "The design of your schema and the queries of your app",
      "The validation of the data that users type into forms",
      "Backups, updates, availability and scaling of the database",
      "The caching rules of your Next.js pages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should seed data be treated in production?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "Only the data that is truly needed, and never overwrite real data",
      "Run the full development seed script again on every single deploy",
      "Delete the existing rows first, so that the seed starts from a clean table",
      "Seed the data from the browser of an administrator who is signed in"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can happen if a migration runs twice in parallel from two deploys?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "The database merges both runs together without causing any problem at all",
      "The second run is skipped by the browser of the person who deployed",
      "The tables are duplicated and given a numeric suffix to tell them apart",
      "Conflicts or errors, so migrations should run in one controlled step"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why monitor the database after a release?",
    "topic": "Managed Postgres & connection strings in prod",
    "choices": [
      "The database stops by itself after each release",
      "Slow queries and errors may only show up with real traffic",
      "Monitoring changes the schema to match the traffic",
      "It is required for the app to build on the host"
    ],
    "answerIdx": 1
  }
]
```

