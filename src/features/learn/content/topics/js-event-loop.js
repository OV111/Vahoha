// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "js-event-loop",
  title: "Call stack and queues",
  mystery: "A 0 ms timer runs last. Why?",
  minutes: 35,
  lang: "js",
  requires: [],

  shortAnswer:
    "JavaScript runs one piece of code at a time on the call stack. Code that has to wait goes into a queue and runs only when the stack is empty: first all microtasks (promises), then one task (timers, clicks), and so on.",

  ideas: [
    { id: "one-stack", text: "JavaScript runs one thing at a time, and it finishes before anything else starts" },
    { id: "host-waits", text: "Waiting happens outside JavaScript; the callback waits in a queue until the stack is empty" },
    { id: "microtasks-first", text: "All microtasks run before the next task" },
    { id: "await-pauses", text: "await pauses only its own function, and the rest of it runs as a microtask" },
    { id: "blocking", text: "Long synchronous code blocks timers, clicks and drawing" },
  ],

  misconceptions: [
    {
      id: "zero-is-now",
      belief: "setTimeout with 0 ms runs the callback immediately",
      correction: "0 ms is only the shortest wait before the callback may enter the queue. It still waits for the current code and all microtasks.",
    },
    {
      id: "one-queue",
      belief: "all waiting callbacks share one queue and run in the order they were added",
      correction: "There are two kinds of queue. Promise callbacks are microtasks, and all of them run before the next timer or click.",
    },
    {
      id: "await-blocks",
      belief: "await stops the whole program until the result arrives",
      correction: "It pauses only the async function it is in. The code that called that function carries on straight away.",
    },
    {
      id: "async-is-parallel",
      belief: "asynchronous code runs at the same time as your other code",
      correction: "The waiting happens elsewhere, but your callbacks run on the same single stack, one after another.",
    },
  ],

  sections: [
    {
      id: "stack",
      title: "One call stack",
      simpler:
        "Imagine one cook in a kitchen. The cook does one dish at a time. If a dish needs a sauce, the cook stops, makes the sauce, then goes back to the dish. Nobody else can cook in between.",
      blocks: [
        {
          id: "stack-1",
          type: "text",
          body: `Your JavaScript runs on a single thread. That means there is **one** place where code is running at any moment. To keep track of where it is, JavaScript uses the **call stack**.

Calling a function puts a new entry on top of the stack. When the function returns, its entry is removed, and JavaScript continues with the one below. If \`a\` calls \`b\`, then \`b\` is on top of \`a\`, and \`a\` has to wait until \`b\` is done.

This leads to an important rule called **run to completion**: once a piece of code has started, no other JavaScript of yours can interrupt it halfway. You never have to worry that another function changes your variables between two lines of ordinary code.`,
        },
        { id: "stack-pic", type: "picture", diagram: "call-stack", alt: "a is on the stack, then b on top of it, then a again, then empty" },
        {
          id: "stack-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `function a() {
  console.log("a starts");
  b();
  console.log("a ends");
}

function b() {
  console.log("b");
}

a();
console.log("done");`,
          output: ["a starts", "b", "a ends", "done"],
        },
        {
          id: "q-stack",
          type: "question",
          ideaId: "one-stack",
          kind: "choice",
          prompt: "While `b` is running inside `a`, what is on the call stack above the main script?",
          options: [
            { id: "only-b", text: "Only b" },
            { id: "a-then-b", text: "a, with b on top of it" },
            { id: "b-then-a", text: "b, with a on top of it" },
            { id: "both-run", text: "Both, running at the same time", misconceptionId: "async-is-parallel" },
          ],
          answerId: "a-then-b",
          why: "a hasn't finished: it is waiting for b to return. So a stays on the stack, and b sits on top of it until it is done.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "waiting",
      title: "Who does the waiting",
      simpler:
        "The cook doesn't stand in front of the oven. The cook sets a timer and goes on working. When the timer rings, the dish waits on the counter until the cook has finished what they are doing.",
      blocks: [
        {
          id: "waiting-1",
          type: "text",
          body: `If JavaScript did the waiting itself, everything would stop. A page that loads data for two seconds would be frozen for two seconds: no clicks, no scrolling by script, nothing.

So JavaScript gives the waiting away to its **host**: the browser, or Node.js on a server. \`setTimeout\` and \`fetch\` hand over the job and return immediately. Your code goes on with the next line.

When the wait is over, the host doesn't push your callback into the middle of running code. That would break run to completion. Instead, the callback goes into a **queue**. It runs when the call stack is **empty**.`,
        },
        { id: "waiting-pic", type: "picture", diagram: "waiting", alt: "The host waits, the callback goes to a queue, and returns to the stack when it is empty" },
        {
          id: "waiting-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `console.log("before");

setTimeout(() => {
  console.log("timer");
}, 0);

console.log("after");`,
          output: ["before", "after", "timer"],
        },
        {
          id: "waiting-2",
          type: "text",
          body: `The timer has a delay of 0 ms, and still it prints last. The number is a **minimum**: "don't run this before 0 ms have passed". It is not a promise to run at that moment. When the delay is over, the callback only gets a place in the queue, and the main script has to finish first.`,
        },
        {
          id: "q-zero",
          type: "question",
          ideaId: "host-waits",
          kind: "predict",
          prompt: "What does this print?",
          code: `setTimeout(() => console.log("A"), 0);

for (let i = 0; i < 3; i++) {
  console.log(i);
}`,
          options: [
            { id: "a-first", text: "A, 0, 1, 2", misconceptionId: "zero-is-now" },
            { id: "a-middle", text: "0, A, 1, 2", misconceptionId: "async-is-parallel" },
            { id: "a-last", text: "0, 1, 2, A" },
          ],
          answerId: "a-last",
          why: "The whole loop is part of the main script, which has to finish before any queued callback can run.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "queues",
      title: "Two queues",
      simpler:
        "There are two lines of people. The fast line is for promises. The normal line is for timers and clicks. The fast line is always emptied completely before one person from the normal line is served.",
      blocks: [
        {
          id: "queues-1",
          type: "text",
          body: `There isn't just one kind of queue, and this is where most surprises come from.

- **Tasks** are callbacks from \`setTimeout\`, \`setInterval\`, clicks and other events. Running your main script is a task too.
- **Microtasks** are promise callbacks (\`.then\`, \`.catch\`, \`.finally\`), the code after an \`await\`, and callbacks given to \`queueMicrotask\`.

The **event loop** is the part that decides what runs next. It repeats the same cycle:

1. Run **one** task until the stack is empty.
2. Run **all** microtasks, including new ones that are added meanwhile.
3. In a browser, draw the page if it is time to.
4. Start again with the next task.

So microtasks have priority. However early a timer was set, promise callbacks that are ready run before it.`,
        },
        { id: "queues-pic", type: "picture", diagram: "event-loop", alt: "One task, then all microtasks, then repaint, then repeat" },
        {
          id: "queues-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `console.log("1 script");

setTimeout(() => console.log("4 timer"), 0);

Promise.resolve().then(() => console.log("3 promise"));

console.log("2 script");`,
          output: ["1 script", "2 script", "3 promise", "4 timer"],
        },
        {
          id: "q-order",
          type: "question",
          ideaId: "microtasks-first",
          kind: "predict",
          prompt: "What does this print?",
          code: `setTimeout(() => console.log("A"), 0);
queueMicrotask(() => console.log("B"));
console.log("C");`,
          options: [
            { id: "cba", text: "C, B, A" },
            { id: "abc", text: "A, B, C", misconceptionId: "zero-is-now" },
            { id: "cab", text: "C, A, B", misconceptionId: "one-queue" },
            { id: "bca", text: "B, C, A" },
          ],
          answerId: "cba",
          why: "C is ordinary code, so it runs first. When the script ends, all microtasks run (B). Only then comes the next task, the timer (A).",
          difficulty: 2,
        },
        {
          id: "queues-2",
          type: "text",
          body: `The word **all** matters. If a microtask adds another microtask, that one also runs in the same round, before any timer. In the code below, "3" is added later than the timer, and still comes first.`,
        },
        {
          id: "queues-nested",
          type: "code",
          lang: "js",
          runnable: true,
          source: `Promise.resolve().then(() => {
  console.log("1");
  setTimeout(() => console.log("2"), 0);
  Promise.resolve().then(() => console.log("3"));
});`,
          output: ["1", "3", "2"],
        },
        {
          id: "q-nested",
          type: "question",
          ideaId: "microtasks-first",
          kind: "choice",
          prompt: "A microtask keeps adding a new microtask, forever. What happens to a click on the page?",
          options: [
            { id: "between", text: "It is handled between two microtasks", misconceptionId: "one-queue" },
            { id: "never", text: "It is never handled, because the microtask queue never gets empty" },
            { id: "parallel", text: "It is handled at the same time, on another thread", misconceptionId: "async-is-parallel" },
            { id: "error", text: "JavaScript throws a stack overflow error" },
          ],
          answerId: "never",
          why: "A click handler is a task, and the next task starts only when there are no microtasks left. The stack itself doesn't grow, so there is no overflow error either. The page just hangs.",
          difficulty: 3,
        },
      ],
    },
    {
      id: "await",
      title: "What await really does",
      simpler:
        "await is like putting a bookmark in one book. You close that book and go on with other things. When the answer is there, and you are free, you open the book at the bookmark and continue.",
      blocks: [
        {
          id: "await-1",
          type: "text",
          body: `\`await\` looks as if the program stops and waits. It doesn't. It pauses **one function**.

An \`async\` function starts like any other function: everything up to its first \`await\` runs right away. At \`await\`, the function steps off the stack and gives control back to its caller, which goes on with its next line. When the awaited value is ready, the rest of the function is put in the **microtask** queue.

That is why the caller's "3" below is printed before the function's "4", even though there is nothing to wait for.`,
        },
        { id: "await-pic", type: "picture", diagram: "await-pause", alt: "load starts, the caller goes on, load finishes as a microtask" },
        {
          id: "await-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `async function load() {
  console.log("2 before await");
  await null;
  console.log("4 after await");
}

console.log("1 start");
load();
console.log("3 end");`,
          output: ["1 start", "2 before await", "3 end", "4 after await"],
        },
        {
          id: "await-case",
          type: "realCase",
          title: "\"Saved\" was shown before anything was saved",
          situation: "An editor shows a green \"Saved\" message when the user clicks the save button.",
          problem: "Sometimes saving failed, but the users still saw \"Saved\" and closed the tab. Their text was lost.",
          cause: "The click handler called `save()` without `await`. At its first `await`, `save` gave control back, and the handler showed the message while the request was still on its way.",
          fix: "Make the handler async, write `await save()`, and show the message after it. A `try/catch` around it shows an error when saving fails.",
          code: `async function onClick() {
  try {
    await save();
    showMessage("Saved");
  } catch {
    showMessage("Could not save. Try again.");
  }
}`,
        },
        {
          id: "q-await",
          type: "question",
          ideaId: "await-pauses",
          kind: "find-bug",
          prompt: "AI wrote this to save a draft and then tell the user. What does it print?",
          code: `async function save() {
  await null; // writing to disk
  console.log("on disk");
}

function onClick() {
  save();
  console.log("Saved!");
}

onClick();`,
          options: [
            { id: "disk-first", text: "on disk, Saved!", misconceptionId: "await-blocks" },
            { id: "saved-only", text: "Only Saved!" },
            { id: "saved-first", text: "Saved!, on disk" },
          ],
          answerId: "saved-first",
          why: "save pauses at its await and onClick goes on, so the message comes first. onClick has to be async and await save().",
          difficulty: 2,
        },
      ],
    },
    {
      id: "blocking",
      title: "Blocking the stack",
      simpler:
        "If the cook spends ten minutes cutting one huge vegetable, every guest waits, even those who only want water. Long work has to be cut into small pieces, or given to a second cook.",
      blocks: [
        {
          id: "blocking-1",
          type: "text",
          body: `Run to completion has a price. As long as your code is on the stack, **nothing** else happens: no timers, no click handlers, no promise callbacks, no drawing. One slow function stops everything.

In a browser the page feels frozen. On a Node.js server it is worse: one slow request makes **every** user wait, because all requests share the same stack.

Note the difference. Waiting for a database for two seconds is fine, because the host does the waiting. Calculating for two seconds is not, because your stack does the work.`,
        },
        { id: "blocking-pic", type: "picture", diagram: "blocked", alt: "A 500 ms loop delays a timer that was due at 0 ms" },
        {
          id: "blocking-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const start = Date.now();

setTimeout(() => {
  const waited = Date.now() - start;
  console.log("timer waited at least 300 ms:", waited >= 300);
}, 0);

// Busy for 300 ms: the stack is never empty
while (Date.now() - start < 300) {}

console.log("loop done");`,
          output: ["loop done", "timer waited at least 300 ms: true"],
        },
        {
          id: "blocking-case",
          type: "realCase",
          title: "One report stopped the whole server",
          situation: "A Node.js server creates a large report by going through two million rows in one loop. It takes eight seconds.",
          problem: "Whenever a manager opened the report, the whole site stopped answering, even the login page.",
          cause: "The loop kept the only call stack busy for eight seconds. Requests from other users were waiting in the queue.",
          fix: "The report moved to a worker thread, which has its own stack and event loop. The server stayed free to answer others. Doing the sum in the database would also have worked.",
        },
        {
          id: "q-blocking",
          type: "question",
          ideaId: "blocking",
          kind: "choice",
          prompt: "Which of these blocks a Node.js server for all its users?",
          options: [
            { id: "fetch", text: "await fetch() to an API that takes 5 seconds", misconceptionId: "await-blocks" },
            { id: "timer", text: "setTimeout(fn, 5000)" },
            { id: "loop", text: "A loop that calculates for 5 seconds" },
            { id: "query", text: "await a database query that takes 5 seconds", misconceptionId: "await-blocks" },
          ],
          answerId: "loop",
          why: "In the other three the host does the waiting and the stack is free. The loop keeps the stack busy, so nothing else can run.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Most mistakes come from expecting things to happen in the order they are written. Ask two questions: is this ordinary code, a microtask or a task? And is the stack empty yet?",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Using a result before it exists.** Code after an asynchronous call runs before the callback. If you need the result, the code has to be inside the callback or after an \`await\`.

**Using setTimeout(fn, 0) to "fix" the order.** It often hides a bug instead of fixing it: the code now depends on which queue runs first. Wait for the thing you really need, with a promise.

**Splitting heavy work with promises.** Promise callbacks are microtasks, so all the pieces still run in one go before the page can draw. To let the page breathe, split the work into tasks, for example with \`setTimeout\`, or use a Web Worker.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `let user;

fetch("/api/user")
  .then((res) => res.json())
  .then((data) => { user = data; });

console.log(user.name); // user is undefined`,
          right: `async function showUser() {
  const res = await fetch("/api/user");
  const user = await res.json();
  console.log(user.name);
}`,
          why: "On the left, the last line is part of the running script, so it runs before any promise callback can set user. On the right, the line comes after the awaits.",
        },
        {
          id: "q-early",
          type: "question",
          ideaId: "host-waits",
          kind: "predict",
          prompt: "What does this print?",
          code: `let result = "empty";

Promise.resolve("loaded").then((value) => {
  result = value;
});

console.log(result);`,
          options: [
            { id: "loaded", text: "loaded", misconceptionId: "async-is-parallel" },
            { id: "empty", text: "empty" },
            { id: "undef", text: "undefined" },
          ],
          answerId: "empty",
          why: "The promise is already resolved, but its callback is a microtask. It has to wait until the current script is finished, and console.log is part of that script.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "Predicting the order in which code runs",
      "Finding out why a page or server freezes",
      "Deciding whether work needs a worker",
    ],
    avoid: [
      "Relying on the exact order of two unrelated timers",
      "setTimeout(fn, 0) as a fix for something you don't understand",
      "Endless chains of microtasks",
    ],
  },

  explain: {
    prompt: "Why does a `setTimeout(fn, 0)` callback run after a promise `.then` callback, even if the timer was set first? And what would stop both of them from running?",
    modelAnswer:
      "JavaScript runs one thing at a time on a single call stack, so neither callback can run until the current script has finished. The timer's waiting is done by the host, and its callback goes into the task queue. The promise callback goes into the microtask queue. When the stack is empty, all microtasks run before the next task, so the promise wins. Long synchronous code would hold up both, because the stack never gets empty. An await wouldn't: it pauses only its own function.",
  },

  reviewQuestions: [
    {
      id: "r-order",
      ideaId: "microtasks-first",
      kind: "predict",
      prompt: "What does this print?",
      code: `Promise.resolve().then(() => console.log("X"));
setTimeout(() => console.log("Y"), 0);
console.log("Z");
Promise.resolve().then(() => console.log("W"));`,
      options: [
        { id: "zxyw", text: "Z, X, Y, W", misconceptionId: "one-queue" },
        { id: "zxwy", text: "Z, X, W, Y" },
        { id: "xyzw", text: "X, Y, Z, W" },
      ],
      answerId: "zxwy",
      why: "Z is ordinary code. Then both microtasks run in their order (X, W), and the timer (Y) comes last.",
      difficulty: 2,
    },
    {
      id: "r-await",
      ideaId: "await-pauses",
      kind: "predict",
      prompt: "What does this print?",
      code: `async function job() {
  console.log("a");
  await null;
  console.log("b");
}

job();
console.log("c");`,
      options: [
        { id: "abc", text: "a, b, c", misconceptionId: "await-blocks" },
        { id: "cab", text: "c, a, b" },
        { id: "acb", text: "a, c, b" },
      ],
      answerId: "acb",
      why: "job runs up to its await right away (a). Then the caller goes on (c), and the rest of job runs as a microtask (b).",
      difficulty: 2,
    },
    {
      id: "r-delay",
      ideaId: "blocking",
      kind: "choice",
      prompt: "A timer is set to 100 ms, then a loop calculates for 400 ms. When does the timer's callback run?",
      options: [
        { id: "at-100", text: "At 100 ms, between two turns of the loop", misconceptionId: "async-is-parallel" },
        { id: "after-400", text: "After about 400 ms, when the loop is done" },
        { id: "at-500", text: "At 500 ms, because the delays are added" },
      ],
      answerId: "after-400",
      why: "The delay passes while the loop is running, and the callback waits in the queue. It runs as soon as the stack is empty.",
      difficulty: 2,
    },
  ],

  summary: [
    "One call stack: JavaScript runs one thing at a time and finishes it",
    "The host does the waiting; callbacks come back through a queue",
    "One task, then all microtasks, then the next task",
    "await pauses one function, not the program",
    "Long calculations block everything; waiting doesn't",
  ],

  sources: [
    { label: "MDN: JavaScript execution model", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Execution_model" },
    { label: "MDN: Using microtasks", url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide" },
    { label: "HTML Standard: Event loops", url: "https://html.spec.whatwg.org/multipage/webappapis.html#event-loops" },
    { label: "Node.js: Don't block the event loop", url: "https://nodejs.org/en/learn/asynchronous-work/dont-block-the-event-loop" },
  ],
};
