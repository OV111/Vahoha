<!-- Paste the AI replies for accessibility-qa here (FILE: lines + code blocks). -->

FILE: backend/seeders/challenges/accessibility-qa/screen-reader-navigation-mode.js

export default {
  slug: "screen-reader-navigation-mode",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-2",
  type: "CODE",
  difficulty: "easy",
  title: "Identify Screen Reader Navigation Modes",
  summary: "Classify common NVDA interactions as browse mode or focus mode.",
  description: "When testing websites with NVDA, testers need to understand whether an interaction belongs to browse mode or focus mode. Browse mode supports reading and navigating page content, while focus mode allows interaction with controls that accept keyboard input.",
  task: "Implement classifyNvdaInteraction(interaction), which receives an interaction description object and returns its expected NVDA mode. Return \"browse\" for reading page text, navigating headings, navigating landmarks, and moving through links. Return \"focus\" for entering text into an input, choosing a value in a select control, and typing into a textarea. Return \"unknown\" for unsupported interactions.",
  constraints: [
    "interaction is an object with a string action property.",
    "Recognize the actions read-text, navigate-heading, navigate-landmark, navigate-link, type-input, select-option, and type-textarea.",
    "Return exactly \"browse\", \"focus\", or \"unknown\".",
    "Do not modify the input object."
  ],
  example: {
    input: { action: "navigate-heading" },
    output: "browse",
    explanation: "Heading navigation is a browse-mode interaction."
  },
  tags: ["accessibility", "nvda", "screen-reader", "testing"],
  estimatedMins: 15,
  xp: 25,
  starterFiles: [
    {
      name: "screen_reader_navigation_mode.js",
      content: "function classifyNvdaInteraction(interaction) {\n  // TODO: classify the interaction as browse, focus, or unknown.\n}\n\nmodule.exports = classifyNvdaInteraction;\n"
    }
  ],
  testFile: {
    name: "screen_reader_navigation_mode_test.js",
    content: "const assert = require('assert');\nconst classifyNvdaInteraction = require('./screen_reader_navigation_mode');\n\nassert.strictEqual(classifyNvdaInteraction({ action: 'navigate-heading' }), 'browse');\nassert.strictEqual(classifyNvdaInteraction({ action: 'type-input' }), 'focus');\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Start by listing which actions represent reading or navigating content and which require interacting with an editable control."
    },
    {
      order: 2,
      cost: 5,
      text: "Use two collections of recognized action names, one for browse mode and one for focus mode."
    },
    {
      order: 3,
      cost: 15,
      text: "Check that interaction exists and has a recognized action before returning a mode. Unrecognized actions should return \"unknown\"."
    }
  ],
  hiddenTests: [
    { input: { action: "read-text" }, expected: "browse" },
    { input: { action: "navigate-heading" }, expected: "browse" },
    { input: { action: "navigate-landmark" }, expected: "browse" },
    { input: { action: "navigate-link" }, expected: "browse" },
    { input: { action: "type-input" }, expected: "focus" },
    { input: { action: "select-option" }, expected: "focus" },
    { input: { action: "type-textarea" }, expected: "focus" },
    { input: { action: "click-button" }, expected: "unknown" },
    { input: { action: "" }, expected: "unknown" },
    { input: {} , expected: "unknown" }
  ],
  solution: "function classifyNvdaInteraction(interaction) {\n  if (!interaction || typeof interaction.action !== 'string') return 'unknown';\n\n  const browseActions = ['read-text', 'navigate-heading', 'navigate-landmark', 'navigate-link'];\n  const focusActions = ['type-input', 'select-option', 'type-textarea'];\n\n  if (browseActions.includes(interaction.action)) return 'browse';\n  if (focusActions.includes(interaction.action)) return 'focus';\n  return 'unknown';\n}\n\nmodule.exports = classifyNvdaInteraction;"
};

FILE: backend/seeders/challenges/accessibility-qa/nvda-heading-navigation.js

export default {
  slug: "nvda-heading-navigation",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-2",
  type: "CODE",
  difficulty: "medium",
  title: "Validate Heading Navigation",
  summary: "Check whether a page's heading outline supports efficient screen reader navigation.",
  description: "Screen reader users often navigate long pages by moving between headings. A useful heading outline starts with a level-one heading and avoids skipped heading levels. Build a validator that reports issues in the order they are discovered.",
  task: "Implement validateHeadingOutline(headings). Each heading is an object with a non-empty title and a level from 1 to 6. Return an array of issue strings. Report \"missing-h1\" if there is no level-one heading. Report \"multiple-h1\" if more than one level-one heading exists. Report \"skipped-level\" when a heading level is greater than the previous heading level by more than one. Report \"invalid-heading\" for an entry with an invalid level or empty title. Use this issue order: missing-h1, multiple-h1, invalid-heading, skipped-level. Each issue should appear at most once.",
  constraints: [
    "headings is an array.",
    "Each heading level must be an integer between 1 and 6.",
    "A title must be a string containing at least one non-whitespace character.",
    "Invalid headings do not participate in the skipped-level check.",
    "Return each applicable issue code at most once, in the specified order."
  ],
  example: {
    input: [
      { title: "Home", level: 1 },
      { title: "Features", level: 2 },
      { title: "Details", level: 4 }
    ],
    output: ["skipped-level"],
    explanation: "The outline has one level-one heading, but it jumps from level 2 to level 4."
  },
  tags: ["accessibility", "nvda", "headings", "screen-reader"],
  estimatedMins: 25,
  xp: 45,
  starterFiles: [
    {
      name: "nvda_heading_navigation.js",
      content: "function validateHeadingOutline(headings) {\n  // TODO: validate the heading outline and return issue codes.\n  return [];\n}\n\nmodule.exports = validateHeadingOutline;\n"
    }
  ],
  testFile: {
    name: "nvda_heading_navigation_test.js",
    content: "const assert = require('assert');\nconst validateHeadingOutline = require('./nvda_heading_navigation');\n\nassert.deepStrictEqual(validateHeadingOutline([{ title: 'Home', level: 1 }]), []);\nassert.deepStrictEqual(validateHeadingOutline([{ title: 'Home', level: 1 }, { title: 'Details', level: 3 }]), ['skipped-level']);\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "First determine whether the array contains zero, one, or multiple valid level-one headings."
    },
    {
      order: 2,
      cost: 5,
      text: "Track invalid entries separately. Compare each valid heading with the previous valid heading to detect a jump of more than one level."
    },
    {
      order: 3,
      cost: 15,
      text: "Build a set of discovered issue codes, then return them in the exact required order."
    }
  ],
  hiddenTests: [
    { input: [{ title: "Home", level: 1 }], expected: [] },
    { input: [{ title: "Home", level: 1 }, { title: "About", level: 2 }], expected: [] },
    { input: [{ title: "Home", level: 1 }, { title: "Details", level: 3 }], expected: ["skipped-level"] },
    { input: [{ title: "About", level: 2 }], expected: ["missing-h1"] },
    { input: [{ title: "Home", level: 1 }, { title: "Other", level: 1 }], expected: ["multiple-h1"] },
    { input: [{ title: "", level: 1 }], expected: ["missing-h1", "invalid-heading"] },
    { input: [{ title: "Home", level: 1 }, { title: "Bad", level: 8 }], expected: ["invalid-heading"] },
    { input: [{ title: "Home", level: 1 }, { title: "Bad", level: 3 }, { title: "Next", level: 2 }], expected: ["invalid-heading", "skipped-level"] },
    { input: [{ title: "Home", level: 1 }, { title: "Two", level: 2 }, { title: "Three", level: 3 }], expected: [] },
    { input: [{ title: "One", level: 1 }, { title: "Two", level: 1 }, { title: "Four", level: 4 }], expected: ["multiple-h1", "skipped-level"] }
  ],
  solution: "function validateHeadingOutline(headings) {\n  const issues = new Set();\n  const validHeadings = [];\n  let h1Count = 0;\n\n  for (const heading of headings) {\n    const validLevel = heading && Number.isInteger(heading.level) && heading.level >= 1 && heading.level <= 6;\n    const validTitle = heading && typeof heading.title === 'string' && heading.title.trim().length > 0;\n\n    if (!validLevel || !validTitle) {\n      issues.add('invalid-heading');\n      continue;\n    }\n\n    validHeadings.push(heading);\n    if (heading.level === 1) h1Count += 1;\n  }\n\n  if (h1Count === 0) issues.add('missing-h1');\n  if (h1Count > 1) issues.add('multiple-h1');\n\n  for (let i = 1; i < validHeadings.length; i += 1) {\n    if (validHeadings[i].level > validHeadings[i - 1].level + 1) {\n      issues.add('skipped-level');\n    }\n  }\n\n  const order = ['missing-h1', 'multiple-h1', 'invalid-heading', 'skipped-level'];\n  return order.filter(issue => issues.has(issue));\n}\n\nmodule.exports = validateHeadingOutline;"
};

FILE: backend/seeders/challenges/accessibility-qa/screen-reader-landmark-audit.js

export default {
  slug: "screen-reader-landmark-audit",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-2",
  type: "CODE",
  difficulty: "medium",
  title: "Audit Screen Reader Landmarks",
  summary: "Find missing and duplicated page landmarks in a simplified accessibility tree.",
  description: "Landmarks help NVDA users jump directly to major page regions. A simplified page model can be audited to determine whether it has the expected main content, a banner, and appropriately named navigation regions.",
  task: "Implement auditLandmarks(landmarks). Each entry contains a role and an optional name. Return issue codes in this order: \"missing-banner\" if no banner exists, \"missing-main\" if no main exists, \"multiple-main\" if more than one main exists, \"unnamed-navigation\" if any navigation landmark has a missing or blank name, and \"duplicate-navigation-name\" if two or more navigation landmarks have the same trimmed name ignoring case. Each issue code should appear at most once.",
  constraints: [
    "landmarks is an array of objects.",
    "Recognized roles are banner, main, and navigation.",
    "Only navigation landmarks require a non-empty name.",
    "Navigation names are compared after trimming whitespace and converting to lowercase.",
    "Return issue codes in the specified order."
  ],
  example: {
    input: [
      { role: "banner" },
      { role: "main" },
      { role: "navigation", name: "Primary" },
      { role: "navigation", name: "Primary" }
    ],
    output: ["duplicate-navigation-name"],
    explanation: "Both navigation landmarks have the same accessible name."
  },
  tags: ["accessibility", "nvda", "landmarks", "screen-reader"],
  estimatedMins: 25,
  xp: 45,
  starterFiles: [
    {
      name: "screen_reader_landmark_audit.js",
      content: "function auditLandmarks(landmarks) {\n  // TODO: inspect landmarks and return issue codes.\n  return [];\n}\n\nmodule.exports = auditLandmarks;\n"
    }
  ],
  testFile: {
    name: "screen_reader_landmark_audit_test.js",
    content: "const assert = require('assert');\nconst auditLandmarks = require('./screen_reader_landmark_audit');\n\nassert.deepStrictEqual(auditLandmarks([{ role: 'banner' }, { role: 'main' }]), []);\nassert.deepStrictEqual(auditLandmarks([{ role: 'banner' }, { role: 'main' }, { role: 'navigation', name: 'Primary' }, { role: 'navigation', name: 'Primary' }]), ['duplicate-navigation-name']);\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Count the banner and main landmarks, then inspect navigation entries."
    },
    {
      order: 2,
      cost: 5,
      text: "Normalize navigation names with trim() and toLowerCase() before comparing them."
    },
    {
      order: 3,
      cost: 15,
      text: "Use a set of normalized names to detect duplicates, while separately tracking whether any navigation landmark is unnamed."
    }
  ],
  hiddenTests: [
    { input: [{ role: "banner" }, { role: "main" }], expected: [] },
    { input: [], expected: ["missing-banner", "missing-main"] },
    { input: [{ role: "main" }], expected: ["missing-banner"] },
    { input: [{ role: "banner" }], expected: ["missing-main"] },
    { input: [{ role: "banner" }, { role: "main" }, { role: "main" }], expected: ["multiple-main"] },
    { input: [{ role: "banner" }, { role: "main" }, { role: "navigation" }], expected: ["unnamed-navigation"] },
    { input: [{ role: "banner" }, { role: "main" }, { role: "navigation", name: "  " }], expected: ["unnamed-navigation"] },
    { input: [{ role: "banner" }, { role: "main" }, { role: "navigation", name: "Primary" }, { role: "navigation", name: " primary " }], expected: ["duplicate-navigation-name"] },
    { input: [{ role: "banner" }, { role: "main" }, { role: "navigation", name: "Primary" }, { role: "navigation", name: "Footer" }], expected: [] },
    { input: [{ role: "main" }, { role: "main" }, { role: "navigation" }], expected: ["missing-banner", "multiple-main", "unnamed-navigation"] }
  ],
  solution: "function auditLandmarks(landmarks) {\n  let bannerCount = 0;\n  let mainCount = 0;\n  let unnamedNavigation = false;\n  let duplicateNavigationName = false;\n  const navigationNames = new Set();\n\n  for (const landmark of landmarks) {\n    if (!landmark || typeof landmark.role !== 'string') continue;\n    if (landmark.role === 'banner') bannerCount += 1;\n    if (landmark.role === 'main') mainCount += 1;\n\n    if (landmark.role === 'navigation') {\n      const name = typeof landmark.name === 'string' ? landmark.name.trim().toLowerCase() : '';\n      if (!name) {\n        unnamedNavigation = true;\n      } else if (navigationNames.has(name)) {\n        duplicateNavigationName = true;\n      } else {\n        navigationNames.add(name);\n      }\n    }\n  }\n\n  const issues = [];\n  if (bannerCount === 0) issues.push('missing-banner');\n  if (mainCount === 0) issues.push('missing-main');\n  if (mainCount > 1) issues.push('multiple-main');\n  if (unnamedNavigation) issues.push('unnamed-navigation');\n  if (duplicateNavigationName) issues.push('duplicate-navigation-name');\n  return issues;\n}\n\nmodule.exports = auditLandmarks;"
};

FILE: backend/seeders/challenges/accessibility-qa/screen-reader-form-labels.js

export default {
  slug: "screen-reader-form-labels",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-2",
  type: "CODE",
  difficulty: "hard",
  title: "Validate Screen Reader Form Labels",
  summary: "Detect form controls that lack usable accessible names or clear error associations.",
  description: "When testing forms with NVDA, every interactive field should have a meaningful accessible name, and invalid fields should expose a useful error message. This challenge audits a simplified representation of form controls and their error associations.",
  task: "Implement auditFormControls(controls). Each control has id, label, required, invalid, and errorMessage properties. Return an array of objects containing controlId and issues. Report \"missing-id\" for an empty or missing id, \"missing-label\" for a missing or blank label, \"missing-required-indicator\" when required is true but the label does not include the word \"required\" (case-insensitive), and \"missing-error-message\" when invalid is true but errorMessage is missing or blank. Include only controls with issues. Preserve each control's original id as controlId, or null if it is missing or blank. Preserve the issue order specified above.",
  constraints: [
    "controls is an array.",
    "Treat a label as present only when it is a non-empty trimmed string.",
    "The required indicator is the case-insensitive word required anywhere in the label.",
    "Only invalid controls require an error message.",
    "Return controls in input order and issue codes in the specified order."
  ],
  example: {
    input: [
      { id: "email", label: "Email required", required: true, invalid: true, errorMessage: "" },
      { id: "name", label: "Full name", required: false, invalid: false }
    ],
    output: [
      { controlId: "email", issues: ["missing-error-message"] }
    ],
    explanation: "The email field has a label and required indicator but lacks an error message while invalid."
  },
  tags: ["accessibility", "nvda", "forms", "labels", "screen-reader"],
  estimatedMins: 35,
  xp: 70,
  starterFiles: [
    {
      name: "screen_reader_form_labels.js",
      content: "function auditFormControls(controls) {\n  // TODO: return an audit result for every control with issues.\n  return [];\n}\n\nmodule.exports = auditFormControls;\n"
    }
  ],
  testFile: {
    name: "screen_reader_form_labels_test.js",
    content: "const assert = require('assert');\nconst auditFormControls = require('./screen_reader_form_labels');\n\nassert.deepStrictEqual(auditFormControls([{ id: 'email', label: 'Email required', required: true, invalid: true, errorMessage: '' }]), [{ controlId: 'email', issues: ['missing-error-message'] }]);\nassert.deepStrictEqual(auditFormControls([{ id: 'name', label: 'Full name', required: false, invalid: false }]), []);\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Build an issues array for each control and only add the control to the result when that array is not empty."
    },
    {
      order: 2,
      cost: 5,
      text: "Use trimmed strings to validate ids, labels, and error messages. Check the required indicator with a case-insensitive regular expression."
    },
    {
      order: 3,
      cost: 15,
      text: "For every control, append issue codes in the specified order and use null for a missing or whitespace-only id."
    }
  ],
  hiddenTests: [
    { input: [{ id: "email", label: "Email", required: false, invalid: false }], expected: [] },
    { input: [{ id: "email", label: "Email required", required: true, invalid: false }], expected: [] },
    { input: [{ id: "email", label: "Email", required: true, invalid: false }], expected: [{ controlId: "email", issues: ["missing-required-indicator"] }] },
    { input: [{ id: "email", label: "", required: false, invalid: false }], expected: [{ controlId: "email", issues: ["missing-label"] }] },
    { input: [{ label: "Email", required: false, invalid: false }], expected: [{ controlId: null, issues: ["missing-id"] }] },
    { input: [{ id: "email", label: "Email", required: false, invalid: true, errorMessage: "" }], expected: [{ controlId: "email", issues: ["missing-error-message"] }] },
    { input: [{ id: "email", label: "Email", required: true, invalid: true, errorMessage: "Enter a valid email" }], expected: [{ controlId: "email", issues: ["missing-required-indicator"] }] },
    { input: [{ id: "email", label: "Email", required: true, invalid: true, errorMessage: " " }], expected: [{ controlId: "email", issues: ["missing-required-indicator", "missing-error-message"] }] },
    { input: [{ id: " ", label: "Email required", required: true, invalid: false }], expected: [{ controlId: null, issues: ["missing-id"] }] },
    { input: [{ id: "first", label: "First name", required: false, invalid: false }, { id: "last", label: "Last name", required: true, invalid: true }], expected: [{ controlId: "last", issues: ["missing-required-indicator", "missing-error-message"] }] }
  ],
  solution: "function auditFormControls(controls) {\n  const results = [];\n\n  for (const control of controls) {\n    const issues = [];\n    const idIsValid = control && typeof control.id === 'string' && control.id.trim().length > 0;\n    const labelIsValid = control && typeof control.label === 'string' && control.label.trim().length > 0;\n    const label = labelIsValid ? control.label.trim() : '';\n\n    if (!idIsValid) issues.push('missing-id');\n    if (!labelIsValid) issues.push('missing-label');\n    if (control && control.required === true && !/\\brequired\\b/i.test(label)) {\n      issues.push('missing-required-indicator');\n    }\n    if (control && control.invalid === true && !(typeof control.errorMessage === 'string' && control.errorMessage.trim().length > 0)) {\n      issues.push('missing-error-message');\n    }\n\n    if (issues.length > 0) {\n      results.push({ controlId: idIsValid ? control.id : null, issues });\n    }\n  }\n\n  return results;\n}\n\nmodule.exports = auditFormControls;"
};

FILE: backend/seeders/challenges/accessibility-qa/nvda-speech-output-audit.js

export default {
  slug: "nvda-speech-output-audit",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-2",
  type: "CODE",
  difficulty: "hard",
  title: "Audit NVDA Speech Output",
  summary: "Compare expected screen reader announcements with observed speech output.",
  description: "NVDA's Speech Viewer can help testers inspect what the screen reader announces during an interaction. A test may expect a control's accessible name, role, and state to be announced. This challenge compares expected and observed announcement tokens without depending on a live screen reader.",
  task: "Implement auditSpeechAnnouncement(expected, observed). Each argument is an object with name, role, and state strings. Return an array of issue codes in this order: \"name-mismatch\", \"role-mismatch\", \"state-mismatch\". Compare trimmed values without regard to letter case. A missing or blank value counts as a mismatch. Return an empty array when all three values match.",
  constraints: [
    "Both arguments are objects.",
    "Compare name, role, and state independently.",
    "Trim surrounding whitespace and compare case-insensitively.",
    "A missing, non-string, or blank value is a mismatch.",
    "Return issue codes in the specified order."
  ],
  example: {
    input: {
      expected: { name: "Submit", role: "button", state: "enabled" },
      observed: { name: "Submit", role: "link", state: "enabled" }
    },
    output: ["role-mismatch"],
    explanation: "The observed announcement identifies the control as a link rather than a button."
  },
  tags: ["accessibility", "nvda", "speech-viewer", "screen-reader", "testing"],
  estimatedMins: 35,
  xp: 70,
  starterFiles: [
    {
      name: "nvda_speech_output_audit.js",
      content: "function auditSpeechAnnouncement(expected, observed) {\n  // TODO: compare expected and observed announcement tokens.\n  return [];\n}\n\nmodule.exports = auditSpeechAnnouncement;\n"
    }
  ],
  testFile: {
    name: "nvda_speech_output_audit_test.js",
    content: "const assert = require('assert');\nconst auditSpeechAnnouncement = require('./nvda_speech_output_audit');\n\nassert.deepStrictEqual(auditSpeechAnnouncement({ name: 'Submit', role: 'button', state: 'enabled' }, { name: 'Submit', role: 'button', state: 'enabled' }), []);\nassert.deepStrictEqual(auditSpeechAnnouncement({ name: 'Submit', role: 'button', state: 'enabled' }, { name: 'Submit', role: 'link', state: 'enabled' }), ['role-mismatch']);\n"
    },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Create a helper that normalizes a value only if it is a non-empty string."
    },
    {
      order: 2,
      cost: 5,
      text: "Normalize both sides with trim() and toLowerCase(), then compare name, role, and state separately."
    },
    {
      order: 3,
      cost: 15,
      text: "Append mismatch codes in the order name, role, state so multiple problems produce a deterministic result."
    }
  ],
  hiddenTests: [
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: "Submit", role: "button", state: "enabled" } }, expected: [] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: "Save", role: "button", state: "enabled" } }, expected: ["name-mismatch"] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: "Submit", role: "link", state: "enabled" } }, expected: ["role-mismatch"] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: "Submit", role: "button", state: "disabled" } }, expected: ["state-mismatch"] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: " Save ", role: "link", state: "disabled" } }, expected: ["name-mismatch", "role-mismatch", "state-mismatch"] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: " submit ", role: " BUTTON ", state: " ENABLED " } }, expected: [] },
    { input: { expected: { name: "", role: "button", state: "enabled" }, observed: { name: "", role: "button", state: "enabled" } }, expected: ["name-mismatch"] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { role: "button", state: "enabled" } }, expected: ["name-mismatch"] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: "Submit", role: "", state: "" } }, expected: ["role-mismatch", "state-mismatch"] },
    { input: { expected: { name: "Submit", role: "button", state: "enabled" }, observed: { name: 5, role: "button", state: "enabled" } }, expected: ["name-mismatch"] }
  ],
  solution: "function auditSpeechAnnouncement(expected, observed) {\n  function normalize(value) {\n    return typeof value === 'string' && value.trim().length > 0 ? value.trim().toLowerCase() : null;\n  }\n\n  const issues = [];\n  const fields = [\n    ['name', 'name-mismatch'],\n    ['role', 'role-mismatch'],\n    ['state', 'state-mismatch']\n  ];\n\n  for (const [field, issue] of fields) {\n    const expectedValue = normalize(expected && expected[field]);\n    const observedValue = normalize(observed && observed[field]);\n    if (expectedValue === null || observedValue === null || expectedValue !== observedValue) {\n      issues.push(issue);\n    }\n  }\n\n  return issues;\n}\n\nmodule.exports = auditSpeechAnnouncement;"
};

next
FILE: backend/seeders/challenges/accessibility-qa/keyboard-focus-order.js

export default {
  slug: "keyboard-focus-order",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-3",
  type: "CODE",
  difficulty: "easy",
  title: "Validate Keyboard Focus Order",
  summary: "Detect unexpected focus sequences when navigating an interface with a keyboard.",
  description: "Keyboard users should be able to move through interactive elements in a logical order. Accessibility testers can model the expected sequence and compare it with the order observed when pressing Tab.",
  task: "Implement validateFocusOrder(expected, actual). Both arguments are arrays of element identifiers. Return an object with matches, missing, unexpected, and outOfOrder. matches is true only when both arrays contain the same identifiers in the same order. missing contains identifiers expected but absent from actual. unexpected contains identifiers present in actual but absent from expected. outOfOrder is true when the arrays contain the same unique identifiers but their order differs.",
  constraints: [
    "Both arguments are arrays of strings.",
    "Preserve the order of identifiers in missing and unexpected.",
    "Assume each identifier appears at most once in each array.",
    "Return exactly the four specified properties."
  ],
  example: {
    input: {
      expected: ["logo", "search", "menu"],
      actual: ["logo", "menu", "search"]
    },
    output: {
      matches: false,
      missing: [],
      unexpected: [],
      outOfOrder: true
    },
    explanation: "All expected elements appear, but search and menu receive focus in the wrong order."
  },
  tags: ["accessibility", "keyboard", "focus-order", "testing"],
  estimatedMins: 15,
  xp: 25,
  starterFiles: [
    {
      name: "keyboard_focus_order.js",
      content: "function validateFocusOrder(expected, actual) {\n  // TODO: compare expected and observed focus sequences.\n}\n\nmodule.exports = validateFocusOrder;\n"
    }
  ],
  testFile: {
    name: "keyboard_focus_order_test.js",
    content: "const assert = require('assert');\nconst validateFocusOrder = require('./keyboard_focus_order');\n\nassert.deepStrictEqual(validateFocusOrder(['logo', 'search'], ['logo', 'search']), { matches: true, missing: [], unexpected: [], outOfOrder: false });\nassert.deepStrictEqual(validateFocusOrder(['logo', 'search'], ['search', 'logo']), { matches: false, missing: [], unexpected: [], outOfOrder: true });\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Compare the arrays position by position to determine whether they match exactly."
    },
    {
      order: 2,
      cost: 5,
      text: "Use includes() to find identifiers missing from actual and identifiers unexpected in actual."
    },
    {
      order: 3,
      cost: 15,
      text: "The outOfOrder flag should be true only when both arrays contain the same identifiers but do not match position by position."
    }
  ],
  hiddenTests: [
    { input: { expected: ["logo", "search"], actual: ["logo", "search"] }, expected: { matches: true, missing: [], unexpected: [], outOfOrder: false } },
    { input: { expected: ["logo", "search"], actual: ["search", "logo"] }, expected: { matches: false, missing: [], unexpected: [], outOfOrder: true } },
    { input: { expected: ["logo", "search"], actual: ["logo"] }, expected: { matches: false, missing: ["search"], unexpected: [], outOfOrder: false } },
    { input: { expected: ["logo"], actual: ["logo", "help"] }, expected: { matches: false, missing: [], unexpected: ["help"], outOfOrder: false } },
    { input: { expected: ["a", "b", "c"], actual: ["c", "x", "a"] }, expected: { matches: false, missing: ["b"], unexpected: ["x"], outOfOrder: false } },
    { input: { expected: [], actual: [] }, expected: { matches: true, missing: [], unexpected: [], outOfOrder: false } },
    { input: { expected: ["a", "b"], actual: [] }, expected: { matches: false, missing: ["a", "b"], unexpected: [], outOfOrder: false } },
    { input: { expected: [], actual: ["a"] }, expected: { matches: false, missing: [], unexpected: ["a"], outOfOrder: false } }
  ],
  solution: "function validateFocusOrder(expected, actual) {\n  const matches = expected.length === actual.length && expected.every((item, index) => item === actual[index]);\n  const missing = expected.filter(item => !actual.includes(item));\n  const unexpected = actual.filter(item => !expected.includes(item));\n  const sameIdentifiers = missing.length === 0 && unexpected.length === 0;\n  const outOfOrder = sameIdentifiers && !matches;\n\n  return { matches, missing, unexpected, outOfOrder };\n}\n\nmodule.exports = validateFocusOrder;"
};

FILE: backend/seeders/challenges/accessibility-qa/keyboard-trap-detection.js

export default {
  slug: "keyboard-trap-detection",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-3",
  type: "CODE",
  difficulty: "medium",
  title: "Detect Keyboard Traps",
  summary: "Identify focus sequences that enter a component but never allow users to leave.",
  description: "A keyboard trap occurs when a keyboard user can move into a component but cannot move away using the available keyboard interactions. Analyze recorded focus transitions to flag components that have no recorded exit.",
  task: "Implement findKeyboardTraps(components). Each component has an id, entered, and exits properties. entered is true when keyboard focus can enter the component. exits is an array of component identifiers that focus can move to after entering. Return the ids of components where entered is true and exits is an empty array. Preserve input order.",
  constraints: [
    "components is an array of objects.",
    "A component is a trap only when entered is exactly true and exits is an empty array.",
    "Components with entered false are not traps.",
    "Return component identifiers in input order."
  ],
  example: {
    input: [
      { id: "dialog", entered: true, exits: [] },
      { id: "menu", entered: true, exits: ["content"] }
    ],
    output: ["dialog"],
    explanation: "The dialog can receive focus but has no recorded exit transition."
  },
  tags: ["accessibility", "keyboard", "focus", "testing"],
  estimatedMins: 20,
  xp: 45,
  starterFiles: [
    {
      name: "keyboard_trap_detection.js",
      content: "function findKeyboardTraps(components) {\n  // TODO: return identifiers of components that trap keyboard focus.\n  return [];\n}\n\nmodule.exports = findKeyboardTraps;\n"
    }
  ],
  testFile: {
    name: "keyboard_trap_detection_test.js",
    content: "const assert = require('assert');\nconst findKeyboardTraps = require('./keyboard_trap_detection');\n\nassert.deepStrictEqual(findKeyboardTraps([{ id: 'dialog', entered: true, exits: [] }]), ['dialog']);\nassert.deepStrictEqual(findKeyboardTraps([{ id: 'menu', entered: true, exits: ['content'] }]), []);\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Check the entry flag and the number of available exit transitions."
    },
    {
      order: 2,
      cost: 5,
      text: "Array.filter() can select only components that meet both conditions."
    },
    {
      order: 3,
      cost: 15,
      text: "Filter for entered === true and an empty exits array, then map the result to each component's id."
    }
  ],
  hiddenTests: [
    { input: [{ id: "dialog", entered: true, exits: [] }], expected: ["dialog"] },
    { input: [{ id: "menu", entered: true, exits: ["content"] }], expected: [] },
    { input: [{ id: "search", entered: false, exits: [] }], expected: [] },
    { input: [], expected: [] },
    { input: [{ id: "a", entered: true, exits: [] }, { id: "b", entered: true, exits: [] }], expected: ["a", "b"] },
    { input: [{ id: "a", entered: false, exits: [] }, { id: "b", entered: true, exits: ["a"] }], expected: [] },
    { input: [{ id: "a", entered: true, exits: ["b"] }, { id: "b", entered: true, exits: [] }, { id: "c", entered: true, exits: ["a"] }], expected: ["b"] },
    { input: [{ id: "modal", entered: true, exits: [] }, { id: "tooltip", entered: false, exits: [] }], expected: ["modal"] }
  ],
  solution: "function findKeyboardTraps(components) {\n  return components\n    .filter(component => component.entered === true && Array.isArray(component.exits) && component.exits.length === 0)\n    .map(component => component.id);\n}\n\nmodule.exports = findKeyboardTraps;"
};

FILE: backend/seeders/challenges/accessibility-qa/keyboard-operable-controls.js

export default {
  slug: "keyboard-operable-controls",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-3",
  type: "CODE",
  difficulty: "medium",
  title: "Audit Keyboard-Operable Controls",
  summary: "Find interactive controls that cannot be operated using the keyboard.",
  description: "An accessibility tester should verify that interactive controls can be operated without a mouse. Use a simplified control inventory to identify elements that are interactive but not keyboard-operable.",
  task: "Implement findNonKeyboardOperableControls(controls). Each control has id, interactive, and keyboardOperable properties. Return the ids of controls where interactive is true and keyboardOperable is not true. Preserve input order.",
  constraints: [
    "controls is an array of objects.",
    "Only controls with interactive === true are considered.",
    "keyboardOperable must be exactly true to pass.",
    "Return an array of ids in input order."
  ],
  example: {
    input: [
      { id: "save", interactive: true, keyboardOperable: true },
      { id: "custom-tab", interactive: true, keyboardOperable: false }
    ],
    output: ["custom-tab"],
    explanation: "The custom tab is interactive but is not keyboard-operable."
  },
  tags: ["accessibility", "keyboard", "controls", "testing"],
  estimatedMins: 20,
  xp: 45,
  starterFiles: [
    {
      name: "keyboard_operable_controls.js",
      content: "function findNonKeyboardOperableControls(controls) {\n  // TODO: identify interactive controls that are not keyboard-operable.\n  return [];\n}\n\nmodule.exports = findNonKeyboardOperableControls;\n"
    }
  ],
  testFile: {
    name: "keyboard_operable_controls_test.js",
    content: "const assert = require('assert');\nconst findNonKeyboardOperableControls = require('./keyboard_operable_controls');\n\nassert.deepStrictEqual(findNonKeyboardOperableControls([{ id: 'save', interactive: true, keyboardOperable: true }, { id: 'custom-tab', interactive: true, keyboardOperable: false }]), ['custom-tab']);\nassert.deepStrictEqual(findNonKeyboardOperableControls([{ id: 'text', interactive: false, keyboardOperable: false }]), []);\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "First ignore controls that are not interactive."
    },
    {
      order: 2,
      cost: 5,
      text: "A control fails if its keyboardOperable property is anything other than true."
    },
    {
      order: 3,
      cost: 15,
      text: "Filter the input array using both conditions, then return only the ids."
    }
  ],
  hiddenTests: [
    { input: [{ id: "save", interactive: true, keyboardOperable: true }], expected: [] },
    { input: [{ id: "custom-tab", interactive: true, keyboardOperable: false }], expected: ["custom-tab"] },
    { input: [{ id: "label", interactive: false, keyboardOperable: false }], expected: [] },
    { input: [], expected: [] },
    { input: [{ id: "a", interactive: true, keyboardOperable: false }, { id: "b", interactive: true, keyboardOperable: true }], expected: ["a"] },
    { input: [{ id: "a", interactive: true }, { id: "b", interactive: true, keyboardOperable: null }], expected: ["a", "b"] },
    { input: [{ id: "a", interactive: true, keyboardOperable: false }, { id: "b", interactive: false, keyboardOperable: false }, { id: "c", interactive: true, keyboardOperable: false }], expected: ["a", "c"] },
    { input: [{ id: "a", interactive: true, keyboardOperable: 1 }], expected: ["a"] }
  ],
  solution: "function findNonKeyboardOperableControls(controls) {\n  return controls\n    .filter(control => control.interactive === true && control.keyboardOperable !== true)\n    .map(control => control.id);\n}\n\nmodule.exports = findNonKeyboardOperableControls;"
};

FILE: backend/seeders/challenges/accessibility-qa/keyboard-shortcut-conflicts.js

export default {
  slug: "keyboard-shortcut-conflicts",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-3",
  type: "CODE",
  difficulty: "hard",
  title: "Find Keyboard Shortcut Conflicts",
  summary: "Detect duplicate keyboard shortcuts assigned to different actions.",
  description: "Web applications sometimes define custom keyboard shortcuts. Conflicting shortcuts can make keyboard navigation unpredictable, especially for users who rely on assistive technology. Audit a list of shortcut assignments to identify conflicts.",
  task: "Implement findShortcutConflicts(shortcuts). Each entry has key and action properties. Normalize keys by trimming whitespace and converting to lowercase. Return an array of objects with key and actions for normalized keys assigned to more than one distinct action. Each result's key is the normalized key, and actions contains unique action names in their original encounter order. Return conflicts in the order each conflicting key first appeared.",
  constraints: [
    "shortcuts is an array of objects with string key and action values.",
    "Ignore entries whose key or action is missing or blank.",
    "Shortcut key comparisons are case-insensitive and ignore surrounding whitespace.",
    "Repeated assignment of the same key to the same action is not a conflict.",
    "Return each conflicting key only once."
  ],
  example: {
    input: [
      { key: " Ctrl+K ", action: "search" },
      { key: "ctrl+k", action: "open-menu" },
      { key: "Alt+S", action: "settings" }
    ],
    output: [
      { key: "ctrl+k", actions: ["search", "open-menu"] }
    ],
    explanation: "The normalized shortcut ctrl+k is assigned to two distinct actions."
  },
  tags: ["accessibility", "keyboard", "shortcuts", "testing"],
  estimatedMins: 35,
  xp: 70,
  starterFiles: [
    {
      name: "keyboard_shortcut_conflicts.js",
      content: "function findShortcutConflicts(shortcuts) {\n  // TODO: group valid shortcut assignments and return conflicts.\n  return [];\n}\n\nmodule.exports = findShortcutConflicts;\n"
    }
  ],
  testFile: {
    name: "keyboard_shortcut_conflicts_test.js",
    content: "const assert = require('assert');\nconst findShortcutConflicts = require('./keyboard_shortcut_conflicts');\n\nassert.deepStrictEqual(findShortcutConflicts([{ key: 'Ctrl+K', action: 'search' }, { key: 'ctrl+k', action: 'open-menu' }]), [{ key: 'ctrl+k', actions: ['search', 'open-menu'] }]);\nassert.deepStrictEqual(findShortcutConflicts([{ key: 'Alt+S', action: 'settings' }]), []);\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Normalize each key and group its distinct actions."
    },
    {
      order: 2,
      cost: 5,
      text: "Use a Map from normalized keys to arrays of unique actions. Preserve insertion order."
    },
    {
      order: 3,
      cost: 15,
      text: "After grouping, return only entries with more than one distinct action, mapping each to an object containing key and actions."
    }
  ],
  hiddenTests: [
    { input: [{ key: "Ctrl+K", action: "search" }, { key: "ctrl+k", action: "open-menu" }], expected: [{ key: "ctrl+k", actions: ["search", "open-menu"] }] },
    { input: [{ key: "Alt+S", action: "settings" }], expected: [] },
    { input: [{ key: "x", action: "one" }, { key: "x", action: "one" }], expected: [] },
    { input: [{ key: " A ", action: "one" }, { key: "a", action: "two" }], expected: [{ key: "a", actions: ["one", "two"] }] },
    { input: [{ key: "", action: "one" }, { key: "x", action: " " }], expected: [] },
    { input: [{ key: "x", action: "one" }, { key: "y", action: "two" }, { key: "x", action: "three" }, { key: "y", action: "four" }], expected: [{ key: "x", actions: ["one", "three"] }, { key: "y", actions: ["two", "four"] }] },
    { input: [{ key: "x", action: "one" }, { key: "x", action: "two" }, { key: "x", action: "one" }], expected: [{ key: "x", actions: ["one", "two"] }] },
    { input: [], expected: [] }
  ],
  solution: "function findShortcutConflicts(shortcuts) {\n  const grouped = new Map();\n\n  for (const shortcut of shortcuts) {\n    if (!shortcut || typeof shortcut.key !== 'string' || typeof shortcut.action !== 'string') continue;\n    const key = shortcut.key.trim().toLowerCase();\n    const action = shortcut.action.trim();\n    if (!key || !action) continue;\n\n    if (!grouped.has(key)) grouped.set(key, []);\n    const actions = grouped.get(key);\n    if (!actions.includes(action)) actions.push(action);\n  }\n\n  return Array.from(grouped.entries())\n    .filter(([, actions]) => actions.length > 1)\n    .map(([key, actions]) => ({ key, actions }));\n}\n\nmodule.exports = findShortcutConflicts;"
};

FILE: backend/seeders/challenges/accessibility-qa/keyboard-focus-restoration.js

export default {
  slug: "keyboard-focus-restoration",
  trackId: "accessibility-qa",
  layerId: "accessibility-qa-3",
  type: "CODE",
  difficulty: "hard",
  title: "Validate Focus Restoration",
  summary: "Check whether closing an overlay restores focus to the element that opened it.",
  description: "When a dialog or menu closes, keyboard users should generally return to the control that opened it, unless that control no longer exists. Model overlay focus behavior and report missing or incorrect restoration targets.",
  task: "Implement validateFocusRestoration(scenarios). Each scenario has openerId, restoredFocusId, and openerExists. Return an array of issue objects for scenarios that fail. When openerExists is true, restoredFocusId must equal openerId; otherwise report { index, issue: \"focus-not-restored\" }. When openerExists is false, no restoration to that opener is required, so do not report an issue. Preserve scenario order.",
  constraints: [
    "scenarios is an array of objects.",
    "Compare openerId and restoredFocusId exactly.",
    "A scenario with openerExists false always passes this check.",
    "Each issue contains only index and issue.",
    "Index is the scenario's zero-based position in the input array."
  ],
  example: {
    input: [
      { openerId: "open-dialog", restoredFocusId: "open-dialog", openerExists: true },
      { openerId: "open-menu", restoredFocusId: "page-title", openerExists: true }
    ],
    output: [
      { index: 1, issue: "focus-not-restored" }
    ],
    explanation: "The second overlay closes without returning focus to its existing opener."
  },
  tags: ["accessibility", "keyboard", "focus-restoration", "testing"],
  estimatedMins: 35,
  xp: 70,
  starterFiles: [
    {
      name: "keyboard_focus_restoration.js",
      content: "function validateFocusRestoration(scenarios) {\n  // TODO: report scenarios where focus restoration fails.\n  return [];\n}\n\nmodule.exports = validateFocusRestoration;\n"
    }
  ],
  testFile: {
    name: "keyboard_focus_restoration_test.js",
    content: "const assert = require('assert');\nconst validateFocusRestoration = require('./keyboard_focus_restoration');\n\nassert.deepStrictEqual(validateFocusRestoration([{ openerId: 'open-dialog', restoredFocusId: 'open-dialog', openerExists: true }]), []);\nassert.deepStrictEqual(validateFocusRestoration([{ openerId: 'open-menu', restoredFocusId: 'page-title', openerExists: true }]), [{ index: 0, issue: 'focus-not-restored' }]);\n"
  },
  hints: [
    {
      order: 1,
      cost: 0,
      text: "Loop through the scenarios while keeping track of each item's index."
    },
    {
      order: 2,
      cost: 5,
      text: "Only check the restored target when openerExists is true."
    },
    {
      order: 3,
      cost: 15,
      text: "Push an issue object whenever restoredFocusId differs from openerId for an existing opener."
    }
  ],
  hiddenTests: [
    { input: [{ openerId: "open-dialog", restoredFocusId: "open-dialog", openerExists: true }], expected: [] },
    { input: [{ openerId: "open-menu", restoredFocusId: "page-title", openerExists: true }], expected: [{ index: 0, issue: "focus-not-restored" }] },
    { input: [{ openerId: "removed-button", restoredFocusId: "page-title", openerExists: false }], expected: [] },
    { input: [], expected: [] },
    { input: [{ openerId: "a", restoredFocusId: "a", openerExists: true }, { openerId: "b", restoredFocusId: "c", openerExists: true }], expected: [{ index: 1, issue: "focus-not-restored" }] },
    { input: [{ openerId: "a", restoredFocusId: null, openerExists: true }], expected: [{ index: 0, issue: "focus-not-restored" }] },
    { input: [{ openerId: "a", restoredFocusId: "b", openerExists: false }, { openerId: "c", restoredFocusId: "d", openerExists: true }], expected: [{ index: 1, issue: "focus-not-restored" }] },
    { input: [{ openerId: "x", restoredFocusId: "x", openerExists: false }], expected: [] }
  ],
  solution: "function validateFocusRestoration(scenarios) {\n  const issues = [];\n\n  scenarios.forEach((scenario, index) => {\n    if (scenario.openerExists === true && scenario.restoredFocusId !== scenario.openerId) {\n      issues.push({ index, issue: 'focus-not-restored' });\n    }\n  });\n\n  return issues;\n}\n\nmodule.exports = validateFocusRestoration;"
};



