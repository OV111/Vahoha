// Same shape as js-closures.js (learn_topics).
export default {
  topicId: "js-promise-combinators",
  title: "Promise.all and race conditions",
  mystery: "The user searched for \"react\". Why does the page show results for \"re\"?",
  minutes: 35,
  lang: "js",
  requires: ["js-promises"],

  shortAnswer:
    "Promise.all waits for all promises and fails with the first error. allSettled waits for all and never fails. race takes the first to settle, any the first to succeed. A race condition is a bug where the result depends on which answer arrives first.",

  ideas: [
    { id: "all-fails-fast", text: "Promise.all rejects with the first error, and the other work goes on anyway" },
    { id: "all-order", text: "Results keep the order of the input, not the order of finishing" },
    { id: "settled-reports", text: "allSettled always fulfills, with one report per promise" },
    { id: "race-any", text: "race takes the first settled promise, any the first fulfilled one" },
    { id: "stale", text: "A late answer must not overwrite a newer one" },
  ],

  misconceptions: [
    {
      id: "all-cancels",
      belief: "Promise.all stops the other work when one promise fails",
      correction: "Nothing is stopped. It only stops waiting. The other requests go on and may still change things.",
    },
    {
      id: "finish-order",
      belief: "Promise.all gives the results in the order they finish",
      correction: "The results are in the order of the array you passed in.",
    },
    {
      id: "race-success",
      belief: "Promise.race returns the first successful result",
      correction: "race takes whatever settles first, even an error. The first success is Promise.any.",
    },
    {
      id: "answers-in-order",
      belief: "answers arrive in the order the requests were sent",
      correction: "Each request takes its own time. A later request can easily be answered first.",
    },
  ],

  sections: [
    {
      id: "all",
      title: "Promise.all: all or nothing",
      simpler:
        "You ask four friends to bring something for dinner. You start eating when everybody is there. If one calls and says it won't work, dinner is off, but the others are still on their way.",
      blocks: [
        {
          id: "all-1",
          type: "text",
          body: `\`Promise.all\` takes a list of promises and gives back **one** promise. It is fulfilled when **all** of them are, with an array of their values. That makes it the standard tool for independent work: start everything, then wait once.

Two details are important.

**The order of the results is the order of the input.** It doesn't matter which one finishes first. So you can safely write \`const [user, orders] = await Promise.all([getUser(), getOrders()])\`.

**It fails fast.** As soon as one promise is rejected, the whole thing is rejected with that error. The other results are lost to you. But the other work is **not stopped**: JavaScript promises can't be cancelled. A request that was sent is on its way, and if it saves something, it will still be saved.

So Promise.all fits when you need **everything**, and one missing piece makes the rest useless.`,
        },
        { id: "all-pic", type: "picture", diagram: "promise-combinators", alt: "all needs every promise, allSettled reports each, race takes the first settled, any the first fulfilled" },
        {
          id: "all-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const wait = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const fail = (ms, text) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(text)), ms));

async function main() {
  console.log(await Promise.all([wait(60, "slow"), wait(10, "fast")]));

  try {
    await Promise.all([
      wait(40, "saved").then((v) => console.log("still runs:", v)),
      fail(10, "boom"),
    ]);
  } catch (err) {
    console.log("rejected:", err.message);
  }
}

main();`,
          output: ['["slow","fast"]', "rejected: boom", "still runs: saved"],
        },
        {
          id: "q-order",
          type: "question",
          ideaId: "all-order",
          kind: "choice",
          prompt: "`await Promise.all([a, b, c])`: c finishes first, then a, then b. What is the result?",
          options: [
            { id: "cab", text: "[c, a, b]", misconceptionId: "finish-order" },
            { id: "abc", text: "[a, b, c]" },
            { id: "first", text: "Only c" },
          ],
          answerId: "abc",
          why: "The results are always in the order of the input array.",
          difficulty: 1,
        },
        {
          id: "q-cancel",
          type: "question",
          ideaId: "all-fails-fast",
          kind: "choice",
          prompt: "Three emails are sent with Promise.all. The first is rejected after 10 ms, the others need a second. What happens to them?",
          options: [
            { id: "cancelled", text: "They are cancelled", misconceptionId: "all-cancels" },
            { id: "sent", text: "They go on and may still be sent" },
            { id: "retried", text: "They are tried again later" },
          ],
          answerId: "sent",
          why: "Promise.all only stops waiting. If you then try all three again, two people may get the email twice.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "settled",
      title: "Promise.allSettled: a report for each",
      simpler:
        "Now you don't cancel dinner. You wait until everybody has either arrived or called, and then you look at who brought what.",
      blocks: [
        {
          id: "settled-1",
          type: "text",
          body: `Often one failure shouldn't ruin the rest. A dashboard with six boxes should still show five of them when one service is down.

\`Promise.allSettled\` waits until **every** promise is settled, and it is **never** rejected because of one of them. You get one report per promise, in the order of the input:

- \`{ status: "fulfilled", value }\`
- \`{ status: "rejected", reason }\`

This has a price: there is no error to catch. If you don't look at the status, failures go unnoticed. Decide for each rejected report what to do: show a message, use a saved value, write to the log.

How to choose: do you need **all** results to go on? Use \`all\`. Can you use **some** of them? Use \`allSettled\`.`,
        },
        {
          id: "settled-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const load = async (name) => {
  if (name === "news") throw new Error("news is down");
  return name + " data";
};

async function main() {
  const results = await Promise.allSettled(["weather", "news", "mail"].map(load));

  for (const r of results) {
    if (r.status === "fulfilled") console.log("show:", r.value);
    else console.log("message:", r.reason.message);
  }
}

main();`,
          output: ["show: weather data", "message: news is down", "show: mail data"],
        },
        {
          id: "settled-case",
          type: "realCase",
          title: "One slow widget emptied the dashboard",
          situation: "A start page loads profile, messages, statistics and a list of tips with Promise.all.",
          problem: "The service for the tips went down on a Sunday. From then on, every user saw only an error, though everything else was working.",
          cause: "Promise.all is all or nothing. The least important part decided about the whole page.",
          fix: "The profile is loaded by itself, because nothing works without it. The rest uses allSettled, and a part that failed shows a small message in its place.",
        },
        {
          id: "q-settled",
          type: "question",
          ideaId: "settled-reports",
          kind: "predict",
          prompt: "What does this print?",
          code: `Promise.allSettled([Promise.reject(new Error("x")), Promise.reject(new Error("y"))])
  .then((r) => console.log("then", r.length))
  .catch(() => console.log("catch"));`,
          options: [
            { id: "then", text: "then 2" },
            { id: "catch", text: "catch" },
            { id: "then0", text: "then 0" },
          ],
          answerId: "then",
          why: "allSettled fulfills even if every promise was rejected. You get two reports, both with the status rejected.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "race",
      title: "race and any: the first one wins",
      simpler:
        "race: whoever crosses the line first counts, even if they fall over it. any: the first who crosses it on their feet.",
      blocks: [
        {
          id: "race-1",
          type: "text",
          body: `Sometimes you need only one answer.

\`Promise.race\` settles the same way as the **first promise to settle**, whether it is fulfilled or rejected. The classic use is a time limit: you let the request run against a timer that rejects. Remember that the loser keeps running. For requests, \`AbortSignal.timeout(ms)\` is better, because it really stops waiting for the network.

\`Promise.any\` takes the **first promise that is fulfilled** and ignores rejections, as long as one success is possible. You can ask two servers and use whichever answers first. Only if all fail, it is rejected, with an \`AggregateError\` that holds all the errors in \`.errors\`.

| | Fulfilled when | Rejected when |
| --- | --- | --- |
| \`all\` | all are fulfilled | the first is rejected |
| \`allSettled\` | all are settled | never because of them |
| \`race\` | the first to settle is fulfilled | the first to settle is rejected |
| \`any\` | the first is fulfilled | all are rejected |`,
        },
        {
          id: "race-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const wait = (ms, value) =>
  new Promise((resolve) => setTimeout(() => resolve(value), ms));

const fail = (ms, text) =>
  new Promise((_, reject) => setTimeout(() => reject(new Error(text)), ms));

async function main() {
  await Promise.race([wait(80, "answer"), fail(20, "too slow")])
    .catch((err) => console.log("race:", err.message));

  console.log("any:", await Promise.any([fail(10, "server 1 down"), wait(40, "server 2")]));
}

main();`,
          output: ["race: too slow", "any: server 2"],
        },
        {
          id: "q-race",
          type: "question",
          ideaId: "race-any",
          kind: "predict",
          prompt: "What does this print?",
          code: `const ok = new Promise((r) => setTimeout(() => r("ok"), 30));
const bad = new Promise((_, r) => setTimeout(() => r(new Error("bad")), 10));

Promise.race([ok, bad]).then(
  (v) => console.log(v),
  (e) => console.log("error", e.message),
);`,
          options: [
            { id: "ok", text: "ok", misconceptionId: "race-success" },
            { id: "bad", text: "error bad" },
            { id: "both", text: "error bad, then ok" },
          ],
          answerId: "bad",
          why: "The rejection comes first, and race takes whatever settles first. Promise.any would have given ok.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "conditions",
      title: "Race conditions",
      simpler:
        "You send two letters with questions. The answer to the second comes first. Then the answer to the first arrives and you put it on top. Now the older answer is the one you see.",
      blocks: [
        {
          id: "conditions-1",
          type: "text",
          body: `A **race condition** is a bug where the result depends on **which of two things happens first**, and you didn't decide that. It has nothing to do with \`Promise.race\`; only the name is similar.

JavaScript runs one thing at a time, so you may think you are safe. You are, between two awaits. But **at every await, other code can run**. When your function continues, the world may have changed.

The most common form is the **stale answer**. The user types "re", and a request goes out. They type on, "react", and a second request goes out. Answers don't have to arrive in the order of the requests. If the first is slower, it arrives last and overwrites the newer result.

Two ways to protect yourself:

- **Ignore**: give each request a number, and use an answer only if its number is the newest.
- **Cancel**: stop the old request with an \`AbortController\`. This also saves work.

In React, the cleanup function of an effect is the place for both.`,
        },
        {
          id: "conditions-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const search = (text, ms) =>
  new Promise((resolve) => setTimeout(() => resolve("results for " + text), ms));

let shown = "";
async function unsafe(text, ms) {
  shown = await search(text, ms);
}

let newest = 0;
let safe = "";
async function careful(text, ms) {
  const mine = ++newest;
  const result = await search(text, ms);
  if (mine === newest) safe = result;
}

async function main() {
  await Promise.all([unsafe("re", 60), unsafe("react", 10)]);
  console.log("unsafe:", shown);

  await Promise.all([careful("re", 60), careful("react", 10)]);
  console.log("careful:", safe);
}

main();`,
          output: ["unsafe: results for re", "careful: results for react"],
        },
        {
          id: "conditions-case",
          type: "realCase",
          title: "One coupon, used twice",
          situation: "A shop checks a coupon with `if (!(await isUsed(code))) { await markUsed(code); giveDiscount(); }`.",
          problem: "Some customers clicked the button twice, quickly, and got the discount two times.",
          cause: "Both clicks asked before either had marked the coupon. Between the check and the marking there is an await, and there the second request got in.",
          fix: "Check and mark in **one** step, in the database: update the coupon only if it isn't used, and look at whether a row was changed. A disabled button helps the user, but it doesn't protect the server.",
        },
        {
          id: "q-stale",
          type: "question",
          ideaId: "stale",
          kind: "find-bug",
          prompt: "AI wrote this effect to load a user's profile. What can go wrong?",
          code: `useEffect(() => {
  fetchUser(userId).then((user) => setUser(user));
}, [userId]);`,
          options: [
            { id: "loop", text: "It runs forever" },
            { id: "stale-user", text: "After switching users quickly, the older answer can arrive last and be shown" },
            { id: "order", text: "Nothing: answers arrive in the order of the requests", misconceptionId: "answers-in-order" },
            { id: "deps", text: "fetchUser must not be called in an effect" },
          ],
          answerId: "stale-user",
          why: "Nothing checks whether the answer still belongs to the current userId. Use a flag in the cleanup, or abort the old request there.",
          difficulty: 2,
        },
        {
          id: "q-gap",
          type: "question",
          ideaId: "stale",
          kind: "predict",
          prompt: "What does this print?",
          code: `let stock = 1;
const pause = () => new Promise((r) => setTimeout(r, 10));

async function buy() {
  if (stock > 0) {
    await pause();
    stock = stock - 1;
  }
}

Promise.all([buy(), buy()]).then(() => console.log(stock));`,
          options: [
            { id: "zero", text: "0" },
            { id: "minus", text: "-1" },
            { id: "one", text: "1" },
          ],
          answerId: "minus",
          why: "Both calls check the stock before either one reduces it, because of the await in between. So it is reduced twice.",
          difficulty: 3,
        },
      ],
    },
    {
      id: "limits",
      title: "Not everything at once",
      simpler:
        "If a thousand people run through one door together, nobody gets through. Let them in by groups.",
      blocks: [
        {
          id: "limits-1",
          type: "text",
          body: `\`Promise.all(ids.map(load))\` starts **all** requests at once. For ten, that's great. For ten thousand, you may overload the server, hit a rate limit, or run out of memory.

The simple answer is **batches**: take some, wait for all of them, take the next. A batch is as slow as its slowest item, but the code is easy to understand. Libraries such as \`p-limit\` keep a fixed number running all the time, which is faster.

And if there is a way to get many items with **one** request, use that first. A loop of requests is often a sign that the server is missing an endpoint.`,
        },
        {
          id: "limits-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const load = async (id) => "item " + id;

async function inBatches(ids, size) {
  const results = [];
  for (let i = 0; i < ids.length; i += size) {
    const batch = ids.slice(i, i + size);
    console.log("batch:", batch);
    results.push(...(await Promise.all(batch.map(load))));
  }
  return results;
}

inBatches([1, 2, 3, 4, 5], 2).then((r) => console.log(r.length));`,
          output: ["batch: [1,2]", "batch: [3,4]", "batch: [5]", "5"],
        },
        {
          id: "q-batch",
          type: "question",
          ideaId: "all-fails-fast",
          kind: "choice",
          prompt: "In `inBatches`, one item of the second batch is rejected. What happens?",
          options: [
            { id: "skips", text: "The item is left out, and the rest goes on" },
            { id: "stops", text: "The whole function is rejected, and the third batch never starts" },
            { id: "all-cancel", text: "The items already loaded are undone", misconceptionId: "all-cancels" },
          ],
          answerId: "stops",
          why: "Promise.all rejects, await throws, and the loop ends. What was already done stays done. If you want to go on, use allSettled in the loop.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Ask: do I need all of them, some of them, or just one? And: what if the answers come in a different order than I think?",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Passing functions instead of promises.** \`Promise.all([load, save])\` doesn't call anything. The functions themselves end up in the result.

**Forgetting to look at the status.** allSettled never throws, so errors are silent if you only use \`value\`.

**Trying again after Promise.all failed.** Some of the work may have been done already. Only repeat work that is safe to do twice.

**Protecting only the button.** A disabled button doesn't stop two tabs or a script. Race conditions on shared data have to be solved where the data is, in the database.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `const user = await getUser();
const news = await getNews();
const tips = await getTips();`,
          right: `const [user, news, tips] = await Promise.all([
  getUser(),
  getNews(),
  getTips(),
]);`,
          why: "The three don't need each other. On the left the times add up, on the right you wait only for the slowest.",
        },
        {
          id: "q-choose",
          type: "question",
          ideaId: "race-any",
          kind: "choice",
          prompt: "The same file is on three servers, and you want it from whichever delivers it first. A server that is down must not matter. What do you use?",
          options: [
            { id: "race", text: "Promise.race", misconceptionId: "race-success" },
            { id: "any", text: "Promise.any" },
            { id: "all", text: "Promise.all" },
            { id: "settled", text: "Promise.allSettled" },
          ],
          answerId: "any",
          why: "any takes the first success and ignores failures as long as one server works. With race, a server that fails quickly would win.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "all: you need every result",
      "allSettled: some results are useful even if others fail",
      "any: several sources for the same thing",
      "race: a time limit for something you can't cancel",
    ],
    avoid: [
      "all for thousands of requests at once: use batches",
      "all when one unimportant part could take down the page",
      "race when you mean the first success: use any",
    ],
  },

  explain: {
    prompt: "A page loads four things. How do you decide between Promise.all, allSettled, race and any? And what is a race condition, with one example?",
    modelAnswer:
      "If I need all four, I use Promise.all: the results keep the order of the input, and the first error rejects it, while the other requests go on. If some are useful without the others, I use allSettled, which always fulfills with a report for each, and I check the status. If I want one answer from several sources, any gives the first success, and race gives whatever settles first, even an error. A race condition is a bug where the result depends on which thing happens first. For example, a slow answer to an old search arrives after the new one and overwrites it. I ignore or abort the old request.",
  },

  reviewQuestions: [
    {
      id: "r-any",
      ideaId: "race-any",
      kind: "choice",
      prompt: "When is `Promise.any` rejected?",
      options: [
        { id: "first", text: "When the first promise is rejected", misconceptionId: "race-success" },
        { id: "all", text: "When all promises are rejected" },
        { id: "never", text: "Never" },
      ],
      answerId: "all",
      why: "It waits for a success as long as one is possible. If all fail, it rejects with an AggregateError.",
      difficulty: 1,
    },
    {
      id: "r-result",
      ideaId: "all-order",
      kind: "predict",
      prompt: "What does this print?",
      code: `const wait = (ms, v) => new Promise((r) => setTimeout(() => r(v), ms));

Promise.all([wait(30, "a"), wait(10, "b")]).then(([x]) => console.log(x));`,
      options: [
        { id: "b", text: "b", misconceptionId: "finish-order" },
        { id: "a", text: "a" },
        { id: "list", text: '["a","b"]' },
      ],
      answerId: "a",
      why: "The result has the order of the input, and [x] takes the first item.",
      difficulty: 1,
    },
    {
      id: "r-stale",
      ideaId: "stale",
      kind: "choice",
      prompt: "Which change really protects a limited offer against two fast clicks?",
      options: [
        { id: "button", text: "Disabling the button after the first click" },
        { id: "await", text: "An await before the check" },
        { id: "atomic", text: "Checking and reducing the stock in one database step" },
      ],
      answerId: "atomic",
      why: "Only then is there no gap between the check and the change. A button doesn't help against two tabs or a script.",
      difficulty: 2,
    },
  ],

  summary: [
    "all: everything or the first error; the rest goes on running",
    "allSettled: a report for each, so check the status",
    "race: first settled; any: first success",
    "At every await, other code can run and change things",
    "Ignore or abort old requests; check and change shared data in one step",
  ],

  sources: [
    { label: "MDN: Promise.all()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all" },
    { label: "MDN: Promise.allSettled()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/allSettled" },
    { label: "MDN: Promise.any()", url: "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/any" },
    { label: "React: Fetching data with effects", url: "https://react.dev/reference/react/useEffect#fetching-data-with-effects" },
  ],
};
