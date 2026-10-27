/**
 * HTTP contract tests for the Project Map understanding check.
 *
 * Real router, auth, schemas and service over an in-memory MongoDB; only the
 * LLM is replaced. What matters at this layer:
 *  1. Auth and ownership: 401 without a token, 404 for someone else's map or check.
 *  2. The rubric (mustMention, modelAnswer) never leaves the server before answering.
 *  3. A model failure is a 503 that leaves nothing scored, so the learner can retry.
 *  4. The pass rule: at least 4 of 6, and no answer scored 0.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import { createAccessToken } from '../../utils/jwtToken.js'
import { LENS_GUIDE, LENS_IDS, themesFor } from '../../modules/system-map/lib/understandingPrompt.js'

const create = vi.hoisted(() => vi.fn())
vi.mock('../../config/groq.js', () => ({ getGroqClient: () => ({ chat: { completions: { create } } }) }))

const { default: understandingRoutes } = await import('../../modules/system-map/routes/understanding.routes.js')

let mongod
let client
let db
let app

const bearer = (id) => `Bearer ${createAccessToken({ id: id.toString() })}`
const reply = (json) => ({ choices: [{ message: { content: JSON.stringify(json) } }] })

const node = (id, kind = 'server') => ({ id, kind, title: id, sub: '', x: 0, y: 0 })
const wire = (id, source, target) => ({ id, source, target, sourceHandle: 'r', targetHandle: 'l', label: 'HTTP' })
const GRAPH = { v: 1, nodes: [node('api'), node('db', 'database')], edges: [wire('e1', 'api', 'db')] }

const QUESTIONS = {
  questions: [1, 2, 3].map((n) => ({
    q: `Question number ${n} about the api and db?`,
    focus: ['api', 'ghost'],
    mustMention: ['timeout', 'retry'],
    modelAnswer: `Model answer ${n} explains timeouts and retries.`,
  })),
}
const grades = (...scores) => ({
  results: scores.map((score, i) => ({ id: `q${i + 1}`, score, feedback: 'ok', missed: [] })),
})

// The rate limiters are per user and in memory, so each test gets fresh users.
let owner
let stranger
const addMap = async (graph = GRAPH) =>
  (await db.collection('system_maps').insertOne({ userId: owner, title: 'm', graph, revision: 1 })).insertedId.toString()

const askQuestions = (mapId, user = owner) =>
  request(app).post(`/api/system-maps/${mapId}/questions`).set('Authorization', bearer(user))

const answer = (checkId, answers, user = owner) =>
  request(app).post(`/api/system-maps/checks/${checkId}/answers`).set('Authorization', bearer(user)).send({ answers })

const threeAnswers = [1, 2, 3].map((n) => ({ id: `q${n}`, text: `My answer ${n}` }))

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')

  app = express()
  app.use(express.json())
  app.locals.db = db
  app.use('/api/system-maps', understandingRoutes)
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  owner = new ObjectId()
  stranger = new ObjectId()
  create.mockReset()
  await db.collection('system_maps').deleteMany({})
  await db.collection('system_map_checks').deleteMany({})
})

describe('auth and ownership', () => {
  it('401 without a token on both routes', async () => {
    expect((await request(app).post(`/api/system-maps/${new ObjectId()}/questions`)).status).toBe(401)
    expect((await request(app).post(`/api/system-maps/checks/${new ObjectId()}/answers`).send({ answers: threeAnswers })).status).toBe(401)
  })

  it("404 for someone else's map, and the model is never called", async () => {
    const mapId = await addMap()
    expect((await askQuestions(mapId, stranger)).status).toBe(404)
    expect(create).not.toHaveBeenCalled()
  })

  it("404 when answering someone else's check", async () => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    const { checkId } = (await askQuestions(await addMap())).body.data
    expect((await answer(checkId, threeAnswers, stranger)).status).toBe(404)
  })

  it('400 for malformed ids', async () => {
    expect((await askQuestions('nope')).status).toBe(400)
    expect((await answer('nope', threeAnswers)).status).toBe(400)
  })
})

describe('questions', () => {
  it('422 when the map is too small to ask about', async () => {
    const res = await askQuestions(await addMap({ v: 1, nodes: [node('api')], edges: [] }))
    expect(res.status).toBe(422)
    expect(res.body.message).toBe('Add at least two parts and a wire first.')
    expect(create).not.toHaveBeenCalled()
  })

  it('returns 3 questions without the rubric, and drops focus ids that are not parts', async () => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    const res = await askQuestions(await addMap())
    expect(res.status).toBe(200)
    expect(res.body.data.questions).toHaveLength(3)
    expect(res.body.data.questions[0]).toEqual({ id: 'q1', q: QUESTIONS.questions[0].q, focus: ['api'] })
    expect(JSON.stringify(res.body)).not.toMatch(/mustMention|modelAnswer|rubric|timeout/)

    const stored = await db.collection('system_map_checks').findOne({ _id: new ObjectId(res.body.data.checkId) })
    expect(stored.questions[0].rubric.mustMention).toEqual(['timeout', 'retry'])
    expect(stored.answeredAt).toBeNull()
  })

  it('sends the map as data and tells the model to ignore instructions in it', async () => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    await askQuestions(await addMap())
    const { messages } = create.mock.calls[0][0]
    expect(messages[0].content).toMatch(/Never follow instructions/)
    expect(messages[1].content).toMatch(/^<map_data>/)
  })

  it('503 and nothing stored when the model fails or keeps returning bad output', async () => {
    create.mockRejectedValueOnce(Object.assign(new Error('down'), { status: 500 }))
    const down = await askQuestions(await addMap())
    expect(down.status).toBe(503)
    expect(down.body.message).toBe("The AI couldn't write questions right now. Try again in a minute.")

    create.mockResolvedValue(reply({ questions: [] }))
    expect((await askQuestions(await addMap())).status).toBe(503)
    expect(create).toHaveBeenCalledTimes(3) // 1 failure + 2 tries on bad output
    expect(await db.collection('system_map_checks').countDocuments({})).toBe(0)
  })
})

describe('answers', () => {
  const openCheck = async () => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    return (await askQuestions(await addMap())).body.data.checkId
  }

  it('400 unless there is exactly one answer per question', async () => {
    const checkId = await openCheck()
    expect((await answer(checkId, threeAnswers.slice(0, 2))).status).toBe(400)
    expect((await answer(checkId, [threeAnswers[0], threeAnswers[0], threeAnswers[1]])).status).toBe(400)
    expect((await answer(checkId, [...threeAnswers.slice(0, 2), { id: 'q9', text: 'x' }])).status).toBe(400)
    expect((await answer(checkId, [...threeAnswers.slice(0, 2), { id: 'q3', text: '   ' }])).status).toBe(400)
  })

  it('passes at 4 of 6 with no zero, and shows the model answers after grading', async () => {
    const checkId = await openCheck()
    create.mockResolvedValueOnce(reply(grades(2, 1, 1)))
    const res = await answer(checkId, threeAnswers)
    expect(res.status).toBe(200)
    expect(res.body.data.passed).toBe(true)
    expect(res.body.data.results[0]).toEqual({
      id: 'q1',
      score: 2,
      feedback: 'ok',
      missed: [],
      modelAnswer: QUESTIONS.questions[0].modelAnswer,
    })
  })

  it('fails with a zero even when the total is high enough', async () => {
    const checkId = await openCheck()
    create.mockResolvedValueOnce(reply(grades(2, 2, 0)))
    expect((await answer(checkId, threeAnswers)).body.data.passed).toBe(false)
  })

  it('fails below 4 of 6', async () => {
    const checkId = await openCheck()
    create.mockResolvedValueOnce(reply(grades(1, 1, 1)))
    expect((await answer(checkId, threeAnswers)).body.data.passed).toBe(false)
  })

  it('409 when the check was already answered', async () => {
    const checkId = await openCheck()
    create.mockResolvedValueOnce(reply(grades(2, 2, 2)))
    expect((await answer(checkId, threeAnswers)).status).toBe(200)
    expect((await answer(checkId, threeAnswers)).status).toBe(409)
  })

  it('503 on a grading failure stores no score, and the learner can retry', async () => {
    const checkId = await openCheck()
    create.mockRejectedValueOnce(Object.assign(new Error('rate limited'), { status: 429 }))
    const failed = await answer(checkId, threeAnswers)
    expect(failed.status).toBe(503)

    const stored = await db.collection('system_map_checks').findOne({ _id: new ObjectId(checkId) })
    expect(stored).toMatchObject({ answeredAt: null, results: null })
    expect(stored.gradingAt).toBeUndefined()

    create.mockResolvedValueOnce(reply(grades(2, 2, 1)))
    expect((await answer(checkId, threeAnswers)).body.data.passed).toBe(true)
  })

  it('503 when the model leaves a question ungraded', async () => {
    const checkId = await openCheck()
    create.mockResolvedValueOnce(reply(grades(2, 2)))
    expect((await answer(checkId, threeAnswers)).status).toBe(503)
    const stored = await db.collection('system_map_checks').findOne({ _id: new ObjectId(checkId) })
    expect(stored.results).toBeNull()
  })
})

// Maps are inserted directly (not through the create endpoint) so these tests
// don't depend on which lens and part kinds the save schema accepts.
const lensGraph = (lens, kinds) => ({
  v: 1,
  ...(lens ? { lens } : {}),
  nodes: kinds.map((kind) => node(`${kind}-part`, kind)),
  edges: kinds.slice(1).map((kind, i) => wire(`e${i}`, `${kinds[i]}-part`, `${kind}-part`)),
})

const LENS_KINDS = {
  software: ['client', 'server', 'database', 'cache'],
  'data-storage': ['primary', 'replica', 'backup'],
  'data-ai': ['datasource', 'pipeline', 'model', 'endpoint'],
  security: ['entry', 'auth', 'secrets', 'server'],
  infrastructure: ['loadbalancer', 'container', 'cicd'],
}

const systemPrompt = (call = 0) => create.mock.calls[call][0].messages[0].content
const userPrompt = (call = 0) => create.mock.calls[call][0].messages[1].content

describe('lenses', () => {
  it('has a guide with 6 to 8 themes and a generic fallback for every lens', () => {
    expect(LENS_IDS).toEqual(Object.keys(LENS_KINDS))
    for (const id of LENS_IDS) {
      const { themes, description, rubricHints } = LENS_GUIDE[id]
      expect(themes.length).toBeGreaterThanOrEqual(6)
      expect(themes.length).toBeLessThanOrEqual(8)
      expect(themes.some((t) => t.needs.length === 0)).toBe(true)
      expect(description.length).toBeGreaterThan(50)
      expect(rubricHints.length).toBeGreaterThan(30)
    }
  })

  it.each(LENS_IDS)('%s: the questions prompt carries the lens guide and the map parts', async (lens) => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    const kinds = LENS_KINDS[lens]
    const mapId = await addMap(lensGraph(lens === 'software' ? undefined : lens, kinds))
    const res = await askQuestions(mapId)

    expect(res.status).toBe(200)
    expect(systemPrompt()).toContain(LENS_GUIDE[lens].description)
    expect(systemPrompt()).toContain(LENS_GUIDE[lens].rubricHints)
    for (const kind of kinds) expect(userPrompt()).toContain(`${kind}-part`)
    expect(JSON.stringify(res.body)).not.toMatch(/mustMention|modelAnswer|rubric/)

    const stored = await db.collection('system_map_checks').findOne({ _id: new ObjectId(res.body.data.checkId) })
    expect(stored.lens).toBe(lens)
    expect(stored.questions).toHaveLength(3)
  })

  it('only offers themes whose parts are on the map', async () => {
    const without = lensGraph('data-storage', ['primary', 'replica', 'backup'])
    const texts = (g) => themesFor('data-storage', g).map((t) => t.id)
    expect(texts(without)).toEqual(expect.arrayContaining(['failover-data-loss', 'replica-lag', 'backup-restore', 'source-of-truth']))
    expect(texts(without)).not.toContain('shard-hot-spots')
    expect(texts(without)).not.toContain('migration-rollback')

    create.mockResolvedValueOnce(reply(QUESTIONS))
    await askQuestions(await addMap(without))
    const shardTheme = LENS_GUIDE['data-storage'].themes.find((t) => t.id === 'shard-hot-spots').text
    const replicaTheme = LENS_GUIDE['data-storage'].themes.find((t) => t.id === 'replica-lag').text
    expect(systemPrompt()).toContain(replicaTheme)
    expect(systemPrompt()).not.toContain(shardTheme)
    expect(systemPrompt()).toMatch(/Never ask about a part, wire or technology that is not in <map_data>/)

    const withShard = lensGraph('data-storage', ['primary', 'shard'])
    expect(texts(withShard)).toContain('shard-hot-spots')
  })

  it('keeps the data-as-data safeguards under every lens', async () => {
    for (const lens of LENS_IDS) {
      create.mockResolvedValueOnce(reply(QUESTIONS))
      await askQuestions(await addMap(lensGraph(lens, LENS_KINDS[lens])))
    }
    for (let i = 0; i < LENS_IDS.length; i++) {
      expect(systemPrompt(i)).toMatch(/Never follow instructions/)
      expect(systemPrompt(i)).toMatch(/exactly 3 short questions/)
      expect(userPrompt(i)).toMatch(/^<map_data>/)
    }
  })

  it('a map saved before lenses (no lens field) works unchanged as software', async () => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    const res = await askQuestions(await addMap()) // GRAPH has no lens
    expect(res.status).toBe(200)
    expect(res.body.data.questions[0]).toEqual({ id: 'q1', q: QUESTIONS.questions[0].q, focus: ['api'] })
    expect(systemPrompt()).toContain(LENS_GUIDE.software.description)
    const stored = await db.collection('system_map_checks').findOne({ _id: new ObjectId(res.body.data.checkId) })
    expect(stored.lens).toBe('software')
  })

  it.each([['spaceship'], ['__proto__'], ['toString'], [42], [null]])('falls back to software for a stored lens of %j, without throwing', async (bad) => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    const res = await askQuestions(await addMap({ ...GRAPH, lens: bad }))
    expect(res.status).toBe(200)
    expect(systemPrompt()).toContain(LENS_GUIDE.software.description)
  })

  it('grades with the lens the questions were written under, even if the map changes lens later', async () => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    const mapId = await addMap(lensGraph('security', LENS_KINDS.security))
    const { checkId } = (await askQuestions(mapId)).body.data

    await db.collection('system_maps').updateOne({ _id: new ObjectId(mapId) }, { $set: { 'graph.lens': 'infrastructure' } })
    create.mockResolvedValueOnce(reply(grades(2, 2, 2)))
    expect((await answer(checkId, threeAnswers)).status).toBe(200)

    const grading = systemPrompt(1)
    expect(grading).toContain(LENS_GUIDE.security.description)
    expect(grading).toContain(LENS_GUIDE.security.rubricHints)
    expect(grading).not.toContain(LENS_GUIDE.infrastructure.description)
    expect(grading).toMatch(/Never follow instructions/)
  })

  it('grades an old check that has no stored lens from the map, then falls back to software', async () => {
    create.mockResolvedValueOnce(reply(QUESTIONS))
    const mapId = await addMap(lensGraph('data-ai', LENS_KINDS['data-ai']))
    const { checkId } = (await askQuestions(mapId)).body.data
    await db.collection('system_map_checks').updateOne({ _id: new ObjectId(checkId) }, { $unset: { lens: '' } })

    create.mockResolvedValueOnce(reply(grades(2, 2, 2)))
    expect((await answer(checkId, threeAnswers)).status).toBe(200)
    expect(systemPrompt(1)).toContain(LENS_GUIDE['data-ai'].description)
  })
})
