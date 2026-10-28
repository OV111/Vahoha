/**
 * Rate limits on the cheap-to-spam routes: the public map viewer, challenge
 * submit, blog writes and the follow/like toggles.
 *
 * Mounts the REAL routers (real limiters, real `authenticate`). The controllers
 * behind the limit are not the subject, so the database is a stub: a request that
 * gets through the limiter may answer 404 or 500, and the tests only care
 * whether it is 429.
 *
 * Each limiter is a module singleton, so every test uses its own user (or the
 * IP-only bucket once) and counts never overlap.
 */
import { describe, it, expect, vi, beforeAll } from 'vitest'
import express from 'express'
import request from 'supertest'
import { ObjectId } from 'mongodb'

vi.mock('../../config/db.js', async (importOriginal) => ({
  ...(await importOriginal()),
  default: vi.fn().mockRejectedValue(new Error('no database in this test')),
}))

import systemMapRoutes from '../../modules/system-map/index.js'
import submissionRoutes from '../../modules/coding-challenges/routes/submission.routes.js'
import { blogRoutes } from '../../modules/blogs/index.js'
import userRoutes from '../../modules/users/index.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let app
const bearer = () => `Bearer ${createAccessToken({ id: new ObjectId().toString() })}`

beforeAll(() => {
  app = express()
  app.use(express.json())
  // A stub db: every lookup finds nothing, so a request past the limiter answers 404/500 quickly.
  app.locals.db = { collection: () => ({ findOne: async () => null, find: () => ({ toArray: async () => [] }) }) }
  app.use('/api/system-maps', systemMapRoutes)
  app.use('/api/challenges/submit', submissionRoutes)
  app.use('/blogs', blogRoutes)
  app.use(userRoutes)
})

const BLOG_ID = '507f1f77bcf86cd799439011'

/** Sends `n` requests one after another and returns their status codes. */
const fire = async (n, send) => {
  const codes = []
  for (let i = 0; i < n; i++) codes.push((await send()).status)
  return codes
}
const tooMany = (codes) => codes.filter((c) => c === 429).length

describe('public map viewer (per IP, 60 a minute)', () => {
  it('answers 429 from the 61st request', async () => {
    const send = () => request(app).get('/api/system-maps/public/AAAAAAAAAAAA')
    const codes = await fire(60, send)
    expect(tooMany(codes)).toBe(0)

    const over = await send()
    expect(over.status).toBe(429)
    expect(over.body.message).toMatch(/too many/i)
    expect(over.headers['ratelimit']).toBeDefined() // draft-7 headers tell the client when to retry
  })
})

describe('challenge submit (per user, 10 a minute)', () => {
  it('limits one user without touching another', async () => {
    const a = bearer()
    const send = (token) => () => request(app).post('/api/challenges/submit/some-challenge').set('Authorization', token).send({ code: 'x' })

    expect(tooMany(await fire(10, send(a)))).toBe(0)
    const over = await send(a)()
    expect(over.status).toBe(429)
    expect(over.body.message).toMatch(/too fast/i)

    expect((await send(bearer())()).status).not.toBe(429)
  })

  it('still asks for a login first', async () => {
    expect((await request(app).post('/api/challenges/submit/some-challenge').send({})).status).toBe(401)
  })
})

describe('blog writes', () => {
  it('limits comments to 20 a minute per user', async () => {
    const token = bearer()
    const send = () => request(app).post(`/blogs/${BLOG_ID}/comments`).set('Authorization', token).send({ text: 'hi' })
    expect(tooMany(await fire(20, send))).toBe(0)
    expect((await send()).status).toBe(429)
    expect((await request(app).post(`/blogs/${BLOG_ID}/comments`).set('Authorization', bearer()).send({ text: 'hi' })).status).not.toBe(429)
  })

  it('limits new posts to 30 an hour per user', async () => {
    const token = bearer()
    const send = () => request(app).post('/blogs').set('Authorization', token).send({ title: 't' })
    expect(tooMany(await fire(30, send))).toBe(0)
    expect((await send()).status).toBe(429)
  })

  it('limits edits to 120 an hour per user', async () => {
    const token = bearer()
    const send = () => request(app).put(`/blogs/${BLOG_ID}`).set('Authorization', token).send({ title: 't' })
    expect(tooMany(await fire(120, send))).toBe(0)
    expect((await send()).status).toBe(429)
  })
})

describe('follow, like and save toggles (120 a minute)', () => {
  it('counts a signed-in user on their own, across likes and follows', async () => {
    const token = bearer()
    const like = () => request(app).post(`/blogs/${BLOG_ID}/like`).set('Authorization', token)
    const follow = () => request(app).post('/users/ada/follow').set('Authorization', token)

    expect(tooMany(await fire(60, like))).toBe(0)
    expect(tooMany(await fire(60, follow))).toBe(0)
    expect((await like()).status).toBe(429) // the 121st toggle of any kind
  })

  it('counts a request with no valid token against its IP, apart from signed-in users', async () => {
    const anonymous = () => request(app).post('/users/ada/follow')
    expect(tooMany(await fire(120, anonymous))).toBe(0)
    expect((await anonymous()).status).toBe(429)

    // The same IP, but a real session: its own bucket, still open.
    const signedIn = await request(app).post('/users/ada/follow').set('Authorization', bearer())
    expect(signedIn.status).not.toBe(429)
  })

  it('does not let a forged token pick its own bucket', async () => {
    const forged = () => request(app).post('/users/grace/follow').set('Authorization', 'Bearer not.a.real.token')
    // An invalid token has no user, so it lands in the (already exhausted) IP bucket.
    expect((await forged()).status).toBe(429)
  })
})
