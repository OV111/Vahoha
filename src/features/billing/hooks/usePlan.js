import useCachedResource from "@/hooks/useCachedResource";
import { fetchSubscription } from "@/features/billing/billingApi";

const PLAN_RANK = { free: 0, pro: 1 };

/**
 * The signed-in user's plan, and whether they may use a feature that needs
 * `minPlan`. Mirrors the server's canAccess: until billing is enforced everyone
 * has access. Cosmetic only; the server still checks every request.
 *
 * While the plan is loading `allowed` is null, so a gate can show nothing
 * instead of flashing the lock at a Pro user.
 */
export default function usePlan(minPlan = "pro", { enabled = true } = {}) {
  const { data, loading, error } = useCachedResource("billing", fetchSubscription, { staleMs: 5 * 60_000, enabled });

  // A failed lookup shows the feature: the server is the real check, and a
  // wrong lock in front of a paying user is worse than a server-side 403.
  if (error && !data) return { plan: null, allowed: true, loading: false };
  if (loading || !data) return { plan: null, allowed: null, loading: true };

  const allowed = !data.enforced || (PLAN_RANK[data.plan] ?? 0) >= PLAN_RANK[minPlan];
  return { plan: data.plan, allowed, loading: false };
}
