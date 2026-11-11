const COMPACT = new Intl.NumberFormat("en", { notation: "compact", maximumFractionDigits: 1 });
const FULL = new Intl.NumberFormat("en");

const isCount = (n) => typeof n === "number" && Number.isFinite(n);

/** 18400 -> "18.4K". Anything that isn't a number reads as "–", never "NaN". */
export const compactTokens = (n) => (isCount(n) ? COMPACT.format(n) : "–");

/** 131072 -> "131,072", for places where the exact figure is the point. */
export const fullTokens = (n) => (isCount(n) ? FULL.format(n) : "–");

export { isCount };
