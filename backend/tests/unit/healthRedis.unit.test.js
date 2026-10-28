import { describe, it, expect, vi } from 'vitest'
import { EventEmitter } from 'node:events'
import { checkHealth, healthHandler } from '../../utils/health.js'

const mongoUp = () => ({ command: vi.fn().mockResolvedValue({ ok: 1 }) })
const mongoDown = () => ({ command: vi.fn().mockRejectedValue(new Error('not reachable')) })
const redisReady = (ping = async () => 'PONG') => ({ status: 'ready', ping: vi.fn(ping) })

const quiet = () => vi.spyOn(console, 'error').mockImplementation(() => {})

describe('checkHealth with Redis', () => {
  it('reports "up" when Redis answers a PING', async () => {
    const redis = redisReady()
    const out = await checkHealth(mongoUp(), { redis })
    expect(out.ok).toBe(true)
    expect(out.body.redis).toBe('up')
    expect(redis.ping).toHaveBeenCalledTimes(1)
  })

  it('reports "disabled" when Redis is switched off', async () => {
    const out = await checkHealth(mongoUp(), { redis: null })
    expect(out).toMatchObject({ ok: true, body: { status: 'ok', redis: 'disabled' } })
  })

  it('leaves the field out when the caller did not ask about Redis', async () => {
    const out = await checkHealth(mongoUp())
    expect(out.ok).toBe(true)
    expect(out.body).not.toHaveProperty('redis')
  })

  it('stays healthy (200) when Redis is down: a restart cannot fix it', async () => {
    const redis = redisReady(async () => {
      throw new Error('connection closed')
    })
    const out = await checkHealth(mongoUp(), { redis })
    expect(out.ok).toBe(true)
    expect(out.body).toMatchObject({ status: 'ok', redis: 'down' })
  })

  it('says "down" at once, without sending a PING, when Redis is not connected', async () => {
    const redis = { status: 'reconnecting', ping: vi.fn() }
    const out = await checkHealth(mongoUp(), { redis })
    expect(out.body.redis).toBe('down')
    expect(redis.ping).not.toHaveBeenCalled() // a queued PING would pile up while Redis is away
  })

  it('does not hang on a Redis that never answers', async () => {
    const redis = redisReady(() => new Promise(() => {}))
    const started = Date.now()
    const out = await checkHealth(mongoUp(), { redis, redisTimeoutMs: 50 })
    expect(out.body.redis).toBe('down')
    expect(out.ok).toBe(true)
    expect(Date.now() - started).toBeLessThan(1000)
  })

  it('is unavailable (503) when MongoDB is down, whatever Redis says, and does not ping Redis', async () => {
    const err = quiet()
    const redis = redisReady()
    const out = await checkHealth(mongoDown(), { redis })
    expect(out.ok).toBe(false)
    expect(out.body).toEqual({ status: 'unavailable' })
    expect(redis.ping).not.toHaveBeenCalled()
    err.mockRestore()
  })
})

describe('healthHandler', () => {
  const run = async (handler, method = 'GET') => {
    const res = { writeHead: vi.fn(), end: vi.fn() }
    await handler({ method }, res)
    return { status: res.writeHead.mock.calls[0][0], body: res.end.mock.calls[0][0] }
  }

  it('answers 200 with the Redis status when Mongo is up', async () => {
    const { status, body } = await run(healthHandler(mongoUp(), { redis: redisReady() }))
    expect(status).toBe(200)
    expect(JSON.parse(body)).toMatchObject({ status: 'ok', redis: 'up' })
  })

  it('answers 200 with redis "down" when only Redis is gone', async () => {
    const dead = Object.assign(new EventEmitter(), { status: 'end', ping: vi.fn() })
    const { status, body } = await run(healthHandler(mongoUp(), { redis: dead }))
    expect(status).toBe(200)
    expect(JSON.parse(body).redis).toBe('down')
  })

  it('answers 503 when Mongo is down', async () => {
    const err = quiet()
    const { status, body } = await run(healthHandler(mongoDown(), { redis: redisReady() }))
    expect(status).toBe(503)
    expect(JSON.parse(body)).toEqual({ status: 'unavailable' })
    err.mockRestore()
  })

  it('has no body for HEAD', async () => {
    const { status, body } = await run(healthHandler(mongoUp(), { redis: null }), 'HEAD')
    expect(status).toBe(200)
    expect(body).toBeUndefined()
  })
})
