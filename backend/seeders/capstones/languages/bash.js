/**
 * Capstone brief - bash track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "bash",
  categoryId: "languages",
  slug: "bash-backup-and-report-toolkit",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Backup Rotation and Log Report Toolkit",
  summary:
    "Build a set of robust Bash scripts: a backup tool with rotation and restore, and a log analyzer " +
    "that turns raw web server logs into a report using grep, sed and awk. The scripts are strict, linted with ShellCheck, " +
    "covered by tests, and run from cron and GitHub Actions.",
  stack: ["Bash 5", "GNU coreutils", "grep/sed/awk", "ShellCheck", "bats-core", "cron"],

  requirements: [
    {
      id: "scripts",
      text: "A bin/ or scripts/ folder holds the main entry scripts (backup, restore, report), each starting with a shebang and `set -euo pipefail`.",
      check: { type: "file", glob: "{bin,scripts}/*.sh" },
    },
    {
      id: "safe-expansion",
      text: "All variable expansions are quoted, arrays are used for argument lists, and filenames with spaces or newlines are handled (find -print0 with xargs -0, or read -d '').",
    },
    {
      id: "getopts",
      text: "Each script parses flags with getopts, prints usage with -h, and exits with distinct non-zero codes for bad input.",
    },
    {
      id: "backup-rotation",
      text: "The backup script creates timestamped tar.gz archives, keeps the newest N (configurable), and removes older ones safely.",
    },
    {
      id: "traps",
      text: "The scripts use trap on EXIT and ERR to clean up temp directories (mktemp -d) and release a lock file so two runs cannot overlap.",
    },
    {
      id: "log-report",
      text: "The report script uses grep, sed and awk to compute status code counts, top 10 paths and requests per hour from a sample access log, and outputs plain text and CSV.",
    },
    {
      id: "regex-parse",
      text: "At least one parse step uses Bash regex ([[ =~ ]] with BASH_REMATCH) and the README explains why.",
    },
    {
      id: "lib",
      text: "Shared functions (logging, die, require_cmd) live in a sourced lib file, with a logging function that writes to stderr.",
      check: { type: "file", glob: "**/lib*/*.sh" },
    },
    {
      id: "tests",
      text: "Tests with bats-core cover the main paths, including a failure case and a filename with spaces.",
      check: { type: "file", glob: "**/*.bats" },
    },
    {
      id: "lint",
      text: "shellcheck passes with no warnings on every script, enforced in CI.",
      check: CHECKS.ci,
    },
    {
      id: "readme",
      text: "README documents install, flags, and a cron entry or systemd timer for scheduled runs.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    { id: "robustness", name: "Strict Mode & Robustness", weight: 20, layerId: "bash-9", description: "Strict mode, traps, lock files and clear error paths make failures safe and visible." },
    { id: "quoting", name: "Quoting & Expansion", weight: 15, layerId: "bash-2", description: "Quoting and parameter expansion are correct, including awkward filenames." },
    { id: "text", name: "Text Processing", weight: 20, layerId: "bash-4", description: "grep, sed and awk are used effectively and the report numbers are correct." },
    { id: "files", name: "Files & Process Control", weight: 15, layerId: "bash-5", description: "find, tar, permissions and safe deletion are handled carefully." },
    { id: "structure", name: "Functions & Script Structure", weight: 15, layerId: "bash-3", description: "Code is split into small functions with a clear main and sourced library." },
    { id: "production", name: "Tooling & Automation", weight: 15, layerId: "bash-10", description: "getopts, ShellCheck, bats tests, cron and CI are set up and working." },
  ],

  twistPool: [
    { id: "incremental", text: "Make the backup incremental using tar --listed-incremental or rsync --link-dest hard-link snapshots." },
    { id: "encrypt", text: "Add optional archive encryption with age or gpg and a verified restore test." },
    { id: "notify", text: "Send a summary to a webhook (curl) on failure and on weekly success, with retry and timeout." },
    { id: "parallel", text: "Process multiple log files in parallel with background jobs and wait, collecting exit codes correctly." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
