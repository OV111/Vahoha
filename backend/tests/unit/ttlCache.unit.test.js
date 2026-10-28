import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import process from 'node:process'
import { createTtlCache, isCachingEnabled } from '../../utils/ttlCache.js'
import { cacheControl } from '../../middleware/cacheControl.js'

// The cache is off under Vitest by default, so a test about caching turns it on.
beforeEach(() => {
  process.env.CACHE_ENABLED = 'true'
})
afterEach(() => {
  delete process.env.CACHE_ENABLED
})

const clock = (start = 1000) => {
  let t = start
  return { now: () => t, advance: (ms) => (t += ms) }
}

describe('createTtlCache', () => {
  it('loads once, then serves from memory until the TTL passes', async () => {
    const c = clock()
    const cache = createTtlCache({ name: 't', ttlMs: 1000, now: c.now })
    const load = vi.fn().mockResolvedValue('v1')

    expect(await cache.wrap('k', load)).toBe('v1')
    expect(await cache.wrap('k', load)).toBe('v1')
    expect(load).toHaveBeenCalledTimes(1)

    c.advance(1001)
    load.mockResolvedValue('v2')
    expect(await cache.wrap('k', load)).toBe('v2')
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('keeps keys apart', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    expect(await cache.wrap('a', async () => 1)).toBe(1)
    expect(await cache.wrap('b', async () => 2)).toBe(2)
    expect(await cache.wrap('a', async () => 99)).toBe(1)
  })

  it('shares one load between concurrent misses (no stampede)', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    let release
    const load = vi.fn(() => new Promise((resolve) => (release = () => resolve('slow'))))

    const calls = [cache.wrap('k', load), cache.wrap('k', load), cache.wrap('k', load)]
    release()
    expect(await Promise.all(calls)).toEqual(['slow', 'slow', 'slow'])
    expect(load).toHaveBeenCalledTimes(1)
  })

  it('never caches a failed load, and the next call retries', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    const load = vi.fn().mockRejectedValueOnce(new Error('db down')).mockResolvedValueOnce('ok')

    await expect(cache.wrap('k', load)).rejects.toThrow('db down')
    expect(await cache.wrap('k', load)).toBe('ok')
    expect(load).toHaveBeenCalledTimes(2)
  })

  it('lets every waiter see the same failure, then recovers', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    let fail
    const load = vi.fn(() => new Promise((_, reject) => (fail = () => reject(new Error('boom')))))
    const calls = [cache.wrap('k', load), cache.wrap('k', load)].map((p) => p.catch((e) => e.message))
    fail()
    expect(await Promise.all(calls)).toEqual(['boom', 'boom'])
    expect(await cache.wrap('k', async () => 'back')).toBe('back')
  })

  it('caps its size by dropping the oldest entries', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000, maxEntries: 2 })
    await cache.wrap('a', async () => 1)
    await cache.wrap('b', async () => 2)
    await cache.wrap('c', async () => 3)
    expect(cache.get('a')).toBeUndefined()
    expect(cache.get('b')).toBe(2)
    expect(cache.get('c')).toBe(3)
    expect(cache.stats().size).toBe(2)
  })

  it('delete and clear drop entries, and clear(prefix) drops only that prefix', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    await cache.wrap('list:1', async () => 1)
    await cache.wrap('list:2', async () => 2)
    await cache.wrap('other', async () => 3)

    cache.clear('list:')
    expect(cache.get('list:1')).toBeUndefined()
    expect(cache.get('other')).toBe(3)
    cache.delete('other')
    expect(cache.get('other')).toBeUndefined()
  })

  it('hands out a copy when asked, so a caller cannot change the shared value', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    const first = await cache.wrap('k', async () => ({ n: 1 }), { clone: true })
    first.n = 99
    expect((await cache.wrap('k', async () => ({ n: 2 }), { clone: true })).n).toBe(1)
  })

  it('counts hits and misses', async () => {
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    await cache.wrap('k', async () => 1)
    await cache.wrap('k', async () => 1)
    await cache.wrap('k', async () => 1)
    expect(cache.stats()).toMatchObject({ hits: 2, misses: 1 })
  })

  it('does nothing when caching is off', async () => {
    process.env.CACHE_ENABLED = 'false'
    const cache = createTtlCache({ name: 't', ttlMs: 1000 })
    const load = vi.fn().mockResolvedValue('v')
    await cache.wrap('k', load)
    await cache.wrap('k', load)
    expect(load).toHaveBeenCalledTimes(2)
  })
})

describe('isCachingEnabled', () => {
  it('is off under Vitest unless a test asks for it, and an explicit setting wins', () => {
    delete process.env.CACHE_ENABLED
    expect(isCachingEnabled()).toBe(false)
    process.env.CACHE_ENABLED = 'true'
    expect(isCachingEnabled()).toBe(true)
    process.env.CACHE_ENABLED = 'false'
    expect(isCachingEnabled()).toBe(false)
  })
})

describe('cacheControl', () => {
  const run = (method, options) => {
    const headers = {}
    const res = { set: (k, v) => (headers[k] = v) }
    const next = vi.fn()
    cacheControl(options)({ method }, res, next)
    return { headers, next }
  }

  it('sets the header on a read, with stale-while-revalidate when asked', () => {
    expect(run('GET', { maxAge: 30 }).headers['Cache-Control']).toBe('public, max-age=30')
    expect(run('GET', { maxAge: 30, staleWhileRevalidate: 60 }).headers['Cache-Control']).toBe('public, max-age=30, stale-while-revalidate=60')
    expect(run('GET', { maxAge: 10, scope: 'private' }).headers['Cache-Control']).toBe('private, max-age=10')
  })

  it('never sets it on a write, and always continues', () => {
    const { headers, next } = run('POST', { maxAge: 30 })
    expect(headers['Cache-Control']).toBeUndefined()
    expect(next).toHaveBeenCalled()
  })
})
