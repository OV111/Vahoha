// Sentry is ~165 KB of the entry chunk and nothing on screen needs it, so it
// loads after the page has settled (see sentry-init.js): on the first touch,
// key or scroll, on the first error, or at the latest 10 s after load. Starting
// it right after load would run its setup inside the window where a page is
// still measured as blocked. Errors thrown before it is ready wait in a small
// queue; only the first page-load trace and any replay of those seconds are lost.
// Browser only: the prerender build never imports main.jsx.
const dsn = import.meta.env.VITE_SENTRY_DSN;
const MAX_QUEUED = 50;
const FALLBACK_MS = 10000;
const INTERACTIONS = ["pointerdown", "keydown", "touchstart", "scroll"];

const queue = [];
let sentry = null;
let started = false;

/** Reports an error to Sentry, or holds it until Sentry has loaded. */
export function reportError(error, context) {
  if (sentry) sentry.captureException(error, context);
  else if (dsn && queue.length < MAX_QUEUED) queue.push([error, context]);
}

function onEarlyError(event) {
  reportError(event.error ?? new Error(event.message));
  start();
}

function onEarlyRejection(event) {
  reportError(event.reason);
  start();
}

function onInteraction() {
  const whenIdle = window.requestIdleCallback ?? ((cb) => setTimeout(cb, 200));
  whenIdle(start, { timeout: 2000 });
}

function start() {
  if (started) return;
  started = true;
  INTERACTIONS.forEach((type) => window.removeEventListener(type, onInteraction));
  import("./sentry-init")
    .then(({ initSentry }) => {
      sentry = initSentry();
      // Kept until now so an error thrown while the chunk downloads is not missed.
      window.removeEventListener("error", onEarlyError);
      window.removeEventListener("unhandledrejection", onEarlyRejection);
      queue.splice(0).forEach(([error, context]) => sentry.captureException(error, context));
    })
    .catch(() => {}); // offline or blocked: monitoring is optional, the app is not
}

if (dsn) {
  window.addEventListener("error", onEarlyError);
  window.addEventListener("unhandledrejection", onEarlyRejection);
  INTERACTIONS.forEach((type) => window.addEventListener(type, onInteraction, { passive: true, once: true }));

  const scheduleFallback = () => setTimeout(start, FALLBACK_MS);
  if (document.readyState === "complete") scheduleFallback();
  else window.addEventListener("load", scheduleFallback, { once: true });
}
