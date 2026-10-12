import { useEffect } from "react";

// How long the prerendered copy has been on screen, in ms. Its CSS intro
// animations started at first paint, so this is how far along they are.
const timeSinceFirstPaint = () => {
  const [fcp] = performance.getEntriesByName("first-contentful-paint");
  return Math.max(0, performance.now() - (fcp?.startTime ?? 0));
};

// Rendered inside the same <Suspense> boundary as the page, so this effect
// runs only once the live page (including its lazy chunk) has committed.
// Then the static prerendered copy is removed and #root becomes visible.
//
// The live copy's intro animations (RiseText, .rt-fade) would start again from
// zero, making the hero text play twice. --intro-offset is subtracted from their
// delays, and a negative animation-delay starts an animation part-way through,
// so the live copy picks up exactly where the static one was.
const PrerenderHandoff = () => {
  useEffect(() => {
    const prerender = document.getElementById("prerender");
    if (!prerender) return;
    document.documentElement.style.setProperty(
      "--intro-offset",
      `${Math.round(timeSinceFirstPaint())}ms`,
    );
    prerender.remove();
  }, []);
  return null;
};

export default PrerenderHandoff;
