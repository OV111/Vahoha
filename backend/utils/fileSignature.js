// Identify an upload by its first bytes ("magic numbers"), not by its name or
// the browser's Content-Type, which the client controls. Anything that is not
// on this list (HTML, SVG, scripts, archives...) is refused before upload.

export const SNIFF_BYTES = 12; // enough for every signature below (WebP needs 12)

const ascii = (s) => [...s].map((c) => c.charCodeAt(0));
const startsWith = (buf, bytes, offset = 0) =>
  buf.length >= offset + bytes.length && bytes.every((b, i) => buf[offset + i] === b);

const FORMATS = [
  { kind: "image", test: (b) => startsWith(b, [0xff, 0xd8, 0xff]) }, // JPEG
  { kind: "image", test: (b) => startsWith(b, [0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]) }, // PNG
  { kind: "image", test: (b) => startsWith(b, ascii("GIF87a")) || startsWith(b, ascii("GIF89a")) },
  { kind: "image", test: (b) => startsWith(b, ascii("RIFF")) && startsWith(b, ascii("WEBP"), 8) },
  { kind: "document", test: (b) => startsWith(b, ascii("%PDF-")) },
  { kind: "document", test: (b) => startsWith(b, [0x50, 0x4b, 0x03, 0x04]) }, // DOCX (a zip)
  { kind: "document", test: (b) => startsWith(b, [0xd0, 0xcf, 0x11, 0xe0, 0xa1, 0xb1, 0x1a, 0xe1]) }, // legacy .doc
];

/** "image" | "document" | null */
export const sniffFileKind = (buf) => FORMATS.find((f) => f.test(buf))?.kind ?? null;
