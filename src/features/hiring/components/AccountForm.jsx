import { useForm, useWatch } from "react-hook-form";
import { toast } from "sonner";
import { AlertTriangle } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import TextField from "@/features/auth/components/TextField";
import PasswordField from "@/features/auth/components/PasswordField";
import { googleButtonClass } from "@/features/auth/authStyles";
import FormButtons from "./FormButtons";
import { sanitizeInput } from "@/utils/sanitize";
import { PASSWORD_MESSAGES, PASSWORD_RULES } from "@shared/password";
import { isFreeEmail } from "@shared/emailDomains";

const passwordMax = { value: PASSWORD_RULES.maxBytes, message: `Max ${PASSWORD_RULES.maxBytes} characters.` };

// Step 3: the login the recruiter will use later. Same rules as the learner sign-up.
// A personal email is allowed but flagged: a work email is how the company gets checked quickly.
const AccountForm = ({ defaults, onBack, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    getValues,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: defaults });
  const freeEmail = isFreeEmail(useWatch({ control, name: "email" }));

  // UI preview: the real Google sign-in would create a learner account today,
  // so this button only explains itself until the hiring backend exists.
  const google = () => toast.info("Google sign-up for hiring accounts is coming with the backend.");

  return (
    <div className="space-y-5">
      <button type="button" onClick={google} className={googleButtonClass}>
        <FcGoogle size={18} aria-hidden="true" /> Continue with Google
      </button>

      <div className="flex items-center">
        <div className="grow border-t border-white/10" />
        <span className="mx-3 text-[13px] text-zinc-500">or with email</span>
        <div className="grow border-t border-white/10" />
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
        <TextField id="fullName" label="Your name" autoComplete="name" maxLength={100} placeholder="Jane Doe"
          registration={register("fullName", {
            required: "Your name is required.",
            maxLength: { value: 100, message: "Max 100 characters." },
            setValueAs: sanitizeInput,
          })}
          error={errors.fullName} />

        <div>
          <TextField id="email" label="Work email" type="email" autoComplete="email" inputMode="email" maxLength={254}
            placeholder="jane@company.com"
            registration={register("email", {
              required: "Work email is required.",
              maxLength: { value: 254, message: "Max 254 characters." },
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Enter a valid email address." },
              setValueAs: sanitizeInput,
            })}
            error={errors.email} />
          {freeEmail && !errors.email && (
            <p className="mt-1.5 flex items-center gap-1.5 text-xs text-amber-400">
              <AlertTriangle size={13} aria-hidden="true" /> A personal email takes longer to check. Use your work email if you can.
            </p>
          )}
        </div>

        <PasswordField id="password" label="Password" autoComplete="new-password" maxLength={PASSWORD_RULES.maxBytes}
          registration={register("password", {
            required: "Password is required.",
            maxLength: passwordMax,
            minLength: { value: PASSWORD_RULES.minLength, message: PASSWORD_MESSAGES.minLength },
            pattern: { value: PASSWORD_RULES.symbol, message: PASSWORD_MESSAGES.symbol },
          })}
          error={errors.password} />

        <PasswordField id="confirmPassword" label="Confirm password" autoComplete="new-password" maxLength={PASSWORD_RULES.maxBytes}
          registration={register("confirmPassword", {
            required: "Please confirm your password.",
            maxLength: passwordMax,
            validate: (v) => v === getValues("password") || "Passwords don't match.",
          })}
          error={errors.confirmPassword} />

        <FormButtons onBack={onBack} primary="Continue" />
      </form>
    </div>
  );
};

export default AccountForm;
