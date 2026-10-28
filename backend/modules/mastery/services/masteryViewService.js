import {
  buildTopicStates,
  deriveNextAction,
  getMastery,
  loadTopicEvidence,
} from "../../../services/learnerMasteryService.js";
import { getUserProgress } from "../../../services/userProgressService.js";
import { getConcepts } from "../../../services/conceptService.js";
import { getLayers } from "../../../services/roadmapCache.js";
import { buildMasteryView } from "../lib/masteryView.js";

/**
 * Assemble the learner's mastery view.
 *
 * Reads stored mastery first (cheap, already computed on every evidence write)
 * and only derives it on the fly for a learner whose mastery has never been
 * recomputed — the same fallback `getNextAction` uses, so this page and the
 * mentor can never disagree about a learner's state.
 *
 * The joins (layer titles, misconception text) only run when the user is
 * allowed to see the detail, so a free user's request costs three small reads.
 */
export const getMasteryView = async (db, userId, { detail }) => {
  const [stored, progress] = await Promise.all([
    getMastery(db, userId),
    getUserProgress(db, userId),
  ]);

  const topics = stored.length
    ? stored
    : buildTopicStates(await loadTopicEvidence(db, userId));

  const nextAction = deriveNextAction(topics, progress);

  if (!detail) {
    return buildMasteryView({ topics, nextAction, detail: false });
  }

  const layerIds = [...new Set(topics.map((t) => t.layer).filter(Boolean))];
  const misconceptionSlugs = topics
    .filter((t) => t.misconceptions?.length)
    .map((t) => t.slug);

  const [layers, conceptDocs] = await Promise.all([
    getLayers(db, layerIds),
    getConcepts(db, misconceptionSlugs),
  ]);

  return buildMasteryView({
    topics,
    nextAction,
    detail: true,
    layers,
    concepts: new Map(conceptDocs.map((c) => [c.id, c])),
  });
};
