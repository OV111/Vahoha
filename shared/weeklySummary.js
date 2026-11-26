// Copy for the weekly progress email and the pages that control it. Shared by
// the backend (the email itself) and the frontend (Settings, /unsubscribe).

export const WEEKLY_SUMMARY_COPY = Object.freeze({
  settingLabel: "Weekly progress email",
  settingHint: "A short summary every Sunday evening: your streak, what you passed, and one next step.",
  saved: "Email settings saved",

  week: {
    subject: (streak) => (streak > 1 ? `Your week on Vahoha · ${streak}-day streak` : "Your week on Vahoha"),
    preheader: "What you did this week, and the one thing to do next.",
    heading: (firstName) => (firstName ? `${firstName}, here's your week` : "Here's your week"),
  },
  nudge: {
    subject: "Pick up where you left off",
    preheader: "Ten minutes this week keeps it fresh.",
    heading: (firstName) => (firstName ? `${firstName}, pick up where you left off` : "Pick up where you left off"),
    body: "You had a quiet week. Ten minutes is enough to keep what you learned from fading.",
  },

  nextStep: {
    reinforce: (title) => `Go back over ${title}: it didn't hold up last time.`,
    practice: (title) => `Practice ${title}: you're close, but it isn't reliable yet.`,
    assess: (title) => `Test yourself on ${title}: it hasn't been checked yet.`,
    advance: (layer) => (layer ? `You're ready for the exam on ${layer}.` : "You're ready for your next layer."),
    start: () => "Pick a roadmap path to get started.",
  },
  cta: { roadmap: "Continue learning", mentor: "Work on it with the mentor", start: "Choose a path" },

  footer: "You get this because weekly progress emails are on in your Vahoha settings.",
  unsubscribeLink: "Unsubscribe",

  unsubscribePage: {
    title: "Unsubscribe from weekly emails",
    body: "You'll stop getting the weekly progress email. Sign-in and password emails still arrive.",
    button: "Unsubscribe",
    done: "You're unsubscribed. You can turn the weekly email back on in Settings any time.",
    invalid: "This unsubscribe link isn't valid. You can turn the email off in Settings instead.",
  },
});
