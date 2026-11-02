// Loaded by instrument.js once the page is idle, so none of Sentry sits in the entry chunk.
import * as Sentry from "@sentry/react";

export function initSentry() {
  Sentry.init({
    dsn: import.meta.env.VITE_SENTRY_DSN,
    environment: import.meta.env.MODE,
    // Set by vite.config.js from the Vercel commit SHA, the same value the API uses.
    release: import.meta.env.VITE_APP_VERSION || undefined,
    // Form bodies carry passwords and exam answers.
    dataCollection: {
      httpBodies: [],
    },
    integrations: [
      Sentry.browserTracingIntegration(),
      // PostHog already records sessions, so Sentry keeps a replay only when an error happens.
      Sentry.replayIntegration({ maskAllText: true, blockAllMedia: true }),
    ],
    tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0,
    // Adds sentry-trace/baggage to API calls so a page trace continues into the backend.
    tracePropagationTargets: [import.meta.env.VITE_API_BASE_URL].filter(Boolean),
    replaysSessionSampleRate: 0,
    replaysOnErrorSampleRate: 1.0,
    enableLogs: true,
  });
  return Sentry;
}
