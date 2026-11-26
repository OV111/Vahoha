import { useMemo } from "react";
import { useTrackLayers } from "@/features/roadmap/hooks/useTrackLayers";
import { buildLessons } from "@/features/learn/lib/curriculum";
import { findTrack } from "@/features/learn/lib/tracks";

/**
 * Resolves /learn/:trackId/:layerId into { track, layer, lessons }.
 * `status` is "loading" | "ready" | "missing" | "error".
 */
export default function useLearnLayer(trackId, layerId) {
  const track = useMemo(() => findTrack(trackId), [trackId]);
  const { layers, loading, error } = useTrackLayers(track?.domain.id, track?.id);

  const layer = useMemo(() => layers?.find((l) => l.id === layerId) ?? null, [layers, layerId]);
  const lessons = useMemo(() => (layer ? buildLessons(layer) : []), [layer]);

  let status = "ready";
  if (!track) status = "missing";
  else if (loading) status = "loading";
  else if (error) status = "error";
  else if (!layer) status = "missing";

  return { status, track, layer, lessons, layerCount: layers?.length ?? 0 };
}
