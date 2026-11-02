import { Bot } from "lucide-react";
import { AI_LEAD, TEAM_LEVEL_LABELS } from "../../../../constants/teams";

/**
 * Team members with their level and role. Levels come from the server
 * (evidence, or a confirmed CV marked "unverified"); nothing is picked here.
 */

const roleOf = (team, userId) => {
  if (team.leadId === userId) return "Lead";
  if (team.coLeadId === userId) return "Co-lead";
  return null;
};

export default function MemberList({ team, members }) {
  const aiLeads = team.leadId === AI_LEAD;

  return (
    <div className="flex flex-col gap-3">
      {aiLeads && (
        <p className="t-caption inline-flex items-center gap-1.5">
          <Bot size={14} aria-hidden="true" />
          Nobody on this team is lead-eligible yet, so the AI leads
          {team.coLeadId ? " with a co-lead from the team." : "."}
        </p>
      )}
      <ul className="flex flex-wrap gap-2">
        {members.map((m) => {
          const info = team.levels?.[m.userId];
          const role = roleOf(team, m.userId);
          return (
            <li key={m.userId} className="t-pill flex items-center gap-2">
              <span className="t-mono">
                @{m.githubLogin}
                {m.userId === team.viewerId ? " (you)" : ""}
              </span>
              {info && (
                <span
                  className="t-caption"
                  title={info.provisional ? "Estimated from the CV, not yet proven on the platform" : undefined}
                >
                  {TEAM_LEVEL_LABELS[info.level]}
                  {info.provisional ? " (unverified)" : ""}
                </span>
              )}
              {role && <span className="t-badge t-badge-green">{role}</span>}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
