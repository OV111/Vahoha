// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-dom",
  title: "Changing the page with the DOM",
  mystery: "A comment on the page stole the users' accounts. How can text do that?",
  minutes: 30,
  lang: "html",
  requires: ["js-basics", "web-semantic-html"],

  shortAnswer:
    "The DOM is the browser's live tree of your page. JavaScript finds elements in it, reads them and changes them, and the page follows at once. Text from users goes in with textContent, never with innerHTML.",

  ideas: [
    { id: "live-tree", text: "The DOM is a tree of objects made from the HTML, and changing it changes the page" },
    { id: "select", text: "querySelector gives the first match or null, querySelectorAll gives a list" },
    { id: "safe-text", text: "textContent inserts text; innerHTML reads it as HTML, which is dangerous with foreign text" },
    { id: "classes", text: "Change looks through classes, and keep state in one place" },
  ],

  misconceptions: [
    {
      id: "dom-is-file",
      belief: "JavaScript changes the HTML file",
      correction: "It changes the DOM in the browser's memory. The file on the server stays the same, and after a reload the changes are gone.",
    },
    {
      id: "always-found",
      belief: "querySelector always gives an element",
      correction: "If nothing matches, it gives null, and using null throws an error.",
    },
    {
      id: "innerhtml-text",
      belief: "innerHTML is simply another way to set text",
      correction: "It reads the text as HTML. Foreign text can bring elements that run code.",
    },
  ],

  sections: [
    {
      id: "tree",
      title: "What the DOM is",
      simpler:
        "HTML is the recipe, and the DOM is the cake. JavaScript doesn't rewrite the recipe. It decorates the cake, and you see it right away.",
      blocks: [
        {
          id: "tree-1",
          type: "text",
          body: `When the browser loads your page, it reads the HTML and builds a tree of objects from it: the **DOM**, the Document Object Model. Each element is an object with properties and methods. Elements inside others are their **children**.

\`document\` is the way in. Everything on the page can be reached from there.

The DOM is **live**. If you change it, the browser draws the page again by itself. But you change only what's in memory. The HTML file stays as it was, and a reload brings back the original.

That's also why "View source" and the Elements panel can show different things. The source is what the server sent. Elements shows the DOM **now**.`,
        },
        { id: "tree-pic", type: "picture", diagram: "dom-tree", alt: "body has a heading and a list, the list has two items" },
        {
          id: "tree-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "The page changes after it was loaded",
          source: `<h1>Hello</h1>
<p id="info">Loading...</p>

<script>
  const info = document.querySelector("#info");
  info.textContent = "The heading says: " + document.querySelector("h1").textContent;
</script>`,
        },
        {
          id: "q-tree",
          type: "question",
          ideaId: "live-tree",
          kind: "choice",
          prompt: "A script changes a heading. Then the user reloads the page. What does the heading show?",
          options: [
            { id: "changed", text: "The changed text", misconceptionId: "dom-is-file" },
            { id: "original", text: "The original text, until the script runs again" },
            { id: "empty", text: "Nothing" },
          ],
          answerId: "original",
          why: "The change was made in memory. A reload builds the DOM from the HTML again.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "select",
      title: "Finding elements",
      simpler:
        "You call into a room: who fits this description? One answers, or many, or nobody. Be ready for nobody.",
      blocks: [
        {
          id: "select-1",
          type: "text",
          body: `\`querySelector(selector)\` takes a **CSS selector** and gives you the **first** element that matches, or \`null\` if there is none. \`querySelectorAll\` gives **all** of them as a list, which may be empty.

\`\`\`js
document.querySelector("#menu");      // by id
document.querySelector(".card");      // by class
document.querySelectorAll("li.done"); // all of them
card.querySelector("button");         // only inside card
\`\`\`

The classic error is *Cannot read properties of null*. It means that nothing was found. There are two usual reasons: a **typo**, or the script ran **before the element existed**. The browser works from top to bottom. A script in the head runs before the body is there. Write \`<script src="app.js" defer>\`: it waits until the document has been read.

The result of querySelectorAll isn't a real array, but it has \`forEach\`, and \`[...list]\` turns it into one.`,
        },
        {
          id: "select-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "One, many, none",
          source: `<ul>
  <li>Bread</li>
  <li>Milk</li>
</ul>
<pre id="out"></pre>

<script>
  const out = document.querySelector("#out");
  const lines = [
    document.querySelector("li").textContent,
    document.querySelectorAll("li").length,
    document.querySelector(".missing"),
  ];
  out.textContent = lines.join("\\n");
</script>`,
        },
        {
          id: "q-select",
          type: "question",
          ideaId: "select",
          kind: "choice",
          prompt: "`document.querySelector(\".price\")` finds nothing. What does it give you?",
          options: [
            { id: "empty", text: "An empty element", misconceptionId: "always-found" },
            { id: "null", text: "null" },
            { id: "list", text: "An empty list" },
          ],
          answerId: "null",
          why: "querySelector gives null. Only querySelectorAll gives an empty list.",
          difficulty: 1,
        },
        {
          id: "q-defer",
          type: "question",
          ideaId: "select",
          kind: "choice",
          prompt: "A script in the head says *Cannot read properties of null*, though the selector is right. Why?",
          options: [
            { id: "early", text: "It runs before the element exists; defer would help" },
            { id: "head", text: "Scripts in the head can't change the page" },
            { id: "id", text: "Only ids can be found from the head" },
          ],
          answerId: "early",
          why: "The browser hasn't read the body yet. With defer, the script runs after the document has been read.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "change",
      title: "Changing and creating",
      simpler:
        "You can write on a thing, put a sticker on it, build a new one, or take it away. For the look, use stickers, which are classes, and let CSS decide what a sticker means.",
      blocks: [
        {
          id: "change-1",
          type: "text",
          body: `The everyday tools:

- \`el.textContent = "New"\` sets the text.
- \`el.classList.add("open")\`, \`.remove\`, \`.toggle\` change classes.
- \`el.setAttribute("aria-expanded", "true")\` sets an attribute.
- \`document.createElement("li")\` makes an element, \`parent.append(el)\` puts it in, \`el.remove()\` takes it out.

For the **look**, change a **class** and not the style. Then CSS stays responsible for the design, and JavaScript only says what state something is in.

As a page grows, the hardest part is keeping things in step: the number in the header, the list, the empty message. It helps to keep the **state in one place**, for example an array, and to draw the page from it each time. This is the idea behind React.

When you add many elements, collect them first and insert them once: \`list.append(...items)\`.`,
        },
        {
          id: "change-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "State in one place, then draw",
          source: `<style>.done { text-decoration: line-through; opacity: .5; }</style>
<ul id="list"></ul>

<script>
  const todos = [
    { title: "Learn HTML", done: true },
    { title: "Learn the DOM", done: false },
  ];

  function render() {
    const items = todos.map((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.title;
      li.classList.toggle("done", todo.done);
      return li;
    });
    document.querySelector("#list").replaceChildren(...items);
  }

  render();
</script>`,
        },
        {
          id: "q-change",
          type: "question",
          ideaId: "classes",
          kind: "choice",
          prompt: "A menu should open with a colour change, a shadow and an animation. What should JavaScript do?",
          options: [
            { id: "styles", text: "Set each style on the element" },
            { id: "class", text: "Add one class, and let CSS do the rest" },
            { id: "html", text: "Replace the HTML of the menu" },
          ],
          answerId: "class",
          why: "JavaScript says what state it is in. How that looks belongs to CSS.",
          difficulty: 1,
        },
        {
          id: "change-case",
          type: "realCase",
          title: "The cart that showed three different numbers",
          situation: "A shop kept the number of items in the header, in the sidebar and in the page title, and changed each by hand.",
          problem: "After removing an item, the header said 2, the sidebar 3 and the title 4.",
          cause: "The same information was stored in three places in the DOM, and one function forgot two of them.",
          fix: "The cart is one array. A single render function writes all three numbers from it.",
        },
      ],
    },
    {
      id: "safe",
      title: "Text from users",
      simpler:
        "Read a stranger's letter, but don't carry out what it says. textContent reads it. innerHTML carries it out.",
      blocks: [
        {
          id: "safe-1",
          type: "text",
          body: `\`innerHTML\` takes a text and **reads it as HTML**. With your own fixed text that's fine. With text from **someone else**, it is dangerous.

Imagine a comment that contains \`<img src="x" onerror="...">\`. If you put it in with innerHTML, the browser creates the image, fails to load it and **runs the code** in onerror. This code runs on your page, for every visitor, with their login. This attack is called **XSS**, cross-site scripting. It's the answer to the question at the top.

\`textContent\` never reads HTML. The tags are simply shown as text. So the rule is: **foreign text goes in with textContent.** Foreign means everything you didn't write yourself: form fields, the address bar, answers from a server.

Frameworks such as React do this by default. The exception has a name that warns you: \`dangerouslySetInnerHTML\`. If you must show HTML from users, clean it first with a library such as DOMPurify.`,
        },
        {
          id: "safe-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "The same comment, put in two ways",
          source: `<p><b>textContent:</b> <span id="safe"></span></p>
<p><b>innerHTML:</b> <span id="unsafe"></span></p>

<script>
  const comment = '<img src="x" onerror="this.replaceWith(\\'code ran!\\')">';
  document.querySelector("#safe").textContent = comment;
  document.querySelector("#unsafe").innerHTML = comment;
</script>`,
        },
        {
          id: "safe-case",
          type: "realCase",
          title: "The profile that spread by itself",
          situation: "A site shows the \"About me\" text of users with innerHTML, so that they can use bold text.",
          problem: "One user put code into it. Everyone who opened that profile sent a message to all their friends without knowing.",
          cause: "innerHTML turned the text into elements, and one of them ran code with the visitor's login.",
          fix: "The text is shown with textContent. For bold text, they later allowed a small set of tags, cleaned by a library.",
        },
        {
          id: "q-safe",
          type: "question",
          ideaId: "safe-text",
          kind: "choice",
          prompt: "You show a search term from the address bar. Which line is safe?",
          options: [
            { id: "inner", text: "el.innerHTML = term", misconceptionId: "innerhtml-text" },
            { id: "text", text: "el.textContent = term" },
            { id: "plus", text: 'el.innerHTML = "<b>" + term + "</b>"', misconceptionId: "innerhtml-text" },
          ],
          answerId: "text",
          why: "Anybody can send a link with code in the search term. textContent shows it as text.",
          difficulty: 1,
        },
        {
          id: "q-script",
          type: "question",
          ideaId: "safe-text",
          kind: "find-bug",
          prompt: "AI says: \"innerHTML is safe here, because script tags put in with innerHTML don't run.\" Is that right?",
          options: [
            { id: "yes", text: "Yes, then nothing can run", misconceptionId: "innerhtml-text" },
            { id: "no", text: "No: script tags don't run, but event attributes such as onerror do" },
            { id: "both", text: "No: script tags do run" },
          ],
          answerId: "no",
          why: "The first half is true, but there are many other ways, such as an image with onerror.",
          difficulty: 3,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["textContent for text", "classList for looks", "One state and one render function"],
    avoid: ["innerHTML with text you didn't write", "Reading your state back out of the DOM", "Scripts in the head without defer"],
  },

  explain: {
    prompt: "What is the DOM, how do you change the page with it, and why is innerHTML with a user's text dangerous?",
    modelAnswer:
      "The DOM is a live tree of objects that the browser builds from the HTML. When I change it, the page changes, but not the file. I find elements with querySelector, which gives the first match or null, or querySelectorAll, which gives a list. I change looks through classes and keep the state in one place. innerHTML reads text as HTML, so foreign text can bring elements that run code on my page, which is XSS. textContent inserts it only as text.",
  },

  reviewQuestions: [
    {
      id: "r-all",
      ideaId: "select",
      kind: "choice",
      prompt: "What does `querySelectorAll(\".x\")` give if nothing matches?",
      options: [
        { id: "null", text: "null" },
        { id: "empty", text: "An empty list" },
        { id: "error", text: "An error" },
      ],
      answerId: "empty",
      why: "It always gives a list, so you can loop over it safely.",
      difficulty: 1,
    },
    {
      id: "r-source",
      ideaId: "live-tree",
      kind: "choice",
      prompt: "A script added a button. Where do you see it?",
      options: [
        { id: "source", text: "In View source", misconceptionId: "dom-is-file" },
        { id: "elements", text: "In the Elements panel" },
        { id: "both", text: "In both" },
      ],
      answerId: "elements",
      why: "Elements shows the DOM as it is now. The source is what the server sent.",
      difficulty: 1,
    },
    {
      id: "r-toggle",
      ideaId: "classes",
      kind: "choice",
      prompt: "What does `el.classList.toggle(\"open\", isOpen)` do?",
      options: [
        { id: "flip", text: "It always switches the class" },
        { id: "set", text: "It adds the class if isOpen is true and removes it if not" },
        { id: "both", text: "It adds two classes" },
      ],
      answerId: "set",
      why: "The second argument decides. Without it, toggle switches.",
      difficulty: 2,
    },
  ],

  summary: [
    "The DOM is a live tree: change it and the page follows",
    "querySelector gives one element or null",
    "Looks through classes, state in one place",
    "Foreign text with textContent, never innerHTML",
  ],

  sources: [
    { label: "MDN: Introduction to the DOM", url: "https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Introduction" },
    { label: "MDN: Element.innerHTML security", url: "https://developer.mozilla.org/en-US/docs/Web/API/Element/innerHTML" },
    { label: "OWASP: Cross-site scripting prevention", url: "https://cheatsheetseries.owasp.org/cheatsheets/Cross_Site_Scripting_Prevention_Cheat_Sheet.html" },
  ],
};
