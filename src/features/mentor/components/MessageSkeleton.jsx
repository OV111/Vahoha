/**
 * Placeholder shown while an existing session's history loads.
 *
 * Mirrors the real chat layout — right-aligned user bubbles, full-width agent
 * blocks — so the transcript doesn't visibly jump when content lands. It also
 * signals "a conversation is arriving", where an empty-state line would read as
 * "this chat is empty".
 *
 * motion-safe: people who ask their OS for less motion get still placeholders.
 */
const Line = ({ width }) => (
  <div className="h-3.5 rounded bg-white/8 motion-safe:animate-pulse" style={{ width }} />
);

const UserBubble = ({ width }) => (
  <div className="flex justify-end">
    <div className="rounded-2xl rounded-br-md px-4 py-3 bg-white/5" style={{ width }}>
      <div className="h-3.5 rounded bg-white/8 motion-safe:animate-pulse" />
    </div>
  </div>
);

const AgentBlock = ({ widths }) => (
  <div className="space-y-2">
    {widths.map((w, i) => (
      <Line key={i} width={w} />
    ))}
  </div>
);

export default function MessageSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-busy="true">
      <span className="sr-only">Loading conversation</span>
      <UserBubble width="45%" />
      <AgentBlock widths={["92%", "85%", "60%"]} />
      <UserBubble width="30%" />
      <AgentBlock widths={["88%", "70%"]} />
    </div>
  );
}
