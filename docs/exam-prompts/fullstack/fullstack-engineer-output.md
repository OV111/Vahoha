LAYER: fullstack-engineer-1

```json
[
  {
    "stem": "Which element should wrap the primary navigation links of a page?",
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "Semantic HTML structure",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
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
    "topic": "CSS layout with flexbox and grid",
    "choices": [
      "When you only need to center a single element on the screen",
      "When you need to lay out items in rows and columns at the same time",
      "When the items must wrap automatically inside a narrow sidebar",
      "When the page needs to stay the same size at every viewport width"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which keyword declares a variable that can be reassigned but is limited to its block?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "var",
      "let",
      "const",
      "static"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when you try to reassign a variable declared with const?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "The new value is silently ignored",
      "The variable becomes undefined",
      "The program stops reading that file",
      "A TypeError is thrown at runtime"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does typeof null return in JavaScript?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "The string object",
      "The string null",
      "The string undefined",
      "The string number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which expression evaluates to true?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "The strict comparison 0 === false, since both values are falsy in JavaScript",
      "The strict comparison null === undefined, since both mean the absence of a value",
      "The loose comparison 0 == false and the strict comparison 0 === 0",
      "The strict comparison NaN === NaN, since a value is always equal to itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the result of 0.1 + 0.2 in JavaScript?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "Exactly 0.3 because JavaScript numbers use exact decimal arithmetic internally",
      "NaN because the two operands are not whole integers that can be added",
      "A value slightly above 0.3 because of binary floating point rounding",
      "Exactly 0.30000 because JavaScript numbers keep only five digits after the point"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is a falsy value in JavaScript?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "An empty string",
      "The string false",
      "An empty array",
      "The string 0"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a function declaration and a function expression?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "Expressions are hoisted with their body, while declarations are not hoisted at all",
      "Declarations cannot take any parameters, while function expressions are allowed to",
      "Expressions always create a new global scope, while declarations share the local one",
      "Declarations are hoisted with their body, while expressions exist only after they run"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a function return when it has no return statement?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "null",
      "undefined",
      "An empty string",
      "The last evaluated expression"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the arrow function (a, b) => a + b return when called with 2 and 3?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "The string 23",
      "5",
      "undefined",
      "A new function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which statement about var is correct?",
    "topic": "JavaScript variables and functions",
    "choices": [
      "It is block scoped and cannot be declared twice inside the same block",
      "It exists only in the global scope of the page and not inside functions",
      "It is not hoisted, so reading it before the declaration throws a ReferenceError",
      "It is function scoped and its declaration is hoisted to the top of the function"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method returns the first element that matches a CSS selector?",
    "topic": "DOM manipulation and events",
    "choices": [
      "document.querySelector",
      "document.getElementsByTag",
      "document.findFirst",
      "document.selectOne"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between textContent and innerHTML when setting a value?",
    "topic": "DOM manipulation and events",
    "choices": [
      "textContent parses the string as markup, innerHTML inserts it as plain text",
      "They are identical except that innerHTML is slower on old browsers",
      "innerHTML parses the string as markup, textContent inserts it as plain text",
      "textContent can only read values and cannot be used to set them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is setting innerHTML with untrusted user input dangerous?",
    "topic": "DOM manipulation and events",
    "choices": [
      "It permanently deletes the stylesheet that belongs to the element",
      "It prevents the browser from rendering the rest of the page",
      "It can run attacker supplied markup or scripts and lead to cross site scripting",
      "It causes the element to lose all of its event listeners and attributes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does addEventListener do?",
    "topic": "DOM manipulation and events",
    "choices": [
      "Registers a function to run each time the event happens on the element",
      "Creates a new DOM element that dispatches the named event when it is clicked",
      "Removes every other handler that was already attached to that same element",
      "Runs the given function a single time once the whole page finishes loading"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does event.preventDefault() do in a form submit handler?",
    "topic": "DOM manipulation and events",
    "choices": [
      "Stops the event from reaching any parent element further up in the DOM tree",
      "Removes the handler from the element so that it can never run again after that",
      "Cancels all of the network requests that the page has already started sending",
      "Stops the default browser action, such as reloading the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is event bubbling?",
    "topic": "DOM manipulation and events",
    "choices": [
      "The event is sent to every element on the page at the same moment",
      "The event travels from the target element up through its ancestors",
      "The event travels from the document root down to the target element",
      "The event repeats until a handler returns a value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is event delegation?",
    "topic": "DOM manipulation and events",
    "choices": [
      "Attaching a separate listener to every child so that events never reach the parent",
      "Attaching one listener to a parent and reading event.target for the child",
      "Moving every handler into one global function that the browser then calls itself",
      "Replacing events with callbacks that are run after the parent has finished loading"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method adds a new element to the page after it has been created with document.createElement?",
    "topic": "DOM manipulation and events",
    "choices": [
      "parent.write(element)",
      "document.insert(element)",
      "parent.render(element)",
      "parent.appendChild(element)"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does event.stopPropagation() do?",
    "topic": "DOM manipulation and events",
    "choices": [
      "Stops the event from continuing to bubble up to ancestor handlers",
      "Stops the browser from performing the default action for the event",
      "Stops all other listeners on the same element from running",
      "Removes the event listener after it has run once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you add or remove a CSS class on an element using JavaScript?",
    "topic": "DOM manipulation and events",
    "choices": [
      "Using element.style.class with a string of class names",
      "Using element.setClass and element.unsetClass",
      "Using element.classList.add and element.classList.remove",
      "Using document.styles.update with the selector string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does fetch return when the server responds with status 404?",
    "topic": "Fetch and the network tab",
    "choices": [
      "A promise that rejects with a network error object",
      "A promise that stays pending until the request is retried",
      "A promise that resolves with a response whose ok property is false",
      "The parsed JSON body of the not found page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does the promise returned by fetch reject?",
    "topic": "Fetch and the network tab",
    "choices": [
      "When a network failure prevents the request from completing",
      "When the server returns any status code of 400 or above",
      "When the response body is not valid JSON",
      "When the response takes longer than one second"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a JSON body from a fetch response?",
    "topic": "Fetch and the network tab",
    "choices": [
      "Read response.body as a plain object directly",
      "Call JSON.parse on the response object itself",
      "Read response.data after awaiting the fetch call",
      "Call response.json(), which returns a promise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which option sends a JSON body in a POST request with fetch?",
    "topic": "Fetch and the network tab",
    "choices": [
      "method POST and a body that is set to the raw JavaScript object directly",
      "method POST, a Content-Type of application/json and body JSON.stringify(data)",
      "method SEND with the data placed in the query string of the request url",
      "a data property on the options object that holds the object to be sent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does response.ok indicate?",
    "topic": "Fetch and the network tab",
    "choices": [
      "The server sent a body that is not empty",
      "The status code is in the range 200 to 299",
      "The request was made over a secure connection",
      "The response was served from the browser cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is the correct pattern for handling HTTP errors with fetch?",
    "topic": "Fetch and the network tab",
    "choices": [
      "Wrap fetch in try and catch alone and rely on the catch for every status code",
      "Check that response.status equals 200 only",
      "Read response.error after awaiting the call",
      "Check response.ok and throw an error when it is false"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you cancel an in flight fetch request?",
    "topic": "Fetch and the network tab",
    "choices": [
      "Pass an AbortController signal in the options and call abort()",
      "Call response.close() on the pending response before awaiting its body",
      "Set the timeout property to zero inside the options of the request call",
      "Delete the promise object that fetch returned so that the request stops"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can a browser fetch to another origin fail even if the server responds?",
    "topic": "Fetch and the network tab",
    "choices": [
      "The browser blocks every request that uses HTTPS from a different domain",
      "The fetch function only supports requests to the same origin",
      "The server response lacks the CORS headers that allow that origin",
      "The response is too large to be stored in the cache"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you send query parameters safely with fetch?",
    "topic": "Fetch and the network tab",
    "choices": [
      "Join the values with plus signs and no encoding",
      "Put the values in the request body for a GET request",
      "Build the url with URLSearchParams so values are encoded",
      "Set them as custom headers on the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the credentials include option do on a cross origin fetch?",
    "topic": "Fetch and the network tab",
    "choices": [
      "Sends cookies with the request and accepts cookies in the response",
      "Adds the user name and password to the url of the request automatically",
      "Stores the response in the password manager that is built into the browser",
      "Allows the server to read the local storage that belongs to the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the viewport meta tag with width set to device-width do on mobile?",
    "topic": "Responsive design basics",
    "choices": [
      "It disables zooming on the page so that text can never be enlarged by the user",
      "It forces the page to render at exactly 320 pixels wide on every phone model",
      "It tells the server to send smaller image files to narrow screens by default",
      "It makes the layout width match the screen instead of a zoomed out desktop width"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which approach describes mobile-first CSS?",
    "topic": "Responsive design basics",
    "choices": [
      "Write desktop styles first and hide extra content on phones with display none",
      "Write base styles for small screens and add min-width media queries for larger ones",
      "Write separate stylesheets for each device and load them by user agent",
      "Use fixed pixel widths for phones and percentages only for desktops"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which media query applies styles when the viewport is at least 768 pixels wide?",
    "topic": "Responsive design basics",
    "choices": [
      "The query (max-width: 768px)",
      "The query (min-width: 768px)",
      "The query (width: min 768px)",
      "The query (device: tablet)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which unit is relative to the root element font size?",
    "topic": "Responsive design basics",
    "choices": [
      "em",
      "vh",
      "ch",
      "rem"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does 1vh equal?",
    "topic": "Responsive design basics",
    "choices": [
      "One percent of the viewport height",
      "One percent of the parent element height",
      "One tenth of the viewport height",
      "One pixel of the device screen height"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which technique makes an image shrink to fit a narrow container without overflowing?",
    "topic": "Responsive design basics",
    "choices": [
      "Setting width to a fixed pixel value larger than the container",
      "Setting overflow to hidden on the img element itself",
      "Setting max-width to 100 percent and height to auto",
      "Setting display to inline on the surrounding container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of using the picture element with srcset and sizes?",
    "topic": "Responsive design basics",
    "choices": [
      "The browser downloads every listed image so the best one can be shown instantly",
      "The image is converted to a vector format on small screens",
      "The browser can choose an image file that fits the screen and its pixel density",
      "The image is cached on the server after the first visitor requests it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which CSS function picks a value between a minimum and a maximum, based on a preferred size?",
    "topic": "Responsive design basics",
    "choices": [
      "clamp()",
      "calc()",
      "min-fit()",
      "var()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it better to base media query breakpoints on content than on specific devices?",
    "topic": "Responsive design basics",
    "choices": [
      "Content based breakpoints are required by the CSS specification",
      "Device based breakpoints are slower for browsers to evaluate",
      "Content based breakpoints let one stylesheet serve every future device without testing",
      "Device sizes change constantly, while content breaks when it stops fitting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the prefers-color-scheme media feature detect?",
    "topic": "Responsive design basics",
    "choices": [
      "Which color depth the monitor supports when it draws gradients on the page",
      "Whether the user asked the system for a light or a dark appearance",
      "Whether the page currently has a dark background image set by its stylesheet",
      "The brightness level of the device screen as reported by the operating system"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-2

```json
[
  {
    "stem": "What is a React functional component?",
    "topic": "Components, props, and state",
    "choices": [
      "A class that extends React.Component and defines render",
      "A function that runs only once when the page loads",
      "A function that receives props and returns JSX",
      "A JavaScript object with a template property"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must a component name start with?",
    "topic": "Components, props, and state",
    "choices": [
      "An uppercase letter",
      "A lowercase letter",
      "An underscore",
      "The word Component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a parent pass data to a child component?",
    "topic": "Components, props, and state",
    "choices": [
      "Through a global variable that both components import",
      "Through a callback that the child returns to the parent",
      "Through the DOM by setting data attributes",
      "Through props set as attributes on the child element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a child component change the props it receives?",
    "topic": "Components, props, and state",
    "choices": [
      "Yes, by assigning to props.value inside the component",
      "No, props are read only and the parent must supply new values",
      "Yes, but only when the prop is a string",
      "Only when the child uses the useState hook on the prop"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the children prop?",
    "topic": "Components, props, and state",
    "choices": [
      "An array of all the child components that the parent has ever rendered",
      "The content placed between a component opening and closing tags",
      "A list of the components rendered in the previous frame",
      "A reserved prop that contains the parent component name"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does destructuring props in the function signature, as in function Card({ title }), achieve?",
    "topic": "Components, props, and state",
    "choices": [
      "It makes the title prop required at runtime",
      "It copies the whole props object into component state",
      "It converts the prop to a string before using it",
      "It reads title directly from props without writing props.title"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you give a prop a default value for a functional component?",
    "topic": "Components, props, and state",
    "choices": [
      "Use a default parameter in the destructuring, such as { size = \"md\" }",
      "Declare a variable named defaultProps inside the render",
      "Set the value in the parent every time the component is used",
      "Call useDefault with the prop name inside the component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when a component re-renders because its parent re-rendered?",
    "topic": "Components, props, and state",
    "choices": [
      "The old output is kept and only the new props are saved for later use",
      "The browser reloads the whole page so that the update becomes visible",
      "The function runs again with the latest props and returns new JSX",
      "The component is removed from the tree and then mounted again from scratch"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about a component rendering is correct?",
    "topic": "Components, props, and state",
    "choices": [
      "Rendering should update the DOM directly with document.querySelector",
      "Rendering should fetch data and write it to local storage",
      "Rendering should be pure and give the same output for the same props and state",
      "Rendering should run each time the user moves the mouse"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does React require a stable function identity for components defined at the top level?",
    "topic": "Components, props, and state",
    "choices": [
      "A component defined inside another one gets a new type each render and loses state",
      "Components that are defined inside others cannot receive props from the parent",
      "Nested components cannot return JSX because they have no render method of their own",
      "React does not allow more than one function to be declared in the same file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the call const [count, setCount] = useState(0) give you?",
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
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
    "topic": "Hooks and the effect lifecycle",
    "choices": [
      "The function runs on every render and the result is cached",
      "The function runs only on the first render instead of on every render",
      "The function runs after the first effect completes",
      "The state is initialised to the function itself"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which component defines the router for a browser app in React Router v6?",
    "topic": "Client-side routing",
    "choices": [
      "HashLink",
      "BrowserRouter",
      "RouterSwitch",
      "RouteProvider"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What replaced the Switch component in v6?",
    "topic": "Client-side routing",
    "choices": [
      "Router",
      "Path",
      "Outlet",
      "Routes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a url parameter such as /users/:id in a component?",
    "topic": "Client-side routing",
    "choices": [
      "Call useParams and read the id property",
      "Read props.params.id",
      "Read window.location.id",
      "Call useLocation and parse the string"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Outlet component do?",
    "topic": "Client-side routing",
    "choices": [
      "Opens the page of the matched child route in a new browser tab",
      "Exports the matched route so that another application can import it",
      "Renders the matched child route inside the parent layout",
      "Redirects the visitor to the home page when no route has matched"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which component renders a link that does not reload the page?",
    "topic": "Client-side routing",
    "choices": [
      "a",
      "Anchor",
      "Link",
      "Navigate"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of the NavLink component?",
    "topic": "Client-side routing",
    "choices": [
      "A link that knows if it matches the current url, so you can style it",
      "A link that opens its target in a new window each time it is clicked",
      "A link that fetches the data of the next page before it navigates there",
      "A link that is hidden on mobile devices and shown on desktop screens only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you navigate from code, for example after a form submit?",
    "topic": "Client-side routing",
    "choices": [
      "Assign a new value to window.location.hash",
      "Call history.push from the component props",
      "Return a Link from the handler",
      "Call the function returned by useNavigate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you define a nested route?",
    "topic": "Client-side routing",
    "choices": [
      "Write a longer path string and let the router split it into nested parts",
      "Put a Route inside another Route and render an Outlet in the parent element",
      "Wrap the child in a second BrowserRouter that is placed inside the first",
      "Use two Routes components at the root of the application, one for each level"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a route with path set to the asterisk usually show?",
    "topic": "Client-side routing",
    "choices": [
      "The home page for every url",
      "A not found page for any unmatched url",
      "A redirect to the login page",
      "The first nested route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read query string values such as ?page=2?",
    "topic": "Client-side routing",
    "choices": [
      "useParams",
      "useNavigate",
      "useRoutes",
      "useSearchParams"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does composition mean in React?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "Building complex UIs by combining smaller components, often through children",
      "Writing every component as a class that extends another class in the project",
      "Merging all of the components into one very large file for easier reading",
      "Sharing state between unrelated components through global variables on window"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is lifting state up?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "Moving state into a global variable available everywhere",
      "Moving state into the child component that uses it most",
      "Moving state to the nearest common parent so siblings can share it",
      "Moving state into local storage so components can read it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which pattern lets a parent customise what a child renders without the child knowing the content?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "Using inheritance from the parent component",
      "Reading the parent props with document.querySelector",
      "Passing JSX as children or as a render prop",
      "Calling the parent function from the child constructor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do most React teams prefer composition over inheritance?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "Composition gives flexible reuse without tight coupling between components",
      "Inheritance is not supported by the JavaScript language in any form",
      "Composition makes the components run only on the server before the page loads",
      "Inheritance forces every component to be class based, which makes it slow"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a child tell its parent that something happened?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "By changing the state of the parent component directly from inside the child",
      "By dispatching a DOM event that React then hides from the other components",
      "By returning the new value from its render function to the parent",
      "By calling a function that the parent passed down as a prop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a presentational component?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "A component that fetches data from the server and keeps the application state",
      "A component that focuses on how things look and receives data through props",
      "A component that can only be used on the first page of the application",
      "A component that has no props at all and always renders the same markup"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is prop drilling?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "Reading props from deep inside the DOM tree with a query selector call",
      "Passing props through several intermediate components that do not use them",
      "Replacing props with state inside each one of the child components",
      "Looping over the props object with a for loop in every component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of a fragment, written as <>...</>?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "It speeds up rendering by skipping the virtual DOM",
      "It adds a hidden wrapper that is used for styling",
      "It lets a component return several components with the same key",
      "It groups siblings without adding an extra element to the DOM"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is a sign that a component should be split into smaller ones?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "It does several unrelated jobs and is hard to read or to reuse",
      "It receives more than one prop from the parent component that renders it",
      "It contains a single hook call at the top of its function body",
      "It returns JSX that spans more than one line of the source file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean that React data flows one way?",
    "topic": "Lifting state and prop drilling",
    "choices": [
      "Data goes from children to parents through props, and parents answer with events",
      "Data is shared between all components through the DOM instead of through props",
      "Data goes down through props, and children send events up through callbacks",
      "Data can only be changed one single time during each render of a component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you usually start a request that loads data for a component?",
    "topic": "Fetching data in components",
    "choices": [
      "Inside the body of the component, which runs the request on every render",
      "Inside the JSX markup, next to the element that shows the data",
      "Inside an effect that runs after the first render, or in a data library hook",
      "Inside the import statements at the top of the component file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a fetch call placed directly in the body of a component cause problems?",
    "topic": "Fetching data in components",
    "choices": [
      "It runs on every render, which can create an endless loop of requests and state updates",
      "It blocks the browser until the response has arrived from the server",
      "It is not allowed by React because components must not use the network",
      "It makes the component run only on the server of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an effect that fetches data do when the component unmounts or the input changes?",
    "topic": "Fetching data in components",
    "choices": [
      "Keep the old request running so that the data is cached for later",
      "Send the request again to be sure the result is correct",
      "Delete the component state so that the next render starts empty",
      "Cancel or ignore the old request, for example with AbortController or a flag"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which three states should a component handle when it loads data?",
    "topic": "Fetching data in components",
    "choices": [
      "Start, middle and end of the request",
      "Loading, success with data, and error",
      "Open, closed and pending connections",
      "Client, server and network"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a data fetching library such as TanStack Query add compared with a plain effect?",
    "topic": "Fetching data in components",
    "choices": [
      "A faster network connection between the browser and the server",
      "Caching, deduplication, retries and background refetching out of the box",
      "A way to run the request on the server instead of the browser",
      "A replacement for the state of the component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why store fetched data in state and not in a plain variable?",
    "topic": "Fetching data in components",
    "choices": [
      "State is stored on the server so that all users share the same data",
      "A variable cannot hold objects that come from a network call",
      "State makes the request run faster than a variable does",
      "A plain variable is reset on every render and does not trigger a re-render when it changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens if you ignore the error state of a request?",
    "topic": "Fetching data in components",
    "choices": [
      "The user may see a blank or stuck screen without any explanation",
      "The request is repeated until it works without any code",
      "The browser shows its own error page for the request",
      "The server fixes the error before the next request is sent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you avoid a request waterfall in a component tree?",
    "topic": "Fetching data in components",
    "choices": [
      "Wait for each child to finish before the next one starts to fetch",
      "Use a longer timeout on every request in the tree",
      "Start independent requests at the same time, or fetch higher up and pass the data down",
      "Move all of the fetching to the end of the page lifecycle"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the dependency array of an effect that fetches by id contain?",
    "topic": "Fetching data in components",
    "choices": [
      "Nothing, so that the effect runs on every render",
      "The response of the request, so it can refresh itself",
      "The id, so the effect runs again when the id changes",
      "The name of the component that fetches the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to show a spinner while data loads?",
    "topic": "Fetching data in components",
    "choices": [
      "Keep a loading flag in state, set it before the request and clear it afterwards",
      "Show the spinner for a fixed number of seconds on every page",
      "Hide the whole component until the request has finished",
      "Reload the page until the data is in the cache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a controlled input in React?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "An input that React is not allowed to update after the first render",
      "An input that stores its value inside the DOM and never in the component",
      "An input that stays disabled until the user submits the form for the first time",
      "An input whose value comes from state and changes through onChange"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which attribute pair makes a text input controlled?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "defaultValue and onBlur",
      "value and onChange",
      "ref and onFocus",
      "name and onSubmit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the new value in an onChange handler of an input?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "event.value",
      "event.target.value",
      "event.currentValue",
      "event.input.text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does event.preventDefault() do inside onSubmit of a form?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "Stops the form values from being saved in state",
      "Prevents the onChange event from firing later",
      "Resets every input to its original value",
      "Stops the browser from reloading the page on submit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you handle several inputs with one state object?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "Use the input name attribute to update the matching key in the object",
      "Create a separate setter call for each keystroke in every one of the inputs",
      "Store every input value in a global variable that all components can read",
      "Use a different component for each input and keep their values apart"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an uncontrolled input?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "An input that the user can edit only once before it becomes read only",
      "An input that has no name attribute and so cannot be submitted at all",
      "An input whose value lives in the DOM and is read through a ref",
      "An input that is updated through component state on every single keystroke"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a controlled checkbox get its checked state?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "Through the value prop, which is set to true or to false for each render",
      "Through the defaultChecked prop only, which React keeps in sync with state",
      "Through the checked prop with an onChange handler reading event.target.checked",
      "Through a ref that is read and updated only when the form is submitted"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set the selected option of a select element in React?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "Pass a value prop to the select element",
      "Add a selected attribute to the option element",
      "Use the selectedIndex prop on the select element",
      "Set the option text equal to the state variable"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem happens when an input has a value prop but no onChange handler?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "The input accepts typing but resets after a second",
      "React sets the value to an empty string on each render",
      "The form cannot be submitted",
      "The input becomes read only and React warns about it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why would you store form errors in state?",
    "topic": "Forms and controlled inputs",
    "choices": [
      "So the browser can send them to the server automatically",
      "So the component re-renders to show them next to the fields",
      "So they stay after the page is closed",
      "So that React validates the inputs for you"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-3

```json
[
  {
    "stem": "What is Node.js?",
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Node runtime and modules",
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
    "topic": "Express routing and middleware",
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
    "topic": "Express routing and middleware",
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
    "topic": "Express routing and middleware",
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
    "topic": "Express routing and middleware",
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
    "topic": "Express routing and middleware",
    "choices": [
      "res.json(data)",
      "res.write(data)",
      "res.render(data)",
      "res.json.send(data)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is middleware in Express?",
    "topic": "Express routing and middleware",
    "choices": [
      "A database table that stores the details of every request for later checks",
      "A route that runs only for POST requests and parses their JSON bodies",
      "A function that gets req, res and next and runs in the request pipeline",
      "A template that is used to render the HTML pages sent back to clients"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must a middleware do if it does not end the response?",
    "topic": "Express routing and middleware",
    "choices": [
      "Return a value from the function",
      "Call app.listen again",
      "Call next() to pass control to the next handler",
      "Send an empty response automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which middleware parses JSON request bodies in Express?",
    "topic": "Express routing and middleware",
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
    "topic": "Express routing and middleware",
    "choices": [
      "It is registered with app.error",
      "It has the name errorHandler",
      "It returns a status code number",
      "It takes four arguments, with err first"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should the error handling middleware be placed?",
    "topic": "Express routing and middleware",
    "choices": [
      "Before every other middleware",
      "After all routes and other middleware",
      "Inside each route handler",
      "In a separate server process"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which middleware parses a JSON request body in Express?",
    "topic": "Request and response handling",
    "choices": [
      "express.body()",
      "express.json()",
      "express.parse()",
      "bodyReader()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is req.body undefined without a body parser?",
    "topic": "Request and response handling",
    "choices": [
      "The body is stored in req.data until the end of the request",
      "Express deletes the body for security reasons",
      "The body is available only for GET requests",
      "Express does not read the body by itself, so a parser must be registered"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a route parameter such as /users/:id?",
    "topic": "Request and response handling",
    "choices": [
      "req.params.id",
      "req.query.id",
      "req.body.id",
      "req.header.id"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read the value of ?page=2 in the query string?",
    "topic": "Request and response handling",
    "choices": [
      "req.params.page",
      "req.body.page",
      "req.query.page",
      "req.url.page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which method sends a JSON response?",
    "topic": "Request and response handling",
    "choices": [
      "res.write(data)",
      "res.render(data)",
      "res.json(data)",
      "res.show(data)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set the status code of a response?",
    "topic": "Request and response handling",
    "choices": [
      "res.status(201), and then send the body",
      "res.code = 201 before the return",
      "res.set(201) with no body",
      "res.send(201) always sets the code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which middleware reads URL encoded form bodies?",
    "topic": "Request and response handling",
    "choices": [
      "express.form()",
      "express.encoded()",
      "express.text() only",
      "express.urlencoded({ extended: true })"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does res.redirect(\"/login\") do?",
    "topic": "Request and response handling",
    "choices": [
      "Reloads the current route on the server",
      "Sends a redirect response that makes the client request another url",
      "Forwards the request to another Express app silently",
      "Renders the login template without a new request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate req.body before using it?",
    "topic": "Request and response handling",
    "choices": [
      "Express validates it automatically",
      "The data comes from the outside and cannot be trusted",
      "The browser rejects bad bodies",
      "The body is always empty without it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does res.sendStatus(204) do?",
    "topic": "Request and response handling",
    "choices": [
      "Sends the status 204 and a JSON object with the message",
      "Only sets the status and keeps the request open",
      "Redirects the client to a page that is named 204",
      "Sends the status with its standard text as the body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which HTTP method is conventionally used to create a new resource?",
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "REST conventions and status codes",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
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
    "topic": "Environment configuration",
    "choices": [
      "In the settings of the hosting platform",
      "In the package.json file",
      "In the public folder",
      "In the README file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an Express error handling middleware?",
    "topic": "Error handling middleware",
    "choices": [
      "A function with two arguments that runs before every route",
      "A route that is registered with app.error",
      "A function that returns the error to the client unchanged",
      "A function with four arguments, err, req, res and next"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should the error handling middleware be registered?",
    "topic": "Error handling middleware",
    "choices": [
      "Before every other middleware of the app",
      "After all of the routes and other middleware",
      "Inside each route handler of the app",
      "In a separate server process"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you pass an error from a route to the error handler?",
    "topic": "Error handling middleware",
    "choices": [
      "Return the error from the route handler",
      "Call next(err) with the error",
      "Call res.error(err) in the handler",
      "Throw the error inside the template"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should async route handlers report errors in Express 4?",
    "topic": "Error handling middleware",
    "choices": [
      "Nothing, since Express 4 catches all async errors",
      "Return the error from the async function",
      "Call process.exit in the handler",
      "Catch the rejection and call next(err), or use a wrapper"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it important not to send stack traces to clients?",
    "topic": "Error handling middleware",
    "choices": [
      "They can reveal internal paths and library versions",
      "They are too short to help developers",
      "They are not valid JSON",
      "They slow down every response"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What status code should a request for a missing resource return?",
    "topic": "Error handling middleware",
    "choices": [
      "400",
      "500",
      "404",
      "403"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What status code fits a validation failure in the body?",
    "topic": "Error handling middleware",
    "choices": [
      "404",
      "500",
      "400",
      "302"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why create a custom error class with a status field?",
    "topic": "Error handling middleware",
    "choices": [
      "The error handler can read the status and respond consistently",
      "Express requires every error to be a class",
      "Custom errors are faster to throw",
      "The compiler needs it for TypeScript"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when no error handler is defined and a route throws?",
    "topic": "Error handling middleware",
    "choices": [
      "The server stops and has to be restarted",
      "The error is ignored and the response is empty",
      "The request is retried by the browser",
      "Express uses its default handler and responds with a 500 error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should be logged when an unexpected error happens?",
    "topic": "Error handling middleware",
    "choices": [
      "The password of the user who sent the request",
      "The error with its stack and the request context on the server",
      "Nothing, because errors are private",
      "The full response body for every user"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-4

```json
[
  {
    "stem": "What does a row in a relational table represent?",
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "Tables, columns, and keys",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "SELECT, INSERT, UPDATE, DELETE",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
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
    "topic": "Joins and relationships",
    "choices": [
      "LEFT JOIN",
      "FULL JOIN",
      "CROSS JOIN",
      "INNER JOIN"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the default index type in PostgreSQL?",
    "topic": "Indexes and constraints",
    "choices": [
      "B-tree",
      "Hash",
      "GIN",
      "BRIN"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which queries benefit most from a B-tree index?",
    "topic": "Indexes and constraints",
    "choices": [
      "Full text searches on large blocks of free text",
      "Queries that scan every row of the table without a filter",
      "Equality, range and sort operations on the indexed column",
      "Queries that join tables on columns that have no index"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a composite index?",
    "topic": "Indexes and constraints",
    "choices": [
      "An index that is stored in two tables at the same time for faster joins",
      "An index that combines the data of two databases into a single structure",
      "An index on several columns, where the column order matters",
      "An index that is rebuilt automatically after every single query is run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Given an index on (last_name, first_name), which query can use it well?",
    "topic": "Indexes and constraints",
    "choices": [
      "WHERE last_name = 'Smith'",
      "WHERE first_name = 'Anna' without any condition on last_name",
      "WHERE first_name LIKE '%a' with a leading wildcard",
      "ORDER BY first_name without a filter on last_name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a partial index?",
    "topic": "Indexes and constraints",
    "choices": [
      "An index that covers only the first column of a table and nothing else",
      "An index that is kept in memory only and is lost after a restart",
      "An index that is built only on the first hundred rows of a table",
      "An index that covers only the rows that match a WHERE condition"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is a partial index useful?",
    "topic": "Indexes and constraints",
    "choices": [
      "When every row of the table is read by every query",
      "When queries often target a small subset, such as active orders",
      "When the table has no primary key defined on it",
      "When the column holds many different values in each row"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the cost of adding an index?",
    "topic": "Indexes and constraints",
    "choices": [
      "Slower reads, because every query must check every index",
      "Extra storage and slower writes, because the index must be updated",
      "The table becomes read only until the index is dropped",
      "The table loses its primary key constraint"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a UNIQUE index enforce?",
    "topic": "Indexes and constraints",
    "choices": [
      "That the indexed column is stored in sorted order on disk",
      "That the indexed columns are never NULL in any row",
      "That the index is used by every query on the table",
      "No duplicate values in the indexed columns"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which index type is designed for JSONB containment and full text search?",
    "topic": "Indexes and constraints",
    "choices": [
      "GIN",
      "B-tree",
      "Hash",
      "BRIN"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why might PostgreSQL ignore an index and scan the whole table?",
    "topic": "Indexes and constraints",
    "choices": [
      "Because indexes are used only after the table has been vacuumed by a job",
      "Because indexes work only for text columns and never for numbers or dates",
      "For small tables or when the query returns a large share of the rows",
      "Because the index was created by another role of the database server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is normalization?",
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
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
    "topic": "Normalization basics",
    "choices": [
      "Splitting rarely used or sensitive columns into a separate table",
      "Storing a list of values for each row of the main table",
      "Linking every row to all of the rows of another table",
      "Saving space by deleting the primary key of one table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is node-postgres, usually imported as pg?",
    "topic": "Connecting from Node",
    "choices": [
      "An ORM that generates SQL from a schema file and gives you a typed client",
      "A tool that creates and runs the migrations of a PostgreSQL database",
      "A server that hosts PostgreSQL databases for you in the cloud",
      "A low level PostgreSQL client for Node.js that sends SQL and returns rows"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a connection pool?",
    "topic": "Connecting from Node",
    "choices": [
      "A list of all the databases that exist on one PostgreSQL server",
      "A set of open connections that requests borrow and return instead of opening new ones",
      "A queue that stores failed queries so that they can run later",
      "A cache that keeps the results of queries in memory"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a pool instead of a new connection for every request?",
    "topic": "Connecting from Node",
    "choices": [
      "A pool encrypts every query before it is sent to the server",
      "Opening a connection is slow and the server can handle only a limited number",
      "A new connection per request is not allowed by PostgreSQL",
      "A pool makes each query return fewer rows than before"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if a route borrows a client from the pool and never releases it?",
    "topic": "Connecting from Node",
    "choices": [
      "The client is released automatically after the response is sent",
      "The database closes the connection and reopens it by itself",
      "The pool grows without limit to make room for more clients",
      "The pool runs out of clients and later requests wait or time out"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which call runs one query using a pool client and returns it to the pool by itself?",
    "topic": "Connecting from Node",
    "choices": [
      "pool.query(text, values)",
      "client.connect(text, values)",
      "pool.checkout(text, values)",
      "pool.release(text, values)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When must you use pool.connect() and release the client yourself?",
    "topic": "Connecting from Node",
    "choices": [
      "When you want the query to run faster than with pool.query",
      "When the query returns more than one row from the table",
      "When several statements must share one connection, such as in a transaction",
      "When the database requires a new password for each call"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the max option of a pool set?",
    "topic": "Connecting from Node",
    "choices": [
      "The largest number of rows that a query may return",
      "The longest time that a query may run before it is cancelled",
      "The largest number of connections the pool will open",
      "The largest size of a single row in bytes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can serverless functions exhaust the connections of a database?",
    "topic": "Connecting from Node",
    "choices": [
      "Many short lived instances can each open their own pool at the same moment",
      "Serverless functions keep every connection open for ever, by design of the platform",
      "Serverless platforms block all of the connections to a PostgreSQL server",
      "Each function call is limited to one single connection in total by the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean to handle the pool error event?",
    "topic": "Connecting from Node",
    "choices": [
      "The pool stops running all queries until the event handler has returned",
      "The pool deletes the tables of the database when an error is raised",
      "Errors are only written to the log of the server and never reach the app",
      "An idle client can fail, and an unhandled error could crash the process"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should the pool be created in an application?",
    "topic": "Connecting from Node",
    "choices": [
      "Inside each request handler, so that every request is independent of the others",
      "Once at startup and shared by the code, not inside each request handler",
      "Inside every query function, so that the connections are always fresh",
      "In the browser, so that the user connects to the database directly"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-5

```json
[
  {
    "stem": "What is CORS?",
    "topic": "CORS and cross-origin requests",
    "choices": [
      "A server setting that encrypts the traffic between two different origins of the web",
      "A tool that compresses the responses before they reach the browser",
      "A browser rule that decides if a page may read a response from another origin",
      "A database permission system that limits who may read documents"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What counts as a different origin?",
    "topic": "CORS and cross-origin requests",
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
    "topic": "CORS and cross-origin requests",
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
    "topic": "CORS and cross-origin requests",
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
    "topic": "CORS and cross-origin requests",
    "choices": [
      "It slows down the response because every origin has to be checked again each time",
      "Browsers refuse the wildcard with cookies, and it would let any site call the API",
      "It removes the cookie from the request before the server can read it",
      "It only works in Firefox, while other browsers ignore the header completely"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Does CORS protect the server from receiving requests?",
    "topic": "CORS and cross-origin requests",
    "choices": [
      "Yes, it blocks every unwanted request before it reaches the server",
      "Yes, it stops attackers from sending requests that carry their own scripts",
      "It protects only the database and has no effect on the HTTP layer",
      "No, it only controls whether the browser lets a page read the response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Express package is commonly used to set CORS headers?",
    "topic": "CORS and cross-origin requests",
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
    "topic": "CORS and cross-origin requests",
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
    "topic": "CORS and cross-origin requests",
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
    "topic": "CORS and cross-origin requests",
    "choices": [
      "A list of the exact front end origins",
      "The wildcard, so that every origin may call the API in the same way",
      "Only localhost, so the API cannot be used from any real domain",
      "No origin at all, so the API answers requests from servers only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an Axios instance created with axios.create used for?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Opening a persistent socket connection that stays alive between two page loads",
      "Caching every response in memory so repeated calls never reach the network",
      "Running requests in a separate thread so the page stays responsive",
      "Sharing a base url, headers and timeout across all the requests made through it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an Axios request interceptor allow you to do?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Cancel the response after it arrives and replay the previous one",
      "Modify every outgoing request, for example by adding an Authorization header",
      "Retry every failed request automatically without writing any code",
      "Convert the response body into a form that React can render directly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does Axios reject the promise of a request by default?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Only when the network connection fails and the server cannot be reached",
      "When the response status is outside the 2xx range",
      "Only when the response body is not valid JSON that Axios can parse",
      "Never, because every response is resolved and must be checked by hand"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you find the parsed JSON body of an Axios response?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "The body property, once the json method has finished parsing it",
      "The result property that Axios adds after the promise resolves",
      "The payload field that holds the raw text of the server reply",
      "The data property of the response object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a typical use of a response interceptor?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Handling a 401 by refreshing the token and retrying the original request",
      "Removing the finished request from the history of the browser so it is not stored",
      "Changing the url of each request before it is finally sent to the server",
      "Encrypting the response body so that other scripts on the page cannot read it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you set a timeout for an Axios request?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Call the timeout method on the response after the request has been sent",
      "Add a Retry-After header to the outgoing request with a number of seconds",
      "Pass the timeout option in milliseconds",
      "Wrap the call in setInterval and cancel it when the delay has passed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How is a JSON body sent with axios.post?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Pass the output of JSON.stringify as the url of the request instead of the body",
      "Place the object inside a header called body so the server reads it",
      "Pass the object as the second argument and Axios serialises it for you",
      "Call a separate axios.json function and give it the object to send"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the baseURL option do?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Is prepended to relative urls, so each call only needs the path",
      "Replaces the url of every request with the same fixed address for all calls",
      "Sets the address that the server will send each response back to",
      "Defines which origin is allowed to read the response in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the error object contain when the server responds with 500?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "No response property at all, because the server failed before answering",
      "The stack trace of the server code that was running when it failed",
      "A normal response object, because Axios converts errors into successes",
      "A response property holding the status and body that the server sent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might you prefer Axios over fetch in a large app?",
    "topic": "Fetching and posting JSON",
    "choices": [
      "Axios works in browsers, while the fetch function is not available there",
      "Interceptors, instances and automatic JSON handling cut repeated code",
      "Axios sends requests faster than the networking layer of the browser can",
      "Axios removes the need for a backend server for the application data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a React error boundary do?",
    "topic": "Loading and error states",
    "choices": [
      "Catches errors thrown inside event handlers and asynchronous callbacks too",
      "Catches errors thrown while rendering its children and shows a fallback UI",
      "Stops the server from crashing when a request throws an exception",
      "Logs every error to the database of the application automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which errors does an error boundary not catch?",
    "topic": "Loading and error states",
    "choices": [
      "Errors thrown while a child component is rendering",
      "Errors thrown in the lifecycle methods of a child component",
      "Errors thrown in the constructor of a child component",
      "Errors in event handlers and in asynchronous code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you create an error boundary in React?",
    "topic": "Loading and error states",
    "choices": [
      "With a class component that defines getDerivedStateFromError or componentDidCatch",
      "With a function component that calls a built in useErrorBoundary hook",
      "With a try block that is written around the JSX of a component",
      "With an HTML attribute that is set on the root element of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is it good to place several error boundaries instead of one around the whole app?",
    "topic": "Loading and error states",
    "choices": [
      "Several boundaries make the application load faster than one does",
      "React requires at least three boundaries in every application",
      "A failure in one part does not remove the whole page",
      "Each boundary repairs the error that it caught by itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a toast notification?",
    "topic": "Loading and error states",
    "choices": [
      "A permanent banner that stays on the page and cannot be closed",
      "A full page that asks the user to log in again to continue",
      "A short message that appears briefly to confirm an action or show an error",
      "A tooltip that follows the cursor around the page while it moves"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a toast a better choice than an inline error?",
    "topic": "Loading and error states",
    "choices": [
      "For results of actions such as saving, where no single field is at fault",
      "For errors that belong to one specific input field of a form",
      "For fatal errors that stop the whole page from working",
      "For legal text that the user has to read before continuing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a good error message for a failed request tell the user?",
    "topic": "Loading and error states",
    "choices": [
      "The full stack trace of the server code that failed to run",
      "The database query that failed, together with its parameters",
      "Only the numeric status code that the server answered with",
      "What went wrong in plain words and what they can do next"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can React Query help with global error toasts?",
    "topic": "Loading and error states",
    "choices": [
      "It shows a toast on its own, with no code written by the developer",
      "Use an onError callback or the global query cache handler to show a message",
      "It hides every error from the user and retries in silence forever",
      "It turns every error into a success response with an empty result"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of a retry button on a failed data load?",
    "topic": "Loading and error states",
    "choices": [
      "It fixes the bug on the server that caused the failure of the load",
      "It lets the user try again without reloading the whole page",
      "It stores the failed request forever so that it can run later",
      "It hides the error message so that the screen looks clean again"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why log client errors to a monitoring service?",
    "topic": "Loading and error states",
    "choices": [
      "To make the page load faster for users on slow connections",
      "To replace the tests that the project would otherwise need",
      "To hide the errors from users so that the interface looks stable",
      "To find problems that real users hit but never report"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why organise calls to the API in one client module?",
    "topic": "API client organization",
    "choices": [
      "The base url, headers and error handling live in one place instead of in every component",
      "Components can then run without any network connection at all",
      "The browser requires one module for all of the requests of an app",
      "The module makes each request faster than a direct call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good shape for an API client function?",
    "topic": "API client organization",
    "choices": [
      "A function that returns the raw response object for the component to parse",
      "A function that edits the DOM after the request is finished",
      "A small function such as getUsers() that returns typed data and hides the url details",
      "A function that stores the data in a global variable of the window"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What belongs in a shared request helper?",
    "topic": "API client organization",
    "choices": [
      "The colours and fonts of the page that will show the data",
      "The routes of the pages that call the helper",
      "The base url, JSON headers, the auth token and consistent error handling",
      "The database queries that run on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why throw an error for a non 2xx response in the client helper?",
    "topic": "API client organization",
    "choices": [
      "fetch resolves for HTTP errors",
      "fetch rejects for every HTTP error status by itself in all browsers",
      "Throwing an error makes the request faster for the next call",
      "The browser blocks every response that has an error status"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should the API base url be configured in the front end?",
    "topic": "API client organization",
    "choices": [
      "With a constant that is written inside every component",
      "With a cookie that is set by the server for each user",
      "With a comment above the function that calls the API",
      "With an environment variable that differs between development and production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of typing the responses of the API client?",
    "topic": "API client organization",
    "choices": [
      "The types are checked on the server for every request",
      "The compiler catches wrong field names in the components that use the data",
      "The types make the response smaller before it is sent",
      "The types remove the need to handle errors in the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep API functions out of the visual components?",
    "topic": "API client organization",
    "choices": [
      "Components cannot import files from other folders",
      "Components stay simple, and the calls can be reused and tested on their own",
      "The calls must be written in a separate language",
      "It stops the components from re-rendering at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an interceptor or wrapper often add to every request?",
    "topic": "API client organization",
    "choices": [
      "The password of the user, placed inside of the body of the request",
      "A random id in the url of the page",
      "A CSS class on the document element",
      "The Authorization header with the current token"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a client handle a 401 response globally?",
    "topic": "API client organization",
    "choices": [
      "Detect it in the shared helper and redirect to login or refresh the token",
      "Ignore it in the helper and let each component decide by itself",
      "Delete the user account from the browser storage",
      "Retry the same request ten times in a row"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why not scatter fetch calls with hard coded urls across the code?",
    "topic": "API client organization",
    "choices": [
      "Browsers reject urls that are written in components",
      "Hard coded urls are slower than urls from a config",
      "Changing the endpoint or the host would mean editing many files and missing some",
      "The compiler removes urls that appear more than once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does Vite offer a dev server proxy option?",
    "topic": "Proxy setup in development",
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
    "topic": "Proxy setup in development",
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
    "topic": "Proxy setup in development",
    "choices": [
      "Opens port 5000 on the machine so that the browser can reach it",
      "Copies the backend code into the bundle that the browser downloads",
      "Replaces every request with a request to the first route of the application",
      "Sends browser requests starting with /api to the backend on port 5000"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does the Vite dev proxy exist in the production build?",
    "topic": "Proxy setup in development",
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
    "topic": "Proxy setup in development",
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
    "topic": "Proxy setup in development",
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
    "topic": "Proxy setup in development",
    "choices": [
      "Requests look same origin to the browser",
      "Cookies are removed from every request that passes through the proxy",
      "Cookies are encrypted by the proxy before they reach the backend",
      "Cookies are sent to every website that the page happens to call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does changeOrigin do in a proxy configuration?",
    "topic": "Proxy setup in development",
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
    "topic": "Proxy setup in development",
    "choices": [
      "The proxy of Vite keeps running in production and still needs its own headers",
      "Browsers ignore CORS rules for sites that were built for production",
      "The front end and the API may live on different origins in production",
      "CORS only matters during development and can be removed afterwards"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool did the proxy field in package.json belong to?",
    "topic": "Proxy setup in development",
    "choices": [
      "Create React App",
      "Vite, which reads it when the dev server starts",
      "Next.js, which reads it when the project is built",
      "Parcel, which reads it when the bundle is created"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are query parameters in a url?",
    "topic": "Pagination and query params",
    "choices": [
      "Folders in the path of the url that name the resource",
      "The part of the url that comes after the hash sign",
      "Headers that the browser adds to every request",
      "Key value pairs after the question mark that carry options such as page and limit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which query parameters usually control pagination?",
    "topic": "Pagination and query params",
    "choices": [
      "name and password",
      "page and limit, or offset and limit",
      "token and secret",
      "color and font"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a server use limit and offset in a database query?",
    "topic": "Pagination and query params",
    "choices": [
      "It deletes the rows before the offset from the table",
      "It returns a slice of the rows, skipping offset rows and returning at most limit rows",
      "It sorts the whole table in memory and sends every row",
      "It copies the offset rows into a new table for the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a paginated response include besides the items?",
    "topic": "Pagination and query params",
    "choices": [
      "The full database that the items came from",
      "The password hash of the current user",
      "The source code of the query that was run",
      "Information such as the total count or whether there is a next page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why cap the maximum limit on the server?",
    "topic": "Pagination and query params",
    "choices": [
      "A client could otherwise ask for a huge page and overload the server and the network",
      "The limit is required by the HTTP standard for all APIs",
      "A larger limit makes the response faster for everyone",
      "Browsers can only display fifty items at a time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of offset pagination on a large changing table?",
    "topic": "Pagination and query params",
    "choices": [
      "It cannot return more than ten rows for a page",
      "It needs a separate database for every page",
      "Slow queries for deep pages, and items can be skipped or repeated when rows change",
      "It only works when the table has no primary key"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is cursor based pagination?",
    "topic": "Pagination and query params",
    "choices": [
      "The pages are chosen by a random number for each request",
      "The client downloads all items and slices them in the browser",
      "The next page starts after the last item that the client has seen, identified by a cursor",
      "The server remembers the page of each visitor in a cookie"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep the page number in the url of the front end?",
    "topic": "Pagination and query params",
    "choices": [
      "The page survives a reload, and users can share or bookmark the link",
      "The url makes the data load faster from the cache",
      "Browsers refuse to show pages without a page parameter",
      "The page number is encrypted when it is in the url"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should a client build query strings safely?",
    "topic": "Pagination and query params",
    "choices": [
      "By joining raw strings with the plus sign and no encoding",
      "By putting the values in the request body of a GET request",
      "By writing the values in the headers of the request",
      "With URLSearchParams, so values are encoded correctly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good default when the page parameter is missing or invalid?",
    "topic": "Pagination and query params",
    "choices": [
      "Return a server error for every missing parameter",
      "Treat it as page 1 and clamp invalid values to a safe range",
      "Return all of the rows of the table at once",
      "Ignore the request and return nothing"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-6

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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
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
    "topic": "JSON Web Tokens",
    "choices": [
      "Nothing happens, because the payload of every token is encrypted anyway",
      "Anyone can forge valid tokens, so the secret must be rotated",
      "Only the tokens that were issued a long time ago stop working for users",
      "The tokens that the server issues from then on become much longer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main difference between sessions and tokens for authentication?",
    "topic": "Sessions versus tokens",
    "choices": [
      "A session works only in the browser and a token only on mobile phones",
      "A session keeps state on the server and the client holds an id, while a token carries signed claims the client sends back",
      "A token needs a database table and a session needs none at all",
      "They are the same thing with two names in different frameworks"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the state of a classic server side session stored?",
    "topic": "Sessions versus tokens",
    "choices": [
      "Inside the token that the browser keeps in local storage",
      "In the url of every page that the user visits",
      "In the DNS records of the domain of the app",
      "On the server, in memory or in a database or cache, keyed by a session id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of server side sessions?",
    "topic": "Sessions versus tokens",
    "choices": [
      "The server can revoke a session at any time, such as after a logout or a password change",
      "They need no storage on the server at all",
      "They are faster than every other approach in all cases",
      "They never expire on their own and need no cookie"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of stateless tokens such as JWTs?",
    "topic": "Sessions versus tokens",
    "choices": [
      "They can be revoked instantly without any extra work",
      "They are encrypted by default so nobody can read the payload",
      "Any server that has the key can verify them without a shared session store",
      "They never need to be signed or checked"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of JWTs for sessions?",
    "topic": "Sessions versus tokens",
    "choices": [
      "A JWT cannot be sent in an HTTP header",
      "A JWT can only be used on one server",
      "A token is hard to revoke before it expires unless you keep extra state",
      "A JWT needs a database lookup for every claim"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is the session id usually kept in the browser?",
    "topic": "Sessions versus tokens",
    "choices": [
      "In an HttpOnly cookie that scripts cannot read",
      "In a global variable on the window object",
      "In the url as a path segment",
      "In a hidden field of every form"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean that a JWT is self contained?",
    "topic": "Sessions versus tokens",
    "choices": [
      "The token stores a pointer to a row in the session table of the server",
      "The token is encrypted so only the original server can open it",
      "The token is valid for ever once it has been issued to a client",
      "The token carries its own claims and signature, so a server can check it without a lookup"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the role of a refresh token?",
    "topic": "Sessions versus tokens",
    "choices": [
      "It stores the password of the user for the next login",
      "It gets a new access token without asking the user to log in again",
      "It signs the access token before it is sent",
      "It replaces the secret key of the server when it expires"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When might sessions be the simpler choice?",
    "topic": "Sessions versus tokens",
    "choices": [
      "For an API that must be called by many unrelated services",
      "For a single web app where you want easy logout and revocation",
      "For a mobile app that has no cookies",
      "For static sites that have no server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When might tokens be a good choice?",
    "topic": "Sessions versus tokens",
    "choices": [
      "For apps that must revoke access in one second at all times",
      "For pages that have no users",
      "For servers that cannot verify signatures",
      "For APIs used by several clients or services, where a shared session store is awkward"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does auth middleware usually do?",
    "topic": "Protected route middleware",
    "choices": [
      "Reads the token, verifies it, then attaches the user to req or rejects",
      "Creates a new token for each request that reaches the server",
      "Stores the password of the user in req.body for the next handler",
      "Redirects every request that comes in to the login page of the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code should the middleware return when the token is missing or invalid?",
    "topic": "Protected route middleware",
    "choices": [
      "404",
      "200",
      "401",
      "500"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is the token usually sent in the request?",
    "topic": "Protected route middleware",
    "choices": [
      "In the url of the request, as one of its path segments",
      "In the headers of the response that the server sends back",
      "In the Authorization header, as Bearer followed by the token",
      "In the request method, next to the verb such as GET or POST"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should the auth middleware be placed relative to a protected route?",
    "topic": "Protected route middleware",
    "choices": [
      "Before the route handler, so it can stop the request early",
      "After the route handler, so that it can read the finished response",
      "Inside the database layer, next to the queries that load the user",
      "Only on the login route, because the other routes are public"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is role based access control?",
    "topic": "Protected route middleware",
    "choices": [
      "Letting every logged in user do everything that the API offers",
      "Giving each user a separate server instance that only they can reach",
      "Blocking all of the users except for the owner of the application",
      "Allowing actions based on the role of a user, such as admin or member"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must authorisation be checked on the server and not only hidden in the UI?",
    "topic": "Protected route middleware",
    "choices": [
      "The server has no way of rendering the buttons that a user sees",
      "A user can call the API directly and skip the interface",
      "The browser blocks all of the requests that are not authorised",
      "The interface is always updated too slowly to reflect permissions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between authentication and authorisation?",
    "topic": "Protected route middleware",
    "choices": [
      "Authentication decides what you may do and authorisation proves who you are",
      "Authentication proves who you are and authorisation decides what you may do",
      "They mean the same thing",
      "Authentication happens only in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you check besides being logged in when a user edits a resource by id?",
    "topic": "Protected route middleware",
    "choices": [
      "That the id in the url is a number and not a string of letters",
      "That the request was sent with the PUT method and not with POST",
      "That the password of the user is longer than twelve characters",
      "That the resource belongs to that user, or the user has the right role"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does it mean for a route to be protected?",
    "topic": "Protected route middleware",
    "choices": [
      "It requires valid credentials before the handler runs",
      "It is hidden from the list of routes that the server exposes",
      "It accepts requests only from the same browser that logged in",
      "It cannot be covered by automated tests of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a 403 response tell the client in a protected API?",
    "topic": "Protected route middleware",
    "choices": [
      "The user must log in first before the server can answer the request",
      "The route does not exist on the server that received the request",
      "The user is known but not allowed to perform the action",
      "The server crashed while it was handling the request of the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must a server action check the session itself?",
    "topic": "Role-based access control",
    "choices": [
      "The user interface already checks the session and the action simply trusts it",
      "Server actions cannot be called at all when the user is signed out",
      "Actions are public endpoints, so hiding the button does not protect them",
      "The session is verified by the browser of the user before each call"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should a protected server action do when there is no session?",
    "topic": "Role-based access control",
    "choices": [
      "Return an error or redirect before touching any data",
      "Continue and use a default user for the request",
      "Show a message in the console and keep running",
      "Ask the browser to send the session again in a header"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should authorization checks for a record live?",
    "topic": "Role-based access control",
    "choices": [
      "In the button component that triggers the action in the user interface",
      "In a client side hook that reads the url of the current page",
      "In the CSS rules that hide the buttons from the other users",
      "On the server, next to the data access, checking ownership or role"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is authentication compared with authorization?",
    "topic": "Role-based access control",
    "choices": [
      "Authentication decides what you may do, authorization proves who you are",
      "Authentication proves who you are, authorization decides what you may do",
      "They mean the same thing in different frameworks",
      "Authentication is done on the server, authorization in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why check ownership when a user edits a post by id?",
    "topic": "Role-based access control",
    "choices": [
      "Ids are kept secret, so the check is only needed for logging purposes",
      "Otherwise anyone could change the posts of others by sending another id",
      "The database does not allow any edit to run without an ownership check",
      "The check is slow, so it is needed only while developing the feature"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a page redirect an unauthenticated visitor to sign in?",
    "topic": "Role-based access control",
    "choices": [
      "Hide the content with CSS until the visitor logs in",
      "Show an alert in the browser and keep the page open",
      "Ask the visitor for the password in the url",
      "Check the session in the server component and call redirect"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why not rely on a client component check alone to protect data?",
    "topic": "Role-based access control",
    "choices": [
      "The client code can be changed or bypassed by the user",
      "Client components cannot read the session at all",
      "Client checks are slower than server checks in every case",
      "Browsers block data requests from unauthenticated users"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the safest place to enforce access to a route handler?",
    "topic": "Role-based access control",
    "choices": [
      "In a global variable that is read by every one of the handlers",
      "In the page that links to the handler from the user interface",
      "Inside the handler itself, before it reads or writes any data",
      "In the browser, before the request is sent to the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a 401 response mean for an API route?",
    "topic": "Role-based access control",
    "choices": [
      "The caller is not allowed to use that resource",
      "The resource was moved to a new path",
      "The caller is not authenticated",
      "The server had an internal error"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a 403 response mean for an API route?",
    "topic": "Role-based access control",
    "choices": [
      "The caller is known but is not allowed to do this",
      "The caller has not signed in yet and must identify themselves first",
      "The route does not exist on the server that received the request",
      "The body of the request is invalid and could not be parsed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the HttpOnly flag on a cookie do?",
    "topic": "Secure cookie handling",
    "choices": [
      "Makes the cookie work only over plain HTTP and never over HTTPS",
      "Stops the cookie from being sent to the server on later requests",
      "Deletes the cookie as soon as the page that set it is closed",
      "Prevents JavaScript on the page from reading the cookie"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Secure flag on a cookie do?",
    "topic": "Secure cookie handling",
    "choices": [
      "Encrypts the cookie value",
      "Sends the cookie only over HTTPS connections",
      "Prevents the server from reading the cookie",
      "Makes the cookie last forever"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is storing a token in localStorage risky?",
    "topic": "Secure cookie handling",
    "choices": [
      "The browser deletes the stored value after one minute without any use",
      "Any script running on the page, such as injected code, can read it",
      "It cannot be sent to the server in the headers of a request",
      "It is shared with every other website that the user visits"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the SameSite attribute help prevent?",
    "topic": "Secure cookie handling",
    "choices": [
      "Cookies from growing larger than the header limit of the server",
      "Cookies from expiring before the end of the session of the user",
      "Users from logging in on two different devices at the same moment",
      "Cross site request forgery, by limiting when cookies go out on cross site requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of cookie based auth compared with a header token?",
    "topic": "Secure cookie handling",
    "choices": [
      "It needs protection against cross site request forgery",
      "It cannot work together with a database that stores the user accounts",
      "It cannot be used to send JSON bodies to the endpoints of the API",
      "It is readable by every website that the user visits in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which option sends cookies in a cross origin fetch call?",
    "topic": "Secure cookie handling",
    "choices": [
      "mode set to cookies",
      "headers with a cookie field",
      "credentials set to include",
      "method set to COOKIE"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the cookie option maxAge control?",
    "topic": "Secure cookie handling",
    "choices": [
      "The size in bytes that the cookie is allowed to reach",
      "The number of times the browser may send the cookie to a server",
      "How long the browser keeps the cookie",
      "The domain to which the cookie is attached when it is stored"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which approach protects a token best from theft by injected scripts?",
    "topic": "Secure cookie handling",
    "choices": [
      "An HttpOnly cookie set by the server",
      "A variable inside the global window object",
      "A value inside the url",
      "A value in localStorage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is true about cookies and the same origin policy?",
    "topic": "Secure cookie handling",
    "choices": [
      "Cookies are sent only to the page that created them and never to others",
      "Cookies are never sent with images or with other kinds of resources",
      "Cookies are shared between all of the browsers that are used on a device",
      "Cookies go to the domain that set them, whichever page makes the request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must the server do to clear a login cookie?",
    "topic": "Secure cookie handling",
    "choices": [
      "Delete the cookie file that the browser stores on the disk of the user",
      "Send a Set-Cookie header with the same name and an expired date",
      "Ask the browser to restart so that all of its cookies are dropped",
      "Change the password of the user so that the old cookie stops working"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-7

```json
[
  {
    "stem": "What is the goal of input sanitisation and validation?",
    "topic": "Input validation and sanitization",
    "choices": [
      "To make the input longer so that it is harder to guess for attackers",
      "To encrypt the input before it is saved to the database of the app",
      "To make sure user input has the expected form before it is used",
      "To compress the input so that it takes less space in the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is SQL or NoSQL injection?",
    "topic": "Input validation and sanitization",
    "choices": [
      "An attack where input changes the meaning of a database query",
      "An attack that fills the disk of the server with very large files",
      "An attack on the DNS server that redirects visitors to a wrong address",
      "An attack that reads the cookies of a user from another website"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a request body like { \"email\": { \"$ne\": null } } cause a problem in a MongoDB query?",
    "topic": "Input validation and sanitization",
    "choices": [
      "It makes the request larger, which can slow the server down a little",
      "It encrypts the filter so that the database cannot read it correctly",
      "It creates a new collection with the name of the operator in the body",
      "The object is read as an operator"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is cross site scripting?",
    "topic": "Input validation and sanitization",
    "choices": [
      "An attack on the password file of the server that reads stored hashes",
      "An attack that makes the browser run attacker script in the context of your site",
      "An attack that blocks the network of the server with too many requests",
      "An attack on the DNS records so that visitors reach another server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which practice helps prevent cross site scripting in React?",
    "topic": "Input validation and sanitization",
    "choices": [
      "Turning off JSX in the build settings so that no markup is generated",
      "Rendering data as text and avoiding dangerouslySetInnerHTML with untrusted content",
      "Using only class components, because they escape their output in a stricter way",
      "Putting scripts in the url so that the browser can check them first"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of rate limiting on a login route?",
    "topic": "Input validation and sanitization",
    "choices": [
      "To make the page load faster for each of the logged in users",
      "To encrypt the traffic that is sent to the login route of the API",
      "To log every user out after a fixed number of minutes in the app",
      "To slow brute force guessing of passwords"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the helmet package do in Express?",
    "topic": "Input validation and sanitization",
    "choices": [
      "Sets several security related HTTP headers",
      "Encrypts the database so that stored documents cannot be read",
      "Hashes the passwords of users before they reach the controller",
      "Parses the JSON bodies of requests that the server receives"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which item is on the OWASP Top 10 list of common risks?",
    "topic": "Input validation and sanitization",
    "choices": [
      "Slow images that are served without any compression applied",
      "Large bundles that take a long time to download on slow phones",
      "Broken access control",
      "Missing comments in the source code of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should error messages sent to clients avoid stack traces?",
    "topic": "Input validation and sanitization",
    "choices": [
      "They are too short to be useful to the developers who have to read them",
      "They are not valid JSON, so clients are not able to parse them",
      "They can reveal internal paths and library versions to attackers",
      "They slow the response down because the stack has to be built"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the principle of least privilege?",
    "topic": "Input validation and sanitization",
    "choices": [
      "Give each user and service only the access it needs",
      "Give every user admin rights so that nobody is blocked from working",
      "Give every service the same key so that it is easier to manage",
      "Remove all access after one day so that stale accounts do not remain"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the repository pattern?",
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
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
    "topic": "Service and repository layers",
    "choices": [
      "Open a brand new transaction inside each of the repository functions",
      "Pass the transaction client into the repository functions that must share it",
      "Avoid transactions, since repositories are not able to support them",
      "Store the client in a global variable that every function reads from"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does EXPLAIN do?",
    "topic": "Query optimization and indexing",
    "choices": [
      "Runs the query and prints its result as plain text in the terminal",
      "Shows the plan that PostgreSQL would use for a query",
      "Describes the columns of the tables in the query",
      "Checks the query for syntax mistakes only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does EXPLAIN ANALYZE add?",
    "topic": "Query optimization and indexing",
    "choices": [
      "It shows the plan for a query without running the statement at all",
      "It lists all indexes that the query could use",
      "It rewrites the query to make it faster",
      "It runs the query and shows real timings and row counts"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why be careful when using EXPLAIN ANALYZE on an UPDATE?",
    "topic": "Query optimization and indexing",
    "choices": [
      "It really runs the statement",
      "It only shows an estimate and never touches any rows",
      "It blocks the table for every other user until the server restarts",
      "It changes the plan of the query for every future run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a Seq Scan node mean in a plan?",
    "topic": "Query optimization and indexing",
    "choices": [
      "An index was used to find the matching rows",
      "The rows were found in a cache in memory",
      "The whole table is read row by row",
      "The query used a sequence of the database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an Index Scan node mean?",
    "topic": "Query optimization and indexing",
    "choices": [
      "The whole index is read from start to end without filtering",
      "The table is read in parallel by several workers",
      "An index is used to find matching rows and then the table rows are fetched",
      "The rows are returned from a materialized view"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a large gap between estimated and actual rows in a plan suggest?",
    "topic": "Query optimization and indexing",
    "choices": [
      "The planner statistics may be out of date",
      "The query returned more rows than the table contains",
      "The index of the table is corrupted and must be removed",
      "The server is running a different version of SQL"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does ANALYZE (without EXPLAIN) do?",
    "topic": "Query optimization and indexing",
    "choices": [
      "Runs every query again and compares the results",
      "Checks the data of the tables for errors",
      "Rewrites the indexes of the whole database",
      "Updates the statistics that the planner uses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which change often fixes a slow query that filters on an unindexed column?",
    "topic": "Query optimization and indexing",
    "choices": [
      "Select more columns so the result is larger",
      "Add an index on the column that is used in the filter",
      "Remove the WHERE clause from the query",
      "Convert the column to a text type"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common cause of a slow query with a leading wildcard, such as LIKE '%abc'?",
    "topic": "Query optimization and indexing",
    "choices": [
      "The LIKE operator is not allowed on indexed columns",
      "A normal B-tree index cannot be used for it",
      "The wildcard makes the query run on the client",
      "The query returns too few rows for an index to help"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the first step in tuning a slow query?",
    "topic": "Query optimization and indexing",
    "choices": [
      "Add an index to every column of every table of the database to be safe",
      "Rewrite the query in a different programming language that is faster",
      "Restart the database server and hope that it then runs faster",
      "Measure it, look at its plan, and change one thing at a time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is caching?",
    "topic": "Caching strategies",
    "choices": [
      "Keeping the result of an expensive operation so that later requests can reuse it",
      "Deleting old data from the database to free up disk space",
      "Encrypting responses so that other users cannot read them",
      "Splitting a large request into several smaller requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which layer is usually closest to the user for caching static files?",
    "topic": "Caching strategies",
    "choices": [
      "The database query planner",
      "The operating system of the database server",
      "A CDN or the browser cache",
      "The compiler of the front end"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Cache-Control max-age directive tell a browser?",
    "topic": "Caching strategies",
    "choices": [
      "How many requests it may send to the server per minute",
      "How many users may share the response in a shared cache",
      "How many seconds it may reuse the response without asking the server again",
      "How long the server may take to answer the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an in memory cache such as Redis often used for in a backend?",
    "topic": "Caching strategies",
    "choices": [
      "Fast reads of data that is expensive to compute or fetch, with an expiry time",
      "Permanent storage of all user records instead of the database",
      "Compiling the source code of the application on start",
      "Sending emails to users when they sign up"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the hardest problem with caching?",
    "topic": "Caching strategies",
    "choices": [
      "Finding a computer with enough memory to run the cache",
      "Writing the first value into the cache the very first time",
      "Reading the cache from more than one client",
      "Knowing when the cached data is stale and must be removed or refreshed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a time to live, or TTL, do for a cache entry?",
    "topic": "Caching strategies",
    "choices": [
      "The entry is copied to a second server after a set amount of time",
      "The entry is removed or treated as stale after a set time",
      "The entry is encrypted again after a set time",
      "The entry is moved to the database after a set time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is cache invalidation?",
    "topic": "Caching strategies",
    "choices": [
      "Adding more data to the cache so it is always full",
      "Removing or updating cached data when the source data changes",
      "Encrypting the cache so that it is private",
      "Moving the cache to another server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the cache aside pattern?",
    "topic": "Caching strategies",
    "choices": [
      "The app always writes to the cache and never reads the database",
      "The cache talks to the database on its own without the app",
      "The app deletes the cache before every single read",
      "The app checks the cache first, and on a miss reads the database and stores the result"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should personal data not be stored in a shared public cache?",
    "topic": "Caching strategies",
    "choices": [
      "One user could be served the data that belongs to another user",
      "Personal data cannot be stored as text in a cache",
      "Public caches delete personal data after one second",
      "Browsers refuse to read data from a shared cache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a cache hit?",
    "topic": "Caching strategies",
    "choices": [
      "The cache crashed and lost all of its data",
      "The cache was cleared by the server",
      "The requested data was found in the cache and returned without the slow source",
      "The request was blocked by the cache"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is rate limiting?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "Making the response of the server slower on purpose for every single client",
      "Limiting the size of the database that the server may use",
      "Restricting how many requests a client can make in a period of time",
      "Compressing requests before they are sent to the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add rate limiting to a login endpoint?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "It slows down brute force attempts to guess passwords",
      "It makes the login page load faster for each user who signs in",
      "It encrypts the passwords before they are sent",
      "It removes the need for hashing passwords"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code is returned when a client exceeds the limit?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "404 Not Found",
      "301 Moved Permanently",
      "500 Internal Server Error",
      "429 Too Many Requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which header can tell the client when it may try again?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "Content-Length",
      "Retry-After",
      "Set-Cookie",
      "Accept"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the helmet middleware do in Express?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "Encrypts the database connection of the server with a new key each day",
      "Sets several security related HTTP response headers",
      "Hashes the passwords of new users",
      "Parses the JSON body of requests"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Content-Security-Policy header control?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "Which users may log in to the server",
      "How long cookies are valid for",
      "Which methods the server accepts",
      "Which sources of scripts, styles and other content the browser may load"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Strict-Transport-Security header do?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "Tells browsers to use HTTPS only for the site for a period of time",
      "Blocks requests from other websites",
      "Forces the server to restart after a crash",
      "Compresses the response of the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the X-Content-Type-Options nosniff header do?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "Hides the type of the server from visitors",
      "Stops the browser from caching the response",
      "Stops the browser from guessing a different content type for a response",
      "Encrypts the type of the files that are served"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should a rate limiter store its counters when the app runs on several servers?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "In the memory of each server, since they do not need to agree",
      "In the browser of each visitor",
      "In a shared store such as Redis",
      "In a text file in the source code folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why limit by user or api key as well as by IP address?",
    "topic": "Rate limiting and security headers",
    "choices": [
      "Many users can share one IP, and one attacker can use many IPs",
      "IP addresses are always unique for each person",
      "Limits by IP are not allowed by browsers",
      "Keys are faster to read than addresses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why add logging to a backend service?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "Logs make the server respond faster to requests",
      "Logs are required for the server to start",
      "Logs replace the need for a database",
      "Developers can understand what happened when something goes wrong in production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a structured log?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "A log that is written in a single long sentence of text",
      "A log entry with fields such as level, time and request id that tools can search",
      "A log that is stored only in the memory of the process",
      "A log that is printed only during development"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which log levels are commonly used?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "red, green, blue and yellow",
      "debug, info, warn and error",
      "start, middle, end and stop",
      "small, medium, large and huge"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you never write to logs?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "The time of each request that was handled",
      "The status code of each response",
      "The name of the route that was called",
      "Passwords, tokens and other secrets, or personal data without a reason"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a request id useful for?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "Following one request across several log lines and services",
      "Making the request run faster on the server",
      "Encrypting the body of the request",
      "Limiting how many requests a user can send"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does monitoring add on top of logs?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "A copy of every log line stored forever",
      "A faster database for the application",
      "Metrics and alerts that tell you when the system is unhealthy",
      "A way to edit the code of the live server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which metrics give a quick view of the health of a web service?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "Number of files in the project and folder size",
      "Number of developers and lines of code",
      "Error rate, latency and traffic",
      "The colour theme and the font of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a health check endpoint used for?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "A platform or monitor calls it to see whether the service is alive and ready",
      "It lists all users of the service for administrators",
      "It restarts the database every few minutes",
      "It shows the source code of the service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why alert on symptoms such as the error rate and not on every log line?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "Individual log lines cannot be read by any of the available tools",
      "Symptoms are easier to hide from the team",
      "Alerts on log lines are not allowed",
      "Alerts stay useful and are not drowned in noise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a sensible first step after an alert for a spike in errors?",
    "topic": "Logging and monitoring basics",
    "choices": [
      "Wait a week to see whether it goes away",
      "Check whether it started with a recent change and roll back if the impact is high",
      "Delete the monitoring tool to stop the alerts",
      "Add new features to cover for the errors"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-8

```json
[
  {
    "stem": "What is a Docker image?",
    "topic": "Images, containers, and layers",
    "choices": [
      "A running instance of an application with its own process, network and filesystem",
      "A virtual machine with a full guest operating system inside of it",
      "A read only template with the app and its dependencies that containers start from",
      "A backup of a database that is stored as a compressed archive"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a Docker container?",
    "topic": "Images, containers, and layers",
    "choices": [
      "A running instance of an image that is isolated from other processes on the host",
      "A file that lists all of the packages that the application needs to run on the host",
      "A registry where images are stored and shared between teams",
      "A tool that compiles the source code of the app into a binary"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a layer in a Docker image?",
    "topic": "Images, containers, and layers",
    "choices": [
      "A copy of the whole host operating system that is added on top",
      "A folder in which the source code of the project is stored",
      "A network that connects two containers on the same host",
      "A read only filesystem change that is created by one instruction and can be cached"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does Docker cache image layers?",
    "topic": "Images, containers, and layers",
    "choices": [
      "Layers are deleted after the build to save disk space",
      "Unchanged layers are reused, so rebuilds are much faster",
      "Layers must be rebuilt from scratch on every single build",
      "Caching is required for the registry to accept an image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do containers differ from virtual machines?",
    "topic": "Images, containers, and layers",
    "choices": [
      "Containers include a full guest operating system with its own kernel",
      "Containers share the host kernel",
      "Containers can only run on the same hardware as virtual machines do",
      "Containers cannot be isolated from the processes of the host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Docker registry?",
    "topic": "Images, containers, and layers",
    "choices": [
      "A table in which the running containers are counted",
      "A file with the settings of the Docker daemon",
      "A log of the commands that were typed in the terminal",
      "A service that stores and distributes images"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does docker run do?",
    "topic": "Images, containers, and layers",
    "choices": [
      "Creates and starts a container from an image",
      "Builds an image from the Dockerfile in the current folder",
      "Pushes an image to a registry of the team",
      "Deletes all stopped containers on the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to files that are written inside a container when it is removed?",
    "topic": "Images, containers, and layers",
    "choices": [
      "They are saved in the image for the next container",
      "They are copied to the git repository of the project",
      "They are lost unless they were stored in a volume",
      "They are moved to the registry together with the image"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between an image tag and its digest?",
    "topic": "Images, containers, and layers",
    "choices": [
      "A digest is a movable label that points at the newest build, while a tag is exact",
      "They are two names for the same value",
      "A tag is a movable label such as latest, a digest identifies the exact content",
      "A tag is used only for containers and a digest only for volumes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid relying on the latest tag in production?",
    "topic": "Images, containers, and layers",
    "choices": [
      "It can point to a different image over time",
      "It is slower to download than any other tag",
      "It is not allowed by Docker for production hosts",
      "It always refers to the oldest version of an image"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Dockerfile?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "A file that lists the containers that run together as one single application",
      "A file that stores the secrets of the application",
      "A script that starts the Docker daemon",
      "A text file with instructions for building an image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the FROM instruction set?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "The folder that is copied into the image",
      "The base image on which the new image is built",
      "The registry that the image is pushed to",
      "The command that the container runs as soon as it has been started"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the COPY instruction do?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "Copies the running container into a brand new image of the application",
      "Copies files from the build context into the image",
      "Copies the image to another registry",
      "Copies environment variables to the host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the RUN instruction do?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "Starts the container when the image is pulled",
      "Runs the tests of the app after every start",
      "Runs a command on the host operating system",
      "Executes a command during the build and stores the result as a layer"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between CMD and ENTRYPOINT?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "CMD gives the default command that can be overridden, ENTRYPOINT sets the main executable",
      "ENTRYPOINT can always be overridden by docker run, CMD cannot be",
      "They are the same instruction under two names",
      "CMD runs at build time and ENTRYPOINT runs on the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why copy package.json and install dependencies before copying the rest of the code?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "The installer cannot read package.json after the code is copied",
      "Node refuses to start unless the dependencies exist first",
      "Docker caches the install layer",
      "Docker deletes the code if it is copied before the packages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the WORKDIR instruction do?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "Creates a volume that is shared with the host",
      "Sets the user that owns all of the files of the image in the container",
      "Sets the working directory for the instructions that follow",
      "Defines the port that the container listens on"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does EXPOSE do?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "Documents the port that the app listens on",
      "Opens the port to the internet on the host machine",
      "Maps the container port to a random port of the host",
      "Closes every other port of the container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the build context?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "The list of instructions that the Dockerfile contains",
      "The network that the build runs in",
      "The registry that provides the base image",
      "The set of files that is sent to the Docker daemon when an image is built"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the purpose of a .dockerignore file?",
    "topic": "Writing a Dockerfile",
    "choices": [
      "Hiding the Dockerfile from the other users of the repository",
      "Keeping files such as node_modules and .env out of the build context and the image",
      "Making the container start faster by skipping its command",
      "Telling the registry which images to remove after a week"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Docker volume?",
    "topic": "Volumes and networking",
    "choices": [
      "A copy of the image that is stored on the host for faster starts",
      "Storage that is managed by Docker and outlives the container",
      "A limit on how much memory a container may use",
      "A network between two containers on one host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a volume and a bind mount?",
    "topic": "Volumes and networking",
    "choices": [
      "A volume maps a host path into the container, a bind mount is managed by Docker",
      "They are identical and only the names differ",
      "A bind mount is read only and a volume is write only",
      "A bind mount maps a host path into the container, a volume is managed by Docker"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a volume for a database container?",
    "topic": "Volumes and networking",
    "choices": [
      "The data survives when the container is removed or replaced",
      "The database needs a volume to start at all",
      "Volumes make queries faster than the filesystem of the container does",
      "Volumes encrypt the data of the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a bind mount useful in development?",
    "topic": "Volumes and networking",
    "choices": [
      "It makes the production image smaller",
      "It hides the files of the container from the host",
      "Source code changes on the host show up inside the container without a rebuild",
      "It replaces the need for a Dockerfile"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do containers on the same user defined network reach each other?",
    "topic": "Volumes and networking",
    "choices": [
      "Only by the IP address of the host machine",
      "Only through the public internet",
      "By container or service name",
      "They cannot reach each other without a volume"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the option -p 8080:80 do?",
    "topic": "Volumes and networking",
    "choices": [
      "Publishes port 80 of the container on port 8080 of the host",
      "Publishes port 8080 of the container on port 80 of the host",
      "Limits the container to 80 processes and 8080 files",
      "Sets the user and the password of the container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the default network driver for a single host?",
    "topic": "Volumes and networking",
    "choices": [
      "overlay",
      "host only",
      "macvlan",
      "bridge"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should a database port usually not be published to the whole internet?",
    "topic": "Volumes and networking",
    "choices": [
      "Databases cannot be reached from outside of a container",
      "Anyone could reach the database",
      "Published ports slow the database down",
      "Docker refuses to publish database ports"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does docker network create do?",
    "topic": "Volumes and networking",
    "choices": [
      "Creates a new image from the network settings",
      "Creates a user defined network that containers can join",
      "Creates a firewall rule on the host router",
      "Creates a volume that is shared by every container of the network"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a sign that two containers cannot talk to each other?",
    "topic": "Volumes and networking",
    "choices": [
      "The image is larger than one gigabyte",
      "The container exits with code zero",
      "The registry is down",
      "Connection refused or name resolution errors, often because they are on different networks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Docker Compose do?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "Defines and runs multi container apps from a single YAML file",
      "Builds the Docker daemon from source code",
      "Compresses images to a smaller size",
      "Replaces the Dockerfile of each service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a service in a compose file?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "A system service of the host that starts at boot",
      "A cloud provider offering that hosts the app",
      "A named container definition, with an image or build, ports and settings",
      "A group of volumes that share a name"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command starts all services of a compose file?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "docker compose run all",
      "docker start compose",
      "docker compose up",
      "docker compose build only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does depends_on control?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "The start order of the services",
      "Which services may read each other data",
      "Which services share a volume",
      "Which services are published to the internet"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does depends_on alone guarantee that a database is ready for connections?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "Yes, it waits for the database to finish its startup",
      "Yes, but only on Linux hosts",
      "No, it never starts the database at all",
      "No, it only waits for the container to start"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do services in one compose file reach each other?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "By the IP address of the host machine and a random port number",
      "By service name on the default network that compose creates",
      "Only through the public internet",
      "By copying files between their containers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you keep database data between compose runs?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "Copy the data folder into the image at build time of the database",
      "Declare a named volume and mount it in the database service",
      "Keep the data in the memory of the container",
      "Store the data in the compose file as text"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of a health check in a compose service?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "It restarts the host when a service is slow",
      "It encrypts the traffic of the service",
      "It removes unused images from the registry",
      "Docker can tell whether the service works, and others can wait for it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command stops and removes the containers and networks of a compose project?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "docker compose down",
      "docker compose pause",
      "docker compose stop all",
      "docker compose clean"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is compose useful for local development?",
    "topic": "Docker Compose for multi-service apps",
    "choices": [
      "It replaces the need for any images",
      "It deploys the app to production automatically",
      "One command starts the whole stack",
      "It makes the code run faster than on the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you pass an environment variable to a container?",
    "topic": "Environment variables in containers",
    "choices": [
      "By editing the image after it is built",
      "By writing it into the url of the registry",
      "With the -e option, an env file, or the environment key in compose",
      "By renaming the container"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why not bake secrets into the image with ENV or COPY?",
    "topic": "Environment variables in containers",
    "choices": [
      "Anyone who gets the image can read them from its layers",
      "Images cannot contain text files",
      "The registry deletes any image that holds secrets, so nothing can leak",
      "Secrets make the image start slower"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an env_file in compose do?",
    "topic": "Environment variables in containers",
    "choices": [
      "Copies the file into the image at build time of the application",
      "Encrypts the variables with a key",
      "Publishes the variables to the registry",
      "Loads variables from a file into the container environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between ARG and ENV in a Dockerfile?",
    "topic": "Environment variables in containers",
    "choices": [
      "ENV is available only at build time, while ARG is set in the running container",
      "ARG is available at build time, ENV is also set in the running container",
      "They are the same instruction",
      "ARG sets ports and ENV sets volumes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep a .env file out of version control?",
    "topic": "Environment variables in containers",
    "choices": [
      "Git cannot store files that start with a dot",
      "It often holds secrets that must not be shared with everyone who can read the repository",
      "The file is generated again by Docker",
      "It is too large for a repository"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a container read a secret without putting it in an image?",
    "topic": "Environment variables in containers",
    "choices": [
      "Write it in the Dockerfile as a comment",
      "Add it to the image name",
      "Print it in the logs of the build",
      "Provide it at run time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when you change an environment variable of a running container?",
    "topic": "Environment variables in containers",
    "choices": [
      "You must recreate the container for the new value to apply",
      "The change applies instantly inside the running process of the container",
      "The image is rebuilt automatically",
      "The container is removed from the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why validate environment variables at startup?",
    "topic": "Environment variables in containers",
    "choices": [
      "Docker refuses to start any container that has a variable which is missing",
      "It makes the start of the container faster",
      "The app can fail with a clear message instead of running half configured",
      "It removes unused variables from the image"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which variable usually tells a Node app to run in production mode?",
    "topic": "Environment variables in containers",
    "choices": [
      "NODE_MODE set to live",
      "RUN_ENV set to release, which switches the app to its live mode",
      "NODE_ENV set to production",
      "APP_STATE set to final"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do configuration values differ between development and production containers?",
    "topic": "Environment variables in containers",
    "choices": [
      "The same image gets different environment values for each environment",
      "Each environment needs its own source code",
      "Production images contain the development values too",
      "The values are written into the registry"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a multi stage build?",
    "topic": "Building lean production images",
    "choices": [
      "A build that runs on several machines at the same time",
      "A build that creates several images with the same name",
      "A build that stops after the first stage",
      "A Dockerfile with several FROM stages, where only the needed output is copied into the final image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a multi stage build for a compiled front end?",
    "topic": "Building lean production images",
    "choices": [
      "The final image needs all of the build tools to run",
      "Build tools stay in an earlier stage",
      "Multi stage builds make the code compile faster",
      "It removes the need for a web server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of a small base image such as alpine?",
    "topic": "Building lean production images",
    "choices": [
      "Faster execution of every function in the program",
      "A smaller download and a smaller attack surface",
      "Automatic encryption of every file",
      "No need to install dependencies"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why run the app as a non root user in the container?",
    "topic": "Building lean production images",
    "choices": [
      "Root users cannot read the files that are stored inside of a container",
      "Non root users make the container start faster",
      "Docker refuses to run root processes",
      "If the app is compromised, the attacker has fewer rights"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does npm ci --omit=dev help with in an image?",
    "topic": "Building lean production images",
    "choices": [
      "It installs only production dependencies",
      "It installs all dev dependencies for testing",
      "It deletes the lock file",
      "It updates every package to the latest version"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why order Dockerfile instructions from least to most frequently changing?",
    "topic": "Building lean production images",
    "choices": [
      "Docker requires this exact order of instructions in order to build an image",
      "Later layers are deleted after the build",
      "Earlier layers stay cached, so rebuilds are faster",
      "The order decides the size of the image only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can make an image large without being obvious?",
    "topic": "Building lean production images",
    "choices": [
      "The number of comments in the Dockerfile",
      "The name of the image",
      "Build caches, dev dependencies and files copied by a broad COPY instruction",
      "The version of the Docker client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you inspect the layers and sizes of an image?",
    "topic": "Building lean production images",
    "choices": [
      "docker history or docker image inspect",
      "docker network ls",
      "docker volume prune",
      "docker compose logs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why pin versions of the base image and of dependencies?",
    "topic": "Building lean production images",
    "choices": [
      "Pinned versions are always the newest",
      "Docker refuses unpinned images",
      "It makes the image smaller",
      "Builds are reproducible and do not change by surprise"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a production image not contain?",
    "topic": "Building lean production images",
    "choices": [
      "The compiled application",
      "Secrets, source maps you do not need, test tools and development dependencies",
      "The runtime that the app needs",
      "The files that the app serves"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-9

```json
[
  {
    "stem": "What is a unit test?",
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
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
    "topic": "Unit tests with Jest",
    "choices": [
      "Tests then break on harmless refactors even though the behaviour for users did not change",
      "Private details cannot be reached by any test runner because they are hidden by the language",
      "The test runner skips any test that touches a function without an exported name",
      "Tests of private details run too slowly because they need extra memory to load the module"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Supertest let you do?",
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
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
    "topic": "API tests with Supertest",
    "choices": [
      "Because error cases are the only cases that can break a database connection",
      "Because clients depend on correct 400 and 404 responses as much as on success ones",
      "Because the framework skips error handling code unless a test calls it first",
      "Because success responses are checked automatically by the Express package"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the guiding idea of React Testing Library?",
    "topic": "React component testing",
    "choices": [
      "Test the exact structure of the component tree and every prop passed to each child",
      "Test components the way users interact with them rather than their internal state",
      "Test each hook on its own by calling it directly outside of any component",
      "Test the compiled output of the bundler to make sure it matches the source files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which function renders a component into a test document?",
    "topic": "React component testing",
    "choices": [
      "mount",
      "display",
      "create",
      "render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which query is preferred to find a button by its accessible name?",
    "topic": "React component testing",
    "choices": [
      "getByRole with the name option",
      "getByTestId with the button text",
      "querySelector with a class name",
      "getByClassName with the style name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between getBy and queryBy?",
    "topic": "React component testing",
    "choices": [
      "getBy returns null when nothing matches instead of throwing an error",
      "queryBy waits until the element appears and getBy does not wait",
      "queryBy returns null when nothing matches instead of throwing an error",
      "They are the same except that getBy only works with buttons"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function should you use to simulate a user typing and clicking realistically?",
    "topic": "React component testing",
    "choices": [
      "fireEvent only",
      "dispatch",
      "userEvent",
      "simulate"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which query waits for an element that appears after an asynchronous update?",
    "topic": "React component testing",
    "choices": [
      "findBy",
      "getBy",
      "queryBy",
      "hasBy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is getByTestId considered a last resort?",
    "topic": "React component testing",
    "choices": [
      "It is much slower than every other query because it scans the whole document tree",
      "It only works for elements created with a class component and not with hooks",
      "It is removed from the library in newer versions so tests with it no longer run",
      "It relies on an attribute that users cannot see, so it does not reflect how the UI is used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which matcher from jest-dom checks that an element is present in the document?",
    "topic": "React component testing",
    "choices": [
      "toExist",
      "toBeInTheDocument",
      "toBeRendered",
      "toBeVisibleOnPage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does screen.debug() help with?",
    "topic": "React component testing",
    "choices": [
      "Pauses the test and opens a browser window so you can click through the interface",
      "Prints the current DOM so you can see what the test is rendering",
      "Records a video of the test run and saves it in the project folder",
      "Shows the list of props that were passed to the root component of the test"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why wrap the component in a provider inside tests when it uses context?",
    "topic": "React component testing",
    "choices": [
      "The test runner refuses to render any component that is not wrapped in a provider",
      "Providers make the tests run in parallel on all the cores of the machine",
      "Providers replace the component with a simplified version suited for the test",
      "Without it the component would read the default value or fail, unlike in the real app"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is Playwright used for?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "End to end tests that drive a real browser through your app",
      "Unit tests of pure functions in a Node environment",
      "Checking the types of the code at build time",
      "Generating the documentation of your API routes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What makes an end to end test valuable?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "It checks one single function in isolation from all of the others",
      "It runs faster than any unit test that is part of the project",
      "It checks a whole flow, such as sign in and checkout, as a user would",
      "It needs no running server and no database in order to work"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why prefer role or label based locators in Playwright?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "They run faster than every other kind of locator that Playwright offers",
      "They are the only locators that work inside the Chromium browser",
      "They match how users find elements and survive markup changes",
      "They remove the need for a test server to be running during the test"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Playwright auto waiting do?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Waits for elements to be ready before it acts on them",
      "Waits a fixed ten seconds before each action",
      "Waits until the whole site has been deployed",
      "Waits for another test to finish before it starts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid fixed sleeps in end to end tests?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "They are not supported by any of the browsers that Playwright can drive",
      "They make the test run in a different browser than the one configured",
      "They increase the coverage of the test suite in a way that is misleading",
      "They slow tests down and still fail when the app is slower than expected"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you run end to end tests against your Next.js app in CI?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Run Playwright against the production site of a competitor",
      "Build and start the app, then run Playwright against its url",
      "Run Playwright without a server and mock every page",
      "Compile the tests into the Next.js build output"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good approach for the data used in end to end tests?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Use the production database, so that the test is as realistic as possible",
      "Use a separate test database, or seeded data that is reset between runs",
      "Use whatever data happens to be on the machine of the developer",
      "Create the data by hand before every run of the whole test suite"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you test signed in flows without logging in again in every test?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Skip authentication completely and test only the public pages of the app",
      "Put the password in the url of each page that the test opens",
      "Run every test inside one single long script that signs in once",
      "Save the signed in state once and reuse it across the tests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which browsers can Playwright drive?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Chromium, Firefox and WebKit",
      "Chromium only",
      "Firefox and Internet Explorer",
      "Safari on macOS only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What helps you debug a failing end to end test in CI?",
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "The size of the bundle that was built for the test",
      "The list of dependencies in the lock file",
      "Traces, screenshots and video that Playwright can record",
      "The number of lines that the test file contains"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you make a Jest test wait for an async function?",
    "topic": "Mocking and test data",
    "choices": [
      "Wrap the call in setTimeout with a delay that is long enough for the code to finish",
      "Call the function twice so the second call has the finished data from the first call",
      "Make the test function async and await the call, or return the promise",
      "Add the done keyword to the name of the test so Jest knows to wait for it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a mock function created with jest.fn used for?",
    "topic": "Mocking and test data",
    "choices": [
      "Record calls and control return values so you can check how code interacts with a dependency",
      "Replace the whole Jest runner so that tests run faster on a continuous integration server",
      "Generate random input data for a test so that edge cases are explored automatically",
      "Copy a real module from node_modules into the test folder so it can be edited safely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does jest.mock(\"./api\") do?",
    "topic": "Mocking and test data",
    "choices": [
      "Deletes the api file from the project after the test run completes successfully",
      "Creates a new api file with sample data that is written to the disk",
      "Disables the module for every other test file in the project as well",
      "Replaces the module with an automatic mock for the tests in that file"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why mock network calls in unit tests?",
    "topic": "Mocking and test data",
    "choices": [
      "The real network is not allowed by the browser when running inside a test environment",
      "Tests become fast and do not depend on a real server or the internet being available",
      "Real calls always return errors during a test because cookies are not available",
      "Mocking encrypts the requests so that secrets in them are not exposed in the logs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which matcher checks that a mock was called with specific arguments?",
    "topic": "Mocking and test data",
    "choices": [
      "toBeCalledOnly",
      "toHaveBeenCalledWith",
      "toHaveReturned",
      "toMatchCalls"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does jest.useFakeTimers do?",
    "topic": "Mocking and test data",
    "choices": [
      "Makes every timer in the program run faster so that test suites finish in less time",
      "Removes all timers from the code under test so that they never fire at all",
      "Replaces the system clock of the computer for every other program as well",
      "Lets tests control timers such as setTimeout so they can advance time without waiting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a common mistake when testing an async function without await?",
    "topic": "Mocking and test data",
    "choices": [
      "The test finishes before the promise settles, so failures may be missed",
      "The test runs twice because async functions are called again by Jest",
      "The function is mocked automatically which hides the real error from the test",
      "Jest throws an error as soon as it sees a promise in a test body"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you test that a promise rejects with an error?",
    "topic": "Mocking and test data",
    "choices": [
      "Wrap the call in an if statement that logs the error to the test output",
      "Call promise.catch with an empty function and look at the test result afterwards",
      "Use await expect(promise).rejects.toThrow()",
      "Use expect(promise).toBe(false) because rejected promises are falsy values"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why reset mocks between tests?",
    "topic": "Mocking and test data",
    "choices": [
      "Because mocks stop working after the first test and have to be created again",
      "Because the test runner deletes the module cache after every single test anyway",
      "So calls recorded in one test do not leak into the next one and cause confusing results",
      "Because each mock uses memory that is never freed unless it is reset by hand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between a mock and a spy?",
    "topic": "Mocking and test data",
    "choices": [
      "A spy wraps an existing function and can still call the original one",
      "A spy replaces the whole module while a mock only records the calls that were made",
      "A mock can only be used with promises while a spy only works with callbacks",
      "There is no difference because both names are used for exactly the same helper"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does code coverage measure?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "The share of tests that passed in the last run of the pipeline",
      "The number of bugs that the tests found in the last month of work",
      "The speed of the tests compared with the speed of the application",
      "The share of code lines or branches that run during the tests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does 100 percent coverage prove the code is correct?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "Yes, because every line has been run and so every bug has been found",
      "No, it shows code ran, not that the assertions checked the right behaviour",
      "Yes, but only when branch coverage and line coverage are both full",
      "No, because coverage reports are generated before the tests are finished"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Jest option collects coverage?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "--report",
      "--coverage",
      "--measure",
      "--lines"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is continuous integration?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "Deploying every change to production by hand at the end of the week",
      "Merging all branches into the main branch without any review step",
      "Writing tests only after the feature has been released to users",
      "Automatically building and testing the code on every push or pull request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a CI pipeline do when a test fails?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "Mark the run as failed so the change is blocked from being merged",
      "Ignore the failure and report success if the build step passed",
      "Delete the failing test so that the next run of the pipeline is green",
      "Retry the whole pipeline until the failing test happens to pass"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which file defines a GitHub Actions workflow?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "A JSON file in the root named actions.json",
      "A script called ci.sh in the src folder",
      "A YAML file in .github/workflows",
      "A package.json field named github"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why set a minimum coverage threshold in CI?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "To guarantee that no bugs remain in the code that has been merged",
      "To make the test run finish faster by skipping the covered files",
      "To stop the coverage from dropping unnoticed as the code grows",
      "To remove the need for code reviews on the pull requests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which trigger runs a workflow when a pull request is opened or updated?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "on pull_request",
      "on commit_message",
      "on build_complete",
      "on issue_closed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why run tests in a clean environment on CI?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "It makes the tests use more memory so that leaks are found sooner",
      "It lets the tests change the repository files without anyone noticing",
      "It removes the need to install dependencies before the tests run",
      "It shows the code works without hidden local settings or files from one machine"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a flaky test?",
    "topic": "Coverage and continuous testing",
    "choices": [
      "A test that always fails because the feature was never finished",
      "A test that sometimes passes and sometimes fails without any change to the code",
      "A test that runs slowly because it uses a large amount of sample data",
      "A test that is skipped by the runner because of a syntax mistake"
    ],
    "answerIdx": 1
  }
]
```

LAYER: fullstack-engineer-10

```json
[
  {
    "stem": "What is a GitHub Actions workflow?",
    "topic": "CI pipelines with GitHub Actions",
    "choices": [
      "A branch that is created automatically for every release of the application itself",
      "A tool that reviews the code of every pull request without any human help",
      "An automated process defined in YAML that runs jobs on events such as a push",
      "A service that hosts the application after it has been built successfully"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the usual order of steps in a CI job for a Node project?",
    "topic": "CI pipelines with GitHub Actions",
    "choices": [
      "Check out the code, install dependencies, run lint and tests, then build",
      "Build the app, deploy it, and then run the tests in production at the end",
      "Install the dependencies after the tests have been run on the code",
      "Run the tests on the code before it is checked out of the repository"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which step action fetches the repository code in a workflow?",
    "topic": "CI pipelines with GitHub Actions",
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
    "topic": "CI pipelines with GitHub Actions",
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
    "topic": "CI pipelines with GitHub Actions",
    "choices": [
      "Running several different jobs one after another in a fixed order",
      "Running the same job for several versions",
      "Splitting one test file across the cores of a single machine at once",
      "Deploying one build to several servers at the same moment of time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why cache dependencies in a CI workflow?",
    "topic": "CI pipelines with GitHub Actions",
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
    "topic": "CI pipelines with GitHub Actions",
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
    "topic": "CI pipelines with GitHub Actions",
    "choices": [
      "Every change waits for a manual approval, while delivery releases it automatically",
      "They mean the same thing, and only the names are different from each other",
      "Every passing change is released automatically",
      "Deployment applies only to databases, and delivery applies only to code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which event runs a workflow when code is pushed to the main branch?",
    "topic": "CI pipelines with GitHub Actions",
    "choices": [
      "on main_change with the push option",
      "on commit with the deploy option",
      "on push with the branch list set to main",
      "on release_branch with the main option, which watches release branches"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should workflow permissions follow least privilege?",
    "topic": "CI pipelines with GitHub Actions",
    "choices": [
      "A compromised step or dependency can then do less damage with the token",
      "Narrow permissions make every workflow run faster on GitHub",
      "The workflow cannot start unless all permissions are removed first",
      "Permissions only affect the name that is shown in the log"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which step builds a Docker image in a CI pipeline?",
    "topic": "Building and pushing images",
    "choices": [
      "docker run with the source code mounted as a volume",
      "docker pull of the latest image from the registry",
      "docker compose down for the old services",
      "docker build with a tag that identifies the commit or version"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why tag images with the commit hash or version number?",
    "topic": "Building and pushing images",
    "choices": [
      "Tags make the image smaller before it is pushed",
      "You can tell exactly which code is running and roll back to an earlier image",
      "Registries accept only images that have a commit hash",
      "The tag encrypts the image for the registry"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does docker push do?",
    "topic": "Building and pushing images",
    "choices": [
      "Starts the image as a container on the registry",
      "Uploads an image to a registry",
      "Copies the running container to another host",
      "Deletes the local image after the build"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a pipeline sign in to a private registry?",
    "topic": "Building and pushing images",
    "choices": [
      "With the password written inside the Dockerfile",
      "With a public token that is committed to the repository",
      "Without any credentials, since registries are always open to every pipeline",
      "With credentials stored as encrypted secrets of the CI system"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should be in the CI secrets for pushing an image?",
    "topic": "Building and pushing images",
    "choices": [
      "A registry user and token or a short lived credential, never the personal password",
      "The private source code of the project",
      "The database dump of production",
      "The image layers as plain text"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why build the image once and promote the same image through environments?",
    "topic": "Building and pushing images",
    "choices": [
      "Each environment needs a different image of the same code",
      "Builds must always be repeated on the production server",
      "The tested artifact is exactly what reaches production",
      "It makes the registry cheaper to run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of layer caching in CI?",
    "topic": "Building and pushing images",
    "choices": [
      "Layers are skipped so no code is built",
      "Caching is not possible in CI systems",
      "Builds are faster, because unchanged layers are reused from earlier runs",
      "The registry removes the layers automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can be scanned in an image before it is deployed?",
    "topic": "Building and pushing images",
    "choices": [
      "Known vulnerabilities in the base image and the packages",
      "The colour scheme of the application",
      "The names of the developers who built it",
      "The size of the git history"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good practice for the latest tag in a pipeline?",
    "topic": "Building and pushing images",
    "choices": [
      "Use only latest for every deploy and never a version tag",
      "Delete older tags after each push to save space",
      "Push latest to a public registry without checks",
      "Push immutable version tags, and use latest only as a convenience pointer"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file in a GitHub repository can define the build and push steps?",
    "topic": "Building and pushing images",
    "choices": [
      "The package.json file at the root",
      "A YAML workflow file under .github/workflows",
      "The Dockerfile of the application",
      "The README of the project"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the main difference between hosting a static site and a Node API?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "A static site needs a running process that listens, while an API needs only file hosting",
      "An API needs a running process that listens, while static files need only file hosting",
      "An API can only ever be hosted on the same server as its own database",
      "A static site must always be run inside a container before it can be served"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command do most platforms run to start an Express app?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "npm build, which launches the server after compiling",
      "node index.html, which runs the page in the runtime",
      "npm deploy, which every platform provides by default",
      "npm start, as defined in the scripts of package.json"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must the server read the port from process.env.PORT on platforms like Render or Railway?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "The platform assigns the port at runtime and routes traffic to it",
      "The platform blocks every port except the one named 3000 in the code",
      "The port is needed only for logging and has no effect on the routing",
      "Express chooses a random port unless the variable has been defined"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a health check endpoint?",
    "topic": "Deploying to a cloud host",
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
    "topic": "Deploying to a cloud host",
    "choices": [
      "They are kept forever and shared by every new instance of the service",
      "They are encrypted and moved to the database of the platform",
      "They are often lost, so uploads should go to external storage",
      "They are copied back to the repository by the platform automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can the first request to a free tier service be slow?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "The service may be put to sleep after inactivity and has to start again",
      "The free tier compresses each response very strongly in order to save bandwidth",
      "The platform checks the code for errors before each response is sent",
      "The database is rebuilt from scratch for every request made"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What must be allowed in the Atlas network access list for a cloud hosted API?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Only the address of the developer laptop where the code was written",
      "No address at all, because Atlas trusts every connection from any host out there",
      "The address of the front end, so the browser can reach the database",
      "The outbound addresses of the host, or a wider range if they are not fixed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should the API allow requests from the deployed front end?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "Disable the browser for the front end so that CORS is not enforced",
      "Configure CORS with the exact origin of the front end",
      "Add the origin to the package.json file of the front end project",
      "Send the front end code to the API so that it becomes the same origin"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a build command and a start command mean for a Node service?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "The start command prepares the code, and the build command runs the server",
      "The build prepares the code, and the start command runs the server",
      "Both commands do the same thing and only one of them has to be set",
      "The build command is used for the front end and never for any API"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why log to standard output on a cloud platform?",
    "topic": "Deploying to a cloud host",
    "choices": [
      "The platform deletes files created by the app so log files cannot be used",
      "Standard output is encrypted, which keeps the logs safe from other users",
      "Log files are not allowed in Node applications that run in production",
      "The platform collects the output and shows it as logs for the service"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should production use a different database from development?",
    "topic": "Managed databases and secrets",
    "choices": [
      "Tests and mistakes cannot damage real user data",
      "Development databases cannot be reached from production",
      "Production databases are always smaller and cheaper",
      "The framework needs two different databases to build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should you use to apply schema changes in production with Prisma?",
    "topic": "Managed databases and secrets",
    "choices": [
      "prisma migrate dev on the live database",
      "prisma db push with the production url on a laptop",
      "prisma migrate deploy, run as part of the release",
      "Editing the tables by hand in the database console"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use connection pooling with serverless functions?",
    "topic": "Managed databases and secrets",
    "choices": [
      "Pooling makes the queries return larger results than a direct connection does",
      "Pooling stores the results of the queries in the browser of each visitor",
      "Many short lived instances could otherwise open too many connections",
      "Serverless functions are not able to connect to a database without a pool"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice before a risky migration in production?",
    "topic": "Managed databases and secrets",
    "choices": [
      "Take a backup and test the migration on a copy of the data",
      "Run it on the live database and watch for errors",
      "Run it only at the busiest time of the day",
      "Skip the backup because migrations never lose data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you get the connection string for a managed database?",
    "topic": "Managed databases and secrets",
    "choices": [
      "From the public documentation that the vendor of the database publishes",
      "From the source code of another project that you built earlier",
      "From the url of the deployed site, in the query string of the home page",
      "From the dashboard of the provider, kept as an environment variable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are secrets set in the dashboard of the hosting platform and not committed?",
    "topic": "Managed databases and secrets",
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
    "topic": "Managed databases and secrets",
    "choices": [
      "Delete the commit and keep using the same key, since nobody can have seen it",
      "Rotate the key at once",
      "Rename the repository so that the key can no longer be found by anyone",
      "Add the key to the gitignore file so that it stays hidden from now on"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does a Vite environment variable get its value?",
    "topic": "Managed databases and secrets",
    "choices": [
      "At runtime, each time that the browser loads the page from the server",
      "When the user logs in and the server sends the value to the page",
      "When the hosting platform restarts the front end process",
      "At build time, when the bundler replaces the references in the code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can you not keep a secret in a front end environment variable?",
    "topic": "Managed databases and secrets",
    "choices": [
      "The value is bundled into files that every visitor can download and read",
      "The browser deletes environment variables when the page is closed",
      "Front end variables are limited to ten characters by the build tool",
      "Only the server of the host can read variables with a prefix"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of separate variable sets for staging and production?",
    "topic": "Managed databases and secrets",
    "choices": [
      "Make the staging site faster by using smaller keys than production uses",
      "Allow the same database to be used for both environments at once",
      "Test changes safely with different databases and keys than the real users have",
      "Remove the need for a development environment on the laptop of the developer"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do web analytics tell you about your app?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Why the code of the project compiles slowly on the machine of a developer",
      "Which of the dependencies of the project have known security problems",
      "How people use it, such as the pages they visit and where they leave",
      "Which of the tests of the project are failing in the pipeline right now"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between analytics and monitoring?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Analytics describes user behaviour, monitoring watches health and errors",
      "Analytics watches servers and monitoring watches user clicks",
      "They are the same thing under two different names",
      "Monitoring is done only in development, while analytics is used only in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which signals does error monitoring collect?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Only the number of visitors per day, grouped by country and by device",
      "The complete source code of the application, uploaded for later reading",
      "The passwords of the users who happened to hit an error on a page",
      "Exceptions with stack traces and the context in which they happened"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are Core Web Vitals?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Metrics for the number of lines of code in the repository of a project",
      "Metrics for loading, interactivity and the visual stability of pages",
      "Scores for the quality of a team that are given by the hosting platform",
      "Counts of the dependencies that an app uses and how old they are"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why monitor real user performance instead of only lab tests?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Lab tests cannot measure the speed of any page in any situation",
      "Real devices and networks differ from your machine and show real problems",
      "Real user data is always faster than the numbers from a lab test",
      "Monitoring replaces the need for any kind of performance work in the code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should an alert be based on?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Every single log line that the application writes while it is running",
      "The number of commits that were made to the repository in the last week",
      "The size of the repository on disk, compared with the previous release",
      "Symptoms that users feel, such as the error rate or slow responses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid logging personal data in analytics or logs?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "It creates privacy and legal risks, and many people can read logs",
      "Personal data makes the logs impossible to search with any tool",
      "Analytics tools refuse to accept any text longer than a few short words",
      "Logs cannot contain names or emails in any format, so they are rejected"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of structured logs?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Logs take up less disk space than plain text lines of the same content",
      "Logs are encrypted by default in the file where they are stored",
      "Fields can be searched and filtered easily across many entries",
      "Logs can be read only by the same tool that originally wrote them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a source map help with in production error reports?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "It makes the production bundle smaller on the server",
      "It hides the source of the code from the visitors",
      "It maps minified code back to the original files and lines",
      "It speeds up the build of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good first step after you notice a spike of errors after a deploy?",
    "topic": "Monitoring and logging in production",
    "choices": [
      "Check whether it began with the release, and roll back if the impact is high",
      "Wait for a week to see whether the problem goes away by itself",
      "Delete the monitoring tool so that the alerts stop coming in",
      "Add more features to the app to make up for the errors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a zero downtime deployment?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "Deploying a new version only at night when nobody uses it",
      "Stopping the old version and then starting the new one",
      "Deploying without any tests",
      "Releasing a new version without making the application unavailable to users"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a rolling deployment?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "All instances are stopped and replaced at the same moment",
      "Instances are replaced a few at a time",
      "A new copy of the database is created for each release",
      "The new version is released to one user only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a blue green deployment?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "Two versions that run on one server at the same moment",
      "Two identical environments, where traffic is switched from the old to the new one",
      "A deployment that uses only two servers",
      "A way of colouring the log output of the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a canary release?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "The new version is released to all users with no checks",
      "The new version is only released on weekends",
      "The old version is deleted before the new one starts",
      "The new version gets a small share of the traffic first, to detect problems early"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a health check important during a rolling deploy?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "The load balancer sends traffic only to instances that report that they are ready",
      "The health check makes the build run faster",
      "The platform needs the check to pull the image",
      "The check deletes failed instances"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the risk of database migrations during a zero downtime deploy?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "Migrations are not allowed during a deploy",
      "The database stops accepting connections for a day",
      "Old and new versions of the code run against the same schema at the same time",
      "Migrations delete the new code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a schema change stay compatible with the old code?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "Rename columns and deploy the code in one step",
      "Drop the old table before the code is released",
      "Make additive changes first, deploy the code, and remove old fields later",
      "Stop the old code before running the migration"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does graceful shutdown mean for a server process?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "It stops accepting new requests and finishes the ones in progress before exit",
      "It kills the process at once with no cleanup",
      "It restarts the host machine",
      "It deletes the logs of the process"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you roll back a bad release quickly?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "Fix the code on the server by hand while users are online",
      "Delete the database and restore it from scratch",
      "Wait until the problem goes away",
      "Redeploy the previous image or switch traffic back to the old environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep the previous version running until the new one is healthy?",
    "topic": "Zero-downtime deploy basics",
    "choices": [
      "It makes the new version start faster",
      "Users never see a gap, and you can switch back if the new version fails",
      "It reduces the size of the image",
      "It stops the load balancer from working"
    ],
    "answerIdx": 1
  }
]
```

