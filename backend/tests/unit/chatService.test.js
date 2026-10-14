import { describe, it, expect, vi } from 'vitest'
import {
  getOrCreateRoomForMember,
  listChatRequests,
  acceptChatRequest,
  declineChatRequest,
  setMessagePolicy,
  directRoomId,
  saveMessage,
  setMessageReaction,
  loadMessages,
  setRoomMuted,
  clearRoomForUser,
  blockUser,
  listBlockedUsers,
} from '../../modules/chat/services/chatService.js'

// Minimal fake db: `rooms` holds at most one existing room. `follows` is a set
// of "follower>following" pairs; `blocked` makes every block lookup hit;
// `policy` is the receiver's message policy; `openRequests` is how many
// unanswered requests the sender already has.
const makeDb = (
  existingRoom = null,
  { follows = [], blocked = false, policy = undefined, openRequests = 0 } = {},
) => {
  const rooms = {
    findOne: vi.fn().mockResolvedValue(existingRoom),
    insertOne: vi.fn().mockResolvedValue({}),
    updateOne: vi.fn().mockResolvedValue({ modifiedCount: 1, matchedCount: 1 }),
    countDocuments: vi.fn().mockResolvedValue(openRequests),
  }
  const users = {
    findOne: vi.fn().mockResolvedValue(policy ? { messagePolicy: policy } : {}),
    updateOne: vi.fn().mockResolvedValue({}),
  }
  const messages = { insertOne: vi.fn().mockResolvedValue({ insertedId: 'm1' }) }
  const followsCol = {
    findOne: vi.fn(async ({ followerId, followingId }) =>
      follows.includes(`${followerId}>${followingId}`) ? { _id: 'f' } : null),
  }
  const blocks = { findOne: vi.fn().mockResolvedValue(blocked ? { _id: 'b' } : null) }
  const db = { rooms, messages, users, follows: followsCol, blocks }
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

  it('creates an active room for mutual followers even if their policy is "nobody"', async () => {
    const db = makeDb(null, { follows: mutual(MALLORY, BOB), policy: 'nobody' })
    const { room: created } = await getOrCreateRoomForMember(db, {
      roomId: directRoomId(MALLORY, BOB), userId: MALLORY, receiverId: BOB,
    })
    expect(created.status).toBe('active')
    expect(created.requestedBy).toBeUndefined()
  })

  it.each([
    ['nobody follows (default policy: everyone)', {}],
    ['only the sender follows', { follows: [`${MALLORY}>${BOB}`] }],
    ['the policy is "followers" and the sender follows', { follows: [`${MALLORY}>${BOB}`], policy: 'followers' }],
  ])('opens a pending message request when %s', async (_label, state) => {
    const db = makeDb(null, state)
    const { room: created } = await getOrCreateRoomForMember(db, {
      roomId: directRoomId(MALLORY, BOB), userId: MALLORY, receiverId: BOB,
    })
    expect(created).toMatchObject({ status: 'pending', requestedBy: MALLORY })
  })

  it.each([
    ['the receiver\'s policy is "nobody"', { policy: 'nobody' }],
    ['the policy is "followers" and the sender does not follow', { policy: 'followers' }],
    ['either side blocked the other', { follows: mutual(MALLORY, BOB), blocked: true }],
    ['the sender already has 20 unanswered requests', { openRequests: 20 }],
  ])('refuses a first DM when %s', async (_label, state) => {
    const db = makeDb(null, state)
    const result = await getOrCreateRoomForMember(db, {
      roomId: directRoomId(MALLORY, BOB), userId: MALLORY, receiverId: BOB,
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

  describe('message requests', () => {
    const pending = { _id: 'r1', type: 'direct', members: ['alice', 'bob'], status: 'pending', requestedBy: 'alice' }

    it('lets the requester send exactly one message', async () => {
      const db = makeDb(pending)
      const result = await saveMessage(db, { roomId: 'r1', senderId: 'alice', text: 'hi' })
      expect(result.message).toMatchObject({ text: 'hi' })
      expect(db.rooms.updateOne).toHaveBeenCalledWith(
        { _id: 'r1', status: 'pending', requestSent: { $ne: true } },
        { $set: { requestSent: true } },
      )
    })

    it('refuses a second message while the request is unanswered', async () => {
      const db = makeDb(pending)
      db.rooms.updateOne.mockResolvedValueOnce({ modifiedCount: 0 })
      expect(await saveMessage(db, { roomId: 'r1', senderId: 'alice', text: 'again' }))
        .toEqual({ error: 'Wait for them to accept your message request' })
      expect(db.messages.insertOne).not.toHaveBeenCalled()
    })

    it('stops the receiver replying until they accept', async () => {
      const db = makeDb(pending)
      expect(await saveMessage(db, { roomId: 'r1', senderId: 'bob', text: 'hello' }))
        .toEqual({ error: 'Accept this message request to reply' })
      expect(db.messages.insertOne).not.toHaveBeenCalled()
    })

    it('refuses everyone in a declined request', async () => {
      const db = makeDb({ ...pending, status: 'declined' })
      for (const senderId of ['alice', 'bob']) {
        expect(await saveMessage(db, { roomId: 'r1', senderId, text: 'x' }))
          .toEqual({ error: "You can't message this user" })
      }
    })

    it('treats a room with no status (created before requests existed) as active', async () => {
      const db = makeDb({ _id: 'r1', type: 'direct', members: ['alice', 'bob'] })
      const result = await saveMessage(db, { roomId: 'r1', senderId: 'bob', text: 'hey' })
      expect(result.message).toMatchObject({ text: 'hey' })
    })
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

describe('saveMessage: voice notes', () => {
  it('stores a voice message with its audio and a text-free preview', async () => {
    const db = makeDb(room)
    const result = await saveMessage(db, {
      roomId: 'r1', senderId: 'alice', voice: { url: 'https://cdn/x.webm', durationMs: 4200 },
    })
    expect(result.message).toMatchObject({
      type: 'voice', text: '', audio: { url: 'https://cdn/x.webm', durationMs: 4200 },
    })
    expect(db.rooms.updateOne.mock.calls[0][1].$set.lastMessage.text).toBe('🎤 Voice message')
  })

  it('still denies non-members', async () => {
    const db = makeDb(room)
    const result = await saveMessage(db, {
      roomId: 'r1', senderId: 'mallory', voice: { url: 'u', durationMs: 1000 },
    })
    expect(result).toEqual({ error: 'Access denied' })
    expect(db.messages.insertOne).not.toHaveBeenCalled()
  })
})

describe('saveMessage: attachments', () => {
  it('stores a photo message and previews it as a photo', async () => {
    const db = makeDb(room)
    const result = await saveMessage(db, {
      roomId: 'r1', senderId: 'alice', attachment: { kind: 'image', url: 'https://cdn/p.png', width: 800, height: 600 },
    })
    expect(result.message).toMatchObject({ type: 'image', text: '', image: { url: 'https://cdn/p.png', width: 800, height: 600 } })
    expect(db.rooms.updateOne.mock.calls[0][1].$set.lastMessage.text).toBe('📷 Photo')
  })

  it('stores a file message with its name and size', async () => {
    const db = makeDb(room)
    const result = await saveMessage(db, {
      roomId: 'r1', senderId: 'alice', attachment: { kind: 'file', url: 'https://cdn/cv.pdf', name: 'cv.pdf', size: 2048 },
    })
    expect(result.message).toMatchObject({ type: 'file', file: { name: 'cv.pdf', size: 2048 } })
    expect(db.rooms.updateOne.mock.calls[0][1].$set.lastMessage.text).toBe('📎 cv.pdf')
  })
})

describe('setMessageReaction', () => {
  const MSG = '64b0000000000000000000aa'
  const memberRoom = { _id: 'r1', members: ['alice', 'bob'] }

  it('sets the caller\'s reaction on a message in the room', async () => {
    const db = makeDb(memberRoom)
    db.messages.updateOne = vi.fn().mockResolvedValue({ matchedCount: 1 })
    const res = await setMessageReaction(db, { roomId: 'r1', messageId: MSG, userId: 'alice', emoji: '❤️' })
    expect(res).toEqual({ messageId: MSG, userId: 'alice', emoji: '❤️' })
    expect(db.messages.updateOne.mock.calls[0][1]).toEqual({ $set: { 'reactions.alice': '❤️' } })
    expect(db.messages.updateOne.mock.calls[0][0].roomId).toBe('r1')
  })

  it('removes the reaction when emoji is null', async () => {
    const db = makeDb(memberRoom)
    db.messages.updateOne = vi.fn().mockResolvedValue({ matchedCount: 1 })
    await setMessageReaction(db, { roomId: 'r1', messageId: MSG, userId: 'alice', emoji: null })
    expect(db.messages.updateOne.mock.calls[0][1]).toEqual({ $unset: { 'reactions.alice': '' } })
  })

  it('rejects emoji outside the allowed set', async () => {
    const db = makeDb(memberRoom)
    const res = await setMessageReaction(db, { roomId: 'r1', messageId: MSG, userId: 'alice', emoji: '<script>' })
    expect(res.error).toBe('Unsupported reaction')
  })

  it('denies non-members', async () => {
    const db = makeDb(memberRoom)
    const res = await setMessageReaction(db, { roomId: 'r1', messageId: MSG, userId: 'mallory', emoji: '👍' })
    expect(res.error).toBe('Access denied')
  })

  it('errors when the message is not in that room', async () => {
    const db = makeDb(memberRoom)
    db.messages.updateOne = vi.fn().mockResolvedValue({ matchedCount: 0 })
    const res = await setMessageReaction(db, { roomId: 'r1', messageId: MSG, userId: 'alice', emoji: '👍' })
    expect(res.error).toBe('Message not found')
  })
})

describe('answering message requests', () => {
  it('accepts only for the receiver of a pending request', async () => {
    const db = makeDb()
    expect(await acceptChatRequest(db, { roomId: 'r1', userId: 'bob' }))
      .toEqual({ roomId: 'r1', status: 'active' })
    const [filter] = db.rooms.updateOne.mock.calls[0]
    expect(filter).toMatchObject({ status: 'pending', members: 'bob', requestedBy: { $ne: 'bob' } })
  })

  it('declining sets the declined status', async () => {
    const db = makeDb()
    expect(await declineChatRequest(db, { roomId: 'r1', userId: 'bob' }))
      .toEqual({ roomId: 'r1', status: 'declined' })
  })

  it('404s when nothing matches (not a member, own request, or already answered)', async () => {
    const db = makeDb()
    db.rooms.updateOne.mockResolvedValueOnce({ matchedCount: 0 })
    await expect(acceptChatRequest(db, { roomId: 'r1', userId: 'alice' })).rejects.toMatchObject({ status: 404 })
  })
})

describe('setMessagePolicy', () => {
  it('rejects unknown values', async () => {
    await expect(setMessagePolicy(makeDb(), { userId: ALICE, policy: 'friends' })).rejects.toMatchObject({ status: 400 })
  })

  it('saves a valid policy on the user', async () => {
    const db = makeDb()
    expect(await setMessagePolicy(db, { userId: ALICE, policy: 'followers' })).toEqual({ policy: 'followers' })
    expect(db.users.updateOne).toHaveBeenCalledOnce()
  })
})

describe('listChatRequests', () => {
  it('splits incoming from outgoing and skips users that no longer exist', async () => {
    const rooms = [
      { _id: 'a', members: [BOB, ALICE], status: 'pending', requestedBy: BOB, lastMessage: { text: 'hi' } },
      { _id: 'b', members: [ALICE, MALLORY], status: 'pending', requestedBy: ALICE, lastMessage: { text: 'yo' } },
      { _id: 'c', members: [ALICE, '64b000000000000000000009'], status: 'declined', requestedBy: ALICE },
    ]
    const chain = (rows) => ({ project: () => ({ sort: () => ({ toArray: async () => rows }), toArray: async () => rows }) })
    const cols = {
      rooms: { find: () => chain(rooms) },
      users: {
        find: () => chain([
          { _id: { toString: () => BOB }, firstName: 'Bob' },
          { _id: { toString: () => MALLORY }, firstName: 'Mal' },
        ]),
      },
      usersStats: { find: () => chain([]) },
    }
    const db = { collection: (name) => cols[name] }
    const { incoming, outgoing } = await listChatRequests(db, ALICE)
    expect(incoming.map((r) => r.roomId)).toEqual(['a'])
    expect(incoming[0]).toMatchObject({ preview: 'hi', user: { _id: BOB, firstName: 'Bob' } })
    expect(outgoing.map((r) => r.roomId)).toEqual(['b'])
  })
})
