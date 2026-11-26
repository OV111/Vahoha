// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-lists",
  title: "Lists, keys and conditions",
  mystery: "One row was deleted. Why did the text in another row disappear?",
  minutes: 30,
  lang: "jsx",
  requires: ["react-state", "js-array-methods"],

  shortAnswer:
    "You make lists with map, and each item needs a key that stays with it. With the key React knows which item is which. Conditions are ordinary JavaScript: an if above the return, a ternary, or &&.",

  ideas: [
    { id: "map-elements", text: "map turns data into a list of elements" },
    { id: "key-identity", text: "A key tells React which item is which between renders" },
    { id: "index-key", text: "The index is a bad key when items can move, be added or be removed" },
    { id: "conditions", text: "Conditions are JavaScript: if, ternary, &&, and null for nothing" },
    { id: "reset", text: "Changing a key gives a component a fresh state" },
  ],

  misconceptions: [
    {
      id: "key-only-warning",
      belief: "keys are only there to silence a warning",
      correction: "React uses them to match old and new items. A wrong key puts state in the wrong row.",
    },
    {
      id: "index-fine",
      belief: "the index is always good enough as a key",
      correction: "The index belongs to the place, not to the item. When items move, the state stays at the place.",
    },
    {
      id: "and-boolean",
      belief: "{count && <p/>} shows nothing when count is 0",
      correction: "0 && ... gives 0, and React shows the 0. Write count > 0 && ...",
    },
  ],

  sections: [
    {
      id: "map",
      title: "From data to elements",
      simpler:
        "You have a pile of cards with names. You go through it and make one name badge from each card. That's map.",
      blocks: [
        text(
          "map-1",
          `React has no special syntax for lists. You use JavaScript: \`map\` makes **one element from each item**, and React shows the array.

\`\`\`jsx
{users.map((user) => (
  <li key={user.id}>{user.name}</li>
))}
\`\`\`

Filter and sort **before** that, in a variable above the return. Use \`toSorted\`, because \`sort\` would change your state.

The most common mistake: an arrow function with braces and no \`return\`. Then the array is full of \`undefined\`, and nothing is shown.

Don't forget the **empty list**. Say what's going on and what the user can do: "No tasks yet. Add your first one."`,
        ),
        jsx(
          "map-code",
          "Filter, sort, show, and handle the empty case",
          `function App() {
  const [text, setText] = useState("");
  const names = ["Cy", "Ada", "Bo"];

  const shown = names
    .filter((n) => n.toLowerCase().includes(text.toLowerCase()))
    .toSorted();

  return (
    <div>
      <input aria-label="Search" value={text} onChange={(e) => setText(e.target.value)} />
      {shown.length === 0 ? (
        <p>No name matches.</p>
      ) : (
        <ul>{shown.map((n) => <li key={n}>{n}</li>)}</ul>
      )}
    </div>
  );
}`,
        ),
        question(
          "q-map",
          "map-elements",
          "Nothing is shown, and there is no error. Why?",
          {
            return: "The callback has braces but no return",
            key: "The key is missing",
            map: "map doesn't work in JSX",
          },
          "return",
          "Without return, map gives an array of undefined, which shows nothing. A missing key would only be a warning.",
          { kind: "find-bug", code: `{users.map((u) => {\n  <li key={u.id}>{u.name}</li>;\n})}` },
        ),
      ],
    },
    {
      id: "keys",
      title: "What keys are for",
      simpler:
        "In a class, the teacher knows the children by name. If one leaves, the others are still who they are. If the teacher knew them only by their chair, everyone would be someone else after one left.",
      blocks: [
        text(
          "keys-1",
          `When a list changes, React compares the **old** list with the **new** one. Was the first item removed? Or did every item get another text? From the elements alone it can't tell. The **key** is each item's name.

With a good key, React sees: item 7 is gone, the rest is the same. It keeps the DOM elements of the others, with **everything that lives in them**: their state, the cursor, text in inputs.

A good key is

- **unique** among its siblings,
- **stable**: the same item has the same key in every render,
- and belongs to the **data**: an id from the database, or one you create when the item is added (\`crypto.randomUUID()\`).

Never create a key **while rendering**, such as \`key={Math.random()}\`. Then every item is new each time: React throws all of them away and builds them again, and their state is lost.

The key goes on the **outermost** element in the map. The component itself doesn't get it as a prop.`,
        ),
        picture("keys-pic", "keys", "With ids the rows keep their state; with the index the state stays at the place"),
        question(
          "q-keys",
          "key-identity",
          "Which is the best key for a list of orders?",
          { index: ["The index", "index-fine"], id: "order.id", random: "Math.random()" },
          "id",
          "It is unique, stable and belongs to the data.",
        ),
        question(
          "q-random",
          "key-identity",
          "Each row has an input and `key={Math.random()}`. What does the user notice while typing?",
          {
            nothing: ["Nothing, keys only matter for the warning", "key-only-warning"],
            focus: "The input loses focus and text at each render, because every row is new",
            slow: "Only that it is a little slower",
          },
          "focus",
          "A new key means a new component. React removes the old one, with everything in it.",
          { difficulty: 2 },
        ),
      ],
    },
    {
      id: "index",
      title: "Why the index is dangerous",
      simpler:
        "If your name is \"the one on chair 2\", and the one on chair 1 leaves, you move up and are suddenly someone else. Your bag stays on chair 2.",
      blocks: [
        text(
          "index-1",
          `The index describes a **place**. If you delete the first of three rows, the second row is now at place 0. For React, with the index as key, **row 0 is still there**, only with other props, and row 2 has vanished. So the state of the first row now belongs to the second, and the state of the **last** one is lost. That's the answer to the question at the top.

You don't notice it with plain text, because text comes from props. You notice it when rows have **their own state**: an input, an open menu, a checkbox, an animation.

The index is all right if the list **never** changes its order, nothing is added or removed except at the end, and the rows have no state. A fixed list of three links is such a case.`,
        ),
        jsx(
          "index-code",
          "Type into both inputs, then delete the first row in each list",
          `function List({ title, keyOf }) {
  const [rows, setRows] = useState([{ id: "a", name: "Ada" }, { id: "b", name: "Bo" }]);
  return (
    <div>
      <b>{title}</b>{" "}
      <button onClick={() => setRows(rows.slice(1))}>Delete first</button>
      {rows.map((row, i) => (
        <p key={keyOf(row, i)}>{row.name}: <input aria-label={row.name} placeholder="type here" /></p>
      ))}
    </div>
  );
}

function App() {
  return (
    <div>
      <List title="key = index" keyOf={(row, i) => i} />
      <List title="key = id" keyOf={(row) => row.id} />
    </div>
  );
}`,
        ),
        realCase(
          "index-case",
          "The comment under the wrong person",
          "A review page shows one row per applicant, with a text field for notes. The key is the index.",
          "After removing an applicant, the notes stood next to the wrong names. Two people got the wrong answer.",
          "The text in the fields stayed at its place, while the names moved up.",
          "`key={applicant.id}`. The notes were also moved into state with the applicant's id.",
        ),
        question(
          "q-index",
          "index-key",
          "When is the index acceptable as a key?",
          {
            always: ["Always", "index-fine"],
            fixed: "When the list never changes order or loses items, and its rows have no state",
            small: "When the list is shorter than ten items",
          },
          "fixed",
          "Then place and item are the same thing.",
        ),
      ],
    },
    {
      id: "conditions",
      title: "Showing things under a condition",
      simpler:
        "Either you decide before you write, with if. Or you decide in the middle of the sentence: this or that. Or: this, if it's true, otherwise nothing.",
      blocks: [
        text(
          "conditions-1",
          `There are three common ways.

- **if, above the return**, for whole variants: \`if (!user) return <Login />;\`
- A **ternary** for one of two: \`{isOpen ? <Menu /> : <Icon />}\`
- **&&** for something or nothing: \`{isNew && <Badge />}\`

With && there is a trap. \`0 && <p/>\` is \`0\`, and React **shows the 0**. \`false\`, \`null\` and \`undefined\` show nothing, but 0 and NaN do. So make the left side a real condition: \`count > 0 && ...\`.

Nested ternaries are hard to read. Use an if above, or a small component.

Remember that a component that disappears **loses its state**. If you only want to hide it and keep what was typed, use CSS.

And the other way round: you can use the key to **reset** a component on purpose. \`<Profile key={userId} />\` starts fresh for each user.`,
        ),
        jsx(
          "conditions-code",
          "The famous 0",
          `function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <p>With count &amp;&amp;: {count && <b>You have mail</b>}</p>
      <p>With count &gt; 0: {count > 0 && <b>You have mail</b>}</p>
      <button onClick={() => setCount(count + 1)}>New mail</button>
    </div>
  );
}`,
        ),
        question(
          "q-conditions",
          "conditions",
          "`{items.length && <List items={items} />}` with an empty array. What is on the page?",
          { nothing: ["Nothing", "and-boolean"], zero: "0", list: "An empty list" },
          "zero",
          "items.length is 0, and 0 && ... gives 0, which React shows.",
        ),
        question(
          "q-reset",
          "reset",
          "A form for editing keeps the old text when you switch to another user. What is the simplest fix?",
          {
            effect: "An effect that sets every field again",
            key: "key={user.id} on the form",
            reload: "Reloading the page",
          },
          "key",
          "Another key means a new component with fresh state.",
          { difficulty: 2 },
        ),
        realCase(
          "conditions-case",
          "A zero above the cart",
          "The header shows `{cart.length && <CartIcon />}`.",
          "New visitors saw a lonely 0 at the top of the page.",
          "An empty cart has length 0, and && returned that 0.",
          "`{cart.length > 0 && <CartIcon />}`.",
        ),
        compare(
          "conditions-compare",
          `{loading ? <Spinner /> : error ? <Error /> : items.length ? <List /> : <Empty />}`,
          `if (loading) return <Spinner />;
if (error) return <Error />;
if (items.length === 0) return <Empty />;
return <List />;`,
          "The right side can be read from top to bottom, and each state has its own line.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["Ids from the data as keys", "if above the return for whole variants", "A changed key to reset a component"],
    avoid: ["The index for lists that change", "Keys created while rendering", "A number on the left of &&"],
  },

  explain: {
    prompt: "What does a key do, and what goes wrong with the index when the first row is deleted?",
    modelAnswer:
      "map turns data into elements, and the key tells React which item is which between two renders. With an id, React keeps the right rows with their state. The index belongs to the place: after deleting the first row, the second is at its place and gets its state, while the last row's state is lost. Changing a key on purpose resets a component. For conditions I use if, a ternary or &&, with a real condition on the left, because 0 would be shown.",
  },

  reviewQuestions: [
    reviewQuestion("r-where", "key-identity", "Where does the key belong in a map?", { inner: "On the innermost element", outer: "On the outermost element that the callback returns", list: "On the ul" }, "outer", "React compares the items of the array, and those are the outermost elements."),
    reviewQuestion("r-hide", "conditions", "A panel is closed with `{open && <Panel />}`. What happens to what was typed in it?", { kept: "It is kept", lost: "It is lost, because the component is removed", saved: "It is saved by the browser" }, "lost", "A removed component loses its state. Hide it with CSS to keep it, or move the state up."),
    reviewQuestion("r-index", "index-key", "Which list may use the index as key?", { todos: ["A todo list with delete", "index-fine"], steps: "Three fixed steps of a help text", chat: ["A chat where new messages come in at the top", "index-fine"] }, "steps", "It never changes, and its rows have no state."),
  ],

  summary: [
    "map with a return for each item",
    "Keys from the data: unique and stable",
    "The index belongs to the place, not to the item",
    "count > 0 && instead of count &&",
  ],

  sources: [
    { label: "React: Rendering lists", url: "https://react.dev/learn/rendering-lists" },
    { label: "React: Conditional rendering", url: "https://react.dev/learn/conditional-rendering" },
    { label: "React: Preserving and resetting state", url: "https://react.dev/learn/preserving-and-resetting-state" },
  ],
};
