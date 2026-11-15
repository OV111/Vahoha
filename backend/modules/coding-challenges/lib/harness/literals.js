// Writes a hidden case's arguments as source code in a typed language.
//
// Typed harnesses are compiled together with the learner's file, so the
// arguments are spelled out as literals instead of being parsed from stdin
// (Java and C++ have no JSON reader in their standard library). The values come
// from the challenge author, never from the learner, and every value is checked
// against its declared type first.
//
// Each escaper only lets printable ASCII through as itself, so no input can end
// a string literal early or start an escape the language would read differently.

import { Buffer } from "node:buffer";
import { matchesType, parseType, typeIn } from "../../../../../constants/challengeTypes.js";

const isPrintable = (code) => code >= 0x20 && code < 0x7f;

// Java turns \uXXXX into a character before it even reads the string, so a
// \u000a would end the line. Control characters therefore use octal escapes;
// \uXXXX is used only from 0x7f up, where it is safe.
const javaString = (text) => {
  let out = '"';
  for (let i = 0; i < text.length; i++) {
    const code = text.charCodeAt(i);
    if (code === 0x22) out += '\\"';
    else if (code === 0x5c) out += "\\\\";
    else if (isPrintable(code)) out += text[i];
    else if (code < 0x20) out += `\\${code.toString(8).padStart(3, "0")}`;
    else out += `\\u${code.toString(16).padStart(4, "0")}`;
  }
  return `${out}"`;
};

// Byte by byte over the UTF-8. C++ \x would swallow any hex digits that follow
// it, so octal (at most three digits) is used. The length is passed explicitly
// so a "\0" inside the string is kept. "?" is escaped against trigraphs.
const cppString = (text) => {
  const bytes = Buffer.from(text, "utf8");
  let body = "";
  for (const byte of bytes) {
    const safe = isPrintable(byte) && byte !== 0x22 && byte !== 0x5c && byte !== 0x3f;
    body += safe ? String.fromCharCode(byte) : `\\${byte.toString(8).padStart(3, "0")}`;
  }
  return `string("${body}", ${bytes.length})`;
};

// Go's \x takes exactly two hex digits, so it is safe byte by byte.
const goString = (text) => {
  let body = "";
  for (const byte of Buffer.from(text, "utf8")) {
    const safe = isPrintable(byte) && byte !== 0x22 && byte !== 0x5c;
    body += safe ? String.fromCharCode(byte) : `\\x${byte.toString(16).padStart(2, "0")}`;
  }
  return `"${body}"`;
};

const STRINGS = { java: javaString, cpp: cppString, go: goString };

const number = (value, base) => {
  if (base === "int") return String(value);
  // A whole double needs a decimal point, or Java and C++ read it as an int.
  return Number.isInteger(value) ? `${value}.0` : String(value);
};

const scalar = (language, value, base) => {
  if (base === "string") return STRINGS[language](value);
  if (base === "bool") return value ? "true" : "false";
  return number(value, base);
};

// Nested braces: {1, 2} or {{1, 2}, {3}}.
const braces = (language, value, parsed) => {
  if (parsed.depth === 0) return scalar(language, value, parsed.base);
  const inner = { base: parsed.base, depth: parsed.depth - 1 };
  return `{${value.map((item) => braces(language, item, inner)).join(", ")}}`;
};

/** The value as a literal of `type` in `language`. Throws when it does not fit the type. */
export const literal = (language, value, type) => {
  if (!matchesType(value, type)) {
    throw new Error(`hidden case value ${JSON.stringify(value)} is not a ${type}`);
  }
  const parsed = parseType(type);
  if (parsed.depth === 0) return scalar(language, value, parsed.base);
  // Java needs `new int[]{...}`; C++ and Go put the type in front of the braces.
  const prefix = language === "java" ? `new ${typeIn("java", type)}` : typeIn(language, type);
  return prefix + braces(language, value, parsed);
};
