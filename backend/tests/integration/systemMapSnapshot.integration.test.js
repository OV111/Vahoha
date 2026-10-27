/**
 * Integration tests for the system-map snapshots other modules show publicly:
 * the team's map on the evidence page, and shared capstone maps on the
 * recruiter scorecard. Real services over an in-memory MongoDB.
 *
 * What matters here:
 *  1. Privacy: a public payload never carries user ids, emails or the map's
 *     own sharing id, even if the stored document has extra fields.
 *  2. Scope: a team map never appears via a personal or capstone map, and a
 *     capstone map reaches a recruiter only when its owner shared it.
 *  3. Consent: the evidence page shows the map as of the last issue, and a
 *     revoked page shows nothing.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import { getTeamMapSnapshot, listSharedCapstoneMaps } from '../../modules/system-map/services/snapshotService.js'
import {
  getPublicEvidenceService,
  issueEvidenceService,
  setEvidenceRevokedService,
} from '../../modules/teams/services/evidenceService.js'
import { loadScorecard } from '../../modules/recruiter/services/scorecardService.js'

let mongod
let client
let db

const ADMIN = new ObjectId()
const ALICE = new ObjectId()
const BOB = new ObjectId()

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
    ['system_maps', 'teams', 'team_evidence', 'team_contributions', 'team_defenses', 'team_ratings', 'users', 'userProgress', 'examHistory', 'userEvents']
      .map((c) => db.collection(c).deleteMany({})),
  )
})

const node = (id, extra = {}) => ({ id, kind: 'server', title: id, sub: 'x', x: 1, y: 2, ...extra })
const graph = (extra = {}) => ({
  v: 1,
  nodes: [node('api', { evidence: ['package.json'] }), node('db', { kind: 'database' })],
  edges: [{ id: 'e1', source: 'api', target: 'db', sourceHandle: 'r', targetHandle: 'l', label: 'SQL' }],
  repo: { fullName: 'team/shop', sha: 'abc1234' },
  ...extra,
})

const addMap = (fields) =>
  db.collection('system_maps').insertOne({
    userId: ALICE,
    ownerType: 'personal',
    title: 'Map',
    graph: graph(),
    shared: false,
    publicId: null,
    revision: 1,
    updatedAt: new Date('2026-10-01'),
    ...fields,
  })

const addTeam = async () => {
  const { insertedId } = await db.collection('teams').insertOne({
    name: 'Team 1',
    trackId: 'api-dev',
    status: 'active',
    repo: { fullName: 'team/shop', id: 1, url: 'https://github.com/team/shop' },
    members: [{ userId: ALICE, githubLogin: 'alice', status: 'active', joinedAt: new Date() }],
    createdAt: new Date(),
    updatedAt: new Date(),
  })
  return insertedId
}

describe('getTeamMapSnapshot', () => {
  it('is null when the team has no map', async () => {
    expect(await getTeamMapSnapshot(db, new ObjectId())).toBeNull()
  })

  it("returns only the team's own map, never a personal or capstone one", async () => {
    const teamId = new ObjectId()
    await addMap({ ownerType: 'personal', title: 'Personal' })
    await addMap({ ownerType: 'capstone', ownerId: teamId.toString(), title: 'Capstone' })
    expect(await getTeamMapSnapshot(db, teamId)).toBeNull()

    await addMap({ ownerType: 'team', ownerId: teamId.toString(), title: 'Team map', graph: graph({ lens: 'security' }) })
    const snap = await getTeamMapSnapshot(db, teamId)
    expect(snap).toMatchObject({ title: 'Team map', lens: 'security' })
    expect(snap.graph.nodes.map((n) => n.id)).toEqual(['api', 'db'])
    expect(snap.graph.nodes[0].evidence).toEqual(['package.json']) // the repo proof is kept
    expect(snap.graph.repo).toEqual({ fullName: 'team/shop', sha: 'abc1234' })
  })

  it('whitelists fields, so extra stored data cannot leak', async () => {
    const teamId = new ObjectId()
    await addMap({
      ownerType: 'team',
      ownerId: teamId.toString(),
      graph: graph({ editedBy: 'alice@example.com', nodes: [node('api', { lastEditor: 'bob@example.com' })] }),
      drift: { note: 'secret' },
    })
    const json = JSON.stringify(await getTeamMapSnapshot(db, teamId))
    expect(json).not.toMatch(/example\.com|editedBy|lastEditor|secret|userId|publicId|revision/i)
  })

  it('defaults the lens to software', async () => {
    const teamId = new ObjectId()
    await addMap({ ownerType: 'team', ownerId: teamId.toString() })
    expect((await getTeamMapSnapshot(db, teamId)).lens).toBe('software')
  })
})

describe('listSharedCapstoneMaps', () => {
  it("lists only this learner's shared capstone maps", async () => {
    await addMap({ ownerType: 'capstone', ownerId: 'api-dev', title: 'Shared', shared: true, publicId: 'abcdefghijkl' })
    await addMap({ ownerType: 'capstone', ownerId: 'mern', title: 'Not shared' })
    await addMap({ ownerType: 'personal', title: 'Personal shared', shared: true, publicId: 'zzzzzzzzzzzz' })
    await addMap({ ownerType: 'team', ownerId: 't1', title: 'Team shared', shared: true, publicId: 'yyyyyyyyyyyy' })
    await addMap({ userId: BOB, ownerType: 'capstone', ownerId: 'api-dev', title: "Bob's", shared: true, publicId: 'xxxxxxxxxxxx' })

    const maps = await listSharedCapstoneMaps(db, ALICE)
    expect(maps).toEqual([{ trackId: 'api-dev', title: 'Shared', publicId: 'abcdefghijkl', updatedAt: expect.any(Date) }])
    expect(await listSharedCapstoneMaps(db, new ObjectId())).toEqual([])
  })

  it('accepts the id as a string too', async () => {
    await addMap({ ownerType: 'capstone', ownerId: 'api-dev', shared: true, publicId: 'abcdefghijkl' })
    expect(await listSharedCapstoneMaps(db, ALICE.toString())).toHaveLength(1)
  })
})

describe('team evidence with a map', () => {
  it('puts the map in the public page and leaks no private fields', async () => {
    const teamId = await addTeam()
    await db.collection('users').insertOne({ _id: ALICE, firstName: 'Alice', lastName: 'A', username: 'alice', email: 'alice@example.com' })
    await addMap({ ownerType: 'team', ownerId: teamId.toString(), title: 'Team map', graph: graph({ lens: 'data-storage' }) })

    const { publicId } = await issueEvidenceService(db, ADMIN, teamId.toString())
    const page = await getPublicEvidenceService(db, publicId)

    expect(page.map).toMatchObject({ title: 'Team map', lens: 'data-storage' })
    expect(page.map.graph.nodes).toHaveLength(2)
    const json = JSON.stringify(page.map)
    expect(json).not.toMatch(/example\.com|userId|ownerId|ownerType|revision|"shared"|"drift"/)
    expect(json).not.toContain(ALICE.toString())
    expect(json).not.toContain(teamId.toString())
  })

  it('has map: null when the team has no map', async () => {
    const teamId = await addTeam()
    const { publicId } = await issueEvidenceService(db, ADMIN, teamId.toString())
    expect((await getPublicEvidenceService(db, publicId)).map).toBeNull()
  })

  it('shows the map as of the last issue, and re-issuing refreshes it on the same link', async () => {
    const teamId = await addTeam()
    await addMap({ ownerType: 'team', ownerId: teamId.toString(), title: 'v1' })
    const first = await issueEvidenceService(db, ADMIN, teamId.toString())

    await db.collection('system_maps').updateOne({ ownerType: 'team' }, { $set: { title: 'v2' } })
    expect((await getPublicEvidenceService(db, first.publicId)).map.title).toBe('v1') // a snapshot, not live

    const second = await issueEvidenceService(db, ADMIN, teamId.toString())
    expect(second.publicId).toBe(first.publicId)
    expect((await getPublicEvidenceService(db, first.publicId)).map.title).toBe('v2')
  })

  it('shows nothing once the evidence is revoked', async () => {
    const teamId = await addTeam()
    await addMap({ ownerType: 'team', ownerId: teamId.toString() })
    const { publicId } = await issueEvidenceService(db, ADMIN, teamId.toString())
    await setEvidenceRevokedService(db, teamId.toString(), true)
    await expect(getPublicEvidenceService(db, publicId)).rejects.toMatchObject({ status: 404 })
  })
})

describe('recruiter scorecard maps', () => {
  const user = { _id: ALICE, username: 'alice', firstName: 'Alice', lastName: 'A' }
  const stored = (capstone) => ({ userId: ALICE, enabled: true, show: { exams: false, capstone, teams: false, strengths: false } })

  beforeEach(() => addMap({ ownerType: 'capstone', ownerId: 'api-dev', title: 'API map', shared: true, publicId: 'abcdefghijkl' }))

  it('lists shared capstone maps with public fields only', async () => {
    const card = await loadScorecard(db, user, stored(true))
    expect(card.maps).toEqual([{ trackId: 'api-dev', title: 'API map', publicId: 'abcdefghijkl', updatedAt: expect.any(Date) }])
    expect(JSON.stringify(card)).not.toMatch(/userId|_id|email/i)
  })

  it('hides the maps when the developer hides the capstone section', async () => {
    expect((await loadScorecard(db, user, stored(false))).maps).toBeNull()
  })

  it('skips the query for the candidates list', async () => {
    expect((await loadScorecard(db, user, stored(true), { maps: false })).maps).toEqual([])
  })
})
