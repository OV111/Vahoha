// The one place that says which environment variables the backend reads, which
// are required, and what happens when one is missing. Validated ONCE at boot
// (see bootEnv.js), with every problem reported together, so a bad setting fails
// at deploy time (or logs a clear "feature is off" line) and never surprises
// someone on their first request.
//
// The same ENV_SPECS array drives the checks, the generated `.env.example` and the
// tests that keep `.env.example`, render.yaml and the docs from drifting apart.
//
// Rules for this file:
//  - It only DESCRIBES the existing meaning of each variable. A flag that the code
//    reads as `=== "true"` stays that way here: never change how one is interpreted.
//  - A message names a variable and says what is wrong. It never repeats a value.
//  - validateEnv() is pure: no logging, no process.exit, no reading files.

import process from "node:process";

/**
 * @typedef {object} EnvSpec
 * @property {string} name
 * @property {"core"|"auth"|"ai"|"email"|"uploads"|"billing"|"redis"|"flags"|"local"} group
 * @property {"required"|"production"|"optional"} requirement  "production" = required only when NODE_ENV=production
 * @property {"string"|"secret"|"url"|"mongo"|"flag"|"flag1"|"int"|"email"|"list"} kind
 * @property {string} description
 * @property {string} example     a placeholder, never a real value
 * @property {string} effect      what happens when it is missing or unset
 * @property {(value: string) => string | null} [check]  extra shape check for a SET value; returns a problem or null
 */

const IP_LIST = /^[0-9a-fA-F:.]+$/;
const KNOWN_ENVIRONMENTS = ["production", "staging", "development", "test"];

const originProblem = (entry) => {
  try {
    const url = new URL(entry);
    return url.protocol === "http:" || url.protocol === "https:" ? null : "entries must start with http:// or https://";
  } catch {
    return "entries must be full origins such as https://app.example.com";
  }
};

/** @type {EnvSpec[]} */
export const ENV_SPECS = [
  // ── core ────────────────────────────────────────────────────────────────
  {
    name: "NODE_ENV",
    group: "core",
    requirement: "optional",
    kind: "string",
    description: "development, staging or production. Production turns on the stricter checks below.",
    example: "development",
    effect: "treated as development, so the production-only checks are skipped",
    check: (value) => (KNOWN_ENVIRONMENTS.includes(value) ? null : "should be production, staging, development or test (anything else is treated as development)"),
  },
  {
    name: "PORT",
    group: "core",
    requirement: "optional",
    kind: "int",
    description: "Port the API listens on. Render sets it for you.",
    example: "5000",
    effect: "defaults to 5000",
  },
  {
    name: "MONGO_URI",
    group: "core",
    requirement: "required",
    kind: "mongo",
    description: "MongoDB connection string (Atlas: mongodb+srv://...).",
    example: "mongodb+srv://user:password@cluster.example.mongodb.net/DevsBlog",
    effect: "the server refuses to start",
  },
  {
    name: "FRONTEND_URL",
    group: "core",
    requirement: "production",
    kind: "url",
    description: "The Vercel URL, https, no trailing slash or path. Also the CORS origin and the sign-in redirect target.",
    example: "https://vahoha.com",
    effect: "falls back to http://localhost:5173, which breaks CORS and sign-in redirects in production",
    check: (value) => frontendUrlProblem(value),
  },

  // ── auth ────────────────────────────────────────────────────────────────
  {
    name: "JWT_Secret",
    group: "auth",
    requirement: "required",
    kind: "secret",
    description: "Signs access tokens. The name has this exact casing. Use a long random string.",
    example: "change-me-to-a-long-random-string",
    effect: "the server refuses to start",
  },
  {
    name: "JWT_REFRESH_SECRET",
    group: "auth",
    requirement: "required",
    kind: "secret",
    description: "Signs refresh tokens. Must differ from JWT_Secret.",
    example: "change-me-to-a-different-long-random-string",
    effect: "the server refuses to start",
  },
  {
    name: "GOOGLE_CLIENT_ID",
    group: "auth",
    requirement: "optional",
    kind: "string",
    description: "Google OAuth client id (also set VITE_GOOGLE_CLIENT_ID in the frontend).",
    example: "123456789-abc.apps.googleusercontent.com",
    effect: "Google sign-in is off",
  },
  {
    name: "GITHUB_CLIENT_ID",
    group: "auth",
    requirement: "optional",
    kind: "string",
    description: "GitHub OAuth app client id. Use a separate app per environment (the callback URL differs).",
    example: "your-github-oauth-client-id",
    effect: "GitHub sign-in and the capstone GitHub link are off",
  },
  {
    name: "GITHUB_CLIENT_SECRET",
    group: "auth",
    requirement: "optional",
    kind: "secret",
    description: "GitHub OAuth app client secret. Set together with GITHUB_CLIENT_ID.",
    example: "your-github-oauth-client-secret",
    effect: "GitHub sign-in is off",
  },
  {
    name: "GITHUB_TOKEN",
    group: "auth",
    requirement: "optional",
    kind: "secret",
    description: "Fine-grained token with read-only access to public repos. Used by capstone checks and the Project Map repo scan.",
    example: "github_pat_your-token",
    effect: "GitHub allows only 60 requests an hour, so scans and capstone checks hit the limit fast",
  },

  // ── ai ──────────────────────────────────────────────────────────────────
  {
    name: "GROQ_API_KEY",
    group: "ai",
    requirement: "optional",
    kind: "secret",
    description: "Groq key for the mentor, teach-back, capstone review, repo scan labels and map questions. Use a paid tier for real use.",
    example: "gsk_your-groq-key",
    effect: "every AI feature fails when it is first used",
  },
  {
    name: "GEMINI_API_KEY",
    group: "ai",
    requirement: "optional",
    kind: "secret",
    description: "Gemini key. Nothing imports config/gemini.js today, so it is unused.",
    example: "your-gemini-key",
    effect: "nothing (unused today)",
  },
  {
    name: "CAPSTONE_REVIEW_MAX_CHARS",
    group: "ai",
    requirement: "optional",
    kind: "int",
    description: "Cap on repo code sent to the capstone AI review.",
    example: "60000",
    effect: "uses the built-in default",
  },
  {
    name: "GROQ_GATE_TPM",
    group: "ai",
    requirement: "optional",
    kind: "int",
    description: "Tokens per minute your Groq tier allows for the key. All AI calls share it: a call waits for its tokens or fails with a 'busy' message instead of being refused by Groq.",
    example: "250000",
    effect: "no token budget is enforced (only the concurrency cap and the pause after a Groq 429 apply)",
  },
  {
    name: "GROQ_GATE_CONCURRENCY",
    group: "ai",
    requirement: "optional",
    kind: "int",
    description: "Most Groq calls in flight at once, per server instance. A mentor stream counts until its last token.",
    example: "8",
    effect: "uses the built-in default (8)",
  },

  // ── email ───────────────────────────────────────────────────────────────
  {
    name: "RESEND_API_KEY",
    group: "email",
    requirement: "optional",
    kind: "secret",
    description: "Resend key for password reset, magic-link sign-in and contact emails. vahoha.com must be verified in Resend.",
    example: "re_your-resend-key",
    effect: "email sending is off, so reset and magic-link emails never arrive",
  },
  {
    name: "EMAIL_FROM",
    group: "email",
    requirement: "optional",
    kind: "email",
    description: 'Sender address, e.g. "Vahoha <no-reply@vahoha.com>". Set together with RESEND_API_KEY.',
    example: '"Vahoha <no-reply@vahoha.com>"', // quoted: it has spaces
    effect: "falls back to Resend's test sender, which only reaches the account owner",
    check: (value) => (value.includes("@") ? null : "must contain an email address"),
  },
  {
    name: "CONTACT_INBOX",
    group: "email",
    requirement: "optional",
    kind: "email",
    description: "Where contact-form messages are sent.",
    example: "hello@vahoha.com",
    effect: "uses the built-in inbox",
    check: (value) => (value.includes("@") ? null : "must be an email address"),
  },

  // ── uploads ─────────────────────────────────────────────────────────────
  {
    name: "CLOUDINARY_CLOUD_NAME",
    group: "uploads",
    requirement: "optional",
    kind: "string",
    description: "Cloudinary cloud name (profile photos, blog images). Set all three Cloudinary variables or none.",
    example: "your-cloud-name",
    effect: "image uploads fail",
  },
  {
    name: "CLOUDINARY_API_KEY",
    group: "uploads",
    requirement: "optional",
    kind: "secret",
    description: "Cloudinary API key.",
    example: "your-cloudinary-key",
    effect: "image uploads fail",
  },
  {
    name: "CLOUDINARY_API_SECRET",
    group: "uploads",
    requirement: "optional",
    kind: "secret",
    description: "Cloudinary API secret.",
    example: "your-cloudinary-secret",
    effect: "image uploads fail",
  },

  // ── billing ─────────────────────────────────────────────────────────────
  {
    name: "POLAR_ENVIRONMENT",
    group: "billing",
    requirement: "optional",
    kind: "string",
    description: 'Only the exact value "production" uses the real Polar; anything else is the sandbox, so a forgotten value can never charge a card.',
    example: "sandbox",
    effect: "Polar sandbox",
  },
  {
    name: "POLAR_ACCESS_TOKEN",
    group: "billing",
    requirement: "optional",
    kind: "secret",
    description: "Polar organisation access token. Required when BILLING_ENFORCED=true.",
    example: "polar_oat_your-token",
    effect: "checkout cannot be created",
  },
  {
    name: "POLAR_PRO_PRODUCT_ID",
    group: "billing",
    requirement: "optional",
    kind: "string",
    description: "Id of the Pro product in Polar. Required when BILLING_ENFORCED=true.",
    example: "your-polar-product-id",
    effect: "checkout cannot be created",
  },
  {
    name: "POLAR_WEBHOOK_SECRET",
    group: "billing",
    requirement: "optional",
    kind: "secret",
    description: "Signs Polar webhooks. Required when BILLING_ENFORCED=true.",
    example: "your-polar-webhook-secret",
    effect: "the webhook answers 503 on purpose",
  },
  {
    name: "BILLING_ENFORCED",
    group: "billing",
    requirement: "optional",
    kind: "flag",
    description: "true makes Pro gates real. Anything else keeps every feature free (the pilot setting).",
    example: "false",
    effect: "everything is free",
  },

  // ── redis ───────────────────────────────────────────────────────────────
  {
    name: "REDIS_ENABLED",
    group: "redis",
    requirement: "optional",
    kind: "flag",
    description: "false runs without Redis: no notification queue and no Redis login throttling. Any other value (or unset) means on.",
    example: "true",
    effect: "Redis is on",
  },
  {
    name: "REDIS_URL",
    group: "redis",
    requirement: "optional",
    kind: "secret",
    description: "Hosted Redis URL with host, port, password and TLS. Wins over the host/port variables.",
    example: "rediss://default:password@host:6379",
    effect: "uses REDIS_HOST and REDIS_PORT, or localhost",
  },
  {
    name: "REDIS_HOST",
    group: "redis",
    requirement: "optional",
    kind: "string",
    description: "Redis host for a local or Docker Redis (ignored when REDIS_URL is set).",
    example: "localhost",
    effect: "localhost",
  },
  {
    name: "REDIS_PORT",
    group: "redis",
    requirement: "optional",
    kind: "int",
    description: "Redis port (ignored when REDIS_URL is set).",
    example: "6379",
    effect: "6379",
  },
  {
    name: "REDIS_PASSWORD",
    group: "redis",
    requirement: "optional",
    kind: "secret",
    description: "Redis password (ignored when REDIS_URL is set).",
    example: "your-redis-password",
    effect: "no password",
  },

  // ── flags ───────────────────────────────────────────────────────────────
  {
    name: "CANDIDATES_ENABLED",
    group: "flags",
    requirement: "optional",
    kind: "flag",
    description: "true opens the recruiter candidates list API. Leave it off until the page is switched on.",
    example: "false",
    effect: "the candidates API stays closed",
  },
  {
    name: "MAINTENANCE_MODE",
    group: "flags",
    requirement: "optional",
    kind: "flag",
    description: "true makes every route answer 503 (/healthz stays up). The emergency stop.",
    example: "false",
    effect: "normal service",
  },
  {
    name: "CACHE_ENABLED",
    group: "flags",
    requirement: "optional",
    kind: "flag",
    description: "false turns the server-side cache off (to rule it out while debugging). Unset means on, except under tests.",
    example: "true",
    effect: "cache on",
  },
  {
    name: "ALLOW_UNSAFE_RUNNER",
    group: "flags",
    requirement: "optional",
    kind: "flag",
    description: "true lets the code runner execute learner code outside the isolated-vm sandbox when it did not build. NEVER in production.",
    example: "false",
    effect: "in production the runner refuses submissions when isolated-vm is missing",
  },
  {
    name: "WS_EXTRA_ORIGINS",
    group: "flags",
    requirement: "optional",
    kind: "list",
    description: "Extra browser origins allowed to open a WebSocket, comma separated (besides FRONTEND_URL).",
    example: "https://staging.vahoha.com",
    effect: "only FRONTEND_URL may connect",
    check: (value) => {
      const entries = value.split(",").map((e) => e.trim()).filter(Boolean);
      return entries.map(originProblem).find(Boolean) ?? null;
    },
  },

  // ── local ───────────────────────────────────────────────────────────────
  {
    name: "GROQ_TPM_LIMIT",
    group: "local",
    requirement: "optional",
    kind: "int",
    description: "Local-only workaround for the Groq free tier's tokens-per-minute limit. Do NOT set it in production.",
    example: "6000",
    effect: "no limit applied",
  },
  {
    name: "EVAL_JUDGE_MODEL",
    group: "local",
    requirement: "optional",
    kind: "string",
    description: "Model used by the mentor eval script only.",
    example: "openai/gpt-oss-120b",
    effect: "uses the built-in model",
  },
  {
    name: "DNS_SERVERS",
    group: "local",
    requirement: "optional",
    kind: "list",
    description: "Comma-separated DNS servers, for networks that cannot resolve Atlas's mongodb+srv records.",
    example: "8.8.8.8,1.1.1.1",
    effect: "uses the system DNS",
    check: (value) => {
      const entries = value.split(",").map((e) => e.trim());
      return entries.every((e) => IP_LIST.test(e)) ? null : "must be a comma-separated list of IP addresses";
    },
  },
  {
    name: "ALLOW_UNBANKED_PUBLISH",
    group: "local",
    requirement: "optional",
    kind: "flag1",
    description: "Seed scripts only: 1 lets the capstone seeder publish briefs whose exam banks are missing.",
    example: "0",
    effect: "the seeder skips unbanked tracks",
  },
];

/** Frontend (Vite) variables: not read by the backend, listed so `.env.example` documents everything. */
export const FRONTEND_ENV_SPECS = [
  { name: "VITE_API_BASE_URL", description: "Backend API base URL, no trailing slash.", example: "http://localhost:5000" },
  { name: "VITE_WS_URL", description: "Backend WebSocket URL.", example: "ws://localhost:5000" },
  { name: "VITE_GOOGLE_CLIENT_ID", description: "Same Google OAuth client id as GOOGLE_CLIENT_ID. Public by design.", example: "123456789-abc.apps.googleusercontent.com" },
  { name: "VITE_POSTHOG_KEY", description: "PostHog project key. Analytics stay off without it.", example: "phc_your-posthog-key" },
  { name: "VITE_POSTHOG_HOST", description: "PostHog host.", example: "https://eu.i.posthog.com" },
];

// Things a deployment can have switched on or off, and what each one needs.
const FEATURES = [
  { key: "ai", label: "AI (Groq)", needs: ["GROQ_API_KEY"] },
  { key: "email", label: "Email", needs: ["RESEND_API_KEY", "EMAIL_FROM"] },
  { key: "githubSignIn", label: "GitHub sign-in", needs: ["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"] },
  { key: "googleSignIn", label: "Google sign-in", needs: ["GOOGLE_CLIENT_ID"] },
  { key: "uploads", label: "Image uploads", needs: ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"] },
  { key: "billing", label: "Billing checkout", needs: ["POLAR_ACCESS_TOKEN", "POLAR_PRO_PRODUCT_ID"] },
  { key: "repoScan", label: "GitHub API at full rate", needs: ["GITHUB_TOKEN"] },
];

// ── helpers ─────────────────────────────────────────────────────────────────

const text = (env, name) => (typeof env[name] === "string" ? env[name].trim() : "");
const isSet = (env, name) => text(env, name) !== "";

/** Production needs the site address only: https, no trailing slash, no path. */
function frontendUrlProblem(value) {
  let url;
  try {
    url = new URL(value);
  } catch {
    return "must be a full URL such as https://vahoha.com";
  }
  if (url.protocol !== "https:") return "must start with https://";
  if (value !== url.origin) return "must be just the site address, with no trailing slash or path";
  return null;
}

export class EnvError extends Error {
  /** @param {{ name: string, message: string }[]} errors */
  constructor(errors) {
    super(`Invalid configuration (${errors.length} problem${errors.length === 1 ? "" : "s"}):\n${errors.map((e) => `  - ${e.name}: ${e.message}`).join("\n")}`);
    this.name = "EnvError";
    this.errors = errors;
  }
}

/**
 * Checks a configuration without side effects.
 * @param {Record<string, string | undefined>} [env]
 * @returns {{
 *   ok: boolean,
 *   environment: string,
 *   errors: { name: string, message: string }[],
 *   warnings: { name: string, message: string }[],
 *   features: { email: boolean, githubSignIn: boolean, googleSignIn: boolean, uploads: boolean, billing: boolean, redis: boolean, ai: boolean, repoScan: boolean },
 *   featureNotes: Record<string, string>
 * }}
 */
export function validateEnv(env = process.env) {
  const errors = [];
  const warnings = [];
  const fatal = (name, message) => errors.push({ name, message });
  const warn = (name, message) => warnings.push({ name, message });
  const production = env.NODE_ENV === "production";

  // 1. Shape of every variable that is set. Only the NAME and the rule appear in a message.
  for (const spec of ENV_SPECS) {
    if (!isSet(env, spec.name)) continue;
    const value = text(env, spec.name);
    let problem = null;
    if (spec.kind === "int" && !/^[1-9]\d*$/.test(value)) problem = "must be a positive whole number";
    else if (spec.kind === "flag" && value !== "true" && value !== "false") problem = "must be exactly true or false";
    else if (spec.kind === "flag1" && value !== "1" && value !== "0") problem = "must be 1 or 0";
    else if (spec.check && spec.name !== "FRONTEND_URL") problem = spec.check(value);
    if (problem) warn(spec.name, problem);
  }

  // 2. Fatal: the server cannot run safely without these.
  if (!isSet(env, "MONGO_URI")) fatal("MONGO_URI", "is missing");
  else if (!/^mongodb(\+srv)?:\/\//.test(text(env, "MONGO_URI"))) fatal("MONGO_URI", "must start with mongodb:// or mongodb+srv://");

  if (!isSet(env, "JWT_Secret")) fatal("JWT_Secret", "is missing");
  if (!isSet(env, "JWT_REFRESH_SECRET")) fatal("JWT_REFRESH_SECRET", "is missing");
  if (isSet(env, "JWT_Secret") && isSet(env, "JWT_REFRESH_SECRET") && text(env, "JWT_Secret") === text(env, "JWT_REFRESH_SECRET")) {
    fatal("JWT_REFRESH_SECRET", "must differ from JWT_Secret (one leaked secret would sign both kinds of token)");
  }
  for (const name of ["JWT_Secret", "JWT_REFRESH_SECRET"]) {
    // assertJwtSecrets only ever required the secret to exist, so a short one is a warning, not a boot failure.
    if (isSet(env, name) && text(env, name).length < 32) warn(name, "is short (under 32 characters); use a long random string");
  }

  if (production) {
    if (!isSet(env, "FRONTEND_URL")) fatal("FRONTEND_URL", "is missing (CORS and sign-in redirects would point at localhost)");
    else {
      const problem = frontendUrlProblem(text(env, "FRONTEND_URL"));
      if (problem) fatal("FRONTEND_URL", problem);
    }
    if (env.ALLOW_UNSAFE_RUNNER === "true") {
      fatal("ALLOW_UNSAFE_RUNNER", "must not be true in production: it runs learner code outside the sandbox");
    }
  } else if (isSet(env, "FRONTEND_URL")) {
    const problem = frontendUrlProblem(text(env, "FRONTEND_URL"));
    if (problem) warn("FRONTEND_URL", `${problem} (required in production)`);
  }

  const billingEnforced = env.BILLING_ENFORCED === "true";
  if (billingEnforced) {
    for (const name of ["POLAR_ACCESS_TOKEN", "POLAR_WEBHOOK_SECRET", "POLAR_PRO_PRODUCT_ID"]) {
      if (!isSet(env, name)) fatal(name, "is required when BILLING_ENFORCED=true");
    }
    if (production && env.POLAR_ENVIRONMENT !== "production") {
      warn("POLAR_ENVIRONMENT", 'is not "production", so billing talks to the Polar sandbox');
    }
  } else {
    for (const name of ["POLAR_ACCESS_TOKEN", "POLAR_WEBHOOK_SECRET", "POLAR_PRO_PRODUCT_ID"]) {
      if (!isSet(env, name)) warn(name, "is missing, so the billing page cannot open a checkout (fine while billing is not enforced)");
    }
  }

  // 3. Warnings: the app runs, but part of it is off or degraded.
  if (!isSet(env, "GROQ_API_KEY")) {
    warn("GROQ_API_KEY", "is missing: the mentor, repo scan, map questions, grading and capstone review will fail when used");
  }
  if (!isSet(env, "GITHUB_TOKEN")) {
    warn("GITHUB_TOKEN", "is missing: repo scans and capstone checks are limited to 60 GitHub requests an hour");
  }
  if (!isSet(env, "GOOGLE_CLIENT_ID")) {
    warn("GOOGLE_CLIENT_ID", "is missing: Google sign-in is off");
  }

  const onlyOne = (names, what, effect) => {
    const present = names.filter((n) => isSet(env, n));
    if (present.length > 0 && present.length < names.length) {
      for (const n of names.filter((x) => !isSet(env, x))) warn(n, `is missing while ${present.join(" and ")} ${present.length === 1 ? "is" : "are"} set: ${what} ${effect}`);
    }
  };
  onlyOne(["RESEND_API_KEY", "EMAIL_FROM"], "email", "is half set up (without a key nothing is sent; without a sender, Resend's test sender only reaches the account owner)");
  onlyOne(["GITHUB_CLIENT_ID", "GITHUB_CLIENT_SECRET"], "GitHub sign-in", "will fail");
  onlyOne(["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"], "image uploads", "will fail");

  if (production && env.REDIS_ENABLED !== "false" && !isSet(env, "REDIS_URL") && !isSet(env, "REDIS_HOST")) {
    warn("REDIS_URL", "is missing (and REDIS_HOST): login throttling and the notification queue fall back to localhost and will degrade");
  }
  if (production && isSet(env, "GROQ_TPM_LIMIT")) {
    warn("GROQ_TPM_LIMIT", "is a local free-tier workaround that shrinks AI reviews; remove it in production");
  }
  if (production && env.CACHE_ENABLED === "false") {
    warn("CACHE_ENABLED", "is false in production: the server cache is off (fine while debugging, slower otherwise)");
  }

  // 4. What is on and off, for the startup report.
  const features = {
    ai: isSet(env, "GROQ_API_KEY"),
    email: isSet(env, "RESEND_API_KEY") && isSet(env, "EMAIL_FROM"),
    githubSignIn: isSet(env, "GITHUB_CLIENT_ID") && isSet(env, "GITHUB_CLIENT_SECRET"),
    googleSignIn: isSet(env, "GOOGLE_CLIENT_ID"),
    uploads: ["CLOUDINARY_CLOUD_NAME", "CLOUDINARY_API_KEY", "CLOUDINARY_API_SECRET"].every((n) => isSet(env, n)),
    billing: isSet(env, "POLAR_ACCESS_TOKEN") && isSet(env, "POLAR_PRO_PRODUCT_ID"),
    redis: env.REDIS_ENABLED !== "false",
    repoScan: isSet(env, "GITHUB_TOKEN"),
  };
  const featureNotes = {};
  for (const feature of FEATURES) {
    if (!features[feature.key]) {
      const missing = feature.needs.filter((n) => !isSet(env, n));
      featureNotes[feature.key] = `${missing.join(" and ")} ${missing.length === 1 ? "is" : "are"} missing`;
    }
  }
  if (!features.redis) featureNotes.redis = "REDIS_ENABLED=false";

  return {
    ok: errors.length === 0,
    // Only a known name is repeated back: anything else could be a mistyped value.
    environment: KNOWN_ENVIRONMENTS.includes(text(env, "NODE_ENV")) ? text(env, "NODE_ENV") : "development",
    errors,
    warnings,
    features,
    featureNotes,
  };
}

/** Like validateEnv, but throws one EnvError listing every fatal problem. */
export function assertEnv(env = process.env) {
  const result = validateEnv(env);
  if (!result.ok) throw new EnvError(result.errors);
  return result;
}

/** A startup log block: what is on, what is off and why, and every warning. Names only. */
export function formatConfigReport(result) {
  const on = [...FEATURES.filter((f) => result.features[f.key]).map((f) => f.label), ...(result.features.redis ? ["Redis"] : [])];
  const off = [
    ...FEATURES.filter((f) => !result.features[f.key]).map((f) => `${f.label} (${result.featureNotes[f.key]})`),
    ...(result.features.redis ? [] : [`Redis (${result.featureNotes.redis})`]),
  ];
  const lines = [`Configuration OK (${result.environment}).`];
  lines.push(`  On : ${on.length ? on.join(", ") : "nothing optional"}`);
  if (off.length) lines.push(`  Off: ${off.join("; ")}`);
  if (result.warnings.length) {
    lines.push("  Warnings:");
    for (const w of result.warnings) lines.push(`    - ${w.name}: ${w.message}`);
  }
  return lines.join("\n");
}

// ── .env.example ────────────────────────────────────────────────────────────

const GROUP_TITLES = {
  core: "Core",
  auth: "Sign-in and GitHub",
  ai: "AI",
  email: "Email",
  uploads: "Image uploads",
  billing: "Billing (Polar)",
  redis: "Redis",
  flags: "Switches",
  local: "Local and scripts only",
};

const REQUIREMENT_TEXT = {
  required: "REQUIRED.",
  production: "REQUIRED in production, optional while developing.",
  optional: "Optional.",
};

/**
 * The text of `.env.example`, built from ENV_SPECS so the template can never
 * disagree with what the server checks. Variables required in EVERY environment are
 * active lines with placeholders; the rest (including FRONTEND_URL, which is only
 * required in production) are commented out, so copying the file into a local setup
 * does not point it at production.
 */
export function renderEnvExample() {
  const out = [
    "# Vahoha configuration template. Placeholders only: NEVER commit real values.",
    "#",
    "# Backend variables go in backend/.env (or backend/.env.local, which wins). On Render",
    "# they are set in the dashboard. They are checked once at boot (backend/config/env.js):",
    "# a REQUIRED one that is missing stops the server and lists every problem together.",
    "#",
    "# Frontend (VITE_*) variables go in the root .env.development / .env.production files",
    "# locally and in the project settings on Vercel. Only public values belong there.",
    "",
  ];
  for (const [group, title] of Object.entries(GROUP_TITLES)) {
    out.push(`# ── ${title} ${"─".repeat(Math.max(3, 68 - title.length))}`, "");
    for (const spec of ENV_SPECS.filter((s) => s.group === group)) {
      out.push(`# ${spec.description}`);
      out.push(`# ${REQUIREMENT_TEXT[spec.requirement]} If missing: ${spec.effect}.`);
      out.push(`${spec.requirement === "required" ? "" : "# "}${spec.name}=${spec.example}`, "");
    }
  }
  out.push(`# ── Frontend (Vite) ${"─".repeat(52)}`, "");
  for (const spec of FRONTEND_ENV_SPECS) {
    out.push(`# ${spec.description}`, `# ${spec.name}=${spec.example}`, "");
  }
  return `${out.join("\n").trimEnd()}\n`;
}
