/**
 * Capstone brief — ASP.NET Core Developer track (aspnet-dev), v1.
 *
 * Drafted by Claude, 2026-11-19; needs a human review before publishing.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "aspnet-dev",
  categoryId: "backend",
  slug: "aspnet-dev-clinic-booking",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Clinic appointment booking API",
  summary:
    "Build an ASP.NET Core backend for a small clinic network: doctors publish their availability, patients book " +
    "and cancel appointments, and two patients can never book the same slot. Reminders go out from a background " +
    "worker, calls to an external SMS provider survive outages, and the service runs like production software.",
  stack: ["C#", "ASP.NET Core", "EF Core", "PostgreSQL", "Redis", "Docker"],

  requirements: [
    { id: "auth", text: "Patients and doctors log in with ASP.NET Core Identity and JWT bearer tokens; every endpoint requires authentication unless explicitly public." },
    { id: "policies", text: "Authorization uses named policies: only doctors manage availability, and patients can only see and cancel their own appointments." },
    { id: "validation", text: "Requests bind to DTOs, never to EF entities; invalid input returns a 400 ProblemDetails response and every other error also uses ProblemDetails." },
    { id: "no-double-booking", text: "Booking is safe under concurrency: two patients booking the same slot at the same time result in one booking and one 409." },
    { id: "efcore", text: "Data access uses EF Core with migrations, AsNoTracking for reads and projections so list endpoints do not load whole entities." },
    { id: "pagination", text: "Appointment lists use keyset pagination and are backed by indexes that match their filters." },
    { id: "reminders", text: "A background worker sends reminders 24 hours before each appointment, exactly once, and stops cleanly on shutdown." },
    { id: "resilience", text: "Calls to the external SMS provider go through IHttpClientFactory with a timeout, retries with backoff and a circuit breaker." },
    { id: "caching", text: "Doctor availability is cached and the cache is cleared when a doctor changes their availability or a slot is booked." },
    { id: "ops", text: "OpenAPI document, health checks for the database and Redis, OpenTelemetry traces and structured logs." },
    { id: "project", text: "The solution builds with the dotnet CLI.", check: { type: "file", glob: "**/*.csproj" } },
    { id: "tests", text: "Unit tests cover booking rules and integration tests with WebApplicationFactory cover auth, policies and double booking.", check: { type: "file", glob: "**/*Tests*/**/*.cs" } },
    { id: "readme", text: "README explains setup, configuration, migrations and how to run the tests.", check: CHECKS.readme },
    { id: "docker", text: "The API, PostgreSQL and Redis start with one command.", check: CHECKS.compose },
    { id: "ci", text: "CI builds and runs the tests on every push.", check: CHECKS.ci },
  ],

  rubric: [
    { id: "correctness", name: "Correctness", weight: 25, layerId: "aspnet-dev-3", description: "Booking, cancelling, availability and your twist work, with correct status codes and ProblemDetails errors." },
    { id: "data", name: "Data & concurrency", weight: 20, layerId: "aspnet-dev-5", description: "No double bookings under concurrent requests; queries are projected, paginated and indexed." },
    { id: "security", name: "Security", weight: 15, layerId: "aspnet-dev-6", description: "Identity, token validation, policies and ownership checks; no endpoint leaks another patient's data." },
    { id: "background", name: "Background work & resilience", weight: 15, layerId: "aspnet-dev-8", description: "Reminders are sent exactly once, and an SMS provider outage never breaks booking." },
    { id: "tests", name: "Tests", weight: 15, layerId: "aspnet-dev-7", description: "Tests run against a real database and cover failure paths, permissions and concurrency." },
    { id: "operability", name: "Operability", weight: 10, layerId: "aspnet-dev-10", description: "Health checks, traces, logs and container setup behave like a service you could run in production." },
  ],

  twistPool: [
    { id: "waitlist", text: "Patients can join a waitlist for a fully booked day. When an appointment is cancelled, the first patient on the waitlist is offered the slot for 15 minutes." },
    { id: "time-zones", text: "Clinics are in different time zones. Availability is entered in the clinic's local time, stored in UTC, and shown to patients in their own time zone, including around daylight-saving changes." },
    { id: "no-show-policy", text: "A patient who misses three appointments in 90 days can only book one appointment at a time until an admin clears the flag." },
    { id: "audit-log", text: "Every change to an appointment is written to an append-only audit log in the same transaction, and doctors can read the history of their appointments." },
  ],

  rules: COMMON_RULES,
  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
