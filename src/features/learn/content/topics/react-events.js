// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-events",
  title: "Events in React",
  mystery: "The page renders again and again until it crashes. One pair of parentheses did it. Which?",
  minutes: 25,
  lang: "jsx",
  requires: ["react-props", "web-events"],

  shortAnswer:
    "In React you pass a function to a prop such as onClick. React listens at the root of your app and calls your function with a synthetic event, which behaves like the browser's event and works the same everywhere.",

  ideas: [
    { id: "pass-function", text: "You pass a function, and React calls it when the event happens" },
    { id: "synthetic", text: "React wraps the browser's event in a synthetic event; since React 17 there is no pooling" },
    { id: "root", text: "React listens at the root, and events bubble along the component tree" },
    { id: "where-work", text: "Work caused by a user's action belongs in the handler, not in an effect" },
  ],

  misconceptions: [
    {
      id: "call-now",
      belief: "onClick={save()} calls save when you click",
      correction: "It calls save while rendering. Pass save, or () => save(id).",
    },
    {
      id: "pooling",
      belief: "you must call event.persist() to use an event later",
      correction: "That was needed before React 17, which removed event pooling. In React 17 and later you can simply use it.",
    },
    {
      id: "return-false",
      belief: "return false in a handler stops the default action",
      correction: "In React it does nothing. Call event.preventDefault().",
    },
  ],

  sections: [
    {
      id: "pass",
      title: "Passing a handler",
      simpler: "You leave your phone number, so React can call you. If you write the parentheses, you're calling yourself, right now.",
      blocks: [
        text(
          "pass-1",
          `An event prop takes a **function**: \`onClick={handleClick}\`. Event names are written with a capital letter inside: \`onClick\`, \`onChange\`, \`onSubmit\`, \`onKeyDown\`.

Without parentheses you pass the function. With them you **call** it, while React is rendering, and pass on its result. If that call sets state, React renders again, calls it again, and so on: *Too many re-renders*. That's the answer to the question at the top.

If you need an argument, wrap it: \`onClick={() => remove(id)}\`.

The handler is created in the render, so it is a **closure**. It sees the props and state of **that** render. This is usually what you want: the user clicked on what they saw.`,
        ),
        jsx(
          "pass-code",
          "With an argument and with the event",
          `function App() {
  const [last, setLast] = useState("nothing yet");

  const choose = (name) => setLast(name);

  return (
    <div>
      <p>Last: {last}</p>
      <button onClick={() => choose("tea")}>Tea</button>{" "}
      <button onClick={() => choose("coffee")}>Coffee</button>{" "}
      <button onClick={(event) => setLast(event.type + " on " + event.currentTarget.textContent)}>Event</button>
    </div>
  );
}`,
        ),
        question(
          "q-pass",
          "pass-function",
          "`<button onClick={setOpen(true)}>` leads to *Too many re-renders*. Why?",
          {
            call: "setOpen runs at each render, which causes the next render",
            click: ["The button is clicked too often", "call-now"],
            type: "setOpen can't be used in a button",
          },
          "call",
          "Write onClick={() => setOpen(true)}.",
        ),
        question(
          "q-arg",
          "pass-function",
          "How do you pass the id of a row to its delete handler?",
          { call: ["onClick={remove(row.id)}", "call-now"], arrow: "onClick={() => remove(row.id)}", string: 'onClick="remove(row.id)"' },
          "arrow",
          "The arrow function is called on click and then calls remove with the id.",
        ),
      ],
    },
    {
      id: "synthetic",
      title: "Synthetic events",
      simpler: "Every country has its own plugs. React gives you an adapter, so your device fits everywhere. The original plug is still inside.",
      blocks: [
        text(
          "synthetic-1",
          `Your handler gets a **synthetic event**. It is React's wrapper around the browser's event, with the same interface: \`target\`, \`currentTarget\`, \`preventDefault()\`, \`stopPropagation()\`. It smooths out differences between browsers. The original is in \`event.nativeEvent\`.

**About pooling.** Until React 16, React **reused** event objects. After the handler, all fields were emptied, and if you wanted to read them later, in a timer for example, you had to call \`event.persist()\`. **React 17 removed this.** You'll still find it in old articles and in code written by AI. You don't need it any more.

One thing still holds: \`currentTarget\` is only set **while** the event is being handled, as in the browser itself. If you need it after an await, put it into a variable first.

A difference to the browser: \`onChange\` on a text field fires with **every key**. In plain DOM, \`change\` fires only when you leave the field, and \`input\` with every key.`,
        ),
        picture("synthetic-pic", "react-events", "The browser's event is wrapped by React and passed to your handler"),
        jsx(
          "synthetic-code",
          "Reading the event later works without persist",
          `function App() {
  const [info, setInfo] = useState("");

  const handle = (event) => {
    const button = event.currentTarget; // only set while handling
    setTimeout(() => {
      setInfo(event.type + ", target: " + event.target.textContent + ", saved: " + button.textContent);
    }, 300);
  };

  return (
    <div>
      <button onClick={handle}>Press me</button>
      <p>{info}</p>
    </div>
  );
}`,
        ),
        realCase(
          "synthetic-case",
          "Forty calls of persist",
          "A team upgrades an old app to React 19. All its handlers call `event.persist()`.",
          "New developers copied it into each new handler, and nobody could say why.",
          "It was needed before React 17. Since then the method does nothing in web apps.",
          "They removed all the calls. Nothing changed, except that the code became shorter.",
        ),
        question(
          "q-synthetic",
          "synthetic",
          "In React 19 you read `event.target.value` inside a setTimeout. What do you have to do?",
          { persist: ["Call event.persist() first", "pooling"], nothing: "Nothing special", native: "Use event.nativeEvent only" },
          "nothing",
          "Events are no longer pooled since React 17.",
        ),
      ],
    },
    {
      id: "root",
      title: "Where React listens",
      simpler: "Instead of a bell at every door, there's one at the house entrance. The porter knows who lives where and passes on the message.",
      blocks: [
        text(
          "root-1",
          `React doesn't put a listener on every button. It puts one per event type on the **root** of your app, the element you gave to \`createRoot\`. This is **delegation**, done for you. (Until React 16 it was the document. Since 17 it's the root, so that several React versions can live on one page.)

For you, events **bubble along the component tree**: from the button to its parents, as you'd expect. A click on a button inside a clickable card runs both handlers. Stop it where it makes sense with \`event.stopPropagation()\`, or better, avoid nested clickable things. They are also hard to use with a keyboard.

This even works for **portals**: a dialog may be somewhere else in the DOM, but its events go to its **React** parent.

\`preventDefault\` is as in the browser. But \`return false\` does nothing in React.`,
        ),
        question(
          "q-root",
          "root",
          "A dialog is rendered with a portal at the end of the body. A click in it has no handler there. Where does the event go?",
          { body: "To the body only", parent: "To the React parent of the dialog", lost: "Nowhere" },
          "parent",
          "React events bubble along the component tree, not only along the DOM.",
          { difficulty: 3 },
        ),
        question(
          "q-false",
          "root",
          "A form should not reload the page. What do you write in onSubmit?",
          { false: ["return false", "return-false"], prevent: "event.preventDefault()", stop: "event.stopPropagation()" },
          "prevent",
          "It cancels the browser's default action. return false has no effect in React.",
        ),
        compare(
          "root-compare",
          `<div onClick={open}>
  <button onClick={like}>Like</button>
</div>`,
          `<article>
  <a href={url}>Read more</a>
  <button onClick={like}>Like</button>
</article>`,
          "On the left, liking also opens the card, and the div can't be reached with the keyboard. On the right, each thing does one job.",
        ),
      ],
    },
    {
      id: "where",
      title: "Handlers are the place for actions",
      simpler: "If it happens because someone pressed a button, do it where the button is pressed. Not somewhere else, where you have to guess why.",
      blocks: [
        text(
          "where-1",
          `While **rendering**, a component must be pure: no requests, no changes outside. In an **event handler** you may do all that: send a request, save, navigate, set state.

A common mistake is to do it in a roundabout way: the handler sets a state such as \`submitted\`, and an **effect** watches it and sends the request. This makes it harder to see **why** something is sent. It may be sent twice, because effects run again in development or when a dependency changes.

Ask: **why** should this happen? Because the user **did** something? Then the handler. Because the component is **on the screen**? Then an effect.

Name your handlers by what they do: \`handleSubmit\`, \`removeTask\`. And if several handlers do the same, put it into a function that they call.`,
        ),
        jsx(
          "where-code",
          "Everything that belongs to the action in one place",
          `function App() {
  const [status, setStatus] = useState("idle");

  const send = () => new Promise((resolve) => setTimeout(resolve, 600));

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    await send();
    setStatus("sent");
  }

  return (
    <form onSubmit={handleSubmit}>
      <button disabled={status === "sending"}>Send</button>
      <p>Status: {status}</p>
    </form>
  );
}`,
        ),
        realCase(
          "where-case",
          "The order that was sent twice",
          "A click sets `ordered` to true. An effect with `[ordered, cart]` sends the order.",
          "If the cart was updated right after that, for example by a new price, the order was sent again.",
          "The effect ran again because cart had changed. It didn't know that the user had clicked only once.",
          "The request moved into the click handler. One click, one order.",
        ),
        question(
          "q-where",
          "where-work",
          "A message should be sent when the user presses \"Send\". Where does the request belong?",
          { effect: "In an effect that watches the text", handler: "In the event handler", render: "In the body of the component" },
          "handler",
          "It happens because of an action of the user.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["Handlers for everything the user causes", "Arrow functions to pass arguments", "preventDefault in onSubmit"],
    avoid: ["Parentheses after the handler's name", "event.persist() in React 17 and later", "Clickable things inside clickable things"],
  },

  explain: {
    prompt: "What do you pass to onClick, what does your handler receive, and where does React really listen? What about pooling?",
    modelAnswer:
      "I pass a function, not a call, because a call would run while rendering. My handler gets a synthetic event, which wraps the browser's event and behaves the same everywhere. Pooling was removed in React 17, so persist is no longer needed. React listens at the root of the app, and events bubble along the component tree. Work that happens because of a user's action belongs in the handler and not in an effect.",
  },

  reviewQuestions: [
    reviewQuestion("r-change", "synthetic", "When does `onChange` fire on a text field in React?", { blur: "When the field loses focus", key: "With every change of the text", enter: "When Enter is pressed" }, "key", "In React it behaves like the input event of the DOM."),
    reviewQuestion("r-pool", "synthetic", "What happened to event pooling?", { still: ["It is still there", "pooling"], gone: "It was removed in React 17", new: "It came with React 18" }, "gone", "Old articles and AI answers often still mention it."),
    reviewQuestion("r-root", "root", "On which element does React 19 register its listeners?", { each: "On each button", doc: "On document", root: "On the root container of the app" }, "root", "Since React 17 it is the root and no longer the document."),
  ],

  summary: [
    "Pass the function, don't call it",
    "Synthetic events work everywhere; pooling is gone",
    "React listens at the root; events bubble through components",
    "Actions of the user belong in handlers",
  ],

  sources: [
    { label: "React: Responding to events", url: "https://react.dev/learn/responding-to-events" },
    { label: "React: Common components, event object", url: "https://react.dev/reference/react-dom/components/common#react-event-object" },
    { label: "React 17: No event pooling", url: "https://legacy.reactjs.org/blog/2020/10/20/react-v17.html#no-event-pooling" },
  ],
};
