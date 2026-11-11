import { Link } from "react-router-dom";
import { ChevronRight } from "lucide-react";

/** A titled group on the Settings page. */
export function SettingsSection({ id, title, note, children }) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="grid max-w-[880px] scroll-mt-24 gap-5">
      <div className="border-b border-gray-200 pb-2 dark:border-white/10">
        <h2 id={`${id}-title`} className="text-lg font-semibold text-gray-900 dark:text-gray-100">
          {title}
        </h2>
        {note && <p className="mt-1 text-xs text-gray-500 dark:text-[#8A8A93]">{note}</p>}
      </div>
      {children}
    </section>
  );
}

/** A row that opens another settings page. */
export function SettingsLinkRow({ to, label, hint }) {
  return (
    <Link
      to={to}
      className="flex items-center justify-between gap-4 rounded-lg border border-gray-300 p-3 transition-colors hover:border-gray-400 focus-visible:outline-2 focus-visible:outline-purple-500 dark:border-white/10 dark:hover:border-white/20"
    >
      <span>
        <span className="block text-sm font-medium text-gray-900 dark:text-gray-100">{label}</span>
        <span className="mt-1 block text-xs text-gray-500 dark:text-[#8A8A93]">{hint}</span>
      </span>
      <ChevronRight size={16} className="shrink-0 text-gray-400" aria-hidden="true" />
    </Link>
  );
}
