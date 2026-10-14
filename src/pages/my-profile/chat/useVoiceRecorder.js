import { useCallback, useEffect, useRef, useState } from "react";

export const formatClock = (totalSeconds) => {
  const s = Math.max(0, Math.round(totalSeconds));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};

export const MAX_VOICE_SECONDS = 120;
const MIN_VOICE_MS = 700; // shorter than this is an accidental tap, not a message

// Safari records MP4/AAC, Chrome and Firefox record WebM/Opus: ask the browser
// which one it can do instead of assuming.
const pickMimeType = () =>
  ["audio/webm;codecs=opus", "audio/webm", "audio/mp4", "audio/ogg;codecs=opus"].find(
    (type) => window.MediaRecorder?.isTypeSupported?.(type),
  ) ?? "";

/**
 * Microphone recording with MediaRecorder.
 *   start()  asks for the mic and begins recording (rejects if denied)
 *   stop()   resolves { blob, durationMs }, or null if too short
 *   cancel() throws the recording away
 * `seconds` ticks while recording; it auto-stops at MAX_VOICE_SECONDS.
 */
export default function useVoiceRecorder({ onAutoStop } = {}) {
  const [isRecording, setIsRecording] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const startedAtRef = useRef(0);
  const timerRef = useRef(null);
  const onAutoStopRef = useRef(onAutoStop);
  useEffect(() => {
    onAutoStopRef.current = onAutoStop;
  }, [onAutoStop]);

  const release = useCallback(() => {
    clearInterval(timerRef.current);
    // Stopping the tracks is what turns the browser's "recording" indicator off.
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    recorderRef.current = null;
    setIsRecording(false);
    setSeconds(0);
  }, []);

  const finish = useCallback(
    (discard) =>
      new Promise((resolve) => {
        const recorder = recorderRef.current;
        if (!recorder || recorder.state === "inactive") {
          release();
          return resolve(null);
        }
        recorder.onstop = () => {
          const durationMs = Date.now() - startedAtRef.current;
          const blob = new Blob(chunksRef.current, { type: recorder.mimeType || "audio/webm" });
          chunksRef.current = [];
          release();
          resolve(discard || durationMs < MIN_VOICE_MS ? null : { blob, durationMs });
        };
        recorder.stop();
      }),
    [release],
  );

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.MediaRecorder) {
      throw new Error("Voice messages aren't supported in this browser.");
    }
    let stream;
    try {
      stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    } catch {
      throw new Error("Microphone access was blocked. Allow it in your browser settings.");
    }
    const mimeType = pickMimeType();
    const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
    chunksRef.current = [];
    recorder.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
    recorder.start();
    streamRef.current = stream;
    recorderRef.current = recorder;
    startedAtRef.current = Date.now();
    setIsRecording(true);
    timerRef.current = setInterval(() => {
      const elapsed = Math.floor((Date.now() - startedAtRef.current) / 1000);
      setSeconds(elapsed);
      if (elapsed >= MAX_VOICE_SECONDS) finish(false).then((r) => r && onAutoStopRef.current?.(r));
    }, 250);
  }, [finish]);

  // Leaving the chat mid-recording must free the microphone.
  useEffect(() => () => finish(true), [finish]);

  return {
    isRecording,
    seconds,
    start,
    stop: () => finish(false),
    cancel: () => finish(true),
  };
}
