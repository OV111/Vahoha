/**
 * HTTP contract tests for capstone and team maps (stage 5 owner/access core).
 *
 * Real router, schemas and controllers over an in-memory MongoDB, with the
 * unique partial indexes the integrator adds to db.js. The risks:
 *
 *  1. Eligibility: no capstone attempt / not an ACTIVE team member = 403.
 *  2. One map per capstone track per learner, one per team (409 "exists").
 *  3. Team members share one map: saves by different members conflict on revision.
 *  4. A member who left, or was only invited, loses access by id too (404).
 *  5. Team maps are never public; capstone maps share like personal ones.
 *  6. Capstone and team maps don't use up the personal-map cap.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import systemMapRoutes from '../../modules/system-map/index.js'
import { MAX_MAPS_PER_USER } from '../../modules/system-map/services/systemMapService.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let mongod
let client
let db
let app

const ALICE = new ObjectId()
const BOB = new ObjectId()
const CAROL = new ObjectId()
const DAVE = new ObjectId()
const TEAM = new ObjectId()
const TRACK = 'api-dev'

const bearer = (id) => `Bearer ${createAccessToken({ id: id.toString() })}`
const node = (id) => ({ id, kind: 'server', title: id, sub: '', x: 0, y: 0 })
const graph = (ids = ['a', 'b']) => ({
  v: 1,
  nodes: ids.map(node),
  edges: ids.length > 1 ? [{ id: 'e1', source: ids[0], target: ids[1], sourceHandle: 'r', targetHandle: 'l', label: '' }] : [],
})
const body = (ids) => ({ title: 'Our project', graph: graph(ids) })

const as = (user, method, url) => request(app)[method](url).set('Authorization', bearer(user))
const forTeam = (user, method = 'get') => as(user, method, `/api/system-maps/for/team/${TEAM}`)
const forCapstone = (user, method = 'get', track = TRACK) => as(user, method, `/api/system-maps/for/capstone/${track}`)

const startCapstone = (user, trackId = TRACK) => db.collection('capstone_attempts').insertOne({ userId: user, trackId, attemptNumber: 1 })
const seedTeam = (members) =>
  db.collection('teams').insertOne({ _id: TEAM, name: 'Team 1', members: members.map(([userId, status]) => ({ userId, status })) })

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')

  // The backstop the integrator adds to db.js: it decides a simultaneous create.
  await db.collection('system_maps').createIndex(
    { ownerType: 1, ownerId: 1, userId: 1 },
    { unique: true, partialFilterExpression: { ownerType: 'capstone' } },
  )
  await db.collection('system_maps').createIndex(
    { ownerType: 1, ownerId: 1 },
    { unique: true, partialFilterExpression: { ownerType: 'team' } },
  )

  app = express()
  app.use(express.json())
  app.locals.db = db
  app.use('/api/system-maps', systemMapRoutes)
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  await Promise.all(['system_maps', 'capstone_attempts', 'teams'].map((c) => db.collection(c).deleteMany({})))
})

describe('capstone maps', () => {
  it('needs a login', async () => {
    expect((await request(app).get(`/api/system-maps/for/capstone/${TRACK}`)).status).toBe(401)
    expect((await request(app).post(`/api/system-maps/for/capstone/${TRACK}`)).status).toBe(401)
  })

  it('answers 403 until the learner has started that capstone', async () => {
    const get = await forCapstone(ALICE)
    expect(get.status).toBe(403)
    expect(get.body.message).toBe('Start this capstone first.')
    expect((await forCapstone(ALICE, 'post').send(body())).status).toBe(403)

    await startCapstone(BOB, 'other-track') // another track, another learner: neither counts
    await startCapstone(ALICE, 'other-track')
    expect((await forCapstone(ALICE)).status).toBe(403)
  })

  it('returns null when there is no map yet, and never creates one', async () => {
    await startCapstone(ALICE)
    const res = await forCapstone(ALICE)
    expect(res.status).toBe(200)
    expect(res.body).toEqual({ success: true, data: null })
    expect(await db.collection('system_maps').countDocuments({})).toBe(0)
  })

  it('creates one, then answers 409 "exists" with the existing map', async () => {
    await startCapstone(ALICE)
    const made = await forCapstone(ALICE, 'post').send(body())
    expect(made.status).toBe(201)
    expect(made.body.data).toMatchObject({ ownerType: 'capstone', ownerId: TRACK, revision: 1, drift: null, shared: false })

    const again = await forCapstone(ALICE, 'post').send(body(['x']))
    expect(again.status).toBe(409)
    expect(again.body.code).toBe('exists')
    expect(again.body.data.id).toBe(made.body.data.id)

    const read = await forCapstone(ALICE)
    expect(read.body.data.id).toBe(made.body.data.id)
  })

  it('gives each learner their own map for the same track', async () => {
    await startCapstone(ALICE)
    await startCapstone(BOB)
    const a = await forCapstone(ALICE, 'post').send(body())
    const b = await forCapstone(BOB, 'post').send(body())
    expect([a.status, b.status]).toEqual([201, 201])
    expect(a.body.data.id).not.toBe(b.body.data.id)
    expect((await as(BOB, 'get', `/api/system-maps/${a.body.data.id}`)).status).toBe(404)
  })

  it('decides two simultaneous creates with the unique index', async () => {
    await startCapstone(ALICE)
    const results = await Promise.all([forCapstone(ALICE, 'post').send(body()), forCapstone(ALICE, 'post').send(body())])
    expect(results.map((r) => r.status).sort()).toEqual([201, 409])
    expect(await db.collection('system_maps').countDocuments({ ownerType: 'capstone' })).toBe(1)
  })

  it('can be shared by its owner, and the public link works', async () => {
    await startCapstone(ALICE)
    const { id } = (await forCapstone(ALICE, 'post').send(body())).body.data
    const shared = await as(ALICE, 'put', `/api/system-maps/${id}/sharing`).send({ shared: true })
    expect(shared.status).toBe(200)
    const pub = await request(app).get(`/api/system-maps/public/${shared.body.data.publicId}`)
    expect(pub.status).toBe(200)
    expect(pub.body.data.title).toBe('Our project')
  })

  it('lists capstone maps under /mine with their owner', async () => {
    await startCapstone(ALICE)
    const { id } = (await forCapstone(ALICE, 'post').send(body())).body.data
    const mine = await as(ALICE, 'get', '/api/system-maps/mine')
    expect(mine.body.data).toEqual([expect.objectContaining({ id, ownerType: 'capstone', ownerId: TRACK, parts: 2 })])
  })
})

describe('team maps', () => {
  beforeEach(() => seedTeam([[ALICE, 'active'], [BOB, 'active'], [CAROL, 'invited'], [DAVE, 'left']]))

  it('refuses people who are not active members with 403', async () => {
    for (const user of [CAROL, DAVE, new ObjectId()]) {
      const res = await forTeam(user)
      expect(res.status).toBe(403)
      expect(res.body.message).toBe('Only active team members can open the team map.')
      expect((await forTeam(user, 'post').send(body())).status).toBe(403)
    }
  })

  it('returns null for a member before the map exists', async () => {
    const res = await forTeam(ALICE)
    expect(res.status).toBe(200)
    expect(res.body.data).toBeNull()
  })

  it('is one map per team: a second member gets 409 "exists" and the same map', async () => {
    const made = await forTeam(ALICE, 'post').send(body())
    expect(made.status).toBe(201)
    expect(made.body.data).toMatchObject({ ownerType: 'team', ownerId: TEAM.toString() })

    const second = await forTeam(BOB, 'post').send(body(['x']))
    expect(second.status).toBe(409)
    expect(second.body.data.id).toBe(made.body.data.id)
    expect((await forTeam(BOB)).body.data.id).toBe(made.body.data.id)
  })

  it('decides two members creating at once with the unique index', async () => {
    const results = await Promise.all([forTeam(ALICE, 'post').send(body()), forTeam(BOB, 'post').send(body())])
    expect(results.map((r) => r.status).sort()).toEqual([201, 409])
    expect(await db.collection('system_maps').countDocuments({ ownerType: 'team' })).toBe(1)
  })

  it('lets any active member save, and conflicts across members on revision', async () => {
    const { id } = (await forTeam(ALICE, 'post').send(body())).body.data
    const save = (user, revision, ids) => as(user, 'put', `/api/system-maps/${id}`).send({ graph: graph(ids), revision })

    const byBob = await save(BOB, 1, ['a', 'b', 'c'])
    expect(byBob.status).toBe(200)
    expect(byBob.body.data.revision).toBe(2)

    const staleAlice = await save(ALICE, 1, ['z'])
    expect(staleAlice.status).toBe(409)
    expect(staleAlice.body.code).toBe('conflict')
    expect(staleAlice.body.data.graph.nodes).toHaveLength(3)

    expect((await save(ALICE, 2, ['a', 'b', 'c', 'd'])).body.data.revision).toBe(3)
    expect((await as(BOB, 'get', `/api/system-maps/${id}`)).body.data.graph.nodes).toHaveLength(4)
  })

  it('hides the map by id from invited, left and outside users (404)', async () => {
    const { id } = (await forTeam(ALICE, 'post').send(body())).body.data
    for (const user of [CAROL, DAVE, new ObjectId()]) {
      expect((await as(user, 'get', `/api/system-maps/${id}`)).status).toBe(404)
      expect((await as(user, 'put', `/api/system-maps/${id}`).send({ graph: graph(), revision: 1 })).status).toBe(404)
      expect((await as(user, 'delete', `/api/system-maps/${id}`)).status).toBe(404)
    }
  })

  it('stops a member who leaves from reaching the map by id', async () => {
    const { id } = (await forTeam(BOB, 'post').send(body())).body.data
    expect((await as(BOB, 'get', `/api/system-maps/${id}`)).status).toBe(200)
    await db.collection('teams').updateOne({ _id: TEAM, 'members.userId': BOB }, { $set: { 'members.$.status': 'left' } })
    expect((await as(BOB, 'get', `/api/system-maps/${id}`)).status).toBe(404)
    expect((await forTeam(BOB)).status).toBe(403)
    expect((await as(ALICE, 'get', `/api/system-maps/${id}`)).status).toBe(200) // the team keeps it
  })

  it('is never public: sharing answers 403 for the creator and for other members', async () => {
    const { id } = (await forTeam(ALICE, 'post').send(body())).body.data
    for (const user of [ALICE, BOB]) {
      const res = await as(user, 'put', `/api/system-maps/${id}/sharing`).send({ shared: true })
      expect(res.status).toBe(403)
      expect(res.body.message).toBe('Team maps go public through team evidence.')
    }
    expect((await as(CAROL, 'put', `/api/system-maps/${id}/sharing`).send({ shared: true })).status).toBe(404)
    expect(await db.collection('system_maps').countDocuments({ shared: true })).toBe(0)
  })

  it('can only be deleted by the member who created it', async () => {
    const { id } = (await forTeam(ALICE, 'post').send(body())).body.data
    expect((await as(BOB, 'delete', `/api/system-maps/${id}`)).status).toBe(404)
    expect(await db.collection('system_maps').countDocuments({})).toBe(1)
    expect((await as(ALICE, 'delete', `/api/system-maps/${id}`)).status).toBe(200)
    expect(await db.collection('system_maps').countDocuments({})).toBe(0)
  })

  it('stays out of /mine, even for the creator', async () => {
    await forTeam(ALICE, 'post').send(body())
    expect((await as(ALICE, 'get', '/api/system-maps/mine')).body.data).toEqual([])
  })
})

describe('personal cap and old maps', () => {
  it('counts only personal maps toward the cap', async () => {
    await seedTeam([[ALICE, 'active']])
    for (const track of ['track-a', 'track-b', 'track-c']) {
      await startCapstone(ALICE, track)
      expect((await forCapstone(ALICE, 'post', track).send(body())).status).toBe(201)
    }
    expect((await forTeam(ALICE, 'post').send(body())).status).toBe(201)

    for (let i = 0; i < MAX_MAPS_PER_USER; i++) {
      expect((await as(ALICE, 'post', '/api/system-maps').send(body())).status).toBe(201)
    }
    const over = await as(ALICE, 'post', '/api/system-maps').send(body())
    expect(over.status).toBe(409)
    expect(over.body.code).toBe('limit')
  })

  it('treats a map saved before stage 5 (no ownerType) as personal', async () => {
    const { insertedId } = await db.collection('system_maps').insertOne({
      userId: ALICE,
      title: 'Old map',
      graph: graph(),
      revision: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    })
    const read = await as(ALICE, 'get', `/api/system-maps/${insertedId}`)
    expect(read.body.data).toMatchObject({ ownerType: 'personal', ownerId: null, drift: null })
    expect((await as(BOB, 'get', `/api/system-maps/${insertedId}`)).status).toBe(404)
    expect((await as(ALICE, 'get', '/api/system-maps/mine')).body.data[0]).toMatchObject({ ownerType: 'personal', ownerId: null })

    // It still counts toward the personal cap.
    for (let i = 0; i < MAX_MAPS_PER_USER - 1; i++) await as(ALICE, 'post', '/api/system-maps').send(body())
    expect((await as(ALICE, 'post', '/api/system-maps').send(body())).status).toBe(409)
  })
})

describe('validation', () => {
  it.each([
    ['an unknown owner type', '/api/system-maps/for/personal/whatever'],
    ['a team id that is not 24 hex characters', '/api/system-maps/for/team/not-a-team-id'],
    ['a track id with capitals', '/api/system-maps/for/capstone/API_Dev'],
    ['a one-character track id', '/api/system-maps/for/capstone/a'],
  ])('rejects %s with 400', async (_name, url) => {
    expect((await as(ALICE, 'get', url)).status).toBe(400)
  })

  it('rejects a bad graph on create with 400 and stores nothing', async () => {
    await startCapstone(ALICE)
    const bad = { title: 'x', graph: { v: 1, nodes: [node('a')], edges: [{ id: 'e', source: 'a', target: 'ghost', sourceHandle: 'r', targetHandle: 'l', label: '' }] } }
    expect((await forCapstone(ALICE, 'post').send(bad)).status).toBe(400)
    expect(await db.collection('system_maps').countDocuments({})).toBe(0)
  })
})
