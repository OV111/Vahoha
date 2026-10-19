LAYER: remix-dev-1

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

LAYER: remix-dev-2

```json
[
  {
    "stem": "Where do routes live in a typical Remix app?",
    "topic": "Project structure",
    "choices": [
      "In a routes.json file at the root that lists every path of the whole site",
      "In the public folder next to the images and the favicon",
      "In the app/routes folder, where each file or folder describes a route",
      "In the server file that registers one handler for each url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the role of the root route file, root.tsx?",
    "topic": "Project structure",
    "choices": [
      "It renders the html document and the layout that wraps every page",
      "It lists the dependencies of the project for the package manager of the app",
      "It holds the database models that every route reads from",
      "It starts the web server and opens the port for the app"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the entry.server file control?",
    "topic": "Project structure",
    "choices": [
      "How the browser bundles the CSS of the project",
      "How the database migrations are applied on start",
      "How the tests of the project are discovered and run",
      "How the app is rendered to a response on the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the entry.client file control?",
    "topic": "Project structure",
    "choices": [
      "How the server answers the first request of a visitor",
      "How the app is hydrated in the browser",
      "How the routes are matched on the server only",
      "How the environment variables are read at build time"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a route module in Remix?",
    "topic": "Project structure",
    "choices": [
      "A file that exports only a CSS stylesheet for one page",
      "A file that can export a component, a loader, an action and other route functions",
      "A file that stores the settings of the hosting provider",
      "A file that generates a sitemap for search engines"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you put static files such as images and the favicon?",
    "topic": "Project structure",
    "choices": [
      "In the app/routes folder, next to the components",
      "In the node_modules folder after the install step",
      "In the entry.server file as base64 strings",
      "In the public folder, which is served as it is"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the Remix compiler do at build time?",
    "topic": "Project structure",
    "choices": [
      "Bundles the server and the browser code and splits it by route",
      "Executes the loaders once and stores the data for every visitor",
      "Converts every route into a static html file without any server",
      "Replaces React with a smaller library for the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of colocating a loader, an action and a component in one route file?",
    "topic": "Project structure",
    "choices": [
      "The file is smaller than three separate files would be",
      "The code runs only on the server for all three parts",
      "Everything that a page needs lives in one place",
      "The browser downloads fewer requests than with a router"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which command starts the development server in a typical Remix project?",
    "topic": "Project structure",
    "choices": [
      "npm run build, which also serves the app live",
      "npm run deploy, which uploads the app to a host",
      "npm run dev, which runs the Remix dev server",
      "npm run test, which starts the app for the tests"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does Remix treat code that is only needed on the server?",
    "topic": "Project structure",
    "choices": [
      "It removes it from the browser bundle",
      "It sends it to the browser but runs it only in a worker",
      "It keeps it in the browser bundle and hides it with CSS",
      "It compiles it to WebAssembly for the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does a file name map to a url in the file based routing?",
    "topic": "File-based nested routes",
    "choices": [
      "The file name is hashed and used as a random path",
      "The first letter of the file is used as the path",
      "The folder size decides which url is used",
      "The file name segments, separated by dots, become the url path segments"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which file name creates the route /about?",
    "topic": "File-based nested routes",
    "choices": [
      "about/index.html with static content only",
      "about.tsx, or routes/about.tsx",
      "routes/_about_.tsx with underscores around the name",
      "pages/about.js in the pages folder"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a dot in a flat route file name, such as blog.new.tsx, mean?",
    "topic": "File-based nested routes",
    "choices": [
      "A file extension before the real extension",
      "A path separator, so the url is /blog/new",
      "A comment that is ignored by the router",
      "A reference to a method of the blog route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a file named _index.tsx create?",
    "topic": "File-based nested routes",
    "choices": [
      "A hidden file that is never used in the build of the application",
      "A route at the url /_index in the browser",
      "A shared layout for the whole application",
      "The index route that renders at the url of its parent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a nested route in Remix?",
    "topic": "File-based nested routes",
    "choices": [
      "A route that renders inside the Outlet of its parent route",
      "A route that is stored in a subfolder of the public folder",
      "A route that runs only after another route has finished",
      "A route that is copied into every other route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What makes a route nested in the file name, as in dashboard.settings.tsx?",
    "topic": "File-based nested routes",
    "choices": [
      "The word settings, which is reserved by the router",
      "The number of dots in the file name",
      "The shared dashboard prefix, which makes it a child of the dashboard route",
      "The size of the file compared with its parent"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a trailing underscore in a segment, as in dashboard_.help.tsx, do?",
    "topic": "File-based nested routes",
    "choices": [
      "The route becomes private and is not served",
      "The route is renamed to help in the browser",
      "The route has the url /dashboard/help but does not nest inside the dashboard layout",
      "The route is rendered twice on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a pathless layout route, with a leading underscore, such as _auth.login.tsx?",
    "topic": "File-based nested routes",
    "choices": [
      "A layout shared by routes that does not add a segment to the url",
      "A route that cannot be visited by any user",
      "A route that is served only on the server",
      "A route that has no component to render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does Remix pick the routes to render for a url?",
    "topic": "File-based nested routes",
    "choices": [
      "It picks the first file in alphabetical order",
      "It renders every route and hides the ones that do not match",
      "It asks the server which component to show for each request",
      "It matches the url to a branch of nested routes and renders each match"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a splat route, written with $.tsx?",
    "topic": "File-based nested routes",
    "choices": [
      "A route that matches only the root path",
      "A route that matches any remaining part of the path",
      "A route that matches only the urls that come without any query string",
      "A route that is skipped for all urls"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Outlet component do in a layout route?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "Opens a new browser tab with the child route",
      "Renders the matching child route at that place in the layout",
      "Imports the child route into the layout at build time and bundles it",
      "Loads the stylesheet of the child route"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens when a parent route has no Outlet?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "The child routes replace the parent in the page",
      "Remix adds an Outlet at the end of the component",
      "The app throws an error at build time",
      "The child routes of that parent are not rendered in the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use a layout route for a section such as a dashboard?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "The shared navigation stays in place while only the child content changes",
      "Each child page needs its own copy of the navigation",
      "The layout makes the child pages load from the server only",
      "It speeds up the database for the child pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which file is the layout for all pages of the app?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "index.html in the public folder",
      "entry.client.tsx, which renders the markup",
      "root.tsx, which wraps every route",
      "server.ts, which defines the routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the root layout usually render in its component?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "Only the text of the home page",
      "Only the footer of the site with links",
      "The html, head and body elements with an Outlet and the scripts",
      "A list of all the routes of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do the Meta, Links and Scripts components in the root do?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "Render the meta tags, the stylesheets and the scripts of the matched routes",
      "Define the routes of the app in the head element",
      "Load the translations of the app for each language",
      "Create the Open Graph images of the site"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a child route pass data to its parent layout?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "By assigning the value to a global variable of the server",
      "By writing it into the url of the request",
      "By calling the parent function from inside the loader",
      "Through the loader data of the child that the parent reads with useMatches or a shared hook"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of nested routes for data loading?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "Each child waits for the parent loader to finish before its own starts",
      "Loaders of nested routes run in parallel instead of in a waterfall",
      "Nested routes avoid the need for any loader",
      "Nested routes cache their data in the browser for ever"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to the layout when the user moves between two child routes?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "The whole page is unmounted and rendered again",
      "The layout stays mounted and only the child content is replaced",
      "The layout is reloaded from the network",
      "The layout is hidden until the new child has loaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a layout show which child route is active?",
    "topic": "Layouts and the Outlet",
    "choices": [
      "With a global variable that stores the current path of the router state",
      "With a cookie that stores the last page",
      "With a server side session for the user",
      "With NavLink, which adds an active class to the matching link"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which component should you use for navigation links inside the app?",
    "topic": "Links and navigation",
    "choices": [
      "Link from Remix, which navigates without a full page load",
      "A plain anchor element, which always reloads the whole page on each click",
      "A button with window.location set in a click handler",
      "The Navigate component from the DOM library"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the NavLink component add compared with Link?",
    "topic": "Links and navigation",
    "choices": [
      "A way to open the link in a new window",
      "A way to prefetch every single link of the page at the same time",
      "A way to style the link when it is active or pending",
      "A way to hide the link from search engines"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the prefetch prop of Link do?",
    "topic": "Links and navigation",
    "choices": [
      "Stops the link from loading the target route at all until it is clicked",
      "Caches the link text in the local storage",
      "Loads the data or code of the target route before the click",
      "Marks the link as external for the router"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does prefetch=\"intent\" mean?",
    "topic": "Links and navigation",
    "choices": [
      "Prefetch when the user hovers or focuses the link",
      "Prefetch every link when the page loads",
      "Prefetch only after the user has clicked the link and the page has loaded",
      "Prefetch only on mobile devices"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which hook lets you navigate from code?",
    "topic": "Links and navigation",
    "choices": [
      "useRedirect",
      "useHistory",
      "useGoTo",
      "useNavigate"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the redirect helper do in a loader or action?",
    "topic": "Links and navigation",
    "choices": [
      "Reloads the current page with the same data",
      "Returns a response that sends the browser to another url",
      "Throws an error with a message for the user",
      "Opens the url in an iframe on the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is client side navigation faster than a full page load?",
    "topic": "Links and navigation",
    "choices": [
      "The server skips the rendering of the HTML",
      "Only the changed route data and code are fetched, and the document stays in place",
      "The browser does not run any JavaScript",
      "The page is cached on the server for all users"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the reloadDocument prop on Link do?",
    "topic": "Links and navigation",
    "choices": [
      "Reloads only the data of the current route",
      "Reloads the stylesheet of the link target",
      "Prevents the page from reloading at all",
      "Forces a full document load instead of a client side navigation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you link to a route with a parameter, such as a post with id 5?",
    "topic": "Links and navigation",
    "choices": [
      "Build the path, for example to={`/posts/${post.id}`}",
      "Pass the id as a separate prop called param",
      "Use an anchor with a hash and the id",
      "Write the id in the loader of the target route and let it redirect there"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should links to external sites use?",
    "topic": "Links and navigation",
    "choices": [
      "The Link component with a full url",
      "The redirect helper in a loader",
      "A plain anchor element, since Link is for routes of the app",
      "The useNavigate hook in an effect"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you declare a dynamic segment in a file name?",
    "topic": "Route parameters",
    "choices": [
      "With square brackets, such as posts.[postId].tsx",
      "With a colon, such as posts.:postId.tsx",
      "With a dollar sign, such as posts.$postId.tsx",
      "With curly braces, such as posts.{postId}.tsx"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How does a loader read a route parameter?",
    "topic": "Route parameters",
    "choices": [
      "From the params object that the loader receives",
      "From the window location in the browser, with a regular expression on it",
      "From a global variable called route",
      "From the response of the previous request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the type of a route parameter value?",
    "topic": "Route parameters",
    "choices": [
      "A number, since ids are numbers",
      "A boolean, when the segment is meant to work as an on and off flag",
      "An object that has the id as a field",
      "A string, so convert it if you need a number"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a component read the params of the current route?",
    "topic": "Route parameters",
    "choices": [
      "With the useRoute hook",
      "With the useParams hook",
      "With a prop that is named url",
      "With the document location"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should a loader do when no record exists for a given param?",
    "topic": "Route parameters",
    "choices": [
      "Return an empty object and render a blank page",
      "Throw a 404 response so the error boundary can render a not found page",
      "Redirect to the home page without any message",
      "Log the error and return a success status"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Can a route have more than one dynamic segment?",
    "topic": "Route parameters",
    "choices": [
      "No, only one dynamic segment is allowed in each file name of the app",
      "Yes, but only when they are numbers",
      "No, but a route may have several query strings",
      "Yes, for example users.$userId.posts.$postId.tsx"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How are the search params, as in ?page=2, different from route params?",
    "topic": "Route parameters",
    "choices": [
      "They come from the query string and are read from the request url or useSearchParams",
      "They are part of the path and are read from params",
      "They are stored in a cookie by the browser",
      "They are set in the file name of the route"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why validate route params in a loader?",
    "topic": "Route parameters",
    "choices": [
      "The compiler already checks them at build time",
      "They are always encrypted by the framework",
      "They come from the url",
      "They are removed by the router when invalid"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you make a segment optional in a flat route name?",
    "topic": "Route parameters",
    "choices": [
      "Add a question mark after the segment in the file name of the route",
      "Add a star after the segment in the name",
      "Wrap it in parentheses, such as ($lang).about.tsx",
      "Put the segment in an underscore pair"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good use of a splat route?",
    "topic": "Route parameters",
    "choices": [
      "A catch all page, such as a custom not found page for unknown paths",
      "A page for the root of the site only",
      "A page that renders only inside a modal",
      "A page that is served only to administrators"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the web platform mindset mean in Remix?",
    "topic": "The web platform mindset",
    "choices": [
      "Avoid HTML and use only JavaScript for every interaction",
      "Replace the browser features with libraries",
      "Run every page only inside of a single page app",
      "Use the standards of the web"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which web standard does a loader receive as its argument?",
    "topic": "The web platform mindset",
    "choices": [
      "A custom object that only Remix understands",
      "A Request object, which is the standard Fetch API request",
      "A string with the url of the page",
      "A DOM event from the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which web standard does a loader return?",
    "topic": "The web platform mindset",
    "choices": [
      "A React element that is rendered by the server",
      "A Response, or data that Remix turns into one",
      "A callback that the browser calls later",
      "A promise that never resolves"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why does Remix use HTML forms for mutations?",
    "topic": "The web platform mindset",
    "choices": [
      "They are faster than any other way of sending data",
      "Forms are required by React for all state",
      "They stop the server from needing any routes",
      "They work without JavaScript and follow how the web has always sent data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is progressive enhancement?",
    "topic": "The web platform mindset",
    "choices": [
      "The page works with plain HTML first, and JavaScript improves the experience",
      "The page needs JavaScript to show any content",
      "The page loads more images as the user scrolls",
      "The page changes its design for each new browser version"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a Remix form if JavaScript has not loaded yet?",
    "topic": "The web platform mindset",
    "choices": [
      "The form does nothing until JavaScript has loaded",
      "The form is hidden until the scripts are ready",
      "The browser submits it as a normal form and the server handles it",
      "The form shows an error message to the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does it mean that Remix leans on HTTP caching?",
    "topic": "The web platform mindset",
    "choices": [
      "You must write a custom cache in the code of each route",
      "The framework stores every response in local storage",
      "You can set standard cache headers on responses and let browsers and CDNs use them",
      "Caching is not possible with server rendering"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use the Fetch API objects, Request and Response, on the server?",
    "topic": "The web platform mindset",
    "choices": [
      "The same standard types work in many runtimes",
      "They are the only types that Node can handle",
      "They make the server run on the client",
      "They are required by the file system of the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of working with URLs and search params for state?",
    "topic": "The web platform mindset",
    "choices": [
      "State in the url is encrypted by the browser",
      "Search params are faster than any other state",
      "The state is saved on the server for each tab",
      "The state survives reloads and can be shared by copying the link"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which statement fits the Remix philosophy?",
    "topic": "The web platform mindset",
    "choices": [
      "Move all logic to the client and call APIs from effects",
      "Embrace the platform and let the server do the work where it makes sense",
      "Avoid the server and ship a static site only",
      "Hide HTTP behind a custom protocol"
    ],
    "answerIdx": 1
  }
]
```

LAYER: remix-dev-3

```json
[
  {
    "stem": "What is a loader in Remix?",
    "topic": "Loader functions",
    "choices": [
      "A component that shows a spinner while the page is loading in the browser",
      "A hook that fetches data from an api inside an effect after render",
      "A function exported from a route module that supplies data for the route on the server",
      "A build plugin that loads the stylesheets of every route into the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When does a loader run?",
    "topic": "Loader functions",
    "choices": [
      "On the server for each request to the route, and for client navigations to it",
      "Once at build time, and its result is reused for every visitor of the whole site",
      "Only in the browser after the component has rendered for the first time",
      "Only when the user clicks a link that has the loader attribute set"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What argument does a loader receive?",
    "topic": "Loader functions",
    "choices": [
      "A string that holds the url of the current page in the browser",
      "The previous state of the component that renders the route",
      "A DOM event from the click that started the navigation",
      "An object with the request, the params and the context"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which runtime features may code inside a loader use?",
    "topic": "Loader functions",
    "choices": [
      "Only browser APIs such as window and localStorage for reading data",
      "Server only code, such as database access and secrets from the environment",
      "Only the code that is imported from other client components",
      "Nothing that touches a network or a file system at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can a loader return?",
    "topic": "Loader functions",
    "choices": [
      "A React element that is rendered on the server by the loader",
      "A Response, or data that Remix serialises into one",
      "A function that the browser calls when the page is ready",
      "A promise that is rejected when the data is available"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is a loader a good place to fetch data?",
    "topic": "Loader functions",
    "choices": [
      "It runs in the browser, so the user can see each step of the call",
      "It avoids the server completely and lets the browser fetch alone",
      "It stores the data in a cookie for the next visit of the user",
      "Data is ready before the component renders"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Do loaders of nested routes run one after another?",
    "topic": "Loader functions",
    "choices": [
      "No, they run in parallel for all matched routes of the url",
      "Yes, each child waits for the loader of its parent to finish",
      "Only when the child needs the data of the parent loader",
      "Only in development mode and never in production"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a loader when the user navigates to the same route with a new param?",
    "topic": "Loader functions",
    "choices": [
      "It is skipped because the route is already mounted",
      "It runs only after the user reloads the whole page",
      "It runs again with the new params and the data is revalidated",
      "It runs twice, once for the old param and once for the new one"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can a loader read cookies and headers of the request?",
    "topic": "Loader functions",
    "choices": [
      "No, the request headers are hidden from every loader",
      "Only when the route is wrapped in a special provider component",
      "Yes, through the Request object",
      "Only in the root loader and in no other route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you set response headers from a loader?",
    "topic": "Loader functions",
    "choices": [
      "Return a Response with a headers option, or use a headers export on the route",
      "Call a setHeader function from the component of the route",
      "Write the headers into the url of the page as parameters",
      "Add them to the package.json file of the project"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which hook gives a component the data of its loader?",
    "topic": "useLoaderData",
    "choices": [
      "useRouteData",
      "useServerData",
      "useFetchData",
      "useLoaderData"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where is the data that useLoaderData returns computed?",
    "topic": "useLoaderData",
    "choices": [
      "In the browser by the component with a fetch call",
      "On the server by the loader",
      "In the build step, once for all visitors of the site",
      "In a worker that the component starts on its own"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Is the data of useLoaderData serialised on its way to the browser?",
    "topic": "useLoaderData",
    "choices": [
      "No, the browser receives the same objects with all of their original methods",
      "Yes, so values such as dates arrive as strings unless you convert them",
      "Yes, but only strings and numbers can survive the trip",
      "No, because the loader runs in the browser as well"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useLoaderData do when the loader runs again after a navigation?",
    "topic": "useLoaderData",
    "choices": [
      "Keeps returning the first data for the whole life of the page",
      "Throws an error until the user reloads the page",
      "Returns a promise that the component must await",
      "Returns the new data and the component renders again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Can a child component of the route use useLoaderData?",
    "topic": "useLoaderData",
    "choices": [
      "Yes, it returns the data of the nearest route in the tree",
      "No, only the route component itself may call the hook",
      "Yes, but only when the data is passed down as props first",
      "No, because child components run on the server only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a component read the data of another route, such as the root loader?",
    "topic": "useLoaderData",
    "choices": [
      "With useLoaderData and the name of the other route",
      "With a global variable that the root loader sets",
      "With useRouteLoaderData and the id of that route",
      "With a fetch call to the url of the root route"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good practice for the data that a loader returns?",
    "topic": "useLoaderData",
    "choices": [
      "Return everything that the database has for the user",
      "Return secrets so that the browser can use them later",
      "Return only what the page needs, not whole database records",
      "Return functions that the component can call later as if they were methods"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why must a loader never return secrets such as a password hash?",
    "topic": "useLoaderData",
    "choices": [
      "Everything it returns is sent to the browser and visible to the user",
      "Loaders cannot return strings with secrets in them",
      "The compiler removes the secrets at build time",
      "Secrets are encrypted by Remix before they are sent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the useRevalidator hook let you do?",
    "topic": "useLoaderData",
    "choices": [
      "Check that the form values are valid before submit",
      "Validate the url against the file names of the routes",
      "Reset the data of the loader to its initial value",
      "Rerun the loaders of the current page on demand"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When does Remix revalidate loader data automatically?",
    "topic": "useLoaderData",
    "choices": [
      "Every second while the tab is open in the browser",
      "After an action completes, so the page shows fresh data",
      "Only when the user presses the refresh button of the browser",
      "Never, because loader data is cached for ever"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you get type safe data from a loader in TypeScript?",
    "topic": "Type-safe loader data",
    "choices": [
      "Cast the data to any in the component each time it is used",
      "Infer the type of the data from the loader with typeof loader",
      "Write the same interface twice, once in the loader file and once in the component",
      "Convert the data to a string and parse it in the component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does useLoaderData<typeof loader>() do?",
    "topic": "Type-safe loader data",
    "choices": [
      "Runs the loader a second time to check its type",
      "Converts the data of the loader into the type of the component",
      "Makes the loader return values only of the string type",
      "Gives the component the type that the loader returns, without repeating it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why can a Date in the loader data have the type string on the client?",
    "topic": "Type-safe loader data",
    "choices": [
      "Data is serialised as JSON",
      "TypeScript always converts dates to strings by default",
      "The browser has no Date type in its JavaScript engine",
      "Dates are removed from the data by the router"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a safe way to handle dates from loader data?",
    "topic": "Type-safe loader data",
    "choices": [
      "Assume that the value is a Date object in all of the components",
      "Store the date as a function in the data",
      "Convert the string to a Date in the component or format it on the server",
      "Leave the date out of the data of every loader"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool is useful for validating the shape of data that comes from the outside?",
    "topic": "Type-safe loader data",
    "choices": [
      "A CSS framework, which styles the data",
      "A bundler plugin, which splits the data",
      "Zod, which checks data at runtime and gives types",
      "A linter, which formats the data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does type inference reduce bugs when the loader changes?",
    "topic": "Type-safe loader data",
    "choices": [
      "The component sees the new type",
      "The compiler rewrites the component to fit the new loader",
      "The loader cannot change after the component is written",
      "The router converts the old data to the new shape"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What type does the params object have in a loader by default?",
    "topic": "Type-safe loader data",
    "choices": [
      "An object whose values are numbers",
      "An object whose values are booleans",
      "An object that always has every one of its keys defined as a string",
      "An object whose values are strings or undefined"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you narrow params.postId to a string in TypeScript?",
    "topic": "Type-safe loader data",
    "choices": [
      "Add an exclamation mark and never check the value",
      "Check that it exists and throw a 404 or a 400 response if it does not",
      "Cast the whole params object to any",
      "Read it with parseInt without any check"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the benefit of sharing a type between loader and action?",
    "topic": "Type-safe loader data",
    "choices": [
      "Both run at the same time on the server",
      "Both agree on the shape of the data and the compiler checks the usage",
      "Both use fewer lines of code than before",
      "Both are cached in the browser together"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which type describes the arguments of a loader in Remix?",
    "topic": "Type-safe loader data",
    "choices": [
      "ActionFunctionData",
      "RouteLoaderParams",
      "RequestContextProps",
      "LoaderFunctionArgs"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you read a search param, such as ?q=remix, in a loader?",
    "topic": "URL params and search params",
    "choices": [
      "new URL(request.url).searchParams.get(\"q\")",
      "params.q from the first argument",
      "request.body.q read from the first argument of the loader function",
      "window.location.search in the loader"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which hook reads and updates the search params in a component?",
    "topic": "URL params and search params",
    "choices": [
      "useQueryString",
      "useUrlParams",
      "useSearchParams",
      "useLocationData"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why store filters such as page and sort in the url?",
    "topic": "URL params and search params",
    "choices": [
      "Search params are faster than any other kind of state",
      "The browser encrypts them for every request",
      "The state survives reloads and links can be shared and bookmarked",
      "The server cannot read state from anywhere else"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to a loader when the search params change?",
    "topic": "URL params and search params",
    "choices": [
      "It runs again with the new url",
      "It does not run again until the user reloads the tab",
      "It runs only if the path of the route changes",
      "It runs on the client with the old data"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you make a search form that updates the url?",
    "topic": "URL params and search params",
    "choices": [
      "Use a Form with method post and a hidden field called url",
      "Use a button with an onClick that sets a global variable",
      "Use an anchor element with the value in its text",
      "Use a Form with method get"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the type of a value from searchParams.get?",
    "topic": "URL params and search params",
    "choices": [
      "A number, since it comes from a query",
      "A string or null, so handle the missing case",
      "A boolean that tells you whether the key exists in the query or not",
      "An array with all of the values of the key"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you read several values of the same key, such as ?tag=a&tag=b?",
    "topic": "URL params and search params",
    "choices": [
      "searchParams.get(\"tag\")[] which indexes the result of a single value",
      "searchParams.getAll(\"tag\")",
      "searchParams.many(\"tag\")",
      "searchParams.split(\"tag\")"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate search params in a loader?",
    "topic": "URL params and search params",
    "choices": [
      "The browser validates them before the request is sent",
      "The compiler checks them at build time",
      "They are always numbers because of the router",
      "A visitor can type any value in the address bar"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a page keep the current search params when it links to another page?",
    "topic": "URL params and search params",
    "choices": [
      "Build the link from the current searchParams",
      "Links always keep the search params without any code",
      "Use a cookie that stores the last search",
      "Reload the page after the click"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good default for a missing page param?",
    "topic": "URL params and search params",
    "choices": [
      "Throw a server error for a missing param",
      "Show an empty page without any data",
      "Treat it as page 1 and clamp invalid numbers",
      "Redirect to the home page of the site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does defer allow in a loader, in versions that provide it?",
    "topic": "Deferred data and streaming",
    "choices": [
      "Delaying the whole loader until the user clicks a button",
      "Running the loader only after the page is hydrated",
      "Returning a promise for slow data so the page can render before it resolves",
      "Skipping the loader on the server and running it in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which component renders the result of a deferred promise?",
    "topic": "Deferred data and streaming",
    "choices": [
      "Await, used inside Suspense",
      "Defer, used inside the loader",
      "Resolve, used inside the Form",
      "Stream, used inside the Outlet"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Suspense show while a deferred value is pending?",
    "topic": "Deferred data and streaming",
    "choices": [
      "The previous page of the app",
      "An error page that is built in",
      "Nothing, and the whole page is blocked",
      "The fallback that you give it"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the benefit of deferring slow data?",
    "topic": "Deferred data and streaming",
    "choices": [
      "The slow data is skipped for every visitor",
      "The fast parts of the page appear at once, and the slow part streams in later",
      "The data is cached for all users for ever",
      "The page needs no JavaScript at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should stay in the awaited part of a loader and not be deferred?",
    "topic": "Deferred data and streaming",
    "choices": [
      "Slow analytics that are shown further down below the fold of the page",
      "Critical data that the page cannot show without",
      "Recommendations that load last",
      "Comments that can appear later"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does streaming mean for the response?",
    "topic": "Deferred data and streaming",
    "choices": [
      "The server sends a video of the page to the browser",
      "The server keeps the page for a later request",
      "The server compresses the whole page twice",
      "The server sends the HTML in parts as data becomes ready"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does a deferred promise reach the browser?",
    "topic": "Deferred data and streaming",
    "choices": [
      "The server streams the resolved value in the same response, and the client updates the page",
      "The browser sends a second request for it automatically",
      "The browser polls the server every second",
      "The data is placed into a cookie"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens if a deferred promise rejects?",
    "topic": "Deferred data and streaming",
    "choices": [
      "The page shows the old data without any message",
      "The server stops for all visitors",
      "The errorElement of Await shows, or the closest error boundary renders",
      "The promise is retried until it works"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does streaming help with the perceived speed of a page?",
    "topic": "Deferred data and streaming",
    "choices": [
      "The total time for the slowest data becomes shorter",
      "The browser skips rendering for the slow parts",
      "Users see content sooner, even if the slowest data is still on its way",
      "The server uses less memory for the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can a deferred value be read in a component without Await?",
    "topic": "Deferred data and streaming",
    "choices": [
      "Not directly, since it is a promise that needs Await or a similar helper",
      "Yes, by reading the value like a normal property",
      "Yes, by calling a method on the data",
      "No, because deferred values cannot be used in a component"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a loader do when a record is not found?",
    "topic": "Error and not-found handling",
    "choices": [
      "Return null and let the component render an empty page",
      "Redirect to the home page with a success status",
      "Log a message and return a 200 response",
      "Throw a 404 response, so the error boundary of the route renders"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you throw a 404 from a loader?",
    "topic": "Error and not-found handling",
    "choices": [
      "return new Error(\"404\") from the loader",
      "throw new Response(\"Not Found\", { status: 404 })",
      "call res.status(404) on the response",
      "set document.title to Not Found"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which export handles errors thrown by the loader and the component of a route?",
    "topic": "Error and not-found handling",
    "choices": [
      "ErrorHandler",
      "ErrorBoundary",
      "CatchAll",
      "RouteFallback"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which helper tells a thrown response from an unexpected error in an error boundary?",
    "topic": "Error and not-found handling",
    "choices": [
      "isHttpError",
      "isCaughtResponse",
      "isThrownError",
      "isRouteErrorResponse"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why throw a response and not return an error object?",
    "topic": "Error and not-found handling",
    "choices": [
      "Throwing stops the loader and shows the boundary",
      "Returned errors are ignored by the framework",
      "Thrown responses are cached for a year",
      "Returned objects cannot contain a message"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens to a parent layout when a child loader throws?",
    "topic": "Error and not-found handling",
    "choices": [
      "The whole page is replaced by a blank page",
      "The parent is rendered again from the start",
      "The parent stays rendered and the child area shows the error boundary",
      "The parent is hidden until the error is fixed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a good status code for a loader when the user is not signed in?",
    "topic": "Error and not-found handling",
    "choices": [
      "404, because the page that was asked for was not found there",
      "200, with an empty list",
      "401, or a redirect to the login page",
      "500, because the server failed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a 500 response from a loader usually mean?",
    "topic": "Error and not-found handling",
    "choices": [
      "An unexpected server error that the boundary should show safely",
      "A missing record that the user asked for",
      "A redirect that the browser follows",
      "A successful response with no body"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why should error messages shown to users avoid internal details?",
    "topic": "Error and not-found handling",
    "choices": [
      "Browsers cannot display long messages",
      "The router removes all text from errors",
      "They are always translated by Remix",
      "They can leak server paths, queries or secrets"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should unexpected errors in loaders be logged?",
    "topic": "Error and not-found handling",
    "choices": [
      "Only in the browser console of the user",
      "On the server, with enough context to debug them",
      "Nowhere, because Remix logs them for you",
      "In the url of the next request"
    ],
    "answerIdx": 1
  }
]
```

LAYER: remix-dev-4

```json
[
  {
    "stem": "What is an action in Remix?",
    "topic": "Action functions",
    "choices": [
      "A function that runs on every page view to fetch the data of the route",
      "A component that renders a button which triggers a client side event",
      "A function exported from a route module that handles non GET requests such as form posts",
      "A build step that generates the actions of the app from the routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which HTTP methods call an action?",
    "topic": "Action functions",
    "choices": [
      "POST, PUT, PATCH and DELETE",
      "Only GET requests that come from links",
      "Only HEAD and OPTIONS requests that browsers send",
      "Every request, including the first page load"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does an action read the submitted form fields?",
    "topic": "Action functions",
    "choices": [
      "From the params object, by the names that the fields of the form have",
      "From the url of the page, as query parameters",
      "From a global variable that the form sets",
      "await request.formData(), then get each field by name"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should an action usually return after a successful mutation?",
    "topic": "Action functions",
    "choices": [
      "A React element that replaces the form",
      "A redirect to another page, or data for the same page",
      "A promise that never settles for the browser",
      "A string with the SQL of the change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which function sends the user to another page after an action succeeds?",
    "topic": "Action functions",
    "choices": [
      "navigate, which changes the url in the action",
      "redirect, which returns a response with a Location header",
      "reload, which asks the server again",
      "move, which edits the history array"
    ],
    "answerIdx": 1
  },
  {
    "stem": "After an action, what does Remix do with the loaders of the page?",
    "topic": "Action functions",
    "choices": [
      "Skips them and shows the old data until a refresh",
      "Deletes them for the rest of the session",
      "Runs them once more only on the server of the host",
      "Reruns them so the page shows fresh data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do actions run only on the server?",
    "topic": "Action functions",
    "choices": [
      "They can touch the database and secrets safely, away from the browser bundle",
      "They need a faster computer than the browser has",
      "The browser does not support form posts",
      "Actions are removed from the build at compile time"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How does an action tell which button of a form was pressed?",
    "topic": "Action functions",
    "choices": [
      "Read the id of the button from the url of the page",
      "Compare the mouse position in the request",
      "Give the buttons a name and a value and read the field from formData",
      "Add a separate route for every button"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What status code should an action return for invalid input?",
    "topic": "Action functions",
    "choices": [
      "200, since the request was received",
      "404, because the input was not found",
      "400, with the errors so the form can show them",
      "302, because the form must be sent again to a different place"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Can one route have both a loader and an action?",
    "topic": "Action functions",
    "choices": [
      "Yes, the loader handles GET and the action handles the mutations",
      "No, a route must choose one of the two",
      "Yes, but only when they are in separate files",
      "No, because both would handle the same request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Form component from Remix do compared with a plain form element?",
    "topic": "The Form component",
    "choices": [
      "Submits only with JavaScript and does nothing without it",
      "Replaces the action of the route with a client function",
      "Validates every field on its own before it submits",
      "Submits with fetch and updates the page without a full reload, when JavaScript is available"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you send a form to a specific route action?",
    "topic": "The Form component",
    "choices": [
      "Add the route name to the name of the first field",
      "Set the action prop on Form to the path of that route",
      "Use a hidden field called route that holds the file name of the route",
      "Call the action function from an onSubmit handler"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to a Form without an action prop?",
    "topic": "The Form component",
    "choices": [
      "It posts to the home page of the site",
      "It posts to the route that renders it",
      "It does not post at all",
      "It posts to the parent layout only"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does method=\"post\" on a Form do?",
    "topic": "The Form component",
    "choices": [
      "Sends the fields in the url as query parameters",
      "Stores the fields in a cookie for later",
      "Sends the fields to the loader of the route",
      "Sends the fields as the body of a POST request to the action"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does method=\"get\" on a Form do?",
    "topic": "The Form component",
    "choices": [
      "Navigates with the fields as search params, and runs the loader",
      "Sends the fields in the body of the request to the action of the route",
      "Sends the fields in a header of the request",
      "Does not send the fields anywhere"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do inputs need a name attribute?",
    "topic": "The Form component",
    "choices": [
      "The name is shown as a label next to the field",
      "The name decides in which order fields are validated",
      "The name is the key under which the value is available in formData",
      "The name sets the type of the keyboard on mobile"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you submit a form with a different intent from several buttons?",
    "topic": "The Form component",
    "choices": [
      "Create one Form for every field on the page",
      "Use a different HTTP method for each button",
      "Give each button the same name and different values",
      "Use several actions in the same route file"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the replace prop on a Form change?",
    "topic": "The Form component",
    "choices": [
      "The submission replaces the current history entry instead of adding one",
      "The form replaces the page with a blank screen",
      "The form replaces its fields with the server data",
      "The form replaces the Remix server with a client router"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a form be submitted from code?",
    "topic": "The Form component",
    "choices": [
      "No, only a click on a button can submit a form",
      "Yes, but only by calling the action function directly from the component",
      "No, because actions are for the server only",
      "Yes, with useSubmit, passing the form data and options"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a hidden input in a form help with?",
    "topic": "The Form component",
    "choices": [
      "Hiding the form from the page for some users",
      "Sending extra values, such as an id, with the submission",
      "Encrypting the other fields of the form",
      "Preventing the form from being submitted twice"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why validate input with a schema library such as Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "It encrypts the input before it reaches the database of the application",
      "It checks the shape and types of untrusted data and gives typed results",
      "It makes the form render faster in the browser of the visitor",
      "It replaces the need to define a schema for the database at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does schema.safeParse(data) return?",
    "topic": "Validation with Zod",
    "choices": [
      "The parsed data, or it throws an error if invalid",
      "A promise that resolves after the data is checked",
      "A boolean that says whether the data is valid",
      "An object with a success flag and either data or an error"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you define a string that must be an email in Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "z.string().email()",
      "z.email.string()",
      "z.text().isEmail",
      "z.string({ type: \"email\" })"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you derive a TypeScript type from a Zod schema?",
    "topic": "Validation with Zod",
    "choices": [
      "type User = typeof schema.type, which reads the type from a property",
      "type User = z.type(schema)",
      "type User = z.infer<typeof schema>",
      "type User = schema.toType()"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why validate on the server even when the form is validated in the browser?",
    "topic": "Validation with Zod",
    "choices": [
      "Browsers never run validation code that is written in JavaScript",
      "Server validation is faster than the validation in the browser",
      "Client side checks can be skipped by anyone who calls the action directly",
      "Client checks are removed when the app is built for production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you make a field optional in Zod?",
    "topic": "Validation with Zod",
    "choices": [
      "Call .optional() on the field schema",
      "Add a question mark inside the string of the field",
      "Set the field to null in the schema object",
      "Wrap the schema in z.maybe()"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does z.coerce.number() do with the string \"42\" from a form?",
    "topic": "Validation with Zod",
    "choices": [
      "Rejects it, since it is a string and not a number",
      "Keeps the string and only checks the characters",
      "Converts it to the boolean true because it is not empty",
      "Converts it to the number 42 before validating"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can an action report field errors to the form?",
    "topic": "Validation with Zod",
    "choices": [
      "Throw the Zod error so that the browser shows it in a popup window",
      "Return error.flatten().fieldErrors and show each message near its field",
      "Write the errors to a log file on the server and show nothing",
      "Redirect to a separate error page that lists every single one of the errors"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does z.object({ ... }) describe?",
    "topic": "Validation with Zod",
    "choices": [
      "A class whose instances are checked on each call",
      "The expected shape of an object, with a schema for each key",
      "A list of values that are all of the same type",
      "A function that checks the object after it is saved"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a good practice for the data passed to the database after validation?",
    "topic": "Validation with Zod",
    "choices": [
      "Use the original input so that the user data stays intact",
      "Use both and let the database decide which to keep",
      "Use the first field of the input only",
      "Use the parsed result and not the original FormData"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which hook tells you whether a navigation or form submission is in progress?",
    "topic": "useNavigation pending states",
    "choices": [
      "useNavigation",
      "useLoadingState",
      "usePending",
      "useRouteStatus"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What values can navigation.state have?",
    "topic": "useNavigation pending states",
    "choices": [
      "open, closed and waiting",
      "ready, running and failed, one after the other",
      "idle, loading and submitting",
      "start, middle and end"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the submitting state mean?",
    "topic": "useNavigation pending states",
    "choices": [
      "The page is being loaded for the first time",
      "The browser is offline",
      "A form is being sent to an action",
      "The user is typing in a field"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the loading state mean?",
    "topic": "useNavigation pending states",
    "choices": [
      "Loaders are running after a navigation or an action",
      "The form has just been submitted by the user and is waiting for an answer",
      "The page has finished rendering",
      "The server has stopped responding"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you disable a submit button while the form is being sent?",
    "topic": "useNavigation pending states",
    "choices": [
      "Remove the button from the page after the first click",
      "Set a timeout in the click handler of the button",
      "Hide the form until the page reloads",
      "Disable it when navigation.state is submitting"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why show pending UI during a submission?",
    "topic": "useNavigation pending states",
    "choices": [
      "The server needs a signal to start the action",
      "The user knows that work is in progress and does not click again",
      "The browser blocks the page without a spinner",
      "It makes the action run faster"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does navigation.formData contain during a submission?",
    "topic": "useNavigation pending states",
    "choices": [
      "The data that the loader will return later",
      "The data that is being submitted",
      "The cookies of the current user",
      "The previous values of the fields"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a link show a pending style while its page loads?",
    "topic": "useNavigation pending states",
    "choices": [
      "A cookie stores the pending state for the link",
      "The router adds a spinner to every link by itself",
      "The server sends the style in the response",
      "NavLink gives you an isPending flag for that link"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a global pending indicator?",
    "topic": "useNavigation pending states",
    "choices": [
      "A top of page bar that shows while any navigation is running",
      "A button that disables all the forms of the site",
      "A cookie that stores the loading state",
      "A loader that runs in the root only"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between useNavigation and useFetcher state?",
    "topic": "useNavigation pending states",
    "choices": [
      "useNavigation is for the server and a fetcher is for the client",
      "They are the same hook with two names",
      "useNavigation covers the page navigation, a fetcher covers one background request",
      "A fetcher covers navigation and useNavigation covers forms only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is an optimistic update?",
    "topic": "Optimistic UI",
    "choices": [
      "Waiting for the server to answer before the interface shows any change at all",
      "Updating the database first, before the interface has been changed in any way",
      "Showing the expected result at once and confirming it when the server answers",
      "Retrying a request that failed until it finally succeeds on a later attempt"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which React hook supports optimistic updates with actions?",
    "topic": "Optimistic UI",
    "choices": [
      "useOptimistic",
      "useDeferredValue",
      "useSyncExternalStore",
      "useImperativeHandle"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should happen when an optimistic update fails on the server?",
    "topic": "Optimistic UI",
    "choices": [
      "The interface keeps the wrong value without any message",
      "The page reloads and the user loses everything that they had typed in",
      "The request is repeated forever in the background",
      "The interface rolls back and the user is told what went wrong"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use optimistic updates for actions such as likes?",
    "topic": "Optimistic UI",
    "choices": [
      "The server can skip validation when the interface updates first",
      "The interface feels instant even when the network is slow",
      "The data is saved twice, which makes it safer",
      "The request is sent after the user has left the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is the source of truth after an optimistic update?",
    "topic": "Optimistic UI",
    "choices": [
      "The temporary value in the browser, which the server is then forced to accept",
      "The server data, which replaces the temporary value when it arrives",
      "The cache, which is never replaced by newer data",
      "The url of the page, which keeps the final value"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When are optimistic updates a poor fit?",
    "topic": "Optimistic UI",
    "choices": [
      "When the action is a simple toggle that only rarely fails on the server",
      "When the user expects to see an immediate response on the screen",
      "When the data can be rolled back without any side effects at all",
      "When failure is common or the result is unpredictable, such as payments"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why do you still revalidate after an optimistic mutation?",
    "topic": "Optimistic UI",
    "choices": [
      "To make sure the cached pages end up with the real server data",
      "To delete the optimistic value from the browser history",
      "To show a loading spinner for a little longer",
      "To cancel the request in case it is still running"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you give an optimistic item a temporary key in a list?",
    "topic": "Optimistic UI",
    "choices": [
      "Leave the key empty until the server has returned the real id of the item",
      "Use the index of the item in the list, since an index never changes",
      "Use a temporary id, such as a generated one, until the real id exists",
      "Use the text of the item as its key, since the text is always unique"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does useOptimistic return?",
    "topic": "Optimistic UI",
    "choices": [
      "The result of the server action and an error object that describes failures",
      "A promise that resolves at the moment the server has finished answering",
      "The optimistic state and a function that applies an optimistic change",
      "A list that holds every one of the changes that were made so far"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens to optimistic state when the action finishes?",
    "topic": "Optimistic UI",
    "choices": [
      "It falls back to the real state that comes from the server",
      "It stays the same and ignores the server result",
      "It is saved to localStorage as a permanent copy",
      "It is sent to the server again to double check it"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does Remix revalidate loaders after an action?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Loaders must run once per user session",
      "Actions delete the data of the loaders",
      "The browser requires revalidation after every post",
      "The mutation may have changed the data that the loaders show"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you avoid revalidating a loader that does not depend on the mutation?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Delete the loader after the first run",
      "Export shouldRevalidate from the route and return false when it is safe",
      "Call the loader from the action",
      "Use a global variable as a cache"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does shouldRevalidate receive?",
    "topic": "Revalidation after mutations",
    "choices": [
      "The data that the loader returned the last time that it ran",
      "Information about the navigation or submission",
      "The cookies of the request",
      "The type of the component"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens after a redirect from an action?",
    "topic": "Revalidation after mutations",
    "choices": [
      "The action runs again at the new url",
      "The browser keeps showing the old page until the next request is made",
      "The redirect is ignored when JavaScript is loaded",
      "The browser follows it and the loaders of the new page run"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a stale page be refreshed on demand?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Call revalidate from useRevalidator",
      "Reload the whole site from the server",
      "Change the cache header of the loader",
      "Delete the cookie of the user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is revalidation after a mutation important for correctness?",
    "topic": "Revalidation after mutations",
    "choices": [
      "It lets the database commit the change",
      "It gives the user a new session cookie",
      "Without it the page could show old data that the user just changed",
      "It compiles the route again"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which of these is a cost of revalidating many loaders?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Smaller bundles for the browser",
      "The form cannot be submitted twice by the same user at the same time",
      "More server work for each submission",
      "The router cannot find the routes"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you reduce the cost of revalidation for a list page?",
    "topic": "Revalidation after mutations",
    "choices": [
      "Keep loaders small and use shouldRevalidate or HTTP caching where safe",
      "Run each loader twice to be sure",
      "Avoid loaders and fetch data in effects",
      "Remove the actions from the routes"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a fetcher form do about revalidation?",
    "topic": "Revalidation after mutations",
    "choices": [
      "It never revalidates anything",
      "It revalidates only the root loader",
      "It revalidates only when the user reloads",
      "It also revalidates the page loaders after the fetcher action finishes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to the data of other routes when an action redirects to a new url?",
    "topic": "Revalidation after mutations",
    "choices": [
      "All data is deleted from the browser",
      "Loaders for the routes of the new url run, and shared parent loaders may be revalidated",
      "The old routes keep their data for ever",
      "The server runs every loader of the app"
    ],
    "answerIdx": 1
  }
]
```

LAYER: remix-dev-5

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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "topic": "Querying in loaders and actions",
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
    "stem": "What does the NEXT_PUBLIC prefix do for an environment variable?",
    "topic": "Environment variables",
    "choices": [
      "Makes it available only to server components and route handlers",
      "Encrypts the value before it is added to the bundle",
      "Includes it in the browser bundle, so it is visible to everyone",
      "Hides it from the build logs of the host"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which variables must never use the NEXT_PUBLIC prefix?",
    "topic": "Environment variables",
    "choices": [
      "Secrets such as private keys and database passwords",
      "Values such as the public name of the site",
      "Public analytics ids and publishable keys",
      "The url of the home page of the site"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Where should secrets live in development?",
    "topic": "Environment variables",
    "choices": [
      "In a file named secrets.txt in the public folder",
      "In the source code, next to the function that uses them",
      "In the readme, so the whole team can find them",
      "In a local .env file that is ignored by git"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why commit a .env.example file?",
    "topic": "Environment variables",
    "choices": [
      "It lets the application start without any real configuration being present",
      "It documents the names of the variables without any real values",
      "It is required by Next.js in order to load all of the other env files",
      "It stores a backup copy of the real secrets for the members of the team"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you do if a secret was committed to git?",
    "topic": "Environment variables",
    "choices": [
      "Delete the commit and keep using the same secret",
      "Rotate it, since deleting the commit does not undo the exposure",
      "Rename the repository so the secret cannot be found",
      "Add the file to gitignore and keep the secret"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you set secrets for a deployed Next.js app?",
    "topic": "Environment variables",
    "choices": [
      "In a file that is committed to the main branch",
      "In the browser, through the developer tools",
      "In the url of the deployed site",
      "In the settings of the hosting platform, per environment"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why use different secrets for preview and production?",
    "topic": "Environment variables",
    "choices": [
      "A leak or a mistake in preview cannot affect real customers",
      "Production secrets cannot be used in preview builds",
      "Preview builds are not allowed to read any variable",
      "The host rotates the secrets every time you deploy"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When is an environment variable read at build time versus runtime?",
    "topic": "Environment variables",
    "choices": [
      "It is always read at build time and is never read a second time",
      "It is always read at runtime, every time that a user visits",
      "It depends on whether the code runs while building or while serving requests",
      "It is read only once, at the moment when the repository is cloned"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you fail fast when a required variable is missing?",
    "topic": "Environment variables",
    "choices": [
      "Use an empty string and let the code carry on running without the variable",
      "Catch every error that happens in the app and ignore all of them silently",
      "Validate the environment at startup and throw a clear error",
      "Add the variable to the public bundle so that it is available as a fallback"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the principle of least privilege for API keys?",
    "topic": "Environment variables",
    "choices": [
      "Give each key only the permissions it needs, and nothing more",
      "Give each key every permission that exists so that nothing is ever blocked",
      "Share one single key between all of the services to keep the setup simple",
      "Remove the permissions from a key after it has been used for one request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a seed script used for?",
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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
    "topic": "Seeding data",
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

LAYER: remix-dev-6

```json
[
  {
    "stem": "What is a cookie based session?",
    "topic": "Cookie-based sessions",
    "choices": [
      "The browser stores the whole user record in local storage and sends it each time",
      "The server keeps the session only in memory without any cookie at all",
      "The server stores a small piece of identity data in a cookie that the browser sends with each request",
      "The session is a url parameter that is added to every link of the site"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which Remix helper creates a session storage that keeps data in the cookie itself?",
    "topic": "Cookie-based sessions",
    "choices": [
      "createCookieSessionStorage",
      "createSessionDatabase, which stores the session in a table",
      "makeCookieStore",
      "useCookieSession"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why sign the session cookie with a secret?",
    "topic": "Cookie-based sessions",
    "choices": [
      "The signature hides the contents of the cookie from the browser of the user",
      "Signing compresses the cookie so it is smaller",
      "Signing makes the cookie last for ever",
      "The server can detect a cookie that was changed by the user"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Where should the session secret be stored?",
    "topic": "Cookie-based sessions",
    "choices": [
      "In the root component of the app, so that all routes can read it from there",
      "In an environment variable on the server, never in the code",
      "In a public file in the repository for easy setup",
      "In localStorage of the browser for the next visit"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a loader or action read the session?",
    "topic": "Cookie-based sessions",
    "choices": [
      "Read the session from the params of the route",
      "Call getSession with the Cookie header of the request",
      "Read it from window.sessionStorage inside of the loader function on the server",
      "Call useSession inside the loader function"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does an action set a value in the session and save it?",
    "topic": "Cookie-based sessions",
    "choices": [
      "Assign the value to a global variable of the server",
      "Write the value to a file next to the route",
      "Call setItem on localStorage in the action",
      "session.set(key, value) and then return a response with a Set-Cookie header from commitSession"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the HttpOnly flag on the session cookie do?",
    "topic": "Cookie-based sessions",
    "choices": [
      "Scripts in the page cannot read it",
      "It makes the cookie work only over plain HTTP",
      "It stops the cookie from being sent to the server",
      "It deletes the cookie when the page is closed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the Secure flag do?",
    "topic": "Cookie-based sessions",
    "choices": [
      "The cookie is encrypted with the secret of the server",
      "The cookie cannot be changed by the server",
      "The cookie is sent only over HTTPS connections",
      "The cookie is shared with all subdomains"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does the SameSite attribute help with?",
    "topic": "Cookie-based sessions",
    "choices": [
      "Making the cookie bigger so it can hold more data",
      "Letting other sites read the cookie of the user",
      "Reducing cross site request forgery by limiting when the cookie is sent",
      "Keeping the cookie after the browser is closed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When is a database backed session better than data in the cookie?",
    "topic": "Cookie-based sessions",
    "choices": [
      "When you must revoke sessions on the server or store more data than a cookie can hold",
      "When you want the session to need no server at all",
      "When the session must be readable by the browser scripts",
      "When the app has no users"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What happens in a signup flow?",
    "topic": "Login and signup flows",
    "choices": [
      "The user types a password that is stored as plain text in the cookie",
      "The browser creates the account in local storage only",
      "The server sends the password back to the user to confirm it",
      "The user submits an email and password, and the server creates the account and starts a session"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a signup action validate?",
    "topic": "Login and signup flows",
    "choices": [
      "Only that the form has been submitted by a button",
      "The email format, the password rules and that the email is not already used",
      "Only that the browser supports cookies",
      "Only that the user is older than eighteen"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens in a login flow after the credentials are checked?",
    "topic": "Login and signup flows",
    "choices": [
      "The server sends the password hash to the browser",
      "The server creates a session and redirects to a protected page with a Set-Cookie header",
      "The server stores the credentials in the url",
      "The server deletes the account and creates a new one"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What message is best when the login fails?",
    "topic": "Login and signup flows",
    "choices": [
      "The exact field that failed, so the user can fix it quickly",
      "The stored hash of the password, for comparison",
      "The number of accounts with that email",
      "A generic message that does not say whether the email or the password was wrong"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should the login action redirect after success?",
    "topic": "Login and signup flows",
    "choices": [
      "A redirect after a post avoids a resubmission when the user reloads the page",
      "Redirects are required to set cookies in any browser",
      "The browser cannot show the result of an action to the user without a redirect",
      "Redirects speed up the database query"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should the login action do to the password after checking it?",
    "topic": "Login and signup flows",
    "choices": [
      "Save it in the session for the next request",
      "Send it to the loader of the next page",
      "Nothing is stored or logged",
      "Write it in the logs for debugging"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you prevent a logged in user from seeing the login page again?",
    "topic": "Login and signup flows",
    "choices": [
      "Hide the link to the login page in the navbar only",
      "Delete the login route after the first login",
      "Check the session in the loader of the login route and redirect to the dashboard",
      "Show an alert to the user in the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a redirectTo field in the login form help with?",
    "topic": "Login and signup flows",
    "choices": [
      "Sending the user back to the page they wanted after they sign in",
      "Sending the user to a random page of the site that is chosen by the server",
      "Storing the previous password of the user",
      "Choosing the language of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why limit login attempts?",
    "topic": "Login and signup flows",
    "choices": [
      "It makes the page load faster for each user",
      "It removes the need for hashing passwords",
      "It stops legitimate users from logging in at all",
      "It slows down guessing of passwords by attackers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice for the password field of a form?",
    "topic": "Login and signup flows",
    "choices": [
      "Use a text input so that the password is easy to read for the user",
      "Use type password and autocomplete values so password managers can help",
      "Send the password in the url for simplicity",
      "Store the password in a hidden field"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should passwords be hashed before being stored?",
    "topic": "Password hashing",
    "choices": [
      "So the stored passwords take up less space in the users collection",
      "So a database leak does not reveal the real passwords",
      "So users can read their passwords back after they have forgotten them",
      "So the server can include the password in the emails it sends out"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is bcrypt preferred over a plain fast hash like SHA 256 for passwords?",
    "topic": "Password hashing",
    "choices": [
      "It produces a shorter hash that takes up less space in the users collection",
      "It encrypts the password in a way that can be decrypted later by the server",
      "It does not need any random data, so the same input is always hashed alike",
      "It is deliberately slow and tunable, which makes guessing attacks costly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a salt?",
    "topic": "Password hashing",
    "choices": [
      "A random value added to each password so equal passwords hash differently",
      "A secret key that is stored only in the browser of the user who signs up",
      "A second password that the user must remember and enter after the first one",
      "A list of banned passwords that the server checks before it saves a new user"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does the cost factor in bcrypt control?",
    "topic": "Password hashing",
    "choices": [
      "How long the password that the user chooses is allowed to be at most",
      "How many users are allowed to log in at the same moment on the server",
      "How much work each hash takes, which slows attackers down",
      "The size of the database column that holds the stored hash of the password"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you check a login password against the stored bcrypt hash?",
    "topic": "Password hashing",
    "choices": [
      "Hash the password again with bcrypt.hash and compare strings directly",
      "Decrypt the stored hash and compare the result",
      "Use bcrypt.compare with the plain password and the stored hash",
      "Send the hash to the browser to compare"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does hashing the same password twice with bcrypt give different results?",
    "topic": "Password hashing",
    "choices": [
      "Each hash uses a new random salt",
      "The cost factor changes every time",
      "The algorithm is random by design for the whole result",
      "The database changes the value"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Is hashing the same as encryption?",
    "topic": "Password hashing",
    "choices": [
      "Yes, they are two names for the same operation on stored passwords",
      "Yes, but hashing is used only for files and encryption only for text",
      "No, hashing always needs a secret key, while encryption never needs one",
      "No, hashing is one way, while encryption can be reversed with a key"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which is a bad way to store passwords?",
    "topic": "Password hashing",
    "choices": [
      "Saving a bcrypt hash with a salt",
      "Saving them as plain text in the users collection",
      "Saving a hash from a slow algorithm built for passwords",
      "Saving a hash with a high cost factor"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should the login error say when the email or password is wrong?",
    "topic": "Password hashing",
    "choices": [
      "The exact field that failed, so the user knows what to correct next",
      "A generic message that does not say which of the two was wrong",
      "The stored hash of the password, so the user can compare it by hand",
      "The number of attempts that remain, and nothing else about the login"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does bcrypt include in its output string?",
    "topic": "Password hashing",
    "choices": [
      "Only the hash itself, with no other data stored beside it",
      "The original password, kept inside an encrypted block at the end",
      "The user id and the email address that the hash was made for",
      "The algorithm version, cost and salt, together with the hash"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you protect a loader so only signed in users can read the data?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "Read the session at the top and redirect to login when there is no user",
      "Hide the link to the page for the visitors who are not signed in to the app",
      "Check the session only in the component after render",
      "Add a comment to the loader that says it is private"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must an action check the session as well as the loader?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "Actions already trust the loader of the same route",
      "Loaders and actions share the same check automatically",
      "Actions are separate endpoints that anyone can post to",
      "Actions cannot read cookies at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Where is a good place for a requireUserId helper?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "Inside each component of the app",
      "In the public folder next to the images",
      "A server only module that routes import and call at the start of loaders and actions",
      "In the browser entry file of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should requireUserId do when the user is not signed in?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "Throw a redirect response to the login page",
      "Return an empty string and continue",
      "Log the error and then return the data of the page anyway to the visitor",
      "Show a popup in the browser"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What else must be checked besides being signed in when a user edits a record?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "That the record id is a number",
      "That the request uses the PUT method",
      "That the user has a long password",
      "That the record belongs to that user or the user has the right role"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the risk of trusting a user id sent in a form field?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "The id is always encrypted by the browser before the form is sent",
      "A user can change it and act as someone else",
      "Forms cannot send ids",
      "The id is removed by the router"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can several routes share one protection rule?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "Copy the check into every component by hand",
      "Put it in a layout route loader so all child routes are covered, and still check in actions",
      "Rely on the root layout only",
      "Disable the child routes for visitors"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Does a layout loader protect actions of the child routes?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "Yes, the layout loader runs before every action",
      "Yes, but only when the layout has an Outlet",
      "No, because actions do not exist in child routes",
      "No, each action is its own request"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which status or response fits a signed in user who is not allowed?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "403, since the user is known but lacks permission",
      "401, since the user is not known and must sign in to continue",
      "404, always",
      "200, with an empty body"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good response for an unauthenticated visit to a protected page?",
    "topic": "Protecting loaders and actions",
    "choices": [
      "A blank page with a 200 status",
      "The content of the page with all of its buttons disabled for the visitor",
      "A redirect to the login page, often with a redirectTo parameter",
      "A 500 error page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a component know who the signed in user is?",
    "topic": "Reading the user in routes",
    "choices": [
      "Components read the cookie directly with JavaScript",
      "Components ask the database on each render",
      "The root or layout loader returns the user, and components read it with a hook",
      "The user is stored in a global variable of the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the root loader return about the user?",
    "topic": "Reading the user in routes",
    "choices": [
      "Only safe fields such as id, name and email",
      "The whole user record including the password hash",
      "The session secret, so the client can verify it",
      "The raw cookie header of the request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why keep a useUser hook that wraps the root loader data?",
    "topic": "Reading the user in routes",
    "choices": [
      "It sends a request for each use",
      "It stores the user in a cookie",
      "It replaces the session on the server",
      "Components get a typed user in one place and fail clearly if there is none"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does useRouteLoaderData(\"root\") return?",
    "topic": "Reading the user in routes",
    "choices": [
      "The data of the current route only",
      "The data of the root loader, from any component below it",
      "The cookies of the browser",
      "The list of all route ids"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should happen when the session refers to a user that no longer exists?",
    "topic": "Reading the user in routes",
    "choices": [
      "Keep showing the old data from the cookie",
      "Treat it as signed out, clear the session and redirect to login",
      "Create a new user with the same id",
      "Crash the server so it can restart"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can a page show different content for signed in and signed out visitors?",
    "topic": "Reading the user in routes",
    "choices": [
      "Use two different domains for the two groups of visitors of the site",
      "Use a different build for signed in users",
      "Hide the content with CSS only",
      "Read the optional user in the loader and render by that value"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why is it better to load the user on the server than in a client effect?",
    "topic": "Reading the user in routes",
    "choices": [
      "The first HTML is already correct, without a flash of the wrong state",
      "Effects cannot read cookies",
      "Servers can render the user faster than the database is able to answer",
      "Client effects are not allowed in Remix"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between getUserId and requireUserId?",
    "topic": "Reading the user in routes",
    "choices": [
      "getUserId reads the cookie and requireUserId reads the user from the database",
      "They are the same function with two names",
      "getUserId returns the id or null, requireUserId redirects when there is none",
      "requireUserId works only in components"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should a user be refreshed after the profile changes?",
    "topic": "Reading the user in routes",
    "choices": [
      "Ask the user to log out and in again",
      "Edit the cookie in the browser by hand",
      "Revalidate the root loader, which happens after the action, so the UI updates",
      "Reload the whole site from the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which user data may safely be placed in the cookie session?",
    "topic": "Reading the user in routes",
    "choices": [
      "A small id, since the rest can be loaded from the database",
      "The password and the email",
      "The credit card number",
      "The whole user record with all of its fields, including the secret ones"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you log a user out?",
    "topic": "Logout and security",
    "choices": [
      "Delete the user from the database",
      "Close the browser tab of the user",
      "Change the secret of the server for everyone",
      "Destroy the session and redirect with a Set-Cookie header that clears the cookie"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should logout be a POST action and not a link?",
    "topic": "Logout and security",
    "choices": [
      "Links cannot send cookies",
      "A GET link can be triggered by another site and log the user out without consent",
      "Actions are faster than links",
      "Links are not allowed to redirect"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does cross site request forgery try to do?",
    "topic": "Logout and security",
    "choices": [
      "Steal the password from the database",
      "Make a signed in user send a request they did not intend",
      "Crash the server with many requests",
      "Read the source code of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does SameSite lax help against that attack?",
    "topic": "Logout and security",
    "choices": [
      "The cookie is encrypted for other sites",
      "The cookie is deleted after a minute",
      "The cookie is sent twice on cross site requests",
      "The cookie is not sent on most cross site requests that change data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should be done to protect forms from forgery when needed?",
    "topic": "Logout and security",
    "choices": [
      "Use SameSite cookies and, where required, a CSRF token that the server checks",
      "Hide the form from search engines",
      "Use a longer url for the action",
      "Disable the cookies of the site"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is session fixation?",
    "topic": "Logout and security",
    "choices": [
      "The session never expires",
      "The server runs out of sessions",
      "An attacker sets a known session id and the user logs in with it",
      "The cookie is stored in the url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How is session fixation avoided?",
    "topic": "Logout and security",
    "choices": [
      "Use shorter passwords",
      "Never use cookies",
      "Create a new session id on login and invalidate the old one",
      "Show the session id to the user"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why set an expiry on the session cookie?",
    "topic": "Logout and security",
    "choices": [
      "A stolen cookie stops working after some time",
      "The browser needs an expiry to store a cookie",
      "Expiry makes the cookie smaller",
      "Expiry encrypts the cookie"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should happen to the session when the user changes the password?",
    "topic": "Logout and security",
    "choices": [
      "Keep all sessions unchanged",
      "Send the new password in the cookie",
      "Delete the user account",
      "Invalidate the other sessions so old logins stop working"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why serve the app over HTTPS in production?",
    "topic": "Logout and security",
    "choices": [
      "HTTPS makes the server code run faster",
      "Cookies and form data travel encrypted and cannot be read on the way",
      "HTTPS lets the browser run more scripts",
      "HTTPS removes the need for a session"
    ],
    "answerIdx": 1
  }
]
```

LAYER: remix-dev-7

```json
[
  {
    "stem": "What is an error boundary in a Remix route?",
    "topic": "Error boundaries",
    "choices": [
      "A try and catch block that wraps the whole server of the application like a net",
      "A route that runs only when the app is offline in the browser",
      "A component exported as ErrorBoundary that renders when the route fails",
      "A hook that stores the errors of the page in a list for later"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What kinds of errors does a route ErrorBoundary catch?",
    "topic": "Error boundaries",
    "choices": [
      "Errors thrown in the loader, the action or the component of that route",
      "Only errors that come from the console of the browser of the user who is visiting",
      "Only errors in the CSS files that the route loads in the page",
      "Only errors that are thrown by the driver of the database"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which hook gives the boundary the error that was thrown?",
    "topic": "Error boundaries",
    "choices": [
      "useError",
      "useCaughtError",
      "useThrownValue",
      "useRouteError"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens when a route has no ErrorBoundary of its own?",
    "topic": "Error boundaries",
    "choices": [
      "The whole server stops until the problem has been fixed by hand",
      "The error bubbles up to the closest parent boundary, and finally to the root",
      "The route shows a blank page without any message at all",
      "The error is ignored and the old page stays visible to the user"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why is the root ErrorBoundary important?",
    "topic": "Error boundaries",
    "choices": [
      "It handles only the errors of the home page of the application",
      "It is the last safety net",
      "It replaces the need for any other boundary in the whole app",
      "It catches only the errors of the browser and not of the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an ErrorBoundary render in place of the route?",
    "topic": "Error boundaries",
    "choices": [
      "The whole app with the text of the error in the page title",
      "A copy of the previous page with the text of the error added",
      "A redirect to the home page of the site with a message",
      "A fallback UI for that part of the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Should the root ErrorBoundary render the html document?",
    "topic": "Error boundaries",
    "choices": [
      "Yes, when the root layout is the one that failed",
      "No, the browser always supplies the html element on its own",
      "No, only the Outlet of the root route is ever rendered",
      "Yes, but only while the app runs in development mode"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good fallback message for an unexpected error?",
    "topic": "Error boundaries",
    "choices": [
      "The full stack trace of the server, so the user can read it",
      "The database query that failed, together with its parameters",
      "A friendly message with a way to go back, without internal details",
      "An empty page with no text and no way to go back"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Do error boundaries catch errors in event handlers?",
    "topic": "Error boundaries",
    "choices": [
      "Yes, every error of every handler is caught",
      "Yes, but only when the handler is async",
      "No, handle those with try and catch inside the handler",
      "No, because handlers run on the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why place boundaries at several levels of the route tree?",
    "topic": "Error boundaries",
    "choices": [
      "A failure in one section does not take down the whole page",
      "Each boundary makes the page load faster",
      "The compiler needs one boundary for each route",
      "Boundaries are required for nested routes to render"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you signal an expected failure such as not found?",
    "topic": "Catch and thrown responses",
    "choices": [
      "return a string that says error from the loader function",
      "set a variable in the component and render it",
      "call console.error in the loader and carry on",
      "throw new Response with a status, for example 404"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does isRouteErrorResponse(error) tell you?",
    "topic": "Catch and thrown responses",
    "choices": [
      "The error was thrown by the browser and not by the server",
      "The error is a thrown response",
      "The error is a syntax error in the code of the route",
      "The error has already been logged by the server before"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does error.status contain for a thrown response?",
    "topic": "Catch and thrown responses",
    "choices": [
      "The line number where the error happened",
      "The HTTP status code, such as 404 or 403",
      "The time of the error in milliseconds",
      "The name of the route module"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a boundary tell a 404 from a 500?",
    "topic": "Catch and thrown responses",
    "choices": [
      "By reading the url in the address bar",
      "By counting the number of errors",
      "By asking the server again",
      "By reading the status of the thrown response"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is the difference between a thrown response and a thrown Error?",
    "topic": "Catch and thrown responses",
    "choices": [
      "A response is an expected, handled case",
      "They are the same and differ only in the name that is used",
      "A response is used only for redirects and never for errors",
      "A thrown Error is shown to the user as it is, with its stack"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can a loader throw a redirect?",
    "topic": "Catch and thrown responses",
    "choices": [
      "No, loaders can only return data and cannot send any kind of redirect at all",
      "Yes, but only from the root route of the application",
      "Yes, redirect returns a response that you can throw or return",
      "No, only actions may redirect, and loaders may not"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What happens when an action throws a response with status 400?",
    "topic": "Catch and thrown responses",
    "choices": [
      "The form shows the error by itself in every case without code",
      "The server stops processing all requests until it restarts",
      "The closest error boundary renders, unless you return the errors as data instead",
      "The loader of the page runs again without showing a message"
    ],
    "answerIdx": 2
  },
  {
    "stem": "When should you return validation errors as data and not throw them?",
    "topic": "Catch and thrown responses",
    "choices": [
      "For form errors that the same page should show next to the fields",
      "For missing records that need a full 404 page to be shown to the visitor",
      "For server crashes that need to be written to a log",
      "For redirects to another route after a successful change"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good use of a thrown 403 response?",
    "topic": "Catch and thrown responses",
    "choices": [
      "Showing a spinner while the data of the page is loading",
      "Redirecting to the home page without showing any message",
      "Clearing the session of the user after a failed request",
      "Showing a forbidden page when the user may not see the resource"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why include a statusText or message in thrown responses?",
    "topic": "Catch and thrown responses",
    "choices": [
      "The browser needs it to render the page",
      "The boundary can show a helpful message for that case",
      "It makes the response cacheable",
      "It selects the template for the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does status 404 mean?",
    "topic": "Status codes and headers",
    "choices": [
      "The request was valid and the resource was created",
      "The server could not find the requested resource",
      "The user must sign in first",
      "The server had an unexpected error"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does status 401 mean?",
    "topic": "Status codes and headers",
    "choices": [
      "The user is known but not allowed",
      "The resource moved to another url",
      "The request body is invalid",
      "The request lacks valid authentication"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does status 403 mean?",
    "topic": "Status codes and headers",
    "choices": [
      "The user is known but not allowed to do this",
      "The user must log in first before the server will answer",
      "The resource does not exist on the server for any user",
      "The request was too large for the server to accept"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which status fits a request with invalid data?",
    "topic": "Status codes and headers",
    "choices": [
      "200, since the request was received",
      "404, since the data was not found",
      "400, or 422 for validation failures",
      "500, since the server failed"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a 302 or 303 status with a Location header do?",
    "topic": "Status codes and headers",
    "choices": [
      "Stops the request with an error",
      "Caches the page for a year",
      "Redirects the browser to another url",
      "Sends the body in two parts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does an action redirect with 303 after a post?",
    "topic": "Status codes and headers",
    "choices": [
      "The browser follows with a GET",
      "303 is the only status code that browsers are able to understand",
      "It deletes the form data from the server after the request",
      "It makes the redirect permanent for all future visitors"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you set the Cache-Control header on a route response?",
    "topic": "Status codes and headers",
    "choices": [
      "Add a cache attribute to the Link component of the page that is shown",
      "Edit the favicon of the site that the browser requests",
      "Write the header as text inside of the component markup",
      "Export a headers function or return a Response with headers"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice for a custom error response body?",
    "topic": "Status codes and headers",
    "choices": [
      "Send the whole stack so that users can report the problem",
      "Keep it small and safe, with a status and a message and no internal details",
      "Send the source code of the loader that failed",
      "Send the session cookie of the user for debugging"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which header is used to tell the browser which type the body has?",
    "topic": "Status codes and headers",
    "choices": [
      "Accept-Language",
      "Content-Type",
      "Authorization",
      "Referer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the Retry-After header communicate on a 503 or 429 response?",
    "topic": "Status codes and headers",
    "choices": [
      "When the cookie of the session expires for the user",
      "Which route the client should open after the request",
      "How large the response body is in bytes",
      "How long the client should wait before trying again"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you show a not found page for a missing record?",
    "topic": "Not-found handling",
    "choices": [
      "Throw a 404 response in the loader, and render a friendly message in the boundary",
      "Return null and render a blank page with no message",
      "Redirect to the home page without any message to the user",
      "Log the error and keep the page empty for the visitor"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can an app show a not found page for urls that match no route?",
    "topic": "Not-found handling",
    "choices": [
      "By editing the favicon of the site to show an error",
      "By deleting all of the routes except the home route",
      "With a splat route, such as $.tsx, that throws a 404 response",
      "By returning a 200 page that has no content at all"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Should a not found page return a 404 status?",
    "topic": "Not-found handling",
    "choices": [
      "No, it should return 200 so that the page looks nicer",
      "No, it should return 301 and send visitors to the home page",
      "Yes, so that browsers and search engines know the page does not exist",
      "Yes, but only for users who are logged in to the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why is a soft 404, a 200 page that says not found, a problem?",
    "topic": "Not-found handling",
    "choices": [
      "Search engines may index pages that do not exist",
      "Browsers refuse to show such pages to any of the visitors",
      "The server logs of the site become empty for those pages",
      "They are slower to render than normal pages are"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What should a not found boundary offer the user?",
    "topic": "Not-found handling",
    "choices": [
      "A technical error message that shows the stack trace of the server in the page",
      "A countdown that runs before the page closes by itself",
      "Nothing, since the page that was asked for is missing",
      "A way to continue, such as a link to the home page or a search"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you distinguish a missing record from a missing route in a boundary?",
    "topic": "Not-found handling",
    "choices": [
      "They cannot be told apart in a boundary at all",
      "By the data or message of the thrown response, or by a custom boundary per route",
      "By the browser that the visitor is using at the moment",
      "By the time of day at which the error happened"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a 410 status mean compared with 404?",
    "topic": "Not-found handling",
    "choices": [
      "The resource has moved to a new url for good",
      "The resource is gone on purpose and will not return",
      "The resource requires a password before it can be read",
      "The resource is still being created by the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should the check for a missing record live?",
    "topic": "Not-found handling",
    "choices": [
      "In the component after it renders",
      "In the CSS of the route",
      "In the browser entry file",
      "In the loader, before the component renders"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What happens to the layout around a not found child?",
    "topic": "Not-found handling",
    "choices": [
      "The layout stays and the child area shows the not found UI",
      "The layout disappears and only the text of the error message is shown",
      "The layout shows a 500 error for the whole page",
      "The layout reloads the whole app from the beginning"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you test that a missing id shows the not found page?",
    "topic": "Not-found handling",
    "choices": [
      "Read the source code of the loader and trust that it works",
      "Check only the file names of the routes in the folder",
      "Request a url with an unknown id and check the 404 status and the page text",
      "Run the build and look at the size of the output"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does nested error isolation mean?",
    "topic": "Nested error isolation",
    "choices": [
      "Errors of children are always shown on the parent route",
      "All errors are sent to the root route and shown there",
      "An error in a child route is contained by its own boundary, and the rest of the page keeps working",
      "Errors are hidden from every route and only logged"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which route does an error bubble to when a child has no boundary?",
    "topic": "Nested error isolation",
    "choices": [
      "The nearest ancestor route that exports an ErrorBoundary",
      "The first sibling route in the list of files of the folder",
      "The home page of the application, whatever the route is",
      "The last route that was rendered without any error"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why does a sidebar stay usable when the main content fails?",
    "topic": "Nested error isolation",
    "choices": [
      "The sidebar is rendered by a separate server of its own",
      "The sidebar is cached in the browser for ever by default",
      "Errors do not affect the sidebar in any case at all",
      "The failing child route renders its boundary while the parent layout remains"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good place for a boundary in a dashboard?",
    "topic": "Nested error isolation",
    "choices": [
      "Only on the home page of the dashboard and on no other page",
      "On the dashboard layout and on risky child routes",
      "Only in the browser entry file of the application",
      "On every single component without any exception at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can one widget fail without breaking the page?",
    "topic": "Nested error isolation",
    "choices": [
      "Wrap the whole page in a try and catch in the root route",
      "Give it its own route or its own boundary",
      "Hide the widget with CSS when it takes too long",
      "Reload the whole page every second until it works"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does the errorElement of Await handle?",
    "topic": "Nested error isolation",
    "choices": [
      "Errors that are thrown by the loader of the root route",
      "Errors that happen in the build step of the project",
      "Errors that come from an extension of the browser",
      "A rejected deferred promise for that part of the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should the isolated error UI let the user do?",
    "topic": "Nested error isolation",
    "choices": [
      "Retry or navigate elsewhere, so they are not stuck",
      "Wait for a developer to fix it before they try again",
      "Close the browser and open the app again later",
      "Delete their account and register again with a new one"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why is isolating errors better for the user experience?",
    "topic": "Nested error isolation",
    "choices": [
      "Errors become invisible to the user, so nothing looks broken at all",
      "The server restarts faster",
      "Parts of the page that work stay usable",
      "The page loads without any data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a trade off of too many boundaries?",
    "topic": "Nested error isolation",
    "choices": [
      "The compiler will refuse to build the app at all",
      "The routes stop matching the urls of the visitors",
      "More code to maintain and inconsistent messages if they are not shared",
      "The browser blocks the page from loading its scripts"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can a boundary component be shared between routes?",
    "topic": "Nested error isolation",
    "choices": [
      "Export a reusable component and use it as the ErrorBoundary of several routes",
      "Copy the code of the error page into each route by hand",
      "Put the component in the public folder of the project",
      "Write the component in the package.json file"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why log errors on the server?",
    "topic": "Logging errors",
    "choices": [
      "Logs make the page load faster",
      "Logs are required by the browser",
      "Logs are shown to the user as a receipt",
      "Developers can find and fix failures that users hit"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should an error log entry include?",
    "topic": "Logging errors",
    "choices": [
      "The password of the user who hit the error on the page",
      "The error, the stack, the route and request context",
      "The full cookie header of the request, for later checks",
      "Only the word error, with no other information at all"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which Remix export lets you handle errors on the server for logging?",
    "topic": "Logging errors",
    "choices": [
      "logError in root.tsx",
      "handleError in entry.server",
      "catchAll in the routes folder",
      "onFail in the loader"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does an error monitoring service such as Sentry do?",
    "topic": "Logging errors",
    "choices": [
      "Writes the code of the error boundaries for your routes",
      "Hosts the database of your app on its own servers",
      "Compresses the errors before they have a chance to happen",
      "Collects errors with stack traces and context and groups them for you"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why mask sensitive data in logs?",
    "topic": "Logging errors",
    "choices": [
      "Logs can be read by many people and stored for a long time",
      "Masked data is faster to write to the log file",
      "Logs cannot hold long values, so any secret must be removed from them first",
      "Browsers refuse to show masked data in any of the logs"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a request id useful for in logs?",
    "topic": "Logging errors",
    "choices": [
      "It makes the request itself faster for the user",
      "It encrypts the whole log file of the server",
      "You can follow one request across several log lines and services",
      "It limits the number of requests a user can make"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you tell expected errors, like 404, from real failures in logs?",
    "topic": "Logging errors",
    "choices": [
      "Log everything at the same level, whatever its kind is",
      "Do not log anything, since errors are shown in the browser",
      "Log expected responses at a low level and unexpected errors with their stack as errors",
      "Log only the 404 responses and ignore all of the others"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the user see when an unexpected error is logged?",
    "topic": "Logging errors",
    "choices": [
      "A generic message, since details belong in the logs",
      "The stack trace, so that users can help with debugging",
      "The log file of the server, for them to read",
      "The environment variables of the server, to explain the cause"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can the client report an error to monitoring?",
    "topic": "Logging errors",
    "choices": [
      "Write the error in the url of the next request",
      "Store the error in the cookie of the visitor",
      "Ask the user to email the output of the console",
      "Send it from the root ErrorBoundary or a client entry hook with a reporting call"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a benefit of source maps for production errors?",
    "topic": "Logging errors",
    "choices": [
      "They make the bundle smaller, so it loads faster",
      "Minified stack traces can be mapped back to the original files and lines",
      "They hide the code from the users of the site",
      "They speed up the build step of the project"
    ],
    "answerIdx": 1
  }
]
```

LAYER: remix-dev-8

```json
[
  {
    "stem": "What is useFetcher used for in Remix?",
    "topic": "useFetcher for background work",
    "choices": [
      "Navigating to a new page with a different url and a new history entry",
      "Fetching files from the file system of the server for the page",
      "Calling loaders and actions without navigating, for background work",
      "Replacing the Link component in the navigation of the whole app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does fetcher.Form do?",
    "topic": "useFetcher for background work",
    "choices": [
      "Submits to an action without changing the url or the history",
      "Submits a form and always reloads the whole page",
      "Creates a form that works only for the server",
      "Replaces every other form on the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does fetcher.load do?",
    "topic": "useFetcher for background work",
    "choices": [
      "Loads a script into the head of the page when the route renders",
      "Loads the next page of the app into a new tab of the browser",
      "Reloads the loader of the current page and changes the url as well",
      "Calls a loader of a route in the background and stores the result in the fetcher"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does fetcher.data contain?",
    "topic": "useFetcher for background work",
    "choices": [
      "The list of all of the fetchers that are currently running on the page now",
      "The result of the last loader or action call made with that fetcher",
      "The url of the last navigation that the user made in the app",
      "The state of the form fields that the user is typing into"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What values can fetcher.state have?",
    "topic": "useFetcher for background work",
    "choices": [
      "open, closed and waiting",
      "idle, loading and submitting",
      "ready, running and failed, which describe the stages of a build",
      "start, middle and end"
    ],
    "answerIdx": 1
  },
  {
    "stem": "When is a fetcher a better choice than a normal Form?",
    "topic": "useFetcher for background work",
    "choices": [
      "For every form of the app, without any exception for plain forms",
      "For signing the user out of the app and for nothing else",
      "For links that move the user to other pages of the site",
      "For actions that should not change the page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Does a fetcher submission revalidate the page loaders?",
    "topic": "useFetcher for background work",
    "choices": [
      "Yes, after an action finishes the loaders are revalidated",
      "No, fetchers never revalidate anything after the action has finished",
      "Only the root loader runs again, and none of the others",
      "Only when the fetcher has gone back to the idle state again"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Can several fetchers on one page run at the same time?",
    "topic": "useFetcher for background work",
    "choices": [
      "No, only one single fetcher may exist on each page of the app",
      "Yes, but they share one state",
      "Yes, each fetcher has its own state and data",
      "No, they run one after another only"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How can you load data for a combobox as the user types?",
    "topic": "useFetcher for background work",
    "choices": [
      "Reload the whole page on every keystroke that the user types",
      "Use a form with method post on each key that is pressed",
      "Use a fetcher with load and the search param, pointing at a resource route",
      "Fetch all of the records into the page first, then filter them"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should the UI do while a fetcher is submitting?",
    "topic": "useFetcher for background work",
    "choices": [
      "Show a pending state, such as a disabled button or a spinner on that item",
      "Block the whole page with a modal until the work has finished",
      "Hide all of the other content until the fetcher is idle again",
      "Do nothing visible and simply wait for the server to answer"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is an optimistic UI?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "The interface waits for the server before it shows any change",
      "The interface hides all errors from the user",
      "The interface refreshes itself every minute",
      "The interface shows the expected result right away, before the server confirms"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How does Remix help to build an optimistic UI?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "It guesses the result of each action by itself, with no input",
      "You can read fetcher.formData, or navigation.formData, to render the pending result",
      "It stores the result of the action in a cookie of the user",
      "It skips the action and updates the loader data directly"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What happens to the optimistic value when the action succeeds?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "It stays on the screen for ever, with no refresh of the data",
      "It is replaced by the real data from the revalidated loaders",
      "It is sent to the server again as a new submission",
      "It is deleted and the item disappears from the list"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should happen when the action fails after an optimistic update?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "The wrong value stays on the screen",
      "The page reloads and clears the input of the user",
      "The action is retried for ever",
      "The UI returns to the real data and shows an error message"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which actions suit an optimistic UI best?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "Simple, likely to succeed ones",
      "Payments and irreversible deletions",
      "Actions that need server side checks to know the result",
      "Actions with random results"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you derive the optimistic state of a toggle from a fetcher?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "Read the previous value from the url of the page that is open",
      "Ask the server for the answer first and then update the screen",
      "Read the submitted value from fetcher.formData while the fetcher is pending",
      "Use a random value until the real data of the server arrives"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why does the optimistic value need no extra state variable in Remix?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "Remix stores the pending data in the database of the app",
      "The browser stores the pending data in its local storage",
      "The pending submission data is already available from the fetcher",
      "It is computed by the compiler at build time for each route of the app"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a downside of optimistic updates?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "The UI may show a result that the server later rejects",
      "They always make the page slower than a normal submission would be",
      "They cannot be used together with forms of any kind",
      "They need no error handling since the server never rejects a change"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What helps the user understand a rolled back optimistic update?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "A silent change back to the old value with no message at all",
      "A blank screen until the user reloads the page by hand",
      "A page reload that shows no text about what went wrong",
      "A clear message that says the change could not be saved"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which UX detail makes an optimistic list item feel natural?",
    "topic": "Optimistic UI patterns",
    "choices": [
      "Hiding the list until the server has answered the request of the user",
      "Showing the new item immediately with a subtle pending style",
      "Moving the new item to the end of the list of items",
      "Showing the new item twice, once as a copy for safety"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you let browsers cache a loader response?",
    "topic": "HTTP caching headers",
    "choices": [
      "Add a cache attribute to the loader function",
      "Return or export Cache-Control headers for the route",
      "Save the data in a global variable",
      "Write the data to a cookie"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does Cache-Control: max-age=60 mean?",
    "topic": "HTTP caching headers",
    "choices": [
      "The response is deleted from the cache after 60 requests",
      "The response is valid for 60 users and then it expires",
      "The response must be fetched 60 times before it is reused",
      "The response may be reused for 60 seconds without asking the server"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does stale-while-revalidate allow?",
    "topic": "HTTP caching headers",
    "choices": [
      "Serving a stale response while a fresh one is fetched in the background",
      "Serving only fresh responses at any time and never a stale one",
      "Removing the whole cache after each request that is made",
      "Revalidating with the browser only and never with the server"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why must you be careful when caching responses that depend on the user?",
    "topic": "HTTP caching headers",
    "choices": [
      "Personal data cannot be cached by browsers at all in any situation",
      "Caching removes cookies from the request",
      "A shared cache could serve one user data to another user",
      "User data is public by default"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which directive keeps a response private to the browser of one user?",
    "topic": "HTTP caching headers",
    "choices": [
      "public",
      "shared",
      "private",
      "no-origin"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which directive stops any caching of a response?",
    "topic": "HTTP caching headers",
    "choices": [
      "no-store",
      "max-age=0 with public",
      "immutable",
      "s-maxage"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the purpose of an ETag header?",
    "topic": "HTTP caching headers",
    "choices": [
      "It encrypts the response body so that others cannot read it",
      "It names the route that produced the response for logging",
      "It sets the language of the page for the visitor",
      "It lets the client ask whether a resource changed"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does an immutable fingerprinted asset allow?",
    "topic": "HTTP caching headers",
    "choices": [
      "No caching at all, since the file name changes on every build",
      "A very long cache time",
      "A cache that is cleared on every visit of the user",
      "Caching only on the server and never in the browser"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which layer can cache your Remix responses besides the browser?",
    "topic": "HTTP caching headers",
    "choices": [
      "The database itself, which keeps a copy of every response",
      "A CDN or reverse proxy in front of the server",
      "The stylesheet of the page, which stores the responses",
      "The package manager that installs the dependencies of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why combine HTTP caching with revalidation after mutations?",
    "topic": "HTTP caching headers",
    "choices": [
      "Caching removes the need for actions",
      "Revalidation deletes the cache of the browser",
      "They cannot be combined",
      "Reads stay fast, while changes still show up after an action"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does prefetching do in Remix?",
    "topic": "Prefetching",
    "choices": [
      "Loads data and assets for a route before the user navigates to it",
      "Deletes old data from the cache before it becomes stale",
      "Prevents a route from loading until the user is signed in",
      "Loads the next page of the database into memory for later"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which Link prop controls prefetching?",
    "topic": "Prefetching",
    "choices": [
      "preload",
      "ahead",
      "prefetch",
      "fetchEarly"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does prefetch=\"render\" do?",
    "topic": "Prefetching",
    "choices": [
      "Prefetches on hover only",
      "Never prefetches",
      "Prefetches as soon as the link is rendered",
      "Prefetches only when the user clicks the link and the page starts to load"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why might you avoid prefetching every link?",
    "topic": "Prefetching",
    "choices": [
      "It can waste bandwidth and server work for pages the user never opens",
      "It makes the page load slower in every case without exception",
      "It stops the links from working until the data has arrived",
      "Browsers do not support it, so it has no effect at all"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good moment to prefetch a likely next page?",
    "topic": "Prefetching",
    "choices": [
      "When the page is first loaded, for every link that it contains",
      "After the user has already left the site for another one",
      "Never, because prefetching is unsafe for every kind of page",
      "When the user hovers or focuses the link, which signals intent"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What gets prefetched with a Link in Remix?",
    "topic": "Prefetching",
    "choices": [
      "Only the images of the target page and nothing else of it",
      "The route modules and loader data for the target",
      "The whole database of the app, so queries are instant later",
      "Only the title of the page that the link points to"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does prefetching interact with HTTP caching?",
    "topic": "Prefetching",
    "choices": [
      "Prefetching ignores all of the cache headers that you have set",
      "Prefetched responses benefit from the cache headers you set",
      "Prefetching deletes the cache of the browser for the route",
      "Prefetching requires no headers on the server of the app"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What can prefetching improve?",
    "topic": "Prefetching",
    "choices": [
      "The size of the bundle",
      "The number of routes",
      "The strength of passwords",
      "The perceived speed of navigation"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should be considered for prefetching on slow or limited connections?",
    "topic": "Prefetching",
    "choices": [
      "Respect data saving settings and avoid heavy prefetches",
      "Always prefetch everything, whatever the connection of the user is",
      "Disable the network of the browser while prefetching runs",
      "Use larger images so that fewer requests are needed"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you check what a page prefetches?",
    "topic": "Prefetching",
    "choices": [
      "Count the number of files in the routes folder of the project",
      "Read the package.json file of the project for prefetch settings",
      "Look at the network tab for requests made before the click",
      "Check the favicon of the site in the tab of the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a resource route?",
    "topic": "Resource routes",
    "choices": [
      "A route that renders a page together with a layout and a navbar",
      "A route that is stored in the public folder of the project",
      "A route without a default component that returns a response",
      "A route that only redirects the visitor to another url"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you create a resource route?",
    "topic": "Resource routes",
    "choices": [
      "Export a loader or an action and no default component",
      "Name the file resource.tsx and add a component",
      "Place the file in the public folder",
      "Add a resource prop to Link"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a typical use of a resource route?",
    "topic": "Resource routes",
    "choices": [
      "A page with a header, a footer and some text content",
      "A layout for the dashboard that wraps all of its child routes in one place",
      "A styled button component that is used in many pages",
      "An endpoint for JSON data, a webhook, a pdf or an image"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a resource route be called from the page?",
    "topic": "Resource routes",
    "choices": [
      "Only from the server loader of the same route",
      "With a fetcher, or with a plain fetch or link to its url",
      "Only through a form on the root route",
      "It cannot be called from the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How do you return JSON from a resource route?",
    "topic": "Resource routes",
    "choices": [
      "Return a React element that the server renders as HTML",
      "Return a Response with a JSON body, or a data helper that does it",
      "Call console.log with the object and read it in the logs",
      "Write the object into the url of the next request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why use a resource route for webhooks?",
    "topic": "Resource routes",
    "choices": [
      "Webhooks need a layout to render before they can be received",
      "Webhooks must run in the browser of the user who triggers the event",
      "Webhooks need a form on the page that the provider can submit",
      "Webhooks need a plain endpoint that returns a response, not a page"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should a webhook resource route verify?",
    "topic": "Resource routes",
    "choices": [
      "The signature of the request",
      "The colour theme that the user has chosen in the settings",
      "The language that the browser of the user has set",
      "The cookie of the visitor who sent the request"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How do you serve a file download from a resource route?",
    "topic": "Resource routes",
    "choices": [
      "Link to the folder of the route and let the browser list it",
      "Return a component that renders an anchor to the file",
      "Return a Response with the file body and the right Content-Type and Content-Disposition",
      "Store the file in a cookie and read it in the browser"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Do resource routes appear in the page navigation?",
    "topic": "Resource routes",
    "choices": [
      "Yes, they are shown in the main menu",
      "Yes, as the first route",
      "No, they have no UI and are called as endpoints",
      "Only for admins"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why keep an api like route inside the same Remix app?",
    "topic": "Resource routes",
    "choices": [
      "It shares the database code and the session handling with the pages",
      "It avoids the need for a server for the whole application",
      "It runs in the browser of the visitor and not on the server",
      "It makes the whole app static and removes the loaders"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a drawback of offset pagination for large tables?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "It cannot return more than ten rows for each page it serves",
      "It needs a brand new database connection for every page",
      "It works only for tables that have no primary key at all",
      "Skipping many rows gets slower, and results can shift when data changes"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is cursor based pagination?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "Counting pages by a number in the url only",
      "Continuing from the last item seen, using a cursor such as an id",
      "Loading every row and slicing it in the browser",
      "Using a random start point for each page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where should the page number or cursor be kept in a Remix app?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "In a global variable that lives on the server of the app",
      "In the url search params",
      "In a hidden field only, which the browser forgets on reload",
      "In the cookie of the user, as a number"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does a loader paginate?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "Return all of the rows and let the component slice the list",
      "Fetch each page in a separate action with a post request",
      "Store each page in the session of the user as it loads",
      "Read page or cursor from the search params and query a slice of the data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you build an infinite list with Remix?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "Use a fetcher to load the next page and append the data to the list",
      "Reload the whole page when the user reaches the bottom of it",
      "Return all of the rows from the loader in a single response",
      "Use many separate routes, one for each row of the list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What can trigger loading the next page?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "A timer that runs every second and loads one more page",
      "A cookie that stores the number of the current page",
      "A button, or an observer that sees the end of the list",
      "A redirect to the first page of the list at the end"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How do you avoid duplicate items in an infinite list?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "Load every page at the same time so there are no gaps",
      "Sort the items by a random value for each page",
      "Use a cursor and a stable sort, and merge items by id",
      "Ignore the problem, since duplicates never appear in practice"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why include the total or a hasMore flag in the loader data?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "The UI knows when to stop loading more",
      "The server needs it to start the query",
      "It makes the request smaller",
      "It hides the list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a good practice for list keys when appending pages?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "Use the index of the item",
      "Use a random number each render",
      "Use the page number",
      "Use the stable id of each item as the key"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is page based pagination better than infinite scrolling?",
    "topic": "Pagination and infinite lists",
    "choices": [
      "When the list has only a few items and fits on one screen",
      "When users need to jump to a page or share a position in the list",
      "When the data never changes, so the order stays the same",
      "When there is no server and everything runs in the browser"
    ],
    "answerIdx": 1
  }
]
```

LAYER: remix-dev-9

```json
[
  {
    "stem": "What is the idea behind utility first CSS as used by Tailwind?",
    "topic": "Tailwind integration",
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
    "topic": "Tailwind integration",
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
    "topic": "Tailwind integration",
    "choices": [
      "It compresses every class into a single shared rule",
      "It removes whitespace from the HTML that is sent to browsers on each request",
      "It loads the classes from a CDN only when they are used",
      "It generates only the classes that it finds in your source files"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a variant such as hover:bg-blue-500 do?",
    "topic": "Tailwind integration",
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
    "topic": "Tailwind integration",
    "choices": [
      "Template literals are not allowed inside a className prop",
      "Tailwind scans for complete class names",
      "Tailwind refuses to use classes that contain a number",
      "The browser cannot handle a class name that is built at runtime"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a downside people raise about utility classes?",
    "topic": "Tailwind integration",
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
    "topic": "Tailwind integration",
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
    "topic": "Tailwind integration",
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
    "topic": "Tailwind integration",
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
    "topic": "Tailwind integration",
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
      "With a special component that swaps the layouts for phones and desktops",
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
    "stem": "What is a design system in code?",
    "topic": "Reusable styled components",
    "choices": [
      "A folder that holds the final screenshots of every page",
      "A set of reusable components and tokens that keep the UI consistent",
      "A database of the colours that were used in the past",
      "A tool that converts designs into pages without any developer"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why build a Button component instead of repeating classes everywhere?",
    "topic": "Reusable styled components",
    "choices": [
      "Buttons cannot be created without a component in React",
      "The browser caches components and ignores repeated class names",
      "Tailwind requires a component for every element that has a class",
      "One place defines the style and behaviour"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a variant prop, such as variant=\"primary\", used for?",
    "topic": "Reusable styled components",
    "choices": [
      "Selecting one of several predefined looks for a component",
      "Choosing which version of React the component should use",
      "Setting the url that the component links to",
      "Marking the component as available only for administrators"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a helper like class-variance-authority or clsx help with?",
    "topic": "Reusable styled components",
    "choices": [
      "Compressing class names into shorter strings at build time",
      "Checking class names for spelling mistakes while typing",
      "Combining class names conditionally in a readable way",
      "Loading the classes from the server on demand"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why use tailwind-merge when merging class names?",
    "topic": "Reusable styled components",
    "choices": [
      "It removes unused classes from the final stylesheet",
      "It converts all of the classes into inline styles for faster rendering",
      "It resolves conflicts so that the last conflicting utility wins",
      "It sorts the classes alphabetically in the markup"
    ],
    "answerIdx": 2
  },
  {
    "stem": "How should a reusable component accept extra class names?",
    "topic": "Reusable styled components",
    "choices": [
      "Take a className prop and merge it with its own classes",
      "Ignore any className and always use its own classes",
      "Read the class names from the url of the page",
      "Copy the class names of the parent component at runtime"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the benefit of CSS variables for theme values?",
    "topic": "Reusable styled components",
    "choices": [
      "They are faster than any other way of writing a colour in a stylesheet",
      "They are required by Tailwind in order to generate all of its classes",
      "They stop the browser from caching the stylesheet of the application",
      "Values can change at runtime"
    ],
    "answerIdx": 3
  },
  {
    "stem": "When is it a good time to turn markup into a component?",
    "topic": "Reusable styled components",
    "choices": [
      "When it is longer than a single line of markup in the file where it lives",
      "When it repeats, or has behaviour and state that you want in one place",
      "When it contains any text that a user of the page is able to read",
      "When it is used by only one single page and is never going to change"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does composing small components give you in a design system?",
    "topic": "Reusable styled components",
    "choices": [
      "Fewer files, because small components are merged together by the compiler",
      "Larger parts, such as a card, built from consistent smaller parts",
      "Components that cannot be reused outside of the folder where they are defined",
      "Pages that do not need any layout files in order to be rendered by Next.js"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why document components, for example in Storybook?",
    "topic": "Reusable styled components",
    "choices": [
      "The browser needs the documentation in order to render the component at all",
      "The documentation is required before the package can be published to npm",
      "It makes the components load faster for the visitors in production",
      "Others can see the variants and states and use them correctly"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which route export adds stylesheets to the head for a route?",
    "topic": "Asset and link optimization",
    "choices": [
      "links, which returns link descriptors",
      "styles, which returns a string of css for the route",
      "head, which returns a style tag",
      "assets, which returns a file list"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why do route links functions help performance?",
    "topic": "Asset and link optimization",
    "choices": [
      "All of the stylesheets are loaded on the first page for every visitor",
      "Stylesheets are inlined into every script",
      "The stylesheet of a route is added only when that route renders",
      "They remove all CSS from the page"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is the benefit of importing a CSS file with a url in Remix?",
    "topic": "Asset and link optimization",
    "choices": [
      "The file is deleted after the first load",
      "The file is turned into JavaScript",
      "The build fingerprints the file",
      "The file is sent only to the server"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does a fingerprinted file name, such as app-4f2a1c.css, enable?",
    "topic": "Asset and link optimization",
    "choices": [
      "Long caching, since a new name appears when the content changes",
      "A shorter file size",
      "A faster database",
      "A private file that others cannot download"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can you preload an important asset such as a font?",
    "topic": "Asset and link optimization",
    "choices": [
      "Add it to the end of the body in the component",
      "Import it in the server entry file",
      "Write the font file name in the url",
      "Return a link descriptor with rel preload from links"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why set width and height on images?",
    "topic": "Asset and link optimization",
    "choices": [
      "Images need the size to be downloaded at all",
      "The browser reserves space, which avoids layout shift while the image loads",
      "The size makes the image look sharper",
      "The server resizes the image for each request"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does loading=\"lazy\" do on an image?",
    "topic": "Asset and link optimization",
    "choices": [
      "Loads the image with a lower quality forever",
      "Delays loading until the image is near the viewport",
      "Loads the image on the server only",
      "Blocks the page until the image is loaded"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which image format usually gives smaller files than JPEG for photos at the same quality?",
    "topic": "Asset and link optimization",
    "choices": [
      "BMP",
      "TIFF",
      "GIF",
      "WebP or AVIF"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why avoid loading large scripts on every route?",
    "topic": "Asset and link optimization",
    "choices": [
      "They slow down the first load and the time to interact",
      "Browsers refuse to run large scripts",
      "They break routing",
      "They disable caching"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Remix do to split code by route?",
    "topic": "Asset and link optimization",
    "choices": [
      "It puts all of the code in a single file",
      "It removes unused routes from the url",
      "It creates a bundle for each route module",
      "It loads every route in parallel at start"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What do Core Web Vitals measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "The number of lines in the code",
      "The size of the git repository",
      "Real user experience of loading, interactivity and visual stability",
      "The speed of the build step"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What does Largest Contentful Paint measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "How long the main content takes to appear",
      "How long the server takes to start",
      "How many images are on the page",
      "The time the user stays on the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does Cumulative Layout Shift measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "How many layouts the app has",
      "How often the user scrolls",
      "How many routes are nested",
      "How much content moves unexpectedly while the page loads"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does Interaction to Next Paint measure?",
    "topic": "Core Web Vitals",
    "choices": [
      "How fast the database answers",
      "How quickly the page responds visually to user interactions",
      "How long the first byte takes",
      "How many forms are on the page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Which change often improves Largest Contentful Paint?",
    "topic": "Core Web Vitals",
    "choices": [
      "Adding more scripts to the head",
      "Serving the main image or text early, with fast server responses and caching",
      "Removing all CSS from the page",
      "Using larger images"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How does server rendering help the first paint?",
    "topic": "Core Web Vitals",
    "choices": [
      "The browser skips parsing the HTML",
      "The server hides the content until the scripts load",
      "Server rendering removes the need for CSS",
      "The HTML contains the content"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can heavy client code hurt interactivity?",
    "topic": "Core Web Vitals",
    "choices": [
      "Long tasks block the main thread",
      "It makes the server slower",
      "It increases the number of cookies",
      "It changes the url of the page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is the difference between lab and field data?",
    "topic": "Core Web Vitals",
    "choices": [
      "Lab data is from users, field data is from developers",
      "They are the same measures",
      "Lab data comes from controlled tests, field data comes from real users",
      "Field data is always better than lab data"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which tool gives lab data for a page?",
    "topic": "Core Web Vitals",
    "choices": [
      "The package manager",
      "A git client",
      "Lighthouse",
      "A text editor"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why reduce the number of third party scripts?",
    "topic": "Core Web Vitals",
    "choices": [
      "They add network and main thread cost and can hurt every vital",
      "They are required to be at the top of the body",
      "They improve the layout shift",
      "They make the server faster"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Which route export defines the title and meta tags of a page?",
    "topic": "SEO meta and links",
    "choices": [
      "head, which returns a string of HTML",
      "title, which returns a text",
      "seo, which returns an object",
      "meta, which returns an array of tag descriptors"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why should every page have a unique title and description?",
    "topic": "SEO meta and links",
    "choices": [
      "Browsers refuse to open duplicates",
      "Search results and shared links show them",
      "Search engines delete pages with duplicate titles",
      "The router needs unique titles to match routes"
    ],
    "answerIdx": 1
  },
  {
    "stem": "How can the meta of a page use the loader data?",
    "topic": "SEO meta and links",
    "choices": [
      "The meta function must fetch the data again from the client",
      "The meta function receives the data of the loader",
      "The meta function cannot read any data",
      "The meta function runs before the loader on the server"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What are Open Graph tags used for?",
    "topic": "SEO meta and links",
    "choices": [
      "Setting the colours of the page",
      "Defining the routes of the site",
      "Blocking crawlers from the page",
      "Controlling how a link looks when it is shared on social platforms"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a canonical link tell search engines?",
    "topic": "SEO meta and links",
    "choices": [
      "Which url is the preferred version of the page",
      "Which language the page uses",
      "Which stylesheet to load",
      "Which route is the parent"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What does a robots meta tag with noindex do?",
    "topic": "SEO meta and links",
    "choices": [
      "Hides the page from users",
      "Blocks the page for bots only on the server",
      "Asks search engines not to include the page in results",
      "Makes the page load faster"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why do server rendered pages help SEO?",
    "topic": "SEO meta and links",
    "choices": [
      "Search engines reject all JavaScript",
      "Server pages are ranked higher by rule",
      "Crawlers get the content in the HTML without running client code",
      "The server rewrites the content with keywords"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a sitemap for?",
    "topic": "SEO meta and links",
    "choices": [
      "Listing urls so crawlers can find and index them",
      "Showing visitors a map of the menu",
      "Compressing pages",
      "Hiding private pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How can a resource route generate a sitemap?",
    "topic": "SEO meta and links",
    "choices": [
      "Write the sitemap in the favicon",
      "Add it to the package.json",
      "Store it in a cookie",
      "Return an XML response from a route such as sitemap.xml"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does the alt text of an image add for SEO and accessibility?",
    "topic": "SEO meta and links",
    "choices": [
      "A tooltip for all users",
      "A text description that crawlers and screen readers can use",
      "The file name of the image",
      "The size of the image"
    ],
    "answerIdx": 1
  }
]
```

LAYER: remix-dev-10

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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "It checks one single function in isolation from all of the others",
      "It checks a whole flow",
      "It runs faster than any unit test that is part of the project",
      "It needs no running server and no database in order to work"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why prefer role or label based locators in Playwright?",
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
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
    "topic": "End-to-end tests with Playwright",
    "choices": [
      "The size of the bundle that was built for the test",
      "Traces, screenshots and video that Playwright can record",
      "The list of dependencies in the lock file",
      "The number of lines that the test file contains"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you consider when choosing where to deploy a Remix app?",
    "topic": "Choosing a deployment target",
    "choices": [
      "Only the colour of the dashboard of the host",
      "The runtime it needs, such as Node or an edge runtime, plus cost, scale and database location",
      "Only the name of the company that owns the host",
      "Whether the host allows emojis in logs"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What does a Remix adapter do?",
    "topic": "Choosing a deployment target",
    "choices": [
      "Converts the app into a mobile application",
      "Replaces the database driver of the app",
      "Adds a CSS framework to the project",
      "Connects the Remix request handler to a specific server or platform"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Which kind of host runs a long lived Node server for a Remix app?",
    "topic": "Choosing a deployment target",
    "choices": [
      "A server or container host",
      "A pure static file host",
      "A CDN that stores only images",
      "A DNS provider"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a benefit of deploying to the edge?",
    "topic": "Choosing a deployment target",
    "choices": [
      "Unlimited memory for heavy tasks",
      "Direct access to the local file system",
      "Low latency, since the code runs close to the user",
      "One database connection shared by all regions"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What is a drawback of the edge runtime for a Remix app?",
    "topic": "Choosing a deployment target",
    "choices": [
      "It cannot serve any HTML",
      "It cannot read cookies",
      "Fewer Node APIs and limits, and the database may be far from the code",
      "It needs a different programming language"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What fits serverless functions well?",
    "topic": "Choosing a deployment target",
    "choices": [
      "Spiky traffic, with pay per use and no server to manage",
      "Long running jobs that last for hours",
      "Apps that need a permanent local disk",
      "Apps with a permanent socket connection"
    ],
    "answerIdx": 0
  },
  {
    "stem": "When might a container or server host be a better choice than serverless?",
    "topic": "Choosing a deployment target",
    "choices": [
      "When the app has no traffic",
      "When the app is only static",
      "When the app has no database",
      "When the app needs long connections, steady load or full Node features"
    ],
    "answerIdx": 3
  },
  {
    "stem": "Why place the app near the database?",
    "topic": "Choosing a deployment target",
    "choices": [
      "The database refuses distant clients",
      "Each loader call to the database is fast",
      "The database needs the app to be on the same network card",
      "It reduces the size of the bundle"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What should you check before picking a host?",
    "topic": "Choosing a deployment target",
    "choices": [
      "Whether the host logo matches your brand",
      "Whether it supports your runtime, build step, environment variables and database access",
      "Whether it has a mobile app",
      "Whether it uses the same editor as you"
    ],
    "answerIdx": 1
  },
  {
    "stem": "What is a sensible first deployment for learning and small apps?",
    "topic": "Choosing a deployment target",
    "choices": [
      "A hand built data center",
      "A server in a closet",
      "A static host without a server",
      "A managed platform with Git based deploys and preview urls"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How do you set environment variables for a project on Vercel?",
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
    "choices": [
      "Logs make the build slower when they hold long values",
      "Build logs are deleted when they contain a secret",
      "Secrets are always encrypted in logs by the host",
      "Logs can be read by others"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What should the app do if a required variable is missing at startup?",
    "topic": "Environment variables in production",
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
    "topic": "Environment variables in production",
    "choices": [
      "By storing them in the cookies of the browser for each visitor",
      "By adding them to the url of every request that the app sends out",
      "By not using the NEXT_PUBLIC prefix and reading them in server code only",
      "By renaming them with a long random suffix that nobody could guess"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why should production use a different database from development?",
    "topic": "Production database setup",
    "choices": [
      "Development databases cannot be reached from production",
      "Production databases are always smaller and cheaper",
      "Tests and mistakes cannot damage real user data",
      "The framework needs two different databases to build"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What should you use to apply schema changes in production with Prisma?",
    "topic": "Production database setup",
    "choices": [
      "prisma migrate deploy, run as part of the release",
      "prisma migrate dev on the live database",
      "prisma db push with the production url on a laptop",
      "Editing the tables by hand in the database console"
    ],
    "answerIdx": 0
  },
  {
    "stem": "Why use connection pooling with serverless functions?",
    "topic": "Production database setup",
    "choices": [
      "Pooling makes the queries return larger results than a direct connection does",
      "Pooling stores the results of the queries in the browser of each visitor",
      "Serverless functions are not able to connect to a database without a pool",
      "Many short lived instances could otherwise open too many connections"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What is a good practice before a risky migration in production?",
    "topic": "Production database setup",
    "choices": [
      "Run it on the live database and watch for errors",
      "Take a backup and test the migration on a copy of the data",
      "Run it only at the busiest time of the day",
      "Skip the backup because migrations never lose data"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Where do you get the connection string for a managed database?",
    "topic": "Production database setup",
    "choices": [
      "From the public documentation that the vendor of the database publishes",
      "From the dashboard of the provider, kept as an environment variable",
      "From the source code of another project that you built earlier",
      "From the url of the deployed site, in the query string of the home page"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should the production database not be open to the whole internet?",
    "topic": "Production database setup",
    "choices": [
      "Open databases cannot accept connections from servers",
      "Public databases are slower than private ones",
      "The host blocks all databases that are open",
      "Restricting access reduces the risk of attacks and leaks"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What does a managed database provider handle for you?",
    "topic": "Production database setup",
    "choices": [
      "Backups, updates, availability and scaling of the database",
      "The design of your schema and the queries of your app",
      "The validation of the data that users type into forms",
      "The caching rules of your Next.js pages"
    ],
    "answerIdx": 0
  },
  {
    "stem": "How should seed data be treated in production?",
    "topic": "Production database setup",
    "choices": [
      "Run the full development seed script again on every single deploy",
      "Delete the existing rows first, so that the seed starts from a clean table",
      "Only the data that is truly needed, and never overwrite real data",
      "Seed the data from the browser of an administrator who is signed in"
    ],
    "answerIdx": 2
  },
  {
    "stem": "What can happen if a migration runs twice in parallel from two deploys?",
    "topic": "Production database setup",
    "choices": [
      "The database merges both runs together without causing any problem at all",
      "The second run is skipped by the browser of the person who deployed",
      "Conflicts or errors, so migrations should run in one controlled step",
      "The tables are duplicated and given a numeric suffix to tell them apart"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Why monitor the database after a release?",
    "topic": "Production database setup",
    "choices": [
      "Slow queries and errors may only show up with real traffic",
      "The database stops by itself after each release",
      "Monitoring changes the schema to match the traffic",
      "It is required for the app to build on the host"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What is a preview deployment on Vercel?",
    "topic": "Monitoring and previews",
    "choices": [
      "A local copy of the site for the developer only",
      "A cached copy of production that serves traffic when it is down",
      "A deployment that runs the tests and never serves pages",
      "A unique live copy of a branch or pull request for review"
    ],
    "answerIdx": 3
  },
  {
    "stem": "What triggers a preview deployment?",
    "topic": "Monitoring and previews",
    "choices": [
      "A change to the name of the project in the dashboard",
      "A push to a branch or the opening of a pull request",
      "A request from a visitor to the production site",
      "A scheduled job that runs at midnight"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why are preview deployments useful for reviews?",
    "topic": "Monitoring and previews",
    "choices": [
      "They replace the need for tests and for code review of the change",
      "Reviewers can click through the real change before it is merged",
      "They make the production site faster for all of the visitors it has",
      "They copy the data of the preview straight into the production database"
    ],
    "answerIdx": 1
  },
  {
    "stem": "Why should previews not use the production database?",
    "topic": "Monitoring and previews",
    "choices": [
      "Previews cannot connect to any database",
      "Production data is too large to load in a preview",
      "The host blocks previews from reading real data",
      "Reviewers or tests could change or delete real data"
    ],
    "answerIdx": 3
  },
  {
    "stem": "How can a team protect previews from public access?",
    "topic": "Monitoring and previews",
    "choices": [
      "Use the protection settings of the host",
      "Hide the url of the preview, since nobody is ever going to guess it",
      "Rely on search engines to ignore the preview pages when they crawl",
      "Remove the robots file from the project so that crawlers stay away"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What do web analytics tell you about your app?",
    "topic": "Monitoring and previews",
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
    "topic": "Monitoring and previews",
    "choices": [
      "Analytics watches servers and monitoring watches user clicks",
      "They are the same thing under two different names",
      "Analytics describes user behaviour, monitoring watches health and errors",
      "Monitoring is done only in development, analytics only in production"
    ],
    "answerIdx": 2
  },
  {
    "stem": "Which signals does error monitoring collect?",
    "topic": "Monitoring and previews",
    "choices": [
      "Exceptions with stack traces and the context in which they happened",
      "Only the number of visitors per day, grouped by country and by device",
      "The complete source code of the application, uploaded for later reading",
      "The passwords of the users who happened to hit an error on a page"
    ],
    "answerIdx": 0
  },
  {
    "stem": "What are Core Web Vitals?",
    "topic": "Monitoring and previews",
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
    "topic": "Monitoring and previews",
    "choices": [
      "Lab tests cannot measure the speed of any page in any situation",
      "Real devices and networks differ from your machine and show real problems",
      "Real user data is always faster than the numbers from a lab test",
      "Monitoring replaces the need for any kind of performance work in the code"
    ],
    "answerIdx": 1
  }
]
```

