LAYER: next-fullstack-1

```json
[
  {
    "stem": "What does TypeScript add to JavaScript?",
    "topic": "TypeScript types and interfaces",
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
    "topic": "TypeScript types and interfaces",
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
    "topic": "TypeScript types and interfaces",
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
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Nothing at all, because unknown behaves exactly like the any type",
      "A check or narrowing, such as typeof, so the compiler knows the real type",
      "A cast to any, since unknown values cannot be narrowed by checks",
      "A declaration of the value as const so that its type cannot change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a generic such as Array<T> let you do?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Store values of any type in the same array without checking them",
      "Write code that works with many types while keeping the type information",
      "Convert the items of the array to strings before they are stored",
      "Make the array immutable so that its elements cannot be changed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the optional property syntax name?: string mean in an interface?",
    "topic": "TypeScript types and interfaces",
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
    "topic": "TypeScript types and interfaces",
    "choices": [
      "Makes its properties readonly and narrows values to literal types",
      "Converts the object into a class with constant methods",
      "Freezes the object at runtime so it cannot be changed",
      "Casts the object to the any type so that errors are hidden"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a discriminated union?",
    "topic": "TypeScript types and interfaces",
    "choices": [
      "A union of two primitive types that is written with the pipe symbol",
      "A union whose members are all optional properties of one interface",
      "A union of object types that share a literal field used to tell them apart",
      "A union that the compiler converts into a single object type"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Partial<User> produce?",
    "topic": "TypeScript types and interfaces",
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
    "topic": "TypeScript types and interfaces",
    "choices": [
      "It turns off type checking for that value and lets mistakes through silently",
      "It is slower at runtime than every other type that the language has",
      "It cannot be used together with interfaces or with generic types",
      "It makes the compiled JavaScript output larger than it needs to be"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a React component?",
    "topic": "React components and props",
    "choices": [
      "A class that extends HTMLElement and is registered with the browser",
      "A file that holds the CSS rules for a part of the page",
      "A database model that is rendered as a list of rows",
      "A function that takes props and returns the UI to show for them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What must a function component name start with?",
    "topic": "React components and props",
    "choices": [
      "A lowercase letter, so that it is not confused with the name of a CSS class",
      "An uppercase letter, so React treats it as a component and not as an HTML tag",
      "The word Component, followed by the name of the feature that it belongs to in the app",
      "An underscore, which marks the component as private to the file in which it lives"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do props flow between components?",
    "topic": "React components and props",
    "choices": [
      "From a child to its parent, through attributes on the root element",
      "From a parent to its children, and children must not change them",
      "Between any two components through a shared global object",
      "From the browser to the component each time the user clicks"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the children prop contain?",
    "topic": "React components and props",
    "choices": [
      "The list of all components that the parent has rendered so far",
      "The state of the component stored as an array of values",
      "The names of the child routes that are defined for the page",
      "The elements written between the opening and closing tags of the component"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why does React ask for a key when a list is rendered?",
    "topic": "React components and props",
    "choices": [
      "It identifies items between renders so updates and reordering are handled correctly",
      "It sets the id attribute of each element in the final HTML document",
      "It sorts the items alphabetically before they are shown on the screen",
      "It prevents the list from being rendered more than one time in total"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is JSX compiled into?",
    "topic": "React components and props",
    "choices": [
      "Plain HTML strings that are inserted into the page with innerHTML",
      "CSS rules that describe how each element should look on the screen",
      "Function calls that create elements, so it is not special to the browser",
      "Web components that are registered when the page first loads"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when a component renders a value of false or null as a child?",
    "topic": "React components and props",
    "choices": [
      "The word false or null is printed on the page",
      "React throws an error because the child is not an element",
      "Nothing is rendered for that child",
      "An empty div element is created in its place"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the purpose of a fragment, written as <></>?",
    "topic": "React components and props",
    "choices": [
      "Group sibling elements without adding an extra node to the DOM",
      "Hide a group of elements until a user action reveals them",
      "Mark a section of the page that is rendered on the server only",
      "Wrap elements so that they all share the same state value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a component accept a custom class name from its parent?",
    "topic": "React components and props",
    "choices": [
      "Read the class name from the document with a query selector call inside the component",
      "Use a global variable that the parent sets just before the child renders",
      "Call a method on the parent component to get the class name value back",
      "Receive a className prop and apply it to the element it renders"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does it mean that rendering should be pure?",
    "topic": "React components and props",
    "choices": [
      "The component must not use any state or props to produce its output",
      "The same props and state should always give the same output with no side effects",
      "The component must run only once for the life of the page",
      "The component must return the same markup for every user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the useState hook return?",
    "topic": "State and hooks",
    "choices": [
      "A reference object whose current value never triggers a render",
      "The current value and a function that updates it",
      "A promise that resolves with the state once it has been saved",
      "The previous value and the next value of the state together"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must state be updated with its setter and not by direct assignment?",
    "topic": "State and hooks",
    "choices": [
      "Direct assignment is a syntax error inside function components",
      "The setter saves the value to storage so it survives a reload",
      "Direct assignment changes the value for all other components too",
      "React must know about the change so that it can render the component again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does an effect with an empty dependency array run?",
    "topic": "State and hooks",
    "choices": [
      "After the first render only",
      "After every render of the component",
      "Before the first render of the component",
      "Each time any prop of the component changes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of the cleanup function returned from an effect?",
    "topic": "State and hooks",
    "choices": [
      "Return the value that the component will render after the effect has run",
      "Delete the state of the component when the effect has finished running",
      "Undo what the effect set up, such as a timer or listener, before it runs again",
      "Run the effect a second time to confirm that its result is stable"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does useRef give you?",
    "topic": "State and hooks",
    "choices": [
      "A copy of the state that updates faster than useState does",
      "A way to read the props of the parent component directly",
      "A mutable container whose changes do not cause a re-render",
      "A function that forces the component to render immediately"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you use useReducer instead of useState?",
    "topic": "State and hooks",
    "choices": [
      "When the next state depends on actions and the logic has several cases",
      "When you only need to store one boolean flag for a toggle",
      "When you want to avoid every re-render of the component",
      "When the state must be shared with the server automatically"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What problem does useMemo solve?",
    "topic": "State and hooks",
    "choices": [
      "It stores the component output on the server between requests",
      "It prevents a component from ever rendering more than once",
      "It copies props into state when the component is first created",
      "It reuses the result of a costly calculation until its dependencies change"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a custom hook let you do?",
    "topic": "State and hooks",
    "choices": [
      "Share one single state value between all of the components that call the hook",
      "Share stateful logic between components without sharing the state itself",
      "Replace the built in hooks with functions that you write on your own for each app",
      "Run code on the server before the component has been created at all in the tree"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are hooks called at the top level of a component?",
    "topic": "State and hooks",
    "choices": [
      "Hooks inside blocks are skipped by the compiler for speed",
      "React relies on their call order staying the same on every render",
      "Only the first hook of a component is stored by React",
      "Hooks need to be declared before the imports of the file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a common cause of an infinite loop with useEffect?",
    "topic": "State and hooks",
    "choices": [
      "Using more than one effect in the same component at the same time",
      "Reading the value of a prop inside the body of the effect function",
      "Returning a cleanup function from an effect that also sets some state",
      "Setting state inside an effect that has no dependency array, or changing dependencies"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you type the props of a component in TypeScript?",
    "topic": "Typing props and events",
    "choices": [
      "Declare an interface or type for them and use it on the parameter",
      "Add a comment above the function that describes each prop and the type it has",
      "Wrap the component in a function that checks the types of props at runtime",
      "Export the props as a default value from the file that holds the component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the type of the event in an onChange handler of an input?",
    "topic": "Typing props and events",
    "choices": [
      "React.MouseEvent<HTMLInputElement>",
      "React.InputEvent<HTMLElement> only",
      "React.ChangeEvent<HTMLInputElement>",
      "Event<InputElement> from the DOM library"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you type a function prop that takes a string and returns nothing?",
    "topic": "Typing props and events",
    "choices": [
      "function(value): string",
      "(value) => string[]",
      "(value: string) => void",
      "void<string> value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you type the children prop of a component?",
    "topic": "Typing props and events",
    "choices": [
      "React.ReactNode",
      "React.Element[]",
      "JSX.Children",
      "string | number"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the type React.FC add that a plain typed function does not?",
    "topic": "Typing props and events",
    "choices": [
      "It is required, because React refuses untyped components at runtime",
      "It adds the key prop to every component automatically",
      "It makes the component render twice in development mode",
      "It is not required, because a plain function with typed props works well"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you type the state of useState when the initial value is null but later holds a User?",
    "topic": "Typing props and events",
    "choices": [
      "useState<User>(null)",
      "useState<User | null>(null)",
      "useState(User, null)",
      "useState<null>(User)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the keyof operator return for an object type?",
    "topic": "Typing props and events",
    "choices": [
      "An array of the values of its properties",
      "A union of the names of its properties",
      "The number of properties in the object",
      "The type of the first property"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a component accept any HTML attributes of a button?",
    "topic": "Typing props and events",
    "choices": [
      "Declare every attribute of the button by hand in an interface",
      "Pass a single props object of type any to the component",
      "Use a global declaration for the button element",
      "Extend React.ComponentProps<\"button\"> for its props"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a type guard such as typeof value === \"string\" do?",
    "topic": "Typing props and events",
    "choices": [
      "Narrows the type inside the block where the check is true",
      "Converts the value to a string for the rest of the function",
      "Throws an error when the value is not a string at all",
      "Removes the check from the compiled JavaScript output"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why type a form event handler as React.FormEvent?",
    "topic": "Typing props and events",
    "choices": [
      "So that the form data is validated before the event runs",
      "So that the form submits to the server without a page reload",
      "So that event properties and methods such as preventDefault are known",
      "So that the handler can only be called once per form"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is composition in React?",
    "topic": "Composition patterns",
    "choices": [
      "Copying the code of one component into another component so that it is reused",
      "Making a component extend a base class so that common behaviour is shared",
      "Building larger components by combining smaller ones, often with children",
      "Merging several separate state variables into one single object value in a parent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the children pattern make possible for a Card component?",
    "topic": "Composition patterns",
    "choices": [
      "The card can wrap any content without knowing what it will contain",
      "The card can only wrap other cards that happen to be of the same size",
      "The card can read the state of every component that is placed inside it",
      "The card can decide which props its parent is allowed to pass down to it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a render prop?",
    "topic": "Composition patterns",
    "choices": [
      "A prop that sets the render order of the siblings of a component",
      "A prop that makes the component render on the server only",
      "A prop that holds the number of times a component has rendered",
      "A prop whose value is a function that returns what to render"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is prop drilling?",
    "topic": "Composition patterns",
    "choices": [
      "Reading props from a component with a query selector call",
      "Passing props through several levels of components that do not use them",
      "Copying props into state in each of the child components",
      "Passing a prop with the same name to many sibling components"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool avoids long prop drilling for data many components need?",
    "topic": "Composition patterns",
    "choices": [
      "The key prop",
      "React context",
      "A longer chain of fragments",
      "A ref that is shared by all components"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of a compound component such as Tabs with Tabs.Panel?",
    "topic": "Composition patterns",
    "choices": [
      "The parts can be rendered in any browser without needing a build step",
      "The parts are all bundled into one single file by the compiler",
      "The parts must always be rendered in the same fixed order on the page",
      "Related parts share state through context while the parent controls the layout"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why prefer composition over inheritance for components?",
    "topic": "Composition patterns",
    "choices": [
      "It gives flexible reuse without tight coupling between components",
      "Inheritance is not allowed by the JavaScript language at all",
      "Composition always produces smaller bundles than inheritance does",
      "Inheritance makes components impossible to type in TypeScript"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a controlled component?",
    "topic": "Composition patterns",
    "choices": [
      "A component that the parent component is not allowed to render at all times",
      "A component that controls the state of all of its sibling components at once",
      "A component whose value is held in state and changed through a callback",
      "A component whose output cannot be changed by any of the props it receives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a presentational component?",
    "topic": "Composition patterns",
    "choices": [
      "One that fetches its own data and keeps all of the application state",
      "One that can be rendered only once on the whole page",
      "One that focuses on how things look and gets its data through props",
      "One that has no props and returns the same markup always"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is it a good idea to split a component in two?",
    "topic": "Composition patterns",
    "choices": [
      "When it does several unrelated jobs or part of it is reused elsewhere",
      "When it contains more than a single line of JSX markup",
      "When it uses a hook, since hooks belong in their own files",
      "When it receives more than one prop from its parent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does destructuring do in const { name, age } = user?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "Copies the whole user object into two new variables",
      "Deletes the name and age properties from the user object",
      "Creates a new object that holds only the name and age values",
      "Creates variables from the properties of user that have those names"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the spread operator do in { ...a, b: 2 }?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "Merges a and b into an array of two values",
      "Copies the properties of a into a new object and then sets b",
      "Changes the original object a so that it gets the property b",
      "Creates a deep copy of a and every object inside it"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does optional chaining user?.address?.city do when address is missing?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "Returns null and logs a warning to the console",
      "Returns undefined instead of throwing an error",
      "Creates an empty address object and reads its city",
      "Throws a TypeError that names the missing property"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the nullish coalescing operator a ?? b return?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "b whenever a is any falsy value, including 0 and an empty string",
      "The logical AND of the two values as a boolean",
      "An array that holds both a and b in order",
      "b only when a is null or undefined, otherwise a"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an async function return?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "A promise",
      "The value written after the return keyword",
      "undefined until the await keyword has run",
      "A callback that receives the result"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Promise.all do when one promise rejects?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "Waits for the others and resolves with an array of errors",
      "Ignores the rejected promise and resolves with the rest",
      "Rejects right away with that error",
      "Retries the rejected promise until it succeeds"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the map method return?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "The original array changed in place with new values",
      "The first element for which the callback returns true",
      "A new array with the result of the callback for each element",
      "A single value that is built from all the elements"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the difference between import and require?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "import is the ES module syntax and require is the CommonJS function",
      "import loads files at runtime only and require loads them at build time",
      "require supports named exports while import supports default exports only",
      "They are two names for the same feature in every environment"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a template literal such as `Hello ${name}` do?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "Creates a function that returns the name of a user",
      "Defines a constant that cannot be changed afterwards",
      "Runs the text inside the braces as a shell command",
      "Builds a string with the value of the expression inserted"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a default parameter, as in function f(x = 1), do?",
    "topic": "Modern JavaScript syntax",
    "choices": [
      "Uses 1 whenever the argument is falsy, including 0",
      "Uses 1 only when the argument is undefined",
      "Makes the function throw an error if x is passed",
      "Defines a global variable called x with value 1"
    ],
    "answerIdx": 1
  }
]
```

LAYER: next-fullstack-2

```json
[
  {
    "stem": "In the App Router, what turns a folder into a route that visitors can open?",
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
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
    "topic": "File-based routing",
    "choices": [
      "Nested folders create nested path segments in the url",
      "Nested folders are flattened into a single path segment in the url",
      "Folders create query parameters instead of path segments",
      "The url is built from the file names and not from the folders"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a layout in the App Router?",
    "topic": "Nested layouts",
    "choices": [
      "A page that is rendered on the server for each request without any caching",
      "A file that lists the routes of the application in the order of the menu",
      "A component that is rendered again from scratch on every navigation",
      "UI shared by a segment and its children that stays mounted between navigations"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which layout must every app have?",
    "topic": "Nested layouts",
    "choices": [
      "A layout for each route folder that has a page inside of it",
      "The root layout, which renders the html and body tags",
      "A layout file next to every page file of the application",
      "A layout that is imported by the next config file at build time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to a layout state when the user moves between two pages that share it?",
    "topic": "Nested layouts",
    "choices": [
      "It is reset, because every navigation mounts the layout from scratch",
      "It is preserved, because the layout does not re-render between those pages",
      "It is saved in the url so that the layout can restore it",
      "It is sent to the server and returned with the next page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a layout receive the page it should show?",
    "topic": "Nested layouts",
    "choices": [
      "Through a page prop that holds the name of the route",
      "Through a call to a hook that reads the current route",
      "Through a global variable that is set by the router",
      "Through the children prop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can layouts be nested?",
    "topic": "Nested layouts",
    "choices": [
      "Yes, a layout in a subfolder wraps its pages inside the parent layout",
      "No, an app can have only one layout file for the whole project",
      "Yes, but only if each layout is registered in the root layout",
      "No, a nested layout replaces the parent layout completely"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between a layout and a template?",
    "topic": "Nested layouts",
    "choices": [
      "A template is rendered on the server and a layout only on the client",
      "A template can only be used in the root of the application",
      "A template creates a new instance on every navigation, a layout does not",
      "A layout is for pages and a template is for api routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where do you set metadata such as the title for a route segment?",
    "topic": "Nested layouts",
    "choices": [
      "By placing a title tag inside the page and letting Next.js find it",
      "By adding the title to the route name in the folder structure",
      "By exporting a metadata object or a generateMetadata function",
      "By calling a setTitle function inside a client effect on mount"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can a navigation bar placed in a layout avoid re-rendering?",
    "topic": "Nested layouts",
    "choices": [
      "Layouts are preserved while only the changing page content is replaced",
      "Layouts are cached in the browser for as long as the tab is open",
      "Layouts are served from a CDN that never invalidates the content",
      "Layouts are excluded from the React tree during navigation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a layout read the search params of the current url?",
    "topic": "Nested layouts",
    "choices": [
      "Yes, through a searchParams prop that is passed to every layout",
      "Yes, but only when the layout is marked with use client at the top",
      "No, search params can only be read in the root layout of the app",
      "No, layouts do not re-render on navigation so they do not receive searchParams"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good use of a layout for a dashboard section?",
    "topic": "Nested layouts",
    "choices": [
      "Fetch the data of every page of the section in a single place",
      "Render the sidebar once and let the pages change inside it",
      "Replace the root layout whenever the user opens the dashboard",
      "Handle the form submissions of all the pages of the section"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you define a route with a dynamic segment for a blog post?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "Name the folder with curly braces, such as {slug}",
      "Name the folder with square brackets, such as [slug]",
      "Name the folder with a colon in front, such as :slug",
      "Add a parameter list to the page file name, such as page(slug)"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a page read the value of a dynamic segment?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "From a global object called route that Next.js defines",
      "From the query string of the url with a hook for it",
      "From the layout, which passes it down as the children prop",
      "From the params prop passed to the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the folder name [...slug] match?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "One or more segments of the path, as a catch all route",
      "Exactly one segment, as a plain dynamic route",
      "Zero or more segments, but never the root path itself",
      "Only the segments that have a file extension at the end"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between [...slug] and [[...slug]]?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "The double brackets match only the root path of the application",
      "The single brackets match more segments than the double brackets",
      "The double brackets also match the path with no segments",
      "The double brackets make the segment a query parameter"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In recent versions of Next.js, how is the params prop of a page typed?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "As a plain object that is available immediately on render",
      "As a function that returns the values when it is called",
      "As a promise that you await before using the values",
      "As a string with all segments joined by slashes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does generateStaticParams do?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "Lists the parameter values to prerender at build time",
      "Reads the parameters of the current request at runtime",
      "Validates the parameters of the url before the page renders",
      "Creates new routes in the file system while the server runs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which url does the folder app/shop/[category]/[id] match?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "/shop/shoes only, because the last segment is optional",
      "/shop/42/shoes, since the order of segments does not matter",
      "/shop/[category]/[id], written exactly as the folder name",
      "/shop/shoes/42"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a visitor opens a dynamic route that has no matching data?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "Next.js decides by itself and always shows the not found page",
      "You can call notFound to show the not found page",
      "The page renders with empty values for all of its parameters",
      "The server redirects to the home page without any other change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are searchParams on a page?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "The dynamic segments that are written inside the folder names",
      "The query string values of the url, for example ?page=2",
      "The parameters that are set in the next config file",
      "The values that a layout passes down to its child pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a catch all route?",
    "topic": "Dynamic and catch-all routes",
    "choices": [
      "To match every request of the site, including api and static files",
      "To redirect every unknown url to the root layout of the application",
      "To handle only urls that contain a query string in them",
      "To handle many path depths with one page, such as docs or a CMS"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which Next.js feature gives client side navigation with prefetching?",
    "topic": "Linking and navigation",
    "choices": [
      "The Link component",
      "A plain anchor element that points to the page",
      "The window.location object that is set from an effect",
      "The fetch function called from a click handler"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Link prefetch by default when it enters the viewport?",
    "topic": "Linking and navigation",
    "choices": [
      "Every page of the site that is reachable from the current page",
      "Only the images of the target page and none of its code",
      "The route that it points to, so the navigation feels instant",
      "The data of the previous page so that going back is faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hook lets a client component navigate from code?",
    "topic": "Linking and navigation",
    "choices": [
      "useNavigate",
      "useHistory",
      "useRouter",
      "useLocation"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hook reads the current path in a client component?",
    "topic": "Linking and navigation",
    "choices": [
      "usePathname",
      "useRoute",
      "useUrl",
      "useLocation"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does redirect from next/navigation do?",
    "topic": "Linking and navigation",
    "choices": [
      "Reloads the current page so that the latest data is shown",
      "Adds a new entry to the history without changing the page content",
      "Opens the target url in a new browser tab with the same session",
      "Sends the user to another url, for example from a server component or action"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you mark the active link in a navigation bar?",
    "topic": "Linking and navigation",
    "choices": [
      "Add an active prop to the Link and let Next.js style it",
      "Compare the current path from usePathname with the link href",
      "Read the title of the page and match it with the link text",
      "Use a CSS rule that targets the current url in the address bar"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which hook reads query string values in a client component?",
    "topic": "Linking and navigation",
    "choices": [
      "useQueryString",
      "useSearchParams",
      "useParams only",
      "useRouter().query"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the difference between router.push and router.replace?",
    "topic": "Linking and navigation",
    "choices": [
      "replace opens the page in a new tab and push uses the same tab",
      "push reloads the whole page and replace updates only the content",
      "push is for external links and replace is for internal links",
      "replace does not add a new entry to the history stack"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Link behave for an external url?",
    "topic": "Linking and navigation",
    "choices": [
      "It still renders an anchor, but the browser navigates away from the app",
      "It blocks the navigation and shows a warning page",
      "It opens the url inside an iframe in the current page",
      "It prefetches the external page like any internal route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you turn off prefetching for a single Link?",
    "topic": "Linking and navigation",
    "choices": [
      "Wrap the Link in a component that is marked as dynamic for the route",
      "Add a noprefetch attribute to the anchor element that Link renders",
      "Set the prefetch prop to false on that Link",
      "Remove the target route from the build output in the next config file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a route group used for?",
    "topic": "Route groups",
    "choices": [
      "Protecting all routes in the group with a password",
      "Grouping routes so they are rendered on the server only",
      "Organising routes and layouts without changing the url",
      "Combining several routes into one page at build time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the folder name (marketing) do to the url?",
    "topic": "Route groups",
    "choices": [
      "It is left out of the url path completely",
      "It is added to the url as the first path segment",
      "It is turned into a query parameter named marketing",
      "It makes the route available only on the marketing domain"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common reason for using two route groups under app?",
    "topic": "Route groups",
    "choices": [
      "Running the two sections on two separate servers at build time",
      "Sharing the same state between the two sections of the app",
      "Making the two sections use two different versions of React",
      "Giving different sections different root layouts, such as site and dashboard"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can two route groups contain a page for the same path?",
    "topic": "Route groups",
    "choices": [
      "Yes, and the last group in alphabetical order wins",
      "No, that would resolve to the same url and cause a conflict",
      "Yes, and the visitor sees both pages one after the other",
      "No, because a group may contain only one single page file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a private folder, whose name starts with an underscore, do?",
    "topic": "Route groups",
    "choices": [
      "It is routed only for users who are logged in to the app",
      "It is excluded from routing, so it can hold colocated files",
      "It makes the folder available as an api route only",
      "It marks the folder as deprecated in the build output"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why would you put a layout inside a route group?",
    "topic": "Route groups",
    "choices": [
      "To make the layout run on the edge network of the host",
      "To let the layout read the cookies of the user directly",
      "To have the layout cached for every page of the application",
      "To apply it to the pages of the group without adding a path segment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to the url of a page at app/(shop)/cart/page.tsx?",
    "topic": "Route groups",
    "choices": [
      "It is served at /cart",
      "It is served at /(shop)/cart",
      "It is served at /shop/cart",
      "It is not served, because groups cannot hold pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are parallel routes, written with an @ folder name, used for?",
    "topic": "Route groups",
    "choices": [
      "Running two pages at the same time on different servers",
      "Creating two copies of one page for testing a change",
      "Rendering several pages in the same layout, for example a modal and a feed",
      "Loading the same page for two different languages at once"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What are intercepting routes used for?",
    "topic": "Route groups",
    "choices": [
      "Blocking requests to routes that the user is not allowed to see",
      "Redirecting requests from old urls to new urls on the server",
      "Showing another route in the current context, such as a modal over a list",
      "Measuring how long each route takes to render"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are route groups handy in a larger app?",
    "topic": "Route groups",
    "choices": [
      "They let you split the folder structure by feature without extra url segments",
      "They compile faster than ordinary folders in a production build",
      "They allow the same file name to be used in every folder",
      "They remove the need for layouts in the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a loading file do in a route segment?",
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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
    "topic": "Loading and error files",
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

LAYER: next-fullstack-3

```json
[
  {
    "stem": "In the App Router, what is a component by default?",
    "topic": "Server versus client components",
    "choices": [
      "A client component, rendered in the browser after hydration",
      "A static component, rendered once at build time for all users",
      "A server component, rendered on the server",
      "An edge component, rendered by the network closest to the visitor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can a server component do that a client component cannot?",
    "topic": "Server versus client components",
    "choices": [
      "Read from a database or the file system directly while rendering",
      "Respond to clicks and other user events on the page",
      "Hold state with the useState hook and update it later",
      "Use browser APIs such as window and localStorage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can a client component do that a server component cannot?",
    "topic": "Server versus client components",
    "choices": [
      "Access secrets from environment variables without exposing them",
      "Fetch data on the server before the page is sent to the browser",
      "Send less JavaScript to the browser than any other component",
      "Use state, effects and browser event handlers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of server components for the JavaScript bundle?",
    "topic": "Server versus client components",
    "choices": [
      "Their code is compressed twice, which makes the bundle smaller for the browser",
      "Their code is not sent to the browser, so the bundle stays smaller",
      "Their code is split into separate files that load on demand when they are needed",
      "Their code is converted into CSS, which the browser is able to load faster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which hook is unavailable in a server component?",
    "topic": "Server versus client components",
    "choices": [
      "use",
      "useState",
      "useId",
      "cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a server component import and render a client component?",
    "topic": "Server versus client components",
    "choices": [
      "No, a server component may render only other server components",
      "Yes, but only when the client component has no props at all",
      "No, the two kinds must be placed in separate route folders",
      "Yes, client components can be used inside server components"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a client component import a server component directly?",
    "topic": "Server versus client components",
    "choices": [
      "No, but a server component can be passed to it as children or a prop",
      "Yes, and the imported component keeps running on the server",
      "Yes, but only when both of them are in the same file",
      "No, because client components cannot render any children"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can you keep an API key in a server component?",
    "topic": "Server versus client components",
    "choices": [
      "Server components encrypt the keys before they are used in any of the calls",
      "The browser blocks every request that includes a secret value in its headers",
      "The code and its environment variables never reach the browser",
      "Next.js removes the keys from the code of the app when it is deployed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should interactive widgets such as a like button usually live?",
    "topic": "Server versus client components",
    "choices": [
      "In the root layout, so every page receives the same widgets",
      "In a route handler that returns the HTML for the widget",
      "In small client components, so most of the page stays on the server",
      "In a server component that registers click listeners"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good way to share data between server components without prop drilling?",
    "topic": "Server versus client components",
    "choices": [
      "Fetch it where it is needed, since repeated fetches are deduplicated",
      "Put it in React context, which server components read freely",
      "Store it in a global variable that is shared between requests",
      "Save it in localStorage and read it back inside each component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is a route rendered statically?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "When it is requested for the very first time by a user who is logged in",
      "When the name of its folder is written in lowercase letters only",
      "When it is placed inside a route group in the app folder of the project",
      "When it uses no dynamic functions or uncached data, so it can be prerendered"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes a route dynamic?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "Having a component marked with the use client directive",
      "Using request time information, such as cookies, headers or searchParams",
      "Having more than one layout above the page in the folder tree",
      "Containing a fetch call anywhere in the component tree"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which function from next/headers makes a route dynamic?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "redirect",
      "cookies",
      "notFound",
      "revalidatePath"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of static rendering?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "The page is rebuilt for each visitor with fresh and personal data every time",
      "The page runs entirely in the browser without any work being done on a server",
      "The page is checked by the compiler for accessibility errors before it ships",
      "The HTML is built ahead of time and can be served fast from a CDN"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the route segment option dynamic set to force-dynamic do?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "Renders the route on every request instead of at build time",
      "Makes the route load only after the user has scrolled to it",
      "Forces the route to be a client component in the browser",
      "Marks the route as private so search engines cannot index it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When does a static page get its content updated after deployment?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "Every time that a visitor opens the page in a new browser tab",
      "Only when the server process is restarted by the host of the app",
      "When it is revalidated by time, on demand, or by a new build",
      "Never, because static pages cannot change at all after the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does generateStaticParams help you do for a dynamic route?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "Generate the urls of the sitemap for search engines",
      "Check at runtime which parameters a request contains",
      "Prerender a known list of paths at build time",
      "Convert dynamic segments into query strings in the url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you find out whether a route in the build output is static or dynamic?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "The build summary marks each route with a symbol for its rendering type",
      "The browser console prints the type of each page when it loads",
      "The package.json file lists the type of each route in an object",
      "The file name of the page ends with a letter that shows its type"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a trade off of fully dynamic rendering?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "Pages can no longer read the cookies or the headers of the request",
      "Pages must be written as client components only and nothing else",
      "The HTML of the page cannot be indexed by search engines at all",
      "The server does work for every request, so it can be slower and cost more"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a page that reads searchParams become?",
    "topic": "Static and dynamic rendering",
    "choices": [
      "Static, because the query string is part of the url path",
      "Dynamic, since the query string is only known at request time",
      "Client rendered, because search params exist only in the browser",
      "Cached forever, because the url is used as the cache key"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does streaming allow in the App Router?",
    "topic": "Streaming and Suspense",
    "choices": [
      "Sending the whole page as one single large file so that fewer requests are used",
      "Sending parts of the page to the browser as they become ready",
      "Playing video content from the server without needing a player in the browser",
      "Keeping an open connection to the browser so that live data is pushed into the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which React component marks a part of the tree that can wait while the rest renders?",
    "topic": "Streaming and Suspense",
    "choices": [
      "Fragment",
      "StrictMode",
      "Profiler",
      "Suspense"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the fallback prop of Suspense show?",
    "topic": "Streaming and Suspense",
    "choices": [
      "The placeholder UI shown until the suspended content is ready",
      "The error message that is shown when the content fails to load",
      "The previous version of the page that was cached earlier",
      "The raw HTML that is sent before JavaScript is loaded"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a loading file relate to Suspense?",
    "topic": "Streaming and Suspense",
    "choices": [
      "It replaces Suspense, which is not needed in the App Router",
      "It runs on the client only, after the page has loaded",
      "It wraps the page in a Suspense boundary with the file as its fallback",
      "It loads the JavaScript for the page before the HTML arrives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why wrap a slow component in its own Suspense boundary?",
    "topic": "Streaming and Suspense",
    "choices": [
      "The slow component is skipped whenever the browser happens to be offline",
      "The slow component is rendered twice on the server for better accuracy",
      "The rest of the page can show up without waiting for the slow part",
      "The boundary makes the slow component run faster on the server of the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of streaming for users?",
    "topic": "Streaming and Suspense",
    "choices": [
      "They see content earlier and the slowest data does not block the whole page",
      "They download less data in total because pages are compressed more",
      "They can use the page without JavaScript in every situation",
      "They get the same HTML for each visit without any server work"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens in a server component that awaits a slow fetch outside any Suspense boundary?",
    "topic": "Streaming and Suspense",
    "choices": [
      "The fetch is cancelled after a few seconds by Next.js",
      "The component is moved to the browser to finish the work there",
      "The rest of the page renders and the slow part is left blank",
      "The page waits for it, or the closest loading file is shown"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does streaming change the final HTML that the browser ends up with?",
    "topic": "Streaming and Suspense",
    "choices": [
      "Yes, it removes the parts of the page that load slowly",
      "No, it delivers the same content in pieces over time",
      "Yes, it replaces the server HTML with a client rendered version",
      "No, but it requires the page to be completely static"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which part of the response is sent first when a page streams?",
    "topic": "Streaming and Suspense",
    "choices": [
      "The slowest data of the page, so that nothing is missing",
      "The shell of the page with fallbacks, followed by the ready content",
      "The JavaScript bundle, followed by the HTML of the page",
      "The footer of the page, followed by the header and the body"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a suspense boundary need in order to stream data?",
    "topic": "Streaming and Suspense",
    "choices": [
      "A client component that is marked with the use client directive",
      "A route handler that returns a stream of lines of plain text",
      "A fetch call that has its cache option set to the value no-store",
      "A component below it that suspends, such as an awaited server component"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which fetch option opts a single request out of the data cache?",
    "topic": "Caching and revalidation",
    "choices": [
      "cache set to no-store",
      "mode set to no-cors",
      "method set to HEAD",
      "keepalive set to false"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you make fetched data refresh at most once a minute?",
    "topic": "Caching and revalidation",
    "choices": [
      "Call setInterval with 60000 inside the component",
      "Add a Cache-Control header with 60 to the page",
      "Pass next: { revalidate: 60 } to fetch",
      "Restart the server every 60 seconds with a scheduler"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does revalidatePath do?",
    "topic": "Caching and revalidation",
    "choices": [
      "Changes the url of a page for all of the visitors who open it",
      "Deletes the file of the page from the output of the build",
      "Marks the data of a path as stale so it is rebuilt on the next request",
      "Checks that the path of a page is spelled correctly in the code"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does revalidateTag do?",
    "topic": "Caching and revalidation",
    "choices": [
      "Invalidates cached fetches that were tagged with that name",
      "Adds an HTML tag to the head of every single page of the whole app",
      "Removes a tag from the metadata that belongs to the current route",
      "Validates the tags of a blog post against a schema before it is saved"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you attach a tag to a fetch request for later invalidation?",
    "topic": "Caching and revalidation",
    "choices": [
      "Add a data-tag attribute to the element that shows the data",
      "Name the file with the tag in its file name",
      "Write the tag in a comment above the fetch call",
      "Pass next: { tags: [\"posts\"] } in the fetch options"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does request memoization do?",
    "topic": "Caching and revalidation",
    "choices": [
      "Saves every response in a file that is shared by all visitors",
      "Deduplicates identical fetches made while rendering a single request",
      "Stores the rendered page in the browser for a week",
      "Merges the requests of different users into one fetch call"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is time based revalidation also called?",
    "topic": "Caching and revalidation",
    "choices": [
      "Server side rendering on demand",
      "Incremental static regeneration",
      "Client side hydration of the markup",
      "Progressive enhancement of forms"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When does on demand revalidation fit better than time based revalidation?",
    "topic": "Caching and revalidation",
    "choices": [
      "When content changes at random every few seconds without any known cause",
      "When content never changes at all and has to be served forever",
      "When the page has to be rendered fresh for every separate visitor",
      "When content changes at known moments, such as after a CMS publish or a mutation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a stale page when it is revalidated by time?",
    "topic": "Caching and revalidation",
    "choices": [
      "The old page is served while a fresh one is generated for the next visit",
      "The old page is deleted and visitors see an error until the new one is rebuilt",
      "The visitor waits until the new page has been built before they see anything",
      "The old page is served forever, and the new one is never generated at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why can cached data show old values after a database change?",
    "topic": "Caching and revalidation",
    "choices": [
      "The database sends the old values to the cache on purpose each time it is asked",
      "The browser refuses to download data that was changed on the server side",
      "The data cache is not invalidated until it expires or you revalidate it",
      "Server components are not able to read any rows that have been changed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where can you fetch data directly in the App Router?",
    "topic": "Data fetching in server components",
    "choices": [
      "Only inside route handlers that return JSON to the page",
      "Only in client components with the useEffect hook",
      "Inside async server components, by awaiting the call",
      "Only in the root layout of the application"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of fetching in a server component compared with an effect in the browser?",
    "topic": "Data fetching in server components",
    "choices": [
      "The data arrives with the HTML, with no extra round trip or loading flicker",
      "The data is always cached by the browser for the next visit of the user",
      "The data is encrypted while it travels between the server and the browser",
      "The data is refreshed automatically every few seconds while the page is open"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a server component query a database?",
    "topic": "Data fetching in server components",
    "choices": [
      "Send a fetch request to the page that belongs to the same route as the component",
      "Import the database driver inside a client component and query from the browser",
      "Use a hook that returns the rows of a table as an array to the component",
      "Call the database client directly in the component code"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you run two independent data requests at the same time in a server component?",
    "topic": "Data fetching in server components",
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
    "topic": "Data fetching in server components",
    "choices": [
      "Requests that are split across several servers for speed",
      "Requests that wait for each other even though they are independent",
      "Requests that are cached by the browser one after another",
      "Requests that run in parallel and finish together"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you avoid a waterfall caused by nested server components?",
    "topic": "Data fetching in server components",
    "choices": [
      "Move all of the fetches into one single client component that is placed at the top",
      "Add a longer revalidate time to every one of the fetches in the whole route",
      "Turn off streaming for the whole route so the order is fixed",
      "Fetch the data in parallel higher up, or use Suspense around each part"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the cache function from React help with for database calls?",
    "topic": "Data fetching in server components",
    "choices": [
      "Deduplicates calls with the same arguments inside one render pass",
      "Stores the result of the call in the browser for the next visit",
      "Encrypts the query before it is sent on to the database server",
      "Turns a database query into a REST api call that the browser makes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do errors from a failed fetch in a server component show up?",
    "topic": "Data fetching in server components",
    "choices": [
      "They are shown only in the console of the browser and nowhere on the page",
      "They are returned as a null value to the component that made the call",
      "They are thrown and caught by the nearest error file",
      "They are ignored unless the route happens to be a dynamic one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you do when data fetching needs a secret token?",
    "topic": "Data fetching in server components",
    "choices": [
      "Prefix the variable with NEXT_PUBLIC so the browser can read it",
      "Store the token in localStorage and read it from the component",
      "Keep the call in a server component so the token stays on the server",
      "Pass the token as a query parameter in the page url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can server components use async and await directly?",
    "topic": "Data fetching in server components",
    "choices": [
      "They render on the server where a component can wait for promises",
      "They are compiled to run in a worker that supports promises natively",
      "They are the only components that are ever allowed to return promises",
      "They convert the await keyword into a hook call when they are built"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the use client directive do?",
    "topic": "The use client boundary",
    "choices": [
      "Makes the page fetch its data from the browser only",
      "Tells the server to skip rendering the component",
      "Turns on strict mode for the current file",
      "Marks a file and its imports as part of the client bundle"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where must the use client directive be placed?",
    "topic": "The use client boundary",
    "choices": [
      "Inside the component function before the return statement",
      "At the very top of the file, before any imports",
      "In the next config file, listed with the route name",
      "At the bottom of the file, after the default export"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Does every component inside a client file need its own use client?",
    "topic": "The use client boundary",
    "choices": [
      "Yes, each component needs the directive of its own to run in the browser",
      "No, the directive marks a boundary and modules imported below it are client code",
      "No, but only the first component of the file becomes a client component",
      "Yes, or else the component renders on the server as it did before"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why keep the client boundary as low in the tree as possible?",
    "topic": "The use client boundary",
    "choices": [
      "Client components load faster than any server component",
      "The directive costs more at runtime when placed higher",
      "Only low components are allowed to hold state",
      "Less code is sent to the browser, and more stays on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which props can a server component pass to a client component?",
    "topic": "The use client boundary",
    "choices": [
      "Serialisable values, such as strings, numbers, objects and server action functions",
      "Any value, including class instances and functions defined in the component",
      "Only strings, since other values cannot cross the boundary",
      "Only values that come from the database of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What error appears when a server component passes an event handler to a client component?",
    "topic": "The use client boundary",
    "choices": [
      "Event handlers are not supported by React in any kind of environment",
      "The handler is passed on, but it runs on the server in secret",
      "Functions that are not server actions cannot be passed to client components",
      "Client components are not able to receive any props from a server component"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean when a library fails with a createContext error in a server component?",
    "topic": "The use client boundary",
    "choices": [
      "The library is not compatible with JavaScript that runs on the server in any case",
      "The context was created twice in the same render pass by two copies of React",
      "The library needs to run on the client, so wrap it in a client component",
      "The server has no memory left to hold the new context that was requested"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you use a context provider in the root layout, which is a server component?",
    "topic": "The use client boundary",
    "choices": [
      "Put the provider in a client component and render children inside it in the layout",
      "Mark the root layout with use client so that it runs in the browser",
      "Create the context in a route handler and import it into the layout",
      "Skip the provider and read the context value from the url of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Does a client component run on the server at all?",
    "topic": "The use client boundary",
    "choices": [
      "No, it runs only in the browser after the first render",
      "Yes, but only when the route is dynamic and has no cache",
      "No, the server skips every file that has the use client directive",
      "Yes, it is prerendered to HTML on the server and then hydrated in the browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is hydration?",
    "topic": "The use client boundary",
    "choices": [
      "React converts the HTML of the page into a JSON document",
      "React attaches event handlers to server rendered HTML in the browser",
      "React copies the database rows to the browser for reading",
      "React compresses the page to speed up later visits"
    ],
    "answerIdx": 1
  }
]
```

LAYER: next-fullstack-4

```json
[
  {
    "stem": "What is Prisma?",
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Prisma schema and models",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Migrations",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Typed CRUD queries",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Relations",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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
    "topic": "Filtering and pagination",
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

LAYER: next-fullstack-5

```json
[
  {
    "stem": "What is a server action?",
    "topic": "Server actions basics",
    "choices": [
      "A route handler file that answers HTTP requests for a path",
      "A client hook that sends a request to the server on each render",
      "An async function that runs on the server and can be called from the UI",
      "A background job that the host runs on a timer for the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which directive marks a function as a server action?",
    "topic": "Server actions basics",
    "choices": [
      "use server",
      "use client",
      "use action",
      "use api"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where can the use server directive be placed?",
    "topic": "Server actions basics",
    "choices": [
      "Only inside the next config file that sits at the root of the project",
      "Only at the top of a component that renders a form for the user",
      "Only inside the route handler files that are named route.ts in the app",
      "At the top of a function body or at the top of a file of actions"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a client component call a server action?",
    "topic": "Server actions basics",
    "choices": [
      "By sending a fetch request to the url of the action file",
      "By importing the action from a file that starts with use server",
      "By calling the function through the window object",
      "By registering the action as an api route first"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to a server action call at the network level?",
    "topic": "Server actions basics",
    "choices": [
      "Next.js opens a websocket that stays connected to the page",
      "Next.js sends a POST request to the server for it",
      "Next.js runs the function in the browser with a worker",
      "Next.js sends a GET request with the arguments in the url"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must you treat server action inputs as untrusted?",
    "topic": "Server actions basics",
    "choices": [
      "The browser changes the arguments before it sends them",
      "Next.js removes validation from actions for better speed",
      "Actions run in the browser where inputs cannot be checked",
      "Actions are public endpoints that anyone can call with any data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does the body of a server action get sent to the browser?",
    "topic": "Server actions basics",
    "choices": [
      "No, the browser only receives a reference that it can call",
      "Yes, the whole function is sent so that it can run in the browser",
      "Yes, but it is minified and encrypted with a key from the server",
      "Only when the action is declared inside a client component file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a server action be used from a server component?",
    "topic": "Server actions basics",
    "choices": [
      "No, actions can be used only in client components",
      "Yes, but only when the action is exported as default",
      "Yes, it can be passed to a form or called on the server",
      "No, because server components cannot render forms"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which data types can a server action return to the client?",
    "topic": "Server actions basics",
    "choices": [
      "Any value, including functions and class instances",
      "Only strings, since they are sent as text",
      "Serialisable values, such as objects, strings and numbers",
      "Only booleans that tell whether the action worked"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of server actions over a hand written api route for a form?",
    "topic": "Server actions basics",
    "choices": [
      "Less code, with type safety and no separate url to manage",
      "They run faster than any other kind of request that a page can make",
      "They do not need any validation of the data that they receive at all",
      "They are available without any server process running behind the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you submit a form to a server action?",
    "topic": "Form submissions",
    "choices": [
      "Add an onSubmit handler that sends a fetch request",
      "Set the form method to the file name of the action",
      "Call the action inside an effect after the form renders",
      "Pass the action to the form action prop"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a server action receive from a form?",
    "topic": "Form submissions",
    "choices": [
      "A JSON string that is built by the browser",
      "A FormData object holding the fields of the form",
      "The state of the component that rendered the form",
      "A list of the elements inside the form tag"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read a field from FormData?",
    "topic": "Form submissions",
    "choices": [
      "formData.email",
      "formData.get(\"email\")",
      "formData.read(\"email\")",
      "formData.fields.email"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why do form fields need a name attribute?",
    "topic": "Form submissions",
    "choices": [
      "The name is shown as a label next to the field",
      "The name sets the order in which fields are validated",
      "The name tells the browser which keyboard to show",
      "The name is the key under which the value appears in FormData"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is progressive enhancement for a form with a server action?",
    "topic": "Form submissions",
    "choices": [
      "The form can work even before JavaScript has loaded",
      "The form gets extra features when the browser is newer",
      "The form loads in several steps as the user scrolls",
      "The form is rendered twice for accessibility reasons"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you pass an extra argument, such as an id, to a server action in a form?",
    "topic": "Form submissions",
    "choices": [
      "Add the id to the page url and read it in the action",
      "Store the id in a global variable on the server",
      "Use bind to create an action with the argument already set",
      "Pass it as a second parameter in the form tag"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which hidden approach also passes an id with a form?",
    "topic": "Form submissions",
    "choices": [
      "A cookie that is set from the browser on each click",
      "A header that the form adds to the request",
      "A hidden input with a name and the value",
      "A query string that is added to the action url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where does a form that calls a server action send its submission?",
    "topic": "Form submissions",
    "choices": [
      "To the same page, with a POST request that Next.js handles",
      "To a separate api route that Next.js creates by name",
      "To an external service that the host provides",
      "To the next page in the route folder"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should the action return after invalid input?",
    "topic": "Form submissions",
    "choices": [
      "A redirect to the home page of the site",
      "Nothing, since validation errors are shown by the browser",
      "An exception that crashes the server process",
      "An error object that the form can display"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the useFormStatus hook tell you?",
    "topic": "Form submissions",
    "choices": [
      "Whether the form fields hold valid values",
      "Whether the parent form is currently submitting",
      "Whether the server action file was found",
      "How many times the form has been submitted"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why must a server action revalidate data after a mutation?",
    "topic": "Revalidation after mutations",
    "choices": [
      "The database refuses new writes until it is revalidated",
      "Cached pages would otherwise keep showing the old data",
      "The browser deletes its cache after every mutation",
      "Server actions can change data only once per request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which function refreshes the data of a specific path after a change?",
    "topic": "Revalidation after mutations",
    "choices": [
      "refreshRoute",
      "invalidateCache",
      "updatePage",
      "revalidatePath"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function refreshes all fetches that share a tag?",
    "topic": "Revalidation after mutations",
    "choices": [
      "revalidateTag",
      "clearTag",
      "refreshTag",
      "resetCache"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does redirect do after a successful mutation in an action?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Reloads the current page to show the new data",
      "Clears the form and keeps the user on the page",
      "Sends the user to another page, such as the new item",
      "Stops the action from saving the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should redirect be called relative to try and catch?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Inside the try block, so that every error is handled in one place",
      "Inside the catch block only, after the other errors are logged",
      "Outside the try block, because it works by throwing a special error",
      "Anywhere, since it returns a value and never throws an error"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does router.refresh do on the client?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Refetches the server components of the current route without losing client state",
      "Reloads the whole browser page and drops all of the client state with it",
      "Clears the cache of the browser for every one of the routes of the app",
      "Navigates to the home page of the site and then back to this page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the usual order inside a mutation action?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Redirect, write to the database, then validate the input",
      "Revalidate, validate, then write the data to the database",
      "Write to the database, redirect and then validate the input",
      "Validate, write to the database, revalidate, then redirect or return"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why might a list still look old after you create an item?",
    "topic": "Revalidation after mutations",
    "choices": [
      "The database writes are delayed until the time of the next deploy",
      "The list page was cached and the path or tag was not revalidated",
      "The form was submitted twice and the second submission won the race",
      "The browser blocks all changes to lists of items on the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does revalidatePath mark as stale?",
    "topic": "Revalidation after mutations",
    "choices": [
      "The files of the page in the build folder",
      "The cached data and rendered output for that route",
      "The cookies of the user who made the request",
      "The database rows that the page displayed"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a server action revalidate several paths?",
    "topic": "Revalidation after mutations",
    "choices": [
      "No, an action may revalidate only one path",
      "Yes, but only when the paths share the same layout",
      "No, because revalidation runs only at build time",
      "Yes, by calling revalidatePath once for each path"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a route handler?",
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
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
    "topic": "Route handlers for APIs",
    "choices": [
      "Layout files in the app directory",
      "Middleware files at the root of the project",
      "API routes in the pages directory",
      "Server components that fetch data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why validate input with a schema library such as Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "It encrypts the input before it reaches the database of the application",
      "It makes the form render faster in the browser of the visitor",
      "It checks the shape and types of untrusted data and gives typed results",
      "It replaces the need to define a schema for the database at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does schema.safeParse(data) return?",
    "topic": "Validation with Zod",
    "choices": [
      "An object with a success flag and either data or an error",
      "The parsed data, or it throws an error if invalid",
      "A promise that resolves after the data is checked",
      "A boolean that says whether the data is valid"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you define a string that must be an email in Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "z.email.string()",
      "z.text().isEmail",
      "z.string({ type: \"email\" })",
      "z.string().email()"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you derive a TypeScript type from a Zod schema?",
    "topic": "Validation with Zod",
    "choices": [
      "type User = typeof schema.type",
      "type User = z.infer<typeof schema>",
      "type User = z.type(schema)",
      "type User = schema.toType()"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate on the server even when the form is validated in the browser?",
    "topic": "Validation with Zod",
    "choices": [
      "Browsers never run validation code that is written in JavaScript",
      "Client side checks can be skipped by anyone who calls the action directly",
      "Server validation is faster than the validation in the browser",
      "Client checks are removed when the app is built for production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you make a field optional in Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "Add a question mark inside the string of the field",
      "Set the field to null in the schema object",
      "Wrap the schema in z.maybe()",
      "Call .optional() on the field schema"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does z.coerce.number() do with the string \"42\" from a form?",
    "topic": "Validation with Zod",
    "choices": [
      "Converts it to the number 42 before validating",
      "Rejects it, since it is a string and not a number",
      "Keeps the string and only checks the characters",
      "Converts it to the boolean true because it is not empty"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can an action report field errors to the form?",
    "topic": "Validation with Zod",
    "choices": [
      "Throw the Zod error so that the browser shows it in a popup window",
      "Write the errors to a log file on the server and show nothing",
      "Return error.flatten().fieldErrors and show each message near its field",
      "Redirect to a separate error page that lists every one of the errors"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does z.object({ ... }) describe?",
    "topic": "Validation with Zod",
    "choices": [
      "A class whose instances are checked on each call",
      "A list of values that are all of the same type",
      "The expected shape of an object, with a schema for each key",
      "A function that checks the object after it is saved"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice for the data passed to the database after validation?",
    "topic": "Validation with Zod",
    "choices": [
      "Use the parsed result and not the original FormData",
      "Use the original input so that the user data stays intact",
      "Use both and let the database decide which to keep",
      "Use the first field of the input only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a form show a pending state while an action runs?",
    "topic": "Error and pending states",
    "choices": [
      "Add a longer timeout to the action so that the page simply waits",
      "Reload the page again and again until the action has finished",
      "Show a spinner made with CSS that runs for a fixed amount of time",
      "Use useFormStatus or useActionState, and disable the button while pending"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does useActionState return?",
    "topic": "Error and pending states",
    "choices": [
      "The result of the action without a way to run it again",
      "The current state, a wrapped action and a pending flag",
      "A promise that resolves when the form is valid",
      "An object that lists the fields of the form"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useOptimistic help with?",
    "topic": "Error and pending states",
    "choices": [
      "Retrying the action automatically when it fails with a network error",
      "Showing the expected result right away while the action is still running",
      "Caching the result of the action so that the next request is faster",
      "Running the action on the client without making any call to the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should an action report an expected error, such as a duplicate email?",
    "topic": "Error and pending states",
    "choices": [
      "Throw an error so the error file takes over the page",
      "Call redirect to an error page for every failure",
      "Ignore the error and show a success message",
      "Return an error state that the UI can show"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a server action throws an unexpected error?",
    "topic": "Error and pending states",
    "choices": [
      "The nearest error boundary shows its fallback UI",
      "The action retries three times before it gives up",
      "The server process stops until it is restarted",
      "The form silently resets and shows nothing"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why disable a submit button while the action is pending?",
    "topic": "Error and pending states",
    "choices": [
      "To make the action finish faster on the server",
      "To hide the form fields from the user during the call",
      "To prevent duplicate submissions from repeated clicks",
      "To stop the browser from validating the fields twice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a loading skeleton or spinner next to a form communicate?",
    "topic": "Error and pending states",
    "choices": [
      "That the server has finished its work and the data has been saved",
      "That the browser has run out of memory while it rendered the page",
      "That work is in progress, so the user does not click again or leave",
      "That the form is cached and will not send anything to the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you show a success message after an action completes?",
    "topic": "Error and pending states",
    "choices": [
      "Return a success state and render a message from it, or use a toast",
      "Reload the page and read the message from the address bar of the browser",
      "Write the message into the cookies of the visitor for the next request",
      "Throw a special error that carries the message to the next boundary"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which hook lets a client component start an action without a form?",
    "topic": "Error and pending states",
    "choices": [
      "useEffect, which runs after every single render",
      "useMemo, which caches the result of the action",
      "useRef, which stores the function between renders",
      "useTransition, which also gives you a pending flag"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should the UI do if a pending action fails after an optimistic update?",
    "topic": "Error and pending states",
    "choices": [
      "Keep the optimistic value as if it had worked",
      "Roll back to the real state and show an error",
      "Reload the browser tab to fetch fresh data",
      "Hide the item until the next deployment of the app"
    ],
    "answerIdx": 1
  }
]
```

LAYER: next-fullstack-6

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
      "A sign in method that uses an account from a social network such as GitHub",
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
      "In a public file in the repository for easy setup",
      "In localStorage of the browser so that it can be read later",
      "In the url of the callback that the provider calls",
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
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
    "choices": [
      "They cannot be used together with cookies in any of the browsers",
      "They can only be used with the credentials sign in and not with OAuth",
      "A token is hard to revoke before it expires, unless you add extra checks",
      "They need much more storage in the database for each of the users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when the session cookie expires?",
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
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
    "topic": "Sessions and JWT",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
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
    "topic": "Prisma adapter",
    "choices": [
      "Make the email of the account unique across all the providers",
      "Allow duplicates so that a user can sign in twice at once",
      "Use the user name as the unique key for accounts",
      "Make the provider and provider account id unique together"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must a server action check the session itself?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "Actions are public endpoints, so hiding the button does not protect them",
      "The user interface already checks the session and the action simply trusts it",
      "Server actions cannot be called at all when the user is signed out",
      "The session is verified by the browser of the user before each call"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a protected server action do when there is no session?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "Continue and use a default user for the request",
      "Show a message in the console and keep running",
      "Return an error or redirect before touching any data",
      "Ask the browser to send the session again in a header"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where should authorization checks for a record live?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "In the button component that triggers the action in the user interface",
      "In a client side hook that reads the url of the current page",
      "On the server, next to the data access, checking ownership or role",
      "In the CSS rules that hide the buttons from the other users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is authentication compared with authorization?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "Authentication proves who you are, authorization decides what you may do",
      "Authentication decides what you may do, authorization proves who you are",
      "They mean the same thing in different frameworks",
      "Authentication is done on the server, authorization in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why check ownership when a user edits a post by id?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "Ids are kept secret, so the check is only needed for logging purposes",
      "The database does not allow any edit to run without an ownership check",
      "The check is slow, so it is needed only while developing the feature",
      "Otherwise anyone could change the posts of others by sending another id"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a page redirect an unauthenticated visitor to sign in?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "Hide the content with CSS until the visitor logs in",
      "Check the session in the server component and call redirect",
      "Show an alert in the browser and keep the page open",
      "Ask the visitor for the password in the url"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why not rely on a client component check alone to protect data?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "Client components cannot read the session at all",
      "The client code can be changed or bypassed by the user",
      "Client checks are slower than server checks in every case",
      "Browsers block data requests from unauthenticated users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the safest place to enforce access to a route handler?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "In a global variable that is read by every one of the handlers",
      "In the page that links to the handler from the user interface",
      "In the browser, before the request is sent to the server",
      "Inside the handler itself, before it reads or writes any data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a 401 response mean for an API route?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "The caller is not authenticated",
      "The caller is not allowed to use that resource",
      "The resource was moved to a new path",
      "The server had an internal error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a 403 response mean for an API route?",
    "topic": "Protecting server actions and routes",
    "choices": [
      "The caller has not signed in yet and must identify themselves first",
      "The route does not exist on the server that received the request",
      "The caller is known but is not allowed to do this",
      "The body of the request is invalid and could not be parsed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you read the current session in a server component?",
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
    "choices": [
      "Session objects cannot be serialised by React",
      "Client components refuse to accept objects as props",
      "It may include more data than the client needs to see",
      "It makes the page load without any caching"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you sign a user out?",
    "topic": "Reading the session on the server",
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
    "topic": "Reading the session on the server",
    "choices": [
      "Stops all pages of the section from rendering for visitors who are signed out",
      "Redirects only the layout itself and leaves the pages below it open",
      "Sends the visitor back to the page that they came from before",
      "Checks the session one time and then caches the result for every user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does middleware in Next.js do?",
    "topic": "Middleware-based protection",
    "choices": [
      "Runs after the page has been rendered, so that it can modify the HTML",
      "Runs inside the browser of the visitor on every click that is made",
      "Runs one time at build time and then stops for the rest of the life",
      "Runs code before a request is completed, for example to redirect"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where does the middleware file live?",
    "topic": "Middleware-based protection",
    "choices": [
      "In the app folder, as a layout file with a special reserved name",
      "At the project root, or in src, as middleware.ts (named proxy in the newest versions)",
      "In the public folder, next to the static files that the site serves",
      "In the api folder, as a route handler that answers every path"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the matcher config of middleware control?",
    "topic": "Middleware-based protection",
    "choices": [
      "Which methods the middleware may use",
      "Which paths the middleware runs for",
      "Which users the middleware applies to",
      "Which database the middleware reads from"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is middleware a convenient place for broad route protection?",
    "topic": "Middleware-based protection",
    "choices": [
      "It can read from the database more easily than any page can do",
      "It runs for every request, including images, fonts and static files",
      "It gives each user a separate copy of the page that they request",
      "It can redirect unauthenticated users before any page code runs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should middleware not be your only protection?",
    "topic": "Middleware-based protection",
    "choices": [
      "Checks close to the data are still needed for actions and handlers",
      "Middleware cannot read the cookies that come with a request to the server",
      "Middleware runs only in development mode and is skipped in production",
      "Middleware cannot redirect the request to another path of the application"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which runtime has middleware traditionally run on?",
    "topic": "Middleware-based protection",
    "choices": [
      "The full Node.js runtime with every module available",
      "The browser, next to the code of the page that is shown",
      "The edge runtime, with a limited set of APIs",
      "A separate worker that has no network access at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why can you not always use Prisma directly inside middleware on the edge?",
    "topic": "Middleware-based protection",
    "choices": [
      "Prisma refuses to run in any kind of server environment at all",
      "Middleware is not able to return a response to the browser",
      "The edge runtime lacks some Node features that database drivers need",
      "Middleware runs before the database of the application is created"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a JWT session help with in middleware?",
    "topic": "Middleware-based protection",
    "choices": [
      "The token can be verified without a database call",
      "The session is read from a server file of the app",
      "The token stores the password for a quick check",
      "Middleware needs no cookie when the token exists"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does NextResponse.redirect do in middleware?",
    "topic": "Middleware-based protection",
    "choices": [
      "Reloads the current page with the same url",
      "Rewrites the url shown in the browser without a request",
      "Blocks the visitor with a 500 error",
      "Sends the visitor to a different url before the page renders"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between redirect and rewrite in middleware?",
    "topic": "Middleware-based protection",
    "choices": [
      "A redirect keeps the url the same and a rewrite changes it",
      "A rewrite serves another path while the browser url stays the same",
      "They do the same thing for all of the requests",
      "A rewrite is only for api routes and a redirect for pages"
    ],
    "answerIdx": 1
  }
]
```

LAYER: next-fullstack-7

```json
[
  {
    "stem": "What is the idea behind utility first CSS as used by Tailwind?",
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Tailwind utility styling",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
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
    "topic": "Responsive and dark mode",
    "choices": [
      "Open the page on one single phone and assume that it works on all of the others",
      "Resize the browser window or use the device toolbar of the developer tools",
      "Compare the size of the CSS file that is built for each of the screen sizes",
      "Check the layout in the build output without ever opening the page in a browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use accessible component primitives such as Radix UI or React Aria?",
    "topic": "Accessible component primitives",
    "choices": [
      "They provide a ready made visual design that cannot be changed by the team",
      "They provide keyboard support and ARIA behaviour that is hard to build correctly",
      "They make the components render faster than plain HTML elements would",
      "They remove the need to test the interface with real users of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does it mean that a primitive is unstyled?",
    "topic": "Accessible component primitives",
    "choices": [
      "It has no behaviour and only holds the colours and spacing",
      "It cannot be given class names or style attributes",
      "It can be used only inside a server component",
      "It handles behaviour and accessibility while you provide the look"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which keyboard behaviour should a modal dialog provide?",
    "topic": "Accessible component primitives",
    "choices": [
      "Move focus into the dialog, keep it inside, and return it when closed",
      "Let focus move to elements behind the dialog while it is open",
      "Close the dialog whenever the user presses any key",
      "Skip the dialog when the user navigates with the keyboard"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of an aria-label on an icon only button?",
    "topic": "Accessible component primitives",
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
    "topic": "Accessible component primitives",
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
    "topic": "Accessible component primitives",
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
    "topic": "Accessible component primitives",
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
    "topic": "Accessible component primitives",
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
    "topic": "Accessible component primitives",
    "choices": [
      "Sets the tooltip that appears when the user hovers over the image",
      "Describes the image for screen readers and when the image fails to load",
      "Chooses the file that is downloaded on slow connections",
      "Lists keywords that help search engines rank the image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which tool can check a page for common accessibility problems?",
    "topic": "Accessible component primitives",
    "choices": [
      "A CSS linter that checks the order of the properties",
      "A bundle analyser that shows the size of every package",
      "The compiler, which stops the build on any accessibility problem",
      "An automated checker such as axe or Lighthouse, followed by manual testing"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a design system in code?",
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
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
    "topic": "Reusable design system parts",
    "choices": [
      "The browser needs the documentation in order to render the component at all",
      "The documentation is required before the package can be published to npm",
      "Others can see the variants and states and use them correctly",
      "It makes the components load faster for the visitors in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a loading skeleton?",
    "topic": "Loading skeletons",
    "choices": [
      "A spinner that covers the whole page until all of the data has arrived",
      "An error page that is shown when the data fails to load from the server",
      "A placeholder that mimics the layout of content while it loads",
      "A blank screen that is shown for a moment before the first render happens"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why are skeletons often better than a single spinner?",
    "topic": "Loading skeletons",
    "choices": [
      "They reduce layout shift and show the user what is coming",
      "They load the data faster than a spinner does",
      "They work without any CSS or JavaScript code",
      "They are required by the App Router for every page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Next.js file gives a route an instant loading state?",
    "topic": "Loading skeletons",
    "choices": [
      "skeleton.tsx",
      "pending.tsx",
      "fallback.tsx",
      "loading.tsx"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Tailwind provide that helps to build a pulsing skeleton?",
    "topic": "Loading skeletons",
    "choices": [
      "A skeleton component in the core package",
      "The animate-pulse utility class",
      "A loading attribute for every HTML element",
      "A hook that returns the loading state"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a skeleton match as closely as possible?",
    "topic": "Loading skeletons",
    "choices": [
      "The colour scheme of the error page",
      "The size and layout of the real content",
      "The length of the loading time for the request",
      "The order of the files in the route folder"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is layout shift?",
    "topic": "Loading skeletons",
    "choices": [
      "The layout file being replaced when the route changes",
      "The order of the layouts changing in the route tree",
      "The browser changing the layout engine during navigation",
      "Content moving on the page as elements load after the first paint"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can you avoid layout shift for images?",
    "topic": "Loading skeletons",
    "choices": [
      "Set width and height, or use the Next.js Image component",
      "Remove the images until the page has fully loaded",
      "Load every image as a background in the stylesheet",
      "Set the images to a random size and let them adjust"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do Suspense boundaries help with skeletons?",
    "topic": "Loading skeletons",
    "choices": [
      "Around the whole app, so that the entire page loads all at once",
      "Around the layout, so that the layout is hidden while the content loads",
      "Around parts of a page so each part shows its own skeleton",
      "Around the CSS files, so that the styles are loaded in a fixed order"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should a skeleton be marked for assistive technology, for example with aria-busy?",
    "topic": "Loading skeletons",
    "choices": [
      "Browsers do not render elements that lack the attribute",
      "The attribute makes the animation run faster",
      "Screen reader users should know that content is still loading",
      "Search engines read the attribute to rank the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a skeleton a poor choice?",
    "topic": "Loading skeletons",
    "choices": [
      "For very fast loads, where it would only flash for a moment",
      "For data that takes a few seconds to arrive from a slower service",
      "For lists whose layout is already known in advance by the developer",
      "For content that sits far below the fold of the page on a phone"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a toast?",
    "topic": "Toasts and dialogs",
    "choices": [
      "A permanent banner that stays on the page until the user closes it",
      "A full screen page that blocks the whole interface while an action runs",
      "A tooltip that shows some extra help text for a field of a form",
      "A short message that appears briefly to confirm an action or show an error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is a toast a good choice?",
    "topic": "Toasts and dialogs",
    "choices": [
      "For critical errors that the user must read and acknowledge",
      "For feedback about an action that does not need the focus of the user",
      "For long instructions that explain how to use a feature",
      "For the main content of the page that all visitors see"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should toasts be announced to screen readers?",
    "topic": "Toasts and dialogs",
    "choices": [
      "Browsers remove every toast that has not been announced to assistive tools",
      "Users who cannot see the screen would otherwise miss the message",
      "Toasts load faster on the page when they use live regions inside",
      "Screen readers only read the content that is shown inside toasts"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a confirmation dialog protect against?",
    "topic": "Toasts and dialogs",
    "choices": [
      "Slow network requests that take too long to answer",
      "Invalid input in a form before it is submitted",
      "Duplicate sign ins from different browsers",
      "Accidental destructive actions, such as deleting data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes a dialog modal?",
    "topic": "Toasts and dialogs",
    "choices": [
      "It blocks interaction with the rest of the page until it is closed",
      "It appears in the middle of the page and casts a shadow around itself",
      "It is rendered by the server before the rest of the page is loaded",
      "It can be moved around the screen by the user with the pointer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should focus behave when a dialog closes?",
    "topic": "Toasts and dialogs",
    "choices": [
      "Move to the top of the page every time",
      "Stay on the closed dialog until the user clicks",
      "Return to the element that opened the dialog",
      "Move to the first link of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which key should close a dialog by convention?",
    "topic": "Toasts and dialogs",
    "choices": [
      "Enter",
      "Tab",
      "Escape",
      "Backspace"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a server action trigger a toast on the client?",
    "topic": "Toasts and dialogs",
    "choices": [
      "Return a result and show the toast on the client based on that result",
      "Call the toast function from the server code directly, as in a browser",
      "Write the message to the console of the browser from the server",
      "Redirect to a separate page whose only job is to render the message"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid stacking many toasts at once?",
    "topic": "Toasts and dialogs",
    "choices": [
      "Browsers limit the number of elements on a page",
      "Toasts slow down the server when they overlap",
      "Each toast must be unique for assistive technologies",
      "They can cover the interface and be hard to read or dismiss"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should an error toast include?",
    "topic": "Toasts and dialogs",
    "choices": [
      "The stack trace and the url of the failing request",
      "What failed and, where possible, what the user can do next",
      "Only an icon, so the message works in every language",
      "The name of the developer who wrote the code"
    ],
    "answerIdx": 1
  }
]
```

LAYER: next-fullstack-8

```json
[
  {
    "stem": "What is the purpose of the data cache in Next.js?",
    "topic": "Request and data cache",
    "choices": [
      "Stores the HTML of the page in the browser of the visitor for the next visit",
      "Saves the state of client components between two navigations of the visitor",
      "Keeps fetch results on the server across requests so they are not repeated",
      "Holds the cookies of every user of the site together in one shared store"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does request memoization do within a single render?",
    "topic": "Request and data cache",
    "choices": [
      "Dedupes identical fetch calls so that only one network request is made",
      "Remembers the response for a week and reuses it for every visitor",
      "Stores every request of a user in the browser history",
      "Merges calls to different urls into a single combined request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How long does request memoization last?",
    "topic": "Request and data cache",
    "choices": [
      "For as long as the server process stays running",
      "Until the next deployment of the application",
      "For one day, unless it is cleared by hand",
      "For the duration of a single server request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How is the data cache different from request memoization?",
    "topic": "Request and data cache",
    "choices": [
      "The data cache lives in the browser, while memoization lives on the server",
      "The data cache persists across requests, while memoization lasts for one render",
      "The data cache covers only images, while memoization covers fetches",
      "They are two names for the same cache in different versions"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which fetch option opts a request out of the data cache?",
    "topic": "Request and data cache",
    "choices": [
      "mode: \"no-cors\"",
      "cache: \"no-store\"",
      "credentials: \"omit\"",
      "redirect: \"manual\""
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the React cache function let you do for non fetch work?",
    "topic": "Request and data cache",
    "choices": [
      "Cache the function result in a file that is shared between servers",
      "Cache the result of the function in localStorage",
      "Make the function run in the browser instead of the server",
      "Memoize a function, such as a database query, during one render pass"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can the same fetch in two server components cost only one request?",
    "topic": "Request and data cache",
    "choices": [
      "Identical GET requests in one render are deduplicated",
      "Next.js merges all fetches into a single request at build time",
      "The browser caches the first request and reuses it",
      "Server components share the state of one global object"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the full route cache?",
    "topic": "Request and data cache",
    "choices": [
      "The list of all of the routes that are registered in the project at build",
      "The cache that the browser keeps for every route a visitor has opened",
      "The cached HTML and payload of statically rendered routes on the server",
      "The cache that stores the sessions of all of the signed in users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is it important to know which cache layer returns old data?",
    "topic": "Request and data cache",
    "choices": [
      "All layers are cleared by a single refresh of the page",
      "Old data is always caused by the browser and never by the server",
      "Each layer is cleared in a different way, so the fix depends on the layer",
      "Only the data cache can ever return old data to users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to caches when you deploy a new version?",
    "topic": "Request and data cache",
    "choices": [
      "Caches such as the full route cache are cleared, while some data cache entries may persist",
      "Every cache is kept as it was, so the new version loads as fast as the old",
      "Only the caches in the browsers of the visitors are cleared by the host",
      "The caches are copied into a backup folder on the server and then left alone"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you revalidate a fetch every 60 seconds?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "Call setTimeout with 60000 inside the component",
      "Set a header with 60 on the page response",
      "Restart the server every minute with a script",
      "Pass next: { revalidate: 60 } in the fetch options"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to a request that arrives after the revalidate time has passed?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "The request waits until the new data has been fetched",
      "The stale data is served and a refresh is triggered in the background",
      "The request fails with an error until the cache is cleared",
      "The request returns an empty result for the first visitor"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is another name for this stale while revalidate behaviour on pages?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "Server side hydration of the markup",
      "Incremental static regeneration",
      "Progressive hydration of client components",
      "Edge side caching for static assets"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you tag a fetch so it can be invalidated later?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "Name the file that holds the fetch after the tag",
      "Add a data attribute with the tag to the element",
      "Write the tag in the url of the request as a hash",
      "Add next: { tags: [\"posts\"] } to the options"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which function invalidates all fetches with a given tag?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "revalidateTag(\"posts\")",
      "clearCache(\"posts\")",
      "refreshTag(\"posts\")",
      "invalidate(\"posts\")"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is tag based revalidation better than time based revalidation?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "When data changes at random moments that nobody can predict",
      "When data must be fresh for every single request",
      "When you know exactly when data changes, such as after a mutation",
      "When data never changes after the first request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does revalidatePath(\"/blog\") invalidate?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "Only the layout file that wraps the blog pages",
      "The cookies that were set while the blog was rendered",
      "The cached data and output for the /blog route",
      "The source file of the blog page in the build folder"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a risk of a very long revalidate time?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "Visitors may see old content for a long time after it changed",
      "The server runs out of memory because of the long timer",
      "The page cannot be generated again after a restart",
      "Search engines remove the page from their results"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a risk of a very short revalidate time?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "Pages become static and can no longer be changed after they are built",
      "Browsers refuse to cache any page that is revalidated this often by a server",
      "The build fails because the value is below the minimum that Next.js allows",
      "More work for the server and the data source, with less caching benefit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a webhook from a CMS update a statically generated page?",
    "topic": "Time and tag-based revalidation",
    "choices": [
      "Edit the generated HTML file on the server by hand",
      "Call a route handler that runs revalidatePath or revalidateTag",
      "Restart the whole application after each CMS change",
      "Ask visitors to refresh the page until it updates"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is an optimistic update?",
    "topic": "Optimistic updates",
    "choices": [
      "Waiting for the server to answer before the interface shows any change at all",
      "Showing the expected result at once and confirming it when the server answers",
      "Updating the database first, before the interface has been changed in any way",
      "Retrying a request that failed until it finally succeeds on a later attempt"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which React hook supports optimistic updates with actions?",
    "topic": "Optimistic updates",
    "choices": [
      "useDeferredValue",
      "useSyncExternalStore",
      "useImperativeHandle",
      "useOptimistic"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should happen when an optimistic update fails on the server?",
    "topic": "Optimistic updates",
    "choices": [
      "The interface rolls back and the user is told what went wrong",
      "The interface keeps the wrong value without any message",
      "The page reloads and the user loses everything they typed",
      "The request is repeated forever in the background"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use optimistic updates for actions such as likes?",
    "topic": "Optimistic updates",
    "choices": [
      "The server can skip validation when the interface updates first",
      "The data is saved twice, which makes it safer",
      "The interface feels instant even when the network is slow",
      "The request is sent after the user has left the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the source of truth after an optimistic update?",
    "topic": "Optimistic updates",
    "choices": [
      "The temporary value in the browser, which the server must accept",
      "The cache, which is never replaced by newer data",
      "The server data, which replaces the temporary value when it arrives",
      "The url of the page, which keeps the final value"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When are optimistic updates a poor fit?",
    "topic": "Optimistic updates",
    "choices": [
      "When failure is common or the result is unpredictable, such as payments",
      "When the action is a simple toggle that only rarely fails on the server",
      "When the user expects to see an immediate response on the screen",
      "When the data can be rolled back without any side effects at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do you still revalidate after an optimistic mutation?",
    "topic": "Optimistic updates",
    "choices": [
      "To delete the optimistic value from the browser history",
      "To show a loading spinner for a little longer",
      "To cancel the request in case it is still running",
      "To make sure the cached pages end up with the real server data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you give an optimistic item a temporary key in a list?",
    "topic": "Optimistic updates",
    "choices": [
      "Leave the key empty until the server has returned the real id of the item",
      "Use a temporary id, such as a generated one, until the real id exists",
      "Use the index of the item in the list, since an index never changes",
      "Use the text of the item as its key, since the text is always unique"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useOptimistic return?",
    "topic": "Optimistic updates",
    "choices": [
      "The result of the server action and an error object that describes failures",
      "The optimistic state and a function that applies an optimistic change",
      "A promise that resolves at the moment the server has finished answering",
      "A list that holds every one of the changes that were made so far"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to optimistic state when the action finishes?",
    "topic": "Optimistic updates",
    "choices": [
      "It stays the same and ignores the server result",
      "It is saved to localStorage as a permanent copy",
      "It is sent to the server again to double check it",
      "It falls back to the real state that comes from the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a request waterfall?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Requests that wait for each other although they could run at the same time",
      "Requests that are split between several different servers at the same time",
      "Requests that are answered from a cache one after the other in order",
      "Requests that stream their responses to the browser in several separate parts"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you start two independent fetches in parallel?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Await the first fetch and then start the second one",
      "Place each fetch in its own route group",
      "Start both promises and await them with Promise.all",
      "Run each fetch in a separate useEffect"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When must fetches run sequentially?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "When both requests go to the same server",
      "When both requests return a large amount of data",
      "When the second request needs data from the first response",
      "When the page is rendered statically at build time"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can Suspense help with slow data on a page?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Each part can stream in when its own data is ready",
      "All parts wait until the slowest request has finished",
      "It cancels the slow requests after a few seconds",
      "It caches the slow requests for later visits"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the preload pattern?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Load all images of the page before rendering any text",
      "Download the JavaScript of all routes when the app starts",
      "Fetch data on the client before the server answers",
      "Start a fetch early so the data is ready when a component needs it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What causes a waterfall in nested server components?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Server components are always rendered one at a time and never in parallel",
      "A child component starts its fetch only after its parent has finished",
      "Client components block the fetches that are made by server components",
      "The cache forces all of the requests into one fixed order of calls"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you find a waterfall in practice?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Count how many components are written in the file of the page",
      "Look at the timing of requests in the network panel or in the server logs",
      "Check the size of the bundle in the output of the production build",
      "Read the cache headers that the server sets on the static files"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Promise.allSettled give that Promise.all does not?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "A faster result than Promise.all in every case",
      "Automatic retries for the promises that failed",
      "A single error object that combines all of the failures",
      "Results for every promise, even when some of them fail"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why not always run everything in parallel?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Dependent requests need earlier results, and too many requests can overload a service",
      "Parallel requests are not supported by server components in the App Router",
      "Parallel requests are always slower than the same requests run in sequence",
      "Browsers allow only one single request at a time to be made from a page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which approach is usually best for independent data on one page?",
    "topic": "Parallel and sequential fetching",
    "choices": [
      "Fetch everything one after another in the layout",
      "Fetch everything in a client effect after the page loads",
      "Fetch in parallel and stream parts of the page behind Suspense",
      "Fetch everything at build time and never refresh it"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the main constraint of the edge runtime?",
    "topic": "Edge versus node runtime",
    "choices": [
      "It cannot make any network requests to other servers",
      "It can run only static pages and not any server code",
      "It supports only a subset of Node.js APIs and has small limits",
      "It needs a database that runs on the same machine"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of running code at the edge?",
    "topic": "Edge versus node runtime",
    "choices": [
      "Low latency, since the code runs close to the visitor",
      "Unlimited memory for heavy calculations on large files",
      "Direct access to the file system of the server",
      "A guaranteed single global database connection"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which runtime should you use for code that needs many Node.js modules?",
    "topic": "Edge versus node runtime",
    "choices": [
      "The edge runtime",
      "The browser runtime",
      "The WebAssembly runtime only",
      "The Node.js runtime"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you choose the runtime for a route?",
    "topic": "Edge versus node runtime",
    "choices": [
      "Set the runtime in the name of the folder that holds the route",
      "Export a runtime constant, such as export const runtime = \"edge\"",
      "Add the runtime to the url of every request that reaches the route",
      "Choose the runtime in the developer tools of the browser for each page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can database access be tricky at the edge?",
    "topic": "Edge versus node runtime",
    "choices": [
      "Databases refuse every connection that comes from an edge server",
      "Classic drivers need Node features and many connections to a far away database",
      "The edge runtime does not support any form of authentication",
      "Edge code cannot read environment variables"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What kind of work fits the edge well?",
    "topic": "Edge versus node runtime",
    "choices": [
      "Image processing of large files that needs native libraries to run",
      "Long running jobs that take several minutes to finish their work",
      "Tasks that read and write big files on the disk of the server",
      "Light tasks such as redirects, headers and simple personalisation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can reduce the distance between the edge and the data?",
    "topic": "Edge versus node runtime",
    "choices": [
      "Place the data close to the code, or use a data service built for the edge",
      "Move the edge code so that it runs only inside the browser of the visitor",
      "Increase the revalidate time of every request that the route makes",
      "Run the database inside the middleware file of the application itself"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a cold start?",
    "topic": "Edge versus node runtime",
    "choices": [
      "The time that it takes for a browser to open a new tab on a page",
      "The delay of the first byte when the response comes from a cache",
      "The delay when a new instance of a function starts to handle a request",
      "The time that a database needs to build the index of a large table"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is the Node.js runtime the safer default for most routes?",
    "topic": "Edge versus node runtime",
    "choices": [
      "It always runs closer to the visitor than the edge",
      "It has no limits on the length of a request",
      "It supports the full set of libraries, drivers and APIs",
      "It is the only runtime that can use environment variables"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a trade off when you move a route to the edge?",
    "topic": "Edge versus node runtime",
    "choices": [
      "Lower latency, but fewer APIs and limits on size and execution time",
      "Higher latency, but access to more APIs of the system",
      "No difference, since both runtimes behave exactly alike",
      "Lower cost, but no support for any kind of caching"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a common cause of stale data after a mutation?",
    "topic": "Avoiding stale data",
    "choices": [
      "The database stored the new value in the wrong table",
      "The browser deleted the new value from its memory",
      "The server refused to write to the database",
      "The related cached data or path was not revalidated"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a mutation do after writing to the database?",
    "topic": "Avoiding stale data",
    "choices": [
      "Restart the server so that all caches are cleared",
      "Revalidate the affected paths or tags",
      "Wait for the next scheduled build to refresh the data",
      "Ask the user to reload the page manually"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why can client side navigation show old data?",
    "topic": "Avoiding stale data",
    "choices": [
      "The browser disables all server requests while the user is navigating",
      "The client keeps a router cache of the pages it visited or prefetched",
      "The server sends the previous page again by mistake after each click",
      "Links always load their pages from the CDN and never from the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can router.refresh help?",
    "topic": "Avoiding stale data",
    "choices": [
      "It reloads the whole browser page and clears all of the client state",
      "It clears the cache of the CDN that sits in front of the whole site",
      "It restarts the tree of server components on the server of the host",
      "It refetches the server components of the current route and keeps client state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does dynamic rendering do for data freshness?",
    "topic": "Avoiding stale data",
    "choices": [
      "Data is fetched for every request, so it is as fresh as the source",
      "Data is fetched once and shared by every visitor for a year",
      "Data is fetched in the browser and never on the server",
      "Data is fetched only at build time and never refreshed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you check whether data comes from the cache?",
    "topic": "Avoiding stale data",
    "choices": [
      "Count the number of components that are present in the tree of the page",
      "Look at the size of the JavaScript bundle that the build has produced",
      "Log inside the data function, check the headers, and compare with the source",
      "Check the names of the files that appear in the output of the build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a long cache time risky for personalised data?",
    "topic": "Avoiding stale data",
    "choices": [
      "Personal data cannot be stored in any cache at all",
      "Personalised pages are always rebuilt by the browser",
      "One user could be shown data that belongs to another user",
      "Caching removes the cookies from the request"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good rule for data that must always be fresh, such as a balance?",
    "topic": "Avoiding stale data",
    "choices": [
      "Do not cache it, and render it dynamically",
      "Cache it for a day and revalidate it in the night",
      "Cache it in localStorage in the browser",
      "Fetch it once at build time and reuse it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a way to see stale data problems early?",
    "topic": "Avoiding stale data",
    "choices": [
      "Test only the first load of a page while the app runs in development mode",
      "Test only with the cache of the browser turned off in the settings",
      "Test only by reading the code of the components without running the app",
      "Test after mutations in a production build, not only in development"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a sensible default when you are unsure about caching a piece of data?",
    "topic": "Avoiding stale data",
    "choices": [
      "Cache everything for as long as possible from the start",
      "Start with no caching and add it where it is measured to help",
      "Cache only the data that comes from your database",
      "Copy the data into the code of the component"
    ],
    "answerIdx": 1
  }
]
```

LAYER: next-fullstack-9

```json
[
  {
    "stem": "How do you design a REST route for a collection of orders?",
    "topic": "Route handlers and REST",
    "choices": [
      "A single POST on /api/doEverything with an action field in the body",
      "GET on /api/getOrders and GET on /api/deleteOrder with a query string",
      "GET and POST on /api/orders, and GET, PATCH and DELETE on /api/orders/[id]",
      "POST on /api/orders for every operation, with the verb in the headers"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which status code fits a successful creation of a resource?",
    "topic": "Route handlers and REST",
    "choices": [
      "201",
      "200",
      "204",
      "301"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status code fits a request that was valid but found no resource?",
    "topic": "Route handlers and REST",
    "choices": [
      "400",
      "500",
      "403",
      "404"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a route handler return for invalid input?",
    "topic": "Route handlers and REST",
    "choices": [
      "A 200 response with an empty body so that clients retry",
      "A 400 response with a message that says what is wrong",
      "A 500 response, since the server failed to read the data",
      "A redirect to the home page of the application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should a handler return JSON errors in a consistent shape?",
    "topic": "Route handlers and REST",
    "choices": [
      "Browsers refuse to read errors that are written as text",
      "Clients can handle every failure in the same way",
      "Next.js rejects handlers that return more than one shape",
      "The compiler checks the shape of every error at build time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is idempotency for HTTP methods such as PUT and DELETE?",
    "topic": "Route handlers and REST",
    "choices": [
      "The method always returns exactly the same response body each time",
      "The method can be called only one time for each user of the API",
      "The method never changes any of the data that is stored on the server",
      "Repeating the same request leaves the server in the same state"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which method should a handler use to change only some fields of a resource?",
    "topic": "Route handlers and REST",
    "choices": [
      "PATCH",
      "PUT",
      "POST",
      "HEAD"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a route handler support pagination?",
    "topic": "Route handlers and REST",
    "choices": [
      "Return all rows and let the browser pick the ones to show",
      "Use a separate route for each page of the data",
      "Read page and limit query parameters and return a slice with the total",
      "Send the page number in the response headers only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why validate request bodies in a route handler?",
    "topic": "Route handlers and REST",
    "choices": [
      "The compiler rejects every handler that reads a body without validating it first",
      "Route handlers cannot parse a body that has extra fields in it at all",
      "The body comes from outside, so its shape and types cannot be trusted",
      "Validation makes the response smaller before it is sent back to the client"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does an OPTIONS handler usually answer?",
    "topic": "Route handlers and REST",
    "choices": [
      "The allowed methods and headers for a CORS preflight request",
      "The list of routes that exist in the application",
      "The version of the framework that is running",
      "The body of the last request that was made to the route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why call a third party API from the server and not from the browser?",
    "topic": "Calling external APIs securely",
    "choices": [
      "The server is always faster than the browser for requests",
      "Browsers cannot send requests to other domains in any case",
      "Third party APIs refuse requests that come from browsers",
      "The secret key stays on the server and out of the browser"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a server do with a secret key when it calls an external API?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Hard code it in the source so that it is easy to find",
      "Read it from an environment variable and send it in a header",
      "Pass it to the browser so that the client can reuse it",
      "Put it in the url as a query parameter for each request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why set a timeout when calling an external API?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Timeouts make the external service respond faster",
      "A slow service should not hang your route for an unlimited time",
      "Next.js requires a timeout on every outgoing request",
      "The timeout encrypts the connection to the service"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can you protect your route from abuse when it calls a paid API?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Allow all callers and hide the url of the route",
      "Cache the secret key in the browser of each visitor",
      "Return the paid response without checking the request",
      "Authenticate the caller and apply rate limits"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do when an external API returns an error?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Handle it, and return a clear error without leaking details",
      "Pass the raw error with the secret key to the browser",
      "Retry the request without limit until it succeeds",
      "Ignore the error and return a success status"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why not forward the raw response of an external API to the client?",
    "topic": "Calling external APIs securely",
    "choices": [
      "The client cannot read responses from other services",
      "The response is always too large for a browser to parse",
      "It may include fields you did not intend to expose",
      "Next.js blocks any response that comes from another origin"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a reasonable way to deal with a rate limited external API?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Send every request twice in a row to be sure that a result comes back",
      "Remove the limit by using several different secret keys at the same time",
      "Cache results where possible and back off before retrying",
      "Stop calling the service for the rest of the day once the limit is hit"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should the types of an external response be validated?",
    "topic": "Calling external APIs securely",
    "choices": [
      "The data comes from outside and may differ from the documentation",
      "Types are removed at runtime so validation is not possible",
      "The compiler checks the response types at build time",
      "The response is always correct if the status is 200"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which header usually carries a bearer token to an API?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Content-Type",
      "Accept",
      "Cache-Control",
      "Authorization"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does it mean to proxy an external API through your own route?",
    "topic": "Calling external APIs securely",
    "choices": [
      "Your client calls the service directly and uses a key that it shares",
      "Your server calls the service and returns a controlled result to your client",
      "Your server redirects the browser to the url of the external service",
      "Your route copies the documentation of the service into its own code"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is Stripe Checkout?",
    "topic": "Stripe payments",
    "choices": [
      "A library that stores the card numbers of customers in your own database",
      "A hosted payment page that Stripe provides for taking payments",
      "A tool that converts the payments you receive into invoices for accountants",
      "A plugin that builds a shopping cart inside of your own application"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should card details never touch your own server in a simple setup?",
    "topic": "Stripe payments",
    "choices": [
      "Servers cannot read card numbers because of their format",
      "Cards are encrypted by the browser before they are typed",
      "Stripe refuses payments from servers that store cards",
      "It keeps you out of heavy card data compliance rules"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which key can be exposed in the browser when using Stripe?",
    "topic": "Stripe payments",
    "choices": [
      "The publishable key",
      "The secret key",
      "The webhook signing secret",
      "The restricted API key"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should the Stripe secret key be used?",
    "topic": "Stripe payments",
    "choices": [
      "In the browser, together with the publishable key",
      "In the url of the checkout page for the customer",
      "Only on the server, from an environment variable",
      "In a public file of the repository for the team"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you start a Stripe Checkout session?",
    "topic": "Stripe payments",
    "choices": [
      "Send the card number from the browser to one of your own routes",
      "Open a popup window that is created by your secret key on the page",
      "Create a session on the server, then redirect the customer to its url",
      "Add a script to the page that charges the card on every page load"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do you not trust the success page redirect as proof of payment?",
    "topic": "Stripe payments",
    "choices": [
      "The user can open that url without paying, so confirm with a webhook",
      "Stripe does not redirect customers after a payment",
      "The success page is always shown before the payment finishes",
      "Redirects are removed from the url by the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of metadata on a Checkout session?",
    "topic": "Stripe payments",
    "choices": [
      "Add an image and a description to the payment page that the customer sees",
      "Store the card details of the customer so that they can be used next time",
      "Set the currency and the language of the page that the customer sees",
      "Attach your own ids, such as a user or order, to the payment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an idempotency key help with when creating payments?",
    "topic": "Stripe payments",
    "choices": [
      "It encrypts the amount of the payment inside the request that is sent",
      "It prevents a retry of the same request from creating two charges",
      "It makes the payment faster by skipping the fraud check on the card",
      "It stores the card of the customer so that it can be charged later"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which amount unit does Stripe use for prices?",
    "topic": "Stripe payments",
    "choices": [
      "Whole units, such as dollars and euros",
      "The smallest currency unit, such as cents",
      "Tenths of the currency unit",
      "Strings that include the currency symbol"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use test mode keys during development?",
    "topic": "Stripe payments",
    "choices": [
      "Test keys are faster than the live keys when a payment is processed",
      "Test mode removes the need for webhooks in the rest of the application",
      "Test keys are required by the Next.js build step before it can finish",
      "You can try payments without moving real money"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a webhook?",
    "topic": "Webhooks and verification",
    "choices": [
      "An HTTP request that a service sends to your app when an event happens",
      "A function that your app calls to read data from a service",
      "A cron job that runs on your server at fixed times",
      "A websocket that your app keeps open for live updates"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why verify the signature of a webhook?",
    "topic": "Webhooks and verification",
    "choices": [
      "To make the request smaller before it is processed by the handler",
      "To reduce the load that the provider has on its own servers",
      "To be sure the request really came from the provider and was not altered",
      "To decide in which order the events will be processed by the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must the raw request body be used to verify a Stripe signature?",
    "topic": "Webhooks and verification",
    "choices": [
      "Parsed JSON is always larger than the raw body",
      "The raw body is encrypted and needs the secret to read",
      "The signature is computed over the exact bytes that Stripe sent",
      "Stripe signs only the headers and not the body"
    ],
    "answerIdx": 2
  },
  {
    "stem": "In a route handler, how do you read the raw body?",
    "topic": "Webhooks and verification",
    "choices": [
      "await request.text()",
      "await request.json()",
      "request.body.toString",
      "request.raw"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should a webhook handler return a 2xx status quickly?",
    "topic": "Webhooks and verification",
    "choices": [
      "Slow responses are billed by the provider as extra requests on your account",
      "The browser of the customer waits for the response of the handler",
      "The status code selects which of the next events is sent to the app",
      "The provider retries events that do not get a success response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why must a webhook handler be idempotent?",
    "topic": "Webhooks and verification",
    "choices": [
      "Events are always sent in the wrong order",
      "The same event can be delivered more than once",
      "The handler is called by the browser twice",
      "The provider sends one event for each user action only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do with the event id of a webhook?",
    "topic": "Webhooks and verification",
    "choices": [
      "Send it to the browser so that it can be displayed to the customer",
      "Store it, so a repeated event is recognised and not processed twice",
      "Use it as the password for the account of the customer who paid",
      "Ignore it, since it carries no useful information for the handler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which event tells you that a Checkout payment completed?",
    "topic": "Webhooks and verification",
    "choices": [
      "customer.created",
      "invoice.deleted",
      "charge.refund.updated",
      "checkout.session.completed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is the webhook the source of truth for fulfilling an order?",
    "topic": "Webhooks and verification",
    "choices": [
      "It is sent by the provider and does not depend on the browser of the customer",
      "It is faster than any other signal that tells you about the payment",
      "It runs inside the page of the customer right after the payment",
      "It is the only kind of event that is able to contain the amount"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you test webhooks locally?",
    "topic": "Webhooks and verification",
    "choices": [
      "Deploy every single change to production before you test it at all",
      "Call the handler from the browser with data that you have made up",
      "Forward events from the provider to localhost with a tool such as the Stripe CLI",
      "Disable the signature verification in the development environment for testing"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why validate the type and size of an uploaded file?",
    "topic": "File uploads",
    "choices": [
      "The browser rejects every file that has not been validated by the server",
      "The file system refuses to store files that are above a few kilobytes",
      "Users can upload anything, including very large or unexpected files",
      "Validation makes the upload start sooner on slow connections for users"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a route handler read an uploaded file?",
    "topic": "File uploads",
    "choices": [
      "From request.formData(), where the file is a File object",
      "From request.json(), where the file is a string of bytes",
      "From the url of the request, which holds the file name",
      "From the headers of the request, one byte at a time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why avoid saving uploads to the local disk of a serverless function?",
    "topic": "File uploads",
    "choices": [
      "The disk is encrypted, so the file cannot be read again by a later request",
      "Serverless functions have no way of reading a file that they have written",
      "Uploads are blocked by the host of the app for reasons of security",
      "The disk is temporary and not shared between instances"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where do production apps usually store uploaded files?",
    "topic": "File uploads",
    "choices": [
      "In the public folder of the repository in git",
      "In object storage such as S3 or a service built on it",
      "In the database as text in a single column",
      "In the cookies of the user who uploaded the file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a presigned upload url?",
    "topic": "File uploads",
    "choices": [
      "A permanent link that anyone can use to download the file",
      "A temporary url that lets the client upload straight to storage",
      "A url that contains the password of the storage account",
      "A url that your server uses to resize the image"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is a presigned url helpful for large files?",
    "topic": "File uploads",
    "choices": [
      "The file is compressed to a tenth of its size",
      "The file is virus scanned by the browser before it is sent",
      "The file is split into pieces by the framework",
      "The file goes straight to storage and does not pass through your server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you never trust about an uploaded file?",
    "topic": "File uploads",
    "choices": [
      "Its name and its declared content type",
      "The bytes that were sent in the request",
      "The size that your server measured on arrival",
      "The user who is signed in to the session"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you reduce the risk of storing a malicious file?",
    "topic": "File uploads",
    "choices": [
      "Keep the original file name so that users can recognise their own files",
      "Serve the file from the same page that also handles the login of users",
      "Generate your own file names, limit the types and serve from a separate origin",
      "Allow any type of file, because browsers block the bad ones anyway"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a reasonable way to limit the size of an upload?",
    "topic": "File uploads",
    "choices": [
      "Trust the size that the client reports in a field of the form",
      "Check the size only in the browser before the upload is started",
      "Check the size on the server and also set limits at the storage or proxy",
      "Rely on the user to pick files that are small enough to upload"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why store the file url or key in the database instead of the file itself?",
    "topic": "File uploads",
    "choices": [
      "The database stays small and fast, and the storage handles the file",
      "Databases cannot hold any binary data in any form",
      "Files are indexed more quickly when they are in a table",
      "Storage services can only be reached through the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the NEXT_PUBLIC prefix do for an environment variable?",
    "topic": "Environment secrets",
    "choices": [
      "Makes it available only to server components and route handlers",
      "Encrypts the value before it is added to the bundle",
      "Hides it from the build logs of the host",
      "Includes it in the browser bundle, so it is visible to everyone"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which variables must never use the NEXT_PUBLIC prefix?",
    "topic": "Environment secrets",
    "choices": [
      "Values such as the public name of the site",
      "Secrets such as private keys and database passwords",
      "Public analytics ids and publishable keys",
      "The url of the home page of the site"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should secrets live in development?",
    "topic": "Environment secrets",
    "choices": [
      "In a file named secrets.txt in the public folder",
      "In a local .env file that is ignored by git",
      "In the source code, next to the function that uses them",
      "In the readme, so the whole team can find them"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why commit a .env.example file?",
    "topic": "Environment secrets",
    "choices": [
      "It lets the application start without any real configuration being present",
      "It is required by Next.js in order to load all of the other env files",
      "It stores a backup copy of the real secrets for the members of the team",
      "It documents the names of the variables without any real values"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should you do if a secret was committed to git?",
    "topic": "Environment secrets",
    "choices": [
      "Rotate it, since deleting the commit does not undo the exposure",
      "Delete the commit and keep using the same secret",
      "Rename the repository so the secret cannot be found",
      "Add the file to gitignore and keep the secret"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where do you set secrets for a deployed Next.js app?",
    "topic": "Environment secrets",
    "choices": [
      "In a file that is committed to the main branch",
      "In the browser, through the developer tools",
      "In the settings of the hosting platform, per environment",
      "In the url of the deployed site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use different secrets for preview and production?",
    "topic": "Environment secrets",
    "choices": [
      "Production secrets cannot be used in preview builds",
      "Preview builds are not allowed to read any variable",
      "A leak or a mistake in preview cannot affect real customers",
      "The host rotates the secrets every time you deploy"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is an environment variable read at build time versus runtime?",
    "topic": "Environment secrets",
    "choices": [
      "It depends on whether the code runs while building or while serving requests",
      "It is always read at build time and is never read a second time",
      "It is always read at runtime, every time that a user visits",
      "It is read only once, at the moment when the repository is cloned"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you fail fast when a required variable is missing?",
    "topic": "Environment secrets",
    "choices": [
      "Use an empty string and let the code carry on running without the variable",
      "Catch every error that happens in the app and ignore all of them silently",
      "Add the variable to the public bundle so that it is available as a fallback",
      "Validate the environment at startup and throw a clear error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the principle of least privilege for API keys?",
    "topic": "Environment secrets",
    "choices": [
      "Give each key every permission that exists so that nothing is ever blocked",
      "Give each key only the permissions it needs, and nothing more",
      "Share one single key between all of the services to keep the setup simple",
      "Remove the permissions from a key after it has been used for one request"
    ],
    "answerIdx": 1
  }
]
```

LAYER: next-fullstack-10

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
    "stem": "What is Playwright used for?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "Unit tests of pure functions in a Node environment",
      "Checking the types of the code at build time",
      "Generating the documentation of your API routes",
      "End to end tests that drive a real browser through your app"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What makes an end to end test valuable?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "It checks one single function in isolation from all of the others",
      "It checks a whole flow, such as sign in and checkout, as a user would",
      "It runs faster than any unit test that is part of the project",
      "It needs no running server and no database in order to work"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why prefer role or label based locators in Playwright?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "They run faster than every other kind of locator that Playwright offers",
      "They match how users find elements and survive markup changes",
      "They are the only locators that work inside the Chromium browser",
      "They remove the need for a test server to be running during the test"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Playwright auto waiting do?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "Waits a fixed ten seconds before each action",
      "Waits until the whole site has been deployed",
      "Waits for another test to finish before it starts",
      "Waits for elements to be ready before it acts on them"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid fixed sleeps in end to end tests?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "They slow tests down and still fail when the app is slower than expected",
      "They are not supported by any of the browsers that Playwright can drive",
      "They make the test run in a different browser than the one configured",
      "They increase the coverage of the test suite in a way that is misleading"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you run end to end tests against your Next.js app in CI?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "Run Playwright against the production site of a competitor",
      "Run Playwright without a server and mock every page",
      "Build and start the app, then run Playwright against its url",
      "Compile the tests into the Next.js build output"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good approach for the data used in end to end tests?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "Use the production database, so that the test is as realistic as possible",
      "Use whatever data happens to be on the machine of the developer",
      "Use a separate test database, or seeded data that is reset between runs",
      "Create the data by hand before every run of the whole test suite"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you test signed in flows without logging in again in every test?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "Save the signed in state once and reuse it across the tests",
      "Skip authentication completely and test only the public pages of the app",
      "Put the password in the url of each page that the test opens",
      "Run every test inside one single long script that signs in once"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which browsers can Playwright drive?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "Chromium only",
      "Firefox and Internet Explorer",
      "Safari on macOS only",
      "Chromium, Firefox and WebKit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What helps you debug a failing end to end test in CI?",
    "topic": "End-to-end testing with Playwright",
    "choices": [
      "The size of the bundle that was built for the test",
      "Traces, screenshots and video that Playwright can record",
      "The list of dependencies in the lock file",
      "The number of lines that the test file contains"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you set environment variables for a project on Vercel?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "In a file that is committed to the repository",
      "In the project settings, separately for each environment",
      "In the url of the deployed site as query parameters",
      "In the developer tools of the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which environments does Vercel distinguish for variables?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "Local, remote and hybrid",
      "Test, stage and release candidate",
      "Client, server and edge",
      "Development, preview and production"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does a change of an environment variable take effect on Vercel?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "On the next deployment, since the value is read for new builds",
      "Immediately for every deployment that is already live",
      "After a restart of the browser of each visitor",
      "After one hour, when the cache of the host expires"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are NEXT_PUBLIC variables fixed at build time?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "They are read from the server for every visitor",
      "They are copied from the cookies of the visitor",
      "They are inlined into the browser bundle during the build",
      "They are generated by the browser on the first load"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a safe way to share variables with a teammate?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "Send the whole file with the secrets to the teammate in a chat message",
      "Commit the file to the repository so that every developer already has it",
      "Share the names in .env.example and the values through a secrets manager",
      "Write the values of the variables in the readme file of the project"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which variable should differ between preview and production?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "The database url, so previews do not touch real data",
      "The name of the framework in the package file",
      "The order of the imports in the layout file",
      "The version of React in the lock file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Vercel CLI command vercel env pull do?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "Uploads the local variables to every environment at once",
      "Deletes all variables from the project settings",
      "Lists the variables in the build logs of the last deploy",
      "Downloads the project environment variables to a local file"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why are secrets in a build log a problem?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "Logs make the build slower when they hold long values",
      "Logs can be read by others, so secrets must never be printed",
      "Build logs are deleted when they contain a secret",
      "Secrets are always encrypted in logs by the host"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should the app do if a required variable is missing at startup?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "Continue with a default value that points at the production environment",
      "Fail with a clear message instead of running half configured",
      "Ask the visitor to type the missing value into a form on the page",
      "Ignore the missing value and only write a warning to the log file"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How are variables that are used only on the server kept private?",
    "topic": "Environment variables in Vercel",
    "choices": [
      "By storing them in the cookies of the browser for each visitor",
      "By adding them to the url of every request that the app sends out",
      "By renaming them with a long random suffix that nobody could guess",
      "By not using the NEXT_PUBLIC prefix and reading them in server code only"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should production use a different database from development?",
    "topic": "Production database setup",
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
    "topic": "Production database setup",
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
    "topic": "Production database setup",
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
    "topic": "Production database setup",
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
    "topic": "Production database setup",
    "choices": [
      "From the public documentation that the vendor of the database publishes",
      "From the source code of another project that you built earlier",
      "From the url of the deployed site, in the query string of the home page",
      "From the dashboard of the provider, kept as an environment variable"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should the production database not be open to the whole internet?",
    "topic": "Production database setup",
    "choices": [
      "Open databases cannot accept connections from servers",
      "Restricting access reduces the risk of attacks and leaks",
      "Public databases are slower than private ones",
      "The host blocks all databases that are open"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a managed database provider handle for you?",
    "topic": "Production database setup",
    "choices": [
      "The design of your schema and the queries of your app",
      "Backups, updates, availability and scaling of the database",
      "The validation of the data that users type into forms",
      "The caching rules of your Next.js pages"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How should seed data be treated in production?",
    "topic": "Production database setup",
    "choices": [
      "Run the full development seed script again on every single deploy",
      "Delete the existing rows first, so that the seed starts from a clean table",
      "Seed the data from the browser of an administrator who is signed in",
      "Only the data that is truly needed, and never overwrite real data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What can happen if a migration runs twice in parallel from two deploys?",
    "topic": "Production database setup",
    "choices": [
      "Conflicts or errors, so migrations should run in one controlled step",
      "The database merges both runs together without causing any problem at all",
      "The second run is skipped by the browser of the person who deployed",
      "The tables are duplicated and given a numeric suffix to tell them apart"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why monitor the database after a release?",
    "topic": "Production database setup",
    "choices": [
      "The database stops by itself after each release",
      "Monitoring changes the schema to match the traffic",
      "Slow queries and errors may only show up with real traffic",
      "It is required for the app to build on the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a preview deployment on Vercel?",
    "topic": "Preview deployments",
    "choices": [
      "A local copy of the site for the developer only",
      "A cached copy of production that serves traffic when it is down",
      "A unique live copy of a branch or pull request for review",
      "A deployment that runs the tests and never serves pages"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What triggers a preview deployment?",
    "topic": "Preview deployments",
    "choices": [
      "A push to a branch or the opening of a pull request",
      "A change to the name of the project in the dashboard",
      "A request from a visitor to the production site",
      "A scheduled job that runs at midnight"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why are preview deployments useful for reviews?",
    "topic": "Preview deployments",
    "choices": [
      "They replace the need for tests and for code review of the change",
      "They make the production site faster for all of the visitors it has",
      "They copy the data of the preview straight into the production database",
      "Reviewers can click through the real change before it is merged"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should previews not use the production database?",
    "topic": "Preview deployments",
    "choices": [
      "Previews cannot connect to any database",
      "Reviewers or tests could change or delete real data",
      "Production data is too large to load in a preview",
      "The host blocks previews from reading real data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a team protect previews from public access?",
    "topic": "Preview deployments",
    "choices": [
      "Hide the url of the preview, since nobody is ever going to guess it",
      "Use the protection settings of the host, such as a password or a login",
      "Rely on search engines to ignore the preview pages when they crawl",
      "Remove the robots file from the project so that crawlers stay away"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does promoting a deployment to production mean?",
    "topic": "Preview deployments",
    "choices": [
      "Rebuilding the whole project from scratch on the main branch of the repository",
      "Copying the built files to a different hosting provider for a second site",
      "Merging every open preview deployment into one single combined site",
      "Making an already built deployment the one that serves the main domain"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is an instant rollback?",
    "topic": "Preview deployments",
    "choices": [
      "Pointing the domain back at an earlier working deployment",
      "Deleting the git history until the bug disappears",
      "Restoring the database from a backup file",
      "Restarting the build until it succeeds"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do preview urls help with testing integrations such as OAuth?",
    "topic": "Preview deployments",
    "choices": [
      "They work with the same callback as production without any changes at all",
      "They are exempt from callback checks by every one of the providers",
      "They need their own allowed callback urls, so set them up in the provider",
      "They cannot be used with any kind of third party login whatsoever"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why run tests in CI before a deployment is promoted?",
    "topic": "Preview deployments",
    "choices": [
      "Tests make the deployment faster in the build step",
      "Hosts refuse to deploy code without a test file",
      "Failures are caught before users see the change",
      "Tests copy the code of the project to production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can comments from reviewers on a preview be used for?",
    "topic": "Preview deployments",
    "choices": [
      "Giving feedback on the real running change of the pull request",
      "Changing the production environment variables of the app",
      "Updating the dependencies of the project automatically",
      "Running database migrations on the preview"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do web analytics tell you about your app?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Why the code of the project compiles slowly on the machine of a developer",
      "Which of the dependencies of the project have known security problems",
      "Which of the tests of the project are failing in the pipeline right now",
      "How people use it, such as the pages they visit and where they leave"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between analytics and monitoring?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Analytics watches servers and monitoring watches user clicks",
      "Analytics describes user behaviour, monitoring watches health and errors",
      "They are the same thing under two different names",
      "Monitoring is done only in development, analytics only in production"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which signals does error monitoring collect?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Only the number of visitors per day, grouped by country and by device",
      "Exceptions with stack traces and the context in which they happened",
      "The complete source code of the application, uploaded for later reading",
      "The passwords of the users who happened to hit an error on a page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are Core Web Vitals?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Metrics for the number of lines of code in the repository of a project",
      "Scores for the quality of a team that are given by the hosting platform",
      "Counts of the dependencies that an app uses and how old they are",
      "Metrics for loading, interactivity and the visual stability of pages"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why monitor real user performance instead of only lab tests?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Real devices and networks differ from your machine and show real problems",
      "Lab tests cannot measure the speed of any page in any situation",
      "Real user data is always faster than the numbers from a lab test",
      "Monitoring replaces the need for any kind of performance work in the code"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should an alert be based on?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Every single log line that the application writes while it is running",
      "The number of commits that were made to the repository in the last week",
      "Symptoms that users feel, such as the error rate or slow responses",
      "The size of the repository on disk, compared with the previous release"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why avoid logging personal data in analytics or logs?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Personal data makes the logs impossible to search with any tool",
      "Analytics tools refuse to accept any text longer than a few short words",
      "It creates privacy and legal risks, and many people can read logs",
      "Logs cannot contain names or emails in any format, so they are rejected"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a benefit of structured logs?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Fields can be searched and filtered easily across many entries",
      "Logs take up less disk space than plain text lines of the same content",
      "Logs are encrypted by default in the file where they are stored",
      "Logs can be read only by the same tool that originally wrote them"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a source map help with in production error reports?",
    "topic": "Analytics and monitoring",
    "choices": [
      "It makes the production bundle smaller on the server",
      "It hides the source of the code from the visitors",
      "It speeds up the build of the application",
      "It maps minified code back to the original files and lines"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good first step after you notice a spike of errors after a deploy?",
    "topic": "Analytics and monitoring",
    "choices": [
      "Wait for a week to see whether the problem goes away by itself",
      "Check whether it began with the release, and roll back if the impact is high",
      "Delete the monitoring tool so that the alerts stop coming in",
      "Add more features to the app to make up for the errors"
    ],
    "answerIdx": 1
  }
]
```

