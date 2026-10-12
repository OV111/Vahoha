/**
 * HTTP contract for POST /refresh, the session check the app runs on every
 * page load. A guest (no cookie) is a normal answer, not an error: 204.
 * A cookie that is present but bad is still a 401, and gets cleared.
 */
import { describe, it, expect, beforeAll, afterAll, vi } from 'vitest'
import express from 'express'
import cookieParser from 'cookie-parser'
import request from 'supertest'
import process from 'node:process'
import { MongoMemoryServer } from 'mongodb-memory-server'

vi.mock('../../config/redis.js', () => ({ redisConnection: null }))

const { default: connectDB } = await import('../../config/db.js')
const { default: authRoutes } = await import('../../modules/auth/routes/auth.routes.js')

let mongod
let app

beforeAll(async () => {
  mongod = await MongoMemoryServer.create()
  process.env.MONGO_URI = mongod.getUri()
  await connectDB()

  app = express()
  app.use(express.json())
  app.use(cookieParser())
  app.use('/', authRoutes)
})

afterAll(async () => {
  await mongod.stop()
})

describe('POST /refresh', () => {
  it('answers 204 with no body when there is no refresh cookie (a guest)', async () => {
    const res = await request(app).post('/refresh')
    expect(res.status).toBe(204)
    expect(res.text).toBe('')
  })

  it('answers 401 and clears the cookie when the refresh cookie is invalid', async () => {
    const res = await request(app).post('/refresh').set('Cookie', 'refreshToken=not-a-real-token')
    expect(res.status).toBe(401)
    expect(res.headers['set-cookie']?.join(';')).toMatch(/refreshToken=;/)
  })
})
