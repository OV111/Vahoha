import { describe, it, expect, vi } from 'vitest'
import {
  getOrCreateRoomForMember,
  directRoomId,
  saveMessage,
  loadMessages,
  setRoomMuted,
  clearRoomForUser,
  blockUser,
  listBlockedUsers,
} from '../../modules/chat/services/chatService.js'

// Minimal fake db: `rooms` holds at most one existing room. `follows` is a set
// of "follower>following" pairs; `blocked` makes every block lookup hit.
const makeDb = (existingRoom = null, { follows = [], blocked = false } = {}) => {
  const rooms = {
    findOne: vi.fn().mockResolvedValue(existingRoom),
    insertOne: vi.fn().mockResolvedValue({}),
    updateOne: vi.fn().mockResolvedValue({}),
  }
  const messages = { insertOne: vi.fn().mockResolvedValue({ insertedId: 'm1' }) }
  const followsCol = {
    findOne: vi.fn(async ({ followerId, followingId }) =>
      follows.includes(`${followerId}>${followingId}`) ? { _id: 'f' } : null),
  }
  const blocks = { findOne: vi.fn().mockResolvedValue(blocked ? { _id: 'b' } : null) }
  const db = { rooms, messages, follows: followsCol, blocks }
  db.collection = (name) => db[name]
  return db
}

// Real ObjectId strings: a first DM validates the receiver id.
const ALICE = '64b000000000000000000001'
const BOB = '64b000000000000000000002'
const MALLORY = '64b000000000000000000003'
const mutual = (a, b) => [`${a}>${b}`, `${b}>${a}`]

const room = { _id: 'r1', members: ['alice', 'bob'] }

describe('getOrCreateRoomForMember', () => {
  it('lets a member into an existing room', async () => {
    const db = makeDb(room)
    expect(await getOrCreateRoomForMember(db, { roomId: 'r1', userId: 'alice' })).toEqual({ room })
  })

  it('denies a non-member and never rewrites the member list', async () => {
    const db = makeDb(room)
    const result = await getOrCreateRoomForMember(db, { roomId: 'r1', userId: 'mallory', receiverId: 'alice' })
    expect(result).toEqual({ error: 'Access denied' })
    expect(db.rooms.updateOne).not.toHaveBeenCalled()
    expect(db.rooms.insertOne).not.toHaveBeenCalled()
  })

  it('refuses to create a room without a receiverId (groups go through REST)', async () => {
    const db = makeDb(null)
    expect(await getOrCreateRoomForMember(db, { roomId: 'r2', userId: 'alice' }))
      .toEqual({ error: 'Room does not exist' })
  })

  it('creates a direct room for the first DM between mutual followers', async () => {
    const db = makeDb(null, { follows: mutual(ALICE, BOB) })
    const roomId = directRoomId(ALICE, BOB)
    const { room: created } = await getOrCreateRoomForMember(db, { roomId, userId: ALICE, receiverId: BOB })
    expect(created).toMatchObject({ _id: roomId, type: 'direct', members: [BOB, ALICE] })
    expect(db.rooms.insertOne).toHaveBeenCalledOnce()
  })

  it("refuses to create another pair's room (squatting)", async () => {
    // Mallory follows Bob mutually, but asks for Alice and Bob's room id.
    const db = makeDb(null, { follows: mutual(MALLORY, BOB) })
    const result = await getOrCreateRoomForMember(db, {
      roomId: directRoomId(ALICE, BOB),
      userId: MALLORY,
      receiverId: BOB,
    })
    expect(result).toEqual({ error: 'Access denied' })
    expect(db.rooms.insertOne).not.toHaveBeenCalled()
  })

  it.each([
    ['only one side follows', { follows: [`${MALLORY}>${BOB}`] }, BOB],
    ['nobody follows', {}, BOB],
    ['they follow each other but one blocked the other', { follows: mutual(MALLORY, BOB), blocked: true }, BOB],
  ])('refuses a first DM when %s', async (_label, state, receiverId) => {
    const db = makeDb(null, state)
    const result = await getOrCreateRoomForMember(db, {
      roomId: directRoomId(MALLORY, receiverId),
      userId: MALLORY,
      receiverId,
    })
    expect(result).toEqual({ error: "You can't message this user" })
    expect(db.rooms.insertOne).not.toHaveBeenCalled()
  })

  it('refuses a malformed receiver id or a DM to yourself', async () => {
    for (const receiverId of ['not-an-id', MALLORY]) {
      const db = makeDb(null)
      const result = await getOrCreateRoomForMember(db, {
        roomId: directRoomId(MALLORY, receiverId),
        userId: MALLORY,
        receiverId,
      })
      expect(result.error).toBeDefined()
      expect(db.rooms.insertOne).not.toHaveBeenCalled()
    }
  })
})

describe('saveMessage', () => {
  it('denies a non-member without writing anything', async () => {
    const db = makeDb(room)
    expect(await saveMessage(db, { roomId: 'r1', senderId: 'mallory', text: 'hi' }))
      .toEqual({ error: 'Access denied' })
    expect(db.messages.insertOne).not.toHaveBeenCalled()
  })

  it('stores a trimmed message and returns the members for notification fan-out', async () => {
    const db = makeDb(room)
    const result = await saveMessage(db, { roomId: 'r1', senderId: 'alice', text: '  hi  ' })
    expect(result.members).toEqual(['alice', 'bob'])
    expect(result.message).toMatchObject({ _id: 'm1', roomId: 'r1', senderId: 'alice', text: 'hi' })
    expect(db.rooms.updateOne).toHaveBeenCalledOnce()
  })

  it('refuses a direct message when either side has blocked the other', async () => {
    const direct = { _id: 'r1', type: 'direct', members: ['alice', 'bob'] }
    const db = makeDb(direct)
    db.blocks = { findOne: vi.fn().mockResolvedValue({ blockerId: 'bob', blockedId: 'alice' }) }
    expect(await saveMessage(db, { roomId: 'r1', senderId: 'alice', text: 'hi' }))
      .toEqual({ error: "You can't message this user" })
    expect(db.messages.insertOne).not.toHaveBeenCalled()
  })

  it('reports which members muted the room so no notification is queued for them', async () => {
    const muted = { ...room, memberSettings: { bob: { mutedAt: new Date() } } }
    const db = makeDb(muted)
    const result = await saveMessage(db, { roomId: 'r1', senderId: 'alice', text: 'hi' })
    expect(result.mutedMembers).toEqual(['bob'])
  })
})

describe('chat controls', () => {
  it('mute writes only the caller\'s own setting', async () => {
    const db = makeDb(room)
    await setRoomMuted(db, { roomId: 'r1', userId: 'alice', muted: true })
    const [, update] = db.rooms.updateOne.mock.calls[0]
    expect(Object.keys(update.$set)).toEqual(['memberSettings.alice.mutedAt'])
  })

  it('refuses mute/clear for a non-member', async () => {
    const db = makeDb(room)
    await expect(setRoomMuted(db, { roomId: 'r1', userId: 'mallory', muted: true }))
      .rejects.toMatchObject({ status: 404 })
    await expect(clearRoomForUser(db, { roomId: 'r1', userId: 'mallory' }))
      .rejects.toMatchObject({ status: 404 })
  })

  it('loadMessages hides anything at or before the clear time', async () => {
    const find = vi.fn().mockReturnValue({
      sort: () => ({ limit: () => ({ toArray: async () => [] }) }),
    })
    const db = { collection: () => ({ find }) }
    const cleared = new Date('2026-01-01')
    await loadMessages(db, 'r1', 50, cleared)
    expect(find).toHaveBeenCalledWith({ roomId: 'r1', createdAt: { $gt: cleared } })
  })

  it('a user cannot block themselves', async () => {
    await expect(blockUser({}, { blockerId: 'a', blockedId: 'a' }))
      .rejects.toMatchObject({ status: 400 })
  })
})

describe('listBlockedUsers', () => {
  it('joins blocks with user + avatar info, newest first, and skips missing users', async () => {
    const a = '507f1f77bcf86cd799439011'
    const b = '507f1f77bcf86cd799439012'
    const gone = '507f1f77bcf86cd799439013'
    const cursor = (rows) => ({ sort: () => ({ toArray: async () => rows }), project: () => ({ toArray: async () => rows }) })
    const tables = {
      blocks: [
        { blockedId: b, createdAt: new Date('2026-02-01') },
        { blockedId: gone, createdAt: new Date('2026-01-15') },
        { blockedId: a, createdAt: new Date('2026-01-01') },
      ],
      users: [
        { _id: { toString: () => a }, firstName: 'Ann', lastName: 'A', username: 'ann' },
        { _id: { toString: () => b }, firstName: 'Bo', lastName: 'B', username: 'bo' },
      ],
      usersStats: [{ userId: { toString: () => a }, profileImage: 'http://img/a.jpg' }],
    }
    const db = { collection: (n) => ({ find: () => cursor(tables[n]) }) }
    const result = await listBlockedUsers(db, 'me')
    expect(result.map((u) => u.username)).toEqual(['bo', 'ann'])
    expect(result[1].profileImage).toBe('http://img/a.jpg')
    expect(result[0].profileImage).toBeNull()
  })

  it('returns an empty list without querying users when nothing is blocked', async () => {
    const db = { collection: () => ({ find: () => ({ sort: () => ({ toArray: async () => [] }) }) }) }
    expect(await listBlockedUsers(db, 'me')).toEqual([])
  })
})
