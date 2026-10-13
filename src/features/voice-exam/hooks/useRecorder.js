import { useCallback, useEffect, useRef, useState } from "react";

// Spec section 10: allow-list audio/webm;codecs=opus, with audio/mp4 for Safari.
const pickMimeType = () => {
  if (typeof MediaRecorder === "undefined") return null;
  return (
    ["audio/webm;codecs=opus", "audio/mp4"].find((t) => MediaRecorder.isTypeSupported(t)) ?? ""
  );
};

/**
 * Records microphone audio with MediaRecorder and hands back one Blob when it stops.
 * Auto-stops at `maxSec`. Releases the microphone on stop and on unmount, so the
 * browser's "recording" indicator never stays on after the learner leaves.
 */
export const useRecorder = ({ maxSec, onStop }) => {
  const recorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const timerRef = useRef(null);
  const onStopRef = useRef(onStop);
  const [isRecording, setIsRecording] = useState(false);
  const [elapsedSec, setElapsedSec] = useState(0);
  const [error, setError] = useState(null);

  const isSupported = Boolean(navigator.mediaDevices?.getUserMedia) && pickMimeType() !== null;

  useEffect(() => {
    onStopRef.current = onStop;
  }, [onStop]);

  const release = useCallback(() => {
    clearInterval(timerRef.current);
    streamRef.current?.getTracks().forEach((track) => track.stop());
    streamRef.current = null;
  }, []);

  const stop = useCallback(() => {
    if (recorderRef.current?.state === "recording") recorderRef.current.stop();
  }, []);

  const start = useCallback(async () => {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      const mimeType = pickMimeType();
      const recorder = new MediaRecorder(stream, mimeType ? { mimeType } : undefined);
      chunksRef.current = [];

      recorder.ondataavailable = (e) => e.data.size > 0 && chunksRef.current.push(e.data);
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: recorder.mimeType });
        release();
        setIsRecording(false);
        onStopRef.current?.(blob);
      };

      recorderRef.current = recorder;
      recorder.start();
      setIsRecording(true);
      setElapsedSec(0);
      let elapsed = 0;
      timerRef.current = setInterval(() => {
        elapsed += 1;
        setElapsedSec(elapsed);
        if (elapsed >= maxSec) stop(); // side effect stays out of the state updater
      }, 1000);
    } catch (err) {
      release();
      setError(
        err.name === "NotAllowedError"
          ? "Microphone access was denied. Allow it in your browser settings, or type your answer."
          : err.name === "NotFoundError"
            ? "No microphone was found. You can type your answer instead."
            : "Could not start recording. You can type your answer instead.",
      );
    }
  }, [maxSec, release, stop]);

  useEffect(
    () => () => {
      release();
      if (recorderRef.current?.state === "recording") {
        recorderRef.current.onstop = null; // unmounting: drop the audio, don't submit it
        recorderRef.current.stop();
      }
    },
    [release],
  );

  return { isSupported, isRecording, elapsedSec, error, start, stop };
};
