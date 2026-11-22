import { useState } from "react";
import { useForm } from "react-hook-form";
import { Loader2, RefreshCw } from "lucide-react";
import TextField from "../../auth/components/TextField";
import { sanitizeInput } from "../../../utils/sanitize";
import { WEBSITE_MESSAGE, WEBSITE_PATTERN } from "../../../../constants/hiringRules";
import { recheckCompany, updateCompany } from "../api/hiringApi";

// For a "limited" company: run the checks again as-is (the site was down), or
// fix the name/website first (the usual cause is a typo) and re-check.
const FixCompanyForm = ({ company, onUpdated }) => {
  const [editing, setEditing] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur", defaultValues: { company: company.name, website: company.website } });

  const run = async (call) => {
    setBusy(true);
    setError("");
    try {
      onUpdated(await call());
      setEditing(false);
    } catch (err) {
      setError(err.message);
    } finally {
      setBusy(false);
    }
  };

  const button = "inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm font-medium transition-colors disabled:opacity-50";

  return (
    <div className="mt-3 space-y-3">
      {editing ? (
        <form onSubmit={handleSubmit((body) => run(() => updateCompany(body)))} className="max-w-sm space-y-3" noValidate>
          <TextField id="fixCompany" label="Company name" maxLength={100}
            registration={register("company", { required: "Company name is required.", setValueAs: sanitizeInput })}
            error={errors.company} />
          <TextField id="fixWebsite" label="Website" type="url" inputMode="url" maxLength={200}
            registration={register("website", {
              required: "Website is required.",
              pattern: { value: WEBSITE_PATTERN, message: WEBSITE_MESSAGE },
              setValueAs: sanitizeInput,
            })}
            error={errors.website} />
          <div className="flex gap-2">
            <button type="submit" disabled={busy} className={`${button} bg-purple-600 text-white hover:bg-purple-700`}>
              {busy && <Loader2 size={14} className="animate-spin" aria-hidden="true" />} Save and re-check
            </button>
            <button type="button" onClick={() => setEditing(false)} className={`${button} text-neutral-300 hover:bg-white/5`}>
              Cancel
            </button>
          </div>
        </form>
      ) : (
        <div className="flex flex-wrap gap-2">
          <button type="button" disabled={busy} onClick={() => run(recheckCompany)}
            className={`${button} border border-white/15 text-white hover:bg-white/5`}>
            {busy ? <Loader2 size={14} className="animate-spin" aria-hidden="true" /> : <RefreshCw size={14} aria-hidden="true" />}
            Run checks again
          </button>
          <button type="button" onClick={() => setEditing(true)} className={`${button} text-white/80 hover:bg-white/5`}>
            Fix company details
          </button>
        </div>
      )}
      {error && <p className="text-sm text-red-400">{error}</p>}
    </div>
  );
};

export default FixCompanyForm;
