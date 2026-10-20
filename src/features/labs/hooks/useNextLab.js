import { useMemo } from "react";
import { layerStatuses } from "@/features/learn/lib/lessonStatus";
import { LAB_MANIFEST } from "../content/manifest";

/**
 * The lab that fits where the learner is right now, from the lesson progress
 * the system already records: a lab whose lesson they're reading beats one
 * whose lesson they finished. Null when no lab matches their progress yet.
 *
 * Reads localStorage once per mount; labs don't track their own completion
 * until lab stage L2, so a finished lab can still be suggested.
 *
 * @param {Set<string> | null} [trackIds] only consider labs of these tracks (a room); pass a stable Set
 * @returns {{ lab: object, reason: string } | null}
 */
export default function useNextLab(trackIds = null) {
  return useMemo(() => {
    const candidates = LAB_MANIFEST.filter((lab) => !trackIds || trackIds.has(lab.trackId));
    const statusOf = (lab) => layerStatuses(lab.trackId, lab.layerId)[lab.slug];

    const reading = candidates.find((lab) => statusOf(lab) === "in_progress");
    if (reading) return { lab: reading, reason: "You're on this lesson" };
    const finished = candidates.find((lab) => statusOf(lab) === "done");
    if (finished) return { lab: finished, reason: "You finished this lesson" };
    return null;
  }, [trackIds]);
}
