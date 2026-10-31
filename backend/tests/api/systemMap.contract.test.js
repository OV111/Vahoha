/**
 * HTTP contract tests for the system-map router.
 *
 * Mounts the REAL router (real `authenticate`, schemas and controllers) over an
 * in-memory MongoDB, because the risks live at this layer:
 *
 *  1. Auth: every route must 401 without a token.
 *  2. Ownership: one learner must never read, save or delete another's map.
 *  3. Route order: `/mine` must not be swallowed by `/:id`.
 *  4. Concurrency: a save with an old `revision` is refused with the server's copy.
 *  5. Validation: a graph with a dangling wire is rejected before it is stored.
 *  6. Sharing: a public link shows only what the page needs, and dies when turned off.
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
const bearer = (id) => `Bearer ${createAccessToken({ id: id.toString() })}`

const node = (id, extra = {}) => ({ id, kind: 'server', title: id, sub: '', x: 0, y: 0, ...extra })
const edge = (id, source, target) => ({ id, source, target, sourceHandle: 'r', targetHandle: 'l', label: '' })
const graph = (nodes = [node('a'), node('b')], edges = [edge('e1', 'a', 'b')]) => ({ v: 1, nodes, edges })

const create = (user, body = { title: 'My project', graph: graph() }) =>
  request(app).post('/api/system-maps').set('Authorization', bearer(user)).send(body)

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')

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
  await Promise.all(['system_maps', 'users', 'usersStats'].map((c) => db.collection(c).deleteMany({})))
})

describe('auth', () => {
  it.each([
    ['get', '/api/system-maps/mine'],
    ['post', '/api/system-maps'],
    ['get', `/api/system-maps/${new ObjectId()}`],
    ['put', `/api/system-maps/${new ObjectId()}`],
    ['delete', `/api/system-maps/${new ObjectId()}`],
  ])('%s %s answers 401 without a token', async (method, url) => {
    expect((await request(app)[method](url)).status).toBe(401)
  })
})

describe('create, list and read', () => {
  it('creates a map and lists it under /mine (not swallowed by /:id)', async () => {
    const made = await create(ALICE)
    expect(made.status).toBe(201)
    expect(made.body.data).toMatchObject({ title: 'My project', revision: 1 })

    const mine = await request(app).get('/api/system-maps/mine').set('Authorization', bearer(ALICE))
    expect(mine.status).toBe(200)
    expect(mine.body.data).toEqual([expect.objectContaining({ id: made.body.data.id, title: 'My project', parts: 2 })])

    const one = await request(app).get(`/api/system-maps/${made.body.data.id}`).set('Authorization', bearer(ALICE))
    expect(one.body.data.graph.nodes).toHaveLength(2)
  })

  it("hides another learner's map: 404 on read, save and delete", async () => {
    const { id } = (await create(ALICE)).body.data
    const as = (method) => request(app)[method](`/api/system-maps/${id}`).set('Authorization', bearer(BOB))

    expect((await as('get')).status).toBe(404)
    expect((await as('put').send({ graph: graph(), revision: 1 })).status).toBe(404)
    expect((await as('delete')).status).toBe(404)
    expect((await request(app).get('/api/system-maps/mine').set('Authorization', bearer(BOB))).body.data).toEqual([])
    expect(await db.collection('system_maps').countDocuments({ _id: new ObjectId(id) })).toBe(1)
  })

  it('stops at the per-learner cap', async () => {
    for (let i = 0; i < MAX_MAPS_PER_USER; i++) expect((await create(ALICE)).status).toBe(201)
    const over = await create(ALICE)
    expect(over.status).toBe(409)
    expect(over.body.code).toBe('limit')
  })
})

describe('saving', () => {
  it('saves and bumps the revision', async () => {
    const { id } = (await create(ALICE)).body.data
    const saved = await request(app)
      .put(`/api/system-maps/${id}`)
      .set('Authorization', bearer(ALICE))
      .send({ title: 'Renamed', graph: graph([node('a'), node('b'), node('c')], []), revision: 1 })
    expect(saved.status).toBe(200)
    expect(saved.body.data).toMatchObject({ title: 'Renamed', revision: 2 })
    expect(saved.body.data.graph.nodes).toHaveLength(3)
  })

  it("keeps a part's explanation (trimmed) and refuses one over the limit", async () => {
    const { id } = (await create(ALICE)).body.data
    const save = (note, revision) =>
      request(app)
        .put(`/api/system-maps/${id}`)
        .set('Authorization', bearer(ALICE))
        .send({ graph: graph([node('a', { note }), node('b')], []), revision })

    const saved = await save('  Answers the API calls.\nStateless.  ', 1)
    expect(saved.status).toBe(200)
    expect(saved.body.data.graph.nodes[0].note).toBe('Answers the API calls.\nStateless.')
    expect((await save('x'.repeat(1001), 2)).status).toBe(400)
  })

  it('refuses a stale revision and returns the server copy', async () => {
    const { id } = (await create(ALICE)).body.data
    const save = (revision, nodes) =>
      request(app).put(`/api/system-maps/${id}`).set('Authorization', bearer(ALICE)).send({ graph: graph(nodes, []), revision })

    expect((await save(1, [node('first')])).status).toBe(200)
    const stale = await save(1, [node('second')])
    expect(stale.status).toBe(409)
    expect(stale.body.code).toBe('conflict')
    expect(stale.body.data.graph.nodes[0].id).toBe('first')
    expect(stale.body.data.revision).toBe(2)
  })

  it('deletes a map', async () => {
    const { id } = (await create(ALICE)).body.data
    expect((await request(app).delete(`/api/system-maps/${id}`).set('Authorization', bearer(ALICE))).status).toBe(200)
    expect(await db.collection('system_maps').countDocuments({})).toBe(0)
  })
})

describe('validation', () => {
  it.each([
    ['a wire to a missing part', { graph: graph([node('a')], [edge('e1', 'a', 'ghost')]) }],
    ['duplicate part ids', { graph: graph([node('a'), node('a')], []) }],
    ['an unknown part kind', { graph: graph([node('a', { kind: 'spaceship' })], []) }],
    ['too many parts', { graph: graph(Array.from({ length: 81 }, (_, i) => node(`n${i}`)), []) }],
    ['a missing title', { title: '' }],
    ['a wrong graph version', { graph: { ...graph(), v: 2 } }],
  ])('rejects %s with 400 and stores nothing', async (_name, patch) => {
    const res = await create(ALICE, { title: 'x', graph: graph(), ...patch })
    expect(res.status).toBe(400)
    expect(await db.collection('system_maps').countDocuments({})).toBe(0)
  })

  it('rejects a malformed id before touching the database', async () => {
    const res = await request(app).get('/api/system-maps/not-an-id').set('Authorization', bearer(ALICE))
    expect(res.status).toBe(400)
  })
})

describe('sharing', () => {
  const share = (user, id, shared) =>
    request(app).put(`/api/system-maps/${id}/sharing`).set('Authorization', bearer(user)).send({ shared })
  const view = (publicId) => request(app).get(`/api/system-maps/public/${publicId}`)

  beforeEach(async () => {
    await db.collection('users').insertOne({
      _id: ALICE,
      username: 'alice',
      firstName: 'Alice',
      lastName: 'Doe',
      email: 'alice@test.com',
      password: 'hash',
    })
    await db.collection('usersStats').insertOne({ userId: ALICE, profileImage: 'https://img.test/alice.png' })
  })

  it('needs a token to change sharing', async () => {
    expect((await request(app).put(`/api/system-maps/${new ObjectId()}/sharing`).send({ shared: true })).status).toBe(401)
  })

  it('is off by default', async () => {
    const { data } = (await create(ALICE)).body
    expect(data).toMatchObject({ shared: false, publicId: null })
  })

  it('shows a shared map to anyone, without private fields', async () => {
    const { id } = (await create(ALICE)).body.data
    const on = await share(ALICE, id, true)
    expect(on.status).toBe(200)
    expect(on.body.data.shared).toBe(true)
    expect(on.body.data.publicId).toMatch(/^[A-Za-z0-9_-]{12}$/)

    const pub = await view(on.body.data.publicId) // no Authorization header
    expect(pub.status).toBe(200)
    expect(Object.keys(pub.body.data).sort()).toEqual(['graph', 'owner', 'title', 'updatedAt'])
    expect(pub.body.data.owner).toEqual({ username: 'alice', name: 'Alice Doe', avatar: 'https://img.test/alice.png' })
    expect(pub.body.data.graph.nodes).toHaveLength(2)
    const raw = JSON.stringify(pub.body)
    for (const secret of ['alice@test.com', 'hash', ALICE.toString(), id, 'revision']) expect(raw).not.toContain(secret)

    const mine = await request(app).get('/api/system-maps/mine').set('Authorization', bearer(ALICE))
    expect(mine.body.data[0].shared).toBe(true)
  })

  it('kills the link when sharing is turned off, and a new share gets a new link', async () => {
    const { id } = (await create(ALICE)).body.data
    const first = (await share(ALICE, id, true)).body.data.publicId

    const off = await share(ALICE, id, false)
    expect(off.body.data).toMatchObject({ shared: false, publicId: null })
    expect((await view(first)).status).toBe(404)

    const second = (await share(ALICE, id, true)).body.data.publicId
    expect(second).not.toBe(first)
    expect((await view(first)).status).toBe(404)
    expect((await view(second)).status).toBe(200)
  })

  it("does not let another learner change sharing", async () => {
    const { id } = (await create(ALICE)).body.data
    expect((await share(BOB, id, true)).status).toBe(404)
    expect((await db.collection('system_maps').findOne({ _id: new ObjectId(id) })).shared).toBeFalsy()
  })

  it('does not count as an edit: revision and updatedAt stay the same', async () => {
    const made = (await create(ALICE)).body.data
    const on = (await share(ALICE, made.id, true)).body.data
    expect(on.revision).toBe(made.revision)
    expect(on.updatedAt).toBe(made.updatedAt)

    // A save after sharing still works with the revision the client had.
    const saved = await request(app)
      .put(`/api/system-maps/${made.id}`)
      .set('Authorization', bearer(ALICE))
      .send({ graph: graph(), revision: made.revision })
    expect(saved.status).toBe(200)
  })

  it('answers 404 for an unknown link and 400 for a malformed one', async () => {
    expect((await view('AAAAAAAAAAAA')).status).toBe(404)
    expect((await view('short')).status).toBe(400)
    expect((await view('has.dots.in!')).status).toBe(400)
  })

  it('serves /public/... from its own route, not /:id', async () => {
    const res = await request(app).get('/api/system-maps/public/AAAAAAAAAAAA')
    expect(res.status).toBe(404)
    expect(res.body.message).toBe('Map not found') // /:id would have answered 401 without a token
  })

  it('validates the sharing body', async () => {
    const { id } = (await create(ALICE)).body.data
    expect((await share(ALICE, id, 'yes')).status).toBe(400)
  })
})

describe('lens', () => {
  it('round-trips a map with a lens and new part kinds; a map without a lens stays valid', async () => {
    const lensed = { v: 1, lens: 'data-storage', nodes: [node('db', { kind: 'primary' }), node('copy', { kind: 'replica' })], edges: [edge('e1', 'db', 'copy')] }
    const made = await create(ALICE, { title: 'Storage', graph: lensed })
    expect(made.status).toBe(201)
    const one = await request(app).get(`/api/system-maps/${made.body.data.id}`).set('Authorization', bearer(ALICE))
    expect(one.body.data.graph).toEqual(lensed)

    const plain = await create(ALICE)
    expect(plain.status).toBe(201)
    expect(plain.body.data.graph.lens).toBeUndefined()
    expect((await create(ALICE, { title: 'Bad', graph: { ...lensed, lens: 'quantum' } })).status).toBe(400)
  })
})
