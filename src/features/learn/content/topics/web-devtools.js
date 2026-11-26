// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "web-devtools",
  title: "Browser DevTools",
  mystery: "The CSS is there, but it has no effect. How do you find out why in 10 seconds?",
  minutes: 25,
  lang: "html",
  requires: ["web-box-model", "web-dom"],

  shortAnswer:
    "DevTools show what the browser really does: the DOM as it is now, which CSS rule wins, what the code printed, and what went over the network. Instead of guessing, you look.",

  ideas: [
    { id: "elements", text: "Elements shows the live DOM and which CSS rules apply, win or lose" },
    { id: "console", text: "The console shows errors with the file and line where they happened" },
    { id: "network", text: "Network shows every request with its status, body and time" },
    { id: "breakpoints", text: "A breakpoint stops the code so you can look at the values at that moment" },
    { id: "method", text: "Debugging is: reproduce, form a guess, test it, change one thing" },
  ],

  misconceptions: [
    {
      id: "edits-saved",
      belief: "changes in the Elements panel are saved",
      correction: "They change only the page in your browser. After a reload they are gone.",
    },
    {
      id: "important-first",
      belief: "if a rule has no effect, you add !important",
      correction: "First look in Styles which rule wins, and why. Usually the selector is more specific.",
    },
    {
      id: "change-many",
      belief: "changing several things at once finds a bug faster",
      correction: "Then you don't know what helped. Change one thing at a time.",
    },
  ],

  sections: [
    {
      id: "elements",
      title: "Elements: HTML and CSS",
      simpler:
        "It's like an X-ray of the page. You point at something and see which rules are fighting over it, and who wins.",
      blocks: [
        {
          id: "elements-1",
          type: "text",
          body: `Open DevTools with F12, or right-click something and choose **Inspect**. The **Elements** panel (Inspector in Firefox) shows the DOM as it is **now**, including what scripts have changed.

Next to it, **Styles** lists all the CSS rules for the chosen element. A **crossed-out** line has lost against another rule. The strongest rule is on top. Three things decide who wins, in this order: importance and layers, then **specificity** (an id beats a class, a class beats an element), then **order**, where the later rule wins.

**Computed** shows the final values and the box model as a drawing. There you see at once whether a gap is padding or margin.

You can change everything right there: tick rules off, try values. These changes are **not saved**. When you've found the right value, write it into your code.`,
        },
        { id: "elements-pic", type: "picture", diagram: "devtools-panels", alt: "Elements, Console, Network and Sources answer different questions" },
        {
          id: "elements-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Why is the text not green? Inspect it in the preview",
          source: `<style>
  #main p { color: crimson; }
  .note { color: green; }
</style>

<div id="main">
  <p class="note">I should be green.</p>
</div>`,
        },
        {
          id: "elements-case",
          type: "realCase",
          title: "One hour and five !important",
          situation: "A button should be blue but stays grey. The developer adds !important, then another one in a second place.",
          problem: "The button is blue now, but nobody can change its colour on hover any more.",
          cause: "In Styles, the blue rule was crossed out from the start. A selector with an id was stronger.",
          fix: "The selector with the id became a class. Both rules are now equally strong, and the later one wins.",
        },
        {
          id: "q-elements",
          type: "question",
          ideaId: "elements",
          kind: "choice",
          prompt: "In the example above, why does `#main p` beat `.note`?",
          options: [
            { id: "order", text: "Because it comes first" },
            { id: "specific", text: "Because a selector with an id is more specific than one with a class" },
            { id: "important", text: "Because p is more important", misconceptionId: "important-first" },
          ],
          answerId: "specific",
          why: "Specificity is compared before order. An id outweighs any number of classes.",
          difficulty: 1,
        },
        {
          id: "q-saved",
          type: "question",
          ideaId: "elements",
          kind: "choice",
          prompt: "You fix a colour in the Styles panel and reload. What do you see?",
          options: [
            { id: "fixed", text: "The fixed colour", misconceptionId: "edits-saved" },
            { id: "old", text: "The old colour" },
          ],
          answerId: "old",
          why: "The change was only in your browser's memory.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "console",
      title: "Console: errors and questions",
      simpler:
        "The console is where the browser complains, and where you can ask it something. Read the first complaint first. The rest often follow from it.",
      blocks: [
        {
          id: "console-1",
          type: "text",
          body: `The **Console** shows errors, warnings and everything you print. An error has three parts: the **kind** (TypeError), the **message** (*Cannot read properties of null*), and the **place** (app.js:42). Click on the place to get to the line. Below it, the **stack** shows who called whom.

Read the **first** error. Later ones are often only its consequences.

You can also type code there and try things out: \`document.querySelector(".card")\`, or \`$0\` for the element chosen in Elements.

When printing, some things are better than plain log: \`console.table(list)\` for lists, \`console.error\` for errors. And print **with a name**: \`console.log({ user })\` shows what it is.

One trap: the console shows objects **live**. When you open one, you may see its state from now and not from when it was printed. Print a copy with \`structuredClone(obj)\` if it matters.`,
        },
        {
          id: "q-console",
          type: "question",
          ideaId: "console",
          kind: "choice",
          prompt: "The console shows 12 red errors. Where do you start?",
          options: [
            { id: "last", text: "With the last one, it is the newest" },
            { id: "first", text: "With the first one, the others may follow from it" },
            { id: "all", text: "Fix all of them at the same time", misconceptionId: "change-many" },
          ],
          answerId: "first",
          why: "If a file fails at the start, everything that needs it fails too.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "network",
      title: "Network: what was really sent",
      simpler:
        "Two people argue about what was said on the phone. The Network panel is the recording.",
      blocks: [
        {
          id: "network-1",
          type: "text",
          body: `If data is missing or wrong, the question is: **whose fault is it?** The **Network** panel answers it in seconds. It lists every request. Choose **Fetch/XHR** to see only the requests of your code.

For each one, look at

- the **status**: 200, 404, 500;
- **Payload**: what you sent;
- **Response**: what came back;
- **Headers**: address, method, content type;
- **Timing**: how long it took, and where.

Is the request right and the answer wrong? Then look at the server. Is the request wrong, or missing altogether? Then look at your code. Is the answer right and the screen wrong? Then the bug is in displaying it.

Two helpful switches: **Disable cache** while DevTools are open, and **throttling**, which lets you feel a slow connection. Many loading states are seen for the first time that way.

Be careful when sharing: requests contain tokens and cookies. Remove them from screenshots and exported files.`,
        },
        {
          id: "network-case",
          type: "realCase",
          title: "\"The API is broken\"",
          situation: "A list stays empty. The frontend team says the API is broken, the backend team says it works.",
          problem: "Two days of messages back and forth.",
          cause: "The Network panel showed it at once: the request had `?page=undefined`, and the server answered correctly with an empty list.",
          fix: "The page number got a default value. Since then, every bug report has the address, the status and the answer in it.",
        },
        {
          id: "q-network",
          type: "question",
          ideaId: "network",
          kind: "choice",
          prompt: "The response in Network contains the right names, but the page shows \"undefined\". Where is the bug?",
          options: [
            { id: "server", text: "On the server" },
            { id: "display", text: "In the code that uses the response" },
            { id: "network", text: "In the connection" },
          ],
          answerId: "display",
          why: "The right data arrived. Probably a property name is wrong.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "breakpoints",
      title: "Breakpoints: stop the time",
      simpler:
        "Instead of reading a diary of what happened, you stop the film and walk around in the scene.",
      blocks: [
        {
          id: "breakpoints-1",
          type: "text",
          body: `\`console.log\` shows what you thought of printing. A **breakpoint** stops the code on a line, and you can look at **everything**: all variables, the call stack, the scope.

Open **Sources** (Debugger in Firefox), find the file and click on a line number. Or write \`debugger;\` in your code, which stops there as long as DevTools are open. Then use the buttons: **step over** runs one line, **step into** goes into a function, **resume** runs on.

Right-click a line number for a **conditional** breakpoint: stop only if \`user.id === 7\`. You can also stop **on any exception**, which takes you straight to the place of an error.

To watch the order in which things happen, or anything that depends on timing, log is often better, because stopping changes the timing.`,
        },
        {
          id: "breakpoints-code",
          type: "code",
          lang: "html",
          runnable: true,
          caption: "Open DevTools, then click: the code stops at debugger",
          source: `<button>Calculate</button>
<p id="out"></p>

<script>
  document.querySelector("button").addEventListener("click", () => {
    const prices = ["10", "20"];
    let total = 0;
    for (const price of prices) {
      debugger; // look at total and price here
      total = total + price;
    }
    document.querySelector("#out").textContent = "Total: " + total;
  });
</script>`,
        },
        {
          id: "q-breakpoints",
          type: "question",
          ideaId: "breakpoints",
          kind: "choice",
          prompt: "A loop runs 10,000 times, and only the user with id 7 is wrong. What helps most?",
          options: [
            { id: "log", text: "console.log in every turn" },
            { id: "cond", text: "A conditional breakpoint: user.id === 7" },
            { id: "step", text: "Stepping through the whole loop" },
          ],
          answerId: "cond",
          why: "The code stops only where it matters, and you see all the values there.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "method",
      title: "How to debug",
      simpler:
        "A good doctor doesn't prescribe ten pills at once. One idea, one test, one change. Then look again.",
      blocks: [
        {
          id: "method-1",
          type: "text",
          body: `Tools don't find bugs. A method does.

1. **Reproduce** it. Which steps make it happen, every time?
2. **Narrow it down.** Is it HTML, CSS, JavaScript, the network or the data? Halve the search each time.
3. **Guess, and say it aloud**: "I think the list is empty because the page number is undefined."
4. **Test the guess** with the right panel. If it's wrong, good: one possibility less.
5. **Change one thing** and check again. Undo what didn't help.
6. **Understand why.** If you don't know why it works now, it isn't fixed.

This is also how you check code written by an AI. It will explain convincingly why something works. The panels show whether it's true.`,
        },
        {
          id: "q-method",
          type: "question",
          ideaId: "method",
          kind: "choice",
          prompt: "You changed five things, and the bug is gone. What is the problem?",
          options: [
            { id: "none", text: "None, it works", misconceptionId: "change-many" },
            { id: "unknown", text: "You don't know which change helped, and whether the others do harm" },
            { id: "slow", text: "Five changes make the page slow" },
          ],
          answerId: "unknown",
          why: "Undo them one by one until you know. Only then do you understand the cause.",
          difficulty: 1,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["Elements for layout and CSS", "Network for anything with data", "Breakpoints when you don't know what to print"],
    avoid: ["!important before looking at Styles", "Guessing whose fault it is", "Changing several things at once"],
  },

  explain: {
    prompt: "A list on your page stays empty. Describe step by step how you find out where the bug is, and which panels you use.",
    modelAnswer:
      "First I reproduce it. Then I look into the console for the first error and the line it points to. In Network I check the request: its address, status and response. If the request is wrong, the bug is in my code, and if the answer is wrong, on the server. If the answer is right, I look in Elements whether the list is in the DOM and perhaps hidden by CSS, where Styles shows which rule wins. If I still don't know, I set a breakpoint where the list is drawn and look at the values. I change one thing at a time.",
  },

  reviewQuestions: [
    {
      id: "r-crossed",
      ideaId: "elements",
      kind: "choice",
      prompt: "A rule is crossed out in Styles. What does it mean?",
      options: [
        { id: "lost", text: "Another rule won, or the value is not valid" },
        { id: "deleted", text: "It was deleted from the file" },
        { id: "slow", text: "It loads too slowly" },
      ],
      answerId: "lost",
      why: "It applies to the element but has lost against a stronger rule, or the browser can't use it.",
      difficulty: 1,
    },
    {
      id: "r-slow",
      ideaId: "network",
      kind: "choice",
      prompt: "How do you see your loading state on a fast connection?",
      options: [
        { id: "throttle", text: "With throttling in the Network panel" },
        { id: "reload", text: "By reloading quickly" },
        { id: "console", text: "With console.table" },
      ],
      answerId: "throttle",
      why: "It slows the connection down on purpose.",
      difficulty: 1,
    },
    {
      id: "r-null",
      ideaId: "console",
      kind: "choice",
      prompt: "*Cannot read properties of null (reading 'textContent')*. What do you check first?",
      options: [
        { id: "css", text: "The CSS of the element" },
        { id: "found", text: "Whether the element was found" },
        { id: "net", text: "The status of the last request" },
      ],
      answerId: "found",
      why: "Something is null where you expected an element. Often the selector is wrong, or the script ran too early.",
      difficulty: 1,
    },
  ],

  summary: [
    "Elements: the live DOM and which CSS wins",
    "Console: read the first error and its line",
    "Network: whose fault is it?",
    "Breakpoints: look at everything at one moment",
    "One guess, one test, one change",
  ],

  sources: [
    { label: "Chrome DevTools", url: "https://developer.chrome.com/docs/devtools" },
    { label: "MDN: What are browser developer tools?", url: "https://developer.mozilla.org/en-US/docs/Learn_web_development/Howto/Tools_and_setup/What_are_browser_developer_tools" },
    { label: "MDN: Specificity", url: "https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_cascade/Specificity" },
  ],
};
