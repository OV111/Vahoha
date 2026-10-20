/**
 * Capstone brief - clojure track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "clojure",
  categoryId: "languages",
  slug: "clojure-event-ingestion-service",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Event Ingestion API with core.async Pipeline",
  summary:
    "Build a Clojure web service that accepts JSON events over HTTP, validates them with clojure.spec, processes them " +
    "through a core.async pipeline, keeps live aggregates in atoms, and persists to a database with next.jdbc. " +
    "Pure functions sit at the core, side effects at the edges, and everything is tested and linted.",
  stack: ["Clojure 1.12", "deps.edn", "Ring + Reitit (or Compojure)", "core.async", "next.jdbc", "clojure.spec", "kaocha", "clj-kondo"],

  requirements: [
    {
      id: "deps",
      text: "The project uses deps.edn with aliases for :run, :test and :dev, and starts with `clojure -M:run`.",
      check: { type: "file", glob: "deps.edn" },
    },
    {
      id: "pure-core",
      text: "Business logic (validation, aggregation, windowing) is written as pure functions over persistent data structures, separate from I/O namespaces.",
      check: { type: "file", glob: "src/**/*.clj*" },
    },
    {
      id: "hof",
      text: "Aggregation uses map, filter, reduce, group-by and at least one transducer pipeline rather than explicit loops.",
    },
    {
      id: "lazy",
      text: "Reading a large event export uses lazy sequences or reducible I/O without loading the whole file in memory, and the README notes how holding the head of a sequence is avoided.",
    },
    {
      id: "spec",
      text: "Events are validated with clojure.spec (or Malli) at the API boundary, and invalid input returns a 400 with a readable explanation.",
    },
    {
      id: "http",
      text: "A Ring application exposes POST /events, GET /stats and GET /health, with middleware for JSON parsing, exception handling and request logging.",
    },
    {
      id: "core-async",
      text: "Accepted events go on a bounded core.async channel and a pipeline (pipeline or pipeline-async) enriches and writes them, with back-pressure when the buffer is full.",
    },
    {
      id: "state",
      text: "Live counters are kept in an atom updated with swap!, and the code explains why an atom is enough here versus refs and STM.",
    },
    {
      id: "macro",
      text: "One small macro (for example a timing or with-retry macro) is written with syntax-quote and shown to expand correctly in a test.",
    },
    {
      id: "db",
      text: "Events are persisted using next.jdbc with parameterized queries and a migration file (Postgres or SQLite).",
    },
    {
      id: "tests",
      text: "clojure.test tests, run through kaocha, cover pure functions, the HTTP handlers, and the pipeline.",
      check: { type: "file", glob: "test/**/*.clj" },
    },
    {
      id: "lint-ci",
      text: "clj-kondo reports no errors and a GitHub Actions workflow runs lint and tests on every push.",
      check: CHECKS.ci,
    },
    {
      id: "readme",
      text: "README covers REPL workflow, API examples, architecture and how to run the service.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    { id: "data", name: "Data-Oriented Design", weight: 15, layerId: "clojure-2", description: "Persistent data structures model the domain cleanly and updates are immutable." },
    { id: "fp", name: "Functional Style", weight: 15, layerId: "clojure-3", description: "Pure functions, composition and threading macros are used idiomatically, with transducers where they help." },
    { id: "state", name: "State & Concurrency", weight: 15, layerId: "clojure-5", description: "Mutable state is minimal and the atom use is correct and justified." },
    { id: "macros", name: "Macros", weight: 5, layerId: "clojure-6", description: "The macro is justified, hygienic and tested." },
    { id: "async", name: "core.async Pipeline", weight: 20, layerId: "clojure-7", description: "Channels, buffers and back-pressure are used correctly, with no blocking calls inside go blocks." },
    { id: "web", name: "Web Layer", weight: 15, layerId: "clojure-9", description: "Ring handlers and middleware are cleanly separated, validated and return correct status codes." },
    { id: "production", name: "Testing, Spec & Tooling", weight: 15, layerId: "clojure-10", description: "Specs, kaocha tests, clj-kondo and CI are in place and passing." },
  ],

  twistPool: [
    { id: "cljs-dashboard", text: "Add a ClojureScript dashboard (Reagent or Re-frame, built with shadow-cljs) that polls /stats and charts event counts." },
    { id: "stm-ledger", text: "Add a per-user quota using refs and dosync, and write a test proving two concurrent updates stay consistent." },
    { id: "sliding-window", text: "Implement a sliding-window rate limiter as a pure function and wire it in as Ring middleware." },
    { id: "property-tests", text: "Add property-based tests with test.check or spec generators for the aggregation functions." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
