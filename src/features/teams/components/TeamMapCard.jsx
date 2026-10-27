import { Link } from "react-router-dom";
import { Workflow } from "lucide-react";

/**
 * Link to the team's shared Project Map. Active members only: the server
 * refuses everyone else. Uses the scoped teams theme (the caller sits inside
 * `.teams-theme`).
 */
export default function TeamMapCard({ teamId }) {
  return (
    <section className="t-section">
      <h2 className="t-h2">Project map</h2>
      <p className="t-muted">Draw how your project works, then explain it. Every active member edits the same map.</p>
      <Link to={`/project-map/for/team/${teamId}`} className="t-btn t-btn-ghost mt-1 min-h-11 w-fit">
        <Workflow size={14} aria-hidden="true" />
        Open the team map
      </Link>
    </section>
  );
}
