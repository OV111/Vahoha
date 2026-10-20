/**
 * Capstone brief - perl track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "perl",
  categoryId: "languages",
  slug: "perl-link-checker-api",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Site Crawler and Link Report Service",
  summary:
    "Build a Perl application that crawls a website, extracts and validates links, stores results in SQLite through DBI, " +
    "and serves a JSON API with Mojolicious. It is packaged as a proper distribution " +
    "with Moo classes, regex-based parsing, Test2 tests and Perl::Critic clean code.",
  stack: ["Perl 5.36+", "Mojolicious", "DBI + DBD::SQLite", "Moo", "Test2::Suite", "Perl::Critic", "Carton"],

  requirements: [
    {
      id: "cpanfile",
      text: "Dependencies are declared in a cpanfile (with a cpanfile.snapshot from Carton) and the project installs with `carton install`.",
      check: { type: "file", glob: "cpanfile" },
    },
    {
      id: "strict-modern",
      text: "Every file uses strict, warnings and a modern feature bundle (use v5.36 or similar), with no global variables.",
    },
    {
      id: "modules",
      text: "Code lives in namespaced modules under lib/ (for example MyApp::Crawler, MyApp::Store, MyApp::Report) with clear exported interfaces.",
      check: { type: "file", glob: "lib/**/*.pm" },
    },
    {
      id: "oop",
      text: "Core classes are written with Moo (or Moose), using typed attributes, lazy builders and at least one role.",
    },
    {
      id: "regex",
      text: "Link extraction and URL normalization use named captures and the /x modifier, and the README explains where Mojo::DOM is used instead of a regex.",
    },
    {
      id: "refs",
      text: "Crawl results are stored in nested hash and array references, with a dispatch table of code refs choosing the handler per status class.",
    },
    {
      id: "dbi",
      text: "Results are saved to SQLite with DBI, using placeholders for all values, transactions, and RaiseError with a clear failure path.",
    },
    {
      id: "mojolicious",
      text: "A Mojolicious app exposes POST /crawls, GET /crawls/:id and GET /crawls/:id/broken as JSON, validates input, and returns proper HTTP status codes.",
    },
    {
      id: "file-io",
      text: "A command line script exports a report to CSV using three-argument open and lexical filehandles with error checks.",
    },
    {
      id: "tests",
      text: "Tests in t/ use Test2::V0 and cover the parser, the store (in-memory SQLite) and the API with Test::Mojo.",
      check: { type: "file", glob: "t/**/*.t" },
    },
    {
      id: "lint-ci",
      text: "Perl::Critic (severity 3 or stricter) and perltidy run clean, enforced in a GitHub Actions workflow along with prove.",
      check: CHECKS.ci,
    },
    {
      id: "readme",
      text: "README covers setup, API examples, architecture and how to run the tests.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    { id: "regex", name: "Regular Expressions", weight: 15, layerId: "perl-2", description: "Regexes are readable, anchored and correct, and the DOM parser is used where regex would be fragile." },
    { id: "refs", name: "References & Data Structures", weight: 15, layerId: "perl-3", description: "Nested data is built and dereferenced cleanly with no accidental copies." },
    { id: "oop", name: "Object-Oriented Design", weight: 15, layerId: "perl-5", description: "Moo classes and roles have clear responsibilities and typed attributes." },
    { id: "modules", name: "Modules & Dependencies", weight: 10, layerId: "perl-6", description: "The project is a proper distribution with a cpanfile, exports and a sensible lib/ layout." },
    { id: "db", name: "Database Access", weight: 15, layerId: "perl-7", description: "DBI is used with placeholders and transactions; there is no SQL injection risk." },
    { id: "web", name: "Web API", weight: 15, layerId: "perl-8", description: "Mojolicious routes validate input and return consistent JSON and status codes." },
    { id: "quality", name: "Testing & Modern Perl", weight: 15, layerId: "perl-10", description: "Tests are meaningful, Perl::Critic is clean and the code follows modern Perl practice." },
  ],

  twistPool: [
    { id: "async-crawl", text: "Crawl pages concurrently with Mojo::UserAgent and promises, with a configurable concurrency limit and per-host politeness delay." },
    { id: "robots", text: "Respect robots.txt and add a crawl depth limit and URL allowlist." },
    { id: "closure-accessors", text: "Add a small config object that generates its accessors with closures (no AUTOLOAD in the final code) and explain the choice." },
    { id: "devel-cover", text: "Measure coverage with Devel::Cover, publish the summary in CI and reach at least 80 percent." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
