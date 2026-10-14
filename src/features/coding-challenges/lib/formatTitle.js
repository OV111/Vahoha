// A first word that is really code (`curry()`, `deepClone()`, `useFetch`,
// `snake_case`, `Object.groupBy`) must keep its spelling: "DeepClone()" would
// name a function that doesn't exist.
const looksLikeCode = (word) => /[()._]|[a-z][A-Z]/.test(word);

/** Challenge titles start with a capital letter, except when they open with an identifier. */
export const formatTitle = (title = "") => {
  const trimmed = title.trim();
  const first = trimmed.split(/\s+/, 1)[0] ?? "";
  if (!first || looksLikeCode(first)) return trimmed;
  return trimmed.charAt(0).toUpperCase() + trimmed.slice(1);
};
