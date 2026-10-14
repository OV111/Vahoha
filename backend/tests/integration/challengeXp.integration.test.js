/**
 * Challenge XP goes through the XP ledger (xpAwards), like exams and capstones.
 *
 * The sandbox runner and the billing plan are mocked; everything else (the
 * ledger's unique index, the userProgress credit, the solve event) runs
 * against a real MongoDB via mongodb-memory-server.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'

vi.mock('../../modules/coding-challenges/services/runnerService.js', () => ({
  describeRunner: () => ({ available: true }),
  runHiddenTests: async (_code, _name, tests) => ({ results: tests.map((t) => ({ name: t.name, passed: true })) }),
}))
vi.mock('../../modules/billing/index.js', () => ({ getUserPlan: async () => 'free' }))

const { submitAttemptService } = await import('../../modules/coding-challenges/services/submissionService.js')

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
    ['challenges', 'challenge_attempts', 'challengeResults', 'userProgress', 'xpAwards', 'userEvents', 'submission_usage'].map(
      (c) => db.collection(c).deleteMany({}),
    ),
  )
})

const seed = async () => {
  const userId = new ObjectId()
  const challengeId = new ObjectId()
  await db.collection('challenges').insertOne({
    _id: challengeId,
    slug: 'debounce',
    trackId: 'frontend',
    layerId: 'frontend-2',
    xp: 40,
    starterFiles: [{ name: 'debounce.js', lang: 'js', code: '' }],
    hiddenTests: [{ name: 'a' }, { name: 'b' }],
    stats: { attempts: 0, solves: 0 },
  })
  const { insertedId: attemptId } = await db.collection('challenge_attempts').insertOne({
    userId,
    challengeId,
    code: [{ name: 'debounce.js', lang: 'js', code: 'module.exports = () => {}' }],
    startedAt: new Date(),
  })
  return { userId, attemptId: attemptId.toString() }
}

const xpTotal = async (userId) => (await db.collection('userProgress').findOne({ userId }))?.xpTotal ?? 0

describe('challenge XP through the ledger', () => {
  it('pays the first solve once, with a ledger row and a solve event', async () => {
    const { userId, attemptId } = await seed()
    const res = await submitAttemptService(db, userId.toString(), attemptId)

    expect(res.passed).toBe(true)
    expect(res.xpEarned).toBe(40)
    expect(await xpTotal(userId)).toBe(40)
    const award = await db.collection('xpAwards').findOne({ userId, kind: 'challenge', sourceId: 'debounce' })
    expect(award).toMatchObject({ amount: 40, applied: true })
    expect(await db.collection('userEvents').countDocuments({ userId, type: 'challenge_solved' })).toBe(1)
  })

  it('pays nothing on a re-solve', async () => {
    const { userId, attemptId } = await seed()
    await submitAttemptService(db, userId.toString(), attemptId)
    const again = await submitAttemptService(db, userId.toString(), attemptId)

    expect(again.xpEarned).toBe(0)
    expect(await xpTotal(userId)).toBe(40)
    expect(await db.collection('userEvents').countDocuments({ userId, type: 'challenge_solved' })).toBe(1)
  })

  it('pays once when two passing submissions race', async () => {
    const { userId, attemptId } = await seed()
    const results = await Promise.all([
      submitAttemptService(db, userId.toString(), attemptId),
      submitAttemptService(db, userId.toString(), attemptId),
    ])

    expect(results.map((r) => r.xpEarned).sort()).toEqual([0, 40])
    expect(await xpTotal(userId)).toBe(40)
  })
})
