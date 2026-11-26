// Same shape as js-closures.js (learn_topics). Examples use a fake request, so they work without a network.
import { compare, jsx, picture, question, realCase, reviewQuestion, text } from "@/features/learn/lib/topicBlocks.js";

export default {
  topicId: "react-fetching",
  title: "Fetching data in React",
  mystery: "You switch quickly between two users and see the wrong one. Why?",
  minutes: 30,
  lang: "jsx",
  requires: ["react-effects", "js-fetch", "js-promise-combinators"],

  shortAnswer:
    "To load data when a component is on the screen, you use an effect with a cleanup that ignores outdated answers. You show loading, error, empty and success. In larger apps a library does this for you.",

  ideas: [
    { id: "effect-fetch", text: "Loading for what is on the screen is an effect; the cleanup ignores late answers" },
    { id: "states", text: "Loading, error, empty and success are separate states" },
    { id: "race", text: "Without cleanup, an older answer can overwrite a newer one" },
    { id: "server-state", text: "Server data is a copy that gets old, which is what query libraries handle" },
  ],

  misconceptions: [
    {
      id: "async-effect",
      belief: "you can make the effect function itself async",
      correction: "An async function returns a promise, but React expects a cleanup function. Define an async function inside and call it.",
    },
    {
      id: "fetch-in-render",
      belief: "you can call fetch directly in the body of a component",
      correction: "It would send a request at each render, and setting state from it causes the next render.",
    },
    {
      id: "strict-double",
      belief: "two requests in development mean that your effect is wrong",
      correction: "Strict Mode runs it twice to test the cleanup. In production it is sent once.",
    },
  ],

  sections: [
    {
      id: "pattern",
      title: "The basic pattern",
      simpler: "When the component comes onto the screen, it orders its data. When it leaves, it says: never mind. And if it wants something else, it says never mind to the first order.",
      blocks: [
        text(
          "pattern-1",
          `Data that a component needs **because it is on the screen** is loaded in an effect. (Data that is loaded because of a **click** is loaded in the handler.)

\`\`\`jsx
useEffect(() => {
  let ignore = false;

  async function load() {
    const user = await getUser(id);
    if (!ignore) setUser(user);
  }
  load();

  return () => { ignore = true; };
}, [id]);
\`\`\`

Three details matter.

**The effect itself isn't async.** It has to return a cleanup, and an async function returns a promise. So the async function is **inside**.

**The list has the id.** Another id, another request.

**ignore** belongs to one run of the effect. When the id changes, the cleanup sets it, and the old answer isn't used any more.

Never call fetch in the **body** of a component: it would run at each render.`,
        ),
        jsx(
          "pattern-code",
          "Choose a user",
          `const users = { 1: "Ada", 2: "Bo" };
const getUser = (id) => new Promise((r) => setTimeout(() => r(users[id]), 500));

function App() {
  const [id, setId] = useState(1);
  const [user, setUser] = useState(null);

  useEffect(() => {
    let ignore = false;
    setUser(null);
    getUser(id).then((u) => { if (!ignore) setUser(u); });
    return () => { ignore = true; };
  }, [id]);

  return (
    <div>
      <button onClick={() => setId(1)}>1</button> <button onClick={() => setId(2)}>2</button>
      <p>{user ?? "Loading..."}</p>
    </div>
  );
}`,
        ),
        question(
          "q-pattern",
          "effect-fetch",
          "AI wrote `useEffect(async () => { ... }, [])`. What is wrong?",
          { nothing: ["Nothing", "async-effect"], returns: "It returns a promise, where React expects a cleanup function", await: "await isn't allowed in React" },
          "returns",
          "Put an async function inside and call it.",
          { kind: "find-bug" },
        ),
        question(
          "q-body",
          "effect-fetch",
          "What happens if you call fetch in the body of the component and set state with the answer?",
          { once: ["It loads once", "fetch-in-render"], loop: "Request, state, render, request: an endless loop", error: "React forbids it with an error" },
          "loop",
          "The body runs at each render.",
        ),
      ],
    },
    {
      id: "states",
      title: "What the user sees",
      simpler: "Waiting, something went wrong, there's nothing, here it is. Four signs for four situations. Don't hang up two at once.",
      blocks: [
        text(
          "states-1",
          `A request is more than its data. Show **loading**, **error**, **empty** and **success**, each in its own way.

Three booleans lead to nonsense such as loading and error together. **One** state with a status can't contradict itself:

\`\`\`jsx
const [state, setState] = useState({ status: "loading" });
// { status: "error", message } or { status: "success", items }
\`\`\`

Check \`response.ok\`: fetch doesn't reject for 404 or 500.

Offer **Try again** after an error. Keep old data on the screen while reloading, instead of replacing it with a spinner. And don't show a spinner for very short waits, or the page flickers. A **skeleton** in the shape of the content is calmer than a spinner, because nothing jumps.`,
        ),
        picture("states-pic", "request-states", "Loading leads to error, empty or success"),
        jsx(
          "states-code",
          "Try all three answers",
          `const load = (kind) => new Promise((resolve, reject) => setTimeout(() => {
  if (kind === "error") reject(new Error("The server has a problem"));
  else resolve(kind === "empty" ? [] : ["Bread", "Milk"]);
}, 500));

function App() {
  const [kind, setKind] = useState("items");
  const [state, setState] = useState({ status: "loading" });

  useEffect(() => {
    let ignore = false;
    setState({ status: "loading" });
    load(kind).then(
      (items) => { if (!ignore) setState({ status: "success", items }); },
      (err) => { if (!ignore) setState({ status: "error", message: err.message }); },
    );
    return () => { ignore = true; };
  }, [kind]);

  return (
    <div>
      {["items", "empty", "error"].map((k) => <button key={k} onClick={() => setKind(k)}>{k}</button>)}
      {state.status === "loading" && <p>Loading...</p>}
      {state.status === "error" && <p role="alert">{state.message}</p>}
      {state.status === "success" && state.items.length === 0 && <p>Nothing here yet.</p>}
      {state.status === "success" && <ul>{state.items.map((i) => <li key={i}>{i}</li>)}</ul>}
    </div>
  );
}`,
        ),
        question(
          "q-states",
          "states",
          "The request failed, and the page says \"No orders yet\". What is wrong?",
          { text: "Only the wording", mixed: "The error is shown as the empty state", load: "It should go on loading" },
          "mixed",
          "The app doesn't know whether there are orders, so it must not say there are none.",
        ),
      ],
    },
    {
      id: "race",
      title: "The wrong answer",
      simpler: "You asked about Ada, then about Bo. The answer about Bo comes first, then the one about Ada. If you always believe the last answer, you see Ada.",
      blocks: [
        text(
          "race-1",
          `Answers don't have to arrive in the order of the requests. If the user switches quickly, the answer to the **first** may come **last** and overwrite the second. This is a **race condition**, and the answer to the question at the top.

The **ignore** flag in the cleanup solves it. Each run of the effect has its own flag, in its own closure. When the id changes, the cleanup sets the flag of the **old** run, and its late answer is dropped.

Better still, also **stop** the old request with an \`AbortController\`: \`fetch(url, { signal })\`, and \`controller.abort()\` in the cleanup. It saves data. Then ignore the \`AbortError\`, because nothing failed.

Such bugs are hard to see on a fast computer. Use the **throttling** in DevTools, or a fake request with random delays.`,
        ),
        jsx(
          "race-code",
          "Click Ada, then quickly Bo: the first line is wrong",
          `const delays = { Ada: 1200, Bo: 200 };
const getInfo = (name) => new Promise((r) => setTimeout(() => r("info about " + name), delays[name]));

function App() {
  const [name, setName] = useState("Bo");
  const [unsafe, setUnsafe] = useState("");
  const [safe, setSafe] = useState("");

  useEffect(() => {
    let ignore = false;
    getInfo(name).then((info) => {
      setUnsafe(info);
      if (!ignore) setSafe(info);
    });
    return () => { ignore = true; };
  }, [name]);

  return (
    <div>
      <button onClick={() => setName("Ada")}>Ada (slow)</button>{" "}
      <button onClick={() => setName("Bo")}>Bo (fast)</button>
      <p>Chosen: {name}</p>
      <p>Without cleanup: {unsafe}</p>
      <p>With cleanup: {safe}</p>
    </div>
  );
}`,
        ),
        realCase(
          "race-case",
          "The results of somebody else's test",
          "Teachers choose a student from a list and see the results. The effect has no cleanup.",
          "A teacher clicked through the list quickly and gave a student the mark of another.",
          "A slow answer for an earlier student arrived last and was shown under the new name.",
          "The cleanup ignores old answers, and the page shows the student's name from the answer itself.",
        ),
        question(
          "q-race",
          "race",
          "Why does each run of the effect need its **own** ignore flag?",
          { memory: "To save memory", old: "So that only the old run's answer is ignored, and the new one is used", react: "React requires it" },
          "old",
          "A shared flag would also block the new answer, or be reset and let the old one through.",
          { difficulty: 2 },
        ),
        question(
          "q-abort",
          "race",
          "A request was stopped with abort() because the user switched. What should the page show?",
          { error: "An error", nothing: "Nothing special: stopping was intended", retry: "A retry button" },
          "nothing",
          "Nothing failed. The new request is already running.",
        ),
      ],
    },
    {
      id: "library",
      title: "Server data and libraries",
      simpler: "Data from the server is like milk: it has a date. Someone has to check whether it's still good and get new milk. You can do that yourself, or have it delivered.",
      blocks: [
        text(
          "library-1",
          `The pattern works, but it lacks a lot: no **cache**, so going back loads everything again. Two components that need the same data send two requests. There is no reloading when the data is old, and no retry.

Data from a server isn't like other state. You have only a **copy**, and it gets old. It's called **server state**.

Libraries such as **TanStack Query** are made for it:

\`\`\`jsx
const { data, isPending, error } = useQuery({
  queryKey: ["user", id],
  queryFn: () => getUser(id),
});
\`\`\`

It caches by the key, joins equal requests, ignores outdated answers, reloads and retries. Frameworks such as Next.js load data on the server, before the page arrives.

Learn the pattern by hand, so that you know what the library does for you. In a real app, use one. You'll do that in layer 8.`,
        ),
        question(
          "q-library",
          "server-state",
          "Three components on a page need the same user. What does a query library do?",
          { three: "It sends three requests", one: "It sends one and shares the result", none: "It loads the user only at the start of the app" },
          "one",
          "Equal keys are joined, and the result comes from the cache.",
        ),
        realCase(
          "library-case",
          "Eleven requests for one page",
          "Each component loads what it needs in its own effect, also the current user.",
          "The start page sent eleven requests for the same user, and after saving, five places showed the old name.",
          "Every component had its own copy of the server's data.",
          "A query library with the key `[\"me\"]`: one request, and after saving, that key is marked as outdated and loaded again everywhere.",
        ),
        compare(
          "library-compare",
          `useEffect(() => {
  fetch("/api/user/" + id)
    .then((r) => r.json())
    .then(setUser);
}, [id]);`,
          `useEffect(() => {
  const controller = new AbortController();
  getJson("/api/user/" + id, { signal: controller.signal })
    .then((user) => setState({ status: "success", user }))
    .catch((err) => {
      if (err.name !== "AbortError") setState({ status: "error" });
    });
  return () => controller.abort();
}, [id]);`,
          "The left side has no check of the status, no error state and no cleanup. Here getJson checks response.ok and throws.",
        ),
      ],
    },
  ],

  whenToUse: {
    use: ["An effect with cleanup for what is on the screen", "The handler for what a click causes", "A query library in real apps"],
    avoid: ["fetch in the body of a component", "An async function as the effect", "One boolean per state"],
  },

  explain: {
    prompt: "How do you load a user by id in a component, what does the user of your page see meanwhile, and how do you avoid showing the wrong one?",
    modelAnswer:
      "I load it in an effect with the id in the list. The effect isn't async itself but calls an async function inside. While loading I show a loading state, then error, empty or success, kept in one status so that they can't contradict each other. Answers can arrive in another order, so the cleanup sets an ignore flag or aborts the request, and a late answer can't overwrite a newer one. Data from the server is a copy that gets old, so in a real app I'd use a library such as TanStack Query.",
  },

  reviewQuestions: [
    reviewQuestion("r-double", "effect-fetch", "In development, the request is sent twice. Why?", { bug: ["Your effect is wrong", "strict-double"], strict: "Strict Mode runs effects twice to test the cleanup", net: "The network repeats it" }, "strict", "In production it happens once."),
    reviewQuestion("r-ok", "states", "fetch gets a 500. What has to happen for the error state to appear?", { auto: "Nothing, fetch rejects by itself", check: "Your code checks response.ok and throws", reload: "The page reloads" }, "check", "fetch fulfills for every answer."),
    reviewQuestion("r-server", "server-state", "How is server data different from a menu that is open or closed?", { same: "It isn't different", copy: "You only have a copy, and it can get old", big: "It is bigger" }, "copy", "The truth is on the server, and others can change it."),
  ],

  summary: [
    "Effect with an inner async function and a cleanup",
    "One status: loading, error, empty, success",
    "Ignore or abort outdated requests",
    "Server data gets old: libraries help",
  ],

  sources: [
    { label: "React: Fetching data with effects", url: "https://react.dev/reference/react/useEffect#fetching-data-with-effects" },
    { label: "React: You might not need an effect", url: "https://react.dev/learn/you-might-not-need-an-effect#fetching-data" },
    { label: "TanStack Query: Overview", url: "https://tanstack.com/query/latest/docs/framework/react/overview" },
  ],
};
