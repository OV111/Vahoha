import React, { useEffect, Suspense } from "react";
import { RouterProvider } from "react-router-dom";
import { toast } from "sonner";
import "./index.css";

import router from "./router";
import LoadingSuspense from "./components/feedback/LoadingSuspense";
import AppToaster from "./components/feedback/AppToaster";
import useAuthStore from "./stores/useAuthStore";
import useNotificationStore from "./stores/useNotificationStore";
import useBlogInteractionsStore from "./stores/useBlogInteractionsStore";
import useProfileStore from "./stores/useProfileStore";


const App = () => {
  const { init, auth, session, expiredAt } = useAuthStore();
  const { connectWs, disconnectWs, clearNotifications, loadNotifications } = useNotificationStore();
  const { fetchInteractions, reset } = useBlogInteractionsStore();
  const { fetchProfile, clearProfile } = useProfileStore();

  useEffect(() => {
    init();
  }, [init]);

  // The session ended on its own (refresh cookie expired or revoked), so say
  // why the user is suddenly logged out and send them to log in again.
  useEffect(() => {
    if (!expiredAt) return;
    toast.error("Your session expired. Please log in again.");
    router.navigate("/get-started");
  }, [expiredAt]);

  useEffect(() => {
    if (auth) {
      reset();
      clearProfile();
      clearNotifications();
      connectWs();
      loadNotifications();
      fetchInteractions();
      fetchProfile();
    } else {
      disconnectWs();
      reset();
      clearProfile();
      clearNotifications();
    }
  }, [auth, session, clearNotifications, loadNotifications, clearProfile, connectWs, disconnectWs, fetchInteractions, fetchProfile, reset]);
  // No early return while the session check runs: public pages render right
  // away, and only the auth-dependent parts (route guards, navbar) wait on it.

  return (
    <React.Fragment>
      {/* The only Toaster in the app. Pages just call toast(); a second one
          mounted anywhere would render every toast twice. */}
      <AppToaster />
      <Suspense fallback={<LoadingSuspense />}>
        <RouterProvider router={router}></RouterProvider>
      </Suspense>
    </React.Fragment>
  );
};
export default App;
