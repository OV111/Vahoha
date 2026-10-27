import { describe, it, expect } from "vitest";
import { runConsole } from "../../learn/lib/consoleRun.js";
import { STAGES } from "./stages.js";
import { buildScenario, gradeRun, parseTrace, toSteps } from "./runScenario.js";

const stage = STAGES["url-shortener-1"];

const play = async (code, diskWired) => {
  const { lines } = await runConsole(buildScenario(code, { diskWired }));
  const { events, logs } = parseTrace(lines);
  return { events, logs, checks: gradeRun(events) };
};

const onDisk = `
function shorten(url) {
  const next = disk.get("next") ?? 0;
  const links = disk.get("links") ?? {};
  const code = next.toString(36);
  links[code] = url;
  disk.set("next", next + 1);
  disk.set("links", links);
  return code;
}
function resolve(code) {
  return (disk.get("links") ?? {})[code];
}
return { shorten, resolve };
`;

// Links are saved, but the code counter is a plain variable: it restarts at 0.
const counterInMemory = `
let next = 0;
function shorten(url) {
  const links = disk.get("links") ?? {};
  const code = (next++).toString(36);
  links[code] = url;
  disk.set("links", links);
  return code;
}
function resolve(code) {
  return (disk.get("links") ?? {})[code];
}
return { shorten, resolve };
`;

const failed = (checks) => checks.filter((c) => !c.ok).map((c) => c.name);

describe("url-shortener-1", () => {
  it("fails both persistence checks on the starter code", async () => {
    const { checks } = await play(stage.starter, true);
    expect(failed(checks)).toEqual(["Links survive a restart", "New links don't overwrite old ones"]);
  });

  it("passes when everything lives on the disk", async () => {
    const { checks } = await play(onDisk, true);
    expect(failed(checks)).toEqual([]);
  });

  it("catches links on disk but a counter in memory", async () => {
    const { checks } = await play(counterInMemory, true);
    expect(failed(checks)).toEqual(["New links don't overwrite old ones"]);
  });

  it("explains the missing wire instead of a vague TypeError", async () => {
    const { checks } = await play(onDisk, false);
    expect(checks[0]).toMatchObject({ name: "The server runs", ok: false });
    expect(checks[0].message).toMatch(/no wire to the disk/);
  });

  it("keeps the learner's own console output out of the trace", async () => {
    const { logs, events } = await play(`console.log("hi");\n${onDisk}`, true);
    // The server body runs once per boot, and the scenario boots twice.
    expect(logs.map((l) => l.text)).toEqual(["hi", "hi"]);
    expect(events.some((e) => e.t === "restart")).toBe(true);
  });

  it("replays a restart as a wiped memory", async () => {
    const { events } = await play(stage.starter, true);
    const wiped = toSteps(events).find((s) => s.nodes?.memory?.text === "wiped");
    expect(wiped?.nodes.server.tone).toBe("bad");
  });
});
