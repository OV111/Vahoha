/**
 * Capstone brief — system-design track (cs), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes:
 * - requirements[].check is for the stage-2 automated checks. `file` is a glob
 *   matched against the repo tree at the pinned commit. Requirements without a
 *   check are judged only by the AI rubric review.
 * - rubric[].weight values sum to 100. rubric[].layerId maps a weak criterion
 *   back to the roadmap layer that teaches it, for weak-spot tracking.
 * - Bump `version` for any change that affects grading; never edit a
 *   published version in place (attempts point at the exact brief document).
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "system-design",
  categoryId: "cs",
  slug: "system-design-url-shortener-at-scale",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "URL Shortener Built to Scale: Design Doc Plus Working System",
  summary:
    "Design a URL shortener for 100M new links a month and 10:1 read-to-write traffic, then build a working " +
    "miniature of it that runs with one docker compose command: load balancer, stateless API replicas, a database, " +
    "a cache, a rate limiter, an async click-analytics pipeline and metrics. The design document with real " +
    "estimates and trade-offs matters as much as the code, and a load test shows where your design bends.",
  stack: [
    "Any backend language (Node.js, Go or Python)",
    "PostgreSQL",
    "Redis",
    "NGINX",
    "Docker Compose",
    "Prometheus",
    "k6",
  ],

  requirements: [
    {
      id: "design-doc",
      text: "docs/DESIGN.md states functional and non-functional requirements, then back-of-envelope estimates (QPS, storage over 5 years, bandwidth, cache size) with the arithmetic shown.",
      check: { type: "file", glob: "docs/DESIGN.md" },
    },
    {
      id: "architecture-diagram",
      text: "The design doc contains an architecture diagram (Mermaid in markdown, or an image in docs/) showing every component and the data flow for a create and a redirect request.",
    },
    {
      id: "adrs",
      text: "At least four short decision records in docs/adr/ (for example ID generation, SQL vs NoSQL, cache strategy, 301 vs 302), each listing the alternatives considered and why they lost.",
      check: { type: "file", glob: "docs/adr/*.md" },
    },
    {
      id: "api-design",
      text: "The create endpoint is idempotent (same Idempotency-Key returns the same short link), the list endpoint uses cursor pagination, and errors follow one documented format.",
    },
    {
      id: "id-generation",
      text: "Short codes are generated without a single-point-of-failure counter (for example base62 of a Snowflake-style ID or pre-allocated ID ranges) and a test shows two replicas never issue the same code.",
    },
    {
      id: "load-balancing",
      text: "NGINX (or similar) load balances at least two API replicas with health checks, and killing one replica does not break redirects.",
      check: {
        type: "file",
        glob: "**/{nginx*.conf,nginx/**/*.conf,haproxy.cfg,Caddyfile}",
      },
    },
    {
      id: "data-model",
      text: "The database schema has the indexes the read path needs, and the design doc explains how the data would be partitioned or sharded (for example by hash of the code) and what breaks at 10x scale.",
    },
    {
      id: "caching",
      text: "Redirects use cache-aside with a TTL, negative caching for unknown codes, and protection against a cache stampede on a hot key; the doc states the expected hit rate and invalidation behaviour.",
    },
    {
      id: "rate-limiting",
      text: "A per-client rate limiter (token bucket or sliding window in Redis) returns 429 with a Retry-After header, and a test proves the limit holds across two API replicas.",
    },
    {
      id: "async-analytics",
      text: "Click events are published to a queue or stream (Redis Streams, Kafka or RabbitMQ) and counted by a separate consumer that is idempotent, so a redelivered event is not double counted; the redirect path never waits on analytics.",
    },
    {
      id: "resilience",
      text: "If Redis or the analytics queue is down, redirects still work (graceful degradation); outbound calls use timeouts, and the behaviour is demonstrated in a test or script.",
    },
    {
      id: "observability",
      text: "Each service exposes Prometheus metrics (request rate, errors, latency histogram, cache hit ratio) and the repo includes a Prometheus config and a dashboard or alert rule written against an SLO stated in the doc.",
      check: { type: "file", glob: "**/prometheus*.{yml,yaml}" },
    },
    {
      id: "compose",
      text: "docker compose up starts the whole system with no manual steps, and the README gives the exact commands.",
      check: CHECKS.compose,
    },
    {
      id: "load-test",
      text: "A k6 script runs a 10:1 read/write mix, and the README reports p50/p95/p99 latency, throughput and the first bottleneck you found, with the change you made to fix it.",
      check: { type: "file", glob: "{loadtest,k6,load-tests,perf}/**/*.js" },
    },
    {
      id: "tests",
      text: "Automated tests cover ID uniqueness, idempotency, the rate limiter and cache behaviour.",
      check: {
        type: "file",
        glob: "**/{test_*.py,*_test.go,*.test.{js,ts},*.spec.{js,ts}}",
      },
    },
    {
      id: "ci",
      text: "CI workflow runs the tests on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    {
      id: "requirements-estimation",
      name: "Requirements & Estimation",
      weight: 15,
      layerId: "system-design-1",
      description:
        "Clear scope, realistic numbers, and arithmetic that actually drives later decisions.",
    },
    {
      id: "api-load-balancing",
      name: "API Design & Load Balancing",
      weight: 10,
      layerId: "system-design-2",
      description:
        "Idempotent, paginated API behind a load balancer with health checks.",
    },
    {
      id: "storage-sharding",
      name: "Data Modeling & Scaling Data",
      weight: 15,
      layerId: "system-design-4",
      description:
        "Right database choice and indexes, with a believable partitioning story and ID generation.",
    },
    {
      id: "caching",
      name: "Caching",
      weight: 15,
      layerId: "system-design-5",
      description:
        "Cache-aside with TTLs, negative caching, stampede protection and honest hit-rate reasoning.",
    },
    {
      id: "async-processing",
      name: "Asynchronous Processing",
      weight: 10,
      layerId: "system-design-6",
      description:
        "Decoupled analytics with idempotent consumers and delivery semantics stated correctly.",
    },
    {
      id: "reliability",
      name: "Rate Limiting & Resilience",
      weight: 15,
      layerId: "system-design-9",
      description:
        "Working distributed rate limiter, timeouts, and graceful degradation when dependencies fail.",
    },
    {
      id: "observability",
      name: "Observability & Capacity",
      weight: 10,
      layerId: "system-design-10",
      description:
        "Useful metrics, an SLO, and a load test that finds and fixes a real bottleneck.",
    },
    {
      id: "trade-offs",
      name: "Trade-off Reasoning",
      weight: 10,
      layerId: "system-design-11",
      description:
        "Decision records name alternatives and the cost of each choice, and the doc says what would change at 10x scale.",
    },
  ],

  twistPool: [
    {
      id: "custom-aliases",
      text: "Add custom vanity aliases with collision handling and reserved words, and explain in the doc how this changes the ID generation and cache design.",
    },
    {
      id: "multi-region",
      text: "Extend the design doc (and a compose profile that simulates it) to two regions: where writes go, how reads stay fast, and what consistency users see after creating a link.",
    },
    {
      id: "expiring-links",
      text: "Add link expiry and deletion with a background job, and show how expired links are evicted from the cache and the database without a full scan.",
    },
    {
      id: "abuse-detection",
      text: "Add a malicious-URL check as an async pipeline stage that can quarantine a link after it was created, without slowing the create endpoint.",
    },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
