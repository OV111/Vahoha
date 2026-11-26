import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuthStore from "@/stores/useAuthStore";
import { githubButtonClass, googleButtonClass } from "@/features/auth/authStyles";
import { googleAuth, GITHUB_AUTH_URL } from "@/services/authApi";
import { landingPath } from "@/features/hiring/lib/landingPath";



/**
 * "Continue with Google / GitHub". Google's own button can't be styled, so it
 * is rendered hidden and our button clicks it. Needs a GoogleOAuthProvider above.
 */
const SocialSignIn = ({ github = true }) => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const googleBtnRef = useRef(null);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const result = await googleAuth(credentialResponse.credential);
      toast.success("Google login successful");
      login(result.accessToken);
      navigate(await landingPath("/"));
    } catch (err) {
      if (!err.status) console.error(err);
      toast.error(err.message || "Google auth failed");
    }
  };

  return (
    <div className="flex flex-col gap-2.5 sm:flex-row">
      <div ref={googleBtnRef} className="hidden">
        <GoogleLogin onSuccess={handleGoogleLogin} onError={() => toast.error("Google Sign-In failed")} />
      </div>

      <button
        type="button"
        onClick={() => googleBtnRef.current?.querySelector("div[role=button]")?.click()}
        className={googleButtonClass}
      >
        <FcGoogle size={18} />
        Continue with Google
      </button>

      {github && <button
        type="button"
        onClick={() => {
          window.location.href = GITHUB_AUTH_URL;
        }}
        className={githubButtonClass}
      >
        <FaGithub size={18} />
        Continue with GitHub
      </button>}
    </div>
  );
};

export default SocialSignIn;
