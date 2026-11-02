/**
 * Download the CV the user uploaded to their profile and return its plain text.
 * Only https URLs on Cloudinary are fetched (the profile upload stores the CV
 * there), so a tampered cvUrl can't point the server at an internal address.
 * The file type comes from its first bytes, not its name.
 */

import { extractText, getDocumentProxy } from "unpdf";
import { Buffer } from "node:buffer";
import mammoth from "mammoth";
import { fail } from "../../../../utils/httpErrors.js";

const MAX_BYTES = 5 * 1024 * 1024;
const TIMEOUT_MS = 15_000;
const ALLOWED_HOST = "res.cloudinary.com";

const kindOf = (bytes) => {
  if (bytes[0] === 0x25 && bytes[1] === 0x50 && bytes[2] === 0x44 && bytes[3] === 0x46) return "pdf"; // %PDF
  if (bytes[0] === 0x50 && bytes[1] === 0x4b) return "docx"; // PK (zip)
  if (bytes[0] === 0xd0 && bytes[1] === 0xcf) return "doc"; // old Word
  return null;
};

const download = async (url) => {
  let parsed;
  try {
    parsed = new URL(url);
  } catch {
    fail(400, "Your CV link is broken. Upload your CV again on your profile");
  }
  if (parsed.protocol !== "https:" || parsed.hostname !== ALLOWED_HOST) {
    fail(400, "Upload your CV again on your profile");
  }

  let res;
  try {
    res = await fetch(parsed, { redirect: "error", signal: AbortSignal.timeout(TIMEOUT_MS) });
  } catch {
    fail(502, "Couldn't download your CV. Try again in a minute");
  }
  if (!res.ok) fail(502, "Couldn't download your CV. Upload it again on your profile");
  if (Number(res.headers.get("content-length")) > MAX_BYTES) fail(413, "Your CV is over 5 MB");

  const bytes = new Uint8Array(await res.arrayBuffer());
  if (bytes.length > MAX_BYTES) fail(413, "Your CV is over 5 MB");
  return bytes;
};

/** @returns {Promise<string>} the CV text, whitespace collapsed */
export const readCvText = async (url) => {
  const bytes = await download(url);
  const kind = kindOf(bytes);
  if (kind === "doc") fail(415, "Old .doc files can't be read. Upload your CV as PDF or .docx");
  if (!kind) fail(415, "Your CV must be a PDF or .docx file");

  let text = "";
  try {
    if (kind === "pdf") {
      const pdf = await getDocumentProxy(bytes);
      ({ text } = await extractText(pdf, { mergePages: true }));
    } else {
      ({ value: text } = await mammoth.extractRawText({ buffer: Buffer.from(bytes) }));
    }
  } catch (err) {
    console.error("cv text extraction failed:", err.message);
    fail(422, "Couldn't read the text in your CV. Try a different PDF or .docx");
  }

  text = String(text ?? "").replace(/\s+/g, " ").trim();
  // A scanned CV is an image: no text to read, and no OCR here.
  if (text.length < 200) fail(422, "Your CV has almost no readable text (is it a scan?). Upload a PDF made from a document");
  return text;
};
