/**
 * HTTP contract tests for the password reset flow (POST /forgot-password and
 * POST /reset-password), through the real auth router, real Zod validation and
 * a real in-memory MongoDB.
 *
 * The email provider is mocked: the contract is "a single-use, expiring link is
 * issued and an email is attempted", not "Resend is up". Redis is switched off
 * so the router uses its in-memory rate limiters.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import process from 'node:process'
import crypto from 'node:crypto'
import bcrypt from 'bcrypt'
import { MongoMemoryServer } from 'mongodb-memory-server'

vi.mock('../../config/redis.js', () => ({ redisConnection: null }))
vi.mock('../../utils/emailService.js', () => ({
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
  sendContactNotification: vi.fn().mockResolvedValue(undefined),
}))

const { sendPasswordResetEmail } = await import('../../utils/emailService.js')
const { default: connectDB } = await import('../../config/db.js')
const { default: authRoutes } = await import('../../modules/auth/routes/auth.routes.js')

let mongod
let db
let app
let userId

const EMAIL = 'ada@example.com'
const OLD_PASSWORD = 'Old!pass123'
const NEW_PASSWORD = 'New!pass456'

const sha256 = (s) => crypto.createHash('sha256').update(s).digest('hex')
const forgot = (body) => request(app).post('/forgot-password').send(body)
const reset = (body) => request(app).post('/reset-password').send(body)

// Insert a link the way forgotPassword stores it (hash only). Going through the
// endpoint each time would spend its 5-per-hour limit within this file.
const insertToken = async ({ expiresAt = new Date(Date.now() + 60_000) } = {}) => {
  const raw = crypto.randomBytes(32).toString('hex')
  await db.collection('passwordResets').insertOne({ userId, tokenHash: sha256(raw), expiresAt })
  return raw
}
const storedHash = async () => (await db.collection('users').findOne({ _id: userId })).password

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGO_URI = mongod.getUri()
  process.env.FRONTEND_URL = 'http://localhost:5173'
  db = await connectDB()

  app = express()
  app.use(express.json())
  app.use('/', authRoutes)
})

afterAll(async () => {
  await mongod.stop()
})

beforeEach(async () => {
  await db.collection('users').deleteMany({})
  await db.collection('passwordResets').deleteMany({})
  const { insertedId } = await db.collection('users').insertOne({
    firstName: 'Ada',
    lastName: 'Lovelace',
    email: EMAIL,
    username: 'ada',
    password: await bcrypt.hash(OLD_PASSWORD, 4),
  })
  userId = insertedId
  sendPasswordResetEmail.mockReset()
  sendPasswordResetEmail.mockResolvedValue(undefined)
})

describe('POST /forgot-password', () => {
  it('emails a link for a registered address, matched case-insensitively', async () => {
    const res = await forgot({ email: '  Ada@Example.COM ' })

    expect(res.status).toBe(200)
    expect(sendPasswordResetEmail).toHaveBeenCalledOnce()
    const [to, { resetUrl, firstName, expiresInMinutes }] = sendPasswordResetEmail.mock.calls[0]
    expect(to).toBe(EMAIL)
    expect(firstName).toBe('Ada')
    expect(expiresInMinutes).toBe(60)

    // Only the hash is stored, never the token that went out in the email.
    const token = new URL(resetUrl).searchParams.get('token')
    const record = await db.collection('passwordResets').findOne({ userId })
    expect(record.tokenHash).toBe(sha256(token))
    expect(record.tokenHash).not.toBe(token)
  })

  it('gives the same answer for an unknown email, and sends nothing', async () => {
    const known = await forgot({ email: EMAIL })
    const unknown = await forgot({ email: 'nobody@example.com' })

    expect(unknown.status).toBe(known.status)
    expect(unknown.body.message).toBe(known.body.message)
    expect(sendPasswordResetEmail).toHaveBeenCalledOnce() // only for the known one
  })

  it('still answers 200 when the email fails, and drops the unusable link', async () => {
    sendPasswordResetEmail.mockRejectedValueOnce(new Error('Resend validation_error'))
    const errorLog = vi.spyOn(console, 'error').mockImplementation(() => {})

    const res = await forgot({ email: EMAIL })

    expect(res.status).toBe(200)
    expect(await db.collection('passwordResets').countDocuments({ userId })).toBe(0)
    expect(errorLog).toHaveBeenCalled() // the failure is loud server-side
    errorLog.mockRestore()
  })

  it('rejects a malformed email with a 400', async () => {
    const res = await forgot({ email: 'not-an-email' })

    expect(res.status).toBe(400)
    expect(res.body.field).toBe('email')
    expect(sendPasswordResetEmail).not.toHaveBeenCalled()
  })
})

describe('POST /reset-password', () => {
  it('sets the new password with a valid link, and the link works only once', async () => {
    const token = await insertToken()

    const first = await reset({ token, newPassword: NEW_PASSWORD })
    expect(first.status).toBe(200)
    expect(await bcrypt.compare(NEW_PASSWORD, await storedHash())).toBe(true)

    const second = await reset({ token, newPassword: 'Other!pass789' })
    expect(second.status).toBe(400)
    expect(await bcrypt.compare(NEW_PASSWORD, await storedHash())).toBe(true)
  })

  it('rejects an expired link', async () => {
    const token = await insertToken({ expiresAt: new Date(Date.now() - 1000) })

    const res = await reset({ token, newPassword: NEW_PASSWORD })

    expect(res.status).toBe(400)
    expect(await bcrypt.compare(OLD_PASSWORD, await storedHash())).toBe(true)
  })

  it('enforces the signup password policy, and keeps the link usable', async () => {
    const token = await insertToken()

    const weak = await reset({ token, newPassword: 'a' })
    expect(weak.status).toBe(400)
    expect(weak.body.field).toBe('newPassword')
    expect(await bcrypt.compare(OLD_PASSWORD, await storedHash())).toBe(true)

    // Validation runs before the token is touched, so the user can just retry.
    const retry = await reset({ token, newPassword: NEW_PASSWORD })
    expect(retry.status).toBe(200)
  })

  it('answers a missing or malformed token with a 400, never a 500', async () => {
    const missing = await reset({ newPassword: NEW_PASSWORD })
    const malformed = await reset({ token: 'abc', newPassword: NEW_PASSWORD })

    expect(missing.status).toBe(400)
    expect(malformed.status).toBe(400)
    expect(malformed.body.message).toMatch(/invalid or has expired/i)
  })
})
