/**
 * Capstone brief - fsharp track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "fsharp",
  categoryId: "languages",
  slug: "fsharp-order-domain-api",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Type-Driven Order Management API",
  summary:
    "Model an order workflow (draft, placed, paid, shipped, cancelled) in F# with discriminated unions, constrained types " +
    "and Result-based validation, then expose it as a Giraffe web API with an event-sourced history. The domain core is pure " +
    "and tested with Expecto and FsCheck, so illegal states cannot be represented.",
  stack: [".NET 9", "F# 9", "Giraffe", "Expecto", "FsCheck", "Fantomas", "Docker"],

  requirements: [
    {
      id: "solution",
      text: "The solution has separate projects: a Domain library (no I/O), an Api project and a Tests project, each with an .fsproj.",
      check: { type: "file", glob: "**/*.fsproj" },
    },
    {
      id: "domain-types",
      text: "Domain types use single-case discriminated unions for value objects (OrderId, Email, Quantity) with smart constructors that return Result.",
      check: { type: "file", glob: "**/*.fs" },
    },
    {
      id: "state-machine",
      text: "Order state is a discriminated union where each state carries only its own data, and transitions are functions that only accept the valid previous state.",
    },
    {
      id: "pattern-matching",
      text: "State transitions and command handling use exhaustive match expressions, active patterns for at least one parsing rule, and no wildcard that hides a missing case.",
    },
    {
      id: "result-ce",
      text: "Validation of an incoming command is composed with a result computation expression (or FsToolkit.ErrorHandling) that collects a clear error type.",
    },
    {
      id: "pipelines",
      text: "Collection work (totals, discounts, reports) uses List, Seq and Map module pipelines with |> and composition, and avoids mutable variables.",
    },
    {
      id: "event-sourcing",
      text: "State changes are recorded as events, and the current order is rebuilt by folding the event list. A test proves replay gives the same state.",
    },
    {
      id: "async",
      text: "I/O (persistence and an external payment stub) uses task or async workflows with CancellationToken support and no blocking calls.",
    },
    {
      id: "api",
      text: "A Giraffe API exposes create, pay, ship, cancel and get endpoints, maps domain errors to HTTP status codes and uses JSON serialization with a shared DTO layer.",
    },
    {
      id: "tests",
      text: "Expecto tests cover each transition, and FsCheck property tests prove at least two invariants (for example totals never negative, cancelled orders cannot be shipped).",
      check: { type: "file", glob: "**/*Tests*/**/*.fs" },
    },
    {
      id: "format-ci",
      text: "Fantomas formatting is checked and dotnet build and dotnet test run on every push in GitHub Actions.",
      check: CHECKS.ci,
    },
    {
      id: "dockerfile",
      text: "A multi-stage Dockerfile builds and runs the API.",
      check: CHECKS.dockerfile,
    },
    {
      id: "readme",
      text: "README includes a diagram of the state machine, API examples and the run instructions.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    { id: "pure", name: "Immutability & Pure Core", weight: 10, layerId: "fsharp-2", description: "The domain is pure and immutable, and side effects live only at the edges." },
    { id: "matching", name: "Pattern Matching", weight: 15, layerId: "fsharp-3", description: "Matches are exhaustive and expressive, and the compiler enforces the state machine." },
    { id: "types", name: "Type-Driven Design", weight: 20, layerId: "fsharp-5", description: "Illegal states are unrepresentable; unions, records, Option and Result model the domain precisely." },
    { id: "ce", name: "Computation Expressions & Async", weight: 15, layerId: "fsharp-6", description: "Result and async/task expressions are used cleanly, with cancellation handled." },
    { id: "domain", name: "Domain Modeling", weight: 15, layerId: "fsharp-8", description: "Value objects, workflow functions and events follow clear domain modeling practice." },
    { id: "web", name: "Web API", weight: 10, layerId: "fsharp-9", description: "Giraffe handlers are small, composable and map errors to correct HTTP responses." },
    { id: "quality", name: "Testing & Tooling", weight: 15, layerId: "fsharp-10", description: "Expecto and FsCheck tests are meaningful and the project is formatted and built in CI." },
  ],

  twistPool: [
    { id: "fable-ui", text: "Add a small Fable client (Elmish) that shares the DTO types with the server and lists and updates orders." },
    { id: "persistence", text: "Persist the event stream in PostgreSQL with Npgsql and optimistic concurrency on a stream version." },
    { id: "saga", text: "Add a payment and shipping saga with retries and a compensating cancel step, tested with a fake clock." },
    { id: "units", text: "Use units of measure for currency amounts and quantities so mixing them is a compile error." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
