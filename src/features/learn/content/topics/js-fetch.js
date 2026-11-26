// Same shape as js-closures.js (learn_topics). Runnable examples use a small
// fake fetch: lesson code must give the same output without a network.
export default {
  topicId: "js-fetch",
  title: "fetch and error handling",
  mystery: "The server answered 404. Why was there no error?",
  minutes: 35,
  lang: "js",
  requires: ["js-promises"],

  shortAnswer:
    "fetch sends a request and gives you a promise for the response. It rejects only when no usable answer arrives. A 404 or 500 is an answer, so you have to check response.ok yourself.",

  ideas: [
    { id: "two-steps", text: "fetch works in two steps: first the response, then its body, and both are asynchronous" },
    { id: "ok-check", text: "fetch fulfills for 404 and 500, so response.ok has to be checked" },
    { id: "kinds", text: "Network failures, HTTP errors and bad data are different failures with different answers" },
    { id: "ui-states", text: "Every request has loading, error, empty and success states" },
    { id: "timeouts", text: "A request can be stopped with an AbortSignal, and only some requests are safe to repeat" },
  ],

  misconceptions: [
    {
      id: "rejects-on-404",
      belief: "fetch rejects when the server answers with 404 or 500",
      correction: "It rejects only if no usable answer arrives. An error status is still an answer, with response.ok set to false.",
    },
    {
      id: "json-is-sync",
      belief: "response.json() gives you the data directly",
      correction: "It returns a promise, because the body may still be on its way. You need await.",
    },
    {
      id: "retry-everything",
      belief: "every failed request can simply be sent again",
      correction: "A request that changes something may have worked even though the answer was lost. Sending it again can do it twice.",
    },
    {
      id: "body-twice",
      belief: "you can read the body of a response as often as you like",
      correction: "The body is a stream that can be read once. Keep the result in a variable, or clone the response first.",
    },
  ],

  sections: [
    {
      id: "basics",
      title: "How fetch works",
      simpler:
        "You send a letter and wait. First you get the envelope and see from the outside whether it's good or bad news. Then you open it and read. Both take a moment.",
      blocks: [
        {
          id: "basics-1",
          type: "text",
          body: `\`fetch(url)\` sends a request and returns a promise for a \`Response\`. There are **two** waits, and that surprises many people.

1. The promise of \`fetch\` is fulfilled as soon as the **status and headers** are there. Now you know \`response.status\`, \`response.ok\` and \`response.headers\`. The body may still be on its way.
2. \`response.json()\` (or \`.text()\`) reads the **body** to the end and turns it into a value. It returns a promise too.

So you need two awaits. The body is a stream and can be read **once**. A second \`.json()\` on the same response is rejected.

To send data, pass a second argument: the method, the headers and a body. JSON has to be turned into text with \`JSON.stringify\`, and the header \`Content-Type: application/json\` tells the server what it is.

The examples on this page use a small fake fetch, so that they work without a network. The rules are the same.`,
        },
        { id: "basics-pic", type: "picture", diagram: "fetch-flow", alt: "fetch gives a response, response.ok is checked, then the body is read" },
        {
          id: "basics-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const fetch = async (url) =>
  new Response('{"name":"Ada"}', { status: 200 });

async function main() {
  const response = await fetch("/api/user");
  console.log(response.status, response.ok);

  const user = await response.json();
  console.log(user.name);

  await response.json().catch(() => console.log("the body was already read"));
}

main();`,
          output: ["200 true", "Ada", "the body was already read"],
        },
        {
          id: "q-json",
          type: "question",
          ideaId: "two-steps",
          kind: "find-bug",
          prompt: "AI wrote this. What does it print?",
          code: `const fetch = async () => new Response('{"name":"Ada"}');

async function show() {
  const response = await fetch("/api/user");
  const user = response.json();
  console.log(user.name);
}

show();`,
          options: [
            { id: "ada", text: "Ada", misconceptionId: "json-is-sync" },
            { id: "undef", text: "undefined" },
            { id: "error", text: "It throws a TypeError" },
          ],
          answerId: "undef",
          why: "user is a promise, and a promise has no property called name. The second await is missing.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "status",
      title: "Why 404 is not an error",
      simpler:
        "You call a shop and ask for a book. \"We don't have it\" is an answer. The call itself worked. Only if nobody picks up, the call has failed.",
      blocks: [
        {
          id: "status-1",
          type: "text",
          body: `For \`fetch\`, the question is whether an answer **arrived**, not whether you like it. It rejects when there is no usable answer: no connection, the name of the server can't be found, the browser blocked it because of CORS, or you aborted it. Then you get a \`TypeError\`, or an \`AbortError\` or \`TimeoutError\` if it was stopped.

If the server answers with 404 or 500, the request **worked**. The promise is fulfilled, and \`response.ok\` is \`false\`. \`ok\` is true for statuses from 200 to 299.

If you forget the check, you read the body of an error page as if it was your data. The bug then shows up far away, for example as "Cannot read properties of undefined".

So write one small function that checks, and use it everywhere. Give the error the status, so that the code above can react to it.`,
        },
        {
          id: "status-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const fetch = async () =>
  new Response('{"message":"No such user"}', { status: 404 });

class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.name = "HttpError";
    this.status = status;
  }
}

async function getJson(url) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new HttpError(response.status, "Request failed: " + url);
  }
  return response.json();
}

async function main() {
  const response = await fetch("/api/user/99");
  console.log("no error, ok is", response.ok);

  await getJson("/api/user/99").catch((err) => console.log(err.name, err.status));
}

main();`,
          output: ["no error, ok is false", "HttpError 404"],
        },
        {
          id: "status-case",
          type: "realCase",
          title: "\"Saved\" for a week, and nothing was saved",
          situation: "A form sends its data with fetch inside try/catch. If nothing is thrown, it shows \"Saved\".",
          problem: "After a change on the server, every request was answered with 500. For a week, users saw \"Saved\" and lost their work.",
          cause: "A 500 doesn't reject the promise, so the catch never ran. Nobody checked response.ok.",
          fix: "All requests go through one function that checks response.ok and throws. The form shows an error and keeps what the user typed.",
        },
        {
          id: "q-404",
          type: "question",
          ideaId: "ok-check",
          kind: "predict",
          prompt: "What does this print?",
          code: `const fetch = async () => new Response("oops", { status: 500 });

fetch("/api/data")
  .then(() => console.log("then"))
  .catch(() => console.log("catch"));`,
          options: [
            { id: "catch", text: "catch", misconceptionId: "rejects-on-404" },
            { id: "then", text: "then" },
            { id: "both", text: "then, catch" },
          ],
          answerId: "then",
          why: "An answer with status 500 arrived, so the promise is fulfilled. You have to look at response.ok.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "kinds",
      title: "Three kinds of failure",
      simpler:
        "Nobody answers. Someone answers with no. Someone answers with something you don't understand. Each of these needs a different reaction.",
      blocks: [
        {
          id: "kinds-1",
          type: "text",
          body: `If you treat all errors the same, the user gets "Something went wrong" and can't do anything. Ask what **kind** of failure it is.

| Failure | How you notice | What helps |
| --- | --- | --- |
| **No answer** | fetch rejects | "Check your connection", try again |
| **400, 422** | status | Show what is wrong with the input |
| **401** | status | Ask the user to log in |
| **403** | status | Say that it isn't allowed; trying again is useless |
| **404** | status | Say that it doesn't exist |
| **429** | status | Wait, then try again |
| **500, 503** | status | It's the server's fault; try later |
| **Bad data** | json() rejects, or fields are missing | Log it: somebody has to fix it |

The last one is easy to forget. A status of 200 doesn't guarantee that the body is what you expect. A proxy may send an HTML page, or a field may have been renamed. At the border of your program, **check the shape** of the data, for example with Zod.

Never show the server's raw error to the user. It may reveal details, and it rarely helps.`,
        },
        {
          id: "kinds-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const messageFor = (err) => {
  if (err.name === "TypeError") return "Check your connection.";
  if (err.status === 401) return "Please log in.";
  if (err.status === 404) return "This doesn't exist.";
  if (err.status >= 500) return "Our server has a problem. Try later.";
  return "Something went wrong.";
};

console.log(messageFor(new TypeError("Failed to fetch")));
console.log(messageFor({ status: 404 }));
console.log(messageFor({ status: 503 }));`,
          output: ["Check your connection.", "This doesn't exist.", "Our server has a problem. Try later."],
        },
        {
          id: "q-kinds",
          type: "question",
          ideaId: "kinds",
          kind: "choice",
          prompt: "A request is answered with 403. What should the app do?",
          options: [
            { id: "retry", text: "Send it again a few times", misconceptionId: "retry-everything" },
            { id: "tell", text: "Tell the user that they aren't allowed to do this" },
            { id: "connection", text: "Ask the user to check the connection" },
            { id: "empty", text: "Show an empty list" },
          ],
          answerId: "tell",
          why: "403 means the server understood and refused. Repeating doesn't change that, and an empty list would be wrong information.",
          difficulty: 1,
        },
        {
          id: "q-html",
          type: "question",
          ideaId: "kinds",
          kind: "choice",
          prompt: "`response.ok` is true, but `response.json()` fails with \"Unexpected token '<'\". What is the most likely reason?",
          options: [
            { id: "offline", text: "The user is offline" },
            { id: "html", text: "The server sent an HTML page instead of JSON" },
            { id: "slow", text: "The answer was too slow" },
          ],
          answerId: "html",
          why: "HTML starts with <. Often the address is wrong and the server sends its start page with status 200.",
          difficulty: 2,
        },
      ],
    },
    {
      id: "states",
      title: "What the user sees",
      simpler:
        "Think of a waiter. \"It's coming\", \"We're out of it\", \"You haven't ordered anything\", and \"Here it is\" are four different things. Silence is the worst answer.",
      blocks: [
        {
          id: "states-1",
          type: "text",
          body: `A request is not just success or failure. On the screen there are at least **four states**:

- **Loading**: say that something is happening. For very short waits, show nothing, or it will flicker.
- **Error**: say what happened and what the user can do. Offer "Try again" when it makes sense.
- **Empty**: it worked, but there is nothing. That isn't an error. Say what the user can do first.
- **Success**: show the data.

Many bugs come from mixing them up: a spinner that never ends because the error path forgot to hide it, or "No orders yet" shown while loading or after an error.

Keep **one** value for the state, not three booleans. With \`loading\`, \`error\` and \`data\` as separate values, there are combinations that make no sense, such as loading and error together.`,
        },
        {
          id: "states-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `async function load(request) {
  try {
    const items = await request();
    return items.length === 0 ? { status: "empty" } : { status: "success", items };
  } catch (err) {
    return { status: "error", message: err.message };
  }
}

async function main() {
  console.log((await load(async () => ["a", "b"])).status);
  console.log((await load(async () => [])).status);
  console.log((await load(async () => { throw new Error("offline"); })).status);
}

main();`,
          output: ["success", "empty", "error"],
        },
        {
          id: "states-case",
          type: "realCase",
          title: "The spinner that never stopped",
          situation: "A page sets loading to true, loads the data and then sets loading to false on the next line.",
          problem: "When the connection broke, users looked at the spinner until they closed the tab.",
          cause: "The await threw an error, so the line that turned the spinner off was skipped.",
          fix: "Turn it off in `finally`, which runs in both cases, and show an error with a \"Try again\" button. Or use one state value, as above.",
        },
        {
          id: "q-states",
          type: "question",
          ideaId: "ui-states",
          kind: "choice",
          prompt: "The request failed, and the page shows \"You have no orders yet\". What is wrong?",
          options: [
            { id: "nothing", text: "Nothing: there are no orders to show" },
            { id: "mixed", text: "The error state is shown as the empty state" },
            { id: "loading", text: "It should show a spinner until it works" },
          ],
          answerId: "mixed",
          why: "The app doesn't know whether there are orders. Saying there are none is wrong, and it can scare a customer.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "stop",
      title: "Timeouts, cancelling and trying again",
      simpler:
        "Don't wait forever. Hang up when it takes too long or when you no longer need the answer. And call again only if it can't do any harm.",
      blocks: [
        {
          id: "stop-1",
          type: "text",
          body: `\`fetch\` has no time limit of its own that you can rely on. A server that never answers can keep your user waiting for minutes.

An \`AbortSignal\` stops a request. \`AbortSignal.timeout(5000)\` does it after five seconds: \`fetch(url, { signal: AbortSignal.timeout(5000) })\`. To stop it yourself, make an \`AbortController\`, pass its \`signal\`, and call \`abort()\`, for example when the user leaves the page or types something new. The promise is then rejected with an \`AbortError\`. That isn't a failure, so don't show it to the user.

**Trying again** helps with failures that pass: no connection, 429, 503. Wait a bit longer each time (**backoff**), add some randomness, and stop after a few attempts. Otherwise thousands of clients come back at the same moment and bring the server down again.

But only repeat what is **safe to repeat**. Reading with GET is. A POST that creates an order may have worked, even though the answer was lost. For those, send an **idempotency key**: the server recognises the second request and doesn't do it twice.`,
        },
        {
          id: "stop-code",
          type: "code",
          lang: "js",
          runnable: true,
          source: `const wait = (ms) => new Promise((r) => setTimeout(r, ms));

async function retry(work, attempts = 3) {
  for (let i = 1; ; i++) {
    try {
      return await work();
    } catch (err) {
      if (i === attempts) throw err;
      console.log("attempt", i, "failed");
      await wait(10 * 2 ** i);
    }
  }
}

let calls = 0;
const flaky = async () => {
  calls++;
  if (calls < 3) throw new Error("503");
  return "data";
};

retry(flaky).then((v) => console.log("got", v));`,
          output: ["attempt 1 failed", "attempt 2 failed", "got data"],
        },
        {
          id: "q-retry",
          type: "question",
          ideaId: "timeouts",
          kind: "choice",
          prompt: "Which request is **dangerous** to send again automatically?",
          options: [
            { id: "get", text: "GET /products" },
            { id: "post", text: "POST /payments without an idempotency key" },
            { id: "search", text: "GET /search?q=react" },
            { id: "any", text: "None: a failed request did nothing", misconceptionId: "retry-everything" },
          ],
          answerId: "post",
          why: "The payment may have gone through while only the answer was lost. A second one could charge the customer twice.",
          difficulty: 2,
        },
        {
          id: "q-abort",
          type: "question",
          ideaId: "timeouts",
          kind: "choice",
          prompt: "The user leaves a page, and its request is aborted. What should the app do with the AbortError?",
          options: [
            { id: "show", text: "Show an error message" },
            { id: "ignore", text: "Ignore it, because stopping was intended" },
            { id: "again", text: "Send the request again", misconceptionId: "retry-everything" },
          ],
          answerId: "ignore",
          why: "Nothing failed. The app itself decided that the answer is no longer needed.",
          difficulty: 1,
        },
      ],
    },
    {
      id: "mistakes",
      title: "Common mistakes",
      simpler:
        "Check the answer before you read it. Read it once. Say something in every state. And don't repeat what could hurt.",
      blocks: [
        {
          id: "mistakes-1",
          type: "text",
          body: `**Reading the body twice.** For example once for a log and once for the data. Keep the result in a variable, or use \`response.clone()\`.

**Forgetting Content-Type when sending JSON.** Many servers then don't parse the body and see an empty request.

**Putting values into the address by hand.** A space, \`&\` or \`#\` breaks it. Use \`URLSearchParams\` or \`encodeURIComponent\`.

**Keeping secrets in browser code.** Everything the browser sends can be read by the user. A secret API key belongs on your server.

**Catching everything in every function.** Let errors pass up to the place that can show them.`,
        },
        {
          id: "mistakes-compare",
          type: "compare",
          wrong: `const res = await fetch("/search?q=" + text);
const data = await res.json();
show(data.items);`,
          right: `const query = new URLSearchParams({ q: text });
const res = await fetch("/search?" + query, {
  signal: AbortSignal.timeout(5000),
});
if (!res.ok) throw new HttpError(res.status, "Search failed");
const data = await res.json();
show(data.items);`,
          why: "The right version is safe for any text, doesn't wait forever, and never reads an error page as data.",
        },
        {
          id: "q-body",
          type: "question",
          ideaId: "two-steps",
          kind: "predict",
          prompt: "What does this print?",
          code: `async function main() {
  const res = new Response("hello");
  console.log(await res.text());
  await res.text().catch(() => console.log("error"));
}

main();`,
          options: [
            { id: "twice", text: "hello, hello", misconceptionId: "body-twice" },
            { id: "error", text: "hello, error" },
            { id: "once", text: "hello" },
          ],
          answerId: "error",
          why: "The body can be read only once. The second attempt is rejected.",
          difficulty: 2,
        },
      ],
    },
  ],

  whenToUse: {
    use: [
      "fetch with one shared function that checks response.ok",
      "An AbortSignal for time limits and outdated requests",
      "Retries with backoff for reads that fail for a moment",
    ],
    avoid: [
      "Repeating payments or orders without an idempotency key",
      "One \"Something went wrong\" for every failure",
      "Trusting the shape of data from outside without checking",
    ],
  },

  explain: {
    prompt: "A request to your API is answered with 500. What does fetch do, what must your code do, and what should the user see?",
    modelAnswer:
      "fetch is fulfilled, because an answer arrived. It rejects only without a usable answer, like a broken connection. So I check response.ok and throw an error with the status before reading the body, which is a second asynchronous step. A 500 is the server's fault, unlike a network failure or bad data, so the user sees an error state with a clear message and a way to try again, not an empty list or an endless spinner. I repeat the request automatically only if that is safe, and I use an AbortSignal so it can't wait forever.",
  },

  reviewQuestions: [
    {
      id: "r-reject",
      ideaId: "ok-check",
      kind: "choice",
      prompt: "When does `fetch` reject?",
      options: [
        { id: "status", text: "For every status of 400 and above", misconceptionId: "rejects-on-404" },
        { id: "no-answer", text: "When no usable answer arrives or it is aborted" },
        { id: "empty", text: "When the body is empty" },
      ],
      answerId: "no-answer",
      why: "Any answer fulfills it, whatever the status.",
      difficulty: 1,
    },
    {
      id: "r-range",
      ideaId: "ok-check",
      kind: "choice",
      prompt: "For which status is `response.ok` true?",
      options: [
        { id: "304", text: "304" },
        { id: "201", text: "201" },
        { id: "404", text: "404" },
      ],
      answerId: "201",
      why: "ok is true from 200 to 299.",
      difficulty: 1,
    },
    {
      id: "r-backoff",
      ideaId: "timeouts",
      kind: "choice",
      prompt: "Why should each retry wait a bit longer, with some randomness?",
      options: [
        { id: "order", text: "So that the answers arrive in order" },
        { id: "flood", text: "So that many clients don't hit a weak server again at the same moment" },
        { id: "cache", text: "So that the browser can cache the answer" },
      ],
      answerId: "flood",
      why: "Without it, all clients come back together and can bring the server down again.",
      difficulty: 2,
    },
  ],

  summary: [
    "fetch, then the body: two awaits, and the body can be read once",
    "404 and 500 don't reject: check response.ok",
    "No answer, an error status and bad data need different reactions",
    "Show loading, error, empty and success, each for what it is",
    "Set a time limit, and repeat only what is safe to repeat",
  ],

  sources: [
    { label: "MDN: Using the Fetch API", url: "https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Using_Fetch" },
    { label: "MDN: Response.ok", url: "https://developer.mozilla.org/en-US/docs/Web/API/Response/ok" },
    { label: "MDN: AbortSignal.timeout()", url: "https://developer.mozilla.org/en-US/docs/Web/API/AbortSignal/timeout_static" },
    { label: "MDN: HTTP response status codes", url: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Status" },
  ],
};
