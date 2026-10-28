/**
 * Keeps the places that list environment variables from drifting apart:
 * config/env.js (the source of truth), .env.example, render.yaml and the
 * deployment doc. A failure here means one of them was edited alone.
 */
import { describe, it, expect } from 'vitest'
import { readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { ENV_SPECS, FRONTEND_ENV_SPECS, renderEnvExample } from '../../config/env.js'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
const read = (file) => readFileSync(path.join(root, file), 'utf8').replace(/\r\n/g, '\n')

const specNames = ENV_SPECS.map((s) => s.name)
const frontendNames = FRONTEND_ENV_SPECS.map((s) => s.name)

// `NAME=value` or a commented-out `# NAME=value` (optional variables ship commented out).
const exampleNames = (text) => [...text.matchAll(/^(?:# )?([A-Za-z_][A-Za-z0-9_]*)=/gm)].map((m) => m[1])

describe('ENV_SPECS', () => {
  it('has no duplicate names', () => {
    expect(new Set(specNames).size).toBe(specNames.length)
  })

  it('gives every variable a description, a placeholder and a stated effect', () => {
    for (const spec of ENV_SPECS) {
      expect(spec.description, spec.name).toBeTruthy()
      expect(spec.example, spec.name).toBeTruthy()
      expect(spec.effect, spec.name).toBeTruthy()
    }
  })

  it('uses no real-looking secret as a placeholder', () => {
    for (const spec of ENV_SPECS) {
      expect(spec.example, spec.name).not.toMatch(/^(sk-|ghp_|gho_|AKIA)[A-Za-z0-9]{16,}/)
    }
  })
})

describe('.env.example', () => {
  const example = read('.env.example')
  const names = exampleNames(example)

  it('lists every variable the server checks', () => {
    expect(specNames.filter((n) => !names.includes(n))).toEqual([])
  })

  it('lists nothing the server does not know about, apart from the frontend section', () => {
    expect(names.filter((n) => !specNames.includes(n) && !frontendNames.includes(n))).toEqual([])
  })

  it('lists each variable once', () => {
    expect(new Set(names).size).toBe(names.length)
  })

  it('is exactly what renderEnvExample() produces (regenerate it when a spec changes)', () => {
    expect(example).toBe(renderEnvExample())
  })

  it('ships the always-required variables as placeholders and everything else commented out', () => {
    for (const spec of ENV_SPECS) {
      const active = new RegExp(`^${spec.name}=`, 'm').test(example)
      expect(active, `${spec.name} should be ${spec.requirement === 'required' ? 'an active line' : 'commented out'}`).toBe(spec.requirement === 'required')
    }
  })
})

describe('render.yaml', () => {
  const renderKeys = [...read('render.yaml').matchAll(/^\s+- key: ([A-Za-z_][A-Za-z0-9_]*)/gm)].map((m) => m[1])

  // Set by Render itself or for the build, not read by the app.
  const RENDER_ONLY = ['HUSKY', 'NODE_VERSION']

  // Specs that render.yaml does not list. Each is either injected by the platform (PORT)
  // or something you set only when you need it. Changing this list is a conscious decision.
  const NOT_IN_RENDER = [
    'ALLOW_UNBANKED_PUBLISH',
    'ALLOW_UNSAFE_RUNNER',
    'CACHE_ENABLED',
    'CAPSTONE_REVIEW_MAX_CHARS',
    'CONTACT_INBOX',
    'DNS_SERVERS',
    'EVAL_JUDGE_MODEL',
    'GROQ_TPM_LIMIT',
    'MAINTENANCE_MODE',
    'PORT',
    'REDIS_HOST',
    'REDIS_PASSWORD',
    'REDIS_PORT',
    'WS_EXTRA_ORIGINS',
  ]

  it('sets only variables the app knows about', () => {
    expect(renderKeys.filter((k) => !specNames.includes(k) && !RENDER_ONLY.includes(k))).toEqual([])
  })

  it('lists exactly the specs we expect it to leave out', () => {
    expect(specNames.filter((n) => !renderKeys.includes(n)).sort()).toEqual(NOT_IN_RENDER)
  })

  it('lists every required variable', () => {
    for (const spec of ENV_SPECS.filter((s) => s.requirement !== 'optional')) expect(renderKeys, spec.name).toContain(spec.name)
  })
})

describe('the deployment doc', () => {
  const doc = read('docs/engineering/DEPLOYMENT.md')

  it('mentions every backend and frontend variable', () => {
    const missing = [...specNames, ...frontendNames].filter((n) => !doc.includes(`\`${n}\``))
    expect(missing).toEqual([])
  })
})
