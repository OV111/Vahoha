/**
 * HTTP contract tests for the auth abuse limits: login lockout scoped per
 * account + IP, per IP and per account; a spoofed X-Forwarded-For buying nothing;
 * and the per-address cap on reset emails. Real auth router, real in-memory
 * MongoDB, Redis off so the in-process counters answer.
 */
import { describe, it, expect, beforeAll, afterAll, beforeEach, vi } from 'vitest'
import express from 'express'
import request from 'supertest'
import process from 'node:process'
import bcrypt from 'bcrypt'
import { MongoMemoryServer } from 'mongodb-memory-server'

vi.mock('../../config/redis.js', () => ({ redisConnection: null }))
vi.mock('../../utils/emailService.js', () => ({
  sendPasswordResetEmail: vi.fn().mockResolvedValue(undefined),
  sendLoginLinkEmail: vi.fn().mockResolvedValue(undefined),
  sendContactNotification: vi.fn().mockResolvedValue(undefined),
}))

const { sendPasswordResetEmail } = await import('../../utils/emailService.js')
const { default: connectDB } = await import('../../config/db.js')
const { default: authRoutes } = await import('../../modules/auth/routes/auth.routes.js')

let mongod
let db
let app

const PASSWORD = 'Right!pass123'

// Each test gets its own addresses, so counters from one never reach another.
let n = 0
const fresh = () => `user${++n}@example.com`

const buildApp = (trustProxy) => {
  const a = express()
  if (trustProxy) a.set('trust proxy', 1)
  a.use(express.json())
  a.use('/', authRoutes)
  return a
}
const attempt = (email, password, ip) => {
  const r = request(app).post('/login').send({ email, password })
  return ip ? r.set('X-Forwarded-For', ip) : r
}

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGO_URI = mongod.getUri()
  process.env.FRONTEND_URL = 'http://localhost:5173'
  db = await connectDB()
  app = buildApp(true)
})
afterAll(async () => {
  await mongod.stop()
})
beforeEach(() => sendPasswordResetEmail.mockClear())

const addUser = async (email) =>
  db.collection('users').insertOne({
    firstName: 'A',
    lastName: 'B',
    email,
    username: email.split('@')[0],
    password: await bcrypt.hash(PASSWORD, 4),
  })

describe('POST /login lockout', () => {
  it('locks one account on one network after 5 wrong passwords, with Retry-After', async () => {
    const email = fresh()
    await addUser(email)
    for (let i = 0; i < 5; i++) expect((await attempt(email, 'wrong', '10.0.0.1')).status).toBe(401)

    const locked = await attempt(email, PASSWORD, '10.0.0.1')
    expect(locked.status).toBe(429)
    expect(Number(locked.headers['retry-after'])).toBeGreaterThan(0)
  })

  it('does not let a stranger lock the owner out from another network', async () => {
    const email = fresh()
    await addUser(email)
    for (let i = 0; i < 5; i++) await attempt(email, 'wrong', '10.0.0.2')

    expect((await attempt(email, PASSWORD, '10.0.0.3')).status).toBe(200)
  })

  it('counts a spoofed X-Forwarded-For as the real address when no proxy is trusted', async () => {
    app = buildApp(false)
    const email = fresh()
    await addUser(email)
    for (let i = 0; i < 5; i++) await attempt(email, 'wrong', `7.7.7.${i}`) // a new "IP" each time

    expect((await attempt(email, PASSWORD, '7.7.7.99')).status).toBe(429)
    app = buildApp(true)
  })

  it('stops one network guessing across many accounts', async () => {
    for (let i = 0; i < 20; i++) await attempt(fresh(), 'wrong', '10.0.0.4')

    expect((await attempt(fresh(), 'wrong', '10.0.0.4')).status).toBe(429)
  })

  it('stops a distributed attack on one account from many networks', async () => {
    const email = fresh()
    await addUser(email)
    for (let i = 0; i < 30; i++) await attempt(email, 'wrong', `20.0.${Math.floor(i / 250)}.${i + 1}`)

    expect((await attempt(email, PASSWORD, '30.0.0.1')).status).toBe(429)
  })

  it('a correct login clears the account+IP counter', async () => {
    const email = fresh()
    await addUser(email)
    for (let i = 0; i < 4; i++) await attempt(email, 'wrong', '10.0.0.5')
    expect((await attempt(email, PASSWORD, '10.0.0.5')).status).toBe(200)

    for (let i = 0; i < 4; i++) expect((await attempt(email, 'wrong', '10.0.0.5')).status).toBe(401)
  })
})

describe('reset emails per address', () => {
  it('sends at most 3 an hour to one address, however many IPs ask, and answers the same', async () => {
    const email = fresh()
    await addUser(email)
    const answers = []
    for (let i = 0; i < 5; i++) {
      answers.push(await request(app).post('/forgot-password').set('X-Forwarded-For', `40.0.0.${i}`).send({ email }))
    }

    expect(sendPasswordResetEmail).toHaveBeenCalledTimes(3)
    expect(new Set(answers.map((r) => r.status))).toEqual(new Set([200]))
    expect(new Set(answers.map((r) => r.body.message)).size).toBe(1)
  })
})
