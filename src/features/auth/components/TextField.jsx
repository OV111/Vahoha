import { errorClass, inputClass, labelClass } from "../authStyles";

/**
 * Label, input and error for a react-hook-form field.
 * `registration` is the result of register(name, rules); other props go to the input.
 */
const TextField = ({ id, label, error, registration, className = "", ...inputProps }) => (
  <div className={className}>
    <label htmlFor={id} className={labelClass}>
      {label}
    </label>
    <input id={id} {...inputProps} {...registration} className={inputClass(Boolean(error))} />
    {error && <p className={errorClass}>{error.message}</p>}
  </div>
);

export default TextField;
