import { Link } from "react-router-dom";
import { Briefcase } from "lucide-react";
import useAuthStore from "@/stores/useAuthStore";
import useProfileStore from "@/stores/useProfileStore";
import { HIRE_CTA, HIRING_LOGIN_PATH } from "../../../../constants/hiring";
import { FEATURES } from "../../../../constants/features";

// The hiring door on a shared scorecard: recruiters usually arrive here from a
// link in an application, so this is where most of them first meet Vahoha.
// Hidden for signed-in recruiters, who already have a hiring account.
const HireCta = ({ name }) => {
  const auth = useAuthStore((s) => s.auth);
  const role = useProfileStore((s) => s.user?.role);
  if (!FEATURES.hiring || (auth && role === "recruiter")) return null;

  return (
    <aside className="flex flex-col gap-3 rounded-2xl border border-purple-500/30 bg-purple-500/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex gap-3">
        <Briefcase size={18} className="mt-0.5 shrink-0 text-purple-400" aria-hidden="true" />
        <div>
          <p className="font-medium text-white">{HIRE_CTA.title}</p>
          <p className="mt-0.5 text-sm text-neutral-400">{HIRE_CTA.body(name)}</p>
        </div>
      </div>
      <div className="flex shrink-0 items-center gap-3 text-sm">
        <Link to="/hiring/join" className="rounded-md bg-purple-600 px-4 py-2 font-semibold text-white hover:bg-purple-700">
          {HIRE_CTA.create}
        </Link>
        <Link to={HIRING_LOGIN_PATH} className="text-purple-300 hover:underline">
          Log in
        </Link>
      </div>
    </aside>
  );
};

export default HireCta;
