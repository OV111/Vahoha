/**
 * Step 5 — WebSocket tests
 *
 * Strategy
 * --------
 * - `connectDB` is mocked so chatHandler's DB calls succeed without a real
 *   MongoDB.  The mock collection returns sensible stub values.
 * - `notificationQueue` (bullmq) is mocked to avoid a live Redis dependency.
 * - A real http.Server + Socket.IO server is started on an OS-assigned port
 *   (port 0) in beforeAll and torn down in afterAll.
 * - Test clients are real socket.io-client instances connecting to that server.
 */

import { describe, it, expect, vi, beforeAll, afterAll, afterEach } from 'vitest'
import http from 'node:http'
import process from 'node:process'
import { io as connectClient } from 'socket.io-client'
import jwt from 'jsonwebtoken'

// ─── Hoisted mocks ────────────────────────────────────────────────────────────
// vi.hoisted() runs before any import, so these refs are available to vi.mock().

const mockInsertOne = vi.hoisted(() => vi.fn().mockResolvedValue({ insertedId: 'msg-id-1' }))
const mockFindOne   = vi.hoisted(() => vi.fn().mockResolvedValue(null))
const mockUpdateOne = vi.hoisted(() => vi.fn().mockResolvedValue({}))

// find() chain: find().sort().limit().toArray() and find().project().toArray()
const mockToArray   = vi.hoisted(() => vi.fn().mockResolvedValue([]))
const mockLimit     = vi.hoisted(() => vi.fn().mockReturnValue({ toArray: mockToArray }))
const mockSort      = vi.hoisted(() => vi.fn().mockReturnValue({ limit: mockLimit }))
const mockProject   = vi.hoisted(() => vi.fn().mockReturnValue({ toArray: mockToArray }))
const mockFind      = vi.hoisted(() =>
  vi.fn().mockReturnValue({ sort: mockSort, limit: mockLimit, project: mockProject, toArray: mockToArray })
)

const mockConnectDB         = vi.hoisted(() => vi.fn())
const mockNotificationAdd   = vi.hoisted(() => vi.fn().mockResolvedValue({}))

// ─── Module mocks ─────────────────────────────────────────────────────────────

vi.mock('../../config/db.js', () => ({ default: mockConnectDB }))

vi.mock('../../queues/notificationQueue.js', () => ({
  default: { add: mockNotificationAdd },
}))

// ─── Import SUT after mocks are registered ────────────────────────────────────

import initWebSocketServer from '../../websocket/index.js'

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Mint a valid JWT for the given user id (defaults to a realistic ObjectId string).
 */
// A direct room id is the pair's ids sorted and joined (see directRoomId).
const OTHER_USER = '507f1f77bcf86cd799439012'
const PAIR_ROOM = '507f1f77bcf86cd799439011_507f1f77bcf86cd799439012'

const makeToken = (id = '507f1f77bcf86cd799439011') =>
  jwt.sign({ id, type: 'access' }, process.env.JWT_Secret, { expiresIn: '1h' })

/**
 * Build a mock DB whose collections support the operations used by chatHandler.
 * Accepts per-method overrides so individual tests can control return values.
 */
const makeMockDb = (overrides = {}) => {
  const collections = {
    rooms: {
      findOne:   overrides.roomsFindOne   ?? mockFindOne,
      insertOne: overrides.roomsInsertOne ?? mockInsertOne,
      updateOne: overrides.roomsUpdateOne ?? mockUpdateOne,
      find:      overrides.roomsFind      ?? mockFind,
    },
    // A first DM needs a mutual follow; by default every pair follows back.
    follows: {
      findOne: overrides.followsFindOne ?? vi.fn().mockResolvedValue({ _id: 'follow' }),
    },
    messages: {
      findOne:   overrides.messagesFindOne   ?? mockFindOne,
      insertOne: overrides.messagesInsertOne ?? mockInsertOne,
      updateOne: overrides.messagesUpdateOne ?? mockUpdateOne,
      find:      overrides.messagesFind      ?? mockFind,
    },
  }
  return {
    collection: vi.fn((name) => collections[name] ?? {
      findOne:   mockFindOne,
      insertOne: mockInsertOne,
      updateOne: mockUpdateOne,
      find:      mockFind,
    }),
  }
}

/**
 * Resolves with the next payload of `event`, or rejects after `timeoutMs`.
 */
const waitForMsg = (socket, event, timeoutMs = 3000) =>
  new Promise((resolve, reject) => {
    const timer = setTimeout(
      () => reject(new Error(`waitForMsg('${event}') timed out after ${timeoutMs}ms`)),
      timeoutMs,
    )
    socket.once(event, (payload) => {
      clearTimeout(timer)
      resolve(payload)
    })
  })

const clientFor = (auth) =>
  connectClient(`http://127.0.0.1:${port}`, { transports: ['websocket'], auth, reconnection: false, forceNew: true })

// ─── Server lifecycle ─────────────────────────────────────────────────────────

let server
let io
let port
let openClients = []

beforeAll(async () => {
  mockConnectDB.mockResolvedValue(makeMockDb())

  server = http.createServer()
  io = initWebSocketServer(server)

  await new Promise((resolve, reject) => {
    server.listen(0, '127.0.0.1', () => {
      port = server.address().port
      resolve()
    })
    server.once('error', reject)
  })
})

afterAll(async () => {
  await io.close()
})

afterEach(async () => {
  openClients.forEach((socket) => socket.disconnect())
  openClients = []
  vi.clearAllMocks()
  // Re-apply the default mock so future tests don't fail due to missing stub.
  mockConnectDB.mockResolvedValue(makeMockDb())
})

// ─── Helper that opens a client and registers it for auto-cleanup ─────────────
const openClient = async (userId = '507f1f77bcf86cd799439011') => {
  const socket = clientFor({ token: makeToken(userId) })
  openClients.push(socket)
  await waitForMsg(socket, 'connect')
  return socket
}

const joinRoom = (socket, roomId, receiverId) => {
  const done = Promise.all([waitForMsg(socket, 'joined_room'), waitForMsg(socket, 'message_history')])
  socket.emit('join_room', { roomId, receiverId })
  return done
}

// ─────────────────────────────────────────────────────────────────────────────
// Auth flow
// ─────────────────────────────────────────────────────────────────────────────

describe('WebSocket — auth', () => {
  it('refuses the handshake for an invalid token', async () => {
    const socket = clientFor({ token: 'badtoken' })
    openClients.push(socket)
    const err = await waitForMsg(socket, 'connect_error')
    expect(err.message).toBe('unauthorized')
    expect(socket.connected).toBe(false)
  })

  it('refuses the handshake when no token is sent', async () => {
    const socket = clientFor({})
    openClients.push(socket)
    const err = await waitForMsg(socket, 'connect_error')
    expect(err.message).toBe('unauthorized')
  })

  it('authenticated client can send messages without being disconnected', async () => {
    const socket = await openClient()

    // load_last_messages — a safe, always-valid request for an authed client.
    socket.emit('load_last_messages')

    const response = await waitForMsg(socket, 'load_last_messages')
    expect(Array.isArray(response.roomsData)).toBe(true)
    expect(socket.connected).toBe(true)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// join_room
// ─────────────────────────────────────────────────────────────────────────────

describe('WebSocket — join_room', () => {
  it('returns error when roomId is missing', async () => {
    const socket = await openClient()

    socket.emit('join_room', { receiverId: 'user-abc' })
    const msg = await waitForMsg(socket, 'chat_error')
    expect(msg.message).toMatch(/room id is missing/i)
  })

  it('returns error when the room does not exist and no receiverId is given', async () => {
    const socket = await openClient()

    // Without a receiverId, chatHandler can't implicitly create a direct
    // room — that's also how a bad/expired group roomId is rejected, since
    // groups must be created via the REST endpoint first.
    socket.emit('join_room', { roomId: 'room1' })
    const msg = await waitForMsg(socket, 'chat_error')
    expect(msg.message).toMatch(/room does not exist/i)
  })

  it('sends joined_room and message_history on success', async () => {
    const socket = await openClient()

    const [joinedRoom, messageHistory] = await joinRoom(socket, PAIR_ROOM, OTHER_USER)

    expect(joinedRoom.roomId).toBe(PAIR_ROOM)
    expect(Array.isArray(messageHistory.messageHistory)).toBe(true)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// send_message
// ─────────────────────────────────────────────────────────────────────────────

describe('WebSocket — send_message', () => {
  it('returns error when required fields are missing', async () => {
    const socket = await openClient()
    await joinRoom(socket, PAIR_ROOM, OTHER_USER)

    // Send without the required `text` field.
    socket.emit('send_message', { roomId: PAIR_ROOM })
    const msg = await waitForMsg(socket, 'chat_error')
    expect(msg.message).toMatch(/missing required fields/i)
  })

  it('returns error when this socket has not joined the room', async () => {
    const socket = await openClient()

    socket.emit('send_message', { roomId: 'nonexistent', text: 'hi' })
    const msg = await waitForMsg(socket, 'chat_error')
    expect(msg.message).toMatch(/room does not exist/i)
  })

  it('inserts message to DB and broadcasts it to every socket in the room', async () => {
    const insertOneSpy = vi.fn().mockResolvedValue({ insertedId: 'new-msg-id' })
    const updateOneSpy = vi.fn().mockResolvedValue({})
    // sendMessage looks up the room's members to know who to broadcast to.
    const roomsFindOneSpy = vi.fn().mockResolvedValue({
      _id: 'shared-room',
      members: ['507f1f77bcf86cd799439011', '507f1f77bcf86cd799439012'],
    })

    mockConnectDB.mockResolvedValue(
      makeMockDb({
        messagesInsertOne: insertOneSpy,
        roomsUpdateOne:    updateOneSpy,
        roomsFindOne:      roomsFindOneSpy,
      }),
    )

    const clientA = await openClient('507f1f77bcf86cd799439011')
    const clientB = await openClient('507f1f77bcf86cd799439012')

    await joinRoom(clientA, 'shared-room', '507f1f77bcf86cd799439012')
    await joinRoom(clientB, 'shared-room', '507f1f77bcf86cd799439011')

    // clientA sends a message; both listen for the broadcast.
    const received = Promise.all([waitForMsg(clientA, 'sended_message'), waitForMsg(clientB, 'sended_message')])
    clientA.emit('send_message', { roomId: 'shared-room', text: 'Hello from A' })
    const [, broadcastToB] = await received

    expect(broadcastToB.message.text).toBe('Hello from A')
    expect(broadcastToB.message.senderId).toBe('507f1f77bcf86cd799439011')

    // DB insert was called — this is the primary side-effect we can verify.
    expect(insertOneSpy).toHaveBeenCalledTimes(1)
    const insertedDoc = insertOneSpy.mock.calls[0][0]
    expect(insertedDoc.text).toBe('Hello from A')
    expect(insertedDoc.roomId).toBe('shared-room')

    // Room lastMessage was also updated.
    expect(updateOneSpy).toHaveBeenCalled()

    // Both members were present, so nobody is queued a notification.
    expect(mockNotificationAdd).not.toHaveBeenCalled()
    expect(clientA.connected).toBe(true)
  })
})

// ─────────────────────────────────────────────────────────────────────────────
// load_last_messages
// ─────────────────────────────────────────────────────────────────────────────

describe('WebSocket — load_last_messages', () => {
  it('returns load_last_messages with roomsData', async () => {
    const stubRoomsData = [
      { _id: 'room-a', members: ['507f1f77bcf86cd799439011', 'user-2'], updatedAt: new Date() },
      { _id: 'room-b', members: ['507f1f77bcf86cd799439011', 'user-3'], updatedAt: new Date() },
    ]

    // Provide a find().project().toArray() chain returning stub rooms.
    const toArrayStub = vi.fn().mockResolvedValue(stubRoomsData)
    const projectStub = vi.fn().mockReturnValue({ toArray: toArrayStub })
    const findStub    = vi.fn().mockReturnValue({
      sort:    vi.fn().mockReturnThis(),
      limit:   vi.fn().mockReturnThis(),
      project: projectStub,
      toArray: toArrayStub,
    })

    mockConnectDB.mockResolvedValue(makeMockDb({ roomsFind: findStub }))

    const socket = await openClient()

    socket.emit('load_last_messages')
    const msg = await waitForMsg(socket, 'load_last_messages')

    expect(Array.isArray(msg.roomsData)).toBe(true)
    expect(msg.roomsData).toHaveLength(2)
    expect(msg.roomsData[0]._id).toBe('room-a')
  })
})
