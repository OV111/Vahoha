// Pure logic for a system lab: builds the program the sandbox runs, reads the
// trace it prints, and grades it. No React, so it is tested from plain Node.
//
// The learner's code is the body of a "server". The harness boots it, sends
// requests, restarts it (a new boot, a kept disk) and prints one `@@{json}`
// line per event. The canvas replays those lines; the checks read them.

const TRACE_PREFIX = "@@";

export const URLS = { a: "https://example.com/a", b: "https://example.com/b", c: "https://example.com/c" };

/**
 * @param {string} serverCode  body of the learner's server; must `return { shorten, resolve }`
 * @param {{ diskWired: boolean }} canvas
 */
export function buildScenario(serverCode, { diskWired }) {
  return `
const __stored = {};
const __emit = (e) => console.log(${JSON.stringify(TRACE_PREFIX)} + JSON.stringify(e));
const __disk = ${diskWired} ? {
  get(key) {
    __emit({ t: "disk.read", key });
    return __stored[key] === undefined ? undefined : JSON.parse(__stored[key]);
  },
  set(key, value) {
    __stored[key] = JSON.stringify(value);
    __emit({ t: "disk.write", key, size: Object.keys(__stored).length });
  },
} : new Proxy({}, {
  get() {
    throw new Error("The server has no wire to the disk. Drag from Server to Disk on the canvas first.");
  },
});
const __server = (disk) => {
${serverCode}
};
let __app;
const __start = () => {
  __emit({ t: "start" });
  __app = __server(__disk);
};
const __call = async (name, arg) => {
  __emit({ t: "req", name, arg });
  const out = await __app[name](arg);
  __emit({ t: "res", name, out });
  return out;
};
try {
  __start();
  const a = await __call("shorten", ${JSON.stringify(URLS.a)});
  const b = await __call("shorten", ${JSON.stringify(URLS.b)});
  __emit({ t: "restart" });
  __start();
  const ra = await __call("resolve", a);
  const rb = await __call("resolve", b);
  const c = await __call("shorten", ${JSON.stringify(URLS.c)});
  const rc = await __call("resolve", c);
  const ra2 = await __call("resolve", a);
  __emit({ t: "result", a, b, c, ra, rb, rc, ra2 });
} catch (err) {
  __emit({ t: "crash", message: String(err && err.message ? err.message : err) });
}
`;
}

/** Splits runner output into trace events and the learner's own console lines. */
export function parseTrace(lines) {
  const events = [];
  const logs = [];
  for (const line of lines) {
    if (line.text.startsWith(TRACE_PREFIX)) events.push(JSON.parse(line.text.slice(TRACE_PREFIX.length)));
    else logs.push(line);
  }
  return { events, logs };
}

const shown = (v) => JSON.stringify(v) ?? "undefined";

/** @returns {{ name: string, ok: boolean, message?: string }[]} */
export function gradeRun(events) {
  const crash = events.find((e) => e.t === "crash");
  const result = events.find((e) => e.t === "result");

  const runs = { name: "The server runs", ok: !crash && Boolean(result), ...(crash ? { message: crash.message } : {}) };
  if (!result) {
    return [
      runs,
      { name: "Links survive a restart", ok: false, message: "The scenario did not finish." },
      { name: "New links don't overwrite old ones", ok: false, message: "The scenario did not finish." },
    ];
  }

  const survives = result.ra === URLS.a && result.rb === URLS.b;
  const noOverwrite = result.rc === URLS.c && result.ra2 === URLS.a;
  return [
    runs,
    {
      name: "Links survive a restart",
      ok: survives,
      ...(survives ? {} : { message: `After the restart, resolve(${shown(result.a)}) returned ${shown(result.ra)}, not the original link.` }),
    },
    {
      name: "New links don't overwrite old ones",
      ok: noOverwrite,
      ...(noOverwrite
        ? {}
        : { message: `After the restart a new link got code ${shown(result.c)}, and the old link now resolves to ${shown(result.ra2)}.` }),
    },
  ];
}

const tone = (text, kind = "ok") => ({ text, tone: kind });

/**
 * One replay step per trace event: which wire lights up, which nodes change
 * state, and a sentence for the caption.
 * @returns {{ edge?: string, nodes?: Record<string, {text: string, tone: string}>, label: string }[]}
 */
export function toSteps(events) {
  const steps = [];
  for (const e of events) {
    if (e.t === "start") {
      steps.push({ nodes: { server: tone("running"), memory: tone("empty", "idle") }, label: "The server starts. Its memory is empty." });
    } else if (e.t === "req") {
      steps.push({ edge: "client-server", label: `Client sends ${e.name}(${shown(e.arg)})` });
    } else if (e.t === "res") {
      steps.push({ edge: "client-server", label: `Server answers ${shown(e.out)}` });
    } else if (e.t === "disk.write") {
      steps.push({ edge: "server-disk", nodes: { disk: tone(`${e.size} saved`) }, label: `Server writes "${e.key}" to the disk` });
    } else if (e.t === "disk.read") {
      steps.push({ edge: "server-disk", label: `Server reads "${e.key}" from the disk` });
    } else if (e.t === "restart") {
      steps.push({
        nodes: { server: tone("restarted", "bad"), memory: tone("wiped", "bad") },
        label: "The server restarts. Everything in its memory is gone.",
      });
    } else if (e.t === "crash") {
      steps.push({ nodes: { server: tone("crashed", "bad") }, label: e.message });
    }
  }
  return steps;
}
