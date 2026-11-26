// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-responsive",
  title: "Responsive design",
  mystery: "The page is tiny on the phone, though the CSS is right. What is missing?",
  minutes: 25,
  lang: "css",
  requires: ["web-flex-grid"],

  shortAnswer:
    "Responsive pages fit every screen. Write the small screen first, let the layout be flexible by itself, and add min-width media queries only where the content needs more room.",

  ideas: [
    { id: "viewport", text: "Without the viewport meta tag, phones show the page as if the screen were wide" },
    { id: "mobile-first", text: "Mobile first: base styles for small screens, then min-width queries that add" },
    { id: "units", text: "Relative units adapt: rem to the text size, % to the parent, vw to the screen" },
    { id: "content-breaks", text: "Breakpoints belong where the content breaks, not at the sizes of devices" },
  ],

  misconceptions: [
    {
      id: "device-sizes",
      belief: "breakpoints should match the sizes of popular phones",
      correction: "There are too many devices, and they change. Break where your layout stops looking good.",
    },
    {
      id: "px-text",
      belief: "text sizes in px are just as good as in rem",
      correction: "rem follows the text size the user has set in the browser. px ignores it.",
    },
    {
      id: "order-no-matter",
      belief: "the order of media queries doesn't matter",
      correction: "If two match, the later rule wins. min-width queries go from small to large.",
    },
  ],

  sections: [
    {
      id: "viewport",
      title: "The viewport tag",
      simpler:
        "The phone thinks your page was made for a big screen, so it makes everything small to fit. One line tells it: use your real width.",
      blocks: [
        {
          id: "viewport-1",
          type: "text",
          body: `When phones got browsers, almost all pages were made for wide screens. So phones use a trick: they lay out the page on an imaginary screen about 980 pixels wide and then **shrink** the picture. Old pages were at least complete, though tiny.

Your page still gets this treatment, unless you say otherwise:

\`\`\`html
<meta name="viewport" content="width=device-width, initial-scale=1">
\`\`\`

It means: use the real width of the device, and don't zoom. Without this line, media queries for small screens **never match** on a phone, because it claims to be 980 pixels wide. That's the answer to the question at the top.

Don't add \`user-scalable=no\` or \`maximum-scale=1\`. People who need to zoom must be able to.`,
        },
        {
          id: "q-viewport",
          type: "question",
          ideaId: "viewport",
          kind: "choice",
          prompt: "On a phone, the rule `@media (max-width: 600px)` has no effect. In a narrow window on the computer it works. What is the likely reason?",
          options: [
            { id: "meta", text: "The viewport meta tag is missing" },
            { id: "syntax", text: "Phones don't support media queries" },
            { id: "cache", text: "The phone is in dark mode" },
          ],
          answerId: "meta",
          why: "Without it, the phone lays out the page at about 980 pixels, so the query doesn't match.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "mobile-first",
      title: "Mobile first",
      simpler:
        "Pack for a small bag first: only what you really need. If you later get a bigger bag, you add things. The other way round, you have to throw things out.",
      blocks: [
        {
          id: "mobile-first-1",
          type: "text",
          body: `A **media query** applies rules only under a condition, such as the width of the screen.

**Mobile first** means: the rules without a query are for the **small** screen. Then you **add** for larger ones with \`min-width\`.

\`\`\`css
.cards { display: grid; gap: 16px; }

@media (min-width: 700px) {
  .cards { grid-template-columns: 1fr 1fr; }
}
\`\`\`

Why in this direction? Small layouts are simple: one column, one below the other. That's what a browser does **by itself**. If you start with the wide layout, you have to undo it for phones, and you write more code.

The **order** in the file matters. If two queries match, the later one wins, so go from small to large.

You can ask for more than the width: \`(prefers-reduced-motion: reduce)\`, \`(prefers-color-scheme: dark)\`, \`(hover: hover)\`.`,
        },
        { id: "mobile-first-pic", type: "picture", diagram: "mobile-first", alt: "Base styles for small, then min-width queries add columns" },
        {
          id: "mobile-first-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Change 400px and see when it switches",
          source: `<style>
  .cards { display: grid; gap: 12px; }
  .cards > * { background: #c4b5fd; padding: 16px; }

  @media (min-width: 400px) {
    .cards { grid-template-columns: 1fr 1fr; }
  }
</style>

<div class="cards">
  <div>One</div><div>Two</div><div>Three</div><div>Four</div>
</div>`,
        },
        {
          id: "q-first",
          type: "question",
          ideaId: "mobile-first",
          kind: "choice",
          prompt: "Which CSS is mobile first?",
          options: [
            { id: "max", text: "Three columns, and @media (max-width: 600px) sets one column" },
            { id: "min", text: "One column, and @media (min-width: 600px) sets three columns" },
            { id: "both", text: "A separate file for each device", misconceptionId: "device-sizes" },
          ],
          answerId: "min",
          why: "The base is the small screen, and the query adds something for larger ones.",
          difficulty: 1,
        },
        {
          id: "q-order",
          type: "question",
          ideaId: "mobile-first",
          kind: "find-bug",
          prompt: "AI wrote this. The screen is 1000px wide. How many columns are there?",
          code: `@media (min-width: 900px) {
  .cards { grid-template-columns: 1fr 1fr 1fr; }
}
@media (min-width: 600px) {
  .cards { grid-template-columns: 1fr 1fr; }
}`,
          options: [
            { id: "three", text: "Three", misconceptionId: "order-no-matter" },
            { id: "two", text: "Two" },
            { id: "one", text: "One" },
          ],
          answerId: "two",
          why: "Both queries match, and the later one wins. The smaller query has to come first.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "units",
      title: "Units that adapt",
      simpler:
        "A pixel is a fixed step. The other units ask someone: how big is your text, how wide is your parent, how wide is the screen? Then they adapt.",
      blocks: [
        {
          id: "units-1",
          type: "text",
          body: `Good responsive design needs few media queries, because the units do most of the work.

- **rem**: the text size of the root, normally 16 pixels. If the user chooses larger text in the browser, everything in rem grows. Use it for **text** and the space around it.
- **em**: the text size of the element itself. Good for things that belong to the text, such as an icon.
- **%**: a part of the parent.
- **vw, vh**: a hundredth of the screen's width or height. On phones the bars of the browser change the height, so use \`dvh\` for full height.
- **ch**: about the width of one character. \`max-width: 65ch\` gives lines that are easy to read.
- **px**: for things that shouldn't change, such as a border.

\`clamp(min, wish, max)\` gives you fluid sizes with limits: \`font-size: clamp(1.5rem, 1rem + 3vw, 3rem)\`. Keep a rem in the middle value, or zooming the text won't work well.

For images, one line prevents most trouble: \`img { max-width: 100%; height: auto; }\`.`,
        },
        {
          id: "units-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "A title with limits, and lines that stay readable",
          source: `<style>
  h1 { font-size: clamp(1.25rem, 0.75rem + 4vw, 2.5rem); margin: 0 0 8px; }
  p { max-width: 40ch; line-height: 1.6; }
</style>

<h1>A fluid title</h1>
<p>This text never gets wider than about forty characters, however wide the screen is. Long lines are hard to read.</p>`,
        },
        {
          id: "units-case",
          type: "realCase",
          title: "The text that refused to grow",
          situation: "A news site had all its text in pixels. It looked just like the design.",
          problem: "Readers who had set a larger text size in their browser saw no difference and left.",
          cause: "Pixels ignore the text size of the browser.",
          fix: "All text sizes were changed to rem. For everybody else nothing changed, because 1rem is 16 pixels by default.",
        },
        {
          id: "q-units",
          type: "question",
          ideaId: "units",
          kind: "choice",
          prompt: "Which unit should text sizes use, so that the user's browser setting is respected?",
          options: [
            { id: "px", text: "px", misconceptionId: "px-text" },
            { id: "rem", text: "rem" },
            { id: "vw", text: "vw" },
          ],
          answerId: "rem",
          why: "rem depends on the root text size, which the user can change. Text in vw alone can't be enlarged by zooming the text.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "breakpoints",
      title: "Where to break",
      simpler:
        "Don't ask: which phone is this? Pull the window smaller, slowly. Where it starts to look bad, there is your breakpoint.",
      blocks: [
        {
          id: "breakpoints-1",
          type: "text",
          body: `It's tempting to copy a list of device sizes. But there are hundreds of them, people split their screens, and next year there are others.

**Let the content decide.** Start small and make the window wider. When lines get too long or there is too much empty space, add a breakpoint **there**. Often two or three are enough for a whole page.

A component doesn't always depend on the screen. The same card can be in a wide main column and in a narrow sidebar. **Container queries** ask about the container: give the parent \`container-type: inline-size\` and write \`@container (min-width: 400px)\`.

Test with more than narrow screens: large text, zoom to 200%, the phone turned sideways, long words, and a translation that is longer than your language.`,
        },
        {
          id: "breakpoints-case",
          type: "realCase",
          title: "Perfect on every phone in the list",
          situation: "A team tested its page on five popular phones and set a breakpoint for each.",
          problem: "On a tablet in split view, the menu lay on top of the logo.",
          cause: "The width in split view was between two of their breakpoints, where nobody had looked.",
          fix: "They pulled the window slowly from narrow to wide, and set the breakpoint at the width where the menu no longer fitted.",
        },
        {
          id: "q-breaks",
          type: "question",
          ideaId: "content-breaks",
          kind: "choice",
          prompt: "How do you find a good breakpoint?",
          options: [
            { id: "devices", text: "Take the widths of the best-selling phones", misconceptionId: "device-sizes" },
            { id: "content", text: "Change the width until the content no longer looks good" },
            { id: "round", text: "Always use 500, 1000 and 1500" },
          ],
          answerId: "content",
          why: "The content knows when it needs another layout. Devices change all the time.",
          difficulty: 1,
        },
        {
          id: "q-split",
          type: "question",
          ideaId: "content-breaks",
          kind: "choice",
          prompt: "A card looks good in the main column and squeezed in the sidebar, on the same screen. What helps?",
          options: [
            { id: "media", text: "Another media query", misconceptionId: "device-sizes" },
            { id: "container", text: "A container query" },
            { id: "px", text: "A fixed width in px" },
          ],
          answerId: "container",
          why: "A media query sees only the screen, which is the same for both cards. A container query sees the room each one has.",
          difficulty: 2,
        },
        {
          id: "breakpoints-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "The card looks at its container, not at the screen",
          source: `<style>
  .slot { container-type: inline-size; margin-bottom: 12px; }
  .card { background: #c4b5fd; padding: 12px; display: grid; gap: 8px; }
  @container (min-width: 260px) {
    .card { grid-template-columns: 1fr 1fr; }
  }
</style>

<div class="slot" style="width: 200px"><div class="card"><b>Narrow</b><span>one column</span></div></div>
<div class="slot" style="width: 300px"><div class="card"><b>Wide</b><span>two columns</span></div></div>`,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["Flexible layouts first, queries second", "min-width queries from small to large", "Container queries for parts used in many places"],
    avoid: ["Device names in your breakpoints", "Fixed widths for anything with text", "Blocking zoom"],
  },

  explain: {
    prompt: "Explain mobile first, and how you decide where a breakpoint goes. What happens without the viewport tag?",
    modelAnswer:
      "Without the viewport meta tag, a phone lays out the page about 980 pixels wide and shrinks it, so queries for small screens don't match. Mobile first means the base styles are for small screens, and min-width queries add for larger ones, from small to large. Relative units such as rem, percent and clamp adapt by themselves, so I need few queries. I set a breakpoint where the content stops looking good, not at the size of a device.",
  },

  reviewQuestions: [
    {
      id: "r-img",
      ideaId: "units",
      kind: "choice",
      prompt: "A wide photo makes the page scroll sideways on a phone. What is the usual fix?",
      options: [
        { id: "max", text: "img { max-width: 100%; height: auto; }" },
        { id: "width", text: "img { width: 400px; }" },
        { id: "hide", text: "img { display: none; }" },
      ],
      answerId: "max",
      why: "The image can get smaller with its container but not larger than itself.",
      difficulty: 1,
    },
    {
      id: "r-zoom",
      ideaId: "viewport",
      kind: "choice",
      prompt: "Why shouldn't you write `user-scalable=no`?",
      options: [
        { id: "slow", text: "It makes the page slower" },
        { id: "zoom", text: "People who need to zoom can't read the page" },
        { id: "seo", text: "It hides the page from search engines" },
      ],
      answerId: "zoom",
      why: "Zooming is how many people with weak sight read.",
      difficulty: 1,
    },
    {
      id: "r-container",
      ideaId: "content-breaks",
      kind: "choice",
      prompt: "The same card is used in the main column and in a sidebar. What should decide its layout?",
      options: [
        { id: "screen", text: "The width of the screen" },
        { id: "container", text: "The width of its container" },
        { id: "device", text: "The type of device", misconceptionId: "device-sizes" },
      ],
      answerId: "container",
      why: "Both cards are on the same screen but have different room. A container query sees that.",
      difficulty: 2,
    },
  ],

  summary: [
    "The viewport tag comes first",
    "Base styles for small screens, min-width adds",
    "rem for text, clamp for limits, 65ch for lines",
    "Break where the content breaks",
  ],

  sources: [
    { label: "MDN: Responsive web design", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Responsive_Design" },
    { label: "MDN: Using media queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_media_queries/Using_media_queries" },
    { label: "MDN: CSS container queries", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_containment/Container_queries" },
  ],
};
