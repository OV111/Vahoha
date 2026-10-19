// Runs a lesson snippet and collects what it prints, including output from
// timers and promises that fire after the main script ends. Worker-free, so
// it can be tested from plain Node; consoleRun.worker.js wraps it.

/** Stop waiting for pending timers after this long (a forgotten setInterval). */
export const WAIT_BUDGET_MS = 3000;

function show(value) {
  if (typeof value === "string") return value;
  if (value instanceof Error) return `${value.name}: ${value.message}`;
  if (typeof value === "function") return `[Function: ${value.name || "anonymous"}]`;
  if (value === undefined) return "undefined";
  if (typeof value === "bigint") return `${value}n`;
  if (typeof value === "symbol") return value.toString();
  try {
    return JSON.stringify(value) ?? String(value);
  } catch {
    return String(value);
  }
}

/**
 * @param {string} source plain JavaScript
 * @returns {Promise<{ lines: { level: "log" | "warn" | "error", text: string, ms: number }[] }>}
 */
export async function runConsole(source) {
  const start = performance.now();
  const lines = [];
  const print = (level) => (...args) =>
    lines.push({ level, text: args.map(show).join(" "), ms: Math.round(performance.now() - start) });
  const fail = (err) => print("error")(err instanceof Error ? err : `Uncaught ${show(err)}`);

  const fakeConsole = { log: print("log"), info: print("log"), debug: print("log"), warn: print("warn"), error: print("error") };

  // Wrap timers so we know when the snippet has nothing left to run.
  const realSet = globalThis.setTimeout;
  const realClear = globalThis.clearTimeout;
  const pending = new Set();
  const guard = (fn, args) => {
    try {
      if (typeof fn === "function") fn(...args);
    } catch (err) {
      fail(err);
    }
  };
  const timers = {
    setTimeout(fn, ms, ...args) {
      const id = realSet(() => {
        pending.delete(id);
        guard(fn, args);
      }, ms);
      pending.add(id);
      return id;
    },
    clearTimeout(id) {
      pending.delete(id);
      realClear(id);
    },
    setInterval(fn, ms, ...args) {
      const id = globalThis.setInterval(() => guard(fn, args), ms);
      pending.add(id);
      return id;
    },
    clearInterval(id) {
      pending.delete(id);
      globalThis.clearInterval(id);
    },
  };

  const onRejection = (event) => {
    event.preventDefault?.();
    fail(event.reason);
  };
  globalThis.addEventListener?.("unhandledrejection", onRejection);

  try {
    // An async wrapper allows top-level await. Its synchronous part still runs
    // synchronously, so the order the snippet prints in is unchanged.
    const run = new Function(
      "console",
      "setTimeout",
      "clearTimeout",
      "setInterval",
      "clearInterval",
      `"use strict";\nreturn (async () => {\n${source}\n})();`,
    );
    await run(fakeConsole, timers.setTimeout, timers.clearTimeout, timers.setInterval, timers.clearInterval);
  } catch (err) {
    fail(err);
  }

  // Let queued work finish: wait a macrotask at a time until no timer is left.
  const tick = () => new Promise((resolve) => realSet(resolve, 0));
  while (pending.size > 0) {
    if (performance.now() - start > WAIT_BUDGET_MS) {
      print("warn")(`Stopped after ${WAIT_BUDGET_MS / 1000} s: timers were still waiting to run.`);
      for (const id of pending) timers.clearInterval(id);
      break;
    }
    await tick();
  }
  await tick(); // flush microtasks queued by the last timer

  globalThis.removeEventListener?.("unhandledrejection", onRejection);
  return { lines };
}
