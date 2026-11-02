// Imported first in main.jsx so Sentry is running before the app's own code.
// Browser only: the prerender build never imports main.jsx.
import React from "react";
import * as Sentry from "@sentry/react";
import {
  createRoutesFromChildren,
  matchRoutes,
  useLocation,
  useNavigationType,
} from "react-router-dom";

const dsn = import.meta.env.VITE_SENTRY_DSN;

if (dsn) {
  Sentry.init({
    dsn,
    environment: import.meta.env.MODE,
    // Set by vite.config.js from the Vercel commit SHA, the same value the API uses.
    release: import.meta.env.VITE_APP_VERSION || undefined,
    // Form bodies carry passwords and exam answers.
    dataCollection: {
      httpBodies: [],
    },
    integrations: [
      Sentry.reactRouterV7BrowserTracingIntegration({
        useEffect: React.useEffect,
        useLocation,
        useNavigationType,
        createRoutesFromChildren,
        matchRoutes,
      }),
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
}
