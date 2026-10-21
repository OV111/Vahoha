/**
 * Tag library resources with the roadmap layers they belong to (`layerIds`).
 *
 * Usage:
 *   node backend/scripts/tagLibraryLayers.js            dry run: prints what would change
 *   node backend/scripts/tagLibraryLayers.js --apply    writes it
 *
 * Adds to `layerIds` ($addToSet), so it is safe to re-run and never removes tags
 * another track's mapping added. Resources are matched by exact title, and the
 * script stops before writing if any title is missing. Do not re-run the
 * library seeder to get tags: it deletes and re-inserts every item, which
 * orphans users' saved resources.
 */

import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import connectDB from "../config/db.js";

const apply = process.argv.includes("--apply");

// layerId -> resource titles. Only strong matches: a layer with few items is
// better than a layer with filler.
const MERN = {
  "mern-1": [
    "Eloquent JavaScript",
    "MDN — CSS Flexbox",
    "MDN — CSS Grid Layout",
    "Web Accessibility (a11y) Guide",
    "CSS Selectors Cheatsheet",
  ],
  "mern-2": [
    "You Don't Know JS: Scope & Closures",
    "You Don't Know JS: Async & Performance",
    "JavaScript Event Loop Explained",
    "JavaScript: The Good Parts",
    "Eloquent JavaScript",
  ],
  "mern-3": ["Learning React", "React Official Docs", "React Hooks Cheatsheet"],
  "mern-4": ["Learning React", "React Official Docs", "React Hooks Cheatsheet", "React Router Documentation"],
  "mern-5": [
    "Express.js — Routing",
    "Express.js — Error Handling Guide",
    "Node.js Official Docs — Asynchronous Programming",
    "REST API Design Best Practices",
    "Express.js Cheatsheet",
    "Node.js Best Practices",
    "MDN — HTTP Status Codes",
    "Node.js Design Patterns",
  ],
  "mern-6": [
    "MongoDB Manual — CRUD Operations",
    "MongoDB Manual — Aggregation Pipeline",
    "MongoDB Query Operators Cheatsheet",
    "Mongoose Documentation",
  ],
  "mern-7": [
    "JWT.io — Introduction to JSON Web Tokens",
    "OWASP Top 10",
    "How HTTPS Works",
    "MDN — Cross-Origin Resource Sharing (CORS)",
    "MDN — Using HTTP Cookies",
    "OWASP Password Storage Cheat Sheet",
  ],
  "mern-8": [
    "Axios Documentation",
    "TanStack Query Documentation",
    "Zustand Documentation",
    "Vite — Getting Started",
    "REST API Design Best Practices",
  ],
  "mern-9": [
    "Jest Documentation",
    "Testing JavaScript — Kent C. Dodds",
    "Google Testing Blog — Test Sizes",
    "Supertest",
    "React Testing Library",
  ],
  "mern-10": [
    "Docker Official Docs",
    "Docker Deep Dive",
    "GitHub Actions Documentation",
    "The Twelve-Factor App",
    "How HTTPS Works",
    "Docker CLI Cheatsheet",
    "CI/CD Pipeline Best Practices",
    "Vercel Documentation",
    "Render Documentation",
  ],
};

const run = async () => {
  const db = await connectDB();
  const col = db.collection("libraryResources");

  const layersByTitle = new Map();
  for (const [layerId, titles] of Object.entries(MERN)) {
    for (const title of titles) {
      layersByTitle.set(title, [...(layersByTitle.get(title) ?? []), layerId]);
    }
  }

  const docs = await col
    .find({ title: { $in: [...layersByTitle.keys()] } }, { projection: { title: 1, layerIds: 1 } })
    .toArray();
  const found = new Set(docs.map((d) => d.title));
  const missing = [...layersByTitle.keys()].filter((t) => !found.has(t));
  if (missing.length > 0) {
    console.error(`No library item with these titles, nothing written:\n  ${missing.join("\n  ")}`);
    process.exit(1);
  }

  for (const [layerId, titles] of Object.entries(MERN)) {
    console.log(`${layerId}: ${titles.length} item(s)`);
  }

  if (!apply) {
    console.log(`\nDry run: ${docs.length} resources would be tagged. Add --apply to write.`);
    process.exit(0);
  }

  const result = await col.bulkWrite(
    docs.map((doc) => ({
      updateOne: {
        filter: { _id: doc._id },
        update: {
          $addToSet: { layerIds: { $each: layersByTitle.get(doc.title) } },
          // The old ObjectId field can never match a roadmap layer id.
          $unset: { layer_ids: "" },
        },
      },
    })),
  );
  console.log(`\nTagged ${docs.length} resources (${result.modifiedCount} changed).`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Tagging failed:", err);
  process.exit(1);
});
