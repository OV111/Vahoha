/**
 * Client configuration: the options the MongoDB, Redis and Groq clients are built
 * with, the Redis error handling, and the CORS origin. The three clients are
 * mocked, so nothing here connects to anything.
 */
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from 'vitest'
import { EventEmitter } from 'node:events'
import process from 'node:process'

// ─── Fakes ──────────────────────────────────────────────────────────────────

const mongo = vi.hoisted(() => ({ calls: [] }))
vi.mock('mongodb', () => ({
  MongoClient: class {
    constructor(uri, options) {
      mongo.calls.push({ uri, options })
    }
    async connect() {}
    db() {
      return { collection: () => ({ createIndex: async () => 'ok' }) }
    }
    async close() {}
  },
}))

const redis = vi.hoisted(() => ({ made: [] }))
vi.mock('ioredis', async () => {
  const { EventEmitter: Emitter } = await import('node:events')
  return {
    default: class extends Emitter {
      constructor(...args) {
        super()
        this.args = args
        redis.made.push(this)
      }
    },
  }
})

const groq = vi.hoisted(() => ({ calls: [] }))
vi.mock('groq-sdk', () => ({
  default: class {
    constructor(options) {
      groq.calls.push(options)
    }
  },
}))

// ─── Mongo ──────────────────────────────────────────────────────────────────

describe('MongoDB client options', () => {
  beforeEach(() => {
    process.env.MONGO_URI = 'mongodb://example.invalid/test'
    vi.resetModules()
    mongo.calls.length = 0
  })

  it('is built with short connection timeouts and a modest pool', async () => {
    const { default: connectDB, MONGO_OPTIONS } = await import('../../config/db.js')
    await connectDB()

    expect(mongo.calls).toHaveLength(1)
    expect(mongo.calls[0].uri).toBe('mongodb://example.invalid/test')
    expect(mongo.calls[0].options).toBe(MONGO_OPTIONS)
    expect(MONGO_OPTIONS).toEqual({
      serverSelectionTimeoutMS: 10_000,
      connectTimeoutMS: 10_000,
      maxPoolSize: 20,
      minPoolSize: 0,
      appName: 'vahoha-api',
    })
  })

  it('does not cut long queries and leaves the retry behaviour alone', async () => {
    const { MONGO_OPTIONS } = await import('../../config/db.js')
    expect(MONGO_OPTIONS).not.toHaveProperty('socketTimeoutMS')
    expect(MONGO_OPTIONS).not.toHaveProperty('retryWrites')
    expect(MONGO_OPTIONS).not.toHaveProperty('retryReads')
  })

  it('still reuses one connection', async () => {
    const { default: connectDB } = await import('../../config/db.js')
    const first = await connectDB()
    expect(await connectDB()).toBe(first)
    expect(mongo.calls).toHaveLength(1)
  })
})

// ─── Redis ──────────────────────────────────────────────────────────────────

describe('Redis connection', () => {
  const ENV = ['REDIS_ENABLED', 'REDIS_URL', 'REDIS_HOST', 'REDIS_PORT', 'REDIS_PASSWORD']
  let saved

  beforeEach(() => {
    saved = Object.fromEntries(ENV.map((k) => [k, process.env[k]]))
    // An empty string counts as "set", so dotenv will not fill these in from a developer's own .env.
    for (const k of ENV) process.env[k] = ''
    process.env.REDIS_ENABLED = 'true'
    vi.resetModules()
    redis.made.length = 0
  })
  afterEach(() => {
    for (const k of ENV) {
      if (saved[k] === undefined) delete process.env[k]
      else process.env[k] = saved[k]
    }
  })

  it('keeps maxRetriesPerRequest null for BullMQ and adds a connect timeout and capped retries', async () => {
    const { REDIS_OPTIONS, redisRetryDelay } = await import('../../config/redis.js')
    expect(REDIS_OPTIONS.maxRetriesPerRequest).toBeNull()
    expect(REDIS_OPTIONS.connectTimeout).toBe(10_000)
    expect(REDIS_OPTIONS.retryStrategy).toBe(redisRetryDelay)
  })

  it('retries after 200 ms, growing by 200 ms, and never waits more than 5 s', async () => {
    const { redisRetryDelay } = await import('../../config/redis.js')
    expect([1, 2, 3].map(redisRetryDelay)).toEqual([200, 400, 600])
    expect(redisRetryDelay(25)).toBe(5000)
    expect(redisRetryDelay(10_000)).toBe(5000)
  })

  it('uses REDIS_URL when it is set, else host, port and password, with the same options', async () => {
    process.env.REDIS_URL = 'redis://example.invalid:6379'
    const { REDIS_OPTIONS } = await import('../../config/redis.js')
    expect(redis.made[0].args).toEqual(['redis://example.invalid:6379', REDIS_OPTIONS])

    vi.resetModules()
    redis.made.length = 0
    process.env.REDIS_URL = ''
    process.env.REDIS_HOST = 'cache.invalid'
    process.env.REDIS_PORT = '6380'
    process.env.REDIS_PASSWORD = 'pw'
    const second = await import('../../config/redis.js')
    expect(redis.made[0].args).toEqual([{ host: 'cache.invalid', port: 6380, password: 'pw', ...second.REDIS_OPTIONS }])
  })

  it('creates nothing when REDIS_ENABLED is false', async () => {
    process.env.REDIS_ENABLED = 'false'
    const { redisConnection } = await import('../../config/redis.js')
    expect(redisConnection).toBeNull()
    expect(redis.made).toHaveLength(0)
  })

  it('has an error listener, so a connection error is logged and does not crash the process', async () => {
    const log = vi.spyOn(console, 'error').mockImplementation(() => {})
    const { redisConnection } = await import('../../config/redis.js')

    expect(redisConnection.listenerCount('error')).toBe(1)
    // Without a listener, emitting 'error' throws. With one, it must not.
    expect(() => redisConnection.emit('error', new Error('connect ECONNREFUSED'))).not.toThrow()
    expect(log).toHaveBeenCalledWith('Redis: connect ECONNREFUSED')
    log.mockRestore()
  })

  it('an emitter with no listener really would throw (so the test above proves something)', () => {
    expect(() => new EventEmitter().emit('error', new Error('x'))).toThrow()
  })
})

describe('Redis error logger', () => {
  it('logs the same message once per window and again after it', async () => {
    const { createRedisErrorLogger } = await import('../../config/redis.js')
    let t = 0
    const log = vi.fn()
    const onError = createRedisErrorLogger({ windowMs: 30_000, now: () => t, log })

    onError(new Error('ECONNREFUSED'))
    t = 1000
    onError(new Error('ECONNREFUSED'))
    t = 29_999
    onError(new Error('ECONNREFUSED'))
    expect(log).toHaveBeenCalledTimes(1)

    t = 30_000
    onError(new Error('ECONNREFUSED'))
    expect(log).toHaveBeenCalledTimes(2)
  })

  it('logs a different message straight away', async () => {
    const { createRedisErrorLogger } = await import('../../config/redis.js')
    const log = vi.fn()
    const onError = createRedisErrorLogger({ now: () => 0, log })
    onError(new Error('ECONNREFUSED'))
    onError(new Error('NOAUTH Authentication required'))
    expect(log.mock.calls.map((c) => c[0])).toEqual(['Redis: ECONNREFUSED', 'Redis: NOAUTH Authentication required'])
  })

  it('copes with something that is not an Error', async () => {
    const { createRedisErrorLogger } = await import('../../config/redis.js')
    const log = vi.fn()
    expect(() => createRedisErrorLogger({ log })('plain text')).not.toThrow()
    expect(log).toHaveBeenCalledWith('Redis: plain text')
  })
})

// ─── Groq ───────────────────────────────────────────────────────────────────

describe('Groq client', () => {
  beforeEach(() => {
    process.env.GROQ_API_KEY = 'test-key'
    vi.resetModules()
    groq.calls.length = 0
  })

  it('is built with a 90 s timeout and 2 retries, and only once', async () => {
    const { getGroqClient, GROQ_OPTIONS } = await import('../../config/groq.js')
    const first = getGroqClient()
    expect(getGroqClient()).toBe(first)
    expect(groq.calls).toEqual([{ apiKey: 'test-key', timeout: 90_000, maxRetries: 2 }])
    expect(GROQ_OPTIONS).toEqual({ timeout: 90_000, maxRetries: 2 })
  })

  it('still says what is missing when there is no key', async () => {
    delete process.env.GROQ_API_KEY
    const { getGroqClient } = await import('../../config/groq.js')
    expect(() => getGroqClient()).toThrow('GROQ_API_KEY is missing from .env')
    expect(groq.calls).toHaveLength(0)
  })
})

// ─── CORS origin ────────────────────────────────────────────────────────────

describe('resolveCorsOrigin', () => {
  // The first import of app.js loads every route module; under a full-suite run that
  // alone can pass the 5 s default and fail whichever test happens to import first.
  beforeAll(() => import('../../app.js'), 30_000)

  it('uses FRONTEND_URL when it is set, in any environment', async () => {
    const { resolveCorsOrigin } = await import('../../app.js')
    expect(resolveCorsOrigin({ FRONTEND_URL: 'https://vahoha.com', NODE_ENV: 'production' })).toBe('https://vahoha.com')
    expect(resolveCorsOrigin({ FRONTEND_URL: 'https://x.test' })).toBe('https://x.test')
  })

  it('falls back to the dev server outside production', async () => {
    const { resolveCorsOrigin } = await import('../../app.js')
    expect(resolveCorsOrigin({})).toBe('http://localhost:5173')
    expect(resolveCorsOrigin({ NODE_ENV: 'development' })).toBe('http://localhost:5173')
    expect(resolveCorsOrigin({ NODE_ENV: 'test' })).toBe('http://localhost:5173')
  })

  it('never falls back to localhost in production: false, which switches CORS off (undefined would mean "*")', async () => {
    const { resolveCorsOrigin } = await import('../../app.js')
    expect(resolveCorsOrigin({ NODE_ENV: 'production' })).toBe(false)
    expect(resolveCorsOrigin({ NODE_ENV: 'production', FRONTEND_URL: '' })).toBe(false)
  })
})
