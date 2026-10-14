import { Toaster } from "sonner";
import useThemeStore from "@/stores/useThemeStore";

/**
 * The app's toast host (Sonner). Mounted once in App.jsx: pages just call
 * `toast.success(...)` / `toast.error(...)` from "sonner"; a second Toaster
 * anywhere would render every toast twice.
 *
 * Sonner reads its colours from CSS variables, so the look is set here in
 * one place and follows the site theme: near-black surface with a hairline
 * border in dark mode, the purple accent for the neutral icon and actions.
 * Bottom-right keeps the navbar clear; on phones Sonner switches to a
 * full-width bar at the bottom on its own.
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
      style={
        isDark
          ? {
              "--normal-bg": "#0d0d0d",
              "--normal-text": "#e5e5e5",
              "--normal-border": "#262626",
              "--border-radius": "10px",
            }
          : {
              "--normal-bg": "#ffffff",
              "--normal-text": "#18181b",
              "--normal-border": "#e4e4e7",
              "--border-radius": "10px",
            }
      }
      toastOptions={{
        classNames: {
          toast: "!text-[13px] !shadow-lg !shadow-black/30",
          title: "!font-medium",
        },
      }}
    />
  );
}
