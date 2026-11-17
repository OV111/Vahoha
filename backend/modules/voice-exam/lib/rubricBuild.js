import { z } from "zod";

// Shared by the rubric seeder and the eval runner, so the eval grades against exactly what goes live.

const slug = z.string().regex(/^[a-z0-9-]{1,48}$/, "ids are lowercase-with-dashes");
const point = z.object({ id: slug, text: z.string().trim().min(10) }).strict();

// What an answer must show for one subtopic. Points describe ideas, never required terms,
// so a learner who explains it in their own words still gets the credit.
const criterionSchema = z
  .object({
    id: slug,
    evidence: z.array(point).min(1).max(3),
    // How many points make "solid"; defaults below.
    solidNeeds: z.number().int().min(1).optional(),
    // Answers that sound right but don't count, e.g. naming the term without explaining it.
    notEnough: z.array(z.string().trim().min(10)).default([]),
    misconceptions: z.array(point).default([]),
  })
  .strict()
  .superRefine((c, ctx) => {
    const ids = [...c.evidence, ...c.misconceptions].map((p) => p.id);
    if (new Set(ids).size !== ids.length) ctx.addIssue({ code: "custom", message: "evidence and misconception ids must be unique" });
    if (c.solidNeeds > c.evidence.length) ctx.addIssue({ code: "custom", message: "solidNeeds is more than the evidence points" });
  });

// All points when there are one or two; with three, one may be missing.
const defaultSolidNeeds = (n) => (n <= 2 ? n : n - 1);

const parseCriterion = (layerId, title, raw) => {
  const parsed = criterionSchema.safeParse(raw);
  if (!parsed.success) {
    const issue = parsed.error.issues[0];
    throw new Error(`${layerId}: criteria for "${title}": ${issue.path.join(".") || "criterion"} ${issue.message}`);
  }
  const c = parsed.data;
  return {
    criterionId: c.id,
    evidence: c.evidence,
    solidNeeds: c.solidNeeds ?? defaultSolidNeeds(c.evidence.length),
    notEnough: c.notEnough,
    misconceptions: c.misconceptions,
  };
};

export const findLayer = (roadmap, layerId) => {
  for (const layers of Object.values(roadmap)) {
    const hit = Array.isArray(layers) && layers.find((l) => l.id === layerId);
    if (hit) return hit;
  }
  return null;
};

/**
 * Throws on any mismatch: a follow-up for a renamed subtopic would silently never be asked.
 * Criteria are always validated, but only go live once a person has read them
 * (`criteriaReviewed: true`); the eval passes `draftCriteria` to measure drafts first.
 */
export const buildRubric = (file, layer, { draftCriteria = false } = {}) => {
  const useCriteria = file.criteriaReviewed === true || draftCriteria;
  const sections = [...(layer.sideLeft ?? []), ...(layer.sideRight ?? [])];
  const groups = file.groups.map((g) => {
    const section = sections.find((s) => s.title === g.title);
    if (!section) throw new Error(`${file.layer}: no subtopic group "${g.title}" in the roadmap`);
    const subtopics = section.children.map((c) => {
      const followUp = g.followUps?.[c.title];
      if (!followUp) throw new Error(`${file.layer}: no follow-up for "${c.title}"`);
      const subtopic = { title: c.title, description: c.description, followUp };
      // Optional: a subtopic without criteria is graded against its description, as before.
      const criterion = g.criteria?.[c.title];
      if (!criterion) return subtopic;
      const parsed = parseCriterion(file.layer, c.title, criterion);
      return useCriteria ? { ...subtopic, ...parsed } : subtopic;
    });
    for (const [field, map] of [["follow-ups", g.followUps], ["criteria", g.criteria]]) {
      const extra = Object.keys(map ?? {}).filter((t) => !section.children.some((c) => c.title === t));
      if (extra.length) throw new Error(`${file.layer}: ${field} for unknown subtopics: ${extra.join(", ")}`);
    }
    return { title: g.title, question: g.question, subtopics };
  });
  const ids = file.groups.flatMap((g) => Object.values(g.criteria ?? {}).map((c) => c.id));
  const dup = ids.find((id, i) => ids.indexOf(id) !== i);
  if (dup) throw new Error(`${file.layer}: criterion id "${dup}" is used twice`);
  return { path: file.path, layer: file.layer, groups };
};
