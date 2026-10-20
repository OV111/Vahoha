/**
 * Capstone brief — elixir track (languages), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes: see go.js. Rubric weights sum to 100; layerId maps to this track's roadmap layers.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "elixir",
  categoryId: "languages",
  slug: "elixir-realtime-leaderboard",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Fault-Tolerant Real-Time Leaderboard with Phoenix LiveView",
  summary:
    "Build a live game leaderboard service in Elixir. Score events flow through supervised GenServer processes " +
    "backed by ETS, are persisted with Ecto, and stream to browsers in real time via Phoenix LiveView. " +
    "Tested with ExUnit and StreamData, and shipped as a mix release in Docker.",
  stack: ["Elixir 1.17+", "Phoenix 1.7+ / LiveView", "Ecto + PostgreSQL", "ExUnit", "mix release"],

  requirements: [
    {
      id: "mix-project",
      text: "A Mix project (Phoenix app) with a valid mix.exs and a mix.lock committed.",
      check: { type: "file", glob: "mix.exs" },
    },
    {
      id: "genserver-supervision",
      text: "Per-board state lives in a GenServer started under a DynamicSupervisor; killing one board process restarts it without affecting others.",
    },
    {
      id: "ets-cache",
      text: "Top-N reads are served from an ETS table with read concurrency, not by calling the GenServer for every read.",
    },
    {
      id: "ecto-persistence",
      text: "Score events are persisted with Ecto schemas, changesets and a migration; the board state is rebuilt from the database on restart.",
    },
    {
      id: "liveview",
      text: "A LiveView page shows the leaderboard and updates for all connected clients through Phoenix.PubSub without a page reload.",
    },
    {
      id: "pattern-matching",
      text: "Score-event handling uses pattern matching, guards and with/case pipelines, returning tagged {:ok, _} / {:error, _} tuples.",
    },
    {
      id: "macro",
      text: "At least one small, documented macro or behaviour (for example a use-able board definition) removes real duplication.",
    },
    {
      id: "tests",
      text: "ExUnit tests cover the GenServer, the context module and the LiveView, plus at least one StreamData property test.",
      check: { type: "file", glob: "test/**/*_test.exs" },
    },
    {
      id: "release",
      text: "A mix release configuration and a Dockerfile build and start the app.",
      check: CHECKS.dockerfile,
    },
    {
      id: "readme",
      text: "README covers architecture (supervision tree diagram), run commands and design decisions.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "GitHub Actions runs mix format --check-formatted, mix test and mix compile --warnings-as-errors.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    { id: "otp", name: "OTP design", weight: 25, layerId: "elixir-6", description: "Correct GenServer/Supervisor use, restart strategies and clear process boundaries." },
    { id: "processes", name: "Processes & messaging", weight: 10, layerId: "elixir-5", description: "Sensible use of message passing, call vs cast, and avoiding bottlenecks." },
    { id: "phoenix", name: "Phoenix, LiveView & Ecto", weight: 20, layerId: "elixir-11", description: "Clean contexts, changesets, migrations and a working real-time LiveView." },
    { id: "idiomatic", name: "Idiomatic Elixir", weight: 10, layerId: "elixir-2", description: "Pattern matching, guards, pipelines and tagged tuples used idiomatically." },
    { id: "testing", name: "Testing", weight: 15, layerId: "elixir-8", description: "ExUnit coverage, async tests where safe, and a meaningful property test." },
    { id: "ets-distribution", name: "ETS & concurrency", weight: 10, layerId: "elixir-9", description: "ETS used correctly for concurrent reads, with ownership and lifecycle handled." },
    { id: "production", name: "Releases & deploy", weight: 10, layerId: "elixir-10", description: "Runtime config, mix release, Dockerfile and CI that actually run." },
  ],

  twistPool: [
    { id: "multi-node", text: "Make boards work across two BEAM nodes using libcluster or Node.connect and a distributed registry, and document how you tested it." },
    { id: "presence", text: "Add Phoenix.Presence to show who is currently watching each board." },
    { id: "rate-limit", text: "Add a per-player token-bucket rate limiter for score submissions, built as a supervised process." },
    { id: "telemetry", text: "Emit :telemetry events for score submissions and expose them through a LiveDashboard page." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
