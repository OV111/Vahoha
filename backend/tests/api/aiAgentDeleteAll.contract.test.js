/**
 * DELETE /api/ai-agent/sessions: clearing a learner's chats.
 * Real router and service over an in-memory MongoDB.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import aiAgentRoutes from '../../modules/ai-agent/index.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let mongod
let client
let db
let app

const ALICE = new ObjectId()
const BOB = new ObjectId()
const bearer = (id) => `Bearer ${createAccessToken({ id: id.toString() })}`

const session = (userId, extra = {}) => ({ userId, title: 'Chat', messages: [], createdAt: new Date(), updatedAt: new Date(), ...extra })
const count = (filter = {}) => db.collection('agent_sessions').countDocuments(filter)
const clear = (who, query = '') => request(app).delete(`/api/ai-agent/sessions${query}`).set('Authorization', bearer(who))

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')
  app = express()
  app.use(express.json())
  app.locals.db = db
  app.use('/api/ai-agent', aiAgentRoutes)
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  await db.collection('agent_sessions').deleteMany({})
  await db.collection('agent_usage').deleteMany({})
  await db.collection('agent_sessions').insertMany([
    session(ALICE),
    session(ALICE),
    session(ALICE, { pinned: true }),
    session(BOB),
  ])
  await db.collection('agent_usage').insertOne({ userId: ALICE, date: '2026-10-31', count: 30 })
})

describe('delete all chats', () => {
  it("deletes every one of the caller's chats, pinned too, and nobody else's", async () => {
    const res = await clear(ALICE)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: true, deleted: 3 })
    expect(await count({ userId: ALICE })).toBe(0)
    expect(await count({ userId: BOB })).toBe(1)
  })

  it('keeps pinned chats when asked', async () => {
    const res = await clear(ALICE, '?keepPinned=true')
    expect(res.body.deleted).toBe(2)
    expect(await count({ userId: ALICE })).toBe(1)
    expect(await count({ userId: ALICE, pinned: true })).toBe(1)
  })

  it('leaves the daily message count alone, so the cap is not reset', async () => {
    await clear(ALICE)
    expect(await db.collection('agent_usage').countDocuments({ userId: ALICE })).toBe(1)
  })

  it('answers 0 when there is nothing to delete', async () => {
    await clear(ALICE)
    expect((await clear(ALICE)).body.deleted).toBe(0)
  })

  it('rejects a bad keepPinned value and needs a token', async () => {
    expect((await clear(ALICE, '?keepPinned=maybe')).status).toBe(400)
    expect((await request(app).delete('/api/ai-agent/sessions')).status).toBe(401)
    expect(await count()).toBe(4)
  })

  it('still deletes a single chat by id', async () => {
    const one = await db.collection('agent_sessions').findOne({ userId: ALICE })
    expect((await request(app).delete(`/api/ai-agent/sessions/${one._id}`).set('Authorization', bearer(ALICE))).status).toBe(200)
    expect(await count({ userId: ALICE })).toBe(2)
  })
})
