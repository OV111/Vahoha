import { useEffect, useRef } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { toast } from "sonner";
import useAuthStore from "@/stores/useAuthStore";
import useProfileStore from "@/stores/useProfileStore";
import { isRecruiterBlockedPath } from "../../../../constants/recruiterAccess";
import { FEATURES } from "../../../../constants/features";
import { HIRING_HOME } from "../lib/landingPath";

/**
 * Sends a signed-in recruiter to hiring home when they open a learner-only page
 * (exams, mentor, chat…). The home page stays the same for everyone. Convenience only: the
 * server refuses those actions anyway (blockRecruiters). Until the profile has
 * loaded the role is unknown, so nothing is redirected yet.
 */
const RecruiterGate = ({ children }) => {
  const { pathname } = useLocation();
  const auth = useAuthStore((s) => s.auth);
  const role = useProfileStore((s) => s.user?.role);
  const isRecruiter = FEATURES.hiring && auth && role === "recruiter";
  const blocked = isRecruiter && isRecruiterBlockedPath(pathname);
  const warned = useRef(null);

  useEffect(() => {
    if (blocked && warned.current !== pathname) {
      warned.current = pathname;
      toast.info("Hiring accounts can view learning content, not take part.");
    }
  }, [blocked, pathname]);

  if (blocked) return <Navigate to={HIRING_HOME} replace />;
  return children;
};

export default RecruiterGate;
