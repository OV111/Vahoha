// Value types for challenges that can be solved in typed languages (Java, C++,
// Go). A typed language cannot call a function whose parameter types it does
// not know, so such a challenge writes them down once:
//
//   functionSpec: {
//     name: "twoSum",
//     params: [{ name: "nums", type: "int[]" }, { name: "target", type: "int" }],
//     returns: "int[]",
//   }
//
// A type is int, double, bool or string, followed by any number of "[]" for
// arrays: "int[]", "string[][]". Values in the hidden cases are plain JSON of
// that shape. Shared by the Arena (starters) and the grader (harnesses).

const TYPE = /^(int|double|bool|string)((?:\[\])*)$/;

const INT_MIN = -(2 ** 31);
const INT_MAX = 2 ** 31 - 1;

/** "int[][]" -> { base: "int", depth: 2 }, or null when it is not a type. */
export const parseType = (text) => {
  const match = TYPE.exec(String(text ?? "").trim());
  return match ? { base: match[1], depth: match[2].length / 2 } : null;
};

// Older specs list parameters as bare names; typed ones as { name, type }.
export const paramName = (param) => (typeof param === "string" ? param : (param?.name ?? ""));

/** Does this spec give every parameter and the result a type? */
export const isTypedSpec = (spec) =>
  Boolean(spec?.name) &&
  Boolean(parseType(spec.returns)) &&
  Array.isArray(spec.params) &&
  spec.params.every((p) => p && typeof p === "object" && p.name && parseType(p.type));

// "int" is 32-bit so it means the same in every language.
const baseMatches = (value, base) => {
  if (base === "int") return Number.isInteger(value) && value >= INT_MIN && value <= INT_MAX;
  if (base === "double") return typeof value === "number" && Number.isFinite(value);
  if (base === "bool") return typeof value === "boolean";
  return typeof value === "string";
};

/** Does a JSON value have the shape of a type? Used to check hidden cases. */
export const matchesType = (value, type) => {
  const parsed = typeof type === "string" ? parseType(type) : type;
  if (!parsed) return false;
  if (parsed.depth === 0) return baseMatches(value, parsed.base);
  const inner = { base: parsed.base, depth: parsed.depth - 1 };
  return Array.isArray(value) && value.every((item) => matchesType(item, inner));
};

const BASE_NAMES = {
  java: { int: "int", double: "double", bool: "boolean", string: "String" },
  cpp: { int: "int", double: "double", bool: "bool", string: "string" },
  go: { int: "int", double: "float64", bool: "bool", string: "string" },
};

/** How a language spells a type: "int[]" -> "int[]", "vector<int>", "[]int". */
export const typeIn = (language, type) => {
  const { base, depth } = parseType(type);
  const name = BASE_NAMES[language][base];
  if (language === "java") return name + "[]".repeat(depth);
  if (language === "go") return "[]".repeat(depth) + name;
  let spelled = name;
  for (let i = 0; i < depth; i++) spelled = `vector<${spelled}>`;
  return spelled;
};

// What an empty starter returns, so it compiles and fails every case.
const JAVA_ZERO = { int: "0", double: "0.0", bool: "false", string: '""' };
const GO_ZERO = { int: "0", double: "0", bool: "false", string: '""' };

export const zeroValueIn = (language, type) => {
  const { base, depth } = parseType(type);
  if (language === "cpp") return "{}";
  if (language === "go") return depth > 0 ? "nil" : GO_ZERO[base];
  return depth > 0 ? `new ${BASE_NAMES.java[base]}[0]${"[]".repeat(depth - 1)}` : JAVA_ZERO[base];
};
