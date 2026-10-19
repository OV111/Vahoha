LAYER: t3-1

```json
[
  {
    "stem": "What does the destructuring statement const { name, age } = user do?",
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
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
    "topic": "ES modules and modern syntax",
    "choices": [
      "All the passed arguments into a real array called nums",
      "Only the last argument that was passed in the call",
      "The arguments into an object keyed by position",
      "Arguments after the first one, leaving the first inside the arguments object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does TypeScript add to JavaScript?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "A new runtime that replaces the JavaScript engine of the browser and runs faster",
      "Extra syntax that the browser understands natively without any build step at all",
      "A set of components that handle state for React applications out of the box",
      "Static types that are checked at compile time and then removed from the output"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between an interface and a type alias for an object shape?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "Interfaces exist at runtime and can be checked with instanceof, while aliases cannot be",
      "Interfaces can be extended and merged by declaration, aliases can also name unions",
      "Aliases can only describe primitive types, while interfaces can describe whole objects",
      "Interfaces are required for React props, and aliases are only for functions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the type string | undefined mean?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "The value is a string that was converted to undefined",
      "The value is either a string or undefined",
      "The value must be both a string and undefined together",
      "The value is a string that may be empty but never undefined"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the unknown type require before you use a value of it?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "Nothing at all, because unknown behaves exactly like the any type",
      "A cast to any, since unknown values cannot be narrowed by checks",
      "A declaration of the value as const so that its type cannot change",
      "A check or narrowing, such as typeof, so the compiler knows the real type"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a generic such as Array<T> let you do?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "Write code that works with many types while keeping the type information",
      "Store values of any type in the same array without checking them",
      "Convert the items of the array to strings before they are stored",
      "Make the array immutable so that its elements cannot be changed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the optional property syntax name?: string mean in an interface?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "The property must exist and must always be an empty string",
      "The property is a string that is removed during compilation",
      "The property may be missing, and if it exists it must be a string",
      "The property is private and cannot be read from outside the object"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the as const assertion do on an object literal?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "Converts the object into a class with constant methods",
      "Freezes the object at runtime so it cannot be changed",
      "Makes its properties readonly and narrows values to literal types",
      "Casts the object to the any type so that errors are hidden"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a discriminated union?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "A union of object types that share a literal field used to tell them apart",
      "A union of two primitive types that is written with the pipe symbol",
      "A union whose members are all optional properties of one interface",
      "A union that the compiler converts into a single object type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "A type with only the first property of User kept",
      "A type that excludes the properties which are optional in User",
      "A type where every property of User is turned into a string",
      "A type with all the properties of User made optional"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is the any type usually discouraged?",
    "topic": "Static types, interfaces, and type aliases",
    "choices": [
      "It is slower at runtime than every other type that the language has",
      "It turns off type checking for that value and lets mistakes through silently",
      "It cannot be used together with interfaces or with generic types",
      "It makes the compiled JavaScript output larger than it needs to be"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does type narrowing mean in TypeScript?",
    "topic": "Generics and utility types",
    "choices": [
      "The compiler converts a value to a narrower type at runtime by copying its fields",
      "The compiler refines a broad type to a more specific one inside a checked branch",
      "The compiler removes unused types from the program so that the output is smaller",
      "The compiler rejects every union type and asks for a single type per variable"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which check narrows a value of type string or number to string?",
    "topic": "Generics and utility types",
    "choices": [
      "value instanceof String with the capital letter at the start of the name",
      "value.length > 0 because only strings have a length property at all",
      "Number.isNaN(value) because numbers are never equal to themselves",
      "typeof value === \"string\""
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the in operator narrow, as in if (\"radius\" in shape)?",
    "topic": "Generics and utility types",
    "choices": [
      "It narrows a union of object types to the member that has that property",
      "It narrows the type of every property of the object to a string type",
      "It checks the values of the properties and narrows them to numbers",
      "It narrows the object to the type of its first declared property"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a user defined type guard?",
    "topic": "Generics and utility types",
    "choices": [
      "A function that throws an error when a value has the wrong type at runtime",
      "A class that wraps a value and hides its real type from the compiler",
      "A function whose return type is a predicate such as value is User",
      "A comment that tells the compiler which type to assume for a variable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Pick<User, \"id\" | \"name\"> produce?",
    "topic": "Generics and utility types",
    "choices": [
      "A type that removes the id and name properties from User",
      "A type that makes id and name optional on User",
      "A type with only the id and name properties of User",
      "A union of the types of the id and name properties"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Omit<User, \"password\"> produce?",
    "topic": "Generics and utility types",
    "choices": [
      "A type with every property of User except password",
      "A type that contains only the password property of User",
      "A type that renames the password property to a private one",
      "A type that makes password optional while keeping the others"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Record<string, number> describe?",
    "topic": "Generics and utility types",
    "choices": [
      "An array of strings that is paired with an array of numbers",
      "A tuple that holds one string followed by one number",
      "A class with a string name property and a number id property",
      "An object whose keys are strings and whose values are numbers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Readonly<T> do to an object type?",
    "topic": "Generics and utility types",
    "choices": [
      "Freezes the object at runtime so that its properties cannot be changed",
      "Makes every property read only, so assignments are rejected by the compiler",
      "Hides the properties of the object from code outside the module",
      "Converts every property into a getter function on the object"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does ReturnType<typeof fn> give you?",
    "topic": "Generics and utility types",
    "choices": [
      "The type of the first parameter of the function fn",
      "The type that the function fn returns",
      "The runtime value that the function fn returns on its first call",
      "The type of the function fn including all of its parameters"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why prefer unknown over any for values from outside, such as JSON?",
    "topic": "Generics and utility types",
    "choices": [
      "unknown is faster than any because the compiler skips more checks",
      "unknown values are converted to strings so they are always safe",
      "unknown lets you call any method on the value without errors",
      "unknown forces you to narrow the value before you use it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a discriminated union in TypeScript?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "A union of object types that share a literal field, which tells the members apart",
      "A union of two primitive types, written with the pipe symbol between them",
      "A union whose members are all optional properties of a single interface",
      "A union that the compiler converts into one object type at build time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Given type Shape = { kind: \"circle\"; r: number } | { kind: \"square\"; side: number }, what does checking shape.kind do?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "Converts shape to a string that holds the value of its kind field",
      "Removes the kind field from shape for the rest of the function",
      "Narrows shape to the member whose kind matches inside that branch",
      "Throws an error at runtime when the kind is not one of the two names"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is exhaustiveness checking with never?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "Marking a function with never so that it can return any value later",
      "Using never as the type of a variable that is never read again",
      "Assigning the leftover value to never makes the compiler fail if a union case is missed",
      "Telling the compiler to stop checking the branches after the first match"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement narrows a value of type string or null to string?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "if (value !== null) { ... }",
      "if (value instanceof null) { ... }",
      "if (typeof value === \"null\") { ... } with the string literal null",
      "if (value.length) { ... } without any check on the value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the in operator do for narrowing, as in \"swim\" in animal?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "It checks that the value of the swim property is a function",
      "It adds a swim property to the animal if it is missing",
      "It converts the animal to a type that has only the swim property",
      "It narrows a union to the members that have a swim property"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is a discriminated union often better than optional fields on one type?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "Optional fields are not allowed by the compiler in any type of object",
      "Each state carries only valid fields, so impossible combinations are not representable",
      "Unions are removed at compile time and so cost nothing at runtime",
      "Optional fields make the code slower because they need extra checks"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the compiler do after a return inside an if branch that checks a type?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "Forgets the type information of the variable for the rest of the function",
      "Narrows the type in the code that follows, since the other case already returned",
      "Converts the variable to the type that was checked in the branch",
      "Emits a runtime check that repeats the test in later lines"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a type predicate, such as function isUser(x: unknown): x is User?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "A decorator that checks at runtime that the argument has all fields of User",
      "A class constructor that creates a User from any kind of value",
      "A comment that documents the expected type of the argument",
      "A return type that tells the compiler the argument is a User when the function returns true"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does instanceof narrow?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "A value to a class type inside the branch where the check is true",
      "A value to a primitive type such as string or number",
      "A value to the type of its first property in the object",
      "A value to an interface that it implements at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which pattern models a request that is loading, successful or failed?",
    "topic": "Discriminated unions and narrowing",
    "choices": [
      "One object with optional data and error fields that can all be set at once",
      "Three separate boolean variables that are updated one at a time",
      "A union of objects with a status field, such as \"loading\", \"success\" and \"error\"",
      "A single string that holds the name of the current state only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the tsconfig.json file do in a TypeScript project?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "It lists the npm packages that the project needs in order to run",
      "It stores the type definitions of every library that is installed",
      "It tells the compiler which files to include and which options to apply",
      "It configures how the project is deployed to a hosting platform"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the strict option turn on?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "A family of strict type checking options, such as noImplicitAny and strictNullChecks",
      "A mode in which the compiler refuses to emit any JavaScript at all",
      "A mode in which every variable must be declared with the const keyword",
      "A mode in which the generated JavaScript runs in strict mode only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the target option control?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "The folder in which the compiled files are placed after the build",
      "The environment in which the tests of the project are executed",
      "The server to which the compiled code is uploaded",
      "The version of JavaScript that the compiler emits"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the outDir option control?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "The folder from which the compiler reads the TypeScript sources",
      "The folder in which the compiler writes the generated JavaScript",
      "The folder in which the type declaration files are searched for",
      "The folder where the compiler stores its cache between runs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the module option decide?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "Which folders of the project are treated as separate modules",
      "Which module system the emitted JavaScript uses, such as ESM or CommonJS",
      "Which npm package manager is used to install the dependencies",
      "Whether the project may import files that are written in JSON"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does noEmit do?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "Stops the compiler from reading the files that are in node_modules",
      "Removes the comments from the emitted JavaScript output",
      "Prevents the editor from showing any errors while you type",
      "Type checks the code without writing any JavaScript files"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does a TypeScript project often use a separate tool to run the code, such as tsx or a bundler?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "The compiler only checks and emits code, and a runner or bundler executes or packages it",
      "The compiler cannot emit JavaScript that runs in Node without a plugin",
      "Node refuses to run any file that has been type checked by the compiler",
      "The runner adds the types back to the code so that the checks run live"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are declaration files that end in .d.ts used for?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "Storing the compiled JavaScript output that is shipped to production",
      "Declaring the environment variables that the application reads",
      "Describing the types of JavaScript code so that TypeScript can check it",
      "Listing the files that the compiler should leave out of the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the include option in tsconfig list?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "The npm packages that must be installed before compiling",
      "The browsers that the compiled code has to support",
      "The files or folders that the compiler should process",
      "The type definitions that are added to the global scope"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the compiler do with types when it emits JavaScript?",
    "topic": "tsconfig and compiler options",
    "choices": [
      "Removes them, because types exist only at compile time",
      "Keeps them as comments that the runtime checks on each call",
      "Converts them into runtime checks that throw errors on mismatches",
      "Converts them into classes that the program can inspect later"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are the three states of a Promise?",
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
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
    "topic": "Async/await and promises",
    "choices": [
      "It is thrown synchronously to the caller of then",
      "It rejects the promise returned by that .then call",
      "It is ignored if no catch is attached anywhere",
      "It stops the event loop of the page"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-2

```json
[
  {
    "stem": "What is a React functional component?",
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
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
    "topic": "Components and props",
    "choices": [
      "A component defined inside another one gets a new type each render and loses state",
      "Components that are defined inside others cannot receive props from the parent",
      "Nested components cannot return JSX because they have no render method of their own",
      "React does not allow more than one function to be declared in the same file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the useState hook return?",
    "topic": "State with useState",
    "choices": [
      "A reference object whose current value never triggers a render",
      "A promise that resolves with the state once it has been saved",
      "The previous value and the next value of the state together",
      "The current value and a function that updates it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must state be updated with its setter and not by direct assignment?",
    "topic": "State with useState",
    "choices": [
      "Direct assignment is a syntax error inside function components",
      "React must know about the change so that it can render the component again",
      "The setter saves the value to storage so it survives a reload",
      "Direct assignment changes the value for all other components too"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does an effect with an empty dependency array run?",
    "topic": "State with useState",
    "choices": [
      "After every render of the component",
      "After the first render only",
      "Before the first render of the component",
      "Each time any prop of the component changes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of the cleanup function returned from an effect?",
    "topic": "State with useState",
    "choices": [
      "Return the value that the component will render after the effect has run",
      "Delete the state of the component when the effect has finished running",
      "Run the effect a second time to confirm that its result is stable",
      "Undo what the effect set up, such as a timer or listener, before it runs again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does useRef give you?",
    "topic": "State with useState",
    "choices": [
      "A mutable container whose changes do not cause a re-render",
      "A copy of the state that updates faster than useState does",
      "A way to read the props of the parent component directly",
      "A function that forces the component to render immediately"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When should you use useReducer instead of useState?",
    "topic": "State with useState",
    "choices": [
      "When you only need to store one boolean flag for a toggle",
      "When you want to avoid every re-render of the component",
      "When the next state depends on actions and the logic has several cases",
      "When the state must be shared with the server automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What problem does useMemo solve?",
    "topic": "State with useState",
    "choices": [
      "It stores the component output on the server between requests",
      "It prevents a component from ever rendering more than once",
      "It reuses the result of a costly calculation until its dependencies change",
      "It copies props into state when the component is first created"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a custom hook let you do?",
    "topic": "State with useState",
    "choices": [
      "Share stateful logic between components without sharing the state itself",
      "Share one single state value between all of the components that call the hook",
      "Replace the built in hooks with functions that you write on your own for each app",
      "Run code on the server before the component has been created at all in the tree"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are hooks called at the top level of a component?",
    "topic": "State with useState",
    "choices": [
      "Hooks inside blocks are skipped by the compiler for speed",
      "Only the first hook of a component is stored by React",
      "Hooks need to be declared before the imports of the file",
      "React relies on their call order staying the same on every render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a common cause of an infinite loop with useEffect?",
    "topic": "State with useState",
    "choices": [
      "Using more than one effect in the same component at the same time",
      "Setting state inside an effect that has no dependency array, or changing dependencies",
      "Reading the value of a prop inside the body of the effect function",
      "Returning a cleanup function from an effect that also sets some state"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the call const [count, setCount] = useState(0) give you?",
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Effects with useEffect",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Lists, keys, and conditional rendering",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
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
    "topic": "Forms and controlled inputs",
    "choices": [
      "So the component re-renders to show them next to the fields",
      "So the browser can send them to the server automatically",
      "So they stay after the page is closed",
      "So that React validates the inputs for you"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you type the props of a component in TypeScript?",
    "topic": "Typing components and hooks",
    "choices": [
      "Add a comment above the function that describes each prop and the type it has",
      "Wrap the component in a function that checks the types of props at runtime",
      "Export the props as a default value from the file that holds the component",
      "Declare an interface or type for them and use it on the parameter"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the type of the event in an onChange handler of an input?",
    "topic": "Typing components and hooks",
    "choices": [
      "React.MouseEvent<HTMLInputElement>",
      "React.ChangeEvent<HTMLInputElement>",
      "React.InputEvent<HTMLElement> only",
      "Event<InputElement> from the DOM library"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you type a function prop that takes a string and returns nothing?",
    "topic": "Typing components and hooks",
    "choices": [
      "function(value): string",
      "(value: string) => void",
      "(value) => string[]",
      "void<string> value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you type the children prop of a component?",
    "topic": "Typing components and hooks",
    "choices": [
      "React.Element[]",
      "JSX.Children",
      "string | number",
      "React.ReactNode"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the type React.FC add that a plain typed function does not?",
    "topic": "Typing components and hooks",
    "choices": [
      "It is not required, because a plain function with typed props works well",
      "It is required, because React refuses untyped components at runtime",
      "It adds the key prop to every component automatically",
      "It makes the component render twice in development mode"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you type the state of useState when the initial value is null but later holds a User?",
    "topic": "Typing components and hooks",
    "choices": [
      "useState<User>(null)",
      "useState(User, null)",
      "useState<User | null>(null)",
      "useState<null>(User)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the keyof operator return for an object type?",
    "topic": "Typing components and hooks",
    "choices": [
      "An array of the values of its properties",
      "The number of properties in the object",
      "A union of the names of its properties",
      "The type of the first property"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a component accept any HTML attributes of a button?",
    "topic": "Typing components and hooks",
    "choices": [
      "Extend React.ComponentProps<\"button\"> for its props",
      "Declare every attribute of the button by hand in an interface",
      "Pass a single props object of type any to the component",
      "Use a global declaration for the button element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a type guard such as typeof value === \"string\" do?",
    "topic": "Typing components and hooks",
    "choices": [
      "Converts the value to a string for the rest of the function",
      "Throws an error when the value is not a string at all",
      "Removes the check from the compiled JavaScript output",
      "Narrows the type inside the block where the check is true"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why type a form event handler as React.FormEvent?",
    "topic": "Typing components and hooks",
    "choices": [
      "So that the form data is validated before the event runs",
      "So that event properties and methods such as preventDefault are known",
      "So that the form submits to the server without a page reload",
      "So that the handler can only be called once per form"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-3

```json
[
  {
    "stem": "In the App Router, what turns a folder into a route that visitors can open?",
    "topic": "File-based routing and layouts",
    "choices": [
      "A config entry that lists the route in the Next.js settings file at the project root",
      "A component exported from the folder with the same name as the folder itself",
      "A page file inside the folder",
      "A route table that must be registered in a layout at the top of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do App Router routes live by default?",
    "topic": "File-based routing and layouts",
    "choices": [
      "In the app directory",
      "In a pages directory that holds one file for each route of the site",
      "In a routes file at the root where every path is declared by hand",
      "In the public directory next to the images and the favicon"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which file path serves the url /blog/archive?",
    "topic": "File-based routing and layouts",
    "choices": [
      "app/blog/archive.tsx with an exported default function for the page",
      "app/archive/blog/page.tsx because the segments are read from the end",
      "app/blog/page.tsx with a path option set to archive in its metadata",
      "app/blog/archive/page.tsx"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a folder without a page file do in the route tree?",
    "topic": "File-based routing and layouts",
    "choices": [
      "It becomes a page that shows a list of the files inside the folder",
      "It adds a path segment but is not reachable as a page by itself",
      "It is ignored completely and none of the folders under it are routed",
      "It is rendered as a redirect to the nearest parent folder that has a page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which component does Next.js use for client side navigation between pages?",
    "topic": "File-based routing and layouts",
    "choices": [
      "The anchor element with a click handler that calls window.location",
      "Link from next/link",
      "A Navigate component that is imported from the React package",
      "The Route component with a path prop set to the target url"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you add a folder to the url without a page file in it being visible?",
    "topic": "File-based routing and layouts",
    "choices": [
      "Prefix the folder name with an underscore so it is hidden from the url",
      "Add a hidden flag to the route settings in next.config.js",
      "Name the folder with a leading dot so the router skips the segment",
      "Wrap the folder name in parentheses to make a route group"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is colocation in the App Router?",
    "topic": "File-based routing and layouts",
    "choices": [
      "Files such as components and tests can sit in a route folder without becoming routes",
      "All routes must be stored in the same folder as their components and styles",
      "Every route needs its own copy of the shared components that it uses",
      "Pages and API handlers must be placed in one single file together"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What makes a file a public route in the App Router?",
    "topic": "File-based routing and layouts",
    "choices": [
      "Any file that is placed inside the app folder becomes a route of its own",
      "Any exported function whose name starts with a capital letter is routed",
      "Only a page or route file inside a folder makes the path publicly accessible",
      "Any file with a name that matches a segment of the current url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the file name for the UI of the not found page of a route segment?",
    "topic": "File-based routing and layouts",
    "choices": [
      "404-page",
      "missing",
      "not-found",
      "error-404"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which statement about the url and folders is correct?",
    "topic": "File-based routing and layouts",
    "choices": [
      "Nested folders create nested path segments in the url",
      "Nested folders are flattened into a single path segment in the url",
      "Folders create query parameters instead of path segments",
      "The url is built from the file names and not from the folders"
    ],
    "answerIdx": 0
  },
  {
    "stem": "In the App Router, what is a component by default?",
    "topic": "Server and client components",
    "choices": [
      "A client component, rendered in the browser after hydration",
      "A static component, rendered once at build time for all users",
      "An edge component, rendered by the network closest to the visitor",
      "A server component, rendered on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can a server component do that a client component cannot?",
    "topic": "Server and client components",
    "choices": [
      "Respond to clicks and other user events on the page",
      "Read from a database or the file system directly while rendering",
      "Hold state with the useState hook and update it later",
      "Use browser APIs such as window and localStorage"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can a client component do that a server component cannot?",
    "topic": "Server and client components",
    "choices": [
      "Access secrets from environment variables without exposing them",
      "Use state, effects and browser event handlers",
      "Fetch data on the server before the page is sent to the browser",
      "Send less JavaScript to the browser than any other component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a benefit of server components for the JavaScript bundle?",
    "topic": "Server and client components",
    "choices": [
      "Their code is compressed twice, which makes the bundle smaller for the browser",
      "Their code is split into separate files that load on demand when they are needed",
      "Their code is converted into CSS, which the browser is able to load faster",
      "Their code is not sent to the browser, so the bundle stays smaller"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which hook is unavailable in a server component?",
    "topic": "Server and client components",
    "choices": [
      "useState",
      "use",
      "useId",
      "cache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a server component import and render a client component?",
    "topic": "Server and client components",
    "choices": [
      "No, a server component may render only other server components",
      "Yes, but only when the client component has no props at all",
      "Yes, client components can be used inside server components",
      "No, the two kinds must be placed in separate route folders"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can a client component import a server component directly?",
    "topic": "Server and client components",
    "choices": [
      "Yes, and the imported component keeps running on the server",
      "Yes, but only when both of them are in the same file",
      "No, but a server component can be passed to it as children or a prop",
      "No, because client components cannot render any children"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can you keep an API key in a server component?",
    "topic": "Server and client components",
    "choices": [
      "The code and its environment variables never reach the browser",
      "Server components encrypt the keys before they are used in any of the calls",
      "The browser blocks every request that includes a secret value in its headers",
      "Next.js removes the keys from the code of the app when it is deployed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should interactive widgets such as a like button usually live?",
    "topic": "Server and client components",
    "choices": [
      "In the root layout, so every page receives the same widgets",
      "In a route handler that returns the HTML for the widget",
      "In a server component that registers click listeners",
      "In small client components, so most of the page stays on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good way to share data between server components without prop drilling?",
    "topic": "Server and client components",
    "choices": [
      "Put it in React context, which server components read freely",
      "Fetch it where it is needed, since repeated fetches are deduplicated",
      "Store it in a global variable that is shared between requests",
      "Save it in localStorage and read it back inside each component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which fetch option opts a single request out of the data cache?",
    "topic": "Data fetching and caching",
    "choices": [
      "mode set to no-cors",
      "cache set to no-store",
      "method set to HEAD",
      "keepalive set to false"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you make fetched data refresh at most once a minute?",
    "topic": "Data fetching and caching",
    "choices": [
      "Call setInterval with 60000 inside the component",
      "Add a Cache-Control header with 60 to the page",
      "Restart the server every 60 seconds with a scheduler",
      "Pass next: { revalidate: 60 } to fetch"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does revalidatePath do?",
    "topic": "Data fetching and caching",
    "choices": [
      "Marks the data of a path as stale so it is rebuilt on the next request",
      "Changes the url of a page for all of the visitors who open it",
      "Deletes the file of the page from the output of the build",
      "Checks that the path of a page is spelled correctly in the code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does revalidateTag do?",
    "topic": "Data fetching and caching",
    "choices": [
      "Adds an HTML tag to the head of every single page of the whole app",
      "Removes a tag from the metadata that belongs to the current route",
      "Invalidates cached fetches that were tagged with that name",
      "Validates the tags of a blog post against a schema before it is saved"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you attach a tag to a fetch request for later invalidation?",
    "topic": "Data fetching and caching",
    "choices": [
      "Add a data-tag attribute to the element that shows the data",
      "Name the file with the tag in its file name",
      "Pass next: { tags: [\"posts\"] } in the fetch options",
      "Write the tag in a comment above the fetch call"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where can you fetch data directly in the App Router?",
    "topic": "Data fetching and caching",
    "choices": [
      "Inside async server components, by awaiting the call",
      "Only inside route handlers that return JSON to the page",
      "Only in client components with the useEffect hook",
      "Only in the root layout of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of fetching in a server component compared with an effect in the browser?",
    "topic": "Data fetching and caching",
    "choices": [
      "The data is always cached by the browser for the next visit of the user",
      "The data is encrypted while it travels between the server and the browser",
      "The data is refreshed automatically every few seconds while the page is open",
      "The data arrives with the HTML, with no extra round trip or loading flicker"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a server component query a database?",
    "topic": "Data fetching and caching",
    "choices": [
      "Send a fetch request to the page that belongs to the same route as the component",
      "Call the database client directly in the component code",
      "Import the database driver inside a client component and query from the browser",
      "Use a hook that returns the rows of a table as an array to the component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you run two independent data requests at the same time in a server component?",
    "topic": "Data fetching and caching",
    "choices": [
      "Await the first request and then start the second one",
      "Start both promises and await them together with Promise.all",
      "Place each request in a separate route group of the app",
      "Use two effects that run when the component mounts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a request waterfall?",
    "topic": "Data fetching and caching",
    "choices": [
      "Requests that are split across several servers for speed",
      "Requests that are cached by the browser one after another",
      "Requests that run in parallel and finish together",
      "Requests that wait for each other even though they are independent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a route handler?",
    "topic": "Route handlers",
    "choices": [
      "A route.ts file that exports functions for HTTP methods such as GET and POST",
      "A component that handles the navigation between the pages of the app",
      "A hook that fetches the data for the route that is currently open",
      "A middleware that runs before every page request that the app receives"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you place a route handler for the url /api/posts?",
    "topic": "Route handlers",
    "choices": [
      "In app/api/posts.ts as a default export",
      "In pages/api/posts.js with a handler function",
      "In app/api/posts/route.ts",
      "In app/posts/api.ts next to the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you return JSON from a route handler?",
    "topic": "Route handlers",
    "choices": [
      "Return the object directly from the function",
      "Call res.send(data) on the response argument",
      "Return Response.json(data) or NextResponse.json(data)",
      "Write the JSON string to the console of the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which exported function name handles a POST request?",
    "topic": "Route handlers",
    "choices": [
      "POST",
      "handlePost",
      "onPost",
      "post"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you read a JSON body in a route handler?",
    "topic": "Route handlers",
    "choices": [
      "request.body.json",
      "JSON.parse(request.text) without await",
      "request.data()",
      "await request.json()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When should you use a route handler instead of a server action?",
    "topic": "Route handlers",
    "choices": [
      "When you only need to submit a form that lives on your own page",
      "When external clients, webhooks or other apps need to call an endpoint",
      "When a component needs to read some data while it renders on the server",
      "When you want to avoid having to write any kind of server code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a page and a route file are in the same folder?",
    "topic": "Route handlers",
    "choices": [
      "The page answers GET and the route answers other methods",
      "It is not allowed, since both would answer the same path",
      "The route file is used for the first request only",
      "Both are served and the browser picks one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read a dynamic segment in a route handler?",
    "topic": "Route handlers",
    "choices": [
      "From request.url with a regular expression only",
      "From a global object that the router fills in",
      "From the headers of the incoming request",
      "From the second argument, which holds the params"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you set a status code in a route handler response?",
    "topic": "Route handlers",
    "choices": [
      "Pass status in the options, such as Response.json(data, { status: 201 })",
      "Call response.status(201) on the object that the handler has returned",
      "Add a status field to the JSON body that the response carries",
      "Throw an error that has the number of the status as its message"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do route handlers in the App Router replace from the older approach?",
    "topic": "Route handlers",
    "choices": [
      "Layout files in the app directory",
      "Middleware files at the root of the project",
      "API routes in the pages directory",
      "Server components that fetch data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set the title and description of a page in the App Router?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "Add a title tag inside the body of the page component by hand",
      "Call a setTitle function in a client effect after the page mounts",
      "Export a metadata object or a generateMetadata function from the page or layout",
      "Write the title in a next.config file for each route of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When do you use generateMetadata instead of a static metadata object?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "When the metadata depends on dynamic data, such as a post that is fetched by id",
      "When the page has more than one layout above it in the folder tree",
      "When the title must change every time the user clicks inside the page",
      "When the page is a client component that uses state and effects"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are Open Graph tags used for?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "Telling search engines which pages of the site they must never index",
      "Setting the language and the character set of the whole document",
      "Defining the colours that the browser uses for the address bar",
      "Controlling how a link looks when it is shared on social platforms"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a robots.txt file tell crawlers?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "Which pages of the site have the highest rank in the results",
      "Which paths they are allowed or not allowed to crawl",
      "Which languages the pages of the site have been written in",
      "Which images of the site are protected by copyright"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the purpose of a sitemap?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "Showing visitors a map of the navigation menu on the page",
      "Listing the urls of a site so crawlers can find and index them",
      "Compressing the pages of the site to make them load faster",
      "Hiding the private pages of the site from the search results"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should every page have a unique title and description?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "Browsers refuse to open pages that have the same title as another",
      "Search engines delete pages whose titles are not unique on the site",
      "Titles are used by the router to decide which page to render",
      "Search results and shared links show them, so unique text helps users choose"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a canonical url?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "The preferred address of a page, which avoids duplicate content problems",
      "The address that the server redirects to when the page is missing",
      "The address of the home page that all links should point to",
      "The address of the CDN that serves the static files of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does server rendering help SEO for content pages?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "Search engines refuse to index pages that run any JavaScript at all",
      "Server rendered pages are ranked higher by a rule of every search engine",
      "Crawlers receive the content in the HTML without needing to run client code",
      "The server rewrites the content to include more of the keywords"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which element helps assistive tools and crawlers understand the structure of a page?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "A large number of nested div elements with class names",
      "Inline styles that describe the role of each element",
      "Semantic HTML such as main, nav, article and one h1",
      "Images of text that show the headings of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the alt text of an image contribute to SEO and accessibility?",
    "topic": "Metadata and SEO basics",
    "choices": [
      "A text description that screen readers and crawlers can use",
      "The name of the file that the browser saves for the image",
      "A tooltip that appears when the visitor hovers over the picture",
      "The size of the image that is used for the layout"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a loading file do in a route segment?",
    "topic": "Loading and error boundaries",
    "choices": [
      "Loads the data of the page before the user opens the route",
      "Stops the navigation until the page has finished rendering",
      "Prefetches the images of the page in the background",
      "Shows an instant fallback while the content of the segment is loading"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which React feature does loading use internally?",
    "topic": "Loading and error boundaries",
    "choices": [
      "Context",
      "Suspense",
      "Portals",
      "Error boundaries"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an error file do in a route segment?",
    "topic": "Loading and error boundaries",
    "choices": [
      "Logs every error of the segment to a file on the server disk",
      "Catches errors in the segment and shows a fallback UI with a way to retry",
      "Stops the server when an error happens so it can restart",
      "Hides the segment from the visitors until the error is fixed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must an error file be a client component?",
    "topic": "Loading and error boundaries",
    "choices": [
      "Error files are served from the browser cache only",
      "Server components cannot throw any errors at all",
      "Client components are the only ones allowed to export a default function",
      "Error boundaries need client side features such as state to offer a retry"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the reset function passed to an error component do?",
    "topic": "Loading and error boundaries",
    "choices": [
      "Tries to render the segment again",
      "Clears all cookies of the visitor and reloads",
      "Restarts the Next.js server process",
      "Navigates to the home page of the site"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which file handles errors that happen in the root layout?",
    "topic": "Loading and error boundaries",
    "choices": [
      "error placed next to the root layout",
      "root-error in the app folder",
      "global-error",
      "not-found in the app folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does calling notFound() in a server component do?",
    "topic": "Loading and error boundaries",
    "choices": [
      "Redirects the visitor to the home page with a 302 status",
      "Throws an error that is shown by the global error file",
      "Renders the closest not-found UI and sets a 404 status",
      "Logs a warning and keeps rendering the rest of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should a loading file be placed to show a skeleton for a whole section?",
    "topic": "Loading and error boundaries",
    "choices": [
      "In the folder of the section, next to its layout and pages",
      "In the public folder where static files are served from",
      "In the root of the project next to package.json",
      "In the folder of each component that needs a skeleton"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does the loading UI affect navigation?",
    "topic": "Loading and error boundaries",
    "choices": [
      "The whole page waits until all data has loaded before it shows",
      "The page is rendered twice, first on the server and then in the browser",
      "The loading file blocks the layout until the page content arrives",
      "The layout is shown at once, and the page streams in when ready"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an error boundary not catch?",
    "topic": "Loading and error boundaries",
    "choices": [
      "Errors thrown while a child component renders",
      "Errors thrown in event handlers, which you handle with try and catch",
      "Errors from server components that are passed to the client",
      "Errors thrown in the data fetching of the segment"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-4

```json
[
  {
    "stem": "What is the idea behind utility first CSS as used by Tailwind?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Write one large stylesheet with a class name for every component",
      "Use JavaScript objects for every style instead of any CSS files",
      "Style elements by combining small single purpose classes in the markup",
      "Generate a new stylesheet from the HTML for each page at runtime"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the class p-4 do in Tailwind?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Adds padding on all sides from the spacing scale",
      "Sets the position of the element to the fourth layer",
      "Pins the paragraph to the page with a fixed width",
      "Applies a pixel value of four to the font size"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Tailwind keep the final CSS small?",
    "topic": "Utility classes and the box model",
    "choices": [
      "It compresses every class into a single shared rule",
      "It removes whitespace from the HTML that is sent to browsers",
      "It loads the classes from a CDN only when they are used",
      "It generates only the classes that it finds in your source files"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a variant such as hover:bg-blue-500 do?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Changes the background after the page has finished loading",
      "Applies the background only while the pointer is over the element",
      "Applies the background to every child of the element",
      "Makes the element blue on touch devices only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can a class name built from a variable, such as `bg-${color}-500`, fail?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Template literals are not allowed inside a className prop",
      "Tailwind scans for complete class names, so partial strings are not found",
      "Tailwind refuses to use classes that contain a number",
      "The browser cannot handle a class name that is built at runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside people raise about utility classes?",
    "topic": "Utility classes and the box model",
    "choices": [
      "They cannot be used together with any kind of component in React",
      "They make the final CSS file larger than a normal stylesheet would be",
      "They work only with one special editor that has a plugin to support them",
      "Long class lists in the markup can be hard to read without components"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does w-full do?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Sets the width of the element to 100 percent of its parent",
      "Sets the width to the full width of the screen in pixels",
      "Sets the element so that it is wider than all of its siblings",
      "Sets the width to the largest value in the spacing scale"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you change the colors of the Tailwind theme to match a brand?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Overwrite the generated CSS file by hand after each build",
      "Add inline styles with brand colours to every element",
      "Extend the theme in the Tailwind configuration",
      "Install a separate package for every colour that you add"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does flex items-center justify-between do on a container?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Stacks the children in a column and centres that column on the whole page",
      "Places the children in a grid that has equal columns and equal rows",
      "Lays out children in a row, centred on the cross axis, spread along the main axis",
      "Hides the children of the container until the container is hovered over"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of design tokens such as the spacing scale?",
    "topic": "Utility classes and the box model",
    "choices": [
      "Values stay consistent across the app because everyone picks from one set",
      "Pages load faster because the scale is stored in the cache of the browser",
      "Colours are checked for contrast by the compiler on each production build",
      "Sizes are converted into pixel values for every kind of device that visits"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Tailwind handle responsive design?",
    "topic": "Responsive breakpoints",
    "choices": [
      "With a separate stylesheet for every device type that you support",
      "With JavaScript that measures the screen on each resize event",
      "With a special component that swaps layouts for phones and desktops",
      "With breakpoint prefixes such as md: that apply from a minimum width up"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Tailwind use as its default approach to breakpoints?",
    "topic": "Responsive breakpoints",
    "choices": [
      "Desktop first, so unprefixed classes apply only to large screens",
      "Mobile first, so unprefixed classes apply to all sizes",
      "Tablet first, so unprefixed classes apply to medium screens",
      "Orientation first, so classes depend on the device rotation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does md:flex-row do together with flex-col?",
    "topic": "Responsive breakpoints",
    "choices": [
      "Uses a row on small screens and a column from the md breakpoint up",
      "Uses a column on small screens and a row from the md breakpoint up",
      "Uses a column on every screen and ignores the md prefix",
      "Uses a row only on devices that are held in landscape mode"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you style an element for dark mode?",
    "topic": "Responsive breakpoints",
    "choices": [
      "Rename the classes with a dark suffix for each element",
      "Load a second stylesheet when the system theme is dark",
      "Write a media query by hand in every component",
      "Use the dark: variant, such as dark:bg-gray-900"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What are the two common strategies for dark mode in Tailwind?",
    "topic": "Responsive breakpoints",
    "choices": [
      "Following the system preference, or toggling a class or attribute you control",
      "Using a separate subdomain, or a separate build, for the dark pages only",
      "Checking the time of day or the location of the visitor on each request",
      "Choosing the theme on the server for each user and for each request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why store the theme choice of a user, for example in a cookie or localStorage?",
    "topic": "Responsive breakpoints",
    "choices": [
      "Browsers apply the dark theme to all sites that store a value",
      "The server needs the value to build the stylesheet for the user",
      "The page can show the right theme again on the next visit",
      "It makes the page load faster for returning visitors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can cause a flash of the wrong theme on load?",
    "topic": "Responsive breakpoints",
    "choices": [
      "The theme classes are too long for the browser to parse on first load",
      "The server sends the stylesheet in two separate files that race each other",
      "The theme is applied only after hydration, once the page has been painted",
      "Dark mode cannot be used together with server rendering in any setup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which viewport meta tag setting makes responsive layouts work on phones?",
    "topic": "Responsive breakpoints",
    "choices": [
      "width=device-width, initial-scale=1",
      "width=1024, so that phones show the desktop layout",
      "user-scalable=no, which turns on the mobile layout",
      "initial-scale=0.5, so that more content fits on screen"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the sm: prefix mean in Tailwind?",
    "topic": "Responsive breakpoints",
    "choices": [
      "The style applies only on screens smaller than the small breakpoint",
      "The style applies only on devices that are classed as phones",
      "The style applies when the element is smaller than its parent",
      "The style applies from the small breakpoint upward, not only on small screens"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good way to test responsive layouts while developing?",
    "topic": "Responsive breakpoints",
    "choices": [
      "Open the page on one single phone and assume that it works on all of the others",
      "Resize the browser window or use the device toolbar of the developer tools",
      "Compare the size of the CSS file that is built for each of the screen sizes",
      "Check the layout in the build output without ever opening the page in a browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Tailwind class makes an element a flex container?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "display-flex",
      "flex",
      "flexbox",
      "d-flex"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which class puts flex items in a column?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "column",
      "flex-vertical",
      "direction-col",
      "flex-col"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does justify-between do on a flex container?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "Spreads the items along the main axis with the free space between them",
      "Centres the items on the cross axis of the container",
      "Stretches each item until it fills the height of the container",
      "Puts a gap between the container and its parent element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does items-center do on a flex container?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "Places the items in the middle of the main axis",
      "Makes every item the same width as the widest one",
      "Aligns the items in the middle of the cross axis",
      "Moves the items to the centre of the whole page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which classes create a grid with three equal columns?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "grid columns-3",
      "flex cols-3 with a grid prefix",
      "grid grid-cols-3",
      "grid-template-3"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does gap-4 do on a flex or grid container?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "Adds space between the children without adding space on the outer edges",
      "Adds margin around the whole container on all four sides",
      "Sets the height of every row to the fourth step of the scale",
      "Adds a border between the children of the container"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you make an element span two columns in a grid?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "span-2-cols",
      "grid-span-2",
      "cols-2",
      "col-span-2"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does flex-1 do on a flex item?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "Sets the item to a width of exactly one pixel",
      "Lets the item grow and shrink to fill the available space",
      "Puts the item first in the order of the container",
      "Prevents the item from growing or shrinking at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a row of flex items wrap onto new lines when space runs out?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "Add wrap-items to each of the children",
      "Add flex-wrap to the container",
      "Add overflow-wrap to the container",
      "Add flex-flow-break to the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is grid usually a better fit than flex?",
    "topic": "Flexbox and grid utilities",
    "choices": [
      "When you only need to centre a single element in the page",
      "When the items must wrap inside a narrow sidebar of the page",
      "When the page needs to look the same at every screen width",
      "When the layout has rows and columns that must line up together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a design system in code?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "A set of reusable components and tokens that keep the UI consistent",
      "A folder that holds the final screenshots of every page",
      "A database of the colours that were used in the past",
      "A tool that converts designs into pages without any developer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why build a Button component instead of repeating classes everywhere?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "Buttons cannot be created without a component in React",
      "The browser caches components and ignores repeated class names",
      "One place defines the style and behaviour, so changes apply everywhere",
      "Tailwind requires a component for every element that has a class"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a variant prop, such as variant=\"primary\", used for?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "Choosing which version of React the component should use",
      "Setting the url that the component links to",
      "Selecting one of several predefined looks for a component",
      "Marking the component as available only for administrators"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a helper like class-variance-authority or clsx help with?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "Combining class names conditionally in a readable way",
      "Compressing class names into shorter strings at build time",
      "Checking class names for spelling mistakes while typing",
      "Loading the classes from the server on demand"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use tailwind-merge when merging class names?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "It removes unused classes from the final stylesheet",
      "It converts classes into inline styles for faster rendering",
      "It sorts the classes alphabetically in the markup",
      "It resolves conflicts so that the last conflicting utility wins"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should a reusable component accept extra class names?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "Ignore any className and always use its own classes",
      "Take a className prop and merge it with its own classes",
      "Read the class names from the url of the page",
      "Copy the class names of the parent component at runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of CSS variables for theme values?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "They are faster than any other way of writing a colour in a stylesheet",
      "Values can change at runtime, for example for dark mode, without new classes",
      "They are required by Tailwind in order to generate all of its classes",
      "They stop the browser from caching the stylesheet of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is it a good time to turn markup into a component?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "When it is longer than a single line of markup in the file where it lives",
      "When it contains any text that a user of the page is able to read",
      "When it is used by only one single page and is never going to change",
      "When it repeats, or has behaviour and state that you want in one place"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does composing small components give you in a design system?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "Larger parts, such as a card, built from consistent smaller parts",
      "Fewer files, because small components are merged together by the compiler",
      "Components that cannot be reused outside of the folder where they are defined",
      "Pages that do not need any layout files in order to be rendered by Next.js"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why document components, for example in Storybook?",
    "topic": "Theme configuration and tokens",
    "choices": [
      "The browser needs the documentation in order to render the component at all",
      "The documentation is required before the package can be published to npm",
      "Others can see the variants and states and use them correctly",
      "It makes the components load faster for the visitors in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the dark: prefix do in Tailwind?",
    "topic": "Dark mode and variants",
    "choices": [
      "Makes the element darker by a fixed amount of lightness",
      "Applies the utility only on screens with a dark background image",
      "Applies the utility only when dark mode is active",
      "Disables the utility whenever the page is shown in the dark"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which two common strategies decide when dark mode is active?",
    "topic": "Dark mode and variants",
    "choices": [
      "The system preference through a media query, or a class or attribute you control",
      "The time of day of the visitor, or the brightness of the screen",
      "The browser that the visitor uses, or the operating system version",
      "The country of the visitor, or the language of the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you let users switch themes with a toggle button?",
    "topic": "Dark mode and variants",
    "choices": [
      "Reload the page with a different stylesheet for each theme",
      "Change the colour of every element with inline styles by hand",
      "Ask the server to render a separate page for each theme",
      "Use a class or attribute strategy and set it on the html element from the button"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does hover:bg-blue-500 do?",
    "topic": "Dark mode and variants",
    "choices": [
      "Applies the colour to the element after it has been clicked once",
      "Applies the background colour while the pointer is over the element",
      "Applies the colour to the children of the element on hover only",
      "Applies the colour only on devices that have a touch screen"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which variant styles an element when it has keyboard focus?",
    "topic": "Dark mode and variants",
    "choices": [
      "active:",
      "focus-visible:",
      "selected:",
      "touched:"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do variants stack, as in md:hover:bg-red-500?",
    "topic": "Dark mode and variants",
    "choices": [
      "Only the last variant is used and the earlier ones are ignored",
      "They run in order, and each one replaces the previous colour",
      "They are not allowed to be combined in the same class name",
      "They combine, so the style applies only when every condition is true"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does group-hover do?",
    "topic": "Dark mode and variants",
    "choices": [
      "Styles a child when its parent marked with group is hovered",
      "Styles every element of the page when any element is hovered",
      "Groups several classes into a single named class in the stylesheet",
      "Applies hover styles to all siblings of the hovered element"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the peer variant allow?",
    "topic": "Dark mode and variants",
    "choices": [
      "Styling an element based on the state of its parent in the tree",
      "Styling an element when two other elements are hovered at once",
      "Styling an element based on the state of a previous sibling marked with peer",
      "Styling the sibling that comes first in the source of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a flash of the wrong theme appear on load?",
    "topic": "Dark mode and variants",
    "choices": [
      "The browser needs more time to read the dark variants of the classes",
      "The server always renders the light theme and cannot render another",
      "The theme is applied after the page is painted, for example only after hydration",
      "Dark mode cannot be used with server rendered pages at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which approach avoids that flash for a class based theme?",
    "topic": "Dark mode and variants",
    "choices": [
      "A small inline script that sets the class before the page paints",
      "A longer loading spinner that hides the page until the theme is set",
      "A second request that downloads the stylesheet for the dark theme",
      "A client effect that sets the class after the first render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is composition in React?",
    "topic": "Reusable component patterns",
    "choices": [
      "Copying the code of one component into another component so that it is reused",
      "Making a component extend a base class so that common behaviour is shared",
      "Merging several separate state variables into one single object value in a parent",
      "Building larger components by combining smaller ones, often with children"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the children pattern make possible for a Card component?",
    "topic": "Reusable component patterns",
    "choices": [
      "The card can only wrap other cards that happen to be of the same size",
      "The card can wrap any content without knowing what it will contain",
      "The card can read the state of every component that is placed inside it",
      "The card can decide which props its parent is allowed to pass down to it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a render prop?",
    "topic": "Reusable component patterns",
    "choices": [
      "A prop that sets the render order of the siblings of a component",
      "A prop whose value is a function that returns what to render",
      "A prop that makes the component render on the server only",
      "A prop that holds the number of times a component has rendered"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is prop drilling?",
    "topic": "Reusable component patterns",
    "choices": [
      "Reading props from a component with a query selector call",
      "Copying props into state in each of the child components",
      "Passing a prop with the same name to many sibling components",
      "Passing props through several levels of components that do not use them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which tool avoids long prop drilling for data many components need?",
    "topic": "Reusable component patterns",
    "choices": [
      "React context",
      "The key prop",
      "A longer chain of fragments",
      "A ref that is shared by all components"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of a compound component such as Tabs with Tabs.Panel?",
    "topic": "Reusable component patterns",
    "choices": [
      "The parts can be rendered in any browser without needing a build step",
      "The parts are all bundled into one single file by the compiler",
      "Related parts share state through context while the parent controls the layout",
      "The parts must always be rendered in the same fixed order on the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why prefer composition over inheritance for components?",
    "topic": "Reusable component patterns",
    "choices": [
      "Inheritance is not allowed by the JavaScript language at all",
      "Composition always produces smaller bundles than inheritance does",
      "It gives flexible reuse without tight coupling between components",
      "Inheritance makes components impossible to type in TypeScript"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a controlled component?",
    "topic": "Reusable component patterns",
    "choices": [
      "A component whose value is held in state and changed through a callback",
      "A component that the parent component is not allowed to render at all times",
      "A component that controls the state of all of its sibling components at once",
      "A component whose output cannot be changed by any of the props it receives"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a presentational component?",
    "topic": "Reusable component patterns",
    "choices": [
      "One that fetches its own data and keeps all of the application state",
      "One that can be rendered only once on the whole page",
      "One that has no props and returns the same markup always",
      "One that focuses on how things look and gets its data through props"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is it a good idea to split a component in two?",
    "topic": "Reusable component patterns",
    "choices": [
      "When it contains more than a single line of JSX markup",
      "When it does several unrelated jobs or part of it is reused elsewhere",
      "When it uses a hook, since hooks belong in their own files",
      "When it receives more than one prop from its parent"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-5

```json
[
  {
    "stem": "What is tRPC mainly used for?",
    "topic": "Routers and procedures",
    "choices": [
      "Generating a GraphQL schema from the types of a database",
      "Sending binary messages between two servers over a custom protocol",
      "Calling server functions from the client with end to end type safety and no schema files",
      "Building REST documentation pages from the routes of an API"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a router in tRPC?",
    "topic": "Routers and procedures",
    "choices": [
      "A group of procedures, which can be nested into a larger router",
      "A component that maps the urls of the app to pages in the browser",
      "A server that forwards incoming requests on to other external APIs",
      "A file that lists the environment variables that the app needs to run"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a procedure in tRPC?",
    "topic": "Routers and procedures",
    "choices": [
      "A database migration that changes the schema of the tables in use",
      "A React component that renders the data that comes from the server",
      "A cookie that stores the session of the user between requests",
      "A function exposed by the server, such as a query or a mutation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is the type of the whole API shared with the client?",
    "topic": "Routers and procedures",
    "choices": [
      "By generating a JSON schema file that is committed to git",
      "By exporting the type of the root router and importing it on the client",
      "By writing the same interfaces twice, once on each side",
      "By sending the type definitions with every response"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is no code generation step needed with tRPC?",
    "topic": "Routers and procedures",
    "choices": [
      "The server sends a compiled client library with each request",
      "The client infers types directly from the exported router type",
      "The types are written by hand in a shared package",
      "The build tool copies the server code into the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does initTRPC.create() return a builder for?",
    "topic": "Routers and procedures",
    "choices": [
      "A running HTTP server that listens on a port that you give it",
      "A database connection that is shared by all of the procedures",
      "A set of React hooks that are used by the client side of the app",
      "The router, procedure and middleware helpers of your API"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you add a procedure to a router?",
    "topic": "Routers and procedures",
    "choices": [
      "Add it as a key of the object passed to t.router",
      "Call app.get with the path of the procedure",
      "Export a default function from a file in the pages folder",
      "Register it in a JSON file that the server reads"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the transport of tRPC by default?",
    "topic": "Routers and procedures",
    "choices": [
      "A persistent websocket connection that is opened for every procedure",
      "Raw TCP sockets that use a custom binary format of their own",
      "HTTP requests that carry JSON, with the router path in the url",
      "Email messages that are sent between the client and the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can tRPC be used without Next.js?",
    "topic": "Routers and procedures",
    "choices": [
      "No, it needs the router of Next.js to resolve each of the procedures",
      "Yes, but only together with Express and with no other framework",
      "Yes, it works with any Node server or fetch based environment",
      "No, because it relies on the React server components to run"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a typical reason to choose tRPC over a REST API?",
    "topic": "Routers and procedures",
    "choices": [
      "Both sides are TypeScript and you want shared types with little boilerplate",
      "You need a public API that other companies will call from many languages",
      "You need to serve images and other files straight to the browsers",
      "You must follow a strict standard for the HTTP caching of responses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a query in tRPC?",
    "topic": "Queries and mutations",
    "choices": [
      "A procedure that changes data stored on the server of the app",
      "A function that runs only in the browser and never on a server",
      "A component that fetches the data for a page when it renders",
      "A procedure that reads data and does not change it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a mutation in tRPC?",
    "topic": "Queries and mutations",
    "choices": [
      "A procedure that reads data and caches it for a day",
      "A procedure that creates, updates or deletes data",
      "A type that describes the shape of the response",
      "A hook that stores state on the client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define a query that takes no input?",
    "topic": "Queries and mutations",
    "choices": [
      "t.procedure.mutation(() => ...) with no input",
      "t.procedure.query(() => ...)",
      "t.procedure.input(none).query(...)",
      "t.query(() => ...) on the router"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which HTTP method does a tRPC query usually use over HTTP?",
    "topic": "Queries and mutations",
    "choices": [
      "POST",
      "PUT",
      "DELETE",
      "GET"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which HTTP method does a tRPC mutation usually use?",
    "topic": "Queries and mutations",
    "choices": [
      "POST",
      "GET",
      "HEAD",
      "OPTIONS"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the return value of a procedure become on the client?",
    "topic": "Queries and mutations",
    "choices": [
      "A string that has to be parsed with JSON.parse by hand on the client",
      "An untyped object that has to be cast by the caller before use",
      "Typed data that is inferred from what the function returns",
      "A promise that never resolves until the page has been closed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why separate queries and mutations?",
    "topic": "Queries and mutations",
    "choices": [
      "The HTTP protocol allows only two kinds of requests",
      "The compiler cannot type a function that does both",
      "Reads can be cached and repeated safely, while writes change state",
      "Mutations are faster than queries on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can a procedure call another procedure on the server?",
    "topic": "Queries and mutations",
    "choices": [
      "Yes, through a server side caller, or by sharing a function",
      "No, procedures are isolated from each other by the design of tRPC",
      "Only when both of the procedures involved are mutations",
      "Only in development mode of the app and never in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where does the business logic usually live?",
    "topic": "Queries and mutations",
    "choices": [
      "Inside the React components that call the procedures",
      "In the url of each request that the client sends",
      "In the names of the procedures themselves",
      "In plain functions or services that procedures call"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a procedure return when the database finds nothing?",
    "topic": "Queries and mutations",
    "choices": [
      "Always an empty array, since tRPC converts every missing value to one",
      "Whatever you decide, for example null or a thrown not found error",
      "An automatic 404 page that the client has to display to the user",
      "A rejected promise with a message about the router of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate procedure input with Zod?",
    "topic": "Input validation with Zod",
    "choices": [
      "Zod makes procedures run faster on the server",
      "Client data cannot be trusted, and Zod checks it at runtime and types it",
      "tRPC refuses to run any procedure without a schema",
      "Zod encrypts the input before it is sent to the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you attach an input schema to a procedure?",
    "topic": "Input validation with Zod",
    "choices": [
      "Pass the schema as the second argument of t.router",
      "Write the schema in a separate file that tRPC loads by name",
      "Add the schema to the url of the request",
      "Call .input(z.object({ ... })) before .query or .mutation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What type does the input argument have inside the procedure?",
    "topic": "Input validation with Zod",
    "choices": [
      "The type inferred from the Zod schema",
      "Always unknown until you cast it",
      "The type of the request object of the server",
      "Any, because validation happens before the call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens when the input does not match the schema?",
    "topic": "Input validation with Zod",
    "choices": [
      "The procedure runs with the invalid data and writes a warning to the log",
      "The procedure runs with default values for each of the missing fields",
      "tRPC rejects the call with a BAD_REQUEST error and the code does not run",
      "The client receives the full stack trace of the server in the response"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you make a field optional in the input schema?",
    "topic": "Input validation with Zod",
    "choices": [
      "Add a question mark inside the string of the field name",
      "Remove the field from the schema and the client",
      "Use .optional() on that field",
      "Set the field to null in the router"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why share Zod schemas between the client and the server?",
    "topic": "Input validation with Zod",
    "choices": [
      "The same rules check forms on the client and procedures on the server",
      "Schemas are required by React before it is able to render a form",
      "Shared schemas are the only way to send data to the server at all",
      "The server cannot create schemas without some help from the client"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does z.string().min(3) check?",
    "topic": "Input validation with Zod",
    "choices": [
      "The string is at most three characters long",
      "The string contains the number three",
      "The string is converted to the number three",
      "The string has at least three characters"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does z.coerce.number() do with the string \"5\"?",
    "topic": "Input validation with Zod",
    "choices": [
      "Rejects it, since it is not a number type",
      "Converts it to the number 5 before validating",
      "Keeps the string and checks its characters only",
      "Converts it to the boolean true"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which input shape fits a delete by id procedure?",
    "topic": "Input validation with Zod",
    "choices": [
      "z.object({ everything: z.any() })",
      "z.object({ id: z.string() })",
      "z.never()",
      "z.void() with the id in a cookie"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why not trust types alone for data coming over the network?",
    "topic": "Input validation with Zod",
    "choices": [
      "The compiler checks the types again for each request that arrives",
      "Types are enforced by the HTTP protocol between the two sides",
      "Network data always matches the types that the client was built with",
      "Types are removed at runtime, so a caller can send anything"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the context in tRPC?",
    "topic": "Context and middleware",
    "choices": [
      "Per request data that all procedures can read, such as the session or database",
      "A global object that stores data for all users of the app",
      "A React context that wraps the app in the browser",
      "A configuration file that lists the procedures"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is the context created?",
    "topic": "Context and middleware",
    "choices": [
      "Once at server start and then shared by every request",
      "Only on the first request after a deploy",
      "For each request, in a createContext function",
      "In the browser before each call to a procedure"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do teams usually put in the context?",
    "topic": "Context and middleware",
    "choices": [
      "The complete list of the procedures that the app exposes",
      "The html of the page that is being rendered for the visitor",
      "The database client and the session of the current user",
      "The environment variables, which are public to everyone anyway"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is middleware in tRPC?",
    "topic": "Context and middleware",
    "choices": [
      "A function that runs before a procedure and can extend the context or stop the call",
      "A function that runs in the browser after each response",
      "A service that stores logs in a database",
      "A plugin that generates documentation for the router"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you create a procedure that only signed in users can call?",
    "topic": "Context and middleware",
    "choices": [
      "Hide the button in the UI for the users who are signed out",
      "Check the session only in the client component that calls it",
      "Add a comment above the procedure that says it is private",
      "Build a protected procedure with a middleware that checks the session"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a middleware throw when there is no session?",
    "topic": "Context and middleware",
    "choices": [
      "A plain string that the client reads",
      "A TRPCError with the code UNAUTHORIZED",
      "A 200 response with an error message in the body",
      "Nothing, since it can only return values"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can middleware pass the verified user to the procedure?",
    "topic": "Context and middleware",
    "choices": [
      "By saving the user in a global variable",
      "By calling next with an extended ctx that includes the user",
      "By adding the user to the url of the request",
      "By sending the user to the client first"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is a protected procedure better than checking auth in every procedure?",
    "topic": "Context and middleware",
    "choices": [
      "It removes the need for any authentication on the server side",
      "It makes every procedure of the router public by default",
      "It lets the client decide which of the procedures are protected",
      "The rule is written once and the types guarantee the user exists"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a typical use of logging middleware?",
    "topic": "Context and middleware",
    "choices": [
      "Measuring how long each procedure takes and recording errors",
      "Replacing the response of every procedure with a fixed message",
      "Blocking the requests that come from the same user twice",
      "Compiling the router into a smaller file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which of these can a middleware do?",
    "topic": "Context and middleware",
    "choices": [
      "Change the type of the router while the server is running",
      "Edit the source code of the procedures before they are called",
      "Read and extend the context, and reject the call with an error",
      "Send a response to the client before the server has started"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hook do you use to call a query from a React component?",
    "topic": "Client hooks with React Query",
    "choices": [
      "api.post.list.useMutation()",
      "useTRPC.fetch(post.list)",
      "api.post.list.useQuery()",
      "fetch(api.post.list)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hook do you use for a mutation?",
    "topic": "Client hooks with React Query",
    "choices": [
      "api.post.create.useMutation()",
      "api.post.create.useQuery()",
      "api.post.create.useFetch()",
      "api.post.create.send()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does tRPC use under the hood for the client hooks?",
    "topic": "Client hooks with React Query",
    "choices": [
      "Redux Toolkit",
      "SWR only",
      "A custom cache written by the tRPC team",
      "TanStack React Query"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you refetch a list after a mutation succeeds?",
    "topic": "Client hooks with React Query",
    "choices": [
      "Reload the browser page by hand",
      "Invalidate the query with the utils from the api, in onSuccess",
      "Call the procedure again on the server",
      "Edit the cache of the browser with devtools"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the isPending or isLoading flag tell the UI?",
    "topic": "Client hooks with React Query",
    "choices": [
      "Whether the user is signed in",
      "Whether the request is still running",
      "Whether the database is available",
      "Whether the input passed validation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do queries run again when the window regains focus?",
    "topic": "Client hooks with React Query",
    "choices": [
      "The server pushes new data to the page through a socket",
      "The browser reloads the whole page by itself on every focus",
      "tRPC polls the server every second in the background",
      "React Query refetches stale data on window focus by default"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does staleTime control for a query?",
    "topic": "Client hooks with React Query",
    "choices": [
      "How long the data counts as fresh before a refetch is allowed",
      "How long the request may take before it is cancelled by a timeout",
      "How long the data stays stored in the database of the app",
      "How long the component stays mounted on the page of the user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you pass input to a query hook?",
    "topic": "Client hooks with React Query",
    "choices": [
      "In the url of the page that renders the component",
      "In a global store that the hook reads its value from",
      "As the first argument, such as useQuery({ id })",
      "In a header that is set by the browser on each request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use a transformer such as superjson?",
    "topic": "Client hooks with React Query",
    "choices": [
      "To make the JSON smaller before it is sent",
      "To encrypt the data so that others cannot read it",
      "To send values like Date, Map and Set across the wire with their types",
      "To convert every value to a string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of calling procedures through hooks?",
    "topic": "Client hooks with React Query",
    "choices": [
      "Loading and error states, caching and typing come with the call",
      "The server code runs inside the browser of the user directly",
      "Requests are made without any network connection at all",
      "The hooks write the procedures of the router for you"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you signal an expected failure in a procedure?",
    "topic": "Error handling and formatting",
    "choices": [
      "Return the string error and let the client check it",
      "Call process.exit on the server",
      "Log to the console and return nothing",
      "Throw a TRPCError with a code such as NOT_FOUND"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which code fits a signed in user who lacks permission?",
    "topic": "Error handling and formatting",
    "choices": [
      "UNAUTHORIZED",
      "FORBIDDEN",
      "NOT_FOUND",
      "TIMEOUT"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which code fits a missing session?",
    "topic": "Error handling and formatting",
    "choices": [
      "FORBIDDEN",
      "UNAUTHORIZED",
      "BAD_REQUEST",
      "CONFLICT"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a Zod input check fails?",
    "topic": "Error handling and formatting",
    "choices": [
      "The server crashes and restarts",
      "The procedure runs with empty values",
      "The client receives a 404 page",
      "The client receives a BAD_REQUEST error with the field details"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does the client read an error from a mutation?",
    "topic": "Error handling and formatting",
    "choices": [
      "Through the error object or an onError callback of the hook",
      "By parsing the html of the response by hand",
      "By reading a cookie that the server sets",
      "By waiting for the server to send an email"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does an error formatter allow?",
    "topic": "Error handling and formatting",
    "choices": [
      "Hiding every error so that the client sees only success",
      "Translating the error into another programming language",
      "Shaping the error data sent to the client, for example adding field errors",
      "Retrying the failed procedure automatically"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why not return raw error messages from a database to the client?",
    "topic": "Error handling and formatting",
    "choices": [
      "Browsers cannot display them",
      "They are always too long to send",
      "They can leak internal details such as table names or queries",
      "They make the response slower"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should happen with unexpected errors on the server?",
    "topic": "Error handling and formatting",
    "choices": [
      "They are logged, and the client gets a generic internal error",
      "They are shown in full to the user for debugging",
      "They are ignored without a log",
      "They are turned into success responses"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you show a field error from a failed mutation in a form?",
    "topic": "Error handling and formatting",
    "choices": [
      "Show an alert with the raw error text for every failure",
      "Reload the form so that it clears the field",
      "Redirect to a page that lists every error",
      "Read the formatted Zod error from the mutation error and display it near the field"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an INTERNAL_SERVER_ERROR code indicate?",
    "topic": "Error handling and formatting",
    "choices": [
      "A request that was rejected for invalid input",
      "An unexpected failure on the server that is not the fault of the caller",
      "A request that came from an unknown user",
      "A request for a resource that does not exist"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-6

```json
[
  {
    "stem": "What is Prisma?",
    "topic": "Prisma schema and data model",
    "choices": [
      "A hosting platform that runs your database for you in the cloud",
      "A CSS framework that generates utility classes from your config",
      "A type safe ORM that generates a client from your schema",
      "A testing library that creates fake data for your component tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which file defines the data models in a Prisma project?",
    "topic": "Prisma schema and data model",
    "choices": [
      "schema.prisma",
      "prisma.config.json with a list of tables and their columns",
      "models.ts exporting one class for each table of the database",
      "database.sql with CREATE TABLE statements run at startup"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a model in the Prisma schema represent?",
    "topic": "Prisma schema and data model",
    "choices": [
      "A React component that renders one row of a table",
      "A route handler that returns the rows of a table as JSON",
      "A migration file that changes the shape of a table over time",
      "A table or collection in the database with its fields"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the @id attribute mark on a field?",
    "topic": "Prisma schema and data model",
    "choices": [
      "The index that is used to sort the model by default",
      "The primary key of the model",
      "A field that is hidden from the generated client",
      "The field that is shown first in Prisma Studio for each row"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does @default(autoincrement()) do?",
    "topic": "Prisma schema and data model",
    "choices": [
      "Sets the field to the current date when a row is updated",
      "Fills an integer field with a growing number when a row is created",
      "Copies the value from the previous row into the new row",
      "Generates a random string for the field on every read"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the @unique attribute guarantee?",
    "topic": "Prisma schema and data model",
    "choices": [
      "The field is stored in an encrypted form in the database",
      "The field is always the first column of the table",
      "The field is generated by the database on every write",
      "No two rows can hold the same value in that field"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a question mark after a type, as in String?, mean in the schema?",
    "topic": "Prisma schema and data model",
    "choices": [
      "The field is optional and can be null",
      "The field is a string that is checked with a question at runtime",
      "The field is searched with a fuzzy match in queries",
      "The field is removed from the database when it is empty"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is generated when you run prisma generate?",
    "topic": "Prisma schema and data model",
    "choices": [
      "A set of SQL migrations that match the current schema",
      "A copy of the database filled with sample records",
      "A typed client with methods for each model in the schema",
      "A documentation site that describes the schema models"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which attribute sets a field to the time a row was created?",
    "topic": "Prisma schema and data model",
    "choices": [
      "@createdOn",
      "@timestamp(create)",
      "@default(now())",
      "@auto(date)"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why create one Prisma client instance and reuse it in a Next.js app?",
    "topic": "Prisma schema and data model",
    "choices": [
      "In development, hot reloads would otherwise open too many database connections",
      "Each instance caches queries and a second one would clear the cache",
      "Next.js refuses to start when two clients exist in the project",
      "Clients are not allowed to be created inside route folders"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a database migration?",
    "topic": "Migrations and the database push",
    "choices": [
      "A copy of the production data that is moved to a test server so that it can be checked",
      "A script that deletes the rows that are older than a certain date you have set",
      "A tool that converts the database from one vendor format to another",
      "A versioned change to the database structure that can be applied in order"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command creates and applies a migration during development?",
    "topic": "Migrations and the database push",
    "choices": [
      "prisma generate --apply",
      "prisma migrate dev",
      "prisma db seed --migrate",
      "prisma studio --update"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which command applies existing migrations in production?",
    "topic": "Migrations and the database push",
    "choices": [
      "prisma migrate dev with the production url",
      "prisma migrate deploy",
      "prisma db reset on the live database",
      "prisma generate on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does prisma migrate dev also do besides applying SQL?",
    "topic": "Migrations and the database push",
    "choices": [
      "Deploys the application to the hosting platform you configured",
      "Backs up the production data to a file in the project",
      "Opens Prisma Studio in the browser with the new schema",
      "Regenerates the client and may ask to reset the database on drift"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are migration files committed to version control?",
    "topic": "Migrations and the database push",
    "choices": [
      "Everyone, including CI and production, applies the same history of changes",
      "They contain the secrets that the application needs to start",
      "They are needed to run the application at all in the browser",
      "Git cannot track the schema file without them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does prisma db push do?",
    "topic": "Migrations and the database push",
    "choices": [
      "Pushes the data of the database to the schema file in the repo",
      "Uploads the migrations to the Prisma cloud for backup",
      "Syncs the schema to the database without creating a migration file",
      "Deploys the generated client to the hosting platform"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is db push a reasonable choice?",
    "topic": "Migrations and the database push",
    "choices": [
      "Applying changes to a production database that has real users working with it",
      "Reverting a deploy that went wrong during the last release of the app",
      "Quick prototyping, where migration history is not yet needed",
      "Sharing a schema change with a team that uses continuous integration"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does prisma migrate reset do to a development database?",
    "topic": "Migrations and the database push",
    "choices": [
      "Drops it, applies all migrations again and runs the seed script",
      "Reverts only the latest migration and keeps every row of data in place",
      "Copies the production data into the development database for realistic tests",
      "Removes the migrations folder and recreates it from the current schema file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should you avoid editing an already applied migration file?",
    "topic": "Migrations and the database push",
    "choices": [
      "The file is read only and the operating system refuses to save changes",
      "Prisma deletes the file as soon as it has been changed one time",
      "The change is applied twice by the next deploy to the database",
      "The recorded history no longer matches and other databases become inconsistent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can happen if you add a required column without a default to a table that has rows?",
    "topic": "Migrations and the database push",
    "choices": [
      "Prisma fills the column with random values for each row",
      "The migration fails or needs a default value for the existing rows",
      "The existing rows are deleted by the migration",
      "The column is created as optional by Prisma silently"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method returns all the rows of a model?",
    "topic": "CRUD queries with the client",
    "choices": [
      "prisma.user.getAll()",
      "prisma.user.findMany()",
      "prisma.user.select()",
      "prisma.user.list()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which method returns one row or null?",
    "topic": "CRUD queries with the client",
    "choices": [
      "findOne with a limit option",
      "selectOne with a where clause",
      "getOrNull with an id value",
      "findUnique or findFirst"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does findUniqueOrThrow do when nothing matches?",
    "topic": "CRUD queries with the client",
    "choices": [
      "Throws an error instead of returning null",
      "Returns an empty object so that the code can continue",
      "Creates the missing row with default values",
      "Logs a warning and returns undefined"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you insert a row with Prisma?",
    "topic": "CRUD queries with the client",
    "choices": [
      "prisma.post.insert({ values: { title } })",
      "prisma.post.add({ row: { title } })",
      "prisma.post.create({ data: { title } })",
      "prisma.post.save({ title })"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you change a row?",
    "topic": "CRUD queries with the client",
    "choices": [
      "prisma.post.set({ id, title })",
      "prisma.post.change({ id }, { title })",
      "prisma.post.update({ where: { id }, data: { title } })",
      "prisma.post.patch({ where: id, body: title })"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does upsert do?",
    "topic": "CRUD queries with the client",
    "choices": [
      "Updates a row if it exists, or creates it if it does not",
      "Updates every row of the table with the given values",
      "Inserts the row twice to be safe against failures",
      "Updates the schema and the data at the same time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does delete require in its arguments?",
    "topic": "CRUD queries with the client",
    "choices": [
      "A data object that lists the values to remove",
      "A list of fields to blank out in the row",
      "Nothing, since it removes every row by default",
      "A where clause that identifies a unique row"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of the typed client in queries?",
    "topic": "CRUD queries with the client",
    "choices": [
      "Queries run faster because the types are sent along to the database server",
      "Fields and filters are checked by the compiler, and results have the right type",
      "Queries are cached in memory without any configuration by the developer",
      "Queries are written in SQL first and then converted into the types"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does select do in a Prisma query?",
    "topic": "CRUD queries with the client",
    "choices": [
      "Chooses the database that the query should run against",
      "Returns only the listed fields instead of the whole row",
      "Selects the rows to be shown first in the result list",
      "Locks the chosen rows so other queries cannot change them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you run several writes so that they all succeed or all fail?",
    "topic": "CRUD queries with the client",
    "choices": [
      "Call them one after another with await in a loop",
      "Put them in a migration and run it once",
      "Use the upsert method for each write",
      "Wrap them in prisma.$transaction"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you define a one to many relation between User and Post?",
    "topic": "Relations and nested writes",
    "choices": [
      "A posts Post[] field on User and an author User plus authorId on Post",
      "A user field on User that holds an array of Post ids as text",
      "A single table that stores both users and posts in one row",
      "A Post array on both models with the same name"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the @relation attribute define?",
    "topic": "Relations and nested writes",
    "choices": [
      "The order in which the two models are created in the database",
      "The permissions that one model has on the other model",
      "Which fields link the two models, such as a foreign key and its reference",
      "The name of the migration that links the two tables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you load a post together with its author?",
    "topic": "Relations and nested writes",
    "choices": [
      "Run a second query and join the results by hand in code",
      "Use select with the name of the table to join",
      "Use include: { author: true } in the query",
      "Call the author method on the post that the query returned"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between include and select for relations?",
    "topic": "Relations and nested writes",
    "choices": [
      "include adds relations to the fields, while select picks exactly the fields to return",
      "select adds relations to the fields, while include picks exactly the fields",
      "They are the same and only the names differ",
      "include works for one to one only, select for one to many only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How is a many to many relation modeled in Prisma?",
    "topic": "Relations and nested writes",
    "choices": [
      "With a single comma separated text field that sits on one of the two models",
      "With a nested JSON column that stores the ids of the other model",
      "With two separate databases that are linked together by a small script",
      "With list fields on both models, as an implicit relation, or an explicit join model"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does onDelete: Cascade on a relation do?",
    "topic": "Relations and nested writes",
    "choices": [
      "Keeps the related rows and sets the reference to their parent to null",
      "Deletes the related rows when the parent row is deleted",
      "Blocks the deletion of the parent row while any children still exist",
      "Copies the related rows to an archive table before the parent is deleted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you create a post and connect it to an existing user in one query?",
    "topic": "Relations and nested writes",
    "choices": [
      "Use data: { title, userId: connect(id) } at the top level",
      "Use data: { title, author: { connect: { id } } }",
      "Run create twice and merge the rows in the client",
      "Use data: { title, author: { copy: { id } } }"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the N+1 problem?",
    "topic": "Relations and nested writes",
    "choices": [
      "One single query that returns N plus 1 rows instead of exactly N rows",
      "N queries that all run at the same time and block the connection pool",
      "A query that is repeated one time for every column of the table",
      "One query for a list plus one extra query per item to load its relation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does include help to avoid the N+1 problem?",
    "topic": "Relations and nested writes",
    "choices": [
      "It loads the relation for all rows in a small fixed number of queries",
      "It caches each relation in memory for the next request",
      "It turns relations into JSON columns stored with the parent",
      "It limits the number of related rows to one per parent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a one to one relation need on the side that holds the key?",
    "topic": "Relations and nested writes",
    "choices": [
      "A list type on the other side of the model",
      "A composite id made of both tables",
      "A unique foreign key field",
      "An index on the primary key of the other table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you filter rows with a condition in Prisma?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "Chain a filter method on the result of the query",
      "Write the condition in a string that is parsed by Prisma",
      "Pass a where object, such as where: { published: true }",
      "Use a callback that returns true for the rows to keep"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which filter finds posts whose title contains a word?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "where: { title: { contains: \"word\" } }",
      "where: { title: like(\"word\") } with a helper",
      "where: { title: \"%word%\" } with a wildcard",
      "where: { title: { has: \"word\" } } for text fields"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you combine several conditions where all must be true?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "Run one query for each condition and merge the results",
      "Use a join table to combine the conditions in the database",
      "Write them as separate where clauses in a list",
      "List them in the same where object or use AND"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which option sorts the results?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "sort: { createdAt: -1 }",
      "orderBy: { createdAt: \"desc\" }",
      "order: [\"createdAt\", \"desc\"]",
      "sortBy: createdAt"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you fetch the second page of 10 posts with offset pagination?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "limit: 10 and offset: 1",
      "take: 10 and skip: 10",
      "first: 10 and page: 2",
      "count: 10 and start: 10"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a drawback of offset pagination on large tables?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "It cannot return more than ten rows for each page that is requested",
      "It needs a brand new database connection for every page that is read",
      "It works only for tables that have no primary key defined on them",
      "Skipping many rows gets slower, and results can shift when data changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does cursor based pagination use to continue a list?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "The id of the last item seen, passed as the cursor",
      "The number of pages that the user has already visited",
      "A timestamp that the browser stores in a cookie",
      "The offset that is calculated from the page number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you count rows that match a filter?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "prisma.post.length({ where })",
      "prisma.post.findMany().size",
      "prisma.post.count({ where })",
      "prisma.post.total({ filter })"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why add an index on a field used often in where clauses?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "The index makes the field unique across all the rows",
      "The index encrypts the values of the field in the table",
      "The database can find matching rows without scanning the whole table",
      "The index removes null values from query results"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the in operator do in a filter?",
    "topic": "Filtering, sorting, and pagination",
    "choices": [
      "Matches rows whose field equals any value in a given list",
      "Checks that a text field starts with the given value",
      "Joins the rows of two models on a shared field",
      "Matches only rows that are inside a transaction"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a seed script used for?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "Creating the tables that the migrations did not create",
      "Deleting old data before every deploy to production",
      "Generating the types for the Prisma client from the data",
      "Filling the database with initial or sample data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which command runs the seed script configured for Prisma?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "prisma seed run --all",
      "prisma db seed",
      "prisma generate --seed",
      "prisma migrate seed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where is the seed command configured in a Node project?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "In the schema file that sits next to the definitions of the models in the project",
      "In the prisma section of package.json, or in the Prisma config file",
      "In the environment file, as a variable that is called SEED and holds a path",
      "In the migration file that created the tables of the database at the start"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a seed script be safe to run more than once?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "It runs automatically on every request that the app receives and must be fast",
      "Prisma refuses to run a seed script that has already run before",
      "The database removes duplicate rows by itself after the script has finished",
      "It may run on every reset, so it should use upsert or check for existing rows"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is Prisma Studio?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "A browser based interface to view and edit the data in your database",
      "A code editor that is built into the Prisma command line",
      "A service that monitors the performance of production queries",
      "A tool that designs the schema with drag and drop shapes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which command opens Prisma Studio?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "prisma open",
      "prisma ui",
      "prisma studio",
      "prisma view"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is Prisma Studio not a replacement for an admin panel in production?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "It cannot show more than ten rows at the same time in a table",
      "It works only with SQLite databases that are stored on a local disk",
      "It has no user roles or audit trail and gives full access to the data",
      "It cannot read any data that was created by the application itself"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which kind of data belongs in a seed script?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "Reference data and sample records for development and tests",
      "Real customer records copied from the production database",
      "Secrets such as API keys and passwords for the services",
      "Temporary files that the application creates at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does createMany do in a seed script?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "Creates the same row many times with different ids",
      "Creates many models at once from the schema file",
      "Copies the rows of one table into another table",
      "Inserts several rows in a single call"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should seeding a production database require?",
    "topic": "Seeding and Prisma Studio",
    "choices": [
      "Nothing special, since it runs after every build",
      "A deliberate decision, since it can add or overwrite real data",
      "A switch in Prisma Studio to turn on production mode",
      "A second copy of the schema file with a different name"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-7

```json
[
  {
    "stem": "What is OAuth used for in a sign in flow?",
    "topic": "OAuth and credential providers",
    "choices": [
      "Encrypting the password of the user before it is stored in the database of the app",
      "Creating a session cookie that never expires on the device of the signed in user",
      "Letting a user sign in with an account from another provider without sharing a password",
      "Giving the application the password of the provider account so it can reuse it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which library is commonly used for authentication in Next.js apps?",
    "topic": "OAuth and credential providers",
    "choices": [
      "Auth.js, formerly NextAuth.js",
      "Redux Toolkit with a login slice",
      "Zod with a user schema",
      "Prisma Studio with a users table"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a credentials provider?",
    "topic": "OAuth and credential providers",
    "choices": [
      "A sign in method that uses an account from a social network such as GitHub or Google",
      "A sign in method that sends a magic link to the email address of the user",
      "A sign in method that reads a token from the query string of the url",
      "A sign in method that checks an email and password against your own database"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why store only a hashed password for a credentials sign in?",
    "topic": "OAuth and credential providers",
    "choices": [
      "Hashes are required by the Next.js build step",
      "A database leak would not reveal the real passwords",
      "Hashing makes the sign in faster for repeated logins",
      "Plain passwords cannot be stored as strings in a database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the role of the client id and secret of an OAuth provider?",
    "topic": "OAuth and credential providers",
    "choices": [
      "They are the username and password of each user of the app",
      "They identify your app to the provider when it exchanges codes for tokens",
      "They encrypt the session cookie that is stored in the browser",
      "They are shown to the user on the consent screen of the provider"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should the OAuth client secret be stored?",
    "topic": "OAuth and credential providers",
    "choices": [
      "In a public file of the repository, so that the setup is easy for everyone",
      "In localStorage of the browser, so that it can be read again later",
      "In the url of the callback that the provider calls after the sign in",
      "In an environment variable on the server, never in client code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the callback url in an OAuth flow?",
    "topic": "OAuth and credential providers",
    "choices": [
      "The address where the provider sends the user back after sign in",
      "The address of the home page that the user sees first",
      "The address of the database that holds the accounts",
      "The address of the provider login page that the app opens"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the user see when signing in with an OAuth provider?",
    "topic": "OAuth and credential providers",
    "choices": [
      "A form on your site where they type the password of the provider",
      "A popup that downloads a certificate to the computer",
      "A consent screen on the provider site, then a redirect back to your app",
      "A page that asks them to create a new password for your app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why offer both OAuth and credentials sign in?",
    "topic": "OAuth and credential providers",
    "choices": [
      "OAuth cannot work without a credentials provider next to it",
      "Credentials are required by law and OAuth is optional",
      "Users can choose the method they prefer, and you can cover both cases",
      "The two methods share one password for every user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of building your own password login from scratch?",
    "topic": "OAuth and credential providers",
    "choices": [
      "Many security details, such as hashing and rate limits, are easy to get wrong",
      "It cannot be done with any database that is supported by Prisma at all",
      "It works only on the server and cannot be made to work in the browser",
      "It requires a paid license from the authors of the framework you use"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a session in web authentication?",
    "topic": "Session and JWT strategies",
    "choices": [
      "The amount of time that the user spends on one single page of the app",
      "The list of the pages that the user has visited in this browser so far",
      "The password that the user typed when they first signed in to the app",
      "The record that links a browser to a signed in user across requests"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between database sessions and JWT sessions?",
    "topic": "Session and JWT strategies",
    "choices": [
      "JWT sessions need a database and database sessions do not",
      "Database sessions store state on the server, JWT sessions keep it in a signed token",
      "Database sessions are stored in the browser, JWT sessions on the server",
      "They are the same, and only the cookie names differ"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a JWT session token contain?",
    "topic": "Session and JWT strategies",
    "choices": [
      "Only a random lookup id that points to a row in the database",
      "Claims about the user, such as an id and an expiry time",
      "A copy of the password hash so that the server can check it again",
      "The full list of pages that the user has visited so far"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should the payload of a session token be kept small?",
    "topic": "Session and JWT strategies",
    "choices": [
      "Large tokens are rejected by the signing algorithm before the check",
      "Browsers delete any cookie that is longer than a few hundred characters",
      "Databases cannot store tokens that are above a fixed size limit",
      "The token travels with every request, so a large payload slows each one down"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is a session usually stored in the browser?",
    "topic": "Session and JWT strategies",
    "choices": [
      "In an HttpOnly cookie that scripts cannot read",
      "In a variable inside the global window object",
      "In the url of every page that the user opens",
      "In a hidden field that is added to every form"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an advantage of database sessions?",
    "topic": "Session and JWT strategies",
    "choices": [
      "They need no database connection at all",
      "They make every request faster than any other approach",
      "You can revoke a session on the server at any time",
      "They never expire on their own"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of JWT sessions?",
    "topic": "Session and JWT strategies",
    "choices": [
      "They cannot be used together with cookies in any of the common browsers",
      "They can only be used with the credentials sign in and never with OAuth",
      "A token is hard to revoke before it expires, unless you add extra checks",
      "They need much more storage in the database for each of the users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when the session cookie expires?",
    "topic": "Session and JWT strategies",
    "choices": [
      "The user is treated as signed out and must sign in again",
      "The user stays signed in until the server restarts",
      "The cookie is renewed automatically with a longer lifetime",
      "The user data is deleted from the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should the cookie have the Secure and SameSite attributes?",
    "topic": "Session and JWT strategies",
    "choices": [
      "To make the cookie bigger so that it can hold more data for the session",
      "To let other websites read the session of the user when they need it",
      "To keep the cookie alive after the browser has been closed by the user",
      "To limit sending to HTTPS and reduce the risk of cross site request forgery"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a refresh strategy for sessions try to achieve?",
    "topic": "Session and JWT strategies",
    "choices": [
      "Make the tokens last forever so that users never have to sign in again",
      "Keep users signed in with short lived tokens that can be renewed safely",
      "Sign users out after every single request to improve the security of the app",
      "Copy the session to a second browser that is open on the same computer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Prisma adapter do for Auth.js?",
    "topic": "Prisma adapter for users",
    "choices": [
      "Generates the sign in page of the app with the brand colours of your site",
      "Stores users, accounts and sessions in your database through Prisma",
      "Replaces the OAuth providers with a login that uses only the database",
      "Encrypts the cookies that the library creates before they are sent"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which models does the adapter expect in the schema?",
    "topic": "Prisma adapter for users",
    "choices": [
      "Login, Password and Profile only",
      "Token and Role, with no user model",
      "Post and Comment for the content of the app",
      "User, Account, Session and VerificationToken"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why store the Account model separately from User?",
    "topic": "Prisma adapter for users",
    "choices": [
      "One user can link several providers, each with its own account record",
      "Accounts hold the password hash while users hold only the email address",
      "Each user needs a separate database in which to keep their own account",
      "Accounts are needed only for the credentials sign in and never for OAuth"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens on the first OAuth sign in with a database adapter?",
    "topic": "Prisma adapter for users",
    "choices": [
      "The provider stores a new user row in your database itself",
      "Nothing is stored until the user fills in a profile form",
      "A user and account row are created for that person",
      "The session is created, but no user row is made"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When do you need the Prisma adapter?",
    "topic": "Prisma adapter for users",
    "choices": [
      "When you only want to read the name of the user from a JWT cookie",
      "When the app has no database of its own at all to store anything in",
      "When you want users and sessions persisted, for example with database sessions",
      "When the app uses only credentials sign in and has no user table at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a VerificationToken used for?",
    "topic": "Prisma adapter for users",
    "choices": [
      "Email based sign in links and similar one time tokens",
      "Storing the password reset secret in plain text",
      "Verifying the TLS certificate of the server",
      "Checking the age of the user at sign up"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you extend the session with the user id from the database?",
    "topic": "Prisma adapter for users",
    "choices": [
      "Edit the cookie by hand in the browser developer tools",
      "Query the database in every component that needs the id",
      "Store it in a global variable on the server",
      "Add it in the session callback from the token or user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which callback can you use to add custom data to a JWT?",
    "topic": "Prisma adapter for users",
    "choices": [
      "redirect",
      "jwt",
      "signIn only",
      "events"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep the adapter and the schema in sync?",
    "topic": "Prisma adapter for users",
    "choices": [
      "Prisma refuses to generate a client for an out of date schema",
      "The library reads and writes these models, so missing fields cause errors",
      "The browser compares the schema with the cookie on every request",
      "The adapter deletes the database tables that it does not know"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good practice for the unique constraint on accounts?",
    "topic": "Prisma adapter for users",
    "choices": [
      "Make the email of the account unique across all the providers",
      "Allow duplicates so that a user can sign in twice at once",
      "Use the user name as the unique key for accounts",
      "Make the provider and provider account id unique together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you protect a tRPC procedure so only signed in users can call it?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "Build it from a protected procedure whose middleware checks ctx.session",
      "Hide the page that calls it from users who are signed out",
      "Check the session in the React component before calling the hook",
      "Name the procedure private so that the router hides it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a protected procedure do when ctx.session is missing?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "Return an empty array so that nothing is leaked",
      "Continue with a guest user created on the fly",
      "Throw a TRPCError with the code UNAUTHORIZED",
      "Redirect the browser to the home page from the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does a protected procedure narrow the type of ctx.session?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "The compiler removes the session from the context",
      "TypeScript refuses to compile procedures that read the session",
      "After the check, the procedure can use session.user without null checks",
      "The session type is replaced by a string"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does the session in the tRPC context come from?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "It is read from the request cookies when the context is created",
      "It is sent in the input of every procedure by the client",
      "It is stored in a global variable of the server",
      "It is created by the client and trusted as is"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you restrict a procedure to administrators?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "Show the admin buttons only for users with the admin role",
      "Create a separate server only for administrators",
      "Put the word admin in the name of the procedure",
      "Add a middleware that checks the role of ctx.session.user and throws FORBIDDEN"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is checking ownership needed even for signed in users?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "Signed in users are not allowed to read any records",
      "A user must not read or change records that belong to other users",
      "Ownership checks are done by the database automatically",
      "The session already contains the records of the user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the risk of trusting a userId sent in the input?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "The userId is always encrypted by the client",
      "A caller can send any id, so use the id from the session instead",
      "The input cannot be a string",
      "The server cannot read inputs that contain ids"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a public procedure mean in a T3 app?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "A procedure that only the server can call",
      "A procedure that returns data from public APIs",
      "A procedure that is shown in the documentation page",
      "A procedure that anyone can call, with or without a session"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you test that a protected procedure rejects anonymous calls?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "Call it with a context that has no session and expect an UNAUTHORIZED error",
      "Open the page in the browser and look at the button",
      "Read the source code and trust that it is right",
      "Run the build and check for type errors only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good place to define the protected procedure?",
    "topic": "Protecting tRPC procedures",
    "choices": [
      "Inside each router file with a separate copy",
      "In the React component that uses it",
      "Next to the tRPC setup, so every router can reuse it",
      "In the page of the app that shows the result"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read the current session in a server component?",
    "topic": "Server-side session access",
    "choices": [
      "Read the cookie value in a client effect and parse it",
      "Fetch the session from the home page of the app",
      "Call the auth function from your Auth.js config on the server",
      "Import the session from the layout component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is reading the session on the server preferred for protected pages?",
    "topic": "Server-side session access",
    "choices": [
      "The check runs before any protected content is sent to the browser",
      "The session on the server is faster to read than a session on the client",
      "Client components are not able to read cookies from the browser at all",
      "The browser blocks cookies on pages that are protected by a session"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a session object usually contain?",
    "topic": "Server-side session access",
    "choices": [
      "The password and the complete user record exactly as stored in the database",
      "A list of every single page that the user has visited in the app",
      "The secret key that the server uses to sign the tokens it creates",
      "Basic user information such as id, name and email, plus an expiry"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does reading the session make a route?",
    "topic": "Server-side session access",
    "choices": [
      "Static, since sessions are known at build time",
      "Dynamic, since it depends on request cookies",
      "Client rendered, because sessions exist in the browser",
      "Cached forever, because the session never changes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a client component read the session?",
    "topic": "Server-side session access",
    "choices": [
      "With a direct call to the database from the component",
      "With a session provider and a hook such as useSession",
      "By reading the HttpOnly cookie from JavaScript",
      "By importing the session from a server file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is a server side session read better than a client hook?",
    "topic": "Server-side session access",
    "choices": [
      "When you want to update the session after every click of the user",
      "When the component has to show a spinner while the session is loading",
      "When the page is rendered only inside the browser and never on a server",
      "When you must decide what to render or fetch before the page is sent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do with the session user id in a database query?",
    "topic": "Server-side session access",
    "choices": [
      "Use it in the where clause so users read only their own data",
      "Ignore it and use the id that comes from the request body",
      "Send it to the browser and let the client filter the data",
      "Store it in the cache key without using it in the query"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid passing the full session object to client components?",
    "topic": "Server-side session access",
    "choices": [
      "Session objects cannot be serialised by React when they cross the boundary",
      "Client components refuse to accept any kind of object as their props",
      "It may include more data than the client needs to see",
      "It makes the page load without any caching of the data for the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you sign a user out?",
    "topic": "Server-side session access",
    "choices": [
      "Delete the user row from the database",
      "Redirect to the home page and keep the cookie",
      "Call the signOut function, which clears the session",
      "Close the browser tab of the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a redirect in a layout do for protected sections?",
    "topic": "Server-side session access",
    "choices": [
      "Stops all pages of the section from rendering for visitors who are signed out",
      "Redirects only the layout itself and leaves the pages below it open",
      "Sends the visitor back to the page that they came from before",
      "Checks the session one time and then caches the result for every user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must a server action check the session itself?",
    "topic": "Role-based authorization",
    "choices": [
      "The user interface already checks the session and the action simply trusts it",
      "Server actions cannot be called at all when the user is signed out",
      "The session is verified by the browser of the user before each call",
      "Actions are public endpoints, so hiding the button does not protect them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a protected server action do when there is no session?",
    "topic": "Role-based authorization",
    "choices": [
      "Continue and use a default user for the request",
      "Return an error or redirect before touching any data",
      "Show a message in the console and keep running",
      "Ask the browser to send the session again in a header"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should authorization checks for a record live?",
    "topic": "Role-based authorization",
    "choices": [
      "In the button component that triggers the action in the user interface",
      "On the server, next to the data access, checking ownership or role",
      "In a client side hook that reads the url of the current page",
      "In the CSS rules that hide the buttons from the other users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is authentication compared with authorization?",
    "topic": "Role-based authorization",
    "choices": [
      "Authentication decides what you may do, authorization proves who you are",
      "They mean the same thing in different frameworks",
      "Authentication is done on the server, authorization in the browser",
      "Authentication proves who you are, authorization decides what you may do"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why check ownership when a user edits a post by id?",
    "topic": "Role-based authorization",
    "choices": [
      "Otherwise anyone could change the posts of others by sending another id",
      "Ids are kept secret, so the check is only needed for logging purposes",
      "The database does not allow any edit to run without an ownership check",
      "The check is slow, so it is only needed while you develop the feature"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a page redirect an unauthenticated visitor to sign in?",
    "topic": "Role-based authorization",
    "choices": [
      "Hide the content with CSS until the visitor logs in",
      "Show an alert in the browser and keep the page open",
      "Check the session in the server component and call redirect",
      "Ask the visitor for the password in the url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why not rely on a client component check alone to protect data?",
    "topic": "Role-based authorization",
    "choices": [
      "Client components cannot read the session at all",
      "Client checks are slower than server checks in every case",
      "The client code can be changed or bypassed by the user",
      "Browsers block data requests from unauthenticated users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the safest place to enforce access to a route handler?",
    "topic": "Role-based authorization",
    "choices": [
      "Inside the handler itself, before it reads or writes any data",
      "In a global variable that is read by every one of the handlers",
      "In the page that links to the handler from the user interface",
      "In the browser, before the request is sent to the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a 401 response mean for an API route?",
    "topic": "Role-based authorization",
    "choices": [
      "The caller is not allowed to use that resource",
      "The resource was moved to a new path",
      "The server had an internal error",
      "The caller is not authenticated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a 403 response mean for an API route?",
    "topic": "Role-based authorization",
    "choices": [
      "The caller has not signed in yet and must identify themselves first",
      "The caller is known but is not allowed to do this",
      "The route does not exist on the server that received the request",
      "The body of the request is invalid and could not be parsed"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-8

```json
[
  {
    "stem": "What problem does React Query mainly solve?",
    "topic": "Query caching and invalidation",
    "choices": [
      "Replacing the router of the application with a lighter alternative library",
      "Storing the values of form inputs while the user types into a field",
      "Managing server state, such as fetching, caching and updating remote data",
      "Compiling JSX faster during the production build step of the project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does useQuery require at minimum?",
    "topic": "Query caching and invalidation",
    "choices": [
      "A query key and a function that returns a promise of the data",
      "A url string and a component into which the data is rendered",
      "A reducer function and an initial state object for the cache",
      "A schema and a connection string for the database it queries"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the role of the query key?",
    "topic": "Query caching and invalidation",
    "choices": [
      "Encrypts the request that is sent to the server for that query",
      "Sets the url that the request for this query is sent to",
      "Names the component in the tree that renders the data",
      "Identifies cached data so it can be reused and invalidated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does staleTime control?",
    "topic": "Query caching and invalidation",
    "choices": [
      "How long unused data is kept in memory before it is deleted",
      "How long fetched data counts as fresh before it may be refetched",
      "How long a request may take before it is cancelled by a timeout",
      "How often the component re-renders on its own without any state change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useMutation do?",
    "topic": "Query caching and invalidation",
    "choices": [
      "Fetches data from the server and caches the result under a query key",
      "Runs a function that changes server data, such as a POST, and tracks its status",
      "Reads data out of local storage and puts it into component state",
      "Subscribes the component to changes that other users make on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you refresh a list after a mutation succeeds?",
    "topic": "Query caching and invalidation",
    "choices": [
      "Reload the whole page with window.location after each mutation succeeds",
      "Edit the cache of the browser by hand using the developer tools",
      "Call useQuery a second time inside the handler of the mutation",
      "Invalidate the related query key so that it refetches"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does React Query do when a component mounts and cached data exists?",
    "topic": "Query caching and invalidation",
    "choices": [
      "Shows the cached data and may refetch in the background if it is stale",
      "Always waits for a fresh response before it shows anything on screen",
      "Deletes the cache entry and starts a brand new request each time",
      "Shows an empty state until the user clicks a button to refresh"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which values does useQuery return to help you render UI states?",
    "topic": "Query caching and invalidation",
    "choices": [
      "html, css and script, so that the result can be shown on a page",
      "state, dispatch and reducer, as with other state hooks in React",
      "data, isLoading and error, among others",
      "route, params and query, which describe the current url of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an optimistic update?",
    "topic": "Query caching and invalidation",
    "choices": [
      "Waiting for the server to confirm the change before the UI shows anything at all",
      "Updating the UI only when the user next refreshes the page by hand",
      "Showing the change in the UI right away and rolling back if the request fails",
      "Writing the change into the cache of the server from the client directly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can React Query reduce duplicate requests?",
    "topic": "Query caching and invalidation",
    "choices": [
      "Components with the same query key share one request and one cached result",
      "It blocks every second request that is sent to the same url within a minute",
      "It sends all of the requests through one single persistent websocket",
      "It compresses several requests into one batch before they go out to the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does it mean to show the expected result of a mutation before the server answers?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "The UI waits for the server and shows a spinner until the answer arrives",
      "The UI stores the change in local storage and sends it on the next visit",
      "The UI ignores the server and keeps the change forever either way",
      "The UI assumes success and rolls back if the server later reports a failure"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which React hook supports optimistic updates with actions?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "useDeferredValue",
      "useOptimistic",
      "useSyncExternalStore",
      "useImperativeHandle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should happen when an optimistic update fails on the server?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "The interface keeps the wrong value on screen without showing any message to the user",
      "The interface rolls back and the user is told what went wrong",
      "The page reloads and the user loses everything that they had typed in",
      "The request is repeated forever in the background until it finally works"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use optimistic updates for actions such as likes?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "The server can skip validation when the interface updates first",
      "The data is saved twice, which makes it safer",
      "The request is sent after the user has left the page",
      "The interface feels instant even when the network is slow"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the source of truth after an optimistic update?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "The server data, which replaces the temporary value when it arrives",
      "The temporary value in the browser, which the server is then forced to accept",
      "The cache, which is never replaced by any newer data from the server",
      "The url of the page, which keeps the final value for the whole session"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When are optimistic updates a poor fit?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "When the action is a simple toggle that only rarely fails on the server",
      "When the user expects to see an immediate response on the screen",
      "When failure is common or the result is unpredictable, such as payments",
      "When the data can be rolled back without any side effects at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do you still revalidate after an optimistic mutation?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "To delete the optimistic value from the history of the browser afterwards",
      "To show a loading spinner for a little longer after the change",
      "To make sure the cached pages end up with the real server data",
      "To cancel the request in case it is still running in the background"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you give an optimistic item a temporary key in a list?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "Use a temporary id, such as a generated one, until the real id exists",
      "Leave the key empty until the server has returned the real id of the item",
      "Use the index of the item in the list, since an index never changes",
      "Use the text of the item as its key, since the text is always unique"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does useOptimistic return?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "The result of the server action and an error object that describes failures",
      "A promise that resolves at the moment the server has finished answering",
      "A list that holds every one of the changes that were made so far",
      "The optimistic state and a function that applies an optimistic change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to optimistic state when the action finishes?",
    "topic": "Optimistic updates and rollback",
    "choices": [
      "It stays the same and ignores the server result",
      "It falls back to the real state that comes from the server",
      "It is saved to localStorage as a permanent copy",
      "It is sent to the server again to double check it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an infinite query?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "A query that repeats itself forever without any user action",
      "A query that loads a list page by page and appends each new page to the previous",
      "A query that has no limit on how long it may run",
      "A query that returns every row of a table at once"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tRPC hook builds a list that loads more on demand?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "useQuery with a very large limit",
      "useMutation with a page number",
      "useLazyQuery with a callback",
      "useInfiniteQuery"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does getNextPageParam return?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "The cursor for the next page, or undefined when there are no more pages",
      "The number of the page that is currently shown",
      "The total number of rows in the table",
      "The data of the next page, already loaded"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which pagination style fits infinite scrolling best?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "Offset based pagination with a large offset",
      "Loading every row and slicing it in the browser",
      "Cursor based pagination",
      "Pagination by page number in the url only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is cursor pagination more reliable than offset pagination for a live feed?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "It always returns more rows per page than offset pagination",
      "It does not need an index on the database",
      "New rows do not shift the page boundaries, so items are not repeated or skipped",
      "It removes the need for any ordering of the rows"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does fetchNextPage do?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "Loads the next page and adds it to the list",
      "Reloads the first page and drops the others",
      "Moves the cursor back to the previous page",
      "Clears the cache of the query"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does hasNextPage tell you?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "Whether the first page has been loaded",
      "Whether the cache is empty",
      "Whether the user is signed in",
      "Whether more pages can be loaded"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you show all the loaded items together?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "Read only the first page of data.pages and ignore the other pages",
      "Flatten the items of every page in data.pages",
      "Call the procedure again for each of the items to get its data",
      "Join the pages with a comma into one single string for display"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a user trigger loading more items without a button?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "Reload the page when the user scrolls to the bottom",
      "Observe a sentinel element near the end and call fetchNextPage when it is visible",
      "Poll the server every second for new pages",
      "Load every page when the component first mounts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a problem of loading many pages into memory?",
    "topic": "Infinite queries and pagination",
    "choices": [
      "The browser deletes older pages after five seconds",
      "The server forgets the cursor after one page",
      "React refuses to render more than one page",
      "The list can grow large, so very long lists may need virtualisation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is prefetching a query?",
    "topic": "Prefetching and hydration",
    "choices": [
      "Loading data into the cache before the user needs it",
      "Deleting data from the cache before the time at which it would expire",
      "Running a query again automatically after it has failed once before",
      "Sending the query to a second server so that a backup copy exists"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a good moment to prefetch the data of a page?",
    "topic": "Prefetching and hydration",
    "choices": [
      "When the server starts up and before any user has connected to it",
      "After the user has already left the page for another one",
      "When the user hovers over or focuses a link to that page",
      "Only when the browser has no connection to the network at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is hydration of a query cache?",
    "topic": "Prefetching and hydration",
    "choices": [
      "Adding water to the database to keep it fast",
      "Copying the client cache back to the server",
      "Restoring server fetched data into the client cache so the first render has data",
      "Deleting the cache after the first render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why prefetch on the server for a page that uses a query hook?",
    "topic": "Prefetching and hydration",
    "choices": [
      "The HTML already contains the data, and the client does not need a loading state",
      "The client is not able to call procedures at all",
      "Server prefetching removes the need for the cache",
      "The server can then skip rendering the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a dehydrated state contain?",
    "topic": "Prefetching and hydration",
    "choices": [
      "The HTML of the page that was rendered on the server for the user",
      "The source code of the procedures that the router exposes to clients",
      "The cookies of the user together with the session that they hold",
      "A serialisable snapshot of the query cache"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a hydrated query when it is stale on the client?",
    "topic": "Prefetching and hydration",
    "choices": [
      "It is deleted and shows an error message",
      "It can refetch in the background according to the settings of the query",
      "It is replaced by the data of the previous user",
      "It is frozen and can never be refetched"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does the server need a new query client for each request?",
    "topic": "Prefetching and hydration",
    "choices": [
      "A query client can only be created once per process",
      "Sharing one between users could leak data from one user to another",
      "Query clients cannot be garbage collected",
      "The browser rejects a shared query client"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which utility prefetches a query in a tRPC and React Query app?",
    "topic": "Prefetching and hydration",
    "choices": [
      "utils.post.list.fetchNothing()",
      "api.post.list.preload.html",
      "trpc.prefetchAll()",
      "utils.post.list.prefetch()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a downside of prefetching too much?",
    "topic": "Prefetching and hydration",
    "choices": [
      "Wasted requests and bandwidth for data the user never needs",
      "It makes the cache smaller than needed",
      "It stops the user from navigating",
      "It makes queries return older data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which data should not be prefetched on the server for everyone?",
    "topic": "Prefetching and hydration",
    "choices": [
      "Public articles that are the same for every visitor",
      "The list of product names in a public catalogue",
      "Personal data that depends on the signed in user, unless the request is scoped to them",
      "Static settings of the website"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the onMutate callback of a mutation run?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "After the mutation has failed and the error was logged",
      "After the component has unmounted from the page",
      "Before the mutation function runs, which makes it a good place for optimistic updates",
      "Only when the mutation succeeds"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does onSuccess receive?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "The data returned by the mutation and the variables that were sent",
      "Only the error object of the mutation",
      "The previous cache value of every query",
      "The response headers of the request only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does onError run?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "When the mutation succeeds but the value that it returns is empty",
      "Before the mutation starts, as a validation step for its input",
      "Only when the user cancels the mutation before it has finished",
      "When the mutation fails, with the error and the variables"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does onSettled run after?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "Only a successful mutation",
      "Both success and failure, so it fits cleanup such as invalidation",
      "Only a failed mutation",
      "Only the first call of the mutation"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the usual order of the callbacks for a successful mutation?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "onSuccess, then onMutate, then onSettled",
      "onMutate, then onSuccess, then onSettled",
      "onSettled, then onMutate, then onSuccess",
      "onMutate, then onSettled, then onSuccess"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you roll back an optimistic update when the mutation fails?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "Reload the page in onError",
      "Ignore the failure and keep the optimistic value",
      "Delete the whole cache in onSuccess",
      "Return a snapshot from onMutate and restore it in onError"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why cancel outgoing queries in onMutate before an optimistic update?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "A refetch in flight could overwrite the optimistic value with old data",
      "Queries cannot run while a mutation is running",
      "The server rejects the mutation otherwise",
      "Cancelled queries make the cache smaller"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you invalidate related queries after a mutation?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "In the render of the component on every pass",
      "In the server procedure after the response is sent",
      "In onSuccess or onSettled, using the utils invalidate function",
      "In the url of the next request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between callbacks on useMutation and on mutate?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "The ones on useMutation run only for the first call",
      "They are identical and both run for every call",
      "The ones on mutate run only for that call and not if the component unmounts",
      "The ones on mutate run before the server answers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why show a toast in onError?",
    "topic": "Mutation lifecycle callbacks",
    "choices": [
      "The user needs to know that the action failed and what to do next",
      "Toasts are required for the mutation to retry",
      "Toasts roll back the cache by themselves",
      "The mutation does not finish until a toast is shown"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is Zustand?",
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
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
    "topic": "Global state versus server state",
    "choices": [
      "The browser forbids changing objects that are created inside modules",
      "Subscribers may not see a new reference, so the UI may not update",
      "Stores freeze themselves after the first update and reject new writes",
      "It makes every later call to the store slower because of extra checks"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-9

```json
[
  {
    "stem": "What is React Hook Form designed to do?",
    "topic": "React Hook Form basics",
    "choices": [
      "Replace the state of React with one global store that holds the whole app",
      "Generate the HTML of forms automatically from the schema of a database",
      "Manage form state and validation with few re-renders by using uncontrolled inputs",
      "Send forms to the server without writing any client side code at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which function connects an input to the form?",
    "topic": "React Hook Form basics",
    "choices": [
      "register",
      "connect",
      "bind",
      "attach"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does handleSubmit do?",
    "topic": "React Hook Form basics",
    "choices": [
      "Sends the form data to the server by itself",
      "Resets every field to its default value",
      "Disables the submit button forever",
      "Runs validation and calls your function with the values only when the form is valid"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does React Hook Form often cause fewer re-renders than controlled inputs?",
    "topic": "React Hook Form basics",
    "choices": [
      "It disables rendering while the user types",
      "It reads values from the inputs through refs instead of updating state on every key",
      "It stores the values in the url of the page",
      "It renders only the first field of the form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read the errors of a field?",
    "topic": "React Hook Form basics",
    "choices": [
      "From the response that the server sends back after the form is submitted",
      "From formState.errors, using the name of the field",
      "From the console of the browser, where React writes all of the errors",
      "From the url of the page, where the errors are added as parameters"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the resolver option allow?",
    "topic": "React Hook Form basics",
    "choices": [
      "Resolving the url of the form action",
      "Resolving conflicts between two forms",
      "Resolving the types of the form at build time",
      "Using a schema library such as Zod to validate the values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does defaultValues do in useForm?",
    "topic": "React Hook Form basics",
    "choices": [
      "Sets the initial values of the fields and what reset restores",
      "Sets the default url of the form",
      "Defines the colours of the form",
      "Defines the maximum length of every field"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you handle a field that is not a native input, such as a custom select?",
    "topic": "React Hook Form basics",
    "choices": [
      "Wrap it in a separate form tag of its own inside the main form",
      "Replace it with a native input element and give up the custom control",
      "Use Controller or useController to connect it to the form",
      "Store its value in a cookie and read it back when the form submits"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does reset do?",
    "topic": "React Hook Form basics",
    "choices": [
      "Deletes the form from the page",
      "Sends the form again to the server",
      "Restores the form to its default values or to values that you pass",
      "Validates the form without showing errors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a controlled form built by hand still a good choice?",
    "topic": "React Hook Form basics",
    "choices": [
      "For very small forms where the logic is simple and you want full control",
      "For large forms with dozens of fields and many rules",
      "For forms that must be validated with a schema library",
      "For forms that must show many field errors at once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why validate input with a schema library such as Zod?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "It encrypts the input before it reaches the database of the application",
      "It makes the form render faster in the browser of the visitor",
      "It replaces the need to define a schema for the database at all",
      "It checks the shape and types of untrusted data and gives typed results"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does schema.safeParse(data) return?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "The parsed data, or it throws an error if invalid",
      "An object with a success flag and either data or an error",
      "A promise that resolves after the data is checked",
      "A boolean that says whether the data is valid"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define a string that must be an email in Zod?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "z.email.string()",
      "z.string().email()",
      "z.text().isEmail",
      "z.string({ type: \"email\" })"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you derive a TypeScript type from a Zod schema?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "type User = typeof schema.type, which reads the type from a schema property",
      "type User = z.type(schema), which builds the type with a helper function",
      "type User = schema.toType(), which converts the schema at runtime",
      "type User = z.infer<typeof schema>"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why validate on the server even when the form is validated in the browser?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "Client side checks can be skipped by anyone who calls the action directly",
      "Browsers never run validation code that is written in JavaScript",
      "Server validation is faster than the validation in the browser",
      "Client checks are removed when the app is built for production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you make a field optional in Zod?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "Add a question mark inside the string of the field",
      "Set the field to null in the schema object",
      "Call .optional() on the field schema",
      "Wrap the schema in z.maybe()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does z.coerce.number() do with the string \"42\" from a form?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "Rejects it, since it is a string and not a number",
      "Keeps the string and only checks the characters",
      "Converts it to the number 42 before validating",
      "Converts it to the boolean true because it is not empty"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can an action report field errors to the form?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "Return error.flatten().fieldErrors and show each message near its field",
      "Throw the Zod error so that the browser shows it in a popup window",
      "Write the errors to a log file on the server and show nothing",
      "Redirect to a separate error page that lists every one of the errors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does z.object({ ... }) describe?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "A class whose instances are checked on each call",
      "A list of values that are all of the same type",
      "A function that checks the object after it is saved",
      "The expected shape of an object, with a schema for each key"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice for the data passed to the database after validation?",
    "topic": "Zod schemas shared with tRPC",
    "choices": [
      "Use the original input so that the user data stays intact",
      "Use the parsed result and not the original FormData",
      "Use both and let the database decide which to keep",
      "Use the first field of the input only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use accessible component primitives such as Radix UI or React Aria?",
    "topic": "Field errors and accessibility",
    "choices": [
      "They provide a ready made visual design that cannot be changed by the team",
      "They provide keyboard support and ARIA behaviour that is hard to build correctly",
      "They make the components render faster than plain HTML elements would do",
      "They remove the need to test the interface with real users of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does it mean that a primitive is unstyled?",
    "topic": "Field errors and accessibility",
    "choices": [
      "It has no behaviour of its own and only holds the colours and the spacing",
      "It cannot be given any class names or style attributes by the developer",
      "It can be used only inside a server component of the application",
      "It handles behaviour and accessibility while you provide the look"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which keyboard behaviour should a modal dialog provide?",
    "topic": "Field errors and accessibility",
    "choices": [
      "Move focus into the dialog, keep it inside, and return it when closed",
      "Let focus move on to the elements behind the dialog while it is open",
      "Close the dialog whenever the user presses any key on the keyboard",
      "Skip the dialog when the user navigates with the keyboard alone"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of an aria-label on an icon only button?",
    "topic": "Field errors and accessibility",
    "choices": [
      "To show a tooltip with the label when the pointer rests on top of the button",
      "To set the text that search engines show as the title of the page itself",
      "To give the button an accessible name that screen readers can announce",
      "To change the colour of the icon for people who use assistive devices"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why prefer a button element over a div with a click handler?",
    "topic": "Field errors and accessibility",
    "choices": [
      "It renders faster because browsers can skip the layout step for a div",
      "It stops the click event from reaching any of the parent elements",
      "It is focusable and works with the keyboard and screen readers by default",
      "It can be styled with CSS, while a div cannot be styled at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the shadcn/ui approach do differently from a normal component library?",
    "topic": "Field errors and accessibility",
    "choices": [
      "Copies the component source into your project so you own and edit the code",
      "Loads the components from a CDN at runtime each time a page is viewed",
      "Replaces Tailwind with its own style system that each component brings along",
      "Locks the components so that they cannot be changed after you install them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What contrast ratio does WCAG AA require for normal body text?",
    "topic": "Field errors and accessibility",
    "choices": [
      "At least 2 to 1",
      "At least 10 to 1",
      "At least 21 to 1",
      "At least 4.5 to 1"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should focus styles never be removed without a replacement?",
    "topic": "Field errors and accessibility",
    "choices": [
      "Browsers stop sending key events to elements without outlines",
      "Keyboard users need to see which element is focused",
      "Screen readers read only elements that have a visible outline",
      "Focus styles are needed for the layout to be calculated"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the alt text of an informative image do?",
    "topic": "Field errors and accessibility",
    "choices": [
      "Sets the tooltip that appears when the user hovers over the image",
      "Describes the image for screen readers and when the image fails to load",
      "Chooses the file that is downloaded when the connection is slow",
      "Lists the keywords that help search engines to rank the image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool can check a page for common accessibility problems?",
    "topic": "Field errors and accessibility",
    "choices": [
      "A CSS linter that checks the order of the properties",
      "A bundle analyser that shows the size of every package",
      "The compiler, which stops the build on any accessibility problem",
      "An automated checker such as axe or Lighthouse, followed by manual testing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does composition mean in React?",
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
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
    "topic": "Component composition patterns",
    "choices": [
      "Data goes from children to parents through props, and parents answer with events",
      "Data is shared between all components through the DOM instead of through props",
      "Data goes down through props, and children send events up through callbacks",
      "Data can only be changed one single time during each render of a component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a toast?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "A permanent banner that stays on the page until the user closes it",
      "A full screen page that blocks the whole interface while an action runs",
      "A short message that appears briefly to confirm an action or show an error",
      "A tooltip that shows extra help text for one field of a form"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a toast a good choice?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "For feedback about an action that does not need the focus of the user",
      "For critical errors that the user must read and acknowledge",
      "For long instructions that explain how to use a feature",
      "For the main content of the page that all visitors see"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should toasts be announced to screen readers?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "Browsers remove every toast that has not been announced to assistive tools",
      "Toasts load faster on the page when they use live regions inside",
      "Screen readers only read the content that is shown inside toasts",
      "Users who cannot see the screen would otherwise miss the message"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a confirmation dialog protect against?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "Slow network requests that take too long to be answered by the server",
      "Accidental destructive actions, such as deleting data",
      "Invalid input in a form before the form is submitted to the server",
      "Duplicate sign ins that are made from two different browsers"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What makes a dialog modal?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "It appears in the middle of the page and casts a shadow around itself",
      "It blocks interaction with the rest of the page until it is closed",
      "It is rendered by the server before the rest of the page is loaded",
      "It can be moved around the screen by the user with the pointer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should focus behave when a dialog closes?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "Move to the top of the page every time",
      "Stay on the closed dialog until the user clicks",
      "Move to the first link of the page",
      "Return to the element that opened the dialog"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which key should close a dialog by convention?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "Escape",
      "Enter",
      "Tab",
      "Backspace"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a server action trigger a toast on the client?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "Call the toast function from the server code directly, as in a browser",
      "Write the message to the console of the browser from the server",
      "Return a result and show the toast on the client based on that result",
      "Redirect to a separate page whose only job is to render the message"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid stacking many toasts at once?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "Browsers limit the number of elements that a single page may contain",
      "Toasts slow down the server whenever several of them overlap",
      "They can cover the interface and be hard to read or dismiss",
      "Each toast must be unique for the assistive technologies to read it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should an error toast include?",
    "topic": "Toast notifications and feedback",
    "choices": [
      "What failed and, where possible, what the user can do next",
      "The stack trace and the url of the failing request for later debugging",
      "Only an icon, so that the message works in every language",
      "The name of the developer who wrote the code that failed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a reusable input primitive?",
    "topic": "Reusable input primitives",
    "choices": [
      "A function that converts the value of an input to a string",
      "A library that stores the values of all inputs in a database",
      "A CSS rule that is applied to every input of the page",
      "A small component such as TextField that wraps an input with its label, error and styles"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why wrap an input in a component with a label and an error slot?",
    "topic": "Reusable input primitives",
    "choices": [
      "It makes the input faster to render in the browser than a plain one",
      "Every field then has the same structure, accessibility and look",
      "Browsers need a wrapper element in order to submit the form data",
      "It stops the user from typing values that are not valid at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should a reusable input receive extra attributes such as placeholder and type?",
    "topic": "Reusable input primitives",
    "choices": [
      "Hard code every attribute inside the component",
      "Accept the standard input props and spread them onto the input element",
      "Read them from a global variable",
      "Ask the parent to render the input itself"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why forward the ref in a reusable input?",
    "topic": "Reusable input primitives",
    "choices": [
      "Refs make the input read only",
      "Refs are required for the input to be visible",
      "The input would otherwise use the wrong font",
      "Form libraries need a ref to read the value and focus the field"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How should the error message be linked to the input for screen readers?",
    "topic": "Reusable input primitives",
    "choices": [
      "With aria-describedby that points to the id of the error text",
      "With a title attribute on the input that repeats the text of the error",
      "With a colour change on the border of the input when it is invalid",
      "With a comment in the markup that sits next to the error message"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does aria-invalid tell assistive technology?",
    "topic": "Reusable input primitives",
    "choices": [
      "That the field is hidden from the page",
      "That the field cannot receive focus",
      "That the current value of the field is not valid",
      "That the field is required"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of a design system of input primitives?",
    "topic": "Reusable input primitives",
    "choices": [
      "Every form is generated without any code",
      "Inputs no longer need validation",
      "Changes in the look or behaviour are made in one place for the whole app",
      "The app does not need CSS any more"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which label practice is best for accessibility?",
    "topic": "Reusable input primitives",
    "choices": [
      "A visible label linked to the input with htmlFor and id",
      "A placeholder only, with no label that stays visible near the field",
      "A label that is placed far away from the input on the page",
      "A label that appears only after the validation of the field fails"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can a variant prop such as size or intent control on a primitive?",
    "topic": "Reusable input primitives",
    "choices": [
      "Which database the value of the field is saved in by the server",
      "Which server handles the submission of the form on the network",
      "Which browser is able to render the component on the page",
      "Which predefined styles the component uses"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why keep primitives free of business logic?",
    "topic": "Reusable input primitives",
    "choices": [
      "Business logic cannot be written inside React components at all",
      "They stay reusable in many forms and easy to test",
      "Primitives are compiled before any logic of the app is able to run",
      "Logic makes the primitives render in the wrong order on the page"
    ],
    "answerIdx": 1
  }
]
```

LAYER: t3-10

```json
[
  {
    "stem": "What is Vitest?",
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
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
    "topic": "Unit testing with Vitest",
    "choices": [
      "Which lines or branches ran during the tests",
      "Which tests are the slowest in the whole suite",
      "Which dependencies are out of date in the project",
      "Which bugs were found in the last release"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the guiding idea of React Testing Library?",
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
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
    "topic": "Component testing with Testing Library",
    "choices": [
      "The test runner refuses to render any component that is not wrapped in a provider",
      "Without it the component would read the default value or fail, unlike in the real app",
      "Providers make the tests run in parallel on all the cores of the machine",
      "Providers replace the component with a simplified version suited for the test"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Playwright used for?",
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "Build and start the app, then run Playwright against its url",
      "Run Playwright against the production site of a competitor",
      "Run Playwright without a server and mock every page",
      "Compile the tests into the Next.js build output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good approach for the data used in end to end tests?",
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "The size of the bundle that was built for the test",
      "The list of dependencies in the lock file",
      "The number of lines that the test file contains",
      "Traces, screenshots and video that Playwright can record"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you set environment variables for a project on Vercel?",
    "topic": "Environment variables and secrets",
    "choices": [
      "In the project settings, separately for each environment",
      "In a file that is committed to the repository",
      "In the url of the deployed site as query parameters",
      "In the developer tools of the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which environments does Vercel distinguish for variables?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Local, remote and hybrid",
      "Test, stage and release candidate",
      "Development, preview and production",
      "Client, server and edge"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does a change of an environment variable take effect on Vercel?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Immediately for every deployment that is already live",
      "After a restart of the browser of each visitor",
      "On the next deployment, since the value is read for new builds",
      "After one hour, when the cache of the host expires"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are NEXT_PUBLIC variables fixed at build time?",
    "topic": "Environment variables and secrets",
    "choices": [
      "They are inlined into the browser bundle during the build",
      "They are read from the server for every visitor",
      "They are copied from the cookies of the visitor",
      "They are generated by the browser on the first load"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a safe way to share variables with a teammate?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Send the whole file with the secrets to the teammate in a chat message",
      "Commit the file to the repository so that every developer already has it",
      "Write the values of the variables in the readme file of the project",
      "Share the names in .env.example and the values through a secrets manager"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which variable should differ between preview and production?",
    "topic": "Environment variables and secrets",
    "choices": [
      "The name of the framework in the package file",
      "The database url, so previews do not touch real data",
      "The order of the imports in the layout file",
      "The version of React in the lock file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Vercel CLI command vercel env pull do?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Uploads the local variables to every environment at once",
      "Downloads the project environment variables to a local file",
      "Deletes all variables from the project settings",
      "Lists the variables in the build logs of the last deploy"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are secrets in a build log a problem?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Logs make the build slower when they hold long values",
      "Build logs are deleted when they contain a secret",
      "Secrets are always encrypted in logs by the host",
      "Logs can be read by others, so secrets must never be printed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should the app do if a required variable is missing at startup?",
    "topic": "Environment variables and secrets",
    "choices": [
      "Fail with a clear message instead of running half configured",
      "Continue with a default value that points at the production environment",
      "Ask the visitor to type the missing value into a form on the page",
      "Ignore the missing value and only write a warning to the log file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How are variables that are used only on the server kept private?",
    "topic": "Environment variables and secrets",
    "choices": [
      "By storing them in the cookies of the browser for each visitor",
      "By adding them to the url of every request that the app sends out",
      "By not using the NEXT_PUBLIC prefix and reading them in server code only",
      "By renaming them with a long random suffix that nobody could guess"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a build step produce for a React app deployed to a static host?",
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
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
    "topic": "Deploying to Vercel",
    "choices": [
      "dist",
      "public",
      "release",
      "out"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should production use a different database from development?",
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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
    "topic": "Production database and migrations",
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

