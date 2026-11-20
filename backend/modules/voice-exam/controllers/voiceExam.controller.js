import { Buffer } from "buffer";
import busboy from "busboy";
import { dbOf, respond } from "../../../utils/respond.js";
import { HttpError, ValidationError } from "../../../utils/httpErrors.js";
import { audioFieldsSchema } from "../schemas/voiceExam.schemas.js";
import { abandonAttempt, getEligibility, getLiveAttempt, listVerifiedLayers, startAttempt, submitTurn } from "../services/voiceExamService.js";

const uid = (req) => req.user._id.toString();

// 5 minutes of Safari AAC is about 2.5 MB; this leaves room without inviting abuse.
const MAX_AUDIO_BYTES = 10 * 1024 * 1024;

// Each recording sits in RAM from upload until its answer is graded. This caps the worst case
// at ~120 MB, so a crowd of uploads gets "busy" instead of crashing the server for everyone.
const MAX_UPLOADS_IN_MEMORY = 12;
let uploadsInMemory = 0;

// Reads the recording into memory only; it is never written to disk or storage.
const readAudio = (req) =>
  new Promise((resolve, reject) => {
    let bb;
    try {
      bb = busboy({ headers: req.headers, limits: { fileSize: MAX_AUDIO_BYTES, files: 1, fields: 4 } });
    } catch {
      return reject(new ValidationError("Send the recording as a file upload."));
    }
    const fields = {};
    const chunks = [];
    let tooLarge = false;

    bb.on("field", (name, val) => {
      fields[name] = val;
    });
    bb.on("file", (name, file) => {
      if (name !== "audio") return file.resume();
      file.on("limit", () => {
        tooLarge = true;
        file.resume();
      });
      file.on("data", (chunk) => chunks.push(chunk));
    });
    bb.on("error", () => reject(new ValidationError("The recording didn't upload completely. Try again.")));
    bb.on("finish", () => {
      if (tooLarge) return reject(new ValidationError("That recording is too large."));
      if (!chunks.length) return reject(new ValidationError("No recording received."));
      resolve({ audio: Buffer.concat(chunks), fields });
    });
    req.pipe(bb);
  });

// Thin HTTP handlers: all logic lives in voiceExamService.
export const verified = respond((req) => listVerifiedLayers(dbOf(req), uid(req)));
export const eligibility = respond((req) => getEligibility(dbOf(req), uid(req), req.params.layerId));
export const live = respond((req) => getLiveAttempt(dbOf(req), uid(req), req.params.layerId));
export const start = respond(
  (req) => startAttempt(dbOf(req), uid(req), { layer: req.body.layerId, path: req.body.path }),
  { status: 201 },
);
export const turn = respond((req) => submitTurn(dbOf(req), uid(req), req.params.id, req.body));
export const audioTurn = respond(async (req) => {
  if (uploadsInMemory >= MAX_UPLOADS_IN_MEMORY) {
    // Drain the upload without keeping it, so the connection closes cleanly.
    req.resume();
    throw new HttpError(503, "Many answers are being checked right now. Try again in a few seconds.");
  }
  uploadsInMemory += 1;
  try {
    const { audio, fields } = await readAudio(req);
    const parsed = audioFieldsSchema.safeParse(fields);
    if (!parsed.success) throw new ValidationError(parsed.error.issues[0].message);
    return await submitTurn(dbOf(req), uid(req), req.params.id, { audio, turnKey: parsed.data.turnKey });
  } finally {
    uploadsInMemory -= 1;
  }
});
export const abandon = respond((req) => abandonAttempt(dbOf(req), uid(req), req.params.id));
