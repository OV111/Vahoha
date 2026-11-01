/**
 * Build Teams rules. ONE source of truth: the backend enforces them
 * (backend/modules/teams/services/) and the admin page shows them
 * (src/features/teams/components/admin/).
 */
export const TEAM_STATUSES = ["forming", "active", "defending", "completed", "disbanded"];
export const MAX_TEAM_MEMBERS = 6;
