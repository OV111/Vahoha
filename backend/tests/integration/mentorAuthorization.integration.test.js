/**
 * Mentor authorization against a real MongoDB: user B must not read or change
 * user A's chats, feedback or learner record, whatever ids B sends. Every query
 * here is the real one; if a userId filter is dropped from a service, a test fails.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'

const {
  createSession,
  getSession,
  listSessionsPage,
  updateSession,
  lockSessionChallenge,
  deleteSession,
  deleteAllSessions,
  appendMessages,
} = await import('../../modules/mentor/services/sessionService.js')
const { setMessageFeedback } = await import('../../modules/mentor/services/feedbackService.js')
const { executeTool, createWriteBudget } = await import('../../modules/mentor/services/agentTools.js')

let mongod
let client
let db

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  client = new MongoClient(mongod.getUri())
  await client.connect()
  db = client.db('MentorAuthz')
})

afterAll(async () => {
  await client.close()
  await mongod.stop()
})

const A = new ObjectId().toString()
const B = new ObjectId().toString()

let sessionA
let messageId

beforeEach(async () => {
  await Promise.all(['agent_sessions', 'agent_feedback', 'weakSpots', 'users', 'usersStats'].map((c) => db.collection(c).deleteMany({})))
  sessionA = await createSession(db, A, 'A private chat')
  messageId = 'm-assistant-1'
  await appendMessages(db, sessionA._id.toString(), { role: 'user', content: 'my secret question' }, { role: 'assistant', content: 'answer' }, null, messageId)
})

const reloadA = () => db.collection('agent_sessions').findOne({ _id: sessionA._id })

describe('sessions: B gets nothing with A\'s session id', () => {
  it('cannot read it', async () => {
    expect(await getSession(db, B, sessionA._id.toString())).toBeNull()
    expect(await getSession(db, A, sessionA._id.toString())).not.toBeNull()
  })

  it('does not see it in their list or search', async () => {
    const { sessions } = await listSessionsPage(db, B, { q: 'secret' })
    expect(sessions).toHaveLength(0)
    const page = await listSessionsPage(db, B)
    expect(page.sessions).toHaveLength(0)
  })

  it('cannot rename or pin it', async () => {
    expect(await updateSession(db, B, sessionA._id.toString(), { title: 'pwned', pinned: true })).toBeNull()
    const after = await reloadA()
    expect(after.title).toBe('A private chat')
    expect(after.pinned).toBeUndefined()
  })

  it('cannot lock it to a challenge', async () => {
    await lockSessionChallenge(db, B, sessionA._id.toString(), 'two-sum')
    expect((await reloadA()).challengeSlug).toBeUndefined()
  })

  it('cannot delete it, one by one or with "clear all"', async () => {
    expect(await deleteSession(db, B, sessionA._id.toString())).toBe(false)
    expect(await deleteAllSessions(db, B)).toBe(0)
    expect(await reloadA()).not.toBeNull()
  })
})

describe('feedback: B cannot vote on A\'s messages', () => {
  it('is refused and writes nothing', async () => {
    expect(await setMessageFeedback(db, B, sessionA._id.toString(), messageId, { vote: 'down', reason: 'wrong' })).toBe(false)
    expect((await reloadA()).messages.find((m) => m.id === messageId)?.feedback).toBeUndefined()
    expect(await db.collection('agent_feedback').countDocuments()).toBe(0)
  })

  it('works for the owner (the check is not just refusing everyone)', async () => {
    expect(await setMessageFeedback(db, A, sessionA._id.toString(), messageId, { vote: 'up' })).toBe(true)
  })
})

describe('tools: the user comes from the server, never from the model', () => {
  const ctxFor = (userId) => ({ db, userId, sessionId: null, writeBudget: createWriteBudget() })

  it('a userId in the tool arguments is ignored', async () => {
    await db.collection('weakSpots').insertOne({ userId: new ObjectId(A), topic: 'closures', slug: 'closures', failCount: 3, resolvedAt: null })
    const result = await executeTool('get_weak_spots', { userId: A, user_id: A }, ctxFor(B))
    expect(JSON.stringify(result)).not.toContain('closures')
  })

  it('another user\'s profile exposes only public fields', async () => {
    const aId = new ObjectId(A)
    await db.collection('users').insertOne({ _id: aId, username: 'alice', firstName: 'Al', email: 'a@x.test', password: 'hash', role: 'admin' })
    await db.collection('usersStats').insertOne({ userId: aId, bio: 'hi', xpTotal: 999, cv: 'private cv' })
    const result = await executeTool('get_user_profile', { username: 'alice' }, ctxFor(B))
    expect(result.username).toBe('alice')
    for (const field of ['email', 'password', 'role', 'xpTotal', 'cv']) expect(result).not.toHaveProperty(field)
  })
})
