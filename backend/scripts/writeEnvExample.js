// Writes backend/.env.example and the frontend .env.example from the specs in
// backend/config/env.js, so the templates can't drift from what is checked.
// Run after adding or changing a variable:
//   node backend/scripts/writeEnvExample.js
import { writeFileSync } from "node:fs";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import { ENV_SPECS, FRONTEND_ENV_SPECS } from "../config/env.js";

const backendDir = path.join(path.dirname(fileURLToPath(import.meta.url)), "..");
const rootDir = path.join(backendDir, "..");

const REQUIREMENT = {
  required: "required",
  production: "required in production",
  optional: "optional",
};

const write = (file, lines, count) => {
  writeFileSync(file, `${lines.join("\n")}\n`);
  console.log(`Wrote ${path.relative(process.cwd(), file)} (${count} variables)`);
};

const backend = [
  "# Backend environment. Copy to backend/.env and fill in; never commit backend/.env.",
  "# Generated from backend/config/env.js by backend/scripts/writeEnvExample.js: edit there.",
  "# Optional variables are commented out; uncomment one to set it.",
];
let group = null;
for (const spec of ENV_SPECS) {
  if (spec.group !== group) {
    group = spec.group;
    backend.push("", `# ── ${group} ${"─".repeat(Math.max(0, 70 - group.length))}`);
  }
  backend.push(`# ${spec.description} (${REQUIREMENT[spec.requirement]}; if unset: ${spec.effect})`);
  backend.push(`${spec.requirement === "optional" ? "# " : ""}${spec.name}=${spec.example}`);
}
write(path.join(backendDir, ".env.example"), backend, ENV_SPECS.length);

const frontend = [
  "# Frontend (Vite) environment. Generated from backend/config/env.js by",
  "# backend/scripts/writeEnvExample.js: edit there.",
  "#",
  "# Vite reads .env.development for `npm run dev`, .env.production for `npm run build`",
  "# and .env.staging for `npm run build:staging`. Copy this file to the one you need.",
  "# All of them are git-ignored. The deployed site gets its values from the Vercel",
  "# project settings, not from these files.",
  "#",
  "# Every VITE_ value is copied into the public JavaScript bundle: never put a",
  "# secret here. See docs/engineering/FRONTEND_ENV.md.",
  "",
];
for (const spec of FRONTEND_ENV_SPECS) {
  frontend.push(`# ${spec.description}`, `${spec.name}=${spec.example}`);
}
write(path.join(rootDir, ".env.example"), frontend, FRONTEND_ENV_SPECS.length);
