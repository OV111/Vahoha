/**
 * WebSocket flood control and frame size.
 *
 * A socket never goes through Express, so the REST rate limits don't cover it.
 * These tests run the real server (real `ws`, real handler) and check that:
 *  - a connection that floods gets "rate_limited" frames, then is closed (1008);
 *  - a frame over the size cap closes the connection (1009) before it is parsed;
 *  - ordinary chat traffic is untouched.
 */

import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest'
import http from 'node:http'
import WebSocket from 'ws'

vi.mock('../../config/db.js', () => ({ default: vi.fn() }))
vi.mock('../../queues/notificationQueue.js', () => ({ default: { add: vi.fn() } }))

import initWebSocketServer, { MAX_MESSAGE_BYTES } from '../../websocket/index.js'
import { MESSAGE_LIMIT, MAX_STRIKES } from '../../websocket/messageLimiter.js'

let server
let wss
let url

beforeAll(async () => {
  server = http.createServer()
  wss = initWebSocketServer(server)
  await new Promise((resolve) => server.listen(0, resolve))
  url = `ws://127.0.0.1:${server.address().port}`
})

afterAll(async () => {
  wss.clients.forEach((c) => c.terminate())
  await new Promise((resolve) => wss.close(resolve))
  await new Promise((resolve) => server.close(resolve))
})

/** Opens a client and records every frame it receives and how it closes. */
const connect = () =>
  new Promise((resolve, reject) => {
    const ws = new WebSocket(url)
    const seen = { frames: [], closed: null }
    ws.on('message', (m) => seen.frames.push(JSON.parse(m.toString())))
    ws.on('close', (code) => (seen.closed = code))
    ws.on('open', () => resolve({ ws, seen }))
    ws.on('error', reject)
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
    const { ws, seen } = await connect()
    for (let i = 0; i < MESSAGE_LIMIT; i++) ws.send('not json')
    await new Promise((r) => setTimeout(r, 200))
    expect(seen.frames).toEqual([])
    expect(seen.closed).toBeNull()
    ws.close()
  })

  it('answers a flood with rate_limited frames, then closes the connection', async () => {
    const { ws, seen } = await connect()
    for (let i = 0; i < MESSAGE_LIMIT + MAX_STRIKES + 5; i++) ws.send('not json')

    await until(() => seen.closed !== null)
    expect(seen.closed).toBe(1008)
    expect(seen.frames.length).toBe(MAX_STRIKES - 1)
    expect(seen.frames.every((f) => f.type === 'error' && f.code === 'rate_limited')).toBe(true)
  })

  it('counts every message type, including the pre-auth ones', async () => {
    const { ws, seen } = await connect()
    for (let i = 0; i < MESSAGE_LIMIT; i++) ws.send(JSON.stringify({ type: 'auth', token: 'garbage' }))
    // Each bad auth closes the socket, so the flood is cut off by the server either way.
    await until(() => seen.closed !== null)
    expect(seen.closed).not.toBeNull()
  })
})

describe('frame size', () => {
  it('closes a connection that sends a frame over the cap', async () => {
    const { ws, seen } = await connect()
    ws.send('x'.repeat(MAX_MESSAGE_BYTES + 1))
    await until(() => seen.closed !== null)
    expect(seen.closed).toBe(1009) // "message too big"
  })

  it('accepts a frame right at the cap', async () => {
    const { ws, seen } = await connect()
    ws.send('x'.repeat(MAX_MESSAGE_BYTES))
    await new Promise((r) => setTimeout(r, 200))
    expect(seen.closed).toBeNull()
    ws.close()
  })
})
