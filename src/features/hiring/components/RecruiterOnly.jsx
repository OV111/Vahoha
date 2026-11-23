import { Link } from "react-router-dom";
import useProfileStore from "@/stores/useProfileStore";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";

// Wraps pages only hiring accounts use (/candidates). The server refuses
// everyone else anyway; this just says so instead of showing a broken page.
const RecruiterOnly = ({ children }) => {
  const user = useProfileStore((s) => s.user);
  if (!user)
    return <LoadingSuspense />;
  if (user.role !== "recruiter")
    return (
      <div className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="text-white">This page is for hiring accounts.</p>
        <Link to="/hiring/join" className="mt-4 inline-block text-purple-500 hover:underline">Create a hiring account</Link>
      </div>
    );
  return children;
};

export default RecruiterOnly;
