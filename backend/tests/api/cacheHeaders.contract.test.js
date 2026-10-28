/**
 * Cache-Control on the public catalogue routes, and nowhere else.
 *
 * Mounts the REAL routers over an in-memory MongoDB. A header on the wrong
 * route is a worse bug than a missing one: a browser that holds a per-user
 * response for a minute shows the next person on that computer someone else's
 * data. So this checks the absences as carefully as the presences: signed-in
 * routes, single items, and writes never get a header.
 *
 * It also runs one request path end to end with the server cache ON, to show
 * that a learner's flags never leak to another.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import process from 'node:process'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import libraryRoutes from '../../modules/library/routes/library.routes.js'
import { blogRoutes } from '../../modules/blogs/index.js'
import challengeRoutes from '../../modules/coding-challenges/routes/challenge.routes.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let mongod
let client
let db
let app

const bearer = (id = new ObjectId()) => `Bearer ${createAccessToken({ id: id.toString() })}`
const cacheControl = (res) => res.headers['cache-control']

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')

  app = express()
  app.use(express.json())
  app.locals.db = db
  app.use('/library', libraryRoutes)
  app.use('/blogs', blogRoutes)
  app.use('/api/challenges', challengeRoutes)
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  await Promise.all(
    ['libraryResources', 'blogs', 'challenges', 'challengeResults', 'challenge_attempts', 'roadmap_tracks'].map((c) =>
      db.collection(c).deleteMany({}),
    ),
  )
})

afterEach(() => {
  delete process.env.CACHE_ENABLED
})

describe('library', () => {
  it('lets a browser keep the public list and the counts for a minute', async () => {
    const list = await request(app).get('/library')
    const counts = await request(app).get('/library/counts')
    expect(list.status).toBe(200)
    expect(counts.status).toBe(200)
    expect(cacheControl(list)).toBe('public, max-age=60, stale-while-revalidate=300')
    expect(cacheControl(counts)).toBe('public, max-age=60, stale-while-revalidate=300')
  })

  it('puts nothing on signed-in routes, single items or writes', async () => {
    const id = new ObjectId().toString()
    const savedIds = await request(app).get('/library/saved-ids').set('Authorization', bearer())
    const one = await request(app).get(`/library/${id}`)
    const save = await request(app).post(`/library/${id}/save`).set('Authorization', bearer())

    for (const res of [savedIds, one, save]) expect(cacheControl(res)).toBeUndefined()
  })
})

describe('blogs', () => {
  it('lets a browser keep the public list for a few seconds', async () => {
    const res = await request(app).get('/blogs')
    expect(res.status).toBe(200)
    expect(cacheControl(res)).toBe('public, max-age=15, stale-while-revalidate=60')
  })

  it('puts nothing on a learner\'s own posts, a single post, or a write', async () => {
    const mine = await request(app).get('/blogs/my-blogs').set('Authorization', bearer())
    const one = await request(app).get(`/blogs/id/${new ObjectId()}`)
    const create = await request(app).post('/blogs').set('Authorization', bearer()).send({ title: 't' })
    const like = await request(app).post(`/blogs/${new ObjectId()}/like`).set('Authorization', bearer())

    for (const res of [mine, one, create, like]) expect(cacheControl(res)).toBeUndefined()
  })
})

describe('challenges (all behind sign-in)', () => {
  it('never gets a header, however public the data looks', async () => {
    const token = bearer()
    const daily = await request(app).get('/api/challenges/daily').set('Authorization', token)
    const list = await request(app).get('/api/challenges').set('Authorization', token)
    const tracks = await request(app).get('/api/challenges/tracks').set('Authorization', token)
    const tags = await request(app).get('/api/challenges/topics').set('Authorization', token)

    for (const res of [daily, list, tracks, tags]) {
      expect(res.status).toBe(200)
      expect(cacheControl(res)).toBeUndefined()
    }
  })

  it('still asks for a sign-in', async () => {
    expect((await request(app).get('/api/challenges/daily')).status).toBe(401)
  })

  it('keeps one learner\'s solved flags from another, with the server cache on', async () => {
    process.env.CACHE_ENABLED = 'true'
    const alice = new ObjectId()
    const bob = new ObjectId()
    await db.collection('challenges').insertMany(
      ['cache-a', 'cache-b'].map((slug) => ({
        slug,
        trackId: 'cache-track',
        layerId: 'cache-track-1',
        type: 'JS',
        difficulty: 'easy',
        title: slug,
        summary: slug,
        tags: [],
        estimatedMins: 10,
        xp: 5,
        stats: { solves: 0 },
        status: 'published',
      })),
    )
    await db.collection('challengeResults').insertOne({ userId: alice, challengeId: 'cache-a', status: 'solved', solvedAt: new Date() })

    const ask = (who) => request(app).get('/api/challenges?track=cache-track').set('Authorization', bearer(who))
    const doneBy = (res) => Object.fromEntries(res.body.items.map((i) => [i.slug, i.done]))

    const forAlice = await ask(alice)
    expect(forAlice.status).toBe(200)
    expect(doneBy(forAlice)).toEqual({ 'cache-a': true, 'cache-b': false })

    // Bob's request is served from the shared page; the flags are still his.
    expect(doneBy(await ask(bob))).toEqual({ 'cache-a': false, 'cache-b': false })
    expect(doneBy(await ask(alice))).toEqual({ 'cache-a': true, 'cache-b': false })
  })
})
