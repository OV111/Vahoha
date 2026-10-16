/**
 * The Privacy Policy promises that deleting an account removes the user's
 * learning, AI and activity data. This test is that promise in code: it seeds
 * data for two users, deletes one, and checks nothing of theirs survives while
 * the other user's data is untouched.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import bcrypt from 'bcrypt'
import { deleteAccountService, cancelBillingSubscription } from '../../modules/account/services/accountService.js'

const PER_USER = [
  'userProgress', 'exam_attempts', 'examHistory', 'weakSpots', 'learnerMastery',
  'teach_back_sessions', 'mentor_teaching_log', 'agent_sessions', 'agent_usage',
  'challenge_attempts', 'challengeResults', 'savedLibraryResources',
  'usernameHistory', 'userEvents', 'refreshTokens', 'passwordResets',
]

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

const seedUser = async (email) => {
  const _id = new ObjectId()
  await db.collection('users').insertOne({
    _id,
    email,
    password: await bcrypt.hash('pw-123456', 4),
  })
  // Mix ObjectId and string ids, like the real collections do.
  for (const [i, name] of PER_USER.entries()) {
    await db.collection(name).insertOne({ userId: i % 2 ? _id : _id.toString() })
  }
  await db.collection('messages').insertOne({ senderId: _id.toString(), text: 'hi' })
  await db.collection('contact_messages').insertOne({ email, message: 'hello there' })
  return _id
}

describe('deleteAccountService', () => {
  it('removes every per-user collection and leaves other users alone', async () => {
    const doomed = await seedUser('doomed@example.com')
    const keeper = await seedUser('keeper@example.com')
    await db.collection('rooms').insertOne({ members: [doomed.toString(), keeper.toString()] })

    await deleteAccountService(db, doomed, 'doomed@example.com', 'pw-123456')

    const ids = [doomed, doomed.toString()]
    for (const name of PER_USER) {
      expect(await db.collection(name).countDocuments({ userId: { $in: ids } }), name).toBe(0)
      expect(
        await db.collection(name).countDocuments({ userId: { $in: [keeper, keeper.toString()] } }),
        `${name} (other user)`,
      ).toBe(1)
    }
    expect(await db.collection('users').countDocuments({ _id: doomed })).toBe(0)
    expect(await db.collection('messages').countDocuments({ senderId: doomed.toString() })).toBe(0)
    expect(await db.collection('contact_messages').countDocuments({ email: 'doomed@example.com' })).toBe(0)

    const room = await db.collection('rooms').findOne({})
    expect(room.members).toEqual([keeper.toString()])
  })
})

describe('deleteAccountService: who may delete', () => {
  const seedOAuthUser = async (email) => {
    const _id = new ObjectId()
    // Google/GitHub sign-ups are stored with `password: null`.
    await db.collection('users').insertOne({ _id, email, password: null, provider: 'google' })
    return _id
  }
  const exists = (id) => db.collection('users').countDocuments({ _id: id })

  it('keeps a password account when the password is wrong or missing', async () => {
    const id = await seedUser('pw-wrong@example.com')
    await expect(deleteAccountService(db, id, 'pw-wrong@example.com', 'nope')).rejects.toMatchObject({ status: 401 })
    await expect(deleteAccountService(db, id, 'pw-wrong@example.com', undefined)).rejects.toMatchObject({ status: 400 })
    // typing DELETE must not bypass the password on an account that has one
    await expect(
      deleteAccountService(db, id, 'pw-wrong@example.com', undefined, 'DELETE'),
    ).rejects.toMatchObject({ status: 400 })
    expect(await exists(id)).toBe(1)
  })

  it('lets a Google/GitHub account delete itself by typing DELETE', async () => {
    const id = await seedOAuthUser('oauth@example.com')
    await deleteAccountService(db, id, 'oauth@example.com', undefined, 'DELETE')
    expect(await exists(id)).toBe(0)
  })

  it('refuses a Google/GitHub account without the confirmation word', async () => {
    const id = await seedOAuthUser('oauth-no-word@example.com')
    for (const confirmation of [undefined, '', 'delete', 'yes']) {
      await expect(
        deleteAccountService(db, id, 'oauth-no-word@example.com', undefined, confirmation),
      ).rejects.toMatchObject({ status: 400 })
    }
    expect(await exists(id)).toBe(1)
  })

  it('still rejects a wrong email for either kind of account', async () => {
    const id = await seedOAuthUser('oauth-email@example.com')
    await expect(
      deleteAccountService(db, id, 'someone-else@example.com', undefined, 'DELETE'),
    ).rejects.toMatchObject({ status: 403 })
    expect(await exists(id)).toBe(1)
  })
})

describe('cancelBillingSubscription', () => {
  const subFor = async (fields) => {
    const userId = new ObjectId()
    await db.collection('subscriptions').insertOne({
      userId,
      polarSubscriptionId: 'sub_1',
      status: 'active',
      cancelAtPeriodEnd: false,
      ...fields,
    })
    return userId
  }
  const failing = (statusCode, message = 'boom') => () => ({
    subscriptions: { revoke: async () => { throw Object.assign(new Error(message), { statusCode }) } },
  })
  const working = () => ({ subscriptions: { revoke: async () => ({}) } })

  it('revokes a renewing subscription', async () => {
    const userId = await subFor({})
    await expect(cancelBillingSubscription(db, userId, working)).resolves.toBeUndefined()
  })

  it('blocks deletion (502) when a still-renewing subscription cannot be revoked', async () => {
    const userId = await subFor({})
    await expect(cancelBillingSubscription(db, userId, failing(500))).rejects.toMatchObject({ status: 502 })
  })

  it('lets deletion continue when the subscription already ends at period end', async () => {
    const userId = await subFor({ cancelAtPeriodEnd: true })
    await expect(cancelBillingSubscription(db, userId, failing(403))).resolves.toBeUndefined()
  })

  it('treats an already-gone or already-cancelled subscription as done', async () => {
    const a = await subFor({})
    const b = await subFor({})
    await expect(cancelBillingSubscription(db, a, failing(404))).resolves.toBeUndefined()
    await expect(cancelBillingSubscription(db, b, failing(403, 'Subscription is already canceled'))).resolves.toBeUndefined()
  })

  it('does nothing without a subscription or for one that no longer bills', async () => {
    const none = new ObjectId()
    const dead = await subFor({ status: 'canceled' })
    await expect(cancelBillingSubscription(db, none, failing(500))).resolves.toBeUndefined()
    await expect(cancelBillingSubscription(db, dead, failing(500))).resolves.toBeUndefined()
  })
})
