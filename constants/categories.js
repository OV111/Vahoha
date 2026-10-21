/**
 * Where a category link goes: its roadmap domain (/roadmaps?domain=<id>), or its
 * own page when it has one (Foundations). The /categories/* pages were removed.
 */
export const categoryHref = ({ id, path }) => path ?? `/roadmaps?domain=${id}`;

/**
 * Featured domains for the navbar Learn tracks, footer Topics and category search.
 * Each `id` must match one in ROADMAP_DOMAINS (except Foundations, which has `path`).
 * Domains that only live on /roadmaps belong in ROADMAP_DOMAINS, not here.
 */
export const CATEGORY_OPTIONS = [
  { id: "foundations", title: "Foundations", slug: "foundations", path: "/foundations" },
  { id: "languages", title: "Languages", slug: "languages" },
  { id: "fullstack", title: "Full Stack", slug: "fullstack" },
  { id: "aiml", title: "AI & ML", slug: "ai&ml" },
  { id: "devops", title: "DevOps", slug: "devops" },
  { id: "datascience", title: "Data Science", slug: "datascience" },
  { id: "cybersecurity", title: "Cybersecurity", slug: "cybersecurity" },
];

/**
 * Roadmap catalog domains. `id` must match a key on TRACKS in roadmapPaths.js.
 * Coming-soon domains stay listed so the catalog can show them as planned.
 */
export const ROADMAP_DOMAINS = [
  { id: "languages", title: "Languages", slug: "languages" },
  { id: "cs", title: "CS & Interviews", slug: "cs" },
  { id: "fullstack", title: "Full Stack", slug: "fullstack" },
  { id: "backend", title: "Backend", slug: "backend" },
  { id: "mobile", title: "Mobile", slug: "mobile" },
  { id: "aiml", title: "AI & ML", slug: "ai&ml" },
  { id: "datascience", title: "Data Science", slug: "datascience" },
  { id: "gamedev", title: "Game Dev", slug: "gamedev" },
  { id: "devops", title: "DevOps", slug: "devops" },
  { id: "cloud", title: "Cloud Computing", slug: "cloud" },
  { id: "qa", title: "QA", slug: "qa" },
  { id: "database", title: "Database Management", slug: "database" },
  { id: "cybersecurity", title: "Cybersecurity", slug: "cybersecurity" },
  { id: "web3", title: "Web3", slug: "web3" },
  { id: "blockchain", title: "Blockchain", slug: "blockchain" },
  { id: "quantum", title: "Quantum Computing", slug: "quantum" },
];
