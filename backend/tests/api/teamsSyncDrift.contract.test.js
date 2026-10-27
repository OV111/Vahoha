/**
 * The contribution sync tells a team's map what changed, and a problem in the
 * map layer must never fail the sync. GitHub and the drift service are mocked;
 * the sync itself and MongoDB (in memory) are real.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'

const github = vi.hoisted(() => ({
  listMergedPulls: vi.fn(),
  getPullFiles: vi.fn(),
  getPullReviewers: vi.fn(),
}))
const drift = vi.hoisted(() => ({ flagMapDrift: vi.fn() }))
vi.mock('../../modules/capstone/services/githubClient.js', () => github)
vi.mock('../../modules/system-map/services/driftService.js', () => drift)

const { syncContributionsService } = await import('../../modules/teams/services/contributionService.js')

let mongod
let client
let db
const AUTHOR = new ObjectId()
let teamId

const pull = (number) => ({ number, title: `PR ${number}`, authorLogin: 'ada', mergedAt: new Date() })

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
  await db.collection('teams').deleteMany({})
  await db.collection('team_contributions').deleteMany({})
  const { insertedId } = await db.collection('teams').insertOne({
    name: 'Team',
    trackId: 'mern',
    status: 'active',
    repo: { fullName: 'acme/shop', id: 1, url: 'https://github.com/acme/shop' },
    members: [{ userId: AUTHOR, githubLogin: 'ada', status: 'active' }],
  })
  teamId = insertedId.toString()
  Object.values(github).forEach((fn) => fn.mockReset())
  drift.flagMapDrift.mockReset().mockResolvedValue(1)
  github.getPullFiles.mockResolvedValue([{ path: 'package.json', additions: 3, deletions: 1 }])
  github.getPullReviewers.mockResolvedValue([])
})

describe('syncContributionsService drift hook', () => {
  it('flags the map with only the PRs this sync stored, with their changed files', async () => {
    github.listMergedPulls.mockResolvedValue([pull(1), pull(2)])
    await syncContributionsService(db, teamId)
    expect(drift.flagMapDrift).toHaveBeenCalledTimes(1)
    const [, flaggedTeam, flagged] = drift.flagMapDrift.mock.calls[0]
    expect(String(flaggedTeam)).toBe(teamId)
    expect(flagged.map((c) => c.prNumber).sort()).toEqual([1, 2])
    expect(flagged[0].changedFiles[0].path).toBe('package.json')

    // A second sync stores nothing new, so nothing is flagged again.
    drift.flagMapDrift.mockClear()
    github.listMergedPulls.mockResolvedValue([pull(1), pull(2), pull(3)])
    await syncContributionsService(db, teamId)
    expect(drift.flagMapDrift.mock.calls[0][2].map((c) => c.prNumber)).toEqual([3])

    drift.flagMapDrift.mockClear()
    await syncContributionsService(db, teamId)
    expect(drift.flagMapDrift).not.toHaveBeenCalled()
  })

  it('still succeeds, and keeps the stored PRs, when flagging the map throws', async () => {
    drift.flagMapDrift.mockRejectedValue(new Error('map layer is down'))
    const spy = vi.spyOn(console, 'error').mockImplementation(() => {})
    github.listMergedPulls.mockResolvedValue([pull(1)])

    await expect(syncContributionsService(db, teamId)).resolves.toMatchObject({ added: 1 })
    expect(await db.collection('team_contributions').countDocuments({})).toBe(1)
    expect(spy).toHaveBeenCalled()
    spy.mockRestore()
  })
})
