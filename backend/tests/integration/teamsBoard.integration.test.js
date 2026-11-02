/**
 * Build Teams v2 against a real MongoDB (mongodb-memory-server): the board's
 * guarantees that only the database can prove. Task keys stay unique under
 * concurrent creates, one active sprint, GitHub moving cards, an AI plan
 * accepted only once, and who sees which warning.
 *
 * GitHub and the model are mocked; every service and index is real.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'

const github = vi.hoisted(() => ({
  listRecentPulls: vi.fn(),
  getHeadCommit: vi.fn(async () => null),
  getTree: vi.fn(async () => ({ truncated: false, paths: [], entries: [] })),
  getRepo: vi.fn(),
  listMergedPulls: vi.fn(),
  getPullFiles: vi.fn(),
  getPullReviewers: vi.fn(),
}))
const groq = vi.hoisted(() => ({ groqChat: vi.fn() }))
const cvText = vi.hoisted(() => ({ readCvText: vi.fn(async () => 'Backend developer, 3 years Node.js') }))
vi.mock('../../modules/capstone/services/githubClient.js', () => github)
vi.mock('../../services/groqChat.js', () => groq)
vi.mock('../../modules/teams/services/membership/cvText.js', () => cvText)

const { createTaskService, updateTaskService, listTasksService } = await import('../../modules/teams/services/board/taskService.js')
const { createSprintService, updateSprintService } = await import('../../modules/teams/services/board/sprintService.js')
const { syncBoardService } = await import('../../modules/teams/services/board/boardSyncService.js')
const { createPlanService, acceptPlanService } = await import('../../modules/teams/services/ai-lead/aiPlanService.js')
const { getPulseService } = await import('../../modules/teams/services/ai-lead/teamPulseService.js')
const { ensureCvEstimate, clearCvEstimate } = await import('../../modules/teams/services/membership/cvService.js')
const { startTeamService, joinTeamService, leaveTeamService, beginTeamService, setTeamRepoService, getEligibilityService } = await import('../../modules/teams/services/membership/selfServeService.js')
const { getMyTeamService, listMyTeamsService } = await import('../../modules/teams/services/team/teamsService.js')

let mongod
let client
let db

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

const COLLECTIONS = ['roadmap_tracks', 'certificates', 'usersStats', 'team_profiles', 'teams', 'users', 'team_tasks', 'team_sprints', 'team_task_events', 'team_plans', 'team_warnings', 'team_updates', 'team_contributions']
beforeEach(async () => {
  vi.clearAllMocks()
  await Promise.all(COLLECTIONS.map((c) => db.collection(c).deleteMany({})))
})

const DAY = 86_400_000
const ids = { lead: new ObjectId(), ann: new ObjectId(), bob: new ObjectId(), admin: new ObjectId() }
const as = (id) => ({ _id: String(id) })

const seedTeam = async ({ leadId = ids.lead, joinedDaysAgo = 1 } = {}) => {
  await db.collection('users').insertMany([
    { _id: ids.lead, username: 'lead' },
    { _id: ids.ann, username: 'ann' },
    { _id: ids.bob, username: 'bob' },
    { _id: ids.admin, username: 'admin', role: 'admin' },
  ])
  const joinedAt = new Date(Date.now() - joinedDaysAgo * DAY)
  const member = (userId, githubLogin) => ({ userId, githubLogin, status: 'active', joinedAt, leftAt: null })
  const { insertedId } = await db.collection('teams').insertOne({
    name: 'Task Arena',
    trackId: 'api-dev',
    status: 'active',
    repo: { fullName: 'org/arena', id: 1, url: 'https://github.com/org/arena' },
    members: [member(ids.lead, 'leadgh'), member(ids.ann, 'anngh'), member(ids.bob, 'bobgh')],
    leadId,
    coLeadId: null,
    taskPrefix: 'TA',
    nextTaskKey: 0,
    createdAt: new Date(Date.now() - 30 * DAY),
    updatedAt: new Date(),
  })
  return String(insertedId)
}

describe('tasks', () => {
  it('hands out unique, gap-free keys when ten tasks are created at once', async () => {
    const teamId = await seedTeam()
    const created = await Promise.all(
      Array.from({ length: 10 }, (_, i) => createTaskService(db, teamId, as(ids.ann), { title: `Task ${i}` })),
    )
    expect(created.map((t) => t.key).sort((a, b) => a - b)).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
    expect(created[0].ref).toMatch(/^TA-\d+$/)
  })

  it('lets a member take a task for themselves but not give one to someone else; the lead can', async () => {
    const teamId = await seedTeam()
    const t = await createTaskService(db, teamId, as(ids.ann), { title: 'Login route' })
    await expect(updateTaskService(db, teamId, t.key, as(ids.ann), { assigneeId: String(ids.bob) })).rejects.toMatchObject({ status: 403 })
    const mine = await updateTaskService(db, teamId, t.key, as(ids.ann), { assigneeId: String(ids.ann) })
    expect(String(mine.assigneeId)).toBe(String(ids.ann))
    const moved = await updateTaskService(db, teamId, t.key, as(ids.lead), { assigneeId: String(ids.bob) })
    expect(String(moved.assigneeId)).toBe(String(ids.bob))
  })

  it('refuses a manual move to done', async () => {
    const teamId = await seedTeam()
    const t = await createTaskService(db, teamId, as(ids.ann), { title: 'Login route' })
    await expect(updateTaskService(db, teamId, t.key, as(ids.ann), { status: 'done' })).rejects.toMatchObject({ status: 409 })
  })

  it('hides the board from someone who is not on the team', async () => {
    const teamId = await seedTeam()
    await expect(listTasksService(db, teamId, as(new ObjectId()))).rejects.toMatchObject({ status: 404 })
    await expect(listTasksService(db, teamId, as(ids.admin))).resolves.toEqual([])
  })
})

describe('sprints', () => {
  const dates = () => ({ startAt: new Date(), endAt: new Date(Date.now() + 14 * DAY) })

  it('allows only one active sprint, even when two are started at once', async () => {
    const teamId = await seedTeam()
    const [a, b] = await Promise.all([
      createSprintService(db, teamId, as(ids.lead), { name: 'Sprint A', ...dates() }),
      createSprintService(db, teamId, as(ids.lead), { name: 'Sprint B', ...dates() }),
    ])
    const results = await Promise.allSettled([
      updateSprintService(db, teamId, String(a._id), as(ids.lead), { status: 'active' }),
      updateSprintService(db, teamId, String(b._id), as(ids.lead), { status: 'active' }),
    ])
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1)
    expect(results.find((r) => r.status === 'rejected').reason.status).toBe(409)
  })

  it('stops a member who is not the lead from planning', async () => {
    const teamId = await seedTeam()
    await expect(createSprintService(db, teamId, as(ids.ann), { name: 'Mine', ...dates() })).rejects.toMatchObject({ status: 403 })
  })

  it('sends unfinished tasks back to the backlog when the sprint closes', async () => {
    const teamId = await seedTeam()
    const sprint = await createSprintService(db, teamId, as(ids.lead), { name: 'Sprint 1', ...dates() })
    const t = await createTaskService(db, teamId, as(ids.ann), { title: 'Login', sprintId: String(sprint._id) })
    await updateSprintService(db, teamId, String(sprint._id), as(ids.lead), { status: 'active' })
    await updateSprintService(db, teamId, String(sprint._id), as(ids.lead), { status: 'closed' })
    const [after] = await listTasksService(db, teamId, as(ids.ann))
    expect(after.key).toBe(t.key)
    expect(after.sprintId).toBeNull()
  })
})

describe('GitHub sync', () => {
  const pr = (number, state, extra = {}) => ({
    number, state, title: 'TA-1 login', branch: '', url: `https://github.com/org/arena/pull/${number}`,
    authorLogin: 'anngh', mergedAt: state === 'merged' ? new Date() : null, ...extra,
  })

  it('moves a card to In review on an open PR and to Done on merge; ignores strangers; throttles', async () => {
    const teamId = await seedTeam()
    await createTaskService(db, teamId, as(ids.ann), { title: 'Login' })
    await createTaskService(db, teamId, as(ids.ann), { title: 'Signup' })

    github.listRecentPulls.mockResolvedValueOnce([pr(5, 'open'), pr(6, 'merged', { title: 'TA-2 signup', authorLogin: 'stranger' })])
    const first = await syncBoardService(db, teamId, as(ids.ann))
    expect(first.moved).toEqual([{ ref: 'TA-1', from: 'backlog', to: 'in_review', prNumber: 5 }])

    const again = await syncBoardService(db, teamId, as(ids.ann))
    expect(again.reason).toBe('recent')

    github.listRecentPulls.mockResolvedValueOnce([pr(5, 'merged')])
    const forced = await syncBoardService(db, teamId, as(ids.admin), { force: true })
    expect(forced.moved).toEqual([{ ref: 'TA-1', from: 'in_review', to: 'done', prNumber: 5 }])

    const tasks = await listTasksService(db, teamId, as(ids.ann))
    expect(tasks.find((t) => t.key === 1)).toMatchObject({ status: 'done', pr: { number: 5, state: 'merged' } })
    expect(tasks.find((t) => t.key === 2).status).toBe('backlog')
    expect(await db.collection('team_task_events').countDocuments({ actor: 'github' })).toBe(2)
  })

  it('lets only one of two simultaneous board loads call GitHub', async () => {
    const teamId = await seedTeam()
    github.listRecentPulls.mockResolvedValue([])
    await Promise.all([syncBoardService(db, teamId, as(ids.ann)), syncBoardService(db, teamId, as(ids.bob))])
    expect(github.listRecentPulls).toHaveBeenCalledTimes(1)
  })
})

describe('AI plan', () => {
  const answer = {
    tasks: [
      { title: 'Add login route', description: 'POST /login', size: 'M', area: 'backend', skills: [], assigneeLogin: 'anngh', reason: 'Trains auth' },
      { title: 'Add signup form', description: 'Form', size: 'S', area: 'frontend', skills: [], assigneeLogin: 'bobgh', reason: 'Trains forms' },
    ],
  }

  it('drafts a plan in an AI-led team and creates its tasks exactly once', async () => {
    const teamId = await seedTeam({ leadId: 'ai' })
    groq.groqChat.mockResolvedValue({ choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(answer) } }] })

    const { plan } = await createPlanService(db, teamId, as(ids.ann), { goal: 'Users can sign up and log in' })
    expect(plan.tasks.map((t) => t.assigneeLogin)).toEqual(['anngh', 'bobgh'])

    const results = await Promise.allSettled([
      acceptPlanService(db, teamId, String(plan._id), as(ids.ann), {}),
      acceptPlanService(db, teamId, String(plan._id), as(ids.bob), {}),
    ])
    expect(results.filter((r) => r.status === 'fulfilled')).toHaveLength(1)
    const tasks = await db.collection('team_tasks').find({}).toArray()
    expect(tasks).toHaveLength(2)
    expect(tasks.every((t) => t.creatorId === 'ai')).toBe(true)
  })

  it('keeps the plan with the lead when a human leads', async () => {
    const teamId = await seedTeam()
    await expect(createPlanService(db, teamId, as(ids.ann), { goal: 'Users can log in' })).rejects.toMatchObject({ status: 403 })
    expect(groq.groqChat).not.toHaveBeenCalled()
  })
})

describe('pulse', () => {
  it('shows a quiet-member warning to the lead and that member, not to teammates', async () => {
    const teamId = await seedTeam({ joinedDaysAgo: 10 })
    // The model is busy for the weekly note: the update must still be written, without a note.
    groq.groqChat.mockRejectedValue(new Error('busy'))
    // Everyone but bob has been active recently.
    const now = new Date()
    await db.collection('team_task_events').insertMany([
      { teamId: new ObjectId(teamId), taskId: new ObjectId(), actor: ids.lead, type: 'created', at: now },
      { teamId: new ObjectId(teamId), taskId: new ObjectId(), actor: ids.ann, type: 'created', at: now },
    ])

    const forLead = await getPulseService(db, teamId, as(ids.lead))
    expect(forLead.warnings.some((w) => w.type === 'quiet_member' && /@bobgh/.test(w.message))).toBe(true)

    const forBob = await getPulseService(db, teamId, as(ids.bob))
    expect(forBob.warnings.find((w) => w.type === 'quiet_member').message).toMatch(/^You haven't been active/)

    const forAnn = await getPulseService(db, teamId, as(ids.ann))
    expect(forAnn.warnings.some((w) => w.type === 'quiet_member')).toBe(false)

    expect(forLead.update).not.toBeNull()
    expect(forLead.update.note).toBeNull()
    expect(await db.collection('team_updates').countDocuments({})).toBe(1)
  })
})

describe('CV estimate (background)', () => {
  const cvUrl = 'https://res.cloudinary.com/demo/raw/upload/v1/cv.pdf'
  const extract = { isCv: true, years: 3, skills: ['APIs'], technologies: ['Node.js'], roles: ['Backend developer'], areas: ['backend'] }

  it('reads a profile CV once, even when two triggers fire at the same time', async () => {
    await db.collection('usersStats').insertOne({ userId: ids.ann, cvUrl })
    groq.groqChat.mockResolvedValue({ choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(extract) } }] })

    const results = await Promise.all([ensureCvEstimate(db, ids.ann), ensureCvEstimate(db, ids.ann)])
    expect(results.filter(Boolean)).toHaveLength(1)
    expect(cvText.readCvText).toHaveBeenCalledTimes(1)

    const profile = await db.collection('team_profiles').findOne({ userId: ids.ann })
    expect(profile.cv).toMatchObject({ level: 'mid', years: 3, sourceUrl: cvUrl })
    expect(profile.cv.confirmedAt).toBeInstanceOf(Date)

    // Already read: a later page load does nothing.
    await expect(ensureCvEstimate(db, ids.ann)).resolves.toBe(false)
    expect(cvText.readCvText).toHaveBeenCalledTimes(1)
  })

  it('does nothing without a CV, never throws on a failed read, and reads a replaced CV again', async () => {
    await expect(ensureCvEstimate(db, ids.bob)).resolves.toBe(false)

    await db.collection('usersStats').insertOne({ userId: ids.bob, cvUrl })
    cvText.readCvText.mockRejectedValueOnce(Object.assign(new Error('scan'), { status: 422 }))
    await expect(ensureCvEstimate(db, ids.bob)).resolves.toBe(false)

    await clearCvEstimate(db, ids.bob) // what the profile module does on a new upload
    groq.groqChat.mockResolvedValue({ choices: [{ finish_reason: 'stop', message: { content: JSON.stringify(extract) } }] })
    await expect(ensureCvEstimate(db, ids.bob)).resolves.toBe(true)
  })
})

describe('self-serve teams', () => {
  const learner = async (id, githubLogin, { passed = true } = {}) => {
    await db.collection('users').insertOne({ _id: id, username: githubLogin, githubLogin })
    if (passed) await db.collection('certificates').insertOne({ userId: id, trackId: 'api-dev', trackTitle: 'API Developer', revokedAt: null, issuedAt: new Date() })
  }

  it('starts a team with the starter as first member, using their own GitHub login', async () => {
    await learner(ids.ann, 'anngh')
    const team = await startTeamService(db, as(ids.ann), { name: 'Task Arena', trackId: 'api-dev' })
    expect(team).toMatchObject({ status: 'forming', taskPrefix: 'TA', leadId: 'ai' })
    expect(String(team.createdBy)).toBe(String(ids.ann))
    expect(team.members.map((m) => m.githubLogin)).toEqual(['anngh'])
  })

  it('refuses without a capstone, without GitHub, or on a track not passed', async () => {
    await learner(ids.bob, 'bobgh', { passed: false })
    await expect(startTeamService(db, as(ids.bob), { name: 'Nope', trackId: 'api-dev' })).rejects.toMatchObject({ status: 409 })
    await db.collection('users').insertOne({ _id: ids.lead, username: 'lead' })
    await db.collection('certificates').insertOne({ userId: ids.lead, trackId: 'api-dev', revokedAt: null })
    expect((await getEligibilityService(db, ids.lead)).refusal).toMatch(/GitHub/)
    await learner(ids.ann, 'anngh')
    await expect(startTeamService(db, as(ids.ann), { name: 'Elsewhere', trackId: 'made-up' })).rejects.toMatchObject({ status: 400 })
  })

  it('lets a learner proven on one track start a team on another roadmap track', async () => {
    await learner(ids.ann, 'anngh')
    await db.collection('roadmap_tracks').insertOne({ trackId: 'frontend-dev', title: 'Frontend Developer', categoryId: 'fullstack', order: 1 })
    await expect(startTeamService(db, as(ids.ann), { name: 'Grow Front', trackId: 'frontend-dev' })).resolves.toMatchObject({ trackId: 'frontend-dev' })
    const me = await getEligibilityService(db, ids.ann)
    expect(me.tracks).toEqual([{ trackId: 'frontend-dev', trackTitle: 'Frontend Developer', categoryId: 'fullstack', passed: false }])
  })

  it('lets a person start and join several teams (no limit for now)', async () => {
    await learner(ids.ann, 'anngh')
    await learner(ids.bob, 'bobgh')
    const [one, two] = await Promise.all([
      startTeamService(db, as(ids.ann), { name: 'One', trackId: 'api-dev' }),
      startTeamService(db, as(ids.ann), { name: 'Two', trackId: 'api-dev' }),
    ])
    const bobs = await startTeamService(db, as(ids.bob), { name: 'Bobs', trackId: 'api-dev' })
    await joinTeamService(db, String(bobs._id), as(ids.ann))
    expect((await listMyTeamsService(db, ids.ann)).map((t) => t.name).sort()).toEqual(['Bobs', 'One', 'Two'])
    expect((await getEligibilityService(db, ids.ann)).runningTeams).toBe(3)
    expect(String(one._id)).not.toBe(String(two._id))
  })

  it('joins, sets a member-owned repo, begins, and closes to new members', async () => {
    await learner(ids.ann, 'anngh')
    await learner(ids.bob, 'bobgh')
    await learner(ids.lead, 'leadgh')
    const team = await startTeamService(db, as(ids.ann), { name: 'Task Arena', trackId: 'api-dev' })
    const teamId = String(team._id)

    await expect(beginTeamService(db, teamId, as(ids.ann))).rejects.toMatchObject({ status: 409 }) // one member, no repo
    await joinTeamService(db, teamId, as(ids.bob))
    await expect(joinTeamService(db, teamId, as(ids.bob))).rejects.toMatchObject({ status: 409 }) // already on it

    await expect(setTeamRepoService(db, teamId, as(ids.bob), { repoUrl: 'https://github.com/bobgh/arena' })).rejects.toMatchObject({ status: 403 }) // not the starter or a lead
    await expect(setTeamRepoService(db, teamId, as(ids.ann), { repoUrl: 'https://github.com/stranger/arena' })).rejects.toMatchObject({ status: 400 })
    github.getRepo.mockResolvedValue({ fullName: 'bobgh/arena', id: 42, htmlUrl: 'https://github.com/bobgh/arena' })
    await setTeamRepoService(db, teamId, as(ids.ann), { repoUrl: 'https://github.com/bobgh/arena' })

    const started = await beginTeamService(db, teamId, as(ids.ann))
    expect(started.status).toBe('active')
    expect(started.startedAt).toBeInstanceOf(Date)
    await expect(joinTeamService(db, teamId, as(ids.lead))).rejects.toMatchObject({ status: 409 })
  })

  it('disbands a forming team nobody is left on', async () => {
    await learner(ids.ann, 'anngh')
    const team = await startTeamService(db, as(ids.ann), { name: 'Solo', trackId: 'api-dev' })
    await leaveTeamService(db, String(team._id), as(ids.ann))
    expect((await db.collection('teams').findOne({ _id: team._id })).status).toBe('disbanded')
    expect((await getEligibilityService(db, ids.ann)).refusal).toBeNull()
    await expect(startTeamService(db, as(ids.ann), { name: 'Again', trackId: 'api-dev' })).resolves.toMatchObject({ name: 'Again' })
  })

  it('lists running teams before finished ones', async () => {
    await learner(ids.ann, 'anngh')
    const old = await startTeamService(db, as(ids.ann), { name: 'Old', trackId: 'api-dev' })
    await db.collection('teams').updateOne({ _id: old._id }, { $set: { status: 'completed', updatedAt: new Date(Date.now() + 1000) } })
    expect((await getMyTeamService(db, ids.ann)).name).toBe('Old')
    await startTeamService(db, as(ids.ann), { name: 'New', trackId: 'api-dev' })
    expect((await listMyTeamsService(db, ids.ann)).map((t) => t.name)).toEqual(['New', 'Old'])
    expect((await getMyTeamService(db, ids.ann)).name).toBe('New')
  })
})
