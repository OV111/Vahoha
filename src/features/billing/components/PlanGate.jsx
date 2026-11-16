import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import usePlan from "../hooks/usePlan";

/**
 * Shows `children` to users whose plan includes the feature, an upgrade prompt
 * to everyone else.
 *
 *   <PlanGate plan="pro"><CertificateCard /></PlanGate>
 *
 * This hides UI only. The route behind the feature must also use
 * requirePlan (backend/middleware/requirePlan.js), or a free user can call it directly.
 */
const PlanGate = ({ plan = "pro", fallback, children }) => {
  const { allowed } = usePlan(plan);

  if (allowed === null) return null;
  if (allowed) return children;
  if (fallback !== undefined) return fallback;

  return (
    <div className="flex items-center gap-3 rounded-lg border border-zinc-200 p-4 text-sm dark:border-zinc-800">
      <Lock className="size-4 shrink-0 text-zinc-500" aria-hidden="true" />
      <p className="flex-1 text-zinc-600 dark:text-zinc-400">This is part of Pro.</p>
      <Link to="/pricing" className="font-medium text-zinc-900 underline-offset-4 hover:underline dark:text-zinc-100">
        See Pro
      </Link>
    </div>
  );
};

export default PlanGate;
