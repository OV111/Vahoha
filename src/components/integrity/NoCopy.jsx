const block = (e) => e.preventDefault();

/**
 * Wraps assessment text (a test question, a defense question, a challenge
 * statement) so it cannot be selected, copied, dragged out or right-clicked.
 *
 * This stops the easy path, copy and paste into an AI chat. It cannot stop a
 * screenshot or a phone camera, and nothing in a browser can.
 */
export default function NoCopy({ className = "", ...rest }) {
  return (
    <div
      className={`select-none [-webkit-touch-callout:none] ${className}`}
      onCopy={block}
      onCut={block}
      onContextMenu={block}
      onDragStart={block}
      {...rest}
    />
  );
}
