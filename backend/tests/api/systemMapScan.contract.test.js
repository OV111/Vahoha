/**
 * HTTP contract tests for POST /api/system-maps/scan and for repo evidence on
 * saved maps. Real router, schemas and controllers over an in-memory MongoDB;
 * GitHub and the LLM are replaced with plain fakes (no network, no Atlas).
 */
import process from 'node:process'
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import { createAccessToken } from '../../utils/jwtToken.js'

// A fake repo the GitHub fake serves. Plain functions, not throwing vi.fn
// mocks, so a test can switch GitHub "down" with a flag.
const fake = { repo: null, files: {}, down: null, model: null }

vi.mock('../../modules/capstone/services/githubClient.js', () => {
  const fail = () => {
    const err = new Error(fake.down.message)
    err.status = fake.down.status
    throw err
  }
  return {
    getRepo: async () => (fake.down ? fail() : fake.repo),
    getHeadCommit: async () => (fake.repo ? { sha: 'a'.repeat(40), treeSha: 'b'.repeat(40) } : null),
    getTree: async () => {
      const entries = Object.keys(fake.files).map((path) => ({ path, size: 100 }))
      return { truncated: false, paths: entries.map((e) => e.path), entries }
    },
    getFileText: async (_fullName, _sha, path) => fake.files[path] ?? null,
  }
})

vi.mock('../../modules/capstone/services/reviewModel.js', () => ({
  runStructured: async (...args) => fake.model(...args),
}))

const { default: systemMapRoutes } = await import('../../modules/system-map/index.js')

let mongod
let client
let db
let app

// A fresh user per request keeps the per-user rate limiters out of the way.
const bearer = (id = new ObjectId()) => `Bearer ${createAccessToken({ id: id.toString() })}`
const scanAs = (body, auth = bearer()) => request(app).post('/api/system-maps/scan').set('Authorization', auth).send(body)

const REPO = { fullName: 'ada/shop', htmlUrl: 'https://github.com/ada/shop', private: false }
const pkg = (deps) => JSON.stringify({ dependencies: deps })

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
  Object.assign(fake, {
    repo: REPO,
    files: { 'package.json': pkg({ express: '5', mongoose: '8' }), 'client/package.json': pkg({ react: '19' }) },
    down: null,
    model: null,
  })
  delete process.env.GROQ_API_KEY
  await db.collection('system_maps').deleteMany({})
})

describe('POST /api/system-maps/scan', () => {
  it('answers 401 without a token', async () => {
    expect((await request(app).post('/api/system-maps/scan').send({ repoUrl: 'https://github.com/ada/shop' })).status).toBe(401)
  })

  it('returns parts with evidence and wires (and is not swallowed by /:id)', async () => {
    const res = await scanAs({ repoUrl: 'https://github.com/ada/shop' })
    expect(res.status).toBe(200)
    expect(res.body.data.repo).toEqual({ fullName: 'ada/shop', sha: 'a'.repeat(40), htmlUrl: 'https://github.com/ada/shop' })
    expect(res.body.data.ai).toBe(false)
    expect(res.body.data.parts.map((p) => p.key).sort()).toEqual(['client-react', 'database-mongodb', 'server-express'])
    for (const part of res.body.data.parts) {
      expect(Object.keys(part).sort()).toEqual(['evidence', 'key', 'kind', 'sub', 'title', 'why'])
      expect(part.evidence.length).toBeGreaterThan(0)
    }
    expect(res.body.data.wires).toEqual(
      expect.arrayContaining([{ source: 'client-react', target: 'server-express', label: 'HTTP' }]),
    )
  })

  it.each([
    ['another host', 'https://gitlab.com/ada/shop'],
    ['an internal address', 'http://169.254.169.254/latest'],
    ['a sub-path', 'https://github.com/ada/shop/tree/main'],
  ])('rejects %s with 400', async (_name, repoUrl) => {
    expect((await scanAs({ repoUrl })).status).toBe(400)
  })

  it('rejects a missing body field with 400', async () => {
    expect((await scanAs({})).status).toBe(400)
  })

  it('answers 404 for a missing or private repo', async () => {
    fake.repo = null
    const missing = await scanAs({ repoUrl: 'github.com/ada/nope' })
    expect(missing.status).toBe(404)
    expect(missing.body.message).toBe("We couldn't find that repo, or it's private.")

    fake.repo = { ...REPO, private: true }
    expect((await scanAs({ repoUrl: 'github.com/ada/shop' })).status).toBe(404)
  })

  it('answers 422 when nothing is recognised', async () => {
    fake.files = { 'package.json': pkg({ lodash: '4' }), 'README.md': '# hi' }
    const res = await scanAs({ repoUrl: 'github.com/ada/shop' })
    expect(res.status).toBe(422)
    expect(res.body.message).toBe("We couldn't recognise any parts in this repo yet.")
  })

  it('passes GitHub outages through as 502/503 with their message', async () => {
    fake.down = { status: 503, message: 'GitHub is rate limiting us. Try again in a few minutes.' }
    const res = await scanAs({ repoUrl: 'github.com/ada/shop' })
    expect(res.status).toBe(503)
    expect(res.body.message).toBe(fake.down.message)
  })

  it('uses AI labels but ignores parts the model invents', async () => {
    process.env.GROQ_API_KEY = 'test'
    fake.model = () => ({
      content: JSON.stringify({
        parts: [
          { key: 'server-express', title: 'Shop API', sub: 'Express 5', why: 'Serves orders.' },
          { key: 'payments-backdoor', title: 'Evil', sub: '', why: '' },
        ],
        wires: [{ source: 'server-express', target: 'payments-backdoor', label: 'x' }],
      }),
    })
    const res = await scanAs({ repoUrl: 'github.com/ada/shop' })
    expect(res.body.data.ai).toBe(true)
    expect(res.body.data.parts.map((p) => p.key)).not.toContain('payments-backdoor')
    expect(res.body.data.parts.find((p) => p.key === 'server-express')).toMatchObject({ title: 'Shop API', sub: 'Express 5' })
    expect(res.body.data.wires.every((w) => w.target !== 'payments-backdoor')).toBe(true)
  })

  it('falls back to scanner labels with ai:false when the model fails', async () => {
    process.env.GROQ_API_KEY = 'test'
    vi.spyOn(console, 'error').mockImplementation(() => {})
    fake.model = () => ({ content: 'not json' })
    const res = await scanAs({ repoUrl: 'github.com/ada/shop' })
    expect(res.status).toBe(200)
    expect(res.body.data.ai).toBe(false)
    expect(res.body.data.parts.find((p) => p.key === 'server-express').title).toBe('Express API')
  })
})

describe('repo evidence on saved maps', () => {
  const owner = new ObjectId()
  const node = (id, extra = {}) => ({ id, kind: 'server', title: id, sub: '', x: 0, y: 0, ...extra })
  const create = (graph) =>
    request(app).post('/api/system-maps').set('Authorization', bearer(owner)).send({ title: 'Shop', graph })

  it('saves and returns evidence and the scanned repo', async () => {
    const graph = {
      v: 1,
      nodes: [node('api', { evidence: ['package.json', 'src/server.js'] }), node('ui')],
      edges: [],
      repo: { fullName: 'ada/shop', sha: 'abc1234' },
    }
    const made = await create(graph)
    expect(made.status).toBe(201)
    const one = await request(app).get(`/api/system-maps/${made.body.data.id}`).set('Authorization', bearer(owner))
    expect(one.body.data.graph).toEqual(graph)
  })

  it('still accepts a hand-drawn map without evidence or repo', async () => {
    expect((await create({ v: 1, nodes: [node('a')], edges: [] })).status).toBe(201)
  })

  it.each([
    ['an absolute path', ['/etc/passwd']],
    ['a parent path', ['src/../../secret']],
    ['a backslash path', ['src\\app.js']],
    ['an empty path', ['']],
    ['too many paths', Array.from({ length: 6 }, (_, i) => `f${i}.js`)],
  ])('rejects %s in evidence', async (_name, evidence) => {
    const res = await create({ v: 1, nodes: [node('a', { evidence })], edges: [] })
    expect(res.status).toBe(400)
    expect(await db.collection('system_maps').countDocuments({})).toBe(0)
  })

  it('rejects a malformed repo', async () => {
    const res = await create({ v: 1, nodes: [node('a')], edges: [], repo: { fullName: 'not a repo', sha: 'zzz' } })
    expect(res.status).toBe(400)
  })
})

describe('lenses', () => {
  const owner = new ObjectId()
  const node = (id, extra = {}) => ({ id, kind: 'server', title: id, sub: '', x: 0, y: 0, ...extra })
  const create = (graph) =>
    request(app).post('/api/system-maps').set('Authorization', bearer(owner)).send({ title: 'Lens map', graph })
  const kinds = (res) => res.body.data.parts.map((p) => p.kind)

  it('scans the software lens by default and says so', async () => {
    const res = await scanAs({ repoUrl: 'github.com/ada/shop' })
    expect(res.status).toBe(200)
    expect(res.body.data.lens).toBe('software')
    expect(res.body.data.parts.map((p) => p.key).sort()).toEqual(['client-react', 'database-mongodb', 'server-express'])
  })

  it('scans a data-storage repo: primary, replica, backup and migrations', async () => {
    fake.files = {
      'package.json': pkg({ express: '5', pg: '8', knex: '3' }),
      'docker-compose.yml': 'services:\n  db:\n    image: postgres:16\n    environment:\n      POSTGRES_REPLICATION_MODE: master\n',
      'scripts/backup.sh': 'pg_dump "$DATABASE_URL" > dump.sql',
    }
    const res = await scanAs({ repoUrl: 'github.com/ada/shop', lens: 'data-storage' })
    expect(res.status).toBe(200)
    expect(res.body.data.lens).toBe('data-storage')
    expect(res.body.data.parts.map((p) => p.key).sort()).toEqual([
      'backup-backup',
      'migration-knex',
      'primary-postgresql',
      'replica-replica',
      'server-express',
    ])
    expect(res.body.data.wires).toEqual(
      expect.arrayContaining([
        { source: 'server-express', target: 'primary-postgresql', label: 'writes' },
        { source: 'primary-postgresql', target: 'replica-replica', label: 'replicates' },
        { source: 'primary-postgresql', target: 'backup-backup', label: 'snapshots' },
      ]),
    )
  })

  it('scans a data-ai repo', async () => {
    fake.files = { 'requirements.txt': 'torch\nmlflow\nfastapi\nkaggle\n', 'dvc.yaml': 'stages:\n  train:\n    cmd: python train.py\n' }
    const res = await scanAs({ repoUrl: 'github.com/ada/shop', lens: 'data-ai' })
    expect(res.status).toBe(200)
    expect(res.body.data.parts.map((p) => p.key).sort()).toEqual([
      'datasource-kaggle',
      'endpoint-fastapi',
      'evaluation-mlflow',
      'model-pytorch',
      'pipeline-dvc',
    ])
  })

  it('scans a security repo and an infrastructure repo', async () => {
    fake.files = {
      'package.json': pkg({ express: '5', helmet: '8', jsonwebtoken: '9' }),
      '.env.example': 'JWT_SECRET=\n',
      'Dockerfile': 'FROM node:22\nEXPOSE 3000\n',
    }
    const security = await scanAs({ repoUrl: 'github.com/ada/shop', lens: 'security' })
    expect(security.status).toBe(200)
    expect(kinds(security).sort()).toEqual(['auth', 'entry', 'firewall', 'secrets', 'server'])

    fake.files = {
      Dockerfile: 'FROM node:22\n',
      'infra/main.tf': 'resource "aws_route53_record" "www" {}\nresource "aws_lb" "main" {}\n',
      '.github/workflows/deploy.yml': 'name: deploy\n',
    }
    const infra = await scanAs({ repoUrl: 'github.com/ada/shop', lens: 'infrastructure' })
    expect(infra.status).toBe(200)
    expect(kinds(infra).sort()).toEqual(['cicd', 'container', 'dns', 'loadbalancer'])
  })

  it('only returns kinds from the requested lens', async () => {
    fake.files = {
      'package.json': pkg({ express: '5', mongoose: '8', ioredis: '5', stripe: '17' }),
      Dockerfile: 'FROM node:22\n',
    }
    const palettes = {
      software: ['client', 'server', 'database', 'cache', 'queue', 'worker', 'external', 'storage'],
      'data-storage': ['server', 'primary', 'replica', 'shard', 'cache', 'backup', 'migration', 'storage'],
      security: ['client', 'entry', 'firewall', 'auth', 'server', 'database', 'secrets', 'external'],
      infrastructure: ['client', 'dns', 'loadbalancer', 'container', 'cluster', 'cicd', 'database', 'storage'],
    }
    for (const [lens, palette] of Object.entries(palettes)) {
      const res = await scanAs({ repoUrl: 'github.com/ada/shop', lens })
      expect(res.status).toBe(200)
      expect(kinds(res).every((k) => palette.includes(k)), lens).toBe(true)
    }
  })

  it('answers 422 when the repo has nothing for the requested lens', async () => {
    fake.files = { 'package.json': pkg({ express: '5' }) }
    const res = await scanAs({ repoUrl: 'github.com/ada/shop', lens: 'data-ai' })
    expect(res.status).toBe(422)
  })

  it.each([['unknown'], [''], [42], [null]])('rejects the lens %j with 400', async (lens) => {
    expect((await scanAs({ repoUrl: 'github.com/ada/shop', lens })).status).toBe(400)
  })

  it('tells the model which lens it is labelling, as context only', async () => {
    process.env.GROQ_API_KEY = 'test'
    let sent
    fake.files = { 'requirements.txt': 'torch\nfastapi\n' }
    fake.model = (messages) => {
      sent = messages
      return { content: JSON.stringify({ parts: [], wires: [] }) }
    }
    const res = await scanAs({ repoUrl: 'github.com/ada/shop', lens: 'data-ai' })
    expect(res.status).toBe(200)
    expect(JSON.parse(sent[1].content).lens).toBe('data-ai')
  })

  it('saves the lens with the map and returns it', async () => {
    const graph = { v: 1, lens: 'security', nodes: [node('fw', { kind: 'firewall' }), node('api')], edges: [] }
    const made = await create(graph)
    expect(made.status).toBe(201)
    const one = await request(app).get(`/api/system-maps/${made.body.data.id}`).set('Authorization', bearer(owner))
    expect(one.body.data.graph).toEqual(graph)
  })

  it('keeps old maps without a lens valid', async () => {
    const made = await create({ v: 1, nodes: [node('a')], edges: [] })
    expect(made.status).toBe(201)
    expect(made.body.data.graph.lens).toBeUndefined()
  })

  it.each([
    ['an unknown lens', { lens: 'quantum', nodes: [node('a')], edges: [] }],
    ['an unknown part kind', { nodes: [node('a', { kind: 'spaceship' })], edges: [] }],
  ])('rejects %s on save', async (_name, patch) => {
    expect((await create({ v: 1, ...patch })).status).toBe(400)
  })

  it.each([
    'primary', 'replica', 'shard', 'backup', 'migration',
    'datasource', 'pipeline', 'featurestore', 'model', 'evaluation', 'endpoint',
    'entry', 'auth', 'secrets', 'firewall',
    'loadbalancer', 'container', 'cicd', 'cluster', 'dns',
  ])('accepts the %s part kind', async (kind) => {
    expect((await create({ v: 1, nodes: [node('a', { kind })], edges: [] })).status).toBe(201)
  })
})
