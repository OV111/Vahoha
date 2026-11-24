import { cn } from "@/lib/utils";

// The one loading style of the site; colours and pulse live in index.css
// (.bone, .bone-panel). A panel pulses as a whole, so bones inside it stay still.
// Small things (text, badges, avatars) are a Bone. Anything with an outline in the
// real UI (cards, buttons, inputs) is a panel with bones inside, not a filled block.
// Size them like the content they stand in for, so nothing jumps when it arrives.

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
