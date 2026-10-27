// Single source of truth for SEO. The build-time sitemap script and the
// <RouteSeo /> component both read from here, so a page cannot be in one
// and forgotten in the other.
//
// DRAFT COPY: titles/descriptions below are placeholders built from page names
// and the home-page tagline. Review and rewrite them (title < 60 chars,
// description < 155 chars) before expecting them to rank.

import { TOPICS } from "../features/foundations/topics/topics.js";

export const SITE_URL = "https://vahoha.com";
export const SITE_NAME = "Vahoha";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`;

export const DEFAULT_META = {
  title: "Vahoha",
  description:
    "Pass a graded test to unlock each step of your developer roadmap, with an AI mentor that knows your weak spots.",
};

// One public page per Foundations topic that has a written lesson. Topics
// without one 404, so they must stay out of the sitemap.
const foundationLessons = () =>
  Object.fromEntries(
    TOPICS.filter((t) => t.lesson).map((t) => [
      `/labs/foundations/${t.slug}`,
      { title: `${t.title} | Foundations | ${SITE_NAME}`, description: t.summary },
    ]),
  );

// Public, indexable pages. Key = pathname.
export const PUBLIC_PAGES = {
  "/": DEFAULT_META,
  "/roadmaps": {
    title: `Developer Roadmaps | ${SITE_NAME}`,
    description:
      "Browse developer roadmaps and unlock each layer by passing a graded test. Guests can explore every path.",
  },
  "/labs/foundations": {
    title: `Programming Foundations | ${SITE_NAME}`,
    description: `Start with the fundamentals every developer needs before choosing a specialty on ${SITE_NAME}.`,
  },
  "/pricing": {
    title: `Pricing | ${SITE_NAME}`,
    description: `See what is free and what is included in ${SITE_NAME} Pro.`,
  },
  "/about": {
    title: `About | ${SITE_NAME}`,
    description: `Why ${SITE_NAME} exists and how it helps developers learn through graded tests and an AI mentor.`,
  },
  "/contact": {
    title: `Contact | ${SITE_NAME}`,
    description: `Get in touch with the ${SITE_NAME} team.`,
  },
  "/privacy": {
    title: `Privacy Policy | ${SITE_NAME}`,
    description: `How ${SITE_NAME} collects, uses and protects your data.`,
  },
  "/terms": {
    title: `Terms of Service | ${SITE_NAME}`,
    description: `The terms that apply when you use ${SITE_NAME}.`,
  },
  ...foundationLessons(),
};

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
  "/ai-agent",
  "/billing",
  "/progress",
  "/team",
  "/capstone",
  "/blogs",
  "/libs",
  "/coding-challenges",
  "/voice-review",
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
