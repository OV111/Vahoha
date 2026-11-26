// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-events",
  title: "Events",
  mystery: "New rows have no working delete button. Why do the old ones work?",
  minutes: 30,
  lang: "html",
  requires: ["web-dom"],

  shortAnswer:
    "An event tells your code that something happened. It travels up from the element through its parents. So one listener on a parent can serve all children, also those added later.",

  ideas: [
    { id: "listener", text: "addEventListener takes a function and calls it when the event happens" },
    { id: "bubbling", text: "Most events bubble from the target up through its parents" },
    { id: "delegation", text: "Delegation: one listener on a parent, and event.target or closest to find out which child" },
    { id: "default", text: "preventDefault stops what the browser would do; stopPropagation stops the journey" },
    { id: "cleanup", text: "removeEventListener needs the same function, and forgotten listeners cost memory" },
  ],

  misconceptions: [
    {
      id: "call-now",
      belief: "you pass a call such as save() to addEventListener",
      correction: "That runs it immediately and passes its result. Pass the function itself: save, or () => save(id).",
    },
    {
      id: "prevent-stops",
      belief: "preventDefault stops the event from reaching the parents",
      correction: "It only cancels what the browser would do. The event still bubbles. stopPropagation stops that.",
    },
    {
      id: "same-code-removes",
      belief: "removeEventListener works with a new function that has the same code",
      correction: "It has to be the very same function object that you added.",
    },
  ],

  sections: [
    {
      id: "listen",
      title: "Listening",
      simpler:
        "You leave your phone number and say: call me when it happens. You give the number. You don't make the call yourself.",
      blocks: [
        {
          id: "listen-1",
          type: "text",
          body: `Users click, type, scroll and submit. For each of these, the browser creates an **event**. With \`addEventListener\` you say which event you care about and which function should run.

\`\`\`js
button.addEventListener("click", (event) => {
  console.log(event.target);
});
\`\`\`

You pass the **function itself**, without parentheses. \`addEventListener("click", save())\` would call save right now and pass on its result. If you need arguments, wrap it: \`() => save(id)\`.

Your function gets an **event object**. \`event.type\` is the kind, \`event.target\` the element where it happened, and \`event.currentTarget\` the one your listener is on.

An element can have many listeners for the same event. They run in the order they were added.

Use \`click\` for buttons, not \`mousedown\`: click works for mouse, finger and keyboard.`,
        },
        {
          id: "listen-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Click the button",
          source: `<button id="b">Clicked 0 times</button>

<script>
  let count = 0;
  const button = document.querySelector("#b");

  button.addEventListener("click", () => {
    count++;
    button.textContent = "Clicked " + count + " times";
  });
</script>`,
        },
        {
          id: "q-listen",
          type: "question",
          ideaId: "listener",
          kind: "find-bug",
          prompt: "AI wrote this. What happens?",
          code: `button.addEventListener("click", deleteAll());`,
          options: [
            { id: "click", text: "deleteAll runs at each click", misconceptionId: "call-now" },
            { id: "now", text: "deleteAll runs immediately, and a click does nothing useful" },
            { id: "never", text: "deleteAll never runs" },
          ],
          answerId: "now",
          why: "The parentheses call it right away. Pass deleteAll without them.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "bubbling",
      title: "Bubbling",
      simpler:
        "Drop a stone into water: the ring starts where it fell and gets wider. An event starts at the element and goes to its parent, its grandparent, and so on.",
      blocks: [
        {
          id: "bubbling-1",
          type: "text",
          body: `If you click a button inside a card, you have also clicked **the card**, and the page. The browser reflects this: the event starts at the innermost element, the **target**, and then **bubbles** up through all its parents to the document. Each can have listeners, and all of them run.

(Before bubbling there is a first phase, **capturing**, from the outside in. You rarely need it. \`{ capture: true }\` listens there.)

Most events bubble. Some don't, such as \`focus\` and \`blur\`. Use \`focusin\` and \`focusout\` for those.

\`event.stopPropagation()\` stops the journey. Use it rarely. Other code, such as "close the menu when someone clicks outside", depends on events arriving at the top. Often it is better to **check** in the parent where the click came from.`,
        },
        { id: "bubbling-pic", type: "picture", diagram: "event-bubbling", alt: "A click starts at the button and travels up to the card and the document" },
        {
          id: "bubbling-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Click the button, then the card around it",
          source: `<style>.card { padding: 24px; background: #c4b5fd; }</style>
<div class="card"><button>Button</button></div>
<pre id="out"></pre>

<script>
  const log = (text) => document.querySelector("#out").append(text + "\\n");
  document.querySelector("button").addEventListener("click", () => log("button"));
  document.querySelector(".card").addEventListener("click", () => log("card"));
</script>`,
        },
        {
          id: "bubbling-case",
          type: "realCase",
          title: "Liking a post also opened it",
          situation: "A post is a card that opens on click. Inside is a like button.",
          problem: "Whoever clicked the heart was thrown into the post.",
          cause: "The click on the heart bubbled up to the card, and its listener ran too.",
          fix: "The card's listener ignores clicks that come from a button: `if (event.target.closest(\"button\")) return;`. Even better: only the title is a link.",
        },
        {
          id: "q-bubbling",
          type: "question",
          ideaId: "bubbling",
          kind: "choice",
          prompt: "A button is in a form in a section. All three have click listeners. In which order do they run when you click the button?",
          options: [
            { id: "up", text: "button, form, section" },
            { id: "down", text: "section, form, button" },
            { id: "only", text: "Only the button" },
          ],
          answerId: "up",
          why: "The event starts at the target and bubbles outwards.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "delegation",
      title: "Delegation",
      simpler:
        "Instead of giving each of a hundred guests a doorbell, put one at the front door and ask: who is it?",
      blocks: [
        {
          id: "delegation-1",
          type: "text",
          body: `Suppose you give every delete button of a list its own listener. For the rows that exist **now**, it works. A row you add **later** has none. That's the answer to the question at the top.

Because events bubble, you can put **one** listener on the list itself and ask where the click came from. This is **delegation**.

\`\`\`js
list.addEventListener("click", (event) => {
  const button = event.target.closest(".delete");
  if (!button) return;
  button.closest("li").remove();
});
\`\`\`

Why \`closest\` and not only \`target\`? The target is the **innermost** element. If there is an icon in the button, the target is the icon. \`closest\` looks from there upwards for what you need, and gives \`null\` if there is nothing.

To find out which item it is, put its id into the HTML: \`<li data-id="7">\`, and read \`li.dataset.id\`. It is a string.`,
        },
        {
          id: "delegation-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Add rows, then delete new and old ones",
          source: `<button id="add">Add row</button>
<ul id="list">
  <li>Row 1 <button class="delete"><b>x</b></button></li>
</ul>

<script>
  const list = document.querySelector("#list");
  let n = 1;

  document.querySelector("#add").addEventListener("click", () => {
    const li = document.createElement("li");
    const button = document.createElement("button");
    button.className = "delete";
    button.textContent = "x";
    li.append("Row " + ++n + " ", button);
    list.append(li);
  });

  list.addEventListener("click", (event) => {
    event.target.closest(".delete")?.closest("li").remove();
  });
</script>`,
        },
        {
          id: "q-delegation",
          type: "question",
          ideaId: "delegation",
          kind: "choice",
          prompt: "A delegated listener checks `event.target.className === \"delete\"`. Clicking on the icon inside the button does nothing. Why?",
          options: [
            { id: "icon", text: "The target is the icon, not the button; use closest" },
            { id: "bubble", text: "Icons don't send events" },
            { id: "class", text: "className can't be read in events" },
          ],
          answerId: "icon",
          why: "The target is the innermost element. closest(\".delete\") finds the button around it.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "default",
      title: "What the browser does anyway",
      simpler:
        "The browser has its own habits: a link leads away, a form sends itself. You may say no. But that doesn't make the event disappear.",
      blocks: [
        {
          id: "default-1",
          type: "text",
          body: `For many events the browser has a **default action**: a link opens, a form is sent and the page reloads, the space bar scrolls. \`event.preventDefault()\` cancels it.

You need it most for **forms** that you send with fetch. Listen to \`submit\` on the **form**, not to \`click\` on the button. Submit also fires when the user presses Enter in a field.

\`preventDefault\` and \`stopPropagation\` are often mixed up. The first cancels **what the browser does**. The second stops **the journey** to the parents. They have nothing to do with each other.

Don't prevent defaults without need. If you catch all keys, people can't use Tab any more.`,
        },
        {
          id: "default-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Type a name and press Enter",
          source: `<form>
  <label>Name <input name="name" required></label>
  <button>Send</button>
</form>
<p id="out"></p>

<script>
  document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    document.querySelector("#out").textContent = "Hello " + data.get("name");
  });
</script>`,
        },
        {
          id: "q-default",
          type: "question",
          ideaId: "default",
          kind: "choice",
          prompt: "A link's listener calls `event.preventDefault()`. Its parent has a click listener too. Does it run?",
          options: [
            { id: "no", text: "No, the event was stopped", misconceptionId: "prevent-stops" },
            { id: "yes", text: "Yes, only the opening of the link is cancelled" },
          ],
          answerId: "yes",
          why: "The event still bubbles. Only stopPropagation would stop that.",
          difficulty: 1,
        },
        {
          id: "q-submit",
          type: "question",
          ideaId: "default",
          kind: "choice",
          prompt: "Why listen to `submit` on the form and not to `click` on the button?",
          options: [
            { id: "enter", text: "submit also fires when the user presses Enter, and after the browser's validation" },
            { id: "fast", text: "submit is faster" },
            { id: "same", text: "There is no difference" },
          ],
          answerId: "enter",
          why: "submit covers all ways to send the form, and it fires only if the fields are valid.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "cleanup",
      title: "Cleaning up",
      simpler:
        "If you move out and don't cancel your phone, it keeps ringing in the empty flat. Cancel with the same number you signed up with.",
      blocks: [
        {
          id: "cleanup-1",
          type: "text",
          body: `When an element is removed from the page and nothing refers to it any more, its listeners go with it. But listeners on things that **stay**, such as \`window\` or \`document\`, also stay, with everything their function remembers. If you add one each time a dialog opens, the tenth opening has ten.

\`removeEventListener\` needs the **same function object**. A new arrow function with the same code is a different one, so this does nothing:

\`\`\`js
window.addEventListener("resize", () => update());
window.removeEventListener("resize", () => update());
\`\`\`

Keep the function in a variable. Or use \`{ once: true }\` for a single call. Or pass an \`AbortSignal\`: \`{ signal: controller.signal }\`, and one \`controller.abort()\` removes them all.

In React, the cleanup function of an effect is the place for this.`,
        },
        {
          id: "cleanup-case",
          type: "realCase",
          title: "The page that got slower with every dialog",
          situation: "Each time a dialog opens, the code adds a keydown listener to the document, to close it with Escape.",
          problem: "After an hour the page was slow, and one press of Escape ran the closing code 40 times.",
          cause: "The listeners were never removed. The document stays, so all of them stayed too.",
          fix: "When the dialog closes, the listener is removed with the same function. An AbortController does it for several at once.",
        },
        {
          id: "cleanup-compare",
          type: "compare",
          wrong: `document.addEventListener("keydown", (e) => close(e));
// later: removes nothing
document.removeEventListener("keydown", (e) => close(e));`,
          right: `const onKey = (e) => close(e);
document.addEventListener("keydown", onKey);
// later
document.removeEventListener("keydown", onKey);`,
          why: "Two arrow functions are two objects, even with the same code. Only the one you added can be removed.",
        },
        {
          id: "q-cleanup",
          type: "question",
          ideaId: "cleanup",
          kind: "choice",
          prompt: "`el.removeEventListener(\"click\", () => save())`: what does it remove?",
          options: [
            { id: "same", text: "The listener with the same code", misconceptionId: "same-code-removes" },
            { id: "nothing", text: "Nothing, because it is a new function" },
            { id: "all", text: "All click listeners" },
          ],
          answerId: "nothing",
          why: "It must be the same function object that was added.",
          difficulty: 1,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["Delegation for lists that change", "submit for forms", "{ once: true } or a signal for temporary listeners"],
    avoid: ["stopPropagation as a first idea", "onclick attributes in HTML", "Listeners on window without removing them"],
  },

  explain: {
    prompt: "What is bubbling, and how does delegation use it? How do preventDefault and stopPropagation differ?",
    modelAnswer:
      "With addEventListener I pass a function that is called when an event happens. Most events start at the target and bubble up through its parents. Delegation uses this: one listener on a parent handles all children, also later ones, and event.target.closest tells me which one it was. preventDefault cancels what the browser would do, such as sending a form, while stopPropagation stops the journey to the parents. To remove a listener I need the same function, otherwise listeners on things that stay add up.",
  },

  reviewQuestions: [
    {
      id: "r-target",
      ideaId: "delegation",
      kind: "choice",
      prompt: "In a delegated listener on a list, what is `event.currentTarget`?",
      options: [
        { id: "list", text: "The list" },
        { id: "clicked", text: "The innermost element that was clicked" },
        { id: "doc", text: "The document" },
      ],
      answerId: "list",
      why: "currentTarget is the element the listener is on. target is where it happened.",
      difficulty: 2,
    },
    {
      id: "r-focus",
      ideaId: "bubbling",
      kind: "choice",
      prompt: "Which event doesn't bubble?",
      options: [
        { id: "click", text: "click" },
        { id: "focus", text: "focus" },
        { id: "input", text: "input" },
      ],
      answerId: "focus",
      why: "focus and blur don't bubble. focusin and focusout do.",
      difficulty: 2,
    },
    {
      id: "r-once",
      ideaId: "cleanup",
      kind: "choice",
      prompt: "A listener should run only for the first click. What is simplest?",
      options: [
        { id: "once", text: "{ once: true }" },
        { id: "flag", text: "stopPropagation" },
        { id: "prevent", text: "preventDefault", misconceptionId: "prevent-stops" },
      ],
      answerId: "once",
      why: "The browser removes the listener after the first call.",
      difficulty: 1,
    },
  ],

  summary: [
    "Pass the function, don't call it",
    "Events bubble from the target outwards",
    "Delegation: one listener on the parent, closest for the child",
    "preventDefault cancels the browser, stopPropagation the journey",
    "Remove with the same function",
  ],

  sources: [
    { label: "MDN: Introduction to events", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Events" },
    { label: "MDN: Event bubbling", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Scripting/Event_bubbling" },
    { label: "MDN: addEventListener()", url: "https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener" },
  ],
};
