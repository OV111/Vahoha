// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-rendering",
  title: "How the browser draws a page",
  mystery: "The page stays white for four seconds, though the HTML is already there. Why?",
  minutes: 30,
  lang: "html",
  requires: ["web-dom", "web-devtools"],

  shortAnswer:
    "The browser turns HTML into the DOM and CSS into the CSSOM, combines both, calculates the layout and paints. CSS blocks the drawing, and a plain script blocks the reading of the HTML. Both can keep the page white.",

  ideas: [
    { id: "steps", text: "DOM and CSSOM become the render tree, then layout, then paint" },
    { id: "css-blocks", text: "CSS blocks rendering: nothing is drawn before it is there" },
    { id: "js-blocks", text: "A script without defer or async stops the reading of the HTML" },
    { id: "defer-async", text: "defer keeps the order and waits for the document; async runs as soon as it is loaded" },
    { id: "reflow", text: "Changing sizes costs layout and paint; transform and opacity are cheap" },
  ],

  misconceptions: [
    {
      id: "async-order",
      belief: "async scripts run in the order they are written",
      correction: "They run as soon as each one is loaded. defer keeps the order.",
    },
    {
      id: "html-enough",
      belief: "the page is drawn as soon as the HTML has arrived",
      correction: "The browser also waits for the CSS in the head, so that it doesn't show an unstyled page.",
    },
    {
      id: "all-changes-equal",
      belief: "every style change costs about the same",
      correction: "Changing a width needs layout and paint. transform and opacity can often be done without both.",
    },
  ],

  sections: [
    {
      id: "steps",
      title: "From text to picture",
      simpler:
        "Building a house: first the plan of the rooms, then the plan of the colours. Put together, you know what to build. Then you measure, then you paint.",
      blocks: [
        {
          id: "steps-1",
          type: "text",
          body: `Between the HTML and the picture on the screen are several steps. Together they are called the **critical rendering path**.

1. **DOM**: the browser reads the HTML and builds the tree of elements.
2. **CSSOM**: it reads the CSS and builds a tree of styles.
3. **Render tree**: both together, only with what is visible. An element with \`display: none\` isn't in it.
4. **Layout**: where is each box, and how big is it?
5. **Paint**: text, colours, borders, shadows are drawn.
6. **Composite**: painted layers are put together.

The HTML is read **bit by bit**, as it arrives. So a long page can already show its beginning while the rest is still loading, as long as nothing blocks it.

When something changes later, the browser repeats only the steps that are needed.`,
        },
        { id: "steps-pic", type: "picture", diagram: "render-path", alt: "DOM and CSSOM become the render tree, then layout, then paint" },
        {
          id: "steps-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "In the DOM, but not drawn",
          source: `<p>Visible</p>
<p style="display: none" id="hidden">Not in the render tree</p>
<p id="out"></p>

<script>
  const hidden = document.querySelector("#hidden");
  document.querySelector("#out").textContent =
    "In the DOM: " + Boolean(hidden) + ", height on screen: " + hidden.offsetHeight;
</script>`,
        },
        {
          id: "q-steps",
          type: "question",
          ideaId: "steps",
          kind: "choice",
          prompt: "Where is an element with `display: none`?",
          options: [
            { id: "both", text: "In the DOM and in the render tree" },
            { id: "dom", text: "In the DOM, but not in the render tree" },
            { id: "none", text: "In neither" },
          ],
          answerId: "dom",
          why: "Scripts can find it, but it is not laid out or painted.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "css",
      title: "Why CSS blocks",
      simpler:
        "A theatre doesn't open the curtain while the actors are still putting on their costumes. You wait a bit, but you don't see a mess.",
      blocks: [
        {
          id: "css-1",
          type: "text",
          body: `If the browser drew the page without CSS, you would see plain text first, and then everything would jump. To avoid this, it **waits**: nothing is drawn until the CSS in the head has been loaded and read. CSS is **render-blocking**.

The HTML is still read meanwhile. But you see nothing. If the CSS takes three seconds, the page is white for three seconds.

So: keep the CSS **small**, load it from your **own** server, and leave out what isn't needed. Each \`@import\` in a CSS file adds a further trip, because the browser finds out about it only after reading the first file.

\`<link media="print">\` doesn't block, because it isn't for the screen. Fonts don't block the page but can hide the text: \`font-display: swap\` shows a replacement until the font is there.`,
        },
        {
          id: "css-case",
          type: "realCase",
          title: "White for four seconds",
          situation: "A page loads a font from another server, with its CSS in the head. The HTML arrives in 200 milliseconds.",
          problem: "On mobile networks, the page stayed white for four seconds.",
          cause: "The font's CSS is render-blocking. The connection to the other server alone took over a second, and the server was slow.",
          fix: "The font files moved to their own server, with `font-display: swap`. The text appeared after half a second.",
        },
        {
          id: "q-css",
          type: "question",
          ideaId: "css-blocks",
          kind: "choice",
          prompt: "The HTML is there after 0.2 seconds, the CSS in the head after 2 seconds. When does the user see something?",
          options: [
            { id: "02", text: "After 0.2 seconds, without styles", misconceptionId: "html-enough" },
            { id: "2", text: "After about 2 seconds" },
            { id: "never", text: "Only after all images are loaded" },
          ],
          answerId: "2",
          why: "The browser waits for the CSS before it draws. Images don't block.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "js",
      title: "Scripts: defer and async",
      simpler:
        "A plain script is a guest who stops your work until they have said everything. defer says: I'll wait until you're done. async says: I'll barge in as soon as I arrive.",
      blocks: [
        {
          id: "js-1",
          type: "text",
          body: `A script can change the HTML. So when the browser meets a plain \`<script src>\`, it **stops reading the HTML**, loads the file, runs it, and only then goes on. Everything below has to wait.

| | Loads | Runs | Order |
| --- | --- | --- | --- |
| \`<script>\` | stops the reading | immediately | as written |
| \`defer\` | alongside | after the document has been read | **as written** |
| \`async\` | alongside | **as soon as it is loaded** | whoever is first |

\`defer\` is the normal choice for your own code: the page is ready, and the order is kept. \`async\` is for scripts that need nothing and that nobody needs, such as statistics. \`type="module"\` behaves like defer.

A script also waits for CSS that comes before it, because it might ask for styles. So slow CSS can hold up scripts too.`,
        },
        {
          id: "js-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "The first script runs before the element exists",
          source: `<script>
  window.early = document.querySelector("#title");
</script>

<h1 id="title">Hello</h1>
<p id="out"></p>

<script>
  document.querySelector("#out").textContent =
    "early: " + window.early + ", now: " + document.querySelector("#title").textContent;
</script>`,
        },
        {
          id: "js-case",
          type: "realCase",
          title: "Sometimes it works, sometimes not",
          situation: "To make the page faster, a team put `async` on all scripts. One of them is a library, another uses it.",
          problem: "For some users the page failed with \"library is not defined\". For the developers it always worked.",
          cause: "async scripts run in the order in which they arrive. On slow networks, the small script was there before the library.",
          fix: "defer on both. They load alongside and run in the order they are written.",
        },
        {
          id: "q-defer",
          type: "question",
          ideaId: "defer-async",
          kind: "choice",
          prompt: "`app.js` needs `library.js`. Both should not block the page. What do you use?",
          options: [
            { id: "async", text: "async on both", misconceptionId: "async-order" },
            { id: "defer", text: "defer on both, the library first" },
            { id: "plain", text: "Two plain scripts in the head" },
          ],
          answerId: "defer",
          why: "defer loads alongside and keeps the order.",
          difficulty: 1,
        },
        {
          id: "q-plain",
          type: "question",
          ideaId: "js-blocks",
          kind: "choice",
          prompt: "A plain script in the head takes 2 seconds to load. What happens to the HTML below it?",
          options: [
            { id: "reads", text: "It is read and shown meanwhile" },
            { id: "waits", text: "It isn't turned into the DOM until the script has run" },
            { id: "lost", text: "It is skipped" },
          ],
          answerId: "waits",
          why: "The script could change the document, so the browser stops reading.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "changes",
      title: "Changes cost something",
      simpler:
        "Moving a wall means measuring and painting again. Sliding a finished picture across the wall costs almost nothing.",
      blocks: [
        {
          id: "changes-1",
          type: "text",
          body: `After the first drawing, each change costs something, but not the same.

- **Layout** (also called reflow): changing \`width\`, \`height\`, \`margin\`, \`top\` or the text. Positions have to be calculated again, often for many elements. Paint follows.
- **Paint**: changing \`color\` or \`background\`. The positions stay.
- **Composite**: \`transform\` and \`opacity\` can often be changed without layout and paint. This is why smooth animations use them.

One trap is called **layout thrashing**. If you write a style and then **read** a size, such as \`offsetHeight\`, the browser has to calculate the layout at once to answer. In a loop that happens every time. So first read everything, then write everything.

Give images \`width\` and \`height\`, or an \`aspect-ratio\`. Then their place is kept free, and the text doesn't jump when they arrive.`,
        },
        {
          id: "changes-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "The same movement: transform is cheap, left needs layout",
          source: `<style>
  .box { width: 60px; height: 40px; background: #7c3aed; margin: 8px 0; position: relative; }
  .cheap { animation: cheap 2s infinite alternate; }
  .costly { animation: costly 2s infinite alternate; background: #c4b5fd; }
  @keyframes cheap { to { transform: translateX(150px); } }
  @keyframes costly { to { left: 150px; } }
</style>

<div class="box cheap"></div>
<div class="box costly"></div>`,
        },
        {
          id: "changes-compare",
          type: "compare",
          wrong: `for (const el of items) {
  el.style.width = "50%";
  heights.push(el.offsetHeight);
}`,
          right: `for (const el of items) el.style.width = "50%";
for (const el of items) heights.push(el.offsetHeight);`,
          why: "On the left, the browser has to calculate the layout in every turn. On the right, only once.",
        },
        {
          id: "q-changes",
          type: "question",
          ideaId: "reflow",
          kind: "choice",
          prompt: "A panel should slide in smoothly. Which property do you animate?",
          options: [
            { id: "left", text: "left", misconceptionId: "all-changes-equal" },
            { id: "transform", text: "transform" },
            { id: "margin", text: "margin-left", misconceptionId: "all-changes-equal" },
          ],
          answerId: "transform",
          why: "It can be done without new layout and paint in every frame.",
          difficulty: 1,
        },
        {
          id: "q-jump",
          type: "question",
          ideaId: "reflow",
          kind: "choice",
          prompt: "While a page loads, the text jumps down when the images appear. What prevents it?",
          options: [
            { id: "size", text: "width and height on the images, so their place is kept free" },
            { id: "async", text: "async on the images", misconceptionId: "async-order" },
            { id: "hide", text: "Hiding the text until all images are there" },
          ],
          answerId: "size",
          why: "The browser knows the proportions before the image arrives and reserves the place.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["defer for your own scripts", "Small CSS from your own server", "transform and opacity for animations"],
    avoid: ["Plain scripts in the head", "@import chains in CSS", "Reading sizes between writes in a loop"],
  },

  explain: {
    prompt: "A page stays white for seconds although the HTML has arrived. Explain what the browser does between HTML and picture, and what you would check.",
    modelAnswer:
      "The browser builds the DOM from the HTML and the CSSOM from the CSS, combines them into the render tree, calculates the layout and paints. CSS blocks the drawing, so slow CSS in the head keeps the page white. A plain script stops the reading of the HTML. With defer, scripts load alongside and run in order after the document has been read, while async scripts run as soon as they are there. I'd look in Network for slow CSS and scripts in the head. Later, changes to sizes cost layout and paint, while transform and opacity are cheap.",
  },

  reviewQuestions: [
    {
      id: "r-async",
      ideaId: "defer-async",
      kind: "choice",
      prompt: "Two async scripts: `a.js` is large, `b.js` is small, and a comes first in the HTML. Which runs first?",
      options: [
        { id: "a", text: "Always a", misconceptionId: "async-order" },
        { id: "either", text: "Whichever is loaded first, probably b" },
        { id: "together", text: "Both at the same time" },
      ],
      answerId: "either",
      why: "async has no order.",
      difficulty: 1,
    },
    {
      id: "r-css",
      ideaId: "css-blocks",
      kind: "choice",
      prompt: "Why does the browser wait for CSS before drawing?",
      options: [
        { id: "flash", text: "So that the user doesn't see an unstyled page that then jumps" },
        { id: "dom", text: "Because it can't build the DOM without CSS" },
        { id: "safe", text: "For security" },
      ],
      answerId: "flash",
      why: "The DOM is built meanwhile, but the drawing waits.",
      difficulty: 1,
    },
    {
      id: "r-paint",
      ideaId: "reflow",
      kind: "choice",
      prompt: "Which change needs **layout**?",
      options: [
        { id: "color", text: "color" },
        { id: "width", text: "width" },
        { id: "opacity", text: "opacity", misconceptionId: "all-changes-equal" },
      ],
      answerId: "width",
      why: "The positions have to be calculated again. color needs only paint.",
      difficulty: 1,
    },
  ],

  summary: [
    "DOM + CSSOM → render tree → layout → paint",
    "CSS blocks the drawing, plain scripts block the reading",
    "defer keeps the order, async doesn't",
    "transform and opacity are cheap; sizes aren't",
  ],

  sources: [
    { label: "MDN: Critical rendering path", url: "https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Critical_rendering_path" },
    { label: "MDN: The script element", url: "https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/script" },
    { label: "web.dev: Render-blocking resources", url: "https://web.dev/articles/critical-rendering-path/render-blocking-css" },
  ],
};
