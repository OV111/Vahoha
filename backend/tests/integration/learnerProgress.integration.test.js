/**
 * The server-owned parts of userProgress against a real MongoDB (in memory):
 * the learning streak (one pipeline update) and currentLayer (derived from
 * passed layers, never sent by the client).
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import { recordLearningActivity, currentStreak } from '../../services/learningActivity.js'
import { markLayerDone, syncCurrentLayer, getUserProgress } from '../../services/userProgressService.js'

let mongod
let client
let db
const userId = new ObjectId()

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
  await Promise.all(['userProgress', 'usersStats', 'roadmap_layers'].map((c) => db.collection(c).deleteMany({})))
})

const at = (iso) => new Date(iso)
const progress = () => getUserProgress(db, userId)

describe('recordLearningActivity', () => {
  it('starts at 1, ignores repeats on the same day, grows on consecutive days', async () => {
    await recordLearningActivity(db, userId, at('2026-10-30T10:00:00Z'))
    await recordLearningActivity(db, userId, at('2026-10-30T18:00:00Z'))
    expect((await progress()).streak).toBe(1)

    await recordLearningActivity(db, userId, at('2026-10-31T09:00:00Z'))
    const p = await progress()
    expect(p.streak).toBe(2)
    expect(p.lastLearningDay).toBe('2026-10-31')
    expect(p.lastActiveAt).toEqual(at('2026-10-31T09:00:00Z'))
  })

  it('resets to 1 after a missed day', async () => {
    await recordLearningActivity(db, userId, at('2026-10-28T10:00:00Z'))
    await recordLearningActivity(db, userId, at('2026-10-29T10:00:00Z'))
    await recordLearningActivity(db, userId, at('2026-10-31T10:00:00Z'))
    expect((await progress()).streak).toBe(1)
  })

  it('counts days in the learner timezone', async () => {
    await db.collection('usersStats').insertOne({ userId, timezone: 'America/Los_Angeles' })
    // 21:00 and 22:00 local on consecutive evenings; both cross midnight UTC
    await recordLearningActivity(db, userId, at('2026-10-31T04:00:00Z'))
    await recordLearningActivity(db, userId, at('2026-11-01T05:00:00Z'))
    const p = await progress()
    expect(p.streak).toBe(2)
    expect(currentStreak(p, at('2026-11-01T06:00:00Z'))).toBe(2)
  })

  it('reads as 0 once a day is missed, without any write', async () => {
    await recordLearningActivity(db, userId, at('2026-10-29T10:00:00Z'))
    expect(currentStreak(await progress(), at('2026-11-01T10:00:00Z'))).toBe(0)
  })

  it('never throws, even for a bad user id', async () => {
    await expect(recordLearningActivity(db, 'not-an-id')).resolves.toBeUndefined()
  })
})

describe('currentLayer', () => {
  beforeEach(async () => {
    await db.collection('roadmap_layers').insertMany([
      { layerId: 'api-dev-1', trackId: 'api-dev', order: 1 },
      { layerId: 'api-dev-2', trackId: 'api-dev', order: 2 },
      { layerId: 'api-dev-3', trackId: 'api-dev', order: 3 },
      { layerId: 'web-1', trackId: 'web', order: 1 },
      { layerId: 'web-2', trackId: 'web', order: 2 },
    ])
    await db.collection('userProgress').insertOne({ userId, activePath: 'api-dev', currentLayer: 1 })
  })

  it('advances when a layer is passed, and mirrors it into completedLayers', async () => {
    const p = await markLayerDone(db, userId, 'api-dev-1')
    expect(p.currentLayer).toBe(2)
    expect(p.layerProgress).toEqual({ 'api-dev-1': 'done' })
    expect(p.completedLayers).toEqual(['api-dev-1'])
  })

  it('is re-derived for the new track when the path switches', async () => {
    await markLayerDone(db, userId, 'api-dev-1')
    await markLayerDone(db, userId, 'api-dev-2')
    await db.collection('userProgress').updateOne({ userId }, { $set: { activePath: 'web' } })
    expect((await syncCurrentLayer(db, userId)).currentLayer).toBe(1)
  })

  it('stays on the last layer when the track is finished', async () => {
    for (const l of ['api-dev-1', 'api-dev-2', 'api-dev-3']) await markLayerDone(db, userId, l)
    expect((await progress()).currentLayer).toBe(3)
  })
})
