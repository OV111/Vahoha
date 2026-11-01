import { useEffect, useState } from "react";
import { toast } from "sonner";
import { getEmailPrefs, setEmailPrefs } from "@/services/emailPrefsApi";
import { WEEKLY_SUMMARY_COPY as COPY } from "../../../../constants/weeklySummary";

/**
 * Weekly progress email on/off. Saves on click, like MessagePolicySetting:
 * one switch, and the server is the source of truth.
 */
export default function WeeklySummarySetting() {
  const [enabled, setEnabled] = useState(null);

  useEffect(() => {
    getEmailPrefs()
      .then((prefs) => setEnabled(prefs.weeklySummary))
      .catch(() => setEnabled(true));
  }, []);

  const toggle = async () => {
    const next = !enabled;
    setEnabled(next); // optimistic; rolled back if the save fails
    try {
      await setEmailPrefs({ weeklySummary: next });
      toast.success(COPY.saved);
    } catch (err) {
      setEnabled(!next);
      toast.error(err.message || "Couldn't save");
    }
  };

  return (
    <div className="flex max-w-[880px] items-start justify-between gap-4 rounded-lg border border-gray-300 p-3 dark:border-white/10">
      <div>
        <p id="weekly-summary-label" className="text-sm font-medium text-gray-900 dark:text-gray-100">
          {COPY.settingLabel}
        </p>
        <p className="mt-1 text-xs text-gray-500 dark:text-[#8A8A93]">{COPY.settingHint}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={Boolean(enabled)}
        aria-labelledby="weekly-summary-label"
        disabled={enabled === null}
        onClick={toggle}
        className={`relative mt-0.5 inline-flex h-6 w-11 shrink-0 cursor-pointer items-center rounded-full transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-500 disabled:cursor-default disabled:opacity-50 ${
          enabled ? "bg-purple-600" : "bg-gray-300 dark:bg-white/15"
        }`}
      >
        <span
          className={`inline-block h-5 w-5 rounded-full bg-white shadow transition-transform ${
            enabled ? "translate-x-5" : "translate-x-0.5"
          }`}
        />
      </button>
    </div>
  );
}
