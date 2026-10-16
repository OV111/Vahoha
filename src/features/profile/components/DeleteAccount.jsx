import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import useAuthStore from "../../../stores/useAuthStore";
import useProfileStore from "../../../stores/useProfileStore";
import { deleteAccount } from "../../../services/profileApi";

// Must match DELETE_CONFIRMATION in backend/modules/account/services/accountService.js.
const CONFIRM_WORD = "DELETE";

const inputClass =
  "w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-gray-900 outline-none placeholder:text-gray-400 focus:border-red-400 focus:ring-2 focus:ring-red-200 dark:focus:border-red-500 dark:focus:ring-red-900/70 dark:border-white/10 dark:bg-white/[0.04] dark:text-gray-100 dark:placeholder:text-[#8A8A93]";

const DeleteAccount = () => {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const user = useProfileStore((s) => s.user);
  // Google and GitHub accounts have no password, so they confirm by typing a
  // word instead. `undefined` (profile not loaded yet) is treated as "has one".
  const hasPassword = user?.hasPassword !== false;

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [errors, setErrors] = useState({ email: "", secret: "" });

  const handleDeleteAccount = async (event) => {
    event.preventDefault();
    const trimmedEmail = email.trim();
    const nextErrors = { email: "", secret: "" };

    if (!trimmedEmail) nextErrors.email = "Email is required";
    if (hasPassword && !password) nextErrors.secret = "Password is required";
    if (!hasPassword && confirmation.trim() !== CONFIRM_WORD)
      nextErrors.secret = `Type ${CONFIRM_WORD} to confirm`;
    if (nextErrors.email || nextErrors.secret) {
      setErrors(nextErrors);
      return;
    }
    setErrors({ email: "", secret: "" });

    try {
      setIsDeleting(true);
      const response = await deleteAccount(
        trimmedEmail,
        hasPassword ? { password } : { confirmation: confirmation.trim() },
      );
      toast.success(response?.message || "Account deleted successfully");
      localStorage.removeItem("JWT");
      logout();
      navigate("/get-started");
    } catch (error) {
      toast.error(
        error.message || "Server is unavailable. Please try again later.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <section className="mt-4 grid gap-3">
      <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 lg:text-xl">
        Danger Zone
      </h2>
      <p className="text-sm text-gray-600 dark:text-gray-300 ">
        This action is permanent. Once your account is deleted, all associated
        data will be removed and cannot be recovered.
      </p>

      <div className="rounded-lg border border-red-200 bg-red-50 p-4 dark:border-red-900/60 dark:bg-red-950/30 sm:p-6">
        <div className="mb-4 grid gap-1">
          <p className="text-lg font-semibold text-red-800 dark:text-red-300">
            Delete Account
          </p>
          <p className="text-sm text-red-700 dark:text-red-400">
            Permanently remove your account and profile information.
          </p>
        </div>

        {/* A real <form>: Enter submits, password managers behave, and the
            browser stops warning about a password field outside a form. */}
        <form onSubmit={handleDeleteAccount} noValidate className="grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="grid w-full gap-1">
              <label htmlFor="delete-email" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm Email
              </label>
              <input
                id="delete-email"
                type="email"
                autoComplete="email"
                aria-invalid={Boolean(errors.email)}
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
                }}
                placeholder="Enter your email to confirm"
                className={inputClass}
              />
              {errors.email && (
                <p className="text-xs text-red-600" role="alert">{errors.email}</p>
              )}
            </div>

            {hasPassword ? (
              <div className="grid w-full gap-1">
                <label htmlFor="delete-password" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Current Password
                </label>
                <div className="relative">
                  <input
                    id="delete-password"
                    autoComplete="current-password"
                    aria-invalid={Boolean(errors.secret)}
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (errors.secret) setErrors((prev) => ({ ...prev, secret: "" }));
                    }}
                    placeholder="Enter your password"
                    className={`${inputClass} pr-10`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-3 cursor-pointer text-gray-400 hover:text-gray-200 dark:text-gray-500"
                  >
                    {showPassword ? <Eye size={18} /> : <EyeOff size={18} />}
                  </button>
                </div>
                {errors.secret && (
                  <p className="text-xs text-red-600" role="alert">{errors.secret}</p>
                )}
              </div>
            ) : (
              <div className="grid w-full gap-1">
                <label htmlFor="delete-confirmation" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                  Type {CONFIRM_WORD} to confirm
                </label>
                <input
                  id="delete-confirmation"
                  type="text"
                  autoComplete="off"
                  aria-invalid={Boolean(errors.secret)}
                  aria-describedby="delete-confirmation-hint"
                  value={confirmation}
                  onChange={(e) => {
                    setConfirmation(e.target.value);
                    if (errors.secret) setErrors((prev) => ({ ...prev, secret: "" }));
                  }}
                  placeholder={CONFIRM_WORD}
                  className={inputClass}
                />
                <p id="delete-confirmation-hint" className="text-xs text-red-700 dark:text-red-400">
                  Your account signs in with Google or GitHub, so there is no password to enter.
                </p>
                {errors.secret && (
                  <p className="text-xs text-red-600" role="alert">{errors.secret}</p>
                )}
              </div>
            )}
          </div>

          <div className="flex w-full flex-col gap-4 border-t border-red-100 pt-4 dark:border-red-900/40 sm:flex-row sm:items-center sm:justify-between">
            <label className="flex items-start gap-2 text-sm text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                className="mt-1 cursor-pointer accent-red-600 dark:accent-red-500"
                checked={isConfirmed}
                onChange={(e) => setIsConfirmed(e.target.checked)}
              />
              <span>
                I understand this action is permanent and cannot be undone.
              </span>
            </label>
            <button
              type="submit"
              disabled={!isConfirmed || isDeleting}
              className="w-full cursor-pointer rounded-lg bg-red-600 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-red-700 dark:bg-red-500 dark:hover:bg-red-600 sm:w-auto disabled:cursor-not-allowed disabled:bg-red-400 dark:disabled:bg-red-900/50 dark:disabled:text-red-200/70"
            >
              {isDeleting ? "Deleting..." : "Delete Account"}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default DeleteAccount;
