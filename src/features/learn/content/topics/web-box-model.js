// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-box-model",
  title: "The box model",
  mystery: "Two boxes are 50% wide. Why don't they fit side by side?",
  minutes: 25,
  lang: "css",
  requires: ["web-semantic-html"],

  shortAnswer:
    "Every element is a box made of content, padding, border and margin. By default, width means only the content, so padding and border make the box bigger. box-sizing: border-box makes width mean the visible box.",

  ideas: [
    { id: "four-layers", text: "A box has content, padding, border and margin, from the inside out" },
    { id: "border-box", text: "With content-box, padding and border are added to the width; with border-box they are inside it" },
    { id: "collapse", text: "Vertical margins of neighbouring blocks collapse into one" },
    { id: "display", text: "display decides how a box behaves: block, inline or inline-block" },
  ],

  misconceptions: [
    {
      id: "width-is-all",
      belief: "width is always the width of the visible box",
      correction: "With the default content-box, width is only the content. Padding and border come on top.",
    },
    {
      id: "margins-add",
      belief: "the margins between two blocks are always added",
      correction: "Vertical margins of neighbouring blocks collapse: the larger one counts.",
    },
    {
      id: "inline-height",
      belief: "you can set the width and height of every element",
      correction: "Inline elements such as span ignore width and height. Make them inline-block or block.",
    },
  ],

  sections: [
    {
      id: "layers",
      title: "Four layers",
      simpler:
        "A picture in a frame: the picture is the content, the mat around it is the padding, the frame is the border, and the space to the next picture on the wall is the margin.",
      blocks: [
        {
          id: "layers-1",
          type: "text",
          body: `The browser turns every element into a **rectangular box**, even if you see only text. From the inside out, it has four layers:

- **Content**: the text or the image.
- **Padding**: space **inside** the box, around the content. The background covers it.
- **Border**: the line around the padding.
- **Margin**: space **outside** the box, to its neighbours. It is always transparent.

To choose between padding and margin, ask: does the space belong **to the thing** or is it **between things**? Space between text and the edge of a button is padding. Space between two buttons is margin, or \`gap\` in a flex or grid container.

Padding is clickable, because it is part of the box. Margin isn't. So a link on a phone gets bigger for the finger with padding.`,
        },
        { id: "layers-pic", type: "picture", diagram: "box-model", alt: "Content inside padding inside border inside margin" },
        {
          id: "layers-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Change padding, border and margin",
          source: `<style>
  .box {
    padding: 20px;
    border: 4px solid #7c3aed;
    margin: 24px;
    background: #ede9fe;
  }
</style>

<div class="box">First box</div>
<div class="box">Second box</div>`,
        },
        {
          id: "q-layers",
          type: "question",
          ideaId: "four-layers",
          kind: "choice",
          prompt: "A button should be easier to hit with a finger, and its colour should fill the new space. What do you increase?",
          options: [
            { id: "margin", text: "margin" },
            { id: "padding", text: "padding" },
            { id: "gap", text: "gap" },
          ],
          answerId: "padding",
          why: "Padding is inside the box: it takes the background and can be clicked. Margin is outside and transparent.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "sizing",
      title: "What width really means",
      simpler:
        "You order a shelf that is 50 cm wide. One shop measures only the inside, another the whole shelf. If you don't know which, it may not fit into the gap.",
      blocks: [
        {
          id: "sizing-1",
          type: "text",
          body: `By default, boxes use \`box-sizing: content-box\`. Then \`width\` is the width of the **content only**. Padding and border are added:

\`\`\`text
width 200 + padding 20 + 20 + border 5 + 5 = 250 pixels
\`\`\`

That's the answer to the question at the top. Two boxes with 50% each would fit, but with padding each is wider than 50%, so the second one moves to the next line.

With \`box-sizing: border-box\`, \`width\` is the **visible box**: content, padding and border together. The content gets what is left. This is how most people think, so nearly every project starts with one rule for all elements.

Margin is never part of the width, in neither case.`,
        },
        {
          id: "sizing-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Remove border-box and see what happens",
          source: `<style>
  * { box-sizing: border-box; }
  .half {
    float: left;
    width: 50%;
    padding: 20px;
    border: 2px solid #7c3aed;
  }
</style>

<div class="half">Left</div>
<div class="half">Right</div>`,
        },
        {
          id: "sizing-case",
          type: "realCase",
          title: "The page that moved sideways",
          situation: "A form on a phone has inputs with `width: 100%` and `padding: 16px`.",
          problem: "The whole page could be moved sideways, and the right end of each input was cut off.",
          cause: "With content-box, each input was 100% plus 32 pixels of padding plus its border, so it was wider than the screen.",
          fix: "`*, *::before, *::after { box-sizing: border-box; }` at the top of the CSS.",
        },
        {
          id: "q-sizing",
          type: "question",
          ideaId: "border-box",
          kind: "choice",
          prompt: "`width: 300px; padding: 10px; border: 5px solid;` with the default box-sizing. How wide is the visible box?",
          options: [
            { id: "300", text: "300px", misconceptionId: "width-is-all" },
            { id: "315", text: "315px" },
            { id: "330", text: "330px" },
          ],
          answerId: "330",
          why: "300 + 10 + 10 + 5 + 5. Padding and border count on both sides.",
          difficulty: 1,
        },
        {
          id: "q-border-box",
          type: "question",
          ideaId: "border-box",
          kind: "choice",
          prompt: "The same box with `box-sizing: border-box`. How wide is its **content**?",
          options: [
            { id: "300", text: "300px" },
            { id: "270", text: "270px" },
            { id: "330", text: "330px" },
          ],
          answerId: "270",
          why: "The visible box is 300. Padding (20) and border (10) are taken from it.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "collapse",
      title: "Margins that collapse",
      simpler:
        "Two people each say: keep one metre away from me. They don't stand two metres apart. One metre is enough for both.",
      blocks: [
        {
          id: "collapse-1",
          type: "text",
          body: `When two blocks stand one above the other, the bottom margin of the first and the top margin of the second **collapse**. They aren't added: the **larger** one counts. A heading with 30 and a paragraph with 20 are 30 pixels apart, not 50.

It also happens between a **parent and its first or last child**, if nothing separates them. Then the child's margin sticks out of the parent, and the whole parent seems to move. Padding or a border on the parent stops it, and so does \`display: flow-root\`.

Margins **don't** collapse sideways, and not between the items of a flex or grid container. That is one reason why \`gap\` is easier: it is the space between, and nothing surprising happens.`,
        },
        {
          id: "collapse-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "30 and 20 become 30. Then add display: grid to .wrap",
          source: `<style>
  .wrap { background: #ede9fe; padding: 1px; }
  .a { margin-bottom: 30px; background: #c4b5fd; }
  .b { margin-top: 20px; background: #c4b5fd; }
</style>

<div class="wrap">
  <div class="a">margin-bottom: 30px</div>
  <div class="b">margin-top: 20px</div>
</div>`,
        },
        {
          id: "q-collapse",
          type: "question",
          ideaId: "collapse",
          kind: "choice",
          prompt: "A block has `margin-bottom: 40px`, the next one `margin-top: 10px`. How far apart are they?",
          options: [
            { id: "50", text: "50px", misconceptionId: "margins-add" },
            { id: "40", text: "40px" },
            { id: "25", text: "25px" },
          ],
          answerId: "40",
          why: "Vertical margins of neighbouring blocks collapse, and the larger one counts.",
          difficulty: 1,
        },
        {
          id: "collapse-case",
          type: "realCase",
          title: "The gap above the header",
          situation: "A coloured header sits at the top of the page. Inside is an h1 with a top margin.",
          problem: "There was a white stripe above the header, though the header itself had no margin.",
          cause: "The margin of the h1 collapsed with that of the header and stuck out at the top.",
          fix: "The header got padding, and the margin of the h1 was removed. Space inside a box is the job of padding.",
        },
      ],
    },
    {
      id: "display",
      title: "Block, inline, inline-block",
      simpler:
        "Block is a brick: it takes the whole row. Inline is a word: it flows with the text. Inline-block is a brick that stands in the line of words.",
      blocks: [
        {
          id: "display-1",
          type: "text",
          body: `\`display\` decides how a box behaves.

- **block** (\`div\`, \`p\`, \`h1\`): starts on a new line and takes the full width. You can set width and height.
- **inline** (\`span\`, \`a\`, \`strong\`): flows with the text. **Width and height are ignored**, and vertical margins have no effect. Vertical padding is painted but doesn't push other lines away.
- **inline-block**: flows with the text but is a full box, with width, height and margins.
- **none**: the box is gone, also for screen readers.

\`flex\` and \`grid\` are also values of display. They are about the **children**, and you'll learn them in the next topic.`,
        },
        {
          id: "display-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Change inline to inline-block",
          source: `<style>
  .tag {
    display: inline;
    width: 120px;
    height: 60px;
    background: #c4b5fd;
  }
</style>

<p>Some text with a <span class="tag">tag</span> in it.</p>`,
        },
        {
          id: "q-display",
          type: "question",
          ideaId: "display",
          kind: "find-bug",
          prompt: "AI wrote this to make a link 200 pixels wide. Why doesn't it work?",
          code: `<a href="/shop" style="width: 200px; height: 50px">Shop</a>`,
          options: [
            { id: "inline", text: "a is inline, so width and height are ignored" },
            { id: "important", text: "Links need !important" },
            { id: "works", text: "It works: every element has a width", misconceptionId: "inline-height" },
          ],
          answerId: "inline",
          why: "Give it display: inline-block, block or inline-flex.",
          difficulty: 2,
        },
        {
          id: "q-none",
          type: "question",
          ideaId: "display",
          kind: "choice",
          prompt: "Which one hides an element for everybody, including screen readers, and leaves no gap?",
          options: [
            { id: "opacity", text: "opacity: 0" },
            { id: "none", text: "display: none" },
            { id: "visibility", text: "visibility: hidden" },
          ],
          answerId: "none",
          why: "opacity: 0 only makes it invisible, and people can still reach it. visibility: hidden leaves the gap.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["padding for space inside a box", "gap for space between the items of flex and grid", "border-box for all elements"],
    avoid: ["margin for space inside a box", "Fixed heights for boxes with text", "Negative margins to repair a layout you don't understand"],
  },

  explain: {
    prompt: "A box has width, padding and border. Explain how wide it really is, and why the space between two paragraphs may be smaller than you expect.",
    modelAnswer:
      "A box has content, padding, border and margin, from the inside out. With content-box, width is only the content, so padding and border are added on both sides. With border-box, they are inside the width. The vertical margins of two blocks collapse, so only the larger one counts. And display matters: inline elements ignore width and height, while block and inline-block use them.",
  },

  reviewQuestions: [
    {
      id: "r-gap",
      ideaId: "collapse",
      kind: "choice",
      prompt: "Between which boxes do margins never collapse?",
      options: [
        { id: "p", text: "Two paragraphs" },
        { id: "flex", text: "The items of a flex container" },
        { id: "parent", text: "A parent without padding and its first child" },
      ],
      answerId: "flex",
      why: "Inside flex and grid containers margins don't collapse.",
      difficulty: 2,
    },
    {
      id: "r-click",
      ideaId: "four-layers",
      kind: "choice",
      prompt: "Which layer is outside the background of a box?",
      options: [
        { id: "padding", text: "Padding" },
        { id: "margin", text: "Margin" },
        { id: "content", text: "Content" },
      ],
      answerId: "margin",
      why: "Margin is always transparent and not part of the visible box.",
      difficulty: 1,
    },
    {
      id: "r-width",
      ideaId: "border-box",
      kind: "choice",
      prompt: "`width: 100%; padding: 20px` sticks out of its parent. What is the usual fix?",
      options: [
        { id: "overflow", text: "overflow: hidden on the parent" },
        { id: "bb", text: "box-sizing: border-box" },
        { id: "less", text: "width: 90%" },
      ],
      answerId: "bb",
      why: "Then the padding is part of the 100%. Hiding the overflow would only cut it off.",
      difficulty: 1,
    },
  ],

  summary: [
    "Content, padding, border, margin: from the inside out",
    "border-box makes width mean the visible box",
    "Vertical margins collapse: the larger one counts",
    "Inline elements ignore width and height",
  ],

  sources: [
    { label: "MDN: The box model", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Core/Styling_basics/Box_model" },
    { label: "MDN: Mastering margin collapsing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_box_model/Mastering_margin_collapsing" },
    { label: "MDN: box-sizing", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/box-sizing" },
  ],
};
