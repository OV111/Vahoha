// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-flex-grid",
  title: "Flexbox and grid",
  mystery: "One long word broke the whole layout. How?",
  minutes: 30,
  lang: "css",
  requires: ["web-box-model"],

  shortAnswer:
    "Flexbox lays out items along one line and lets them share the space. Grid lays out items in rows and columns at once. Use flex for a row of things, and grid when things must line up in two directions.",

  ideas: [
    { id: "one-two", text: "Flexbox works along one direction, grid in rows and columns together" },
    { id: "axes", text: "In flexbox, justify-content works along the main axis and align-items across it" },
    { id: "grow-shrink", text: "flex-grow shares free space, flex-shrink shares a lack of it" },
    { id: "fr-minmax", text: "fr shares the free space of a grid, and auto-fit with minmax adapts the number of columns" },
    { id: "min-width", text: "Flex and grid items don't get smaller than their content unless min-width is 0" },
  ],

  misconceptions: [
    {
      id: "justify-horizontal",
      belief: "justify-content is always horizontal",
      correction: "It works along the main axis. With flex-direction: column, that is vertical.",
    },
    {
      id: "flex1-equal",
      belief: "flex: 1 always makes items the same width",
      correction: "It shares the space equally, but no item gets smaller than its content. A long word can make one wider.",
    },
    {
      id: "fr-fixed",
      belief: "1fr always means an equal part, whatever is inside",
      correction: "1fr is minmax(auto, 1fr), so a column can't get smaller than its content. Use minmax(0, 1fr).",
    },
  ],

  sections: [
    {
      id: "choose",
      title: "One direction or two",
      simpler:
        "Flex is a line of people who decide among themselves who stands where. Grid is a chessboard: the squares are there first, and the pieces go into them.",
      blocks: [
        {
          id: "choose-1",
          type: "text",
          body: `Both are values of \`display\`, set on the **container**. They change how its **direct children** are laid out.

**Flexbox** thinks in **one direction**: a row or a column. The items decide: they have their size, and the rest of the space is shared. If they wrap, each line is laid out for itself, so items in different lines don't line up.

**Grid** thinks in **two directions**. You define columns and rows on the container, and the items go into the cells. Everything lines up in both directions.

A simple way to decide: do the items need to line up with the items **above and below**? Then grid. Are they just things in a row, such as a toolbar, tags, or a label with an icon? Then flex.

You can use both: grid for the page, flex inside a card.`,
        },
        { id: "choose-pic", type: "picture", diagram: "flex-vs-grid", alt: "Flex lays out one line, grid lays out rows and columns" },
        {
          id: "choose-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "The same items: flex above, grid below",
          source: `<style>
  .flex { display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 24px; }
  .grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; }
  .flex > *, .grid > * { background: #c4b5fd; padding: 10px; }
</style>

<div class="flex">
  <div>One</div><div>A longer item</div><div>Three</div><div>Four</div>
</div>

<div class="grid">
  <div>One</div><div>A longer item</div><div>Three</div><div>Four</div>
</div>`,
        },
        {
          id: "q-choose",
          type: "question",
          ideaId: "one-two",
          kind: "choice",
          prompt: "Product cards should form columns that line up over several rows. What fits best?",
          options: [
            { id: "flex", text: "Flexbox with wrap" },
            { id: "grid", text: "Grid" },
            { id: "inline", text: "inline-block" },
          ],
          answerId: "grid",
          why: "They must line up in both directions. With flex-wrap, the cards of the last row could be wider than the rest.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "flex",
      title: "Flexbox: axes and space",
      simpler:
        "First decide which way the line goes. Along the line you use justify. Across the line you use align. If you turn the line, both turn with it.",
      blocks: [
        {
          id: "flex-1",
          type: "text",
          body: `A flex container has two axes. The **main axis** runs in the direction of \`flex-direction\`: \`row\` by default. The **cross axis** runs across it.

- \`justify-content\` places the items **along** the main axis: \`flex-start\`, \`center\`, \`space-between\`.
- \`align-items\` places them **across** it. The default is \`stretch\`, which is why items in a row have the same height.

With \`flex-direction: column\` the axes turn, and so do these two.

**Sharing space.** \`flex-grow\` says how much of the **free** space an item takes. \`flex-shrink\` says how much it gives up if there is **too little**. \`flex-basis\` is the size to start from. \`flex: 1\` means grow, shrink, and start from 0, so the space is shared equally.

\`margin-left: auto\` on an item takes all free space on its left. It's a neat way to push one item to the end.`,
        },
        {
          id: "flex-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Try flex-direction: column, then justify-content: center",
          source: `<style>
  .bar { display: flex; align-items: center; gap: 12px; padding: 12px; background: #ede9fe; min-height: 120px; }
  .bar > * { background: #c4b5fd; padding: 10px; }
  .end { margin-left: auto; }
</style>

<div class="bar">
  <div>Logo</div>
  <div>Shop</div>
  <div class="end">Log in</div>
</div>`,
        },
        {
          id: "q-axes",
          type: "question",
          ideaId: "axes",
          kind: "choice",
          prompt: "A container has `display: flex; flex-direction: column`. Which property centres the items **horizontally**?",
          options: [
            { id: "justify", text: "justify-content", misconceptionId: "justify-horizontal" },
            { id: "align", text: "align-items" },
            { id: "text", text: "flex-wrap" },
          ],
          answerId: "align",
          why: "In a column, the main axis is vertical. Horizontal is across it, so it's align-items.",
          difficulty: 2,
        },
        {
          id: "q-grow",
          type: "question",
          ideaId: "grow-shrink",
          kind: "choice",
          prompt: "Two items start from 0. One has `flex: 1`, the other `flex: 2`. The container is 300px wide. How wide are they?",
          options: [
            { id: "equal", text: "150 and 150", misconceptionId: "flex1-equal" },
            { id: "thirds", text: "100 and 200" },
            { id: "other", text: "75 and 225" },
          ],
          answerId: "thirds",
          why: "There are three parts. One item gets one part, the other gets two.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "grid",
      title: "Grid: columns and rows",
      simpler:
        "You draw the lines first: how many columns, and how wide. Then the items fill the fields one after the other. If you like, one item may take several fields.",
      blocks: [
        {
          id: "grid-1",
          type: "text",
          body: `\`grid-template-columns\` describes the columns: \`200px 1fr\` is a fixed column and one that takes the rest. The unit \`fr\` is a **fraction of the free space**. \`repeat(3, 1fr)\` is three equal ones.

Items fill the cells in the order of the HTML. An item can span several: \`grid-column: span 2\`.

The most useful line for cards needs no media query:

\`\`\`css
grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
\`\`\`

It reads: as many columns as fit, each at least 220 pixels, and share the rest. On a phone it is one column, on a wide screen four or five.

To centre one thing in both directions, \`display: grid; place-items: center\` is enough.

\`gap\` sets the space between rows and columns, with no extra space at the edges.`,
        },
        {
          id: "grid-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Make the window narrower, or change 140px",
          source: `<style>
  .cards {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
    gap: 12px;
  }
  .cards > * { background: #c4b5fd; padding: 16px; }
  .wide { grid-column: span 2; }
</style>

<div class="cards">
  <div class="wide">Wide</div><div>Two</div><div>Three</div><div>Four</div><div>Five</div>
</div>`,
        },
        {
          id: "grid-case",
          type: "realCase",
          title: "Seven media queries for four cards",
          situation: "A team wrote a media query for each screen size to change the number of cards in a row.",
          problem: "With every new place where the cards were used, in a sidebar for example, the numbers were wrong again.",
          cause: "Media queries ask about the screen. But the cards depend on the width of their container.",
          fix: "`repeat(auto-fit, minmax(220px, 1fr))` replaced all seven. The grid looks at its own width.",
        },
        {
          id: "q-fr",
          type: "question",
          ideaId: "fr-minmax",
          kind: "choice",
          prompt: "`grid-template-columns: 100px 1fr 1fr`, 500px wide, no gap. How wide is the second column?",
          options: [
            { id: "166", text: "About 167px" },
            { id: "200", text: "200px" },
            { id: "250", text: "250px" },
          ],
          answerId: "200",
          why: "fr shares what is left after the fixed column: 400 pixels, in two parts.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "overflow",
      title: "Why one long word breaks a layout",
      simpler:
        "A suitcase can be pressed together only until the hardest thing in it stops you. In flex and grid, the hardest thing is the longest word or the widest image.",
      blocks: [
        {
          id: "overflow-1",
          type: "text",
          body: `Flex and grid items have a hidden rule: their \`min-width\` is \`auto\`. For most items it means: **don't get smaller than your content**. The content's smallest size is its longest word, an image, or a line of code.

So a long email address, or a \`pre\` with code, can make a column wider than planned and push the rest off the screen. \`flex: 1\` and \`1fr\` don't help, because they respect this limit. \`1fr\` is short for \`minmax(auto, 1fr)\`.

The fix is to **allow** it to shrink:

- in flex: \`min-width: 0\` on the item
- in grid: \`minmax(0, 1fr)\` for the column

Then decide what should happen with the long content: wrap with \`overflow-wrap: anywhere\`, scroll with \`overflow-x: auto\`, or cut off with \`text-overflow: ellipsis\`.`,
        },
        {
          id: "overflow-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Add min-width: 0 to .text",
          source: `<style>
  .row { display: flex; gap: 8px; width: 260px; background: #ede9fe; padding: 8px; }
  .text { flex: 1; background: #c4b5fd; overflow-wrap: anywhere; }
  .text code { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; display: block; }
  button { flex: none; }
</style>

<div class="row">
  <div class="text"><code>averyveryverylongaddress@example-company.com</code></div>
  <button>Copy</button>
</div>`,
        },
        {
          id: "overflow-case",
          type: "realCase",
          title: "The chat that grew out of the screen",
          situation: "A chat has a list on the left and the messages on the right, with `grid-template-columns: 240px 1fr`.",
          problem: "Somebody posted a long link without spaces. From then on, the send button was off the screen.",
          cause: "1fr can't get smaller than the content, and the link is one long word.",
          fix: "`grid-template-columns: 240px minmax(0, 1fr)`, and `overflow-wrap: anywhere` on the messages.",
        },
        {
          id: "q-min",
          type: "question",
          ideaId: "min-width",
          kind: "choice",
          prompt: "Three items have `flex: 1`. One holds a very long word and is wider than the others. Why?",
          options: [
            { id: "bug", text: "flex: 1 works only for two items" },
            { id: "min", text: "An item doesn't get smaller than its longest word, unless min-width is 0" },
            { id: "grow", text: "flex-grow counts letters", misconceptionId: "flex1-equal" },
          ],
          answerId: "min",
          why: "The default min-width: auto protects the content.",
          difficulty: 2,
        },
        {
          id: "q-minmax",
          type: "question",
          ideaId: "min-width",
          kind: "find-bug",
          prompt: "AI suggests `1fr` for a column with code blocks, so that the page never scrolls sideways. Does it help?",
          code: `.page {
  display: grid;
  grid-template-columns: 200px 1fr;
}`,
          options: [
            { id: "yes", text: "Yes, 1fr never gets wider than the free space", misconceptionId: "fr-fixed" },
            { id: "no", text: "No, it needs minmax(0, 1fr), because 1fr grows with its content" },
            { id: "flex", text: "No, only flexbox can do this" },
          ],
          answerId: "no",
          why: "1fr is minmax(auto, 1fr). With 0 as the minimum, the code block can scroll inside its column.",
          difficulty: 3,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["Flex for toolbars, tags, a label with an icon", "Grid for pages, card lists and forms", "gap for space between items"],
    avoid: ["Flex with widths in percent to imitate a grid", "Changing the visual order with order: the keyboard follows the HTML", "Fixed column counts where auto-fit would do"],
  },

  explain: {
    prompt: "When do you use flexbox and when grid? And why can one long word make a column wider than you said?",
    modelAnswer:
      "Flexbox lays items out along one direction: justify-content works along the main axis and align-items across it, and grow and shrink share the space or the lack of it. Grid works in rows and columns together, so I use it when things must line up in both directions. fr shares the free space, and auto-fit with minmax changes the number of columns by itself. Flex and grid items have min-width auto, so they don't get smaller than their longest word. min-width: 0 or minmax(0, 1fr) allows it.",
  },

  reviewQuestions: [
    {
      id: "r-center",
      ideaId: "axes",
      kind: "choice",
      prompt: "A row (`display: flex`) should have its items in the middle **vertically**. Which property?",
      options: [
        { id: "align", text: "align-items: center" },
        { id: "justify", text: "justify-content: center", misconceptionId: "justify-horizontal" },
      ],
      answerId: "align",
      why: "In a row, vertical is across the main axis.",
      difficulty: 1,
    },
    {
      id: "r-autofit",
      ideaId: "fr-minmax",
      kind: "choice",
      prompt: "What does `repeat(auto-fit, minmax(200px, 1fr))` do on a screen 450px wide, without gap?",
      options: [
        { id: "one", text: "One column" },
        { id: "two", text: "Two columns of 225px" },
        { id: "three", text: "Three columns of 150px" },
      ],
      answerId: "two",
      why: "Two columns of at least 200 fit, and they share the rest. A third doesn't fit.",
      difficulty: 2,
    },
    {
      id: "r-shrink",
      ideaId: "grow-shrink",
      kind: "choice",
      prompt: "An icon gets squeezed in a narrow flex row. What do you set on it?",
      options: [
        { id: "grow", text: "flex-grow: 1" },
        { id: "shrink", text: "flex-shrink: 0" },
        { id: "basis", text: "flex-basis: 0" },
      ],
      answerId: "shrink",
      why: "Then it doesn't give up any of its width.",
      difficulty: 1,
    },
  ],

  summary: [
    "Flex: one direction. Grid: rows and columns",
    "justify goes along the main axis, align across it",
    "fr shares free space; auto-fit with minmax needs no media query",
    "min-width: 0 or minmax(0, 1fr) lets items shrink",
  ],

  sources: [
    { label: "MDN: Flexbox", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Flexbox" },
    { label: "MDN: CSS grid layout", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/CSS_layout/Grids" },
    { label: "MDN: minmax()", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/minmax" },
  ],
};
