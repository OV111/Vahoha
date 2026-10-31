/**
 * Comments on the parts of a team map: who may read, write and delete them.
 * Real service and router over an in-memory MongoDB.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import commentRoutes from '../../modules/system-map/routes/comments.routes.js'
import { MAX_COMMENTS_PER_MAP } from '../../modules/system-map/services/commentService.js'
import { deleteMapService } from '../../modules/system-map/services/systemMapService.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let mongod
let client
let db
let app

const ALICE = new ObjectId() // active member, created the map
const CAROL = new ObjectId() // active member
const DAVE = new ObjectId() // left the team
const BOB = new ObjectId() // never on the team
const TEAM = new ObjectId()
const bearer = (id) => `Bearer ${createAccessToken({ id: id.toString() })}`

const graph = { v: 1, nodes: [{ id: 'api', kind: 'server', title: 'API', sub: '', x: 0, y: 0 }], edges: [] }
const insertMap = async (extra = {}) =>
  (
    await db.collection('system_maps').insertOne({
      userId: ALICE,
      ownerType: 'team',
      ownerId: TEAM.toString(),
      title: 'Team map',
      graph,
      revision: 1,
      updatedAt: new Date(),
      ...extra,
    })
  ).insertedId

const post = (mapId, who, body) =>
  request(app).post(`/api/system-maps/${mapId}/comments`).set('Authorization', bearer(who)).send(body)
const list = (mapId, who) => request(app).get(`/api/system-maps/${mapId}/comments`).set('Authorization', bearer(who))

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')
  app = express()
  app.use(express.json())
  app.locals.db = db
  app.use('/api/system-maps', commentRoutes)
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  await Promise.all(['system_maps', 'system_map_comments', 'teams', 'users'].map((c) => db.collection(c).deleteMany({})))
  await db.collection('teams').insertOne({
    _id: TEAM,
    name: 'Team',
    members: [
      { userId: ALICE, status: 'active' },
      { userId: CAROL, status: 'active' },
      { userId: DAVE, status: 'left' },
    ],
  })
  await db.collection('users').insertMany([
    { _id: ALICE, firstName: 'Alice', lastName: 'A', username: 'alice', email: 'alice@example.com' },
    { _id: CAROL, username: 'carol', email: 'carol@example.com' },
  ])
})

describe('comments on a team map', () => {
  it('lets members add and read comments, with author names and no emails', async () => {
    const id = await insertMap()
    const added = await post(id, ALICE, { nodeId: 'api', text: '  why Express here?  ' })
    expect(added.status).toBe(201)
    expect(added.body.data).toMatchObject({ nodeId: 'api', text: 'why Express here?', author: 'Alice A', mine: true })
    await post(id, CAROL, { nodeId: 'api', text: 'it was already in the repo' })

    const res = await list(id, CAROL)
    expect(res.status).toBe(200)
    expect(res.body.data.map((c) => [c.author, c.mine])).toEqual([
      ['Alice A', false],
      ['carol', true],
    ])
    expect(JSON.stringify(res.body)).not.toContain('@example.com')
  })

  it('hides the map from people who are not active members', async () => {
    const id = await insertMap()
    for (const who of [BOB, DAVE]) {
      expect((await list(id, who)).status).toBe(404)
      expect((await post(id, who, { nodeId: 'api', text: 'hi' })).status).toBe(404)
    }
    expect(await db.collection('system_map_comments').countDocuments()).toBe(0)
  })

  it('refuses comments on personal maps', async () => {
    const id = await insertMap({ ownerType: 'personal', ownerId: null })
    expect((await list(id, ALICE)).status).toBe(400)
    expect((await post(id, ALICE, { nodeId: 'api', text: 'hi' })).status).toBe(400)
  })

  it('refuses a part that is not on the saved map, and empty or overlong text', async () => {
    const id = await insertMap()
    expect((await post(id, ALICE, { nodeId: 'ghost', text: 'hi' })).status).toBe(409)
    expect((await post(id, ALICE, { nodeId: 'api', text: '   ' })).status).toBe(400)
    expect((await post(id, ALICE, { nodeId: 'api', text: 'x'.repeat(501) })).status).toBe(400)
  })

  it('stops at the per-map cap', async () => {
    const id = await insertMap()
    await db.collection('system_map_comments').insertMany(
      Array.from({ length: MAX_COMMENTS_PER_MAP }, () => ({ mapId: id, nodeId: 'api', userId: ALICE, text: 'x', createdAt: new Date() })),
    )
    expect((await post(id, CAROL, { nodeId: 'api', text: 'one more' })).status).toBe(409)
  })

  it('lets authors delete only their own comments', async () => {
    const id = await insertMap()
    const { body } = await post(id, ALICE, { nodeId: 'api', text: 'mine' })
    const del = (who) =>
      request(app).delete(`/api/system-maps/${id}/comments/${body.data.id}`).set('Authorization', bearer(who))

    expect((await del(CAROL)).status).toBe(404)
    expect((await del(ALICE)).status).toBe(200)
    expect(await db.collection('system_map_comments').countDocuments()).toBe(0)
  })

  it('keeps comments when their part is removed from the map', async () => {
    const id = await insertMap()
    await post(id, ALICE, { nodeId: 'api', text: 'note' })
    await db.collection('system_maps').updateOne({ _id: id }, { $set: { graph: { ...graph, nodes: [] } } })
    const res = await list(id, ALICE)
    expect(res.body.data).toHaveLength(1)
    expect(res.body.data[0].nodeId).toBe('api')
  })

  it('deletes the comments with the map', async () => {
    const id = await insertMap()
    await post(id, ALICE, { nodeId: 'api', text: 'note' })
    expect(await deleteMapService(db, id.toString(), ALICE)).toBe(true)
    expect(await db.collection('system_map_comments').countDocuments()).toBe(0)
  })

  it('needs a token', async () => {
    const id = await insertMap()
    expect((await request(app).get(`/api/system-maps/${id}/comments`)).status).toBe(401)
  })
})
