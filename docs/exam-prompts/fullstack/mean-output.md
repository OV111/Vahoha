LAYER: mean-1

```json
[
  {
    "stem": "Which keyword declares a variable that can be reassigned but is limited to its block?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "var",
      "const",
      "let",
      "static"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when you try to reassign a variable declared with const?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "A TypeError is thrown at runtime",
      "The new value is silently ignored",
      "The variable becomes undefined",
      "The program stops reading that file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does typeof null return in JavaScript?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "The string null",
      "The string undefined",
      "The string number",
      "The string object"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which expression evaluates to true?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "The strict comparison 0 === false, since both values are falsy in JavaScript",
      "The loose comparison 0 == false and the strict comparison 0 === 0",
      "The strict comparison null === undefined, since both mean the absence of a value",
      "The strict comparison NaN === NaN, since a value is always equal to itself"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the result of 0.1 + 0.2 in JavaScript?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "Exactly 0.3 because JavaScript numbers use exact decimal arithmetic internally",
      "A value slightly above 0.3 because of binary floating point rounding",
      "NaN because the two operands are not whole integers that can be added",
      "Exactly 0.30000 because JavaScript numbers keep only five digits after the point"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which is a falsy value in JavaScript?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "The string false",
      "An empty array",
      "The string 0",
      "An empty string"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a function declaration and a function expression?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "Declarations are hoisted with their body, while expressions exist only after they run",
      "Expressions are hoisted with their body, while declarations are not hoisted at all",
      "Declarations cannot take any parameters, while function expressions are allowed to",
      "Expressions always create a new global scope, while declarations share the local one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a function return when it has no return statement?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "null",
      "An empty string",
      "undefined",
      "The last evaluated expression"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the arrow function (a, b) => a + b return when called with 2 and 3?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "The string 23",
      "undefined",
      "5",
      "A new function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about var is correct?",
    "topic": "Variables, functions, and scope",
    "choices": [
      "It is function scoped and its declaration is hoisted to the top of the function",
      "It is block scoped and cannot be declared twice inside the same block",
      "It exists only in the global scope of the page and not inside functions",
      "It is not hoisted, so reading it before the declaration throws a ReferenceError"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does map do on an array?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "Changes the original array in place and returns undefined once it has finished",
      "Returns the first element for which the callback function returns a true value",
      "Returns a single value that is built from all of the elements in the array",
      "Returns a new array holding the result of calling the function on each element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does filter return?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "The first element that passes the test, or undefined when none of them does",
      "A new array with only the elements where the callback returns a truthy value",
      "The original array with the failing elements removed in place and no copy made",
      "A number that counts how many of the elements passed the test in the callback"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does reduce do with the callback (acc, x) => acc + x and the initial value 0 on [1, 2, 3]?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "Returns an array of 1, 3 and 6",
      "Returns 6",
      "Returns 3 because the last element is added to zero",
      "Returns 0 because the accumulator is not updated"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method returns the first element that satisfies a test, or undefined?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "filter",
      "some",
      "indexOf",
      "find"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does some return?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "true if at least one element passes the test",
      "The first element that passes the test",
      "A new array of passing elements",
      "true only if every element passes the test"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which array method changes the original array?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "map",
      "filter",
      "sort",
      "slice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does forEach return?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "A new array of the callback results",
      "The original array for chaining",
      "undefined",
      "The number of elements visited"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does arr.slice(1, 3) return for [10, 20, 30, 40]?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "The array [20, 30]",
      "The array [20, 30, 40]",
      "The array [10, 20, 30]",
      "The array [10, 40]"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the default behaviour of sort when called without a compare function?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "It sorts numbers from smallest to largest",
      "It sorts the elements in descending order",
      "It leaves the array in its original order",
      "It sorts elements as strings in ascending order"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does flatMap do?",
    "topic": "Arrays, objects, and iteration",
    "choices": [
      "Flattens an array of arrays by every nested level until none is left",
      "Maps each element, then flattens the result by one level",
      "Maps only the first element of each nested array that it finds inside",
      "Removes the undefined values from the array and then maps the remaining ones"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method returns the first element that matches a CSS selector?",
    "topic": "DOM and events",
    "choices": [
      "document.getElementsByTag",
      "document.querySelector",
      "document.findFirst",
      "document.selectOne"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between textContent and innerHTML when setting a value?",
    "topic": "DOM and events",
    "choices": [
      "textContent parses the string as markup, innerHTML inserts it as plain text",
      "They are identical except that innerHTML is slower on old browsers",
      "textContent can only read values and cannot be used to set them",
      "innerHTML parses the string as markup, textContent inserts it as plain text"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is setting innerHTML with untrusted user input dangerous?",
    "topic": "DOM and events",
    "choices": [
      "It can run attacker supplied markup or scripts and lead to cross site scripting",
      "It permanently deletes the stylesheet that belongs to the element",
      "It prevents the browser from rendering the rest of the page",
      "It causes the element to lose all of its event listeners and attributes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does addEventListener do?",
    "topic": "DOM and events",
    "choices": [
      "Creates a new DOM element that dispatches the named event when it is clicked",
      "Removes every other handler that was already attached to that same element",
      "Registers a function to run each time the event happens on the element",
      "Runs the given function a single time once the whole page finishes loading"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does event.preventDefault() do in a form submit handler?",
    "topic": "DOM and events",
    "choices": [
      "Stops the event from reaching any parent element further up in the DOM tree",
      "Removes the handler from the element so that it can never run again after that",
      "Stops the default browser action, such as reloading the page",
      "Cancels all of the network requests that the page has already started sending"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is event bubbling?",
    "topic": "DOM and events",
    "choices": [
      "The event travels from the target element up through its ancestors",
      "The event is sent to every element on the page at the same moment",
      "The event travels from the document root down to the target element",
      "The event repeats until a handler returns a value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is event delegation?",
    "topic": "DOM and events",
    "choices": [
      "Attaching a separate listener to every child so that events never reach the parent",
      "Moving every handler into one global function that the browser then calls itself",
      "Replacing events with callbacks that are run after the parent has finished loading",
      "Attaching one listener to a parent and reading event.target for the child"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method adds a new element to the page after it has been created with document.createElement?",
    "topic": "DOM and events",
    "choices": [
      "parent.write(element)",
      "parent.appendChild(element)",
      "document.insert(element)",
      "parent.render(element)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does event.stopPropagation() do?",
    "topic": "DOM and events",
    "choices": [
      "Stops the browser from performing the default action for the event",
      "Stops the event from continuing to bubble up to ancestor handlers",
      "Stops all other listeners on the same element from running",
      "Removes the event listener after it has run once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you add or remove a CSS class on an element using JavaScript?",
    "topic": "DOM and events",
    "choices": [
      "Using element.style.class with a string of class names",
      "Using element.setClass and element.unsetClass",
      "Using document.styles.update with the selector string",
      "Using element.classList.add and element.classList.remove"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are the three states of a Promise?",
    "topic": "Promises and async/await",
    "choices": [
      "Pending, fulfilled and rejected",
      "Waiting, running and finished",
      "Created, resolved and closed",
      "Idle, active and failed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the await keyword do inside an async function?",
    "topic": "Promises and async/await",
    "choices": [
      "Blocks the whole program including other tasks until the promise settles",
      "Turns a regular value into a promise that never resolves",
      "Pauses that function until the promise settles and then gives its value",
      "Runs the promise on a separate operating system thread"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an async function always return?",
    "topic": "Promises and async/await",
    "choices": [
      "The value written after return",
      "undefined unless await is used",
      "A promise",
      "A callback function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you handle a rejected promise when using await?",
    "topic": "Promises and async/await",
    "choices": [
      "Wrap the await in a try and catch block",
      "Add a finally block with no other code",
      "Call await twice so the second call catches the error",
      "Nothing is needed because await ignores rejections"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Promise.all do if one of the promises rejects?",
    "topic": "Promises and async/await",
    "choices": [
      "The returned promise waits for all others and resolves with an array of errors",
      "The returned promise ignores the rejected one and resolves with the others",
      "The returned promise stays pending until the rejected promise is retried",
      "The returned promise rejects with that error right away"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Promise.allSettled return?",
    "topic": "Promises and async/await",
    "choices": [
      "A promise that rejects as soon as any single one of the input promises fails",
      "A promise that resolves with the outcome of every input, success or failure",
      "A promise that resolves with the result of the fastest input promise only",
      "An array holding only the rejected promises, with the successful ones removed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Promise.race resolve or reject with?",
    "topic": "Promises and async/await",
    "choices": [
      "The results of all promises that succeeded",
      "The result of the first promise that settles",
      "The result of the last promise to settle",
      "The first successfully fulfilled value, ignoring rejections"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the problem with the code: for each item in items, await fetch(item) inside a loop, when the requests are independent?",
    "topic": "Promises and async/await",
    "choices": [
      "The loop runs requests in parallel and may overload the server",
      "The await keyword is not allowed inside any loop",
      "The fetch calls always fail because the loop does not return a value",
      "Requests run one after another, which is slower than running them in parallel"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is returned by .then(fn) on a promise?",
    "topic": "Promises and async/await",
    "choices": [
      "A new promise that resolves with the value returned by fn",
      "The same promise object so calls can be repeated",
      "The value that the original promise resolved with",
      "undefined, so then cannot be chained"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to an error thrown inside a .then callback?",
    "topic": "Promises and async/await",
    "choices": [
      "It is thrown synchronously to the caller of then",
      "It is ignored if no catch is attached anywhere",
      "It rejects the promise returned by that .then call",
      "It stops the event loop of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the destructuring statement const { name, age } = user do?",
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
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
    "topic": "ES modules",
    "choices": [
      "All the passed arguments into a real array called nums",
      "Only the last argument that was passed in the call",
      "The arguments into an object keyed by position",
      "Arguments after the first one, leaving the first inside the arguments object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the viewport meta tag with width set to device-width do on mobile?",
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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
    "topic": "Responsive layout basics",
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

LAYER: mean-2

```json
[
  {
    "stem": "What does TypeScript add to JavaScript?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "A new runtime that replaces the JavaScript engine of the browser and runs faster",
      "Extra syntax that the browser understands natively without any build step at all",
      "Static types that are checked at compile time and then removed from the output",
      "A set of components that handle state for React applications out of the box"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between an interface and a type alias for an object shape?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "Interfaces can be extended and merged by declaration, aliases can also name unions",
      "Interfaces exist at runtime and can be checked with instanceof, while aliases cannot be",
      "Aliases can only describe primitive types, while interfaces can describe whole objects",
      "Interfaces are required for React props, and aliases are only for functions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the type string | undefined mean?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "The value is a string that was converted to undefined",
      "The value must be both a string and undefined together",
      "The value is a string that may be empty but never undefined",
      "The value is either a string or undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the unknown type require before you use a value of it?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "Nothing at all, because unknown behaves exactly like the any type does in every case",
      "A check or narrowing, such as typeof, so the compiler knows the real type",
      "A cast to any first, since unknown values cannot be narrowed by any kind of check",
      "A declaration of the value with const so that its type cannot change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a generic such as Array<T> let you do?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "Store values of any type in the same array without checking any of them first",
      "Write code that works with many types while keeping the type information",
      "Convert the items of the array to strings before they are stored in it",
      "Make the array immutable so that its elements can never be changed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the optional property syntax name?: string mean in an interface?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "The property must exist and must always be an empty string",
      "The property is a string that is removed during compilation",
      "The property is private and cannot be read from outside the object",
      "The property may be missing, and if it exists it must be a string"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the as const assertion do on an object literal?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "Makes its properties readonly and narrows values to literal types",
      "Converts the object into a class that has constant methods only",
      "Freezes the object at runtime so that it cannot be changed by code",
      "Casts the object to the any type so that all of the errors are hidden"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a discriminated union?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "A union of two primitive types that is written with the pipe symbol between them in code",
      "A union whose members are all optional properties of one single interface of the app",
      "A union of object types that share a literal field used to tell them apart",
      "A union that the compiler converts into one single object type at build time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "A type with only the first property of User kept",
      "A type that excludes the properties which are optional in User",
      "A type with all the properties of User made optional",
      "A type where every property of User is turned into a string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is the any type usually discouraged?",
    "topic": "Types, interfaces, and enums",
    "choices": [
      "It turns off type checking for that value and lets mistakes through silently",
      "It is slower at runtime than every other type that the language has",
      "It cannot be used together with interfaces or with generic types",
      "It makes the compiled JavaScript output larger than it needs to be"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the private modifier do on a class property?",
    "topic": "Classes and access modifiers",
    "choices": [
      "The property can be read by any code but changed only inside the class",
      "The property is removed from the compiled JavaScript output",
      "The property is shared by all instances of the class like a static field",
      "The property can be used only inside the class that declares it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the protected modifier allow?",
    "topic": "Classes and access modifiers",
    "choices": [
      "Access from any file that is in the same folder as the class",
      "Access from the class itself and from classes that extend it",
      "Access only from the constructor of the class and from nowhere else",
      "Access from code that is running in the same browser tab at once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the readonly modifier do to a property?",
    "topic": "Classes and access modifiers",
    "choices": [
      "It hides the property from the debugger of the browser",
      "It can be assigned once, in the declaration or the constructor, and not changed afterwards",
      "It makes the property available only for reading in other classes and writing in the class",
      "It freezes the value at runtime so that no code can change it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a constructor parameter property, as in constructor(private http: HttpClient), do?",
    "topic": "Classes and access modifiers",
    "choices": [
      "Passes the value to the parent class constructor only",
      "Creates a global variable that every class can read",
      "Copies the value into a static field of the class",
      "Declares and assigns a class property in one step"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a class and an interface in TypeScript?",
    "topic": "Classes and access modifiers",
    "choices": [
      "An interface exists only at compile time, while a class also exists at runtime",
      "An interface can be instantiated with new, while a class cannot be",
      "A class exists only at compile time, while an interface exists at runtime",
      "They are two names for the same construct in two different versions"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the implements keyword do?",
    "topic": "Classes and access modifiers",
    "choices": [
      "The class inherits all of the methods of the interface at runtime",
      "The class copies the properties of the interface into itself",
      "The class promises to follow the shape of an interface and the compiler checks it",
      "The class becomes an interface that other classes can extend"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an abstract class provide?",
    "topic": "Classes and access modifiers",
    "choices": [
      "A class whose methods are all private and cannot be called",
      "A class that is created automatically by the compiler",
      "A base class that cannot be created directly and may leave methods for subclasses",
      "A class that can only contain static members"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the static keyword mean on a class member?",
    "topic": "Classes and access modifiers",
    "choices": [
      "It belongs to the class itself and not to each instance",
      "It cannot be changed after the class is declared",
      "It is created again for each instance of the class",
      "It is available only inside the constructor of the class"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you call the constructor of the parent class from a subclass?",
    "topic": "Classes and access modifiers",
    "choices": [
      "parent(...) at the end of the constructor",
      "base(...) inside any method of the class",
      "this.super(...) after the properties are set",
      "super(...) before using this"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is the public modifier rarely written out?",
    "topic": "Classes and access modifiers",
    "choices": [
      "Public members are not supported by the compiler",
      "Members are public by default in TypeScript",
      "The compiler adds it back automatically at runtime",
      "Public members are slower than members that have no modifier"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a generic function such as function first<T>(items: T[]): T allow?",
    "topic": "Generics",
    "choices": [
      "It accepts only arrays of numbers and returns a number",
      "It works with arrays of any type and keeps the element type in the result",
      "It converts every array into an array of strings",
      "It removes the need to declare the type of the parameter"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does T stand for in a generic declaration?",
    "topic": "Generics",
    "choices": [
      "The name of a class that has to be imported from a library",
      "A runtime value that is passed as the first argument",
      "A keyword that makes the type read only",
      "A type parameter that is filled in when the function or class is used"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a generic constraint, written T extends HasId?",
    "topic": "Generics",
    "choices": [
      "It limits the allowed types to those that have the shape of HasId",
      "It makes T inherit the methods of HasId at runtime",
      "It creates a copy of HasId for each use of T",
      "It forces T to be a class and never an interface"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Angular use generics in HttpClient, as in http.get<User[]>(url)?",
    "topic": "Generics",
    "choices": [
      "It validates the response against the User type at runtime for you",
      "It converts the response into real class instances of the User type",
      "It types the value of the response, without checking it at runtime",
      "It selects the correct url for the request from the type given"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Array<string> mean?",
    "topic": "Generics",
    "choices": [
      "An array that has exactly one string element",
      "A function that returns a string from an array",
      "An array whose elements are all strings",
      "A tuple of strings with a fixed length"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a default type parameter, as in interface Box<T = string>?",
    "topic": "Generics",
    "choices": [
      "The type used when none is given for T",
      "A constraint that T must always be a string",
      "A runtime default value for the box content",
      "A rule that makes T optional in every use"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are generics preferred to the any type?",
    "topic": "Generics",
    "choices": [
      "They make the code run faster than code with any",
      "They are required by Angular for every service",
      "They remove the need for types in the rest of the code",
      "They keep type information, so errors are caught at compile time"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Observable<User> describe in Angular code?",
    "topic": "Generics",
    "choices": [
      "A stream that emits the string User every time",
      "A stream whose emitted values have the type User",
      "A function that creates a User when it is called",
      "A class that inherits from User"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a class be generic?",
    "topic": "Generics",
    "choices": [
      "No, only functions can have type parameters",
      "Yes, for example class Repo<T> that works with any entity type",
      "Yes, but only when it extends another generic class",
      "No, because classes exist at runtime and types do not"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the utility type Partial<User> produce?",
    "topic": "Generics",
    "choices": [
      "A type that keeps only the first property of User",
      "A type that removes optional properties from User",
      "A type that makes every property of User a string",
      "A type where every property of User is optional"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a decorator in TypeScript?",
    "topic": "Decorators",
    "choices": [
      "A function that adds metadata or behaviour to a class or member, written with the @ symbol",
      "A comment that tells the compiler to skip the next line",
      "A keyword that makes a class final and sealed",
      "A type that describes the shape of a function"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the @Component decorator do in Angular?",
    "topic": "Decorators",
    "choices": [
      "Creates a new HTML page for the class that follows it",
      "Registers the class as a route in the router",
      "Marks a class as a component and gives Angular its selector and template",
      "Turns the class into a service that is shared by all components"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does @Injectable() tell Angular?",
    "topic": "Decorators",
    "choices": [
      "The class must be created manually with the new keyword",
      "The class cannot have a constructor",
      "The class can take part in dependency injection",
      "The class renders a template in the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the @Input() decorator mark?",
    "topic": "Decorators",
    "choices": [
      "A property that receives data from the parent component",
      "A property that sends events up to the parent component of the page",
      "A property that is stored in the local storage of the browser",
      "A property that can be read only after the constructor has run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the @Output() decorator usually pair with?",
    "topic": "Decorators",
    "choices": [
      "A pipe that formats the value of the property before it is shown in the template",
      "A service that is created again for each component that uses the property",
      "A route that is protected by a guard so that visitors cannot open it",
      "An EventEmitter that sends events to the parent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the @NgModule decorator describe in classic Angular apps?",
    "topic": "Decorators",
    "choices": [
      "A single route of the router",
      "A module that declares components and imports other modules",
      "A pipe that formats dates",
      "A service that stores state"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does Angular rely on decorators?",
    "topic": "Decorators",
    "choices": [
      "Decorators make the code run faster than plain classes",
      "They attach the metadata that the framework reads to create and wire classes",
      "Decorators are required by the JavaScript language itself",
      "Decorators replace the need for a build step"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What setting enables the use of decorators in older TypeScript setups?",
    "topic": "Decorators",
    "choices": [
      "strictDecorators in package.json",
      "enableDecorators in angular.json",
      "decorators set to true in the environment file",
      "experimentalDecorators in tsconfig"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @HostListener do?",
    "topic": "Decorators",
    "choices": [
      "Listens to events of the host element or the window from inside a directive",
      "Hosts a server that the component can call",
      "Registers a listener on the database",
      "Lists all hosts that the app can reach"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a property decorator?",
    "topic": "Decorators",
    "choices": [
      "A decorator that sets the value of the property to a constant value",
      "A decorator that deletes the property from the object at runtime",
      "A decorator applied to a class property to add metadata about it",
      "A decorator that makes the property private to the class it is in"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does import { Component } from \"@angular/core\" do?",
    "topic": "Modules and imports",
    "choices": [
      "Copies the Angular package into the project folder",
      "Executes the whole Angular library at that line",
      "Brings the named export Component from that package into the file",
      "Declares a new component with the name Component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between a named export and a default export?",
    "topic": "Modules and imports",
    "choices": [
      "A module can have many named exports but only one default export",
      "A module can have many default exports but only one named export",
      "Named exports can only be classes and default exports only functions",
      "Default exports are loaded lazily and named exports are loaded at start"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does export class AppComponent {} do?",
    "topic": "Modules and imports",
    "choices": [
      "Runs the class when the file is loaded",
      "Creates a global variable named AppComponent",
      "Registers the class as an Angular route",
      "Makes the class available to other files that import it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a barrel file, often called index.ts?",
    "topic": "Modules and imports",
    "choices": [
      "A file that stores all of the environment variables of the project",
      "A file that re-exports other modules so imports are shorter",
      "A file that compiles the whole project into one single bundle",
      "A file that lists the routes of the app in the order of the menu"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a relative import such as ./user.service refer to?",
    "topic": "Modules and imports",
    "choices": [
      "A package that is installed in the node_modules folder of the project",
      "A file in the same folder as the current file",
      "A file that sits in the root folder of the project itself",
      "A file that is loaded from the network each time it is imported"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a path alias in tsconfig, such as @app/*?",
    "topic": "Modules and imports",
    "choices": [
      "A rule that renames files during the build",
      "A command that copies files into the dist folder",
      "A way to import files from other projects over the network",
      "A shorter name that maps to a folder, which avoids long relative paths"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does import type { User } from \"./user\" do?",
    "topic": "Modules and imports",
    "choices": [
      "Imports only the type, which is removed from the compiled output",
      "Imports the User class and creates one instance of it",
      "Imports the whole file and runs its code twice",
      "Imports the type and keeps it at runtime for checks"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a circular import?",
    "topic": "Modules and imports",
    "choices": [
      "A module imports itself by mistake in a loop",
      "A module imports every other module of the project",
      "Two modules import each other, which can lead to undefined values at runtime",
      "A module that is imported by more than two files"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can lazy loading be done with a dynamic import?",
    "topic": "Modules and imports",
    "choices": [
      "Write the import at the bottom of the file after the export",
      "Add the word lazy before the import statement",
      "Call import(\"./feature\") when the code is needed, which returns a promise",
      "Place the import in the tsconfig file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are imports in TypeScript checked by the compiler?",
    "topic": "Modules and imports",
    "choices": [
      "It verifies that the imported names exist and have the right types",
      "It downloads the imported files from the internet",
      "It converts the imports into HTML tags",
      "It sorts the imports alphabetically for every file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the tsconfig.json file do in a TypeScript project?",
    "topic": "tsconfig essentials",
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
    "topic": "tsconfig essentials",
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
    "topic": "tsconfig essentials",
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
    "topic": "tsconfig essentials",
    "choices": [
      "The folder from which the compiler reads the TypeScript sources of the project",
      "The folder in which the type declaration files are searched for by the editor",
      "The folder where the compiler stores its cache between runs",
      "The folder in which the compiler writes the generated JavaScript"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the module option decide?",
    "topic": "tsconfig essentials",
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
    "topic": "tsconfig essentials",
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
    "topic": "tsconfig essentials",
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
    "topic": "tsconfig essentials",
    "choices": [
      "Describing the types of JavaScript code so that TypeScript can check it",
      "Storing the compiled JavaScript output that is shipped to production later on",
      "Declaring the environment variables that the application reads at runtime",
      "Listing the files that the compiler should leave out of the build output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the include option in tsconfig list?",
    "topic": "tsconfig essentials",
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
    "topic": "tsconfig essentials",
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

LAYER: mean-3

```json
[
  {
    "stem": "What is an Angular component?",
    "topic": "Components and templates",
    "choices": [
      "A function that sends requests to the server of the application and returns data",
      "A file that lists all of the routes of the application in one place",
      "A class with a template that controls one part of the screen",
      "A database model that is rendered as a list of rows in a table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the selector of a component define?",
    "topic": "Components and templates",
    "choices": [
      "The custom HTML tag or attribute that places the component in a template",
      "The url at which the component is served by the router",
      "The name of the CSS class that styles the component",
      "The folder in which the component files are stored"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where does the HTML of a component live?",
    "topic": "Components and templates",
    "choices": [
      "In the main.ts file that bootstraps the application",
      "In the angular.json file of the project",
      "In the service that the component injects",
      "In its template, inline or in a separate html file"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a standalone component do compared with a module based one?",
    "topic": "Components and templates",
    "choices": [
      "It runs on the server only and can never be rendered in the browser",
      "It declares its own imports and needs no NgModule to be used",
      "It cannot use any other component or directive inside of its own template",
      "It is loaded again from the network each time that it is shown"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How is a component created in a project with the CLI?",
    "topic": "Components and templates",
    "choices": [
      "ng create view name, which adds a view to the current project",
      "ng generate component name",
      "npm run component name, which runs a script of the package file",
      "ng build component name, which compiles one component into a bundle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the styles or styleUrl property of a component do?",
    "topic": "Components and templates",
    "choices": [
      "Applies the CSS to every component of the application, not only to this one",
      "Loads the stylesheet from the network at runtime each time it is shown",
      "Replaces the template of the component with the rules of the stylesheet",
      "Applies CSS that is scoped to that component by default"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does bootstrapApplication do?",
    "topic": "Components and templates",
    "choices": [
      "Starts the app by rendering the root component in the page",
      "Builds the app for production and uploads the result to a hosting server",
      "Creates a brand new project folder from a template of the CLI",
      "Runs all of the unit tests of the project and reports the result"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where is the root component placed in the page?",
    "topic": "Components and templates",
    "choices": [
      "In the angular.json file of the workspace, under the list of projects",
      "In the package.json file of the project, as the main entry point",
      "In index.html, through its selector such as app-root",
      "In the environment files of the app, next to the API url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are components kept small and focused?",
    "topic": "Components and templates",
    "choices": [
      "Angular refuses to render a component that has many lines",
      "Small components run faster than any large component",
      "They are easier to read, test and reuse in several places",
      "Each template can contain only one element"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the role of the template in the MVC like structure of Angular?",
    "topic": "Components and templates",
    "choices": [
      "It describes the view and binds it to the data of the class",
      "It stores the data that the user enters into forms for later use",
      "It decides which of the servers will answer the requests of the app",
      "It compiles the TypeScript code of the component into JavaScript output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does interpolation with double curly braces do, as in {{ title }}?",
    "topic": "Data binding and directives",
    "choices": [
      "Creates a new variable named title in the template",
      "Sends the value of title to the server",
      "Runs the code of title only once at build time",
      "Shows the value of an expression from the component in the template"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does property binding with [src]=\"imageUrl\" do?",
    "topic": "Data binding and directives",
    "choices": [
      "Listens to changes of the src attribute that happen on the element",
      "Sets the property of the element to the value of the expression",
      "Copies the attribute of the element into a property of the component",
      "Sends the url to the server before the page has finished loading"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does event binding with (click)=\"save()\" do?",
    "topic": "Data binding and directives",
    "choices": [
      "Saves the element to the page at the moment that it is created",
      "Calls the method of the component when the event happens",
      "Creates a brand new click event every time that the page is loaded",
      "Disables all of the click events that the element could receive"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does two way binding with [(ngModel)] combine?",
    "topic": "Data binding and directives",
    "choices": [
      "Two different services that share the same state between components",
      "Two components that are rendered at the same time in the page",
      "A query and a mutation that run together on the server",
      "Property binding and event binding, so the value stays in sync in both directions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which module or import is needed for ngModel to work?",
    "topic": "Data binding and directives",
    "choices": [
      "FormsModule",
      "HttpClientModule",
      "RouterModule",
      "BrowserModule only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the @if block, or *ngIf, do?",
    "topic": "Data binding and directives",
    "choices": [
      "Hides an element with CSS while it stays inside of the DOM",
      "Runs a function once at the moment when the template is created",
      "Adds or removes part of the DOM depending on a condition",
      "Checks the type of a variable at compile time of the template"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the @for block, or *ngFor, do?",
    "topic": "Data binding and directives",
    "choices": [
      "Loops over the files of the project at build time to find components",
      "Repeats the whole component a fixed number of times in the page",
      "Repeats part of the template for each item of a collection",
      "Sorts the items of a list alphabetically inside of the template"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should a track expression be given in an @for block?",
    "topic": "Data binding and directives",
    "choices": [
      "Angular can match items between changes and reuse the DOM nodes",
      "The compiler refuses to build a loop without one",
      "It sorts the items alphabetically for display",
      "It limits the loop to the first ten items"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an attribute directive such as ngClass used for?",
    "topic": "Data binding and directives",
    "choices": [
      "Creating a new element in the template",
      "Defining a new route in the router",
      "Declaring a service for dependency injection",
      "Changing the appearance or behaviour of an existing element"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a structural directive?",
    "topic": "Data binding and directives",
    "choices": [
      "A directive that changes only the colour of an element in the page",
      "A directive that changes the structure of the DOM by adding or removing elements",
      "A directive that defines the folders of the project and their names",
      "A directive that creates a new module for the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is dependency injection?",
    "topic": "Services and dependency injection",
    "choices": [
      "A way of copying one class into another at build time",
      "A pattern where a class receives the objects it needs instead of creating them",
      "A way of importing styles into a component",
      "A pattern that stores every object in a global variable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a component ask for a service in modern Angular?",
    "topic": "Services and dependency injection",
    "choices": [
      "By creating it with the new keyword inside of the template of the component",
      "By importing it in the index.html file with a script tag",
      "By reading it from the window object of the browser at runtime",
      "By declaring it in the constructor or with the inject function"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @Injectable({ providedIn: \"root\" }) do?",
    "topic": "Services and dependency injection",
    "choices": [
      "Registers a single shared instance of the service for the whole app",
      "Creates a new instance of the service for each component that asks for it",
      "Makes the service available only inside of the root component of the app",
      "Loads the service only after the router has been used for the first time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why put data fetching in a service and not in a component?",
    "topic": "Services and dependency injection",
    "choices": [
      "Components are not allowed to call HTTP at all in Angular apps",
      "Services run faster than components because they have no template",
      "Services can be shared and tested, and components stay focused on the view",
      "Services are required in order to use the router of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of injecting a service into several components?",
    "topic": "Services and dependency injection",
    "choices": [
      "Each component receives its own private copy of the data",
      "The service is deleted after the first component uses it",
      "They can share state and logic through the same instance",
      "The components are merged into one at build time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a provider in Angular?",
    "topic": "Services and dependency injection",
    "choices": [
      "An instruction that tells the injector how to create a dependency",
      "A server that provides the data for the whole application",
      "A component that renders the layout of a page of the app",
      "A route that lists the services which are available to a page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the hierarchical injector?",
    "topic": "Services and dependency injection",
    "choices": [
      "One global injector that answers all of the requests for services",
      "An injector that is created only for the router of the app",
      "An injector that works only for services that have no decorators",
      "Injectors form a tree, and a request is answered by the nearest provider up the tree"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you provide a different implementation of a service in tests?",
    "topic": "Services and dependency injection",
    "choices": [
      "Edit the source of the real service again for each of the tests",
      "Provide a mock under the same token in the testing module",
      "Avoid dependency injection in the tests and call the code directly",
      "Delete the real service before the tests are run by the runner"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a service is provided in the providers of a component?",
    "topic": "Services and dependency injection",
    "choices": [
      "The service is shared by every component of the whole app at once",
      "Each instance of that component gets its own service instance",
      "The service is created when the application starts and not before",
      "The service cannot be injected into any other class of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an injection token used for?",
    "topic": "Services and dependency injection",
    "choices": [
      "Storing the login token of the user so that it survives a reload",
      "Encrypting the services of the app before they are created",
      "Naming a route in the router so that it can be found again",
      "Identifying a dependency that is not a class, such as a config value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Angular router do?",
    "topic": "The Angular router",
    "choices": [
      "Maps urls to components and shows the matching one in the page",
      "Sends requests to the API of the app and caches the answers",
      "Compiles the templates of the app into JavaScript at build time",
      "Stores the state of the forms that are shown on the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which directive marks where the routed component is rendered?",
    "topic": "The Angular router",
    "choices": [
      "router-link",
      "router-view",
      "router-outlet",
      "router-path"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which directive creates a navigation link that does not reload the page?",
    "topic": "The Angular router",
    "choices": [
      "href with the full url",
      "navigateTo",
      "routerLink",
      "linkPath"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you declare a route with a parameter such as the id of a user?",
    "topic": "The Angular router",
    "choices": [
      "path: \"users/:id\"",
      "path: \"users?id\"",
      "path: \"users#id\"",
      "path: \"users/{id}\" with braces"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a component read the route parameter?",
    "topic": "The Angular router",
    "choices": [
      "From the window location, by using a regular expression on the url",
      "From a global variable that the router sets before each navigation",
      "From the constructor of the module that declares the component",
      "From ActivatedRoute, through paramMap or the withComponentInputBinding option"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a wildcard route with path \"**\" usually show?",
    "topic": "The Angular router",
    "choices": [
      "The home page, which is shown for every request of the visitor",
      "A not found page for urls that match no other route",
      "A redirect to the login page of the application for each visitor",
      "The first child route that is declared in the route table"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you navigate from code?",
    "topic": "The Angular router",
    "choices": [
      "Assign a new value to window.location.hash",
      "Call navigate on the Router service",
      "Call history.push on the component",
      "Return a link from the method"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are child routes used for?",
    "topic": "The Angular router",
    "choices": [
      "Creating two separate copies of the same page in the application",
      "Loading the same route twice, so that it is cached for later",
      "Passing data from the child component back up to the parent",
      "Nesting views inside a parent component with its own router outlet"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does lazy loading a route do?",
    "topic": "The Angular router",
    "choices": [
      "Loads the code of a route only when the user visits it",
      "Loads all of the routes at once when the app starts up",
      "Delays the display of the page by a fixed amount of time",
      "Loads the code of the route from another server on the network"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the redirectTo property of a route do?",
    "topic": "The Angular router",
    "choices": [
      "Reloads the page after any change that is made to the code",
      "Redirects all of the API calls to a different server in the cloud",
      "Sends the visitor from one path to another path",
      "Removes the route from the router for the rest of the session"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a pipe do in a template?",
    "topic": "Pipes",
    "choices": [
      "Sends a value from one component to another",
      "Connects a component to a service",
      "Transforms a value for display, such as formatting a date",
      "Compiles the template to JavaScript"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you apply a pipe in a template?",
    "topic": "Pipes",
    "choices": [
      "With the pipe symbol, such as {{ price | currency }}",
      "With square brackets around the value, such as [price currency]",
      "With parentheses around the value, such as (price currency)",
      "With a dollar sign in front of it, such as ${price currency}"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which built in pipe formats a date?",
    "topic": "Pipes",
    "choices": [
      "datetime",
      "format",
      "time",
      "date"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the async pipe do?",
    "topic": "Pipes",
    "choices": [
      "Delays the display of a value by one second before it is shown",
      "Subscribes to an observable or promise and shows its latest value",
      "Runs a function on a separate thread of the processor",
      "Converts a number to a string so that it can be displayed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is the async pipe convenient with observables?",
    "topic": "Pipes",
    "choices": [
      "It caches the data in the local storage of the browser",
      "It unsubscribes automatically when the component is destroyed",
      "It converts observables into arrays so that they can be looped",
      "It makes the observable emit its values faster than before"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you create a custom pipe?",
    "topic": "Pipes",
    "choices": [
      "A function that is added to the providers of the module for use",
      "A directive that formats the text of an element in the template",
      "A service with a method that is named format and is injected",
      "A class with the @Pipe decorator and a transform method"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a pure and an impure pipe?",
    "topic": "Pipes",
    "choices": [
      "A pure pipe runs again only when its input changes, an impure one on every change detection",
      "A pure pipe works with text only, while an impure pipe works with numbers",
      "An impure pipe cannot take any parameters, while a pure pipe can",
      "A pure pipe runs on the server, while an impure one runs in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why prefer a pipe to calling a method in the template?",
    "topic": "Pipes",
    "choices": [
      "Pipes are the only way to format text in an Angular application",
      "Methods cannot be used inside of a template expression at all",
      "The pipe result is cached for the same input, while a method runs on every change detection",
      "Pipes run on the server before the page is sent to the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the uppercase pipe do to a string?",
    "topic": "Pipes",
    "choices": [
      "Changes the stored value in the component class",
      "Sends it to the server in upper case",
      "Converts it to upper case for display only",
      "Sorts the characters of the string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a pipe take arguments?",
    "topic": "Pipes",
    "choices": [
      "After a colon, such as {{ value | slice:0:5 }}",
      "Inside of curly braces that come directly after the name of the pipe",
      "As attributes that are written on the element that the pipe formats",
      "With a second pipe symbol that is written after the value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a lifecycle hook?",
    "topic": "Lifecycle hooks",
    "choices": [
      "A function that runs when the server of the app starts up",
      "A route that runs before a page is shown to the visitor",
      "A decorator that registers a service with the injector",
      "A method that Angular calls at certain moments in the life of a component"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does ngOnInit run?",
    "topic": "Lifecycle hooks",
    "choices": [
      "Before the constructor of the class has been called by Angular",
      "Once, after the inputs of the component are first set",
      "Every time that the user clicks anywhere inside of the component",
      "Only at the moment when the component is destroyed and removed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good use of ngOnInit?",
    "topic": "Lifecycle hooks",
    "choices": [
      "Defining the properties of the class that are shown in the template",
      "Initialising data, such as calling a service to load a list",
      "Importing the modules and the services that the component needs",
      "Declaring the selector and the template of the component itself"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does ngOnChanges run?",
    "topic": "Lifecycle hooks",
    "choices": [
      "When the template finishes rendering",
      "When the component is destroyed",
      "When the router changes the url",
      "When a bound input property changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does ngOnDestroy run?",
    "topic": "Lifecycle hooks",
    "choices": [
      "Just before the component is removed, so it is the place to clean up",
      "Right after the constructor has finished and the inputs are set",
      "Whenever the template is updated by the change detection",
      "When the page is first loaded in the browser of the user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What belongs in ngOnDestroy?",
    "topic": "Lifecycle hooks",
    "choices": [
      "Loading the first data of the page",
      "Defining the inputs of the component",
      "Unsubscribing from observables and clearing timers",
      "Rendering the template again"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ngAfterViewInit signal?",
    "topic": "Lifecycle hooks",
    "choices": [
      "The component has been created but has no view yet",
      "The component is about to be destroyed",
      "The view of the component and its children have been initialised",
      "The route of the component has changed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should work not be done in the constructor?",
    "topic": "Lifecycle hooks",
    "choices": [
      "Inputs are not set yet, and the constructor is meant for injection",
      "Angular forbids any code from running inside of a constructor",
      "The constructor runs only on the server and not in the browser",
      "The constructor is called only once per application, not per component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does ngDoCheck allow?",
    "topic": "Lifecycle hooks",
    "choices": [
      "A check of the project files at build time for syntax errors",
      "A check that the template of the component contains valid HTML",
      "A check that the user of the app is currently logged in",
      "Custom change detection logic that runs on every check"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In what order do ngOnChanges and ngOnInit run for the first time?",
    "topic": "Lifecycle hooks",
    "choices": [
      "ngOnInit first, and then ngOnChanges when the inputs change",
      "ngOnChanges first if there are inputs, then ngOnInit",
      "They run at exactly the same time in the same call",
      "ngOnChanges runs only after ngOnDestroy has been called"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mean-4

```json
[
  {
    "stem": "What is an Observable in RxJS?",
    "topic": "Observables and observers",
    "choices": [
      "A promise that resolves with a single value and then ends",
      "A variable that is updated by two way binding in a template",
      "A stream of values over time that you can subscribe to",
      "A function that runs once when the page loads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an observable do until someone subscribes to it?",
    "topic": "Observables and observers",
    "choices": [
      "Nothing, because most observables are lazy and start on subscribe",
      "It starts emitting values right away and stores all of them for later subscribers",
      "It sends the values to the server for safe keeping until someone subscribes",
      "It emits one single value and then completes by itself without any subscriber"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are the three kinds of notification an observer can receive?",
    "topic": "Observables and observers",
    "choices": [
      "start, stop and pause",
      "open, read and close",
      "then, catch and finally",
      "next, error and complete"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens after an observable emits an error notification?",
    "topic": "Observables and observers",
    "choices": [
      "The stream continues with the next value after a short delay of a second",
      "The stream ends, and no more values or complete notifications follow",
      "The stream restarts from the first value automatically without any new subscription",
      "The stream pauses until the observer asks it for the next value to emit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does subscribe return?",
    "topic": "Observables and observers",
    "choices": [
      "The last value that the observable emitted",
      "A Subscription that you can use to unsubscribe",
      "A promise that resolves when the stream completes",
      "A new observable with the same values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between a promise and an observable?",
    "topic": "Observables and observers",
    "choices": [
      "A promise can emit many values and an observable only one",
      "An observable always runs on the server and a promise in the browser",
      "A promise is lazy and an observable runs immediately",
      "An observable can emit many values over time and can be cancelled, a promise settles once"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function creates an observable from a list of values?",
    "topic": "Observables and observers",
    "choices": [
      "of(1, 2, 3)",
      "from.values(1, 2, 3)",
      "create.list(1, 2, 3)",
      "stream(1, 2, 3)"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an observer object look like?",
    "topic": "Observables and observers",
    "choices": [
      "An object with get, set and delete methods for the values of the stream",
      "An object with open, close and send methods for a network connection",
      "An object with next, error and complete callbacks",
      "An object with a template and a selector for a component of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a cold observable?",
    "topic": "Observables and observers",
    "choices": [
      "One that shares a single producer between all subscribers",
      "One that has completed and cannot emit again",
      "One that creates a new producer for each subscriber, such as an HTTP call",
      "One that emits only when the browser is offline"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does subscribing twice to an HTTP observable send two requests?",
    "topic": "Observables and observers",
    "choices": [
      "Each subscription runs the cold observable from the beginning",
      "The HTTP client retries every request one more time by default",
      "Angular duplicates the request on purpose to check the answer of the server",
      "The second subscription cancels the first one and starts the request again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the map operator do?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Removes the values that do not pass a test that you give it",
      "Combines the values of two different streams into one single stream",
      "Delays every value of the stream by a fixed amount of time",
      "Transforms each emitted value with a function"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the filter operator do?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Changes every value of the stream into a string before it is emitted",
      "Lets through only the values that pass a condition",
      "Merges the values of several streams into one stream of arrays",
      "Repeats each value that is emitted exactly one more time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the tap operator?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Transforming each value of the stream into another value of a new type",
      "Running a side effect, such as logging, without changing the values",
      "Stopping the stream after the first value has been emitted",
      "Combining the latest values of two different streams into an array"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does switchMap do when a new value arrives while an inner observable is running?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Waits for the previous inner observable to finish and queues the new one",
      "Runs all of the inner observables at the same time without cancelling",
      "Ignores the new value until the previous inner observable has completed",
      "Cancels the previous inner observable and switches to the new one"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which operator is a good fit for a search box that calls an API?",
    "topic": "Common operators like map and filter",
    "choices": [
      "switchMap, because only the latest request matters",
      "concatMap, because every request must finish in order",
      "forkJoin, because all requests run at the end",
      "zip, because values are paired by index"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does debounceTime(300) do?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Delays every value of the stream by exactly 300 milliseconds",
      "Emits only the first value that arrives in each window of 300 ms",
      "Emits a value only after 300 ms have passed with no newer value",
      "Stops the stream after 300 values have been emitted by the source"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does distinctUntilChanged do?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Removes every duplicate value of the whole stream",
      "Sorts the values in ascending order",
      "Skips a value that is equal to the previous one",
      "Emits only the first value of the stream"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does take(1) do?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Emits the first value and then completes the stream",
      "Emits the last value of the stream and completes right after it",
      "Emits one value for every second that passes while the stream runs",
      "Repeats the first value of the stream again and again for ever"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does catchError do?",
    "topic": "Common operators like map and filter",
    "choices": [
      "Stops the stream silently without sending any notification to observers",
      "Retries the stream again and again until it finally succeeds",
      "Converts every value of the stream into an error that is thrown",
      "Handles an error from the stream and can return a replacement observable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between mergeMap and concatMap?",
    "topic": "Common operators like map and filter",
    "choices": [
      "mergeMap runs inner observables in order and concatMap in parallel",
      "concatMap runs inner observables one after another, mergeMap runs them at the same time",
      "They are the same operator with two names",
      "concatMap cancels earlier inner observables and mergeMap does not"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a Subject?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "An observable that can emit only one single value and then stops",
      "An observable that is also an observer, so you can push values into it",
      "A class that stores the data of a form and validates it",
      "A promise that can be resolved many times with new values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a BehaviorSubject need when it is created?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "A list of subscribers that it should notify when a value is emitted",
      "A url from which it fetches its first value when it is created",
      "A timer that tells it when it is allowed to emit the next value",
      "An initial value, which new subscribers receive at once"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a new subscriber of a BehaviorSubject receive?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "The latest value right away, followed by later values",
      "Only the values that are emitted after the moment of the subscription",
      "All of the values that were emitted since the stream was created",
      "Nothing at all until the subject has completed its work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between Subject and BehaviorSubject?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "A Subject keeps the latest value and replays it to each new subscriber",
      "A BehaviorSubject can emit only numbers and never other types of data",
      "A BehaviorSubject keeps the latest value and replays it to new subscribers",
      "A Subject cannot have more than one subscriber at the same time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ReplaySubject(3) do?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "Emits each value three times to every subscriber that is listening",
      "Allows only three subscribers to listen at the same time",
      "Replays the last three values to each new subscriber",
      "Stops by itself after three values have been emitted to subscribers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a BehaviorSubject often used for shared state in a service?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "Components always get the current value and updates when they subscribe",
      "It stores the state in the database of the app",
      "It prevents any component from changing the state",
      "It makes the state available without any subscription"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you push a new value to a subject?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "Call emit with the value",
      "Call set with the value",
      "Call publish with the value",
      "Call next with the value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why expose a subject as an observable from a service?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "It makes the subject faster for all of the subscribers that listen",
      "Callers can read the values but cannot push new ones into the subject",
      "Subjects cannot be injected into components by the dependency injector",
      "It is required by the async pipe before the pipe is able to work"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is multicasting?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "Sending the same HTTP request three times in a row to be safe",
      "Sharing one source execution between several subscribers",
      "Running a single stream on several threads of the processor",
      "Combining several streams into one single array of all their values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the share operator do?",
    "topic": "Subjects and behavior subjects",
    "choices": [
      "Shares the values of the stream with the server through a socket",
      "Copies the values of the stream into a local variable of the class",
      "Prevents the other components of the app from subscribing to it",
      "Shares one subscription to the source between multiple subscribers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does combineLatest do?",
    "topic": "Combining streams",
    "choices": [
      "Emits an array of the latest values whenever any source emits, once each has emitted",
      "Emits the values of the sources one source after another",
      "Emits only when all of the sources emit at exactly the same time",
      "Emits the first value of the source that is fastest"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does forkJoin do?",
    "topic": "Combining streams",
    "choices": [
      "Emits every value of every source as soon as it arrives",
      "Cancels all the sources except the first",
      "Waits for all sources to complete and emits their last values together",
      "Repeats each source until all of them fail"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is forkJoin a good choice?",
    "topic": "Combining streams",
    "choices": [
      "Listening to events that never complete, such as clicks on a button",
      "Combining the value of a search box with the value of a timer",
      "Running several independent HTTP calls and using all results together",
      "Sharing one single value between several components of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does merge do with several observables?",
    "topic": "Combining streams",
    "choices": [
      "Emits the values of all of them as they arrive, in a single stream",
      "Waits for all of them to finish and then emits one single array",
      "Emits the values of the first source and ignores all of the others",
      "Pairs the values by position, in the order in which they arrive"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does zip do?",
    "topic": "Combining streams",
    "choices": [
      "Emits the latest value of each source again on every single change",
      "Compresses the stream of values so that it uses less memory",
      "Emits only the values of the longest source and ignores the others",
      "Pairs values by index, such as the first of each source together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does withLatestFrom do?",
    "topic": "Combining streams",
    "choices": [
      "Emits whenever either one of the two streams emits a new value",
      "Combines each source value with the latest value of another stream, without triggering on the other",
      "Ignores the source stream until the other stream has completed",
      "Replaces the values of the source stream with the other stream"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is forkJoin a poor fit for streams that never complete?",
    "topic": "Combining streams",
    "choices": [
      "It emits too early, before any value of the sources has arrived",
      "It waits for completion, so it would never emit",
      "It converts the whole stream into an error as soon as it starts",
      "It stops the other streams as soon as the first value arrives"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does concat do with observables?",
    "topic": "Combining streams",
    "choices": [
      "Subscribes to all of the observables at the same time and merges them",
      "Joins the values of the observables into one single string of text",
      "Repeats the first observable for ever without using the others",
      "Subscribes to them one after another, starting the next when the previous completes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which operator emits a value from each source in a combined array whenever any of them changes?",
    "topic": "Combining streams",
    "choices": [
      "combineLatest",
      "forkJoin",
      "concat",
      "race"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does race do?",
    "topic": "Combining streams",
    "choices": [
      "Emits the values of every source in a random order each time",
      "Waits for the slowest source to complete and then emits its value",
      "Mirrors the first source that emits and ignores the others",
      "Measures the time that each of the sources takes to emit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can forgetting to unsubscribe cause a memory leak?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "The browser deletes all variables when the page is closed",
      "Angular unsubscribes everything automatically in every case",
      "The subscription keeps the component alive and keeps running after it is destroyed",
      "The observable stops emitting values after the first one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which observables complete by themselves and do not need manual unsubscribing?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "Most HttpClient calls, which emit once and complete",
      "Events such as click and scroll, which keep emitting for as long as they run",
      "Subjects that are kept in a service for the whole life of the app",
      "Timers that are created with interval, which emit again and again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does takeUntil(destroy$) do?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "Takes the values of the stream until it has reached ten values",
      "Stops the stream after one full second has passed since the start",
      "Ignores all of the values that come after destroy$ has emitted",
      "Completes the stream when destroy$ emits, for example in ngOnDestroy"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does takeUntilDestroyed do?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "Destroys the component when the stream completes its work",
      "Completes the stream when the current component or injector is destroyed",
      "Takes the first value of the stream and then destroys the stream",
      "Unsubscribes only from HTTP requests and from no other streams"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you usually call unsubscribe by hand?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "In the constructor of the component, before any input is set",
      "In ngOnDestroy, on the stored Subscription",
      "In the template of the component, with a pipe",
      "In the routing configuration of the app, next to the path"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which stream is risky if never unsubscribed?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "The of function with three values, which completes at once",
      "A single HTTP request, which completes when the response arrives",
      "A timer that fires only one time and then completes",
      "interval, which emits for ever"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of the async pipe regarding subscriptions?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "It subscribes and unsubscribes for you with the lifecycle of the view",
      "It prevents the observable from emitting errors",
      "It converts the observable into a plain value forever",
      "It caches the values in a service"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if you subscribe inside a subscribe?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "Angular merges the two subscriptions into one single subscription",
      "The inner subscription runs only one time and is then closed",
      "It creates nested subscriptions that are hard to clean up, so a flattening operator is better",
      "The outer subscription is cancelled at once by the framework"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is takeUntil usually placed last in the pipe?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "The compiler requires it to be the last operator",
      "It must run before any value is emitted",
      "Operators after it could create subscriptions that are not closed",
      "It makes the stream emit faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Subscription.add do?",
    "topic": "Unsubscribing and memory leaks",
    "choices": [
      "Groups subscriptions so that one unsubscribe call closes all of them",
      "Adds a new value to the stream that the subscription listens to",
      "Adds an operator to the pipe of the observable after the fact",
      "Adds a listener to the DOM of the page for the subscription"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the async pipe do in a template?",
    "topic": "Async pipe usage",
    "choices": [
      "Delays the rendering of the template by one tick of the clock",
      "Runs the whole component on a separate thread of the processor",
      "Converts a plain value into a promise that resolves later",
      "Subscribes to an observable and renders its latest value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you show the value of an observable with the async pipe?",
    "topic": "Async pipe usage",
    "choices": [
      "{{ async(user$) }}",
      "{{ user$ | async }}",
      "{{ user$.value }}",
      "{{ await user$ }}"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the dollar sign at the end of the name user$ mean?",
    "topic": "Async pipe usage",
    "choices": [
      "A syntax that Angular requires for observables",
      "A naming convention for an observable",
      "A keyword that makes the value read only",
      "A marker for private properties"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does the async pipe help with change detection?",
    "topic": "Async pipe usage",
    "choices": [
      "It turns change detection off for the whole app after the first value",
      "It runs change detection twice for every value that arrives",
      "It makes every component of the app check its inputs again",
      "It marks the view for check when a new value arrives, which suits OnPush components"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does @if (user$ | async; as user) do?",
    "topic": "Async pipe usage",
    "choices": [
      "Renders the block when the value is truthy and names it user",
      "Subscribes twice and then compares the two values that arrive",
      "Creates a new observable named user from the template itself",
      "Waits until the user logs in before it renders the block"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid several async pipes on the same http observable?",
    "topic": "Async pipe usage",
    "choices": [
      "The async pipe cannot be used more than once per template",
      "The compiler reports an error for two pipes",
      "Each one subscribes and sends its own request",
      "The second pipe always shows an empty value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you share one subscription between several parts of a template?",
    "topic": "Async pipe usage",
    "choices": [
      "Use the async pipe inside of each element that needs the value",
      "Convert the observable into a string and share that string",
      "Use one async pipe with as, or share the observable with shareReplay",
      "Call subscribe directly in the template and store the result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the async pipe show before the first value arrives?",
    "topic": "Async pipe usage",
    "choices": [
      "null, until the observable emits",
      "An empty string without a value",
      "The last value from the previous page",
      "An error message"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is the async pipe not enough?",
    "topic": "Async pipe usage",
    "choices": [
      "When a component needs to display a list of items from a service",
      "When the component uses a template to render its output",
      "When the observable emits a number instead of an object",
      "When you must trigger side effects or combine the value with imperative logic in the class"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to the subscription of the async pipe when the component is destroyed?",
    "topic": "Async pipe usage",
    "choices": [
      "It keeps running in the background",
      "It is unsubscribed automatically",
      "It is moved to the parent component",
      "It is restarted by the router"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mean-5

```json
[
  {
    "stem": "Which command creates an Express app instance in code?",
    "topic": "Express routing and middleware",
    "choices": [
      "const app = new Express.Server()",
      "const app = createApp(express)",
      "const app = express()",
      "const app = express.listen()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does app.get(\"/users\", handler) do?",
    "topic": "Express routing and middleware",
    "choices": [
      "Registers a handler for GET requests to the path /users",
      "Fetches the /users page from another server",
      "Reads a setting called /users from the app",
      "Gets every handler registered for the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read the id from the route /users/:id in Express?",
    "topic": "Express routing and middleware",
    "choices": [
      "req.query.id",
      "req.body.id",
      "res.params.id",
      "req.params.id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a query string value like ?page=2 in Express?",
    "topic": "Express routing and middleware",
    "choices": [
      "req.params.page",
      "req.query.page",
      "req.body.page",
      "req.url.page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method sends a JSON response in Express?",
    "topic": "Express routing and middleware",
    "choices": [
      "res.write(data)",
      "res.json(data)",
      "res.render(data)",
      "res.json.send(data)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is middleware in Express?",
    "topic": "Express routing and middleware",
    "choices": [
      "A database table that stores the details of every request for later checks",
      "A route that runs only for POST requests and parses their JSON bodies",
      "A template that is used to render the HTML pages sent back to clients",
      "A function that gets req, res and next and runs in the request pipeline"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must a middleware do if it does not end the response?",
    "topic": "Express routing and middleware",
    "choices": [
      "Call next() to pass control to the next handler",
      "Return a value from the function",
      "Call app.listen again",
      "Send an empty response automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which middleware parses JSON request bodies in Express?",
    "topic": "Express routing and middleware",
    "choices": [
      "express.body()",
      "express.parse()",
      "express.json()",
      "bodyReader()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Express recognise an error handling middleware?",
    "topic": "Express routing and middleware",
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
    "topic": "Express routing and middleware",
    "choices": [
      "After all routes and other middleware",
      "Before every other middleware",
      "Inside each route handler",
      "In a separate server process"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which HTTP method is conventionally used to create a new resource?",
    "topic": "REST endpoint design",
    "choices": [
      "GET",
      "PATCH",
      "HEAD",
      "POST"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between PUT and PATCH?",
    "topic": "REST endpoint design",
    "choices": [
      "PATCH replaces the whole resource and PUT changes some fields",
      "PUT replaces the whole resource and PATCH changes only some fields",
      "PUT creates and PATCH deletes",
      "They are identical in meaning"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does it mean that a REST API is stateless?",
    "topic": "REST endpoint design",
    "choices": [
      "The API never stores any data in a database between two separate requests",
      "Each request carries all that the server needs, and no client session is kept",
      "The API returns exactly the same response for every request that it receives",
      "The API cannot use any form of authentication because it has no memory"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which URL follows common REST naming?",
    "topic": "REST endpoint design",
    "choices": [
      "GET /getUserById?id=42",
      "POST /deleteUser/42",
      "GET /user/fetch/42",
      "GET /users/42"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status code should a successful creation return?",
    "topic": "REST endpoint design",
    "choices": [
      "201",
      "200",
      "204",
      "302"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code is returned when the request body is invalid?",
    "topic": "REST endpoint design",
    "choices": [
      "500",
      "404",
      "400",
      "301"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a 401 status code mean?",
    "topic": "REST endpoint design",
    "choices": [
      "The user is logged in but not allowed to do this",
      "The resource was not found",
      "The request lacks valid authentication credentials",
      "The server had an internal error"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a 403 status code mean?",
    "topic": "REST endpoint design",
    "choices": [
      "The server understood the request, but the user is not permitted",
      "The request needs a login before the server can process it any further",
      "The page was moved to a new address and the client should follow it",
      "The request took too long and the server gave up waiting for it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is idempotency for an HTTP method?",
    "topic": "REST endpoint design",
    "choices": [
      "The method always returns exactly the same response body every time it is called",
      "The method never changes any data stored on the server in any situation",
      "The method may be sent only one time before the server rejects it",
      "Repeating the same request leaves the server in the same state as sending it once"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should list endpoints support pagination?",
    "topic": "REST endpoint design",
    "choices": [
      "To hide some of the items from the client who is calling the API",
      "To avoid returning huge responses and to keep queries fast",
      "To make the requests safer against attacks that send too much data",
      "To sort the items by their name before they are returned to the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which middleware parses a JSON request body in Express?",
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
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
    "topic": "Request parsing and responses",
    "choices": [
      "Sends the status 204 and a JSON object with the message",
      "Only sets the status and keeps the request open",
      "Redirects the client to a page that is named 204",
      "Sends the status with its standard text as the body"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are secrets kept in environment variables instead of in the code?",
    "topic": "Environment configuration",
    "choices": [
      "So they stay out of the repository and can differ for each environment",
      "So that Node encrypts them automatically before the application reads them",
      "So that the code runs faster because values are read from memory directly",
      "So that they can be read in the browser by the front end bundle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the dotenv package do?",
    "topic": "Environment configuration",
    "choices": [
      "Encrypts the .env file",
      "Creates a database for the app",
      "Loads variables from a .env file into process.env",
      "Sends variables to the client bundle"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Should the .env file be committed to Git?",
    "topic": "Environment configuration",
    "choices": [
      "Yes, so that every developer on the team has exactly the same values",
      "Yes, but only the secrets that are used for production deployments",
      "No, it should be ignored, and an example file shared instead",
      "Only when the repository is private and the team trusts all its members"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What file name is commonly used to document required variables without secrets?",
    "topic": "Environment configuration",
    "choices": [
      ".env.example",
      ".env.public",
      ".env.backup",
      "env.json"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What type are values read from process.env?",
    "topic": "Environment configuration",
    "choices": [
      "Numbers or booleans depending on the value",
      "Objects",
      "Whatever the file defines",
      "Strings"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which expression reads the PORT variable and falls back to 3000 when it is not set?",
    "topic": "Environment configuration",
    "choices": [
      "process.env.PORT.default(3000)",
      "process.env.PORT ?? 3000",
      "process.env.get(\"PORT\", 3000)",
      "process.env(\"PORT\") ?? 3000"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate environment variables at startup?",
    "topic": "Environment configuration",
    "choices": [
      "To make the server start up faster by skipping the unused variables",
      "To fail fast with a clear message when something required is missing",
      "To remove the variables that the application does not use from memory",
      "To encrypt the values before the application reads them for the first time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens if process.env.PORT is not set and the code calls Number(process.env.PORT)?",
    "topic": "Environment configuration",
    "choices": [
      "The result is zero",
      "The result is 3000 by default",
      "An error is thrown",
      "The result is NaN"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must you never expose a server secret in client side React code?",
    "topic": "Environment configuration",
    "choices": [
      "Anything bundled into the browser can be read by every visitor",
      "The browser deletes every secret that it receives after one hour has passed",
      "React cannot read any environment variable at all while it renders",
      "Secrets make the page load slower because they are very long strings"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you normally set environment variables for a deployed Node app?",
    "topic": "Environment configuration",
    "choices": [
      "In the package.json file",
      "In the public folder",
      "In the settings of the hosting platform",
      "In the README file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is CORS?",
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
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
    "topic": "CORS setup",
    "choices": [
      "A list of the exact front end origins",
      "The wildcard, so that every origin may call the API in the same way",
      "Only localhost, so the API cannot be used from any real domain",
      "No origin at all, so the API answers requests from servers only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an Express error handling middleware?",
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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
    "topic": "Error handling",
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

LAYER: mean-6

```json
[
  {
    "stem": "What is a key difference between MongoDB and a relational database?",
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
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
    "topic": "Documents and collections",
    "choices": [
      "As plain JavaScript objects",
      "As rows in an array of arrays",
      "As XML strings",
      "As class instances only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a Mongoose schema?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "A direct connection from the application to the Atlas cluster in the cloud",
      "A query that returns every document of a collection in one request",
      "A tool that creates the indexes of a collection without any code",
      "A definition of the fields, types and rules of documents in a collection"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a Mongoose model?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "A copy of the whole database that is kept in the memory of the client",
      "A class built from a schema that you use to query and create documents",
      "A route handler that serves the documents of a collection over HTTP",
      "A plugin that formats the JSON of documents before they are saved"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which schema option makes a field mandatory?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "mandatory: true",
      "required: true",
      "notNull: true",
      "needed: yes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the timestamps schema option add?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "A log of every query that was made through the model since the start",
      "A backup copy of each document that is kept for thirty days",
      "An index on every field of the schema for faster queries",
      "createdAt and updatedAt fields that Mongoose maintains by itself"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does Mongoose validation run by default?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "When saving a document with save or create",
      "When reading a document from the database",
      "When the schema is defined",
      "Only when the server starts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which is a custom validator in Mongoose?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "A new schema called validator that is attached to the model as a plugin",
      "A middleware function that runs only for find queries of the model",
      "A validate function on the field that returns true or false",
      "A separate collection named validators that stores the rules of the schema"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Model.findById(id) return?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "An array that holds every document that matches the given identifier",
      "The identifier itself, as a string, once the lookup has finished",
      "A promise that resolves with the matching document, or null",
      "A cursor that moves over all the documents of the collection"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a unique: true option in a schema do?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "Creates a unique index, but it is not a validator by itself",
      "Validates uniqueness in application code before each save",
      "Removes duplicate values on read",
      "Generates a unique value automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of lean() on a Mongoose query?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "Removes all of the fields that are not in the schema from the stored data",
      "Limits the number of returned results to a single document per query",
      "Disables the validation that runs on update queries for the schema",
      "Returns plain JavaScript objects, not full Mongoose documents, for faster reads"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does updateOne not run schema validators by default?",
    "topic": "Mongoose schemas and models",
    "choices": [
      "Update queries cannot be validated in Mongoose in any possible way",
      "Validators run on save, so update queries need the runValidators option",
      "Validators are removed from the schema after the very first save",
      "Mongoose validates only delete operations and never writes or updates"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which driver method inserts one document?",
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
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
    "topic": "CRUD operations",
    "choices": [
      "undefined",
      "An empty array",
      "An error object",
      "null"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does find({ age: { $gte: 18 } }) return?",
    "topic": "Querying and projections",
    "choices": [
      "Documents whose age is greater than or equal to 18",
      "Documents whose age is exactly 18",
      "Documents that have no age field",
      "The number of documents with age 18"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a projection do in a query?",
    "topic": "Querying and projections",
    "choices": [
      "Limits how many documents are returned",
      "Sorts the returned documents by a field",
      "Limits which fields are returned for each document",
      "Copies the result into another collection"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you return only name and email in Mongoose?",
    "topic": "Querying and projections",
    "choices": [
      "find().only(\"name email\")",
      "find().fields(\"name email\")",
      "find().select(\"name email\")",
      "find().pick(\"name email\")"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which operator matches any of several values?",
    "topic": "Querying and projections",
    "choices": [
      "$in",
      "$or only on one field",
      "$all",
      "$exists"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between $and and listing conditions in one object?",
    "topic": "Querying and projections",
    "choices": [
      "$and runs faster than an object",
      "An object means OR and $and means AND",
      "They are never equal",
      "Listing fields in one object already means AND, and $and is needed for repeated keys"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you sort results by createdAt, newest first?",
    "topic": "Querying and projections",
    "choices": [
      ".sort({ createdAt: \"newest\" })",
      ".sort({ createdAt: -1 })",
      ".sort(\"createdAt\", \"desc\") as two arguments",
      ".order({ createdAt: 1 })"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you implement pagination with Mongoose?",
    "topic": "Querying and projections",
    "choices": [
      "Fetch every document and slice the array in the browser",
      "Use .skip() and .limit(), or a cursor based filter",
      "Use .page(2) with the page size",
      "Run one query for each page of the collection"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a regular expression filter such as { name: /^an/i } match?",
    "topic": "Querying and projections",
    "choices": [
      "Names that end with an, ignoring case",
      "Names that contain the number 1",
      "Names that are exactly two letters long",
      "Names that start with an, ignoring case"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does countDocuments return?",
    "topic": "Querying and projections",
    "choices": [
      "The number of documents that match a filter",
      "The first document of the collection",
      "The sum of a numeric field",
      "A cursor over all documents"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does lean() change in a Mongoose query?",
    "topic": "Querying and projections",
    "choices": [
      "Limits the query to one document",
      "Removes the _id field from every result",
      "Returns plain JavaScript objects, not full Mongoose documents",
      "Disables the schema validation on read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is embedding a better choice than referencing?",
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "References and population",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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
    "topic": "Indexes and validation",
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

LAYER: mean-7

```json
[
  {
    "stem": "What is HttpClient in Angular?",
    "topic": "HttpClient and services",
    "choices": [
      "A tool that builds the Angular app for production and uploads it",
      "A component that shows the data from the server in a table",
      "A service for making HTTP requests that returns observables",
      "A library that stores the state of the whole application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you make HttpClient available in a standalone app?",
    "topic": "HttpClient and services",
    "choices": [
      "Add provideHttpClient() to the application providers",
      "Import it in the index.html file of the project with a script tag",
      "Declare it in the selector of the root component of the application",
      "Install a separate server package that provides it for the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why wrap HttpClient calls in a service?",
    "topic": "HttpClient and services",
    "choices": [
      "Angular refuses to run any HTTP call that is made inside of a component",
      "Services are able to send requests much faster than components can",
      "The service replaces the router of the app for all of its pages",
      "Components stay simple, and the calls can be reused and tested"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does http.get<User[]>(url) return?",
    "topic": "HttpClient and services",
    "choices": [
      "A promise that resolves with the raw response object of the server",
      "An observable that emits the response body typed as User[]",
      "An array of users that is available immediately without any waiting",
      "A function that sends the request later when it is called by the code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method sends a new resource to the server?",
    "topic": "HttpClient and services",
    "choices": [
      "http.get(url, body)",
      "http.post(url, body)",
      "http.send(url, body)",
      "http.create(body, url)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you pass query parameters with HttpClient?",
    "topic": "HttpClient and services",
    "choices": [
      "Add them to the template of the component that calls the service",
      "Store them in the state of the router before the call is made",
      "Set them in the angular.json file of the workspace for each build",
      "Use the params option, for example with HttpParams"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you set a header on a single request?",
    "topic": "HttpClient and services",
    "choices": [
      "Pass a headers option, for example with HttpHeaders",
      "Set it in the template of the component that makes the call",
      "Add it to the selector of the component that makes the call",
      "Write it in the tsconfig file of the project for every request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does observe: \"response\" return?",
    "topic": "HttpClient and services",
    "choices": [
      "The response body as a string, without any status or headers attached",
      "A stream of progress events only, for uploads and downloads of files",
      "The full HttpResponse with status and headers, not only the body",
      "The request that was sent, together with the url and the method"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is the type given to http.get a compile time promise only?",
    "topic": "HttpClient and services",
    "choices": [
      "Generics are removed by the browser at runtime",
      "Types make the request slower at runtime",
      "The compiler cannot check the real server response, which can differ",
      "The server converts the response to that type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the usual place to store the base url of the API?",
    "topic": "HttpClient and services",
    "choices": [
      "In an environment file that the service reads",
      "In a global variable that is declared in the index.html file",
      "In each component that calls the API, as a string constant",
      "In the routes of the router, next to the paths of the pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a call such as http.get do nothing until you subscribe?",
    "topic": "Observable-based data fetching",
    "choices": [
      "Angular delays HTTP calls until the page has been idle for a while",
      "The request is first queued by the router before it is sent out",
      "The server must confirm the call before the request can start",
      "The observable is cold and runs only when it has a subscriber"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a component show the result of a service call without manual subscribe?",
    "topic": "Observable-based data fetching",
    "choices": [
      "Call subscribe in the constructor and store the value in a property",
      "Expose the observable and use the async pipe in the template",
      "Convert the observable into a promise inside of the template itself",
      "Call the service directly inside of the template on every check"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which operator turns each emitted value into another value?",
    "topic": "Observable-based data fetching",
    "choices": [
      "tap",
      "map",
      "share",
      "take"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you combine two dependent HTTP calls, where the second needs the first result?",
    "topic": "Observable-based data fetching",
    "choices": [
      "Subscribe to the second inside the subscribe of the first",
      "Call both at once and compare the answers",
      "Use forkJoin so that they run in order",
      "Use switchMap or concatMap to chain them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you run independent HTTP calls in parallel and wait for all results?",
    "topic": "Observable-based data fetching",
    "choices": [
      "forkJoin with the observables",
      "concat with the observables",
      "switchMap with the observables",
      "merge with the observables"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does shareReplay(1) do for an HTTP observable?",
    "topic": "Observable-based data fetching",
    "choices": [
      "Repeats the request one more time after it has completed successfully",
      "Replays the request again on every error that the server returns",
      "Caches the last result and shares it with later subscribers",
      "Limits the number of requests that are sent to one per day"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the toSignal function do?",
    "topic": "Observable-based data fetching",
    "choices": [
      "Sends a signal to the server whenever the data of the stream changes",
      "Converts a signal back into a plain number for use in the template",
      "Converts an observable into a signal that holds the latest value",
      "Starts a new HTTP request each time the signal is read"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When might a search box call the service with debounceTime and switchMap?",
    "topic": "Observable-based data fetching",
    "choices": [
      "To avoid a request for each key and to cancel older requests",
      "To make the server return the results in alphabetical order",
      "To store the results of every search in the browser for later",
      "To stop the user from typing too fast into the search box"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to an in flight HTTP request when switchMap switches to a new value?",
    "topic": "Observable-based data fetching",
    "choices": [
      "The earlier request continues and is added to the results",
      "The earlier request is repeated",
      "The new request waits until the earlier one finishes",
      "The earlier request is cancelled"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why map the server response to a model in the service?",
    "topic": "Observable-based data fetching",
    "choices": [
      "HTTP responses cannot be used without mapping",
      "The rest of the app can depend on a stable shape, not on the raw API",
      "Mapping makes the request faster",
      "The compiler requires a map for every call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does catchError do in an HTTP pipeline?",
    "topic": "Error handling and retries",
    "choices": [
      "Stops the stream and hides the error from everyone",
      "Handles an error and can return a fallback observable",
      "Retries the request until it succeeds",
      "Converts the error into a successful response with no data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the retry operator do?",
    "topic": "Error handling and retries",
    "choices": [
      "Waits for the user to press a retry button on the screen",
      "Repeats every successful request twice, to be sure of the data",
      "Retries only after the whole page has been reloaded by the user",
      "Resubscribes to the source a number of times when it errors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should retries be limited and delayed?",
    "topic": "Error handling and retries",
    "choices": [
      "Endless immediate retries can overload a failing server",
      "Retries are not allowed more than once by Angular",
      "Delays make the requests succeed more often in every case",
      "The browser blocks fast repeated requests"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the type of the error that HttpClient emits for a failed status?",
    "topic": "Error handling and retries",
    "choices": [
      "HttpResponse",
      "Error with a plain message",
      "HttpErrorResponse",
      "ErrorEvent only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which property of the error tells you the HTTP status code?",
    "topic": "Error handling and retries",
    "choices": [
      "code",
      "statusCode",
      "status",
      "errorNumber"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a status of 0 usually mean in an HttpErrorResponse?",
    "topic": "Error handling and retries",
    "choices": [
      "The request did not reach the server, for example a network or CORS failure",
      "The server answered with an empty body and a successful status code",
      "The request succeeded but the server returned no content to show",
      "The server needs a login before it will answer the request at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Should every error be retried?",
    "topic": "Error handling and retries",
    "choices": [
      "Yes, every error should be retried five times in a row with no delay",
      "Yes, but only for POST requests, since GET requests never fail",
      "No, no error should ever be retried by the client in any case",
      "No, only temporary ones such as network failures or 503, not client errors like 400"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should the UI show when a request fails?",
    "topic": "Error handling and retries",
    "choices": [
      "The raw error object that came back from the server, as it is",
      "A clear message and, where possible, a way to try again",
      "Nothing, because errors are logged for developers only",
      "An empty list as if the request had worked"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can errors be handled in one place for the whole app?",
    "topic": "Error handling and retries",
    "choices": [
      "With a try and catch block around the whole application at startup",
      "With an HTTP interceptor or a global error handler",
      "By editing the source code of HttpClient inside of node_modules",
      "By ignoring them in the services and hoping that none occur"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does throwError do inside catchError?",
    "topic": "Error handling and retries",
    "choices": [
      "Stops the app and shows a blank page",
      "Converts the error into a success value",
      "Sends the error to the server",
      "Rethrows or replaces the error so later code can handle it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an HTTP interceptor?",
    "topic": "Interceptors",
    "choices": [
      "A function or class that can inspect and change requests and responses",
      "A component that shows the status of the request",
      "A service that stores the response in the cache",
      "A route guard that runs before a request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you register a functional interceptor?",
    "topic": "Interceptors",
    "choices": [
      "Add it to the selector of the root component of the application",
      "Import it in the template of the root component of the app",
      "provideHttpClient(withInterceptors([myInterceptor]))",
      "Declare it in tsconfig"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical use of an interceptor?",
    "topic": "Interceptors",
    "choices": [
      "Rendering the template of a component on the server before the request",
      "Changing the url that is shown in the address bar of the browser",
      "Adding an Authorization header to each request",
      "Compiling the templates of the components of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must an interceptor clone the request before changing it?",
    "topic": "Interceptors",
    "choices": [
      "Requests are immutable, so you change a copy with req.clone",
      "Cloning makes the request faster to send than the original one",
      "The original request is deleted by the browser as soon as it is sent",
      "The server rejects any request that has not been cloned first"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does next(req) do inside an interceptor?",
    "topic": "Interceptors",
    "choices": [
      "Cancels the request",
      "Returns the response of the previous request",
      "Retries the request once",
      "Passes the request on to the next interceptor or to the backend"
    ],
    "answerIdx": 3
  },
  {
    "stem": "In what order do interceptors run for a request?",
    "topic": "Interceptors",
    "choices": [
      "In a random order that changes each time that the app starts",
      "In the order they are registered, and responses return in reverse order",
      "In reverse order for requests and in the normal order for responses",
      "All at the same time, with no order between the interceptors"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can an interceptor handle a 401 response?",
    "topic": "Interceptors",
    "choices": [
      "Ignore the status and show the data that was cached before the call",
      "Catch the error, refresh the token or send the user to the login page",
      "Retry the request without any change for ever until it works",
      "Delete the user account on the server and start a new session"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is an interceptor better than adding the header in each service?",
    "topic": "Interceptors",
    "choices": [
      "Interceptors make every request faster",
      "Services cannot add headers at all",
      "Interceptors are the only way to call an API",
      "The rule lives in one place and cannot be forgotten in a call"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should an interceptor avoid doing?",
    "topic": "Interceptors",
    "choices": [
      "Adding the token to requests for other domains",
      "Adding a header to the requests that go to your own API",
      "Logging how long each request takes before it is answered",
      "Showing a global loading indicator while requests are running"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you skip an interceptor for a specific request?",
    "topic": "Interceptors",
    "choices": [
      "Delete the interceptor from the app until the request has finished",
      "Send the request with a different version of HttpClient in the app",
      "Use a context token or a check on the url inside the interceptor",
      "Call the server twice, once with the interceptor and once without"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does Angular keep per environment settings such as the API url?",
    "topic": "Environment-based API URLs",
    "choices": [
      "In the template of the root component, next to the router outlet",
      "In the style files of the project, as a CSS variable",
      "In environment files that are replaced by the build configuration",
      "In the router configuration, as a parameter of the first route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does the build choose the environment file?",
    "topic": "Environment-based API URLs",
    "choices": [
      "With file replacements in the angular.json build configuration",
      "By reading the name of the git branch that the code was built from",
      "By asking the user which environment to use when the app starts",
      "By checking the url that the browser shows when the page loads"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should the API url not be hard coded in services?",
    "topic": "Environment-based API URLs",
    "choices": [
      "Hard coded values are not allowed by the TypeScript compiler at all",
      "The compiler removes every hard coded string from the final bundle",
      "Services cannot contain strings in any of their properties",
      "It differs between development, staging and production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the risk of putting secrets in an environment file of an Angular app?",
    "topic": "Environment-based API URLs",
    "choices": [
      "The file is deleted at build time before the bundle is created",
      "The file is bundled into the browser code, so everyone can read it",
      "The file is encrypted by Angular so that visitors cannot read it",
      "The file is read only by the server and never reaches the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can the same build run in several environments without a rebuild?",
    "topic": "Environment-based API URLs",
    "choices": [
      "Edit the compiled bundle by hand on each of the servers",
      "Load a config file at startup, for example with a fetch before bootstrap",
      "Use a different browser for each of the environments that you have",
      "Rebuild the whole app on every request that a visitor makes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a proxy configuration in the dev server do?",
    "topic": "Environment-based API URLs",
    "choices": [
      "Speeds up the production build",
      "Hides the environment variables from the bundle",
      "Rewrites TypeScript into JavaScript",
      "Forwards api calls to the backend and avoids CORS during development"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command starts the dev server with a proxy file?",
    "topic": "Environment-based API URLs",
    "choices": [
      "ng serve --proxy-config proxy.conf.json",
      "ng build --proxy proxy.json, which builds the app with a proxy",
      "ng proxy serve, which starts a proxy next to the dev server",
      "npm start proxy, which runs a script that is named proxy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use relative urls such as /api/users in the front end?",
    "topic": "Environment-based API URLs",
    "choices": [
      "They are parsed faster by the browser than absolute urls are",
      "Angular requires relative urls and refuses all of the others",
      "They work with the proxy in development and one origin in production",
      "They remove the need for a backend server for the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an InjectionToken useful for with configuration?",
    "topic": "Environment-based API URLs",
    "choices": [
      "Encrypting the configuration of the app before it is sent out",
      "Naming a route in the router so that it can be found again",
      "Providing a config value, such as the API url, through dependency injection",
      "Storing the login token of the user between page reloads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep configuration separate from code?",
    "topic": "Environment-based API URLs",
    "choices": [
      "The same code can run in several environments with different settings",
      "Configuration files make the code run faster in the browser",
      "Code cannot contain any values, so they must live in files",
      "Compilers require a configuration file for every one of the builds"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why show a loading state while a request is running?",
    "topic": "Loading states",
    "choices": [
      "The server needs a loading signal in order to start the work",
      "The request would fail without a loading indicator on the page",
      "The browser blocks the whole page until a spinner is shown",
      "The user knows that something is happening and does not click again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a component track loading with observables?",
    "topic": "Loading states",
    "choices": [
      "Read the value of the observable synchronously inside of the template",
      "Use a BehaviorSubject or signal that is set around the request",
      "Use the document title of the page as a flag for the state",
      "Call the service twice and compare the results of the two calls"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which operator is useful for turning a loading flag off both on success and on error?",
    "topic": "Loading states",
    "choices": [
      "tap only on success",
      "finalize",
      "map",
      "take"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can an HTTP interceptor do for loading states?",
    "topic": "Loading states",
    "choices": [
      "Render the template of the component on behalf of the service",
      "Replace the router outlet with a loading component of its own",
      "Compile the application again while the requests are running",
      "Count active requests and show a global indicator"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should you show a skeleton and not only a spinner?",
    "topic": "Loading states",
    "choices": [
      "It keeps the layout stable and shows what will appear",
      "Skeletons load the data faster",
      "Spinners are not allowed in Angular",
      "Skeletons need no CSS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should the UI do when a request returns an empty list?",
    "topic": "Loading states",
    "choices": [
      "Show the loading spinner for ever",
      "Show the raw JSON of the response",
      "Show an empty state that explains it, not a blank area",
      "Reload the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you avoid a flicker for very fast requests?",
    "topic": "Loading states",
    "choices": [
      "Always show the indicator for ten seconds, whatever the request does",
      "Hide the content of the page during every single request",
      "Show the indicator only after a short delay",
      "Remove the indicator from the app for fast connections"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the isLoading signal pattern look like?",
    "topic": "Loading states",
    "choices": [
      "A signal set to true before the call and false when it finishes",
      "A global variable on the window object",
      "A cookie that stores the status",
      "A route parameter"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why disable the submit button while saving?",
    "topic": "Loading states",
    "choices": [
      "It makes the server respond faster to the request that is running",
      "Buttons cannot be clicked at all while a request is running",
      "It hides the whole form from the user until the request is done",
      "It prevents duplicate submissions from repeated clicks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a component avoid showing stale data from an earlier request?",
    "topic": "Loading states",
    "choices": [
      "Store every response in an array",
      "Use switchMap so only the latest request produces data",
      "Ignore all but the first response",
      "Disable the router"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mean-8

```json
[
  {
    "stem": "Why should passwords be hashed before being stored?",
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Password hashing",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Issuing JSON Web Tokens",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
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
    "topic": "Express auth middleware",
    "choices": [
      "The user must log in first before the server can answer the request",
      "The route does not exist on the server that received the request",
      "The server crashed while it was handling the request of the user",
      "The user is known but not allowed to perform the action"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a route guard in Angular?",
    "topic": "Angular route guards",
    "choices": [
      "Logic that decides whether a navigation to a route is allowed",
      "A component that shows a lock icon on a page",
      "A service that stores the token of the user",
      "A pipe that hides text from some users"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which guard decides whether a route can be activated?",
    "topic": "Angular route guards",
    "choices": [
      "canLoad only",
      "canClose",
      "canActivate",
      "canShow"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How is a modern guard written?",
    "topic": "Angular route guards",
    "choices": [
      "As a class that extends the Router",
      "As a component with a template",
      "As a function that returns a boolean, a UrlTree or an observable of those",
      "As a directive on the router outlet"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a guard return to redirect the user?",
    "topic": "Angular route guards",
    "choices": [
      "A UrlTree, for example from router.createUrlTree([\"/login\"])",
      "A string with a message",
      "An HTTP error",
      "A new component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a functional guard get the router or an auth service?",
    "topic": "Angular route guards",
    "choices": [
      "With a constructor that Angular fills",
      "With a global variable",
      "With a template reference",
      "With the inject function inside the guard"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does canMatch do compared with canActivate?",
    "topic": "Angular route guards",
    "choices": [
      "It runs after the component is shown",
      "It stops the route from matching, so a lazy chunk is not even loaded",
      "It checks the template of the route",
      "It runs only on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is a guard not enough to protect data?",
    "topic": "Angular route guards",
    "choices": [
      "Guards are removed in production builds",
      "The guard only controls the UI, and the API must check the token too",
      "Guards cannot be used with a token",
      "The browser disables guards"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does canDeactivate help with?",
    "topic": "Angular route guards",
    "choices": [
      "Logging the user out when a route is left",
      "Cancelling HTTP calls of the previous page",
      "Disabling the back button for ever",
      "Asking the user before leaving a page with unsaved changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a guard wait for an async check such as loading the user?",
    "topic": "Angular route guards",
    "choices": [
      "Return an observable or a promise that resolves to the result",
      "Block the main thread with a loop",
      "Read the value in the constructor",
      "Redirect to a loading page first"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you attach a guard to a route?",
    "topic": "Angular route guards",
    "choices": [
      "In the template of the component",
      "In the selector of the component",
      "In the route definition, with canActivate: [authGuard]",
      "In the angular.json file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the HttpOnly flag on a cookie do?",
    "topic": "Storing tokens safely",
    "choices": [
      "Makes the cookie work only over plain HTTP and never over HTTPS",
      "Stops the cookie from being sent to the server on later requests",
      "Prevents JavaScript on the page from reading the cookie",
      "Deletes the cookie as soon as the page that set it is closed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the Secure flag on a cookie do?",
    "topic": "Storing tokens safely",
    "choices": [
      "Sends the cookie only over HTTPS connections",
      "Encrypts the cookie value",
      "Prevents the server from reading the cookie",
      "Makes the cookie last forever"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is storing a token in localStorage risky?",
    "topic": "Storing tokens safely",
    "choices": [
      "The browser deletes the stored value after one minute without any use",
      "It cannot be sent to the server in the headers of a request",
      "It is shared with every other website that the user visits",
      "Any script running on the page, such as injected code, can read it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the SameSite attribute help prevent?",
    "topic": "Storing tokens safely",
    "choices": [
      "Cookies from growing larger than the header limit of the server",
      "Cross site request forgery, by limiting when cookies go out on cross site requests",
      "Cookies from expiring before the end of the session of the user",
      "Users from logging in on two different devices at the same moment"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside of cookie based auth compared with a header token?",
    "topic": "Storing tokens safely",
    "choices": [
      "It cannot work together with a database that stores the user accounts",
      "It needs protection against cross site request forgery",
      "It cannot be used to send JSON bodies to the endpoints of the API",
      "It is readable by every website that the user visits in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which option sends cookies in a cross origin fetch call?",
    "topic": "Storing tokens safely",
    "choices": [
      "mode set to cookies",
      "headers with a cookie field",
      "method set to COOKIE",
      "credentials set to include"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the cookie option maxAge control?",
    "topic": "Storing tokens safely",
    "choices": [
      "How long the browser keeps the cookie",
      "The size in bytes that the cookie is allowed to reach",
      "The number of times the browser may send the cookie to a server",
      "The domain to which the cookie is attached when it is stored"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which approach protects a token best from theft by injected scripts?",
    "topic": "Storing tokens safely",
    "choices": [
      "A variable inside the global window object",
      "A value inside the url",
      "An HttpOnly cookie set by the server",
      "A value in localStorage"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which is true about cookies and the same origin policy?",
    "topic": "Storing tokens safely",
    "choices": [
      "Cookies are sent only to the page that created them and never to others",
      "Cookies are never sent with images or with other kinds of resources",
      "Cookies go to the domain that set them, whichever page makes the request",
      "Cookies are shared between all of the browsers that are used on a device"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What must the server do to clear a login cookie?",
    "topic": "Storing tokens safely",
    "choices": [
      "Send a Set-Cookie header with the same name and an expired date",
      "Delete the cookie file that the browser stores on the disk of the user",
      "Ask the browser to restart so that all of its cookies are dropped",
      "Change the password of the user so that the old cookie stops working"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do many teams keep the access token on the client in a MERN app?",
    "topic": "Refresh and logout flows",
    "choices": [
      "In a public cookie that scripts on the page are allowed to read",
      "Inside the url so that it survives page reloads and shared links",
      "In a global variable on the server that is sent with every reply",
      "In memory, with the refresh token in an HttpOnly cookie"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a request interceptor commonly add for authenticated calls?",
    "topic": "Refresh and logout flows",
    "choices": [
      "The password of the user, placed inside the request body",
      "The Authorization header carrying the current token",
      "A random identifier that is appended to the url of the call",
      "A CSS class that is added to the document element"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should the client do when the API returns 401 for an expired token?",
    "topic": "Refresh and logout flows",
    "choices": [
      "Show an empty page and stop until the user reloads the application",
      "Try to refresh the token once and retry, or send the user to login",
      "Retry the same request ten times in a row with no delay between",
      "Delete the account of the user and start a new session from scratch"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is it a problem to refresh the token from several requests at the same moment?",
    "topic": "Refresh and logout flows",
    "choices": [
      "The server only accepts a single request per second from each client",
      "The token becomes longer with every refresh, and is rejected at some point",
      "The browser blocks all refresh calls that are made while another is pending",
      "Parallel refresh calls can invalidate each other, so they should share one refresh"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a protected route in React Router check login state?",
    "topic": "Refresh and logout flows",
    "choices": [
      "Render a component that redirects to login when there is no user",
      "Hide the link to the page in the navbar and do nothing else",
      "Check the url for the word admin before the page is rendered",
      "Ask the server whether the user is logged in on each keystroke"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to in memory state when the user reloads the page?",
    "topic": "Refresh and logout flows",
    "choices": [
      "It is kept by the browser automatically and restored after the reload",
      "It is sent back by the server on its own once the page has loaded",
      "It is lost, so the app must restore the session, for example with a refresh call",
      "It is copied into the url so that the page can read it again"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should logout also clear cached query data?",
    "topic": "Refresh and logout flows",
    "choices": [
      "Because the query cache is unable to hold entries for two users",
      "Because the server requires the client cache to be empty at login",
      "Otherwise the next user could briefly see data of the previous user",
      "Because the router stops working while old query data is present"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of keeping tokens in localStorage?",
    "topic": "Refresh and logout flows",
    "choices": [
      "Injected scripts can read and steal them",
      "They are deleted by the browser after a minute of inactivity",
      "They cannot be sent along with requests in the headers",
      "They are shared with other browsers on the same computer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of an auth context or store in the client?",
    "topic": "Refresh and logout flows",
    "choices": [
      "Storing the password of the user so it can be used again later",
      "Replacing the session that the server keeps for each logged in user",
      "Generating the signed tokens on the client for each new session",
      "Exposing the current user, plus login and logout actions, to the whole app"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should the client never trust its own role check for security?",
    "topic": "Refresh and logout flows",
    "choices": [
      "The client has no way of reading the role of the logged in user",
      "Users can change client code, so the server must enforce permissions",
      "Roles change every minute, so the client value is always out of date",
      "React hides role information from users while rendering components"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mean-9

```json
[
  {
    "stem": "What is a reactive form in Angular?",
    "topic": "Reactive forms and validation",
    "choices": [
      "A form that is defined only with ngModel directives in the template",
      "A form that reloads the whole page each time a value changes",
      "A form whose model is defined in the component class with FormControl objects",
      "A form that is generated automatically from the schema of a database"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which class represents the value and state of a single input?",
    "topic": "Reactive forms and validation",
    "choices": [
      "FormControl",
      "FormField",
      "InputModel",
      "ControlState"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which class groups several controls into one object?",
    "topic": "Reactive forms and validation",
    "choices": [
      "FormList",
      "FormBag",
      "ControlSet",
      "FormGroup"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you attach a control to an input in the template?",
    "topic": "Reactive forms and validation",
    "choices": [
      "With a click handler on the input",
      "With the formControlName or formControl directive",
      "With an id that matches the name of the control",
      "With the name attribute only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which import is needed for reactive forms in a standalone component?",
    "topic": "Reactive forms and validation",
    "choices": [
      "FormsModule only",
      "ReactiveFormsModule",
      "HttpClientModule",
      "RouterModule"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you add a built in validator to a control?",
    "topic": "Reactive forms and validation",
    "choices": [
      "Add a validate attribute to the element in the template of the form",
      "Call a validate function that is registered in the router of the app",
      "Set a flag on the form group to turn the validation on",
      "Pass Validators.required or others when creating the control"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which property tells you whether the form is valid?",
    "topic": "Reactive forms and validation",
    "choices": [
      "form.valid",
      "form.checked",
      "form.ready",
      "form.passed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the touched state of a control mean?",
    "topic": "Reactive forms and validation",
    "choices": [
      "The user typed a value in the control",
      "The control value differs from its initial value",
      "The user focused the control and then left it",
      "The control is disabled"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you write a custom validator?",
    "topic": "Reactive forms and validation",
    "choices": [
      "A class that extends FormGroup and overrides its constructor",
      "A pipe that formats the value of the control before it is shown",
      "A function that takes a control and returns an error object or null",
      "A service that is injected into the form by the dependency injector"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should error messages be shown for a field?",
    "topic": "Reactive forms and validation",
    "choices": [
      "After the field is touched or dirty, not on the first render",
      "As soon as the page loads, for every field of the form at once",
      "Only after the form has been submitted successfully to the server",
      "Never, because the browser shows all of the messages by itself"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a FormArray used for?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "A list of validators for one control",
      "A list of routes for the form",
      "An array of strings that is bound to the template",
      "A list of controls or groups whose length can change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you add a new row to a FormArray?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "Assign a new array to the property",
      "Call push with a new control or group",
      "Call the add method of the template",
      "Edit the template and reload the form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you remove a row from a FormArray?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "Call delete with the control",
      "Call removeAt with the index",
      "Set the value of the row to null",
      "Remove the element from the DOM only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which directive points a template section at a FormArray?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "formListName",
      "arrayName",
      "formGroupArray",
      "formArrayName"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good use case for a FormArray?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "A list of phone numbers or ingredients that the user can extend",
      "A single email field that holds one value and never changes shape",
      "A fixed form with exactly three inputs that are always present",
      "A login page that has an email field and a password field"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does FormBuilder give you?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "A way to build the template of the form from a configuration file",
      "A tool that generates the CSS for the fields of the form",
      "A shorter syntax for creating groups, arrays and controls",
      "A service that sends the form to the server when it is valid"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read all of the values of a FormArray?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "From the template, by using an index of the row that is shown",
      "From a cookie that stores the whole form for the next visit",
      "From its value property, which is an array",
      "From the state of the router that holds the current url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you add a dynamic field based on a user choice?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "Add or remove controls in the form group when the choice changes",
      "Reload the component with a different template for each choice",
      "Hide the field with CSS and leave the control inside of the form",
      "Create a brand new form for each of the choices of the user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to validity when a required control is removed from the form?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "The form stays invalid until the page has been reloaded by the user",
      "The form becomes valid automatically and stays valid for ever",
      "The whole form is deleted together with the control that was removed",
      "The form is validated again without that control"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why track rows by a stable id in an @for over a FormArray?",
    "topic": "Form arrays and dynamic fields",
    "choices": [
      "The compiler requires it for FormArray",
      "Angular can reuse the DOM correctly when rows are added or removed",
      "Rows are sorted by the id",
      "Ids are validated by Angular"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What problem does a state management pattern solve?",
    "topic": "State management patterns",
    "choices": [
      "Making the CSS of the whole app consistent across all of the pages",
      "Keeping shared state predictable when many components read and change it",
      "Compiling the templates of the components faster during the build",
      "Replacing the router of the application with a different library"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a simple way to share state in Angular?",
    "topic": "State management patterns",
    "choices": [
      "A global variable that is stored on the window object of the page",
      "A cookie that is created for every value of the state",
      "Query parameters in the url that hold all of the data",
      "A service with a BehaviorSubject or signals"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is NgRx based on?",
    "topic": "State management patterns",
    "choices": [
      "The Redux pattern with actions, reducers and a store",
      "Direct changes of the state of the component by each of the children",
      "Two way binding between all of the components of the application",
      "A database that lives in the browser and syncs with the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a reducer do?",
    "topic": "State management patterns",
    "choices": [
      "Sends a request to the server and returns the response to the caller",
      "Renders a template and returns the HTML for the current component",
      "Takes the current state and an action and returns the new state",
      "Subscribes to the router and returns the url of the next page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a selector in a store?",
    "topic": "State management patterns",
    "choices": [
      "A CSS selector that is used to style a component in the template",
      "A route that selects which page is shown to the visitor",
      "A function that reads a part of the state",
      "A pipe that formats the data of the state for display"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are signals in Angular?",
    "topic": "State management patterns",
    "choices": [
      "Reactive values that notify the places that read them when they change",
      "Events that are sent to the server whenever a user clicks on something",
      "A replacement for the router that maps urls to components",
      "HTML attributes that are added to the elements of forms"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does computed do with signals?",
    "topic": "State management patterns",
    "choices": [
      "Runs a calculation once at build time and stores the final result",
      "Stores a signal in the local storage of the browser for later",
      "Sends a signal to a service whenever the template is rendered",
      "Creates a derived signal that updates when the signals it reads change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When might a store such as NgRx be too much?",
    "topic": "State management patterns",
    "choices": [
      "For a large app that has a lot of state that many parts share",
      "For a small app where a service with signals is enough",
      "When several developers are working together on the same app",
      "When the app has many routes and lazy loaded feature areas"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep state changes in one place?",
    "topic": "State management patterns",
    "choices": [
      "The framework does not allow state in components",
      "They are easier to follow, test and debug",
      "It makes the DOM smaller",
      "It removes the need for templates"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does effect do with signals?",
    "topic": "State management patterns",
    "choices": [
      "Creates a new component and adds it to the template of the parent",
      "Registers a new route in the router of the application",
      "Changes the syntax of the template for the whole project",
      "Runs code when the signals it reads change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is lazy loading of routes?",
    "topic": "Lazy loading modules",
    "choices": [
      "Loading the code of a route only when it is visited",
      "Loading all of the routes of the app at the start of the page",
      "Delaying the render of every page by a fixed amount of time",
      "Loading the code of the route from another domain at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you lazy load a standalone component in a route?",
    "topic": "Lazy loading modules",
    "choices": [
      "component: import(\"./page\"), which loads the file in the same bundle",
      "lazy: true in the route, followed by the path of the file",
      "loadComponent: () => import(\"./page\").then(m => m.Page)",
      "template: \"./page\", which points at the file of the template"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you lazy load a group of routes?",
    "topic": "Lazy loading modules",
    "choices": [
      "children, with the url of the file that holds the child routes",
      "lazy, with an array of the components that should be loaded later",
      "loadChildren with a dynamic import of the routes file",
      "module, with a string path to the file of the feature module"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of lazy loading?",
    "topic": "Lazy loading modules",
    "choices": [
      "A smaller initial bundle, so the first page loads faster",
      "The server needs less memory because it serves fewer files",
      "The router no longer has to check the urls of the pages",
      "All of the pages are cached in the browser for ever"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a preloading strategy?",
    "topic": "Lazy loading modules",
    "choices": [
      "A rule that deletes the routes that are not used by visitors",
      "A rule that loads every route before the app has started",
      "A rule that reloads the page again and again at set times",
      "A rule that loads lazy routes in the background after the first page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does PreloadAllModules do?",
    "topic": "Lazy loading modules",
    "choices": [
      "Loads all of the routes at build time into one single file",
      "Loads all lazy routes in the background after the app starts",
      "Loads only the route that the user visited most recently",
      "Loads the routes from the database of the server at start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you see the effect of lazy loading?",
    "topic": "Lazy loading modules",
    "choices": [
      "Count the number of components that the project contains in total",
      "Check the network tab for separate chunks that load on navigation",
      "Look at the names of the folders in the source directory",
      "Read the tsconfig file that the compiler uses for the build"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can break lazy loading by accident?",
    "topic": "Lazy loading modules",
    "choices": [
      "Using more than one route",
      "Naming a component with a capital letter",
      "Adding a template",
      "Importing a lazy feature from the root, which puts it in the main bundle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of splitting too finely?",
    "topic": "Lazy loading modules",
    "choices": [
      "Many small requests and loading delays when navigating",
      "The compiler stops working when it finds a route that is lazy",
      "The router needs more memory to match the urls of the pages",
      "The pages lose their styles when they are loaded on demand"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why guard lazy routes with canMatch?",
    "topic": "Lazy loading modules",
    "choices": [
      "The guard makes the page render twice when it is shown",
      "The guard replaces the router for the lazy routes of the app",
      "The code is not even loaded if the user is not allowed",
      "The guard compiles the code of the route before it is loaded"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the default change detection strategy do?",
    "topic": "Change detection strategies",
    "choices": [
      "Checks the components only when the user clicks on something",
      "Checks the components once at the start and never again",
      "Checks components after events and async tasks, from the root down",
      "Checks only the components that have inputs bound to them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does ChangeDetectionStrategy.OnPush do?",
    "topic": "Change detection strategies",
    "choices": [
      "Checks the component only when its inputs change, an event happens in it or a signal or async pipe updates",
      "Checks the component never again after its first render has finished",
      "Checks the component on every mouse move that happens on the page",
      "Disables the bindings of the template for the whole component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use OnPush for many components?",
    "topic": "Change detection strategies",
    "choices": [
      "It makes the template shorter and easier to read for developers",
      "It removes the need for inputs on the component completely",
      "It turns off the router for the components that use it",
      "It reduces the number of checks, which improves performance"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does mutating an input object not update an OnPush component?",
    "topic": "Change detection strategies",
    "choices": [
      "OnPush ignores all of the objects that are passed in as inputs",
      "The reference stays the same, so Angular does not see a change",
      "Angular copies the object first, so a change never reaches it",
      "The template cannot read objects, only strings and numbers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the safe way to update data for OnPush components?",
    "topic": "Change detection strategies",
    "choices": [
      "Change the old object in place and call detectChanges afterwards",
      "Create a new object or array instead of changing the old one",
      "Call the constructor of the component again with the new data",
      "Disable OnPush at runtime for the component that needs the data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does zone.js do in Angular?",
    "topic": "Change detection strategies",
    "choices": [
      "Splits the app into separate time zones for each of the users",
      "Stores the dates of the app in UTC and converts them for display",
      "Compresses the bundle so that it loads faster over the network",
      "Patches async APIs so Angular knows when to run change detection"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does markForCheck do?",
    "topic": "Change detection strategies",
    "choices": [
      "Marks the component and its ancestors to be checked in the next cycle",
      "Deletes the component from the tree and creates it again later",
      "Validates the form of the component and marks it as clean",
      "Starts an HTTP request that loads the data of the component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do signals help change detection?",
    "topic": "Change detection strategies",
    "choices": [
      "They disable change detection for the whole app after the first render",
      "They duplicate the value in every component that reads it",
      "The template updates only where a changed signal is read",
      "They run the check of the components on the server instead"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good first step before optimising change detection?",
    "topic": "Change detection strategies",
    "choices": [
      "Rewrite every component of the app to use the new syntax",
      "Remove all of the bindings that the templates currently use",
      "Measure with the Angular DevTools profiler",
      "Switch off zone.js for the whole application before anything else"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What costs a lot in a template during every check?",
    "topic": "Change detection strategies",
    "choices": [
      "Calling a heavy method directly in an expression",
      "Reading a plain property of the class in an expression",
      "Using a pipe that is pure, with the same input value",
      "Using a signal that is read directly in the template"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a reusable component?",
    "topic": "Reusable components",
    "choices": [
      "A component that reads global variables to find the data it shows",
      "A component that is copied into each page that needs it",
      "A component that can only be used one time in the whole app",
      "A component that gets its data through inputs and events through outputs and fits many places"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a parent customise the content of a reusable component?",
    "topic": "Reusable components",
    "choices": [
      "Editing the source of the component",
      "Content projection with ng-content",
      "Changing the CSS of the child from outside",
      "Passing HTML strings in an input"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does ng-content do?",
    "topic": "Reusable components",
    "choices": [
      "Loads content from the server and shows it inside of the component",
      "Marks where projected content from the parent is placed",
      "Creates a new component for every piece of content it finds",
      "Reads content from the DOM of the parent and copies it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an input with a signal, input(), allow?",
    "topic": "Reusable components",
    "choices": [
      "A way to change the value of the parent from inside the child",
      "A route parameter that the router passes to the component",
      "A form control that is created by the form builder",
      "A reactive input that can be read as a signal"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep reusable components free of services that fetch data?",
    "topic": "Reusable components",
    "choices": [
      "They stay easy to reuse and test, and a smart parent supplies the data",
      "Components cannot inject services in any case in an Angular app",
      "Services are only used for forms and never for any other data",
      "It makes the whole application smaller after it has been built"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a smart versus a presentational component?",
    "topic": "Reusable components",
    "choices": [
      "A smart one has no template, while a presentational one always has one",
      "A presentational one fetches the data, while a smart one only renders",
      "A smart one handles data and logic, a presentational one renders inputs and emits events",
      "They are the same thing and only the two names are different"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should a reusable component notify its parent of a user action?",
    "topic": "Reusable components",
    "choices": [
      "Call the method of the parent directly",
      "Change a global variable",
      "Emit an output event",
      "Write to local storage"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good name for a shared folder of reusable components?",
    "topic": "Reusable components",
    "choices": [
      "A shared or ui folder that features import from",
      "A folder that is named with the date on which it was created",
      "A folder that is named test, next to the other feature folders",
      "The root of the project, together with the configuration files"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can styles of a reusable component stay predictable?",
    "topic": "Reusable components",
    "choices": [
      "Use global styles with a high specificity so they always win",
      "Use inline styles in every instance of the component",
      "Copy the CSS of the component into each of its parents",
      "Scope them to the component and expose design tokens through CSS variables"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why write a small API for a reusable component?",
    "topic": "Reusable components",
    "choices": [
      "Large APIs make components faster because they can do more at once",
      "Few clear inputs and outputs make it easy to learn and change later",
      "Inputs are not allowed to be many, or the compiler raises an error",
      "Angular limits the number of inputs that a component may have"
    ],
    "answerIdx": 1
  }
]
```

LAYER: mean-10

```json
[
  {
    "stem": "What is Jasmine?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "A browser automation tool for end to end tests",
      "A tool that bundles the Angular app for production",
      "A testing framework with describe, it and expect that Angular uses by default",
      "A library that creates mock servers for the backend"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Karma do in a classic Angular test setup?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "Runs the tests in real browsers and reports the results",
      "Writes the tests for the components",
      "Compiles TypeScript to JavaScript",
      "Deploys the app to a server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does TestBed provide?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "A table of all test files in the project",
      "A database for test data",
      "A server that hosts the tests",
      "A testing module in which components and services can be created"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you create a component for a test?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "new MyComponent() with the template",
      "TestBed.createComponent(MyComponent)",
      "document.createElement(\"my-component\")",
      "ng generate test MyComponent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does fixture.detectChanges() do?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "Detects changes in the source files",
      "Runs change detection so the template shows the current state",
      "Reloads the browser window",
      "Saves the fixture to a file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you replace a real service with a fake in a test?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "Edit the source of the real service",
      "Delete the service from the project",
      "Import the real service twice",
      "Provide a mock under the same token in the testing module"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tool lets you test HttpClient calls without a server?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "HttpTestingController",
      "HttpMockServer",
      "FakeBackend from Node",
      "ngTestHttp"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a spy created with jasmine.createSpy do?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "Reads the source code of a function",
      "Hides the function from the tests",
      "Records the calls to a function and can return a fake value",
      "Speeds up the function"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good test name?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "The name of the file that is tested",
      "A number that identifies the test",
      "A sentence that says what is expected under a condition",
      "The name of the author"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should unit tests avoid real HTTP calls?",
    "topic": "Unit testing Angular with Jasmine",
    "choices": [
      "They become slow and depend on a network and a server",
      "Angular blocks real HTTP calls",
      "Real calls return no data",
      "Tests cannot use the network at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Supertest let you do?",
    "topic": "Backend tests with Jest",
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
    "topic": "Backend tests with Jest",
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
    "topic": "Backend tests with Jest",
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
    "topic": "Backend tests with Jest",
    "choices": [
      "The production database, with a prefix added to every collection name",
      "A shared development database that all of the developers use at once",
      "No database at all, because routes never need any data in tests",
      "A separate test database or an in memory one that is reset between tests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you send a JSON body with Supertest?",
    "topic": "Backend tests with Jest",
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
    "topic": "Backend tests with Jest",
    "choices": [
      "Only the size of the response in bytes and nothing else about it",
      "Only the time it took for the server to respond to the request",
      "The shape and content of the response body",
      "The version of Node that ran the test and the operating system"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you test a protected route with Supertest?",
    "topic": "Backend tests with Jest",
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
    "topic": "Backend tests with Jest",
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
    "topic": "Backend tests with Jest",
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
    "topic": "Backend tests with Jest",
    "choices": [
      "Because error cases are the only cases that can break a database connection",
      "Because clients depend on correct 400 and 404 responses as much as on success ones",
      "Because the framework skips error handling code unless a test calls it first",
      "Because success responses are checked automatically by the Express package"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Playwright used for?",
    "topic": "End-to-end testing",
    "choices": [
      "Unit tests of pure functions in a Node environment",
      "End to end tests that drive a real browser through your app",
      "Checking the types of the code at build time",
      "Generating the documentation of your API routes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What makes an end to end test valuable?",
    "topic": "End-to-end testing",
    "choices": [
      "It checks one single function in isolation from all of the others",
      "It runs faster than any unit test that is part of the project",
      "It needs no running server and no database in order to work",
      "It checks a whole flow, such as sign in and checkout, as a user would"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why prefer role or label based locators in Playwright?",
    "topic": "End-to-end testing",
    "choices": [
      "They match how users find elements and survive markup changes",
      "They run faster than every other kind of locator that Playwright offers",
      "They are the only locators that work inside the Chromium browser",
      "They remove the need for a test server to be running during the test"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Playwright auto waiting do?",
    "topic": "End-to-end testing",
    "choices": [
      "Waits a fixed ten seconds before each action",
      "Waits until the whole site has been deployed",
      "Waits for elements to be ready before it acts on them",
      "Waits for another test to finish before it starts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid fixed sleeps in end to end tests?",
    "topic": "End-to-end testing",
    "choices": [
      "They are not supported by any of the browsers that Playwright can drive",
      "They make the test run in a different browser than the one configured",
      "They slow tests down and still fail when the app is slower than expected",
      "They increase the coverage of the test suite in a way that is misleading"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you run end to end tests against your Next.js app in CI?",
    "topic": "End-to-end testing",
    "choices": [
      "Build and start the app, then run Playwright against its url",
      "Run Playwright against the production site of a competitor to compare",
      "Run Playwright without any server and mock every page by hand",
      "Compile the tests into the output of the Next.js build step"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good approach for the data used in end to end tests?",
    "topic": "End-to-end testing",
    "choices": [
      "Use the production database, so that the test is as realistic as possible",
      "Use whatever data happens to be on the machine of the developer",
      "Create the data by hand before every run of the whole test suite",
      "Use a separate test database, or seeded data that is reset between runs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you test signed in flows without logging in again in every test?",
    "topic": "End-to-end testing",
    "choices": [
      "Skip authentication completely and test only the public pages of the app",
      "Save the signed in state once and reuse it across the tests",
      "Put the password in the url of each page that the test opens",
      "Run every test inside one single long script that signs in once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which browsers can Playwright drive?",
    "topic": "End-to-end testing",
    "choices": [
      "Chromium only",
      "Chromium, Firefox and WebKit",
      "Firefox and Internet Explorer",
      "Safari on macOS only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What helps you debug a failing end to end test in CI?",
    "topic": "End-to-end testing",
    "choices": [
      "The size of the bundle that was built for the test",
      "The list of dependencies in the lock file",
      "The number of lines that the test file contains",
      "Traces, screenshots and video that Playwright can record"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command builds an Angular app for production?",
    "topic": "Building Angular for production",
    "choices": [
      "ng build",
      "ng serve",
      "ng test",
      "ng generate build"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does ahead of time compilation do?",
    "topic": "Building Angular for production",
    "choices": [
      "Compiles the templates in the browser at runtime",
      "Compiles the CSS to TypeScript",
      "Compiles templates to JavaScript during the build, before the app runs",
      "Compiles the tests before the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does tree shaking do?",
    "topic": "Building Angular for production",
    "choices": [
      "Sorts the files of the project",
      "Deletes unused folders in the repository",
      "Removes code that is not used from the final bundle",
      "Splits the bundle by size"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does the production build output go by default?",
    "topic": "Building Angular for production",
    "choices": [
      "The dist folder",
      "The src folder",
      "The node_modules folder",
      "The public folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the build budget in angular.json do?",
    "topic": "Building Angular for production",
    "choices": [
      "Limits the number of components",
      "Limits the number of developers",
      "Limits the requests per second",
      "Warns or fails when the bundle size passes a limit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is the production build served with a fallback to index.html?",
    "topic": "Building Angular for production",
    "choices": [
      "The browser needs index.html for every file",
      "Deep links such as /users/1 have no file, so the server returns the app entry",
      "The fallback speeds up the build",
      "Angular forbids other files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a source map used for in production?",
    "topic": "Building Angular for production",
    "choices": [
      "Making the bundle smaller",
      "Mapping minified code back to the original files for debugging",
      "Hiding the code from users",
      "Speeding up the first load"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the hash in a built file name, such as main.a1b2c3.js, help with?",
    "topic": "Building Angular for production",
    "choices": [
      "It encrypts the file",
      "It marks the file as private",
      "It tells the server which route to use",
      "Browsers fetch a new file when the content changes and cache the rest"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can the size of the bundle be analysed?",
    "topic": "Building Angular for production",
    "choices": [
      "With a bundle analyser or the stats file of the build",
      "By counting the components",
      "By reading the package.json",
      "By opening the file in an editor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the environment configuration for production?",
    "topic": "Building Angular for production",
    "choices": [
      "A global flag that is set by the browser",
      "A cookie that stores the settings",
      "A configuration that replaces files such as environment.ts at build time",
      "A route of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main difference between hosting a static site and a Node API?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "A static site needs a running process that listens, while an API needs only file hosting",
      "An API can only ever be hosted on the same server as its own database",
      "An API needs a running process that listens, while static files need only file hosting",
      "A static site must always be run inside a container before it can be served"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command do most platforms run to start an Express app?",
    "topic": "Deploying Node and Angular",
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
    "topic": "Deploying Node and Angular",
    "choices": [
      "The platform blocks every port except the one named 3000 in the code",
      "The port is needed only for logging and has no effect on the routing",
      "Express chooses a random port unless the variable has been defined",
      "The platform assigns the port at runtime and routes traffic to it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a health check endpoint?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "A route that returns the full list of users so that the platform can store a copy",
      "A light route, such as /health, that the platform calls to see if the service is alive",
      "A route that restarts the server every few minutes to free up its memory",
      "A route that writes the administrator password to the logs for easy debugging"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to files written to the local disk of many cloud hosts when the service restarts?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "They are kept forever and shared by every new instance of the service",
      "They are often lost, so uploads should go to external storage",
      "They are encrypted and moved to the database of the platform",
      "They are copied back to the repository by the platform automatically"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can the first request to a free tier service be slow?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "The free tier compresses the response very strongly to save bandwidth",
      "The platform checks the code for errors before each response is sent",
      "The database is rebuilt from scratch for every request made",
      "The service may be put to sleep after inactivity and has to start again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must be allowed in the Atlas network access list for a cloud hosted API?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "The outbound addresses of the host, or a wider range if they are not fixed",
      "Only the address of the developer laptop where the code was written",
      "No address at all, because Atlas trusts every connection from any host",
      "The address of the front end, so the browser can reach the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should the API allow requests from the deployed front end?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "Disable the browser for the front end so that CORS is not enforced",
      "Add the origin to the package.json file of the front end project",
      "Configure CORS with the exact origin of the front end",
      "Send the front end code to the API so that it becomes the same origin"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a build command and a start command mean for a Node service?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "The start command prepares the code, and the build command runs the server",
      "Both commands do the same thing and only one of them has to be set",
      "The build prepares the code, and the start command runs the server",
      "The build command is used for the front end and never for any API"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why log to standard output on a cloud platform?",
    "topic": "Deploying Node and Angular",
    "choices": [
      "The platform collects the output and shows it as logs for the service",
      "The platform deletes files created by the app so log files cannot be used",
      "Standard output is encrypted, which keeps the logs safe from other users",
      "Log files are not allowed in Node applications that run in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is MongoDB Atlas?",
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
    "choices": [
      "The connection is refused or times out",
      "The data is returned but it is empty for the new address",
      "The cluster deletes the user of the server after a failed attempt",
      "The cluster creates a new database for the address that was refused"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which option best describes a free shared tier of Atlas?",
    "topic": "MongoDB Atlas hosting",
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
    "topic": "MongoDB Atlas hosting",
    "choices": [
      "Delete the commit and keep using the same password for the database",
      "Rotate it right away, because it should be treated as leaked",
      "Change the name of the repository and leave the password unchanged",
      "Do nothing, because Atlas blocks misuse of leaked passwords by itself"
    ],
    "answerIdx": 1
  }
]
```

