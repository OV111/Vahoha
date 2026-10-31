import { TailChase } from "ldrs/react";
import "ldrs/react/TailChase.css";
import useThemeStore from "@/stores/useThemeStore";

/**
 * The app's loader. Full-page by default (the route Suspense fallback);
 * `fill` makes it fill its parent instead and leaves the background to the
 * parent, for panels and pages that already own their own surface. `size`
 * shrinks the circle for small panels and popovers.
 */
const LoadingSuspense = ({ fill = false, size = 44 }) => {
  const { theme } = useThemeStore();
  const isDark = theme !== "light";

  return (
    <div
      className={`flex items-center justify-center ${
        fill ? "h-full w-full" : `min-h-screen ${isDark ? "bg-black" : "bg-zinc-100"}`
      }`}
      role="status"
      aria-label="Loading"
    >
      <TailChase size={String(size)}speed="1.75" color={isDark ? "#a855f7" : "#7c3aed"} />
    </div>
  );
};

export default LoadingSuspense;
