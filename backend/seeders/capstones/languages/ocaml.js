/**
 * Capstone brief - ocaml track, v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "ocaml",
  categoryId: "languages",
  slug: "ocaml-expression-interpreter",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Typed Expression Language: Parser, Type Checker and Interpreter",
  summary:
    "Design and implement a small functional language in OCaml: a lexer and parser, a type checker with inference, an " +
    "evaluator and a REPL. Algebraic types model the syntax tree, modules and functors structure the code, and the " +
    "whole project is built with dune and tested with Alcotest and QCheck.",
  stack: ["OCaml 5", "dune", "opam", "Menhir + ocamllex (or Angstrom)", "Alcotest", "QCheck", "ocamlformat"],

  requirements: [
    {
      id: "dune-project",
      text: "The project has a dune-project, a library stanza, an executable stanza and an opam file, and builds with `dune build`.",
      check: { type: "file", glob: "dune-project" },
    },
    {
      id: "ast",
      text: "The syntax tree is a variant type with recursive cases (literals, variables, let, functions, application, if, binary operators) and every function over it uses exhaustive pattern matching.",
      check: { type: "file", glob: "{lib,src,bin}/**/*.ml" },
    },
    {
      id: "parser",
      text: "A lexer and parser (ocamllex with Menhir, or Angstrom) produce the tree and report syntax errors with line and column.",
    },
    {
      id: "interfaces",
      text: "Each major module (Lexer, Parser, Typecheck, Eval, Env) has a .mli interface file that hides internal details.",
      check: { type: "file", glob: "{lib,src}/**/*.mli" },
    },
    {
      id: "functor-env",
      text: "The environment is built with a functor over an ordered key module (Map.Make or a custom functor) and the choice is explained in the README.",
    },
    {
      id: "type-checker",
      text: "A type checker infers types (Hindley-Milner with let polymorphism, or a simply typed subset with annotations) and rejects ill-typed programs with clear messages.",
    },
    {
      id: "evaluator",
      text: "An evaluator handles closures, recursion and the standard operators, using immutable environments, and a bounded recursion depth error rather than a crash.",
    },
    {
      id: "error-handling",
      text: "Errors are modeled with Result (or a custom error variant) through the pipeline, with exceptions only at the outermost layer.",
    },
    {
      id: "higher-order",
      text: "Standard-library work (List.fold_left, List.map, Option, Result bind operators with let*) is used for transformations instead of manual recursion where appropriate.",
    },
    {
      id: "repl",
      text: "A REPL reads a line, evaluates it, keeps definitions between inputs and supports a :type command.",
    },
    {
      id: "tests",
      text: "Alcotest unit tests cover parsing, type errors and evaluation, and a QCheck property test checks that pretty-printing then parsing returns the same tree.",
      check: { type: "file", glob: "test/**/*.ml" },
    },
    {
      id: "format-ci",
      text: "ocamlformat is checked and a GitHub Actions workflow builds and runs `dune test` on every push using setup-ocaml.",
      check: CHECKS.ci,
    },
    {
      id: "readme",
      text: "README documents the grammar, the typing rules and example programs.",
      check: CHECKS.readme,
    },
  ],

  rubric: [
    { id: "adt", name: "Algebraic Types & Matching", weight: 20, layerId: "ocaml-2", description: "Syntax and values are modeled with variants and matching is exhaustive with no catch-all hiding errors." },
    { id: "modules", name: "Modules & Functors", weight: 15, layerId: "ocaml-3", description: "Interfaces are narrow and the functor use is justified and correct." },
    { id: "stdlib", name: "Functional Style", weight: 10, layerId: "ocaml-4", description: "Higher-order functions and bind operators are used cleanly." },
    { id: "state", name: "Controlled Mutation", weight: 5, layerId: "ocaml-5", description: "Mutable state is limited to the REPL and any caches, and is documented." },
    { id: "errors", name: "Error Handling", weight: 15, layerId: "ocaml-6", description: "Errors flow as values with helpful messages and no uncaught exceptions." },
    { id: "build", name: "Dune Build Structure", weight: 15, layerId: "ocaml-8", description: "Libraries, executables and tests are split sensibly with correct dependencies." },
    { id: "quality", name: "Testing & CI", weight: 20, layerId: "ocaml-10", description: "Alcotest and QCheck tests are meaningful and CI is green with formatting enforced." },
  ],

  twistPool: [
    { id: "lwt-repl", text: "Serve the interpreter over a TCP socket with Eio or Lwt so several clients can evaluate expressions concurrently." },
    { id: "ppx-deriving", text: "Use ppx_deriving (show, eq) or ppx_sexp_conv on the syntax tree and use it in tests and debug output." },
    { id: "optimizer", text: "Add a constant-folding and dead-branch optimization pass, with property tests that it never changes results." },
    { id: "pattern-lang", text: "Add pattern matching and algebraic data types to the language itself, with an exhaustiveness check." },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
