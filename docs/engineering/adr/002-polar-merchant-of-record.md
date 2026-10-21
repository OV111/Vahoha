# ADR 002: Polar as merchant of record for billing

- **Status:** accepted (billing is built but inert)
- **Date:** 2026-10-01 (billing commit)
- **Basis:** **inferred** from `docs/engineering/BILLING.md` and the module. The reasoning is in the doc; the decision record is reconstructed.

## Context

The founder is in Armenia. Direct Stripe does not support Armenia, and selling globally means handling VAT and sales tax.

## Decision

Use Polar as the merchant of record. It is the legal seller, handles tax, and pays out through Stripe Connect Express. The backend creates checkouts, receives signed webhooks and stores one subscription document per user. Access is decided by a pure function over the stored subscription (`isEntitled`). Gates are inert until `BILLING_ENFORCED=true`.

## Alternatives considered

| Option | Why not |
|---|---|
| Stripe directly | Not available for Armenia |
| Lemon Squeezy / Paddle | `TODO: confirm` whether these were evaluated |

## Consequences

- Good: no tax handling in our code, card data never touches the site, the webhook is the single source of truth, replays and out-of-order events are safe.
- Bad: depends on Polar's API (pinned to a dated version) and payout onboarding; no Teams or seat checkout yet.
- Revisit when: real payments start, or a usage-based model is needed.

## Evidence

`backend/modules/billing/`, `docs/engineering/BILLING.md`, `render.yaml` (`BILLING_ENFORCED`).
