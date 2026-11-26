import { useForm } from "react-hook-form";
import TextField from "@/features/auth/components/TextField";
import FormButtons from "./FormButtons";
import { errorClass, labelClass } from "@/features/auth/authStyles";
import { sanitizeInput } from "@/utils/sanitize";
import { TEAM_SIZES } from "@/constants/hiring";
import { WEBSITE_MESSAGE, WEBSITE_PATTERN } from "@shared/hiringRules";

const text = (label, max) => ({
  required: `${label} is required.`,
  maxLength: { value: max, message: `Max ${max} characters.` },
  setValueAs: sanitizeInput,
});

// Step 4: the company (or agency) that gets checked.
const CompanyForm = ({ orgType, onBack, onSubmit, error }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ mode: "onBlur" });
  const orgLabel = orgType === "agency" ? "Agency" : "Company";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
      <TextField id="company" label={`${orgLabel} name`} autoComplete="organization" maxLength={100} placeholder="Acme Inc."
        registration={register("company", text(`${orgLabel} name`, 100))} error={errors.company} />

      <TextField id="website" label="Website" type="url" inputMode="url" maxLength={200} placeholder="https://acme.com"
        registration={register("website", {
          ...text("Website", 200),
          pattern: { value: WEBSITE_PATTERN, message: WEBSITE_MESSAGE },
        })}
        error={errors.website} />

      {/* Five short choices read faster as chips than as a dropdown, and a native
          select can't be styled to match the dark theme. */}
      <fieldset>
        <legend className={labelClass}>Team size</legend>
        <div className="flex flex-wrap gap-2">
          {TEAM_SIZES.map((size) => (
            <label
              key={size}
              className={`cursor-pointer rounded-full border px-3.5 py-1.5 text-sm tabular-nums transition-colors has-checked:border-purple-500 has-checked:bg-purple-500/15 has-checked:text-purple-200 has-focus-visible:ring-2 has-focus-visible:ring-purple-500/40 ${
                errors.teamSize ? "border-red-500/60" : "border-white/10 hover:border-white/25"
              } bg-white/[0.03] text-neutral-300`}
            >
              <input type="radio" value={size} className="sr-only" {...register("teamSize", { required: "Pick a team size." })} />
              {size}
            </label>
          ))}
        </div>
        <p className="mt-1.5 text-xs text-neutral-500">People at the company, not just engineers.</p>
        {errors.teamSize && <p className={errorClass}>{errors.teamSize.message}</p>}
      </fieldset>

      {error && (
        <p role="alert" className="rounded-md border border-red-800 bg-red-950/40 px-3.5 py-2.5 text-sm text-red-400">
          {error}
        </p>
      )}

      <FormButtons onBack={onBack} primary={isSubmitting ? "Checking your company…" : "Create hiring account"} disabled={isSubmitting} />
    </form>
  );
};

export default CompanyForm;
