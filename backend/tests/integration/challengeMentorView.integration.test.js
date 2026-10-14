/**
 * What the AI mentor sees of a challenge attempt.
 *
 * The rule under test: the mentor gets what the learner already saw (their
 * code, failing test names and messages) and never the hidden test bodies,
 * the solution or unbought hint texts.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import { getChallengeMentorView } from '../../modules/coding-challenges/services/mentorService.js'

let mongod
let client
let db

const userId = new ObjectId()
const challengeId = new ObjectId()

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
    ['challenges', 'challenge_attempts', 'challengeResults'].map((c) => db.collection(c).deleteMany({})),
  )
  await db.collection('challenges').insertOne({
    _id: challengeId,
    slug: 'sum-array',
    status: 'published',
    title: 'Sum an array',
    difficulty: 'easy',
    trackId: 'js',
    layerId: 'js-1',
    tags: ['arrays'],
    hiddenTests: [{ name: 'sums [1,2,3]', code: 'SECRET_TEST_BODY' }],
    solution: 'SECRET_SOLUTION',
    hints: [{ order: 1, cost: 5, text: 'SECRET_HINT_TEXT' }],
  })
})

describe('getChallengeMentorView', () => {
  it('returns the learner code and failing tests without any secrets', async () => {
    await db.collection('challenge_attempts').insertOne({
      userId,
      challengeId,
      challengeSlug: 'sum-array',
      code: [{ name: 'sumArray.js', code: 'module.exports = (a) => 0' }],
      hintsRevealed: [],
      lastResult: {
        passed: false,
        at: new Date(),
        results: [{ name: 'sums [1,2,3]', passed: false, message: 'expected 0 to be 6' }],
      },
    })
    await db.collection('challengeResults').insertOne({
      userId,
      challengeId: 'sum-array',
      status: 'attempted',
      attempts: 2,
    })

    const view = await getChallengeMentorView(db, userId.toString(), 'sum-array')

    expect(view.code).toBe('module.exports = (a) => 0')
    expect(view.submissions).toBe(2)
    expect(view.hintsAvailable).toBe(1)
    expect(view.lastSubmission.failedTests).toEqual([
      { name: 'sums [1,2,3]', message: 'expected 0 to be 6' },
    ])
    const raw = JSON.stringify(view)
    expect(raw).not.toContain('SECRET_TEST_BODY')
    expect(raw).not.toContain('SECRET_SOLUTION')
    expect(raw).not.toContain('SECRET_HINT_TEXT')
  })

  it('only ever reads the calling learner\'s own attempt', async () => {
    await db.collection('challenge_attempts').insertOne({
      userId: new ObjectId(),
      challengeId,
      code: [{ name: 'sumArray.js', code: 'SOMEONE_ELSES_CODE' }],
    })
    const view = await getChallengeMentorView(db, userId.toString(), 'sum-array')
    expect(view.started).toBe(false)
    expect(JSON.stringify(view)).not.toContain('SOMEONE_ELSES_CODE')
  })

  it('reports unknown challenges instead of throwing', async () => {
    expect(await getChallengeMentorView(db, userId.toString(), 'nope')).toEqual({
      error: 'Challenge not found',
    })
  })
})
