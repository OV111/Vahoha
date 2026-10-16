/**
 * The owner's profile response must never contain the password hash. Runs the
 * REAL service against a real MongoDB: the API contract test uses a hand-copied
 * controller, which is why it never caught this.
 */
import { describe, it, expect, beforeAll, afterAll } from 'vitest'
import { MongoMemoryServer } from 'mongodb-memory-server'
import { MongoClient, ObjectId } from 'mongodb'
import { getProfileService } from '../../modules/profile/services/profileService.js'

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

describe('getProfileService', () => {
  it('returns the profile without the password hash', async () => {
    const userId = new ObjectId()
    await db.collection('users').insertOne({
      _id: userId,
      email: 'a@test.com',
      username: 'alice',
      password: '$2b$10$abcdefghijklmnopqrstuuJ0Zr5k5x3S7u0bq8pY1aJzCq7dZ6eWm',
    })
    await db.collection('usersStats').insertOne({ userId, bio: 'hi' })

    const result = await getProfileService(db, userId)

    expect(result.userWithoutPassword).toMatchObject({ email: 'a@test.com', username: 'alice' })
    expect(result.userWithoutPassword).not.toHaveProperty('password')
    expect(JSON.stringify(result)).not.toContain('$2b$')
  })

  it('says whether a password exists without exposing it', async () => {
    const withPw = new ObjectId()
    const oauth = new ObjectId()
    await db.collection('users').insertMany([
      { _id: withPw, email: 'pw@test.com', password: '$2b$10$hash' },
      { _id: oauth, email: 'g@test.com', password: null },
    ])

    expect((await getProfileService(db, withPw)).userWithoutPassword.hasPassword).toBe(true)
    expect((await getProfileService(db, oauth)).userWithoutPassword.hasPassword).toBe(false)
  })
})
