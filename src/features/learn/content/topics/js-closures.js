// A topic in the learn_topics shape (backend/modules/learn/schemas/topic.schemas.js),
// kept in the bundle only until the API serves topics.
export default {
  topicId: "js-closures",
  title: "Closures",
  mystery: "Why does every button say 3?",
  minutes: 30,
  lang: "js",
  requires: ["js-scope"],

  shortAnswer:
    "A closure is a function together with the variables around it. The function keeps access to those variables even after the code that created them has finished.",

  ideas: [
    { id: "lexical", text: "A function looks for variables where it was written, not where it is called" },
    { id: "stays-alive", text: "Variables a function still uses stay alive after the outer function returns" },
    { id: "variable-not-copy", text: "A closure keeps the variable itself, not a copy of its value" },
    { id: "new-scope-per-call", text: "Each call of the outer function creates a new set of variables" },
  ],

  misconceptions: [
    {
      id: "copies-value",
      belief: "a closure copies the value when the function is created",
      correction: "It keeps the variable itself, so it sees whatever value the variable has when the function runs.",
    },
    {
      id: "called-scope",
      belief: "a function uses the variables of the place it is called from",
      correction: "It uses the variables of the place where it was written. Where you call it doesn't matter.",
    },
    {
      id: "gone-after-return",
      belief: "local variables always disappear when the function returns",
      correction: "They stay as long as some function that can still run needs them.",
    },
  ],

  sections: [
    {
      id: "what",
      title: "What a closure is",
      simpler:
        "Think of a function carrying a backpack. In the backpack are the variables from the place where the function was written. Wherever the function goes, the backpack goes with it. But be careful with this picture: the backpack holds the real variables, not photos of them.",
      blocks: [
        {
          id: "what-1",
          type: "text",
          body: `Most functions you write use more than their own parameters. They also use variables that were declared somewhere outside them. A click handler uses a list that was loaded earlier. A helper uses a setting from the top of the file.

JavaScript has to decide which variable such a name means. The rule is simple: it looks at the place where the function was **written**. This is called **lexical scope**. "Lexical" means "based on the text of the code", so you can find the answer by reading, without running anything.

A **closure** is the result of this rule: **a function together with the variables from the place where it was written.**`,
        },
        { id: "what-pic", type: "picture", diagram: "lexical-scope", alt: "sayHi finds the greeting next to where it was written" },
        {
          id: "what-2",
          type: "text",
          body: `In the code below there are two variables called \`greeting\`. \`run\` has its own, and it calls \`sayHi\`. But \`sayHi\` was written next to the outer \`greeting\`, so that is the one it uses. The place of the call plays no role.`,
        },
        {
          id: "what-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const greeting = "hi";

function sayHi() {
  console.log(greeting);
}

function run() {
  const greeting = "hello";
  sayHi();
}

run();`,
          output: ["hi"],
        },
        {
          id: "q-written",
          type: "question",
          ideaId: "lexical",
          kind: "predict",
          prompt: "What does this print?",
          code: `let x = "global";

function outer() {
  let x = "outer";
  return function inner() {
    console.log(x);
  };
}

const fn = outer();
fn();`,
          options: [
            { id: "global", text: "global", misconceptionId: "called-scope" },
            { id: "outer", text: "outer" },
            { id: "undef", text: "undefined", misconceptionId: "gone-after-return" },
            { id: "error", text: "ReferenceError", misconceptionId: "gone-after-return" },
          ],
          answerId: "outer",
          why: "inner was written inside outer, so it uses outer's x. It doesn't matter that fn() is called from the global scope, or that outer has already returned.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "why",
      title: "Why closures exist",
      simpler:
        "Sometimes a function must remember something between calls, like a score. You could keep the score in a global variable, but then any code can change it. A closure gives the function a private place to keep it.",
      blocks: [
        {
          id: "why-1",
          type: "text",
          body: `Programs often need a function that **remembers** something: how many times it ran, a result it already calculated, the user it belongs to.

Without closures, there are two bad choices. You can pass the data into every call, which forces every caller to carry it around. Or you can put the data in a global variable, where any other part of the program can read it and, worse, change it.

Closures give a third choice: the data lives in a scope that only the function can reach. It is remembered between calls **and** protected from everyone else. This is how JavaScript had private data long before classes got private fields.`,
        },
        {
          id: "why-case",
          type: "realCase",
          title: "The cart total that changed by itself",
          situation: "A shop kept the cart total in a global variable called `total`. It worked in every test.",
          problem: "After a marketing script was added to the page, some customers saw a total that had nothing to do with their cart.",
          cause: "The marketing script also used a global variable called `total`. Both scripts were writing to the same variable.",
          fix: "The total moved inside a function. Only `add` and `get` can reach it, so no other script can touch it.",
          code: `function createCart() {
  let total = 0;
  return {
    add: (price) => { total += price; },
    get: () => total,
  };
}`,
        },
        {
          id: "q-private",
          type: "question",
          ideaId: "stays-alive",
          kind: "choice",
          prompt: "With `createCart` above, what can a different script on the page do to `total`?",
          options: [
            { id: "set", text: "Set it with cart.total = 0" },
            { id: "read-global", text: "Read it as a global variable" },
            { id: "only-methods", text: "Nothing, except through the functions createCart returned" },
            { id: "gone", text: "Nothing, because total no longer exists", misconceptionId: "gone-after-return" },
          ],
          answerId: "only-methods",
          why: "total isn't a property of the returned object and isn't global. It still exists, but only add and get have access to it. Writing cart.total would just create a new, unrelated property.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "how",
      title: "How closures work",
      simpler:
        "Every time you call a function, JavaScript makes a new box for its variables. If the function creates another function inside, that inner function keeps a link to the box. As long as the link exists, the box is not thrown away. Call the outer function again and you get a new box.",
      blocks: [
        {
          id: "how-1",
          type: "text",
          body: `Three things happen, and together they explain everything about closures.

**1. Every call creates a new scope.** When you call a function, JavaScript makes a fresh place for its parameters and local variables. Call it twice and you get two separate places.

**2. A function remembers the scope it was created in.** When an inner function is created, it stores a hidden link to the current scope. When it runs and needs a name, it looks in its own scope first, then follows the link outwards, scope by scope, until it finds the name or reaches the global scope. This path is the **scope chain**. If the name is nowhere, you get a \`ReferenceError\`.

**3. A scope stays as long as something needs it.** Normally a function's variables can be thrown away when it returns. But if an inner function still has a link to them, JavaScript keeps them.`,
        },
        { id: "how-chain", type: "picture", diagram: "scope-chain", alt: "A lookup goes outwards from inner to outer to global" },
        {
          id: "how-2",
          type: "text",
          body: `Now read \`makeCounter\` with these three rules.

Calling \`makeCounter()\` creates a scope with \`count = 0\`. The arrow function inside is created in that scope, so it links to it. Then \`makeCounter\` returns, but \`count\` stays, because the arrow function still needs it.

Each call to \`a()\` changes that same \`count\`. The second call to \`makeCounter\` creates a **new** scope with a new \`count\`, so \`b\` starts from the beginning. The two counters share nothing.`,
        },
        { id: "how-counters", type: "picture", diagram: "counters", alt: "Each counter keeps its own count" },
        {
          id: "how-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `function makeCounter() {
  let count = 0;
  return () => {
    count++;
    return count;
  };
}

const a = makeCounter();
const b = makeCounter();

console.log(a(), a(), b());`,
          output: ["1 2 1"],
        },
        {
          id: "q-same-counter",
          type: "question",
          ideaId: "new-scope-per-call",
          kind: "predict",
          prompt: "`b` is assigned from `a`, not from a new call. What prints?",
          code: `function makeCounter() {
  let count = 0;
  return () => ++count;
}

const a = makeCounter();
const b = a;

console.log(a(), b(), a());`,
          options: [
            { id: "112", text: "1 1 2", misconceptionId: "copies-value" },
            { id: "123", text: "1 2 3" },
            { id: "111", text: "1 1 1" },
          ],
          answerId: "123",
          why: "b = a copies a reference to the same function, so both names use the same count. Only calling makeCounter again creates a new one.",
          difficulty: 2,
        },
        {
          id: "how-3",
          type: "text",
          body: `One detail causes most closure bugs: a closure keeps **the variable, not a copy of its value**. It is a live link. When the function runs, it reads whatever the variable holds **at that moment**.

Below, \`hello\` is created while \`name\` is "Ada". But it runs after \`name\` has changed, so it prints "Grace".`,
        },
        {
          id: "how-live",
          type: "code",
          lang: "js",
          runnable: true,
          source: `let name = "Ada";

const hello = () => console.log("hello", name);

name = "Grace";
hello();`,
          output: ["hello Grace"],
        },
        {
          id: "q-live",
          type: "question",
          ideaId: "variable-not-copy",
          kind: "predict",
          prompt: "What does this print?",
          code: `let price = 10;

const show = () => console.log(price);

price = 20;
show();
price = 30;`,
          options: [
            { id: "10", text: "10", misconceptionId: "copies-value" },
            { id: "20", text: "20" },
            { id: "30", text: "30" },
          ],
          answerId: "20",
          why: "show reads price when it runs. At that moment it is 20. It isn't 10, because nothing was copied, and not 30, because that line hasn't run yet.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "loops",
      title: "Closures in loops",
      simpler:
        "With var, the whole loop has one box called i. All your functions look into that one box, and at the end it says 3. With let, every turn of the loop gets its own box, so each function sees its own number.",
      blocks: [
        {
          id: "loops-1",
          type: "text",
          body: `This is the most famous closure bug, and now you have everything you need to explain it.

\`var\` belongs to the **whole function**, not to the block. So a loop that uses \`var i\` has only **one** \`i\`. Every function created in the loop keeps a link to that same variable. When those functions finally run, the loop is over and \`i\` is 3.

\`let\` belongs to the **block**, and a \`for\` loop gives it a special treatment: each turn gets a **new** variable. Every function created in that turn keeps its own.`,
        },
        { id: "loops-pic", type: "picture", diagram: "loop-bindings", alt: "One shared i with var, one j each with let" },
        {
          id: "loops-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}`,
          output: ["var 3", "var 3", "var 3", "let 0", "let 1", "let 2"],
        },
        {
          id: "loops-case",
          type: "realCase",
          title: "Every delete button removed the same row",
          situation: "An admin page created ten rows in a loop. Each row got a delete button with `onclick = () => remove(rows[i])`.",
          problem: "No button deleted its own row. Every click failed with the same error.",
          cause: "The loop used `var i`. By the time anyone clicked, `i` was 10, so every handler asked for `rows[10]`, which doesn't exist.",
          fix: "Change `var` to `let`, so each handler keeps its own `i`. Using `rows.forEach((row) => ...)` fixes it too, because each call gets its own `row`.",
        },
        {
          id: "q-loop",
          type: "question",
          ideaId: "variable-not-copy",
          kind: "predict",
          prompt: "There are no timers this time. What does this print?",
          code: `const fns = [];

for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}

console.log(fns.map((f) => f()));`,
          options: [
            { id: "012", text: "[0,1,2]", misconceptionId: "copies-value" },
            { id: "333", text: "[3,3,3]" },
            { id: "222", text: "[2,2,2]" },
          ],
          answerId: "333",
          why: "All three functions share one i. They are called after the loop, when i is already 3. The loop stops because i reached 3, so it isn't 2.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "used",
      title: "Where you use them",
      simpler:
        "You already use closures every day. Every time you write a function inside another function and it uses something from outside, that is a closure. Click handlers, timers and React components are full of them.",
      blocks: [
        {
          id: "used-1",
          type: "text",
          body: `- **Event handlers and callbacks.** A click handler uses variables from the function that attached it, long after that function has finished.
- **Private data.** The cart above is a small example of a module with private state.
- **Functions that remember.** \`once\` runs a function a single time and remembers the result. \`debounce\` remembers a timer. A cache remembers earlier answers.
- **Functions made to order.** \`createLogger("payments")\` returns a function that already knows its prefix.
- **React.** Every render creates new functions that keep that render's props and state.`,
        },
        {
          id: "used-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `function once(fn) {
  let called = false;
  let result;
  return (...args) => {
    if (!called) {
      called = true;
      result = fn(...args);
    }
    return result;
  };
}

const init = once(() => {
  console.log("init runs");
  return 42;
});

console.log(init(), init());`,
          output: ["init runs", "42 42"],
        },
        {
          id: "used-case",
          type: "realCase",
          title: "The React counter stuck at 1",
          situation: "A timer component calls `setCount(count + 1)` inside `setInterval`, in an effect with an empty dependency list.",
          problem: "The number goes from 0 to 1 and then never changes.",
          cause: "The interval was created once, in the first render. Its closure keeps that render's `count`, which is 0 forever. Every second it sets 0 + 1.",
          fix: "Use `setCount((c) => c + 1)`. React passes in the latest value, so the closure doesn't need to know it.",
          code: `useEffect(() => {
  const id = setInterval(() => {
    setCount((c) => c + 1);
  }, 1000);
  return () => clearInterval(id);
}, []);`,
        },
        {
          id: "q-once",
          type: "question",
          ideaId: "new-scope-per-call",
          kind: "find-bug",
          prompt: "AI wrote this so a customer is never charged twice. What happens?",
          code: `function makeOnce(fn) {
  return (...args) => {
    let called = false;
    if (!called) {
      called = true;
      return fn(...args);
    }
  };
}

const pay = makeOnce(() => console.log("charged"));
pay();
pay();`,
          options: [
            { id: "works", text: "It works: called blocks the second charge" },
            { id: "never", text: "It never charges, because called starts as false" },
            { id: "twice", text: "It charges twice: every call makes a new called" },
            { id: "crash", text: "It crashes: arrow functions can't change outer variables" },
          ],
          answerId: "twice",
          why: "called is declared inside the returned function, so each call of pay creates a new one that starts at false. Move it one level up, into makeOnce, and all calls share it.",
          difficulty: 3,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Two things go wrong most often. People expect the function to remember an old value, but it reads the new one. Or they put the variable in the wrong place, so it is created again on every call.",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Declaring the variable one level too deep.** If the variable sits inside the returned function, every call creates a new one and nothing is remembered. That was the bug in \`makeOnce\`.

**Expecting an old value.** The closure reads the variable when it runs. If you need the value as it is now, store it in a new \`const\`.

**Keeping large data alive.** A closure keeps what it uses. A handler that only needs an id, but uses a large object to get it, keeps the whole object in memory for as long as the handler exists. Take out the small part first.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `function attach(bigReport) {
  button.onclick = () => open(bigReport.id);
}`,
          right: `function attach(bigReport) {
  const id = bigReport.id;
  button.onclick = () => open(id);
}`,
          why: "The first handler needs bigReport, so the whole report stays in memory while the button exists. The second one needs only the id, so the report can be released.",
        },
        {
          id: "q-memory",
          type: "question",
          ideaId: "stays-alive",
          kind: "choice",
          prompt: "When can JavaScript throw away a variable that a closure uses?",
          options: [
            { id: "return", text: "When the outer function returns", misconceptionId: "gone-after-return" },
            { id: "unreachable", text: "When nothing can reach the closure any more" },
            { id: "first-run", text: "After the closure has run once" },
            { id: "never", text: "Never, until the page closes" },
          ],
          answerId: "unreachable",
          why: "The closure may run again, so its variables must stay. When nothing refers to the function any more, for example after its handler is removed, the variables can be released with it.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "A function must remember something between calls",
      "Data should be private to a few functions",
      "You want to make a function that already knows some settings",
    ],
    avoid: [
      "Many methods share a lot of state: a class is often clearer",
      "The function can simply take the value as a parameter",
      "It would keep large data alive for a long time",
    ],
  },

  explain: {
    prompt: "In your own words: what is a closure, and why does `count` survive after `makeCounter` has returned?",
    modelAnswer:
      "A closure is a function together with the variables from the place where it was written. Each call to makeCounter creates a new scope with its own count, and the function it returns still uses that count. Because the function can still run, JavaScript keeps count after makeCounter has returned. The function holds the variable itself, not a copy, so every call sees and changes the current value.",
  },

  reviewQuestions: [
    {
      id: "r-two-counters",
      ideaId: "new-scope-per-call",
      kind: "predict",
      prompt: "What does this print?",
      code: `const make = () => {
  let n = 0;
  return () => ++n;
};

const x = make();
const y = make();

x();
x();
console.log(x(), y());`,
      options: [
        { id: "34", text: "3 4" },
        { id: "31", text: "3 1" },
        { id: "11", text: "1 1", misconceptionId: "gone-after-return" },
      ],
      answerId: "31",
      why: "x has been called three times. y comes from another call of make, so it has its own n.",
      difficulty: 1,
    },
    {
      id: "r-later-change",
      ideaId: "variable-not-copy",
      kind: "predict",
      prompt: "What does this print?",
      code: `let user = "Ada";
const greet = () => "Hi " + user;

user = "Bo";
console.log(greet());`,
      options: [
        { id: "ada", text: "Hi Ada", misconceptionId: "copies-value" },
        { id: "bo", text: "Hi Bo" },
        { id: "undef", text: "Hi undefined" },
      ],
      answerId: "bo",
      why: "The closure keeps the variable. When greet runs, user is Bo.",
      difficulty: 1,
    },
    {
      id: "r-where-written",
      ideaId: "lexical",
      kind: "predict",
      prompt: "What does this print?",
      code: `const level = "outside";
const show = () => level;

function run() {
  const level = "inside";
  return show();
}

console.log(run());`,
      options: [
        { id: "inside", text: "inside", misconceptionId: "called-scope" },
        { id: "outside", text: "outside" },
        { id: "error", text: "ReferenceError" },
      ],
      answerId: "outside",
      why: "show was written next to the outer level. Where it is called doesn't matter.",
      difficulty: 1,
    },
  ],

  summary: [
    "A closure is a function plus the variables from where it was written",
    "Variables stay alive as long as a function that can still run needs them",
    "It keeps the variable itself, so it sees later changes",
    "Each call of the outer function makes a new, separate scope",
    "In loops, use let so each turn gets its own variable",
  ],

  sources: [
    { label: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures" },
    { label: "ECMAScript: Environment Records", url: "https://tc39.es/ecma262/#sec-environment-records" },
    { label: "React: useEffect", url: "https://react.dev/reference/react/useEffect" },
  ],
};
