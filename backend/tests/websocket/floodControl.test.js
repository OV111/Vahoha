/**
 * Socket flood control and packet size.
 *
 * A socket never goes through Express, so the REST rate limits don't cover it.
 * These tests run the real server (real Socket.IO, real handler) and check that:
 *  - a connection that floods gets "rate_limited" errors, then is disconnected;
 *  - a packet over the size cap closes the connection before it is handled;
 *  - ordinary chat traffic is untouched.
 */

import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import http from 'node:http'
import process from 'node:process'
import { io as connectClient } from 'socket.io-client'
import jwt from 'jsonwebtoken'

vi.mock('../../config/db.js', () => ({ default: vi.fn() }))
vi.mock('../../queues/notificationQueue.js', () => ({ default: { add: vi.fn() } }))

import initWebSocketServer, { MAX_MESSAGE_BYTES } from '../../websocket/index.js'
import { MESSAGE_LIMIT, MAX_STRIKES } from '../../websocket/messageLimiter.js'

let server
let io
let url

beforeAll(async () => {
  server = http.createServer()
  io = initWebSocketServer(server)
  await new Promise((resolve) => server.listen(0, resolve))
  url = `http://127.0.0.1:${server.address().port}`
})

afterAll(async () => {
  await io.close()
})

const token = () => jwt.sign({ id: 'flood-user', type: 'access' }, process.env.JWT_Secret, { expiresIn: '1h' })

/** Opens a client and records every error it receives and why it disconnects. */
const connect = () =>
  new Promise((resolve, reject) => {
    const socket = connectClient(url, { transports: ['websocket'], auth: { token: token() }, reconnection: false, forceNew: true })
    const seen = { errors: [], reason: null }
    socket.on('chat_error', (e) => seen.errors.push(e))
    socket.on('disconnect', (reason) => (seen.reason = reason))
    socket.on('connect', () => resolve({ socket, seen }))
    socket.on('connect_error', reject)
  })

const until = async (check, ms = 2000) => {
  const start = Date.now()
  while (!check()) {
    if (Date.now() - start > ms) throw new Error('timed out waiting')
    await new Promise((r) => setTimeout(r, 10))
  }
}

describe('message flood control', () => {
  it('leaves ordinary traffic alone', async () => {
    const { socket, seen } = await connect()
    for (let i = 0; i < MESSAGE_LIMIT; i++) socket.emit('unknown_event')
    await new Promise((r) => setTimeout(r, 200))
    expect(seen.errors).toEqual([])
    expect(seen.reason).toBeNull()
    socket.disconnect()
  })

  it('answers a flood with rate_limited errors, then disconnects the client', async () => {
    const { socket, seen } = await connect()
    for (let i = 0; i < MESSAGE_LIMIT + MAX_STRIKES + 5; i++) socket.emit('unknown_event')

    await until(() => seen.reason !== null)
    expect(seen.reason).toBe('io server disconnect')
    expect(seen.errors.length).toBe(MAX_STRIKES - 1)
    expect(seen.errors.every((e) => e.code === 'rate_limited')).toBe(true)
  })
})

describe('packet size', () => {
  it('closes a connection that sends a packet over the cap', async () => {
    const { socket, seen } = await connect()
    socket.emit('send_message', 'x'.repeat(MAX_MESSAGE_BYTES + 1))
    await until(() => seen.reason !== null)
    expect(seen.reason).not.toBe('io client disconnect')
  })

  it('accepts a packet just under the cap', async () => {
    const { socket, seen } = await connect()
    socket.emit('unknown_event', 'x'.repeat(MAX_MESSAGE_BYTES - 100))
    await new Promise((r) => setTimeout(r, 200))
    expect(seen.reason).toBeNull()
    socket.disconnect()
  })
})
