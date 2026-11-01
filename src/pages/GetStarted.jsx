import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useNavigate, Link, useSearchParams } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import useAuthStore from "../stores/useAuthStore";
import { sanitizeInput } from "../utils/sanitize";
import { PASSWORD_RULES, PASSWORD_MESSAGES } from "../../constants/password";
import TextField from "../features/auth/components/TextField";
import PasswordField from "../features/auth/components/PasswordField";
import SocialSignIn from "../features/auth/components/SocialSignIn";
import { tapArea } from "../features/auth/authStyles";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

const nameRules = (label) => ({
  required: `${label} is required.`,
  minLength: { value: 2, message: "At least 2 characters." },
  maxLength: { value: 50, message: "Max 50 characters." },
  pattern: { value: /^[a-zA-Z\s'-]+$/, message: "Only letters, spaces, hyphens, apostrophes." },
  setValueAs: sanitizeInput,
});

const passwordMax = {
  value: PASSWORD_RULES.maxBytes,
  message: `Max ${PASSWORD_RULES.maxBytes} characters.`,
};

const generateUsername = (firstName = "", lastName = "") =>
  `${firstName}${lastName}`.toLowerCase().replace(/[^a-z0-9]/g, "").slice(0, 20) || "dev";

const linkClass =
  "relative text-purple-600 hover:underline dark:text-purple-400 max-md:after:absolute max-md:after:-inset-x-1 max-md:after:-inset-y-3";

const GetStarted = () => {
  const navigate = useNavigate();
  const { login } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [authUiMessage, setAuthUiMessage] = useState("");
  // The URL owns the mode (?mode=login | signup) so the navbar's "Log in" /
  // "Start free" links switch the form even while this page is mounted.
  const [searchParams, setSearchParams] = useSearchParams();
  const isSignedUp = searchParams.get("mode") !== "login";

  const {
    register,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm({ mode: "onBlur" });

  const showError = (message) => {
    setAuthUiMessage(message);
    toast.error(message);
  };

  const onSubmit = async (data) => {
    setAuthUiMessage("");
    setIsLoading(true);

    const url = `${API_BASE_URL}/${isSignedUp ? "get-started" : "login"}`;
    const payload = isSignedUp
      ? { ...data, username: generateUsername(data.firstName, data.lastName) }
      : data;

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify(payload),
      });
      const result = await response.json();

      if (response.ok) {
        toast.success(result.message, { duration: 900 });
        login(result.accessToken);
        reset();
        // A new account starts at the roadmap, where the first tour is.
        navigate(isSignedUp ? "/roadmaps" : "/");
      } else if (response.status === 429) {
        showError(result.message || "Too many attempts. Please try again later.");
      } else {
        showError(result.message || "Request failed");
      }
    } catch (err) {
      console.error(err);
      setAuthUiMessage("Server is unavailable. Please try again later.");
      toast.error("Server is unavailable. Please try again later!", { duration: 2500 });
    }

    setIsLoading(false);
  };

  const toggleMode = () => {
    setSearchParams({ mode: isSignedUp ? "login" : "signup" }, { replace: true });
    setAuthUiMessage("");
    reset();
  };

  return (
    <div className="flex min-h-dvh items-center justify-center px-4 py-8 sm:py-12">
      <div className="w-full max-w-[520px] rounded-xl bg-white px-5 py-8 sm:px-8 sm:py-10 dark:bg-neutral-800/60 dark:backdrop-blur-sm">
        <h1 className="mb-1 flex justify-center text-[22px] leading-tight font-semibold text-[#1a1f36] sm:text-[24px] dark:text-white">
          {isSignedUp ? "Create your account" : "Sign in to your account"}
        </h1>
        <p className="mb-6 flex justify-center text-center text-[13.5px] text-[#697386] dark:text-zinc-400">
          {isSignedUp ? "Join Vahoha and start building today." : "Welcome back! Enter your details below."}
        </p>

        {authUiMessage && (
          <div className="mb-5 rounded-md border border-red-200 bg-red-50 px-3.5 py-2.5 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/40 dark:text-red-400">
            {authUiMessage}
          </div>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {isSignedUp && (
            <div className="flex flex-col gap-3 sm:flex-row">
              <TextField
                id="firstName"
                label="First name"
                className="flex-1"
                autoComplete="given-name"
                maxLength={50}
                placeholder="John"
                registration={register("firstName", nameRules("First name"))}
                error={errors.firstName}
              />
              <TextField
                id="lastName"
                label="Last name"
                className="flex-1"
                autoComplete="family-name"
                maxLength={50}
                placeholder="Doe"
                registration={register("lastName", nameRules("Last name"))}
                error={errors.lastName}
              />
            </div>
          )}

          <TextField
            id="email"
            label="Email"
            type="email"
            autoComplete="email"
            inputMode="email"
            maxLength={254}
            placeholder="johndoe@example.com"
            registration={register("email", {
              required: "Email is required.",
              maxLength: { value: 254, message: "Max 254 characters." },
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
              setValueAs: sanitizeInput,
            })}
            error={errors.email}
          />

          <PasswordField
            id="password"
            label="Password"
            labelAside={
              !isSignedUp && (
                <Link to="/forgot-password" className={`${linkClass} inline-flex items-center text-[13px]`}>
                  Forgot your password?
                </Link>
              )
            }
            autoComplete={isSignedUp ? "new-password" : "current-password"}
            maxLength={PASSWORD_RULES.maxBytes}
            registration={register("password", {
              required: "Password is required.",
              maxLength: passwordMax,
              // Length and symbol rules are signup-only: on login they would
              // block existing passwords and leak the password policy.
              ...(isSignedUp && {
                minLength: { value: PASSWORD_RULES.minLength, message: PASSWORD_MESSAGES.minLength },
                pattern: { value: PASSWORD_RULES.symbol, message: PASSWORD_MESSAGES.symbol },
              }),
            })}
            error={errors.password}
          />

          {isSignedUp && (
            <PasswordField
              id="confirmPassword"
              label="Confirm password"
              autoComplete="new-password"
              maxLength={PASSWORD_RULES.maxBytes}
              registration={register("confirmPassword", {
                required: "Please confirm your password.",
                maxLength: passwordMax,
                validate: (value) => value === getValues("password") || "Passwords don't match.",
              })}
              error={errors.confirmPassword}
            />
          )}

          <button
            type="submit"
            disabled={isLoading}
            className={`relative mt-2 min-h-10 w-full rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white transition-colors duration-150 ${tapArea} ${
              isLoading ? "cursor-not-allowed opacity-60" : "cursor-pointer hover:bg-purple-700 active:bg-purple-800"
            }`}
          >
            {isLoading ? "Please wait…" : isSignedUp ? "Create account" : "Sign in"}
          </button>
        </form>

        <div className="my-5 flex items-center">
          <div className="grow border-t border-[#e0e0e0] dark:border-zinc-700" />
          <span className="mx-3 text-[13px] text-[#697386] dark:text-zinc-500">or</span>
          <div className="grow border-t border-[#e0e0e0] dark:border-zinc-700" />
        </div>

        <SocialSignIn />

        <p className="mt-5 text-center text-[13.5px] text-[#697386] dark:text-zinc-400">
          {isSignedUp ? "Already have an account? " : "Don't have an account? "}
          <button type="button" onClick={toggleMode} className={`${linkClass} cursor-pointer px-1 font-medium`}>
            {isSignedUp ? "Sign in" : "Create account"}
          </button>
        </p>
      </div>
    </div>
  );
};

// The provider loads Google's ~100 KB sign-in script. Scoping it to this page
// (the only one with Google login) keeps it off every other page.
const GetStartedWithGoogle = () => (
  <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <GetStarted />
  </GoogleOAuthProvider>
);

export default GetStartedWithGoogle;
