// What the Labs building and rooms need to know about each lab, without
// downloading the labs themselves. labs.test.js fails if this drifts from the
// lab files, so add an entry here whenever you add a lab file.
//
// key: <trackId>/<layerId>/<lessonSlug> (the lesson the lab belongs to)
export const LAB_MANIFEST = [
  {
    trackId: "mern",
    layerId: "mern-2",
    layerTitle: "JavaScript Deep Dive",
    slug: "how-closures-capture-free-variables-in-the-scope-chain",
    lessonTitle: "How closures capture free variables in the scope chain",
    minutes: 15,
    tasks: [
      { type: "fix", title: "Every button says 3" },
      { type: "write", title: "Build a private counter" },
      { type: "review", title: "The AI's memoize leaks memory" },
    ],
  },
];

export const labKey = (lab) => `${lab.trackId}/${lab.layerId}/${lab.slug}`;
export const labHref = (lab) => `/learn/${lab.trackId}/${lab.layerId}/${lab.slug}/lab`;
export const lessonHref = (lab) => `/learn/${lab.trackId}/${lab.layerId}/${lab.slug}`;
