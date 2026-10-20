/**
 * Capstone brief - groovy track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "groovy",
  categoryId: "languages",
  slug: "groovy-build-automation-kit",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Release Automation Kit with Gradle Plugin and Pipeline",
  summary:
    "Build a Groovy toolkit for release automation: a command line tool that reads a YAML or JSON service manifest and " +
    "generates a release report, a custom Gradle plugin that wires it into builds, and a Jenkinsfile with a shared library. " +
    "Closures, a small internal DSL and Spock specifications are the heart of the project.",
  stack: ["Groovy 4", "Gradle (Groovy DSL)", "Spock", "Jenkins Pipeline", "CodeNarc", "CliBuilder", "JsonSlurper"],

  requirements: [
    {
      id: "gradle-build",
      text: "The project builds with Gradle (build.gradle and settings.gradle), applies the groovy plugin and runs with `./gradlew build`.",
      check: { type: "file", glob: "build.gradle*" },
    },
    {
      id: "groovy-sources",
      text: "Source code is Groovy under src/main/groovy, organized into packages with small classes.",
      check: { type: "file", glob: "src/main/groovy/**/*.groovy" },
    },
    {
      id: "closures-dsl",
      text: "A small internal DSL (for example `release { service 'api'; checks { ... } }`) is built with closures, delegate and a documented delegation strategy.",
    },
    {
      id: "gdk-collections",
      text: "The report logic uses GDK collection methods (collect, findAll, groupBy, inject, sort with closures) and the spread operator instead of manual loops.",
    },
    {
      id: "json-xml",
      text: "The tool reads a manifest with JsonSlurper (or YAML) and writes the report as JSON with JsonBuilder and as XML or HTML with MarkupBuilder.",
    },
    {
      id: "cli",
      text: "The command line is parsed with CliBuilder (or picocli), with --help, --manifest and --format options and clear error exit codes.",
    },
    {
      id: "metaprogramming",
      text: "At least one AST transform (@Canonical, @Immutable or @ToString) is used for model classes, and one metaprogramming feature (a trait, or a category/extension method) is used and explained.",
    },
    {
      id: "gradle-plugin",
      text: "A custom Gradle plugin in the same repo (buildSrc or an included build) registers a task that runs the report, with typed inputs and outputs so up-to-date checks work.",
      check: { type: "file", glob: "{buildSrc,plugin,build-logic}/**/*.{groovy,gradle,kts}" },
    },
    {
      id: "jenkinsfile",
      text: "A declarative Jenkinsfile has build, test and report stages with a parallel stage and post conditions, and calls a shared library step from vars/.",
      check: { type: "file", glob: "{Jenkinsfile,vars/*.groovy}" },
    },
    {
      id: "spock-tests",
      text: "Spock specifications use given/when/then blocks and where: data tables, and also cover the Gradle plugin with Gradle TestKit.",
      check: { type: "file", glob: "src/test/groovy/**/*.groovy" },
    },
    {
      id: "static-compile",
      text: "Core classes use @CompileStatic where it is safe, and CodeNarc runs with no violations at the chosen ruleset.",
    },
    {
      id: "ci",
      text: "A GitHub Actions workflow runs ./gradlew check (tests and CodeNarc) on every push.",
      check: CHECKS.ci,
    },
    {
      id: "readme",
      text: "README documents the DSL with examples, the plugin usage and the pipeline.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    { id: "closures", name: "Closures & DSL Design", weight: 20, layerId: "groovy-2", description: "The DSL is readable and the delegate and owner behavior is correct and explained." },
    { id: "gdk", name: "Collections & GDK", weight: 10, layerId: "groovy-3", description: "GDK methods are used idiomatically and the report data is correct." },
    { id: "meta", name: "Metaprogramming", weight: 10, layerId: "groovy-4", description: "AST transforms and traits are used where they reduce boilerplate, not for show." },
    { id: "spock", name: "Spock Testing", weight: 15, layerId: "groovy-5", description: "Specs are readable, data-driven and cover edge cases and the plugin." },
    { id: "gradle", name: "Gradle Plugin & Build", weight: 20, layerId: "groovy-6", description: "The plugin and tasks have typed inputs and outputs, and the build is clean." },
    { id: "pipeline", name: "Jenkins Pipeline", weight: 10, layerId: "groovy-7", description: "The pipeline is declarative, uses a shared library and has sensible failure handling." },
    { id: "scripting", name: "Scripting & CLI", weight: 5, layerId: "groovy-8", description: "CliBuilder and JSON and XML builders are used correctly." },
    { id: "quality", name: "Static Compilation & Quality", weight: 10, layerId: "groovy-10", description: "@CompileStatic and CodeNarc are applied with sensible exceptions." },
  ],

  twistPool: [
    { id: "grab-script", text: "Add a standalone Groovy script that uses @Grab to pull dependencies and runs the report without a build." },
    { id: "extension-module", text: "Publish an extension module that adds helper methods to String and File, with tests." },
    { id: "docs", text: "Generate API docs with Groovydoc and publish them from CI as an artifact." },
    { id: "grails-view", text: "Add a tiny Grails or Micronaut Groovy app that serves the generated reports with a GORM-backed history." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
