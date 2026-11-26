// Every docs-style topic page. Each loads as its own chunk; the minutes and
// mystery are repeated here so lists don't have to download it.
const TOPICS = {
  "js-array-methods": { load: () => import("./js-array-methods"), minutes: 35, mystery: "The list was sorted once. Why did the original change too?" },
  "js-basics": { load: () => import("./js-basics"), minutes: 35, mystery: "The shop added 5 and 5 and got 55. Why?" },
  "js-closures": { load: () => import("./js-closures"), minutes: 30, mystery: "Why does every button say 3?" },
  "js-destructuring": { load: () => import("./js-destructuring"), minutes: 30, mystery: "We copied the user. Why did the original change?" },
  "js-event-loop": { load: () => import("./js-event-loop"), minutes: 35, mystery: "A 0 ms timer runs last. Why?" },
  "js-fetch": { load: () => import("./js-fetch"), minutes: 35, mystery: "The server answered 404. Why was there no error?" },
  "js-modules": { load: () => import("./js-modules"), minutes: 30, mystery: "Two files import each other. Why does one of them crash?" },
  "js-promise-combinators": { load: () => import("./js-promise-combinators"), minutes: 35, mystery: "The user searched for \"react\". Why does the page show results for \"re\"?" },
  "js-promises": { load: () => import("./js-promises"), minutes: 35, mystery: "The error was caught. Why did the app go on as if all was fine?" },
  "web-box-model": { load: () => import("./web-box-model"), minutes: 25, mystery: "Two boxes are 50% wide. Why don't they fit side by side?" },
  "web-devtools": { load: () => import("./web-devtools"), minutes: 25, mystery: "The CSS is there, but it has no effect. How do you find out why in 10 seconds?" },
  "web-dom": { load: () => import("./web-dom"), minutes: 30, mystery: "A comment on the page stole the users' accounts. How can text do that?" },
  "web-events": { load: () => import("./web-events"), minutes: 30, mystery: "New rows have no working delete button. Why do the old ones work?" },
  "web-flex-grid": { load: () => import("./web-flex-grid"), minutes: 30, mystery: "One long word broke the whole layout. How?" },
  "web-rendering": { load: () => import("./web-rendering"), minutes: 30, mystery: "The page stays white for four seconds, though the HTML is already there. Why?" },
  "web-responsive": { load: () => import("./web-responsive"), minutes: 25, mystery: "The page is tiny on the phone, though the CSS is right. What is missing?" },
  "web-semantic-html": { load: () => import("./web-semantic-html"), minutes: 25, mystery: "The button looks perfect. Why can't some people press it?" },
  "react-jsx": { load: () => import("./react-jsx"), minutes: 30, mystery: "The component is written, but the page shows nothing and no error. Why?" },
  "react-props": { load: () => import("./react-props"), minutes: 30, mystery: "The child changed its prop. Why did nothing happen?" },
  "react-state": { load: () => import("./react-state"), minutes: 35, mystery: "The button adds 1 three times. Why does the counter go up by only 1?" },
  "react-lists": { load: () => import("./react-lists"), minutes: 30, mystery: "One row was deleted. Why did the text in another row disappear?" },
  "react-events": { load: () => import("./react-events"), minutes: 25, mystery: "The page renders again and again until it crashes. One pair of parentheses did it. Which?" },
  "react-forms": { load: () => import("./react-forms"), minutes: 30, mystery: "You type into the field, and nothing appears. Why?" },
  "react-lifting-state": { load: () => import("./react-lifting-state"), minutes: 25, mystery: "Two components show the same number, and they disagree. Who is right?" },
  "react-rendering": { load: () => import("./react-rendering"), minutes: 30, mystery: "Only one number changed, but 50 components ran. Is that bad?" },
  "react-effects": { load: () => import("./react-effects"), minutes: 35, mystery: "The timer runs twice as fast after a while. Who started the second one?" },
  "react-fetching": { load: () => import("./react-fetching"), minutes: 30, mystery: "You switch quickly between two users and see the wrong one. Why?" },
};

// Which topic each lesson of a layer opens: "<trackId>/<layerId>" -> slug -> topicId.
// Tracks share topics, so a topic is written once.
const LESSON_TOPICS = {
  "mern/mern-1": {
    "semantic-html-and-the-accessibility-tree": "web-semantic-html",
    "the-box-model-content-padding-border-and-margin": "web-box-model",
    "when-to-use-flexbox-versus-css-grid": "web-flex-grid",
    "mobile-first-breakpoints-with-min-width-media-queries": "web-responsive",
    "javascript-variables-types-and-functions": "js-basics",
    "selecting-elements-and-modifying-the-dom-at-runtime": "web-dom",
    "event-bubbling-delegation-and-removeeventlistener": "web-events",
    "browser-devtools-inspecting-layout-styles-and-the-network-ta": "web-devtools",
    "the-critical-rendering-path-and-render-blocking-resources": "web-rendering",
  },
  "mern/mern-2": {
    "destructuring-spread-and-rest-in-function-signatures": "js-destructuring",
    "array-methods-map-filter-reduce-and-their-composition": "js-array-methods",
    "call-stack-task-queue-and-microtask-queue-ordering": "js-event-loop",
    "how-closures-capture-free-variables-in-the-scope-chain": "js-closures",
    "promise-chaining-versus-async-await-for-sequential-calls": "js-promises",
    "promise-all-promise-allsettled-and-race-conditions": "js-promise-combinators",
    "fetch-response-ok-and-typed-error-handling": "js-fetch",
    "es-modules-import-export-and-the-difference-from-commonjs": "js-modules",
  },
  "pern/pern-1": {
    "semantic-html-elements-and-the-accessibility-tree": "web-semantic-html",
    "box-sizing-border-box-and-why-it-simplifies-layout-math": "web-box-model",
    "css-grid-for-two-dimensional-page-layouts": "web-flex-grid",
    "responsive-design-with-media-queries-and-relative-units": "web-responsive",
    "javascript-variables-types-and-functions": "js-basics",
    "queryselector-textcontent-and-classlist-for-dom-updates": "web-dom",
    "events-bubbling-and-delegation": "web-events",
    "inspecting-and-live-editing-styles-in-the-styles-panel": "web-devtools",
    "the-critical-rendering-path-and-render-blocking-resources": "web-rendering",
  },
  "fullstack-engineer/fullstack-engineer-1": {
    "semantic-html-and-the-accessibility-tree": "web-semantic-html",
    "the-box-model-and-box-sizing-border-box": "web-box-model",
    "flexbox-for-one-dimensional-layouts-grid-for-two-dimensional": "web-flex-grid",
    "mobile-first-media-queries-with-min-width-breakpoints": "web-responsive",
    "javascript-variables-types-and-functions": "js-basics",
    "dom-manipulation-queryselector-classlist-and-events": "web-dom",
    "events-bubbling-and-delegation": "web-events",
    "network-tab-inspecting-requests-responses-and-status-codes": "web-devtools",
    "dom-cssom-and-the-critical-rendering-path": "web-rendering",
    "promises-and-async-await": "js-promises",
    "fetch-with-async-await-and-proper-error-handling": "js-fetch",
  },
  "astro-dev/astro-dev-1": {
    "semantic-html-elements": "web-semantic-html",
    "css-box-model": "web-box-model",
    "flexbox-and-grid": "web-flex-grid",
    "mobile-first-media-queries": "web-responsive",
    "javascript-variables-types-and-functions": "js-basics",
    "es-modules-import-and-export": "js-modules",
    "browser-devtools": "web-devtools",
    "how-the-browser-draws-a-page": "web-rendering",
  },
  "mern/mern-3": {
    "jsx-compiles-to-react-createelement-calls": "react-jsx",
    "unidirectional-data-flow-props-down-events-up": "react-props",
    "why-state-updates-are-asynchronous-and-batched": "react-state",
    "lifting-state-to-the-closest-common-parent": "react-lifting-state",
    "rendering-lists-with-key-props-and-conditional-rendering": "react-lists",
    "synthetic-events-and-event-pooling-in-react": "react-events",
    "controlled-inputs-value-prop-onchange-handler": "react-forms",
    "how-react-diffs-the-virtual-dom-and-batches-dom-updates": "react-rendering",
    "useeffect-dependency-array-and-cleanup-functions": "react-effects",
    "fetching-data-in-components": "react-fetching",
  },
  "pern/pern-3": {
    "jsx-compiles-to-react-createelement-implications-for-jsx-rul": "react-jsx",
    "unidirectional-data-flow-and-why-it-simplifies-debugging": "react-props",
    "why-state-updates-are-asynchronous-and-stale-closures-occur": "react-state",
    "lifting-state-up-to-the-nearest-common-ancestor": "react-lifting-state",
    "rendering-lists-with-key-props-derived-from-stable-ids": "react-lists",
    "events-in-react": "react-events",
    "controlled-forms": "react-forms",
    "how-react-diffs-the-virtual-dom-to-minimize-real-dom-changes": "react-rendering",
    "useeffect-dependencies-and-the-cleanup-pattern": "react-effects",
    "data-fetching-in-useeffect-loading-data-and-error-states": "react-fetching",
  },
};

const topicIdOf = (trackId, layerId, slug) => LESSON_TOPICS[`${trackId}/${layerId}`]?.[slug];

const topicOf = (trackId, layerId, slug) => TOPICS[topicIdOf(trackId, layerId, slug)];

/** Whether the lesson has a written topic page. */
export const hasTopic = (trackId, layerId, slug) => Boolean(topicOf(trackId, layerId, slug));

export const topicLoader = (trackId, layerId, slug) => topicOf(trackId, layerId, slug)?.load ?? null;

/** `{ topicId, minutes, mystery }` without downloading the topic, or null when it isn't written. */
export const topicMeta = (trackId, layerId, slug) => {
  const topic = topicOf(trackId, layerId, slug);
  if (!topic) return null;
  return { topicId: topicIdOf(trackId, layerId, slug), minutes: topic.minutes, mystery: topic.mystery };
};
