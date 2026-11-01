import { SITE_NAME } from "./siteMeta.js";
import { TOPICS } from "../features/foundations/topics/topics.js";

// SEO entries for the Foundations lesson pages. Kept out of siteMeta.js so the
// topic list isn't in every page's first download: TopicPage renders these
// tags itself, and scripts/seoPostBuild.js adds the pages to the sitemap.

export const lessonMeta = (topic) => ({
  title: `${topic.title} | Foundations | ${SITE_NAME}`,
  description: topic.summary,
});

// Topics without a written lesson 404, so they stay out of the sitemap.
export const FOUNDATION_LESSON_PAGES = Object.fromEntries(
  TOPICS.filter((t) => t.lesson).map((t) => [`/labs/foundations/${t.slug}`, lessonMeta(t)]),
);
