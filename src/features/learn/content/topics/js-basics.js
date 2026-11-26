// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "js-basics",
  title: "Variables, types and functions",
  mystery: "The shop added 5 and 5 and got 55. Why?",
  minutes: 35,
  lang: "js",
  requires: [],

  shortAnswer:
    "A variable is a name for a value. Every value has a type that decides what you can do with it. A function is a piece of code with a name, which takes values in and gives one back.",

  ideas: [
    { id: "const-let", text: "const can't be given a new value, let can; both live in their block" },
    { id: "types", text: "Values have types, and + with a text joins instead of adding" },
    { id: "equality", text: "=== compares value and type, == converts first" },
    { id: "reference", text: "Numbers and texts are copied; objects and arrays are shared by reference" },
    { id: "functions", text: "A function takes parameters and returns one value, or undefined" },
  ],

  misconceptions: [
    {
      id: "const-frozen",
      belief: "a const object can't be changed",
      correction: "const protects the name, not the value. The object behind it can still change.",
    },
    {
      id: "plus-adds",
      belief: "+ always adds numbers",
      correction: "If one side is a text, + joins both as text.",
    },
    {
      id: "log-returns",
      belief: "a function that prints something also returns it",
      correction: "Printing only shows a value. Without return, a function gives back undefined.",
    },
    {
      id: "same-content-equal",
      belief: "two objects with the same content are equal",
      correction: "Objects are equal only if they are the same object.",
    },
  ],

  sections: [
    {
      id: "variables",
      title: "Variables",
      simpler:
        "A variable is a label on a thing. With const the label stays on that one thing. With let you may take the label off and put it on another.",
      blocks: [
        {
          id: "variables-1",
          type: "text",
          body: `A **variable** gives a value a name, so you can use it later. There are two ways to make one.

- \`const\`: the name always stands for the **same** value. This is the normal choice.
- \`let\`: the name can get a **new** value later. Use it for things that change, such as a counter.

You'll also see \`var\` in old code. It behaves differently: it ignores blocks, which causes bugs. Don't use it in new code.

\`const\` and \`let\` live in their **block**, the part between \`{\` and \`}\`. Outside of it they don't exist. And you can't use them before the line that declares them.

\`const\` doesn't mean that nothing can change. It means that you can't give **the name** another value. If the value is an object or an array, what's **inside** can still change.

Choose names that say what it is: \`userCount\` and not \`x\`.`,
        },
        {
          id: "variables-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `let score = 0;
score = score + 10;
console.log(score);

const user = { name: "Ada" };
user.name = "Bo"; // allowed: the inside changes
console.log(user.name);

try {
  const limit = 5;
  limit = 6; // not allowed: a new value for the name
} catch (err) {
  console.log(err.name);
}`,
          output: ["10", "Bo", "TypeError"],
        },
        {
          id: "q-const",
          type: "question",
          ideaId: "const-let",
          kind: "predict",
          prompt: "What does this print?",
          code: `const list = [1, 2];
list.push(3);

console.log(list.length);`,
          options: [
            { id: "two", text: "2" },
            { id: "three", text: "3" },
            { id: "error", text: "A TypeError", misconceptionId: "const-frozen" },
          ],
          answerId: "three",
          why: "const protects the name list. The array itself may change.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "types",
      title: "Types",
      simpler:
        "A 5 on a price tag and a 5 in a calculator look the same. But the one on the tag is writing, and the one in the calculator is a number. JavaScript treats them differently.",
      blocks: [
        {
          id: "types-1",
          type: "text",
          body: `Every value has a **type**. The simple ones, called primitives, are:

- **string**: text, \`"hello"\`
- **number**: \`5\`, \`3.14\`
- **boolean**: \`true\` or \`false\`
- **undefined**: no value was given
- **null**: empty on purpose
- and, rarely needed at first, **bigint** and **symbol**

Everything else is an **object**: \`{ name: "Ada" }\`, arrays, functions, dates.

The type decides what an operator does. \`+\` **adds** two numbers, but as soon as one side is a **string**, it **joins** them: \`5 + "5"\` is \`"55"\`. That's the answer to the question at the top. The other signs, \`-\`, \`*\` and \`/\`, turn strings into numbers if they can.

Whatever comes from a form, from the address bar or from \`localStorage\` is a **string**. Convert it with \`Number(text)\` before you calculate. If it isn't a number, you get \`NaN\`, "not a number". Check with \`Number.isNaN(value)\`.

To build text, use template literals: \`\\\`Hello \${name}\\\`\`.

Decimal numbers aren't exact: \`0.1 + 0.2\` is \`0.30000000000000004\`. For money, calculate in cents.`,
        },
        {
          id: "types-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const fromForm = "5"; // forms give text

console.log(fromForm + 5);
console.log(Number(fromForm) + 5);
console.log("10" - 4);
console.log(Number("ten"));
console.log(typeof fromForm, typeof 5, typeof undefined);
console.log(0.1 + 0.2 === 0.3);`,
          output: ["55", "10", "6", "NaN", "string number undefined", "false"],
        },
        {
          id: "types-case",
          type: "realCase",
          title: "The order for 101 books",
          situation: "A shop reads the quantity from an input and adds one more with `quantity + 1`.",
          problem: "A customer with 10 books clicked on plus and got 101.",
          cause: "The value of an input is always a string, so + joined \"10\" and 1.",
          fix: "Convert it where it comes in: `const quantity = Number(input.value)`. Inputs of type number also offer `input.valueAsNumber`.",
        },
        {
          id: "q-types",
          type: "question",
          ideaId: "types",
          kind: "predict",
          prompt: "What does this print?",
          code: `console.log("3" + 4 + 5);`,
          options: [
            { id: "12", text: "12", misconceptionId: "plus-adds" },
            { id: "345", text: "345" },
            { id: "39", text: "39" },
          ],
          answerId: "345",
          why: "From left to right: \"3\" + 4 is \"34\", and \"34\" + 5 is \"345\".",
          difficulty: 2,
        },
      ],
    },
    {
      id: "equality",
      title: "Comparing",
      simpler:
        "Three equals signs ask: exactly the same? Two ask: the same, if I squint? Squinting leads to surprises.",
      blocks: [
        {
          id: "equality-1",
          type: "text",
          body: `\`===\` is true if **value and type** are the same. \`==\` first **converts** the sides, by rules that hardly anybody knows by heart: \`0 == ""\` is true, and so is \`null == undefined\`. Use \`===\` and \`!==\`.

In a condition, every value counts as true or false. **Falsy** are \`false\`, \`0\`, \`""\`, \`null\`, \`undefined\` and \`NaN\` (and a few rare ones, such as \`0n\`). Everything else is **truthy**, even \`"0"\`, \`[]\` and \`{}\`.

This is handy, but be careful with \`0\` and empty text. \`if (count)\` is false for 0, though 0 may be a perfectly good count. For "use a replacement if it is missing", take \`??\`: it reacts only to \`null\` and \`undefined\`. \`||\` reacts to all falsy values.`,
        },
        {
          id: "equality-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `console.log(5 === "5", 5 == "5");
console.log(Boolean("0"), Boolean(0), Boolean([]));

const count = 0;
console.log(count || 10);
console.log(count ?? 10);`,
          output: ["false true", "true false true", "10", "0"],
        },
        {
          id: "q-equality",
          type: "question",
          ideaId: "equality",
          kind: "predict",
          prompt: "What does this print?",
          code: `const volume = 0;

console.log(volume || 50, volume ?? 50);`,
          options: [
            { id: "5050", text: "50 50" },
            { id: "500", text: "50 0" },
            { id: "00", text: "0 0" },
          ],
          answerId: "500",
          why: "|| replaces every falsy value, also 0. ?? replaces only null and undefined.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "reference",
      title: "Copy or share",
      simpler:
        "A number is like a note: you copy it, and both of you have your own. An object is like a shared house: you only copy the address. If one paints the door, it's painted for both.",
      blocks: [
        {
          id: "reference-1",
          type: "text",
          body: `When you assign a **primitive**, its value is **copied**. Both variables are then independent.

When you assign an **object or an array**, only the **reference** is copied, a kind of address. Both names then lead to the **same** object. A change through one name shows through the other.

It is the same when you pass values to a function: it can change an object you give it.

It also explains comparing. \`===\` on objects asks: is it **the same object**? Two objects with equal content are still two objects, so the result is false.

To get an independent one, make a copy: \`{ ...user }\` or \`[...list]\`. You'll learn more about this, and about its limits, in JavaScript Deep Dive.`,
        },
        { id: "reference-pic", type: "picture", diagram: "copy-vs-reference", alt: "Two numbers are separate; two names can point to one object" },
        {
          id: "reference-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `let a = 1;
let b = a;
b = 2;
console.log(a);

const first = { n: 1 };
const second = first;
second.n = 2;
console.log(first.n);

console.log({ n: 1 } === { n: 1 }, first === second);`,
          output: ["1", "2", "false true"],
        },
        {
          id: "q-reference",
          type: "question",
          ideaId: "reference",
          kind: "predict",
          prompt: "What does this print?",
          code: `function addTax(item) {
  item.price = item.price + 2;
}

const book = { price: 10 };
addTax(book);

console.log(book.price);`,
          options: [
            { id: "10", text: "10" },
            { id: "12", text: "12" },
            { id: "undef", text: "undefined" },
          ],
          answerId: "12",
          why: "The function gets a reference to the same object, so the change is visible outside.",
          difficulty: 2,
        },
        {
          id: "q-same",
          type: "question",
          ideaId: "reference",
          kind: "predict",
          prompt: "What does this print?",
          code: `console.log([1, 2] === [1, 2]);`,
          options: [
            { id: "true", text: "true", misconceptionId: "same-content-equal" },
            { id: "false", text: "false" },
          ],
          answerId: "false",
          why: "They are two different arrays, even though their content is equal.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "functions",
      title: "Functions",
      simpler:
        "A function is a machine: something goes in, something comes out. If you build it without an exit, it can do things, but nothing comes out.",
      blocks: [
        {
          id: "functions-1",
          type: "text",
          body: `A **function** packs code under a name, so you can use it again and again.

\`\`\`js
function add(a, b) {
  return a + b;
}

const multiply = (a, b) => a * b;
\`\`\`

\`a\` and \`b\` are **parameters**, the names inside. The values you pass in a call are **arguments**. If one is missing, the parameter is \`undefined\`, unless it has a default: \`(a, b = 1)\`.

\`return\` ends the function and **gives a value back**. Without it, the result is \`undefined\`. **Printing isn't returning**: \`console.log\` shows a value to you, but the rest of the program can't use it.

An **arrow function** without braces returns its expression by itself. With braces it needs \`return\`.

Functions are values too. You can store them in variables and pass them to other functions, like the callback of a click.

A good function does **one thing**, and its name says which.`,
        },
        {
          id: "functions-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const total = (price, count = 1) => price * count;

console.log(total(5, 3));
console.log(total(5));

function show(text) {
  console.log(text);
}

const result = show("hello");
console.log(result);`,
          output: ["15", "5", "hello", "undefined"],
        },
        {
          id: "functions-case",
          type: "realCase",
          title: "The price that was always undefined",
          situation: "A function calculates a discount and prints the right number while the developer tests it.",
          problem: "On the page, every price said \"undefined\".",
          cause: "The function printed the result but didn't return it.",
          fix: "`return` instead of `console.log`. A function that calculates should return, and whoever calls it decides what to show.",
        },
        {
          id: "q-functions",
          type: "question",
          ideaId: "functions",
          kind: "find-bug",
          prompt: "AI wrote this function to double a number. What does the code print?",
          code: `const double = (n) => { n * 2; };

console.log(double(4));`,
          options: [
            { id: "8", text: "8", misconceptionId: "log-returns" },
            { id: "undef", text: "undefined" },
            { id: "4", text: "4" },
          ],
          answerId: "undef",
          why: "With braces, an arrow function needs return. Either remove the braces or write return n * 2.",
          difficulty: 1,
        },
      ],
    },
  ],

  whenToUse: {
    use: ["const by default, let when the value changes", "=== for comparing", "Number() on everything that comes from a form"],
    avoid: ["var in new code", "== , except for a deliberate == null", "Functions that do several things at once"],
  },

  explain: {
    prompt: "Why is `\"5\" + 5` not 10? What is the difference between copying a number and copying an object? And what does a function give back without return?",
    modelAnswer:
      "Values have types. Since one side is a string, + joins and gives \"55\", so I convert with Number first. === compares value and type without converting. A number is copied, but for an object only the reference is copied, so both names share one object. const only stops me from giving the name a new value, and let allows it. A function takes parameters and returns one value, and without return it gives back undefined, even if it prints something.",
  },

  reviewQuestions: [
    {
      id: "r-minus",
      ideaId: "types",
      kind: "predict",
      prompt: "What does this print?",
      code: `console.log("8" - 3, "8" + 3);`,
      options: [
        { id: "5-11", text: "5 11", misconceptionId: "plus-adds" },
        { id: "5-83", text: "5 83" },
        { id: "nan", text: "NaN 83" },
      ],
      answerId: "5-83",
      why: "- turns the text into a number, + joins.",
      difficulty: 1,
    },
    {
      id: "r-share",
      ideaId: "reference",
      kind: "predict",
      prompt: "What does this print?",
      code: `const x = [1];
const y = x;
y.push(2);

console.log(x.length);`,
      options: [
        { id: "one", text: "1" },
        { id: "two", text: "2" },
      ],
      answerId: "two",
      why: "x and y are two names for one array.",
      difficulty: 1,
    },
    {
      id: "r-truthy",
      ideaId: "equality",
      kind: "choice",
      prompt: "Which value is **truthy**?",
      options: [
        { id: "zero", text: "0" },
        { id: "empty", text: '""' },
        { id: "array", text: "[]" },
      ],
      answerId: "array",
      why: "All objects are truthy, also an empty array.",
      difficulty: 1,
    },
  ],

  summary: [
    "const by default, let for what changes",
    "+ with a text joins: convert with Number first",
    "Use ===, and ?? for missing values",
    "Objects are shared, primitives are copied",
    "A function without return gives undefined",
  ],

  sources: [
    { label: "MDN: Grammar and types", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Grammar_and_types" },
    { label: "MDN: Functions", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Functions" },
    { label: "MDN: Equality comparisons", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Equality_comparisons_and_sameness" },
  ],
};
