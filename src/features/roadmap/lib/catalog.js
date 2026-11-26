import { TRACKS } from "@shared/roadmapPaths";
import { ROADMAP_DOMAINS } from "@shared/categories";

/** Flatten `{ domainId: [track] }` into `[{ ...track, domain }]`, in domain order. */
export const buildCatalog = (tracksByDomain = TRACKS, domains = ROADMAP_DOMAINS) =>
  domains.flatMap((domain) =>
    (tracksByDomain[domain.id] ?? []).map((track) => ({ ...track, domain })),
  );
