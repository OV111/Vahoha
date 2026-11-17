import { useEffect, useState } from "react";
import { fetchPublicPost } from "../../../services/blogsApi";
import { decodePostId } from "./postModel.js";

/**
 * Loads one post. Aborts if the id changes or the page unmounts, so a slow
 * response for a previous post can never overwrite the current one. The page is
 * keyed by id, so state starts fresh for every post and needs no reset here.
 *
 * @returns {{ post: object|null, loading: boolean, error: string|null, retry: () => void }}
 */
export default function useBlogPost(id) {
  const [state, setState] = useState({ post: null, loading: true, error: null });
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const decoded = decodePostId(id);
    if (!decoded) {
      setState({ post: null, loading: false, error: "That post link isn't valid." });
      return;
    }

    const controller = new AbortController();

    fetchPublicPost(decoded.type, decoded.rawId, { signal: controller.signal })
      .then((post) => setState({ post, loading: false, error: null }))
      .catch((err) => {
        if (err.name === "AbortError") return;
        const error =
          err.status === 404
            ? "This post doesn't exist or was removed."
            : "Couldn't load this post. Please try again.";
        setState({ post: null, loading: false, error });
      });

    return () => controller.abort();
  }, [id, attempt]);

  const retry = () => {
    setState({ post: null, loading: true, error: null });
    setAttempt((n) => n + 1);
  };

  return { ...state, retry };
}
