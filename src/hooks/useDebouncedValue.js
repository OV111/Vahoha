import { useEffect, useState } from "react";

/**
 * `value`, once it has stopped changing for `delay` ms. For search-as-you-type:
 * one request after the user pauses, not one per keystroke.
 *
 * @template T
 * @param {T} value
 * @param {number} [delay=300]
 * @returns {T}
 */
export default function useDebouncedValue(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);

  useEffect(() => {
    const id = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(id);
  }, [value, delay]);

  return debounced;
}
