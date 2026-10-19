import { useEffect, useState } from "react";
import { hasLessonContent, loadLessonContent } from "../content";

/**
 * The written lesson for one topic, if there is one.
 * `status` is "none" (no file, show the roadmap summary) | "loading" | "ready" | "error".
 */
export default function useLessonContent(trackId, layerId, slug) {
  const key = `${trackId}/${layerId}/${slug}`;
  const exists = hasLessonContent(trackId, layerId, slug);
  const [state, setState] = useState({ key: null, lesson: null, error: false });

  useEffect(() => {
    if (!exists) return;
    let cancelled = false;
    loadLessonContent(trackId, layerId, slug)
      .then((lesson) => !cancelled && setState({ key, lesson, error: false }))
      .catch(() => !cancelled && setState({ key, lesson: null, error: true }));
    // Clicking "Next" before this lesson loads must not show it on the next page.
    return () => {
      cancelled = true;
    };
  }, [exists, key, trackId, layerId, slug]);

  if (!exists) return { status: "none", lesson: null };
  // State left over from the previous lesson counts as still loading.
  if (state.key !== key) return { status: "loading", lesson: null };
  if (state.error) return { status: "error", lesson: null };
  return { status: "ready", lesson: state.lesson };
}
