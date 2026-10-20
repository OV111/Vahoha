import { useMemo } from "react";
import useRoadmapStore from "@/stores/useRoadmapStore";
import { buildLessons, lessonHrefs, lessonSlugs } from "@/features/learn/lib/curriculum";
import { lessonMeta } from "@/features/learn/content/manifest";
import { useLayerStatuses } from "@/features/learn/lib/lessonStatus";
import { hasLab } from "@/features/labs/content";
import { effectiveStatuses, layerNodeProgress, layerView, parentStatus, statusOf, summarize } from "../lib/nodeProgress";

/**
 * Everything a layer row draws, derived from the layer data + recorded progress.
 * Shared by the desktop mind-map and the mobile list, so both always agree.
 * Progress is recorded by the system (lesson opened / finished, layer test
 * passed); nothing here writes it.
 *
 * @param {object} layer
 * @param {import("../lib/nodeProgress").LayerState} layerState  layerPrereqs.layerStatus()
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
            // Shown only when known: authored on the lesson, or from a written lesson file.
            minutes: child.minutes ?? (slug ? lessonMeta(trackId, layer.id, slug)?.minutes : null) ?? null,
          };
        });
        const list = lessons.map((l) => l.status);
        return { title: section.title, lessons, status: parentStatus(list), summary: summarize(list) };
      });

    const { summary } = layerNodeProgress(layer, statuses);
    const view = layerView(layerState, summary);

    // "Continue" opens the lesson to pick up: the first one in progress, else the first not started.
    const ordered = buildLessons(layer);
    const resume =
      ordered.find((l) => statusOf(statuses, l.slug) === "in_progress") ??
      ordered.find((l) => statusOf(statuses, l.slug) === "not_started");
    const layerHref = trackId ? `/learn/${trackId}/${layer.id}` : null;
    const ctaHref = view.cta === "Continue" && resume && layerHref ? `${layerHref}/${resume.slug}` : layerHref;

    return { left: sectionsOf(layer.sideLeft ?? []), right: sectionsOf(layer.sideRight ?? []), summary, view, ctaHref };
  }, [layer, layerState, recorded, trackId]);
};
