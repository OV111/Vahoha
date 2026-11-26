// Copy for the /progress page.

export const PROGRESS_COPY = Object.freeze({
  title: "My progress",
  intro: "Where you are on your path, the one thing to do next, and the topics that still need work.",

  path: {
    noPath: "You haven't picked a path yet",
    noPathBody: "Pick a roadmap and this page starts tracking every layer you pass.",
    choose: "Choose a path",
    open: "Open roadmap",
    position: (order, total) => `Layer ${order} of ${total}`,
    passed: (n, total) => `${n} of ${total} passed`,
    allPassed: (total) => `All ${total} layers passed`,
    layerStatus: { done: "passed", current: "you are here", ahead: "not started" },
  },

  stats: {
    heading: "Activity",
    xpSuffix: "earned",
    streak: (n) => (n === 1 ? "1-day streak" : `${n}-day streak`),
    noStreak: "No streak yet",
    streakHint: "Learn something today to start one",
    xp: (n) => `${n.toLocaleString()} XP`,
    week: "This week",
    weekActive: (n) => (n === 1 ? "1 day learning" : `${n} days learning`),
  },

  nextStep: "Next step",
  askMentor: "Ask the mentor about it",
  // Pre-filled into the mentor panel's composer; the learner edits or sends it.
  mentorPrompts: {
    nextStep: (title) => `My next step is "${title}". Where should I start, and what should I watch out for?`,
    misconception: (topic, belief) =>
      `On ${topic}, the platform says I may believe: "${belief}". Help me work out what's wrong with that.`,
  },

  topics: {
    heading: "Topics",
    intro: "Every topic your tests and explanations have touched, grouped by layer.",
    otherGroup: "Other topics",
    emptyTab: "Nothing here right now.",
    test: (n) => `Test ${n}%`,
    explained: (n) => `Explained ${n}%`,
    missed: (n) => `Missed ${n}×`,
    lastSeen: (date) => `Last tested ${date}`,
    misconceptions: "You may believe",
    fixWithMentor: "Work through this with the mentor",
    noneTitle: "No topics tested yet",
    noneBody: "Topics appear here once you take a layer test or explain a topic to the mentor.",
    noneCta: "Open your roadmap",
  },

  retry: "Retry",
});
