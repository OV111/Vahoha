import { describe, it, expect, vi, beforeEach } from "vitest";

const apiFetch = vi.fn();
// A plain flag, not a mock that throws: vitest fails a test whose mock throws.
let offline = false;
vi.mock("../../../constants/api", () => ({
  API_BASE_URL: "http://api.test",
  authHeaders: () => ({ Authorization: "Bearer t" }),
  apiFetch: (...args) => {
    if (offline) throw new TypeError("Failed to fetch");
    return apiFetch(...args);
  },
}));

const { startCheck, submitAnswers } = await import("./understandingApi");

const reply = (status, json) => Promise.resolve({ ok: status < 400, status, json: () => Promise.resolve(json) });

beforeEach(() => {
  apiFetch.mockReset();
  offline = false;
});

describe("understandingApi", () => {
  it("asks for questions about one map with a POST and the auth header", async () => {
    const check = { checkId: "c1", questions: [{ id: "q1", q: "Why Redis?", focus: ["cache"] }] };
    apiFetch.mockReturnValue(reply(200, { success: true, data: check }));
    await expect(startCheck("m1")).resolves.toEqual(check);

    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/system-maps/m1/questions");
    expect(init.method).toBe("POST");
    expect(init.headers).toMatchObject({ Authorization: "Bearer t" });
  });

  it("sends the answers as JSON to the check", async () => {
    const graded = { results: [{ id: "q1", score: 2, feedback: "Good", missed: [], modelAnswer: "…" }], passed: true };
    apiFetch.mockReturnValue(reply(200, { success: true, data: graded }));
    await expect(submitAnswers("c1", [{ id: "q1", text: "Because reads are hot." }])).resolves.toEqual(graded);

    const [url, init] = apiFetch.mock.calls[0];
    expect(url).toBe("http://api.test/api/system-maps/checks/c1/answers");
    expect(init.headers).toMatchObject({ "Content-Type": "application/json" });
    expect(JSON.parse(init.body)).toEqual({ answers: [{ id: "q1", text: "Because reads are hot." }] });
  });

  it("throws the server's message with the status, so the card can react", async () => {
    apiFetch.mockReturnValue(reply(422, { success: false, message: "Add at least 3 parts first." }));
    await expect(startCheck("m1")).rejects.toMatchObject({ message: "Add at least 3 parts first.", status: 422 });

    apiFetch.mockReturnValue(reply(503, null));
    await expect(submitAnswers("c1", [])).rejects.toMatchObject({ message: "Couldn't grade your answers. Try again.", status: 503 });
  });

  it("explains a network failure in plain words", async () => {
    offline = true;
    await expect(startCheck("m1")).rejects.toThrow("Couldn't reach the server");
  });
});
