// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-lifting-state",
  title: "Lifting state",
  mystery: "Two components show the same number, and they disagree. Who is right?",
  minutes: 25,
  lang: "jsx",
  requires: ["react-props", "react-state"],

  shortAnswer:
    "If two components need the same data, the state belongs in their closest common parent. It passes the value down and a function to change it. Then there is one truth, and they can't disagree.",

  ideas: [
    { id: "one-truth", text: "Each piece of data has exactly one owner" },
    { id: "common-parent", text: "Shared state lives in the closest common parent" },
    { id: "lift-steps", text: "Lifting: remove the state from the child, add it to the parent, pass value and function down" },
    { id: "keep-low", text: "Keep state as low as possible and lift it only when needed" },
  ],

  misconceptions: [
    {
      id: "copy-prop",
      belief: "you can copy a prop into state to work with it",
      correction: "The copy is made once and doesn't follow when the prop changes. Use the prop, or make the component own the data.",
    },
    {
      id: "sync-effect",
      belief: "two states can be kept equal with an effect",
      correction: "Then there are still two truths, with moments when they differ. Keep one and lift it.",
    },
    {
      id: "all-top",
      belief: "all state should be at the top of the app",
      correction: "Then everything renders at each change, and nobody knows what belongs where. Lift only as far as needed.",
    },
  ],

  sections: [
    {
      id: "truth",
      title: "One owner",
      simpler: "If two people each keep their own shopping list, one day they differ. Put one list on the fridge, and both look at it.",
      blocks: [
        text(
          "truth-1",
          `Two components that each have their **own** state know nothing of each other. If both show "the number of items", both can be wrong. The principle against it is called **single source of truth**: for every piece of data there is **one** component that owns it. All others get it as a **prop**.

It doesn't mean that all state is in one place. It means that no data exists **twice**.

A typical mistake is to copy a prop into state: \`const [value, setValue] = useState(props.value)\`. The initial value is used **only at the first render**. If the parent later passes another one, the state doesn't follow.

An effect that keeps two states equal isn't a solution either. There is always a render in which they differ, and each new place has to be remembered.`,
        ),
        jsx(
          "truth-code",
          "Two owners: each counts for itself",
          `function Counter() {
  const [n, setN] = useState(0);
  return <button onClick={() => setN(n + 1)}>Count: {n}</button>;
}

function App() {
  return (
    <div>
      <Counter /> <Counter />
      <p>Which one is the real count?</p>
    </div>
  );
}`,
        ),
        question(
          "q-truth",
          "one-truth",
          "`const [name, setName] = useState(props.name)`. The parent later passes another name. What is shown?",
          { new: ["The new name", "copy-prop"], old: "The old name", none: "Nothing" },
          "old",
          "The initial value counts only for the first render.",
        ),
      ],
    },
    {
      id: "lift",
      title: "How to lift state",
      simpler: "Two children quarrel over one toy. The parent takes it. The parent lets both see it, and whoever wants to play has to ask.",
      blocks: [
        text(
          "lift-1",
          `Suppose two components have to show or change the same thing. Three steps:

1. **Remove** the state from the children.
2. **Add** it to their **closest common parent**.
3. **Pass** it down: the value as a prop, and a function for changing it.

The children are now **controlled** by the parent, just like a controlled input.

How do you find the right place? Mark all components that **use** the data, and go up from each until they meet. That's where it belongs, or above.

The function should say **what happened**, not how to change the state: \`onAdd(title)\` is better than passing \`setTasks\`. The child then doesn't need to know how the list is stored.`,
        ),
        picture("lift-pic", "lifting-state", "Two children had their own state; now the parent owns it"),
        jsx(
          "lift-code",
          "One owner: both show the same",
          `function Counter({ count, onAdd }) {
  return <button onClick={onAdd}>Count: {count}</button>;
}

function App() {
  const [count, setCount] = useState(0);
  const add = () => setCount((c) => c + 1);

  return (
    <div>
      <Counter count={count} onAdd={add} /> <Counter count={count} onAdd={add} />
      <p>Total: {count}</p>
    </div>
  );
}`,
        ),
        question(
          "q-lift",
          "common-parent",
          "A filter bar and a list, both in `Page`, need the search text. Where does it belong?",
          { bar: "In the filter bar", both: ["In both, kept equal with an effect", "sync-effect"], page: "In Page" },
          "page",
          "Page is their closest common parent.",
        ),
        question(
          "q-steps",
          "lift-steps",
          "After lifting, what does a child get from the parent?",
          { value: "Only the value", both: "The value and a function to ask for a change", state: "Its own copy of the state" },
          "both",
          "The child shows the value and reports what happened. The parent changes the state.",
        ),
        realCase(
          "lift-case",
          "The cart that lost an item",
          "The product page and the header each loaded the cart into their own state.",
          "After adding a book, the product page said 3 and the header said 2. Customers clicked again and bought two.",
          "Each had its own copy of the cart, and only one was updated.",
          "The cart moved into the component above both. Today it would be in a store or in React Query.",
        ),
      ],
    },
    {
      id: "low",
      title: "As low as possible",
      simpler: "Don't put your toothbrush in the town hall. Keep things where they are used, and move them only when others need them too.",
      blocks: [
        text(
          "low-1",
          `Lifting has a price. The parent and **everything below** render at each change, and props travel through components that don't need them.

So start **low**: a component that alone uses a state keeps it. Whether a menu is open rarely concerns anyone else. Lift when a **second** component needs it, and only as far as their common parent. If later only one needs it, move it back down.

When a value travels through many levels, it's **prop drilling**. Two or three levels are fine. Before reaching for something bigger, try **composition**: pass finished elements as \`children\`. For things that really are needed everywhere, such as the user or the theme, there are Context and stores, which come in the next layer.

Data from a **server** is special: your copy can get old. Libraries such as TanStack Query are made for that.`,
        ),
        jsx(
          "low-code",
          "Open or closed concerns nobody else, so it stays down here",
          `function Section({ title, children }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button aria-expanded={open} onClick={() => setOpen(!open)}>{title}</button>
      {open && <p>{children}</p>}
    </div>
  );
}

function App() {
  return (
    <div>
      <Section title="Delivery">Two days.</Section>
      <Section title="Returns">Within 30 days.</Section>
    </div>
  );
}`,
        ),
        question(
          "q-low",
          "keep-low",
          "Only a dropdown knows whether it is open. Where does the state belong?",
          { top: ["At the top of the app", "all-top"], dropdown: "In the dropdown", context: "In Context" },
          "dropdown",
          "Nobody else needs it. Lift it when somebody does.",
        ),
        question(
          "q-accordion",
          "keep-low",
          "Now only **one** section may be open at a time. What changes?",
          { nothing: "Nothing", lift: "The parent has to know which one is open, so the state is lifted", effect: ["Each section watches the others with an effect", "sync-effect"] },
          "lift",
          "Now the sections depend on each other, so their common parent owns the state: the id of the open one.",
          { difficulty: 2 },
        ),
        realCase(
          "low-case",
          "Every letter rendered the whole app",
          "To be \"prepared for everything\", a team kept all state at the top, even the text of the search field.",
          "Typing was slow, and the top component had 40 states.",
          "Each letter rendered the top component and everything below it.",
          "Everything that only one part used was moved down. Eight states stayed at the top.",
        ),
      ],
    },
    {
      id: "design",
      title: "Planning a screen",
      simpler: "First draw the rooms, then decide what has to be remembered, then who remembers it. Only then build the doors.",
      blocks: [
        text(
          "design-1",
          `For a new screen, such as the task manager of this layer, this order helps:

1. **Draw** the components: \`App\`, \`AddTask\`, \`Filter\`, \`TaskList\`, \`Task\`.
2. Build it **without state**, with fixed data. Props only.
3. Find the **smallest state**. Tasks: yes. The chosen filter: yes. The filtered list: no, it can be calculated. The text being typed: yes.
4. Decide **where** it lives. Tasks and filter are needed by several components, so they go into \`App\`. The text being typed concerns only \`AddTask\`.
5. Add the functions for the way **up**: \`onAdd\`, \`onDelete\`, \`onFilter\`.

This is the method from the React documentation, *Thinking in React*.`,
        ),
        jsx(
          "design-code",
          "The plan, carried out",
          `function AddTask({ onAdd }) {
  const [title, setTitle] = useState("");
  const submit = (e) => {
    e.preventDefault();
    if (title.trim() === "") return;
    onAdd(title.trim());
    setTitle("");
  };
  return (
    <form onSubmit={submit}>
      <input aria-label="New task" value={title} onChange={(e) => setTitle(e.target.value)} /> <button>Add</button>
    </form>
  );
}

function App() {
  const [tasks, setTasks] = useState([{ id: 1, title: "Draw components", done: true }]);
  const [onlyOpen, setOnlyOpen] = useState(false);

  const shown = onlyOpen ? tasks.filter((t) => !t.done) : tasks; // calculated
  const add = (title) => setTasks([...tasks, { id: Date.now(), title, done: false }]);
  const toggle = (id) => setTasks(tasks.map((t) => (t.id === id ? { ...t, done: !t.done } : t)));

  return (
    <div>
      <AddTask onAdd={add} />
      <label><input type="checkbox" checked={onlyOpen} onChange={(e) => setOnlyOpen(e.target.checked)} /> only open</label>
      <ul>
        {shown.map((t) => (
          <li key={t.id}><label><input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} /> {t.title}</label></li>
        ))}
      </ul>
    </div>
  );
}`,
        ),
        question(
          "q-design",
          "one-truth",
          "In the task manager, which of these should **not** be state?",
          { tasks: "The tasks", filter: "The chosen filter", shown: "The filtered list" },
          "shown",
          "It can be calculated from the other two.",
        ),
        compare(
          "design-compare",
          `<AddTask setTasks={setTasks} tasks={tasks} />`,
          `<AddTask onAdd={(title) => setTasks([...tasks, makeTask(title)])} />`,
          "On the right, AddTask only reports a title. It doesn't have to know how tasks are stored, so it can be used and tested alone.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["Lifting when two components need the same data", "Local state when only one does", "Functions that say what happened"],
    avoid: ["Copying props into state", "Keeping two states equal with an effect", "Everything at the top, just in case"],
  },

  explain: {
    prompt: "Two components need the same data. Describe how you lift the state, and how you decide where it belongs.",
    modelAnswer:
      "Each piece of data should have one owner. I remove the state from both components, add it to their closest common parent, and pass down the value and a function that says what happened. To find the place, I go up from all components that use the data until they meet. I keep state as low as possible and lift it only when a second component needs it, because everything below renders with it.",
  },

  reviewQuestions: [
    reviewQuestion("r-where", "common-parent", "Where does shared state live?", { top: ["Always at the top", "all-top"], common: "In the closest common parent", child: "In the child that changes it" }, "common", "High enough for all who need it, and no higher."),
    reviewQuestion("r-back", "keep-low", "Only one component still uses a lifted state. What do you do?", { leave: "Leave it at the top, to be safe", down: "Move it back down", copy: ["Copy it", "copy-prop"] }, "down", "State belongs as low as possible."),
    reviewQuestion("r-fn", "lift-steps", "Which prop is the better design for a child?", { set: "setTasks", on: "onDelete(id)", tasks: "tasks and setTasks" }, "on", "It says what happened and hides how the data is stored."),
  ],

  summary: [
    "One owner for each piece of data",
    "Shared: in the closest common parent",
    "Value down, function down, report up",
    "As low as possible, as high as needed",
  ],

  sources: [
    { label: "React: Sharing state between components", url: "https://react.dev/learn/sharing-state-between-components" },
    { label: "React: Thinking in React", url: "https://react.dev/learn/thinking-in-react" },
  ],
};
