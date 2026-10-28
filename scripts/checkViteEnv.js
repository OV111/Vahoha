// Checks the VITE_ variables a frontend build is about to bake into the bundle.
//
// Vite inlines import.meta.env.VITE_* at build time, so a wrong value ships in
// every file and nothing fails until a user clicks something: a missing
// VITE_API_BASE_URL sends every request to "undefined/api/...", a trailing slash
// makes "//api/...", an http:// API from an https page is blocked as mixed
// content. This module says so BEFORE the bundle is built.
//
// Pure on purpose (no process, no files): vite.config.js feeds it loadEnv() and
// the test feeds it plain objects. Messages name the variable and the problem and
// never echo a value, so a log line can't leak one.

const STRICT_MODES = new Set(["production", "staging"]);
const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "[::1]"]);

const present = (value) => typeof value === "string" && value.trim() !== "";

const parse = (value) => {
  try {
    return new URL(value.trim());
  } catch {
    return null;
  }
};

/**
 * @param {Record<string, string | undefined>} env  the VITE_ variables (Vite's loadEnv result)
 * @param {{ mode: string }} options  Vite's mode. "production" and "staging" are strict:
 *   a problem is an error that fails the build. Any other mode (development, test)
 *   only produces warnings, and http:// / ws:// are fine for localhost.
 * @returns {{ errors: string[], warnings: string[] }}
 */
export function checkViteEnv(env, { mode }) {
  const strict = STRICT_MODES.has(mode);
  const errors = [];
  const warnings = [];
  // Strict modes fail the build on a problem; other modes only mention it.
  const problem = (message) => (strict ? errors : warnings).push(message);

  // ── VITE_API_BASE_URL: every request is built as `${value}/api/...` ──────────
  const api = env.VITE_API_BASE_URL;
  if (!present(api)) {
    problem('VITE_API_BASE_URL is missing: every request would go to "undefined/api/...".');
  } else {
    const url = parse(api);
    if (!url) {
      problem("VITE_API_BASE_URL is not a valid URL.");
    } else {
      const local = LOCAL_HOSTS.has(url.hostname);
      if (url.protocol !== "https:" && !(!strict && url.protocol === "http:" && local)) {
        problem(
          strict
            ? "VITE_API_BASE_URL must start with https:// (an http:// API is blocked as mixed content from an https site)."
            : "VITE_API_BASE_URL should start with https:// unless it points at localhost.",
        );
      }
      // The backend serves /api/... from its root, so a prefix path can never be right.
      if (url.pathname !== "/" || url.search || url.hash || url.username || url.password) {
        problem("VITE_API_BASE_URL must be just the origin (scheme and host): no path, query or credentials.");
      } else if (api.trim().endsWith("/")) {
        problem('VITE_API_BASE_URL must not end with a slash (requests are built as "<value>/api/...", so it would send "//api").');
      }
    }
  }

  // ── VITE_WS_URL: handed straight to new WebSocket(value) ─────────────────────
  const ws = env.VITE_WS_URL;
  if (!present(ws)) {
    problem("VITE_WS_URL is missing: new WebSocket(undefined) throws when chat or notifications connect.");
  } else {
    const url = parse(ws);
    if (!url) {
      problem("VITE_WS_URL is not a valid URL.");
    } else {
      const local = LOCAL_HOSTS.has(url.hostname);
      if (url.protocol !== "wss:" && !(!strict && url.protocol === "ws:" && local)) {
        problem(
          strict
            ? "VITE_WS_URL must start with wss:// (a ws:// socket is blocked from an https page)."
            : "VITE_WS_URL should start with wss:// unless it points at localhost.",
        );
      }
      // The socket server accepts any path and new WebSocket() takes a trailing slash,
      // so this one cannot break anything: worth a note, not a failed build.
      if (ws.trim().endsWith("/")) warnings.push("VITE_WS_URL ends with a slash; it works, but the other URL must not, so keep them alike.");
    }
  }

  // ── Optional features: the app still builds and runs, one feature does not ───
  if (!present(env.VITE_GOOGLE_CLIENT_ID)) {
    warnings.push("VITE_GOOGLE_CLIENT_ID is missing: the Google sign-in button will fail.");
  }
  const key = present(env.VITE_POSTHOG_KEY);
  const host = present(env.VITE_POSTHOG_HOST);
  if (key !== host) {
    warnings.push(`${key ? "VITE_POSTHOG_HOST" : "VITE_POSTHOG_KEY"} is missing: analytics stay off until both are set.`);
  }

  return { errors, warnings };
}

/** The aggregated message a failed build prints: every problem at once, not one per run. */
export function formatEnvErrors(errors, mode) {
  const lines = errors.map((message) => `  - ${message}`).join("\n");
  return (
    `The frontend environment is not valid for a "${mode}" build:\n${lines}\n` +
    "Fix the variables (the .env.* files, or the Vercel project settings) and build again. See docs/engineering/FRONTEND_ENV.md."
  );
}
