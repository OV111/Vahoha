import CvFileCard from "./CvFileCard";

export function SectionHeader({ title, right }) {
  return (
    <div className="mt-8 mb-3 flex items-center gap-4 sm:mt-10 sm:mb-4">
      <h2 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wide shrink-0">
        {title}
      </h2>
      <div className="flex-1 h-px bg-gray-200 dark:bg-white/10" />
      {right && (
        <span className="shrink-0 text-xs text-gray-500 dark:text-gray-400 tabular-nums">
          {right}
        </span>
      )}
    </div>
  );
}

/**
 * The CV, plus optional `children` under it (the owner's recruiter settings
 * on /my-profile). `editable` is the owner's view: upload and remove.
 */
export function ForHiringPanel({ editable = false, cvUrl = null, onCvUpload, onCvRemove, children }) {
  return (
    <div className="rounded-2xl border border-white/10 px-4 py-4">
      <p className="text-xs font-semibold uppercase tracking-wide mb-2 text-gray-400">
        Career
      </p>
      <CvFileCard editable={editable} cvUrl={cvUrl} onUpload={onCvUpload} onRemove={onCvRemove} />

      {children && <div className="mt-4 border-t border-white/10 pt-4">{children}</div>}
    </div>
  );
}
