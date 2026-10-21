import { FileText, Download } from "lucide-react";

const formatBytes = (bytes) => {
  if (!bytes && bytes !== 0) return "";
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${Math.round(bytes / 1024)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

// Photo bubble: width/height from Cloudinary reserve the space, so the chat
// doesn't jump when the image finishes loading. Click opens the original.
export function ImageMessage({ image }) {
  const ratio = image.width && image.height ? `${image.width} / ${image.height}` : undefined;
  return (
    <a href={image.url} target="_blank" rel="noopener noreferrer" aria-label="Open photo">
      <img
        src={image.url}
        alt="Photo message"
        loading="lazy"
        draggable={false}
        style={{ aspectRatio: ratio }}
        className="max-h-72 w-full max-w-60 rounded-[20px] object-cover"
      />
    </a>
  );
}

// File bubble: icon, name, size and a download/open link.
export function FileMessage({ file, isMine }) {
  return (
    <a
      href={file.url}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`Open ${file.name}`}
      className="flex w-56 max-w-full items-center gap-2"
    >
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
          isMine ? "bg-white text-fuchsia-600" : "bg-fuchsia-600 text-white"
        }`}
      >
        <FileText size={18} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block truncate text-sm">{file.name}</span>
        <span className="block text-[11px] opacity-70">{formatBytes(file.size)}</span>
      </span>
      <Download size={16} className="shrink-0 opacity-70" />
    </a>
  );
}
