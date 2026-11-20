// The senior principles every debrief points back to. Scenarios reference them by id.
export const PRINCIPLES = Object.freeze({
  "one-way-doors": {
    title: "Reversible vs irreversible",
    text: "Move fast on decisions you can undo. Slow down on the ones you can't: lost data, security holes, public promises.",
  },
  "blast-radius": {
    title: "Blast radius",
    text: "Before a change or a fix, ask what else it can break. Prefer fixes that contain a failure over ones that spread it.",
  },
  "cost-now-vs-later": {
    title: "Cost now vs later",
    text: "Every shortcut is a loan. Take it where the interest is low; avoid it where it compounds: money, auth, data.",
  },
  "good-enough": {
    title: "Good enough to ship",
    text: "Ship the smallest thing that is safe. Separate showing a feature from releasing it to real users.",
  },
  "verify-ai": {
    title: "Trust, then verify AI",
    text: "AI code that passes tests is not proven safe. Review hardest where mistakes are expensive.",
  },
  communicate: {
    title: "Say it plainly",
    text: "When something breaks: contain it, fix it, and tell the people affected. Hiding a problem costs more trust than the problem.",
  },
});
