/**
 * HTTP contract tests for the exams router.
 *
 * Exam history rows with `passed: true` are shown to recruiters on the public
 * scorecard, so the only way to create one must be the server-graded
 * POST /submit. These tests pin that: a logged-in user cannot write their own
 * result, even with a well-formed body.
 */
import { describe, it, expect, beforeAll } from 'vitest'
import express from 'express'
import request from 'supertest'
import { ObjectId } from 'mongodb'
import examRoutes from '../../modules/exams/routes/exam.routes.js'
import { notFound } from '../../middleware/notFound.js'
import { createAccessToken } from '../../utils/jwtToken.js'

let app
const TOKEN = () => createAccessToken({ id: new ObjectId().toString() })

beforeAll(() => {
  app = express()
  app.use(express.json())
  app.use('/api/exams', examRoutes)
  app.use(notFound)
})

describe('POST /api/exams/result (removed)', () => {
  it('is not routable, even for an authenticated user with a valid body', async () => {
    const res = await request(app)
      .post('/api/exams/result')
      .set('Authorization', `Bearer ${TOKEN()}`)
      .send({ path: 'backend', layer: 'api-dev-3', score: 100, passed: true, totalQuestions: 10 })

    expect(res.status).toBe(404)
  })
})
