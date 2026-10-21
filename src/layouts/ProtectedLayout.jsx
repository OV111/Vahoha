import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../stores/useAuthStore";

// Layout route for every page that needs a session. Waits for the session
// check, then renders the page or redirects. <Navigate replace> instead of
// navigate() in an effect: no blank render before the redirect, and Back
// doesn't return to a page that would just bounce the user again.
const ProtectedLayout = () => {
  const { auth, isLoading } = useAuthStore();

  if (isLoading) return null;
  if (!auth) return <Navigate to="/get-started" replace />;

  return <Outlet />;
};

export default ProtectedLayout;
