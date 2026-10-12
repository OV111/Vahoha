import { useEffect } from "react";

// --navbar-h drives every "sit right below the navbar" layout (the Arena's
// fixed panel, its mobile overlay, sticky toolbars). A one-shot read on
// mount goes stale the moment the navbar's real height changes — a
// dropdown opening, the mobile menu, a font swap — so keep it live instead.
export default function useNavbarHeightVar(navRef) {
  useEffect(() => {
    const el = navRef.current;
    if (!el) return;
    const setVar = () =>
      document.documentElement.style.setProperty("--navbar-h", `${el.offsetHeight}px`);
    setVar();
    const observer = new ResizeObserver(setVar);
    observer.observe(el);
    return () => observer.disconnect();
  }, [navRef]);
}
