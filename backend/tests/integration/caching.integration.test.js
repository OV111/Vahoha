/**
 * Server-side caching: roadmap layers and tracks, the leaderboard ranking, the
 * admin funnel and the recruiter candidate pool.
 *
 * Runs against a real in-memory MongoDB. `counting(db)` wraps it and counts the
 * reads that reach the database per collection, which is the proof that a cache
 * hit really skips the database. Caching is off under Vitest unless a test
 * turns it on, so every test here sets CACHE_ENABLED itself.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import process from 'node:process'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import { getLayers, getTracks, clearRoadmapCache } from '../../services/roadmapCache.js'
import { withLayerTitles } from '../../services/examHistoryService.js'
import { listTracksService } from '../../modules/coding-challenges/services/challengeService.js'
import { getLeaderboardService, clearLeaderboardCache } from '../../modules/coding-challenges/services/progressService.js'
import { getCatalogService } from '../../modules/capstone/services/capstoneService.js'
import { listCandidatesService, clearCandidatePool } from '../../modules/recruiter/services/candidateService.js'
import { saveSettingsService } from '../../modules/recruiter/services/settingsService.js'
import analyticsRoutes from '../../modules/analytics/index.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let mongod
let client
let db

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('CachingTests')
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

/** A db whose reads are counted per collection name, in `calls`. */
const counting = (real) => {
  const calls = {}
  const counted = ['find', 'findOne', 'aggregate', 'distinct', 'countDocuments']
  return {
    calls,
    collection: (name) =>
      new Proxy(real.collection(name), {
        get(target, prop) {
          const value = target[prop]
          if (typeof value !== 'function') return value
          if (!counted.includes(prop)) return value.bind(target)
          return (...args) => {
            calls[name] = (calls[name] ?? 0) + 1
            return value.apply(target, args)
          }
        },
      }),
  }
}

const caching = (on) => {
  process.env.CACHE_ENABLED = on ? 'true' : 'false'
}

beforeEach(async () => {
  caching(true)
  clearRoadmapCache()
  clearLeaderboardCache()
  clearCandidatePool()
  for (const c of await db.collections()) await c.deleteMany({})
})

afterEach(() => {
  delete process.env.CACHE_ENABLED
})

describe('roadmap layers and tracks', () => {
  beforeEach(async () => {
    await db.collection('roadmap_layers').insertMany([
      { layerId: 't-1', title: 'One', trackId: 't', order: 1 },
      { layerId: 't-2', title: 'Two', trackId: 't', order: 2 },
    ])
    await db.collection('roadmap_tracks').insertMany([
      { trackId: 't', title: 'Track T', categoryId: 'cat' },
      { trackId: 'u', title: 'Track U', categoryId: 'cat' },
    ])
  })

  it('loads layers once, then serves the same ids from memory', async () => {
    const c = counting(db)
    const first = await getLayers(c, ['t-1', 't-2'])
    const second = await getLayers(c, ['t-2', 't-1'])
    expect([...first.keys()].sort()).toEqual(['t-1', 't-2'])
    expect(first.get('t-1')).toEqual({ layerId: 't-1', title: 'One', trackId: 't', order: 1 })
    expect(second.get('t-2').title).toBe('Two')
    expect(c.calls.roadmap_layers).toBe(1)
  })

  it('shares entries between different id sets and fetches only what is missing', async () => {
    const c = counting(db)
    await getLayers(c, ['t-1'])
    await getLayers(c, ['t-1', 't-2'])
    expect(c.calls.roadmap_layers).toBe(2) // the second call asked only for t-2
    await getLayers(c, ['t-2'])
    expect(c.calls.roadmap_layers).toBe(2)
  })

  it('remembers a layer that does not exist, so it is not asked for again', async () => {
    const c = counting(db)
    expect((await getLayers(c, ['nope'])).size).toBe(0)
    expect((await getLayers(c, ['nope'])).size).toBe(0)
    expect(c.calls.roadmap_layers).toBe(1)
  })

  it('does not query at all for no ids', async () => {
    const c = counting(db)
    expect((await getLayers(c, [])).size).toBe(0)
    expect((await getLayers(c, [undefined, null])).size).toBe(0)
    expect(c.calls.roadmap_layers).toBeUndefined()
  })

  it('keeps layers and tracks apart', async () => {
    const c = counting(db)
    expect((await getTracks(c, ['t'])).get('t')).toEqual({ trackId: 't', title: 'Track T', categoryId: 'cat' })
    expect((await getLayers(c, ['t'])).size).toBe(0) // "t" is a track id, not a layer id
  })

  it('exam history: titles are right, and a second call does not read roadmap_layers', async () => {
    const c = counting(db)
    const rows = [{ layer: 't-1' }, { layer: 'zzz' }, {}]
    const first = await withLayerTitles(c, rows)
    const second = await withLayerTitles(c, rows)
    expect(first.map((r) => r.layerTitle)).toEqual(['One', null, null])
    expect(second).toEqual(first)
    expect(c.calls.roadmap_layers).toBe(1)
    expect(rows[0]).toEqual({ layer: 't-1' }) // the caller's rows are untouched
  })

  it('challenge track list: titles from the cache, per-user part still computed each time', async () => {
    await db.collection('challenges').insertMany([
      { slug: 'a', status: 'published', trackId: 't' },
      { slug: 'b', status: 'published', trackId: 'u' },
    ])
    const c = counting(db)
    const user = new ObjectId()
    const first = await listTracksService(c, user)
    const second = await listTracksService(c, new ObjectId())
    expect(first.tracks.map((t) => t.title).sort()).toEqual(['Track T', 'Track U'])
    expect(second.tracks.map((t) => t.title).sort()).toEqual(['Track T', 'Track U'])
    expect(c.calls.roadmap_tracks).toBe(1)
    expect(c.calls.userProgress).toBe(2) // who is asking is never cached
  })

  it('capstone catalog: track titles come from the cache', async () => {
    await db.collection('capstone_briefs').insertOne({ trackId: 't', title: 'Build it', summary: 's', version: 1, status: 'published' })
    const c = counting(db)
    const first = await getCatalogService(c)
    const second = await getCatalogService(c)
    expect(first).toEqual(second)
    expect(first[0]).toMatchObject({ trackId: 't', trackTitle: 'Track T', categoryId: 'cat' })
    expect(c.calls.roadmap_tracks).toBe(1)
  })

  it('reads the database every time when caching is off', async () => {
    caching(false)
    const c = counting(db)
    await getLayers(c, ['t-1'])
    await getLayers(c, ['t-1'])
    expect(c.calls.roadmap_layers).toBe(2)
  })
})

describe('leaderboard ranking', () => {
  let ada
  let bob
  let cyd

  beforeEach(async () => {
    ;[ada, bob, cyd] = [new ObjectId(), new ObjectId(), new ObjectId()]
    await db.collection('users').insertMany([
      { _id: ada, username: 'ada', firstName: 'Ada', lastName: 'L' },
      { _id: bob, username: 'bob', firstName: 'Bob', lastName: 'B' },
      { _id: cyd, username: 'cyd', firstName: 'Cyd', lastName: 'C' },
    ])
    const now = new Date()
    const solved = (userId, layer, xpEarned) => ({ userId, challengeId: `${layer}-${xpEarned}`, layer, status: 'solved', xpEarned, solvedAt: now })
    await db.collection('challengeResults').insertMany([
      solved(ada, 'x-1', 50),
      solved(bob, 'x-1', 30),
      solved(cyd, 'y-1', 100), // top globally, but in another layer
    ])
  })

  const board = (database, userId, options = {}) => getLeaderboardService(database, userId, { scope: 'global', range: '7d', limit: 5, ...options })

  it('ranks once, then serves the next requests from memory', async () => {
    const c = counting(db)
    const first = await board(c, ada)
    const second = await board(c, ada)
    expect(first.rows.map((r) => r.username)).toEqual(['cyd', 'ada', 'bob'])
    expect(second).toEqual(first)
    expect(c.calls.challengeResults).toBe(1)
  })

  it('never caches who is asking: the "you" flag and the self row are per request', async () => {
    const c = counting(db)
    const asAda = await board(c, ada, { limit: 1 })
    const asBob = await board(c, bob, { limit: 1 })
    expect(c.calls.challengeResults).toBe(1) // one ranking, two askers

    expect(asAda.rows.map((r) => [r.username, r.you])).toEqual([['cyd', false], ['ada', true]]) // ada is outside the top 1, so she is added
    expect(asBob.rows.map((r) => [r.username, r.you])).toEqual([['cyd', false], ['bob', true]])
    expect(asBob.rows.some((r) => r.username === 'ada')).toBe(false) // ada's own row never leaks onto bob's board
  })

  it('does not change the cached ranking when a caller changes its result', async () => {
    const c = counting(db)
    const first = await board(c, ada)
    first.rows[0].score = -1
    first.rows.pop()
    const second = await board(c, ada)
    expect(second.rows).toHaveLength(3)
    expect(second.rows[0].score).toBe(100)
  })

  it('keeps windows and scopes apart', async () => {
    await db.collection('roadmap_layers').insertOne({ layerId: 'x-1', trackId: 'x', order: 1, title: 'X1' })
    await db.collection('userProgress').insertOne({ userId: ada, activePath: 'x', currentLayer: 1 })
    const c = counting(db)

    const global = await board(c, ada)
    await board(c, ada, { range: '30d' })
    const inLayer = await getLeaderboardService(c, ada, { scope: 'layer', range: '7d', limit: 5 })

    expect(c.calls.challengeResults).toBe(3) // three different boards
    expect(inLayer.layerId).toBe('x-1')
    expect(global.rows.map((r) => r.username)).toContain('cyd')
    expect(inLayer.rows.map((r) => r.username)).not.toContain('cyd') // cyd solved in another layer
  })

  it('shows a new solve at once after the cache is cleared, and not before', async () => {
    const c = counting(db)
    await board(c, ada)
    await db.collection('challengeResults').insertOne({ userId: bob, challengeId: 'big', layer: 'x-1', status: 'solved', xpEarned: 500, solvedAt: new Date() })

    expect((await board(c, ada)).rows[0].username).toBe('cyd') // still the cached board (up to 60 s old)
    clearLeaderboardCache()
    const fresh = await board(c, ada)
    expect(fresh.rows[0]).toMatchObject({ username: 'bob', score: 530 })
    expect(c.calls.challengeResults).toBe(2)
  })

  it('gives the same answer with caching on and off', async () => {
    const withCache = await board(db, bob)
    caching(false)
    const without = await board(db, bob)
    expect(withCache).toEqual(without)
  })
})

describe('admin funnel', () => {
  let app
  let counted
  let adminToken
  let userToken

  beforeEach(async () => {
    const admin = new ObjectId()
    const member = new ObjectId()
    await db.collection('users').insertMany([
      { _id: admin, role: 'admin' },
      { _id: member },
    ])
    await db.collection('userEvents').insertOne({ userId: member, type: 'signup', createdAt: new Date() })
    adminToken = `Bearer ${createAccessToken({ id: admin.toString() })}`
    userToken = `Bearer ${createAccessToken({ id: member.toString() })}`

    counted = counting(db)
    app = express()
    app.locals.db = counted
    app.use('/api/admin', analyticsRoutes)
  })

  const funnel = (days, token = adminToken) => request(app).get(`/api/admin/funnel?days=${days}`).set('Authorization', token)

  it('computes the funnel once per window, and again for another window', async () => {
    const first = await funnel(30)
    const second = await funnel(30)
    expect(first.status).toBe(200)
    expect(first.body.signedUp).toBe(1)
    expect(second.body).toEqual(first.body)
    expect(counted.calls.userEvents).toBe(2) // one distinct + one find, for ONE computation

    await funnel(7)
    expect(counted.calls.userEvents).toBe(4)
  })

  it('still answers 404 to a non-admin, whatever is cached', async () => {
    await funnel(30) // primes the cache
    expect((await funnel(30, userToken)).status).toBe(404)
  })

  it('still rejects a bad window, and does not cache the rejection', async () => {
    expect((await funnel(0)).status).toBe(400)
    expect((await funnel(9999)).status).toBe(400)
    expect(counted.calls.userEvents).toBeUndefined()
  })
})

describe('recruiter candidate pool', () => {
  let ada
  let bob

  beforeEach(async () => {
    ;[ada, bob] = [new ObjectId(), new ObjectId()]
    await db.collection('users').insertMany([
      { _id: ada, username: 'ada', firstName: 'Ada', lastName: 'Lovelace' },
      { _id: bob, username: 'bob', firstName: 'Bob', lastName: 'Builder' },
    ])
    const now = new Date()
    await db.collection('recruiter_settings').insertMany([
      { userId: ada, enabled: true, openToWork: true, updatedAt: now },
      { userId: bob, enabled: true, openToWork: false, updatedAt: new Date(now - 1000) },
    ])
  })

  const names = (result) => result.items.map((r) => r.username).sort()

  it('builds the pool once: other filters, sorts and pages do not rebuild it', async () => {
    const c = counting(db)
    const first = await listCandidatesService(c, {})
    expect(names(first)).toEqual(['ada', 'bob'])
    const afterFirst = { ...c.calls }

    const filtered = await listCandidatesService(c, { openToWork: true })
    const sorted = await listCandidatesService(c, { sort: 'layers', page: 1, limit: 1 })
    expect(names(filtered)).toEqual(['ada'])
    expect(sorted.total).toBe(2)

    expect(c.calls.users).toBe(afterFirst.users) // no scorecards were rebuilt
    expect(c.calls.recruiter_settings).toBe(afterFirst.recruiter_settings + 2) // only the opt-in check, once per request
  })

  it('does not put a user id in the rows the API returns', async () => {
    const { items } = await listCandidatesService(db, {})
    for (const row of items) expect(Object.keys(row)).not.toContain('userId')
  })

  it('removes a developer who opts out at once (settings saved through the service)', async () => {
    const c = counting(db)
    expect(names(await listCandidatesService(c, {}))).toEqual(['ada', 'bob'])
    await saveSettingsService(c, ada, { enabled: false, openToWork: true, show: {} })
    expect(names(await listCandidatesService(c, {}))).toEqual(['bob'])
  })

  it('removes them at once even if the cache was never cleared (another process, or a deleted account)', async () => {
    const c = counting(db)
    await listCandidatesService(c, {}) // primes the cache
    await db.collection('recruiter_settings').updateOne({ userId: ada }, { $set: { enabled: false } })
    expect(names(await listCandidatesService(c, {}))).toEqual(['bob'])

    await db.collection('recruiter_settings').deleteOne({ userId: bob }) // account deletion removes the settings
    expect((await listCandidatesService(c, {})).total).toBe(0)
  })

  it('gives the same answer with caching on and off', async () => {
    const withCache = await listCandidatesService(db, { sort: 'active' })
    caching(false)
    const without = await listCandidatesService(db, { sort: 'active' })
    expect(withCache).toEqual(without)
  })
})
