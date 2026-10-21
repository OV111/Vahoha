import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
// Self-hosted variable fonts (bundled by Vite, served from our own domain):
// no third-party DNS/TLS round trips before text can render.
import "@fontsource-variable/dm-sans/opsz.css";
import "@fontsource-variable/dm-sans/opsz-italic.css";
import "@fontsource-variable/geist";
import "@fontsource-variable/geist-mono";
import "./index.css";
import "./lib/posthog";

import { Analytics } from "@vercel/analytics/react";

// /_vercel/insights only exists on Vercel; locally it is a 404 in the console.
const onVercel = !["localhost", "127.0.0.1"].includes(window.location.hostname);

createRoot(document.getElementById("root")).render(
  <>
    <App />
    {onVercel && <Analytics />}
  </>,
);
