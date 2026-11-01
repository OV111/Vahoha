/**
 * The weekly summary run against a real MongoDB (in memory), with the email
 * provider mocked: who is due, who is skipped, and that nobody is emailed twice.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import process from 'node:process'

vi.mock('../../utils/emailService.js', async (importOriginal) => ({
  ...(await importOriginal()),
  sendEmail: vi.fn(async () => ({ id: 'email-id' })),
}))

const { sendEmail } = await import('../../utils/emailService.js')
const { runWeeklySummaries } = await import('../../modules/email/services/weeklySummaryService.js')
const { unsubscribeWithToken, getEmailPrefs } = await import('../../modules/email/services/emailPrefsService.js')
const { createUnsubscribeToken } = await import('../../modules/email/lib/unsubscribeToken.js')

let mongod
let client
let db

const SUNDAY_EVENING_UTC = new Date('2026-11-01T18:30:00Z')
const LATER_THAT_EVENING = new Date('2026-11-01T19:30:00Z')
const active = new ObjectId()
const optedOut = new ObjectId()
const tokyo = new ObjectId()
// Signed up long ago and never learned: the run should stop emailing them.
const gone = ObjectId.createFromTime(Date.parse('2026-01-01') / 1000)

beforeAll(async () => {
  process.env.JWT_Secret ??= 'test-secret'
  process.env.FRONTEND_URL = 'https://vahoha.com'
  process.env.API_PUBLIC_URL = 'https://api.vahoha.com'
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('DevsBlog')
  await db.collection('weeklySummaries').createIndex({ userId: 1, weekKey: 1 }, { unique: true })
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

beforeEach(async () => {
  sendEmail.mockReset()
  sendEmail.mockImplementation(async () => ({ id: 'email-id' }))
  await Promise.all(
    ['users', 'usersStats', 'userProgress', 'userEvents', 'weeklySummaries'].map((c) => db.collection(c).deleteMany({})),
  )
  await db.collection('users').insertMany([
    { _id: active, email: 'ada@example.com', firstName: 'Ada' },
    { _id: optedOut, email: 'bob@example.com', emailPrefs: { weeklySummary: false } },
    { _id: tokyo, email: 'kei@example.com' },
    { _id: gone, email: 'old@example.com' },
  ])
  await db.collection('usersStats').insertOne({ userId: tokyo, timezone: 'Asia/Tokyo' })
  await db.collection('userEvents').insertMany(
    [active, optedOut, tokyo].map((userId) => ({
      userId,
      type: 'exam_submitted',
      createdAt: new Date('2026-10-30T10:00:00Z'),
    })),
  )
})

describe('runWeeklySummaries', () => {
  it('emails the due, opted-in learner once, with one-click unsubscribe headers', async () => {
    const result = await runWeeklySummaries(db, { now: SUNDAY_EVENING_UTC })

    // tokyo: already Monday there. optedOut: off. gone: quiet for months.
    expect(result).toMatchObject({ sent: 1, skipped: 1, failed: 0 })
    expect(sendEmail).toHaveBeenCalledTimes(1)
    const payload = sendEmail.mock.calls[0][0]
    expect(payload.to).toBe('ada@example.com')
    expect(payload.subject).toContain('Your week')
    expect(payload.headers['List-Unsubscribe-Post']).toBe('List-Unsubscribe=One-Click')
    expect(payload.headers['List-Unsubscribe']).toContain('https://api.vahoha.com/api/email/unsubscribe?token=')

    const again = await runWeeklySummaries(db, { now: LATER_THAT_EVENING })
    expect(again.sent).toBe(0)
    expect(sendEmail).toHaveBeenCalledTimes(1)
  })

  it('retries a failed send on the next run', async () => {
    sendEmail.mockRejectedValueOnce(new Error('Resend down'))
    expect((await runWeeklySummaries(db, { now: SUNDAY_EVENING_UTC })).failed).toBe(1)
    expect((await runWeeklySummaries(db, { now: LATER_THAT_EVENING })).sent).toBe(1)
  })

  it('sends and writes nothing on a dry run', async () => {
    const result = await runWeeklySummaries(db, { now: SUNDAY_EVENING_UTC, dryRun: true })
    expect(result.preview.map((p) => p.kind)).toEqual(expect.arrayContaining(['week', null]))
    expect(result.preview).toHaveLength(2)
    expect(sendEmail).not.toHaveBeenCalled()
    expect(await db.collection('weeklySummaries').countDocuments()).toBe(0)
  })
})

describe('unsubscribe', () => {
  it('turns the email off with a valid token and stops the next run', async () => {
    expect(await unsubscribeWithToken(db, createUnsubscribeToken(active), 'link')).toBe(true)
    expect(await getEmailPrefs(db, active)).toEqual({ weeklySummary: false })
    expect((await runWeeklySummaries(db, { now: SUNDAY_EVENING_UTC })).sent).toBe(0)
  })

  it('refuses a bad token', async () => {
    expect(await unsubscribeWithToken(db, 'bad.token', 'link')).toBe(false)
  })
})
