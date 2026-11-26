import { useEffect, useMemo, useState } from "react";
import useAuthStore from "@/stores/useAuthStore";
import { queryCache } from "@/lib/queryCache";
import { fetchRoadmapProgress } from "@/services/roadmapApi";
import { useTrackLayers } from "@/features/roadmap/hooks/useTrackLayers";
import { layerStatus } from "@/features/roadmap/lib/layerPrereqs";
import { findTrack } from "@/features/learn/lib/tracks";

/**
 * The signed-in learner's active track and the layer to work on now: the first
 * one that is open and not passed.
 * `status` is "loading" | "ready" | "no-path" | "path-done" | "error".
 */
export default function useMyLayer() {
  const { auth, isLoading: authLoading } = useAuthStore();
  const [progress, setProgress] = useState({ status: "loading", data: null });

  useEffect(() => {
    if (!auth) return;
    let ignore = false;
    queryCache
      .load("roadmap-progress", fetchRoadmapProgress, { staleMs: 30_000 })
      .then((data) => !ignore && setProgress({ status: "ready", data }))
      .catch(() => !ignore && setProgress({ status: "error", data: null }));
    return () => {
      ignore = true;
    };
  }, [auth]);

  const track = useMemo(() => findTrack(progress.data?.activePath), [progress.data]);
  const { layers, loading, error } = useTrackLayers(track?.domain.id, track?.id);

  const layer = useMemo(() => {
    const passed = progress.data?.layerProgress ?? {};
    return layers?.find((l, i) => ["in-progress", "up-next"].includes(layerStatus(l, i, layers, passed))) ?? null;
  }, [layers, progress.data]);

  let status = "ready";
  if (authLoading) status = "loading";
  else if (!auth) status = "no-path";
  else if (progress.status !== "ready") status = progress.status;
  else if (!track) status = "no-path";
  else if (loading) status = "loading";
  else if (error) status = "error";
  else if (!layers) status = "no-path"; // the track has no authored layers yet
  else if (!layer) status = "path-done";

  const passed = progress.data?.layerProgress ?? {};
  const passedCount = layers?.filter((l) => passed[l.id] === "done").length ?? 0;
  return { status, track, layer, layerCount: layers?.length ?? 0, passedCount };
}
