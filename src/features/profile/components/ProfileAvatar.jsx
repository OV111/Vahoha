import { useState } from "react";

const avatarSrc = (url) => url.replace("/upload/", "/upload/w_112,h_112,c_fill,f_auto,q_auto/");

/**
 * The round profile photo. Pulses while the profile or the photo is still
 * loading, then fades the photo in; with no photo it shows the initials.
 */
export default function ProfileAvatar({ url, firstName, lastName, loading = false }) {
  const [loadedSrc, setLoadedSrc] = useState(null);

  if (loading) return <div aria-hidden="true" className="h-full w-full animate-pulse bg-white/10" />;

  if (!url)
    return (
      <div className="flex h-full w-full items-center justify-center bg-purple-100 text-2xl font-bold text-purple-700 sm:text-3xl dark:bg-purple-700 dark:text-white">
        {firstName?.[0]?.toUpperCase()}
        {lastName?.[0]?.toUpperCase()}
      </div>
    );

  const src = avatarSrc(url);
  const loaded = loadedSrc === src;
  return (
    <div className="relative h-full w-full">
      {!loaded && <div aria-hidden="true" className="absolute inset-0 animate-pulse bg-white/10" />}
      <img
        src={src}
        alt="User"
        onLoad={() => setLoadedSrc(src)}
        className={`h-full w-full object-cover transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0"}`}
      />
    </div>
  );
}
