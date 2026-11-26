// Text on each page type's link preview image. scripts/generateOgImages.js
// renders these to public/og/<key>.png; src/seo/siteMeta.js points pages at them.
export const OG_CARDS = Object.freeze({
  home: {
    kicker: "Junior to mid-level",
    title: "Proven, not watched.",
    subtitle: "Unlock each layer by passing a graded exam. Your AI mentor tracks your weak spots.",
  },
  roadmaps: {
    kicker: "Developer roadmaps",
    title: "Every layer is earned.",
    subtitle: "Pick a path, pass the exam for each layer, and see exactly where you are weak.",
  },
  learn: {
    kicker: "Lessons",
    title: "Every lesson starts with a real bug.",
    subtitle: "JavaScript, the web and React, until you can explain it back.",
  },
  labs: {
    kicker: "Labs",
    title: "Build real software, step by step.",
    subtitle: "Hands-on labs, from programming foundations to full projects.",
  },
  foundations: {
    kicker: "Programming foundations",
    title: "What every developer needs first.",
    subtitle: "Free lessons on how computers work, the command line, Git and more.",
  },
  pricing: {
    kicker: "Pricing",
    title: "Every roadmap is free.",
    subtitle: "Pro adds unlimited mentoring and a certificate you can show.",
  },
});
