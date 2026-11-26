// Same shape as js-closures.js (learn_topics).
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-forms",
  title: "Controlled forms",
  mystery: "You type into the field, and nothing appears. Why?",
  minutes: 30,
  lang: "jsx",
  requires: ["react-state", "react-events"],

  shortAnswer:
    "In a controlled input, React's state is the truth: value comes from state, and onChange updates it. So you can check, change and use the text at every moment.",

  ideas: [
    { id: "controlled", text: "value comes from state and onChange updates it" },
    { id: "uncontrolled", text: "Uncontrolled inputs keep their value in the DOM, and you read it when you need it" },
    { id: "submit", text: "onSubmit on the form, with preventDefault, covers button and Enter" },
    { id: "validation", text: "Validate for help on the client and for safety on the server" },
  ],

  misconceptions: [
    {
      id: "value-only",
      belief: "value alone sets the starting text of an input",
      correction: "value fixes the text at every render. Use defaultValue for a starting text, or add onChange.",
    },
    {
      id: "client-safe",
      belief: "checking the input in the browser is enough",
      correction: "Anyone can send a request without your page. The server has to check everything again.",
    },
    {
      id: "number-number",
      belief: "an input of type number gives you a number",
      correction: "event.target.value is always a string. Convert it yourself.",
    },
  ],

  sections: [
    {
      id: "controlled",
      title: "Controlled inputs",
      simpler: "The field is a screen, and the state is the film. The screen shows only what's in the film. If you type, you have to change the film.",
      blocks: [
        text(
          "controlled-1",
          `A text field of the browser has its own memory: what you type. In React there's often a second one, your state. To avoid two truths, make the **state** the only one:

\`\`\`jsx
<input value={name} onChange={(e) => setName(e.target.value)} />
\`\`\`

This is a **controlled** input. The circle: the user types, \`onChange\` runs, state is set, React renders, \`value\` shows the new text.

If you give \`value\` **without** \`onChange\`, the circle is broken. React sets the text back to the state at every key, and nothing appears. That's the answer to the question at the top.

Because the text is in state, you can use it at once: count characters, disable the button, filter a list, allow only digits.

The start value must not be \`undefined\`. Otherwise the input begins as uncontrolled and changes later, and React warns. Use \`""\`.

Checkboxes use \`checked\` and \`e.target.checked\`. \`select\` and \`textarea\` use \`value\` too.`,
        ),
        picture("controlled-pic", "controlled-input", "Typing runs onChange, which sets state, which sets value"),
        jsx(
          "controlled-code",
          "The second field is stuck on purpose",
          `function App() {
  const [name, setName] = useState("");

  return (
    <div>
      <p><label>Works <input value={name} onChange={(e) => setName(e.target.value)} /></label></p>
      <p><label>Stuck <input value="try me" onChange={() => {}} /></label></p>
      <p>Hello {name || "stranger"}, {name.length}/20</p>
      <button disabled={name.trim() === ""}>Save</button>
    </div>
  );
}`,
        ),
        question(
          "q-controlled",
          "controlled",
          "`<input value={name} />` without onChange. What happens when you type?",
          { shows: ["The text appears, name stays the old", "value-only"], stuck: "Nothing: React keeps showing the state", error: "The page crashes" },
          "stuck",
          "value says what is shown. Without onChange the state never changes.",
        ),
        question(
          "q-number",
          "controlled",
          "`<input type=\"number\">` with the text 5. What is `event.target.value`?",
          { num: ["The number 5", "number-number"], str: 'The string "5"', nan: "NaN" },
          "str",
          "Inputs always give strings. Convert with Number, and think of the empty field.",
        ),
      ],
    },
    {
      id: "many",
      title: "Forms with many fields",
      simpler: "You don't need a notebook for each field. One page with lines is enough, and each line has a name.",
      blocks: [
        text(
          "many-1",
          `Ten fields don't need ten states. Put them into **one object**, and use the \`name\` attribute:

\`\`\`jsx
const change = (e) =>
  setForm({ ...form, [e.target.name]: e.target.value });
\`\`\`

The brackets make the **value** of \`e.target.name\` the property's name. Don't forget the spread, or all the other fields are gone.

Often you don't need to control anything. If you want the values only **when the form is sent**, leave the inputs **uncontrolled**, give them a \`name\` and a \`defaultValue\`, and read everything with \`FormData\`. It's less code, and typing causes no renders.

| | Controlled | Uncontrolled |
| --- | --- | --- |
| Truth | state | the DOM |
| Start text | state | \`defaultValue\` |
| Reading | any time | when sending, with FormData |
| Good for | live checks, filters, dependent fields | simple forms |

For large forms with many rules there are libraries, such as React Hook Form.`,
        ),
        jsx(
          "many-code",
          "Uncontrolled: read everything when it is sent",
          `function App() {
  const [sent, setSent] = useState(null);

  function handleSubmit(event) {
    event.preventDefault();
    setSent(Object.fromEntries(new FormData(event.currentTarget)));
  }

  return (
    <form onSubmit={handleSubmit}>
      <p><label>Name <input name="name" defaultValue="Ada" /></label></p>
      <p><label>City <input name="city" /></label></p>
      <button>Send</button>
      {sent && <pre>{JSON.stringify(sent)}</pre>}
    </form>
  );
}`,
        ),
        question(
          "q-spread",
          "controlled",
          "AI wrote this change handler. After typing the city, the name is empty. Why?",
          { spread: "The spread of the old form is missing, so the other fields are lost", name: "name can't be used as a property", async: "setForm needs await" },
          "spread",
          "Write { ...form, [e.target.name]: e.target.value }.",
          { kind: "find-bug", code: `const change = (e) =>\n  setForm({ [e.target.name]: e.target.value });` },
        ),
        question(
          "q-uncontrolled",
          "uncontrolled",
          "A contact form only needs its values when it is sent. What is simplest?",
          { controlled: "A state for each field", formdata: "Uncontrolled inputs and FormData", refs: "A ref for each field and a state" },
          "formdata",
          "Nothing needs the values earlier, so the DOM can keep them.",
        ),
        realCase(
          "many-case",
          "A form that got slower with every field",
          "A form with 60 controlled fields has one state at the top of the page.",
          "Typing was slow: each letter rendered the whole page.",
          "Every key set the state of the top component, and everything below it was rendered again.",
          "Only the two fields with live checks stayed controlled. The others are read with FormData when the form is sent.",
        ),
      ],
    },
    {
      id: "submit",
      title: "Sending",
      simpler: "Listen to the form and not to the button. People also press Enter. And show them that something is happening.",
      blocks: [
        text(
          "submit-1",
          `Use \`onSubmit\` on the **form**. It also covers Enter in a field, and it runs only if the browser's own checks (\`required\`, \`type="email"\`) pass. Call \`event.preventDefault()\`, or the page reloads.

A button in a form is a submit button by default. A button that should **not** send needs \`type="button"\`. This is a classic bug: "Show password" sends the form.

While sending, disable the button and say so: "Saving...". This also avoids a second click. But remember, a disabled button is no protection for the server.

After an **error**, keep everything the user typed. Say what is wrong and what to do. After success, say so, and clear the form if it makes sense.

React 19 also has **actions**: \`<form action={fn}>\` with \`useActionState\` keeps track of pending and errors for you. The idea is the same.`,
        ),
        jsx(
          "submit-code",
          "Sending, error and success",
          `function App() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState("idle");

  const save = () => new Promise((resolve, reject) =>
    setTimeout(() => (email.endsWith(".com") ? resolve() : reject(new Error("only .com works here"))), 500));

  async function handleSubmit(event) {
    event.preventDefault();
    setStatus("sending");
    try {
      await save();
      setStatus("saved");
    } catch (err) {
      setStatus("error: " + err.message);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>Email <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></label>{" "}
      <button disabled={status === "sending"}>{status === "sending" ? "Saving..." : "Save"}</button>
      <p role="status">{status}</p>
    </form>
  );
}`,
        ),
        question(
          "q-submit",
          "submit",
          "\"Show password\" in a form sends the form when clicked. What is missing?",
          { prevent: "return false", type: 'type="button" on that button', key: "A key" },
          "type",
          "A button in a form is a submit button, unless you say otherwise.",
        ),
      ],
    },
    {
      id: "validation",
      title: "Checking the input",
      simpler: "The check on the page is a friendly helper: you forgot something. The check on the server is the guard at the door. You need both, for different reasons.",
      blocks: [
        text(
          "validation-1",
          `There are two kinds of checks, with two purposes.

On the **client**, you help the user: quickly, next to the field, in clear words. On the **server**, you protect your data. Anyone can send a request without your page, so the server has to check **everything** again.

Start with what the browser offers: \`required\`, \`type="email"\`, \`minLength\`, \`pattern\`. It costs nothing and works with the keyboard.

When do you show an error? Not while someone is still typing the first letters. After leaving the field, or when sending, is better. Once there is an error, remove it **as soon as** it's fixed.

Connect the message with the field: \`aria-invalid\` on the input, and \`aria-describedby\` with the id of the message. Then screen readers read it too. Don't show errors only by colour.

Calculate errors **while rendering** from the values. They don't need their own state. What you need to remember is only which fields have been **touched**.`,
        ),
        jsx(
          "validation-code",
          "The error is calculated, only \"touched\" is remembered",
          `function App() {
  const [name, setName] = useState("");
  const [touched, setTouched] = useState(false);

  const error = name.trim().length < 3 ? "At least 3 letters" : null;
  const show = touched && error;

  return (
    <div>
      <label>
        Name{" "}
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          onBlur={() => setTouched(true)}
          aria-invalid={Boolean(show)}
          aria-describedby={show ? "name-error" : undefined}
        />
      </label>
      {show && <p id="name-error" style={{ color: "#b91c1c" }}>{error}</p>}
    </div>
  );
}`,
        ),
        realCase(
          "validation-case",
          "The order with a price of 0",
          "A shop checks in the browser that the price in the order is right, and sends it with the order.",
          "Somebody sent a request by hand with the price 0, and the order was accepted.",
          "The server trusted the browser's check.",
          "The server takes the price from its own database and ignores the one in the request.",
        ),
        question(
          "q-validation",
          "validation",
          "Your form already checks everything in the browser. Why check again on the server?",
          { slow: "Because the browser is too slow", bypass: "Because anyone can send a request without your page", not: ["It isn't necessary", "client-safe"] },
          "bypass",
          "The check on the page is help for honest users. Safety is made on the server.",
        ),
        compare(
          "validation-compare",
          `const [name, setName] = useState("");
const [error, setError] = useState("");
useEffect(() => {
  setError(name ? "" : "Required");
}, [name]);`,
          `const [name, setName] = useState("");
const error = name ? "" : "Required";`,
          "The error follows from the name, so it needs neither state nor effect, and it can't be out of step.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["Controlled inputs for live checks and filters", "FormData for simple forms", "Checks on the client and on the server"],
    avoid: ["value without onChange", "Errors in their own state", "onClick on the button instead of onSubmit"],
  },

  explain: {
    prompt: "What makes an input controlled, when would you leave it uncontrolled, and why is validation in the browser not enough?",
    modelAnswer:
      "In a controlled input, value comes from state and onChange updates it, so the state is the truth. If I give value without onChange, nothing can be typed. If I need the values only when sending, I leave the inputs uncontrolled and read them with FormData. I use onSubmit on the form with preventDefault, which also covers Enter. Validation in the browser helps the user, but anyone can send a request without my page, so the server has to check everything again.",
  },

  reviewQuestions: [
    reviewQuestion("r-default", "uncontrolled", "How do you give an uncontrolled input a starting text?", { value: ["value", "value-only"], def: "defaultValue", placeholder: "placeholder" }, "def", "value would make it controlled, and a placeholder is not a value."),
    reviewQuestion("r-check", "controlled", "Which prop controls a checkbox?", { value: "value", checked: "checked", on: "onChange only" }, "checked", "Together with onChange, where you read e.target.checked."),
    reviewQuestion("r-enter", "submit", "Why onSubmit on the form rather than onClick on the button?", { enter: "It also covers Enter, and runs after the browser's checks", fast: "It is faster", same: "There is no difference" }, "enter", "onClick would miss other ways to send the form and run before the browser's checks."),
  ],

  summary: [
    "Controlled: value and onChange together",
    "Uncontrolled: defaultValue and FormData",
    "onSubmit with preventDefault",
    "Check on the client to help, on the server to protect",
  ],

  sources: [
    { label: "React: Reacting to input with state", url: "https://react.dev/learn/reacting-to-input-with-state" },
    { label: "React: The input component", url: "https://react.dev/reference/react-dom/components/input" },
    { label: "MDN: Client-side form validation", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Extensions/Forms/Form_validation" },
  ],
};
