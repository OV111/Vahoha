import { useEffect, useState } from "react";
import { topicLoader } from "@/features/learn/content/topics";

/** `status` is "none" (no topic page for this lesson) | "loading" | "ready" | "error". */
export default function useTopic(trackId, layerId, slug) {
  const key = `${trackId}/${layerId}/${slug}`;
  const load = topicLoader(trackId, layerId, slug);
  const [state, setState] = useState({ key: null, status: "loading", topic: null });

  useEffect(() => {
    if (!load) return;
    let ignore = false;
    load()
      .then((mod) => !ignore && setState({ key, status: "ready", topic: mod.default }))
      .catch(() => !ignore && setState({ key, status: "error", topic: null }));
    return () => {
      ignore = true;
    };
  }, [key, load]);

  if (!load) return { status: "none", topic: null };
  return state.key === key ? state : { status: "loading", topic: null };
}
