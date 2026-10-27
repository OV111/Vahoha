/**
 * Drift: flagging a team's map when synced PRs change what it depends on, and
 * the dismiss route. Real service and router over an in-memory MongoDB.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import driftRoutes from '../../modules/system-map/routes/drift.routes.js'
import { MAX_DRIFT_HINTS, dismissDrift, flagMapDrift } from '../../modules/system-map/services/driftService.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let mongod
let client
let db
let app

const ALICE = new ObjectId() // active team member
const BOB = new ObjectId() // not on the team
const CAROL = new ObjectId() // second active member
const DAVE = new ObjectId() // left the team
const TEAM = new ObjectId()
const bearer = (id) => `Bearer ${createAccessToken({ id: id.toString() })}`

const graph = (evidence = []) => ({
  v: 1,
  nodes: [{ id: 'api', kind: 'server', title: 'API server', sub: '', x: 0, y: 0, evidence }],
  edges: [],
})
const insertMap = async (extra = {}) =>
  (
    await db.collection('system_maps').insertOne({
      userId: ALICE,
      ownerType: 'team',
      ownerId: TEAM.toString(),
      title: 'Team map',
      graph: graph(['server/index.js']),
      revision: 1,
      updatedAt: new Date('2026-01-01'),
      drift: null,
      ...extra,
    })
  ).insertedId
const pr = (prNumber, ...paths) => ({ prNumber, changedFiles: paths.map((path) => ({ path, additions: 1, deletions: 0 })) })
const drift = async (id) => (await db.collection('system_maps').findOne({ _id: id })).drift

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')
  app = express()
  app.use(express.json())
  app.locals.db = db
  app.use('/api/system-maps', driftRoutes)
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  await db.collection('system_maps').deleteMany({})
  await db.collection('teams').deleteMany({})
  await db.collection('teams').insertOne({
    _id: TEAM,
    name: 'Team',
    members: [
      { userId: ALICE, status: 'active' },
      { userId: CAROL, status: 'active' },
      { userId: DAVE, status: 'left' },
    ],
  })
})

describe('flagMapDrift', () => {
  it('records hints with the PR number and sets `since`, without touching revision or updatedAt', async () => {
    const id = await insertMap()
    expect(await flagMapDrift(db, TEAM, [pr(12, 'package.json', 'src/App.jsx'), pr(13, 'server/index.js')])).toBe(1)

    const d = await drift(id)
    expect(d.since).toBeInstanceOf(Date)
    expect(d.hints).toEqual([
      { prNumber: 12, path: 'package.json', reason: 'Dependencies changed' },
      { prNumber: 13, path: 'server/index.js', reason: 'This file backs your API server part' },
    ])
    const doc = await db.collection('system_maps').findOne({ _id: id })
    expect(doc.revision).toBe(1)
    expect(doc.updatedAt).toEqual(new Date('2026-01-01'))
  })

  it('merges into existing hints, dedupes by PR and path, and keeps the first `since`', async () => {
    const since = new Date('2026-02-02')
    const id = await insertMap({ drift: { since, hints: [{ prNumber: 12, path: 'package.json', reason: 'Dependencies changed' }] } })

    await flagMapDrift(db, TEAM, [pr(12, 'package.json'), pr(14, 'package.json')])

    const d = await drift(id)
    expect(d.since).toEqual(since)
    expect(d.hints.map((h) => `${h.prNumber}:${h.path}`)).toEqual(['12:package.json', '14:package.json'])
  })

  it('keeps only the newest hints once past the cap', async () => {
    const id = await insertMap()
    const prs = Array.from({ length: MAX_DRIFT_HINTS + 5 }, (_, i) => pr(100 + i, 'package.json'))
    await flagMapDrift(db, TEAM, prs)

    const { hints } = await drift(id)
    expect(hints).toHaveLength(MAX_DRIFT_HINTS)
    expect(hints.at(-1).prNumber).toBe(100 + MAX_DRIFT_HINTS + 4)
    expect(hints[0].prNumber).toBe(105)
  })

  it('does nothing when the team has no map, or only a personal map', async () => {
    expect(await flagMapDrift(db, TEAM, [pr(1, 'package.json')])).toBe(0)
    await insertMap({ ownerType: 'personal', ownerId: null })
    expect(await flagMapDrift(db, TEAM, [pr(1, 'package.json')])).toBe(0)
    expect(await db.collection('system_maps').countDocuments({ drift: { $ne: null } })).toBe(0)
  })

  it('leaves the map alone when nothing in the PRs matters', async () => {
    const id = await insertMap()
    expect(await flagMapDrift(db, TEAM, [pr(1, 'README.md', 'src/App.jsx', 'package-lock.json')])).toBe(0)
    expect(await drift(id)).toBeNull()
  })

  it('does not flag another team\'s map', async () => {
    await insertMap({ ownerId: new ObjectId().toString() })
    expect(await flagMapDrift(db, TEAM, [pr(1, 'package.json')])).toBe(0)
  })

  it('accepts the team id as a string or an ObjectId', async () => {
    await insertMap()
    expect(await flagMapDrift(db, TEAM.toString(), [pr(1, 'package.json')])).toBe(1)
  })
})

describe('dismissDrift', () => {
  it('clears drift when the injected access check allows it', async () => {
    const id = await insertMap({ drift: { since: new Date(), hints: [{ prNumber: 1, path: 'package.json', reason: 'x' }] } })
    expect(await dismissDrift(db, id.toString(), BOB, async () => true)).toBe(true)
    expect(await drift(id)).toBeNull()
  })

  it('refuses when access is denied, and for a missing map', async () => {
    const hints = { since: new Date(), hints: [{ prNumber: 1, path: 'package.json', reason: 'x' }] }
    const id = await insertMap({ drift: hints })
    expect(await dismissDrift(db, id.toString(), BOB, async () => false)).toBe(false)
    expect((await drift(id)).hints).toHaveLength(1)
    expect(await dismissDrift(db, new ObjectId().toString(), BOB, async () => true)).toBe(false)
  })
})

describe('POST /api/system-maps/:id/drift/dismiss', () => {
  const hints = () => ({ since: new Date(), hints: [{ prNumber: 1, path: 'package.json', reason: 'Dependencies changed' }] })

  it('answers 401 without a token', async () => {
    expect((await request(app).post(`/api/system-maps/${new ObjectId()}/drift/dismiss`)).status).toBe(401)
  })

  it('clears the team map\'s drift for an active member', async () => {
    const id = await insertMap({ drift: hints() })
    const res = await request(app).post(`/api/system-maps/${id}/drift/dismiss`).set('Authorization', bearer(ALICE))
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: true, data: { drift: null } })
    expect(await drift(id)).toBeNull()
  })

  it('lets another active member dismiss it too, since the map belongs to the team', async () => {
    const id = await insertMap({ drift: hints() })
    const res = await request(app).post(`/api/system-maps/${id}/drift/dismiss`).set('Authorization', bearer(CAROL))
    expect(res.status).toBe(200)
    expect(await drift(id)).toBeNull()
  })

  it.each([
    ['someone not on the team', BOB],
    ['a member who left', DAVE],
  ])('answers 404 to %s, and changes nothing', async (_name, user) => {
    const id = await insertMap({ drift: hints() })
    const res = await request(app).post(`/api/system-maps/${id}/drift/dismiss`).set('Authorization', bearer(user))
    expect(res.status).toBe(404)
    expect((await drift(id)).hints).toHaveLength(1)
  })

  it('keeps a personal map\'s drift private to its owner', async () => {
    const id = await insertMap({ ownerType: 'personal', ownerId: null, drift: hints() })
    expect((await request(app).post(`/api/system-maps/${id}/drift/dismiss`).set('Authorization', bearer(CAROL))).status).toBe(404)
    expect((await request(app).post(`/api/system-maps/${id}/drift/dismiss`).set('Authorization', bearer(ALICE))).status).toBe(200)
  })

  it('answers 404 for a map that does not exist and 400 for a malformed id', async () => {
    const missing = await request(app).post(`/api/system-maps/${new ObjectId()}/drift/dismiss`).set('Authorization', bearer(ALICE))
    expect(missing.status).toBe(404)
    const bad = await request(app).post('/api/system-maps/nope/drift/dismiss').set('Authorization', bearer(ALICE))
    expect(bad.status).toBe(400)
  })
})
