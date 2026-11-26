import { Navigate, Outlet } from "react-router-dom";
import LoadingSuspense from "@/components/feedback/LoadingSuspense";
import useAuthStore from "@/stores/useAuthStore";

// Layout route for pages that only make sense signed out (sign-up, sign-in).
// A signed-in user is sent home instead.
const RequireGuest = () => {
  const { auth, isLoading } = useAuthStore();

  if (isLoading) return <LoadingSuspense />;
  if (auth) return <Navigate to="/" replace />;

  return <Outlet />;
};

export default RequireGuest;
