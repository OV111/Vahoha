/**
 * Intro requests are how a company reaches a developer, so their rules are the
 * line between hiring and spam: only verified companies send, the developer
 * decides, emails are shared only on accept, and the limits hold. This test
 * runs the real services against an in-memory MongoDB.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'

vi.mock('../../queues/notify.js', () => ({ notify: vi.fn() }))
vi.mock('../../utils/emailService.js', async (original) => ({
  ...(await original()),
  sendIntroRequestEmail: vi.fn(async () => {}),
  sendIntroAcceptedEmail: vi.fn(async () => {}),
}))

const { checkIntro, sendIntro, listCompanyIntros, withdrawIntro } = await import('../../modules/hiring/services/introService.js')
const { listMyIntros, acceptIntro, declineIntro, blockIntroCompany, reportIntro } = await import(
  '../../modules/hiring/services/introReplyService.js'
)
const { INTRO_RULES } = await import('../../../constants/hiringRules.js')

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

beforeEach(async () => {
  await db.dropDatabase()
})

const MESSAGE = 'We liked your verified layers and want to talk about this role.'

const company = async ({ level = 'verified', type = 'company' } = {}) => {
  const _id = new ObjectId()
  const recruiterId = new ObjectId()
  await db.collection('users').insertOne({ _id: recruiterId, username: `rec${_id}`, email: `rec${_id}@acme.com`, role: 'recruiter', companyId: _id, firstName: 'Rita' })
  await db.collection('companies').insertOne({ _id, name: `Acme ${_id}`, type, members: [recruiterId], createdBy: recruiterId, trust: { level, reasons: [] } })
  const job = await db.collection('jobs').insertOne({ companyId: _id, title: 'Backend Developer', level: 'junior', type: 'full-time', workplace: 'remote', status: 'open', requiredLayers: [], stack: [], updatedAt: new Date() })
  return { companyId: _id, recruiterId, jobId: String(job.insertedId) }
}

const developer = async ({ optedIn = true } = {}) => {
  const _id = new ObjectId()
  const username = `dev${_id}`
  await db.collection('users').insertOne({ _id, username, email: `${username}@mail.com`, firstName: 'Dana' })
  if (optedIn) await db.collection('recruiter_settings').insertOne({ userId: _id, enabled: true })
  return { userId: _id, username }
}

const send = (c, d, extra = {}) => sendIntro(db, c.companyId, c.recruiterId, { username: d.username, jobId: c.jobId, message: MESSAGE, ...extra })

describe('who can send', () => {
  it('a verified company can send to an opted-in developer', async () => {
    const c = await company()
    const d = await developer()
    expect((await checkIntro(db, c.companyId, d.username)).canSend).toBe(true)
    expect((await send(c, d)).status).toBe('pending')
  })

  it('a limited company cannot', async () => {
    const c = await company({ level: 'limited' })
    const d = await developer()
    expect((await checkIntro(db, c.companyId, d.username)).canSend).toBe(false)
    await expect(send(c, d)).rejects.toMatchObject({ status: 403 })
  })

  it('a developer who did not opt in looks like they do not exist', async () => {
    const c = await company()
    const d = await developer({ optedIn: false })
    await expect(send(c, d)).rejects.toMatchObject({ status: 404 })
  })

  it('only one open request per developer and company', async () => {
    const c = await company()
    const d = await developer()
    await send(c, d)
    await expect(send(c, d)).rejects.toMatchObject({ status: 409 })
  })

  it('a closed job cannot be used', async () => {
    const c = await company()
    const d = await developer()
    await db.collection('jobs').updateOne({ _id: new ObjectId(c.jobId) }, { $set: { status: 'closed' } })
    await expect(send(c, d)).rejects.toMatchObject({ status: 400 })
  })
})

describe('privacy', () => {
  it('emails are shared only after the developer accepts', async () => {
    const c = await company()
    const d = await developer()
    const sent = await send(c, d)
    expect(sent.contactEmail).toBeNull()
    expect((await listMyIntros(db, d.userId))[0].recruiterEmail).toBeNull()

    const accepted = await acceptIntro(db, d.userId, sent.id)
    expect(accepted.recruiterEmail).toMatch(/@acme\.com$/)
    expect((await listCompanyIntros(db, c.companyId))[0].contactEmail).toMatch(/@mail\.com$/)
  })

  it('a company never sees or touches another company\'s requests', async () => {
    const a = await company()
    const b = await company()
    const d = await developer()
    const sent = await send(a, d)
    expect(await listCompanyIntros(db, b.companyId)).toHaveLength(0)
    await expect(withdrawIntro(db, b.companyId, sent.id)).rejects.toMatchObject({ status: 404 })
  })

  it('a developer cannot answer someone else\'s request', async () => {
    const c = await company()
    const d = await developer()
    const other = await developer()
    const sent = await send(c, d)
    await expect(acceptIntro(db, other.userId, sent.id)).rejects.toMatchObject({ status: 404 })
  })
})

describe('states', () => {
  it('only a pending request can be answered', async () => {
    const c = await company()
    const d = await developer()
    const sent = await send(c, d)
    await acceptIntro(db, d.userId, sent.id)
    await expect(declineIntro(db, d.userId, sent.id)).rejects.toMatchObject({ status: 409 })
    await expect(withdrawIntro(db, c.companyId, sent.id)).rejects.toMatchObject({ status: 409 })
  })

  it('a request past its expiry reads as expired and can no longer be accepted', async () => {
    const c = await company()
    const d = await developer()
    const sent = await send(c, d)
    await db.collection('intro_requests').updateOne({ _id: new ObjectId(sent.id) }, { $set: { expiresAt: new Date(Date.now() - 1000) } })
    expect((await listMyIntros(db, d.userId))[0].status).toBe('expired')
    await expect(acceptIntro(db, d.userId, sent.id)).rejects.toMatchObject({ status: 409 })
  })
})

describe('limits', () => {
  it('after a decline the company waits before asking again', async () => {
    const c = await company()
    const d = await developer()
    const sent = await send(c, d)
    await declineIntro(db, d.userId, sent.id)
    const check = await checkIntro(db, c.companyId, d.username)
    expect(check.canSend).toBe(false)
    expect(check.reason).toMatch(/declined/)
  })

  it('a blocked company cannot ask again', async () => {
    const c = await company()
    const d = await developer()
    const sent = await send(c, d)
    await blockIntroCompany(db, d.userId, sent.id)
    await db.collection('intro_requests').deleteMany({})
    const check = await checkIntro(db, c.companyId, d.username)
    expect(check.canSend).toBe(false)
    expect(check.reason).toMatch(/isn't accepting/)
  })

  it('agencies have a lower daily cap', async () => {
    const c = await company({ type: 'agency' })
    for (let i = 0; i < INTRO_RULES.perAgencyDaily; i++) await send(c, await developer())
    await expect(send(c, await developer())).rejects.toMatchObject({ status: 403 })
  })

  it('a developer has at most a few open requests from all companies', async () => {
    const d = await developer()
    for (let i = 0; i < INTRO_RULES.maxPendingPerDeveloper; i++) await send(await company(), d)
    const check = await checkIntro(db, (await company()).companyId, d.username)
    expect(check.canSend).toBe(false)
    expect(check.reason).toMatch(/too many open requests/)
  })

  it(`${INTRO_RULES.reportsToLimit} reports drop the company to limited`, async () => {
    const c = await company()
    for (let i = 0; i < INTRO_RULES.reportsToLimit; i++) {
      const d = await developer()
      const sent = await send(c, d)
      await reportIntro(db, d.userId, sent.id, { reason: 'spam' })
    }
    const after = await db.collection('companies').findOne({ _id: c.companyId })
    expect(after.trust.level).toBe('limited')
  })

  it('an admin pin is not overridden by reports', async () => {
    const c = await company()
    await db.collection('companies').updateOne({ _id: c.companyId }, { $set: { 'trust.override': { level: 'verified' } } })
    for (let i = 0; i < INTRO_RULES.reportsToLimit; i++) {
      const d = await developer()
      await reportIntro(db, d.userId, (await send(c, d)).id, { reason: 'spam' })
    }
    expect((await db.collection('companies').findOne({ _id: c.companyId })).trust.level).toBe('verified')
  })
})
