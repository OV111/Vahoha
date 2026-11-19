/**
 * Capstone brief — NestJS Developer track (nestjs-dev), v1.
 *
 * Drafted by Claude, 2026-11-19; needs a human review before publishing.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "nestjs-dev",
  categoryId: "backend",
  slug: "nestjs-dev-event-tickets",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Event ticketing API that never oversells",
  summary:
    "Build a NestJS backend for selling event tickets: organisers publish events with limited seats, buyers " +
    "reserve and pay, and the system must never sell more tickets than exist, even under concurrent requests. " +
    "Confirmation emails and PDF tickets run as background jobs, and buyers see seat counts update live.",
  stack: ["NestJS", "TypeScript", "Prisma", "PostgreSQL", "Redis", "BullMQ"],

  requirements: [
    { id: "modules", text: "The app is split into feature modules (auth, events, orders, tickets) with only the providers other modules need exported." },
    { id: "auth", text: "Users register and log in with hashed passwords and JWT access plus refresh tokens; routes are protected by a global guard with explicit public routes." },
    { id: "roles", text: "Only organisers can create and edit events, and only the event's own organiser can edit it or see its sales." },
    { id: "validation", text: "Every request body is validated with DTOs; unknown fields are rejected and errors use one consistent JSON shape." },
    { id: "no-oversell", text: "Reserving tickets is atomic: concurrent reservations for the last seats never sell more tickets than the event has." },
    { id: "hold-expiry", text: "Unpaid reservations expire after 10 minutes and their seats return to sale." },
    { id: "jobs", text: "Confirmation emails and ticket generation run as BullMQ jobs with retries; a job that runs twice never sends two emails." },
    { id: "live-seats", text: "A WebSocket gateway pushes the remaining seat count of an event to connected clients when it changes." },
    { id: "docs", text: "OpenAPI documentation is generated from the controllers and DTOs and served by the app." },
    { id: "ops", text: "Validated configuration, JSON logs with a request id, a health endpoint for the database and Redis, and graceful shutdown." },
    { id: "schema", text: "The data model is defined in a Prisma schema with migrations.", check: { type: "file", glob: "**/schema.prisma" } },
    { id: "tests", text: "Unit tests cover the reservation rules and E2E tests cover auth, ownership checks and the reserve-and-pay flow.", check: CHECKS.jsTests },
    { id: "readme", text: "README explains setup, environment variables, how to run the worker and the tests.", check: CHECKS.readme },
    { id: "docker", text: "API, worker, PostgreSQL and Redis start with one command.", check: CHECKS.compose },
    { id: "ci", text: "CI runs lint and tests on every push.", check: CHECKS.ci },
    { id: "no-secrets", text: "No secrets committed; configuration from environment variables with an .env.example.", check: CHECKS.envExample },
  ],

  rubric: [
    { id: "correctness", name: "Correctness", weight: 25, layerId: "nestjs-dev-5", description: "Reservations, payments, expiry and your twist work, and concurrent buyers can never oversell an event." },
    { id: "architecture", name: "Nest architecture", weight: 15, layerId: "nestjs-dev-3", description: "Modules, providers and dependency injection are used deliberately; no hidden globals or circular imports." },
    { id: "pipeline", name: "Request pipeline", weight: 15, layerId: "nestjs-dev-4", description: "Guards, pipes, interceptors and filters each do their own job, and errors reach clients in one consistent shape." },
    { id: "security", name: "Security", weight: 15, layerId: "nestjs-dev-6", description: "Password hashing, token handling, role and ownership checks, rate limits on auth routes." },
    { id: "async", name: "Jobs & real-time", weight: 15, layerId: "nestjs-dev-9", description: "Jobs retry safely without duplicate effects, and live seat counts stay correct." },
    { id: "tests", name: "Tests & operability", weight: 15, layerId: "nestjs-dev-8", description: "Tests exercise real behaviour including failure paths and concurrency; logs, health checks and shutdown work like a real service." },
  ],

  twistPool: [
    { id: "waitlist", text: "Sold-out events get a waitlist. When a reservation expires or is cancelled, the first person on the waitlist gets a 10-minute hold and an email." },
    { id: "promo-codes", text: "Organisers create promo codes with a discount, a usage limit and an expiry date; a code can never be used more times than its limit, even concurrently." },
    { id: "refunds", text: "Buyers can cancel up to 48 hours before the event. The ticket is voided, the seat returns to sale and a refund job is queued exactly once." },
    { id: "check-in", text: "Each ticket has a QR code. A check-in endpoint for organisers accepts a ticket once and rejects a second scan with a clear 409." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
