/**
 * The grading harness runs the learner's code in the same JS realm as the
 * hidden tests, so the learner's code is an attacker that can touch globals.
 * These tests run the REAL harness with code that tries to forge a passing
 * report, and pin that the report still reflects what the tests saw.
 *
 * Runs on whichever backend this machine has (isolated-vm, or the dev-only
 * child-process fallback): the harness program is the same in both.
 */
import { describe, it, expect } from 'vitest'
import { runHiddenTests } from '../../modules/coding-challenges/services/runnerService.js'
import { matchesHiddenTests } from '../../modules/coding-challenges/services/submissionService.js'
import { SAFE_FILE_NAME } from '../../modules/coding-challenges/services/attemptService.js'

// `double` must return n * 2; every forgery below ships a WRONG implementation.
const TESTS = [
  { name: 'doubles_two', code: 'assert(double(2) === 4, "double(2) should be 4")' },
  { name: 'doubles_five', code: 'assert(double(5) === 10, "double(5) should be 10")' },
]
const WRONG = 'module.exports = (n) => n;'
const FAKE_PASS = JSON.stringify({
  results: TESTS.map((t) => ({ name: t.name, passed: true, ms: 0 })),
  fatal: false,
})

const run = (code) => runHiddenTests(code, 'double', TESTS)
const allPassed = (out) => !out.fatal && out.results.length === TESTS.length && out.results.every((r) => r.passed)

describe('grading harness: honest code', () => {
  it('passes a correct solution', async () => {
    const out = await run('module.exports = (n) => n * 2;')
    expect(allPassed(out)).toBe(true)
    expect(matchesHiddenTests(out.results, TESTS)).toBe(true)
  })

  it('fails a wrong solution with the assertion message', async () => {
    const out = await run(WRONG)
    expect(out.results.map((r) => r.passed)).toEqual([false, false])
    expect(out.results[0].message).toBe('double(2) should be 4')
  })
})

describe('grading harness: forged reports', () => {
  it('the reporter is not reachable from learner code', async () => {
    const out = await run(`${WRONG} if (typeof __REPORT === "function") { __REPORT(${JSON.stringify(FAKE_PASS)}); __REPORT = () => {}; }`)
    expect(allPassed(out)).toBe(false)
  })

  it('overriding JSON.stringify and Array.prototype.push does not change the report', async () => {
    const out = await run(`${WRONG}
      JSON.stringify = () => ${JSON.stringify(FAKE_PASS)};
      Array.prototype.push = function (x) { x.passed = true; return 0; };
      Object.prototype.toJSON = function () { return { passed: true }; };`)
    expect(allPassed(out)).toBe(false)
    expect(out.results).toHaveLength(TESTS.length)
  })

  it('cannot replace Promise.then to swallow a failing test', async () => {
    const out = await run(`${WRONG}
      // await only calls .then when the promise's constructor is not the
      // built-in Promise, so a real attack swaps both.
      Promise.prototype.constructor = function Fake() {};
      Promise.prototype.then = function (ok) { return ok(); };`)
    expect(allPassed(out)).toBe(false)
  })
})

describe('matchesHiddenTests (server-side check of the sandbox report)', () => {
  it('rejects a report with missing, extra, renamed or reordered tests', () => {
    const ok = TESTS.map((t) => ({ name: t.name, passed: true }))
    expect(matchesHiddenTests(ok, TESTS)).toBe(true)
    expect(matchesHiddenTests(ok.slice(1), TESTS)).toBe(false)
    expect(matchesHiddenTests([...ok, { name: 'extra', passed: true }], TESTS)).toBe(false)
    expect(matchesHiddenTests([...ok].reverse(), TESTS)).toBe(false)
    expect(matchesHiddenTests('not an array', TESTS)).toBe(false)
  })
})

describe('SAFE_FILE_NAME', () => {
  it('accepts starter-style names and rejects anything that could inject code', () => {
    expect(SAFE_FILE_NAME.test('asyncHandler.js')).toBe(true)
    expect(SAFE_FILE_NAME.test('$store_2.js')).toBe(true)
    expect(SAFE_FILE_NAME.test('x=1;__REPORT("{}");//.js')).toBe(false)
    expect(SAFE_FILE_NAME.test('a b.js')).toBe(false)
    expect(SAFE_FILE_NAME.test('2fast.js')).toBe(false)
    expect(SAFE_FILE_NAME.test('solution.ts')).toBe(false)
  })
})
