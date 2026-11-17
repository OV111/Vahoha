import { reportError } from "./instrument";

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "@fontsource-variable/dm-sans/opsz.css";
import "@fontsource-variable/dm-sans/opsz-italic.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";
import "./lib/posthog";

import { Analytics } from "@vercel/analytics/react";

const onVercel = !["localhost", "127.0.0.1"].includes(window.location.hostname);

const onReactError = (error, info) =>
  reportError(error, { contexts: { react: { componentStack: info?.componentStack } } });

createRoot(document.getElementById("root"), {
  onUncaughtError: onReactError,
  onCaughtError: onReactError,
  onRecoverableError: onReactError,
}).render(
  <>
    <App />
    {onVercel && <Analytics />}
  </>,
);
