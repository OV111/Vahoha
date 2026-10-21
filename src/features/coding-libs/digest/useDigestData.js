import { useEffect, useState } from "react";
import { fetchDigest } from "../../../services/libraryApi";

/**
 * The digest for one book, or null when it has none (or the user may not see
 * it yet: digests are admin-only until published). Failures also give null, so
 * the page falls back to its normal reading preview instead of an error.
 */
export function useDigestData(bookId) {
  const [digest, setDigest] = useState(null);

  useEffect(() => {
    const controller = new AbortController();
    setDigest(null);
    fetchDigest(bookId, controller.signal)
      .then(setDigest)
      .catch(() => {}); // optional section: failures (and aborts) just show the preview
    return () => controller.abort();
  }, [bookId]);

  return digest;
}
