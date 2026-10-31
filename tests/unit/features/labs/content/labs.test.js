import { describe, it, expect } from "vitest";
import { labSchema } from "@/features/labs/content/schema";
import { runTests } from "@/features/coding-challenges/lib/testRunnerCore";
import { LAB_MANIFEST, labKey } from "@/features/labs/content/manifest";
import { roomOfTrack } from "@/features/labs/rooms";

// Every lab file must be valid AND work: a broken lab can't ship.
//   fix/write: the starter fails its tests, the solution passes them.
//   review:    the AI's code passes its own tests but fails the hidden ones,
//              the reference proof test fails on the AI's code and passes on
//              the solution, and the solution passes everything.

// Same pattern as content/index.js, loaded eagerly here so every lab is checked.
const modules = Object.fromEntries(
  Object.entries(import.meta.glob("/src/features/labs/content/*/*/*.js", { eager: true })).map(([key, mod]) => [
    key.replace("/src/features/labs/content", "."),
    mod,
  ]),
);

const run = (file, code, testName, tests) =>
  runTests([
    { name: file, code },
    { name: testName, lang: "test", code: tests },
  ]);
const allPass = (results) => results.length > 0 && results.every((r) => r.passed);
const someFail = (results) => results.some((r) => !r.passed);

const files = Object.entries(modules);

describe("lab files", () => {
  it("exist", () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const [name, mod] of files) {
    const lab = mod.default;

    describe(name, () => {
      it("matches the lab schema", () => {
        const parsed = labSchema.safeParse(lab);
        expect(parsed.success, JSON.stringify(parsed.error?.issues, null, 2)).toBe(true);
      });

      for (const task of lab.tasks) {
        if (task.type === "review") {
          it(`${task.id}: the AI's code passes its own tests`, async () => {
            expect(allPass(await run(task.file, task.starter, "happy.test.js", task.happyTests))).toBe(true);
          });
          it(`${task.id}: the AI's code fails the hidden tests`, async () => {
            expect(someFail(await run(task.file, task.starter, "hidden.test.js", task.tests))).toBe(true);
          });
          it(`${task.id}: the proof test fails on the AI's code and passes on the solution`, async () => {
            expect(someFail(await run(task.file, task.starter, task.testFile, task.proofTest))).toBe(true);
            expect(allPass(await run(task.file, task.solution, task.testFile, task.proofTest))).toBe(true);
          });
          it(`${task.id}: the solution passes the AI's tests and the hidden tests`, async () => {
            expect(allPass(await run(task.file, task.solution, "happy.test.js", task.happyTests))).toBe(true);
            expect(allPass(await run(task.file, task.solution, "hidden.test.js", task.tests))).toBe(true);
          });
        } else {
          it(`${task.id}: the starter fails its tests`, async () => {
            expect(someFail(await run(task.file, task.starter, "lab.test.js", task.tests))).toBe(true);
          });
          it(`${task.id}: the solution passes its tests`, async () => {
            const results = await run(task.file, task.solution, "lab.test.js", task.tests);
            expect(allPass(results), JSON.stringify(results, null, 2)).toBe(true);
          });
        }
      }
    });
  }
});

describe("lab manifest", () => {
  const fileKeys = files.map(([path]) => path.replace(/^\.\//, "").replace(/\.js$/, "")).sort();

  it("lists exactly the lab files", () => {
    expect(LAB_MANIFEST.map(labKey).sort()).toEqual(fileKeys);
  });

  it("matches each lab's minutes and tasks", () => {
    for (const entry of LAB_MANIFEST) {
      const lab = modules[`./${labKey(entry)}.js`].default;
      expect(entry.minutes).toBe(lab.minutes);
      expect(entry.tasks).toEqual(lab.tasks.map(({ type, title }) => ({ type, title })));
    }
  });

  it("puts every lab in a room", () => {
    for (const entry of LAB_MANIFEST) expect(roomOfTrack(entry.trackId)).toBeTruthy();
  });
});
