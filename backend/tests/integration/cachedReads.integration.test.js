/**
 * Caching of the shared read paths: the library catalogue, the public blog list
 * and the challenge catalogue (page, tag counts, track counts, daily pick).
 *
 * A spy around `db` counts the read queries each call makes, so "served from
 * memory" means "made no new query", not "returned the same thing". Caching is
 * off under Vitest by default, so every test turns it on.
 *
 * What must never be cached is tested as hard as what must be: per-learner
 * flags, the status filter, and free-text search.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, afterEach } from 'vitest'
import process from 'node:process'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import {
  getResourcesService,
  getResourceCountsByTypeService,
  clearLibraryCache,
} from '../../modules/library/services/libraryService.js'
import {
  getBlogsService,
  toggleLikeService,
  deleteBlogService,
  clearBlogListCache,
} from '../../modules/blogs/services/blogService.js'
import { postCommentService } from '../../modules/blogs/services/commentService.js'
import {
  listChallengesService,
  listTracksService,
  getTagCountsService,
  getDailyChallengeService,
} from '../../modules/coding-challenges/services/challengeService.js'

let mongod
let client
let db

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')
  await db.collection('libraryResources').createIndex({ title: 'text' })
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  process.env.CACHE_ENABLED = 'true'
  clearLibraryCache()
  clearBlogListCache()
  await Promise.all(
    ['libraryResources', 'blogs', 'comments', 'challenges', 'challengeResults', 'challenge_attempts', 'roadmap_tracks'].map(
      (c) => db.collection(c).deleteMany({}),
    ),
  )
})

afterEach(() => {
  delete process.env.CACHE_ENABLED
})

/** A db whose read queries are recorded as "collection.method". */
const READS = new Set(['aggregate', 'countDocuments', 'find', 'findOne', 'distinct'])
const spyOn = (real) => {
  const calls = []
  const spy = {
    collection: (name) =>
      new Proxy(real.collection(name), {
        get(target, prop) {
          const value = target[prop]
          if (typeof value !== 'function') return value
          return (...args) => {
            if (READS.has(prop)) calls.push(`${name}.${prop}`)
            return value.apply(target, args)
          }
        },
      }),
  }
  return { spy, calls, of: (name) => calls.filter((c) => c.startsWith(`${name}.`)).length }
}

// ───────────────────────────── library ─────────────────────────────

const seedLibrary = () =>
  db.collection('libraryResources').insertMany(
    ['alpha', 'bravo', 'charlie'].map((title, i) => ({
      title,
      type: i === 0 ? 'book' : 'guide',
      paths: ['mern'],
      difficulty: i === 2 ? 'advanced' : 'beginner',
      topics: ['js'],
      is_free: true,
      layerIds: ['mern-2'],
      agent_citation_count: 3 - i,
      createdAt: new Date(2026, 0, i + 1),
    })),
  )

describe('library catalogue', () => {
  beforeEach(seedLibrary)

  it('serves a repeated list from memory', async () => {
    const { spy, calls } = spyOn(db)
    const first = await getResourcesService(spy, {})
    const queries = calls.length
    expect(queries).toBeGreaterThan(0)

    expect(await getResourcesService(spy, {})).toEqual(first)
    expect(calls.length).toBe(queries)
  })

  it('keeps pages and filters apart', async () => {
    const { spy, of } = spyOn(db)
    const all = await getResourcesService(spy, { limit: 2 })
    const page2 = await getResourcesService(spy, { limit: 2, page: 2 })
    const advanced = await getResourcesService(spy, { limit: 2, difficulty: 'advanced' })

    expect(all.data).toHaveLength(2)
    expect(page2.data).toHaveLength(1)
    expect(advanced.data.map((r) => r.title)).toEqual(['charlie'])
    expect(of('libraryResources')).toBeGreaterThanOrEqual(6) // three distinct queries, not one reused
  })

  it('reads equivalent queries as one', async () => {
    const { spy, calls } = spyOn(db)
    await getResourcesService(spy, { type: 'book', page: '1' })
    const queries = calls.length
    await getResourcesService(spy, { type: ['book'], page: 1, limit: '20', is_free: undefined })
    expect(calls.length).toBe(queries)
  })

  it('never lets a list share a key with a string that queries differently', async () => {
    const { spy, calls } = spyOn(db)
    await getResourcesService(spy, { difficulty: 'beginner,advanced' }) // matches nothing
    const queries = calls.length
    await getResourcesService(spy, { difficulty: ['beginner', 'advanced'] })
    expect(calls.length).toBeGreaterThan(queries)
  })

  it('goes to the database for every text search', async () => {
    const { spy, calls } = spyOn(db)
    await getResourcesService(spy, { q: 'alpha' })
    const queries = calls.length
    await getResourcesService(spy, { q: 'alpha' })
    expect(calls.length).toBe(queries * 2)
  })

  it('caches the type counts, and clearing the cache reloads them', async () => {
    const { spy, calls } = spyOn(db)
    const counts = await getResourceCountsByTypeService(spy)
    expect(counts).toMatchObject({ total: 3, book: 1, guide: 2 })
    const queries = calls.length
    await getResourceCountsByTypeService(spy)
    expect(calls.length).toBe(queries)

    await db.collection('libraryResources').insertOne({ title: 'delta', type: 'guide', createdAt: new Date() })
    expect((await getResourceCountsByTypeService(spy)).total).toBe(3) // still the cached count
    clearLibraryCache()
    expect((await getResourceCountsByTypeService(spy)).total).toBe(4)
  })
})

// ───────────────────────────── blogs ─────────────────────────────

const AUTHOR = new ObjectId()
const seedBlogs = async () => {
  const docs = ['one', 'two', 'three'].map((title, i) => ({
    title,
    slug: title,
    status: 'published',
    category: i === 0 ? 'Web' : 'AI',
    tags: ['js'],
    layerIds: [],
    likes: [],
    comments: [],
    views: i,
    readTime: 3,
    author: AUTHOR,
    createdAt: new Date(2026, 0, i + 1),
  }))
  const { insertedIds } = await db.collection('blogs').insertMany(docs)
  return Object.values(insertedIds)
}

describe('public blog list', () => {
  let ids
  beforeEach(async () => {
    ids = await seedBlogs()
  })

  it('serves a repeated list from memory and keeps parameters apart', async () => {
    const { spy, calls } = spyOn(db)
    const first = await getBlogsService(spy, {})
    const queries = calls.length
    expect(first.data).toHaveLength(3)

    expect(await getBlogsService(spy, {})).toEqual(first)
    expect(calls.length).toBe(queries) // same query: no new reads

    const web = await getBlogsService(spy, { category: 'Web' })
    expect(web.data.map((b) => b.title)).toEqual(['one'])
    const oldest = await getBlogsService(spy, { sort: 'Oldest' })
    expect(oldest.data.map((b) => b.title)).toEqual(['one', 'two', 'three'])
    expect((await getBlogsService(spy, { page: 2, limit: 2 })).data).toHaveLength(1)
    expect(calls.length).toBe(queries * 4) // the first call and three variations each really queried
  })

  it('treats "Most Viewed" and "Trending" as the same list, and an unknown sort as the default', async () => {
    const { spy, calls } = spyOn(db)
    await getBlogsService(spy, { sort: 'Most Viewed' })
    const queries = calls.length
    await getBlogsService(spy, { sort: 'Trending' })
    expect(calls.length).toBe(queries)

    await getBlogsService(spy, {})
    const afterDefault = calls.length
    await getBlogsService(spy, { sort: 'nonsense' })
    expect(calls.length).toBe(afterDefault)
  })

  it('does not let a sort given as a list borrow the entry of a real sort', async () => {
    await db.collection('blogs').updateOne({ _id: ids[0] }, { $set: { likes: [new ObjectId(), new ObjectId()] } })
    const { spy } = spyOn(db)
    const popular = await getBlogsService(spy, { sort: 'Popular' })
    expect(popular.data[0].title).toBe('one') // the most liked comes first

    // An array is not "Popular" to the query, so it is the default (newest first) order.
    const asList = await getBlogsService(spy, { sort: ['Popular'] })
    expect(asList.data.map((b) => b.title)).toEqual(['three', 'two', 'one'])
  })

  it('goes to the database for every title search', async () => {
    const { spy, calls } = spyOn(db)
    await getBlogsService(spy, { q: 'one' })
    const queries = calls.length
    await getBlogsService(spy, { q: 'one' })
    expect(calls.length).toBe(queries * 2)
  })

  it('shows a like at once', async () => {
    const { spy } = spyOn(db)
    expect((await getBlogsService(spy, {})).data.every((b) => b.likes.length === 0)).toBe(true)
    await toggleLikeService(spy, ids[0].toString(), new ObjectId().toString())
    const after = await getBlogsService(spy, {})
    expect(after.data.find((b) => b.title === 'one').likes).toHaveLength(1)
  })

  it('shows a comment at once', async () => {
    const { spy } = spyOn(db)
    await getBlogsService(spy, {})
    await postCommentService(spy, ids[1].toString(), new ObjectId().toString(), 'hello')
    expect((await getBlogsService(spy, {})).data.find((b) => b.title === 'two').comments).toHaveLength(1)
  })

  it('drops a deleted post at once', async () => {
    const { spy } = spyOn(db)
    expect((await getBlogsService(spy, {})).pagination.total).toBe(3)
    await deleteBlogService(spy, ids[2].toString(), AUTHOR)
    expect((await getBlogsService(spy, {})).pagination.total).toBe(2)
  })
})

// ───────────────────────────── challenges ─────────────────────────────

const challenge = (slug, extra = {}) => ({
  slug,
  trackId: 'track-x',
  layerId: 'track-x-2',
  type: 'JS',
  difficulty: 'easy',
  title: slug,
  summary: slug,
  tags: ['closures'],
  estimatedMins: 10,
  xp: 5,
  stats: { solves: 0 },
  status: 'published',
  ...extra,
})

const seedChallenges = () => db.collection('challenges').insertMany(['a', 'b', 'c'].map((s) => challenge(s)))

describe('challenge catalogue', () => {
  beforeEach(seedChallenges)

  it('shares the page between learners but keeps their flags their own', async () => {
    const alice = new ObjectId()
    const bob = new ObjectId()
    await db.collection('challengeResults').insertOne({ userId: alice, challengeId: 'a', status: 'solved', solvedAt: new Date() })

    const { spy, of } = spyOn(db)
    const query = { track: 'track-x', page: 1, limit: 10 }
    const forAlice = await listChallengesService(spy, query, alice.toString())
    const readsAfterAlice = of('challenges')
    expect(forAlice.items.find((i) => i.slug === 'a').done).toBe(true)

    const forBob = await listChallengesService(spy, query, bob.toString())
    expect(of('challenges')).toBe(readsAfterAlice) // Bob's page came from memory
    expect(forBob.items.find((i) => i.slug === 'a').done).toBe(false) // but his flags are his own
    expect(forBob.total).toBe(3)
  })

  it('does not hand one learner an object another learner could change', async () => {
    const { spy } = spyOn(db)
    const query = { track: 'track-x', page: 1, limit: 10 }
    const first = await listChallengesService(spy, query, new ObjectId().toString())
    first.items[0].done = 'tampered'
    first.items.pop()
    const second = await listChallengesService(spy, query, new ObjectId().toString())
    expect(second.items).toHaveLength(3)
    expect(second.items.every((i) => i.done === false)).toBe(true)
  })

  it('keeps filters and pages apart', async () => {
    await db.collection('challenges').insertOne(challenge('d', { difficulty: 'hard', tags: ['async'] }))
    const { spy } = spyOn(db)
    const user = new ObjectId().toString()
    const hard = await listChallengesService(spy, { track: 'track-x', difficulty: 'hard', page: 1, limit: 10 }, user)
    const tagged = await listChallengesService(spy, { track: 'track-x', tags: ['async'], page: 1, limit: 10 }, user)
    const page2 = await listChallengesService(spy, { track: 'track-x', page: 2, limit: 2 }, user)
    expect(hard.items.map((i) => i.slug)).toEqual(['d'])
    expect(tagged.items.map((i) => i.slug)).toEqual(['d'])
    expect(page2.items).toHaveLength(2)
  })

  it('never caches the status filter, which is about one learner', async () => {
    const alice = new ObjectId()
    const bob = new ObjectId()
    await db.collection('challengeResults').insertOne({ userId: alice, challengeId: 'a', status: 'solved', solvedAt: new Date() })
    const { spy } = spyOn(db)
    const query = { track: 'track-x', status: ['completed'], page: 1, limit: 10 }

    expect((await listChallengesService(spy, query, alice.toString())).items.map((i) => i.slug)).toEqual(['a'])
    expect((await listChallengesService(spy, query, bob.toString())).items).toEqual([]) // not Alice's page
  })

  it('never caches a text search', async () => {
    const { spy, of } = spyOn(db)
    const query = { track: 'track-x', q: 'a', page: 1, limit: 10 }
    const user = new ObjectId().toString()
    await listChallengesService(spy, query, user)
    const reads = of('challenges')
    await listChallengesService(spy, query, user)
    expect(of('challenges')).toBe(reads * 2)
  })

  it('caches the tag counts per filter, and not when the filter is per learner', async () => {
    const { spy, of } = spyOn(db)
    const counts = await getTagCountsService(spy, { track: 'track-x' })
    expect(counts).toEqual({ total: 3, tags: [{ label: 'closures', count: 3 }] })
    const reads = of('challenges')
    await getTagCountsService(spy, { track: 'track-x' })
    expect(of('challenges')).toBe(reads)

    await getTagCountsService(spy, { track: 'track-x', difficulty: 'hard' })
    expect(of('challenges')).toBeGreaterThan(reads)
  })

  it('shares the track counts and leaves "mine" to each learner', async () => {
    const { spy, of } = spyOn(db)
    const first = await listTracksService(spy, new ObjectId().toString())
    const reads = of('challenges')
    expect(first.tracks).toEqual([{ trackId: 'track-x', title: 'track-x', count: 3, isMine: false }])

    const second = await listTracksService(spy, new ObjectId().toString())
    expect(of('challenges')).toBe(reads)
    expect(second.tracks[0]).toMatchObject({ trackId: 'track-x', count: 3, isMine: false })
  })
})

describe('daily challenge', () => {
  const DAY = 86_400_000
  const day = (n) => Date.UTC(2026, 5, 1) + n * DAY

  beforeEach(seedChallenges)

  it('is picked once per UTC day, for everyone', async () => {
    const { spy, of } = spyOn(db)
    const morning = await getDailyChallengeService(spy, day(10) + 1000)
    const reads = of('challenges')
    expect(morning).not.toBeNull()

    const lateNight = await getDailyChallengeService(spy, day(10) + DAY - 1)
    expect(lateNight.slug).toBe(morning.slug)
    expect(of('challenges')).toBe(reads) // 23:59:59.999 is still that day: no new query
  })

  it('moves on at UTC midnight', async () => {
    const { spy, of } = spyOn(db)
    const today = await getDailyChallengeService(spy, day(20) + 5000)
    const reads = of('challenges')
    const tomorrow = await getDailyChallengeService(spy, day(21) + 5000)
    expect(of('challenges')).toBeGreaterThan(reads)
    expect(tomorrow.slug).not.toBe(today.slug)
  })

  it('keeps a day only until its midnight', async () => {
    // 150 ms before midnight, the entry may live 150 ms: not 60 s (the default) and not 24 h.
    const nearMidnight = day(30) + DAY - 150
    const { spy, of } = spyOn(db)
    await getDailyChallengeService(spy, nearMidnight)
    const reads = of('challenges')
    await getDailyChallengeService(spy, nearMidnight)
    expect(of('challenges')).toBe(reads) // still inside its lifetime

    await new Promise((resolve) => setTimeout(resolve, 300))
    await getDailyChallengeService(spy, nearMidnight)
    expect(of('challenges')).toBeGreaterThan(reads) // past midnight: asked again
  })

  it('does not remember "nothing is published yet"', async () => {
    await db.collection('challenges').deleteMany({})
    const { spy } = spyOn(db)
    const now = day(40) + 1000
    expect(await getDailyChallengeService(spy, now)).toBeNull()

    await seedChallenges()
    expect(await getDailyChallengeService(spy, now)).not.toBeNull()
  })
})
