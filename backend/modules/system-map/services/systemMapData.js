/** The module's collections. Indexes are created at startup (see app wiring for system_maps). */
export const MAPS = "system_maps";
export const COMMENTS = "system_map_comments";
export const CHECKS = "system_map_checks";
// Earlier states of a map, kept as checkpoints (versionService.js).
export const VERSIONS = "system_map_versions";
// What each save touched, so a save from an older revision can be merged (systemMapService.js). Expires after a week.
export const EDITS = "system_map_edits";
