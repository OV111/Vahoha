import { useEffect, useState } from "react";

/** The id of the section being read: the last one whose top passed the upper part of the screen. */
export default function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0]);
  const key = ids.join("|");

  useEffect(() => {
    const list = key.split("|");
    let frame = 0;
    const update = () => {
      frame = 0;
      const line = window.innerHeight * 0.3;
      const passed = list.filter((id) => (document.getElementById(id)?.getBoundingClientRect().top ?? Infinity) <= line);
      setActive(passed.at(-1) ?? list[0]);
    };
    const onScroll = () => {
      frame ||= requestAnimationFrame(update);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(frame);
    };
  }, [key]);

  return active;
}
