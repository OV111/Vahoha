/**
 * Team leaderboard (any signed-in user) and admin health overview. Real MongoDB
 * in memory plus real HTTP, to prove the privacy rule (only teams with live
 * evidence are ranked), the route order ("leaderboard" and "admin" are not team
 * ids) and the admin gate.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'

let mongod
let client
let db
let server
let base

const { createAccessToken } = await import('../../utils/jwtToken.js')

const adminId = new ObjectId()
const viewerId = new ObjectId()
const otherIds = Array.from({ length: 4 }, () => new ObjectId())
const auth = (id) => ({ headers: { Authorization: `Bearer ${createAccessToken({ id })}` } })
const get = async (path, id = viewerId) => {
  const res = await fetch(`${base}${path}`, auth(id))
  return { status: res.status, body: await res.json() }
}

const member = (userId, githubLogin) => ({ userId, githubLogin, status: 'active', joinedAt: new Date() })
const prs = (teamId, authors, mergedAt = new Date()) =>
  authors.map((authorId, i) => ({ teamId, prNumber: i + 1, authorId, authorLogin: 'x', reviewers: ['r'], changedFiles: [], mergedAt }))

const ranked = new ObjectId() // live evidence, 6 PRs
const mine = new ObjectId() // live evidence, viewer is a member, 5 PRs split unevenly
const hidden = new ObjectId() // NO evidence: must never appear on the leaderboard
const revoked = new ObjectId() // evidence revoked: must not appear either
const tooNew = new ObjectId() // live evidence but under MIN_PRS_TO_RANK

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')
  const { createApp } = await import('../../app.js')
  server = createApp(db).listen(0)
  base = `http://127.0.0.1:${server.address().port}/api/teams`
})

afterAll(async () => {
  server.close()
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  for (const c of ['users', 'teams', 'team_contributions', 'team_evidence', 'team_defenses', 'team_ratings']) {
    await db.collection(c).deleteMany({})
  }
  await db.collection('users').insertMany([
    { _id: adminId, username: 'admin', role: 'admin' },
    { _id: viewerId, username: 'viewer' },
  ])
  const repo = (n) => ({ fullName: `org/${n}`, id: n, url: `https://github.com/org/${n}` })
  const [o1, o2, o3, o4] = otherIds
  await db.collection('teams').insertMany([
    { _id: ranked, name: 'Alpha', trackId: 'api-dev', status: 'active', repo: repo(1), members: [member(o1, 'o1'), member(o2, 'o2')] },
    { _id: mine, name: 'Mine', trackId: 'mern', status: 'active', repo: repo(2), members: [member(viewerId, 'me'), member(o3, 'o3')] },
    { _id: hidden, name: 'Hidden', trackId: 'api-dev', status: 'active', repo: repo(3), members: [member(o4, 'o4')] },
    { _id: revoked, name: 'Revoked', trackId: 'api-dev', status: 'active', repo: repo(4), members: [member(o4, 'o4')] },
    { _id: tooNew, name: 'TooNew', trackId: 'api-dev', status: 'forming', repo: null, members: [member(o4, 'o4')] },
  ])
  await db.collection('team_contributions').insertMany([
    ...prs(ranked, [o1, o2, o1, o2, o1, o2]),
    ...prs(mine, [viewerId, viewerId, viewerId, viewerId, viewerId]),
    ...prs(hidden, Array(20).fill(o4)),
    ...prs(revoked, Array(20).fill(o4)),
    ...prs(tooNew, [o4]),
  ])
  const ev = (teamId, publicId, isRevoked = false) => ({ teamId, publicId, revoked: isRevoked, issuedAt: new Date(Date.now() - 86_400_000), snapshot: {} })
  await db.collection('team_evidence').insertMany([
    ev(ranked, 'aaaaaaaaaaaa'), ev(mine, 'bbbbbbbbbbbb'), ev(revoked, 'cccccccccccc', true), ev(tooNew, 'dddddddddddd'),
  ])
})

describe('GET /leaderboard', () => {
  it('requires sign-in', async () => {
    expect((await fetch(`${base}/leaderboard`)).status).toBe(401)
  })

  it('ranks only teams with live evidence and enough PRs, best first', async () => {
    const { status, body } = await get('/leaderboard')
    expect(status).toBe(200)
    expect(body.data.rows.map((r) => [r.rank, r.name])).toEqual([[1, 'Alpha'], [2, 'Mine']])
    expect(body.data.tracks).toEqual(['api-dev', 'mern'])
  })

  it('marks the viewer\'s own team and links each row to its evidence page', async () => {
    const { body } = await get('/leaderboard')
    const row = body.data.rows.find((r) => r.name === 'Mine')
    expect(row.isMine).toBe(true)
    expect(row.evidencePath).toBe('/evidence/bbbbbbbbbbbb')
  })

  it('leaks no internal ids, member names or admin flags', async () => {
    const { body } = await get('/leaderboard')
    const text = JSON.stringify(body)
    for (const id of [ranked, mine, viewerId, ...otherIds]) expect(text).not.toContain(id.toString())
    expect(body.data.rows[0]).not.toHaveProperty('flags')
    expect(body.data.rows[0]).not.toHaveProperty('silentMembers')
  })

  it('filters by track and rejects a malformed one', async () => {
    expect((await get('/leaderboard?track=mern')).body.data.rows.map((r) => r.name)).toEqual(['Mine'])
    expect((await get('/leaderboard?track=Bad%20Track')).status).toBe(400)
  })
})

describe('GET /admin/overview', () => {
  it('is 404 for non-admins', async () => {
    expect((await get('/admin/overview')).status).toBe(404)
  })

  it('lists every team with flags, riskiest first, plus a summary', async () => {
    const { status, body } = await get('/admin/overview', adminId)
    expect(status).toBe(200)
    expect(body.data.rows).toHaveLength(5)
    expect(body.data.rows[0].flags.length).toBeGreaterThan(0)
    const m = body.data.rows.find((r) => r.name === 'Mine')
    expect(m.silentMembers).toEqual(['o3'])
    expect(m.flags).toContain('evidence-stale') // PRs merged after the evidence was issued
    expect(body.data.summary).toMatchObject({ activeTeams: 5, liveEvidence: 3 })
  })
})
