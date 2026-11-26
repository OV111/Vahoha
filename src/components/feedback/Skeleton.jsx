import { cn } from "@/lib/utils";

export function Bone({ as: Tag = "div", soft = false, className }) {
  return <Tag aria-hidden="true" className={cn("bone", soft && "bone-soft", className)} />;
}

/** A stack of text lines: the first reads as the title, the rest are dimmer. */
export function BoneLines({ widths, className }) {
  return (
    <div aria-hidden="true" className={cn("flex flex-col gap-2", className)}>
      {widths.map((width, i) => (
        <Bone key={i} soft={i > 0} className={cn(i === 0 ? "h-4" : "h-3", width)} />
      ))}
    </div>
  );
}

export function BonePanel({ className, children }) {
  return <div className={cn("bone-panel", className)}>{children}</div>;
}

/** A button or an input: its outline with one bar inside. */
export function BoneControl({ className, bar = "w-full" }) {
  return (
    <BonePanel className={cn("flex shrink-0 items-center rounded-lg px-3", className)}>
      <Bone className={cn("h-3", bar)} />
    </BonePanel>
  );
}

/** Tells screen readers what is loading and hides the shapes from them. */
export function SkeletonRegion({ label, className, children }) {
  return (
    <div role="status">
      <span className="sr-only">{label}</span>
      <div aria-hidden="true" className={className}>
        {children}
      </div>
    </div>
  );
}
