import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";
import useThemeStore from "@/stores/useThemeStore";

const LoadingSuspense = ({ fill = false, size = 44 }) => {
  const theme = useThemeStore((s) => s.theme);
  const isDark = theme !== "light";

  return (
    <div
      className={`flex items-center justify-center ${
        fill ? "h-full w-full" : `min-h-screen ${isDark ? "bg-black" : "bg-zinc-100"}`
      }`}
      role="status"
      aria-label="Loading"
    >
      <TailChase size={String(size)}speed="1.75" color="#9333ea" />
    </div>
  );
};

export default LoadingSuspense;
