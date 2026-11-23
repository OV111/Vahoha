import { useEffect, useState } from "react";
import useViewOnly from "./useViewOnly";
import { fetchSaved } from "./api/hiringApi";

/** Usernames on the company's shortlist, for "Saved" chips. Empty for non-recruiters. */
export default function useSavedUsernames() {
  const isRecruiter = useViewOnly();
  const [saved, setSaved] = useState(() => new Set());

  useEffect(() => {
    if (!isRecruiter) return undefined;
    let cancelled = false;
    fetchSaved()
      .then((rows) => !cancelled && setSaved(new Set(rows.map((r) => r.username))))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [isRecruiter]);

  return saved;
}
