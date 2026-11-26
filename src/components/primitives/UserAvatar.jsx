// A person's photo, or their initial on the same purple circle the chat list
// uses. One component so every list falls back the same way (no stock image).
// `size` is a Tailwind size class pair, e.g. "size-12".
export default function UserAvatar({ src, name = "", size = "size-8", className = "" }) {
  const base = `${size} shrink-0 rounded-full ${className}`;
  if (src) {
    return <img src={src} alt="" loading="lazy" className={`${base} bg-neutral-800 object-cover`} />;
  }
  return (
    <span
      aria-hidden="true"
      className={`${base} flex items-center justify-center bg-fuchsia-950/40 font-medium text-fuchsia-300`}
    >
      {name.trim()[0]?.toUpperCase()}
    </span>
  );
}
