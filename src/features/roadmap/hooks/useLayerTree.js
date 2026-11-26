import { useMemo } from "react";
import useRoadmapStore from "./useRoadmapStore";
import { lessonHrefs, lessonSlugs } from "@/features/learn/lib/curriculum";
import { topicMeta } from "@/features/learn/content/topics";
import { useLayerStatuses } from "@/features/learn/lib/lessonStatus";
import { hasLab } from "@/features/labs/content";
import { effectiveStatuses, layerNodeProgress, layerView, parentStatus, statusOf, summarize } from "@/features/roadmap/lib/nodeProgress";

/**
 * Everything a layer row draws, derived from the layer data + recorded progress.
 * Shared by the desktop mind-map and the mobile list, so both always agree.
 * Progress is recorded by the system (lesson opened / finished, layer test
 * passed); nothing here writes it.
 *
 * @param {object} layer
 * @param {import("@/features/roadmap/lib/nodeProgress").LayerState} layerState  layerPrereqs.layerStatus()
 */
export const useLayerTree = (layer, layerState) => {
  const trackId = useRoadmapStore((s) => s.selectedTrack?.id);
  const recorded = useLayerStatuses(trackId, layer.id);

  return useMemo(() => {
    const statuses = effectiveStatuses(layer, layerState, recorded);
    const hrefFor = trackId ? lessonHrefs(trackId, layer) : () => null;
    const slugFor = lessonSlugs(layer);

    const sectionsOf = (list) =>
      list.map((section) => {
        const lessons = (section.children ?? []).map((child) => {
          const slug = slugFor(section.title, child.title);
          return {
            ...child,
            slug,
            href: hrefFor(section.title, child.title),
            status: statusOf(statuses, slug),
            hasLab: Boolean(trackId && slug && hasLab(trackId, layer.id, slug)),
            // Shown only when known: authored on the lesson, or from a written topic.
            minutes: child.minutes ?? (slug ? topicMeta(trackId, layer.id, slug)?.minutes : null) ?? null,
          };
        });
        const list = lessons.map((l) => l.status);
        return { title: section.title, lessons, status: parentStatus(list), summary: summarize(list) };
      });

    const { summary } = layerNodeProgress(layer, statuses);
    const view = layerView(layerState, summary);

    return { left: sectionsOf(layer.sideLeft ?? []), right: sectionsOf(layer.sideRight ?? []), summary, view };
  }, [layer, layerState, recorded, trackId]);
};
