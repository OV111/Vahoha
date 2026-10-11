/**
 * Concurrency tests — race conditions, atomicity, and simultaneous-load behavior.
 *
 * All tests use Promise.all() to fire operations simultaneously.  Node.js is
 * single-threaded but async I/O operations DO interleave at the event-loop level,
 * so TOCTOU (time-of-check / time-of-use) races are reproducible here.
 *
 * Two categories:
 *  • Tests that PASS  → confirm correct atomic behavior (MongoDB $inc, etc.)
 *  • Tests that EXPOSE vulnerabilities → document known race conditions so they
 *    can be fixed (unique index recommendations are included inline).
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import process from 'node:process'
import { signUp } from '../../modules/auth/controllers/auth.controller.js'
import connectDB from '../../config/db.js'
import { getFollowersData, getFollowingData } from '../../modules/users/services/followService.js'

let mongod
let client
let db // direct MongoClient db — used for setup/assertions and follow tests

// ─────────────────────────────────────────────
// Lifecycle
// ─────────────────────────────────────────────
beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  const uri = mongod.getUri()

  // For signUp (goes through connectDB singleton)
  process.env.MONGO_URI = uri
  await connectDB()

  // For direct DB operations (follow counts, follow docs)
  client = new MongoClient(uri)
  await client.connect()
  db = client.db('DevsBlog')
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  await db.collection('users').deleteMany({})
  await db.collection('usersStats').deleteMany({})
  await db.collection('follows').deleteMany({})
})

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────
const makePayload = (n) => ({
  firstName: `User${n}`,
  lastName: 'Test',
  email: `user${n}_${Date.now()}_${Math.random()}@test.com`,
  password: 'pass123',
  username: `user${n}`,
})

const makeUser = (suffix = '') => ({
  firstName: 'Test',
  lastName: 'User',
  username: `testuser_${suffix}_${Date.now()}_${Math.random()}`,
  email: `test_${suffix}_${Date.now()}_${Math.random()}@test.com`,
})

// ─────────────────────────────────────────────────────────────────────────────
// 1. signUp — concurrent requests with unique emails
// ─────────────────────────────────────────────────────────────────────────────
describe('signUp — concurrent unique-email requests', () => {
  it('all N requests succeed when every email is unique', async () => {
    const N = 8
    const payloads = Array.from({ length: N }, (_, i) => makePayload(i))

    const results = await Promise.all(payloads.map((p) => signUp(p)))

    const successes = results.filter((r) => r.status === 201)
    expect(successes).toHaveLength(N)

    const count = await db.collection('users').countDocuments()
    expect(count).toBe(N)
  })

  it('all tokens returned are valid and have distinct user ids', async () => {
    const N = 6
    const payloads = Array.from({ length: N }, (_, i) => makePayload(i))

    const results = await Promise.all(payloads.map((p) => signUp(p)))
    const tokens = results.map((r) => r.accessToken)
    const uniqueTokens = new Set(tokens)

    expect(uniqueTokens.size).toBe(N)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 2. signUp — same email, concurrent requests
//
// signUp checks findOne(email) and then inserts, which on its own is a race:
// several requests can pass the check together. The unique index on
// users.email (created by connectDB) closes it: one insert wins and the rest
// get a duplicate-key error, which signUp reports as 409.
// ─────────────────────────────────────────────────────────────────────────────
describe('signUp — race on duplicate email', () => {
  it('concurrent signups with the same email create exactly one user', async () => {
    const payload = {
      firstName: 'Race',
      lastName: 'Condition',
      email: 'race@test.com',
      password: 'pass123',
      username: 'race',
    }

    const results = await Promise.all([signUp(payload), signUp(payload), signUp(payload)])

    const count = await db.collection('users').countDocuments({ email: payload.email })
    expect(count).toBe(1)
    expect(results.filter((r) => r.status === 201)).toHaveLength(1)
    expect(results.filter((r) => r.status === 409)).toHaveLength(2)
  })

  it('five concurrent signups: one succeeds, the rest get 409', async () => {
    const payload = {
      firstName: 'Safe',
      lastName: 'User',
      email: 'safe@test.com',
      password: 'pass123',
      username: 'safeuser',
    }

    const results = await Promise.all(Array.from({ length: 5 }, () => signUp(payload)))

    const count = await db.collection('users').countDocuments({ email: payload.email })
    expect(count).toBe(1)
    expect(results.filter((r) => r.status === 201)).toHaveLength(1)
    expect(results.filter((r) => r.status === 409)).toHaveLength(4)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 3. signUp — concurrent requests with the same base username
// ─────────────────────────────────────────────────────────────────────────────
describe('signUp — username uniqueness under concurrent load', () => {
  it('all N signUps with the same base username produce unique usernames', async () => {
    const N = 10
    // All use username 'devuser' → sanitizes to 'devuser' as the base
    const payloads = Array.from({ length: N }, (_, i) => ({
      firstName: 'Dev',
      lastName: 'User',
      email: `devuser${i}_${Date.now()}@test.com`,
      password: 'pass123',
      username: 'devuser',
    }))

    const results = await Promise.all(payloads.map((p) => signUp(p)))

    expect(results.every((r) => r.status === 201)).toBe(true)

    const users = await db.collection('users').find({}).toArray()
    const usernames = users.map((u) => u.username)
    const uniqueUsernames = new Set(usernames)

    // Every user must have a distinct username
    expect(uniqueUsernames.size).toBe(N)
  })

  // The requested name goes to one signup; the rest get the next free number
  // (alice, alice1, alice2 ...), never a duplicate.
  it('generated usernames are the base name or base + number, all distinct', async () => {
    const N = 5
    const payloads = Array.from({ length: N }, (_, i) => ({
      firstName: 'Alice',
      lastName: 'Dev',
      email: `alice${i}_${Date.now()}@test.com`,
      password: 'pass123',
      username: 'alice',
    }))

    await Promise.all(payloads.map((p) => signUp(p)))

    const users = await db.collection('users').find({}).toArray()
    const usernames = users.map((u) => u.username)
    expect(users).toHaveLength(N)
    expect(new Set(usernames).size).toBe(N)
    usernames.forEach((name) => expect(name).toMatch(/^alice\d*$/))
    expect(usernames.filter((name) => name === 'alice')).toHaveLength(1)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 4. Follow counts — MongoDB $inc atomicity
//
// MongoDB's $inc is atomic at the document level.
// N concurrent increments must always produce exactly N, never less.
// ─────────────────────────────────────────────────────────────────────────────
describe('follow counts — $inc atomicity', () => {
  it('N concurrent $inc +1 operations produce exactly N', async () => {
    const userId = new ObjectId()
    await db.collection('usersStats').insertOne({ userId, followersCount: 0 })

    const N = 25
    await Promise.all(
      Array.from({ length: N }, () =>
        db.collection('usersStats').updateOne(
          { userId },
          { $inc: { followersCount: 1 } },
        ),
      ),
    )

    const stats = await db.collection('usersStats').findOne({ userId })
    expect(stats.followersCount).toBe(N)
  })

  it('concurrent follow + unfollow keeps count non-negative', async () => {
    const userId = new ObjectId()
    await db.collection('usersStats').insertOne({ userId, followersCount: 10 })

    // 10 decrements and 5 increments simultaneously
    await Promise.all([
      ...Array.from({ length: 10 }, () =>
        db.collection('usersStats').updateOne(
          { userId },
          { $inc: { followersCount: -1 } },
        )),
      ...Array.from({ length: 5 }, () =>
        db.collection('usersStats').updateOne(
          { userId },
          { $inc: { followersCount: 1 } },
        )),
    ])

    const stats = await db.collection('usersStats').findOne({ userId })
    // 10 - 10 + 5 = 5 regardless of operation order (all are atomic $inc)
    expect(stats.followersCount).toBe(5)
  })

  it('N concurrent followingsCount increments are also exact', async () => {
    const userId = new ObjectId()
    await db.collection('usersStats').insertOne({ userId, followingsCount: 0 })

    const N = 15
    await Promise.all(
      Array.from({ length: N }, () =>
        db.collection('usersStats').updateOne(
          { userId },
          { $inc: { followingsCount: 1 } },
        ),
      ),
    )

    const stats = await db.collection('usersStats').findOne({ userId })
    expect(stats.followingsCount).toBe(N)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 5. Duplicate follows — concurrent follow requests for the same pair
//
// In server.js, follow = insertOne(followerId, followingId) with no prior check.
// Without a unique compound index, two concurrent follow requests can both
// insert, producing duplicate follow documents.
//
// FIX RECOMMENDATION:
//   db.collection('follows').createIndex(
//     { followerId: 1, followingId: 1 }, { unique: true }
//   )
// ─────────────────────────────────────────────────────────────────────────────
describe('duplicate follows — concurrent follow requests', () => {
  // connectDB creates the unique index on follows, so the race is closed:
  // concurrent duplicates are rejected and exactly one document survives.
  it('concurrent duplicate follows are rejected by the unique index', async () => {
    const followerId = new ObjectId()
    const followingId = new ObjectId()

    const results = await Promise.allSettled(
      Array.from({ length: 4 }, () =>
        db.collection('follows').insertOne({
          followerId,
          followingId,
          createdAt: new Date(),
        }),
      ),
    )

    const count = await db.collection('follows').countDocuments({ followerId, followingId })
    expect(count).toBe(1)
    const rejected = results.filter((r) => r.status === 'rejected')
    expect(rejected).toHaveLength(3)
    rejected.forEach((r) => expect(r.reason.code).toBe(11000))
  })

  it('WITH unique index: only 1 follow document is created for the same pair', async () => {
    await db.collection('follows').createIndex(
      { followerId: 1, followingId: 1 },
      { unique: true },
    )

    const followerId = new ObjectId()
    const followingId = new ObjectId()

    // Fire 5 concurrent follow inserts for the same pair
    const results = await Promise.allSettled(
      Array.from({ length: 5 }, () =>
        db.collection('follows').insertOne({
          followerId,
          followingId,
          createdAt: new Date(),
        }),
      ),
    )

    const succeeded = results.filter((r) => r.status === 'fulfilled')
    const count = await db.collection('follows').countDocuments({ followerId, followingId })

    expect(count).toBe(1)
    expect(succeeded).toHaveLength(1)

    await db.collection('follows').dropIndex('followerId_1_followingId_1')
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// 6. Read concurrency — getFollowersData / getFollowingData under load
// ─────────────────────────────────────────────────────────────────────────────
describe('read concurrency — getFollowersData / getFollowingData', () => {
  it('20 concurrent getFollowersData calls return valid data without crashing', async () => {
    // Seed one user with some followers
    const targetId = new ObjectId()
    const followerIds = Array.from({ length: 5 }, () => new ObjectId())

    await db.collection('users').insertMany(
      followerIds.map((id) => ({ _id: id, ...makeUser(id.toString()) })),
    )
    await db.collection('follows').insertMany(
      followerIds.map((id) => ({ followerId: id, followingId: targetId, createdAt: new Date() })),
    )

    const results = await Promise.all(
      Array.from({ length: 20 }, () =>
        getFollowersData({ userId: targetId, db, page: 1, limit: 10 }),
      ),
    )

    results.forEach((result) => {
      expect(result.followersCount).toBe(5)
      expect(result.followers).toHaveLength(5)
      expect(result.hasMore).toBe(false)
    })
  })

  it('concurrent reads and writes return consistent follower counts', async () => {
    const targetId = new ObjectId()

    // Insert 3 initial followers
    const initialFollowers = Array.from({ length: 3 }, () => new ObjectId())
    await db.collection('follows').insertMany(
      initialFollowers.map((id) => ({
        followerId: id,
        followingId: targetId,
        createdAt: new Date(),
      })),
    )

    // Simultaneously: 5 reads + 5 new follow inserts
    const newFollowerIds = Array.from({ length: 5 }, () => new ObjectId())

    const [readResults] = await Promise.all([
      Promise.all(
        Array.from({ length: 5 }, () =>
          getFollowersData({ userId: targetId, db, page: 1, limit: 25 }),
        ),
      ),
      Promise.all(
        newFollowerIds.map((id) =>
          db.collection('follows').insertOne({
            followerId: id,
            followingId: targetId,
            createdAt: new Date(),
          }),
        ),
      ),
    ])

    // Each read snapshot must be internally consistent (count matches array length)
    readResults.forEach((result) => {
      // The follower list length must match what countDocuments returned at that moment
      expect(result.followers.length).toBeLessThanOrEqual(result.followersCount)
      // followersCount must be within the plausible range [3, 8]
      expect(result.followersCount).toBeGreaterThanOrEqual(3)
      expect(result.followersCount).toBeLessThanOrEqual(8)
    })
  })

  it('20 concurrent getFollowingData calls return valid data without crashing', async () => {
    const actorId = new ObjectId()
    const followingIds = Array.from({ length: 4 }, () => new ObjectId())

    await db.collection('users').insertMany(
      followingIds.map((id) => ({ _id: id, ...makeUser(id.toString()) })),
    )
    await db.collection('follows').insertMany(
      followingIds.map((id) => ({ followerId: actorId, followingId: id, createdAt: new Date() })),
    )

    const results = await Promise.all(
      Array.from({ length: 20 }, () =>
        getFollowingData({ userId: actorId, db, page: 1, limit: 10 }),
      ),
    )

    results.forEach((result) => {
      expect(result.followingCount).toBe(4)
      expect(result.following).toHaveLength(4)
      expect(result.hasMore).toBe(false)
    })
  })
})
