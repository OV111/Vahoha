// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-effects",
  title: "Effects",
  mystery: "The timer runs twice as fast after a while. Who started the second one?",
  minutes: 35,
  lang: "jsx",
  requires: ["react-state", "js-closures", "web-events"],

  shortAnswer:
    "An effect connects a component to something outside React, such as a timer or a server. It runs after the page was updated. Its dependency list says when it runs again, and its cleanup undoes what it started.",

  ideas: [
    { id: "outside", text: "Effects are for keeping something outside React in step with the component" },
    { id: "deps", text: "The dependency list names every value from the component that the effect uses" },
    { id: "cleanup", text: "Cleanup runs before the effect runs again and when the component goes away" },
    { id: "stale", text: "An effect sees the values of the render it belongs to" },
    { id: "not-needed", text: "You don't need an effect to calculate values or to react to a click" },
  ],

  misconceptions: [
    {
      id: "empty-once",
      belief: "an empty list means: I decide that it runs once",
      correction: "It means that the effect uses nothing that changes. If it does, it sees old values.",
    },
    {
      id: "effect-for-calc",
      belief: "values that depend on state should be set in an effect",
      correction: "Calculate them while rendering. An effect causes an extra render with wrong values in between.",
    },
    {
      id: "strict-bug",
      belief: "the effect running twice in development is a bug to switch off",
      correction: "React mounts, unmounts and mounts again to check your cleanup. If that causes trouble, the cleanup is missing.",
    },
  ],

  sections: [
    {
      id: "what",
      title: "What effects are for",
      simpler: "Your component lives in React's world. Sometimes it needs a plug into the world outside: a clock, a radio, a server. An effect plugs it in, and the cleanup pulls it out.",
      blocks: [
        text(
          "what-1",
          `Rendering must be pure. But some components have to deal with things **outside React**: a timer, a listener on \`window\`, a connection to a server, a map or chart library, the title of the page. For that there are effects.

\`\`\`jsx
useEffect(() => {
  document.title = \`\${count} new\`;
}, [count]);
\`\`\`

The function runs **after** React has updated the page. Usually the browser has painted by then.

Think of it as **keeping in step**, and not as "run this at the start". The effect describes: as long as the component is on the screen with these values, the outside should look like this.

So the first question is always: **is there anything outside?** If not, you probably don't need an effect.`,
        ),
        jsx(
          "what-code",
          "The size of the window is outside React",
          `function App() {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const onResize = () => setWidth(window.innerWidth);
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);

  return <p>The preview is {width} pixels wide.</p>;
}`,
        ),
        question(
          "q-what",
          "outside",
          "Which of these needs an effect?",
          { total: ["Showing the total of a cart", "effect-for-calc"], socket: "Connecting to a chat server while the page is open", click: "Sending a form when a button is pressed" },
          "socket",
          "The connection is something outside that must be in step with the component. A total is calculated, and a click has a handler.",
        ),
      ],
    },
    {
      id: "deps",
      title: "The dependency list",
      simpler: "The list is the answer to: what do you look at? If one of these things changes, look again. Don't leave anything out just to be left alone.",
      blocks: [
        text(
          "deps-1",
          `The second argument says **when the effect runs again**.

- \`[a, b]\`: after the first render, and whenever a or b has changed
- \`[]\`: only after the first render
- no list: after **every** render

You don't **choose** the list. It is the answer to the question: which values from the component (props, state, functions made in it) does the effect **use**? All of them belong in it. The lint rule \`exhaustive-deps\` checks this. Don't switch it off.

If you leave something out, the effect keeps the **old** value in its closure, a **stale closure**.

If the effect then runs too often, **change the code** and not the list:

- use the function form: \`setCount((c) => c + 1)\` doesn't need count;
- create objects and functions **inside** the effect, because new ones are different at each render;
- move what doesn't depend on the component outside.`,
        ),
        jsx(
          "deps-code",
          "The first counter is stuck at 1, the second works",
          `function App() {
  const [stuck, setStuck] = useState(0);
  const [works, setWorks] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setStuck(stuck + 1);      // always 0 + 1
      setWorks((n) => n + 1);   // the latest value
    }, 500);
    return () => clearInterval(id);
  }, []);

  return <p>Stuck: {stuck}, works: {works}</p>;
}`,
        ),
        question(
          "q-deps",
          "deps",
          "An effect uses `roomId` from the props. What belongs in the list?",
          { empty: ["Nothing: []", "empty-once"], room: "[roomId]", none: "No list at all" },
          "room",
          "It has to run again when another room is chosen.",
        ),
        question(
          "q-stale",
          "stale",
          "Why is the first counter in the example stuck at 1?",
          { interval: "The interval runs only once", closure: "The effect sees the value of the first render, 0, forever", cleanup: "The cleanup resets it" },
          "closure",
          "The closure keeps the stuck of the first render. The function form gets the latest value.",
        ),
        realCase(
          "deps-case",
          "A loop that cost money",
          "An effect loads data and has an object in its list: `[options]`, with `const options = { page }` in the component.",
          "The page sent hundreds of requests per minute, until the bill arrived.",
          "The object is new at each render, so the effect ran each time. It set state, which caused the next render.",
          "The object is created inside the effect, and the list contains only `[page]`.",
        ),
      ],
    },
    {
      id: "cleanup",
      title: "Cleanup",
      simpler: "Who turns on the tap turns it off. If you turn on a second tap without closing the first, both run.",
      blocks: [
        text(
          "cleanup-1",
          `If an effect **starts** something, it has to **stop** it. The function it returns is the **cleanup**. React calls it

- **before the effect runs again**, with the old values, and
- when the component **goes away**.

| Effect | Cleanup |
| --- | --- |
| \`setInterval\` | \`clearInterval\` |
| \`addEventListener\` | \`removeEventListener\` |
| connect | disconnect |
| a request | ignore its answer, or abort it |

Without cleanup, each run adds another timer or listener. That's the answer to the question at the top.

In development, **Strict Mode** runs effects twice at the start: run, clean up, run. If you notice that, your cleanup is incomplete. Don't prevent it with a flag. It would also happen for real when someone leaves the page and comes back.`,
        ),
        picture("cleanup-pic", "effect-cycle", "Effect, cleanup with old values, effect with new values, cleanup at the end"),
        jsx(
          "cleanup-code",
          "Watch the order in the console",
          `function Room({ name }) {
  useEffect(() => {
    console.log("connect to " + name);
    return () => console.log("disconnect from " + name);
  }, [name]);
  return <p>You are in {name}</p>;
}

function App() {
  const [name, setName] = useState("kitchen");
  return (
    <div>
      <button onClick={() => setName("kitchen")}>Kitchen</button>{" "}
      <button onClick={() => setName("garden")}>Garden</button>
      <Room name={name} />
    </div>
  );
}`,
        ),
        question(
          "q-cleanup",
          "cleanup",
          "`name` changes from kitchen to garden. What happens first?",
          { connect: "connect to garden", disconnect: "disconnect from kitchen", both: "Both at the same time" },
          "disconnect",
          "The cleanup runs first, with the old values, and then the effect with the new ones.",
        ),
        question(
          "q-strict",
          "cleanup",
          "In development, \"connect\" appears twice. What do you do?",
          { off: ["Switch off Strict Mode", "strict-bug"], flag: ["Use a flag so that it runs only once", "strict-bug"], check: "Check that the cleanup really disconnects" },
          "check",
          "With a correct cleanup, connecting twice does no harm, because the first is closed.",
          { difficulty: 2 },
        ),
      ],
    },
    {
      id: "not",
      title: "When you don't need one",
      simpler: "Don't send a letter to yourself to find out what you already know. If you can work it out right now, do it.",
      blocks: [
        text(
          "not-1",
          `Many effects shouldn't exist. They make code slower and harder to follow.

**Calculating values.** \`fullName\` from first and last name, a filtered list, a total: calculate while rendering. With an effect, React first renders with the **old** value, then sets state and renders again. For something really slow there's \`useMemo\`.

**Reacting to a click.** Put it in the handler. There you know **why** it happens.

**Resetting state when a prop changes.** Use a \`key\`.

**Telling the parent.** Call its function in the same handler, or move the state up.

**Chains of effects**, where one sets state that triggers the next, are the hardest to understand. Calculate what you can, and set the rest together in one handler.

What is left are real connections to the outside.`,
        ),
        question(
          "q-not",
          "not-needed",
          "AI wrote an effect to keep `total` up to date. What is better?",
          { memo: "Two effects", calc: "const total = items.length * price while rendering", keep: ["Nothing, effects are for this", "effect-for-calc"] },
          "calc",
          "It follows from other values, so it needs neither state nor an effect.",
          { kind: "find-bug", code: `useEffect(() => {\n  setTotal(items.length * price);\n}, [items, price]);` },
        ),
        realCase(
          "not-case",
          "Five effects and a flicker",
          "A form has five effects. Each sets one field when another changes: country, language, currency, tax, price.",
          "After choosing a country, the price jumped three times before it was right.",
          "Each effect caused another render, and between them wrong combinations were shown.",
          "Currency, tax and price are calculated from the country while rendering. Only the country is state.",
        ),
        compare(
          "not-compare",
          `const [full, setFull] = useState("");
useEffect(() => {
  setFull(first + " " + last);
}, [first, last]);`,
          `const full = first + " " + last;`,
          "The right side is always correct, needs one render, and can't be forgotten.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["Timers, listeners and connections", "Libraries that aren't React", "A cleanup for everything you start"],
    avoid: ["Effects for calculated values", "Effects for what a click causes", "Leaving values out of the list"],
  },

  explain: {
    prompt: "What is an effect for, what belongs in the dependency list, and when does the cleanup run?",
    modelAnswer:
      "An effect keeps something outside React in step with the component, such as a timer, a listener or a connection. The list names every value from the component that the effect uses. If I leave one out, the closure keeps the old value of its render. The cleanup stops what the effect started. It runs before the effect runs again, with the old values, and when the component goes away. I don't need an effect to calculate values or for what a click causes.",
  },

  reviewQuestions: [
    reviewQuestion("r-none", "deps", "An effect has no dependency list. When does it run?", { once: ["Once", "empty-once"], every: "After every render", never: "Never" }, "every", "Without a list it runs each time."),
    reviewQuestion("r-old", "cleanup", "Which values does the cleanup see?", { new: "The new ones", old: "Those of the render its effect belongs to", none: "None" }, "old", "It has to undo exactly what its own effect started."),
    reviewQuestion("r-reset", "not-needed", "A form should start empty for each user. What do you use?", { effect: ["An effect that empties the fields", "effect-for-calc"], key: "key={user.id}", memo: "useMemo" }, "key", "Another key gives a fresh component."),
  ],

  summary: [
    "Effects are for things outside React",
    "The list names everything the effect uses",
    "Cleanup stops what the effect started",
    "Calculate while rendering; clicks belong in handlers",
  ],

  sources: [
    { label: "React: Synchronizing with effects", url: "https://react.dev/learn/synchronizing-with-effects" },
    { label: "React: You might not need an effect", url: "https://react.dev/learn/you-might-not-need-an-effect" },
    { label: "React: Removing effect dependencies", url: "https://react.dev/learn/removing-effect-dependencies" },
  ],
};
