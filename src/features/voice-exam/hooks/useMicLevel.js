import { useCallback, useEffect, useRef, useState } from "react";

const BARS = 32;
// Above this level for a few frames counts as "we hear you"; room noise stays below it.
const SPEECH_LEVEL = 0.12;
const HEARD_FRAMES = 6;

/**
 * Live microphone check: a rolling history of input levels (0..1) for a meter,
 * and `heard` once real sound has come in. Releases the mic on stop or unmount.
 */
export const useMicLevel = () => {
  const [status, setStatus] = useState("idle"); // idle | listening | denied | unsupported
  const [levels, setLevels] = useState(() => Array(BARS).fill(0));
  const [heard, setHeard] = useState(false);
  const cleanupRef = useRef(null);

  const stop = useCallback(() => {
    cleanupRef.current?.();
    cleanupRef.current = null;
  }, []);

  const start = useCallback(async () => {
    if (!navigator.mediaDevices?.getUserMedia || !window.AudioContext) {
      setStatus("unsupported");
      return;
    }
    stop();
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const ctx = new AudioContext();
      const analyser = ctx.createAnalyser();
      analyser.fftSize = 512;
      ctx.createMediaStreamSource(stream).connect(analyser);
      const data = new Uint8Array(analyser.fftSize);
      let loud = 0;
      let frame;

      const tick = () => {
        analyser.getByteTimeDomainData(data);
        let sum = 0;
        for (const v of data) sum += ((v - 128) / 128) ** 2;
        // RMS is small for speech; scale it so a normal voice fills most of the meter.
        const level = Math.min(1, Math.sqrt(sum / data.length) * 4);
        // Newest level enters on the left, so the wave travels left to right.
        setLevels((prev) => [level, ...prev.slice(0, -1)]);
        loud = level > SPEECH_LEVEL ? loud + 1 : 0;
        if (loud >= HEARD_FRAMES) setHeard(true);
        frame = requestAnimationFrame(tick);
      };
      frame = requestAnimationFrame(tick);

      cleanupRef.current = () => {
        cancelAnimationFrame(frame);
        stream.getTracks().forEach((t) => t.stop());
        ctx.close().catch(() => {});
        setLevels(Array(BARS).fill(0));
        setStatus((s) => (s === "listening" ? "idle" : s));
      };
      setStatus("listening");
    } catch {
      setStatus("denied");
    }
  }, [stop]);

  useEffect(() => stop, [stop]);

  return { status, levels, heard, start, stop };
};
