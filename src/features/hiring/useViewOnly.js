import useAuthStore from "@/stores/useAuthStore";
import useProfileStore from "@/stores/useProfileStore";
import { FEATURES } from "@/constants/features";

export const VIEW_ONLY_HINT = "Hiring accounts can view this, not take part.";

/**
 * For buttons on view-only learner pages: true for a hiring account, so the
 * button can render disabled with VIEW_ONLY_HINT as its title. The server
 * refuses the action anyway; this just says so before the click.
 */
export default function useViewOnly() {
  const auth = useAuthStore((s) => s.auth);
  const role = useProfileStore((s) => s.user?.role);
  return Boolean(FEATURES.hiring && auth && role === "recruiter");
}
