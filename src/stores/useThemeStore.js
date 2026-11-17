import { create } from "zustand";

const STORAGE_KEY = "theme";
const DEFAULT_THEME = "dark";

const readTheme = () => {
  try {
    return localStorage.getItem(STORAGE_KEY) === "light" ? "light" : DEFAULT_THEME;
  } catch {
    return DEFAULT_THEME;
  }
};

const applyTheme = (theme) => {
  document.documentElement.classList.toggle("dark", theme === "dark");
  try {
    localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Storage can be blocked in private mode.
  }
};

const useThemeStore = create((set, get) => ({
  theme: typeof window === "undefined" ? DEFAULT_THEME : readTheme(),

  setTheme: (theme) => {
    applyTheme(theme);
    set({ theme });
  },

  toggleTheme: () => get().setTheme(get().theme === "dark" ? "light" : "dark"),
}));

export default useThemeStore;
