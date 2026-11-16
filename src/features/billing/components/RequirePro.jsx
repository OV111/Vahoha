import { Navigate, Outlet, useLocation } from "react-router-dom";
import usePlan from "../hooks/usePlan";

/**
 * Layout route for Pro pages. Nest it inside ProtectedLayout, so guests are
 * sent to sign up first and only signed-in free users land here:
 *
 *   { element: <RequirePro />, children: [{ path: "libs", element: <LibsPage /> }] }
 *
 * A free user is redirected to /pricing, with the page they wanted in state so
 * the pricing page can say what they tried to open. Inert until billing is
 * enforced (usePlan allows everyone before that).
 *
 * This only steers navigation. The API behind the page must use requirePlan
 * (backend/middleware/requirePlan.js); that is the check that actually protects it.
 */
const RequirePro = () => {
  const { allowed } = usePlan("pro");
  const location = useLocation();

  if (allowed === null) return null;
  if (!allowed) {
    return <Navigate to="/pricing" replace state={{ from: location.pathname, reason: "pro" }} />;
  }
  return <Outlet />;
};

export default RequirePro;
