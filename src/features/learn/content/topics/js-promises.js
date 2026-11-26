// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "js-promises",
  title: "Promises and async/await",
  mystery: "The error was caught. Why did the app go on as if all was fine?",
  minutes: 35,
  lang: "js",
  requires: ["js-event-loop"],

  shortAnswer:
    "A promise stands for a value that isn't there yet. It ends once: fulfilled with a value or rejected with an error. async/await is another way to write the same thing, so that asynchronous code reads from top to bottom.",

  ideas: [
    { id: "three-states", text: "A promise is pending, then settles once, as fulfilled or rejected" },
    { id: "then-returns", text: "then returns a new promise, settled by what its callback returns or throws" },
    { id: "async-promise", text: "An async function always returns a promise" },
    { id: "errors-travel", text: "An error skips to the next catch, and a catch that returns normally ends the error" },
    { id: "await-order", text: "Awaiting one after another makes independent work slow" },
  ],

  misconceptions: [
    {
      id: "async-gives-value",
      belief: "calling an async function gives you its value",
      correction: "It gives you a promise for the value. You get the value with await or in a then callback.",
    },
    {
      id: "catch-rethrows",
      belief: "after a catch, the code below is still skipped",
      correction: "A catch that returns normally has handled the error. The chain goes on as fulfilled, with what the catch returned.",
    },
    {
      id: "then-waits-anyway",
      belief: "then waits for a promise created inside its callback, even if it isn't returned",
      correction: "then can only wait for what the callback returns. A promise that isn't returned runs on its own, and its errors are lost.",
    },
    {
      id: "try-without-await",
      belief: "try/catch catches the errors of every promise inside it",
      correction: "It catches a rejection only if you await the promise inside the try block.",
    },
  ],

  sections: [
    {
      id: "what",
      title: "What a promise is",
      simpler:
        "You order food and get a number on a receipt. The receipt isn't the food. Later it becomes one of two things: your food, or the message that it's sold out. It never changes after that.",
      blocks: [
        {
          id: "what-1",
          type: "text",
          body: `Some work takes time: loading data, reading a file, waiting for a user. JavaScript doesn't stop for it. But the code that started the work needs something to hold on to. That something is a **promise**: an object that stands for a result that will come later.

A promise is always in one of three states.

- **Pending**: the result isn't there yet.
- **Fulfilled**: it worked, and the promise has a value.
- **Rejected**: it failed, and the promise has a reason, normally an \`Error\`.

It leaves pending only **once**. A fulfilled or rejected promise is called **settled**, and it never changes again. You can attach a callback before or after that moment. Both work: if the promise is already settled, the callback is still called, as a microtask.

You don't make promises by hand very often. Functions such as \`fetch\` give them to you. When you do need one, \`new Promise\` hands you two functions, \`resolve\` and \`reject\`.`,
        },
        { id: "what-pic", type: "picture", diagram: "promise-states", alt: "Pending becomes fulfilled or rejected, once" },
        {
          id: "what-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const wait = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const promise = wait(50, "ready");

promise.then((value) => console.log("then:", value));
console.log("the script goes on");`,
          output: ["the script goes on", "then: ready"],
        },
        {
          id: "q-once",
          type: "question",
          ideaId: "three-states",
          kind: "predict",
          prompt: "What does this print?",
          code: `const p = new Promise((resolve, reject) => {
  resolve("first");
  reject(new Error("second"));
  resolve("third");
});

p.then((v) => console.log(v)).catch(() => console.log("failed"));`,
          options: [
            { id: "third", text: "third" },
            { id: "failed", text: "failed" },
            { id: "first", text: "first" },
            { id: "both", text: "first, then failed" },
          ],
          answerId: "first",
          why: "A promise settles once. After resolve(\"first\"), the other two calls are ignored.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "chain",
      title: "Chaining with then",
      simpler:
        "A chain is an assembly line. Each station gets what the last one gave it. If a station forgets to pass its work on, the next one gets nothing.",
      blocks: [
        {
          id: "chain-1",
          type: "text",
          body: `\`then\` doesn't change the promise you call it on. It returns a **new** promise. What becomes of that new promise depends on the callback:

- The callback **returns a value**: the new promise is fulfilled with it.
- The callback **returns a promise**: the new promise waits for it and takes over its result.
- The callback **throws**: the new promise is rejected with that error.

That is why you can write one step under the other. Each step gets the result of the step before.

The most common mistake is to **forget the return**. Then the callback returns \`undefined\`, and the next step gets \`undefined\` right away, without waiting. The inner work still happens, but nobody is waiting for it, and if it fails, your catch never hears of it.`,
        },
        {
          id: "chain-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const wait = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

wait(20, 2)
  .then((n) => n * 10)
  .then((n) => wait(20, n + 1))
  .then((n) => console.log("with return:", n));

wait(60, 2)
  .then((n) => { wait(20, n); })
  .then((n) => console.log("no return:", n));`,
          output: ["with return: 21", "no return: undefined"],
        },
        {
          id: "q-return",
          type: "question",
          ideaId: "then-returns",
          kind: "predict",
          prompt: "What does this print?",
          code: `Promise.resolve(1)
  .then((n) => n + 1)
  .then((n) => { n + 1; })
  .then((n) => console.log(n));`,
          options: [
            { id: "three", text: "3", misconceptionId: "then-waits-anyway" },
            { id: "two", text: "2" },
            { id: "undef", text: "undefined" },
          ],
          answerId: "undef",
          why: "The second callback has braces and no return, so it returns undefined, and that is what the last step gets.",
          difficulty: 1,
        },
        {
          id: "q-catch",
          type: "question",
          ideaId: "errors-travel",
          kind: "predict",
          prompt: "What does this print?",
          code: `Promise.reject(new Error("no"))
  .then(() => console.log("A"))
  .catch(() => "fixed")
  .then((v) => console.log("B", v));`,
          options: [
            { id: "nothing", text: "Nothing", misconceptionId: "catch-rethrows" },
            { id: "b-fixed", text: "B fixed" },
            { id: "a-b", text: "A, then B fixed" },
            { id: "b-undef", text: "B undefined" },
          ],
          answerId: "b-fixed",
          why: "The rejection skips the first then. catch handles it and returns \"fixed\", so the chain goes on as fulfilled.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "async",
      title: "async and await",
      simpler:
        "async/await doesn't do anything new. It's the same chain, written like ordinary lines. Where you see await, imagine: the rest of this function is the next then.",
      blocks: [
        {
          id: "async-1",
          type: "text",
          body: `Chains get hard to read when steps need each other's values, or when there are conditions and loops. \`async\` and \`await\` let you write the same thing as ordinary code.

Two rules explain almost everything.

**An \`async\` function always returns a promise.** If you \`return 5\`, the caller gets a promise fulfilled with 5. If you \`throw\`, the caller gets a rejected promise. You can't get the value out without waiting.

**\`await\` pauses this function until the promise is settled.** If it is fulfilled, \`await\` gives you the value. If it is rejected, \`await\` **throws** the reason at that place. The rest of the program keeps running.

So \`await\` is not faster or slower than \`then\`. It is the same mechanism with a different spelling, and you can mix them.`,
        },
        {
          id: "async-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const loadUser = async (id) => ({ id, name: "Ada" });

const result = loadUser(1);
console.log(result instanceof Promise);

async function show() {
  const user = await loadUser(1);
  console.log(user.name);
}

show();`,
          output: ["true", "Ada"],
        },
        {
          id: "async-case",
          type: "realCase",
          title: "Everybody was an admin",
          situation: "A page is protected with `if (isAdmin(user)) { showAdminPage(); }`. Later, isAdmin was made async, because it now asks the database.",
          problem: "From that day on, every user could open the admin page.",
          cause: "isAdmin now returns a promise, and a promise is an object. Every object is truthy, so the condition was always true.",
          fix: "Write `if (await isAdmin(user))`. When a function becomes async, check every place that calls it. TypeScript and lint rules can find a forgotten await.",
        },
        {
          id: "q-async",
          type: "question",
          ideaId: "async-promise",
          kind: "predict",
          prompt: "What does this print?",
          code: `async function getPrice() {
  return 10;
}

const price = getPrice();
console.log(price + 5 === 15);`,
          options: [
            { id: "true", text: "true", misconceptionId: "async-gives-value" },
            { id: "false", text: "false" },
            { id: "error", text: "It throws a TypeError" },
          ],
          answerId: "false",
          why: "price is a promise. Adding 5 to it turns it into text, so the result isn't 15. await getPrice() would give 10.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "errors",
      title: "Handling errors",
      simpler:
        "An error is a ball thrown upwards through the functions. The first one who catches it decides: solve it, or throw it on. If you catch it and do nothing, everybody above thinks all is well.",
      blocks: [
        {
          id: "errors-1",
          type: "text",
          body: `With \`await\`, a rejection becomes an ordinary exception, so \`try/catch\` works. But only for promises you **await inside** the try block. A promise you only start, or return without awaiting, is settled later, when the try block is long over.

The harder question is what to do in the catch. A catch that returns normally says: **the problem is solved**. The caller gets a fulfilled promise and goes on. This is right when you have a real answer, such as a saved copy of the data. It is wrong when you only wanted to write the error to the log. In that case, **throw it again**, so the caller knows.

A good rule: catch an error where you can **do** something about it. Often that is at the top, where you can show a message. The functions in between can simply let it pass.

A rejection that nobody handles is reported as an *unhandled rejection*. In Node.js it ends the process by default.`,
        },
        {
          id: "errors-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const save = async () => {
  throw new Error("disk full");
};

async function swallow() {
  try {
    await save();
  } catch (err) {
    console.log("logged:", err.message);
  }
}

async function passOn() {
  try {
    await save();
  } catch (err) {
    throw new Error("Could not save", { cause: err });
  }
}

async function main() {
  await swallow();
  console.log("swallow: looks fine");
  await passOn().catch((err) => console.log("passOn:", err.message));
}

main();`,
          output: ["logged: disk full", "swallow: looks fine", "passOn: Could not save"],
        },
        {
          id: "errors-case",
          type: "realCase",
          title: "The payment that never happened",
          situation: "An order page calls `await pay(order)` and then shows \"Thank you\". Inside pay, a try/catch writes errors to the log.",
          problem: "When the bank refused a card, the customer still saw \"Thank you\", and the order was sent without payment.",
          cause: "The catch logged the error and then returned normally. For the caller, the promise was fulfilled.",
          fix: "After logging, throw the error again. The page catches it and shows that the payment failed.",
        },
        {
          id: "q-errors",
          type: "question",
          ideaId: "errors-travel",
          kind: "find-bug",
          prompt: "AI wrote this so that a failed request is handled. What happens when `load` is rejected?",
          code: `const load = async () => {
  throw new Error("offline");
};

async function getData() {
  try {
    return load();
  } catch {
    return "saved copy";
  }
}

getData().then(
  (v) => console.log("value:", v),
  (e) => console.log("error:", e.message),
);`,
          options: [
            { id: "copy", text: "value: saved copy", misconceptionId: "try-without-await" },
            { id: "error", text: "error: offline" },
            { id: "undef", text: "value: undefined" },
          ],
          answerId: "error",
          why: "return load() hands the promise out without waiting for it inside the try block, so the catch never sees the rejection. return await load() would.",
          difficulty: 3,
        },
      ],
    },
    {
      id: "sequence",
      title: "One after another, or together",
      simpler:
        "If you boil water and then, when it's done, start cutting vegetables, dinner takes long. If the two don't need each other, start both and wait for both.",
      blocks: [
        {
          id: "sequence-1",
          type: "text",
          body: `\`await\` makes it very easy to write slow code. Two awaits in a row mean: wait for the first, and **only then start** the second. If the second needs the result of the first, that's exactly right. If not, you are wasting time.

A promise starts its work when it is **created**, not when you await it. So you can start both first and wait for both afterwards, best with \`Promise.all\`, which you'll learn about in the next topic.

Ask one question for each await: **does this need the result of the one before?** If yes, keep the order. If no, start them together.

In a loop it's the same. \`await\` inside \`for...of\` goes one by one. That is right when order matters or when you don't want to flood a server, and slow when the items are independent.`,
        },
        {
          id: "sequence-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function oneByOne() {
  const start = Date.now();
  await wait(100);
  await wait(100);
  return Date.now() - start;
}

async function together() {
  const start = Date.now();
  await Promise.all([wait(100), wait(100)]);
  return Date.now() - start;
}

async function main() {
  console.log("one by one takes 180 ms or more:", (await oneByOne()) >= 180);
  console.log("together takes less than 180 ms:", (await together()) < 180);
}

main();`,
          output: ["one by one takes 180 ms or more: true", "together takes less than 180 ms: true"],
        },
        {
          id: "q-sequence",
          type: "question",
          ideaId: "await-order",
          kind: "choice",
          prompt: "Which pair should run **one after the other**?",
          options: [
            { id: "weather", text: "Load the weather and load the news" },
            { id: "login", text: "Log in, then load the user's orders with the login token" },
            { id: "images", text: "Load two images" },
            { id: "counts", text: "Count the users and count the orders" },
          ],
          answerId: "login",
          why: "The orders need the token from the login. In the other pairs neither needs the other, so they can run together.",
          difficulty: 1,
        },
        {
          id: "q-started",
          type: "question",
          ideaId: "await-order",
          kind: "choice",
          prompt: "Each request takes 1 second. How long does `const a = get(1); const b = get(2); await a; await b;` take?",
          options: [
            { id: "two", text: "About 2 seconds, because there are two awaits" },
            { id: "one", text: "About 1 second, because both were started before the first await" },
            { id: "zero", text: "Almost nothing, because the promises were created earlier" },
          ],
          answerId: "one",
          why: "Both requests start when get is called. While a is awaited, b is running too. Still, prefer Promise.all: if b fails while you wait for a, nobody is handling its error yet.",
          difficulty: 3,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Three checks help. Did I return or await every promise? Does my catch solve the problem or hide it? Do these steps really need each other?",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Wrapping a promise in new Promise.** If you already have a promise, return it. A wrapper adds nothing, and if you forget to call reject, errors disappear and the promise stays pending forever.

**Starting work without waiting for it.** A call such as \`sendEmail(user)\` without await can fail unnoticed. If you really don't want to wait, add a \`.catch\` that logs the error.

**Using await in forEach.** forEach doesn't wait for its callbacks. Use \`for...of\`, or \`Promise.all\` with map.

**A finally that returns.** \`finally\` is for cleaning up, such as hiding a spinner. A \`return\` in it replaces the result and hides errors.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `function getUser(id) {
  return new Promise((resolve) => {
    api.load(id).then((user) => {
      resolve(user);
    });
  });
}`,
          right: `function getUser(id) {
  return api.load(id);
}`,
          why: "If api.load fails, the wrapper on the left never settles, and the caller waits forever. The right version passes the value and the error on by itself.",
        },
        {
          id: "q-floating",
          type: "question",
          ideaId: "then-returns",
          kind: "choice",
          prompt: "In `.then((user) => { saveLog(user); })`, saveLog returns a promise that is rejected. Who handles it?",
          options: [
            { id: "chain-catch", text: "The catch at the end of the chain", misconceptionId: "then-waits-anyway" },
            { id: "nobody", text: "Nobody: the promise isn't returned, so it becomes an unhandled rejection" },
            { id: "then", text: "The then callback itself" },
          ],
          answerId: "nobody",
          why: "The chain knows only what the callback returns. Without return, the promise of saveLog has no connection to the chain.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "async/await for steps that follow each other, with conditions and loops",
      "then for a short step on a single promise",
      "Promise.all when several steps don't need each other",
    ],
    avoid: [
      "new Promise around something that already returns a promise",
      "A catch that only logs, when the caller has to know",
      "await in a row for independent work",
    ],
  },

  explain: {
    prompt: "What does an async function return, what happens to an error inside it, and when can a catch make a problem worse?",
    modelAnswer:
      "An async function always returns a promise, which is pending first and settles once. A returned value fulfills it, and a thrown error, or a rejected promise that is awaited, rejects it. The error travels to the next catch. A catch that returns normally ends the error, so the caller believes all went well, which is bad if the problem wasn't really solved. In a then chain each then returns a new promise made from what its callback returns, so I have to return inner promises. And I only await one after another when a step needs the result of the one before.",
  },

  reviewQuestions: [
    {
      id: "r-throw",
      ideaId: "then-returns",
      kind: "predict",
      prompt: "What does this print?",
      code: `Promise.resolve()
  .then(() => { throw new Error("x"); })
  .then(() => console.log("A"))
  .catch(() => console.log("B"))
  .then(() => console.log("C"));`,
      options: [
        { id: "b", text: "B", misconceptionId: "catch-rethrows" },
        { id: "bc", text: "B, C" },
        { id: "abc", text: "A, B, C" },
      ],
      answerId: "bc",
      why: "The error skips A and is handled in B. After that the chain is fulfilled again, so C runs.",
      difficulty: 2,
    },
    {
      id: "r-truthy",
      ideaId: "async-promise",
      kind: "predict",
      prompt: "What does this print?",
      code: `const allowed = async () => false;

if (allowed()) console.log("in");
else console.log("out");`,
      options: [
        { id: "out", text: "out", misconceptionId: "async-gives-value" },
        { id: "in", text: "in" },
      ],
      answerId: "in",
      why: "allowed() is a promise, and every object is truthy. It needs await.",
      difficulty: 1,
    },
    {
      id: "r-settle",
      ideaId: "three-states",
      kind: "choice",
      prompt: "You add a then callback to a promise that was fulfilled ten seconds ago. What happens?",
      options: [
        { id: "never", text: "It is never called, because you were too late" },
        { id: "called", text: "It is called with the value, as a microtask" },
        { id: "again", text: "The work is done again" },
      ],
      answerId: "called",
      why: "A settled promise keeps its result. Callbacks added later get it too.",
      difficulty: 1,
    },
  ],

  summary: [
    "A promise settles once: fulfilled or rejected",
    "then returns a new promise, so return what the next step needs",
    "An async function always returns a promise",
    "A catch that returns normally says the problem is solved",
    "Await in a row only when a step needs the one before",
  ],

  sources: [
    { label: "MDN: Using promises", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises" },
    { label: "MDN: async function", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function" },
    { label: "javascript.info: Promises, async/await", url: "https://javascript.info/async" },
  ],
};
