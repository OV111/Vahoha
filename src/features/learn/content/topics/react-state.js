// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-state",
  title: "State",
  mystery: "The button adds 1 three times. Why does the counter go up by only 1?",
  minutes: 35,
  lang: "jsx",
  requires: ["react-props", "js-closures"],

  shortAnswer:
    "State is what a component remembers. Setting it asks React to render again with the new value. In the code that is running now, the value stays as it was, because each render has its own.",

  ideas: [
    { id: "why-state", text: "A normal variable is lost at the next render and doesn't cause one; state does both" },
    { id: "snapshot", text: "State is fixed within one render; setting it affects the next one" },
    { id: "updater", text: "If the new value depends on the old one, pass a function" },
    { id: "immutable", text: "Objects and arrays in state are replaced, not changed" },
    { id: "minimal", text: "Keep state small, and calculate what can be calculated" },
  ],

  misconceptions: [
    {
      id: "instant",
      belief: "after setCount, count has the new value in the next line",
      correction: "count belongs to this render and doesn't change. The new value comes with the next render.",
    },
    {
      id: "mutate-ok",
      belief: "you can push into a state array and set it again",
      correction: "It is still the same array, so React thinks nothing has changed. Make a new one.",
    },
    {
      id: "plain-variable",
      belief: "a normal variable in a component is remembered",
      correction: "The function runs again at each render, and the variable starts from its first value.",
    },
  ],

  sections: [
    {
      id: "why",
      title: "Why state",
      simpler:
        "A component is like someone who forgets everything each time you ask them. State is their notebook. And when they write in it, they tell everyone: look again.",
      blocks: [
        text(
          "why-1",
          `A component is a function, and React calls it again for each render. A normal variable in it fails in two ways. It is **lost** when the function ends. And changing it **doesn't tell React** to render again.

\`useState\` solves both:

\`\`\`jsx
const [count, setCount] = useState(0);
\`\`\`

\`count\` is the value for this render, \`setCount\` a function to set the next one, and \`0\` the value at the beginning. React keeps the value for you between renders.

**Each copy** of a component has its own state. Two counters on a page don't share anything.

Hooks such as useState may only be called at the **top level** of a component: not in an if, a loop or a nested function. React recognises them by the **order** in which they are called, and that must be the same each time.`,
        ),
        jsx(
          "why-code",
          "The variable forgets, the state remembers",
          `function App() {
  let plain = 0;
  const [count, setCount] = useState(0);

  return (
    <div>
      <button onClick={() => { plain = plain + 1; console.log("plain is", plain); }}>
        Variable: {plain}
      </button>{" "}
      <button onClick={() => setCount(count + 1)}>State: {count}</button>
    </div>
  );
}`,
        ),
        question(
          "q-why",
          "why-state",
          "A component has `let open = false`, and a click sets `open = true`. Why does nothing change on the page?",
          {
            render: "Changing a variable doesn't make React render, and at the next render it is false again",
            const: "It must be const",
            slow: ["React shows it a bit later", "plain-variable"],
          },
          "render",
          "It needs state: React then renders again and remembers the value.",
        ),
      ],
    },
    {
      id: "snapshot",
      title: "State is a snapshot",
      simpler:
        "Each render is a photo. In the photo the counter says 0. If you order a new photo, the old one in your hand still says 0.",
      blocks: [
        text(
          "snapshot-1",
          `This is the idea behind most surprises: within **one render**, a state value **never changes**. The handlers made in that render are closures, and they see **its** values.

\`\`\`jsx
setCount(count + 1);
console.log(count); // still the old value
\`\`\`

\`setCount\` doesn't change \`count\`. It asks React for **another render** in which count has a new value.

React also collects several updates and renders **once**. This is called **batching**. It happens in event handlers and, since React 18, also in timers and promises.

So if a handler calls \`setCount(count + 1)\` three times, and count is 0, it says three times: "in the next render, be 1". The counter goes up by 1.

If you need the new value right away, calculate it first: \`const next = count + 1; setCount(next); save(next);\`.`,
        ),
        picture("snapshot-pic", "state-snapshot", "Each render has its own count"),
        jsx(
          "snapshot-code",
          "Three calls, one step. Then use the function form",
          `function App() {
  const [count, setCount] = useState(0);

  const threeTimes = () => {
    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);
    console.log("still", count);
  };

  const withFunction = () => {
    setCount((c) => c + 1);
    setCount((c) => c + 1);
    setCount((c) => c + 1);
  };

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={threeTimes}>count + 1, three times</button>{" "}
      <button onClick={withFunction}>c =&gt; c + 1, three times</button>
    </div>
  );
}`,
        ),
        question(
          "q-snapshot",
          "snapshot",
          "count is 5. A handler runs `setCount(count + 1); console.log(count);`. What is printed?",
          { six: ["6", "instant"], five: "5", undef: "undefined" },
          "five",
          "count belongs to this render. The 6 comes with the next one.",
        ),
      ],
    },
    {
      id: "updater",
      title: "When the new value depends on the old",
      simpler:
        "Don't say: set it to 6. Say: whatever it is then, add 1. Then it's right, even if somebody else added something in the meantime.",
      blocks: [
        text(
          "updater-1",
          `You can pass a **function** to the setter: \`setCount((c) => c + 1)\`. React puts it in a queue and calls it with the **latest** value when it prepares the next render. Three of these really add 3.

Use this form when the new value **depends on the old one** and

- you set it several times in one handler, or
- the code runs **later**: in a timer, after an await, in an effect. There, \`count\` from the closure may be out of date.

If you simply set a value, such as \`setName("Ada")\`, you don't need it.

The function must be pure: calculate and return, nothing else. In development, React calls it twice in Strict Mode to find side effects.`,
        ),
        question(
          "q-three",
          "updater",
          "count is 0. A handler runs `setCount((c) => c + 1)` twice and then `setCount(10)`. What is count in the next render?",
          { two: "2", ten: "10", twelve: "12" },
          "ten",
          "React works through the queue in order: 1, 2, and then simply 10.",
          { difficulty: 2 },
        ),
        realCase(
          "updater-case",
          "Two likes, one counted",
          "A like button calls a server and then runs `setLikes(likes + 1)`.",
          "If somebody clicked twice quickly, only one like was shown until the page was reloaded.",
          "Both handlers had the old value of likes in their closure, and both set the same result.",
          "`setLikes((n) => n + 1)` uses the latest value at that moment.",
        ),
        question(
          "q-updater",
          "updater",
          "Inside `setInterval` in an effect with an empty dependency list, how do you count up?",
          {
            plain: ["setCount(count + 1)", "instant"],
            fn: "setCount((c) => c + 1)",
            assign: "count = count + 1",
          },
          "fn",
          "The interval sees only the count of the first render. The function gets the latest value.",
          { difficulty: 2 },
        ),
      ],
    },
    {
      id: "objects",
      title: "Objects and arrays",
      simpler:
        "React looks at the address and not into the house. If you paint the kitchen, the address is the same, and React thinks: nothing new. Build a new house.",
      blocks: [
        text(
          "objects-1",
          `React compares the old and the new state with \`Object.is\`. For objects that means: is it **the same object**? If you change it inside and set it again, it is the same, and React doesn't render.

So treat state as **read-only** and **replace** it:

| | Don't | Do |
| --- | --- | --- |
| Add | \`list.push(x)\` | \`[...list, x]\` |
| Remove | \`list.splice(i, 1)\` | \`list.filter((t) => t.id !== id)\` |
| Change one | \`list[i].done = true\` | \`list.map((t) => t.id === id ? { ...t, done: true } : t)\` |
| Sort | \`list.sort()\` | \`list.toSorted()\` |
| Object | \`user.name = "Bo"\` | \`{ ...user, name: "Bo" }\` |

A spread copies **one level**. For nested data, copy each level on the way to the change. If that gets long, your state may be too deep. Flat data is easier.`,
        ),
        jsx(
          "objects-code",
          "The first button changes the array, the second replaces it",
          `function App() {
  const [items, setItems] = useState(["Bread"]);

  return (
    <div>
      <p>{items.join(", ")}</p>
      <button onClick={() => { items.push("Milk"); setItems(items); console.log("pushed, nothing happens"); }}>
        push
      </button>{" "}
      <button onClick={() => setItems([...items, "Milk"])}>new array</button>
    </div>
  );
}`,
        ),
        question(
          "q-objects",
          "immutable",
          "AI wrote this. Why does the page not update?",
          {
            same: "It is the same object, so React sees no change",
            async: ["setUser needs await", "instant"],
            works: ["It does update", "mutate-ok"],
          },
          "same",
          "Write setUser({ ...user, name: \"Bo\" }).",
          { kind: "find-bug", code: `user.name = "Bo";\nsetUser(user);` },
        ),
        compare(
          "objects-compare",
          `const next = [...todos];
next[0].done = true;
setTodos(next);`,
          `setTodos(
  todos.map((t, i) => (i === 0 ? { ...t, done: true } : t)),
);`,
          "On the left the array is new, but the todo inside is the old one and has been changed. Earlier renders and memoized children see the change too.",
        ),
      ],
    },
    {
      id: "minimal",
      title: "As little state as possible",
      simpler:
        "Don't write in the notebook what you can work out. If you keep both the list and its length, one day they will disagree.",
      blocks: [
        text(
          "minimal-1",
          `Every piece of state is something that can be wrong. So before adding one, ask:

- Can it be **calculated** from props or other state? Then calculate it while rendering.
- Is it **passed in** from a parent? Then use the prop. Copying a prop into state means it doesn't follow when the prop changes.
- Does it **never change**? Then it's a constant.
- Can two states **contradict** each other, such as \`isLoading\` and \`isError\`? Use one: \`status\`.

A filtered list, a total, a full name: all of these can be calculated. It is fast enough almost always.`,
        ),
        realCase(
          "minimal-case",
          "The total that was behind",
          "A cart keeps `items` and `total` in two states. Each handler has to set both.",
          "After a new \"Remove all\" button, the total stayed at its old value.",
          "The new handler set only items. The same information existed twice.",
          "`const total = items.reduce((sum, i) => sum + i.price, 0)` while rendering. There is nothing left to forget.",
        ),
        question(
          "q-minimal",
          "minimal",
          "You have `todos` and `filter` in state. Where does the filtered list belong?",
          {
            state: "In a third state",
            calc: "In a variable calculated while rendering",
            effect: "In an effect that sets a state",
          },
          "calc",
          "It follows from the other two, so it can't get out of step.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["State for what changes and is shown", "The function form when the new value depends on the old", "New objects and arrays for every change"],
    avoid: ["State for what can be calculated", "Copying props into state", "Changing objects in state"],
  },

  explain: {
    prompt: "Why does calling setCount(count + 1) three times add only 1? And why doesn't push update the page?",
    modelAnswer:
      "A normal variable is lost at each render and doesn't cause one, so I use state. Within one render the state is fixed like a snapshot, so all three calls say the same: be old plus one. With a function, setCount(c => c + 1), React passes in the latest value each time. React compares objects by identity. push changes the same array, so it sees no change, and I have to replace it with a new one. And I keep state small and calculate what follows from it.",
  },

  reviewQuestions: [
    reviewQuestion("r-hook", "why-state", "Why may useState not stand in an if?", { order: "React recognises hooks by the order of their calls", slow: "It would be too slow", scope: "The value would be in the wrong scope" }, "order", "If one call is skipped, all later ones are mixed up."),
    reviewQuestion("r-remove", "immutable", "Which line removes a todo from state in the right way?", { splice: ["todos.splice(i, 1); setTodos(todos)", "mutate-ok"], filter: "setTodos(todos.filter((t) => t.id !== id))", delete: "delete todos[i]" }, "filter", "filter makes a new array."),
    reviewQuestion("r-next", "snapshot", "You need the new count for a request right after setting it. What do you do?", { read: ["Read count in the next line", "instant"], calc: "Calculate it first and use that value for both", wait: "Wait 100 ms" }, "calc", "const next = count + 1; setCount(next); send(next);", { difficulty: 2 }),
  ],

  summary: [
    "State is remembered and causes a render",
    "Within one render, state doesn't change",
    "c => c + 1 when it depends on the old value",
    "Replace objects and arrays, don't change them",
    "Calculate what you can",
  ],

  sources: [
    { label: "React: State, a component's memory", url: "https://react.dev/learn/state-a-components-memory" },
    { label: "React: State as a snapshot", url: "https://react.dev/learn/state-as-a-snapshot" },
    { label: "React: Updating arrays in state", url: "https://react.dev/learn/updating-arrays-in-state" },
    { label: "React: Choosing the state structure", url: "https://react.dev/learn/choosing-the-state-structure" },
  ],
};
