/**
 * Capstone brief — haskell track (languages), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes: see go.js. Rubric weights sum to 100; layerId maps to this track's roadmap layers.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "haskell",
  categoryId: "languages",
  slug: "haskell-typed-task-api",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Type-Safe Task Tracker API with Servant and STM",
  summary:
    "Build a task-tracking web API in Haskell. The API is described as a Servant type, the domain uses ADTs and " +
    "smart constructors, shared in-memory state uses STM, and data is stored in PostgreSQL via Persistent. " +
    "Tested with Hspec and QuickCheck, built with Cabal or Stack.",
  stack: ["GHC 9.x", "Cabal or Stack", "Servant", "Persistent + PostgreSQL", "STM", "Hspec + QuickCheck"],

  requirements: [
    {
      id: "cabal-project",
      text: "A Cabal (.cabal) or Stack (stack.yaml) project with library, executable and test-suite components.",
      check: { type: "file", glob: "{*.cabal,stack.yaml,package.yaml}" },
    },
    {
      id: "adt-domain",
      text: "Domain types (Task, Status, Priority) are ADTs with smart constructors returning Either or Maybe for invalid input; no partial functions such as head or fromJust.",
    },
    {
      id: "typeclasses",
      text: "At least one custom type class with two or more instances, plus derived Eq, Show and Ord where they fit.",
    },
    {
      id: "servant-api",
      text: "The HTTP API is declared as a Servant API type with JSON endpoints for create, list, update and delete, with handlers separated from the API definition.",
    },
    {
      id: "monad-stack",
      text: "Handlers run in an application monad (ReaderT over IO or similar) carrying config and a DB pool; errors become Servant error responses via Either/ExceptT.",
    },
    {
      id: "persistence",
      text: "Tasks are stored with Persistent (or an equivalent typed SQL library) and a schema migration.",
    },
    {
      id: "stm-concurrency",
      text: "A concurrent feature (for example a rate limiter or live task counter) uses TVar/STM, with a test that exercises it from multiple threads.",
    },
    {
      id: "tests",
      text: "Hspec specs cover the pure domain and the API, and QuickCheck properties cover at least two laws or invariants.",
      check: { type: "file", glob: "test/**/*.hs" },
    },
    {
      id: "readme",
      text: "README covers architecture, how to build and run, and example API calls.",
      check: CHECKS.readme,
    },
    {
      id: "docker",
      text: "A multi-stage Dockerfile builds and runs the executable.",
      check: CHECKS.dockerfile,
    },
    {
      id: "ci",
      text: "GitHub Actions builds with the pinned GHC version and runs the test suite, with -Wall warnings clean.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    { id: "types", name: "ADTs & domain modelling", weight: 15, layerId: "haskell-4", description: "Illegal states made hard to represent; total functions; useful Maybe/Either." },
    { id: "classes", name: "Type classes", weight: 10, layerId: "haskell-3", description: "Well-motivated classes and instances, lawful where laws exist." },
    { id: "monads", name: "Functor/Applicative/Monad", weight: 15, layerId: "haskell-5", description: "Fluent use of the abstractions, including validation and error handling." },
    { id: "io", name: "IO & effects separation", weight: 10, layerId: "haskell-6", description: "Pure core with effects pushed to the edges." },
    { id: "ecosystem", name: "Tooling", weight: 10, layerId: "haskell-7", description: "Clean cabal/stack file, bounded dependencies, reproducible build." },
    { id: "concurrency", name: "STM & concurrency", weight: 15, layerId: "haskell-9", description: "Correct atomic transactions, no deadlocks, concurrent test." },
    { id: "production", name: "Servant & deployment", weight: 15, layerId: "haskell-10", description: "Working typed API, persistence and a Docker image that runs." },
    { id: "advanced-types", name: "Advanced types", weight: 10, layerId: "haskell-8", description: "Judicious use of GADTs, DataKinds or type families where they remove bugs (for example typed task states)." },
  ],

  twistPool: [
    { id: "typed-state", text: "Encode the task lifecycle (Open, InProgress, Done) at the type level with DataKinds so invalid transitions fail to compile." },
    { id: "auth", text: "Add JWT authentication using servant-auth, with a protected route tree." },
    { id: "openapi", text: "Generate an OpenAPI document from the Servant API type and serve it." },
    { id: "async-jobs", text: "Add a background worker using async and a TQueue that sends overdue-task reminders, with graceful shutdown." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
