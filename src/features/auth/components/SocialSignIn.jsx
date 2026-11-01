import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { GoogleLogin } from "@react-oauth/google";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import useAuthStore from "../../../stores/useAuthStore";
import { tapArea } from "../authStyles";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const buttonBase = `relative flex min-h-10 w-full cursor-pointer items-center justify-center gap-2.5 rounded-md border py-2 px-4 text-sm font-medium transition ${tapArea}`;

/**
 * "Continue with Google / GitHub". Google's own button can't be styled, so it
 * is rendered hidden and our button clicks it. Needs a GoogleOAuthProvider above.
 */
const SocialSignIn = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const googleBtnRef = useRef(null);

  const handleGoogleLogin = async (credentialResponse) => {
    try {
      const res = await fetch(`${API_BASE_URL}/google/auth`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ tokenId: credentialResponse.credential }),
      });
      const result = await res.json();
      if (res.ok) {
        toast.success("Google login successful");
        login(result.accessToken);
        navigate("/");
      } else {
        toast.error(result.message || "Google auth failed");
      }
    } catch (err) {
      console.error(err);
      toast.error("Google auth failed");
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
        className={`${buttonBase} border-[#e0e0e0] bg-white text-[#30313d] hover:bg-gray-50 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700`}
      >
        <FcGoogle size={18} />
        Continue with Google
      </button>

      <button
        type="button"
        onClick={() => {
          window.location.href = `${API_BASE_URL}/auth/github`;
        }}
        className={`${buttonBase} border-[#30363d] bg-[#24292e] text-white hover:bg-[#2f363d] dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-200 dark:hover:bg-zinc-700`}
      >
        <FaGithub size={18} />
        Continue with GitHub
      </button>
    </div>
  );
};

export default SocialSignIn;
