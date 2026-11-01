import { useCallback, useEffect, useMemo, useState } from "react";
import { addComment, deleteComment, fetchComments } from "../commentsApi";

/**
 * A team map's comments. Loaded when the map opens and again each time a part
 * is selected (`refreshKey`), so teammates' new comments show up without a
 * live connection. Pass mapId null to turn comments off (non-team maps).
 */
export default function useMapComments(mapId, refreshKey) {
  const [comments, setComments] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!mapId) return;
    let alive = true;
    fetchComments(mapId)
      .then((list) => {
        if (!alive) return;
        setComments(list);
        setError(null);
      })
      .catch((err) => alive && setError(err.message));
    return () => {
      alive = false;
    };
  }, [mapId, refreshKey]);

  const byNode = useMemo(() => {
    const groups = new Map();
    for (const c of comments) groups.set(c.nodeId, [...(groups.get(c.nodeId) ?? []), c]);
    return groups;
  }, [comments]);

  /** Throws with a plain-words message, so the form can keep the draft. */
  const add = useCallback(
    async (nodeId, text) => {
      const comment = await addComment(mapId, nodeId, text);
      setComments((list) => [...list, comment]);
    },
    [mapId],
  );

  const remove = useCallback(
    async (commentId) => {
      await deleteComment(mapId, commentId);
      setComments((list) => list.filter((c) => c.id !== commentId));
    },
    [mapId],
  );

  return { enabled: Boolean(mapId), byNode, error, add, remove };
}
