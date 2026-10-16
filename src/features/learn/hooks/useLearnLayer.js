import { useMemo } from "react";
import { buildCatalog } from "@/features/roadmap/lib/catalog";
import { useTrackLayers } from "@/features/roadmap/hooks/useTrackLayers";
import { buildLessons } from "../lib/curriculum";

// ~170 tracks: building the catalog once is cheaper than threading the domain
// through every URL, and it keeps the learn URLs short (/learn/mern/mern-3).
const CATALOG = buildCatalog();

/**
 * Resolves /learn/:trackId/:layerId into { track, layer, lessons }.
 * `status` is "loading" | "ready" | "missing" | "error".
 */
export default function useLearnLayer(trackId, layerId) {
  const track = useMemo(() => CATALOG.find((t) => t.id === trackId) ?? null, [trackId]);
  const { layers, loading, error } = useTrackLayers(track?.domain.id, track?.id);

  const layer = useMemo(() => layers?.find((l) => l.id === layerId) ?? null, [layers, layerId]);
  const lessons = useMemo(() => (layer ? buildLessons(layer) : []), [layer]);

  let status = "ready";
  if (!track) status = "missing";
  else if (loading) status = "loading";
  else if (error) status = "error";
  else if (!layer) status = "missing";

  return { status, track, layer, lessons };
}
