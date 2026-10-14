import busboy from "busboy";
import { getAuthToken } from "../../users/index.js";
import { uploadToCloudinary } from "../../profile/services/profileService.js";
import { getSendableRoom, saveMessage, MAX_VOICE_MS } from "../services/chatService.js";

// Voice notes and photo/file attachments share one flow: auth -> room gate ->
// stream the file (size cap + byte sniffing + Cloudinary) -> save the message
// -> broadcast it. They go over HTTP rather than the websocket so they get the
// same limits and checks as profile uploads. The broadcast function is handed
// in on app.locals (see server.js) to avoid importing websocket code here.
const MAX_VOICE_BYTES = 5 * 1024 * 1024;
const MAX_ATTACHMENT_BYTES = 10 * 1024 * 1024;

// Browsers send the path-less name, but never trust it: strip any path, control
// characters and cap the length before it is stored and shown to other users.
const safeFileName = (name) =>
  String(name ?? "file")
    .split(/[\\/]/)
    .pop()
    // eslint-disable-next-line no-control-regex
    .replace(/[\u0000-\u001f<>:"|?*]/g, "")
    .trim()
    .slice(0, 120) || "file";

/**
 * @param field     multipart file field name
 * @param kind      kind passed to uploadToCloudinary ("audio" | "attachment")
 * @param maxBytes  per-file size cap
 * @param tooLargeMessage
 * @param build     ({ fields, url, meta, filename, size }) -> saveMessage payload, or null if invalid
 */
const handleMediaUpload = ({ field, kind, maxBytes, tooLargeMessage, build }) => async (req, res) => {
  const auth = getAuthToken(req.headers.authorization);
  if (!auth.ok) return res.status(auth.status).json({ message: auth.message });

  const { roomId } = req.params;
  const db = req.app.locals.db;
  let responded = false;
  const fail = (status, message) => {
    if (responded) return;
    responded = true;
    res.status(status).json({ message });
  };

  try {
    // Membership/block check BEFORE reading the body, so a non-member's bytes
    // are never uploaded.
    const gate = await getSendableRoom(db, { roomId, senderId: auth.userId });
    if (gate.error) return fail(403, gate.error);

    const bb = busboy({ headers: req.headers, limits: { fileSize: maxBytes, files: 1 } });
    const fields = {};
    const meta = {};
    let upload = null;
    let filename = "";
    let size = 0;
    let tooLarge = false;

    bb.on("field", (name, val) => {
      fields[name] = val;
    });
    bb.on("file", (name, file, info) => {
      if (name !== field || upload) return file.resume();
      filename = safeFileName(info.filename);
      file.on("limit", () => {
        tooLarge = true;
        fail(400, tooLargeMessage);
        file.resume();
      });
      upload = uploadToCloudinary(file, kind, undefined, meta);
      upload.catch(() => {}); // awaited in "finish"; avoids an unhandled rejection otherwise
      file.on("data", (chunk) => {
        size += chunk.length;
      });
    });
    bb.on("finish", async () => {
      if (tooLarge || responded) return;
      try {
        if (!upload) return fail(400, "No file received.");
        const url = await upload;
        const payload = build({ fields, url, meta, filename, size });
        if (!payload) return fail(400, "Invalid upload.");
        const saved = await saveMessage(db, { roomId, senderId: auth.userId, ...payload });
        if (saved.error) return fail(403, saved.error);
        req.app.locals.deliverChatMessage?.(roomId, auth.userId, saved);
        responded = true;
        res.status(201).json({ message: saved.message });
      } catch (err) {
        fail(err.status ?? 500, err.message || "Upload failed");
      }
    });
    req.pipe(bb);
  } catch (err) {
    fail(err.status ?? 500, err.message || "Server Error");
  }
};

// POST /my-profile/chats/rooms/:roomId/voice  (multipart: durationMs, audio)
export const sendVoiceMessage = handleMediaUpload({
  field: "audio",
  kind: "audio",
  maxBytes: MAX_VOICE_BYTES,
  tooLargeMessage: "Voice message is too large.",
  build: ({ fields, url }) => {
    const durationMs = Math.round(Number(fields.durationMs));
    if (!Number.isFinite(durationMs) || durationMs < 500 || durationMs > MAX_VOICE_MS + 1000) {
      return null;
    }
    return { voice: { url, durationMs } };
  },
});

// POST /my-profile/chats/rooms/:roomId/attachment  (multipart: file)
// A photo (JPEG/PNG/GIF/WebP) or a document (PDF/Word), told apart by its bytes.
export const sendAttachment = handleMediaUpload({
  field: "file",
  kind: "attachment",
  maxBytes: MAX_ATTACHMENT_BYTES,
  tooLargeMessage: "File is too large. Maximum size is 10 MB.",
  build: ({ url, meta, filename, size }) =>
    meta.kind === "image"
      ? { attachment: { kind: "image", url, width: meta.width, height: meta.height } }
      : { attachment: { kind: "file", url, name: filename, size } },
});
