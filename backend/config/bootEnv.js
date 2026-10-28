// Loads the .env files and validates the configuration. server.js imports this
// FIRST, for its side effect: ES modules evaluate every import before the importer's
// own code, so a check written in server.js would run after config/redis.js had
// already opened its connection. Here it runs before any of them.
//
// Paths come from this file's location, not from the working directory, so the
// server starts the same way from any folder. Same two files, same order as before:
// .env.local first, then .env (dotenv never overwrites a variable that is already set).
import dotenv from "dotenv";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { assertEnv, EnvError, formatConfigReport } from "./env.js";

const backendDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
dotenv.config({ path: path.join(backendDir, ".env.local") });
dotenv.config({ path: path.join(backendDir, ".env") });

try {
  console.log(formatConfigReport(assertEnv()));
} catch (err) {
  if (!(err instanceof EnvError)) throw err;
  console.error(`${err.message}\nFix the variables above (see .env.example) and start again.`);
  process.exit(1);
}
