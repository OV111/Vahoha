// Code fences use ~~~ so the markdown can live in template literals without
// escaping. Inline code still needs \` inside the template literals.
export default {
  minutes: 20,
  status: "draft",

  steps: [
    {
      kind: "read",
      title: "A function remembers where it was written",
      body: `When a function uses a variable it didn't declare, JavaScript looks for it where the function was **written**, not where it is **called**. This is **lexical scope**.

Run the code. \`run\` has its own \`greeting\`, but \`sayHi\` was written next to the outer one, so that is the one it sees.`,
      code: {
        lang: "js",
        source: `const greeting = "hi";

function sayHi() {
  console.log(greeting);
}

function run() {
  const greeting = "hello";
  sayHi();
}

run();`,
      },
    },
    {
      kind: "read",
      title: "The scope chain",
      body: `Each function has its own scope, and each scope points to the one it was written inside. Looking up a name walks that chain outwards: local, then the enclosing function, then further out, then global.

If the name isn't found anywhere, you get a \`ReferenceError\`. Lookups only go **outwards**: \`outer\` can't see \`inner\`'s variables.`,
      code: {
        lang: "js",
        source: `const a = "global a";

function outer() {
  const b = "outer b";

  function inner() {
    const c = "inner c";
    console.log(c, "|", b, "|", a);
  }

  inner();
}

outer();

try {
  console.log(c);
} catch (err) {
  console.log(err.name + ": " + err.message);
}`,
      },
    },
    {
      kind: "check",
      type: "predict",
      q: "`inner` runs after `outer` has already returned. What does it print?",
      options: ["global", "outer", "undefined", "ReferenceError"],
      answer: 1,
      why: "inner was written inside outer, so its scope chain goes through outer's x. Where and when it is called doesn't change that.",
      code: {
        lang: "js",
        source: `let x = "global";

function outer() {
  let x = "outer";
  return function inner() {
    console.log(x);
  };
}

const fn = outer();
fn();`,
      },
    },
    {
      kind: "read",
      title: "A closure keeps variables alive",
      body: `Normally a function's local variables disappear when it returns. But if an inner function still uses them, they stay alive for as long as that inner function exists. The function plus the variables it holds on to is a **closure**.

Every call to \`makeCounter\` creates a fresh \`count\`, so \`a\` and \`b\` don't share one.`,
      code: {
        lang: "js",
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
      },
    },
    {
      kind: "check",
      type: "predict",
      q: "`b` is assigned from `a`, not from a new `makeCounter()` call. What prints?",
      options: ["1 1 2", "1 2 3", "1 1 1"],
      answer: 1,
      why: "b = a copies the reference to the same function, so both use the same closure and the same count. Only calling makeCounter again creates a new count.",
      code: {
        lang: "js",
        source: `function makeCounter() {
  let count = 0;
  return () => ++count;
}

const a = makeCounter();
const b = a;

console.log(a(), b(), a());`,
      },
    },
    {
      kind: "read",
      title: "Closures hold variables, not values",
      body: `A closure doesn't take a snapshot. It keeps a live link to the variable, so it sees whatever value the variable has **when it runs**.

Run it: \`hello\` was created while \`name\` was "Ada", but it prints "Grace".`,
      code: {
        lang: "js",
        source: `let name = "Ada";

const hello = () => console.log("hello", name);

name = "Grace";
hello();`,
      },
    },
    {
      kind: "read",
      title: "The classic loop bug",
      body: `\`var\` is scoped to the whole function, so a loop with \`var\` has **one** \`i\` that every callback shares. By the time the timers run (they are tasks, from the last lesson), the loop has finished and \`i\` is 3.

\`let\` creates a **new** binding for each loop turn, so each callback closes over its own value.`,
      code: {
        lang: "js",
        source: `for (var i = 0; i < 3; i++) {
  setTimeout(() => console.log("var", i), 0);
}

for (let j = 0; j < 3; j++) {
  setTimeout(() => console.log("let", j), 0);
}`,
      },
    },
    {
      kind: "check",
      type: "predict",
      q: "No timers this time. What does this print?",
      options: ["[0,1,2]", "[3,3,3]", "[2,2,2]"],
      answer: 1,
      why: "All three functions close over the same var i. They are only called after the loop ends, when i is 3. With let i you would get [0,1,2].",
      code: {
        lang: "js",
        source: `const fns = [];

for (var i = 0; i < 3; i++) {
  fns.push(() => i);
}

console.log(fns.map((f) => f()));`,
      },
    },
    {
      kind: "read",
      title: "Where you use this every day",
      body: `- **Private state.** \`count\` in \`makeCounter\` can't be reached from outside. Nothing but the returned function can change it.
- **Event handlers and callbacks.** A click handler or a \`.then\` callback uses variables from the component or function that created it.
- **React hooks.** Every render creates new functions that close over that render's state. A function kept from an old render still sees old state: the "stale closure" bug.

The code shows a small utility built from a closure: \`once\` runs a function a single time and remembers the result.`,
      code: {
        lang: "js",
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
      },
    },
    {
      kind: "check",
      type: "mcq",
      q: "A React component starts `setInterval(() => console.log(count), 1000)` inside `useEffect(..., [])`. Clicking a button increases `count`, but the interval keeps logging 0. Why?",
      options: [
        "React freezes state while an interval is running",
        "The callback closes over count from the first render, and the empty dependency list means the effect never runs again to make a new one",
        "setInterval copies every variable when it starts",
        "console.log is asynchronous and prints old values",
      ],
      answer: 1,
      why: "Each render has its own count. The interval was created once, during the first render, so its closure holds that render's count forever. The fixes are in Go deeper.",
    },
    {
      kind: "explain",
      prompt:
        "In your own words: what is a closure, and why does `count` in `makeCounter` survive after `makeCounter` has returned?",
      mustMention: [
        "A function keeps access to variables from where it was written",
        "Each call to makeCounter creates a new scope with its own count",
        "The returned function still uses count, so it isn't thrown away",
        "It holds the variable itself, not a copy of its value",
      ],
      modelAnswer:
        "A closure is a function together with the variables from the place it was written. Each call to makeCounter creates a new scope with its own count, and the arrow function it returns still uses that count. Because something still refers to it, count isn't thrown away when makeCounter returns. The function holds the variable itself, not a copy, so every call sees and changes the current value.",
    },
  ],

  deeper: [
    {
      level: 2,
      title: "Stale closures in React, and the three fixes",
      body: `The bug from the last question, and how to fix it:

~~~jsx
function Ticker() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setCount(count + 1); // always 0 + 1: count is from the first render
    }, 1000);
    return () => clearInterval(id);
  }, []);
}
~~~

1. **Updater function:** \`setCount((c) => c + 1)\`. React passes the latest value in, so the closure doesn't need it. This is the usual fix.
2. **List the dependency:** \`[count]\` re-runs the effect, clearing the old interval and starting one that closes over the new value.
3. **A ref:** keep the latest value in \`useRef\` and read \`ref.current\`, when you need the latest value without restarting the effect.

The React ESLint plugin's \`exhaustive-deps\` rule catches most of these before they ship.`,
      sources: [
        { label: "React: useEffect", url: "https://react.dev/reference/react/useEffect" },
        { label: "React: Removing effect dependencies", url: "https://react.dev/learn/removing-effect-dependencies" },
      ],
    },
    {
      level: 3,
      title: "Under the hood: environment records",
      body: `The language spec describes scopes as **Environment Records**. When a function is created, it stores a reference to the record it was created in (an internal slot called \`[[Environment]]\`). When it is called, a new record is made for its locals, and its "outer" link points to that stored one. Following those links is the scope chain.

Engines optimise this. In V8, variables that no inner function uses stay on the stack and vanish on return. Only the ones a closure needs are moved to a heap object called a **context**.

One consequence: closures created in the same scope **share one context**. If any of them uses a large object, that object stays in memory as long as any of the sibling closures is alive, even one that never touches it. That is a real source of memory leaks in long-running pages and servers.`,
      sources: [
        { label: "ECMAScript spec: Environment Records", url: "https://tc39.es/ecma262/#sec-environment-records" },
        { label: "MDN: Closures", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Closures" },
      ],
    },
    {
      level: 4,
      title: "Why lexical scope won",
      body: `Early Lisps used **dynamic scope**: a name meant whatever binding was most recent at run time, so the same function could see different variables depending on who called it. Bash still works this way for \`local\` variables.

Scheme (1975) made **lexical scope** the rule: you can tell what a name refers to by reading the code around it. That made functions safe to pass around and return, which is what closures are. JavaScript took this from Scheme.

JavaScript has one well-known exception: \`this\` is decided by **how** a function is called, not where it was written. Arrow functions removed that surprise by taking \`this\` lexically, like any other variable, which is why they are the default for callbacks today.`,
      sources: [
        { label: "MDN: this", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/this" },
        {
          label: "MDN: Arrow function expressions",
          url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Arrow_functions",
        },
      ],
    },
  ],
};
