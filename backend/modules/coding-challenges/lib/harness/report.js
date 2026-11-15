// Marks the harness's report in stdout. Every harness swallows what the
// learner prints, and the LAST marker wins, so output written around that
// cannot replace the report.
export const REPORT_MARKER = "__CASE_REPORT__";
