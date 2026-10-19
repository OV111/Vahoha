import { z } from "zod";

/**
 * Query contract for GET /api/coding-challenges (the catalog list).
 *
 * Every filter the catalog offers is applied server-side, so the client never
 * needs the whole collection. Values are closed enums where possible: they end
 * up in a Mongo query, and an enum can't smuggle an operator in.
 *
 * Multi-value filters (tags, status) travel as one comma-separated param,
 * because that is what URLSearchParams round-trips cleanly into a shareable URL.
 */

const slug = z.string().trim().max(60).regex(/^[a-z0-9-]+$/, "Invalid slug");

const csvOf = (item, max) =>
  z
    .string()
    .trim()
    .max(400)
    .transform((s) => s.split(",").map((v) => v.trim()).filter(Boolean))
    .pipe(z.array(item).max(max));

export const TIME_RANGE_KEYS = ["under15", "15to30", "30to60", "60plus"];
export const STATUS_KEYS = ["not-started", "in-progress", "completed"];

export const listQuerySchema = z.object({
  // Absent = the learner's own path (resolved server-side); "all" = every path.
  track: z.union([z.literal("all"), slug]).optional(),
  layer: z.enum(["1", "2", "3", "4+"]).optional(),
  type: z.enum(["code", "debug", "build", "design"]).optional(),
  difficulty: z.enum(["easy", "med", "hard"]).optional(),
  tags: csvOf(z.string().max(40), 10).optional(),
  time: z.enum(TIME_RANGE_KEYS).optional(),
  status: csvOf(z.enum(STATUS_KEYS), 3).optional(),
  recommended: z.enum(["true", "false"]).transform((v) => v === "true").optional(),
  q: z.string().trim().max(80).optional(),
  page: z.coerce.number().int().min(1).max(1000).default(1),
  limit: z.coerce.number().int().min(1).max(50).default(24),
});

/**
 * Hidden-test contracts, one per grading runtime (see lib/languages.js).
 *
 * The shape of `hiddenTests` depends on the challenge's `runtime`, so the
 * schema is chosen by it rather than trying to accept both shapes at once: a
 * harness test must never carry stdin, and a stdio test must never carry code
 * (that would be executed by the wrong path). `.strict()` rejects extras.
 */

const testName = z
  .string()
  .trim()
  .min(1)
  .max(80)
  .regex(/^[A-Za-z0-9_ ./()-]+$/, "Invalid test name");

const MAX_IO_CHARS = 100_000;

export const harnessTestSchema = z
  .object({
    name: testName,
    code: z.string().min(1).max(20_000),
  })
  .strict();

export const stdioTestSchema = z
  .object({
    name: testName,
    stdin: z.string().max(MAX_IO_CHARS),
    expectedStdout: z.string().max(MAX_IO_CHARS),
    timeLimitMs: z.number().int().min(100).max(10_000).optional(),
    memoryMb: z.number().int().min(16).max(512).optional(),
  })
  .strict();

const uniqueNames = (tests) => new Set(tests.map((t) => t.name)).size === tests.length;

export const hiddenTestsSchema = (runtime) =>
  z
    .array(runtime === "stdio" ? stdioTestSchema : harnessTestSchema)
    .min(1)
    .max(100)
    .refine(uniqueNames, "Test names must be unique");

/** Sample pairs shown to the learner (stdio only). Never the hidden set. */
export const sampleTestsSchema = z
  .array(z.object({ stdin: z.string().max(2_000), expectedStdout: z.string().max(2_000) }).strict())
  .max(3);
