// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "js-array-methods",
  title: "Array methods",
  mystery: "The list was sorted once. Why did the original change too?",
  minutes: 35,
  lang: "js",
  requires: [],

  shortAnswer:
    "map changes every item, filter keeps some items, and reduce turns all items into one result. They take a function, go through the array for you, and don't change the original array.",

  ideas: [
    { id: "map-same-length", text: "map returns a new array of the same length, made from what the callback returns" },
    { id: "filter-keeps", text: "filter returns a new array with the items whose callback result is truthy" },
    { id: "reduce-one", text: "reduce carries one value through the array and returns it at the end" },
    { id: "mutating", text: "Some methods change the original array (sort, reverse, splice), others make a new one" },
    { id: "right-tool", text: "Pick the method that says what you want: find, some, every, includes, forEach" },
  ],

  misconceptions: [
    {
      id: "all-copy",
      belief: "every array method leaves the original array alone",
      correction: "sort, reverse, splice, push and pop change the array itself. map, filter, slice and toSorted make a new one.",
    },
    {
      id: "foreach-returns",
      belief: "forEach returns the results of its callback",
      correction: "forEach always returns undefined. If you want the results, use map.",
    },
    {
      id: "map-can-skip",
      belief: "map leaves out an item when the callback returns nothing",
      correction: "map always keeps the same length. A callback that returns nothing puts undefined in that place. Use filter to leave items out.",
    },
    {
      id: "sort-numeric",
      belief: "sort puts numbers in order of size by default",
      correction: "Without a compare function, sort compares items as text, so 10 comes before 2.",
    },
  ],

  sections: [
    {
      id: "why",
      title: "Why array methods exist",
      simpler:
        "With a loop, you say how to walk through the list step by step. With an array method, you only say what you want to happen to each item. The method does the walking.",
      blocks: [
        {
          id: "why-1",
          type: "text",
          body: `Almost every program works with lists: products, messages, rows from a database. And the same few jobs appear again and again. Change every item. Keep some of them. Add them up. Find one.

You can do all of this with a \`for\` loop. But a loop mixes two things: **how to walk** through the list (a counter, a limit, an index) and **what you want** (the names of the active users). A reader has to study the whole loop to find out what it is for.

Array methods take over the walking. You give them a **callback**, a function that they call once for each item. The name of the method already says what will come out: \`map\` gives a changed list, \`filter\` a shorter one, \`find\` a single item.`,
        },
        { id: "why-pic", type: "picture", diagram: "array-pipeline", alt: "filter keeps two of three items, map changes them, reduce makes one number" },
        {
          id: "why-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const users = [
  { name: "Ada", active: true },
  { name: "Bo", active: false },
  { name: "Cy", active: true },
];

// With a loop
const names = [];
for (let i = 0; i < users.length; i++) {
  if (users[i].active) names.push(users[i].name);
}
console.log(names);

// With methods: keep the active ones, take their names
console.log(users.filter((u) => u.active).map((u) => u.name));`,
          output: ['["Ada","Cy"]', '["Ada","Cy"]'],
        },
        {
          id: "q-why",
          type: "question",
          ideaId: "right-tool",
          kind: "choice",
          prompt: "You have a list of products and want to know whether **at least one** is sold out. Which method says this most clearly?",
          options: [
            { id: "filter", text: "filter" },
            { id: "map", text: "map" },
            { id: "some", text: "some" },
            { id: "foreach", text: "forEach", misconceptionId: "foreach-returns" },
          ],
          answerId: "some",
          why: "some answers exactly this question with true or false, and it stops at the first match. filter would build a whole list that you only need to count.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "map",
      title: "map: change every item",
      simpler:
        "map is a machine on a conveyor belt. Every item goes in, something comes out for each of them. Five go in, five come out.",
      blocks: [
        {
          id: "map-1",
          type: "text",
          body: `\`map\` calls your function for each item and collects **what the function returns** into a new array. The new array always has the same length as the old one, and the old one stays as it is.

The callback gets three arguments: the item, its index and the whole array. Most of the time you only need the first.

Remember the \`return\`. An arrow function without braces returns its expression by itself: \`(p) => p * 2\`. As soon as you write braces, you have to write \`return\` too. If you forget it, the function returns \`undefined\`, and that is what ends up in your array.`,
        },
        {
          id: "map-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const prices = [10, 20, 30];

console.log(prices.map((p) => p * 2));

console.log(prices.map((p) => {
  p * 2; // no return
}).length);

console.log(prices);`,
          output: ["[20,40,60]", "3", "[10,20,30]"],
        },
        {
          id: "map-case",
          type: "realCase",
          title: "Every price on the page became NaN",
          situation: "A shop reads prices from text: `[\"10\", \"20\", \"30\"].map(parseInt)`. It looks short and clean.",
          problem: "The result is `[10, NaN, NaN]`. Only the first price is right.",
          cause: "map calls the function with the item **and the index**. parseInt takes a second argument, the number base. So it ran `parseInt(\"20\", 1)` and `parseInt(\"30\", 2)`, which make no sense.",
          fix: "Pass a function that uses only the item: `.map((text) => Number(text))`. `.map(Number)` is fine too, because Number takes only one argument.",
        },
        {
          id: "q-map",
          type: "question",
          ideaId: "map-same-length",
          kind: "predict",
          prompt: "What does this print?",
          code: `const result = [1, 2, 3].map((n) => {
  if (n > 1) return n * 10;
});

console.log(result.length);`,
          options: [
            { id: "two", text: "2", misconceptionId: "map-can-skip" },
            { id: "three", text: "3" },
            { id: "zero", text: "0" },
          ],
          answerId: "three",
          why: "map never leaves items out. For 1 the callback returns nothing, so the result is [undefined, 20, 30]. Its length is still 3.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "filter",
      title: "filter: keep some items",
      simpler:
        "filter is a doorkeeper with one question. For each item the answer is yes or no. Those with yes come in, unchanged.",
      blocks: [
        {
          id: "filter-1",
          type: "text",
          body: `\`filter\` calls your function for each item. If the result is **truthy**, the item goes into the new array. If it is falsy, it is left out. The items themselves aren't changed.

The result can have any length from zero up to the length of the original. If nothing matches, you get an empty array, not \`undefined\`, so it is always safe to call another array method on the result.

Two related methods stop early and don't build a list. \`find\` returns the **first matching item**, or \`undefined\` if there is none. \`some\` returns \`true\` as soon as one item matches. Use them when you need one answer and not a list.`,
        },
        {
          id: "filter-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const products = [
  { name: "Pen", price: 2, stock: 0 },
  { name: "Book", price: 15, stock: 4 },
  { name: "Lamp", price: 40, stock: 2 },
];

console.log(products.filter((p) => p.stock > 0).length);
console.log(products.filter((p) => p.price > 100));
console.log(products.find((p) => p.price > 10).name);
console.log(products.some((p) => p.stock === 0));`,
          output: ["2", "[]", "Book", "true"],
        },
        {
          id: "q-filter",
          type: "question",
          ideaId: "filter-keeps",
          kind: "predict",
          prompt: "What does this print?",
          code: `const values = [0, 1, "", "hi", null, 2];

console.log(values.filter((v) => v));`,
          options: [
            { id: "truthy", text: '[1,"hi",2]' },
            { id: "all", text: '[0,1,"","hi",null,2]' },
            { id: "bools", text: "[false,true,false,true,false,true]" },
            { id: "no-null", text: '[0,1,"","hi",2]' },
          ],
          answerId: "truthy",
          why: "filter keeps items whose callback result is truthy. 0, the empty string and null are falsy, so they go. Be careful: if 0 is a valid value in your data, this would lose it.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "reduce",
      title: "reduce: many to one",
      simpler:
        "Think of a snowball. It starts with a size you choose. It rolls over every item and takes something from each. What you have at the end is the result.",
      blocks: [
        {
          id: "reduce-1",
          type: "text",
          body: `\`reduce\` goes through the array and carries one value along, called the **accumulator**. For each item, your function gets the accumulator so far and the item, and returns the **next** accumulator. After the last item, reduce returns it.

\`\`\`js
array.reduce((accumulator, item) => nextAccumulator, startValue)
\`\`\`

The result can be anything: a number, an object, even another array. A common use is grouping.

**Always give a start value.** Without it, reduce uses the first item as the start and begins with the second. That causes strange results when items are objects, and an empty array throws an error.`,
        },
        {
          id: "reduce-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const cart = [
  { name: "Book", price: 15, qty: 2 },
  { name: "Lamp", price: 40, qty: 1 },
];

const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
console.log(total);

const words = ["hi", "yes", "no", "hey"];
const byLength = words.reduce((groups, word) => {
  groups[word.length] = [...(groups[word.length] ?? []), word];
  return groups;
}, {});
console.log(byLength);`,
          output: ["70", '{"2":["hi","no"],"3":["yes","hey"]}'],
        },
        {
          id: "reduce-case",
          type: "realCase",
          title: "The empty cart crashed the page",
          situation: "A checkout page adds up the cart with `prices.reduce((a, b) => a + b)`. It was tested with one item and with many.",
          problem: "A customer removed the last item, and the page broke with \"Reduce of empty array with no initial value\".",
          cause: "Without a start value, reduce takes the first item as the start. An empty array has no first item, so it throws a TypeError.",
          fix: "Give a start value: `prices.reduce((a, b) => a + b, 0)`. Now an empty cart gives 0.",
        },
        {
          id: "q-reduce",
          type: "question",
          ideaId: "reduce-one",
          kind: "predict",
          prompt: "What does this print?",
          code: `const result = [1, 2, 3].reduce((acc, n) => {
  return acc + n;
}, 10);

console.log(result);`,
          options: [
            { id: "six", text: "6" },
            { id: "thirteen", text: "13" },
            { id: "sixteen", text: "16" },
            { id: "array", text: "[11,12,13]" },
          ],
          answerId: "sixteen",
          why: "The accumulator starts at 10, then becomes 11, 13 and 16. reduce returns only the last value.",
          difficulty: 1,
        },
        {
          id: "q-reduce-bug",
          type: "question",
          ideaId: "reduce-one",
          kind: "find-bug",
          prompt: "AI wrote this to count how often each word appears. What is wrong?",
          code: `const words = ["a", "b", "a"];

const counts = words.reduce((acc, word) => {
  acc[word] = (acc[word] ?? 0) + 1;
}, {});

console.log(counts);`,
          options: [
            { id: "start", text: "The start value must be 0" },
            { id: "no-return", text: "The callback doesn't return acc" },
            { id: "mutates", text: "reduce can't be used with objects" },
            { id: "fine", text: "Nothing, it prints {a: 2, b: 1}" },
          ],
          answerId: "no-return",
          why: "Without a return, the next accumulator is undefined, and the second word fails with a TypeError. Add return acc at the end of the callback.",
          difficulty: 3,
        },
      ],
    },
    {
      id: "mutating",
      title: "Methods that change the original",
      simpler:
        "Some methods write on your paper. Others make a copy and write on the copy. If other code still needs the paper, use the second kind.",
      blocks: [
        {
          id: "mutating-1",
          type: "text",
          body: `map, filter and reduce don't change the array they are called on. But not all methods are like that, and this is a source of nasty bugs.

| Changes the array | Makes a new one instead |
| --- | --- |
| \`sort()\` | \`toSorted()\` |
| \`reverse()\` | \`toReversed()\` |
| \`splice()\` | \`toSpliced()\`, \`slice()\`, \`filter()\` |
| \`push()\`, \`unshift()\` | \`[...array, item]\` |
| \`pop()\`, \`shift()\` | \`slice(0, -1)\`, \`slice(1)\` |

The confusing one is \`sort\`: it changes the array **and** returns it, so \`const sorted = list.sort()\` looks like a copy. It is the same array under a second name.

The second trap of sort: without a compare function, it compares items **as text**. For numbers, write \`(a, b) => a - b\`. A negative result means "a first", a positive one "b first".

New arrays are **shallow** copies. The array is new, but objects in it are the same objects. Changing \`copy[0].name\` also changes the original item.`,
        },
        {
          id: "mutating-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const scores = [10, 9, 2];

console.log([...scores].sort());
console.log([...scores].sort((a, b) => a - b));
console.log(scores);

const sorted = scores.sort((a, b) => a - b);
console.log(sorted === scores);`,
          output: ["[10,2,9]", "[2,9,10]", "[10,9,2]", "true"],
        },
        {
          id: "q-mutating",
          type: "question",
          ideaId: "mutating",
          kind: "predict",
          prompt: "What does this print?",
          code: `const list = [3, 1, 2];
const sorted = list.sort((a, b) => a - b);

console.log(list[0], sorted[0]);`,
          options: [
            { id: "31", text: "3 1", misconceptionId: "all-copy" },
            { id: "11", text: "1 1" },
            { id: "33", text: "3 3" },
          ],
          answerId: "11",
          why: "sort changes the array itself and returns the same array. list and sorted are two names for one array. toSorted would have made a copy.",
          difficulty: 2,
        },
        {
          id: "q-sort",
          type: "question",
          ideaId: "mutating",
          kind: "predict",
          prompt: "What does this print?",
          code: `console.log([1, 20, 3].sort());`,
          options: [
            { id: "numeric", text: "[1,3,20]", misconceptionId: "sort-numeric" },
            { id: "text", text: "[1,20,3]" },
            { id: "desc", text: "[20,3,1]" },
          ],
          answerId: "text",
          why: "Without a compare function, items are compared as text, and \"20\" comes before \"3\" because \"2\" comes before \"3\".",
          difficulty: 2,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Ask yourself: what should come out? A list, one item, one value, or nothing? The answer tells you which method to use.",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Using map when nothing is collected.** If you ignore the result, you want \`forEach\` or a \`for...of\` loop. map builds an array that nobody uses, and it confuses the reader.

**Using forEach with await.** forEach doesn't wait for promises. It starts all calls and goes on. Use \`for...of\` with \`await\` to go one by one, or \`Promise.all\` with map to run them together.

**Putting everything into reduce.** reduce can do almost anything, which makes it hard to read. If filter and map can say it, use them.

**Worrying about two passes.** filter followed by map goes through the list twice. For normal lists this doesn't matter. Make it clear first, and measure before you make it fast.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `async function saveAll(items) {
  items.forEach(async (item) => {
    await save(item);
  });
  console.log("All saved"); // not true yet
}`,
          right: `async function saveAll(items) {
  await Promise.all(items.map((item) => save(item)));
  console.log("All saved");
}`,
          why: "forEach ignores the promises its callback returns, so the message comes too early. map collects the promises, and Promise.all waits for all of them.",
        },
        {
          id: "q-foreach",
          type: "question",
          ideaId: "right-tool",
          kind: "predict",
          prompt: "What does this print?",
          code: `const doubled = [1, 2].forEach((n) => n * 2);

console.log(doubled);`,
          options: [
            { id: "list", text: "[2,4]", misconceptionId: "foreach-returns" },
            { id: "same", text: "[1,2]" },
            { id: "undef", text: "undefined" },
          ],
          answerId: "undef",
          why: "forEach always returns undefined. It is for doing something with each item, not for making a new list. map would give [2,4].",
          difficulty: 1,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "map: every item becomes something else",
      "filter: you need only some of the items",
      "reduce: many items become one value, such as a total or groups",
      "find, some, every, includes: you need one answer",
    ],
    avoid: [
      "map when you ignore the result: use forEach or for...of",
      "reduce when filter and map say it more clearly",
      "sort on an array that other code still uses: use toSorted",
    ],
  },

  explain: {
    prompt: "You have a list of orders and want the total price of the paid ones. Explain which array methods you would use, what each returns, and whether the original list changes.",
    modelAnswer:
      "First filter, which returns a new array with only the paid orders, because it keeps the items whose callback result is truthy. Then map could turn each order into its price, giving an array of the same length. Then reduce carries a sum through the prices, starting at 0, and returns one number. None of these changes the original list, unlike sort, reverse or splice. If I only needed to know whether any order is paid, some would be the better choice.",
  },

  reviewQuestions: [
    {
      id: "r-chain",
      ideaId: "filter-keeps",
      kind: "predict",
      prompt: "What does this print?",
      code: `const out = [1, 2, 3, 4]
  .filter((n) => n % 2 === 0)
  .map((n) => n * n);

console.log(out);`,
      options: [
        { id: "all", text: "[1,4,9,16]" },
        { id: "even", text: "[4,16]" },
        { id: "plain", text: "[2,4]" },
      ],
      answerId: "even",
      why: "filter keeps 2 and 4, then map squares them.",
      difficulty: 1,
    },
    {
      id: "r-reverse",
      ideaId: "mutating",
      kind: "predict",
      prompt: "What does this print?",
      code: `const a = [1, 2, 3];
const b = a.reverse();
b.push(0);

console.log(a);`,
      options: [
        { id: "untouched", text: "[1,2,3]", misconceptionId: "all-copy" },
        { id: "reversed", text: "[3,2,1]" },
        { id: "both", text: "[3,2,1,0]" },
      ],
      answerId: "both",
      why: "reverse changes the array and returns the same one. So a and b are one array, and push adds to it.",
      difficulty: 2,
    },
    {
      id: "r-empty",
      ideaId: "reduce-one",
      kind: "choice",
      prompt: "What happens with `[].reduce((a, b) => a + b)`?",
      options: [
        { id: "zero", text: "It returns 0" },
        { id: "undef", text: "It returns undefined" },
        { id: "throws", text: "It throws a TypeError" },
      ],
      answerId: "throws",
      why: "There is no start value and no first item to use instead. Give a start value and it returns that.",
      difficulty: 1,
    },
  ],

  summary: [
    "map: same length, new values. Don't forget the return",
    "filter: the items whose callback result is truthy",
    "reduce: one result. Always give a start value",
    "sort, reverse and splice change the original; toSorted, toReversed and toSpliced don't",
    "Choose the method whose name says what you want",
  ],

  sources: [
    { label: "MDN: Array", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array" },
    { label: "MDN: Array.prototype.reduce()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce" },
    { label: "MDN: Array.prototype.sort()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort" },
  ],
};
