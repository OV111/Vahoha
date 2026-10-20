/**
 * Capstone brief — frontend-dev track (fullstack), v1.
 *
 * Drafted by Claude, 2026-10-21; NOT yet reviewed by a human.
 * The seeder refuses to publish a brief whose `reviewed` flag is false.
 *
 * Shape notes:
 * - requirements[].check is for the stage-2 automated checks. `file` is a glob
 *   matched against the repo tree at the pinned commit. Requirements without a
 *   check are judged only by the AI rubric review.
 * - rubric[].weight values sum to 100. rubric[].layerId maps a weak criterion
 *   back to the roadmap layer that teaches it, for weak-spot tracking.
 * - Bump `version` for any change that affects grading; never edit a
 *   published version in place (attempts point at the exact brief document).
 */

import { DEFAULT_PASS_THRESHOLDS } from "../../../modules/capstone/lib/constants.js";
import { CHECKS, COMMON_RULES } from "../shared.js";

export default {
  trackId: "frontend-dev",
  categoryId: "fullstack",
  slug: "frontend-dev-support-desk-ui",
  version: 1,
  status: "draft",
  reviewed: false,
  title: "Accessible Support Desk Frontend",
  summary:
    "Build the frontend of a support-ticket desk as a single-page app in React and TypeScript: a filterable ticket list, " +
    "a ticket detail view with a comment thread, and a validated create/edit form. Data comes from a mocked REST API " +
    "(MSW), so no backend is needed. The focus is production-grade frontend craft: typed data fetching, accessible " +
    "keyboard-first UI, a themeable design system, measured performance, and a layered test suite.",
  stack: [
    "React 19",
    "TypeScript",
    "Vite",
    "React Router",
    "TanStack Query",
    "React Hook Form + Zod",
    "Tailwind CSS",
    "Vitest + Testing Library",
    "Playwright",
    "MSW",
  ],

  requirements: [
    {
      id: "typed-api",
      text: "Define Zod schemas for every API response and infer the TypeScript types from them; responses are validated at the network boundary, not cast.",
    },
    {
      id: "routing",
      text: "Use nested routes for list and detail views, keep filters, sort and page in the URL search params, and lazy-load the detail and edit pages.",
    },
    {
      id: "server-state",
      text: "Fetch tickets with TanStack Query, including loading, empty and error states, plus an optimistic status change that rolls back when the mocked request fails.",
    },
    {
      id: "forms",
      text: "The create/edit ticket form uses React Hook Form with a Zod resolver and shows field-level error messages linked to inputs with aria-describedby.",
    },
    {
      id: "custom-hooks",
      text: "Extract at least two reusable custom hooks (for example useDebouncedValue and useUrlFilters) and use no effect where derived state would do.",
    },
    {
      id: "responsive-layout",
      text: "The layout is responsive from 320px up using CSS grid or flexbox and container queries; no horizontal scrolling at any width.",
    },
    {
      id: "design-tokens",
      text: "Colors, spacing and typography come from design tokens (CSS custom properties or Tailwind theme) and the app supports light and dark mode via prefers-color-scheme.",
    },
    {
      id: "a11y-keyboard",
      text: "Every feature works with the keyboard alone: visible focus, a skip link, and a modal dialog that traps focus and returns it to its trigger on close.",
    },
    {
      id: "a11y-semantics",
      text: "Use semantic landmarks and headings, and announce async results (for example 'Ticket saved') to screen readers through a live region.",
    },
    {
      id: "a11y-automated",
      text: "Automated accessibility checks (axe) run in the test suite and report zero serious or critical violations on the main pages.",
    },
    {
      id: "performance",
      text: "Code-split by route, lazy-load images with explicit dimensions to avoid layout shift, and record a Lighthouse run in the README with LCP, INP and CLS numbers and one change you made because of it.",
    },
    {
      id: "msw-mocks",
      text: "A mocked API built with MSW serves the app in development and in tests, with handlers for success, empty, validation-error and 500 cases.",
    },
    {
      id: "component-tests",
      text: "Component and hook tests with Vitest and Testing Library query by role and label, and cover the form validation and the optimistic rollback.",
      check: CHECKS.jsTests,
    },
    {
      id: "e2e-test",
      text: "A Playwright end-to-end test covers creating a ticket and changing its status, running against the MSW-backed dev build.",
      check: {
        type: "file",
        glob: "{playwright.config.*,e2e/**/*.spec.*,tests/**/*.spec.*}",
      },
    },
    {
      id: "vite-config",
      text: "Vite project with strict TypeScript settings (strict: true) and environment variables read through import.meta.env with a documented .env.example.",
      check: { type: "file", glob: "{vite.config.*,tsconfig.json}" },
    },
    {
      id: "security-basics",
      text: "No dangerouslySetInnerHTML with user content; user-supplied comment text is rendered as plain text, and the README states where an auth token would be stored and why.",
    },
    {
      id: "readme",
      text: "README documents how to run the app, the tests and the Lighthouse audit, with screenshots of light and dark mode.",
      check: CHECKS.readme,
    },
    {
      id: "ci",
      text: "CI workflow runs lint, type-check, unit tests and the production build on every push.",
      check: CHECKS.ci,
    },
  ],

  rubric: [
    {
      id: "typescript-data",
      name: "TypeScript & Typed Data",
      weight: 10,
      layerId: "frontend-dev-6",
      description:
        "Schema-inferred types, discriminated unions for request state, no `any` casts of API data.",
    },
    {
      id: "react-state",
      name: "React Components & State",
      weight: 15,
      layerId: "frontend-dev-8",
      description:
        "Clean component boundaries, correct effects and cleanup, useful custom hooks, no state that should be derived.",
    },
    {
      id: "routing-data-forms",
      name: "Routing, Forms & Server State",
      weight: 15,
      layerId: "frontend-dev-9",
      description:
        "URL-driven state, TanStack Query usage with optimistic updates, schema-validated forms.",
    },
    {
      id: "styling-layout",
      name: "Layout & Design System",
      weight: 10,
      layerId: "frontend-dev-10",
      description:
        "Responsive layout, tokens, reusable styled primitives and working dark mode.",
    },
    {
      id: "accessibility",
      name: "Accessibility",
      weight: 20,
      layerId: "frontend-dev-11",
      description:
        "Keyboard support, focus management, semantic structure, live regions and clean axe results.",
    },
    {
      id: "performance",
      name: "Performance",
      weight: 10,
      layerId: "frontend-dev-13",
      description:
        "Route splitting, image handling and a measured Core Web Vitals improvement.",
    },
    {
      id: "testing",
      name: "Testing",
      weight: 15,
      layerId: "frontend-dev-14",
      description:
        "Role-based component tests, MSW-backed network tests and a working end-to-end test.",
    },
    {
      id: "tooling-security",
      name: "Build Tooling & Security",
      weight: 5,
      layerId: "frontend-dev-15",
      description:
        "Vite config, env handling, CI, and safe rendering of user-provided content.",
    },
  ],

  twistPool: [
    {
      id: "virtualized-list",
      text: "Render a 10,000-ticket list with windowing (virtualization) and keep scrolling smooth; show before and after numbers.",
    },
    {
      id: "offline-queue",
      text: "Make status changes work offline: queue them in IndexedDB and replay them in order when the connection returns, with a visible sync indicator.",
    },
    {
      id: "i18n-rtl",
      text: "Add a second language and a right-to-left layout using logical CSS properties, with the locale kept in the URL.",
    },
    {
      id: "ssr-migration",
      text: "Port the list and detail routes to Next.js App Router with server components and document what moved to the server and why.",
    },
  ],

  rules: COMMON_RULES,

  passThresholds: DEFAULT_PASS_THRESHOLDS,
};
