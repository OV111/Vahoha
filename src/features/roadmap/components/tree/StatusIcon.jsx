import { STATUS_META } from "./statusMeta";

// Read-only status indicator. The system records progress itself (opening a
// lesson, finishing it, passing the layer test), so there is nothing to click.
// The label is spoken by screen readers; the icon shape tells sighted users,
// so status never depends on color alone.
//
// Only finished work gets a visible mark (a ✓). Untouched and in-progress
// lessons show none, which keeps the map calm; their status is still in
// the accessible label, and the layer card's Continue button leads to the
// lesson in progress.
const StatusIcon = ({ status }) => {
  const meta = STATUS_META[status] ?? STATUS_META.not_started;
  if (status !== "done") return <span className="sr-only">{meta.label}</span>;
  return (
    <span className={`flex size-6 shrink-0 items-center justify-center ${meta.icon}`}>
      <meta.Icon size={16} strokeWidth={2.25} aria-hidden="true" />
      <span className="sr-only">{meta.label}</span>
    </span>
  );
};

export default StatusIcon;
