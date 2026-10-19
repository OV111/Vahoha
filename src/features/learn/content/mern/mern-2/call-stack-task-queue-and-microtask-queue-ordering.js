// Code fences use ~~~ so the markdown can live in template literals without
// escaping. Inline code still needs \` inside the template literals.
export default {
  minutes: 20,
  status: "draft",

  steps: [
    {
      kind: "read",
      title: "JavaScript runs on one thread",
      body: `JavaScript executes your code on a single thread with a single **call stack**. Calling a function pushes a frame onto the stack. Returning pops it.

Run the code on the right. The stack goes \`a\` → \`a, b\` → \`a\` → empty.

While anything is on the stack, nothing else in your program runs. This is **run-to-completion**: your code is never interrupted halfway by other JavaScript.`,
      code: {
        lang: "js",
        source: `function a() {
  b();
  console.log("a done");
}

function b() {
  console.log("in b");
}

a();`,
      },
    },
    {
      kind: "read",
      title: "Waiting happens outside the stack",
      body: `\`setTimeout\`, \`fetch\` and file reads don't wait on your thread. JavaScript hands the waiting to its host: the browser, or libuv in Node.js. When the wait is over, the host puts your callback in a **queue**.

A queued callback only runs once the call stack is empty. Run the code: "after" prints before the timer, even though the timer was set first.`,
      code: {
        lang: "js",
        source: `console.log("before");

setTimeout(() => {
  console.log("timer done");
}, 1000);

console.log("after");`,
      },
    },
    {
      kind: "read",
      title: "Two queues, not one",
      body: `| Queue | What waits in it |
| --- | --- |
| **Task queue** | \`setTimeout\` and \`setInterval\` callbacks, I/O callbacks, clicks |
| **Microtask queue** | Promise callbacks (\`.then\`, \`.catch\`, \`.finally\`), code after \`await\`, \`queueMicrotask\` |

Which queue a callback lands in decides when it runs. That is the whole lesson.`,
    },
    {
      kind: "check",
      type: "mcq",
      q: "A `.then` callback is ready to run. Where does it wait?",
      options: ["On the call stack", "In the task queue", "In the microtask queue"],
      answer: 2,
      why: "Promise callbacks are microtasks. Timers, I/O and events are tasks.",
    },
    {
      kind: "read",
      title: "The rule the event loop follows",
      body: `The **event loop** repeats one cycle:

1. Run one task until the call stack is empty. Your main script is the first task.
2. Run **every** microtask in the queue, including ones added while it drains.
3. In a browser, repaint if it is time to.
4. Take the next task. Repeat.

So a promise callback beats a timer that is already waiting. Predict the order, then run it.`,
      code: {
        lang: "js",
        source: `console.log("1: sync");

setTimeout(() => console.log("4: timeout (task)"), 0);

Promise.resolve().then(() => console.log("3: then (microtask)"));

console.log("2: sync");`,
      },
    },
    {
      kind: "check",
      type: "predict",
      q: "What does this print?",
      options: ["A, B, C", "C, B, A", "C, A, B", "B, C, A"],
      answer: 1,
      why: "C is synchronous, so it runs first. When the script ends, the loop drains the microtask queue (B), and only then takes the next task, the timer (A).",
      code: {
        lang: "js",
        source: `setTimeout(() => console.log("A"), 0);
queueMicrotask(() => console.log("B"));
console.log("C");`,
      },
    },
    {
      kind: "read",
      title: "await pauses the function, not the thread",
      body: `An \`async\` function runs synchronously up to its first \`await\`. The rest of the function is queued as a microtask, and the caller carries on.

Run it: this prints 1, 2, 3, 4. \`await\` gives control back to the caller. It never blocks the thread.`,
      code: {
        lang: "js",
        source: `async function load() {
  console.log("2: before await");
  await null;
  console.log("4: after await");
}

console.log("1: start");
load();
console.log("3: end");`,
      },
    },
    {
      kind: "check",
      type: "predict",
      q: "A microtask schedules a timer and another microtask. What prints?",
      options: ["1, 2, 3", "1, 3, 2", "3, 1, 2"],
      answer: 1,
      why: "A microtask queued while the queue drains runs in the same drain, so 3 follows 1 straight away. The timer is a task, so 2 waits until the microtask queue is empty.",
      code: {
        lang: "js",
        source: `Promise.resolve().then(() => {
  console.log("1");
  setTimeout(() => console.log("2"), 0);
  Promise.resolve().then(() => console.log("3"));
});`,
      },
    },
    {
      kind: "read",
      title: "Why this matters in real apps",
      body: `A long synchronous loop blocks **everything**. The timer below is due at 0 ms, but it has to wait for the loop to finish. Run it and look at the time.

- In a browser, clicks and rendering freeze for that long.
- In a Node.js server, no other request gets an answer.
- Heavy CPU work belongs in a Web Worker or \`worker_threads\`.

The same rule explains async code an AI writes for you. Knowing the queues, you can predict what it really does.`,
      code: {
        lang: "js",
        source: `const start = Date.now();

setTimeout(() => {
  console.log("timer ran after", Date.now() - start, "ms");
}, 0);

// Busy for 500 ms: the stack is never empty
while (Date.now() - start < 500) {}

console.log("loop done");`,
      },
    },
    {
      kind: "check",
      type: "mcq",
      q: "When does a `setTimeout(fn, 0)` callback run?",
      options: [
        "Right after the line that scheduled it",
        "After the current code finishes and every queued microtask has run",
        "Before any promise callbacks, because its delay is 0",
        "Exactly 0 ms later, on another thread",
      ],
      answer: 1,
      why: "The delay is a minimum, not a promise to run now. The callback waits in the task queue, and a task only starts once the stack is empty and the microtask queue is drained.",
    },
    {
      kind: "explain",
      prompt:
        "In your own words: why does a `setTimeout(fn, 0)` callback run after a promise `.then` callback that was scheduled later in the same code?",
      mustMention: [
        "Nothing queued runs until the call stack is empty",
        "Timer callbacks wait in the task queue",
        "Promise callbacks wait in the microtask queue",
        "All microtasks run before the next task",
      ],
      modelAnswer:
        "JavaScript runs one thing at a time on a single call stack, so neither callback can run until the current script finishes. When it does, the event loop first drains the whole microtask queue, where promise callbacks wait, and only then takes the next task from the task queue, where the timer callback waits. So the promise callback wins even though it was scheduled later.",
    },
  ],

  deeper: [
    {
      level: 2,
      title: "Microtasks can starve everything else",
      body: `Because the loop drains the microtask queue completely, a microtask that keeps queueing another microtask never lets a task run. Timers never fire, clicks are never handled, and a browser page never repaints.

~~~js
function forever() {
  queueMicrotask(forever);
}
forever(); // timers and clicks never get a turn
~~~

The same recursion with \`setTimeout\` keeps the page responsive, because each step is a new task and other tasks get a turn in between.`,
      sources: [
        {
          label: "MDN: Using microtasks in JavaScript",
          url: "https://developer.mozilla.org/en-US/docs/Web/API/HTML_DOM_API/Microtask_guide",
        },
      ],
    },
    {
      level: 3,
      title: "Under the hood: browsers and Node.js differ",
      body: `**Browsers** follow the event loop defined in the HTML standard: one task per turn, then a microtask checkpoint, then a chance to render (where \`requestAnimationFrame\` callbacks run before the paint).

**Node.js** runs libuv's loop in phases: timers → pending callbacks → poll (I/O) → check (\`setImmediate\`) → close callbacks. Microtasks are drained between callbacks. Node also has an extra queue: \`process.nextTick\` callbacks run before promise microtasks.

~~~js
// Node.js
setTimeout(() => console.log("timeout"), 0);
setImmediate(() => console.log("immediate"));
process.nextTick(() => console.log("nextTick"));
Promise.resolve().then(() => console.log("promise"));
// nextTick, promise, then timeout and immediate in either order
~~~

In the main module the order of \`setTimeout(fn, 0)\` and \`setImmediate\` is not guaranteed. Inside an I/O callback, \`setImmediate\` always runs first, because the check phase comes right after poll.`,
      sources: [
        {
          label: "HTML Standard: Event loops",
          url: "https://html.spec.whatwg.org/multipage/webappapis.html#event-loops",
        },
        {
          label: "Node.js: The event loop, timers and process.nextTick()",
          url: "https://nodejs.org/en/learn/asynchronous-work/event-loop-timers-and-nexttick",
        },
      ],
    },
    {
      level: 4,
      title: "Why JavaScript is single-threaded",
      body: `JavaScript was made in 1995 to script web pages. If two threads could change the DOM at the same time, every element would need locks, and every script author would have to reason about races. Run-to-completion removes that: a function never sees the page change under it halfway through.

The cost is the one you met in this lesson: one slow function blocks everything. The fix keeps the guarantee. Web Workers (browser) and \`worker_threads\` (Node.js) run on separate threads, each with its own event loop, and talk by **passing messages** that are copied, not by sharing variables. \`SharedArrayBuffer\` with \`Atomics\` is the opt-in exception when you really need shared memory.

Other languages chose differently. Java gives you threads and locks, Go gives you goroutines and channels. The tradeoff is simplicity against using every CPU core from one program.`,
      sources: [
        { label: "MDN: Web Workers API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API" },
        { label: "Node.js: worker_threads", url: "https://nodejs.org/api/worker_threads.html" },
        {
          label: "MDN: Atomics",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Atomics",
        },
      ],
    },
  ],
};
