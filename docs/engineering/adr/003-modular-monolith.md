# ADR 003: Feature-based modular monolith

- **Status:** accepted
- **Date:** 2026-10-11 (module restructure, per `docs/PILOT_STATUS.md`)
- **Basis:** **inferred** from the code layout and `PILOT_STATUS.md`.

## Context

One developer, one deployable, many features (community, exams, mentor, arena, capstone, teams, billing). Early code grew by file type, which made features hard to find and change.

## Decision

Keep a single Express process. Organise the backend as `backend/modules/<name>/` with `routes/`, `controllers/`, `services/`, `schemas/` and an `index.js` that is the module's only public entry point. A shared learning core lives in `backend/services/` and must not import from feature modules. The frontend mirrors it with `src/features/<name>/`. Services take `db` as a parameter, and controllers stay thin.

## Alternatives considered

| Option | Why not |
|---|---|
| Microservices | Operational cost for a solo developer with no scaling need |
| Layers by file type (the old shape) | Spreads one feature across the tree |

## Consequences

- Good: simple deploy, one database, easy refactors, clear ownership per folder.
- Bad: some deep imports across modules remain (teams to capstone, account to billing, chat to profile). There is no repository layer yet, so services call `db.collection()` directly. State (WebSocket rooms, rate limits) is in memory, so it must stay on one instance.
- Revisit when: more than one instance is needed (move shared state to Redis), or after deploy for the planned repository layer (A1 to A7 in `PILOT_STATUS.md`).

## Evidence

`backend/app.js`, `backend/modules/*/index.js`, `docs/PILOT_STATUS.md` (architecture refactor plan), [Architecture](../ARCHITECTURE.md).
