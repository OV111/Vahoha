import { describe, it, expect } from 'vitest'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import process from 'node:process'
import { fileURLToPath } from 'node:url'
import { ENV_SPECS, EnvError, assertEnv, formatConfigReport, validateEnv } from '../../config/env.js'

// A production configuration with EVERYTHING set, using placeholders only.
const full = (overrides = {}) => ({
  NODE_ENV: 'production',
  PORT: '5000',
  MONGO_URI: 'mongodb+srv://user:pass@cluster.example.net/db',
  FRONTEND_URL: 'https://vahoha.com',
  JWT_Secret: 'a'.repeat(40),
  JWT_REFRESH_SECRET: 'b'.repeat(40),
  GOOGLE_CLIENT_ID: 'google-id',
  GITHUB_CLIENT_ID: 'gh-id',
  GITHUB_CLIENT_SECRET: 'gh-secret',
  GITHUB_TOKEN: 'gh-token',
  GROQ_API_KEY: 'groq-key',
  RESEND_API_KEY: 're_key',
  EMAIL_FROM: 'Vahoha <no-reply@vahoha.com>',
  CLOUDINARY_CLOUD_NAME: 'cloud',
  CLOUDINARY_API_KEY: 'ckey',
  CLOUDINARY_API_SECRET: 'csecret',
  POLAR_ACCESS_TOKEN: 'polar-token',
  POLAR_PRO_PRODUCT_ID: 'product',
  POLAR_WEBHOOK_SECRET: 'whsec',
  REDIS_URL: 'rediss://default:pass@host:6379',
  ...overrides,
})

/** A config with some variables removed. */
const without = (...names) => {
  const env = full()
  for (const n of names) delete env[n]
  return env
}

const errorNames = (result) => result.errors.map((e) => e.name)
const warningNames = (result) => result.warnings.map((w) => w.name)

describe('a complete production configuration', () => {
  it('is ok with no errors and no warnings, and every feature on', () => {
    const result = validateEnv(full())
    expect(result.errors).toEqual([])
    expect(result.warnings).toEqual([])
    expect(result.ok).toBe(true)
    expect(result.environment).toBe('production')
    expect(Object.values(result.features).every(Boolean)).toBe(true)
  })
})

describe('fatal problems', () => {
  it.each([
    ['MONGO_URI missing', without('MONGO_URI'), 'MONGO_URI', /missing/],
    ['MONGO_URI with the wrong scheme', full({ MONGO_URI: 'http://localhost:27017' }), 'MONGO_URI', /mongodb/],
    ['JWT_Secret missing', without('JWT_Secret'), 'JWT_Secret', /missing/],
    ['JWT_REFRESH_SECRET missing', without('JWT_REFRESH_SECRET'), 'JWT_REFRESH_SECRET', /missing/],
    ['both JWT secrets the same', full({ JWT_REFRESH_SECRET: 'a'.repeat(40) }), 'JWT_REFRESH_SECRET', /differ/],
    ['a blank JWT secret (spaces only)', full({ JWT_Secret: '   ' }), 'JWT_Secret', /missing/],
    ['FRONTEND_URL missing in production', without('FRONTEND_URL'), 'FRONTEND_URL', /missing/],
    ['FRONTEND_URL over http in production', full({ FRONTEND_URL: 'http://vahoha.com' }), 'FRONTEND_URL', /https/],
    ['FRONTEND_URL with a trailing slash', full({ FRONTEND_URL: 'https://vahoha.com/' }), 'FRONTEND_URL', /slash or path/],
    ['FRONTEND_URL with a path', full({ FRONTEND_URL: 'https://vahoha.com/app' }), 'FRONTEND_URL', /slash or path/],
    ['FRONTEND_URL that is not a URL', full({ FRONTEND_URL: 'vahoha.com' }), 'FRONTEND_URL', /full URL/],
    ['the unsafe code runner in production', full({ ALLOW_UNSAFE_RUNNER: 'true' }), 'ALLOW_UNSAFE_RUNNER', /production/],
    ['billing enforced without POLAR_ACCESS_TOKEN', full({ BILLING_ENFORCED: 'true', POLAR_ACCESS_TOKEN: '' }), 'POLAR_ACCESS_TOKEN', /BILLING_ENFORCED/],
    ['billing enforced without POLAR_WEBHOOK_SECRET', full({ BILLING_ENFORCED: 'true', POLAR_WEBHOOK_SECRET: '' }), 'POLAR_WEBHOOK_SECRET', /BILLING_ENFORCED/],
    ['billing enforced without POLAR_PRO_PRODUCT_ID', full({ BILLING_ENFORCED: 'true', POLAR_PRO_PRODUCT_ID: '' }), 'POLAR_PRO_PRODUCT_ID', /BILLING_ENFORCED/],
  ])('%s', (_name, env, variable, pattern) => {
    const result = validateEnv(env)
    expect(result.ok).toBe(false)
    const hit = result.errors.find((e) => e.name === variable)
    expect(hit, `expected an error on ${variable}`).toBeDefined()
    expect(hit.message).toMatch(pattern)
  })

  it('reports every problem together, not one at a time', () => {
    const result = validateEnv({ NODE_ENV: 'production', ALLOW_UNSAFE_RUNNER: 'true' })
    expect(errorNames(result).sort()).toEqual(['ALLOW_UNSAFE_RUNNER', 'FRONTEND_URL', 'JWT_REFRESH_SECRET', 'JWT_Secret', 'MONGO_URI'])
  })

  it('assertEnv throws one EnvError listing all of them', () => {
    let error
    try {
      assertEnv({ NODE_ENV: 'production' })
    } catch (e) {
      error = e
    }
    expect(error).toBeInstanceOf(EnvError)
    expect(error.errors.length).toBeGreaterThanOrEqual(4)
    for (const e of error.errors) expect(error.message).toContain(`- ${e.name}: ${e.message}`)
  })

  it('assertEnv returns the result when the configuration is fine', () => {
    expect(assertEnv(full()).ok).toBe(true)
  })

  it('repeats back only a known NODE_ENV, treating anything else as development', () => {
    expect(validateEnv(full({ NODE_ENV: 'staging', FRONTEND_URL: 'https://staging.vahoha.com' })).environment).toBe('staging')
    expect(validateEnv(full({ NODE_ENV: 'prod' })).environment).toBe('development')
    expect(validateEnv({}).environment).toBe('development')
  })

  it('is not stricter outside production: FRONTEND_URL is optional, the unsafe runner is allowed', () => {
    const env = { NODE_ENV: 'development', MONGO_URI: 'mongodb://localhost:27017/db', JWT_Secret: 'a'.repeat(32), JWT_REFRESH_SECRET: 'b'.repeat(32), ALLOW_UNSAFE_RUNNER: 'true' }
    expect(validateEnv(env).ok).toBe(true)
    expect(validateEnv({ ...env, NODE_ENV: undefined }).ok).toBe(true) // unset NODE_ENV counts as development
  })

  it('does not require the Polar variables unless billing is enforced', () => {
    expect(validateEnv(without('POLAR_ACCESS_TOKEN', 'POLAR_WEBHOOK_SECRET', 'POLAR_PRO_PRODUCT_ID')).ok).toBe(true)
  })
})

describe('warnings (the app runs, part of it is off)', () => {
  it.each([
    ['GROQ_API_KEY missing', without('GROQ_API_KEY'), 'GROQ_API_KEY', /AI|mentor/],
    ['GITHUB_TOKEN missing', without('GITHUB_TOKEN'), 'GITHUB_TOKEN', /60/],
    ['GOOGLE_CLIENT_ID missing', without('GOOGLE_CLIENT_ID'), 'GOOGLE_CLIENT_ID', /Google/],
    ['RESEND_API_KEY set without EMAIL_FROM', without('EMAIL_FROM'), 'EMAIL_FROM', /RESEND_API_KEY/],
    ['EMAIL_FROM set without RESEND_API_KEY', without('RESEND_API_KEY'), 'RESEND_API_KEY', /EMAIL_FROM/],
    ['GITHUB_CLIENT_SECRET missing', without('GITHUB_CLIENT_SECRET'), 'GITHUB_CLIENT_SECRET', /GITHUB_CLIENT_ID/],
    ['GITHUB_CLIENT_ID missing', without('GITHUB_CLIENT_ID'), 'GITHUB_CLIENT_ID', /GITHUB_CLIENT_SECRET/],
    ['one Cloudinary variable missing', without('CLOUDINARY_API_SECRET'), 'CLOUDINARY_API_SECRET', /CLOUDINARY_CLOUD_NAME/],
    ['no Redis settings in production', without('REDIS_URL'), 'REDIS_URL', /throttling|queue/],
    ['GROQ_TPM_LIMIT set in production', full({ GROQ_TPM_LIMIT: '6000' }), 'GROQ_TPM_LIMIT', /remove/],
    ['the cache switched off in production', full({ CACHE_ENABLED: 'false' }), 'CACHE_ENABLED', /off/],
    ['a short JWT secret', full({ JWT_Secret: 'short-secret' }), 'JWT_Secret', /short/],
    ['billing enforced against the Polar sandbox in production', full({ BILLING_ENFORCED: 'true', POLAR_ENVIRONMENT: 'sandbox' }), 'POLAR_ENVIRONMENT', /sandbox/],
    ['an unrecognised NODE_ENV', full({ NODE_ENV: 'prod' }), 'NODE_ENV', /production, staging/],
    ['a non-numeric PORT', full({ PORT: 'eighty' }), 'PORT', /whole number/],
    ['a zero REDIS_PORT', full({ REDIS_PORT: '0' }), 'REDIS_PORT', /whole number/],
    ['a decimal CAPSTONE_REVIEW_MAX_CHARS', full({ CAPSTONE_REVIEW_MAX_CHARS: '1.5' }), 'CAPSTONE_REVIEW_MAX_CHARS', /whole number/],
    ['a non-numeric GROQ_TPM_LIMIT', full({ GROQ_TPM_LIMIT: 'lots' }), 'GROQ_TPM_LIMIT', /whole number/],
    ['a flag that is not true or false', full({ MAINTENANCE_MODE: 'yes' }), 'MAINTENANCE_MODE', /true or false/],
    ['REDIS_ENABLED that is not true or false', full({ REDIS_ENABLED: '0' }), 'REDIS_ENABLED', /true or false/],
    ['ALLOW_UNBANKED_PUBLISH that is not 1 or 0', full({ ALLOW_UNBANKED_PUBLISH: 'true' }), 'ALLOW_UNBANKED_PUBLISH', /1 or 0/],
    ['an EMAIL_FROM without an address', full({ EMAIL_FROM: 'Vahoha' }), 'EMAIL_FROM', /email address/],
    ['a CONTACT_INBOX that is not an address', full({ CONTACT_INBOX: 'inbox' }), 'CONTACT_INBOX', /email address/],
    ['DNS_SERVERS that are not IP addresses', full({ DNS_SERVERS: 'dns.example.com' }), 'DNS_SERVERS', /IP addresses/],
    ['WS_EXTRA_ORIGINS that are not origins', full({ WS_EXTRA_ORIGINS: 'staging' }), 'WS_EXTRA_ORIGINS', /origins/],
    ['one of the Polar variables while billing is not enforced', without('POLAR_PRO_PRODUCT_ID'), 'POLAR_PRO_PRODUCT_ID', /billing page/],
  ])('%s', (_name, env, variable, pattern) => {
    const result = validateEnv(env)
    expect(result.errors, 'a warning case must not be fatal').toEqual([])
    const hit = result.warnings.find((w) => w.name === variable)
    expect(hit, `expected a warning on ${variable}`).toBeDefined()
    expect(hit.message).toMatch(pattern)
  })

  it('does not warn about things that are fine', () => {
    expect(warningNames(validateEnv(full({ GROQ_TPM_LIMIT: '6000', NODE_ENV: 'development' })))).not.toContain('GROQ_TPM_LIMIT')
    expect(warningNames(validateEnv(without('REDIS_URL', 'REDIS_ENABLED')))).toContain('REDIS_URL')
    expect(warningNames(validateEnv(full({ REDIS_URL: '', REDIS_ENABLED: 'false' })))).not.toContain('REDIS_URL')
    expect(warningNames(validateEnv(full({ REDIS_URL: '', REDIS_HOST: 'redis.internal' })))).not.toContain('REDIS_URL')
    expect(warningNames(validateEnv(full({ CACHE_ENABLED: 'false', NODE_ENV: 'development' })))).not.toContain('CACHE_ENABLED')
    expect(validateEnv(full({ MAINTENANCE_MODE: 'true', CANDIDATES_ENABLED: 'false', ALLOW_UNBANKED_PUBLISH: '1', DNS_SERVERS: '8.8.8.8, 1.1.1.1', WS_EXTRA_ORIGINS: 'https://a.example.com, http://localhost:3000' })).warnings).toEqual([])
  })

  it('treats a pair that is entirely absent as a feature that is off, not a half-set-up one', () => {
    const result = validateEnv(without('GITHUB_CLIENT_ID', 'GITHUB_CLIENT_SECRET', 'RESEND_API_KEY', 'EMAIL_FROM', 'CLOUDINARY_CLOUD_NAME', 'CLOUDINARY_API_KEY', 'CLOUDINARY_API_SECRET'))
    expect(result.warnings).toEqual([])
    expect(result.features).toMatchObject({ githubSignIn: false, email: false, uploads: false })
  })

  it('warns about a malformed FRONTEND_URL outside production, without failing', () => {
    const result = validateEnv(full({ NODE_ENV: 'development', FRONTEND_URL: 'localhost:5173' }))
    expect(result.ok).toBe(true)
    expect(warningNames(result)).toContain('FRONTEND_URL')
  })
})

describe('the meaning of each variable is unchanged', () => {
  it('REDIS_ENABLED is on unless it is exactly "false"', () => {
    expect(validateEnv(full()).features.redis).toBe(true)
    expect(validateEnv(full({ REDIS_ENABLED: 'false' })).features.redis).toBe(false)
    expect(validateEnv(full({ REDIS_ENABLED: 'no' })).features.redis).toBe(true) // the code only checks !== "false"
  })

  it('BILLING_ENFORCED counts only when it is exactly "true"', () => {
    expect(validateEnv(full({ BILLING_ENFORCED: 'TRUE', POLAR_ACCESS_TOKEN: '' })).ok).toBe(true) // not enforced, so not fatal
    expect(validateEnv(full({ BILLING_ENFORCED: 'true', POLAR_ACCESS_TOKEN: '' })).ok).toBe(false)
  })

  it('ALLOW_UNSAFE_RUNNER counts only when it is exactly "true"', () => {
    expect(validateEnv(full({ ALLOW_UNSAFE_RUNNER: 'TRUE' })).ok).toBe(true)
    expect(validateEnv(full({ ALLOW_UNSAFE_RUNNER: 'false' })).ok).toBe(true)
  })

  it('every flag spec uses one of the three kinds the code understands', () => {
    for (const spec of ENV_SPECS.filter((s) => s.kind.startsWith('flag'))) expect(['flag', 'flag1']).toContain(spec.kind)
  })
})

describe('what is on and off', () => {
  it('names the missing variables for each feature that is off', () => {
    const result = validateEnv(without('RESEND_API_KEY', 'GITHUB_TOKEN', 'REDIS_URL'))
    expect(result.features).toMatchObject({ email: false, repoScan: false })
    expect(result.featureNotes.email).toBe('RESEND_API_KEY is missing')
    expect(result.featureNotes.repoScan).toBe('GITHUB_TOKEN is missing')
  })

  it('the startup report lists what is on, what is off and why, and every warning', () => {
    const report = formatConfigReport(validateEnv(without('GROQ_API_KEY', 'CLOUDINARY_API_KEY', 'CLOUDINARY_CLOUD_NAME')))
    expect(report).toMatch(/^Configuration OK \(production\)\./)
    expect(report).toMatch(/On : .*Email/)
    expect(report).toMatch(/Off: .*AI \(Groq\) \(GROQ_API_KEY is missing\)/)
    expect(report).toMatch(/Image uploads \(CLOUDINARY_CLOUD_NAME and CLOUDINARY_API_KEY are missing\)/)
    expect(report).toContain('Warnings:')
    expect(report).toContain('- GROQ_API_KEY:')
  })

  it('a clean configuration prints no Off line and no warnings', () => {
    const report = formatConfigReport(validateEnv(full()))
    expect(report).not.toContain('Off:')
    expect(report).not.toContain('Warnings:')
  })
})

describe('no value ever appears in a message', () => {
  const MARK = 'ZZ-LEAK-7f3a9c'

  it('across every variable, whatever it holds', () => {
    // Every variable carries the marker, in a form that triggers as many rules as possible.
    const everything = Object.fromEntries(ENV_SPECS.map((s) => [s.name, `${MARK}-${s.name}`]))
    const shapes = [
      everything,
      full({ MONGO_URI: `mongodb+srv://u:${MARK}@h/db`, JWT_Secret: MARK, JWT_REFRESH_SECRET: MARK, FRONTEND_URL: `https://${MARK}.example.com/path/`, NODE_ENV: 'production', BILLING_ENFORCED: 'true', POLAR_ACCESS_TOKEN: '' }),
      full({ NODE_ENV: 'development', FRONTEND_URL: MARK, PORT: MARK, EMAIL_FROM: MARK, DNS_SERVERS: MARK, WS_EXTRA_ORIGINS: MARK, CONTACT_INBOX: MARK }),
    ]
    for (const env of shapes) {
      const result = validateEnv(env)
      const everythingShown = JSON.stringify(result) + formatConfigReport(result)
      expect(everythingShown).not.toContain(MARK)
      expect(everythingShown).not.toContain('7f3a9c')
      if (!result.ok) {
        try {
          assertEnv(env)
        } catch (error) {
          expect(error.message).not.toContain('7f3a9c')
        }
      }
    }
  })
})

describe('the boot module (a real process)', () => {
  const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../..')
  const boot = path.join(root, 'backend/config/bootEnv.js')

  // Variables set in the child's own environment win over backend/.env, so these
  // runs do not depend on what is in a developer's local file.
  const run = (env) => {
    try {
      const stdout = execFileSync(process.execPath, [boot], { cwd: root, env: { PATH: process.env.PATH, ...env }, encoding: 'utf8', stdio: ['ignore', 'pipe', 'pipe'] })
      return { code: 0, stdout, stderr: '' }
    } catch (error) {
      return { code: error.status, stdout: error.stdout?.toString() ?? '', stderr: error.stderr?.toString() ?? '' }
    }
  }

  it('exits with 1 and lists the problems when production is misconfigured', () => {
    const { code, stderr } = run({ NODE_ENV: 'production', FRONTEND_URL: 'http://not-https.example.com/', ALLOW_UNSAFE_RUNNER: 'true', MONGO_URI: 'mongodb://localhost/x', JWT_Secret: 'same-secret-value-same-secret-value', JWT_REFRESH_SECRET: 'same-secret-value-same-secret-value' })
    expect(code).toBe(1)
    expect(stderr).toContain('Invalid configuration')
    for (const name of ['FRONTEND_URL', 'ALLOW_UNSAFE_RUNNER', 'JWT_REFRESH_SECRET']) expect(stderr).toContain(name)
    expect(stderr).not.toContain('same-secret-value')
    expect(stderr).not.toContain('not-https.example.com')
  })

  it('continues and prints the report when the required settings are valid', () => {
    const { code, stdout } = run({ NODE_ENV: 'development', MONGO_URI: 'mongodb://localhost/x', JWT_Secret: 'a'.repeat(40), JWT_REFRESH_SECRET: 'b'.repeat(40) })
    expect(code).toBe(0)
    expect(stdout).toMatch(/Configuration OK \(development\)\./)
  })
})
