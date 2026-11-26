// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-rendering",
  title: "How React updates the page",
  mystery: "Only one number changed, but 50 components ran. Is that bad?",
  minutes: 30,
  lang: "jsx",
  requires: ["react-state", "react-lists"],

  shortAnswer:
    "Rendering means that React calls your components. It compares the new result with the last one and changes only what differs in the DOM. So many components may run while almost nothing on the page is touched.",

  ideas: [
    { id: "phases", text: "Trigger, render, commit: rendering is calling components, committing is changing the DOM" },
    { id: "diff", text: "React compares by type and key: the same type at the same place is kept, another type is rebuilt" },
    { id: "state-place", text: "State belongs to a place in the tree" },
    { id: "children-render", text: "When a component renders, its children render too, unless something stops them" },
    { id: "measure", text: "Rendering is usually cheap; measure before you optimise" },
  ],

  misconceptions: [
    {
      id: "render-is-dom",
      belief: "rendering means changing the DOM",
      correction: "Rendering means calling your components. The DOM is changed only where the result is different.",
    },
    {
      id: "only-props",
      belief: "a child renders only when its props change",
      correction: "By default it renders whenever its parent does. Only memo, or the React Compiler, changes that.",
    },
    {
      id: "memo-everything",
      belief: "wrapping everything in memo makes an app faster",
      correction: "Comparing costs something too, and new objects or functions as props make it useless. Measure first.",
    },
  ],

  sections: [
    {
      id: "phases",
      title: "Three steps",
      simpler: "In a restaurant: somebody orders (trigger), the kitchen cooks (render), the waiter brings what is new to the table (commit). Cooking isn't serving.",
      blocks: [
        text(
          "phases-1",
          `An update has three steps.

1. **Trigger**: the first render, or somebody sets state.
2. **Render**: React **calls** your components and gets new descriptions, the objects made from JSX. Nothing has happened on the page yet.
3. **Commit**: React changes the DOM, but only **where the new description differs** from the last one.

After that the browser paints, and effects run.

So **rendering isn't changing the DOM**. A component can run a hundred times without touching the page once. That's the first half of the answer to the question at the top.

Since rendering can be repeated or thrown away, it must be **pure**. In development, Strict Mode calls components twice, so that impure ones are noticed.`,
        ),
        picture("phases-pic", "render-phases", "Trigger, render, commit, paint"),
        jsx(
          "phases-code",
          "Both components run, but only one text changes in the DOM",
          `function Static() {
  console.log("Static was called");
  return <p>I never change.</p>;
}

function App() {
  const [n, setN] = useState(0);
  return (
    <div>
      <button onClick={() => setN(n + 1)}>Count: {n}</button>
      <Static />
    </div>
  );
}`,
        ),
        question(
          "q-phases",
          "phases",
          "A component is called again and returns exactly the same as before. What happens in the DOM?",
          { rebuilt: ["It is rebuilt", "render-is-dom"], nothing: "Nothing", refresh: "The page is painted again" },
          "nothing",
          "React finds no difference, so there is nothing to commit.",
        ),
      ],
    },
    {
      id: "diff",
      title: "How React compares",
      simpler: "React puts two drawings on top of each other. At the same spot there is still a button? Then only change its colour. There's a picture now instead? Then throw the button away.",
      blocks: [
        text(
          "diff-1",
          `The descriptions are often called the **virtual DOM**. Comparing two trees perfectly would be far too slow. React uses two simple rules (**reconciliation**):

- **Another type**: \`<div>\` became \`<section>\`, or \`<Card>\` became \`<List>\`. React throws the old part away, **with all its state**, and builds a new one.
- **The same type at the same place**: React **keeps** it and updates only what changed in its attributes or props.

In lists, the **key** says which is the same.

A result of the first rule: never define a component **inside** another one. It would be a **new function**, so another type, at each render. React would throw it away each time: inputs lose their focus, state is gone.

The virtual DOM isn't magically faster than the DOM. Its benefit is that you can describe the whole screen and still get small changes.`,
        ),
        jsx(
          "diff-code",
          "Type into both fields, then press the button",
          `function App() {
  const [n, setN] = useState(0);

  function Inner() { // a new type in every render
    return <input aria-label="inner" placeholder="loses its text" />;
  }

  return (
    <div>
      <p><Inner /></p>
      <p><input aria-label="normal" placeholder="keeps its text" /></p>
      <button onClick={() => setN(n + 1)}>Render again ({n})</button>
    </div>
  );
}`,
        ),
        realCase(
          "diff-case",
          "The field that lost focus after every letter",
          "A developer moves the search field into a small component, defined inside the page component to have access to its state.",
          "After each letter, the cursor was gone, and users had to click into the field again.",
          "Each render created a new component type, so React removed the old field and made a new one.",
          "The component moved out of the page and gets what it needs as props.",
        ),
        question(
          "q-diff",
          "diff",
          "`<p>` becomes `<h2>` at the same place, with the same text. What does React do?",
          { update: "It changes the name of the element", rebuild: "It removes the p and creates an h2", nothing: "Nothing" },
          "rebuild",
          "Another type means a new element.",
        ),
      ],
    },
    {
      id: "place",
      title: "State belongs to a place",
      simpler: "The chair remembers who sat on it. If somebody with the same job sits down on it, they find the things of the one before.",
      blocks: [
        text(
          "place-1",
          `State doesn't live in your function. React keeps it, connected to a **place in the tree**. As long as a component of the **same type** is at the **same place**, it keeps its state, even if its props are completely different.

\`\`\`jsx
{isAda ? <Chat person="Ada" /> : <Chat person="Bo" />}
\`\`\`

For React, this is the same Chat at the same place. The message typed for Ada is still there when you switch to Bo.

If you want them to be different, give them a **key**: \`<Chat key={person.id} />\`. Another key is another component.

And the reverse: if a component vanishes, its state is gone. If you want to keep it, move the state **up**.`,
        ),
        jsx(
          "place-code",
          "Type a message, then switch. Then add key={person}",
          `function Chat({ person }) {
  const [text, setText] = useState("");
  return (
    <p>
      To {person}: <input aria-label="message" value={text} onChange={(e) => setText(e.target.value)} />
    </p>
  );
}

function App() {
  const [person, setPerson] = useState("Ada");
  return (
    <div>
      <button onClick={() => setPerson("Ada")}>Ada</button>{" "}
      <button onClick={() => setPerson("Bo")}>Bo</button>
      <Chat person={person} />
    </div>
  );
}`,
        ),
        question(
          "q-key",
          "state-place",
          "What does `key={person}` on Chat change in this example?",
          {
            nothing: ["Nothing, keys are only for lists", "render-is-dom"],
            fresh: "Each person gets a Chat with its own fresh state",
            keeps: "The text is kept for both",
          },
          "fresh",
          "Another key is another component, so switching starts with an empty field.",
        ),
        realCase(
          "place-case",
          "A message to the wrong person",
          "A chat shows `<Composer contact={contact} />`. Its text is in the state of Composer.",
          "Somebody began a message, switched to another contact and sent it there by mistake.",
          "Composer stayed at the same place with the same type, so it kept its text.",
          "`<Composer key={contact.id} contact={contact} />`.",
        ),
        question(
          "q-place",
          "state-place",
          "Why does the text stay when you switch from Ada to Bo?",
          { props: "Because the props are similar", place: "Same type at the same place: React keeps the state", bug: "It is a bug in React" },
          "place",
          "A key with the person's id makes it a different component.",
        ),
      ],
    },
    {
      id: "children",
      title: "Who renders, and when to care",
      simpler: "When the boss calls a meeting, the whole team comes. Usually it's short. Only if it takes too long do you ask who really needs to be there.",
      blocks: [
        text(
          "children-1",
          `When a component renders, **all its children render** too, by default, whether their props have changed or not. That sounds like a waste, but calling functions is fast. That's the second half of the answer: usually it isn't bad.

If something **is** slow, find out what. The **Profiler** in the React DevTools shows which components ran and for how long. Then, in this order:

1. **Move state down** to where it is needed. Fewer components then render.
2. **Pass children**: JSX that comes from a parent that didn't render stays the same.
3. **memo**: \`memo(Row)\` renders only if its props have changed. New objects, arrays and functions as props count as changed, so you may need \`useMemo\` and \`useCallback\`.
4. For very long lists, show only the visible part (**virtualisation**).

The **React Compiler** does much of this by itself in projects that use it.`,
        ),
        jsx(
          "children-code",
          "Moving the state down: the slow part isn't called any more",
          `function Slow() {
  console.log("Slow was called");
  return <p>An expensive list</p>;
}

function Search() {
  const [text, setText] = useState("");
  return <input aria-label="search" value={text} onChange={(e) => setText(e.target.value)} placeholder="type" />;
}

function App() {
  return (
    <div>
      <Search />
      <Slow />
    </div>
  );
}`,
        ),
        question(
          "q-children",
          "children-render",
          "A parent sets its state. Its child has the same props as before and no memo. Does the child render?",
          { no: ["No, because its props are the same", "only-props"], yes: "Yes", first: "Only the first time" },
          "yes",
          "By default all children render with their parent.",
        ),
        question(
          "q-measure",
          "measure",
          "The page feels slow. What do you do first?",
          { memo: ["Wrap all components in memo", "memo-everything"], profile: "Measure with the Profiler which components take the time", rewrite: "Replace React" },
          "profile",
          "Otherwise you optimise something that isn't the problem.",
        ),
        compare(
          "children-compare",
          `const Row = memo(function Row({ style }) { /* ... */ });

<Row style={{ padding: 8 }} />`,
          `const rowStyle = { padding: 8 };
const Row = memo(function Row({ style }) { /* ... */ });

<Row style={rowStyle} />`,
          "On the left, the style is a new object in each render, so memo never saves anything. On the right it is always the same.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["Pure components", "A key to separate components at the same place", "The Profiler before any optimisation"],
    avoid: ["Components defined inside components", "memo without measuring", "Worrying about every render"],
  },

  explain: {
    prompt: "What is the difference between rendering and changing the DOM? How does React decide what to keep, and where does state live?",
    modelAnswer:
      "Rendering means React calls my components and gets a description. In the commit it changes the DOM only where the description differs. It compares by type and key: the same type at the same place is kept, another type is thrown away with its state. State belongs to a place in the tree, so a key is needed to separate two users at the same place. When a component renders, its children do too, which is usually cheap, so I measure before I optimise.",
  },

  reviewQuestions: [
    reviewQuestion("r-inner", "diff", "Why shouldn't you define a component inside another?", { style: "It is bad style, nothing more", type: "It is a new type in each render, so its state is lost each time", scope: "It can't see the outer variables" }, "type", "React throws away a component whose type has changed."),
    reviewQuestion("r-strict", "phases", "Why does Strict Mode call components twice in development?", { bug: "It is a bug", pure: "To reveal components that aren't pure", speed: "To measure the speed" }, "pure", "A pure component gives the same result both times. In production it is called once."),
    reviewQuestion("r-down", "measure", "Typing in a search field renders a slow table. What is often the simplest fix?", { memo: ["memo on everything", "memo-everything"], down: "Moving the state of the field down into its own component", delay: "A longer delay for each key" }, "down", "Then only the field renders, if the table doesn't need the text.", { difficulty: 2 }),
  ],

  summary: [
    "Render calls components, commit changes the DOM",
    "Same type and place: kept. Other type: rebuilt",
    "State belongs to a place; a key separates",
    "Children render with their parent; measure first",
  ],

  sources: [
    { label: "React: Render and commit", url: "https://react.dev/learn/render-and-commit" },
    { label: "React: Preserving and resetting state", url: "https://react.dev/learn/preserving-and-resetting-state" },
    { label: "React: memo", url: "https://react.dev/reference/react/memo" },
  ],
};
