import { CATEGORIES, DIFFICULTIES as BLOG_DIFFICULTIES } from "./addBlog.js";

// Short chip labels. `value` is what the post stores (CATEGORIES in addBlog.js).
const TOPIC_LABELS = {
  "Blockchain Development": "Blockchain",
  "Full Stack Development": "Full Stack",
  "Frontend Development": "Frontend",
  "Mobile Development": "Mobile",
  "Game Development": "Game Dev",
  "ML & AI": "AI & ML",
  "Backend Development": "Backend",
  "Quality Assurance": "QA",
  DevOps: "DevOps",
  "Data Science": "Data Science",
  Cybersecurity: "Cybersecurity",
  "Cloud Computing": "Cloud",
  "Database Management": "Database",
  "Quantum Computing": "Quantum",
};

export const BLOG_TOPICS = CATEGORIES.map((value) => ({
  label: TOPIC_LABELS[value] ?? value,
  value,
}));

export const DIFFICULTIES = BLOG_DIFFICULTIES;

// One ordering control. The old "Latest / Popular / Trending" tabs duplicated
// these and fought with them on the server (sort || filter).
export const SORT_OPTIONS = ["Newest", "Popular", "Most Viewed", "Oldest"];

export const READ_TIMES = ["< 5 min", "5–10 min", "10+ min"];
