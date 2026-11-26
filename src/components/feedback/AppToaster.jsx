import { Toaster } from "sonner";
import useThemeStore from "@/stores/useThemeStore";

// Sonner reads its colours from these CSS variables.
const DARK_STYLE = {
  "--normal-bg": "#0d0d0d",
  "--normal-text": "#e5e5e5",
  "--normal-border": "#262626",
  "--border-radius": "10px",
};
const LIGHT_STYLE = {
  "--normal-bg": "#ffffff",
  "--normal-text": "#18181b",
  "--normal-border": "#e4e4e7",
  "--border-radius": "10px",
};

const TOAST_OPTIONS = {
  classNames: {
    toast: "!text-[13px] !shadow-lg !shadow-black/30",
    title: "!font-medium",
  },
};

/**
 * The app's only toast host, mounted once in App.jsx. Pages call `toast.*`
 * from "sonner" directly; a second Toaster would render every toast twice.
 * Bottom-right keeps the navbar clear; on phones Sonner goes full-width.
 */
export default function AppToaster() {
  const isDark = useThemeStore((s) => s.theme) !== "light";

  return (
    <Toaster
      position="bottom-right"
      theme={isDark ? "dark" : "light"}
      closeButton
      gap={8}
      offset={{ bottom: "max(1rem, env(safe-area-inset-bottom))", right: "1rem" }}
      style={isDark ? DARK_STYLE : LIGHT_STYLE}
      toastOptions={TOAST_OPTIONS}
    />
  );
}
