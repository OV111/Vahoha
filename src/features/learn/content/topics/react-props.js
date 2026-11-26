// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-props",
  title: "Props: data down, events up",
  mystery: "The child changed its prop. Why did nothing happen?",
  minutes: 30,
  lang: "jsx",
  requires: ["react-jsx", "js-destructuring"],

  shortAnswer:
    "Props are the values a parent gives to a child. The child may read them but not change them. If it wants a change, it calls a function that the parent passed down. So data flows down, and events go up.",

  ideas: [
    { id: "props-in", text: "Props are the arguments of a component, given by its parent" },
    { id: "read-only", text: "A component never changes its props" },
    { id: "callbacks-up", text: "A child asks for a change by calling a function from its parent" },
    { id: "children", text: "children is what stands between the opening and closing tag" },
    { id: "one-way", text: "Data flows one way, so you can find where a value comes from" },
  ],

  misconceptions: [
    {
      id: "mutate-props",
      belief: "a child can change its props to update the parent",
      correction: "Props are read-only. The child has to ask, by calling a function the parent passed down.",
    },
    {
      id: "call-in-prop",
      belief: "you pass a call such as onClick={remove(id)}",
      correction: "That runs it while rendering. Pass a function: onClick={() => remove(id)}.",
    },
    {
      id: "strings-only",
      belief: "props can only be text",
      correction: "Props can be anything: numbers, arrays, objects, functions and JSX.",
    },
  ],

  sections: [
    {
      id: "in",
      title: "Passing props",
      simpler:
        "A component is a recipe, and props are the ingredients. The same recipe with other ingredients gives another dish.",
      blocks: [
        text(
          "in-1",
          `A component without props always looks the same. **Props** make it useful in many places. You write them like attributes, and the component gets them as **one object**, its first argument. Usually you unpack it right there:

\`\`\`jsx
function Price({ value, currency = "€" }) {
  return <b>{value} {currency}</b>;
}

<Price value={20} />
\`\`\`

A default is used when the prop is missing or \`undefined\`, but not for \`null\`.

Text can be written in quotes, everything else in braces: \`count={3}\`, \`user={user}\`, \`onSave={save}\`. \`count="3"\` would be a string. A prop without a value is \`true\`: \`<Button disabled />\`.

\`{...props}\` passes on everything. It's handy for wrappers around an HTML element, but it hides what is really needed, so use it rarely.`,
        ),
        jsx(
          "in-code",
          "The same component with different props",
          `function Product({ name, price, soldOut = false }) {
  return (
    <p>
      {name}: {price} € {soldOut && <i>sold out</i>}
    </p>
  );
}

function App() {
  return (
    <div>
      <Product name="Bread" price={3} />
      <Product name="Cake" price={18} soldOut />
    </div>
  );
}`,
        ),
        question(
          "q-in",
          "props-in",
          "What is the type of `count` in `<Counter count=\"3\" />`?",
          { number: "number", string: "string", any: ["Props are always strings", "strings-only"] },
          "string",
          "Quotes make it text. Write count={3} for a number.",
        ),
      ],
    },
    {
      id: "readonly",
      title: "Props are read-only",
      simpler:
        "You borrow a book from the library. You may read it. You don't cross out sentences, because it isn't yours, and others read it too.",
      blocks: [
        text(
          "readonly-1",
          `A component may **read** its props but **never change** them. There are two reasons.

First, it wouldn't work. If you write \`count = count + 1\`, you change a local variable. React doesn't know about it and renders nothing new. At the next render, the old value comes from the parent again. That's the answer to the question at the top.

Second, it would be dangerous. An object or array in the props is the **same** object the parent has. \`items.sort()\` in a child changes the parent's data behind its back, and other components show something strange.

A component should be **pure** while rendering: the same props give the same result, and nothing outside is changed. So make a copy: \`[...items].sort()\` or \`items.toSorted()\`.`,
        ),
        question(
          "q-assign",
          "read-only",
          "A child runs `count = count + 1` with its prop and nothing changes on the screen. Why?",
          {
            local: "It changes only a local variable, and React doesn't know about it",
            slow: ["The parent updates it a bit later", "mutate-props"],
            text: ["Props are text, so + joins", "strings-only"],
          },
          "local",
          "The child has to ask the parent, by calling a function it got as a prop.",
        ),
        realCase(
          "readonly-case",
          "The list that sorted itself everywhere",
          "A component \"Top 3\" gets a list of products, sorts it with `products.sort(...)` and shows the first three.",
          "Suddenly the main list on the same page was sorted by price too, though nobody had asked for it.",
          "sort changes the array itself, and both components have the same array.",
          "`products.toSorted(...)` makes a new array and leaves the original alone.",
        ),
        question(
          "q-readonly",
          "read-only",
          "A child runs `props.user.name = \"Bo\"`. What is wrong?",
          {
            nothing: ["Nothing, that's how a child updates its parent", "mutate-props"],
            shared: "It changes the parent's object, and React doesn't notice",
            error: "user can't be a prop",
          },
          "shared",
          "The object is shared. Nothing is rendered again because of it, and other places may show the new name by accident.",
          { difficulty: 2 },
        ),
      ],
    },
    {
      id: "up",
      title: "Events go up",
      simpler:
        "A child at the table can't pass the salt to itself. It asks, and the parent, who has the salt, does it. For that, the parent gives the child a bell to ring.",
      blocks: [
        text(
          "up-1",
          `If the data belongs to the parent, only the parent can change it. So the parent passes a **function** down, and the child calls it.

\`\`\`jsx
<Task task={task} onDelete={() => removeTask(task.id)} />
\`\`\`

By custom, such props begin with \`on\`: they say **what happened**. The function in the parent often begins with \`handle\`, or says what it does.

The child doesn't need to know what happens then. It only reports "delete was pressed". So you can use the same child elsewhere with a different reaction.

Pass the **function**, not a call. \`onDelete={removeTask(task.id)}\` would run it during rendering, for every task at once.

This **one-way flow** makes bugs easier to find. If a value on the screen is wrong, you go **up** until you find who owns it. Nobody else can have changed it.`,
        ),
        picture("up-pic", "data-flow", "Data goes down as props, events come up through functions"),
        jsx(
          "up-code",
          "The parent owns the list, the child only reports",
          `function Task({ title, onDelete }) {
  return (
    <li>
      {title} <button onClick={onDelete}>Delete</button>
    </li>
  );
}

function App() {
  const [tasks, setTasks] = useState(["Learn props", "Build a list"]);

  const remove = (title) => setTasks(tasks.filter((t) => t !== title));

  return (
    <ul>
      {tasks.map((t) => (
        <Task key={t} title={t} onDelete={() => remove(t)} />
      ))}
    </ul>
  );
}`,
        ),
        question(
          "q-up",
          "callbacks-up",
          "AI wrote `<button onClick={remove(task.id)}>`. What happens?",
          {
            click: ["It removes the task when clicked", "call-in-prop"],
            render: "remove runs while rendering, without a click",
            nothing: "Nothing, the syntax is invalid",
          },
          "render",
          "The parentheses call it at once. Write () => remove(task.id).",
          { kind: "find-bug" },
        ),
        question(
          "q-owner",
          "one-way",
          "A wrong name is shown deep inside the page. Where do you look?",
          {
            all: "In every component that shows names",
            up: "Upwards, through the props, until you find the component that owns the name",
            down: "In the children of the component that shows it",
          },
          "up",
          "Data comes from above. The owner is the only one who can have set it.",
        ),
      ],
    },
    {
      id: "children",
      title: "children",
      simpler:
        "Some components are frames. A frame doesn't care which picture is in it. Whatever you put between its tags is the picture.",
      blocks: [
        text(
          "children-1",
          `Whatever stands **between the tags** of a component arrives as the prop \`children\`.

\`\`\`jsx
function Card({ title, children }) {
  return (
    <section>
      <h2>{title}</h2>
      {children}
    </section>
  );
}

<Card title="Profile"><Avatar /><p>Ada</p></Card>
\`\`\`

With this you build **frames**: cards, dialogs, layouts. The frame decides about the surroundings, and whoever uses it decides about the content.

This is **composition**. It is often the best answer to a component that gets more and more props: \`showIcon\`, \`iconPosition\`, \`footerText\`. Instead of ten switches, let the user of the component pass in what they want.

JSX can be passed in other props too: \`<Page sidebar={<Menu />} />\`.

Composition also helps when you pass a prop through many levels that don't need it (**prop drilling**): pass the finished element instead.`,
        ),
        jsx(
          "children-code",
          "A frame that takes any content",
          `function Card({ title, children }) {
  return (
    <section style={{ border: "1px solid #c4b5fd", padding: 12, marginBottom: 12 }}>
      <h3 style={{ margin: 0 }}>{title}</h3>
      {children}
    </section>
  );
}

function App() {
  return (
    <div>
      <Card title="Text"><p>Any content.</p></Card>
      <Card title="Button"><button>Press me</button></Card>
    </div>
  );
}`,
        ),
        realCase(
          "children-case",
          "The button with 23 props",
          "A team's Button had props for icons, their size, their side, a second line, a badge and its colour.",
          "Every new design needed another prop, and nobody dared to remove one.",
          "The component tried to know all the content it might ever have.",
          "The button now takes `children`. Icons, badges and text are simply put inside.",
        ),
        question(
          "q-children",
          "children",
          "A dialog should have a frame with a close button and any content. How do you build it?",
          {
            props: "With one prop for each possible content",
            children: "With children inside the frame",
            copy: "With one dialog component per content",
          },
          "children",
          "The frame stays the same, and whoever uses it puts in the content.",
        ),
        compare(
          "children-compare",
          `<Card
  title="Ada"
  text="Developer"
  showButton
  buttonText="Follow"
  onButton={follow}
/>`,
          `<Card title="Ada">
  <p>Developer</p>
  <button onClick={follow}>Follow</button>
</Card>`,
          "On the right, the card doesn't have to know what is inside it, so it never needs another prop for that.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["Props for everything a component needs to know", "Functions named on... for what happened", "children for frames and layouts"],
    avoid: ["Changing props", "Passing everything on with {...props}", "A new switch prop for every variant"],
  },

  explain: {
    prompt: "How does a child component change something that belongs to its parent? Why may it not change its props?",
    modelAnswer:
      "Props are the arguments a parent gives to a child. They are read-only: assigning changes only a local variable, and changing an object inside changes the parent's data without React noticing. The parent passes a function down, and the child calls it to say what happened. So data flows down and events go up, and I can always follow a value upwards to its owner. children is what stands between the tags, so a component can be a frame for any content.",
  },

  reviewQuestions: [
    reviewQuestion("r-true", "props-in", "What is the value of `disabled` in `<Button disabled />`?", { undef: "undefined", true: "true", empty: "An empty string" }, "true", "A prop without a value is true."),
    reviewQuestion("r-sort", "read-only", "How do you show a list from the props in sorted order?", { sort: ["items.sort()", "mutate-props"], copy: "items.toSorted()", state: "items.reverse()" }, "copy", "sort changes the parent's array. toSorted makes a new one."),
    reviewQuestion("r-drill", "children", "A prop is passed through four components that don't use it. What can help?", { composition: "Passing the finished element as children", copy: "Copying the data in each component", global: ["Changing the prop on the way", "mutate-props"] }, "composition", "Then the components in between don't need to know the prop.", { difficulty: 2 }),
  ],

  summary: [
    "Props come from the parent and are read-only",
    "Pass functions down, call them to report up",
    "One-way flow: go up to find the owner",
    "children makes frames",
  ],

  sources: [
    { label: "React: Passing props to a component", url: "https://react.dev/learn/passing-props-to-a-component" },
    { label: "React: Keeping components pure", url: "https://react.dev/learn/keeping-components-pure" },
    { label: "React: Responding to events", url: "https://react.dev/learn/responding-to-events" },
  ],
};
