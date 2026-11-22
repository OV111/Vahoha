// Back + primary button row shared by the join steps.
const FormButtons = ({ onBack, primary, disabled = false, type = "submit", onPrimary }) => (
  <div className="flex gap-3 pt-2">
    {onBack && (
      <button type="button" onClick={onBack}
        className="rounded-md border border-neutral-700 px-4 py-2 text-sm font-semibold text-neutral-200 hover:border-neutral-500">
        Back
      </button>
    )}
    <button type={type} onClick={onPrimary} disabled={disabled}
      className="flex-1 rounded-md bg-purple-600 px-4 py-2 text-sm font-semibold text-white hover:bg-purple-700 disabled:cursor-not-allowed disabled:opacity-40">
      {primary}
    </button>
  </div>
);

export default FormButtons;
