// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-semantic-html",
  title: "Semantic HTML",
  mystery: "The button looks perfect. Why can't some people press it?",
  minutes: 25,
  lang: "html",
  requires: [],

  shortAnswer:
    "Semantic HTML means choosing elements for what they are, not for how they look. The browser then knows what is a button, a heading or a menu, and passes that on to keyboards, screen readers and search engines.",

  ideas: [
    { id: "meaning", text: "An element says what its content is; CSS decides how it looks" },
    { id: "built-in", text: "Native elements bring behaviour with them: focus, keyboard and roles" },
    { id: "tree", text: "The browser builds an accessibility tree with a role, a name and a state for elements" },
    { id: "headings", text: "Headings and landmarks are how many people find their way around a page" },
  ],

  misconceptions: [
    {
      id: "looks-enough",
      belief: "a div that looks like a button is as good as a button",
      correction: "A div can't be reached with the keyboard and isn't announced as a button. A button element does all of that by itself.",
    },
    {
      id: "heading-size",
      belief: "you choose a heading level by how big the text should be",
      correction: "The level says where a section belongs in the outline. The size is a matter for CSS.",
    },
    {
      id: "aria-fixes",
      belief: "adding a role makes an element behave like the real thing",
      correction: "A role only changes what is announced. Focus and keyboard handling don't come with it.",
    },
  ],

  sections: [
    {
      id: "what",
      title: "What semantic means",
      simpler:
        "Imagine boxes for moving house. You can leave them all blank, or write kitchen, books, tools on them. The boxes are the same, but now everybody knows what is inside.",
      blocks: [
        {
          id: "what-1",
          type: "text",
          body: `**Semantic** means "about meaning". A \`div\` says nothing: it is a box without a label. A \`nav\` says: these are links for finding your way. An \`article\` says: this makes sense on its own. A \`button\` says: pressing this does something.

For the eye, the difference can be invisible, because CSS can make any element look like anything. But people aren't the only readers of your page. A **screen reader** speaks it aloud. A **search engine** tries to understand it. A browser's **reader mode** looks for the main text. Other developers read your code. They all depend on the labels.

The most useful elements for the structure of a page are \`header\`, \`nav\`, \`main\`, \`section\`, \`article\`, \`aside\` and \`footer\`. A page has one visible \`main\`, with the content that makes this page different from the others.

A \`div\` or \`span\` isn't wrong. Use them when you need a box only for layout and nothing more.`,
        },
        {
          id: "what-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "A page that explains itself",
          source: `<header>
  <nav aria-label="Main">
    <a href="#news">News</a>
    <a href="#team">Team</a>
  </nav>
</header>

<main>
  <h1>Our bakery</h1>
  <article id="news">
    <h2>New bread on Friday</h2>
    <p>We start at 7 in the morning.</p>
  </article>
</main>

<footer>Open every day</footer>`,
        },
        {
          id: "q-what",
          type: "question",
          ideaId: "meaning",
          kind: "choice",
          prompt: "You need a box around three cards, only to put them side by side. Which element fits?",
          options: [
            { id: "section", text: "section" },
            { id: "div", text: "div" },
            { id: "article", text: "article" },
            { id: "main", text: "main" },
          ],
          answerId: "div",
          why: "The box has no meaning of its own, it is only for layout. Each card may well be an article.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "native",
      title: "What native elements do for you",
      simpler:
        "A real button comes with everything built in, like a ready-made lamp. A div with a click handler is a bulb on a wire: it lights up, but the switch, the plug and the safety are missing.",
      blocks: [
        {
          id: "native-1",
          type: "text",
          body: `A \`button\` isn't only a look. Without one line of JavaScript it can be **reached with Tab**, **pressed with Enter or Space**, disabled, and it is announced as "button". Inside a form it can submit.

If you use a \`div\` with a click handler, you get only the mouse click. For the rest you would have to add \`tabindex="0"\`, \`role="button"\`, two keyboard handlers, and the logic for being disabled. Most people forget at least one.

Two elements are often mixed up. A **link** (\`<a href>\`) takes you **somewhere**: a page or a place on the page. A **button** **does** something: opens a menu, saves, deletes. If it has an address, it's a link.

The same is true for forms. A \`label\` connected to its \`input\` gives the field its name, and clicking the label moves the cursor into the field. A placeholder is no replacement: it disappears as soon as someone types.`,
        },
        {
          id: "native-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Click in the preview, then press Tab: which one can you reach?",
          source: `<style>
  .fake, button { padding: 10px 16px; background: #7c3aed; color: white; border: 0; border-radius: 8px; font: inherit; display: inline-block; }
</style>

<div class="fake">Fake button</div>
<button>Real button</button>

<p>
  <label for="email">Email</label>
  <input id="email" type="email">
</p>`,
        },
        {
          id: "native-case",
          type: "realCase",
          title: "Nobody could finish the order without a mouse",
          situation: "A shop built its own \"Buy now\" out of a styled div with a click handler. It looked exactly like the design.",
          problem: "A customer who uses only the keyboard could fill the cart but never buy anything.",
          cause: "A div isn't in the Tab order. The customer jumped over it every time.",
          fix: "The div became a button. The look stayed the same, and the keyboard worked at once.",
        },
        {
          id: "q-native",
          type: "question",
          ideaId: "built-in",
          kind: "choice",
          prompt: "You add `role=\"button\"` to a div. What works now?",
          options: [
            { id: "all", text: "Everything a button does", misconceptionId: "aria-fixes" },
            { id: "announce", text: "It is announced as a button, but the keyboard still doesn't work" },
            { id: "focus", text: "It can be reached with Tab, but isn't announced", misconceptionId: "aria-fixes" },
          ],
          answerId: "announce",
          why: "A role only tells assistive technology what it is. Focus and keys have to be added by hand, or you use a button.",
          difficulty: 2,
        },
        {
          id: "q-link",
          type: "question",
          ideaId: "built-in",
          kind: "choice",
          prompt: "Which element fits \"Delete this photo\"?",
          options: [
            { id: "a", text: "a with href=\"#\"" },
            { id: "button", text: "button" },
            { id: "div", text: "div with onclick", misconceptionId: "looks-enough" },
          ],
          answerId: "button",
          why: "It does something and doesn't lead anywhere. A link with # would also jump to the top of the page.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "tree",
      title: "The accessibility tree",
      simpler:
        "The browser makes a second version of your page, without colours and positions. In it, each thing only says: what am I, what am I called, and how am I right now. Screen readers read that version.",
      blocks: [
        {
          id: "tree-1",
          type: "text",
          body: `From your HTML, the browser builds the DOM. From the DOM it builds a second, simpler tree: the **accessibility tree**. This is what screen readers and other assistive tools get.

Each entry has

- a **role**: button, link, heading, image, and so on,
- a **name**: what it is called, normally from its text, its label or an \`alt\`,
- and often a **state**: checked, expanded, disabled.

If the name is missing, people hear only "button". This happens all the time with **icon buttons**. Give them a name with \`aria-label\`.

**Images** need an \`alt\`. Describe what the image tells the reader. If it is only decoration, write \`alt=""\`, and it is left out. Without any alt, some screen readers read the file name.

There is a rule about ARIA: **if an HTML element can do it, use the element.** ARIA is for what HTML doesn't have.`,
        },
        { id: "tree-pic", type: "picture", diagram: "accessibility-tree", alt: "A button element becomes an entry with role, name and state" },
        {
          id: "tree-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Same look, different names",
          source: `<button>🗑</button>
<button aria-label="Delete photo">🗑</button>

<p>The first is announced by its symbol, if at all.
The second as "Delete photo, button".</p>`,
        },
        {
          id: "q-tree",
          type: "question",
          ideaId: "tree",
          kind: "choice",
          prompt: "A picture is only a decorative line. What is the right alt?",
          options: [
            { id: "line", text: 'alt="decorative line"' },
            { id: "empty", text: 'alt=""' },
            { id: "none", text: "No alt attribute" },
          ],
          answerId: "empty",
          why: "An empty alt says that there is nothing to announce. Without the attribute, some screen readers read the file name.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "headings",
      title: "Headings and landmarks",
      simpler:
        "Sighted people skim a page by its big letters. People with a screen reader jump from heading to heading. If the headings are wrong, the map is wrong.",
      blocks: [
        {
          id: "headings-1",
          type: "text",
          body: `Screen reader users rarely listen to a page from top to bottom. They **jump**: to the next heading, to the main content, to the navigation.

**Headings** form an outline, like the contents of a book. \`h1\` is the topic of the page, \`h2\` its parts, \`h3\` the parts of a part. Don't choose a level for its size, and don't skip levels on the way down. The size belongs to CSS.

**Landmarks** are big areas: \`header\`, \`nav\`, \`main\`, \`aside\`, \`footer\`. If there are two of one kind, give them names, for example \`<nav aria-label="Main">\` and \`<nav aria-label="Footer">\`.

Bold text isn't a heading. It looks like one, but nobody can jump to it.`,
        },
        {
          id: "headings-compare",
          type: "compare",
          wrong: `<div class="title">Prices</div>
<h4>Small bread</h4>
<b>Delivery</b>`,
          right: `<h2>Prices</h2>
<h3>Small bread</h3>
<h2>Delivery</h2>`,
          why: "On the right, anyone can jump from part to part, and the outline shows that Small bread belongs to Prices.",
        },
        {
          id: "headings-case",
          type: "realCase",
          title: "The page without a map",
          situation: "A help page had 40 questions, all written as bold paragraphs.",
          problem: "People with a screen reader had to listen through everything to find one answer.",
          cause: "Bold paragraphs aren't headings, so there was nothing to jump to.",
          fix: "Each question became an h2. The list of headings is now the list of questions, and search engines show it too.",
        },
        {
          id: "q-headings",
          type: "question",
          ideaId: "headings",
          kind: "choice",
          prompt: "An h2 looks too big in your design. What do you do?",
          options: [
            { id: "h4", text: "Use h4, because it is smaller", misconceptionId: "heading-size" },
            { id: "css", text: "Keep h2 and change its size with CSS" },
            { id: "bold", text: "Use a bold paragraph", misconceptionId: "looks-enough" },
          ],
          answerId: "css",
          why: "The level is about structure. The look is free.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Put the mouse away and use your page with Tab, Enter and Space. What you can't do now, others can never do.",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Removing the focus outline.** \`outline: none\` looks tidy, but then nobody sees where they are. Change the style, don't remove it.

**A placeholder instead of a label.** It disappears while typing and is often too pale.

**Wrapping everything in section.** Without a heading, a section says nothing.

**Too much ARIA.** A wrong role is worse than none, because it hides what the element really is.`,
        },
        {
          id: "q-mistakes",
          type: "question",
          ideaId: "meaning",
          kind: "find-bug",
          prompt: "AI wrote this menu. What is the main problem?",
          code: `<div class="nav">
  <span onclick="go('/home')">Home</span>
  <span onclick="go('/shop')">Shop</span>
</div>`,
          options: [
            { id: "class", text: "The class name is too short" },
            { id: "links", text: "These are links, but not link elements: no keyboard, no new tab, not found as links" },
            { id: "div-ok", text: "Nothing, as long as it looks right", misconceptionId: "looks-enough" },
          ],
          answerId: "links",
          why: "They lead somewhere, so they should be a elements with href, inside a nav.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["The native element whenever there is one", "button for actions, a for places", "label for every form field"],
    avoid: ["div or span for anything people press", "ARIA where HTML has an element", "Heading levels chosen by size"],
  },

  explain: {
    prompt: "Why is a styled div not the same as a button, and how does a screen reader know what is on your page?",
    modelAnswer:
      "The element says what something is, while CSS only decides how it looks. A button brings focus, keyboard and its role with it, and a div has none of these. From the HTML the browser builds an accessibility tree with a role, a name and a state for each element, and a screen reader reads that tree. People move around with headings and landmarks, so the levels must show the structure of the page and not the size of the text.",
  },

  reviewQuestions: [
    {
      id: "r-name",
      ideaId: "tree",
      kind: "choice",
      prompt: "An icon button has no text. How does it get a name?",
      options: [
        { id: "title-class", text: "With a class" },
        { id: "aria", text: "With aria-label" },
        { id: "role", text: 'With role="button"', misconceptionId: "aria-fixes" },
      ],
      answerId: "aria",
      why: "aria-label gives it a name. The role is already there, because it is a button.",
      difficulty: 1,
    },
    {
      id: "r-link",
      ideaId: "built-in",
      kind: "choice",
      prompt: "\"Show more comments\" loads more on the same page. Link or button?",
      options: [
        { id: "link", text: "Link" },
        { id: "button", text: "Button" },
      ],
      answerId: "button",
      why: "It does something on this page and doesn't lead to an address.",
      difficulty: 1,
    },
    {
      id: "r-main",
      ideaId: "headings",
      kind: "choice",
      prompt: "How many visible main elements should a page have?",
      options: [
        { id: "one", text: "One" },
        { id: "section", text: "One per section" },
        { id: "any", text: "As many as you like" },
      ],
      answerId: "one",
      why: "main marks the content that makes this page what it is, so people can jump straight to it.",
      difficulty: 1,
    },
  ],

  summary: [
    "Choose elements by meaning and style them with CSS",
    "Native elements bring focus, keyboard and roles",
    "Everything people use needs a role and a name",
    "Headings are the outline of the page",
  ],

  sources: [
    { label: "MDN: HTML elements reference", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements" },
    { label: "MDN: HTML: a good basis for accessibility", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Accessibility/HTML" },
    { label: "W3C: ARIA Authoring Practices", url: "https://www.w3.org/WAI/ARIA/apg/" },
  ],
};
