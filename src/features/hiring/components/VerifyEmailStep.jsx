import { useState } from "react";
import { toast } from "sonner";
import { Loader2, Mail } from "lucide-react";
import CodeInput from "./CodeInput";
import { errorClass } from "../../auth/authStyles";
import { resendRecruiterCode, verifyRecruiterEmail } from "../api/hiringApi";
import { HIRING_CODE_LENGTH } from "../../../../constants/hiringRules";

// Step 5: the 6-digit code we emailed. Proves the recruiter owns the work inbox,
// which is the strongest single signal the trust engine has. The code is checked
// as soon as the last digit is in; a wrong one shakes the boxes and clears them.
const VerifyEmailStep = ({ email, onVerified }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const verify = async (full) => {
    if (busy) return;
    setBusy(true);
    setError("");
    try {
      onVerified(await verifyRecruiterEmail(full));
    } catch (err) {
      setError(err.message);
      setCode("");
    } finally {
      setBusy(false);
    }
  };

  const resend = async () => {
    try {
      await resendRecruiterCode();
      setError("");
      setCode("");
      toast.success("We sent a new code.");
    } catch (err) {
      toast.error(err.message);
    }
  };

  return (
    <div className="space-y-5 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-purple-500/15 text-purple-300">
        <Mail size={22} aria-hidden="true" />
      </div>
      <p className="text-sm text-neutral-400">
        Enter the 6-digit code we sent to
        <br />
        <span className="font-medium text-white">{email}</span>
      </p>

      <CodeInput
        length={HIRING_CODE_LENGTH}
        value={code}
        onChange={(v) => {
          setCode(v);
          if (error) setError("");
        }}
        onComplete={verify}
        error={Boolean(error)}
        disabled={busy}
      />

      <div className="min-h-5" aria-live="polite">
        {busy ? (
          <p className="flex items-center justify-center gap-2 text-sm text-neutral-400">
            <Loader2 size={14} className="animate-spin" aria-hidden="true" /> Checking…
          </p>
        ) : (
          error && <p className={errorClass}>{error}</p>
        )}
      </div>

      <p className="text-[13px] text-neutral-500">
        Didn't get it?{" "}
        <button type="button" onClick={resend} className="cursor-pointer font-medium text-purple-500 hover:underline">
          Send a new code
        </button>
      </p>
    </div>
  );
};

export default VerifyEmailStep;
