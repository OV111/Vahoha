// A roadmap layer stores its learning tree as two columns (`sideLeft`,
// `sideRight`) because that is how the roadmap draws it. A learner needs one
// ordered path, so this turns the tree into a flat list of lessons.

export const slugify = (text) =>
  text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");

/**
 * Reading order = the order the roadmap draws the rows: row 1 left, row 1
 * right, row 2 left, and so on.
 */
const orderedSections = (layer) => {
  const left = layer.sideLeft ?? [];
  const right = layer.sideRight ?? [];
  const sections = [];
  for (let i = 0; i < Math.max(left.length, right.length); i++) {
    if (left[i]) sections.push(left[i]);
    if (right[i]) sections.push(right[i]);
  }
  return sections;
};

/**
 * A layer may author `steps: [{ title, about, lessons: [{ slug, short }] }]`: the teaching order,
 * independent of where the map draws each lesson. Layers without it keep the
 * map order, with each section as a step. An entry with its own `title` is a
 * lesson the map doesn't draw; `also` names map lessons that this one covers too. A lesson no step names goes last, so
 * a missed slug is never lost.
 */
const inTeachingOrder = (lessons, steps) => {
  if (!steps) return lessons.map((l) => ({ ...l, step: l.section }));
  const bySlug = new Map(lessons.map((l) => [l.slug, l]));
  const covered = new Set(steps.flatMap((s) => s.lessons.flatMap((l) => l.also ?? [])));
  const ordered = steps.flatMap(({ title: step, about: stepAbout, lessons: entries }) =>
    entries
      .filter(({ slug, title }) => bySlug.has(slug) || title)
      .map(({ slug, short, title, description, also }) => ({
        ...(bySlug.get(slug) ?? { slug, title, description: description ?? "", resources: [], section: step }),
        short,
        also: also ?? [],
        step,
        stepAbout,
      })),
  );
  const placed = new Set(ordered.map((l) => l.slug));
  const rest = lessons.filter((l) => !placed.has(l.slug) && !covered.has(l.slug)).map((l) => ({ ...l, step: l.section }));
  return [...ordered, ...rest].map((l, i) => ({ ...l, order: i + 1 }));
};

/**
 * `[{ slug, order, title, description, resources, section, step }]` for one layer.
 *
 * Slugs come from the title and are the lesson's id in the URL, so they must
 * stay stable once users have progress saved against them. A repeated title
 * inside one layer gets its position appended so ids never collide.
 */
export const buildLessons = (layer) => inTeachingOrder(mapLessons(layer), layer.steps);

/** The lessons as the map draws them, before any authored order. */
const mapLessons = (layer) => {
  const used = new Set();
  let order = 0;
  return orderedSections(layer).flatMap((section) =>
    (section.children ?? []).map((child) => {
      order += 1;
      let slug = slugify(child.title);
      if (used.has(slug)) slug = `${slug}-${order}`;
      used.add(slug);
      return {
        slug,
        order,
        title: child.title,
        description: child.description ?? "",
        resources: (child.resources ?? []).filter((r) => r.url),
        section: section.title,
      };
    }),
  );
};

/** Map lesson slug -> the slug of the lesson that teaches it (itself, unless covered by another). */
const taughtBy = (layer) => {
  const aliases = new Map(buildLessons(layer).flatMap((l) => (l.also ?? []).map((slug) => [slug, l.slug])));
  return (slug) => aliases.get(slug) ?? slug;
};

/**
 * Returns `(sectionTitle, subtopicTitle) => url | null` for one layer, so the
 * roadmap tree can link each subtopic card to its lesson without knowing how
 * slugs are made. If a section repeats a title, the first one wins.
 */
export const lessonSlugs = (layer) => {
  const slugs = new Map();
  const teacher = taughtBy(layer);
  for (const l of mapLessons(layer)) {
    const key = `${l.section}::${l.title}`;
    if (!slugs.has(key)) slugs.set(key, teacher(l.slug));
  }
  return (section, title) => slugs.get(`${section}::${title}`) ?? null;
};

export const lessonHrefs = (trackId, layer) => {
  const hrefs = new Map();
  const teacher = taughtBy(layer);
  for (const l of mapLessons(layer)) {
    const key = `${l.section}::${l.title}`;
    if (!hrefs.has(key)) hrefs.set(key, `/learn/${trackId}/${layer.id}/${teacher(l.slug)}`);
  }
  return (section, title) => hrefs.get(`${section}::${title}`) ?? null;
};

/** Lesson plus its neighbours, or null if the slug is not in this layer. */
export const findLesson = (lessons, slug) => {
  const index = lessons.findIndex((l) => l.slug === slug);
  if (index === -1) return null;
  return {
    lesson: lessons[index],
    prev: lessons[index - 1] ?? null,
    next: lessons[index + 1] ?? null,
    total: lessons.length,
  };
};
