/**
 * Capstone brief — scala track (languages), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes: see go.js. Rubric weights sum to 100; layerId maps to this track's roadmap layers.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "scala",
  categoryId: "languages",
  slug: "scala-inventory-service",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Purely Functional Inventory REST Service with Cats Effect",
  summary:
    "Build an inventory and reservation HTTP service in Scala 3 using Cats Effect, http4s and Doobie. " +
    "Model the domain with ADTs and type classes, keep effects in IO, test with ScalaTest and ScalaCheck, " +
    "and package it with sbt into a Docker image.",
  stack: ["Scala 3", "sbt", "Cats Effect", "http4s", "Doobie + PostgreSQL", "ScalaTest + ScalaCheck"],

  requirements: [
    {
      id: "sbt-build",
      text: "An sbt build with build.sbt, a pinned project/build.properties and at least two modules (for example domain and app).",
      check: { type: "file", glob: "build.sbt" },
    },
    {
      id: "adt-domain",
      text: "The domain is modelled with sealed traits / enums and case classes; invalid states (for example negative stock) are unrepresentable or rejected with a typed error.",
    },
    {
      id: "type-class",
      text: "At least one custom type class with given instances (for example a pricing abstraction) is defined and used.",
    },
    {
      id: "error-adt",
      text: "Failures are returned as an error ADT using Either or EitherT, not thrown exceptions, and mapped to HTTP status codes in one place.",
    },
    {
      id: "cats-effect",
      text: "All side effects (DB, clock, logging) are wrapped in IO; resources are managed with Resource; main extends IOApp.",
    },
    {
      id: "http4s-routes",
      text: "http4s routes expose create/list/reserve/release endpoints with JSON encoding and decoding (circe).",
    },
    {
      id: "doobie-db",
      text: "Persistence uses Doobie with a transactor, parameterised queries and a migration tool (Flyway or similar); reservation is atomic.",
    },
    {
      id: "tests",
      text: "ScalaTest suites cover services and routes, and ScalaCheck properties check at least one invariant (for example stock never goes negative).",
      check: { type: "file", glob: "**/src/test/scala/**/*.scala" },
    },
    {
      id: "docker",
      text: "A Dockerfile (or sbt-native-packager config) builds a runnable image; a compose file starts the service with PostgreSQL.",
      check: CHECKS.dockerfile,
    },
    {
      id: "readme",
      text: "README documents the architecture, API with example requests, and run/test commands.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "GitHub Actions compiles and runs sbt test on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    { id: "fp-core", name: "Functional style", weight: 15, layerId: "scala-3", description: "Immutable data, Option/Either, map/flatMap and for-comprehensions used cleanly." },
    { id: "adts", name: "ADTs & pattern matching", weight: 15, layerId: "scala-4", description: "Sealed hierarchies, exhaustive matches and expressive error modelling." },
    { id: "typeclasses", name: "Type classes", weight: 10, layerId: "scala-5", description: "Sensible given/using instances without implicit abuse." },
    { id: "effects", name: "Cats Effect", weight: 20, layerId: "scala-8", description: "Effects kept in IO, resources released correctly, no blocking on the compute pool." },
    { id: "production", name: "http4s & Doobie", weight: 15, layerId: "scala-10", description: "Working API, atomic transactions, config and Docker packaging." },
    { id: "testing", name: "Testing", weight: 15, layerId: "scala-9", description: "Meaningful ScalaTest cases and at least one real ScalaCheck property." },
    { id: "build", name: "sbt structure", weight: 10, layerId: "scala-6", description: "Multi-module build, clear dependencies and reproducible versions." },
  ],

  twistPool: [
    { id: "reservation-expiry", text: "Reservations expire after a TTL, released by a background fiber that shuts down cleanly with the app." },
    { id: "no-oversell", text: "Prove concurrent reservations never oversell by adding a test with parallel fibers against a real database." },
    { id: "streaming-export", text: "Add an fs2 streaming endpoint that exports the inventory as NDJSON without loading it all into memory." },
    { id: "metrics", text: "Expose Prometheus-style metrics (request counts and latency) using an http4s middleware." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
