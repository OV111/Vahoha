/**
 * The catalog list filters, sorts and pages in the database, and defaults to
 * the learner's own path. Also covers the Path filter's options (/tracks)
 * and the query contract the route validates with Zod.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import {
  listChallengesService,
  listTracksService,
} from '../../modules/coding-challenges/services/challengeService.js'
import { listQuerySchema } from '../../modules/coding-challenges/schemas/challenge.schemas.js'

let mongod
let client
let db

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  await Promise.all(
    ['challenges', 'challengeResults', 'challenge_attempts', 'roadmap_layers', 'roadmap_tracks', 'userProgress', 'weakSpots'].map(
      (c) => db.collection(c).deleteMany({}),
    ),
  )
})

const userId = new ObjectId()

const make = (slug, overrides = {}) => ({
  slug,
  trackId: 'node-dev',
  layerId: 'node-dev-1',
  status: 'published',
  type: 'CODE',
  difficulty: 'med',
  title: `Title ${slug}`,
  summary: `Summary ${slug}`,
  tags: ['async'],
  estimatedMins: 25,
  xp: 45,
  stats: { solves: 0 },
  ...overrides,
})

// The learner is on layer 1 of node-dev.
const onNodeDev = () =>
  Promise.all([
    db.collection('roadmap_layers').insertOne({ layerId: 'node-dev-1', trackId: 'node-dev', order: 1 }),
    db.collection('userProgress').insertOne({ userId, activePath: 'node-dev', currentLayer: 1 }),
  ])

const list = (query = {}) => listChallengesService(db, query, userId.toString())
const slugs = (res) => res.items.map((i) => i.slug)

describe('default path', () => {
  it("shows only the learner's own path when no track is given", async () => {
    await onNodeDev()
    await db.collection('challenges').insertMany([make('mine'), make('other', { trackId: 'mern' })])

    const res = await list()

    expect(slugs(res)).toEqual(['mine'])
    expect(res.track).toBe('node-dev')
    expect(res.myTrack).toBe('node-dev')
  })

  it('shows every path for track=all, and another path when asked', async () => {
    await onNodeDev()
    await db.collection('challenges').insertMany([make('mine'), make('other', { trackId: 'mern' })])

    expect(slugs(await list({ track: 'all' })).sort()).toEqual(['mine', 'other'])
    expect(slugs(await list({ track: 'mern' }))).toEqual(['other'])
  })

  it("falls back to every path when the learner's path has no challenges", async () => {
    await onNodeDev()
    await db.collection('challenges').insertMany([make('a', { trackId: 'mern' })])

    const res = await list()

    expect(res.track).toBe('all')
    expect(res.myTrack).toBe('node-dev')
    expect(slugs(res)).toEqual(['a'])
  })

  it('falls back to every path for a learner with no roadmap yet', async () => {
    await db.collection('challenges').insertMany([make('a'), make('b', { trackId: 'mern' })])

    const res = await list()

    expect(res.track).toBe('all')
    expect(res.total).toBe(2)
  })
})

describe('paging and sort', () => {
  it('pages without repeating or dropping items, beyond the old 100 cap', async () => {
    await db
      .collection('challenges')
      .insertMany(Array.from({ length: 130 }, (_, i) => make(`c-${String(i).padStart(3, '0')}`)))

    const seen = []
    for (let page = 1; page <= 6; page++) seen.push(...slugs(await list({ track: 'all', page, limit: 24 })))

    expect(seen).toHaveLength(130)
    expect(new Set(seen).size).toBe(130)
  })

  it('sorts easy, med, hard (not alphabetically)', async () => {
    await db
      .collection('challenges')
      .insertMany([make('h', { difficulty: 'hard' }), make('e', { difficulty: 'easy' }), make('m', { difficulty: 'med' })])

    expect(slugs(await list({ track: 'all' }))).toEqual(['e', 'm', 'h'])
  })
})

describe('filters', () => {
  it('filters by layer number, including 4+', async () => {
    await db.collection('challenges').insertMany([
      make('l1'),
      make('l4', { layerId: 'node-dev-4' }),
      make('l12', { layerId: 'node-dev-12' }),
    ])

    expect(slugs(await list({ track: 'all', layer: '1' }))).toEqual(['l1'])
    expect(slugs(await list({ track: 'all', layer: '4+' })).sort()).toEqual(['l12', 'l4'])
  })

  it('filters by type, difficulty, tags and time', async () => {
    await db.collection('challenges').insertMany([
      make('debug', { type: 'DEBUG' }),
      make('hard', { difficulty: 'hard' }),
      make('tagged', { tags: ['jwt'] }),
      make('quick', { estimatedMins: 10 }),
    ])

    expect(slugs(await list({ track: 'all', type: 'debug' }))).toEqual(['debug'])
    expect(slugs(await list({ track: 'all', difficulty: 'hard' }))).toEqual(['hard'])
    expect(slugs(await list({ track: 'all', tags: ['jwt'] }))).toEqual(['tagged'])
    expect(slugs(await list({ track: 'all', time: 'under15' }))).toEqual(['quick'])
  })

  it('filters by status, ORing several', async () => {
    await db.collection('challenges').insertMany([make('done'), make('started'), make('fresh')])
    await db.collection('challengeResults').insertOne({ userId, challengeId: 'done', status: 'solved' })
    await db.collection('challenge_attempts').insertMany([
      { userId, challengeSlug: 'done' },
      { userId, challengeSlug: 'started' },
    ])

    expect(slugs(await list({ track: 'all', status: ['completed'] }))).toEqual(['done'])
    expect(slugs(await list({ track: 'all', status: ['in-progress'] }))).toEqual(['started'])
    expect(slugs(await list({ track: 'all', status: ['not-started'] }))).toEqual(['fresh'])
    expect(slugs(await list({ track: 'all', status: ['completed', 'not-started'] })).sort()).toEqual(['done', 'fresh'])
  })

  it('recommended returns exactly the hot challenges', async () => {
    await onNodeDev()
    await db.collection('challenges').insertMany([
      make('current'),
      make('later', { layerId: 'node-dev-5' }),
      make('solved'),
    ])
    await db.collection('challengeResults').insertOne({ userId, challengeId: 'solved', status: 'solved' })

    const res = await list({ recommended: true })

    expect(slugs(res)).toEqual(['current'])
    expect(res.items.every((i) => i.hot)).toBe(true)
  })

  it('searches title, summary and tags as a literal substring', async () => {
    await db.collection('challenges').insertMany([
      make('lru', { title: 'LRU response cache' }),
      make('other'),
    ])

    expect(slugs(await list({ track: 'all', q: 'RESPONSE ca' }))).toEqual(['lru'])
    // Regex metacharacters are matched literally, never executed
    expect((await list({ track: 'all', q: '(a+)+$' })).total).toBe(0)
  })
})

describe('listTracksService', () => {
  it("lists tracks with counts and titles, the learner's own first", async () => {
    await onNodeDev()
    await db.collection('roadmap_tracks').insertMany([
      { trackId: 'node-dev', title: 'Node.js Developer' },
      { trackId: 'mern', title: 'MERN Stack' },
    ])
    await db.collection('challenges').insertMany([
      make('n1'),
      make('m1', { trackId: 'mern' }),
      make('m2', { trackId: 'mern' }),
      make('draft', { trackId: 'mern', status: 'draft' }),
    ])

    const { tracks, myTrack } = await listTracksService(db, userId.toString())

    expect(myTrack).toBe('node-dev')
    expect(tracks).toEqual([
      { trackId: 'node-dev', title: 'Node.js Developer', count: 1, isMine: true },
      { trackId: 'mern', title: 'MERN Stack', count: 2, isMine: false },
    ])
  })
})

describe('listQuerySchema', () => {
  it('parses comma lists and defaults paging', () => {
    const r = listQuerySchema.parse({ tags: 'jwt, async', status: 'completed,in-progress', recommended: 'true' })
    expect(r).toMatchObject({ tags: ['jwt', 'async'], status: ['completed', 'in-progress'], recommended: true, page: 1, limit: 24 })
  })

  it('rejects values that are not a known option', () => {
    expect(listQuerySchema.safeParse({ track: '{"$ne":null}' }).success).toBe(false)
    expect(listQuerySchema.safeParse({ status: 'deleted' }).success).toBe(false)
    expect(listQuerySchema.safeParse({ limit: '500' }).success).toBe(false)
  })
})
