import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { formatClock } from "./useVoiceRecorder";

// Only one voice note plays at a time, like every messenger.
let currentlyPlaying = null;

// Play/pause + seekable progress for a voice message. `durationMs` comes from
// the server, because MediaRecorder WebM files report Infinity as their length.
export default function VoiceBubble({ url, durationMs, isMine }) {
  const audioRef = useRef(null);
  const [playing, setPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0..1
  const total = durationMs / 1000;

  useEffect(() => {
    const audio = audioRef.current;
    return () => {
      audio?.pause();
      if (currentlyPlaying === audio) currentlyPlaying = null;
    };
  }, []);

  const toggle = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (playing) return audio.pause();
    if (currentlyPlaying && currentlyPlaying !== audio) currentlyPlaying.pause();
    currentlyPlaying = audio;
    audio.play().catch(() => setPlaying(false));
  };

  const seek = (e) => {
    const audio = audioRef.current;
    if (!audio) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const ratio = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width));
    audio.currentTime = ratio * total;
    setProgress(ratio);
  };

  return (
    <div className="flex w-52 max-w-full items-center gap-2">
      <audio
        ref={audioRef}
        src={url}
        preload="metadata"
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
        onEnded={() => {
          setPlaying(false);
          setProgress(0);
        }}
        onTimeUpdate={(e) => setProgress(Math.min(1, e.currentTarget.currentTime / total))}
      />
      <button
        type="button"
        onClick={toggle}
        aria-label={playing ? "Pause voice message" : "Play voice message"}
        className={`relative flex h-8 w-8 shrink-0 cursor-pointer items-center justify-center rounded-full after:absolute after:-inset-1.5 ${
          isMine ? "bg-white text-fuchsia-600" : "bg-fuchsia-600 text-white"
        }`}
      >
        {playing ? <Pause size={14} fill="currentColor" /> : <Play size={14} fill="currentColor" />}
      </button>
      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <div
          role="slider"
          aria-label="Seek voice message"
          aria-valuemin={0}
          aria-valuemax={Math.round(total)}
          aria-valuenow={Math.round(progress * total)}
          onClick={seek}
          className="relative h-1.5 w-full cursor-pointer rounded-full bg-white/25 after:absolute after:-inset-y-2.5 after:inset-x-0"
        >
          <div
            className={`h-full rounded-full ${isMine ? "bg-white" : "bg-fuchsia-500"}`}
            style={{ width: `${progress * 100}%` }}
          />
        </div>
        <span className="text-[11px] tabular-nums opacity-80">
          {formatClock(playing || progress > 0 ? progress * total : total)}
        </span>
      </div>
    </div>
  );
}
