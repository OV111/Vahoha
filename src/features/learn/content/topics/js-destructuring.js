// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "js-destructuring",
  title: "Destructuring, spread and rest",
  mystery: "We copied the user. Why did the original change?",
  minutes: 30,
  lang: "js",
  requires: [],

  shortAnswer:
    "Destructuring takes values out of objects and arrays into variables. Spread (...) puts the contents of one into another. Rest (...) collects what is left over. The dots look the same, but their place decides what they do.",

  ideas: [
    { id: "by-name-or-place", text: "Objects are unpacked by property name, arrays by position" },
    { id: "default-undefined", text: "A default value is used only when the value is undefined" },
    { id: "spread-shallow", text: "Spread makes a shallow copy: nested objects are still shared" },
    { id: "spread-order", text: "When you spread objects, the later value wins" },
    { id: "rest-collects", text: "Rest collects the remaining values and has to come last" },
  ],

  misconceptions: [
    {
      id: "deep-copy",
      belief: "spreading an object copies everything inside it",
      correction: "Only the first level is copied. An object inside it is still the same object in both.",
    },
    {
      id: "default-null",
      belief: "a default value also replaces null",
      correction: "Defaults are used only for undefined. null is a value, so it stays null.",
    },
    {
      id: "object-by-position",
      belief: "object properties are unpacked in their order",
      correction: "Objects are unpacked by name. Only arrays and other iterables are unpacked by position.",
    },
    {
      id: "first-wins",
      belief: "when two spread objects have the same property, the first one is kept",
      correction: "Properties are written from left to right, so the last one wins.",
    },
  ],

  sections: [
    {
      id: "destructuring",
      title: "Destructuring: taking values out",
      simpler:
        "You get a box with labels inside. Instead of opening it again and again, you take out the things you need once and put them on the table under their own names.",
      blocks: [
        {
          id: "destructuring-1",
          type: "text",
          body: `Data usually arrives in objects and arrays: a user from an API, the props of a component, a row from a database. To use it, you would have to write \`user.name\`, \`user.email\`, \`user.address.city\` again and again.

**Destructuring** takes the values out in one step and puts them into variables. The pattern on the left looks like the data on the right.

With **objects**, the **name** decides. \`const { name } = user\` means: take the property called \`name\`. The order doesn't matter. If you want another variable name, write \`{ name: userName }\`, which reads as "take name, call it userName".

With **arrays**, the **position** decides. \`const [first, second] = list\` takes the first and the second item, and you choose the names. Leave a gap to skip one: \`const [, second] = list\`.

If there is nothing at that name or position, you get \`undefined\`, not an error.`,
        },
        { id: "destructuring-pic", type: "picture", diagram: "destructuring", alt: "Objects are unpacked by name, arrays by position" },
        {
          id: "destructuring-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const user = { name: "Ada", age: 36, city: "London" };

const { city, name: userName, email } = user;
console.log(userName, city, email);

const [first, , third] = ["gold", "silver", "bronze"];
console.log(first, third);

let a = 1;
let b = 2;
[a, b] = [b, a];
console.log(a, b);`,
          output: ["Ada London undefined", "gold bronze", "2 1"],
        },
        {
          id: "q-by-name",
          type: "question",
          ideaId: "by-name-or-place",
          kind: "predict",
          prompt: "What does this print?",
          code: `const { b, a } = { a: 1, b: 2 };

console.log(b, a);`,
          options: [
            { id: "by-position", text: "1 2", misconceptionId: "object-by-position" },
            { id: "by-name", text: "2 1" },
            { id: "undef", text: "undefined undefined" },
          ],
          answerId: "by-name",
          why: "Objects are unpacked by name. b gets the property b, which is 2, wherever it stands in the pattern.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "defaults",
      title: "Defaults and nested data",
      simpler:
        "A default is a spare. It is used only when there is nothing at all in that place. If someone put an empty envelope there, which is null, the spare is not used.",
      blocks: [
        {
          id: "defaults-1",
          type: "text",
          body: `You can give a **default** for a missing value: \`const { theme = "dark" } = settings\`. It is used only if the value is \`undefined\`. A \`null\`, a \`0\` or an empty string counts as a value and stays.

Patterns can be **nested**, following the shape of the data: \`const { address: { city } } = user\`. This creates only \`city\`, not \`address\`. And it throws an error if \`address\` is missing, because nothing can be taken out of \`undefined\`. A default for the inner object protects you: \`const { address: { city } = {} } = user\`.

Destructuring works in **function parameters** too, and this is where you will see it most. The caller passes one object, and the function says which properties it needs. Compare \`createUser("Ada", true, false)\` with \`createUser({ name: "Ada", admin: true })\`. The second one can be read without looking up the function.

The \`= {}\` at the end of the parameter lets people call the function with nothing at all.`,
        },
        {
          id: "defaults-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `function createButton({ label = "OK", size = "medium" } = {}) {
  return label + ", " + size;
}

console.log(createButton({ label: "Save" }));
console.log(createButton());
console.log(createButton({ label: null }));

const user = { name: "Ada" };
const { address: { city = "unknown" } = {} } = user;
console.log(city);`,
          output: ["Save, medium", "OK, medium", "null, medium", "unknown"],
        },
        {
          id: "defaults-case",
          type: "realCase",
          title: "The profile that said \"null\"",
          situation: "A profile page shows `const { bio = \"No bio yet\" } = user`. New users have no bio, so they should see the text.",
          problem: "Many profiles showed the word \"null\" instead.",
          cause: "The database stores an empty bio as `null`. A default is used only for `undefined`, so `null` came through.",
          fix: "Use `??` after taking the value out: `const bio = user.bio ?? \"No bio yet\"`. It covers both `null` and `undefined`.",
        },
        {
          id: "q-null",
          type: "question",
          ideaId: "default-undefined",
          kind: "predict",
          prompt: "What does this print?",
          code: `const { a = 1, b = 2, c = 3 } = { a: null, b: undefined };

console.log(a, b, c);`,
          options: [
            { id: "123", text: "1 2 3", misconceptionId: "default-null" },
            { id: "null-undef-3", text: "null undefined 3" },
            { id: "null-2-3", text: "null 2 3" },
          ],
          answerId: "null-2-3",
          why: "a is null, which is a value, so its default isn't used. b is undefined and c is missing, and both get their defaults.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "spread",
      title: "Spread: putting contents in",
      simpler:
        "Spread opens a bag and pours everything in it into a new bag. If two things have the same label, the one that goes in later replaces the first.",
      blocks: [
        {
          id: "spread-1",
          type: "text",
          body: `Three dots **on the side where you build something** are called **spread**. They take all the items of an array, or all the own properties of an object, and put them into a new one.

- \`[...a, ...b]\` joins two arrays.
- \`{ ...user, city: "Rome" }\` makes a new object with one property changed.
- \`Math.max(...numbers)\` passes the items as separate arguments.

With objects, **order decides**. Properties are written from left to right, and a later one replaces an earlier one with the same name. So \`{ ...defaults, ...options }\` means "the options, and defaults for the rest". Turn it around, and the defaults would overwrite what the user chose.

This is how you update data in React and similar tools: instead of changing an object, you make a new one with the change.`,
        },
        {
          id: "spread-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const defaults = { theme: "dark", size: 14 };
const options = { size: 18 };

console.log({ ...defaults, ...options });
console.log({ ...options, ...defaults });

console.log([0, ...[1, 2], 3]);
console.log(Math.max(...[4, 9, 2]));`,
          output: ['{"theme":"dark","size":18}', '{"size":14,"theme":"dark"}', "[0,1,2,3]", "9"],
        },
        {
          id: "spread-case",
          type: "realCase",
          title: "Nobody could change the settings",
          situation: "A settings page saves with `const saved = { ...form, ...defaults }`. The idea was to fill in missing values.",
          problem: "Users changed the language, pressed save, and the page went back to English every time.",
          cause: "`defaults` came last, so every default replaced what the user had chosen.",
          fix: "Turn the order around: `{ ...defaults, ...form }`. What should win goes last.",
        },
        {
          id: "q-order",
          type: "question",
          ideaId: "spread-order",
          kind: "predict",
          prompt: "What does this print?",
          code: `const a = { x: 1, y: 1 };
const b = { y: 2 };

console.log({ ...a, ...b, x: 3 });`,
          options: [
            { id: "x3y2", text: '{"x":3,"y":2}' },
            { id: "x1y1", text: '{"x":1,"y":1}', misconceptionId: "first-wins" },
            { id: "x3y1", text: '{"x":3,"y":1}', misconceptionId: "first-wins" },
          ],
          answerId: "x3y2",
          why: "From left to right: x: 1, y: 1 from a, then b changes y to 2, then x: 3 replaces x. The last value wins.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "shallow",
      title: "A spread copy is shallow",
      simpler:
        "You photocopy a page that says: the address is in drawer 5. Now there are two pages, but still only one drawer 5. If someone changes what is in the drawer, both pages lead to the changed address.",
      blocks: [
        {
          id: "shallow-1",
          type: "text",
          body: `This is the answer to the question at the top, and the cause of many bugs.

Spread copies **one level**. Numbers, strings and booleans are copied as they are. But a property that holds an object holds only a **reference** to it, a kind of address. Spread copies that address. Now two objects point to the **same** inner object.

So \`copy.name = "Bo"\` is safe, but \`copy.address.city = "Rome"\` changes the original too.

To change nested data safely, spread **every level on the way** to the change. For a full, independent copy of plain data, use \`structuredClone(value)\`. It can't copy functions, and for large data it costs time, so use it when you really need it.`,
        },
        { id: "shallow-pic", type: "picture", diagram: "shallow-copy", alt: "The original and the copy have their own name but share one address object" },
        {
          id: "shallow-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const user = { name: "Ada", address: { city: "London" } };

const copy = { ...user };
copy.name = "Bo";
copy.address.city = "Rome";
console.log(user.name, user.address.city);

const safe = { ...user, address: { ...user.address, city: "Paris" } };
console.log(user.address.city, safe.address.city);`,
          output: ["Ada Rome", "Rome Paris"],
        },
        {
          id: "q-shallow",
          type: "question",
          ideaId: "spread-shallow",
          kind: "predict",
          prompt: "What does this print?",
          code: `const original = { tags: ["a"], count: 1 };
const copy = { ...original };

copy.tags.push("b");
copy.count = 2;

console.log(original.tags.length, original.count);`,
          options: [
            { id: "11", text: "1 1", misconceptionId: "deep-copy" },
            { id: "22", text: "2 2" },
            { id: "21", text: "2 1" },
          ],
          answerId: "21",
          why: "tags is one array shared by both objects, so push shows in the original. count is a number, copied on the first level, so the original keeps 1.",
          difficulty: 2,
        },
        {
          id: "q-ai",
          type: "question",
          ideaId: "spread-shallow",
          kind: "find-bug",
          prompt: "AI wrote this React update so that the old state is never changed. What is wrong?",
          code: `function rename(state, id, title) {
  const next = [...state];
  const todo = next.find((t) => t.id === id);
  todo.title = title;
  return next;
}`,
          options: [
            { id: "fine", text: "Nothing: the array was copied first", misconceptionId: "deep-copy" },
            { id: "same-object", text: "The array is new, but todo is still the object from the old state" },
            { id: "find", text: "find returns a copy, so the title never changes" },
            { id: "const", text: "todo is const, so its title can't be changed" },
          ],
          answerId: "same-object",
          why: "The new array holds the same todo objects, so todo.title = title changes the old state too. Use state.map((t) => (t.id === id ? { ...t, title } : t)).",
          difficulty: 3,
        },
      ],
    },
    {
      id: "rest",
      title: "Rest: collecting what is left",
      simpler:
        "You take out the two things you need and say: put all the others in one bag. That bag is the rest.",
      blocks: [
        {
          id: "rest-1",
          type: "text",
          body: `Three dots **on the side where you receive something** are called **rest**. They do the opposite of spread: they **collect** what hasn't been taken yet.

- In an object pattern: \`const { password, ...safeUser } = user\` takes out the password and collects all other properties in a new object.
- In an array pattern: \`const [first, ...others] = list\`.
- In parameters: \`function log(level, ...messages)\` collects all further arguments in a real array.

Rest has to be **last**, because it takes everything that remains. Anything after it is a syntax error.

How to tell them apart: dots in a **pattern or parameter list** collect (rest). Dots in an **array, object or call that you are writing** spread out (spread).`,
        },
        {
          id: "rest-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const user = { id: 7, name: "Ada", password: "secret" };

const { password, ...publicUser } = user;
console.log(publicUser);

const [winner, ...others] = ["Ada", "Bo", "Cy"];
console.log(winner, others);

function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(1, 2, 3));`,
          output: ['{"id":7,"name":"Ada"}', 'Ada ["Bo","Cy"]', "6"],
        },
        {
          id: "q-rest",
          type: "question",
          ideaId: "rest-collects",
          kind: "predict",
          prompt: "What does this print?",
          code: `function show(first, ...rest) {
  console.log(rest.length);
}

show("a", "b", "c");`,
          options: [
            { id: "one", text: "1" },
            { id: "two", text: "2" },
            { id: "three", text: "3" },
          ],
          answerId: "two",
          why: "first takes \"a\". rest collects everything that is left, \"b\" and \"c\".",
          difficulty: 1,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Three questions help. Can the thing I unpack be missing? Is there an object inside my copy? What should win when two values have the same name?",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Unpacking something that isn't there.** \`const { name } = undefined\` throws an error. Give a default at the source: \`const { name } = data ?? {}\`.

**Forgetting the parentheses.** To unpack an object into existing variables, the line may not start with \`{\`, because JavaScript would read it as a block. Write \`({ a, b } = obj);\`.

**Trusting a list of what to hide.** Taking out \`password\` with rest is fine, until someone adds \`resetToken\`. For data that leaves your server, list the properties you **want to send**.

**Spreading huge arrays into a call.** \`Math.max(...numbers)\` can fail with hundreds of thousands of items, because there is a limit on the number of arguments. Use reduce there.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `// Sends every property except one
const { password, ...safe } = user;
res.json(safe);`,
          right: `// Sends only what it names
const { id, name, avatar } = user;
res.json({ id, name, avatar });`,
          why: "On the left, a new secret property added later is sent to everyone. On the right, nothing is sent unless someone adds it on purpose.",
        },
        {
          id: "q-missing",
          type: "question",
          ideaId: "default-undefined",
          kind: "choice",
          prompt: "`user` may be `null`. Which line is safe?",
          options: [
            { id: "plain", text: "const { name } = user;" },
            { id: "default-prop", text: 'const { name = "Guest" } = user;', misconceptionId: "default-null" },
            { id: "nullish", text: "const { name } = user ?? {};" },
          ],
          answerId: "nullish",
          why: "Nothing can be taken out of null, so the first two throw an error. The default in the second is for a missing name, not for a missing user.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "A function needs several options: take one object and unpack it",
      "You need a new object or array with a small change",
      "You want to take out some values and keep the others together",
    ],
    avoid: [
      "Deeply nested patterns that nobody can read",
      "Spread as a full copy of nested data: use structuredClone",
      "Rest to hide secrets before sending data",
    ],
  },

  explain: {
    prompt: "Explain the difference between destructuring, spread and rest with one example each. Why can changing a spread copy still change the original?",
    modelAnswer:
      "Destructuring takes values out: const { name = 'Guest' } = user takes the property called name, and the default is used only if it is undefined. Arrays are unpacked by position. Spread puts contents into something new: { ...defaults, ...options }, where the later value wins. Rest collects what is left and comes last: const { id, ...others } = user. A spread copy is shallow: it copies only the first level, so an inner object is shared, and changing it through the copy changes the original too.",
  },

  reviewQuestions: [
    {
      id: "r-rename",
      ideaId: "by-name-or-place",
      kind: "choice",
      prompt: "Which variables does `const { name: title } = { name: \"Ada\" }` create?",
      options: [
        { id: "name", text: "name" },
        { id: "both", text: "name and title" },
        { id: "title", text: "title" },
      ],
      answerId: "title",
      why: "It reads as: take name, call it title. Only title is created.",
      difficulty: 1,
    },
    {
      id: "r-array",
      ideaId: "spread-shallow",
      kind: "predict",
      prompt: "What does this print?",
      code: `const rows = [{ n: 1 }];
const copy = [...rows];

copy[0].n = 5;
copy.push({ n: 2 });

console.log(rows[0].n, rows.length);`,
      options: [
        { id: "11", text: "1 1", misconceptionId: "deep-copy" },
        { id: "51", text: "5 1" },
        { id: "52", text: "5 2" },
      ],
      answerId: "51",
      why: "The array is a new one, so push doesn't reach rows. The object inside is shared, so the change to n does.",
      difficulty: 2,
    },
    {
      id: "r-wins",
      ideaId: "spread-order",
      kind: "choice",
      prompt: "The user's choices should win over the defaults. Which line is right?",
      options: [
        { id: "defaults-last", text: "{ ...choices, ...defaults }", misconceptionId: "first-wins" },
        { id: "choices-last", text: "{ ...defaults, ...choices }" },
        { id: "nested", text: "{ defaults, choices }" },
      ],
      answerId: "choices-last",
      why: "Later values replace earlier ones, so what should win goes last.",
      difficulty: 1,
    },
  ],

  summary: [
    "Objects are unpacked by name, arrays by position",
    "Defaults work only for undefined; use ?? for null too",
    "Spread builds something new, and the last value wins",
    "A spread copy is shallow: inner objects are shared",
    "Rest collects what is left and comes last",
  ],

  sources: [
    { label: "MDN: Destructuring", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Destructuring" },
    { label: "MDN: Spread syntax", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax" },
    { label: "MDN: Rest parameters", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/rest_parameters" },
    { label: "MDN: structuredClone()", url: "https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone" },
  ],
};
