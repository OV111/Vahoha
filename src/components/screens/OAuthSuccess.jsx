import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import useAuthStore from "@/stores/useAuthStore";
import { landingPath } from "@/features/hiring/lib/landingPath";

const OAuthSuccess = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { init } = useAuthStore();

  useEffect(() => {
    const linked = searchParams.get("linked");
    (async () => {
      await init();
      const { auth } = useAuthStore.getState();
      if (auth) {
        navigate(linked ? "/my-profile/connected-accounts" : await landingPath("/"));
      } else {
        navigate("/get-started");
      }

      window.scrollTo(0, 0);
    })();
  }, [searchParams, navigate, init]);

  return (
    <p className="flex min-h-dvh items-center justify-center px-4 text-sm text-neutral-400">
      Logging you in...
    </p>
  );
};

export default OAuthSuccess;
