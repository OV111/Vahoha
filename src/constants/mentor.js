import {
  Paperclip,
  Map,
  BarChart2,
  Target,
  BookOpen,
  Zap,
  ClipboardList,
  Crosshair,
  FileText,
} from "lucide-react";

// Only text attachments: the mentor runs on Groq `openai/gpt-oss-120b`, which is
// text-only, so images are rejected with an explanation instead of being dropped.
// The size limits are shared with the API (shared/mentorAttachments.js).
export const ATTACHMENT_ACCEPTED_EXTENSIONS = [
  // plain text / data
  "txt", "md", "markdown", "json", "csv", "tsv", "log", "yml", "yaml", "xml", "toml", "ini", "env",
  // code
  "js", "jsx", "ts", "tsx", "mjs", "cjs", "py", "java", "c", "h", "cpp", "hpp", "cs", "go", "rs",
  "rb", "php", "swift", "kt", "scala", "sh", "bash", "sql", "html", "css", "scss", "vue", "svelte",
];

/**
 * Context meter in the chat header: how much of the model's context window the
 * last reply used. The numbers come from the server's `usage` stream event; the
 * thresholds only decide the colour.
 */
export const CONTEXT_METER = {
  label: "Context",
  amberAt: 70,
  redAt: 90,
  trimmedHint: "Older messages are no longer in context",
  describe: (used, max) => `Last reply used ${used} of ${max} context tokens`,
};

/** Chat-history sidebar copy and paging. */
export const SESSIONS_PAGE_SIZE = 30;
export const SESSION_SEARCH_DEBOUNCE_MS = 250;
export const SIDEBAR_OPEN_STORAGE_KEY = "mentor.sidebarOpen";

// Shown in the transcript where the learner pressed Stop.
export const STOPPED_NOTICE = "You stopped the Mentor's response";

export const SESSIONS_COPY = {
  title: "Sessions",
  historyNav: "Chat history",
  searchPlaceholder: "Search...",
  searchLabel: "Search chats",
  clearSearch: "Clear search",
  loading: "Loading sessions",
  searching: "Searching chats",
  empty: "No sessions yet",
  emptyHint: "Start a conversation to create one",
  noMatch: (q) => `No chats match “${q}”`,
  loadMore: "Load more",
  loadingMore: "Loading…",
  loadMoreLabel: "Load more chats",
  replying: "Replying",
  challengeFilter: "Challenge chats",
  noChallengeChats: "No challenge chats yet",
  noChallengeChatsHint: "Open the mentor from a coding challenge to start one",
  usageLink: "Usage",
  usageModalTitle: "Mentor usage",
  usageClose: "Close usage",
};

/** Date groups in the order they render; "pinned" is filled from the pin flag. */
export const SESSION_GROUP_LABELS = {
  pinned: "Pinned",
  today: "Today",
  yesterday: "Yesterday",
  week: "Previous 7 days",
  older: "Older",
};

/**
 * Chips and menu items carry a `prompt` — the text dropped into the composer.
 *
 * They are prompt shortcuts, not data browsers, and that is deliberate: the
 * agent already has tools for progress, weak spots, test history and post
 * search, so building panels would duplicate verified tools. What users
 * actually lack is knowing the agent CAN do this — a shortcut solves that.
 *
 * A full question, not the bare label: a one-word message like "Roadmap" is a
 * much worse prompt.
 */
export const CHIPS = [
  { label: "Challenges", icon: Zap,           prompt: "What coding challenges should I practice next, based on where I am?" },
  { label: "Weak Spots", icon: Crosshair,     prompt: "What are my weak spots, and what should I review first?" },
  { label: "Tests",      icon: ClipboardList, prompt: "How have my tests gone so far, and what did I get wrong?" },
  { label: "Blogs",      icon: FileText,      prompt: "Find me platform posts about " },
  { label: "Roadmap",    icon: Map,           prompt: "Where am I on my roadmap right now, and what's the next layer?" },
];

export const DROPDOWN_ITEMS = [
  {
    items: [
      { icon: Paperclip, label: "Attach file", arrow: false, shortcut: "Ctrl+U" },
    ],
  },
  {
    items: [
      { icon: Map,       label: "My roadmap",    arrow: false, prompt: "Show me my roadmap — which path am I on and what layers are left?" },
      { icon: BarChart2, label: "My progress",   arrow: false, prompt: "Where am I on my roadmap right now, and what's the next layer?" },
      { icon: Target,    label: "My weak spots", arrow: false, prompt: "What are my weak spots, and what should I review first?" },
    ],
  },
  {
    items: [
      // No "Browse challenges" item on purpose: /coding-challenges is the catalog.
      // Challenge suggestions belong in an agent tool, not a menu.
      { icon: BookOpen, label: "Search blogs", arrow: false, prompt: "Find me platform posts about " },
    ],
  },
];

// 👍/👎 under a mentor answer. Reason ids match the API's FEEDBACK_REASONS.
export const MESSAGE_FEEDBACK_COPY = {
  up: "Good answer",
  down: "Bad answer",
  question: "What went wrong?",
  thanks: "Thanks, this helps improve the mentor.",
  reasons: [
    { id: "wrong", label: "Wrong" },
    { id: "too_long", label: "Too long" },
    { id: "gave_away", label: "Gave away the answer" },
    { id: "not_helpful", label: "Didn't help" },
  ],
};

// The mentor opened over another page (MentorPanel) instead of navigating away.
export const MENTOR_PANEL_COPY = {
  title: "Mentor",
  openFull: "Open the full mentor page",
  close: "Close mentor",
};
