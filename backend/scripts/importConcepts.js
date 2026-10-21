/**
 * Import distilled digest concepts for one book.
 *
 * Usage:
 *   node backend/scripts/importConcepts.js <file.json>                      dry run: validates and prints the plan
 *   node backend/scripts/importConcepts.js <file.json> --apply              writes concepts as reviewed: false
 *   node backend/scripts/importConcepts.js <file.json> --apply --reviewed   writes them as reviewed: true
 *
 * The file is checked against digestImportSchema (see library/schemas) before
 * anything else runs. The same import is available on the admin library page
 * (/admin/library); both use library/services/importService.js.
 */

import fs from "node:fs";
import process from "process";
import dotenv from "dotenv";
dotenv.config({ path: "./backend/.env" });

import connectDB from "../config/db.js";
import { digestImportSchema } from "../modules/library/schemas/digest.schemas.js";
import { applyDigestImport, planDigestImport } from "../modules/library/services/importService.js";

const [file, ...flags] = process.argv.slice(2);
const apply = flags.includes("--apply");
const reviewed = flags.includes("--reviewed");

if (!file) {
  console.error("Usage: node backend/scripts/importConcepts.js <file.json> [--apply] [--reviewed]");
  process.exit(1);
}

const parsed = digestImportSchema.safeParse(JSON.parse(fs.readFileSync(file, "utf8")));
if (!parsed.success) {
  for (const issue of parsed.error.issues) {
    console.error(`${issue.path.join(".") || "(file)"}: ${issue.message}`);
  }
  process.exit(1);
}

const run = async () => {
  const db = await connectDB();
  const plan = await planDigestImport(db, parsed.data);

  console.log(`Book: ${parsed.data.source.title} (${plan.sourceExists ? "exists" : "will be created"})`);
  console.log(`Concepts: ${plan.total} (${plan.kept} kept, ${plan.total - plan.kept} dropped)`);
  console.log(`  new: ${plan.newCount}, overwritten: ${plan.overwrittenCount}`);
  console.log(`Will be written as reviewed: ${reviewed}`);

  if (!apply) {
    console.log("\nDry run. Add --apply to write.");
    process.exit(0);
  }

  const result = await applyDigestImport(db, parsed.data, { reviewed });
  console.log(`\nWritten: ${result.inserted} new, ${result.changed} changed.`);
  process.exit(0);
};

run().catch((err) => {
  console.error("Import failed:", err);
  process.exit(1);
});
