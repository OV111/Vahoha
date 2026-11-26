import { useMemo } from "react";
import useCachedResource from "@/hooks/useCachedResource";
import { fetchVerifiedLayers } from "@/features/voice-exam/api/voiceExamApi";

/** Set of layer ids the signed-in user verified by voice exam. Empty for guests. */
export const useVerifiedLayers = (enabled = true) => {
  const { data } = useCachedResource("voice-verified", fetchVerifiedLayers, {
    staleMs: 5 * 60_000,
    enabled,
  });
  return useMemo(() => new Set((data ?? []).map((v) => v.layer)), [data]);
};
