import { beforeEach, describe, expect, it, vi } from "vitest";

// A plain function behind the mock: vitest 4 reports a thrown error from a reset vi.fn() as a test failure even when the code under test catches it.
const groq = vi.hoisted(() => ({ impl: null, calls: 0 }));
vi.mock("../../config/groq.js", () => ({ getGroqClient: () => ({ chat: { completions: { create: (...args) => { groq.calls += 1; return groq.impl(...args); } } } }) }));

const { groqChat, estimateCallTokens } = await import("../../services/groqChat.js");
const { createGroqGate, GroqBusyError } = await import("../../services/groqGate.js");

const messages = [{ role: "user", content: "hello" }];
const chunks = async function* (items, failWith) {
  for (const item of items) yield item;
  if (failWith) throw failWith;
};

// The rejection as a value, so the test reads the error itself.
const failure = (promise) => promise.then(() => new Error("did not reject"), (err) => err);

beforeEach(() => Object.assign(groq, { impl: null, calls: 0 }));

describe("groqChat", () => {
  it("passes a normal completion through and frees its slot with the reported usage", async () => {
    const gate = createGroqGate({ tokensPerMinute: 10_000, maxConcurrent: 1 });
    groq.impl = async () => ({ choices: [], usage: { total_tokens: 40 } });

    const result = await groqChat({ model: "m", messages, max_tokens: 100 }, { gate });

    expect(result.usage.total_tokens).toBe(40);
    expect(gate.snapshot().active).toBe(0);
  });

  it("holds the slot for the whole stream and frees it after the last chunk", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    groq.impl = async () => chunks([{ n: 1 }, { n: 2 }]);

    const stream = await groqChat({ model: "m", messages, stream: true }, { gate });
    expect(gate.snapshot().active).toBe(1);
    const seen = [];
    for await (const chunk of stream) seen.push(chunk.n);

    expect(seen).toEqual([1, 2]);
    expect(gate.snapshot().active).toBe(0);
  });

  it("frees the slot when the reader stops early", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    groq.impl = async () => chunks([{ n: 1 }, { n: 2 }, { n: 3 }]);

    const stream = await groqChat({ model: "m", messages, stream: true }, { gate });
    for await (const chunk of stream) if (chunk.n === 1) break;

    expect(gate.snapshot().active).toBe(0);
  });

  it("frees the slot when the stream fails midway, and pauses the gate on a 429", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    groq.impl = async () => chunks([{ n: 1 }], Object.assign(new Error("rate"), { status: 429, headers: { "retry-after": "7" } }));

    const stream = await groqChat({ model: "m", messages, stream: true }, { gate });
    await expect((async () => { for await (const chunk of stream) void chunk; })()).rejects.toThrow("rate");

    expect(gate.snapshot().active).toBe(0);
    expect(gate.snapshot().pausedMs).toBeGreaterThan(6_000);
  });

  it("frees the slot and pauses the gate when the call itself is refused with a 429", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    groq.impl = () => { throw Object.assign(new Error("rate"), { status: 429 }); };

    expect((await failure(groqChat({ model: "m", messages }, { gate }))).message).toBe("rate");

    expect(gate.snapshot().active).toBe(0);
    expect(gate.snapshot().pausedMs).toBeGreaterThan(0); // default retry-after when Groq sends none
  });

  it("does not pause for errors that are not rate limits", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    groq.impl = () => { throw Object.assign(new Error("bad request"), { status: 400 }); };

    expect((await failure(groqChat({ model: "m", messages }, { gate }))).message).toBe("bad request");

    expect(gate.snapshot().pausedMs).toBe(0);
  });

  it("a background call is dropped with GroqBusyError when no slot is free, and never reaches Groq", async () => {
    const gate = createGroqGate({ maxConcurrent: 1 });
    await gate.acquire({ cost: 1 }); // the slot stays taken

    await expect(groqChat({ model: "m", messages }, { gate, priority: "background" })).rejects.toBeInstanceOf(GroqBusyError);
    expect(groq.calls).toBe(0);
  });
});

describe("estimateCallTokens", () => {
  it("counts the messages, the tool definitions and the output it may write", () => {
    const small = estimateCallTokens({ messages, max_tokens: 100 });
    const withTools = estimateCallTokens({ messages, tools: [{ type: "function", function: { name: "x".repeat(700) } }], max_tokens: 100 });
    expect(withTools).toBeGreaterThan(small + 150);
    expect(estimateCallTokens({ messages })).toBeGreaterThan(estimateCallTokens({ messages, max_tokens: 100 }));
  });

  it("copes with assistant messages that have null content and tool calls", () => {
    const history = [{ role: "assistant", content: null, tool_calls: [{ id: "1", type: "function", function: { name: "f", arguments: "{}" } }] }];
    expect(estimateCallTokens({ messages: history })).toBeGreaterThan(0);
  });
});
