// Copy and options for the "Mentor usage" section in Settings.

export const MENTOR_USAGE_RANGES = Object.freeze([7, 30]);
export const MENTOR_USAGE_DEFAULT_DAYS = 30;

// A slim scrollbar for the usage lists. The standard properties cover Firefox,
// Chrome and Edge; the ::-webkit rules are the fallback for older Safari.
export const THIN_SCROLL_CLASS =
  "[scrollbar-width:thin] [scrollbar-color:rgba(128,128,128,0.45)_transparent] [&::-webkit-scrollbar]:size-1 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb]:bg-gray-500/50";

export const MENTOR_USAGE_COPY = Object.freeze({
  heading: "Mentor usage",
  loading: "Loading mentor usage",
  note: "Token counts come from the AI provider. One message can involve several model calls (for example when the mentor looks something up), so tokens per message vary.",
  loadError: "Couldn't load your mentor usage.",
  retry: "Retry",

  todayHeading: "Today",
  messagesLabel: "Messages",
  tokensLabel: "Tokens",
  promptLabel: "Sent",
  completionLabel: "Received",
  totalLabel: "Total",
  resetsAt: (time, relative) => `Resets at ${time} (${relative})`,

  rangeLabel: "Time range",
  rangeOption: (days) => `${days} days`,

  chartTitle: "Tokens per day",
  chartEmpty: "No mentor usage in this period yet.",
  viewTable: "View as table",
  viewChart: "View as chart",

  statMessages: "Messages",
  statTokens: "Tokens",
  statAverage: "Tokens per message",

  conversationsHeading: "By conversation",
  conversationsEmpty: "No mentor conversations in this period yet.",
  deletedChat: "Deleted chat",
  colConversation: "Conversation",
  colTurns: "Turns",
  colTokens: "Tokens",
  colLastUsed: "Last used",
  colDate: "Date",
  colMessages: "Messages",
});
