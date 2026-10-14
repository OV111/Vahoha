import { describe, it, expect, vi, beforeEach } from 'vitest'
import crypto from 'node:crypto'
import process from 'node:process'

// --- hoisted mocks ---
const mockConnectDB = vi.hoisted(() => vi.fn())
const mockSendLoginLink = vi.hoisted(() => vi.fn())
const mockIssueTokenPair = vi.hoisted(() => vi.fn())

vi.mock('../../config/db.js', () => ({ default: mockConnectDB }))
vi.mock('../../utils/emailService.js', () => ({
  sendLoginLinkEmail: mockSendLoginLink,
  sendPasswordResetEmail: vi.fn(),
}))
vi.mock('../../modules/auth/services/refreshTokenService.js', () => ({
  issueTokenPair: mockIssueTokenPair,
  rotateRefreshToken: vi.fn(),
  revokeRefreshToken: vi.fn(),
  revokeAllRefreshTokens: vi.fn(),
}))
vi.mock('../../services/eventService.js', () => ({
  trackEvent: vi.fn(),
  trackActiveDay: vi.fn(),
}))

import {
  requestLoginLink,
  confirmLoginLink,
} from '../../modules/auth/controllers/auth.controller.js'

// A tiny in-memory db: just the operations these two functions use.
const makeDb = ({ users = [] } = {}) => {
  const links = []
  const userRows = [...users]
  let nextId = 1

  const match = (doc, filter) =>
    Object.entries(filter).every(([key, cond]) => {
      if (cond && typeof cond === 'object' && '$gt' in cond) return doc[key] > cond.$gt
      return doc[key] === cond
    })

  const collections = {
    loginLinks: {
      findOne: vi.fn(async (f) => links.find((d) => match(d, f)) ?? null),
      deleteMany: vi.fn(async (f) => {
        for (let i = links.length - 1; i >= 0; i--) if (match(links[i], f)) links.splice(i, 1)
      }),
      insertOne: vi.fn(async (d) => void links.push(d)),
      findOneAndDelete: vi.fn(async (f) => {
        const i = links.findIndex((d) => match(d, f))
        return i === -1 ? null : links.splice(i, 1)[0]
      }),
    },
    users: {
      findOne: vi.fn(async (f) => userRows.find((d) => match(d, f)) ?? null),
      insertOne: vi.fn(async (d) => {
        const doc = { ...d, _id: `user-${nextId++}` }
        userRows.push(doc)
        return { insertedId: doc._id }
      }),
    },
    usersStats: { insertOne: vi.fn(async () => ({})) },
  }
  return { db: { collection: (name) => collections[name] }, links, userRows }
}

const sha256 = (raw) => crypto.createHash('sha256').update(raw).digest('hex')
// The raw token only ever exists in the email URL.
const tokenFromEmail = () => new URL(mockSendLoginLink.mock.calls.at(-1)[1].loginUrl).searchParams.get('token')

beforeEach(() => {
  vi.clearAllMocks()
  process.env.FRONTEND_URL = 'https://app.test'
  mockSendLoginLink.mockResolvedValue({})
  mockIssueTokenPair.mockResolvedValue({ accessToken: 'access', refreshToken: 'refresh' })
})

describe('requestLoginLink', () => {
  it('emails a link to the confirm page and stores only the token hash', async () => {
    const { db, links } = makeDb()
    mockConnectDB.mockResolvedValue(db)

    const result = await requestLoginLink({ email: 'jane@example.com' })

    expect(result.status).toBe(200)
    const raw = tokenFromEmail()
    expect(raw).toMatch(/^[a-f0-9]{64}$/)
    expect(mockSendLoginLink.mock.calls[0][1].loginUrl).toContain('https://app.test/login-link?token=')
    expect(links).toHaveLength(1)
    expect(links[0].tokenHash).toBe(sha256(raw))
    expect(JSON.stringify(links[0])).not.toContain(raw)
  })

  it('gives the same answer for an existing account and a brand-new email', async () => {
    const existing = makeDb({ users: [{ _id: 'u1', email: 'jane@example.com' }] })
    mockConnectDB.mockResolvedValue(existing.db)
    const a = await requestLoginLink({ email: 'jane@example.com' })

    const fresh = makeDb()
    mockConnectDB.mockResolvedValue(fresh.db)
    const b = await requestLoginLink({ email: 'new@example.com' })

    expect(a).toEqual(b)
  })

  it('does not create an account just because a link was requested', async () => {
    const { db, userRows } = makeDb()
    mockConnectDB.mockResolvedValue(db)
    await requestLoginLink({ email: 'stranger@example.com' })
    expect(userRows).toHaveLength(0)
  })

  it('answers but does not send a second email inside the cooldown', async () => {
    const { db } = makeDb()
    mockConnectDB.mockResolvedValue(db)

    const first = await requestLoginLink({ email: 'jane@example.com' })
    const second = await requestLoginLink({ email: 'jane@example.com' })

    expect(second).toEqual(first)
    expect(mockSendLoginLink).toHaveBeenCalledTimes(1)
  })

  it('still answers the same when the email provider fails', async () => {
    const { db } = makeDb()
    mockConnectDB.mockResolvedValue(db)
    mockSendLoginLink.mockRejectedValue(new Error('resend down'))
    vi.spyOn(console, 'error').mockImplementation(() => {})

    const result = await requestLoginLink({ email: 'jane@example.com' })
    expect(result.status).toBe(200)
  })
})

describe('confirmLoginLink', () => {
  const request = async (db, email) => {
    mockConnectDB.mockResolvedValue(db)
    await requestLoginLink({ email })
    return tokenFromEmail()
  }

  it('signs in an existing account (including a Google-only one) without touching it', async () => {
    const { db, userRows } = makeDb({
      users: [{ _id: 'u1', email: 'jane@example.com', password: null, provider: 'google' }],
    })
    const token = await request(db, 'jane@example.com')

    const result = await confirmLoginLink({ token })

    expect(result).toMatchObject({ status: 200, userId: 'u1', isNewUser: false, refreshToken: 'refresh' })
    expect(userRows).toHaveLength(1)
    expect(mockIssueTokenPair).toHaveBeenCalledWith(db, 'u1')
  })

  it('creates the account for a new email when the link is confirmed', async () => {
    const { db, userRows } = makeDb()
    const token = await request(db, 'new.person@example.com')

    const result = await confirmLoginLink({ token })

    expect(result).toMatchObject({ status: 200, isNewUser: true })
    expect(userRows).toHaveLength(1)
    expect(userRows[0]).toMatchObject({
      email: 'new.person@example.com',
      password: null,
      provider: 'email-link',
      username: 'newperson',
    })
  })

  it('works only once', async () => {
    const { db } = makeDb()
    const token = await request(db, 'jane@example.com')

    expect((await confirmLoginLink({ token })).status).toBe(200)
    const again = await confirmLoginLink({ token })

    expect(again.status).toBe(400)
    expect(mockIssueTokenPair).toHaveBeenCalledTimes(1)
  })

  it('rejects an expired link', async () => {
    const { db, links } = makeDb()
    const token = await request(db, 'jane@example.com')
    links[0].expiresAt = new Date(Date.now() - 1000)

    expect((await confirmLoginLink({ token })).status).toBe(400)
    expect(mockIssueTokenPair).not.toHaveBeenCalled()
  })

  it('rejects a token that was never issued', async () => {
    const { db } = makeDb()
    mockConnectDB.mockResolvedValue(db)

    const result = await confirmLoginLink({ token: 'a'.repeat(64) })
    expect(result.status).toBe(400)
  })

  it('invalidates the older link when a newer one is requested', async () => {
    const { db, links } = makeDb()
    const first = await request(db, 'jane@example.com')
    links[0].createdAt = new Date(Date.now() - 5 * 60 * 1000) // past the cooldown
    const second = await request(db, 'jane@example.com')

    expect(first).not.toBe(second)
    expect((await confirmLoginLink({ token: first })).status).toBe(400)
    expect((await confirmLoginLink({ token: second })).status).toBe(200)
  })
})
