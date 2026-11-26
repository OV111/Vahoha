// Single source of truth for SEO. The build-time sitemap script and the
// <RouteSeo /> component both read from here, so a page cannot be in one
// and forgotten in the other. Titles stay under 60 characters and
// descriptions under 155, or search results cut them off.

export const SITE_URL = "https://vahoha.com";
export const SITE_NAME = "Vahoha";

// One link preview image per page type, rendered from shared/ogCards.js
// by scripts/generateOgImages.js.
export const ogImage = (card) => `${SITE_URL}/og/${card}.png`;
export const DEFAULT_OG_IMAGE = ogImage("home");

export const DEFAULT_META = {
  title: "Vahoha: Go from Junior to Mid-Level Developer",
  description:
    "Developer roadmaps you unlock by passing graded exams, with an AI mentor that tracks your weak spots. Every path is free.",
};

// Public, indexable pages. Key = pathname.
export const PUBLIC_PAGES = {
  "/": DEFAULT_META,
  "/roadmaps": {
    title: `Developer Roadmaps | ${SITE_NAME}`,
    description:
      "Browse developer roadmaps and unlock each layer by passing a graded test. Guests can explore every path.",
    image: ogImage("roadmaps"),
  },
  "/labs": {
    title: `Hands-on Coding Labs | ${SITE_NAME}`,
    description: "Build real software step by step, from programming foundations to full projects.",
    image: ogImage("labs"),
  },
  "/labs/foundations": {
    title: `Programming Foundations for Beginners | ${SITE_NAME}`,
    description:
      "Free lessons on how computers work, the command line and Git: the basics every developer needs before choosing a path.",
    image: ogImage("foundations"),
  },
  "/pricing": {
    title: `Pricing: Every Roadmap Is Free | ${SITE_NAME}`,
    description:
      "Every roadmap and exam is free. Pro adds unlimited AI mentor messages, unlimited capstone defenses and a certificate you can show.",
    image: ogImage("pricing"),
  },
  "/about": {
    title: `About | ${SITE_NAME}`,
    description:
      "Why Vahoha exists: junior developers grow faster when every step is proven with a graded exam and a mentor that knows their weak spots.",
  },
  "/contact": {
    title: `Contact | ${SITE_NAME}`,
    description: `Questions, feedback or a cohort to bring to ${SITE_NAME}? Get in touch.`,
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `How ${SITE_NAME} collects, uses and protects your data.`,
  },
  "/terms": {
    title: `Terms of Service | ${SITE_NAME}`,
    description: `The terms that apply when you use ${SITE_NAME}.`,
  },
};

// Foundations lesson pages are public too, but their entries live in
// lessonPages.js and TopicPage renders their tags (see RouteSeo).
// One segment after /labs/foundations/, so the system labs under .../lab/ don't match.
export const isFoundationLessonPath = (pathname) => /^\/labs\/foundations\/(?!lab\/)[^/]+$/.test(pathname);

// Pages that must never be indexed (account, auth, per-user, admin).
// Anything under these prefixes gets <meta name="robots" content="noindex">
// and a Disallow line in robots.txt.
export const PRIVATE_PREFIXES = [
  "/project-map",
  "/map",
  "/my-profile",
  "/users",
  "/get-started",
  "/forgot-password",
  "/reset-password",
  "/oauth-success",
  "/mentor",
  "/billing",
  "/progress",
  "/team",
  "/teams",
  "/capstone",
  "/blogs",
  "/libs",
  "/coding-challenges",
  "/roadmaps/exam",
];

export const isPrivatePath = (pathname) =>
  PRIVATE_PREFIXES.some((p) => pathname === p || pathname.startsWith(`${p}/`));

// JSON-LD per page type. Uses only facts already on the page (name, description).
// The home page's WebSite + Organization graph lives in index.html.
export const jsonLdFor = ({ title, description, path }) => {
  if (path.startsWith("/labs/foundations/")) {
    return {
      "@context": "https://schema.org",
      "@type": "LearningResource",
      name: title.replace(/ \|.*$/, ""),
      description,
      url: `${SITE_URL}${path}`,
      isAccessibleForFree: true,
      provider: { "@id": `${SITE_URL}/#organization` },
    };
  }
  return null;
};
