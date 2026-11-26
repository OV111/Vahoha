// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-jsx",
  title: "JSX and components",
  mystery: "The component is written, but the page shows nothing and no error. Why?",
  minutes: 30,
  lang: "jsx",
  requires: ["js-basics", "js-modules"],

  shortAnswer:
    "A component is a function that returns what should be on the screen. JSX looks like HTML, but it is turned into function calls that create plain objects. React reads these objects and builds the page.",

  ideas: [
    { id: "ui-function", text: "A component is a function from data to what is on the screen" },
    { id: "jsx-calls", text: "JSX is turned into function calls that create objects, not HTML" },
    { id: "capital", text: "A capital letter means a component, a small letter an HTML element" },
    { id: "braces", text: "Braces hold a JavaScript expression that gives a value" },
    { id: "one-root", text: "A component returns one root element, and a fragment groups without a new one" },
  ],

  misconceptions: [
    {
      id: "jsx-is-html",
      belief: "JSX is HTML inside JavaScript",
      correction: "It is another way to write function calls. That's why it has className, camelCase events and closed tags.",
    },
    {
      id: "statements-in-braces",
      belief: "any JavaScript can stand in the braces",
      correction: "Only expressions, which give a value. An if or a for statement doesn't.",
    },
    {
      id: "call-component",
      belief: "you call a component like a normal function, Card()",
      correction: "You write it as an element, <Card />. React calls it, and only then do its state and effects work properly.",
    },
  ],

  sections: [
    {
      id: "why",
      title: "Why components",
      simpler:
        "With the DOM you tell the page each step: now change this, now remove that. With React you draw a picture of how it should look, and React finds out the steps.",
      blocks: [
        text(
          "why-1",
          `With the DOM, you change the page **step by step**: find the element, set the text, add a class. As the page grows, you have to think of every place that shows the same data.

React turns this around. You describe **how the screen should look** for the data you have now. When the data changes, React calls your description again and finds out what has to change on the page. This is called **declarative**.

The pieces you describe with are **components**. A component is a **function** that returns what should be on the screen. You build small ones and put them together: a page is made of a header and a list, the list of rows, a row of a name and a button.

Good components have one job. If you can't name one without "and", it may be two.`,
        ),
        jsx(
          "why-code",
          "One component, used three times",
          `function Badge({ label }) {
  return <span style={{ background: "#ddd6fe", padding: "4px 10px", marginRight: 8 }}>{label}</span>;
}

function App() {
  return (
    <div>
      <Badge label="HTML" />
      <Badge label="CSS" />
      <Badge label="React" />
    </div>
  );
}`,
        ),
        question(
          "q-why",
          "ui-function",
          "What does a component do when its data changes?",
          {
            steps: "It changes the DOM step by step",
            describes: "It returns a new description of the screen, and React updates the page",
            reload: "It reloads the page",
          },
          "describes",
          "You describe the result. Finding the steps is React's job.",
        ),
      ],
    },
    {
      id: "calls",
      title: "JSX is function calls",
      simpler:
        "JSX is like shorthand. A secretary writes it out in full before anyone reads it. What comes out is a note that says: a button, with this text.",
      blocks: [
        text(
          "calls-1",
          `Browsers don't understand JSX. A tool such as Vite turns it into **function calls** before your code runs. \`<h1 className="big">Hello</h1>\` becomes roughly this:

\`\`\`js
createElement("h1", { className: "big" }, "Hello")
\`\`\`

(Newer tools call a function named \`jsx\`, but the idea is the same.) What comes out is a **plain object**: a type, props, children. It isn't a DOM element yet. React reads these objects and makes the page from them.

This explains the rules that surprise people:

- \`class\` is \`className\`, and \`for\` is \`htmlFor\`, because the attributes become property names.
- Events are written \`onClick\`, with a capital letter in the middle.
- Every tag is closed: \`<img />\`.
- \`style\` takes an object: \`style={{ color: "red" }}\`. The outer braces mean JavaScript, the inner ones are the object.`,
        ),
        picture("calls-pic", "jsx-pipeline", "JSX becomes a call, the call an object, the object a DOM element"),
        jsx(
          "calls-code",
          "The same thing, written in both ways",
          `const withJsx = <b className="big">Hello</b>;
const withCall = React.createElement("b", { className: "big" }, "Hello");

console.log(withJsx.type, withJsx.props);
console.log(withCall.type, withCall.props);

function App() {
  return <p>{withJsx} and {withCall}</p>;
}`,
        ),
        question(
          "q-calls",
          "jsx-calls",
          "What is the value of `<b>Hi</b>` in your code?",
          {
            html: ["A string with HTML", "jsx-is-html"],
            dom: ["A DOM element", "jsx-is-html"],
            object: "A plain object that describes the element",
          },
          "object",
          "It is an object with a type and props. React creates the DOM element later.",
        ),
      ],
    },
    {
      id: "capital",
      title: "Capital letters and one root",
      simpler:
        "A small letter means: take one from the shop, the browser knows it. A capital letter means: take the one I built myself.",
      blocks: [
        text(
          "capital-1",
          `How does React know whether \`<card />\` is your component or an HTML element? By the **first letter**. A small letter becomes a string, \`"card"\`, so React creates an HTML element with that name. A capital letter becomes the variable \`Card\`, your function.

That's the answer to the question at the top. If you name a component \`card\`, React creates an unknown HTML element: no error, and nothing of your component on the page.

A component returns **one** root element, because a function returns one value. If you don't want an extra \`div\`, use a **fragment**: \`<>...</>\`. It groups and leaves nothing in the DOM.

To show nothing, return \`null\`.

And don't call components yourself. \`{Card()}\` seems to work, but React doesn't see it as a component, and its state then belongs to the parent, which leads to strange errors. Write \`<Card />\`.`,
        ),
        realCase(
          "capital-case",
          "The invisible header",
          "A developer writes `function header() { return <h1>Shop</h1>; }` and uses `<header />`.",
          "The page shows an empty line instead of the title, without any error.",
          "header with a small letter is an HTML element. The browser knows it, so it appeared, but empty.",
          "The function became `Header`, and the page uses `<Header />`.",
        ),
        question(
          "q-capital",
          "capital",
          "You have `function userCard()` and write `<userCard />`. What happens?",
          {
            works: "The component is shown",
            unknown: "React creates an unknown HTML element, and the component never runs",
            crash: "The page crashes",
          },
          "unknown",
          "A small first letter means an HTML element. Name it UserCard.",
        ),
        question(
          "q-root",
          "one-root",
          "A component should return two table rows without a wrapper around them. What do you use?",
          {
            div: "A div around both",
            fragment: "A fragment: <> ... </>",
            array: "Two return statements",
          },
          "fragment",
          "A div inside a table would be invalid. A fragment groups without an element in the DOM.",
        ),
      ],
    },
    {
      id: "braces",
      title: "JavaScript in braces",
      simpler:
        "Braces are little windows in your JSX. Through each one you may show one value. You can't put a whole machine in the window, only what comes out of it.",
      blocks: [
        text(
          "braces-1",
          `In braces you write a JavaScript **expression**, something that gives a value: \`{user.name}\`, \`{price * 2}\`, \`{items.length}\`, \`{isOpen ? "Close" : "Open"}\`.

\`if\` and \`for\` are **statements** and give no value, so they don't fit. Do that work **above the return**, and put the result in a variable.

What is shown? Strings and numbers are. \`true\`, \`false\`, \`null\` and \`undefined\` show **nothing**. Arrays show their items. An **object** causes an error: *Objects are not valid as a React child*. You probably meant one of its properties.

React shows text **as text**. HTML in a string is not read as HTML, which protects you from XSS.

Values for attributes work in the same way: \`<img src={user.photo} />\`. Quotes are for fixed text: \`alt="Photo"\`.`,
        ),
        jsx(
          "braces-code",
          "Expressions in braces, statements above the return",
          `function App() {
  const user = { name: "Ada", tags: ["math", "code"] };
  const unread = 3;

  let message = "Nothing new";
  if (unread > 0) message = unread + " new messages";

  return (
    <div>
      <h2>{user.name.toUpperCase()}</h2>
      <p>{message}</p>
      <p>{user.tags.join(", ")}</p>
      <p>{"<b>not bold</b>"}</p>
    </div>
  );
}`,
        ),
        question(
          "q-braces",
          "braces",
          "Which of these works inside braces in JSX?",
          {
            if: ["if (open) { text }", "statements-in-braces"],
            ternary: 'open ? "Yes" : "No"',
            for: ["for (const x of list) { x }", "statements-in-braces"],
          },
          "ternary",
          "It is an expression: it gives a value. if and for are statements.",
        ),
        question(
          "q-object",
          "braces",
          "*Objects are not valid as a React child*. What did someone probably write?",
          {
            user: "{user} instead of {user.name}",
            string: "{\"user\"}",
            nothing: "{null}",
          },
          "user",
          "React can show text, numbers and elements, but not a plain object.",
          { difficulty: 2 },
        ),
        realCase(
          "braces-case",
          "The date that broke the page",
          "A profile shows `{user.createdAt}`. While developing, the value came from a file as text.",
          "With the real data the page was white: *Objects are not valid as a React child*.",
          "In the app, createdAt was turned into a Date, and a Date is an object.",
          "Show text made from it: `{user.createdAt.toLocaleDateString()}`.",
        ),
        compare(
          "braces-compare",
          `<label class="name" for="email">
<img src="{user.photo}">`,
          `<label className="name" htmlFor="email">
<img src={user.photo} alt={user.name} />`,
          "JSX uses property names, closed tags, and braces without quotes. In quotes, the braces would be plain text.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["A component for each part with one job", "Fragments instead of extra divs", "Variables above the return for anything complicated"],
    avoid: ["Calling components as functions", "Component names with a small letter", "Defining a component inside another component"],
  },

  explain: {
    prompt: "What happens to JSX before it runs? Why do components need a capital letter, and what may stand in braces?",
    modelAnswer:
      "A component is a function that returns a description of the screen for its data. JSX is turned into function calls that create plain objects, which React reads to build the page. A small first letter becomes an HTML element and a capital one my component. In braces I can write expressions that give a value, but no statements. A component returns one root, and a fragment groups elements without adding one to the DOM.",
  },

  reviewQuestions: [
    reviewQuestion("r-class", "jsx-calls", "Why is it `className` and not `class`?", { name: "Because attributes become property names, and class is a reserved word", css: "Because React has its own CSS", short: ["Because JSX is a kind of HTML", "jsx-is-html"] }, "name", "JSX becomes JavaScript, and its attributes become properties."),
    reviewQuestion("r-false", "braces", "What does `{false}` show?", { word: "false", nothing: "Nothing", error: "An error" }, "nothing", "true, false, null and undefined show nothing."),
    reviewQuestion("r-call", "ui-function", "How do you use the component Card?", { call: ["{Card()}", "call-component"], element: "<Card />", string: "{\"Card\"}" }, "element", "React calls it. Only then do its state and effects belong to it."),
  ],

  summary: [
    "A component is a function from data to the screen",
    "JSX becomes calls that create objects",
    "Capital letter: component. Small letter: HTML",
    "Braces hold expressions, and a component returns one root",
  ],

  sources: [
    { label: "React: Your first component", url: "https://react.dev/learn/your-first-component" },
    { label: "React: Writing markup with JSX", url: "https://react.dev/learn/writing-markup-with-jsx" },
    { label: "React: JavaScript in JSX with curly braces", url: "https://react.dev/learn/javascript-in-jsx-with-curly-braces" },
  ],
};
