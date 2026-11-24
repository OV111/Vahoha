import { Navigate, Outlet } from "react-router-dom";
import LoadingSuspense from "../components/feedback/LoadingSuspense";
import ServerDown from "../components/feedback/ServerDown";
import useAuthStore from "../stores/useAuthStore";
import { DEVELOPER_SIGNUP_PATH } from "../../constants/site";

// Layout route for every page that needs a session. Waits for the session
// check, then renders the page or redirects. <Navigate replace> instead of
// navigate() in an effect: no blank render before the redirect, and Back
// doesn't return to a page that would just bounce the user again.
const ProtectedLayout = () => {
  const { auth, isLoading, sessionHint } = useAuthStore();

  if (isLoading) return <LoadingSuspense />;
  // The hint is dropped when the server says "no session", so a hint that is still
  // here means the check never got an answer. That is not a reason to sign anyone out.
  if (!auth && sessionHint) return <ServerDown />;
  if (!auth) return <Navigate to={DEVELOPER_SIGNUP_PATH} replace />;

  return <Outlet />;
};

export default ProtectedLayout;
