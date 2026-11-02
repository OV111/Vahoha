// Loaded with `node --import` before server.js, so Sentry can patch http, express
// and mongodb before they are first imported. ESM gives no other way to run first.
// bootEnv comes before it because SENTRY_DSN lives in the .env files it loads.
import "./config/bootEnv.js";

import * as Sentry from "@sentry/node";
import process from "node:process";

const dsn = process.env.SENTRY_DSN;

if (dsn) {
  const environment = process.env.NODE_ENV || "development";
  Sentry.init({
    dsn,
    environment,
    // Render sets RENDER_GIT_COMMIT on every deploy; the frontend uses the same SHA.
    release: process.env.SENTRY_RELEASE || process.env.RENDER_GIT_COMMIT,
    // Request bodies carry passwords, exam answers and chat text: keep them out.
    dataCollection: {
      httpBodies: [],
      cookies: false,
    },
    tracesSampleRate: environment === "production" ? 0.1 : 1.0,
    enableLogs: true,
  });
}
