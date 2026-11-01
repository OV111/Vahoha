import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { errorClass, eyeBtnClass, inputClass, labelClass } from "../authStyles";

/**
 * Password input with a show/hide button. Each field keeps its own visibility.
 * `labelAside` sits at the right of the label row (the "Forgot your password?" link).
 */
const PasswordField = ({ id, label, labelAside, error, registration, ...inputProps }) => {
  const [visible, setVisible] = useState(false);
  const fieldName = label.toLowerCase();

  return (
    <div>
      {labelAside ? (
        <div className="mb-1.5 flex items-center justify-between">
          <label htmlFor={id} className="text-sm font-medium text-[#30313d] dark:text-zinc-300">
            {label}
          </label>
          {labelAside}
        </div>
      ) : (
        <label htmlFor={id} className={labelClass}>
          {label}
        </label>
      )}
      <div className="relative">
        <input
          id={id}
          type={visible ? "text" : "password"}
          placeholder="••••••••"
          {...inputProps}
          {...registration}
          className={inputClass(Boolean(error), "pr-11")}
        />
        <button
          type="button"
          onClick={() => setVisible((v) => !v)}
          aria-label={`${visible ? "Hide" : "Show"} ${fieldName}`}
          className={eyeBtnClass}
        >
          {visible ? <Eye size={16} /> : <EyeOff size={16} />}
        </button>
      </div>
      {error && <p className={errorClass}>{error.message}</p>}
    </div>
  );
};

export default PasswordField;
