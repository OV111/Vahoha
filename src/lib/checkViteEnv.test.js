import { describe, it, expect } from "vitest";
import { checkViteEnv, formatEnvErrors } from "../../scripts/checkViteEnv.js";

// A complete, valid production environment; each test breaks one thing.
const valid = {
  VITE_API_BASE_URL: "https://api.example.com",
  VITE_WS_URL: "wss://api.example.com",
  VITE_GOOGLE_CLIENT_ID: "google-client-id",
  VITE_POSTHOG_KEY: "phc_key",
  VITE_POSTHOG_HOST: "https://eu.i.posthog.com",
};

const check = (patch, mode = "production") => checkViteEnv({ ...valid, ...patch }, { mode });
const mentions = (list, name) => list.filter((m) => m.includes(name));

describe("a valid environment", () => {
  it.each(["production", "staging", "development"])("raises nothing in %s mode", (mode) => {
    expect(check({}, mode)).toEqual({ errors: [], warnings: [] });
  });
});

describe("VITE_API_BASE_URL in a production build", () => {
  it.each([
    ["is missing", undefined],
    ["is empty", ""],
    ["is only spaces", "   "],
  ])("is an error when it %s", (_name, value) => {
    const { errors } = check({ VITE_API_BASE_URL: value });
    expect(mentions(errors, "VITE_API_BASE_URL")).toHaveLength(1);
    expect(errors[0]).toMatch(/missing/);
  });

  it("is an error when it is not a URL", () => {
    expect(check({ VITE_API_BASE_URL: "api.example.com" }).errors[0]).toMatch(/not a valid URL/);
  });

  it("requires https, even for localhost", () => {
    expect(check({ VITE_API_BASE_URL: "http://api.example.com" }).errors[0]).toMatch(/https:\/\//);
    expect(check({ VITE_API_BASE_URL: "http://localhost:5000" }).errors[0]).toMatch(/https:\/\//);
  });

  it("rejects a trailing slash", () => {
    const { errors } = check({ VITE_API_BASE_URL: "https://api.example.com/" });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/must not end with a slash/);
  });

  it.each([
    ["a path", "https://api.example.com/api"],
    ["a path and a trailing slash", "https://api.example.com/v1/"],
    ["a query", "https://api.example.com?x=1"],
    ["credentials", "https://user:pass@api.example.com"],
  ])("rejects %s with one message", (_name, value) => {
    const { errors } = check({ VITE_API_BASE_URL: value });
    expect(errors).toHaveLength(1);
    expect(errors[0]).toMatch(/just the origin/);
  });

  it("accepts a port", () => {
    expect(check({ VITE_API_BASE_URL: "https://api.example.com:8443" }).errors).toEqual([]);
  });
});

describe("VITE_WS_URL in a production build", () => {
  it("is an error when missing", () => {
    expect(check({ VITE_WS_URL: undefined }).errors[0]).toMatch(/VITE_WS_URL is missing/);
  });

  it("is an error when it is not a URL", () => {
    expect(check({ VITE_WS_URL: "not a url" }).errors[0]).toMatch(/not a valid URL/);
  });

  it("requires wss://, even for localhost", () => {
    expect(check({ VITE_WS_URL: "ws://api.example.com" }).errors[0]).toMatch(/wss:\/\//);
    expect(check({ VITE_WS_URL: "ws://localhost:5000" }).errors[0]).toMatch(/wss:\/\//);
    expect(check({ VITE_WS_URL: "https://api.example.com" }).errors[0]).toMatch(/wss:\/\//);
  });

  it("only warns about a trailing slash, because the socket works with one", () => {
    const { errors, warnings } = check({ VITE_WS_URL: "wss://api.example.com/" });
    expect(errors).toEqual([]);
    expect(mentions(warnings, "VITE_WS_URL")).toHaveLength(1);
  });

  it("allows a path", () => {
    expect(check({ VITE_WS_URL: "wss://api.example.com/socket" })).toEqual({ errors: [], warnings: [] });
  });
});

describe("staging is as strict as production", () => {
  it("fails on the same problems", () => {
    const { errors } = check({ VITE_API_BASE_URL: "http://api.example.com", VITE_WS_URL: undefined }, "staging");
    expect(errors).toHaveLength(2);
  });
});

describe("optional features only warn", () => {
  it("warns about a missing Google client id and does not fail", () => {
    const { errors, warnings } = check({ VITE_GOOGLE_CLIENT_ID: undefined });
    expect(errors).toEqual([]);
    expect(warnings).toHaveLength(1);
    expect(warnings[0]).toMatch(/Google sign-in/);
  });

  it("warns when PostHog has a key but no host, and the other way round", () => {
    const keyOnly = check({ VITE_POSTHOG_HOST: undefined });
    expect(keyOnly.errors).toEqual([]);
    expect(keyOnly.warnings).toHaveLength(1);
    expect(keyOnly.warnings[0]).toMatch(/VITE_POSTHOG_HOST is missing/);

    const hostOnly = check({ VITE_POSTHOG_KEY: "" });
    expect(hostOnly.warnings).toHaveLength(1);
    expect(hostOnly.warnings[0]).toMatch(/VITE_POSTHOG_KEY is missing/);
  });

  it("says nothing when PostHog is off on purpose (neither set)", () => {
    expect(check({ VITE_POSTHOG_KEY: undefined, VITE_POSTHOG_HOST: undefined }).warnings).toEqual([]);
  });
});

describe("development is lenient", () => {
  it("allows http and ws for localhost without a word", () => {
    const env = { ...valid, VITE_API_BASE_URL: "http://localhost:5000", VITE_WS_URL: "ws://localhost:5000" };
    expect(checkViteEnv(env, { mode: "development" })).toEqual({ errors: [], warnings: [] });
    expect(checkViteEnv({ ...env, VITE_API_BASE_URL: "http://127.0.0.1:5000" }, { mode: "development" }).warnings).toEqual([]);
  });

  it("turns every problem into a warning and never an error", () => {
    const env = { VITE_API_BASE_URL: "http://example.com/", VITE_WS_URL: "ws://example.com" };
    const { errors, warnings } = checkViteEnv(env, { mode: "development" });
    expect(errors).toEqual([]);
    expect(warnings.length).toBeGreaterThanOrEqual(3); // http, trailing slash, ws, plus the optional ones
  });

  it("warns, not errors, when everything is missing", () => {
    const { errors, warnings } = checkViteEnv({}, { mode: "development" });
    expect(errors).toEqual([]);
    expect(mentions(warnings, "VITE_API_BASE_URL")).toHaveLength(1);
    expect(mentions(warnings, "VITE_WS_URL")).toHaveLength(1);
  });

  it("treats any non-production mode the same way (test, custom)", () => {
    expect(checkViteEnv({}, { mode: "test" }).errors).toEqual([]);
    expect(checkViteEnv({}, { mode: "preview" }).errors).toEqual([]);
  });
});

describe("reporting every problem at once", () => {
  it("returns all errors from one call, and formats them as one message", () => {
    const { errors } = check({ VITE_API_BASE_URL: undefined, VITE_WS_URL: "ws://x.example.com" });
    expect(errors).toHaveLength(2);

    const message = formatEnvErrors(errors, "production");
    expect(message).toContain('"production" build');
    for (const error of errors) expect(message).toContain(error);
    expect(message).toContain("FRONTEND_ENV.md");
    expect(message.split("\n").filter((line) => line.startsWith("  - "))).toHaveLength(2);
  });
});

describe("messages never echo a value", () => {
  it("leaves every submitted value out of every message", () => {
    const secret = "TOPSECRETHOST123";
    const env = {
      VITE_API_BASE_URL: `http://user:pw456@${secret}.example.com/leakpath/?q=leak789`,
      VITE_WS_URL: `ws://${secret}.example.com/leakpath/`,
      VITE_GOOGLE_CLIENT_ID: "",
      VITE_POSTHOG_KEY: "phc_leakkey000",
    };
    const { errors, warnings } = checkViteEnv(env, { mode: "production" });
    const everything = [...errors, ...warnings, formatEnvErrors(errors, "production")].join("\n");

    expect(errors.length).toBeGreaterThan(0);
    for (const leaked of [secret, "pw456", "leakpath", "leak789", "phc_leakkey000"]) {
      expect(everything).not.toContain(leaked);
    }
  });
});
